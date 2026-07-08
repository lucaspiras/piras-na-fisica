-- Gincana — Quiz ao vivo · Pontuação só conta após revelar a resposta
-- Rodar DEPOIS de 01–12.
--
-- Antes, quiz_scoreboard somava toda resposta já corrigida no servidor (is_correct
-- é calculado no instante em que a equipe responde), então o placar mudava assim
-- que o apresentador clicava "Encerrar tempo" — antes mesmo de revelar o gabarito.
-- Agora cada pergunta só entra no placar depois que o apresentador clica em
-- "Revelar resposta" (marcado por quiz_questions.revealed).

alter table quiz_questions add column if not exists revealed boolean not null default false;

-- Marca a pergunta atual como revelada (persiste mesmo depois de avançar).
create or replace function quiz_admin_reveal(p_game uuid)
returns void language plpgsql security definer set search_path = public as $$
declare v_key text; v_qid uuid;
begin
  if not quiz_is_admin() then raise exception 'Não autorizado.'; end if;
  select s.current_question_id, q.correct_key into v_qid, v_key
  from quiz_state s join quiz_questions q on q.id = s.current_question_id
  where s.game_id = p_game;
  update quiz_state set question_status='revealed', reveal_correct_key=v_key, updated_at=now()
  where game_id = p_game;
  update quiz_questions set revealed = true where id = v_qid;
end $$;
grant execute on function quiz_admin_reveal(uuid) to authenticated;

-- Placar: só soma/conta perguntas já reveladas.
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
    where a.game_id = p_game and q.phase = 'group' and a.is_correct and q.revealed
    group by a.team_id
  ) gp on gp.team_id = t.team_id
  left join (
    select m.winner team_id, sum(m.points) pts
    from quiz_matches m where m.game_id = p_game and m.winner is not null
    group by m.winner
  ) kp on kp.team_id = t.team_id
  where t.game_id = p_game
  order by 6 desc, 7 desc, p.display_name;
$$;
grant execute on function quiz_scoreboard(uuid) to authenticated;

-- Ranking (usado para eliminar/desempatar): idem, só perguntas já reveladas.
create or replace function quiz_group_ranking(p_game uuid)
returns table(team_id uuid, display_name text, group_points int, correct_count int,
              last_error_ord int, total_time_ms bigint, rank int)
language sql security definer set search_path = public as $$
  with stats as (
    select t.team_id, p.display_name,
           coalesce(sum(q.points) filter (where a.is_correct and q.revealed), 0)::int as group_points,
           coalesce(count(*)      filter (where a.is_correct and q.revealed), 0)::int as correct_count,
           max(q.ord)             filter (where a.is_correct = false and q.revealed)  as last_error_ord,
           coalesce(sum(a.response_ms) filter (where q.revealed), 0)::bigint          as total_time_ms
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

-- Reiniciar partida: também zera a flag de revelação das perguntas desta gincana.
create or replace function quiz_admin_reset(p_game uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not quiz_is_admin() then raise exception 'Não autorizado.'; end if;

  delete from quiz_answers where game_id = p_game;
  update quiz_teams set eliminated = false, seed = null where game_id = p_game;
  update quiz_questions set revealed = false where game_id = p_game;
  update quiz_state set
    phase='group', question_status='idle', current_question_id=null,
    q_ord=null, q_phase=null, q_points=null, q_text=null, q_options=null, q_media=null,
    question_started_at=null, reveal_correct_key=null, media_shown=false,
    match_id=null, match_round=null, match_slot=null,
    match_team_a=null, match_team_b=null, match_q_index=null,
    updated_at=now()
  where game_id = p_game;
  update quiz_games set status='setup' where id = p_game;
end $$;
grant execute on function quiz_admin_reset(uuid) to authenticated;
