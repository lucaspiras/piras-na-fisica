/**
 * corretor.js
 * Lógica completa de detecção de marcadores ArUco,
 * correção de perspectiva e leitura de bolhas.
 *
 * Fluxo:
 *  1. Usuário carrega foto → loadImage()
 *  2. corrigirProva() → detectAruco() → warpPerspective() → readBubbles()
 *  3. compararGabarito() → mostrarResultado()
 */

'use strict';

// ═══════════════════════════════════════════════
// SUPABASE
// ═══════════════════════════════════════════════

const SUPABASE_URL     = 'https://ksxaxkqnooercwndpdut.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_eK6ljdM_K9cAdWezjyegJw_SudfxPjj';
const PALAVRA_SECRETA  = 'prova1';

async function supabaseFetch(path, method, body, prefer = 'return=representation') {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Prefer': prefer
    },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  if (prefer === 'return=minimal') return null;
  return res.json();
}

// ═══════════════════════════════════════════════
// CONFIGURAÇÃO
// ═══════════════════════════════════════════════

/** Gabarito oficial da prova */
const GABARITO = {
  1:'E', 2:'A', 3:'B', 4:'B', 5:'C',
  6:'A', 7:'D', 8:'E', 9:'A', 10:'B',
  11:'C', 12:'C', 13:'D', 14:'C', 15:'D',
  16:'E', 17:'E', 18:'A', 19:'D', 20:'B'
};

/** Alternativas possíveis */
const ALTS = ['A','B','C','D','E'];

/**
 * Posições relativas das bolhas na folha normalizada (0..1).
 * Coordenadas medidas sobre a folha A4 impressa:
 *   - Coluna de cada alternativa (A..E)
 *   - Linha de cada questão (1..20)
 * Ajuste fino feito com folha real impressa.
 */
const LAYOUT = (() => {
  // ── Geometria dos marcadores ArUco (folha_optica.html) ──────────────────
  // Marcadores 22×22mm posicionados a 5mm de cada borda → centro a 16mm.
  // A homografia mapeia os centros dos marcadores para (0,0)…(1,1),
  // portanto todas as coordenadas de bolha devem ser expressas relativas
  // a esse referencial, NÃO às bordas da página.
  const MX0 = 16;   // mm — centro marcador TL, eixo X (5 + 22/2)
  const MY0 = 16;   // mm — centro marcador TL, eixo Y (5 + 22/2)
  const MSW = 178;  // mm — span horizontal TL→TR (210 - 16 - 16)
  const MSH = 265;  // mm — span vertical   TL→BL (297 - 16 - 16)

  // ── Posições das bolhas em mm a partir da borda esquerda/superior ───────
  // Folha: box-sizing border-box, width 210mm, padding 12mm cada lado.
  // grade-wrapper: margin-left 26mm → borda esquerda a 12+26 = 38mm.
  // Q col: 14mm → borda direita em 52mm.
  // 5 colunas de bolha: (134-14)/5 = 24mm cada.
  // Centro col A: 52 + 12 = 64mm  |  passo: 24mm
  const xStart = 64;   // mm — centro coluna A
  const xStep  = 24;   // mm — passo entre colunas

  // yStart: centro da bolha da Q1 (medido da borda superior da página).
  // Estimativa calculada: ~98mm. Use o canvas de debug para ajuste fino:
  // se os pontos ficam acima das bolhas → aumente yStart; abaixo → diminua.
  const yStart = 90.5;   // mm — ajuste se necessário
  const yStep  = 9.5;  // mm — height exata do td na tabela (CSS: height 9.5mm)

  const bubbles = {};
  for (let q = 1; q <= 20; q++) {
    bubbles[q] = {};
    ALTS.forEach((alt, ai) => {
      const x_mm = xStart + ai * xStep;
      const y_mm = yStart + (q - 1) * yStep;
      bubbles[q][alt] = {
        x: (x_mm - MX0) / MSW,
        y: (y_mm - MY0) / MSH
      };
    });
  }
  return bubbles;
})();

