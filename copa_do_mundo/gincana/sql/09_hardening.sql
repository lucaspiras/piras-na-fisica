-- Gincana — Quiz ao vivo · Reforço contra falhas silenciosas no controle ao vivo
-- Rodar DEPOIS de 01–08.
--
-- quiz_admin_start e quiz_admin_close faziam UPDATE com WHERE em question_status
-- específico ('shown'/'open'). Se o estado tivesse saído desse valor exato por
-- qualquer motivo (corrida entre cliques, revalidação de tela, etc.), o UPDATE
-- afetava 0 linhas SEM erro — o botão parecia "não fazer nada". Agora ambos:
--  (a) relaxam a condição pro que realmente importa (existe pergunta pra iniciar /
--      existe pergunta aberta pra encerrar), e
--  (b) levantam uma exceção clara se mesmo assim nada foi afetado.

create or replace function quiz_admin_start(p_game uuid)
returns void language plpgsql security definer set search_path = public as $$
declare v_rows int;
begin
  if not quiz_is_admin() then raise exception 'Não autorizado.'; end if;
  update quiz_state set question_status='open', question_started_at=now(), updated_at=now()
  where game_id=p_game and current_question_id is not null and question_status <> 'revealed';
  get diagnostics v_rows = row_count;
  if v_rows = 0 then raise exception 'Nenhuma pergunta exibida para iniciar o tempo.'; end if;
end $$;
grant execute on function quiz_admin_start(uuid) to authenticated;

create or replace function quiz_admin_close(p_game uuid)
returns void language plpgsql security definer set search_path = public as $$
declare v_rows int;
begin
  if not quiz_is_admin() then raise exception 'Não autorizado.'; end if;
  update quiz_state set question_status='closed', updated_at=now()
  where game_id=p_game and question_status='open';
  get diagnostics v_rows = row_count;
  if v_rows = 0 then raise exception 'Não há pergunta aberta para encerrar.'; end if;
end $$;
grant execute on function quiz_admin_close(uuid) to authenticated;

-- ── Admin: excluir uma equipe da gincana em andamento (ex.: suspeita de trapaça) ──
-- Reaproveita a mesma flag 'eliminated' da eliminação por pontuação — a equipe
-- some do jogo imediatamente (quiz_submit_answer já bloqueia quem está eliminado).
create or replace function quiz_admin_exclude_team(p_game uuid, p_team uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not quiz_is_admin() then raise exception 'Não autorizado.'; end if;
  update quiz_teams set eliminated = true where game_id = p_game and team_id = p_team;
end $$;
grant execute on function quiz_admin_exclude_team(uuid, uuid) to authenticated;
