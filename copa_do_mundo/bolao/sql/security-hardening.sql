-- ============================================================================
-- Bolão da Copa — Hardening de segurança (lints do Supabase)
-- ----------------------------------------------------------------------------
-- Resolve, sem quebrar nada:
--   1) function_search_path_mutable: fixa search_path = public em TODAS as
--      funções do schema public.
--   2) Triggers e funções de autosserviço antigas executáveis via API: revoga
--      o EXECUTE (triggers continuam funcionando; autosserviço já não é usado).
--
-- NÃO mexe nas funções de resultado/pontuação do admin (set_match_result,
-- score_*) — essas exigem um tratamento à parte (ver conversa).
--
-- Rode no Supabase → SQL Editor. Idempotente.
-- ============================================================================

-- 1) search_path = public em todas as funções do schema public ---------------
do $$
declare r record;
begin
  for r in
    select p.oid::regprocedure as sig
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.prokind = 'f'
  loop
    begin
      execute format('alter function %s set search_path = public', r.sig);
    exception when others then
      raise notice 'search_path: pulou % (%)', r.sig, sqlerrm;
    end;
  end loop;
end $$;

-- 2) Revoga EXECUTE de funções que não devem estar na API --------------------
--    (cada revoke é tolerante a falha, caso a assinatura difira)
do $$
declare cmd text;
begin
  foreach cmd in array array[
    -- Gatilhos (continuam funcionando mesmo sem EXECUTE concedido)
    'revoke execute on function public.enforce_prediction_deadline() from anon, authenticated, public',
    'revoke execute on function public.enforce_tournament_deadline() from anon, authenticated, public',
    'revoke execute on function public.log_prediction_change() from anon, authenticated, public',
    'revoke execute on function public.log_tournament_prediction_change() from anon, authenticated, public',
    'revoke execute on function public.touch_updated_at() from anon, authenticated, public',
    'revoke execute on function public.trg_score_match() from anon, authenticated, public',
    -- Autosserviço antigo (substituído pela Edge Function admin)
    'revoke execute on function public.create_pool(text) from anon, authenticated',
    'revoke execute on function public.join_pool(text) from anon, authenticated',
    'revoke execute on function public.delete_my_account() from anon, authenticated'
  ]
  loop
    begin execute cmd; exception when others then raise notice 'revoke: pulou % (%)', cmd, sqlerrm; end;
  end loop;
end $$;

notify pgrst, 'reload schema';
