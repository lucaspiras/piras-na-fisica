// graphs.js — Gráficos interativos do MRUV

(function () {
  'use strict';

  const C = {
    bg:      '#0b0e14',
    grid:    'rgba(249,115,22,0.07)',
    axis:    'rgba(226,232,240,0.4)',
    accent:  '#f97316',   // laranja — S×t
    accent2: '#3dd6f5',   // ciano   — v×t positivo / a×t positivo
    accent3: '#f05a70',   // vermelho — negativo
    text:    'rgba(122,143,166,0.9)',
    zero:    'rgba(226,232,240,0.2)',
  };

  // ── utilidade: desenha eixos e grid ──────────────────────────────
  function drawAxes(ctx, w, h, padL, padB, padT, padR, xLabel, yLabel) {
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;
    const ox = padL, oy = padT;

    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = C.grid;
    ctx.lineWidth = 1;
    const nX = 5, nY = 4;
    for (let i = 0; i <= nX; i++) {
      const x = ox + (i / nX) * plotW;
      ctx.beginPath(); ctx.moveTo(x, oy); ctx.lineTo(x, oy + plotH); ctx.stroke();
    }
    for (let j = 0; j <= nY; j++) {
      const y = oy + (j / nY) * plotH;
      ctx.beginPath(); ctx.moveTo(ox, y); ctx.lineTo(ox + plotW, y); ctx.stroke();
    }

    // Eixo vertical (y). O eixo horizontal (t) é desenhado por cada
    // gráfico na posição do zero do eixo vertical (ver drawTimeAxis).
    ctx.strokeStyle = C.axis;
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(ox, oy + plotH); ctx.lineTo(ox, oy - 10); ctx.stroke();

    ctx.fillStyle = C.axis;
    ctx.beginPath();
    ctx.moveTo(ox - 5, oy - 10);
    ctx.lineTo(ox, oy - 18);
    ctx.lineTo(ox + 5, oy - 10);
    ctx.fill();

    ctx.fillStyle = C.text;
    ctx.font = '11px Space Mono, monospace';
    ctx.textAlign = 'left';
    ctx.fillText(yLabel, ox + 8, oy - 20);

    return { plotW, plotH, ox, oy };
  }

  // ── eixo do tempo (horizontal), alinhado ao zero do eixo vertical ──
  function drawTimeAxis(ctx, ox, oy, plotW, plotH, toX, yZeroPx, tMax, xLabel) {
    const y = Math.max(oy, Math.min(oy + plotH, yZeroPx));  // recorta à área
    ctx.strokeStyle = C.axis;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(ox, y);
    ctx.lineTo(ox + plotW + 10, y);
    ctx.stroke();
    // seta
    ctx.fillStyle = C.axis;
    ctx.beginPath();
    ctx.moveTo(ox + plotW + 10, y - 5);
    ctx.lineTo(ox + plotW + 18, y);
    ctx.lineTo(ox + plotW + 10, y + 5);
    ctx.fill();
    // rótulo do eixo
    ctx.fillStyle = C.text;
    ctx.font = '11px Space Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(xLabel, ox + plotW + 22, y + 4);
    // marcações de t logo abaixo do eixo (pula t=0 p/ não colidir com a origem)
    ctx.font = '9px Space Mono, monospace';
    for (let t = 2; t <= tMax; t += 2) ctx.fillText(t, toX(t), y + 14);
  }

  // ── escala "bonita": arredonda min/max e passo para valores redondos ──
  function niceNum(range, round) {
    const exp = Math.floor(Math.log10(range));
    const f = range / Math.pow(10, exp);
    let nf;
    if (round) {
      nf = f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10;
    } else {
      nf = f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10;
    }
    return nf * Math.pow(10, exp);
  }
  function niceAxis(min, max, maxTicks) {
    if (max - min < 1e-9) { min -= 10; max += 10; }   // evita intervalo degenerado
    const range = niceNum(max - min, false);
    const step = niceNum(range / (maxTicks - 1), true);
    return {
      min: Math.floor(min / step) * step,
      max: Math.ceil(max / step) * step,
      step,
    };
  }

  // ── monta texto da equação S(t) (usado no gráfico e no aria-label) ──
  function buildSTLabel(s0, v0, a) {
    const parts = [];
    if (s0 !== 0) parts.push(String(s0));
    if (v0 !== 0) {
      const sign = (v0 > 0 && parts.length > 0) ? '+' : '';
      parts.push(sign + v0 + 't');
    }
    if (a !== 0) {
      const coef = a / 2;
      const sign = (coef > 0 && parts.length > 0) ? '+' : '';
      const coefStr = Number.isInteger(coef) ? String(coef) : coef.toFixed(1);
      parts.push(sign + coefStr + 't²');
    }
    return 'S = ' + (parts.length ? parts.join('') : '0');
  }

  // ── S × t  (parábola) ────────────────────────────────────────────
  function drawST(canvas, v0, a, s0, tAnim) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    const padL = 44, padB = 28, padT = 38, padR = 52;
    ctx.clearRect(0, 0, w, h);

    const { plotW, plotH, ox, oy } = drawAxes(ctx, w, h, padL, padB, padT, padR, 't(s)', 'S(m)');

    const tMax = 10;
    const sOf = t => s0 + v0 * t + 0.5 * a * t * t;

    // Faixa de S adaptativa: cobre os extremos da curva em [0, tMax]
    // (início, fim e o vértice, se estiver no intervalo), com folga.
    let sLo = Math.min(s0, sOf(tMax)), sHi = Math.max(s0, sOf(tMax));
    if (a !== 0) {
      const tv = -v0 / a;
      if (tv > 0 && tv < tMax) {
        const sv = sOf(tv);
        sLo = Math.min(sLo, sv); sHi = Math.max(sHi, sv);
      }
    }
    const sPad = (sHi - sLo) * 0.12 || 10;
    const { min: sMin, max: sMax, step: sStep } = niceAxis(sLo - sPad, sHi + sPad, 6);
    const sRange = sMax - sMin;

    const toX = t => ox + (t / tMax) * plotW;
    const toY = s => oy + plotH - ((s - sMin) / sRange) * plotH;

    // Eixo do tempo alinhado ao zero do eixo S
    drawTimeAxis(ctx, ox, oy, plotW, plotH, toX, toY(0), tMax, 't(s)');

    // Ticks eixo S
    ctx.fillStyle = C.text;
    ctx.textAlign = 'right';
    for (let s = sMin; s <= sMax + sStep * 0.5; s += sStep) {
      const sv = Math.round(s);
      ctx.fillStyle = sv === 0 ? 'rgba(226,232,240,0.5)' : C.text;
      ctx.fillText(sv, ox - 5, toY(s) + 4);
    }

    // Parábola
    ctx.strokeStyle = C.accent;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = C.accent;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    let started = false;
    for (let t = 0; t <= tMax; t += 0.04) {
      const s = sOf(t);
      if (s < sMin - 5 || s > sMax + 5) { started = false; continue; }
      if (!started) { ctx.moveTo(toX(t), toY(s)); started = true; }
      else ctx.lineTo(toX(t), toY(s));
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Vértice (quando v = 0 dentro do intervalo)
    if (a !== 0) {
      const tv = -v0 / a;
      if (tv > 0 && tv < tMax) {
        const sv = sOf(tv);
        if (sv >= sMin && sv <= sMax) {
          ctx.fillStyle = 'rgba(249,115,22,0.5)';
          ctx.beginPath();
          ctx.arc(toX(tv), toY(sv), 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = 'rgba(249,115,22,0.7)';
          ctx.font = '9px Space Mono, monospace';
          ctx.textAlign = 'left';
          ctx.fillText('v=0', toX(tv) + 7, toY(sv) - 4);
        }
      }
    }

    // Ponto animado
    const sAnim = sOf(tAnim);
    if (sAnim >= sMin && sAnim <= sMax) {
      ctx.fillStyle = C.accent;
      ctx.shadowColor = C.accent;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(toX(tAnim), toY(sAnim), 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Label equação — alinhado ao título do eixo, à direita
    ctx.fillStyle = 'rgba(249,115,22,0.8)';
    ctx.font = '10px Space Mono, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(buildSTLabel(s0, v0, a), ox + plotW - 6, oy - 22);
  }

  // ── v × t  (reta inclinada) ──────────────────────────────────────
  function drawVT(canvas, v0, a, tAnim) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    const padL = 44, padB = 28, padT = 38, padR = 52;
    ctx.clearRect(0, 0, w, h);

    const { plotW, plotH, ox, oy } = drawAxes(ctx, w, h, padL, padB, padT, padR, 't(s)', 'v(m/s)');

    const tMax = 10;
    const vMin = -40, vMax = 40;
    const vRange = vMax - vMin;

    const toX = t => ox + (t / tMax) * plotW;
    const toY = v => oy + plotH - ((v - vMin) / vRange) * plotH;
    const vOf = t => v0 + a * t;

    // Eixo do tempo alinhado ao zero do eixo v
    drawTimeAxis(ctx, ox, oy, plotW, plotH, toX, toY(0), tMax, 't(s)');

    // Ticks eixo v
    ctx.fillStyle = C.text;
    ctx.font = '9px Space Mono, monospace';
    ctx.textAlign = 'right';
    for (let v = -40; v <= 40; v += 20) {
      ctx.fillStyle = v === 0 ? 'rgba(226,232,240,0.5)' : C.text;
      ctx.fillText(v, ox - 5, toY(v) + 4);
    }

    // Área sob a reta (deslocamento)
    const y0 = toY(0);
    ctx.beginPath();
    ctx.moveTo(toX(0), y0);
    const vStart = vOf(0), vEnd = vOf(tMax);
    // Intersecção com v=0 se existir
    const tCross = a !== 0 ? -v0 / a : null;
    if (tCross !== null && tCross > 0 && tCross < tMax) {
      // Área dividida em dois triângulos de sinais opostos
      ctx.fillStyle = v0 >= 0 ? 'rgba(61,214,245,0.12)' : 'rgba(240,90,112,0.12)';
      ctx.moveTo(toX(0), y0);
      ctx.lineTo(toX(0), toY(vStart));
      ctx.lineTo(toX(tCross), y0);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = v0 >= 0 ? 'rgba(240,90,112,0.12)' : 'rgba(61,214,245,0.12)';
      ctx.moveTo(toX(tCross), y0);
      ctx.lineTo(toX(tMax), toY(vEnd));
      ctx.lineTo(toX(tMax), y0);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillStyle = vStart >= 0 ? 'rgba(61,214,245,0.12)' : 'rgba(240,90,112,0.12)';
      ctx.moveTo(toX(0), toY(vStart));
      ctx.lineTo(toX(tMax), toY(vEnd));
      ctx.lineTo(toX(tMax), y0);
      ctx.lineTo(toX(0), y0);
      ctx.closePath();
      ctx.fill();
    }

    // Reta v(t) — desenhada com a inclinação real e recortada à área
    // do gráfico (clampear o valor distorceria a inclinação).
    ctx.save();
    ctx.beginPath();
    ctx.rect(ox, oy, plotW, plotH);
    ctx.clip();
    ctx.strokeStyle = C.accent2;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = C.accent2;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(vOf(0)));
    ctx.lineTo(toX(tMax), toY(vOf(tMax)));
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();

    // Ponto animado
    const vAnim = vOf(tAnim);
    if (vAnim >= vMin && vAnim <= vMax) {
      ctx.fillStyle = C.accent2;
      ctx.shadowColor = C.accent2;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(toX(tAnim), toY(vAnim), 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Label — alinhado ao título do eixo, à direita
    ctx.fillStyle = 'rgba(61,214,245,0.8)';
    ctx.font = '10px Space Mono, monospace';
    ctx.textAlign = 'right';
    const labelA = a >= 0 ? '+' + a : '' + a;
    ctx.fillText('v = ' + v0 + (a !== 0 ? labelA + 't' : ''), ox + plotW - 6, oy - 22);
  }

  // ── a × t  (constante) ───────────────────────────────────────────
  function drawAT(canvas, a, tAnim) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    const padL = 44, padB = 28, padT = 38, padR = 52;
    ctx.clearRect(0, 0, w, h);

    const { plotW, plotH, ox, oy } = drawAxes(ctx, w, h, padL, padB, padT, padR, 't(s)', 'a(m/s²)');

    const tMax = 10;
    const aMin = -12, aMax = 12;
    const aRange = aMax - aMin;

    const toX = t => ox + (t / tMax) * plotW;
    const toY = v => oy + plotH - ((v - aMin) / aRange) * plotH;

    // Eixo do tempo alinhado ao zero do eixo a
    drawTimeAxis(ctx, ox, oy, plotW, plotH, toX, toY(0), tMax, 't(s)');

    // Ticks eixo a
    ctx.fillStyle = C.text;
    ctx.font = '9px Space Mono, monospace';
    ctx.textAlign = 'right';
    for (let av = -10; av <= 10; av += 5) {
      ctx.fillStyle = av === 0 ? 'rgba(226,232,240,0.5)' : C.text;
      ctx.fillText(av, ox - 5, toY(av) + 4);
    }

    // Área sob a reta (impulso)
    const yZero = toY(0);
    const yA = toY(a);
    if (a >= aMin && a <= aMax) {
      ctx.fillStyle = a >= 0 ? 'rgba(249,115,22,0.12)' : 'rgba(61,214,245,0.12)';
      ctx.fillRect(ox, Math.min(yA, yZero), plotW, Math.abs(yA - yZero));
    }

    // Reta horizontal
    const aColor = a >= 0 ? C.accent : C.accent2;
    const aClamped = Math.max(aMin - 1, Math.min(aMax + 1, a));
    ctx.strokeStyle = aColor;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = aColor;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(ox, toY(aClamped));
    ctx.lineTo(ox + plotW, toY(aClamped));
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Ponto animado
    if (a >= aMin && a <= aMax) {
      ctx.fillStyle = aColor;
      ctx.shadowColor = aColor;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(toX(tAnim), toY(a), 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Label — alinhado ao título do eixo, à direita
    ctx.fillStyle = a >= 0 ? 'rgba(249,115,22,0.8)' : 'rgba(61,214,245,0.8)';
    ctx.font = '10px Space Mono, monospace';
    ctx.textAlign = 'right';
    ctx.fillText('a = ' + a + ' m/s²', ox + plotW - 6, oy - 22);
  }

  // ── atualiza aria-labels dos canvas ──────────────────────────────
  function updateCanvasLabels(v0, a, s0 = 0) {
    const cST = document.getElementById('grafico-st');
    const cVT = document.getElementById('grafico-vt');
    const cAT = document.getElementById('grafico-at');

    const signV = v0 >= 0 ? '+' : '';
    const signA = a >= 0 ? '+' : '';
    const tipo = (v0 * a > 0) ? 'acelerado' : (v0 * a < 0) ? 'retardado' : (a === 0 ? 'MRU (a=0)' : 'partindo do repouso');
    const tVertice = a !== 0 ? (-v0 / a).toFixed(2) : null;

    if (cST) {
      let label = `Gráfico S por t: parábola com equação ${buildSTLabel(s0, v0, a)}. `;
      label += `Movimento ${tipo}. `;
      if (tVertice !== null && parseFloat(tVertice) > 0 && parseFloat(tVertice) < 10)
        label += `Ponto onde a velocidade é zero: t = ${tVertice} s.`;
      cST.setAttribute('aria-label', label);
    }
    if (cVT) {
      const vFinal = (v0 + a * 10).toFixed(1);
      cVT.setAttribute('aria-label',
        `Gráfico v por t: reta com v₀ = ${v0} m/s e inclinação a = ${a} m/s². Velocidade em t=10s: ${vFinal} m/s.`);
    }
    if (cAT) {
      cAT.setAttribute('aria-label',
        `Gráfico a por t: reta horizontal em a = ${a} m/s². Aceleração constante ao longo do tempo.`);
    }
  }

  // ── estado e sliders ─────────────────────────────────────────────
  let currentV0 = 5, currentA = 3, currentS0 = 0;

  function updateSliders() {
    const slV0  = document.getElementById('sl-v0');
    const slA   = document.getElementById('sl-a');
    const slS0  = document.getElementById('sl-s0');
    const lblV0 = document.getElementById('v0-val');
    const lblA  = document.getElementById('a-val');
    const lblS0 = document.getElementById('s0-val');
    if (!slV0 || !slA) return;

    slV0.addEventListener('input', () => {
      currentV0 = parseInt(slV0.value);
      lblV0.textContent = currentV0;
      updateCanvasLabels(currentV0, currentA, currentS0);
    });
    slA.addEventListener('input', () => {
      currentA = parseInt(slA.value);
      lblA.textContent = currentA;
      updateCanvasLabels(currentV0, currentA, currentS0);
    });
    if (slS0) slS0.addEventListener('input', () => {
      currentS0 = parseInt(slS0.value);
      lblS0.textContent = currentS0;
      updateCanvasLabels(currentV0, currentA, currentS0);
    });
  }

  // ── loop de animação ─────────────────────────────────────────────
  let animFrameId = null;
  const tMax = 10;

  function animate() {
    const tAnim = (Date.now() / 1000) % tMax;
    const cST = document.getElementById('grafico-st');
    const cVT = document.getElementById('grafico-vt');
    const cAT = document.getElementById('grafico-at');
    if (cST) drawST(cST, currentV0, currentA, currentS0, tAnim);
    if (cVT) drawVT(cVT, currentV0, currentA, tAnim);
    if (cAT) drawAT(cAT, currentA, tAnim);
    animFrameId = requestAnimationFrame(animate);
  }

  // ── responsividade ────────────────────────────────────────────────
  function resizeCanvases() {
    ['grafico-st', 'grafico-vt', 'grafico-at'].forEach(id => {
      const canvas = document.getElementById(id);
      if (!canvas) return;
      const w = Math.max(200, canvas.parentElement.clientWidth - 24);
      canvas.width  = w;
      canvas.height = Math.round(w * 0.63);
    });
  }

  // ── init ─────────────────────────────────────────────────────────
  function init() {
    resizeCanvases();
    updateSliders();
    updateCanvasLabels(currentV0, currentA, currentS0);
    animate();
    window.addEventListener('resize', resizeCanvases);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.MRUVGraphs = { stop: () => cancelAnimationFrame(animFrameId) };
})();
