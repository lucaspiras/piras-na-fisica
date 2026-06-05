-- ============================================================================
-- Bolão da Copa — Trilha de auditoria de palpites
-- ----------------------------------------------------------------------------
-- Objetivo: registrar PARA SEMPRE toda alteração feita nos palpites dos
-- jogadores, para que nenhuma aposta possa ser perdida ou trocada sem rastro.
--
-- Cobre as duas tabelas onde o jogador realmente digita algo:
--   • predictions             (placares de cada jogo)
--   • tournament_predictions  (palpite de pódio: campeão, vice, 3º)
--
-- A cada INSERT/UPDATE/DELETE, um trigger grava em prediction_history o valor
-- ANTIGO e o NOVO, quem mudou (auth.uid()) e quando. Funciona mesmo se a
-- alteração vier de fora do app (chamada direta à API), porque vive no banco.
--
-- ⚠️ O histórico passa a valer a partir do momento em que você roda este SQL.
--    Não reconstrói o passado — daqui pra frente fica tudo rastreado.
--
-- Rode no Supabase → SQL Editor. É idempotente (pode rodar de novo sem medo).
-- ============================================================================

-- 1) Tabela de histórico ------------------------------------------------------
--    Guardamos pool_id / user_id / match_id como TEXT para não depender do tipo
--    exato das colunas de origem, e o conteúdo (placar / pódio) em JSONB.
create table if not exists public.prediction_history (
  id          bigint generated always as identity primary key,
  changed_at  timestamptz not null default now(),
  table_name  text        not null,   -- 'predictions' | 'tournament_predictions'
  operation   text        not null,   -- 'INSERT' | 'UPDATE' | 'DELETE'
  pool_id     text,
  user_id     text,                   -- de quem é o palpite
  match_id    text,                   -- só para predictions (null no pódio)
  changed_by  text,                   -- auth.uid() de quem fez a mudança
  old_data    jsonb,                  -- valor anterior (null em INSERT)
  new_data    jsonb                   -- valor novo (null em DELETE)
);

create index if not exists prediction_history_lookup
  on public.prediction_history (pool_id, user_id, match_id, changed_at desc);

-- Só a service_role (Edge Function admin) lê este histórico. O navegador dos
-- participantes não enxerga nada: RLS ligado e sem nenhuma policy de SELECT.
alter table public.prediction_history enable row level security;
revoke all on public.prediction_history from anon, authenticated;

-- 2) Trigger para PLACARES (predictions) -------------------------------------
create or replace function public.log_prediction_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_actor text := coalesce(auth.uid()::text, 'system');
begin
  if (tg_op = 'UPDATE') then
    -- Ignora recálculo puro de pontos: se o placar apostado não mudou, não loga.
    if new.home_score is not distinct from old.home_score
       and new.away_score is not distinct from old.away_score then
      return new;
    end if;
    insert into public.prediction_history
      (table_name, operation, pool_id, user_id, match_id, changed_by, old_data, new_data)
    values ('predictions', 'UPDATE',
      old.pool_id::text, old.user_id::text, old.match_id::text, v_actor,
      jsonb_build_object('home_score', old.home_score, 'away_score', old.away_score),
      jsonb_build_object('home_score', new.home_score, 'away_score', new.away_score));
    return new;

  elsif (tg_op = 'INSERT') then
    insert into public.prediction_history
      (table_name, operation, pool_id, user_id, match_id, changed_by, old_data, new_data)
    values ('predictions', 'INSERT',
      new.pool_id::text, new.user_id::text, new.match_id::text, v_actor,
      null,
      jsonb_build_object('home_score', new.home_score, 'away_score', new.away_score));
    return new;

  elsif (tg_op = 'DELETE') then
    insert into public.prediction_history
      (table_name, operation, pool_id, user_id, match_id, changed_by, old_data, new_data)
    values ('predictions', 'DELETE',
      old.pool_id::text, old.user_id::text, old.match_id::text, v_actor,
      jsonb_build_object('home_score', old.home_score, 'away_score', old.away_score),
      null);
    return old;
  end if;
  return null;
end;
$$;

drop trigger if exists trg_log_prediction_change on public.predictions;
create trigger trg_log_prediction_change
  after insert or update or delete on public.predictions
  for each row execute function public.log_prediction_change();

-- 3) Trigger para PÓDIO (tournament_predictions) -----------------------------
create or replace function public.log_tournament_prediction_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_actor text := coalesce(auth.uid()::text, 'system');
begin
  if (tg_op = 'UPDATE') then
    if new.pred_1st is not distinct from old.pred_1st
       and new.pred_2nd is not distinct from old.pred_2nd
       and new.pred_3rd is not distinct from old.pred_3rd then
      return new;
    end if;
    insert into public.prediction_history
      (table_name, operation, pool_id, user_id, match_id, changed_by, old_data, new_data)
    values ('tournament_predictions', 'UPDATE',
      old.pool_id::text, old.user_id::text, null, v_actor,
      jsonb_build_object('pred_1st', old.pred_1st, 'pred_2nd', old.pred_2nd, 'pred_3rd', old.pred_3rd),
      jsonb_build_object('pred_1st', new.pred_1st, 'pred_2nd', new.pred_2nd, 'pred_3rd', new.pred_3rd));
    return new;

  elsif (tg_op = 'INSERT') then
    insert into public.prediction_history
      (table_name, operation, pool_id, user_id, match_id, changed_by, old_data, new_data)
    values ('tournament_predictions', 'INSERT',
      new.pool_id::text, new.user_id::text, null, v_actor,
      null,
      jsonb_build_object('pred_1st', new.pred_1st, 'pred_2nd', new.pred_2nd, 'pred_3rd', new.pred_3rd));
    return new;

  elsif (tg_op = 'DELETE') then
    insert into public.prediction_history
      (table_name, operation, pool_id, user_id, match_id, changed_by, old_data, new_data)
    values ('tournament_predictions', 'DELETE',
      old.pool_id::text, old.user_id::text, null, v_actor,
      jsonb_build_object('pred_1st', old.pred_1st, 'pred_2nd', old.pred_2nd, 'pred_3rd', old.pred_3rd),
      null);
    return old;
  end if;
  return null;
end;
$$;

drop trigger if exists trg_log_tournament_prediction_change on public.tournament_predictions;
create trigger trg_log_tournament_prediction_change
  after insert or update or delete on public.tournament_predictions
  for each row execute function public.log_tournament_prediction_change();

-- ============================================================================
-- Pronto. Para conferir manualmente depois de algumas apostas:
--   select changed_at, table_name, operation, user_id, match_id, old_data, new_data
--   from public.prediction_history order by changed_at desc limit 50;
-- ============================================================================
