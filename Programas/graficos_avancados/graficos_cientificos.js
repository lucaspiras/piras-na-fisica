/* ─────────────────────────────────────────────
   ESTADO GLOBAL
───────────────────────────────────────────── */
let chart = null;
let estiloLinha = 'solid';

const TEMAS = {
  'Científico': ['#1a3a6b','#c0392b','#2e7d32','#7b3f00','#5c3566','#006064','#1a237e','#880e4f'],
  'Matplotlib': ['#1f77b4','#ff7f0e','#2ca02c','#d62728','#9467bd','#8c564b','#e377c2','#7f7f7f'],
  'Seaborn':   ['#4878cf','#6acc65','#d65f5f','#b47cc7','#c4ad66','#77bedb','#e98d3e','#72cce3'],
  'Natureza':  ['#2c7bb6','#abd9e9','#1a9641','#fdae61','#d7191c','#74add1','#a6d96a','#fee08b'],
  'Escuro':    ['#60a5fa','#f87171','#4ade80','#fbbf24','#a78bfa','#34d399','#fb923c','#e879f9'],
  'Monocromático': ['#111111','#333333','#555555','#777777','#999999','#bbbbbb','#222222','#444444'],
  'JHEP':      ['#003087','#cc0000','#006400','#8b4513','#4b0082','#008080','#8b0000','#556b2f'],
  'Nature':    ['#e6550d','#756bb1','#31a354','#3182bd','#636363','#6baed6','#74c476','#9ecae1'],
};

let temaAtual = 'Matplotlib';

const PRESETS = [
  { nome:'Parábola',        eq:['x^2'],                                    titulo:'Função Quadrática',  x:[-5,5] },
  { nome:'Trig. básica',    eq:['sin(x)','cos(x)'],                        titulo:'Seno e Cosseno',     x:[-2*Math.PI, 2*Math.PI] },
  { nome:'Exponencial',     eq:['exp(x)','exp(-x)'],                       titulo:'Exponenciais',       x:[-3,3] },
  { nome:'Funções log',     eq:['log(x)','log10(x)'],                      titulo:'Logaritmos',         x:[0.01,10] },
  { nome:'Equação de onda', eq:['sin(x - pi/2)','sin(2*x)','sin(3*x)'],   titulo:'Harmônicos',         x:[0, 4*Math.PI] },
  { nome:'Hipérbole',       eq:['1/x'],                                    titulo:'Função Hiperbólica', x:[-5,5] },
  { nome:'Série de Taylor', eq:['sin(x)','x - x^3/6 + x^5/120'],          titulo:'Aprox. de Taylor',   x:[-4,4] },
  { nome:'Funções potência',eq:['sqrt(x)','x^(1/3)','x^2'],               titulo:'Funções Potência',   x:[0,5] },
  { nome:'Oscilador amor.', eq:['exp(-0.3*x)*sin(3*x)'],                  titulo:'Oscilador Amortecido', x:[0,10] },
  { nome:'Gaussiana',       eq:['exp(-x^2/2) / sqrt(2*pi)'],              titulo:'Distribuição Normal', x:[-4,4] },
];

let series = [
  { eq: 'sin(x)', label: 'f(x) = sin(x)', cor: '#1f77b4' },
];

/* ─────────────────────────────────────────────
   INICIALIZAÇÃO
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderizarTemas();
  renderizarPresets();
  renderizarSeries();
  bindSliders();
  gerarGrafico();

  Chart.defaults.font.family = "'IBM Plex Mono', monospace";
  Chart.defaults.color = '#222222';

  const fundoBranco = {
    id: 'fundoBranco',
    beforeDraw(c) {
      const { ctx, width, height } = c;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = document.getElementById('corFundo').value;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }
  };
  Chart.register(fundoBranco);
});

function bindSliders() {
  document.getElementById('espessuraLinha').addEventListener('input', function() {
    document.getElementById('espessuraLabel').textContent = this.value + ' px';
  });
  document.getElementById('tamTitulo').addEventListener('input', function() {
    document.getElementById('tamTituloLabel').textContent = this.value + ' px';
  });
}

/* ─────────────────────────────────────────────
   TEMAS
───────────────────────────────────────────── */
function renderizarTemas() {
  const row = document.getElementById('themeRow');
  row.innerHTML = '';
  Object.keys(TEMAS).forEach(nome => {
    const btn = document.createElement('button');
    btn.className = 'theme-btn' + (nome === temaAtual ? ' active' : '');
    const cores = TEMAS[nome].slice(0,4);
    const grad = `linear-gradient(90deg, ${cores.join(',')})`;
    btn.innerHTML = `<div class="theme-preview" style="background:${grad}"></div>${nome}`;
    btn.onclick = () => { temaAtual = nome; renderizarTemas(); atualizarCoresSeries(); };
    row.appendChild(btn);
  });
}

