-- Gincana — Quiz ao vivo · Eliminar equipes escolhidas pelo admin (com confirmação)
-- Rodar DEPOIS de 01–14.
--
-- Antes, quiz_eliminate_worst decidia sozinho quais 2 equipes saíam. Agora o admin
-- vê a sugestão (as 2 piores, pelo mesmo critério de desempate do regulamento) e
-- pode trocar quem sai antes de confirmar — esta RPC elimina exatamente as equipes
-- informadas pelo cliente.

create or replace function quiz_admin_eliminate_teams(p_game uuid, p_team_ids uuid[])
returns setof text language plpgsql security definer set search_path = public as $$
begin
  if not quiz_is_admin() then raise exception 'Não autorizado.'; end if;
  if p_team_ids is null or array_length(p_team_ids,1) is null then
    raise exception 'Nenhuma equipe selecionada.';
  end if;
  update quiz_teams set eliminated = true
  where game_id = p_game and team_id = any(p_team_ids) and not eliminated;
  return query select p.display_name from profiles p where p.id = any(p_team_ids);
end $$;
grant execute on function quiz_admin_eliminate_teams(uuid, uuid[]) to authenticated;
