-- ============================================================================
-- Bolão da Copa — Limpar resultado de um jogo
-- ----------------------------------------------------------------------------
-- RPC que desfaz o lançamento de um resultado: zera o placar, reabre o jogo
-- (status volta a 'scheduled') e limpa os pontos calculados dos palpites.
-- Usada pelo botão "Limpar" na aba Resultados do admin.
--
-- SECURITY DEFINER + checagem de is_admin: só o organizador consegue executar,
-- mesmo que alguém chame a RPC direto pela API.
--
-- p_match_id é TEXT e a comparação usa id::text, para não depender do tipo
-- exato de matches.id (uuid / bigint / text). O front sempre envia String(id).
--
-- Rode no Supabase → SQL Editor. Idempotente.
-- ============================================================================

create or replace function public.clear_match_result(p_match_id text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Só admin
  if not exists (
    select 1 from public.profiles where id = auth.uid() and is_admin
  ) then
    raise exception 'Acesso restrito ao administrador.';
  end if;

  -- Zera os pontos calculados dos palpites deste jogo (todos os bolões).
  -- (A trilha de auditoria ignora mudança só de points, então não gera ruído.)
  update public.predictions
     set points = null
   where match_id::text = p_match_id;

  -- Reabre o jogo: placar em branco e status de volta para 'scheduled'.
  update public.matches
     set home_score = null,
         away_score = null,
         status     = 'scheduled'
   where id::text = p_match_id;
end;
$$;

grant execute on function public.clear_match_result(text) to authenticated;
