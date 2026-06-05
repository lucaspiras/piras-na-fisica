-- ============================================================================
-- Bolão da Copa — Colunas faltantes em pool_scoring_rules (regras de mata-mata)
-- ----------------------------------------------------------------------------
-- A tabela pool_scoring_rules foi criada sem as colunas ko_* (mata-mata), porque
-- a pontuação antiga ignorava o mata-mata. O editor de pontuação do admin e o
-- match-scoring-per-pool.sql precisam dessas colunas. Sem elas, salvar as regras
-- dá erro "Could not find the 'ko_correct_diff' column ... in the schema cache".
--
-- Este script adiciona TODAS as colunas de regras que possam faltar (idempotente
-- via "add column if not exists"), com os valores-padrão do app. Colunas que já
-- existem são ignoradas.
--
-- Rode no Supabase → SQL Editor. Pode rodar antes ou depois do match-scoring.
-- ============================================================================

alter table public.pool_scoring_rules
  -- Placar — fase de grupos
  add column if not exists exact_home        int not null default 2,
  add column if not exists exact_away        int not null default 2,
  add column if not exists correct_result    int not null default 4,
  add column if not exists correct_diff      int not null default 2,
  add column if not exists exact_score       int not null default 10,
  -- Placar — mata-mata (as que estavam faltando)
  add column if not exists ko_exact_home     int not null default 4,
  add column if not exists ko_exact_away     int not null default 4,
  add column if not exists ko_correct_result int not null default 8,
  add column if not exists ko_correct_diff   int not null default 4,
  add column if not exists ko_exact_score    int not null default 20,
  -- Classificação dos grupos
  add column if not exists cls_1st           int not null default 8,
  add column if not exists cls_2nd           int not null default 6,
  add column if not exists cls_3rd           int not null default 3,
  add column if not exists cls_4th           int not null default 1,
  add column if not exists cls_qualify       int not null default 4,
  add column if not exists cls_exact         int not null default 10,
  add column if not exists cls_best3rd       int not null default 5,
  -- Pódio / campeão
  add column if not exists tourn_1st         int not null default 100,
  add column if not exists tourn_2nd         int not null default 50,
  add column if not exists tourn_3rd         int not null default 25,
  add column if not exists tourn_bonus       int not null default 225;

-- Força o PostgREST a recarregar o cache de schema (senão o erro pode persistir
-- por alguns segundos no navegador).
notify pgrst, 'reload schema';

-- ============================================================================
-- Conferir as colunas depois de rodar:
--   select column_name from information_schema.columns
--   where table_schema = 'public' and table_name = 'pool_scoring_rules'
--   order by column_name;
-- ============================================================================
