-- Gincana · suporte a mídia (ex.: vídeo do gol) nas perguntas.
-- Campo opcional media (URL). Denormalizado no quiz_state (q_media) para as telas.
alter table quiz_questions add column if not exists media text;
alter table quiz_state     add column if not exists q_media text;

-- Redefine quiz_admin_show para carregar também a mídia.
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
    reveal_correct_key=null, updated_at=now()
  where game_id = v_q.game_id;
end $$;

-- Redefine quiz_admin_ko_context para carregar também a mídia.
create or replace function quiz_admin_ko_context(p_match uuid, p_q_index int, p_question_id uuid)
returns void language plpgsql security definer set search_path = public as $$
declare m quiz_matches; v_q quiz_questions; v_secs int;
begin
  if not quiz_is_admin() then raise exception 'Não autorizado.'; end if;
  select * into m from quiz_matches where id = p_match;
  if not found then raise exception 'Confronto inexistente.'; end if;
  select * into v_q from quiz_questions where id = p_question_id;
  if not found then raise exception 'Pergunta inexistente.'; end if;
  select question_seconds into v_secs from quiz_games where id = m.game_id;
  update quiz_matches set status='running' where id=p_match and status='pending';
  update quiz_state set
    phase='knockout', match_id=m.id, match_round=m.round, match_slot=m.slot,
    match_team_a=m.team_a, match_team_b=m.team_b, match_q_index=p_q_index,
    current_question_id=v_q.id, q_ord=v_q.ord, q_phase='knockout', q_points=v_q.points,
    q_text=v_q.text, q_options=v_q.options, q_media=v_q.media,
    question_status='shown', question_started_at=null, question_seconds=v_secs,
    reveal_correct_key=null, updated_at=now()
  where game_id = m.game_id;
end $$;