function atualizarCoresSeries() {
  const cores = TEMAS[temaAtual];
  series.forEach((s, i) => { s.cor = cores[i % cores.length]; });
  renderizarSeries();
}

/* ─────────────────────────────────────────────
   SÉRIES
───────────────────────────────────────────── */
function renderizarSeries() {
  const list = document.getElementById('seriesList');
  list.innerHTML = '';
  series.forEach((s, i) => {
    const item = document.createElement('div');
    item.className = 'serie-item';
    item.innerHTML = `
      <div class="serie-header">
        <span class="serie-num">f${i+1}</span>
        <span class="serie-eq-preview">${s.eq || '...'}</span>
        <div class="serie-color-dot" style="background:${s.cor}"></div>
      </div>
      <div class="serie-body">
        <div class="field">
          <label>Equação</label>
          <input type="text" value="${s.eq}" placeholder="ex: sin(x)" oninput="series[${i}].eq=this.value; atualizarPreviewSerie(${i},this.value)">
        </div>
        <div class="field-row">
          <div class="field">
            <label>Rótulo</label>
            <input type="text" value="${s.label}" oninput="series[${i}].label=this.value">
          </div>
          <div class="field">
            <label>Cor</label>
            <input type="color" value="${s.cor}" oninput="series[${i}].cor=this.value; atualizarDotCor(${i},this.value)">
          </div>
        </div>
        ${series.length > 1 ? `<button class="btn-secondary" style="font-size:0.68rem;padding:0.3rem" onclick="removerSerie(${i})">✕ Remover</button>` : ''}
      </div>`;
    list.appendChild(item);
  });
}

function atualizarPreviewSerie(i, val) {
  const items = document.querySelectorAll('.serie-eq-preview');
  if (items[i]) items[i].textContent = val || '...';
}

function atualizarDotCor(i, cor) {
  const dots = document.querySelectorAll('.serie-color-dot');
  if (dots[i]) dots[i].style.background = cor;
}

function adicionarSerie() {
  const cores = TEMAS[temaAtual];
  const i = series.length;
  series.push({ eq: 'x', label: `f${i+1}(x)`, cor: cores[i % cores.length] });
  renderizarSeries();
}

function removerSerie(i) {
  series.splice(i, 1);
  renderizarSeries();
}

/* ─────────────────────────────────────────────
   PRESETS
───────────────────────────────────────────── */
function renderizarPresets() {
  const grid = document.getElementById('presetsGrid');
  PRESETS.forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'preset-btn';
    btn.innerHTML = `<span class="preset-name">${p.nome}</span><span class="preset-eq">${p.eq.join(' ; ')}</span>`;
    btn.onclick = () => aplicarPreset(p);
    grid.appendChild(btn);
  });
}

function aplicarPreset(p) {
  const cores = TEMAS[temaAtual];
  series = p.eq.map((eq, i) => ({
    eq,
    label: formatarExpressao(eq),
    cor: cores[i % cores.length]
  }));
  document.getElementById('xmin').value = p.x[0];
  document.getElementById('xmax').value = p.x[1];
  document.getElementById('tituloGrafico').value = p.titulo;
  renderizarSeries();
  gerarGrafico();
  mostrarNotif('Preset aplicado: ' + p.nome);
}

/* ─────────────────────────────────────────────
   TOOLBAR
───────────────────────────────────────────── */
function setLineStyle(style) {
  estiloLinha = style;
  document.querySelectorAll('[id^="tb"]').forEach(b => b.classList.remove('active'));
  const ids = { solid:'tbSolid', dashed:'tbDashed', dotted:'tbDotted' };
  document.getElementById(ids[style]).classList.add('active');
}

