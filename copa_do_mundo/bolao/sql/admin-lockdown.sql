-- ============================================================================
-- Bolão da Copa — Lockdown administrativo
-- ----------------------------------------------------------------------------
-- Objetivo: tornar o organizador (is_admin) o ÚNICO capaz de criar contas,
-- perfis, bolões e adicionar participantes. Garante que o bloqueio não dependa
-- só da interface — vale também para chamadas diretas à API.
--
-- A Edge Function `admin` usa a service_role e IGNORA o RLS, então continua
-- podendo fazer tudo. Estas regras restringem apenas o cliente `authenticated`
-- (o navegador dos participantes).
--
-- ⚠️ Os nomes das policies abaixo são suposições. Liste as suas com:
--     select schemaname, tablename, policyname, cmd
--     from pg_policies where schemaname = 'public' order by tablename;
--   e ajuste os DROP POLICY conforme o que existir no seu projeto.
-- Rode no Supabase → SQL Editor.
-- ============================================================================

-- 1) PERFIS — usuário não cria/edita o próprio perfil livremente -------------
--    Remova a policy de INSERT que permitia auth.uid() = id (onboarding).
drop policy if exists "profiles_insert_self"  on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;
-- (Mantenha a policy de SELECT e a de UPDATE do próprio perfil, se quiser que o
--  participante ainda troque avatar/apelido em profile.html — ver Suposição A.)

-- 2) BOLÕES — ninguém autenticado cria bolão pelo navegador ------------------
drop policy if exists "pools_insert_authenticated" on public.pools;
drop policy if exists "Users can create pools"     on public.pools;
-- (Mantenha SELECT para que participantes vejam os bolões de que fazem parte.)

-- 3) MEMBROS — ninguém se adiciona/remove de bolões pelo navegador -----------
drop policy if exists "pool_members_insert_self" on public.pool_members;
drop policy if exists "pool_members_delete_self" on public.pool_members;
drop policy if exists "Users can join pools"     on public.pool_members;
-- (Mantenha SELECT para ranking/lista de membros.)

-- 4) RPCs de autosserviço que não são mais usadas pelo front -----------------
--    Tira o direito de execução do cliente autenticado.
revoke execute on function public.create_pool(text)       from authenticated;
revoke execute on function public.join_pool(text)         from authenticated;
revoke execute on function public.delete_my_account()     from authenticated;
-- Ajuste as assinaturas se forem diferentes. Para ver as suas:
--   select p.proname, pg_get_function_identity_arguments(p.oid)
--   from pg_proc p join pg_namespace n on n.oid = p.pronamespace
--   where n.nspname = 'public'
--     and p.proname in ('create_pool','join_pool','delete_my_account');

-- 5) Cadastro público de auth — desligar no painel (não é SQL) ---------------
--    Supabase → Authentication → Sign In / Providers → Email:
--      desmarque "Allow new users to sign up" (Disable signups).
--    Assim, mesmo fora do app, ninguém cria conta sozinho. As contas passam a
--    ser criadas só pela Edge Function `admin` (auth.admin.createUser).

-- 6) (Recomendado) Garantir limpeza ao excluir participante ------------------
--    Se as FKs ainda não estão em ON DELETE CASCADE, a Edge Function já apaga
--    predictions / predicted_group_standings / pool_members / profiles antes de
--    remover a conta. Verifique que profiles.id referencia auth.users(id).
