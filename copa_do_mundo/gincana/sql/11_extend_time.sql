-- Gincana — Quiz ao vivo · Dar mais tempo numa pergunta aberta
-- Rodar DEPOIS de 01–10.
--
-- Aumenta question_seconds da pergunta em aberto. Como o cronômetro do cliente
-- calcula "tempo restante = question_seconds - decorrido" (ver 10_elapsed_ms.sql),
-- estender question_seconds já reflete na hora em todas as telas, sem precisar
-- mexer em question_started_at.
create or replace function quiz_admin_extend(p_game uuid, p_seconds int default 30)
returns void language plpgsql security definer set search_path = public as $$
declare v_rows int;
begin
  if not quiz_is_admin() then raise exception 'Não autorizado.'; end if;
  update quiz_state set question_seconds = question_seconds + p_seconds, updated_at = now()
  where game_id = p_game and question_status = 'open';
  get diagnostics v_rows = row_count;
  if v_rows = 0 then raise exception 'Não há pergunta aberta para dar mais tempo.'; end if;
end $$;
grant execute on function quiz_admin_extend(uuid, int) to authenticated;
