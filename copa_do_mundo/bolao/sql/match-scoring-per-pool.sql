-- ============================================================================
-- Bolão da Copa — Pontuação de placar POR BOLÃO (grupos e mata-mata)
-- ----------------------------------------------------------------------------
-- Problema: hoje a pontuação de placar vem de calc_prediction_points(), que tem
-- os valores CHUMBADOS (2/2/4/2/10) e não recebe pool_id. Resultado:
--   • o liga/desliga das categorias "Placar de grupos" e "Placar de mata-mata"
--     (em pool_scoring_rules) NÃO tem efeito;
--   • as regras ko_* (mata-mata) nunca são usadas.
--
-- Correção: reescreve update_match_predictions_points para ler pool_scoring_rules
-- POR BOLÃO e usar as regras de GRUPO (exact_home, exact_away, correct_result,
-- correct_diff, exact_score) ou de MATA-MATA (ko_*) conforme a fase do jogo.
--
-- Assim, "desligar placar de grupos" (zerar exact_*/correct_*) ou "só fase de
-- grupos" (zerar ko_*) passam a valer de verdade na pontuação.
--
-- As demais funções (classificação, 3ºs, pódio) já leem pool_scoring_rules e já
-- usam group_standings_actual — não precisam de mudança.
--
-- Rode no Supabase → SQL Editor (com "No limit"). Idempotente.
-- ============================================================================

create or replace function public.update_match_predictions_points(p_match_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $function$
declare
  m matches;
begin
  select * into m from matches where id = p_match_id;
  if m.home_score is null or m.away_score is null then return; end if;

  -- Atualiza os palpites de cada bolão usando as regras DAQUELE bolão.
  -- Pools sem linha em pool_scoring_rules não são pontuados (o join os exclui).
  update predictions p
  set points =
    case when m.phase = 'group' then
        (case when p.home_score = m.home_score then r.exact_home else 0 end)
      + (case when p.away_score = m.away_score then r.exact_away else 0 end)
      + (case when sign((p.home_score - p.away_score)::numeric)
             = sign((m.home_score - m.away_score)::numeric) then r.correct_result else 0 end)
      + (case when (p.home_score - p.away_score) = (m.home_score - m.away_score) then r.correct_diff else 0 end)
      + (case when p.home_score = m.home_score and p.away_score = m.away_score then r.exact_score else 0 end)
    else
        (case when p.home_score = m.home_score then r.ko_exact_home else 0 end)
      + (case when p.away_score = m.away_score then r.ko_exact_away else 0 end)
      + (case when sign((p.home_score - p.away_score)::numeric)
             = sign((m.home_score - m.away_score)::numeric) then r.ko_correct_result else 0 end)
      + (case when (p.home_score - p.away_score) = (m.home_score - m.away_score) then r.ko_correct_diff else 0 end)
      + (case when p.home_score = m.home_score and p.away_score = m.away_score then r.ko_exact_score else 0 end)
    end,
    updated_at = now()
  from pool_scoring_rules r
  where p.match_id = p_match_id
    and r.pool_id = p.pool_id;
end;
$function$;

-- ----------------------------------------------------------------------------
-- Recalcula os pontos de todos os jogos já encerrados com a nova regra por
-- bolão. (Hoje, antes da Copa começar, isso é um no-op; fica para quando houver
-- resultados ou se você mudar as regras de um bolão depois de jogos encerrados.)
-- ----------------------------------------------------------------------------
do $$
declare mid uuid;
begin
  for mid in
    select id from matches
    where status = 'finished' and home_score is not null and away_score is not null
  loop
    perform update_match_predictions_points(mid);
  end loop;
end $$;

-- ============================================================================
-- Observações:
-- • Pools precisam ter uma linha em pool_scoring_rules. O editor de pontuação do
--   admin cria/atualiza essa linha ao salvar. Para conferir pools sem regra:
--     select id, name from pools p
--     where not exists (select 1 from pool_scoring_rules r where r.pool_id = p.id);
-- • Se você mudar a pontuação de um bolão DEPOIS de jogos encerrados, rode de
--   novo o bloco "do $$ ... $$" acima (ou re-salve o resultado no admin) para
--   recalcular os pontos daquele bolão.
-- • calc_prediction_points() continua existindo mas não é mais usada aqui.
-- ============================================================================