function getLineDash() {
  if (estiloLinha === 'dashed') return [8, 5];
  if (estiloLinha === 'dotted') return [2, 4];
  return [];
}

/* ─────────────────────────────────────────────
   FORMATO PREDEFINIDO
───────────────────────────────────────────── */
function aplicarFormato() {
  const val = document.getElementById('formatoPredefinido').value;
  if (val === 'custom') return;
  const [w, h] = val.split('x').map(Number);
  document.getElementById('larguraGrafico').value = w;
  document.getElementById('alturaGrafico').value = h;
}

/* ─────────────────────────────────────────────
   GERAR GRÁFICO
───────────────────────────────────────────── */
function gerarGrafico() {
  const xmin       = parseFloat(document.getElementById('xmin').value);
  const xmax       = parseFloat(document.getElementById('xmax').value);
  const yminVal    = document.getElementById('ymin').value;
  const ymaxVal    = document.getElementById('ymax').value;
  const ymin       = yminVal !== '' ? parseFloat(yminVal) : null;
  const ymax       = ymaxVal !== '' ? parseFloat(ymaxVal) : null;
  const passoCurva = parseFloat(document.getElementById('passoCurva').value);
  const largura    = parseInt(document.getElementById('larguraGrafico').value, 10);
  const altura     = parseInt(document.getElementById('alturaGrafico').value, 10);
  const dpi        = parseInt(document.getElementById('dpiExporte').value, 10);

  const tituloGrafico   = document.getElementById('tituloGrafico').value;
  const subtituloGrafico= document.getElementById('subtituloGrafico').value;
  const tituloX         = document.getElementById('tituloX').value;
  const tituloY         = document.getElementById('tituloY').value;
  const posLegenda      = document.getElementById('posLegenda').value;

  const mostrarGrade    = document.getElementById('mostrarGrade').checked;
  const gradeMinor      = document.getElementById('gradeMinor').checked;
  const mostrarPontos   = document.getElementById('mostrarPontos').checked;
  const preencherArea   = document.getElementById('preencherArea').checked;
  const areaOpaca       = document.getElementById('areaOpaca').checked;
  const suavizar        = document.getElementById('suavizarCurva').checked;

  const corFundo        = document.getElementById('corFundo').value;
  const corEixos        = document.getElementById('corEixos').value;
  const corTexto        = document.getElementById('corTexto').value;
  const espessura       = parseFloat(document.getElementById('espessuraLinha').value);
  const fonteFamilia    = document.getElementById('fonteFamiliaGrafico').value;
  const tamTitulo       = parseInt(document.getElementById('tamTitulo').value, 10);
  const escalaX         = document.getElementById('escalaX').value;
  const escalaY         = document.getElementById('escalaY').value;
  const tipoMarcador    = document.getElementById('tipoMarcador').value;
  const tamMarcador     = parseInt(document.getElementById('tamMarcador').value, 10);
  const interpolacao    = document.getElementById('interpolacao').value;

  if (!Number.isFinite(xmin) || !Number.isFinite(xmax) || xmin >= xmax) {
    setStatus('Intervalo de x inválido.', 'error'); return;
  }
  if (!Number.isFinite(passoCurva) || passoCurva <= 0) {
    setStatus('Passo inválido.', 'error'); return;
  }
  if (series.length === 0) {
    setStatus('Adicione pelo menos uma função.', 'error'); return;
  }

  const valoresX = gerarValoresX(xmin, xmax, passoCurva);

  const datasets = [];
  let erros = [];

  series.forEach((s, i) => {
    try {
      const expr = math.compile(s.eq);
      const valores = valoresX.map(x => {
        try {
          const y = expr.evaluate({ x, pi: Math.PI, e: Math.E });
          return { x, y: (Number.isFinite(y) && !isNaN(y)) ? y : null };
        } catch { return { x, y: null }; }
      });

      const hexToRgba = (hex, a) => {
        const r = parseInt(hex.slice(1,3),16);
        const g = parseInt(hex.slice(3,5),16);
        const b = parseInt(hex.slice(5,7),16);
        return `rgba(${r},${g},${b},${a})`;
      };

      const fillAlpha = areaOpaca ? 0.35 : 0.15;

      datasets.push({
        label: s.label || formatarExpressao(s.eq),
        data: valores,
        borderColor: s.cor,
        backgroundColor: preencherArea ? hexToRgba(s.cor, fillAlpha) : 'transparent',
        borderWidth: espessura,
        fill: preencherArea ? 'origin' : false,
        spanGaps: false,
        tension: suavizar ? 0.3 : 0,
        cubicInterpolationMode: interpolacao === 'monotone' ? 'monotone' : undefined,
        stepped: interpolacao === 'step' ? true : (interpolacao === 'stepBefore' ? 'before' : false),
        borderDash: getLineDash(),
        pointStyle: tipoMarcador,
        pointRadius: mostrarPontos ? tamMarcador : 0,
        pointHoverRadius: mostrarPontos ? tamMarcador + 2 : 4,
        pointBorderWidth: 1.5,
        pointBackgroundColor: corFundo,
        pointBorderColor: s.cor,
        hitRadius: 10,
      });
    } catch(err) {
      erros.push(`f${i+1}: sintaxe inválida`);
    }
  });

  if (erros.length > 0) {
    setStatus(erros.join(' | '), 'error');
    return;
  }

  // Rebuild canvas
  const container = document.getElementById('canvasContainer');
  if (chart) { chart.destroy(); chart = null; }
  container.innerHTML = '';
  const canvas = document.createElement('canvas');
  canvas.id = 'graficoCanvas';
  canvas.width = largura;
  canvas.height = altura;
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  // Tooltip mousemove for coords
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleRatio = canvas.width / rect.width;
    if (chart) {
      const x = (e.clientX - rect.left) * scaleRatio;
      const xVal = chart.scales.x.getValueForPixel(x);
      if (xVal !== undefined) {
        document.getElementById('coordsDisplay').textContent = `x = ${fmt(xVal)}`;
      }
    }
  });
  canvas.addEventListener('mouseleave', () => {
    document.getElementById('coordsDisplay').textContent = '';
  });

  const tituloTexto = subtituloGrafico ? [tituloGrafico, subtituloGrafico] : tituloGrafico;

  chart = new Chart(ctx, {
    type: 'line',
    data: { datasets },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      devicePixelRatio: dpi,
      animation: { duration: 350, easing: 'easeOutQuart' },
      interaction: { mode: 'nearest', intersect: false, axis: 'x' },
      layout: { padding: { top: 16, right: 24, bottom: 12, left: 16 } },
      plugins: {
        legend: posLegenda === 'none' ? { display: false } : {
          display: true,
          position: posLegenda,
          align: 'center',
          labels: {
            boxWidth: 30, boxHeight: 2,
            usePointStyle: false,
            padding: 20,
            color: corTexto,
            font: { family: fonteFamilia, size: 12, weight: '600' }
          }
        },
        title: {
          display: true,
          text: tituloTexto,
          color: corTexto,
          padding: { top: 8, bottom: 20 },
          font: { family: fonteFamilia, size: tamTitulo, weight: '700' }
        },
        tooltip: {
          backgroundColor: 'rgba(10,20,40,0.92)',
          borderColor: 'rgba(255,255,255,0.15)',
          borderWidth: 1,
          padding: 12,
          displayColors: true,
          callbacks: {
            title(items) { return `x = ${fmt(items[0].parsed.x)}`; },
            label(item) { return `  ${item.dataset.label} = ${fmt(item.parsed.y)}`; }
          },
          titleFont: { family: fonteFamilia, size: 11 },
          bodyFont:  { family: fonteFamilia, size: 11 }
        }
      },
      scales: {
        x: criarEscala(tituloX, true,  mostrarGrade, gradeMinor, corEixos, corTexto, fonteFamilia, escalaX, ymin, ymax),
        y: criarEscala(tituloY, false, mostrarGrade, gradeMinor, corEixos, corTexto, fonteFamilia, escalaY, ymin, ymax),
      }
    }
  });

  setStatus(`Gráfico gerado — ${series.length} função(ões), ${valoresX.length} pontos por curva.`, 'ok');
}

