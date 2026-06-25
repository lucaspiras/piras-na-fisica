/**
 * Sync World Cup 2026 matches from football-data.org into Supabase.
 *
 * Setup:
 *   1. Create a file called .env in this folder with:
 *        FOOTBALL_DATA_API_KEY=sua_chave_aqui
 *        SUPABASE_URL=https://SEU_PROJETO.supabase.co
 *        SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui
 *
 *   2. Run: node sync.mjs
 *
 * The service role key is in Supabase → Project Settings → API → service_role.
 * Keep it secret — it bypasses Row Level Security.
 */

import { readFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'

// ── Read .env ───────────────────────────────────────────────
let env = {}
try {
  env = Object.fromEntries(
    readFileSync(new URL('.env', import.meta.url), 'utf8')
      .split('\n')
      .filter(l => l.trim() && !l.startsWith('#'))
      .map(l => l.split('=').map(s => s.trim()))
      .filter(([k]) => k)
  )
} catch {
  console.error('❌  Arquivo .env não encontrado. Crie-o com as variáveis necessárias.')
  process.exit(1)
}

const {
  FOOTBALL_DATA_API_KEY,
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
} = env

if (!FOOTBALL_DATA_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌  Faltam variáveis no .env: FOOTBALL_DATA_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

// ── Mapeamento de fase ──────────────────────────────────────
// Stages da API → phase e group_name internos.
// group_name para ko = o próprio stage (koRoundLabel no front traduz para PT-BR).
function stageToPhase(stage) {
  if (stage === 'GROUP_STAGE') return 'group'
  return 'ko'
}

function stageToGroupName(stage, apiGroup) {
  if (stage === 'GROUP_STAGE') return apiGroup?.replace('GROUP_', '') ?? null
  return stage  // ex.: 'LAST_32', 'ROUND_OF_16', 'QUARTER_FINALS', etc.
}

// ── Fetch from football-data.org ────────────────────────────
console.log('🌐  Buscando partidas da Copa 2026…')
const resp = await fetch(
  'https://api.football-data.org/v4/competitions/WC/matches?season=2026',
  { headers: { 'X-Auth-Token': FOOTBALL_DATA_API_KEY } }
)

if (!resp.ok) {
  const body = await resp.text()
  console.error(`❌  API retornou ${resp.status}:`, body)
  process.exit(1)
}

const { matches: allMatches } = await resp.json()
console.log(`📋  ${allMatches?.length ?? 0} partidas encontradas no total.`)

const byStage = {}
for (const m of allMatches ?? []) {
  const s = m.stage ?? 'UNKNOWN'
  byStage[s] = (byStage[s] ?? 0) + 1
}
console.log('     Distribuição por fase:', byStage)

// ── Upsert into Supabase ────────────────────────────────────
let updated = 0, failed = 0

for (const m of allMatches ?? []) {
  const homeScore = m.score?.fullTime?.home ?? null
  const awayScore = m.score?.fullTime?.away ?? null
  const status =
    m.status === 'FINISHED'                              ? 'finished'
    : (m.status === 'IN_PLAY' || m.status === 'PAUSED') ? 'live'
    : 'scheduled'

  const phase     = stageToPhase(m.stage)
  const groupName = stageToGroupName(m.stage, m.group)

  const { data: upserted, error } = await supabase
    .from('matches')
    .upsert({
      external_id:  String(m.id),
      match_date:   m.utcDate,
      home_team:    m.homeTeam?.name ?? 'TBD',
      away_team:    m.awayTeam?.name ?? 'TBD',
      home_score:   homeScore,
      away_score:   awayScore,
      phase,
      group_name:   groupName,
      match_number: m.matchday ?? 0,
      venue:        m.venue ?? null,
      status,
    }, { onConflict: 'external_id' })
    .select('id')
    .maybeSingle()

  if (error) {
    console.warn(`  ⚠️  Erro na partida ${m.id} (${m.stage}):`, error.message)
    failed++
    continue
  }

  const stageLabel = phase === 'group' ? `Grupo ${groupName}` : (m.stage ?? 'ko')
  const teams = `${m.homeTeam?.name ?? 'TBD'} × ${m.awayTeam?.name ?? 'TBD'}`
  console.log(`  ✓  [${stageLabel}] ${teams}${homeScore !== null ? ` — ${homeScore}:${awayScore}` : ''}`)
  updated++

  // Recalculate points for finished matches
  if (upserted && homeScore !== null && awayScore !== null && status === 'finished') {
    await supabase.rpc('update_match_predictions_points', { p_match_id: upserted.id })
  }
}

console.log(`\n✅  Concluído: ${updated} atualizadas, ${failed} erros.`)
