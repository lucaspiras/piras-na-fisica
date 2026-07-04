-- Gincana — Quiz ao vivo · Schema + RLS + Realtime
-- Rodar no Supabase SQL Editor (projeto zmbgprapzgvpnmbtrakp).
-- Reaproveita a tabela `profiles` do bolão: cada EQUIPE é um profile (login).
-- O apresentador é um profile com is_admin = true.

-- ── Tabelas ──────────────────────────────────────────────────────────────

create table if not exists quiz_games (
  id               uuid primary key default gen_random_uuid(),
  name             text not null default 'Gincana',
  status           text not null default 'setup'
                     check (status in ('setup','group','knockout','finished')),
  question_seconds int  not null default 30,
  ko_questions     int  not null default 3,
  created_by       uuid references profiles(id),
  created_at       timestamptz not null default now()
);

create table if not exists quiz_teams (
  game_id    uuid references quiz_games(id) on delete cascade,
  team_id    uuid references profiles(id)   on delete cascade,
  seed       int,                 -- posição no ranking (definida ao montar o mata-mata)
  eliminated boolean not null default false,
  primary key (game_id, team_id)
);

create table if not exists quiz_questions (
  id          uuid primary key default gen_random_uuid(),
  game_id     uuid references quiz_games(id) on delete cascade,
  phase       text not null check (phase in ('group','knockout','extra')),
  ord         int  not null default 0,       -- ordem/numeração (1..20 na fase de grupos)
  points      int  not null default 0,       -- 10 ou 20 na fase de grupos
  text        text not null,
  options     jsonb not null,                -- [{"key":"A","label":"..."}, ...]
  correct_key text not null,                 -- SENSÍVEL: nunca vai ao cliente antes da revelação
  created_at  timestamptz not null default now()
);
create index if not exists quiz_questions_game_idx on quiz_questions(game_id, phase, ord);

create table if not exists quiz_matches (
  id       uuid primary key default gen_random_uuid(),
  game_id  uuid references quiz_games(id) on delete cascade,
  round    text not null check (round in ('quarter','semi','final')),
  slot     int  not null,                    -- posição dentro da rodada
  team_a   uuid references profiles(id),
  team_b   uuid references profiles(id),
  winner   uuid references profiles(id),
  points   int  not null default 0,          -- 25 / 50 / 100
  status   text not null default 'pending'
             check (status in ('pending','running','done')),
  created_at timestamptz not null default now()
);
create index if not exists quiz_matches_game_idx on quiz_matches(game_id, round, slot);

create table if not exists quiz_answers (
  id          uuid primary key default gen_random_uuid(),
  game_id     uuid references quiz_games(id) on delete cascade,
  question_id uuid references quiz_questions(id) on delete cascade,
  team_id     uuid references profiles(id) on delete cascade,
  match_id    uuid references quiz_matches(id) on delete set null,  -- nulo na fase de grupos
  choice_key  text not null,
  is_correct  boolean not null,
  answered_at timestamptz not null default now(),   -- horário do servidor
  response_ms int not null default 0,               -- tempo de resposta (ms), p/ desempate
  unique (question_id, team_id)                      -- uma resposta por equipe por pergunta
);
create index if not exists quiz_answers_game_idx  on quiz_answers(game_id);
create index if not exists quiz_answers_match_idx on quiz_answers(match_id);

-- Linha única de controle ao vivo por jogo (assinada por Realtime).
-- Campos da pergunta são DENORMALIZADOS aqui (sem a resposta) para as equipes
-- renderizarem direto do estado; a resposta só aparece em reveal_correct_key na revelação.
create table if not exists quiz_state (
  game_id             uuid primary key references quiz_games(id) on delete cascade,
  phase               text not null default 'group',
  question_status     text not null default 'idle'
                        check (question_status in ('idle','shown','open','revealed')),
  current_question_id uuid references quiz_questions(id) on delete set null,
  q_ord     int,
  q_phase   text,
  q_points  int,
  q_text    text,
  q_options jsonb,
  question_started_at timestamptz,
  question_seconds    int not null default 30,
  reveal_correct_key  text,                 -- preenchido só quando revelada
  -- contexto do mata-mata (denormalizado)
  match_id      uuid references quiz_matches(id) on delete set null,
  match_round   text,
  match_slot    int,
  match_team_a  uuid references profiles(id),
  match_team_b  uuid references profiles(id),
  match_q_index int,                        -- 1..3
  updated_at    timestamptz not null default now()
);

