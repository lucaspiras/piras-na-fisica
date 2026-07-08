-- Gincana — Quiz ao vivo · Telão não via a gincana ser encerrada
-- Rodar DEPOIS de 01–13.
--
-- board.html buscava quiz_games só uma vez, no carregamento da página, e depois
-- só escutava mudanças em quiz_state/quiz_matches. Ao clicar "Encerrar gincana"
-- (quiz_games.status vira 'finished'), o telão nunca ficava sabendo — a página
-- só tinha o status antigo — e caía na tela de "Prepare-se" em vez do pódio.
-- Corrigido no client (board.html: loadLive() agora também rebusca quiz_games).
-- Este arquivo só documenta a adição de quiz_games ao Realtime, para reagir
-- imediatamente (o client também tem um poll de 2s como rede de segurança).

do $$ begin
  if not exists (select 1 from pg_publication_tables
                 where pubname='supabase_realtime' and schemaname='public' and tablename='quiz_games') then
    alter publication supabase_realtime add table quiz_games;
  end if;
end $$;