// ═══════════════════════════════════════════════
// ESTADO GLOBAL
// ═══════════════════════════════════════════════

let imageData      = null;   // HTMLImageElement carregado
let base64Image    = null;   // string base64
let lastCorrection = null;   // dados da última correção para envio ao Supabase

// ═══════════════════════════════════════════════
// GABARITO UI
// ═══════════════════════════════════════════════

function buildGabaritoUI() {
  const grid = document.getElementById('gab-grid');
  for (let i = 1; i <= 20; i++) {
    const wrap = document.createElement('div');
    wrap.className = 'gab-item';

    const lbl = document.createElement('div');
    lbl.className = 'gab-num';
    lbl.textContent = 'Q' + i;

    const sel = document.createElement('select');
    sel.id = 'gab-' + i;
    ALTS.forEach(a => {
      const opt = document.createElement('option');
      opt.value = a; opt.textContent = a;
      if (GABARITO[i] === a) opt.selected = true;
      sel.appendChild(opt);
    });

    wrap.appendChild(lbl);
    wrap.appendChild(sel);
    grid.appendChild(wrap);
  }
}

function getGabaritoAtual() {
  const g = {};
  for (let i = 1; i <= 20; i++) {
    g[i] = document.getElementById('gab-' + i).value;
  }
  return g;
}

// ═══════════════════════════════════════════════
// UPLOAD / PREVIEW
// ═══════════════════════════════════════════════

function initUpload() {
  const fileInput  = document.getElementById('file-input');
  const uploadZone = document.getElementById('upload-zone');

  fileInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  });

  uploadZone.addEventListener('dragover', e => {
    e.preventDefault();
    uploadZone.classList.add('drag-over');
  });
  uploadZone.addEventListener('dragleave', () =>
    uploadZone.classList.remove('drag-over')
  );
  uploadZone.addEventListener('drop', e => {
    e.preventDefault();
    uploadZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  });
}

function handleFile(file) {
  if (!file.type.startsWith('image/')) {
    showError('Arquivo inválido. Por favor, selecione uma imagem (JPG, PNG, WEBP).');
    return;
  }
  const reader = new FileReader();
  reader.onload = ev => {
    base64Image = ev.target.result;
    const img = new Image();
    img.onload = () => {
      imageData = img;
      document.getElementById('preview-img').src = base64Image;
      document.getElementById('upload-zone').style.display  = 'none';
      document.getElementById('preview-wrap').style.display = 'block';
      document.getElementById('detect-status').style.display = 'none';
      document.getElementById('debug-canvas-wrap').style.display = 'none';
      document.getElementById('result-section').style.display = 'none';
      document.getElementById('error-msg').style.display = 'none';
      checkReady();
    };
    img.src = base64Image;
  };
  reader.readAsDataURL(file);
}

function resetUpload() {
  imageData = null; base64Image = null;
  document.getElementById('file-input').value = '';
  document.getElementById('upload-zone').style.display  = '';
  document.getElementById('preview-wrap').style.display = 'none';
  document.getElementById('detect-status').style.display = 'none';
  document.getElementById('debug-canvas-wrap').style.display = 'none';
  document.getElementById('result-section').style.display = 'none';
  document.getElementById('error-msg').style.display = 'none';
  checkReady();
}

function checkReady() {
  document.getElementById('btn-corrigir').disabled = !imageData;
}

// ═══════════════════════════════════════════════
// UTILITÁRIOS DE CANVAS / PIXEL
// ═══════════════════════════════════════════════

/** Desenha imagem em canvas e retorna o contexto + dados de pixels */
function imageToCanvas(img, maxSize = 1600) {
  const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
  const w = Math.round(img.width  * scale);
  const h = Math.round(img.height * scale);
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, w, h);
  return { canvas, ctx, w, h };
}

