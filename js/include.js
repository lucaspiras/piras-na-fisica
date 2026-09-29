// Cabeçalho e rodapé compartilhados.
//
// A raiz do site sai do endereço DESTE script (…/js/include.js), e não do
// domínio. Assim a página funciona tanto publicada, onde a raiz é "/", quanto
// num servidor local cuja raiz seja a pasta de cima (o Live Server aberto na
// pasta geral serve "/principal/..."), e também em github.io/piras-na-fisica/,
// que antes precisava de um caso à parte.
const esteScript = document.currentScript
  || document.querySelector('script[src$="js/include.js"]');
const base = new URL('../', esteScript.src).pathname;

// O header e o rodapé são escritos com caminhos absolutos, que só resolvem
// quando a raiz servida é a do site. Publicado, base é "/" e esta função não
// muda nada; fora dali, ela reaponta os links e as imagens para a raiz real.
function comRaiz(el) {
  if (!el) return;
  el.querySelectorAll('[href^="/"], [src^="/"]').forEach(n => {
    ['href', 'src'].forEach(attr => {
      const v = n.getAttribute(attr);
      if (v && v.startsWith('/') && !v.startsWith('//')) {
        n.setAttribute(attr, base + v.slice(1));
      }
    });
  });
}

fetch(base + "header/header.html")
  .then(response => response.text())
  .then(data => {
    const alvo = document.getElementById("header");
    if (!alvo) return;
    alvo.innerHTML = data;
    comRaiz(alvo);
    const s = document.createElement('script');
    s.src = base + 'js/feedback-modal.js';
    document.head.appendChild(s);
  });

fetch(base + "footer/footer.html")
  .then(response => response.text())
  .then(data => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    footer.innerHTML = data;
    comRaiz(footer);
  });
