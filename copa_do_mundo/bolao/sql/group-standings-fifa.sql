-- ============================================================================
-- Bolão da Copa — Classificação real dos grupos (desempate FIFA 2026 + override)
-- ----------------------------------------------------------------------------
-- 1) Recria a view public.group_standings_actual com os critérios de desempate
--    oficiais da FIFA, NA MESMA ORDEM da classificação prevista (JS):
--      a) pontos no total
--      b) confronto direto entre as EMPATADAS: pontos → saldo → gols entre elas
--      c) saldo de gols geral
--      d) gols marcados geral
--      e) nome da equipe (determinístico, no lugar do sorteio)
--    Fair play NÃO é calculado (não temos cartões).
--
-- 2) Adiciona OVERRIDE do admin: como fair play / sorteio não dá para simular,
--    o organizador pode fixar manualmente a posição final ao fim da fase de
--    grupos. Quando há override, ele vence o cálculo automático.
--      • public.group_standings_override        → posição dentro do grupo (1–4)
--      • public.third_place_ranking_override     → ordem relativa entre os 3ºs
--    E cria a view public.third_place_standings, que ranqueia os 3ºs colocados
--    entre si (também respeitando o override).
--
-- Colunas de group_standings_actual: group_name, team, position, pts, gf, ga, gd
-- (as mesmas que standings.html e admin.html já consomem).
--
-- ----------------------------------------------------------------------------
-- ⚠️ ANTES DE RODAR:
--   1. Guarde a definição atual, para reverter se precisar:
--        select pg_get_viewdef('public.group_standings_actual', true);
--   2. Assume que group_standings_actual é VIEW. Se for tabela / materialized
--      view, o DROP falha — me avise o erro antes de continuar.
--   3. Se o DROP reclamar de dependências, cole o erro aqui.
--
-- Rode no Supabase → SQL Editor. Idempotente.
-- ============================================================================

-- third_place_standings depende de group_standings_actual: removê-la primeiro.
drop view if exists public.third_place_standings;
drop view if exists public.group_standings_actual;

-- ────────────────────────────────────────────────────────────────────────────
-- Tabelas de override (ajuste manual do admin)
-- ────────────────────────────────────────────────────────────────────────────

-- Posição final de um time dentro do grupo. Para sobrescrever um grupo, defina
-- os 4 times (1 a 4); times sem override mantêm a posição calculada.
create table if not exists public.group_standings_override (
  group_name text not null,
  team       text not null,
  position   int  not null check (position between 1 and 4),
  updated_at timestamptz not null default now(),
  primary key (group_name, team)
);

-- Ordem relativa entre os 3ºs colocados (1 = melhor 3º). Uma linha por grupo.
create table if not exists public.third_place_ranking_override (
  group_name text primary key,
  rank       int  not null check (rank >= 1),
  updated_at timestamptz not null default now()
);

-- Segurança: só o admin (profiles.is_admin) escreve; leitura é feita via views.
do $$
begin
  -- group_standings_override
  execute 'alter table public.group_standings_override enable row level security';
  execute 'grant select, insert, update, delete on public.group_standings_override to authenticated';
  execute 'drop policy if exists gso_admin_all on public.group_standings_override';
  execute $p$create policy gso_admin_all on public.group_standings_override
            for all
            using      (exists (select 1 from public.profiles where id = auth.uid() and is_admin))
            with check (exists (select 1 from public.profiles where id = auth.uid() and is_admin))$p$;

  -- third_place_ranking_override
  execute 'alter table public.third_place_ranking_override enable row level security';
  execute 'grant select, insert, update, delete on public.third_place_ranking_override to authenticated';
  execute 'drop policy if exists tpro_admin_all on public.third_place_ranking_override';
  execute $p$create policy tpro_admin_all on public.third_place_ranking_override
            for all
            using      (exists (select 1 from public.profiles where id = auth.uid() and is_admin))
            with check (exists (select 1 from public.profiles where id = auth.uid() and is_admin))$p$;
end $$;