/** Converte ImageData para escala de cinza (array Uint8Array) */
function toGray(imageDataObj) {
  const { data, width, height } = imageDataObj;
  const gray = new Uint8Array(width * height);
  for (let i = 0; i < width * height; i++) {
    const r = data[i*4], g = data[i*4+1], b = data[i*4+2];
    gray[i] = (0.299*r + 0.587*g + 0.114*b) | 0;
  }
  return gray;
}

/** Binarização por threshold adaptativo simples (média local) */
function adaptiveThreshold(gray, width, height, blockSize = 21, C = 10) {
  const bin = new Uint8Array(width * height);
  const half = (blockSize - 1) >> 1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sum = 0, count = 0;
      for (let dy = -half; dy <= half; dy++) {
        const ny = y + dy;
        if (ny < 0 || ny >= height) continue;
        for (let dx = -half; dx <= half; dx++) {
          const nx = x + dx;
          if (nx < 0 || nx >= width) continue;
          sum += gray[ny * width + nx];
          count++;
        }
      }
      const mean = sum / count;
      bin[y * width + x] = gray[y * width + x] < (mean - C) ? 0 : 255;
    }
  }
  return bin;
}

// ═══════════════════════════════════════════════
// DETECÇÃO DE MARCADORES ARUCO
// ═══════════════════════════════════════════════

/**
 * Bits dos 4 marcadores ArUco 4x4_50 usados na folha óptica.
 * Cada marcador é 6×6 (1 borda + 4 dados + 1 borda).
 * Os bits internos 4×4 estão listados linha por linha.
 */
const ARUCO_BITS = {
  0: [[1,0,0,0],[0,1,1,1],[0,1,0,1],[1,0,0,0]],
  1: [[0,1,0,0],[1,1,0,0],[1,0,1,0],[0,0,1,1]],
  2: [[0,0,1,1],[1,0,1,0],[0,1,1,1],[1,1,0,0]],
  3: [[0,0,0,1],[0,1,1,0],[1,1,0,0],[0,1,1,0]]
};

/** Rotaciona matriz 4×4 90° sentido horário */
function rotateBits90(bits) {
  const n = bits.length;
  return Array.from({length:n}, (_,r) =>
    Array.from({length:n}, (_,c) => bits[n-1-c][r])
  );
}

/** Gera as 4 rotações de um marcador */
function allRotations(bits) {
  const rots = [bits];
  for (let i = 0; i < 3; i++) rots.push(rotateBits90(rots[rots.length-1]));
  return rots;
}

/** Verifica se uma região do canvas binarizado corresponde a um marcador */
function matchMarker(bin, width, height, cx, cy, size) {
  const cellSize = size / 6;

  // Amostrar os 6×6 bits da região (borda + 4×4 dados + borda)
  function sampleBit(row, col) {
    const px = Math.round(cx - size/2 + (col + 0.5) * cellSize);
    const py = Math.round(cy - size/2 + (row + 0.5) * cellSize);
    if (px < 0 || px >= width || py < 0 || py >= height) return 255;
    return bin[py * width + px];
  }

  // Verificar borda (deve ser toda preta = 0)
  for (let i = 0; i < 6; i++) {
    if (sampleBit(0,i) !== 0) return null;
    if (sampleBit(5,i) !== 0) return null;
    if (sampleBit(i,0) !== 0) return null;
    if (sampleBit(i,5) !== 0) return null;
  }

  // Ler bits internos 4×4
  const readBits = [];
  for (let r = 0; r < 4; r++) {
    const row = [];
    for (let c = 0; c < 4; c++) {
      row.push(sampleBit(r+1, c+1) === 0 ? 1 : 0);
    }
    readBits.push(row);
  }

  // Comparar com cada marcador e suas rotações
  for (const [id, bits] of Object.entries(ARUCO_BITS)) {
    const rots = allRotations(bits);
    for (const rot of rots) {
      let match = true;
      outer: for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          if (readBits[r][c] !== rot[r][c]) { match = false; break outer; }
        }
      }
      if (match) return parseInt(id);
    }
  }
  return null;
}