function criarEscala(titulo, eixoX, grade, gradeMinor, corGrade, corTexto, fonte, tipo, ymin, ymax) {
  const cfg = {
    type: tipo,
    title: {
      display: true, text: titulo, color: corTexto,
      font: { family: fonte, size: 13, weight: '700' },
      padding: { top: 4, bottom: 4 }
    },
    ticks: {
      maxTicksLimit: eixoX ? 11 : 9,
      color: corTexto,
      padding: 8,
      font: { family: fonte, size: 11 },
      callback(v) { return fmt(v); }
    },
    border: { color: corGrade, width: 1.5 },
    grid: {
      display: grade,
      color(ctx) {
        const v = Number(ctx.tick.value);
        return v === 0 ? corTexto + '66' : corTexto + '22';
      },
      lineWidth(ctx) { return Number(ctx.tick.value) === 0 ? 1.5 : 1; },
      drawTicks: true,
    }
  };
  if (!eixoX) {
    if (ymin !== null) cfg.min = ymin;
    if (ymax !== null) cfg.max = ymax;
  }
  return cfg;
}

/* ─────────────────────────────────────────────
   UTILITÁRIOS
───────────────────────────────────────────── */
function gerarValoresX(xmin, xmax, passo) {
  const v = [];
  for (let x = xmin; x <= xmax + passo/1e4; x += passo) {
    v.push(parseFloat(x.toFixed(8)));
  }
  return v;
}

