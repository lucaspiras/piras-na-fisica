-- ============================================================================
-- Cria rescore_all_classifications() — pontua classificações de forma idempotente
-- ----------------------------------------------------------------------------
-- Problema: score_group_all_pools(group) ACUMULA pontos em classification_pts
-- a cada chamada. Clicar o botão N vezes resulta em N× os pontos corretos.
--
-- Solução: esta função zera classification_pts e recomputa TODOS os grupos
-- finalizados em uma única operação atômica. O botão no admin agora chama
-- apenas esta função, e pode ser clicado quantas vezes quiser com segurança.
--
-- Rode no Supabase → SQL Editor para criar a função.
-- ============================================================================

CREATE OR REPLACE FUNCTION public.rescore_all_classifications()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  pool_rec  RECORD;
  group_rec RECORD;
BEGIN
  -- 1. Zera todos os pontos de classificação (sem tocar em best3rd_pts / tournament_pts)
  UPDATE classification_scores SET classification_pts = 0 WHERE pool_id IS NOT NULL;

  -- 2. Loop pelos grupos cujos jogos estão TODOS finalizados
  FOR group_rec IN
    SELECT group_name
    FROM   matches
    WHERE  phase = 'group' AND group_name IS NOT NULL
    GROUP  BY group_name
    HAVING COUNT(*) > 0
       AND COUNT(*) FILTER (WHERE status = 'finished') = COUNT(*)
    ORDER  BY group_name
  LOOP
    -- 3. Pontua cada bolão para este grupo
    FOR pool_rec IN SELECT id FROM pools LOOP
      BEGIN
        PERFORM score_group_classifications(pool_rec.id, group_rec.group_name);
      EXCEPTION WHEN OTHERS THEN NULL;
      END;
    END LOOP;
  END LOOP;
END;
$$;

GRANT EXECUTE ON FUNCTION public.rescore_all_classifications() TO authenticated;

NOTIFY pgrst, 'reload schema';