/**
 * Detecção de marcadores ArUco por varredura de regiões candidatas.
 * Retorna array de { id, cx, cy } para cada marcador encontrado.
 */
function detectAruco(gray, bin, width, height) {
  const found = [];
  const foundIds = new Set();

  // Tamanhos de marcador a tentar (relativo à menor dimensão da imagem)
  const minDim = Math.min(width, height);
  const markerSizes = [
    Math.round(minDim * 0.06),
    Math.round(minDim * 0.08),
    Math.round(minDim * 0.10),
    Math.round(minDim * 0.12),
    Math.round(minDim * 0.14),
  ];

  // Varrer somente os cantos (25% de cada dimensão) para eficiência
  const regions = [
    { x0: 0,               y0: 0,               x1: width*0.35,  y1: height*0.35 },
    { x0: width*0.65,      y0: 0,               x1: width,       y1: height*0.35 },
    { x0: 0,               y0: height*0.65,     x1: width*0.35,  y1: height },
    { x0: width*0.65,      y0: height*0.65,     x1: width,       y1: height },
  ];

  const step = Math.round(minDim * 0.015);

  for (const region of regions) {
    if (found.length >= 4) break;

    for (let cy = Math.round(region.y0); cy < region.y1; cy += step) {
      for (let cx = Math.round(region.x0); cx < region.x1; cx += step) {
        for (const sz of markerSizes) {
          const id = matchMarker(bin, width, height, cx, cy, sz);
          if (id !== null && !foundIds.has(id)) {
            found.push({ id, cx, cy, size: sz });
            foundIds.add(id);
          }
        }
      }
    }
  }

  return found;
}

// ═══════════════════════════════════════════════
// CORREÇÃO DE PERSPECTIVA (HOMOGRAFIA 2D)
// ═══════════════════════════════════════════════

/**
 * Calcula a homografia 3×3 de 4 pontos de origem para 4 pontos destino.
 * Usa o método direto via sistema linear 8×8.
 */
function computeHomography(src, dst) {
  // src, dst: arrays de 4 pontos {x, y}
  const A = [];
  for (let i = 0; i < 4; i++) {
    const { x: sx, y: sy } = src[i];
    const { x: dx, y: dy } = dst[i];
    A.push([-sx, -sy, -1, 0, 0, 0, dx*sx, dx*sy, dx]);
    A.push([0, 0, 0, -sx, -sy, -1, dy*sx, dy*sy, dy]);
  }
  // Resolver A·h = 0 via pseudo-inversa simplificada (SVD não disponível sem libs)
  // Usamos eliminação gaussiana com a última coluna fixada = 1
  const n = 8;
  const M = A.map(row => row.slice(0, n));
  const b = A.map(row => -row[n]);

  // Eliminação de Gauss com pivoteamento parcial
  const mat = M.map((row, i) => [...row, b[i]]);
  for (let col = 0; col < n; col++) {
    // Pivô
    let maxRow = col;
    for (let row = col+1; row < n; row++) {
      if (Math.abs(mat[row][col]) > Math.abs(mat[maxRow][col])) maxRow = row;
    }
    [mat[col], mat[maxRow]] = [mat[maxRow], mat[col]];
    if (Math.abs(mat[col][col]) < 1e-10) continue;
    for (let row = col+1; row < n; row++) {
      const factor = mat[row][col] / mat[col][col];
      for (let k = col; k <= n; k++) mat[row][k] -= factor * mat[col][k];
    }
  }
  // Substituição retroativa
  const h = new Array(n).fill(0);
  for (let i = n-1; i >= 0; i--) {
    let sum = mat[i][n];
    for (let j = i+1; j < n; j++) sum -= mat[i][j] * h[j];
    h[i] = mat[i][i] !== 0 ? sum / mat[i][i] : 0;
  }
  // h = [h0..h7, 1]
  return [
    [h[0], h[1], h[2]],
    [h[3], h[4], h[5]],
    [h[6], h[7], 1]
  ];
}