-- ────────────────────────────────────────────────────────────────────────────
-- View: classificação real dos grupos (cálculo FIFA + override)
-- ────────────────────────────────────────────────────────────────────────────
create view public.group_standings_actual as
with
-- Só jogos da fase de grupos já encerrados e com placar.
finished as (
  select group_name, home_team, away_team, home_score, away_score
  from public.matches
  where phase = 'group'
    and status = 'finished'
    and home_score is not null
    and away_score is not null
),
-- Formato "longo": uma linha por time em cada jogo.
results as (
  select group_name, home_team as team, away_team as opp,
         home_score as gf, away_score as ga
  from finished
  union all
  select group_name, away_team as team, home_team as opp,
         away_score as gf, home_score as ga
  from finished
),
-- Todos os times de cada grupo (mesmo os que ainda não jogaram).
roster as (
  select distinct group_name, home_team as team
  from public.matches where phase = 'group' and home_team is not null and home_team <> 'TBD'
  union
  select distinct group_name, away_team as team
  from public.matches where phase = 'group' and away_team is not null and away_team <> 'TBD'
),
-- Totais gerais por time.
totals as (
  select ro.group_name, ro.team,
    coalesce(sum(case when r.gf > r.ga then 3 when r.gf = r.ga then 1 else 0 end), 0) as pts,
    coalesce(sum(r.gf), 0)        as gf,
    coalesce(sum(r.ga), 0)        as ga,
    coalesce(sum(r.gf - r.ga), 0) as gd
  from roster ro
  left join results r
    on r.group_name = ro.group_name and r.team = ro.team
  group by ro.group_name, ro.team
),
-- Conjunto de times empatados em pontos com cada time (no grupo).
-- array_agg como função de JANELA: junta todos os times da mesma faixa de
-- pontos do grupo (inclui o próprio; ele nunca joga contra si mesmo).
blocks as (
  select t.*,
    array_agg(t.team) over (partition by t.group_name, t.pts) as tied_teams
  from totals t
),
-- Confronto direto: só os jogos contra os times empatados em pontos.
h2h as (
  select b.group_name, b.team,
    coalesce(sum(case when r.gf > r.ga then 3 when r.gf = r.ga then 1 else 0 end), 0) as h_pts,
    coalesce(sum(r.gf - r.ga), 0) as h_gd,
    coalesce(sum(r.gf), 0)        as h_gf
  from blocks b
  left join results r
    on  r.group_name = b.group_name
    and r.team = b.team
    and r.opp  = any(b.tied_teams)
  group by b.group_name, b.team
),
computed as (
  select
    b.group_name, b.team, b.pts, b.gf, b.ga, b.gd,
    row_number() over (
      partition by b.group_name
      order by
        b.pts   desc,   -- a) pontos no total
        h.h_pts desc,   -- b) confronto direto: pontos
        h.h_gd  desc,   --    confronto direto: saldo
        h.h_gf  desc,   --    confronto direto: gols
        b.gd    desc,   -- c) saldo geral
        b.gf    desc,   -- d) gols geral
        b.team  asc     -- e) nome (determinístico)
    )::int as computed_position
  from blocks b
  join h2h h on h.group_name = b.group_name and h.team = b.team
)
select
  c.group_name,
  c.team,
  coalesce(o.position, c.computed_position) as position,  -- override vence o cálculo
  c.pts, c.gf, c.ga, c.gd
from computed c
left join public.group_standings_override o
  on o.group_name = c.group_name and o.team = c.team;

grant select on public.group_standings_actual to anon, authenticated;

-- ────────────────────────────────────────────────────────────────────────────
-- View: ranking dos 3ºs colocados entre si (cálculo + override)
--   Não há confronto direto entre 3ºs (são de grupos diferentes): usa
--   saldo geral → gols geral → nome. `qualified` indica se o grupo já foi
--   marcado como classificado na aba "3ºs Colocados" (qualified_3rd_places).
-- ────────────────────────────────────────────────────────────────────────────
create view public.third_place_standings as
with thirds as (
  select group_name, team, pts, gf, ga, gd
  from public.group_standings_actual
  where position = 3
),
ranked as (
  select t.*,
    exists (select 1 from public.qualified_3rd_places q where q.group_name = t.group_name) as qualified,
    row_number() over (
      order by t.pts desc, t.gd desc, t.gf desc, t.team asc
    )::int as computed_rank
  from thirds t
)
select
  r.group_name,
  r.team,
  coalesce(o.rank, r.computed_rank) as rank,   -- override vence o cálculo
  r.pts, r.gf, r.ga, r.gd, r.qualified
from ranked r
left join public.third_place_ranking_override o
  on o.group_name = r.group_name;

grant select on public.third_place_standings to anon, authenticated;

-- ============================================================================
-- COMO USAR O OVERRIDE (enquanto não há botão no admin)
-- ----------------------------------------------------------------------------
-- Ajustar as posições de um grupo (ex.: Grupo A decidido no fair play).
-- Defina os 4 times; o upsert permite corrigir depois:
--
--   insert into public.group_standings_override (group_name, team, position) values
--     ('A', 'Brazil',  1),
--     ('A', 'Mexico',  2),
--     ('A', 'Croatia', 3),
--     ('A', 'Cameroon',4)
--   on conflict (group_name, team)
--   do update set position = excluded.position, updated_at = now();
--
-- Voltar um grupo ao cálculo automático (remover o override):
--   delete from public.group_standings_override where group_name = 'A';
--
-- Ajustar a ordem relativa entre 3ºs colocados (1 = melhor 3º):
--   insert into public.third_place_ranking_override (group_name, rank) values
--     ('A', 1), ('C', 2)
--   on conflict (group_name)
--   do update set rank = excluded.rank, updated_at = now();
--
-- Conferir o resultado:
--   select group_name, position, team, pts, gd, gf
--   from public.group_standings_actual order by group_name, position;
--   select rank, group_name, team, qualified
--   from public.third_place_standings order by rank;
-- ============================================================================
