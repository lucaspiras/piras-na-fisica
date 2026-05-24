(function () {
  'use strict';

  /* ── Elementos ───────────────────────────────────────────── */
  const canvas = document.getElementById('planoCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const x0Sl  = document.getElementById('x0-slider');
  const y0Sl  = document.getElementById('y0-slider');
  const xfSl  = document.getElementById('xf-slider');
  const yfSl  = document.getElementById('yf-slider');
  const x0Lbl = document.getElementById('x0-val');
  const y0Lbl = document.getElementById('y0-val');
  const xfLbl = document.getElementById('xf-val');
  const yfLbl = document.getElementById('yf-val');
  const output = document.getElementById('sim-output');

  /* ── Constantes do plano ─────────────────────────────────── */
  const RANGE = 10;
  const W = canvas.width;
  const H = canvas.height;
  const CX = W / 2;
  const CY = H / 2;
  const SCALE = Math.floor(Math.min((W - 80) / (2 * RANGE), (H - 80) / (2 * RANGE)));

  /* ── Helpers de desenho ──────────────────────────────────── */
  function arrowHead(x, y, angle, len, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - len * Math.cos(angle - Math.PI / 6), y - len * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(x - len * Math.cos(angle + Math.PI / 6), y - len * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
  }

  /* Círculo com halo branco para boa leitura sobre a grade */
  function dot(x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.88)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, 9, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  /* Label com pill de fundo semitransparente */
  function labelBadge(text, x, y, color) {
    ctx.save();
    ctx.font = 'bold 11px Poppins, sans-serif';
    const tw = ctx.measureText(text).width;
    const ph = 6, pv = 3;
    const bx = x - tw / 2 - ph;
    const by = y - 13 - pv;
    const bw = tw + ph * 2;
    const bh = 14 + pv * 2;
    ctx.fillStyle = 'rgba(255,255,255,0.93)';
    ctx.strokeStyle = 'rgba(203,213,225,0.85)';
    ctx.lineWidth = 1;
    if (ctx.roundRect) {
      ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 5);
      ctx.fill(); ctx.stroke();
    } else {
      ctx.fillRect(bx, by, bw, bh);
      ctx.strokeRect(bx, by, bw, bh);
    }
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  /* ── Desenho principal ───────────────────────────────────── */
  function drawPlano() {
    const sx0 = parseFloat(x0Sl.value);
    const sy0 = parseFloat(y0Sl.value);
    const sxf = parseFloat(xfSl.value);
    const syf = parseFloat(yfSl.value);

    x0Lbl.textContent = sx0;
    y0Lbl.textContent = sy0;
    xfLbl.textContent = sxf;
    yfLbl.textContent = syf;

    ctx.clearRect(0, 0, W, H);

    /* Fundo */
    ctx.fillStyle = '#f8f9ff';
    ctx.fillRect(0, 0, W, H);

    /* Grade em dois níveis: menor (cada unidade) e maior (múltiplos de 5) */
    for (let i = -RANGE; i <= RANGE; i++) {
      if (i === 0) continue;
      const xC = CX + i * SCALE;
      const yC = CY - i * SCALE;
      const major = (i % 5 === 0);
      ctx.strokeStyle = major ? 'rgba(160,185,228,0.60)' : 'rgba(210,220,242,0.50)';
      ctx.lineWidth   = major ? 1.5 : 1;
      ctx.beginPath(); ctx.moveTo(xC, CY - RANGE * SCALE - 10); ctx.lineTo(xC, CY + RANGE * SCALE + 10); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(CX - RANGE * SCALE - 10, yC); ctx.lineTo(CX + RANGE * SCALE + 10, yC); ctx.stroke();
    }

    /* Eixos */
    const AX_COLOR = '#334155';
    ctx.strokeStyle = AX_COLOR;
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(CX - RANGE * SCALE - 10, CY); ctx.lineTo(CX + RANGE * SCALE + 16, CY); ctx.stroke();
    arrowHead(CX + RANGE * SCALE + 16, CY, 0, 11, AX_COLOR);
    ctx.beginPath(); ctx.moveTo(CX, CY + RANGE * SCALE + 10); ctx.lineTo(CX, CY - RANGE * SCALE - 16); ctx.stroke();
    arrowHead(CX, CY - RANGE * SCALE - 16, -Math.PI / 2, 11, AX_COLOR);

    /* Ticks e rótulos numéricos */
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#94a3b8';
    ctx.fillStyle   = '#334155';
    ctx.font = '12px Poppins, sans-serif';
    for (let i = -RANGE; i <= RANGE; i++) {
      if (i === 0) continue;
      const xC = CX + i * SCALE;
      const yC = CY - i * SCALE;
      ctx.beginPath(); ctx.moveTo(xC, CY - 4); ctx.lineTo(xC, CY + 4); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(CX - 4, yC); ctx.lineTo(CX + 4, yC); ctx.stroke();
      if (i % 2 === 0) {
        ctx.textAlign = 'center';
        ctx.fillText(String(i), xC, CY + 20);
        ctx.textAlign = 'right';
        ctx.fillText(String(i), CX - 8, yC + 4);
      }
    }
    /* zero apenas sob a origem */
    ctx.textAlign = 'center';
    ctx.fillText('0', CX, CY + 20);

    /* Labels dos eixos */
    ctx.fillStyle = '#1e2a78';
    ctx.font = 'bold 13px Poppins, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('x (m)', CX + RANGE * SCALE + 20, CY + 6);
    ctx.fillText('y (m)', CX + 7, CY - RANGE * SCALE - 18);

    /* Posições em canvas */
    const px0 = CX + sx0 * SCALE;
    const py0 = CY - sy0 * SCALE;
    const pxf = CX + sxf * SCALE;
    const pyf = CY - syf * SCALE;
    const dx  = sxf - sx0;
    const dy  = syf - sy0;
    const mag = Math.sqrt(dx * dx + dy * dy);

    if (mag > 0.05) {
      /* Componentes tracejadas */
      ctx.setLineDash([5, 4]);
      ctx.strokeStyle = '#b0bfcf';
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(px0, py0); ctx.lineTo(pxf, py0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(pxf, py0); ctx.lineTo(pxf, pyf); ctx.stroke();
      ctx.setLineDash([]);

      /* Rótulos das componentes */
      ctx.fillStyle = '#64748b';
      ctx.font = '11px Poppins, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Δx = ' + dx.toFixed(1) + ' m', (px0 + pxf) / 2, py0 + (dy >= 0 ? -10 : 16));
      ctx.textAlign = dx >= 0 ? 'left' : 'right';
      ctx.fillText('Δy = ' + dy.toFixed(1) + ' m', pxf + (dx >= 0 ? 8 : -8), (py0 + pyf) / 2 + 4);

      /* Vetor deslocamento */
      const angle = Math.atan2(pyf - py0, pxf - px0);
      ctx.strokeStyle = '#2f5bea';
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(px0, py0); ctx.lineTo(pxf, pyf); ctx.stroke();
      arrowHead(pxf, pyf, angle, 13, '#2f5bea');
    }

    /* Pontos (desenhados depois do vetor para ficarem na frente) */
    dot(px0, py0, '#22c55e');
    dot(pxf, pyf, '#f97316');

    /* Labels dos pontos com coordenadas */
    const r0txt = 'r₀ (' + sx0.toFixed(1) + ', ' + sy0.toFixed(1) + ')';
    const rftxt = 'r ('  + sxf.toFixed(1) + ', ' + syf.toFixed(1) + ')';
    const yl0 = py0 > 40 ? py0 - 24 : py0 + 32;
    const ylf = pyf > 40 ? pyf - 24 : pyf + 32;
    labelBadge(r0txt, px0, yl0, '#166534');
    labelBadge(rftxt, pxf, ylf, '#c2410c');

    /* Saída numérica — MathJax */
    const fmtSgn = v => (v >= 0 ? '+' : '') + v.toFixed(2);
    const x0disp = sx0 < 0 ? '(' + sx0.toFixed(2) + ')' : sx0.toFixed(2);
    const y0disp = sy0 < 0 ? '(' + sy0.toFixed(2) + ')' : sy0.toFixed(2);
    const dxSqrt = dx  < 0 ? '(' + dx.toFixed(2)  + ')' : dx.toFixed(2);
    const dySqrt = dy  < 0 ? '(' + dy.toFixed(2)  + ')' : dy.toFixed(2);
    output.innerHTML =
      '<div class="sim-eq">\\( \\Delta x \\;=\\; ' + sxf.toFixed(2) + ' - ' + x0disp + ' \\;=\\; ' + fmtSgn(dx) + '\\,\\mathrm{m} \\)</div>' +
      '<div class="sim-eq">\\( \\Delta y \\;=\\; ' + syf.toFixed(2) + ' - ' + y0disp + ' \\;=\\; ' + fmtSgn(dy) + '\\,\\mathrm{m} \\)</div>' +
      '<div class="sim-eq sim-eq-total">\\( |\\Delta\\,\\vec{r}| \\;=\\; \\sqrt{' + dxSqrt + '^{2} + ' + dySqrt + '^{2}} \\;=\\; ' + mag.toFixed(2) + '\\,\\mathrm{m} \\)</div>';
    if (window.MathJax) MathJax.typesetPromise([output]).catch(function () {});
  }

  x0Sl.addEventListener('input', drawPlano);
  y0Sl.addEventListener('input', drawPlano);
  xfSl.addEventListener('input', drawPlano);
  yfSl.addEventListener('input', drawPlano);
  drawPlano();

  /* ── Curiosidades expansíveis ────────────────────────────── */
  document.querySelectorAll('.curiosity-toggle').forEach(function (btn) {
    const target = document.getElementById(btn.getAttribute('aria-controls'));
    if (!target) return;
    btn.addEventListener('click', function () {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      btn.textContent = expanded ? 'Expandir' : 'Recolher';
      target.hidden = expanded;
    });
  });

  /* ── TOC: destaque da seção ativa no scroll ──────────────── */
  const sections = document.querySelectorAll('.content-section');
  const tocLinks = document.querySelectorAll('.toc-list a');
  window.addEventListener('scroll', function () {
    let current = '';
    sections.forEach(function (sec) {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    tocLinks.forEach(function (a) {
      a.parentElement.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  });
})();
