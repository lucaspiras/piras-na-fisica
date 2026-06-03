import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const SUPABASE_URL      = 'https://zmbgprapzgvpnmbtrakp.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_Zh1Kq8RsRjK1OUiGsVTVkw_AhkMK275'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

/* ── Auth helpers ──────────────────────────────────────────── */

export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function requireAuth(redirectTo = 'login.html') {
  const user = await getUser()
  if (!user) { location.href = redirectTo; return null }
  return user
}

export async function getProfile(userId) {
  const { data } = await supabase
    .from('profiles')
    .select('id, display_name, is_admin, avatar')
    .eq('id', userId)
    .maybeSingle()
  return data
}

export async function requireAuthWithProfile(redirectTo = 'login.html') {
  const user = await requireAuth(redirectTo)
  if (!user) return null
  const profile = await getProfile(user.id)
  if (!profile) { location.href = 'onboarding.html'; return null }
  return { user, profile }
}

export async function requireAdmin() {
  const result = await requireAuthWithProfile()
  if (!result) return null
  if (!result.profile.is_admin) { location.href = 'dashboard.html'; return null }
  return result
}

export async function signOut() {
  await supabase.auth.signOut()
  location.href = 'login.html'
}

/* ── UI helpers ────────────────────────────────────────────── */

export function renderHeader(profile, showAdmin = false) {
  const adminLink = (showAdmin && profile.is_admin)
    ? `<a href="admin.html" class="header-link">Admin</a>`
    : ''
  const avatar = escHtml(profile.avatar || '⚽')
  return `
    <header class="header">
      <div class="header-inner">
        <a href="dashboard.html" class="header-brand">Bolão<span>⚽</span></a>
        <div class="header-right">
          ${adminLink}
          <a href="profile.html" class="header-user-link" title="Meu perfil">
            <span class="header-avatar">${avatar}</span>
            <span class="header-name">${escHtml(profile.display_name)}</span>
          </a>
          <button class="btn-signout" id="btn-signout">Sair</button>
        </div>
      </div>
    </header>`
}

export function renderPoolNav(poolId, activePage) {
  const items = [
    { id: 'palpites', label: 'Palpites',  href: `pool.html?id=${poolId}` },
    { id: 'grupos',   label: 'Grupos',    href: `standings.html?pool=${poolId}` },
    { id: 'podio',    label: '🏆 Pódio', href: `tournament.html?pool=${poolId}` },
  ]
  return `<nav class="pool-nav">
    ${items.map(i => `<a href="${i.href}" class="pool-nav-item${i.id === activePage ? ' active' : ''}">${i.label}</a>`).join('')}
  </nav>`
}

export function bindSignOut() {
  document.getElementById('btn-signout')?.addEventListener('click', signOut)
}

export function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;')
}

export function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric'
  })
}

export function fmtTime(iso) {
  return new Date(iso).toLocaleTimeString('pt-BR', {
    hour: '2-digit', minute: '2-digit'
  })
}

export function fmtDateTime(iso) {
  return `${fmtDate(iso)} · ${fmtTime(iso)}`
}

export function matchStatus(match) {
  const kickoff = new Date(match.match_date)
  if (match.status === 'finished') return 'closed'
  if (match.status === 'live')     return 'live'
  if (kickoff <= new Date())       return 'live'
  return 'open'
}

export function statusBadge(status) {
  if (status === 'open')   return '<span class="badge badge-open">Aberto</span>'
  if (status === 'live')   return '<span class="badge badge-live">Ao vivo</span>'
  return '<span class="badge badge-closed">Encerrado</span>'
}

/* ── Regras de pontuação ───────────────────────────────────── */
const DEFAULT_RULES = {
  exact_score: 10, exact_home: 2, exact_away: 2,
  correct_result: 4, correct_diff: 2,
  cls_1st: 8, cls_2nd: 6, cls_3rd: 3, cls_4th: 1,
  cls_qualify: 4, cls_exact: 10, cls_best3rd: 5,
  tourn_1st: 100, tourn_2nd: 50, tourn_3rd: 25, tourn_bonus: 225,
  ko_exact_home: 4, ko_exact_away: 4, ko_correct_result: 8, ko_correct_diff: 4, ko_exact_score: 20
}

export async function getRules(poolId) {
  if (!poolId) return { ...DEFAULT_RULES }
  const { data } = await supabase
    .from('pool_scoring_rules').select('*').eq('pool_id', poolId).maybeSingle()
  return data ?? { ...DEFAULT_RULES }
}

