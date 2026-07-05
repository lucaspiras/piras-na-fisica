-- Gincana — Quiz ao vivo · Trocar resposta dentro do tempo, vídeo no telão antes da
-- revelação, e mostrar as respostas de cada equipe antes de revelar a correta.
-- Rodar DEPOIS de 01–07.

-- ── quiz_state: novo status 'closed' (tempo encerrado, respostas à mostra, ainda
--    sem a correta) e flag de vídeo exibido no telão ──────────────────────────
alter table quiz_state add column if not exists media_shown boolean not null default false;
alter table quiz_state drop constraint if exists quiz_state_question_status_check;
alter table quiz_state add constraint quiz_state_question_status_check
  check (question_status in ('idle','shown','open','closed','revealed'));

-- ── Equipe: enviar resposta — agora PERMITE trocar enquanto a pergunta está aberta ──
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
  if exists (select 1 from quiz_teams
             where game_id = v_q.game_id and team_id = v_uid and eliminated) then
    raise exception 'Sua equipe foi eliminada da gincana.';
  end if;

  v_correct := (upper(p_choice) = upper(v_q.correct_key));
  v_ms := greatest(0, (extract(epoch from (now() - v_st.question_started_at)) * 1000)::int);

  insert into quiz_answers (game_id, question_id, team_id, match_id, choice_key, is_correct, answered_at, response_ms)
  values (v_q.game_id, p_question_id, v_uid, null, upper(p_choice), v_correct, now(), v_ms)
  on conflict (question_id, team_id) do update set
    choice_key  = excluded.choice_key,
    is_correct  = excluded.is_correct,
    answered_at = excluded.answered_at,
    response_ms = excluded.response_ms;

  return json_build_object('ok', true);
end $$;
grant execute on function quiz_submit_answer(uuid, text) to authenticated;

-- ── Admin: encerrar o tempo (trava novas respostas, mostra "quem escolheu o quê"
--    no telão) sem ainda revelar a correta ────────────────────────────────────
create or replace function quiz_admin_close(p_game uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not quiz_is_admin() then raise exception 'Não autorizado.'; end if;
  update quiz_state set question_status='closed', updated_at=now()
  where game_id=p_game and question_status='open';
end $$;
grant execute on function quiz_admin_close(uuid) to authenticated;

-- ── Admin: mostrar o vídeo da pergunta atual no telão (antes da revelação) ─────
create or replace function quiz_admin_show_media(p_game uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not quiz_is_admin() then raise exception 'Não autorizado.'; end if;
  update quiz_state set media_shown=true, updated_at=now() where game_id=p_game;
end $$;
grant execute on function quiz_admin_show_media(uuid) to authenticated;

-- ── Respostas de cada equipe na pergunta atual — só aparece com o tempo
--    encerrado ou já revelada (nunca durante 'open', para não vazar palpite alheio) ──
create or replace function quiz_current_answers(p_game uuid)
returns table(team_id uuid, display_name text, avatar text, choice_key text)
language sql security definer set search_path = public as $$
  select t.team_id, p.display_name, p.avatar, a.choice_key
  from quiz_teams t
  join profiles p on p.id = t.team_id
  join quiz_state s on s.game_id = p_game
  left join quiz_answers a on a.team_id = t.team_id and a.question_id = s.current_question_id
  where t.game_id = p_game
    and s.question_status in ('closed','revealed')
  order by p.display_name;
$$;
grant execute on function quiz_current_answers(uuid) to authenticated;

-- ── Redefinições: resetar media_shown junto com os demais campos de estado ─────
create or replace function quiz_admin_start_game(p_game uuid)
returns void language plpgsql security definer set search_path = public as $$
declare v_secs int;
begin
  if not quiz_is_admin() then raise exception 'Não autorizado.'; end if;
  select question_seconds into v_secs from quiz_games where id = p_game;
  insert into quiz_state (game_id, phase, question_status, question_seconds)
  values (p_game, 'group', 'idle', v_secs)
  on conflict (game_id) do update set
    phase='group', question_status='idle', current_question_id=null,
    q_ord=null, q_phase=null, q_points=null, q_text=null, q_options=null, q_media=null,
    question_started_at=null, reveal_correct_key=null, media_shown=false,
    match_id=null, match_round=null, match_slot=null,
    match_team_a=null, match_team_b=null, match_q_index=null,
    question_seconds=v_secs, updated_at=now();
  update quiz_games set status='group' where id=p_game;
end $$;
grant execute on function quiz_admin_start_game(uuid) to authenticated;

create or replace function quiz_admin_show(p_question_id uuid)
returns void language plpgsql security definer set search_path = public as $$
declare v_q quiz_questions; v_secs int;
begin
  if not quiz_is_admin() then raise exception 'Não autorizado.'; end if;
  select * into v_q from quiz_questions where id = p_question_id;
  if not found then raise exception 'Pergunta inexistente.'; end if;
  select question_seconds into v_secs from quiz_games where id = v_q.game_id;
  update quiz_state set
    phase='group', match_id=null, match_round=null, match_slot=null,
    match_team_a=null, match_team_b=null, match_q_index=null,
    current_question_id=v_q.id, q_ord=v_q.ord, q_phase=v_q.phase, q_points=v_q.points,
    q_text=v_q.text, q_options=v_q.options, q_media=v_q.media,
    question_status='shown', question_started_at=null, question_seconds=v_secs,
    reveal_correct_key=null, media_shown=false, updated_at=now()
  where game_id = v_q.game_id;
end $$;
grant execute on function quiz_admin_show(uuid) to authenticated;

create or replace function quiz_admin_reset(p_game uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not quiz_is_admin() then raise exception 'Não autorizado.'; end if;

  delete from quiz_answers where game_id = p_game;
  update quiz_teams set eliminated = false, seed = null where game_id = p_game;
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
