-- ============================================================================
-- Fix: zera classification_pts inflados por múltiplos cliques no botão
-- ----------------------------------------------------------------------------
-- Sintoma: score_group_all_pools SOMA pontos ao valor existente em
-- classification_scores.classification_pts a cada execução. Clicar o botão
-- N vezes resulta em N× o valor correto.
--
-- Solução: zerar classification_pts e re-rodar o botão UMA VEZ.
-- Rode no Supabase → SQL Editor antes de re-pontuar.
-- ============================================================================

UPDATE public.classification_scores
SET classification_pts = 0;
