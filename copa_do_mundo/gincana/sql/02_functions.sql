-- Gincana — Quiz ao vivo · Funções (RPCs)
-- Rodar DEPOIS de 01_schema.sql. Todas SECURITY DEFINER (rodam como dono, driblam RLS);
-- as sensíveis conferem is_admin internamente. auth.uid() = usuário/equipe do chamador.

-- ── Equipe: enviar resposta (correção no servidor, tempo do servidor) ──────
create or replace function quiz_submit_answer(p_question_id uuid, p_choice text)
returns json language plpgsql security definer set search_path = public as $$
declare
  v_uid uuid := auth.uid();
  v_q   quiz_questions;
  v_st  quiz_state;
  v_correct boolean;
  v_ms  int;
begin
  if v_uid is null then raise exception 'Não autenticado.'; end if;

  select * into v_q from quiz_questions where id = p_question_id;
  if not found then raise exception 'Pergunta inexistente.'; end if;

  select * into v_st from quiz_state where game_id = v_q.game_id;
  if v_st.current_question_id is distinct from p_question_id then
    raise exception 'Esta pergunta não está ativa.';
  end if;
  if v_st.question_status <> 'open' then raise exception 'As respostas estão fechadas.'; end if;
  if v_st.question_started_at is null
     or now() > v_st.question_started_at + make_interval(secs => v_st.question_seconds) then
    raise exception 'Tempo esgotado.';
  end if;

  if not exists (select 1 from quiz_teams where game_id = v_q.game_id and team_id = v_uid) then
    raise exception 'Você não participa desta gincana.';
  end if;

  -- Mata-mata: só as duas equipes do confronto atual respondem.
  if v_st.match_id is not null and v_uid <> v_st.match_team_a and v_uid <> v_st.match_team_b then
    raise exception 'Este confronto não é da sua equipe.';
  end if;

  v_correct := (upper(p_choice) = upper(v_q.correct_key));
  v_ms := greatest(0, (extract(epoch from (now() - v_st.question_started_at)) * 1000)::int);

  insert into quiz_answers (game_id, question_id, team_id, match_id, choice_key, is_correct, answered_at, response_ms)
  values (v_q.game_id, p_question_id, v_uid, v_st.match_id, upper(p_choice), v_correct, now(), v_ms)
  on conflict (question_id, team_id) do nothing;  -- não pode trocar a resposta

  return json_build_object('ok', true);  -- NÃO devolve se acertou (só na revelação)
end $$;
grant execute on function quiz_submit_answer(uuid, text) to authenticated;

-- ── Equipe: minha resposta na pergunta (persistência ao recarregar) ───────
create or replace function quiz_my_answer(p_question_id uuid)
returns text language sql security definer set search_path = public as $$
  select choice_key from quiz_answers
  where question_id = p_question_id and team_id = auth.uid();
$$;
grant execute on function quiz_my_answer(uuid) to authenticated;

-- ── Placar ao vivo (totais seguros; sem detalhe de respostas) ─────────────
create or replace function quiz_scoreboard(p_game uuid)
returns table(team_id uuid, display_name text, avatar text,
              group_points int, ko_points int, total_points int,
              correct_count int, eliminated boolean, seed int)
language sql security definer set search_path = public as $$
  select t.team_id, p.display_name, p.avatar,
         coalesce(gp.pts,0)::int,
         coalesce(kp.pts,0)::int,
         (coalesce(gp.pts,0) + coalesce(kp.pts,0))::int,
         coalesce(gp.correct,0)::int,
         t.eliminated, t.seed
  from quiz_teams t
  join profiles p on p.id = t.team_id
  left join (
    select a.team_id, sum(q.points) pts, count(*) correct
    from quiz_answers a join quiz_questions q on q.id = a.question_id
    where a.game_id = p_game and q.phase = 'group' and a.is_correct
    group by a.team_id
  ) gp on gp.team_id = t.team_id
  left join (
    select m.winner team_id, sum(m.points) pts
    from quiz_matches m where m.game_id = p_game and m.winner is not null
    group by m.winner
  ) kp on kp.team_id = t.team_id
  where t.game_id = p_game
  order by 6 desc, 7 desc, p.display_name;   -- total_points, correct_count, nome
$$;
grant execute on function quiz_scoreboard(uuid) to authenticated;

-- ── Ranking da fase de grupos, com os desempates do regulamento ───────────
-- Ordem: pontos ↓ · acertos ↓ · erro mais antigo (last_error_ord ↑, nulls first) · tempo total ↑
create or replace function quiz_group_ranking(p_game uuid)
returns table(team_id uuid, display_name text, group_points int, correct_count int,
              last_error_ord int, total_time_ms bigint, rank int)
