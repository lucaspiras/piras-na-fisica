-- Gincana — Quiz ao vivo · Tempo decorrido calculado 100% no servidor
-- Rodar DEPOIS de 01–09.
--
-- O cronômetro do telão/equipe comparava o relógio do APARELHO do usuário
-- (Date.now()) com o horário do servidor (question_started_at). Se o relógio do
-- computador estivesse com a data/hora errada (comum em máquina compartilhada
-- desconfigurada), o cronômetro "nascia esgotado" mesmo com o servidor certo.
-- Esta função devolve o tempo já decorrido calculado inteiramente no Postgres —
-- o cliente só usa isso como ponto de partida e daí em diante conta sozinho com
-- o relógio monotônico do navegador (performance.now()), sem depender mais do
-- relógio de parede do aparelho.
create or replace function quiz_elapsed_ms(p_game uuid)
returns bigint language sql stable security definer set search_path = public as $$
  select case when question_status='open' and question_started_at is not null
    then greatest(0, (extract(epoch from (now() - question_started_at)) * 1000)::bigint)
    else null end
  from quiz_state where game_id = p_game;
$$;
grant execute on function quiz_elapsed_ms(uuid) to authenticated;
