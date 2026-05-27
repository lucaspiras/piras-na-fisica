// spring-animation.js
// Animação de sistema massa-mola em oscilação horizontal ideal.
//
// Uso:
//   initSpringAnimation(canvasId, { buttonId: 'meu-btn', prevId: 'btn-prev', nextId: 'btn-next', speed: 0.028 })
//
// Para reutilizar em outro documento:
//   1. Copie este arquivo (ou referencie com o caminho correto)
//   2. Adicione no HTML:
//        <canvas id="mola-anim" style="width:100%;display:block;"></canvas>
//        <button id="mola-prev">◀</button>
//        <button id="mola-btn">⏸ Pausar</button>
//        <button id="mola-next">▶</button>
//        <script src="spring-animation.js"></script>
//        <script>initSpringAnimation('mola-anim', { buttonId: 'mola-btn', prevId: 'mola-prev', nextId: 'mola-next' });</script>

function initSpringAnimation(canvasId, options) {
  const opts = Object.assign({ speed: 0.028, buttonId: null, prevId: null, nextId: null }, options || {});
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let t = 0;
  let paused = false;

  function syncStepButtons() {
    const disabled = !paused;
    if (prevBtn) prevBtn.disabled = disabled;
    if (nextBtn) nextBtn.disabled = disabled;
  }

  // Play / pause button
  const btn = opts.buttonId ? document.getElementById(opts.buttonId) : null;
  if (btn) {
    btn.addEventListener('click', () => {
      paused = !paused;
      btn.textContent = paused ? '▶ Continuar' : '⏸ Pausar';
      syncStepButtons();
      if (!paused) requestAnimationFrame(draw);
    });
  }

  // Step buttons (only active when paused)
  const prevBtn = opts.prevId ? document.getElementById(opts.prevId) : null;
  const nextBtn = opts.nextId ? document.getElementById(opts.nextId) : null;
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (!paused) return;
      t -= opts.speed;
      draw();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (!paused) return;
      t += opts.speed;
      draw();
    });
  }
  syncStepButtons();

  function draw() {
    const W = (canvas.parentElement && canvas.parentElement.offsetWidth) || 560;
    if (W <= 0) { requestAnimationFrame(draw); return; }
    if (canvas.width !== W) canvas.width = W;
    const H = 232;
    if (canvas.height !== H) canvas.height = H;
    ctx.clearRect(0, 0, W, H);

    const wallX = Math.floor(W * 0.09);
    const eqX   = Math.floor(W * 0.58);
    const amp   = Math.floor(W * 0.17);
    const bW    = Math.max(22, Math.floor(W * 0.08));
    const cy    = Math.floor(H * 0.37);
    const fz    = Math.max(9, Math.floor(W * 0.021));

    const phase = Math.cos(t);
    const vel   = -Math.sin(t);
    const bCx   = eqX + amp * phase;
    const epeR  = phase * phase;
    const ecR   = 1 - epeR;

    // Background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, W, H);

    // Floor line
    const floorY = cy + Math.floor(bW / 2) + 3;
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(wallX - 2, floorY); ctx.lineTo(W - 8, floorY); ctx.stroke();

    // Wall (rectangle + hatch marks)
    ctx.fillStyle = '#64748b';
    ctx.fillRect(wallX - 14, cy - 52, 14, 104);
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(wallX - 14, cy - 46 + i * 18);
      ctx.lineTo(wallX - 24, cy - 36 + i * 18);
      ctx.stroke();
    }

    // Spring (zigzag)
    const sx1 = wallX;
    const sx2 = bCx - Math.floor(bW / 2);
    if (sx2 > sx1 + 16) {
      const coils = 7;
      const segW  = (sx2 - sx1) / (coils * 2 + 1.5);
      const sAmp  = Math.min(15, segW * 1.05);
      const sc    = epeR > 0.45 ? '#f97316' : '#22c55e';
      ctx.beginPath();
      ctx.moveTo(sx1, cy);
      ctx.lineTo(sx1 + segW * 0.5, cy);
      for (let j = 0; j < coils; j++) {
        ctx.lineTo(sx1 + segW * (0.5 + j * 2 + 0.5), cy - sAmp);
        ctx.lineTo(sx1 + segW * (0.5 + j * 2 + 1.5), cy + sAmp);
      }
      ctx.lineTo(sx2, cy);
      ctx.strokeStyle = sc; ctx.lineWidth = 2.2; ctx.lineJoin = 'round'; ctx.stroke();
    }

    // Equilibrium dashed line + label
    ctx.setLineDash([4, 4]); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(eqX, cy - bW / 2 - 14); ctx.lineTo(eqX, floorY); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#94a3b8'; ctx.font = fz + 'px monospace'; ctx.textAlign = 'center';
    ctx.fillText('x = 0', eqX, floorY + 14);

    // Block
    ctx.fillStyle = '#0ea5e9';
    ctx.fillRect(bCx - bW / 2, cy - bW / 2, bW, bW);
    ctx.fillStyle = 'white';
    ctx.font = 'bold ' + Math.max(11, Math.floor(bW * 0.42)) + 'px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('m', bCx, cy + 5);

    // Velocity arrow (purple)
    if (Math.abs(vel) > 0.08) {
      const aLen = Math.abs(vel) * bW * 1.4;
      const aDir = vel > 0 ? 1 : -1;
      const ax1  = vel > 0 ? bCx + bW / 2 : bCx - bW / 2;
      const ax2  = ax1 + aDir * aLen;
      ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(ax1, cy); ctx.lineTo(ax2, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(ax2, cy);
      ctx.lineTo(ax2 - aDir * 7, cy - 5);
      ctx.lineTo(ax2 - aDir * 7, cy + 5);
      ctx.fillStyle = '#7c3aed'; ctx.fill();
    }

    // Energy bars
    const barsY  = H * 0.62;
    const barsH  = H * 0.18;
    const barsW  = W * 0.10;
    const bar1X  = W * 0.28;
    const bar2X  = W * 0.62;

    // Epe (orange)
    ctx.fillStyle = '#ffedd5'; ctx.fillRect(bar1X, barsY, barsW, barsH);
    ctx.fillStyle = '#f97316'; ctx.fillRect(bar1X, barsY + barsH * (1 - epeR), barsW, barsH * epeR);
    ctx.strokeStyle = '#ea580c'; ctx.lineWidth = 1; ctx.strokeRect(bar1X, barsY, barsW, barsH);
    ctx.fillStyle = '#ea580c'; ctx.font = 'bold ' + fz + 'px monospace'; ctx.textAlign = 'center';
    ctx.fillText('Epe', bar1X + barsW / 2, barsY - 5);

    // Ec (green)
    ctx.fillStyle = '#dcfce7'; ctx.fillRect(bar2X, barsY, barsW, barsH);
    ctx.fillStyle = '#22c55e'; ctx.fillRect(bar2X, barsY + barsH * (1 - ecR), barsW, barsH * ecR);
    ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 1; ctx.strokeRect(bar2X, barsY, barsW, barsH);
    ctx.fillStyle = '#16a34a'; ctx.font = 'bold ' + fz + 'px monospace'; ctx.textAlign = 'center';
    ctx.fillText('Ec', bar2X + barsW / 2, barsY - 5);

    // Em = constante (below bars, avoids overlap with x=0)
    ctx.fillStyle = '#64748b'; ctx.font = (fz - 1) + 'px monospace'; ctx.textAlign = 'center';
    ctx.fillText('Em = Epe + Ec = constante', W / 2, barsY + barsH + 13);

    // State label (bottom)
    let label, lc;
    if      (phase < -0.85)               { label = 'Compressão máxima — Epe máxima, Ec = 0'; lc = '#ea580c'; }
    else if (phase >  0.85)               { label = 'Extensão máxima — Epe máxima, Ec = 0';   lc = '#ea580c'; }
    else if (Math.abs(phase) < 0.12)      { label = 'Equilíbrio — Epe = 0, Ec máxima';        lc = '#16a34a'; }
    else if (phase < 0 && vel > 0)        { label = 'Mola se expande → bloco acelera';         lc = '#0369a1'; }
    else if (phase > 0 && vel > 0)        { label = 'Mola se estica → bloco desacelera';       lc = '#0369a1'; }
    else if (phase < 0 && vel < 0)        { label = 'Mola se comprime → bloco desacelera';     lc = '#0369a1'; }
    else                                  { label = 'Mola se contrai → bloco acelera';         lc = '#0369a1'; }
    ctx.fillStyle = lc; ctx.font = fz + 'px monospace'; ctx.textAlign = 'center';
    ctx.fillText(label, W / 2, H - 3);

    if (!paused) {
      t += opts.speed;
      requestAnimationFrame(draw);
    }
  }

  requestAnimationFrame(draw);
}
