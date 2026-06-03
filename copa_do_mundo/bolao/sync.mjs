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
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

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
const groupMatches = (allMatches ?? []).filter(m => m.stage === 'GROUP_STAGE')
console.log(`📋  ${groupMatches.length} partidas da fase de grupos encontradas.`)

// ── Upsert into Supabase ────────────────────────────────────
let updated = 0, failed = 0

for (const m of groupMatches) {
  const homeScore = m.score?.fullTime?.home ?? null
  const awayScore = m.score?.fullTime?.away ?? null
  const status =
    m.status === 'FINISHED'                              ? 'finished'
    : (m.status === 'IN_PLAY' || m.status === 'PAUSED') ? 'live'
    : 'scheduled'

  const { data: upserted, error } = await supabase
    .from('matches')
    .upsert({
      external_id:  String(m.id),
      match_date:   m.utcDate,
      home_team:    m.homeTeam?.name ?? 'TBD',
      away_team:    m.awayTeam?.name ?? 'TBD',
      home_score:   homeScore,
      away_score:   awayScore,
      phase:        'group',
      group_name:   m.group?.replace('GROUP_', '') ?? null,
      match_number: m.matchday ?? 0,
      venue:        m.venue ?? null,
      status,
    }, { onConflict: 'external_id' })
    .select('id')
    .maybeSingle()

  if (error) {
    console.warn(`  ⚠️  Erro na partida ${m.id}:`, error.message)
    failed++
    continue
  }
  updated++

  // Recalculate points for finished matches
  if (upserted && homeScore !== null && awayScore !== null && status === 'finished') {
    await supabase.rpc('update_match_predictions_points', { p_match_id: upserted.id })
  }
}

console.log(`\n✅  Concluído: ${updated} atualizadas, ${failed} erros.`)
