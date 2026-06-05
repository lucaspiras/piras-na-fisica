-- ============================================================================
-- Bolão da Copa — Tranca as funções de resultado/pontuação (Grupo 3 dos lints)
-- ----------------------------------------------------------------------------
-- Essas funções SECURITY DEFINER alteram placar/pontuação e estavam chamáveis
-- por qualquer usuário logado (um participante poderia forjar resultado pela API).
--
-- Agora o admin chama tudo isso pela Edge Function `admin` (service_role, que
-- confere is_admin). Então revogamos o EXECUTE de anon/authenticated. A
-- service_role (Edge Function e sync.mjs) ignora a revogação e continua podendo.
--
-- ⚠️ Rode DEPOIS de publicar a Edge Function com as novas ações, senão o admin
--    fica sem conseguir lançar resultado/pontuar até o deploy.
--
-- Rode no Supabase → SQL Editor. Idempotente e tolerante a falhas.
-- ============================================================================

do $$
declare cmd text;
begin
  foreach cmd in array array[
    'revoke execute on function public.set_match_result(uuid, integer, integer) from anon, authenticated',
    'revoke execute on function public.score_tournament_all_pools() from anon, authenticated',
    'revoke execute on function public.score_best_3rd_all_pools() from anon, authenticated',
    'revoke execute on function public.score_group_all_pools(text) from anon, authenticated',
    'revoke execute on function public.update_match_predictions_points(uuid) from anon, authenticated',
    'revoke execute on function public.score_group_classifications(uuid, text) from anon, authenticated',
    'revoke execute on function public.score_best_3rd(uuid) from anon, authenticated',
    'revoke execute on function public.score_tournament(uuid) from anon, authenticated',
    'revoke execute on function public.score_match(smallint) from anon, authenticated',
    'revoke execute on function public.score_group_stage() from anon, authenticated',
    'revoke execute on function public.score_knockout() from anon, authenticated'
  ]
  loop
    begin execute cmd; exception when others then raise notice 'pulou % (%)', cmd, sqlerrm; end;
  end loop;
end $$;

notify pgrst, 'reload schema';

-- ============================================================================
-- Conferir depois (estas funções não devem mais aparecer nos lints
-- anon/authenticated_security_definer_function_executable).
-- ============================================================================
