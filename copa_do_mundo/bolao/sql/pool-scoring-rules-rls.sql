-- ============================================================================
-- Bolão da Copa — RLS: admin pode criar/editar regras de qualquer bolão
-- ----------------------------------------------------------------------------
-- O editor de pontuação do admin cria a linha de pool_scoring_rules quando ela
-- ainda não existe. Sem uma policy de INSERT/UPDATE para o admin, isso dá:
--   "new row violates row-level security policy for table pool_scoring_rules".
--
-- Adiciona uma policy permissiva (FOR ALL) só para o admin (profiles.is_admin),
-- que SOMA às policies existentes (ex.: dono/participante lê). NÃO mexe no estado
-- da RLS (que já está ligada) nem remove o que já existe.
--
-- Rode no Supabase → SQL Editor. Idempotente.
-- ============================================================================

grant select, insert, update on public.pool_scoring_rules to authenticated;

drop policy if exists pool_scoring_rules_admin_all on public.pool_scoring_rules;
create policy pool_scoring_rules_admin_all on public.pool_scoring_rules
  for all
  using      (exists (select 1 from public.profiles where id = auth.uid() and is_admin))
  with check (exists (select 1 from public.profiles where id = auth.uid() and is_admin));

notify pgrst, 'reload schema';

-- ============================================================================
-- Conferir as policies da tabela depois de rodar:
--   select policyname, cmd from pg_policies
--   where schemaname = 'public' and tablename = 'pool_scoring_rules';
-- ============================================================================
