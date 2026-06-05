// Edge Function `admin` — painel administrativo do Bolão.
//
// Guarda a service_role no servidor e confere is_admin do chamador antes de
// qualquer ação. O front (admin.html) chama via supabase.functions.invoke('admin',
// { body: { action, ... } }), que anexa o JWT do usuário automaticamente.
//
// Deploy:  supabase functions deploy admin
// (SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY já são injetadas no runtime de Edge.)

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  })
}

function genInviteCode() {
  return Array.from({ length: 8 }, () =>
    '0123456789ABCDEF'[Math.floor(Math.random() * 16)]).join('')
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })

  const url        = Deno.env.get('SUPABASE_URL')!
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const admin = createClient(url, serviceKey, { auth: { persistSession: false } })

  try {
    // ── Autorização: só admin ────────────────────────────────
    const jwt = (req.headers.get('Authorization') ?? '').replace('Bearer ', '').trim()
    if (!jwt) return json({ error: 'Não autenticado.' }, 401)

    const { data: { user }, error: uErr } = await admin.auth.getUser(jwt)
    if (uErr || !user) return json({ error: 'Sessão inválida.' }, 401)

    const { data: prof } = await admin
      .from('profiles').select('is_admin').eq('id', user.id).maybeSingle()
    if (!prof?.is_admin) return json({ error: 'Acesso restrito ao administrador.' }, 403)

    // ── Roteamento ───────────────────────────────────────────
    const { action, ...p } = await req.json()

    switch (action) {
      /* ---- Participantes ---- */
      case 'list_participants': {
        const { data: profiles, error } = await admin
          .from('profiles').select('id, display_name, avatar, is_admin')
        if (error) throw error
        const { data: list } = await admin.auth.admin.listUsers({ perPage: 1000 })
        const emailById: Record<string, string | undefined> = {}
        for (const u of list?.users ?? []) emailById[u.id] = u.email
        const participants = (profiles ?? []).map((pr) => ({
          ...pr, email: emailById[pr.id] ?? null,
        }))
        return json({ participants })
      }

      case 'create_participant': {
        const { email, password, display_name, avatar } = p
        if (!email || !password || !display_name)
          return json({ error: 'E-mail, senha e apelido são obrigatórios.' }, 400)

        const { data: created, error } = await admin.auth.admin.createUser({
          email, password, email_confirm: true,
        })
        if (error) {
          const msg = /already|exist|registered/i.test(error.message)
            ? 'Já existe uma conta com esse e-mail.' : error.message
          return json({ error: msg }, 400)
        }
        const { error: pErr } = await admin.from('profiles').insert({
          id: created.user.id, display_name, avatar: avatar || '⚽',
        })
        if (pErr) {
          // evita conta órfã sem perfil
          await admin.auth.admin.deleteUser(created.user.id)
          throw pErr
        }
        return json({ user_id: created.user.id })
      }

      case 'reset_password': {
        const { user_id, password } = p
        if (!user_id || !password || password.length < 6)
          return json({ error: 'Senha inválida (mín. 6 caracteres).' }, 400)
        const { error } = await admin.auth.admin.updateUserById(user_id, { password })
        if (error) throw error
        return json({ ok: true })
      }

      case 'delete_participant': {
        const { user_id } = p
        if (!user_id) return json({ error: 'user_id obrigatório.' }, 400)
        // Limpa dependências antes de remover a conta (best-effort).
        await admin.from('predictions').delete().eq('user_id', user_id)
        await admin.from('predicted_group_standings').delete().eq('user_id', user_id)
        await admin.from('pool_members').delete().eq('user_id', user_id)
        await admin.from('profiles').delete().eq('id', user_id)
        const { error } = await admin.auth.admin.deleteUser(user_id)
        if (error) throw error
        return json({ ok: true })
      }

      /* ---- Bolões ---- */
      case 'list_pools': {
        const { data: pools, error } = await admin
          .from('pools').select('id, name').order('name')
        if (error) throw error
        const { data: members } = await admin
          .from('pool_members').select('pool_id, user_id, role')
        const byPool: Record<string, unknown[]> = {}
        for (const m of members ?? []) (byPool[m.pool_id] ??= []).push(m)
        return json({ pools: (pools ?? []).map((pl) => ({ ...pl, members: byPool[pl.id] ?? [] })) })
      }

      case 'create_pool': {
        const { name } = p
        if (!name || name.trim().length < 2)
          return json({ error: 'Nome do bolão inválido.' }, 400)
        const { data, error } = await admin
          .from('pools')
          // owner_id é NOT NULL no schema (modelo antigo). Apontamos para o admin
          // só pra satisfazer a constraint — não concede poderes dentro do bolão.
          .insert({ name: name.trim(), invite_code: genInviteCode(), owner_id: user.id })
          .select('id, name').single()
        if (error) throw error
        return json({ pool: data })
      }

      case 'add_member': {
        const { pool_id, user_id } = p
        if (!pool_id || !user_id) return json({ error: 'pool_id e user_id obrigatórios.' }, 400)
        const { error } = await admin
          .from('pool_members').insert({ pool_id, user_id, role: 'member' })
        // 23505 = já é membro: trata como sucesso idempotente
        if (error && error.code !== '23505') throw error
        return json({ ok: true })
      }

      case 'remove_member': {
        const { pool_id, user_id } = p
        if (!pool_id || !user_id) return json({ error: 'pool_id e user_id obrigatórios.' }, 400)
        const { error } = await admin
          .from('pool_members').delete().eq('pool_id', pool_id).eq('user_id', user_id)
        if (error) throw error
        return json({ ok: true })
      }

      /* ---- Auditoria de palpites ---- */
      // Grade completa de um bolão: membros, jogos, todos os palpites de placar
      // (com pontos calculados) e os palpites de pódio. O front monta a visão.
      case 'audit_grid': {
        const { pool_id } = p
        if (!pool_id) return json({ error: 'pool_id obrigatório.' }, 400)
        const [
          { data: members },
          { data: matches },
          { data: preds },
          { data: tpreds },
          { data: profiles },
        ] = await Promise.all([
          admin.from('pool_members').select('user_id, role').eq('pool_id', pool_id),
          admin.from('matches')
            .select('id, match_number, group_name, home_team, away_team, home_score, away_score, status, match_date, phase')
            .order('match_date'),
          admin.from('predictions')
            .select('user_id, match_id, home_score, away_score, points, updated_at')
            .eq('pool_id', pool_id),
          admin.from('tournament_predictions')
            .select('user_id, pred_1st, pred_2nd, pred_3rd, updated_at')
            .eq('pool_id', pool_id),
          admin.from('profiles').select('id, display_name, avatar'),
        ])
        const profById: Record<string, { display_name?: string; avatar?: string }> = {}
        for (const pr of profiles ?? []) profById[pr.id] = pr
        const memberList = (members ?? []).map((m) => ({
          user_id: m.user_id,
          display_name: profById[m.user_id]?.display_name ?? '—',
          avatar: profById[m.user_id]?.avatar ?? '⚽',
        })).sort((a, b) => (a.display_name ?? '').localeCompare(b.display_name ?? '', 'pt-BR'))
        return json({
          members: memberList,
          matches: matches ?? [],
          predictions: preds ?? [],
          tournament_predictions: tpreds ?? [],
        })
      }

      // Histórico de alterações (trilha de auditoria). Filtra por bolão e,
      // opcionalmente, por jogador. Mais recentes primeiro.
      case 'prediction_history': {
        const { pool_id, user_id, match_id, limit } = p
        if (!pool_id) return json({ error: 'pool_id obrigatório.' }, 400)
        let q = admin.from('prediction_history')
          .select('*')
          .eq('pool_id', String(pool_id))
          .order('changed_at', { ascending: false })
          .limit(Math.min(Number(limit) || 1000, 5000))
        if (user_id) q = q.eq('user_id', String(user_id))
        if (match_id) q = q.eq('match_id', String(match_id))
        const { data: history, error } = await q
        if (error) throw error
        const { data: profiles } = await admin.from('profiles').select('id, display_name')
        const names: Record<string, string> = {}
        for (const pr of profiles ?? []) names[pr.id] = pr.display_name
        return json({ history: history ?? [], names })
      }

      default:
        return json({ error: `Ação desconhecida: ${action}` }, 400)
    }
  } catch (e) {
    return json({ error: (e as Error).message ?? 'Erro interno.' }, 400)
  }
})