function formatarExpressao(eq) {
  return eq
    .replace(/\*\*/g, '^')
    .replace(/\*/g, '·')
    .replace(/sqrt\(([^)]+)\)/g, '√($1)')
    .replace(/exp\(([^)]+)\)/g, 'e^($1)')
    .replace(/pi/g, 'π');
}

function fmt(v) {
  if (v === null || v === undefined) return '—';
  const n = Number(v);
  if (Math.abs(n) >= 1e5 || (Math.abs(n) < 0.001 && n !== 0)) {
    return n.toExponential(3);
  }
  return n.toLocaleString('pt-BR', { maximumFractionDigits: 4 });
}

function setStatus(msg, tipo) {
  const el = document.getElementById('statusMsg');
  el.textContent = msg;
  el.className = 'status-msg ' + (tipo || '');
}

function mostrarNotif(msg) {
  const el = document.getElementById('notif');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2500);
}

/* ─────────────────────────────────────────────
   EXPORTAÇÃO
───────────────────────────────────────────── */
function baixarImagem() {
  const canvas = document.getElementById('graficoCanvas');
  if (!canvas || !chart) { mostrarNotif('Gere um gráfico primeiro.'); return; }

  const fmt = document.getElementById('formatoExporte').value;
  const mime = fmt === 'jpeg' ? 'image/jpeg' : 'image/png';
  const ext  = fmt === 'jpeg' ? 'jpeg' : 'png';

  const off = document.createElement('canvas');
  off.width  = canvas.width;
  off.height = canvas.height;
  const octx = off.getContext('2d');
  octx.fillStyle = document.getElementById('corFundo').value;
  octx.fillRect(0, 0, off.width, off.height);
  octx.drawImage(canvas, 0, 0);

  const link = document.createElement('a');
  link.download = `grafico.${ext}`;
  link.href = off.toDataURL(mime, 0.95);
  link.click();
  mostrarNotif('Imagem baixada!');
}

async function copiarParaAreaTransferencia() {
  const canvas = document.getElementById('graficoCanvas');
  if (!canvas || !chart) { mostrarNotif('Gere um gráfico primeiro.'); return; }
  try {
    canvas.toBlob(async blob => {
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
      mostrarNotif('Copiado para a área de transferência!');
    });
  } catch {
    mostrarNotif('Seu navegador não suporta esta função.');
  }
}

/* ─────────────────────────────────────────────
   TOGGLE SECTIONS
───────────────────────────────────────────── */
function toggleSection(header) {
  const body = header.nextElementSibling;
  const collapsed = body.classList.toggle('hidden');
  header.classList.toggle('collapsed', collapsed);
}