/** Aplica homografia a um ponto */
function applyH(H, x, y) {
  const w = H[2][0]*x + H[2][1]*y + H[2][2];
  return {
    x: (H[0][0]*x + H[0][1]*y + H[0][2]) / w,
    y: (H[1][0]*x + H[1][1]*y + H[1][2]) / w
  };
}

/**
 * Dado o conjunto de marcadores detectados, calcula a homografia
 * da imagem real para a folha normalizada (0..1 × 0..1).
 *
 * Mapeamento dos cantos:
 *   ID 0 → topo-esquerdo  (0, 0)
 *   ID 1 → topo-direito   (1, 0)
 *   ID 2 → baixo-esquerdo (0, 1)
 *   ID 3 → baixo-direito  (1, 1)
 */
const MARKER_CORNERS = {
  0: { x: 0, y: 0 },
  1: { x: 1, y: 0 },
  2: { x: 0, y: 1 },
  3: { x: 1, y: 1 }
};

function buildHomography(markers, imgWidth, imgHeight) {
  if (markers.length < 4) return null;

  const src = [], dst = [];
  markers.forEach(m => {
    src.push({ x: m.cx / imgWidth, y: m.cy / imgHeight });
    dst.push(MARKER_CORNERS[m.id]);
  });

  // Ordenar pelo id para garantir correspondência
  const pairs = markers.map(m => ({
    src: { x: m.cx / imgWidth, y: m.cy / imgHeight },
    dst: MARKER_CORNERS[m.id]
  }));
  pairs.sort((a,b) => a.dst.x + a.dst.y - b.dst.x - b.dst.y);
  // já ordenado para 4 pontos

  return computeHomography(
    markers.map(m => ({ x: m.cx / imgWidth, y: m.cy / imgHeight })),
    markers.map(m => MARKER_CORNERS[m.id])
  );
}

// ═══════════════════════════════════════════════
// LEITURA DE BOLHAS
// ═══════════════════════════════════════════════

/**
 * Para cada questão/alternativa, amostra a região da bolha na
 * imagem original (via homografia inversa) e calcula a densidade
 * de pixels escuros. A alternativa com maior densidade (acima do
 * limiar) é considerada marcada.
 *
 * @param {Uint8Array} gray - imagem em escala de cinza
 * @param {number} imgW, imgH - dimensões da imagem
 * @param {Array} H - homografia NORMALIZADA → IMAGEM (inversa de H_img→norm)
 * @returns {Object} { q: { alt: densidade } }
 */
function readBubbles(gray, imgW, imgH, H_inv) {
  const results = {};
  const BUBBLE_RADIUS_NORM = 0.012; // raio da bolha em coords normalizadas

  for (let q = 1; q <= 20; q++) {
    results[q] = {};
    for (const alt of ALTS) {
      const { x: nx, y: ny } = LAYOUT[q][alt];
      // Calcular centro da bolha em pixels da imagem
      const center = applyH(H_inv, nx, ny);
      const cx = Math.round(center.x * imgW);
      const cy = Math.round(center.y * imgH);

      // Amostrar círculo ao redor do centro
      const rPx = Math.round(BUBBLE_RADIUS_NORM * Math.min(imgW, imgH));
      const rr = rPx * rPx;
      let dark = 0, total = 0;
      for (let dy = -rPx; dy <= rPx; dy++) {
        for (let dx = -rPx; dx <= rPx; dx++) {
          if (dx*dx + dy*dy > rr) continue;
          const px = cx + dx, py = cy + dy;
          if (px < 0 || px >= imgW || py < 0 || py >= imgH) continue;
          total++;
          if (gray[py * imgW + px] < 100) dark++;
        }
      }
      results[q][alt] = total > 0 ? dark / total : 0;
    }
  }
  return results;
}

