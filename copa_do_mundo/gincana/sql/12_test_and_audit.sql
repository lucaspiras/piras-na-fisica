-- Gincana — Quiz ao vivo · Perguntas de teste + auditoria de respostas
-- Rodar DEPOIS de 01–11.

-- ── 1) Libera phase='test' (perguntas de aquecimento, sem pontuação) ──────
-- quiz_scoreboard e quiz_group_ranking só somam/contam phase='group', então
-- perguntas 'test' já ficam automaticamente fora de pontos, acertos e tempo —
-- não precisa mexer em mais nada para elas "não valerem".
alter table quiz_questions drop constraint if exists quiz_questions_phase_check;
alter table quiz_questions add constraint quiz_questions_phase_check
  check (phase in ('group','knockout','extra','test'));

-- ── 2) Auditoria: todas as respostas de uma gincana, com gabarito e nome ──
-- Só admin. Usado para conferência final (quem acertou o quê, em cada rodada).
create or replace function quiz_admin_audit(p_game uuid)
returns table(q_phase text, q_ord int, q_points int, q_text text,
              team_id uuid, display_name text,
              choice_key text, correct_key text, is_correct boolean,
              response_ms int, answered_at timestamptz)
language plpgsql security definer set search_path = public as $$
begin
  if not quiz_is_admin() then raise exception 'Não autorizado.'; end if;
  return query
    select q.phase, q.ord, q.points, q.text,
           a.team_id, p.display_name,
           a.choice_key, q.correct_key, a.is_correct,
           a.response_ms, a.answered_at
    from quiz_answers a
    join quiz_questions q on q.id = a.question_id
    join profiles p       on p.id = a.team_id
    where a.game_id = p_game
    order by q.phase, q.ord, p.display_name;
end $$;
grant execute on function quiz_admin_audit(uuid) to authenticated;
