-- ============================================================================
-- Bolão da Copa — Travas de prazo das apostas (enforcement no servidor)
-- ----------------------------------------------------------------------------
-- A trava visual no app não basta: alguém poderia mandar um palpite direto pela
-- API depois do prazo. Estes triggers garantem o prazo NO BANCO:
--
--   1) PLACAR (predictions): só pode inserir/alterar até 2h antes do início
--      previsto da partida (matches.match_date) e enquanto o jogo não começou.
--   2) PÓDIO (tournament_predictions): só até o início da Copa — definido como
--      o horário da 1ª partida da fase de grupos (= 11/06/2026).
--
-- Os triggers IGNORAM o recálculo de pontos (update que não muda o palpite),
-- para não bloquear a pontuação automática nem o admin.
--
-- Rode no Supabase → SQL Editor. Idempotente.
-- ============================================================================

-- 1) PLACAR ------------------------------------------------------------------
create or replace function public.enforce_prediction_deadline()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  k  timestamptz;
  st text;
begin
  -- Ignora updates que NÃO mudam o palpite (ex.: recálculo de points).
  if tg_op = 'UPDATE'
     and new.home_score is not distinct from old.home_score
     and new.away_score is not distinct from old.away_score then
    return new;
  end if;

  select match_date, status into k, st from public.matches where id = new.match_id;
  if k is null then return new; end if;  -- jogo desconhecido: não bloqueia

  if st in ('finished', 'live') or now() >= k - interval '2 hours' then
    raise exception 'Apostas encerradas para esta partida (fecham 2h antes do início).'
      using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_enforce_prediction_deadline on public.predictions;
create trigger trg_enforce_prediction_deadline
  before insert or update on public.predictions
  for each row execute function public.enforce_prediction_deadline();

-- 2) PÓDIO -------------------------------------------------------------------
create or replace function public.enforce_tournament_deadline()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  first_kick timestamptz;
begin
  -- Ignora updates que NÃO mudam o palpite de pódio.
  if tg_op = 'UPDATE'
     and new.pred_1st is not distinct from old.pred_1st
     and new.pred_2nd is not distinct from old.pred_2nd
     and new.pred_3rd is not distinct from old.pred_3rd then
    return new;
  end if;

  -- Início da Copa = 1ª partida da fase de grupos (11/06/2026).
  select min(match_date) into first_kick from public.matches where phase = 'group';

  if first_kick is not null and now() >= first_kick then
    raise exception 'Apostas de pódio encerradas (fecham no início da Copa).'
      using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_enforce_tournament_deadline on public.tournament_predictions;
create trigger trg_enforce_tournament_deadline
  before insert or update on public.tournament_predictions
  for each row execute function public.enforce_tournament_deadline();

-- ============================================================================
-- Teste rápido (deve FALHAR se o jogo começa em menos de 2h ou já passou):
--   insert into predictions (user_id, match_id, pool_id, home_score, away_score)
--   values ('<uid>', '<match_que_comeca_logo>', '<pool>', 1, 0);
-- ============================================================================
