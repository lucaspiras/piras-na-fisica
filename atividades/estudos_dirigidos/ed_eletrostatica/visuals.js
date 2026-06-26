// visuals.js — Hero canvas + Field lines canvas

(function () {
  'use strict';

  /* ══════════════════════════════════════════════
     HERO CANVAS — partículas com campos elétricos
  ══════════════════════════════════════════════ */
  function initHero() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Partículas
    const NPART = 60;
    const particles = [];

    for (let i = 0; i < NPART; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - .5) * .4,
        vy: (Math.random() - .5) * .4,
        r: Math.random() * 2 + 1,
        charge: Math.random() > .5 ? 1 : -1,
        alpha: Math.random() * .5 + .2
      });
    }

    // Linhas de campo entre partículas próximas
    function drawConnections() {
      const MAX_DIST = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particles[i].x;
          const dy = particles[j].y - particles[i].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * .18;
            const attract = particles[i].charge !== particles[j].charge;
            ctx.strokeStyle = attract
              ? `rgba(200,169,81,${alpha})`
              : `rgba(100,160,220,${alpha * .6})`;
            ctx.lineWidth = .8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function drawParticles() {
      particles.forEach(p => {
        const col = p.charge > 0 ? '200,169,81' : '100,160,220';
        // Glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grd.addColorStop(0, `rgba(${col},${p.alpha * .6})`);
        grd.addColorStop(1, `rgba(${col},0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `rgba(${col},${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function update() {
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawConnections();
      drawParticles();
      update();
      requestAnimationFrame(loop);
    }

    loop();
  }

  /* ══════════════════════════════════════════════
     FIELD CANVAS — linhas de campo elétrico
  ══════════════════════════════════════════════ */
  let currentMode = 'pos';

  function initFieldCanvas() {
    const canvas = document.getElementById('fieldCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    function resize() {
      const w = canvas.parentElement.clientWidth - 48;
      canvas.width  = Math.max(300, w);
      canvas.height = Math.round(canvas.width * 0.46);
    }
    resize();
    window.addEventListener('resize', () => { resize(); drawMode(currentMode); });

    // Botões
    document.querySelectorAll('.fcbtn').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.fcbtn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentMode = this.dataset.mode;
        drawMode(currentMode);
      });
    });

    drawMode('pos');
  }

  /* Config das cargas por modo */
  function getCharges(mode, W, H) {
    const cx = W / 2, cy = H / 2;
    switch (mode) {
      case 'pos':    return [{ x: cx, y: cy, q: +1 }];
      case 'neg':    return [{ x: cx, y: cy, q: -1 }];
      case 'dipole': return [{ x: cx - W * .22, y: cy, q: +1 }, { x: cx + W * .22, y: cy, q: -1 }];
      case 'equal':  return [{ x: cx - W * .22, y: cy, q: +1 }, { x: cx + W * .22, y: cy, q: +1 }];
      default:       return [{ x: cx, y: cy, q: +1 }];
    }
  }

  /* Campo elétrico em (x, y) dado array de cargas */
  function efield(x, y, charges) {
    let ex = 0, ey = 0;
    charges.forEach(c => {
      const dx = x - c.x, dy = y - c.y;
      const r2 = dx * dx + dy * dy;
      const r  = Math.sqrt(r2);
      if (r < 1) return;
      const mag = c.q / r2;
      ex += mag * dx / r;
      ey += mag * dy / r;
    });
    return { ex, ey };
  }

  function drawMode(mode) {
    const canvas = document.getElementById('fieldCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Fundo
    ctx.fillStyle = '#0a0d12';
    ctx.fillRect(0, 0, W, H);

    const charges = getCharges(mode, W, H);
    const NLINES  = mode === 'pos' || mode === 'neg' ? 20 : 26;
    const STEP    = 3;
    const MAXITER = 600;

    charges.forEach(src => {
      // Ângulos de saída
      for (let a = 0; a < NLINES; a++) {
        const angle = (a / NLINES) * Math.PI * 2;

        // Direção de saída: positiva sai, negativa entra
        const dir = src.q > 0 ? 1 : -1;

        let x = src.x + Math.cos(angle) * 12 * dir;
        let y = src.y + Math.sin(angle) * 12 * dir;

        ctx.beginPath();
        ctx.moveTo(x, y);

        for (let i = 0; i < MAXITER; i++) {
          const { ex, ey } = efield(x, y, charges);
          const mag = Math.sqrt(ex * ex + ey * ey);
          if (mag < 1e-6) break;

          const nx = ex / mag;
          const ny = ey / mag;
          x += nx * STEP * dir;
          y += ny * STEP * dir;

          // Parar se chegou perto de carga negativa
          let hitNeg = false;
          charges.forEach(c => {
            if (c.q < 0) {
              const d = Math.hypot(x - c.x, y - c.y);
              if (d < 10) hitNeg = true;
            }
          });
          if (hitNeg) break;

          // Parar se saiu da tela
          if (x < -20 || x > W + 20 || y < -20 || y > H + 20) break;

          ctx.lineTo(x, y);
        }

        // Gradiente de cor pela posição
        const alpha = .55;
        ctx.strokeStyle = src.q > 0
          ? `rgba(200,169,81,${alpha})`
          : `rgba(100,160,220,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // Desenha as cargas
    charges.forEach(c => {
      // Glow
      const grd = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, 28);
      if (c.q > 0) {
        grd.addColorStop(0, 'rgba(200,169,81,0.35)');
        grd.addColorStop(1, 'rgba(200,169,81,0)');
      } else {
        grd.addColorStop(0, 'rgba(100,160,220,0.35)');
        grd.addColorStop(1, 'rgba(100,160,220,0)');
      }
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(c.x, c.y, 28, 0, Math.PI * 2);
      ctx.fill();

      // Círculo principal
      ctx.fillStyle = c.q > 0 ? '#c8a951' : '#3b6fa0';
      ctx.beginPath();
      ctx.arc(c.x, c.y, 11, 0, Math.PI * 2);
      ctx.fill();

      // Símbolo
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(c.q > 0 ? '+' : '−', c.x, c.y);
    });
  }

  /* ══════════════════════════════════════════════
     INIT
  ══════════════════════════════════════════════ */
  function init() {
    initHero();
    initFieldCanvas();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.EletroDraw = { drawMode };

})();
