-- ============================================================================
-- Bolão da Copa — Corrige o lint "security_definer_view" das views de standings
-- ----------------------------------------------------------------------------
-- O linter do Supabase marca group_standings_actual e third_place_standings como
-- SECURITY DEFINER (padrão de views no Postgres), o que ignora a RLS de quem
-- consulta. A correção recomendada é torná-las security_invoker (rodam com a
-- permissão do usuário).
--
-- Para isso, quem consulta precisa LER as tabelas de override. Elas guardam só
-- posições de tabela (não são sensíveis), então liberamos a LEITURA para todos
-- e mantemos a ESCRITA restrita ao admin.
--
-- Rode no Supabase → SQL Editor. Idempotente.
-- ============================================================================

-- 1) Leitura pública dos overrides (escrita continua só admin via policy existente)
grant select on public.group_standings_override     to anon, authenticated;
grant select on public.third_place_ranking_override  to anon, authenticated;

drop policy if exists gso_select_all on public.group_standings_override;
create policy gso_select_all on public.group_standings_override
  for select using (true);

drop policy if exists tpro_select_all on public.third_place_ranking_override;
create policy tpro_select_all on public.third_place_ranking_override
  for select using (true);

-- 2) Views passam a respeitar a RLS de quem consulta (corrige o lint)
alter view public.group_standings_actual  set (security_invoker = on);
alter view public.third_place_standings    set (security_invoker = on);

notify pgrst, 'reload schema';

-- ============================================================================
-- Conferir depois (o lint deve sumir):
--   select relname, reloptions from pg_class
--   where relname in ('group_standings_actual','third_place_standings');
-- ============================================================================
