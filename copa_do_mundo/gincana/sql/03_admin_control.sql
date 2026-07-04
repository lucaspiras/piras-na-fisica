-- Gincana — Quiz ao vivo · RPCs de controle do apresentador (admin)
-- Rodar DEPOIS de 01 e 02. Todas SECURITY DEFINER + guarda is_admin.
-- Mantêm a resposta certa no servidor e o horário do servidor no cronômetro.

-- Inicia (ou reinicia) o jogo na fase de grupos, preparando o quiz_state.
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
    q_ord=null, q_phase=null, q_points=null, q_text=null, q_options=null,
    question_started_at=null, reveal_correct_key=null,
    match_id=null, match_round=null, match_slot=null,
    match_team_a=null, match_team_b=null, match_q_index=null,
    question_seconds=v_secs, updated_at=now();
  update quiz_games set status='group' where id=p_game;
end $$;
grant execute on function quiz_admin_start_game(uuid) to authenticated;

-- Exibe uma pergunta (denormaliza no state, SEM a resposta). Fase de grupos.
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
    q_text=v_q.text, q_options=v_q.options,
    question_status='shown', question_started_at=null, question_seconds=v_secs,
    reveal_correct_key=null, updated_at=now()
  where game_id = v_q.game_id;
end $$;
grant execute on function quiz_admin_show(uuid) to authenticated;

-- Confronto do mata-mata: define as duas equipes + qual das 3 perguntas.
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
    q_text=v_q.text, q_options=v_q.options,
    question_status='shown', question_started_at=null, question_seconds=v_secs,
    reveal_correct_key=null, updated_at=now()
  where game_id = m.game_id;
end $$;
grant execute on function quiz_admin_ko_context(uuid, int, uuid) to authenticated;

-- Inicia o tempo (horário do SERVIDOR).
create or replace function quiz_admin_start(p_game uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not quiz_is_admin() then raise exception 'Não autorizado.'; end if;
  update quiz_state set question_status='open', question_started_at=now(), updated_at=now()
  where game_id=p_game and question_status='shown';
end $$;
grant execute on function quiz_admin_start(uuid) to authenticated;

-- Revela a resposta correta (publica no state).
create or replace function quiz_admin_reveal(p_game uuid)
returns void language plpgsql security definer set search_path = public as $$
declare v_key text;
begin
  if not quiz_is_admin() then raise exception 'Não autorizado.'; end if;
  select q.correct_key into v_key
  from quiz_state s join quiz_questions q on q.id = s.current_question_id
  where s.game_id = p_game;
  update quiz_state set question_status='revealed', reveal_correct_key=v_key, updated_at=now()
  where game_id = p_game;
end $$;
grant execute on function quiz_admin_reveal(uuid) to authenticated;
