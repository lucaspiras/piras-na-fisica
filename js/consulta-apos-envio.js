// =====================================================================
// Ponte entre a prova e a consulta do resultado.
//
// Antes, o aluno enviava a prova, lia "você receberá o resultado em breve" e ficava
// sem saber onde. O resultado já estava pronto no banco no instante do envio: o que
// faltava era o caminho até ele.
//
// O nome e a palavra secreta viajam pelo sessionStorage, e não pela URL. Pela URL
// seria mais simples, mas a palavra ficaria no histórico do navegador e no cabeçalho
// de referência de qualquer coisa que a página carregasse depois. No sessionStorage
// ela não sai da aba, não sai do domínio e some quando a aba fecha.
//
// TUDO AQUI FALHA EM SILÊNCIO, de propósito. Em aba anônima ou com armazenamento
// bloqueado, o sessionStorage lança exceção só de ser tocado; se isso derrubasse o
// script, derrubaria junto o envio da prova. Sem o atalho, o aluno digita o nome e a
// palavra na consulta, que é como era antes.
//
// Carregado pelas quatro provas e pelas quatro páginas de consulta.
// =====================================================================
(function (g) {
  'use strict';

  // uma chave por prova: o aluno pode ter feito mais de uma, e o preenchimento
  // automático de uma não pode vazar para a consulta da outra
  function chaveDe(prova) { return 'ultima-entrega:' + prova; }

  /** Guarda quem acabou de entregar, para a consulta se preencher sozinha. */
  g.guardarEntrega = function (prova, nome, palavra) {
    try {
      sessionStorage.setItem(chaveDe(prova),
        JSON.stringify({ nome: nome, palavra: palavra }));
    } catch (e) { /* sem armazenamento: o aluno digita na consulta */ }
  };

  /** Põe o botão "Ver meu resultado agora" no painel que aparece após o envio. */
  g.oferecerConsulta = function (painelId, href) {
    var painel = document.getElementById(painelId);
    if (!painel || painel.querySelector('.btn-consultar')) return;
    var a = document.createElement('a');
    a.href = href;
    a.className = 'btn-consultar';
    a.textContent = 'Ver meu resultado agora';
    var retry = document.getElementById('btn-retry');
    if (retry && retry.parentNode === painel) painel.insertBefore(a, retry);
    else painel.appendChild(a);
  };

  /**
   * Na página de consulta: se o aluno acabou de entregar, preenche os campos e já
   * busca. Quem chega pela primeira vez, ou noutra aba, não vê diferença nenhuma.
   */
  g.preencherConsulta = function (prova, ids) {
    var bruto;
    try { bruto = sessionStorage.getItem(chaveDe(prova)); } catch (e) { return; }
    if (!bruto) return;
    var d;
    try { d = JSON.parse(bruto); } catch (e) { return; }
    if (!d || !d.nome) return;
    var campoNome = document.getElementById(ids.nome);
    var campoPalavra = document.getElementById(ids.palavra);
    var botao = document.getElementById(ids.botao);
    if (!campoNome || !campoPalavra || !botao) return;
    campoNome.value = d.nome;
    campoPalavra.value = d.palavra || '';
    botao.click();
  };
})(window);