language sql security definer set search_path = public as $$
  with stats as (
    select t.team_id, p.display_name,
           coalesce(sum(q.points) filter (where a.is_correct), 0)::int      as group_points,
           coalesce(count(*)      filter (where a.is_correct), 0)::int      as correct_count,
           max(q.ord)             filter (where a.is_correct = false)       as last_error_ord,
           coalesce(sum(a.response_ms), 0)::bigint                          as total_time_ms
    from quiz_teams t
    join profiles p on p.id = t.team_id
    left join quiz_answers a  on a.team_id = t.team_id and a.game_id = p_game and a.match_id is null
    left join quiz_questions q on q.id = a.question_id
    where t.game_id = p_game
    group by t.team_id, p.display_name
  )
  select s.*, row_number() over (
           order by group_points desc, correct_count desc,
                    last_error_ord asc nulls first, total_time_ms asc
         )::int as rank
  from stats s
  order by rank;
$$;
grant execute on function quiz_group_ranking(uuid) to authenticated;

-- ── Admin: montar o mata-mata com as 8 melhores ──────────────────────────
create or replace function quiz_seed_knockout(p_game uuid)
returns void language plpgsql security definer set search_path = public as $$
declare top uuid[]; i int;
begin
  if not quiz_is_admin() then raise exception 'Não autorizado.'; end if;

  select array_agg(team_id order by rank) into top
  from quiz_group_ranking(p_game) where rank <= 8;
  if coalesce(array_length(top,1),0) < 8 then
    raise exception 'São necessárias ao menos 8 equipes para o mata-mata.';
  end if;

  update quiz_teams set seed = null, eliminated = true where game_id = p_game;
  for i in 1..8 loop
    update quiz_teams set seed = i, eliminated = false
    where game_id = p_game and team_id = top[i];
  end loop;

  delete from quiz_matches where game_id = p_game;
  -- Chave: QF1 1×8, QF2 4×5, QF3 3×6, QF4 2×7; SF1=QF1×QF2, SF2=QF3×QF4; Final=SF1×SF2.
  insert into quiz_matches(game_id, round, slot, team_a, team_b, points, status) values
    (p_game,'quarter',1, top[1], top[8], 25,'pending'),
    (p_game,'quarter',2, top[4], top[5], 25,'pending'),
    (p_game,'quarter',3, top[3], top[6], 25,'pending'),
    (p_game,'quarter',4, top[2], top[7], 25,'pending'),
    (p_game,'semi',   1, null,   null,   50,'pending'),
    (p_game,'semi',   2, null,   null,   50,'pending'),
    (p_game,'final',  1, null,   null,  100,'pending');

  update quiz_games set status = 'knockout' where id = p_game;
end $$;
grant execute on function quiz_seed_knockout(uuid) to authenticated;

-- ── Admin: decidir um confronto (após as 3 perguntas) e avançar a chave ───
-- Vence quem tem mais acertos; empate → menor tempo total; empate raro → team_a.
create or replace function quiz_decide_match(p_match uuid)
returns uuid language plpgsql security definer set search_path = public as $$
declare
  m quiz_matches;
  a_correct int; b_correct int; a_time bigint; b_time bigint;
  v_winner uuid; v_loser uuid;
begin
  if not quiz_is_admin() then raise exception 'Não autorizado.'; end if;
  select * into m from quiz_matches where id = p_match;
  if not found then raise exception 'Confronto inexistente.'; end if;

  select coalesce(count(*) filter (where team_id = m.team_a and is_correct),0),
         coalesce(count(*) filter (where team_id = m.team_b and is_correct),0),
         coalesce(sum(response_ms) filter (where team_id = m.team_a),0),
         coalesce(sum(response_ms) filter (where team_id = m.team_b),0)
    into a_correct, b_correct, a_time, b_time
  from quiz_answers where match_id = p_match;

  if    a_correct > b_correct then v_winner := m.team_a;
  elsif b_correct > a_correct then v_winner := m.team_b;
  elsif a_time <= b_time      then v_winner := m.team_a;
  else                             v_winner := m.team_b;
  end if;
  v_loser := case when v_winner = m.team_a then m.team_b else m.team_a end;

  update quiz_matches set winner = v_winner, status = 'done' where id = p_match;
  update quiz_teams set eliminated = true where game_id = m.game_id and team_id = v_loser;

  -- Avança o vencedor pela convenção da chave.
  if m.round = 'quarter' then
    if m.slot in (1,2) then
      update quiz_matches set
        team_a = case when m.slot = 1 then v_winner else team_a end,
        team_b = case when m.slot = 2 then v_winner else team_b end
      where game_id = m.game_id and round = 'semi' and slot = 1;
    else
      update quiz_matches set
        team_a = case when m.slot = 3 then v_winner else team_a end,
        team_b = case when m.slot = 4 then v_winner else team_b end
      where game_id = m.game_id and round = 'semi' and slot = 2;
    end if;
  elsif m.round = 'semi' then
    update quiz_matches set
      team_a = case when m.slot = 1 then v_winner else team_a end,
      team_b = case when m.slot = 2 then v_winner else team_b end
    where game_id = m.game_id and round = 'final' and slot = 1;
  elsif m.round = 'final' then
    update quiz_games set status = 'finished' where id = m.game_id;
  end if;

  return v_winner;
end $$;
grant execute on function quiz_decide_match(uuid) to authenticated;
