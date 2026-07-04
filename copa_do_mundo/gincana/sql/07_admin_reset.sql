-- Gincana — Quiz ao vivo · Reiniciar / apagar uma gincana
-- Rodar DEPOIS de 01–06. Ambas SECURITY DEFINER + guarda is_admin (mesmo padrão de 02/03/06).

-- ── Reiniciar partida: mantém equipes e perguntas, zera progresso ─────────
create or replace function quiz_admin_reset(p_game uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not quiz_is_admin() then raise exception 'Não autorizado.'; end if;

  delete from quiz_answers where game_id = p_game;
  update quiz_teams set eliminated = false, seed = null where game_id = p_game;
  update quiz_state set
    phase='group', question_status='idle', current_question_id=null,
    q_ord=null, q_phase=null, q_points=null, q_text=null, q_options=null, q_media=null,
    question_started_at=null, reveal_correct_key=null,
    match_id=null, match_round=null, match_slot=null,
    match_team_a=null, match_team_b=null, match_q_index=null,
    updated_at=now()
  where game_id = p_game;
  update quiz_games set status='setup' where id = p_game;
end $$;
grant execute on function quiz_admin_reset(uuid) to authenticated;

-- ── Apagar uma gincana inteira (equipes/perguntas/respostas em cascata) ────
create or replace function quiz_admin_delete_game(p_game uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not quiz_is_admin() then raise exception 'Não autorizado.'; end if;
  delete from quiz_games where id = p_game;   -- FKs on delete cascade cuidam do resto
end $$;
grant execute on function quiz_admin_delete_game(uuid) to authenticated;
