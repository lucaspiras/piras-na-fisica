-- Gincana · lista todos os perfis (equipes candidatas) para o admin escolher.
-- A tabela profiles tem RLS que limita o que cada usuário vê; esta RPC roda como
-- dono (SECURITY DEFINER) e é guardada por is_admin.
create or replace function quiz_list_profiles()
returns table(id uuid, display_name text, avatar text)
language plpgsql security definer set search_path = public as $$
begin
  if not quiz_is_admin() then raise exception 'Não autorizado.'; end if;
  return query
    select p.id, p.display_name, p.avatar
    from profiles p
    where coalesce(p.is_admin, false) = false
    order by p.display_name;
end $$;
grant execute on function quiz_list_profiles() to authenticated;