export const MATCH_RULE_LABELS = {
  exact_home:     'Placar do time da casa (exato)',
  exact_away:     'Placar do visitante (exato)',
  correct_result: 'Resultado correto (vitória / empate)',
  correct_diff:   'Saldo de gols correto',
  exact_score:    'Bônus placar exato (os dois)',
}
export const KO_RULE_LABELS = {
  ko_exact_home:     'Placar do time da casa (exato)',
  ko_exact_away:     'Placar do visitante (exato)',
  ko_correct_result: 'Resultado correto (quem avança)',
  ko_correct_diff:   'Saldo de gols correto',
  ko_exact_score:    'Bônus placar exato (os dois)',
}
export const CLS_RULE_LABELS = {
  cls_1st:     '1º colocado do grupo correto',
  cls_2nd:     '2º colocado do grupo correto',
  cls_3rd:     '3º colocado do grupo correto',
  cls_4th:     '4º colocado do grupo correto',
  cls_qualify: 'Bônus: acertou os 2 classificados (sem ordem)',
  cls_exact:   'Bônus: classificação exata (todos os 4)',
  cls_best3rd: 'Melhor 3º colocado avançou (por grupo)',
}
export const TOURN_RULE_LABELS = {
  tourn_1st:   'Acertar o campeão (1º lugar)',
  tourn_2nd:   'Acertar o vice-campeão (2º lugar)',
  tourn_3rd:   'Acertar o 3º lugar',
  tourn_bonus: 'Bônus: pódio exato (os 3 corretos)',
}
export const RULE_LABELS = { ...MATCH_RULE_LABELS, ...CLS_RULE_LABELS }

/* ── Simulação de classificação do grupo ───────────────────── */
export function simulateGroupStandings(groupMatches, predsMap) {
  const teams = {}
  for (const m of groupMatches) {
    for (const t of [m.home_team, m.away_team]) {
      if (!teams[t]) teams[t] = { team: t, pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, played: 0 }
    }
  }
  for (const m of groupMatches) {
    const pred = predsMap[m.id]
    if (!pred || pred.home_score == null || pred.away_score == null) continue
    const h = Number(pred.home_score), a = Number(pred.away_score)
    if (isNaN(h) || isNaN(a)) continue
    const ht = teams[m.home_team], at = teams[m.away_team]
    ht.gf += h; ht.ga += a; ht.gd += h - a; ht.played++
    at.gf += a; at.ga += h; at.gd += a - h; at.played++
    if (h > a)      { ht.pts += 3; ht.w++; at.l++ }
    else if (h < a) { at.pts += 3; at.w++; ht.l++ }
    else            { ht.pts += 1; ht.d++; at.pts += 1; at.d++ }
  }
  return Object.values(teams).sort((a, b) =>
    b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || a.team.localeCompare(b.team)
  )
}

export async function saveGroupStandings(poolId, userId, groupName, groupMatches, predsMap) {
  const standings = simulateGroupStandings(groupMatches, predsMap)
  const rows = standings.slice(0, 4).map((s, i) => ({
    pool_id: poolId, user_id: userId, group_name: groupName,
    position: i + 1, team_name: s.team, updated_at: new Date().toISOString()
  }))
  for (const row of rows) {
    await supabase.from('predicted_group_standings')
      .upsert(row, { onConflict: 'pool_id,user_id,group_name,position' })
  }
}

