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

// ── Times já gravados (para preservar mata-mata definido manualmente) ──
// A API devolve os confrontos de mata-mata como TBD até a FIFA definir a chave.
// Se já houver um time gravado no banco, não o sobrescrevemos com 'TBD'.
const existingTeams = {}
{
  const { data: existing, error: exErr } = await supabase
    .from('matches')
    .select('external_id,home_team,away_team')
  if (exErr) {
    console.warn('  ⚠️  Não foi possível ler os times existentes:', exErr.message)
  } else {
    for (const e of existing ?? []) {
      existingTeams[e.external_id] = { home: e.home_team, away: e.away_team }
    }
  }
}

// ── Upsert into Supabase ────────────────────────────────────
let updated = 0, failed = 0

for (const m of allMatches ?? []) {
  // O placar deve ser o TOTAL APÓS A PRORROGAÇÃO. Em jogos decididos nos pênaltis,
  // a API soma os pênaltis no fullTime — então usamos regularTime + extraTime.
  // Os pênaltis só definem quem avançou (advancing_team), abaixo.
  let homeScore = m.score?.fullTime?.home ?? null
  let awayScore = m.score?.fullTime?.away ?? null
  if (m.score?.penalties) {
    const rt = m.score.regularTime ?? { home: 0, away: 0 }
    const et = m.score.extraTime   ?? { home: 0, away: 0 }
    homeScore = (rt.home ?? 0) + (et.home ?? 0)
    awayScore = (rt.away ?? 0) + (et.away ?? 0)
  }
  const status =
    m.status === 'FINISHED'                              ? 'finished'
    : (m.status === 'IN_PLAY' || m.status === 'PAUSED') ? 'live'
    : 'scheduled'

  const phase     = stageToPhase(m.stage)
  const groupName = stageToGroupName(m.stage, m.group)

  // Preserva times já gravados quando a API ainda devolve TBD (null).
  const prev      = existingTeams[String(m.id)]
  const homeTeam  = m.homeTeam?.name ?? prev?.home ?? 'TBD'
  const awayTeam  = m.awayTeam?.name ?? prev?.away ?? 'TBD'

  // Mata-mata encerrado: quem avançou (score.winner cobre vitória nos pênaltis).
  let advancingTeam = null
  if (phase === 'ko' && status === 'finished') {
    if (m.score?.winner === 'HOME_TEAM')      advancingTeam = homeTeam
    else if (m.score?.winner === 'AWAY_TEAM') advancingTeam = awayTeam
  }

  const { data: upserted, error } = await supabase
    .from('matches')
    .upsert({
      external_id:    String(m.id),
      match_date:     m.utcDate,
      home_team:      homeTeam,
      away_team:      awayTeam,
      advancing_team: advancingTeam,
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
  const teams = `${homeTeam} × ${awayTeam}`
  console.log(`  ✓  [${stageLabel}] ${teams}${homeScore !== null ? ` — ${homeScore}:${awayScore}` : ''}`)
  updated++

  // Recalculate points for finished matches
  if (upserted && homeScore !== null && awayScore !== null && status === 'finished') {
    await supabase.rpc('update_match_predictions_points', { p_match_id: upserted.id })
  }
}

console.log(`\n✅  Concluído: ${updated} atualizadas, ${failed} erros.`)
