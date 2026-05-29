(function () {
  'use strict';

  const DT         = 0.005;   // RK4 step (s)
  const MAX_PH       = 12000;   // phase / ω(t) trace points
  const TS_WINDOW    = 14;      // seconds of scrolling history
  const MAX_POINCARE = 2000;    // Poincaré section dots

  /* ─────────────────────────────────────────────────────
   * PRESETS
   * ───────────────────────────────────────────────────── */
  const PRESETS = {
    livre: {
      g: 9.81, L: 1.0, gamma: 0.0, A: 0.0, we: 2.0,
      theta0: Math.PI / 3, omega0: 0.0,
    },
    amortecido: {
      g: 9.81, L: 1.0, gamma: 0.6, A: 0.0, we: 2.0,
      theta0: Math.PI * 0.8, omega0: 0.0,
    },
    ressonancia: {
      g: 9.81, L: 1.0, gamma: 0.15, A: 1.5, we: 3.13,
      theta0: 0.1, omega0: 0.0,
    },
    caotico: {
      // Grebogi (1987): q=0.5, g̃=1.2, Ω=2/3 — calibrado para g=9.81, L=1
      g: 9.81, L: 1.0, gamma: 1.57, A: 11.8, we: 2.09,
      theta0: 0.2, omega0: 0.0,
    },
  };

  /* ─────────────────────────────────────────────────────
   * STATE
   * ───────────────────────────────────────────────────── */
  let p = Object.assign({}, PRESETS.caotico);
  let s = { theta: p.theta0, omega: p.omega0, t: 0.0 };
  let Q_diss = 0.0;
  let maxBar = 0.1;

  let phHist      = [];   // [{theta_w, omega}]         phase + ω(t) trace
  let tsHist      = [];   // [{t, theta_w, omega, Ft, rest}]  time series
  let poincareHist = [];  // [{theta, omega}] sampled at t = n·T_drive

  let graphMode = 0;  // 0=phase, 1=θ(t), 2=ω(t), 3=Forças(t), 4=Poincaré

  /* ─────────────────────────────────────────────────────
   * PHYSICS
   * ───────────────────────────────────────────────────── */
  function deriv(theta, omega, t) {
    return [
      omega,
      -(p.g / p.L) * Math.sin(theta) - p.gamma * omega + p.A * Math.cos(p.we * t),
    ];
  }

  function rk4(theta, omega, t, dt) {
    const [k1t, k1o] = deriv(theta,               omega,               t);
    const [k2t, k2o] = deriv(theta+0.5*dt*k1t,   omega+0.5*dt*k1o,   t+0.5*dt);
    const [k3t, k3o] = deriv(theta+0.5*dt*k2t,   omega+0.5*dt*k2o,   t+0.5*dt);
    const [k4t, k4o] = deriv(theta+dt*k3t,        omega+dt*k3o,        t+dt);
    return [
      theta + (dt/6)*(k1t + 2*k2t + 2*k3t + k4t),
      omega + (dt/6)*(k1o + 2*k2o + 2*k3o + k4o),
    ];
  }

  function wrapAngle(a) {
    return ((a + Math.PI) % (2*Math.PI) + 2*Math.PI) % (2*Math.PI) - Math.PI;
  }

  function energies() {
    const Ec  = 0.5 * s.omega * s.omega * p.L * p.L;
    const Epg = p.g * p.L * (1 - Math.cos(s.theta));
    return { Ec, Epg, Em: Ec + Epg };
  }

  function advance() {
    const oPrev = s.omega;
    const [nt, no] = rk4(s.theta, s.omega, s.t, DT);
    Q_diss += p.gamma * ((oPrev+no)*0.5) ** 2 * p.L * p.L * DT;

    s.theta = nt;
    s.omega = no;
    s.t    += DT;

    const tw   = wrapAngle(nt);
    const Ft   = p.A * Math.cos(p.we * s.t);
    const rest = -(p.g / p.L) * Math.sin(nt);

    if (phHist.length >= MAX_PH) phHist.shift();
    phHist.push({ theta: tw, omega: no });

    const tCutoff = s.t - TS_WINDOW;
    while (tsHist.length && tsHist[0].t < tCutoff) tsHist.shift();
    tsHist.push({ t: s.t, theta: tw, omega: no, Ft, rest });

    const { Em } = energies();
    if (Em > maxBar) maxBar = Em;

    // Poincaré section: sample at t = n·T_drive
    const T_drive = p.we > 0.01 ? (2 * Math.PI / p.we) : 0;
    if (T_drive > 0) {
      const prevPhase = Math.floor((s.t - DT) / T_drive);
      const currPhase = Math.floor(s.t / T_drive);
      if (currPhase > prevPhase) {
        if (poincareHist.length >= MAX_POINCARE) poincareHist.shift();
        poincareHist.push({ theta: wrapAngle(s.theta), omega: s.omega });
      }
    }
  }

  /* ─────────────────────────────────────────────────────
   * CANVAS SETUP
   * ───────────────────────────────────────────────────── */
  let cvPend, cvGraph, cvEn;
  let ctxPend, ctxGraph, ctxEn;

  function R() { return window.devicePixelRatio || 1; }

  function syncSize(cv) {
    const r = R(), W = cv.offsetWidth, H = cv.offsetHeight;
    const tw = Math.round(W*r), th = Math.round(H*r);
    if (cv.width !== tw || cv.height !== th) { cv.width = tw; cv.height = th; }
  }

  /* ─────────────────────────────────────────────────────
   * SHARED DRAWING HELPERS
   * ───────────────────────────────────────────────────── */
  function arrow(ctx, x1, y1, x2, y2, color, lw) {
    const dx = x2-x1, dy = y2-y1;
    const len = Math.sqrt(dx*dx+dy*dy);
    if (len < 2) return;
    const ux = dx/len, uy = dy/len;
    const hl = Math.min(len*0.38, 10*R());
    ctx.strokeStyle = color; ctx.fillStyle = color;
    ctx.lineWidth = lw || 2*R(); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - hl*(ux-0.45*uy), y2 - hl*(uy+0.45*ux));
    ctx.lineTo(x2 - hl*(ux+0.45*uy), y2 - hl*(uy-0.45*ux));
    ctx.closePath(); ctx.fill();
  }

  function darkBackground(ctx, W, H) {
    ctx.fillStyle = '#080c14';
    ctx.fillRect(0, 0, W, H);
  }

  function faintGrid(ctx, W, H, stepPx) {
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = R();
    for (let x = 0; x < W; x += stepPx) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
    for (let y = 0; y < H; y += stepPx) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
  }

  /* ─────────────────────────────────────────────────────
   * DRAW PENDULUM
   * ───────────────────────────────────────────────────── */
  function drawPendulum() {
    syncSize(cvPend);
    const ctx = ctxPend;
    const r = R(), W = cvPend.width, H = cvPend.height;

    darkBackground(ctx, W, H);
    faintGrid(ctx, W, H, 48*r);

    // Pivot position — lower center so full rotations stay on canvas
    const cx  = W / 2;
    const py  = H * 0.44;
    // Rod: fits full circle (top: py-rod > 0, bottom: py+rod < H)
    const maxRod = Math.min(py, H-py, W/2) * 0.93;
    const rodPx  = Math.min(maxRod, Math.max(H*0.12, maxRod * Math.min(p.L, 1.0)));

    const bx = cx + rodPx * Math.sin(s.theta);
    const by = py + rodPx * Math.cos(s.theta);

    // Equilibrium dashed line
    ctx.strokeStyle = 'rgba(255,255,255,0.07)';
    ctx.setLineDash([5*r, 7*r]); ctx.lineWidth = r;
    ctx.beginPath(); ctx.moveTo(cx, py-rodPx-8*r); ctx.lineTo(cx, py+rodPx+8*r); ctx.stroke();
    ctx.setLineDash([]);

    // Full-circle reference (faint, shown when forcing)
    if (p.A > 0.01) {
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = r;
      ctx.beginPath(); ctx.arc(cx, py, rodPx, 0, 2*Math.PI); ctx.stroke();
    }

    // Angle arc
    if (Math.abs(s.theta) > 0.02) {
      const arcR = Math.min(38*r, rodPx*0.32);
      ctx.strokeStyle = 'rgba(61,214,245,0.3)';
      ctx.lineWidth = 1.5*r;
      ctx.beginPath();
      if (s.theta > 0) ctx.arc(cx, py, arcR, Math.PI/2 - s.theta, Math.PI/2, false);
      else              ctx.arc(cx, py, arcR, Math.PI/2, Math.PI/2 - s.theta, false);
      ctx.stroke();
      // θ label
      const midA = Math.PI/2 - s.theta/2;
      const lr = arcR + 12*r;
      ctx.fillStyle = 'rgba(61,214,245,0.65)';
      ctx.font = `${11*r}px IBM Plex Mono, monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('θ', cx + lr*Math.cos(midA), py + lr*Math.sin(midA) + 4*r);
      ctx.textAlign = 'left';
    }

    // Rod
    ctx.strokeStyle = '#4a5a70'; ctx.lineWidth = 2.5*r; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(cx, py); ctx.lineTo(bx, by); ctx.stroke();

    // Pivot bracket
    ctx.fillStyle = '#1a2535';
    ctx.fillRect(cx-22*r, py-10*r, 44*r, 10*r);
    ctx.fillStyle = '#8899b0';
    ctx.beginPath(); ctx.arc(cx, py, 5*r, 0, 2*Math.PI); ctx.fill();

    // External force arrow (tangential)
    if (p.A > 0.05) {
      const F = p.A * Math.cos(p.we * s.t);
      const Fn = F / p.A;
      const tx = Math.cos(s.theta), ty = -Math.sin(s.theta);
      const len = Math.min(Math.abs(Fn)*55*r, 55*r);
      if (len > 4*r) arrow(ctx, bx, by, bx+Math.sign(Fn)*tx*len, by+Math.sign(Fn)*ty*len, 'rgba(251,191,36,0.9)', 2*r);
    }

    // Velocity arrow (tangential)
    if (Math.abs(s.omega) > 0.02) {
      const tx = Math.cos(s.theta), ty = -Math.sin(s.theta);
      const sig = Math.sign(s.omega);
      const raw = Math.abs(s.omega) * rodPx / (2*Math.sqrt(p.g/p.L));
      const len = Math.min(raw, 60*r);
      if (len > 3*r) arrow(ctx, bx, by, bx+sig*tx*len, by+sig*ty*len, 'rgba(168,85,247,0.9)', 2.5*r);
    }

    // Bob
    ctx.shadowColor = '#3dd6f5'; ctx.shadowBlur = 10*r;
    ctx.fillStyle = '#3dd6f5';
    ctx.beginPath(); ctx.arc(bx, by, 11*r, 0, 2*Math.PI); ctx.fill();
    ctx.shadowBlur = 0;

    // Info labels bottom-left
    ctx.fillStyle = 'rgba(107,120,153,0.7)';
    ctx.font = `${10*r}px IBM Plex Mono, monospace`;
    ctx.textAlign = 'left';
    ctx.fillText(`θ = ${(s.theta*180/Math.PI).toFixed(1)}°`, 10*r, H-28*r);
    ctx.fillText(`t = ${s.t.toFixed(2)} s`,                  10*r, H-13*r);
    // Legend top-right
    if (p.A > 0.05) {
      ctx.fillStyle = 'rgba(251,191,36,0.55)';
      ctx.textAlign = 'right';
      ctx.fillText('── F(t)', W-10*r, H-28*r);
    }
    ctx.fillStyle = 'rgba(168,85,247,0.55)';
    ctx.textAlign = 'right';
    ctx.fillText('── v', W-10*r, H-13*r);
    ctx.textAlign = 'left';
  }

  /* ─────────────────────────────────────────────────────
   * DRAW GRAPH (unified, mode-switchable)
   * ───────────────────────────────────────────────────── */
  function drawGraph() {
    syncSize(cvGraph);
    switch (graphMode) {
      case 0: drawGraphPhase();  break;
      case 1: drawGraphTheta();  break;
      case 2: drawGraphOmega();  break;
      case 3: drawGraphForces();   break;
      case 4: drawGraphPoincare(); break;
    }
  }

  // ── Helpers for axis panels ──
  function setupAxesCtx(ctx, W, H) {
    darkBackground(ctx, W, H);
  }

  function drawAxes(ctx, r, padL, padR, padT, padB, W, H, cx, cy, xLabel, yLabel) {
    ctx.strokeStyle = 'rgba(255,255,255,0.13)'; ctx.lineWidth = r;
    ctx.beginPath(); ctx.moveTo(padL, cy);   ctx.lineTo(W-padR, cy);   ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx,   padT); ctx.lineTo(cx, H-padB);   ctx.stroke();
    ctx.fillStyle = '#2d3c50'; ctx.font = `${10*r}px IBM Plex Mono, monospace`;
    if (xLabel) { ctx.textAlign = 'right'; ctx.fillText(xLabel, W-padR-2*r, cy-5*r); }
    if (yLabel) { ctx.textAlign = 'left';  ctx.fillText(yLabel, cx+5*r, padT+12*r); }
    ctx.textAlign = 'left';
  }

  // ── Mode 0: Phase space ──
  function drawGraphPhase() {
    const ctx = ctxGraph;
    const r = R(), W = cvGraph.width, H = cvGraph.height;
    setupAxesCtx(ctx, W, H);

    const padL=42*r, padR=10*r, padT=20*r, padB=26*r;
    const pw = W-padL-padR, ph = H-padT-padB;
    const cx = padL+pw/2, cy = padT+ph/2;
    const maxT = Math.PI, maxO = 12;

    const tx = (t) => cx + (t/maxT)*(pw/2);
    const ty = (o) => cy - (o/maxO)*(ph/2);

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = r;
    [-Math.PI, -Math.PI/2, 0, Math.PI/2, Math.PI].forEach(a => {
      ctx.beginPath(); ctx.moveTo(tx(a), padT); ctx.lineTo(tx(a), H-padB); ctx.stroke();
    });
    [-8,-4,0,4,8].forEach(o => {
      ctx.beginPath(); ctx.moveTo(padL, ty(o)); ctx.lineTo(W-padR, ty(o)); ctx.stroke();
    });

    drawAxes(ctx, r, padL, padR, padT, padB, W, H, cx, cy, 'θ →', 'ω ↑');

    // Axis labels
    ctx.fillStyle = '#2d3c50'; ctx.font = `${9*r}px IBM Plex Mono, monospace`;
    ctx.textAlign = 'center';
    [['π', Math.PI], ['-π', -Math.PI], ['π/2', Math.PI/2], ['-π/2', -Math.PI/2]].forEach(([lbl, val]) => {
      ctx.fillText(lbl, tx(val), cy+16*r);
    });
    ctx.textAlign = 'right';
    [8,-8].forEach(o => ctx.fillText(o, cx-5*r, ty(o)+4*r));
    ctx.textAlign = 'left';

    // Trace
    if (phHist.length > 1) {
      const n = phHist.length;
      ctx.lineWidth = 1.2*r;
      for (let i = 1; i < n; i++) {
        const pt = phHist[i-1], pn = phHist[i];
        if (Math.abs(pn.theta - pt.theta) > Math.PI*0.9) continue;
        const alpha = 0.06 + 0.65*(i/n);
        ctx.strokeStyle = `rgba(45,212,191,${alpha})`;
        ctx.beginPath();
        ctx.moveTo(tx(pt.theta), ty(pt.omega));
        ctx.lineTo(tx(pn.theta), ty(pn.omega));
        ctx.stroke();
      }
    }

    // Current point
    const curX = tx(wrapAngle(s.theta)), curY = ty(s.omega);
    ctx.shadowColor = '#f59e0b'; ctx.shadowBlur = 8*r;
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath(); ctx.arc(curX, curY, 4*r, 0, 2*Math.PI); ctx.fill();
    ctx.shadowBlur = 0;
  }

  // ── Shared time-series drawing ──
  // xMax is the right boundary in canvas pixels (= W - padR)
  function drawTimeLine(ctx, r, data, getY, color, xMax, padL) {
    if (data.length < 2) return;
    const tMax = data[data.length-1].t;
    const tMin = tMax - TS_WINDOW;
    const plotW = xMax - padL;

    ctx.strokeStyle = color; ctx.lineWidth = 1.5*r; ctx.lineJoin = 'round';
    ctx.beginPath();
    let isFirst = true;
    for (const pt of data) {
      const x = padL + (pt.t - tMin) / TS_WINDOW * plotW;
      if (x < padL - 1) continue;
      const y = getY(pt);
      if (isFirst) { ctx.moveTo(x, y); isFirst = false; }
      else          { ctx.lineTo(x, y); }
    }
    ctx.stroke();
  }

  function timeSeriesSetup(ctx, r, W, H) {
    const padL=40*r, padR=12*r, padT=20*r, padB=24*r;
    const pw=W-padL-padR, ph=H-padT-padB;
    const cy=padT+ph/2;
    setupAxesCtx(ctx, W, H);
    return { padL, padR, padT, padB, pw, ph, cy };
  }

  // ── Mode 1: θ(t) ──
  function drawGraphTheta() {
    const ctx = ctxGraph;
    const r = R(), W = cvGraph.width, H = cvGraph.height;
    const {padL, padR, padT, padB, ph, cy} = timeSeriesSetup(ctx, r, W, H);

    const aToY = (a) => cy - (a/Math.PI)*(ph/2);

    // Reference lines
    ctx.setLineDash([3*r,5*r]);
    ctx.strokeStyle = 'rgba(251,191,36,0.15)'; ctx.lineWidth = r;
    [Math.PI, -Math.PI].forEach(a => {
      ctx.beginPath(); ctx.moveTo(padL, aToY(a)); ctx.lineTo(W-padR, aToY(a)); ctx.stroke();
    });
    ctx.setLineDash([]);
    ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = r;
    ctx.beginPath(); ctx.moveTo(padL, cy); ctx.lineTo(W-padR, cy); ctx.stroke();

    // y labels
    ctx.fillStyle = '#2d3c50'; ctx.font = `${9*r}px IBM Plex Mono, monospace`;
    ctx.textAlign = 'right';
    ctx.fillText('π',   padL-5*r, aToY(Math.PI)+4*r);
    ctx.fillText('0',   padL-5*r, cy+4*r);
    ctx.fillText('−π',  padL-5*r, aToY(-Math.PI)+4*r);
    ctx.fillText('θ(t)', W-padR-2*r, padT+12*r);
    ctx.textAlign = 'left';

    drawTimeLine(ctx, r, tsHist, pt => aToY(pt.theta), '#3dd6f5', W-padR, padL);
    drawTimeLabel(ctx, r, W, H, padR);
  }

  // ── Mode 2: ω(t) ──
  function drawGraphOmega() {
    const ctx = ctxGraph;
    const r = R(), W = cvGraph.width, H = cvGraph.height;
    const {padL, padR, padT, padB, ph, cy} = timeSeriesSetup(ctx, r, W, H);

    const maxO = 14;
    const oToY = (o) => cy - (o/maxO)*(ph/2);

    ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = r;
    ctx.beginPath(); ctx.moveTo(padL, cy); ctx.lineTo(W-padR, cy); ctx.stroke();

    ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = r;
    [-8,-4,4,8].forEach(o => {
      ctx.beginPath(); ctx.moveTo(padL, oToY(o)); ctx.lineTo(W-padR, oToY(o)); ctx.stroke();
    });

    ctx.fillStyle = '#2d3c50'; ctx.font = `${9*r}px IBM Plex Mono, monospace`;
    ctx.textAlign = 'right';
    ctx.fillText('8',   padL-5*r, oToY(8)+4*r);
    ctx.fillText('0',   padL-5*r, cy+4*r);
    ctx.fillText('−8',  padL-5*r, oToY(-8)+4*r);
    ctx.fillText('ω(t)', W-padR-2*r, padT+12*r);
    ctx.textAlign = 'left';

    drawTimeLine(ctx, r, tsHist, pt => oToY(pt.omega), '#a78bfa', W-padR, padL);
    drawTimeLabel(ctx, r, W, H, padR);
  }

  // ── Mode 3: Forças(t) — 2 linhas ──
  function drawGraphForces() {
    const ctx = ctxGraph;
    const r = R(), W = cvGraph.width, H = cvGraph.height;
    const {padL, padR, padT, padB, ph, cy} = timeSeriesSetup(ctx, r, W, H);

    const maxAcc = Math.max(p.g/p.L, p.A, 2);
    const aToY = (a) => cy - (a/maxAcc)*(ph/2);

    ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = r;
    ctx.beginPath(); ctx.moveTo(padL, cy); ctx.lineTo(W-padR, cy); ctx.stroke();

    ctx.fillStyle = '#2d3c50'; ctx.font = `${9*r}px IBM Plex Mono, monospace`;
    ctx.textAlign = 'right';
    ctx.fillText(maxAcc.toFixed(1), padL-5*r, aToY(maxAcc)+4*r);
    ctx.fillText('0',               padL-5*r, cy+4*r);
    ctx.fillText('-'+maxAcc.toFixed(1), padL-5*r, aToY(-maxAcc)+4*r);
    ctx.textAlign = 'left';

    // Line 1: restoring term  −(g/L)·sin θ  (cyan)
    drawTimeLine(ctx, r, tsHist, pt => aToY(pt.rest), '#3dd6f5', W-padR, padL);

    // Line 2: forcing term  F₀·cos(ωₑt)  (amber)
    if (p.A > 0.01) {
      drawTimeLine(ctx, r, tsHist, pt => aToY(pt.Ft), '#fbbf24', W-padR, padL);
    }

    // Legend
    ctx.font = `${9*r}px IBM Plex Mono, monospace`;
    ctx.textAlign = 'right';
    ctx.fillStyle = '#3dd6f5'; ctx.fillText('── −(g/L)sin θ', W-padR-2*r, padT+12*r);
    if (p.A > 0.01) {
      ctx.fillStyle = '#fbbf24'; ctx.fillText('── F₀cos(ωₑt)', W-padR-2*r, padT+25*r);
    }
    ctx.textAlign = 'left';
    drawTimeLabel(ctx, r, W, H, padR);
  }

  // ── Mode 4: Poincaré section ──
  function drawGraphPoincare() {
    const ctx = ctxGraph;
    const r = R(), W = cvGraph.width, H = cvGraph.height;
    setupAxesCtx(ctx, W, H);

    const padL=42*r, padR=10*r, padT=20*r, padB=26*r;
    const pw = W-padL-padR, ph = H-padT-padB;
    const cx = padL+pw/2, cy = padT+ph/2;
    const maxT = Math.PI, maxO = 12;

    const tx = (t) => cx + (t/maxT)*(pw/2);
    const ty = (o) => cy - (o/maxO)*(ph/2);

    // Same grid as phase space
    ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = r;
    [-Math.PI, -Math.PI/2, 0, Math.PI/2, Math.PI].forEach(a => {
      ctx.beginPath(); ctx.moveTo(tx(a), padT); ctx.lineTo(tx(a), H-padB); ctx.stroke();
    });
    [-8,-4,0,4,8].forEach(o => {
      ctx.beginPath(); ctx.moveTo(padL, ty(o)); ctx.lineTo(W-padR, ty(o)); ctx.stroke();
    });

    drawAxes(ctx, r, padL, padR, padT, padB, W, H, cx, cy, 'θ →', 'ω ↑');

    ctx.fillStyle = '#2d3c50'; ctx.font = `${9*r}px IBM Plex Mono, monospace`;
    ctx.textAlign = 'center';
    [['π', Math.PI], ['-π', -Math.PI], ['π/2', Math.PI/2], ['-π/2', -Math.PI/2]].forEach(([lbl, val]) => {
      ctx.fillText(lbl, tx(val), cy+16*r);
    });
    ctx.textAlign = 'right';
    [8,-8].forEach(o => ctx.fillText(o, cx-5*r, ty(o)+4*r));
    ctx.textAlign = 'left';

    if (p.we < 0.01) {
      ctx.fillStyle = '#4a5878';
      ctx.font = `${11*r}px IBM Plex Mono, monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('Sem forçamento — seção não definida', W/2, H/2);
      ctx.textAlign = 'left';
      return;
    }

    // Scatter dots — color cycles from dim to bright as history grows
    const n = poincareHist.length;
    for (let i = 0; i < n; i++) {
      const pt = poincareHist[i];
      const age = i / Math.max(n-1, 1);
      const alpha = 0.25 + 0.75 * age;
      const hue = 200 + age * 60; // cyan→purple gradient
      ctx.fillStyle = `hsla(${hue},80%,65%,${alpha})`;
      ctx.beginPath();
      ctx.arc(tx(pt.theta), ty(pt.omega), 3*r, 0, 2*Math.PI);
      ctx.fill();
    }

    // Current sample dot (highlighted)
    if (n > 0) {
      const last = poincareHist[n-1];
      ctx.shadowColor = '#f59e0b'; ctx.shadowBlur = 8*r;
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath(); ctx.arc(tx(last.theta), ty(last.omega), 4*r, 0, 2*Math.PI); ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Legend
    const T_drive = 2 * Math.PI / p.we;
    ctx.fillStyle = '#2d3c50'; ctx.font = `${9*r}px IBM Plex Mono, monospace`;
    ctx.textAlign = 'right';
    ctx.fillText(`T = 2π/ωₑ ≈ ${T_drive.toFixed(2)} s  ·  ${n} pts`, W-padR-2*r, padT+12*r);
    ctx.textAlign = 'left';
  }

  function drawTimeLabel(ctx, r, W, H, padR) {
    ctx.fillStyle = '#2a3448';
    ctx.font = `${9*r}px IBM Plex Mono, monospace`;
    ctx.textAlign = 'right';
    ctx.fillText(`t = ${s.t.toFixed(1)} s`, W-padR, H-5*r);
    ctx.textAlign = 'left';
  }

  /* ─────────────────────────────────────────────────────
   * DRAW ENERGY (full-width strip)
   * ───────────────────────────────────────────────────── */
  function drawEnergy() {
    syncSize(cvEn);
    const ctx = ctxEn;
    const r = R(), W = cvEn.width, H = cvEn.height;

    darkBackground(ctx, W, H);

    const { Ec, Epg, Em } = energies();
    const scale = maxBar > 0.001 ? 1/maxBar : 1;
    const F  = p.A * Math.cos(p.we * s.t);
    const Fn = p.A > 0.01 ? F/p.A : 0;

    // Layout: label | bar track | value column
    const padL = 54*r, padR = 10*r, padT = 22*r, valW = 76*r;
    const barH = 11*r, barGap = 7*r;
    const barW = W - padL - padR - valW;
    const halfW = barW / 2;
    const valX = W - padR - 4*r;        // right-aligned value position
    const lblColor = '#6b8099';

    const rows = [
      { label:'Ec',  val: Ec,  color:'#22d3ee' },
      { label:'Epg', val: Epg, color:'#fb923c' },
      { label:'Em',  val: Em,  color:'#a78bfa' },
    ];

    ctx.font = `${10*r}px IBM Plex Mono, monospace`;

    rows.forEach((row, i) => {
      const y = padT + i * (barH + barGap);
      const bw = Math.max(0, Math.min(row.val * scale * barW, barW));

      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.fillRect(padL, y, barW, barH);

      ctx.fillStyle = row.color; ctx.globalAlpha = 0.78;
      ctx.fillRect(padL, y, bw, barH);
      ctx.globalAlpha = 1;

      ctx.fillStyle = lblColor; ctx.textAlign = 'right';
      ctx.fillText(row.label, padL - 6*r, y + barH - 2*r);

      ctx.fillStyle = row.color; ctx.textAlign = 'right';
      ctx.fillText(row.val.toFixed(2), valX, y + barH - 2*r);
    });

    // Force bar (signed, center-anchored)
    const FRow = padT + 3 * (barH + barGap);
    const cx = padL + halfW;

    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fillRect(padL, FRow, barW, barH);

    ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = r;
    ctx.beginPath(); ctx.moveTo(cx, FRow); ctx.lineTo(cx, FRow + barH); ctx.stroke();

    if (p.A > 0.01) {
      const fw = Math.abs(Fn) * halfW;
      ctx.fillStyle = '#fbbf24'; ctx.globalAlpha = 0.78;
      if (Fn >= 0) ctx.fillRect(cx,      FRow, fw, barH);
      else          ctx.fillRect(cx - fw, FRow, fw, barH);
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#fbbf24'; ctx.textAlign = 'right';
      ctx.fillText(F.toFixed(2), valX, FRow + barH - 2*r);
    }
    ctx.fillStyle = lblColor; ctx.textAlign = 'right';
    ctx.fillText('F(t)', padL - 6*r, FRow + barH - 2*r);

    // Q_diss
    const qY = FRow + barH + barGap;
    ctx.fillStyle = lblColor; ctx.textAlign = 'right';
    ctx.fillText('Qdiss', padL - 6*r, qY + 10*r);
    ctx.fillStyle = '#f87171'; ctx.textAlign = 'left';
    ctx.fillText(Q_diss.toFixed(2) + ' J/kg', padL + 4*r, qY + 10*r);
    ctx.textAlign = 'left';
  }

  /* ─────────────────────────────────────────────────────
   * RENDER + ANIMATION LOOP
   * ───────────────────────────────────────────────────── */
  function render() {
    drawPendulum();
    drawGraph();
    drawEnergy();
  }

  let running = true;
  let animId  = null;
  let lastTs  = null;
  let acc     = 0;

  function tick(now) {
    if (!running) return;
    if (lastTs === null) lastTs = now;
    const elapsed = Math.min((now - lastTs) * 0.001, 0.05);
    lastTs = now;
    acc += elapsed;
    while (acc >= DT) { advance(); acc -= DT; }
    render();
    updateInfoPanel();
    animId = requestAnimationFrame(tick);
  }

  /* ─────────────────────────────────────────────────────
   * INFO PANEL
   * ───────────────────────────────────────────────────── */
  function updateInfoPanel() {
    const w0 = Math.sqrt(p.g / p.L);
    const { Ec, Epg, Em } = energies();
    const F = p.A * Math.cos(p.we * s.t);
    setText('infoW0',    w0.toFixed(3) + ' rad/s');
    setText('infoRatio', p.A > 0 ? (p.we/w0).toFixed(3) : '—');
    setText('infoTheta', (s.theta*180/Math.PI).toFixed(1) + '°');
    setText('infoOmega', s.omega.toFixed(3) + ' rad/s');
    setText('infoForce', p.A > 0.01 ? F.toFixed(3) + ' rad/s²' : '—');
    setText('infoEc',    Ec.toFixed(3) + ' J/kg');
    setText('infoEpg',   Epg.toFixed(3) + ' J/kg');
    setText('infoEm',    Em.toFixed(3) + ' J/kg');
    setText('infoQdiss', Q_diss.toFixed(3) + ' J/kg');
    setText('infoT',     s.t.toFixed(2) + ' s');
  }

  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  /* ─────────────────────────────────────────────────────
   * EQUATION DISPLAY
   * ───────────────────────────────────────────────────── */
  function updateEquation() {
    const hasDamping = p.gamma > 0.001;
    const hasForcing = p.A     > 0.001;

    const typeLabel = !hasDamping && !hasForcing ? 'Pêndulo Livre'
                    : hasDamping  && !hasForcing ? 'Pêndulo Amortecido'
                    : 'Pêndulo Amortecido Forçado';
    setText('eqTypeBadge', typeLabel);

    const dampRow = document.getElementById('eqRowDamping');
    const forcRow = document.getElementById('eqRowForcing');
    if (dampRow) dampRow.style.display = hasDamping ? 'flex' : 'none';
    if (forcRow) forcRow.style.display = hasForcing ? 'flex' : 'none';

    const pgL = document.getElementById('eqParamGamma');
    const paA = document.getElementById('eqParamA');
    const paW = document.getElementById('eqParamWe');
    if (pgL) pgL.style.opacity = hasDamping ? '1' : '0.3';
    if (paA) paA.style.opacity = hasForcing ? '1' : '0.3';
    if (paW) paW.style.opacity = hasForcing ? '1' : '0.3';

    setText('eqPgL',    (p.g/p.L).toFixed(3));
    setText('eqPg',     p.g.toFixed(2));
    setText('eqPL',     p.L.toFixed(2));
    setText('eqPgamma', hasDamping ? p.gamma.toFixed(3) : '—');
    setText('eqPA',     hasForcing ? p.A.toFixed(2)     : '—');
    setText('eqPwe',    hasForcing ? p.we.toFixed(3)    : '—');
  }

  /* ─────────────────────────────────────────────────────
   * CONTROLS
   * ───────────────────────────────────────────────────── */
  function bindParam(sliderId, numId, key) {
    const sl = document.getElementById(sliderId);
    const nm = document.getElementById(numId);
    if (!sl || !nm) return;
    const apply = (v) => {
      const val = parseFloat(v);
      if (isNaN(val)) return;
      p[key] = val;
      sl.value = val; nm.value = val;
      updateEquation();
    };
    sl.addEventListener('input',  () => apply(sl.value));
    nm.addEventListener('change', () => apply(nm.value));
  }

  function syncSliders() {
    const keys = [['slider_L','num_L','L'],['slider_g','num_g','g'],
                  ['slider_gamma','num_gamma','gamma'],['slider_A','num_A','A'],
                  ['slider_we','num_we','we'],['slider_theta0','num_theta0','theta0']];
    keys.forEach(([sid, nid, key]) => {
      const sl = document.getElementById(sid), nm = document.getElementById(nid);
      if (sl) sl.value = p[key];
      if (nm) nm.value = p[key];
    });
  }

  function applyPreset(name) {
    const pr = PRESETS[name];
    if (!pr) return;
    p = Object.assign({}, pr);
    syncSliders();
    document.querySelectorAll('.btn-preset').forEach(b =>
      b.classList.toggle('active', b.dataset.preset === name)
    );
    resetSim();
    updateEquation();
  }

  function resetSim() {
    s.theta = p.theta0;
    s.omega = p.omega0 || 0;
    s.t     = 0;
    Q_diss  = 0;
    const { Em } = energies();
    maxBar  = Math.max(Em, 0.1);
    phHist       = [];
    tsHist       = [];
    poincareHist = [];
    acc     = 0;
    lastTs  = null;
  }

  function setupControls() {
    bindParam('slider_L',      'num_L',      'L');
    bindParam('slider_g',      'num_g',      'g');
    bindParam('slider_gamma',  'num_gamma',  'gamma');
    bindParam('slider_A',      'num_A',      'A');
    bindParam('slider_we',     'num_we',     'we');
    bindParam('slider_theta0', 'num_theta0', 'theta0');

    document.querySelectorAll('[data-preset]').forEach(btn =>
      btn.addEventListener('click', () => applyPreset(btn.dataset.preset))
    );

    document.querySelectorAll('.graph-tab').forEach(btn =>
      btn.addEventListener('click', () => {
        graphMode = parseInt(btn.dataset.mode, 10);
        document.querySelectorAll('.graph-tab').forEach(b =>
          b.classList.toggle('active', b === btn)
        );
      })
    );

    document.getElementById('btnPlayPause').addEventListener('click', () => {
      running = !running;
      document.getElementById('btnPlayPause').textContent = running ? '⏸ Pausar' : '▶ Continuar';
      if (running) { lastTs = null; animId = requestAnimationFrame(tick); }
    });

    document.getElementById('btnReset').addEventListener('click', () => {
      resetSim();
      if (!running) {
        running = true;
        document.getElementById('btnPlayPause').textContent = '⏸ Pausar';
        lastTs = null;
        animId = requestAnimationFrame(tick);
      }
    });

    document.getElementById('btnClearPhase').addEventListener('click', () => {
      phHist = []; tsHist = [];
    });

    document.querySelectorAll('.section-header').forEach(hdr =>
      hdr.addEventListener('click', () => {
        hdr.classList.toggle('collapsed');
        const body = hdr.nextElementSibling;
        if (body) body.classList.toggle('hidden');
      })
    );
  }

  /* ─────────────────────────────────────────────────────
   * INIT
   * ───────────────────────────────────────────────────── */
  function init() {
    cvPend  = document.getElementById('canvasPendulum');
    cvGraph = document.getElementById('canvasGraph');
    cvEn    = document.getElementById('canvasEnergy');

    ctxPend  = cvPend.getContext('2d');
    ctxGraph = cvGraph.getContext('2d');
    ctxEn    = cvEn.getContext('2d');

    setupControls();
    applyPreset('caotico');
    animId = requestAnimationFrame(tick);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
