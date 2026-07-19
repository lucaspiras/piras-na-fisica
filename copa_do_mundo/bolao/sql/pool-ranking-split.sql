-- Bolão — placar com as pontuações separadas
--
-- Antes, pool_ranking devolvia tudo que não fosse jogo numa coluna só
-- (class_points = classificação de grupos + melhores 3ºs + pódio), então o
-- placar mostrava apenas "jogos + resto". Agora separa em três blocos:
--   match_points  → jogos (palpites de placar)
--   group_points  → classificação dos grupos (inclui melhores 3ºs)
--   podium_points → pódio (campeão, vice e 3º lugar)
--
-- class_points continua existindo (grupos + pódio somados) para não quebrar
-- nada que ainda dependa dela.

drop function if exists pool_ranking(uuid);

create function pool_ranking(p uuid)
returns table(
  user_id uuid, display_name text,
  total_points bigint, match_points bigint, class_points bigint,
  group_points bigint, podium_points bigint,
  prediction_count bigint, placement bigint
)
language sql
security definer
set search_path to 'public'
as $fn$
  select pm.user_id, pr.display_name,
    (coalesce(sum(pred.points),0)
      + coalesce(cs.classification_pts,0) + coalesce(cs.best3rd_pts,0)
      + coalesce(cs.tournament_pts,0))::bigint as total_points,

    coalesce(sum(pred.points),0)::bigint as match_points,

    -- compatibilidade: grupos + pódio somados (uso antigo)
    (coalesce(cs.classification_pts,0) + coalesce(cs.best3rd_pts,0)
      + coalesce(cs.tournament_pts,0))::bigint as class_points,

    -- classificação dos grupos (com os melhores 3ºs)
    (coalesce(cs.classification_pts,0) + coalesce(cs.best3rd_pts,0))::bigint as group_points,

    -- pódio: campeão, vice e terceiro
    coalesce(cs.tournament_pts,0)::bigint as podium_points,

    count(pred.id) filter (where pred.points is not null) as prediction_count,

    rank() over (order by
      coalesce(sum(pred.points),0)
      + coalesce(cs.classification_pts,0) + coalesce(cs.best3rd_pts,0)
      + coalesce(cs.tournament_pts,0) desc
    ) as placement
  from pool_members pm
  join profiles pr on pr.id = pm.user_id
  left join predictions pred
    on pred.user_id = pm.user_id and pred.pool_id = p and pred.points is not null
  left join classification_scores cs
    on cs.user_id = pm.user_id and cs.pool_id = p
  where pm.pool_id = p
  group by pm.user_id, pr.display_name, cs.classification_pts, cs.best3rd_pts, cs.tournament_pts
  order by total_points desc;
$fn$;

grant execute on function pool_ranking(uuid) to anon, authenticated, service_role;
