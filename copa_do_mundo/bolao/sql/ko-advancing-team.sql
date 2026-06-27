-- ============================================================================
-- Bolão da Copa — Mata-mata: pontos de "quem avança" (8 pts) por time que passa
-- ----------------------------------------------------------------------------
-- Regra do regulamento: no mata-mata, os pontos de ko_correct_result (8 por
-- padrão) vão para quem ACERTA O TIME QUE AVANÇA — não apenas o sinal do placar.
--
-- Antes: ko_correct_result era dado quando o SINAL do placar batia
--   (vitória/empate/derrota). Problema: quem palpitava vitória de um time e o
--   jogo terminava empatado com esse time avançando nos pênaltis NÃO ganhava.
--
-- Agora:
--   • matches.advancing_team   = time que realmente avançou (vence no tempo
--     normal OU nos pênaltis). Preenchido pelo admin (set_match_result) e pelo
--     sync (score.winner da API).
--   • predictions.advancing_team = time que o usuário acha que avança. Só é
--     usado quando o palpite é EMPATE; em palpite com vencedor, o time que
--     avança é o próprio vencedor do placar.
--   • Os 8 pontos saem quando o time que o palpite faz avançar == advancing_team.
--   • Os demais pontos do KO (gols, saldo, placar exato) seguem pelo placar do
--     tempo normal, como antes.
--
-- Rode no Supabase → SQL Editor (com "No limit"). Idempotente.
-- ============================================================================

-- 1) Colunas novas ----------------------------------------------------------
alter table public.matches
  add column if not exists advancing_team text;

alter table public.predictions
  add column if not exists advancing_team text;

-- 2) Pontuação de placar por bolão (grupos + mata-mata) ---------------------
-- Igual ao match-scoring-per-pool.sql, mas o termo ko_correct_result passa a
-- comparar o TIME QUE AVANÇA (não o sinal do placar).
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
      -- "Quem avança": compara o time que o palpite faz avançar com quem avançou.
      --   palpite com vencedor → o próprio vencedor do placar palpitado
      --   palpite de empate     → o time escolhido pelo usuário (advancing_team)
      + (case when m.advancing_team is not null
               and (case when p.home_score > p.away_score then m.home_team
                         when p.away_score > p.home_score then m.away_team
                         else p.advancing_team end) = m.advancing_team
              then r.ko_correct_result else 0 end)
      + (case when (p.home_score - p.away_score) = (m.home_score - m.away_score) then r.ko_correct_diff else 0 end)
      + (case when p.home_score = m.home_score and p.away_score = m.away_score then r.ko_exact_score else 0 end)
    end,
    updated_at = now()
  from pool_scoring_rules r
  where p.match_id = p_match_id
    and r.pool_id = p.pool_id;
end;
$function$;

-- 3) set_match_result agora recebe o time que avançou ------------------------
-- Remove a versão antiga de 3 args para evitar ambiguidade com a nova (que tem
-- o 4º argumento com default).
drop function if exists public.set_match_result(uuid, integer, integer);

create or replace function public.set_match_result(
  p_match_id       uuid,
  p_home_score     integer,
  p_away_score     integer,
  p_advancing_team text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $function$
declare
  m matches;
  v_adv text;
begin
  if not exists (
    select 1 from public.profiles where id = auth.uid() and is_admin
  ) then
    raise exception 'Acesso restrito ao administrador.';
  end if;

  select * into m from public.matches where id = p_match_id;
  if not found then raise exception 'Partida não encontrada.'; end if;

  -- Quem avançou (só faz sentido no mata-mata).
  if m.phase = 'group' then
    v_adv := null;
  elsif p_advancing_team is not null and p_advancing_team <> '' then
    v_adv := p_advancing_team;          -- empate decidido nos pênaltis (admin escolhe)
  elsif p_home_score > p_away_score then
    v_adv := m.home_team;               -- vitória no tempo normal
  elsif p_away_score > p_home_score then
    v_adv := m.away_team;
  else
    v_adv := null;                      -- empate sem vencedor informado
  end if;

  update public.matches
     set home_score     = p_home_score,
         away_score     = p_away_score,
         advancing_team = v_adv,
         status         = 'finished'
   where id = p_match_id;

  perform public.update_match_predictions_points(p_match_id);
end;
$function$;

grant execute on function public.set_match_result(uuid, integer, integer, text) to authenticated;

-- 4) clear_match_result também limpa o time que avançou ----------------------
create or replace function public.clear_match_result(p_match_id text)
returns void
language plpgsql
security definer
set search_path = public
as $function$
begin
  if not exists (
    select 1 from public.profiles where id = auth.uid() and is_admin
  ) then
    raise exception 'Acesso restrito ao administrador.';
  end if;

  update public.predictions
     set points = null
   where match_id::text = p_match_id;

  update public.matches
     set home_score     = null,
         away_score     = null,
         advancing_team = null,
         status         = 'scheduled'
   where id::text = p_match_id;
end;
$function$;

grant execute on function public.clear_match_result(text) to authenticated;

-- 5) Recalcula os jogos já encerrados com a nova regra -----------------------
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

notify pgrst, 'reload schema';

-- ============================================================================
-- Observação: este script substitui set_match_result e update_match_predictions_points.
-- Se a sua versão atual de set_match_result fizer algo ALÉM de gravar o placar e
-- chamar update_match_predictions_points (ex.: pontuar classificação), avise para
-- mesclarmos antes de rodar. A versão acima segue o contrato usado pelo admin.
-- ============================================================================
