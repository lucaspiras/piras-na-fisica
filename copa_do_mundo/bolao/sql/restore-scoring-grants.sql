-- ============================================================================
-- Bolão da Copa — Restaura o execute das funções de resultado/pontuação
-- ----------------------------------------------------------------------------
-- DESFAZ o "lockdown" do Grupo 3, que se mostrou uma abordagem errada:
--
--   • set_match_result JÁ se protege sozinho — tem checagem interna
--     (auth.uid() + is_admin → raise 'Não autorizado'). Rotear pela Edge
--     Function (service_role, sem auth.uid()) quebrava essa checagem.
--   • score_*_all_pools só RECALCULAM pontos a partir de dados já existentes;
--     um participante não consegue forjar nada chamando-as.
--
-- Então estas 4 funções voltam a ser chamadas direto pelo admin (autenticado)
-- e precisam do EXECUTE de volta. Elas são SECURITY DEFINER, então as funções
-- internas que chamam (score_group_classifications, score_best_3rd,
-- score_tournament, update_match_predictions_points) continuam executando como
-- dono e NÃO precisam de grant — ficam revogadas de anon/authenticated (o que,
-- de quebra, limpa os lints delas).
--
-- Rode no Supabase → SQL Editor. Idempotente.
-- ============================================================================

grant execute on function public.set_match_result(uuid, integer, integer) to authenticated;
grant execute on function public.score_tournament_all_pools()             to authenticated;
grant execute on function public.score_best_3rd_all_pools()               to authenticated;
grant execute on function public.score_group_all_pools(text)              to authenticated;

notify pgrst, 'reload schema';

-- ============================================================================
-- Observação: o lint "executable by authenticated" para essas 4 é aceitável —
-- set_match_result se protege internamente e as score_*_all_pools só recalculam.
-- As demais funções de pontuação seguem trancadas (lints limpos).
-- ============================================================================