-- ── RLS ──────────────────────────────────────────────────────────────────
alter table quiz_games     enable row level security;
alter table quiz_teams     enable row level security;
alter table quiz_questions enable row level security;
alter table quiz_matches   enable row level security;
alter table quiz_answers   enable row level security;
alter table quiz_state     enable row level security;

-- Helper: is_admin do chamador
create or replace function quiz_is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select is_admin from profiles where id = auth.uid()), false);
$$;

-- Admin pode tudo (o apresentador monta e controla direto pelo cliente).
drop policy if exists quiz_games_admin  on quiz_games;
drop policy if exists quiz_teams_admin  on quiz_teams;
drop policy if exists quiz_quest_admin  on quiz_questions;
drop policy if exists quiz_match_admin  on quiz_matches;
drop policy if exists quiz_answ_admin   on quiz_answers;
drop policy if exists quiz_state_admin  on quiz_state;
create policy quiz_games_admin  on quiz_games     for all using (quiz_is_admin()) with check (quiz_is_admin());
create policy quiz_teams_admin  on quiz_teams     for all using (quiz_is_admin()) with check (quiz_is_admin());
create policy quiz_quest_admin  on quiz_questions for all using (quiz_is_admin()) with check (quiz_is_admin());
create policy quiz_match_admin  on quiz_matches   for all using (quiz_is_admin()) with check (quiz_is_admin());
create policy quiz_answ_admin   on quiz_answers   for all using (quiz_is_admin()) with check (quiz_is_admin());
create policy quiz_state_admin  on quiz_state     for all using (quiz_is_admin()) with check (quiz_is_admin());

-- Equipes (autenticadas) LEEM apenas o que é público do jogo (sem perguntas/respostas).
drop policy if exists quiz_games_read on quiz_games;
drop policy if exists quiz_teams_read on quiz_teams;
drop policy if exists quiz_match_read on quiz_matches;
drop policy if exists quiz_state_read on quiz_state;
create policy quiz_games_read on quiz_games   for select to authenticated using (true);
create policy quiz_teams_read on quiz_teams   for select to authenticated using (true);
create policy quiz_match_read on quiz_matches for select to authenticated using (true);
create policy quiz_state_read on quiz_state   for select to authenticated using (true);
-- Obs.: quiz_questions e quiz_answers NÃO têm policy de leitura para equipes.
-- A pergunta atual chega às equipes pelo quiz_state (denormalizado, sem resposta);
-- respostas são gravadas via RPC quiz_submit_answer (SECURITY DEFINER) e os totais
-- vêm da RPC quiz_scoreboard. Assim a resposta certa nunca vaza antes da revelação.

-- ── Realtime ─────────────────────────────────────────────────────────────
-- As equipes assinam quiz_state (e a chave do mata-mata) para reagir na hora.
do $$ begin
  if not exists (select 1 from pg_publication_tables
                 where pubname='supabase_realtime' and schemaname='public' and tablename='quiz_state') then
    alter publication supabase_realtime add table quiz_state;
  end if;
  if not exists (select 1 from pg_publication_tables
                 where pubname='supabase_realtime' and schemaname='public' and tablename='quiz_matches') then
    alter publication supabase_realtime add table quiz_matches;
  end if;
  if not exists (select 1 from pg_publication_tables
                 where pubname='supabase_realtime' and schemaname='public' and tablename='quiz_teams') then
    alter publication supabase_realtime add table quiz_teams;
  end if;
end $$;