/** Escolhe a alternativa marcada por questão */
function pickAnswers(densities) {
  const answers = {};
  const MARK_THRESHOLD = 0.28; // ≥28% escuro = marcado

  for (let q = 1; q <= 20; q++) {
    let bestAlt = '?', bestDens = 0;
    for (const alt of ALTS) {
      if (densities[q][alt] > bestDens) {
        bestDens = densities[q][alt];
        bestAlt  = alt;
      }
    }
    answers[q] = bestDens >= MARK_THRESHOLD ? bestAlt : '?';
  }
  return answers;
}

// ═══════════════════════════════════════════════
// INVERSA DE HOMOGRAFIA
// ═══════════════════════════════════════════════

function invertH(H) {
  const [a,b,c] = H[0], [d,e,f] = H[1], [g,h,k] = H[2];
  const det = a*(e*k-f*h) - b*(d*k-f*g) + c*(d*h-e*g);
  if (Math.abs(det) < 1e-12) return null;
  const inv = [
    [ (e*k-f*h)/det, -(b*k-c*h)/det,  (b*f-c*e)/det ],
    [-(d*k-f*g)/det,  (a*k-c*g)/det, -(a*f-c*d)/det ],
    [ (d*h-e*g)/det, -(a*h-b*g)/det,  (a*e-b*d)/det ]
  ];
  return inv;
}

// ═══════════════════════════════════════════════
// PIPELINE PRINCIPAL
// ═══════════════════════════════════════════════

async function corrigirProva() {
  if (!imageData) return;

  hideError();
  document.getElementById('result-section').style.display = 'none';
  document.getElementById('loading').style.display = 'block';
  document.getElementById('btn-corrigir').disabled = true;
  setDetectStatus('', '');

  // Pequeno delay para o browser renderizar o spinner
  await new Promise(r => setTimeout(r, 50));

  try {
    // 1. Converter imagem para canvas e pixels
    const { canvas, ctx, w, h } = imageToCanvas(imageData);
    const imgDataObj = ctx.getImageData(0, 0, w, h);

    // 2. Escala de cinza + binarização
    const gray = toGray(imgDataObj);
    const bin  = adaptiveThreshold(gray, w, h, 25, 8);

    // 3. Detectar marcadores ArUco
    const markers = detectAruco(gray, bin, w, h);

    if (markers.length < 3) {
      throw new Error(
        `Apenas ${markers.length} marcador(es) detectado(s). ` +
        `Certifique-se de que a folha está completamente visível na foto, ` +
        `bem iluminada e sem sombras sobre os cantos.`
      );
    }

    const foundIds = markers.map(m => m.id).sort().join(', ');
    const msg4 = markers.length === 4
      ? '4 marcadores detectados — alinhamento perfeito.'
      : `${markers.length} marcadores detectados (IDs: ${foundIds}) — usando ajuste parcial.`;

    setDetectStatus(markers.length === 4 ? 'ok' : 'warn', msg4);

    // 4. Homografia imagem → coordenadas normalizadas
    if (markers.length < 4) {
      // Com 3 marcadores, usar os 3 disponíveis + extrapolar o 4º
      estimateMissingMarker(markers);
    }

    const H = buildHomography(markers, w, h);
    if (!H) throw new Error('Não foi possível calcular o alinhamento da folha.');

    const H_inv = invertH(H);
    if (!H_inv) throw new Error('Homografia singular. Tente uma foto com melhor iluminação.');

    // 5. Ler bolhas
    const densities = readBubbles(gray, w, h, H_inv);
    const answers   = pickAnswers(densities);

    // 6. Debug: desenhar pontos de bolha no canvas
    drawDebug(canvas, ctx, w, h, H_inv, answers);

    // 7. Comparar com gabarito e mostrar resultado
    const gabarito = getGabaritoAtual();
    mostrarResultado(answers, gabarito);

  } catch (err) {
    showError('❌ ' + err.message);
    setDetectStatus('err', err.message);
  } finally {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('btn-corrigir').disabled = false;
  }
}

