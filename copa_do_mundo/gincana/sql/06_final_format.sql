-- Gincana — Quiz ao vivo · Novo formato: eliminação progressiva (25 perguntas)
-- Substitui o mata-mata em chave. Rodar DEPOIS de 01–05.
--
-- Formato: 25 perguntas respondidas por TODAS as equipes ainda em jogo.
--   1–10 = 10 pts · 11–20 = 20 pts · 21–24 = 40 pts · 25 = 80 pts (grande final).
--   Após cada uma das perguntas 21–24, as 2 piores equipes são eliminadas.
--   As funções de chave (quiz_seed_knockout/quiz_decide_match/quiz_admin_ko_context)
--   permanecem no banco, mas não são mais usadas pelo sistema.

-- ── Equipe: enviar resposta — agora BLOQUEIA equipe eliminada ──────────────
create or replace function quiz_submit_answer(p_question_id uuid, p_choice text)
returns json language plpgsql security definer set search_path = public as $$
declare
  v_uid uuid := auth.uid();
  v_q   quiz_questions;
  v_st  quiz_state;
  v_correct boolean;
  v_ms  int;
begin
  if v_uid is null then raise exception 'Não autenticado.'; end if;

  select * into v_q from quiz_questions where id = p_question_id;
  if not found then raise exception 'Pergunta inexistente.'; end if;

  select * into v_st from quiz_state where game_id = v_q.game_id;
  if v_st.current_question_id is distinct from p_question_id then
    raise exception 'Esta pergunta não está ativa.';
  end if;
  if v_st.question_status <> 'open' then raise exception 'As respostas estão fechadas.'; end if;
  if v_st.question_started_at is null
     or now() > v_st.question_started_at + make_interval(secs => v_st.question_seconds) then
    raise exception 'Tempo esgotado.';
  end if;

  if not exists (select 1 from quiz_teams where game_id = v_q.game_id and team_id = v_uid) then
    raise exception 'Você não participa desta gincana.';
  end if;

  -- Equipe eliminada na rodada final não responde mais (vira espectadora).
  if exists (select 1 from quiz_teams
             where game_id = v_q.game_id and team_id = v_uid and eliminated) then
    raise exception 'Sua equipe foi eliminada da gincana.';
  end if;

  v_correct := (upper(p_choice) = upper(v_q.correct_key));
  v_ms := greatest(0, (extract(epoch from (now() - v_st.question_started_at)) * 1000)::int);

  insert into quiz_answers (game_id, question_id, team_id, match_id, choice_key, is_correct, answered_at, response_ms)
  values (v_q.game_id, p_question_id, v_uid, null, upper(p_choice), v_correct, now(), v_ms)
  on conflict (question_id, team_id) do nothing;  -- não pode trocar a resposta

  return json_build_object('ok', true);  -- NÃO devolve se acertou (só na revelação)
end $$;
grant execute on function quiz_submit_answer(uuid, text) to authenticated;

-- ── Admin: eliminar as N piores equipes ainda em jogo (padrão 2) ───────────
-- Usa quiz_group_ranking (pontos ↓ · acertos ↓ · erro mais antigo · tempo ↑).
-- Retorna os nomes das equipes eliminadas, para feedback no console.
create or replace function quiz_eliminate_worst(p_game uuid, p_count int default 2)
returns setof text language plpgsql security definer set search_path = public as $$
declare v_ids uuid[];
begin
  if not quiz_is_admin() then raise exception 'Não autorizado.'; end if;
  select array_agg(team_id) into v_ids from (
    select r.team_id
    from quiz_group_ranking(p_game) r
    join quiz_teams t on t.game_id = p_game and t.team_id = r.team_id and not t.eliminated
    order by r.rank desc               -- rank alto = pior
    limit p_count
  ) x;
  if v_ids is null then return; end if;
  update quiz_teams set eliminated = true where game_id = p_game and team_id = any(v_ids);
  return query select p.display_name from profiles p where p.id = any(v_ids);
end $$;
grant execute on function quiz_eliminate_worst(uuid, int) to authenticated;

-- ── Admin: desfazer todas as eliminações (reabilita todas as equipes) ──────
create or replace function quiz_reset_eliminations(p_game uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not quiz_is_admin() then raise exception 'Não autorizado.'; end if;
  update quiz_teams set eliminated = false, seed = null where game_id = p_game;
end $$;
grant execute on function quiz_reset_eliminations(uuid) to authenticated;

-- ── Admin: encerrar a gincana ──────────────────────────────────────────────
create or replace function quiz_admin_finish(p_game uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not quiz_is_admin() then raise exception 'Não autorizado.'; end if;
  update quiz_state set question_status='idle', current_question_id=null, updated_at=now()
  where game_id = p_game;
  update quiz_games set status='finished' where id = p_game;
end $$;
grant execute on function quiz_admin_finish(uuid) to authenticated;
