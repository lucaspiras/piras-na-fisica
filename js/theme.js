// Tema claro/escuro do site.
// Carregado de forma síncrona no <head> para aplicar o tema antes da pintura (sem "flash").
(function () {
  var salvo = null;
  try { salvo = localStorage.getItem('tema'); } catch (e) {}
  var escuro = salvo
    ? salvo === 'escuro'
    : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  if (escuro) document.documentElement.setAttribute('data-theme', 'dark');

  function atualizarIcone() {
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = document.documentElement.hasAttribute('data-theme') ? '☀️' : '🌙';
  }

  // Delegação: o botão chega depois, via fetch do header
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('#theme-toggle');
    if (!btn) return;
    var html = document.documentElement;
    var novoEscuro = !html.hasAttribute('data-theme');
    if (novoEscuro) { html.setAttribute('data-theme', 'dark'); }
    else { html.removeAttribute('data-theme'); }
    try { localStorage.setItem('tema', novoEscuro ? 'escuro' : 'claro'); } catch (e2) {}
    atualizarIcone();
  });

  document.addEventListener('DOMContentLoaded', function () {
    atualizarIcone();
    var alvo = document.getElementById('header');
    if (alvo && window.MutationObserver) {
      new MutationObserver(atualizarIcone).observe(alvo, { childList: true });
    }
  });
})();