/* ── Tradução de seleções ──────────────────────────────────── */
const TEAM_PT = {
  'Afghanistan': 'Afeganistão',
  'Albania': 'Albânia',
  'Algeria': 'Argélia',
  'Angola': 'Angola',
  'Argentina': 'Argentina',
  'Armenia': 'Armênia',
  'Australia': 'Austrália',
  'Austria': 'Áustria',
  'Azerbaijan': 'Azerbaijão',
  'Bahrain': 'Bahrein',
  'Bangladesh': 'Bangladesh',
  'Belgium': 'Bélgica',
  'Bolivia': 'Bolívia',
  'Bosnia and Herzegovina': 'Bósnia e Herzegovina',
  'Brazil': 'Brasil',
  'Bulgaria': 'Bulgária',
  'Cameroon': 'Camarões',
  'Canada': 'Canadá',
  'Chile': 'Chile',
  'China PR': 'China',
  'China': 'China',
  'Colombia': 'Colômbia',
  'Congo DR': 'Congo',
  'Costa Rica': 'Costa Rica',
  'Côte d\'Ivoire': 'Costa do Marfim',
  'Ivory Coast': 'Costa do Marfim',
  'Croatia': 'Croácia',
  'Cuba': 'Cuba',
  'Czechia': 'República Tcheca',
  'Czech Republic': 'República Tcheca',
  'Denmark': 'Dinamarca',
  'Ecuador': 'Equador',
  'Egypt': 'Egito',
  'El Salvador': 'El Salvador',
  'England': 'Inglaterra',
  'Estonia': 'Estônia',
  'Ethiopia': 'Etiópia',
  'Finland': 'Finlândia',
  'France': 'França',
  'Georgia': 'Geórgia',
  'Germany': 'Alemanha',
  'Ghana': 'Gana',
  'Greece': 'Grécia',
  'Guatemala': 'Guatemala',
  'Guinea': 'Guiné',
  'Honduras': 'Honduras',
  'Hungary': 'Hungria',
  'Iceland': 'Islândia',
  'India': 'Índia',
  'Indonesia': 'Indonésia',
  'Iran': 'Irã',
  'Iraq': 'Iraque',
  'Ireland': 'Irlanda',
  'Israel': 'Israel',
  'Italy': 'Itália',
  'Jamaica': 'Jamaica',
  'Japan': 'Japão',
  'Jordan': 'Jordânia',
  'Kazakhstan': 'Cazaquistão',
  'Kenya': 'Quênia',
  'Kosovo': 'Kosovo',
  'Kuwait': 'Kuwait',
  'Latvia': 'Letônia',
  'Lebanon': 'Líbano',
  'Libya': 'Líbia',
  'Lithuania': 'Lituânia',
  'Luxembourg': 'Luxemburgo',
  'Malaysia': 'Malásia',
  'Mali': 'Mali',
  'Malta': 'Malta',
  'Mexico': 'México',
  'Moldova': 'Moldávia',
  'Montenegro': 'Montenegro',
  'Morocco': 'Marrocos',
  'Mozambique': 'Moçambique',
  'Netherlands': 'Holanda',
  'New Caledonia': 'Nova Caledônia',
  'New Zealand': 'Nova Zelândia',
  'Nigeria': 'Nigéria',
  'North Korea': 'Coreia do Norte',
  'North Macedonia': 'Macedônia do Norte',
  'Northern Ireland': 'Irlanda do Norte',
  'Norway': 'Noruega',
  'Oman': 'Omã',
  'Palestine': 'Palestina',
  'Panama': 'Panamá',
  'Paraguay': 'Paraguai',
  'Peru': 'Peru',
  'Philippines': 'Filipinas',
  'Poland': 'Polônia',
  'Portugal': 'Portugal',
  'Qatar': 'Catar',
  'Romania': 'Romênia',
  'Russia': 'Rússia',
  'Saudi Arabia': 'Arábia Saudita',
  'Scotland': 'Escócia',
  'Senegal': 'Senegal',
  'Serbia': 'Sérvia',
  'Slovakia': 'Eslováquia',
  'Slovenia': 'Eslovênia',
  'South Africa': 'África do Sul',
  'South Korea': 'Coreia do Sul',
  'Spain': 'Espanha',
  'Sweden': 'Suécia',
  'Switzerland': 'Suíça',
  'Syria': 'Síria',
  'Taiwan': 'Taiwan',
  'Thailand': 'Tailândia',
  'Togo': 'Togo',
  'Trinidad and Tobago': 'Trinidad e Tobago',
  'Tunisia': 'Tunísia',
  'Turkey': 'Turquia',
  'Türkiye': 'Turquia',
  'Uganda': 'Uganda',
  'Ukraine': 'Ucrânia',
  'United Arab Emirates': 'Emirados Árabes Unidos',
  'United States': 'Estados Unidos',
  'Uruguay': 'Uruguai',
  'Uzbekistan': 'Uzbequistão',
  'Venezuela': 'Venezuela',
  'Vietnam': 'Vietnã',
  'Wales': 'País de Gales',
  'Zambia': 'Zâmbia',
  'Zimbabwe': 'Zimbábue',
  'TBD': 'A definir',
}

export function translateTeam(name) {
  return TEAM_PT[name] ?? name
}

export function medalIcon(pos) {
  if (pos === 1) return '🥇'
  if (pos === 2) return '🥈'
  if (pos === 3) return '🥉'
  return pos
}