/** Estima o 4º marcador ausente por reflexão dos outros 3 */
function estimateMissingMarker(markers) {
  const ids   = markers.map(m => m.id);
  const allIds = [0, 1, 2, 3];
  const missing = allIds.find(id => !ids.includes(id));
  if (missing === undefined) return;

  // Usar opostos para estimar
  const pairs = { 0:3, 1:2, 2:1, 3:0 };
  const centerId = pairs[missing];
  const others = markers.filter(m => m.id !== centerId);
  if (others.length < 2) return;

  const cx = others.reduce((s,m)=>s+m.cx,0)/others.length;
  const cy = others.reduce((s,m)=>s+m.cy,0)/others.length;
  const opp = markers.find(m=>m.id===centerId);
  if (!opp) return;

  markers.push({
    id: missing,
    cx: 2*cx - opp.cx,
    cy: 2*cy - opp.cy,
    size: opp.size,
    estimated: true
  });
}

// ═══════════════════════════════════════════════
// DEBUG: VISUALIZAÇÃO DOS PONTOS DE LEITURA
// ═══════════════════════════════════════════════

function drawDebug(canvas, ctx, w, h, H_inv, answers) {
  // Desenhar pontos de amostragem das bolhas
  for (let q = 1; q <= 20; q++) {
    for (const alt of ALTS) {
      const { x: nx, y: ny } = LAYOUT[q][alt];
      const pt = applyH(H_inv, nx, ny);
      const px = pt.x * w, py = pt.y * h;
      const marked = answers[q] === alt;
      ctx.beginPath();
      ctx.arc(px, py, marked ? 6 : 3, 0, Math.PI*2);
      ctx.fillStyle = marked ? 'rgba(31,214,160,0.85)' : 'rgba(240,90,120,0.5)';
      ctx.fill();
    }
  }

  // Mostrar canvas de debug
  const debugWrap = document.getElementById('debug-canvas-wrap');
  const debugCanvas = document.getElementById('debug-canvas');
  debugCanvas.width  = w;
  debugCanvas.height = h;
  const dctx = debugCanvas.getContext('2d');
  dctx.drawImage(canvas, 0, 0);
  debugWrap.style.display = 'block';
}

// ═══════════════════════════════════════════════
// UI: RESULTADO
// ═══════════════════════════════════════════════

function mostrarResultado(answers, gabarito) {
  let acertos = 0, erros = 0, brancos = 0;
  const itens = [];

  for (let q = 1; q <= 20; q++) {
    const resp = answers[q] || '?';
    const gab  = gabarito[q];
    let status = 'blank';
    if (resp === '?')    { brancos++; status = 'blank'; }
    else if (resp===gab) { acertos++; status = 'correct'; }
    else                 { erros++;   status = 'wrong'; }
    itens.push({ q, resp, gab, status });
  }

  const nota = (acertos * 0.5).toFixed(1);
  const pct  = acertos / 20;
  const tier = pct >= 0.7 ? 'high' : pct >= 0.5 ? 'mid' : 'low';

  // Nota e acertos
  const notaEl = document.getElementById('score-nota');
  notaEl.textContent = nota;
  notaEl.className   = 'score-box-value ' + tier;

  const acEl = document.getElementById('score-acertos');
  acEl.textContent = acertos + '/20';
  acEl.className   = 'score-box-value ' + tier;

  // Barra de progresso
  const fill = document.getElementById('progress-fill');
  fill.style.width = (pct * 100) + '%';
  fill.className   = 'progress-bar-fill ' + tier;
  document.getElementById('progress-label-val').textContent = Math.round(pct*100) + '%';

  // Grade questão a questão
  const grid = document.getElementById('resp-grid');
  grid.innerHTML = '';
  itens.forEach(it => {
    const div = document.createElement('div');
    div.className = 'resp-item ' + it.status;
    div.innerHTML = `
      <div class="resp-num">Q${it.q}</div>
      <div class="resp-letra">${it.resp}</div>
      <div class="resp-gab">${it.status==='wrong' ? '✓'+it.gab : it.status==='correct' ? '✓' : '—'}</div>
    `;
    grid.appendChild(div);
  });

  // Brancos aviso
  const obs = document.getElementById('obs-box');
  if (brancos > 0) {
    obs.textContent = `⚠ ${brancos} questão(ões) sem resposta detectada. ` +
      `Verifique se a folha estava completamente visível e bem iluminada.`;
    obs.style.display = 'block';
  } else {
    obs.style.display = 'none';
  }

  // Salvar para envio ao Supabase
  lastCorrection = { answers, gabarito, acertos };

  // Resetar seção de envio
  document.getElementById('nome-aluno-envio').value = '';
  document.getElementById('btn-enviar').disabled = false;
  document.getElementById('btn-enviar').textContent = 'Enviar ao Supabase';
  setEnvioStatus('', '');

  document.getElementById('result-section').style.display = 'block';
  document.getElementById('result-section').scrollIntoView({ behavior:'smooth', block:'start' });
}

