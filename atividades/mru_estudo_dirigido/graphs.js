// graphs.js — Gráficos interativos do MRU

(function() {
  'use strict';

  // Cores do tema
  const C = {
    bg:      '#13181f',
    surface: '#1a2130',
    border:  '#232d3d',
    grid:    'rgba(61,214,245,0.08)',
    axis:    'rgba(226,232,240,0.4)',
    accent:  '#f0c040',
    accent2: '#3dd6f5',
    text:    'rgba(122,143,166,0.9)',
  };

  // ----- utilidade: desenha eixos e grid -----
  function drawAxes(ctx, w, h, padL, padB, padT, padR, xLabel, yLabel) {
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;
    const ox = padL;
    const oy = padT;

    // Fundo
    ctx.fillStyle = C.bg;
    ctx.roundRect ? ctx.roundRect(0, 0, w, h, 8) : ctx.rect(0, 0, w, h);
    ctx.fill();

    // Grid
    ctx.strokeStyle = C.grid;
    ctx.lineWidth = 1;
    const nX = 6, nY = 5;
    for (let i = 0; i <= nX; i++) {
      const x = ox + (i / nX) * plotW;
      ctx.beginPath(); ctx.moveTo(x, oy); ctx.lineTo(x, oy + plotH); ctx.stroke();
    }
    for (let j = 0; j <= nY; j++) {
      const y = oy + (j / nY) * plotH;
      ctx.beginPath(); ctx.moveTo(ox, y); ctx.lineTo(ox + plotW, y); ctx.stroke();
    }

    // Eixos
    ctx.strokeStyle = C.axis;
    ctx.lineWidth = 1.5;
    // Eixo X
    ctx.beginPath();
    ctx.moveTo(ox, oy + plotH);
    ctx.lineTo(ox + plotW + 10, oy + plotH);
    ctx.stroke();
    // Eixo Y
    ctx.beginPath();
    ctx.moveTo(ox, oy + plotH);
    ctx.lineTo(ox, oy - 10);
    ctx.stroke();

    // Seta X
    ctx.fillStyle = C.axis;
    ctx.beginPath();
    ctx.moveTo(ox + plotW + 10, oy + plotH - 5);
    ctx.lineTo(ox + plotW + 18, oy + plotH);
    ctx.lineTo(ox + plotW + 10, oy + plotH + 5);
    ctx.fill();

    // Seta Y
    ctx.beginPath();
    ctx.moveTo(ox - 5, oy - 10);
    ctx.lineTo(ox, oy - 18);
    ctx.lineTo(ox + 5, oy - 10);
    ctx.fill();

    // Labels dos eixos
    ctx.fillStyle = C.text;
    ctx.font = '11px Space Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(xLabel, ox + plotW + 22, oy + plotH + 4);
    ctx.textAlign = 'left';
    ctx.fillText(yLabel, ox + 8, oy - 20);

    return { plotW, plotH, ox, oy };
  }

  // ----- Gráfico S×t -----
  function drawST(canvas, s0, v) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const padL = 44, padB = 30, padT = 26, padR = 30;

    ctx.clearRect(0, 0, w, h);

    const { plotW, plotH, ox, oy } = drawAxes(ctx, w, h, padL, padB, padT, padR, 't(s)', 'S(m)');

    // Escala: tempo 0..10s, posição -100..+200m
    const tMax = 10;
    const sMin = -80, sMax = 160;
    const sRange = sMax - sMin;

    const toX = t => ox + (t / tMax) * plotW;
    const toY = s => oy + plotH - ((s - sMin) / sRange) * plotH;

    // Linha S=0 (referencial)
    ctx.strokeStyle = 'rgba(122,143,166,0.25)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(ox, toY(0));
    ctx.lineTo(ox + plotW, toY(0));
    ctx.stroke();
    ctx.setLineDash([]);

    // Ticks eixo tempo
    ctx.fillStyle = C.text;
    ctx.font = '9px Space Mono, monospace';
    ctx.textAlign = 'center';
    for (let t = 0; t <= tMax; t += 2) {
      ctx.fillText(t, toX(t), oy + plotH + 14);
    }

    // Ticks eixo posição
    ctx.textAlign = 'right';
    for (let s = sMin; s <= sMax; s += 40) {
      if (s === 0) {
        ctx.fillStyle = 'rgba(226,232,240,0.5)';
      } else {
        ctx.fillStyle = C.text;
      }
      ctx.fillText(s, ox - 5, toY(s) + 4);
    }

    // Linha da função S(t)
    const t1 = 0, t2 = tMax;
    const sStart = s0 + v * t1;
    const sEnd   = s0 + v * t2;

    ctx.strokeStyle = C.accent;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = C.accent;
    ctx.shadowBlur = 8;

    ctx.beginPath();
    ctx.moveTo(toX(t1), toY(Math.max(sMin, Math.min(sMax, sStart))));

    // Desenha passo a passo para "clip" suave
    for (let t = 0; t <= tMax; t += 0.05) {
      const s = s0 + v * t;
      if (s >= sMin - 5 && s <= sMax + 5) {
        ctx.lineTo(toX(t), toY(s));
      }
    }

    ctx.stroke();
    ctx.shadowBlur = 0;

    // Ponto animado
    const tAnim = (Date.now() / 1000) % tMax;
    const sAnim = s0 + v * tAnim;
    if (sAnim >= sMin && sAnim <= sMax) {
      ctx.fillStyle = C.accent;
      ctx.shadowColor = C.accent;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(toX(tAnim), toY(sAnim), 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Label da equação
    ctx.fillStyle = 'rgba(240,192,64,0.8)';
    ctx.font = '10px Space Mono, monospace';
    ctx.textAlign = 'left';
    const sign = v >= 0 ? '+' : '';
    ctx.fillText(`S = ${s0}${sign}${v}t`, ox + 6, oy + 14);
  }

  // ----- Gráfico v×t -----
  function drawVT(canvas, v) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const padL = 44, padB = 30, padT = 26, padR = 30;

    ctx.clearRect(0, 0, w, h);

    const { plotW, plotH, ox, oy } = drawAxes(ctx, w, h, padL, padB, padT, padR, 't(s)', 'v(m/s)');

    const tMax = 10;
    const vMin = -35, vMax = 35;
    const vRange = vMax - vMin;

    const toX = t => ox + (t / tMax) * plotW;
    const toY = vel => oy + plotH - ((vel - vMin) / vRange) * plotH;

    // Linha v=0
    ctx.strokeStyle = 'rgba(122,143,166,0.25)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(ox, toY(0));
    ctx.lineTo(ox + plotW, toY(0));
    ctx.stroke();
    ctx.setLineDash([]);

    // Ticks
    ctx.fillStyle = C.text;
    ctx.font = '9px Space Mono, monospace';
    ctx.textAlign = 'center';
    for (let t = 0; t <= tMax; t += 2) ctx.fillText(t, toX(t), oy + plotH + 14);
    ctx.textAlign = 'right';
    for (let vel = vMin; vel <= vMax; vel += 10) {
      ctx.fillStyle = vel === 0 ? 'rgba(226,232,240,0.5)' : C.text;
      ctx.fillText(vel, ox - 5, toY(vel) + 4);
    }

    // Área sob a curva (deslocamento)
    const y0 = toY(0);
    const yV = toY(v);
    ctx.fillStyle = v >= 0
      ? 'rgba(61,214,245,0.1)'
      : 'rgba(240,90,112,0.1)';
    ctx.beginPath();
    ctx.moveTo(toX(0), y0);
    ctx.lineTo(toX(0), yV);
    ctx.lineTo(toX(tMax), yV);
    ctx.lineTo(toX(tMax), y0);
    ctx.closePath();
    ctx.fill();

    // Linha horizontal v = cte
    ctx.strokeStyle = C.accent2;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = C.accent2;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(toX(0), yV);
    ctx.lineTo(toX(tMax), yV);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Ponto animado
    const tAnim = (Date.now() / 1000) % tMax;
    ctx.fillStyle = C.accent2;
    ctx.shadowColor = C.accent2;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(toX(tAnim), yV, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Label
    ctx.fillStyle = 'rgba(61,214,245,0.8)';
    ctx.font = '10px Space Mono, monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`v = ${v} m/s`, ox + 6, oy + 14);
  }

  // ----- Loop de animação -----
  let animFrameId = null;
  let currentS0 = 10, currentV = 10;

  function animate() {
    const cST = document.getElementById('grafico-st');
    const cVT = document.getElementById('grafico-vt');
    if (cST && cVT) {
      drawST(cST, currentS0, currentV);
      drawVT(cVT, currentV);
    }
    animFrameId = requestAnimationFrame(animate);
  }

  function updateSliders() {
    const slS0 = document.getElementById('sl-s0');
    const slV  = document.getElementById('sl-v');
    const lblS0 = document.getElementById('s0-val');
    const lblV  = document.getElementById('v-val');

    if (!slS0 || !slV) return;

    slS0.addEventListener('input', () => {
      currentS0 = parseInt(slS0.value);
      lblS0.textContent = currentS0;
    });

    slV.addEventListener('input', () => {
      currentV = parseInt(slV.value);
      lblV.textContent = currentV;
    });
  }

  // ----- Resize responsivo -----
  function resizeCanvases() {
    ['grafico-st', 'grafico-vt'].forEach(id => {
      const canvas = document.getElementById(id);
      if (!canvas) return;
      const parent = canvas.parentElement;
      const w = parent.clientWidth - 32;
      canvas.width  = Math.max(200, w);
      canvas.height = Math.round(canvas.width * 0.6);
    });
  }

  // ----- Init -----
  function init() {
    resizeCanvases();
    updateSliders();
    animate();
    window.addEventListener('resize', () => {
      resizeCanvases();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expõe para o main.js poder parar a animação se necessário
  window.MRUGraphs = { stop: () => cancelAnimationFrame(animFrameId) };

})();
