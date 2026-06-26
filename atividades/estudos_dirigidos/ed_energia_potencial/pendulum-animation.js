// pendulum-animation.js
// Animação de pêndulo com controle de resistência do ar.
//
// Uso:
//   initPendulumAnimation(canvasId, { buttonId, prevId, nextId, resetId,
//                                     resistanceId, resistanceLabelId, speed })
//
// Para reutilizar em outro documento:
//   1. Copie este arquivo (ou referencie com o caminho correto)
//   2. Adicione no HTML:
//        <canvas id="pend-anim" style="width:100%;display:block;"></canvas>
//        <input type="range" id="pend-resist" min="0" max="100" value="0">
//        <span id="pend-label"></span>
//        <button id="pend-prev">◀</button>
//        <button id="pend-play">⏸ Pausar</button>
//        <button id="pend-next">▶</button>
//        <button id="pend-reset">↺ Reiniciar</button>
//        <script src="pendulum-animation.js"></script>
//        <script>initPendulumAnimation('pend-anim', {
//          buttonId:'pend-play', prevId:'pend-prev', nextId:'pend-next',
//          resetId:'pend-reset', resistanceId:'pend-resist', resistanceLabelId:'pend-label'
//        });</script>

function initPendulumAnimation(canvasId, options) {
  const opts = Object.assign({
    speed: 0.030,
    buttonId: null, prevId: null, nextId: null, resetId: null,
    resistanceId: null, resistanceLabelId: null
  }, options || {});

  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let t  = 0;
  let Em = 1.0;   // energia mecânica normalizada (começa em 1)
  let paused = false;

  // Damping per frame: quadratic map so low-end has more resolution
  function getDamping() {
    if (!resistSlider) return 0;
    const v = parseInt(resistSlider.value) / 100;
    return v * v * 0.008;
  }

  function syncStepButtons() {
    const off = !paused;
    if (prevBtn) prevBtn.disabled = off;
    if (nextBtn) nextBtn.disabled = off;
  }

  function updateResistLabel() {
    if (!resistLabel) return;
    const v = parseInt(resistSlider.value);
    if (v === 0)      resistLabel.textContent = 'nenhuma — pêndulo ideal';
    else if (v < 25)  resistLabel.textContent = 'fraca';
    else if (v < 60)  resistLabel.textContent = 'moderada';
    else if (v < 85)  resistLabel.textContent = 'forte';
    else              resistLabel.textContent = 'muito forte';
  }

  const btn = opts.buttonId ? document.getElementById(opts.buttonId) : null;
  if (btn) {
    btn.addEventListener('click', () => {
      paused = !paused;
      btn.textContent = paused ? '▶ Continuar' : '⏸ Pausar';
      syncStepButtons();
      if (!paused) requestAnimationFrame(draw);
    });
  }

  const prevBtn = opts.prevId ? document.getElementById(opts.prevId) : null;
  const nextBtn = opts.nextId ? document.getElementById(opts.nextId) : null;
  if (prevBtn) prevBtn.addEventListener('click', () => { if (!paused) return; t -= opts.speed; draw(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { if (!paused) return; t += opts.speed; draw(); });

  const resetBtn = opts.resetId ? document.getElementById(opts.resetId) : null;
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      t = 0; Em = 1.0;
      if (paused) draw();
    });
  }

  const resistSlider = opts.resistanceId ? document.getElementById(opts.resistanceId) : null;
  const resistLabel  = opts.resistanceLabelId ? document.getElementById(opts.resistanceLabelId) : null;
  if (resistSlider) {
    resistSlider.addEventListener('input', updateResistLabel);
    updateResistLabel();
  }

  syncStepButtons();

  function draw() {
    const W = (canvas.parentElement && canvas.parentElement.offsetWidth) || 560;
    if (W <= 0) { requestAnimationFrame(draw); return; }
    if (canvas.width !== W)  canvas.width  = W;
    const H = 300;
    if (canvas.height !== H) canvas.height = H;
    ctx.clearRect(0, 0, W, H);

    const fz = Math.max(9, Math.floor(W * 0.021));

    // ── Geometria ──────────────────────────────────────────────────────────
    const pivotX  = Math.floor(W * 0.38);
    const pivotY  = Math.floor(H * 0.11);
    const rodLen  = Math.min(Math.floor(H * 0.52), Math.floor(W * 0.28));
    const bobR    = Math.max(12, Math.floor(rodLen * 0.105));
    const maxAngle = 0.65;           // rad ≈ 37°
    const bottomY  = pivotY + rodLen; // posição de equilíbrio (h = 0)

    // ── Estado físico ──────────────────────────────────────────────────────
    const Em_     = Math.max(Em, 0);
    const stopped = Em_ < 0.015;
    const phase   = Math.cos(t);              // −1 … 1
    const vel     = -Math.sin(t);             // fase da velocidade angular
    const theta   = stopped ? 0 : maxAngle * Math.sqrt(Em_) * phase;  // ângulo atual
    const bobX    = stopped ? pivotX : pivotX + rodLen * Math.sin(theta);
    const bobY    = stopped ? bottomY : pivotY + rodLen * Math.cos(theta);

    // Frações de energia (em relação à Em inicial = 1)
    const epeR   = stopped ? 0 : phase * phase * Em_;
    const ecR    = stopped ? 0 : (1 - phase * phase) * Em_;
    const edissR = 1 - Em_;

    // ── Fundo ──────────────────────────────────────────────────────────────
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, W, H);

    // Arco-guia (amplitude atual)
    const curMaxAngle = maxAngle * Math.sqrt(Math.max(Em_, 0.01));
    ctx.beginPath();
    ctx.arc(pivotX, pivotY, rodLen,
      Math.PI / 2 + curMaxAngle,
      Math.PI / 2 - curMaxAngle,
      true);
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1.2; ctx.stroke();
    ctx.setLineDash([]);

    // Linha vertical de equilíbrio (tênue)
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1; ctx.setLineDash([3, 4]);
    ctx.beginPath(); ctx.moveTo(pivotX, pivotY); ctx.lineTo(pivotX, bottomY); ctx.stroke();
    ctx.setLineDash([]);

    // Linha horizontal h = 0
    const hLineX1 = Math.max(20, pivotX - rodLen - 12);
    const hLineX2 = Math.min(W - 10, pivotX + rodLen + 38);
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(hLineX1, bottomY); ctx.lineTo(hLineX2, bottomY); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#94a3b8'; ctx.font = fz + 'px monospace'; ctx.textAlign = 'left';
    ctx.fillText('h = 0', Math.min(W - 44, pivotX + rodLen + 4), bottomY + 4);

    // ── Haste ──────────────────────────────────────────────────────────────
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(pivotX, pivotY); ctx.lineTo(bobX, bobY); ctx.stroke();

    // Suporte do pivô (teto + marcas de hachura)
    ctx.fillStyle = '#64748b';
    ctx.fillRect(pivotX - 22, pivotY - 12, 44, 12);
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(pivotX - 19 + i * 9, pivotY - 12);
      ctx.lineTo(pivotX - 23 + i * 9, pivotY - 22);
      ctx.stroke();
    }

    // Pino do pivô
    ctx.fillStyle = '#475569';
    ctx.beginPath(); ctx.arc(pivotX, pivotY, 4, 0, Math.PI * 2); ctx.fill();

    // ── Indicador de altura h ──────────────────────────────────────────────
    if (!stopped && Math.abs(theta) > 0.07) {
      const brX = Math.min(W - 30, pivotX + rodLen * 0.60);
      ctx.strokeStyle = '#0ea5e9'; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(brX, bobY); ctx.lineTo(brX, bottomY); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(brX - 4, bobY);    ctx.lineTo(brX + 4, bobY);    ctx.stroke();
      ctx.beginPath(); ctx.moveTo(brX - 4, bottomY); ctx.lineTo(brX + 4, bottomY); ctx.stroke();
      ctx.fillStyle = '#0369a1'; ctx.font = fz + 'px monospace'; ctx.textAlign = 'left';
      ctx.fillText('h', brX + 5, (bobY + bottomY) / 2 + 4);
    }

    // ── Pêndulo (esfera) ───────────────────────────────────────────────────
    const epeRatio = Em_ > 0.01 ? epeR / Em_ : 0.5;
    const bobFill   = stopped   ? '#94a3b8' : (epeRatio > 0.5 ? '#f97316' : '#22c55e');
    const bobStroke = stopped   ? '#64748b' : (epeRatio > 0.5 ? '#ea580c' : '#16a34a');
    ctx.fillStyle = bobFill;
    ctx.beginPath(); ctx.arc(bobX, bobY, bobR, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = bobStroke; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(bobX, bobY, bobR, 0, Math.PI * 2); ctx.stroke();

    // ── Seta de velocidade (roxo, tangencial) ──────────────────────────────
    if (!stopped && Math.abs(vel) > 0.08) {
      const vSign = vel > 0 ? 1 : -1;
      const nvx   =  Math.cos(theta) * vSign;
      const nvy   = -Math.sin(theta) * vSign;
      const arrLen = Math.sqrt(Math.max(ecR, 0)) * bobR * 2.4;
      if (arrLen > 5) {
        const ax1 = bobX + nvx * bobR;
        const ay1 = bobY + nvy * bobR;
        const ax2 = ax1  + nvx * arrLen;
        const ay2 = ay1  + nvy * arrLen;
        ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(ax1, ay1); ctx.lineTo(ax2, ay2); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(ax2, ay2);
        ctx.lineTo(ax2 - nvx * 7 + nvy * 5, ay2 - nvy * 7 - nvx * 5);
        ctx.lineTo(ax2 - nvx * 7 - nvy * 5, ay2 - nvy * 7 + nvx * 5);
        ctx.closePath();
        ctx.fillStyle = '#7c3aed'; ctx.fill();
      }
    }

    // ── Barras de energia ──────────────────────────────────────────────────
    const barsY = H * 0.70;
    const barsH = H * 0.17;
    const barsW = W * 0.10;
    const bar1X = W * 0.22;   // Epg
    const bar2X = W * 0.44;   // Ec
    const bar3X = W * 0.66;   // Ediss

    // Epg (laranja)
    ctx.fillStyle = '#ffedd5'; ctx.fillRect(bar1X, barsY, barsW, barsH);
    ctx.fillStyle = '#f97316'; ctx.fillRect(bar1X, barsY + barsH * (1 - epeR), barsW, barsH * epeR);
    ctx.strokeStyle = '#ea580c'; ctx.lineWidth = 1; ctx.strokeRect(bar1X, barsY, barsW, barsH);
    ctx.fillStyle = '#ea580c'; ctx.font = 'bold ' + fz + 'px monospace'; ctx.textAlign = 'center';
    ctx.fillText('Epg', bar1X + barsW / 2, barsY - 5);

    // Ec (verde)
    ctx.fillStyle = '#dcfce7'; ctx.fillRect(bar2X, barsY, barsW, barsH);
    ctx.fillStyle = '#22c55e'; ctx.fillRect(bar2X, barsY + barsH * (1 - ecR), barsW, barsH * ecR);
    ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 1; ctx.strokeRect(bar2X, barsY, barsW, barsH);
    ctx.fillStyle = '#16a34a'; ctx.font = 'bold ' + fz + 'px monospace'; ctx.textAlign = 'center';
    ctx.fillText('Ec', bar2X + barsW / 2, barsY - 5);

    // Ediss (vermelho)
    ctx.fillStyle = '#fef2f2'; ctx.fillRect(bar3X, barsY, barsW, barsH);
    ctx.fillStyle = '#ef4444'; ctx.fillRect(bar3X, barsY + barsH * (1 - edissR), barsW, barsH * edissR);
    ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 1; ctx.strokeRect(bar3X, barsY, barsW, barsH);
    ctx.fillStyle = '#dc2626'; ctx.font = 'bold ' + fz + 'px monospace'; ctx.textAlign = 'center';
    ctx.fillText('Ediss', bar3X + barsW / 2, barsY - 5);

    // Legenda das barras
    ctx.fillStyle = '#64748b'; ctx.font = (fz - 1) + 'px monospace'; ctx.textAlign = 'center';
    ctx.fillText('Epg + Ec + Ediss = Em inicial (constante)', W / 2, barsY + barsH + 14);

    // ── Rótulo de estado ───────────────────────────────────────────────────
    let label, lc;
    if (stopped) {
      label = 'Pêndulo parado — energia mecânica totalmente dissipada';
      lc = '#dc2626';
    } else if (Math.abs(phase) > 0.88) {
      label = 'Amplitude máxima — Epg máxima, Ec = 0';
      lc = '#ea580c';
    } else if (Math.abs(phase) < 0.12) {
      label = 'Ponto mais baixo — Epg = 0, Ec máxima';
      lc = '#16a34a';
    } else if (phase > 0 && vel < 0) {
      label = 'Descendo do lado direito → Epg → Ec';  lc = '#0369a1';
    } else if (phase < 0 && vel > 0) {
      label = 'Descendo do lado esquerdo → Epg → Ec'; lc = '#0369a1';
    } else if (phase > 0 && vel > 0) {
      label = 'Subindo pelo lado direito → Ec → Epg';  lc = '#7c3aed';
    } else {
      label = 'Subindo pelo lado esquerdo → Ec → Epg'; lc = '#7c3aed';
    }
    ctx.fillStyle = lc; ctx.font = fz + 'px monospace'; ctx.textAlign = 'center';
    ctx.fillText(label, W / 2, H - 4);

    // ── Avança o estado ────────────────────────────────────────────────────
    if (!paused) {
      t  += opts.speed;
      Em  = Math.max(Em * (1 - getDamping()), 0);
      requestAnimationFrame(draw);
    }
  }

  requestAnimationFrame(draw);
}