// ═══════════════════════════════════════════════
// UI: UTILITÁRIOS
// ═══════════════════════════════════════════════

function showError(msg) {
  const el = document.getElementById('error-msg');
  el.textContent = msg;
  el.style.display = 'block';
}
function hideError() {
  document.getElementById('error-msg').style.display = 'none';
}

function setDetectStatus(type, msg) {
  const el = document.getElementById('detect-status');
  if (!type) { el.style.display = 'none'; return; }
  el.className = 'detect-status ' + type;
  el.innerHTML = `<span class="dot"></span> ${msg}`;
  el.style.display = 'flex';
}

// ═══════════════════════════════════════════════
// ENVIO SUPABASE
// ═══════════════════════════════════════════════

async function enviarResultado() {
  if (!lastCorrection) return;

  const nomeEl = document.getElementById('nome-aluno-envio');
  const nome   = nomeEl.value.trim();
  if (!nome) {
    nomeEl.focus();
    setEnvioStatus('err', 'Informe o nome completo do aluno antes de enviar.');
    return;
  }

  const btn = document.getElementById('btn-enviar');
  btn.disabled    = true;
  btn.textContent = 'Enviando...';
  setEnvioStatus('', '');

  try {
    const { answers, gabarito, acertos } = lastCorrection;

    const respostas = {};
    const detalhes  = {};
    for (let i = 1; i <= 20; i++) {
      const marcada = answers[i] === '?' ? null : answers[i];
      const correta = gabarito[i];
      respostas[`q${i}`] = marcada;
      detalhes[`q${i}`]  = { marcada, correta, acertou: marcada === correta };
    }

    const respostaId = crypto.randomUUID();

    await supabaseFetch('respostas', 'POST', {
      id: respostaId,
      nome_aluno: nome,
      palavra_secreta: PALAVRA_SECRETA,
      respostas
    }, 'return=minimal');

    await supabaseFetch('resultados', 'POST', {
      resposta_id: respostaId,
      nome_aluno: nome,
      palavra_secreta: PALAVRA_SECRETA,
      acertos,
      total: 20,
      detalhes
    }, 'return=minimal');

    setEnvioStatus('ok', `✓ Resultado de ${nome} registrado com sucesso. ` +
      `Nota: ${(acertos * 0.5).toFixed(1)} — o aluno pode consultar em consulta_resultado.html`);
    btn.textContent = 'Enviado ✓';

  } catch (err) {
    setEnvioStatus('err', `Erro ao enviar: ${err.message}`);
    btn.disabled    = false;
    btn.textContent = 'Enviar ao Supabase';
  }
}

function setEnvioStatus(type, msg) {
  const el = document.getElementById('envio-status');
  if (!type) { el.style.display = 'none'; return; }
  el.className  = 'envio-status ' + type;
  el.textContent = msg;
  el.style.display = 'block';
}

// ═══════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  buildGabaritoUI();
  initUpload();
  checkReady();
});
