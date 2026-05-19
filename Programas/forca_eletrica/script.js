import { computeForce, computeNetForce, computeFieldAt } from "./physics.js";

// =================== ELEMENTS ===================
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const infoPanel = document.getElementById("infoPanel");
const container = document.querySelector(".canvas-container");

// =================== COLORS ===================
const COLORS = {
  positive: "#fb923c",
  negative: "#818cf8",
  force: "#fbbf24",
  forceIndividual: "#f87171",
  field: "rgba(167,139,250,0.65)",
  fieldProjector: "rgba(220, 100, 0, 0.92)",
  fieldLines: "rgba(52, 211, 153, 0.80)",
  fieldLinesProjector: "rgba(52, 211, 153, 0.97)",
  axis: "#565672",
  selected: "#a78bfa",
  testCharge: "#7dd3fc"
};

const Q_TEST = 1e-16; // C (carga de prova)

// =================== STATE ===================
let charges = [];
let selectedCharge = null;
let dragging = null;
let showField = true;
let projectorMode = false;
let showFieldLines = false;
let fieldLinesPerCharge = 8;
let fieldLinesCache = [];
let fieldLinesDirty = true;
let metersPerPixel = 0.01;

// ── Linhas de campo: constantes ──
const FL_STEP        = 4;
const FL_MAX_STEPS   = 600;
const FL_ARROW_EVERY = 70;
const FL_MIN_FIELD   = 1e-6;

// =================== INPUTS ===================
const chargeInput = document.getElementById("chargeValue");
const inputX = document.getElementById("posX");
const inputY = document.getElementById("posY");
let chargeMagnitude = parseFloat(chargeInput.value) || 1;

chargeInput.addEventListener("input", e => {
  chargeMagnitude = parseFloat(e.target.value) || 1;
});

// =================== CANVAS RESIZE ===================
function resizeCanvas() {
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
  fieldLinesDirty = true;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// =================== UTILITIES ===================
function formatSci(num) {
  if (num === 0) return "0";
  const exp = Math.floor(Math.log10(Math.abs(num)));
  const mant = num / Math.pow(10, exp);
  return `${mant.toFixed(2)} × 10<sup>${exp}</sup>`;
}

function formatLength(meters) {
  const abs = Math.abs(meters);
  if (abs < 1e-10) return "0";
  const sign = meters < 0 ? "-" : "";
  if (abs < 0.001) return sign + (abs * 1000).toFixed(1) + " mm";
  if (abs < 1) return sign + (abs * 100).toFixed(1) + " cm";
  if (abs < 1000) return sign + abs.toFixed(1) + " m";
  return sign + (abs / 1000).toFixed(1) + " km";
}

function toWorld(px, py) {
  return {
    x: (px - canvas.width / 2) * metersPerPixel,
    y: (canvas.height / 2 - py) * metersPerPixel
  };
}

function toCanvas(xM, yM) {
  return {
    x: xM / metersPerPixel + canvas.width / 2,
    y: canvas.height / 2 - yM / metersPerPixel
  };
}

// =================== CHARGE CLASS ===================
class Charge {
  constructor(x, y, qMicro) {
    this.x = x;
    this.y = y;
    this.qMicro = qMicro;
    this.isTestCharge = false;
  }

  get q() {
    return this.qMicro * 1e-6;
  }

  draw() {
    if (this.isTestCharge) { this._drawTestCharge(); return; }

    const visualQ = Math.min(Math.abs(this.qMicro), 10);
    const r = Math.max(12, visualQ * 3);

    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
    ctx.fillStyle = this.qMicro > 0 ? COLORS.positive : COLORS.negative;
    ctx.fill();

    if (this === selectedCharge) {
      ctx.strokeStyle = COLORS.selected;
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    ctx.fillStyle = "white";
    ctx.font = "13px 'IBM Plex Mono', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.qMicro.toFixed(1), this.x, this.y);
  }

  _drawTestCharge() {
    const r = 11;
    const color = this === selectedCharge ? "#ffffff" : COLORS.testCharge;

    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(125, 211, 252, 0.10)";
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = this === selectedCharge ? 2.5 : 1.8;
    ctx.setLineDash([4, 3]);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = color;
    ctx.font = "bold 11px 'IBM Plex Mono', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("q₀", this.x, this.y);
  }
}

// =================== CHARGE MANAGEMENT ===================
function addCharge(sign) {
  charges.push(new Charge(
    Math.random() * canvas.width,
    Math.random() * canvas.height,
    sign * chargeMagnitude
  ));
  fieldLinesDirty = true;
}

function deleteSelected() {
  if (!selectedCharge) return;
  charges = charges.filter(c => c !== selectedCharge);
  selectedCharge = null;
  fieldLinesDirty = true;
}

function deleteAll() {
  charges = [];
  selectedCharge = null;
  fieldLinesDirty = true;
}

function addTestCharge() {
  const tc = new Charge(canvas.width / 2, canvas.height / 2, 0);
  tc.isTestCharge = true;
  charges.push(tc);
}

function updatePositionFromInputs() {
  if (!selectedCharge) return;
  const x = parseFloat(inputX.value) || 0;
  const y = parseFloat(inputY.value) || 0;
  const pos = toCanvas(x, y);
  selectedCharge.x = pos.x;
  selectedCharge.y = pos.y;
}

function toggleField() {
  showField = !showField;
  const btn = document.getElementById("btnToggleField");
  if (btn) btn.classList.toggle("active", showField);
}

function toggleProjectorMode() {
  projectorMode = !projectorMode;
  const btn = document.getElementById("btnToggleProjector");
  if (btn) {
    btn.classList.toggle("active", projectorMode);
    btn.textContent = projectorMode ? "🖥 Modo Projetor: ON" : "🖥 Modo Projetor: OFF";
  }
}

function toggleFieldLines() {
  showFieldLines = !showFieldLines;
  fieldLinesDirty = true;
  const btn = document.getElementById("btnToggleFieldLines");
  if (btn) {
    btn.classList.toggle("active", showFieldLines);
    btn.textContent = showFieldLines ? "Linhas de Campo: ON" : "Linhas de Campo: OFF";
  }
}

function updateScale() {
  const select = document.getElementById("scaleSelect");
  metersPerPixel = parseFloat(select.value);
  fieldLinesDirty = true;
}
window.updateScale = updateScale;

// =================== FIELD DRAWING ===================
function drawField() {
  const spacing  = projectorMode ? 68  : 30;
  const arrowLen = projectorMode ? 30  : 15;
  const lineW    = projectorMode ? 3.5 : 1.5;
  const headSize = projectorMode ? 12  : 5;
  const color    = projectorMode ? COLORS.fieldProjector : COLORS.field;

  for (let px = 0; px < canvas.width; px += spacing) {
    for (let py = 0; py < canvas.height; py += spacing) {
      const { Ex, Ey } = computeFieldAt(px, py, charges, metersPerPixel);
      const mag = Math.sqrt(Ex * Ex + Ey * Ey);
      if (mag === 0) continue;

      const ux = Ex / mag;
      const uy = Ey / mag;
      const endX = px + ux * arrowLen;
      const endY = py + uy * arrowLen;

      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = color;
      ctx.lineWidth = lineW;
      ctx.stroke();

      const angle = Math.atan2(uy, ux);
      ctx.beginPath();
      ctx.moveTo(endX, endY);
      ctx.lineTo(endX - headSize * Math.cos(angle - Math.PI / 6), endY - headSize * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(endX - headSize * Math.cos(angle + Math.PI / 6), endY - headSize * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    }
  }
}

// =================== FIELD LINES ===================
function chargeRadius(c) {
  return Math.max(12, Math.min(Math.abs(c.qMicro), 10) * 3);
}

function generateSeeds() {
  const positives = charges.filter(c => c.qMicro > 0);
  const negatives = charges.filter(c => c.qMicro < 0);
  const seeds = [];

  const addRing = (cx, cy, radius, nLines) => {
    for (let i = 0; i < nLines; i++) {
      const angle = (2 * Math.PI * i) / nLines;
      seeds.push({
        sx: cx + radius * Math.cos(angle),
        sy: cy + radius * Math.sin(angle)
      });
    }
  };

  if (positives.length > 0) {
    const qMin = Math.min(...positives.map(c => Math.abs(c.qMicro)));
    positives.forEach(c => {
      const n = Math.min(32, Math.round(fieldLinesPerCharge * Math.abs(c.qMicro) / qMin));
      addRing(c.x, c.y, chargeRadius(c) + 6, n);
    });
  } else {
    // Só negativos: sementes em anel externo, campo converge naturalmente
    const R = Math.min(canvas.width, canvas.height) * 0.4;
    const qMin = Math.min(...negatives.map(c => Math.abs(c.qMicro)));
    negatives.forEach(c => {
      const n = Math.min(32, Math.round(fieldLinesPerCharge * Math.abs(c.qMicro) / qMin));
      addRing(c.x, c.y, R, n);
    });
  }

  return seeds;
}

function integrateFieldLine(sx, sy) {
  const path = [[sx, sy]];
  const arrowIdxs = [];
  let x = sx, y = sy;
  let arcLength = 0;
  let lastArrowArc = 0;

  for (let s = 0; s < FL_MAX_STEPS; s++) {
    if (x < -5 || x > canvas.width + 5 || y < -5 || y > canvas.height + 5) break;

    const { Ex, Ey } = computeFieldAt(x, y, charges, metersPerPixel);
    const mag = Math.sqrt(Ex * Ex + Ey * Ey);
    if (mag < FL_MIN_FIELD) break;

    const nx = x + (Ex / mag) * FL_STEP;
    const ny = y + (Ey / mag) * FL_STEP;

    // Para ao entrar na zona de captura de uma carga negativa
    let captured = false;
    for (const c of charges) {
      if (c.qMicro >= 0) continue;
      const dx = nx - c.x, dy = ny - c.y;
      if (Math.sqrt(dx * dx + dy * dy) < chargeRadius(c) + 4) { captured = true; break; }
    }
    if (captured) break;

    x = nx;
    y = ny;
    path.push([x, y]);
    arcLength += FL_STEP;

    if (arcLength - lastArrowArc >= FL_ARROW_EVERY) {
      arrowIdxs.push(path.length - 1);
      lastArrowArc = arcLength;
    }
  }

  return { path, arrowIdxs };
}

function computeAllFieldLines() {
  const seeds = generateSeeds();
  return seeds.map(({ sx, sy }) => integrateFieldLine(sx, sy));
}

function renderFieldLines(cache) {
  const color    = projectorMode ? COLORS.fieldLinesProjector : COLORS.fieldLines;
  const lineW    = projectorMode ? 2.5 : 1.5;
  const headSize = projectorMode ? 10  : 6;

  cache.forEach(({ path, arrowIdxs }) => {
    if (path.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(path[0][0], path[0][1]);
    for (let i = 1; i < path.length; i++) ctx.lineTo(path[i][0], path[i][1]);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineW;
    ctx.stroke();

    arrowIdxs.forEach(idx => {
      if (idx < 1 || idx >= path.length) return;
      const dx = path[idx][0] - path[idx - 1][0];
      const dy = path[idx][1] - path[idx - 1][1];
      const angle = Math.atan2(dy, dx);
      const [ax, ay] = path[idx];
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(ax - headSize * Math.cos(angle - Math.PI / 6), ay - headSize * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(ax - headSize * Math.cos(angle + Math.PI / 6), ay - headSize * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    });
  });
}

function drawFieldLines() {
  if (charges.length === 0) return;
  if (fieldLinesDirty) {
    fieldLinesCache = computeAllFieldLines();
    fieldLinesDirty = false;
  }
  renderFieldLines(fieldLinesCache);
}

// =================== AXES DRAWING ===================
function drawAxes() {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const spacingPx = 100;

  ctx.strokeStyle = COLORS.axis;
  ctx.lineWidth = 1.2;

  ctx.beginPath();
  ctx.moveTo(0, cy);
  ctx.lineTo(canvas.width, cy);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx, 0);
  ctx.lineTo(cx, canvas.height);
  ctx.stroke();

  ctx.fillStyle = "#d8d6ef";
  ctx.font = "11px 'IBM Plex Mono', monospace";

  // X axis — right of center
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  for (let px = cx + spacingPx; px < canvas.width; px += spacingPx) {
    const valueM = (px - cx) * metersPerPixel;
    ctx.beginPath();
    ctx.moveTo(px, cy - 5);
    ctx.lineTo(px, cy + 5);
    ctx.stroke();
    ctx.fillText(formatLength(valueM), px, cy + 8);
  }

  // X axis — left of center
  for (let px = cx - spacingPx; px > 0; px -= spacingPx) {
    const valueM = (px - cx) * metersPerPixel;
    ctx.beginPath();
    ctx.moveTo(px, cy - 5);
    ctx.lineTo(px, cy + 5);
    ctx.stroke();
    ctx.fillText(formatLength(valueM), px, cy + 8);
  }

  // Y axis — above center (positive y)
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (let py = cy - spacingPx; py > 0; py -= spacingPx) {
    const valueM = (cy - py) * metersPerPixel;
    ctx.beginPath();
    ctx.moveTo(cx - 5, py);
    ctx.lineTo(cx + 5, py);
    ctx.stroke();
    ctx.fillText(formatLength(valueM), cx - 8, py);
  }

  // Y axis — below center (negative y)
  for (let py = cy + spacingPx; py < canvas.height; py += spacingPx) {
    const valueM = -(py - cy) * metersPerPixel;
    ctx.beginPath();
    ctx.moveTo(cx - 5, py);
    ctx.lineTo(cx + 5, py);
    ctx.stroke();
    ctx.fillText(formatLength(valueM), cx - 8, py);
  }

  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  ctx.fillText("0", cx - 8, cy + 8);
}

// =================== FORCE VECTORS ===================
function drawArrow(startX, startY, endX, endY, color, lineWidth = 2, arrowSize = 8) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.stroke();

  const angle = Math.atan2(endY - startY, endX - startX);
  ctx.beginPath();
  ctx.moveTo(endX, endY);
  ctx.lineTo(endX - arrowSize * Math.cos(angle - Math.PI / 6), endY - arrowSize * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(endX - arrowSize * Math.cos(angle + Math.PI / 6), endY - arrowSize * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function drawForceVector() {
  if (!selectedCharge) return;

  if (selectedCharge.isTestCharge) {
    const { Ex, Ey } = computeFieldAt(selectedCharge.x, selectedCharge.y, charges, metersPerPixel);
    const mag = Math.sqrt(Ex * Ex + Ey * Ey);
    if (mag < 1e-10) return;
    const length = Math.min(100, 30 + Math.log10(1 + mag) * 18);
    drawArrow(
      selectedCharge.x, selectedCharge.y,
      selectedCharge.x + (Ex / mag) * length,
      selectedCharge.y + (Ey / mag) * length,
      COLORS.force, 3, 10
    );
    return;
  }

  let totalFx = 0;
  let totalFy = 0;

  charges.forEach(other => {
    if (other === selectedCharge) return;

    const { x: fx, y: fy } = computeForce(selectedCharge, other, metersPerPixel);
    totalFx += fx;
    totalFy += fy;

    const mag = Math.sqrt(fx * fx + fy * fy);
    if (mag < 1e-10) return;

    const ux = fx / mag;
    const uy = -fy / mag;
    const length = Math.min(96, 36 + mag * 0.00015);

    drawArrow(
      selectedCharge.x, selectedCharge.y,
      selectedCharge.x + ux * length, selectedCharge.y + uy * length,
      COLORS.forceIndividual, 2.5, 8
    );
  });

  const resultMag = Math.sqrt(totalFx * totalFx + totalFy * totalFy);
  if (resultMag < 1e-10) return;

  const ux = totalFx / resultMag;
  const uy = -totalFy / resultMag;
  const length = 52 + resultMag * 0.00052;

  drawArrow(
    selectedCharge.x, selectedCharge.y,
    selectedCharge.x + ux * length, selectedCharge.y + uy * length,
    COLORS.force, 4, 12
  );
}

// =================== INFO PANEL ===================
function updateInfoPanel() {
  const sourceList = charges.filter(c => !c.isTestCharge);
  const testList   = charges.filter(c =>  c.isTestCharge);

  let html = `<h3>Cargas</h3>`;
  html += `<table class="table"><tr><th>#</th><th>q (µC)</th><th>x (m)</th><th>y (m)</th></tr>`;
  sourceList.forEach((c, i) => {
    const w = toWorld(c.x, c.y);
    const sel = c === selectedCharge ? " selected" : "";
    html += `<tr class="${sel}">
      <td>${i + 1}</td>
      <td>${c.qMicro.toFixed(2)}</td>
      <td>${w.x.toFixed(2)}</td>
      <td>${w.y.toFixed(2)}</td>
    </tr>`;
  });
  html += `</table>`;

  if (testList.length > 0) {
    html += `<h3 style="margin-top:0.75rem">Cargas de prova</h3>`;
    html += `<table class="table"><tr><th>#</th><th>x (m)</th><th>y (m)</th></tr>`;
    testList.forEach((c, i) => {
      const w = toWorld(c.x, c.y);
      const sel = c === selectedCharge ? " selected" : "";
      html += `<tr class="${sel}">
        <td>q₀${testList.length > 1 ? i + 1 : ""}</td>
        <td>${w.x.toFixed(2)}</td>
        <td>${w.y.toFixed(2)}</td>
      </tr>`;
    });
    html += `</table>`;
  }

  if (selectedCharge && !selectedCharge.isTestCharge) {
    const { fx, fy } = computeNetForce(selectedCharge, charges, metersPerPixel);
    const f = Math.sqrt(fx * fx + fy * fy);
    html += `
      <div class="force-box">
        Fx = ${formatSci(fx)} N<br>
        Fy = ${formatSci(fy)} N<br>
        <div class="force-main">|F| = ${formatSci(f)} N</div>
      </div>
    `;
  }

  if (selectedCharge?.isTestCharge) {
    const { Ex, Ey: EyCanvas } = computeFieldAt(selectedCharge.x, selectedCharge.y, charges, metersPerPixel);
    const EyPhys = -EyCanvas;
    const E  = Math.sqrt(Ex * Ex + EyPhys * EyPhys);
    const Fx = Q_TEST * Ex;
    const Fy = Q_TEST * EyPhys;
    const F  = Math.sqrt(Fx * Fx + Fy * Fy);
    html += `
      <div class="force-box">
        <div class="force-main">Campo elétrico</div>
        Ex = ${formatSci(Ex)} N/C<br>
        Ey = ${formatSci(EyPhys)} N/C<br>
        |E| = ${formatSci(E)} N/C
        <div class="force-main" style="margin-top:0.6rem">Força (q₀ = 1×10⁻¹⁶ C)</div>
        Fx = ${formatSci(Fx)} N<br>
        Fy = ${formatSci(Fy)} N<br>
        <div class="force-main">|F| = ${formatSci(F)} N</div>
      </div>
    `;
  }

  infoPanel.innerHTML = html;
}

// =================== ANIMATION LOOP ===================
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (showField) drawField();
  if (showFieldLines) drawFieldLines();
  drawAxes();
  drawForceVector();
  charges.forEach(c => c.draw());
  updateInfoPanel();
  requestAnimationFrame(update);
}

// =================== MOUSE EVENTS ===================
canvas.addEventListener("mousedown", e => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  selectedCharge = null;
  dragging = null;

  charges.forEach(c => {
    const dx = mx - c.x;
    const dy = my - c.y;
    if (Math.sqrt(dx * dx + dy * dy) < 20) {
      selectedCharge = c;
      dragging = c;
      const w = toWorld(c.x, c.y);
      inputX.value = w.x.toFixed(2);
      inputY.value = w.y.toFixed(2);
    }
  });
});

canvas.addEventListener("mousemove", e => {
  if (dragging) {
    const rect = canvas.getBoundingClientRect();
    dragging.x = e.clientX - rect.left;
    dragging.y = e.clientY - rect.top;
    fieldLinesDirty = true;
  }
});

canvas.addEventListener("mouseup", () => { dragging = null; });

// =================== GRAPH ===================
let chartCampo = null;

function gerarGraficoCampo() {
  if (charges.length === 0) {
    alert("Adicione pelo menos uma carga para gerar o gráfico!");
    return;
  }

  const showEx = document.getElementById("showEx").checked;
  const showEy = document.getElementById("showEy").checked;
  const showE = document.getElementById("showE").checked;

  if (!showEx && !showEy && !showE) {
    alert("Selecione pelo menos um componente (Eₓ, Eᵧ ou |E|)!");
    return;
  }

  const labels = [];
  let dataEx = [];
  let dataEy = [];
  let dataE = [];

  const step = 3;
  const SINGULARITY_THRESHOLD = 15;
  const MAX_FIELD = 1e5;

  for (let x = 0; x < canvas.width; x += step) {
    const canvasX = x;
    const canvasY = canvas.height / 2;

    let nearSingularity = false;
    for (const c of charges) {
      const dx = canvasX - c.x;
      const dy = canvasY - c.y;
      if (Math.sqrt(dx * dx + dy * dy) < SINGULARITY_THRESHOLD) {
        nearSingularity = true;
        break;
      }
    }

    const xReal = (canvasX - canvas.width / 2) * metersPerPixel;
    labels.push(Number(xReal.toFixed(4)));

    if (nearSingularity) {
      dataEx.push(null);
      dataEy.push(null);
      dataE.push(null);
    } else {
      const { Ex, Ey: EyCanvas } = computeFieldAt(canvasX, canvasY, charges, metersPerPixel);
      // computeFieldAt uses canvas-y (down = positive). Negate Ey to get physical y (up = positive).
      const Ey = -EyCanvas;
      const E = Math.sqrt(Ex * Ex + Ey * Ey);

      dataEx.push(!isFinite(Ex) || Math.abs(Ex) > MAX_FIELD ? null : Number(Ex.toExponential(2)));
      dataEy.push(!isFinite(Ey) || Math.abs(Ey) > MAX_FIELD ? null : Number(Ey.toExponential(2)));
      dataE.push(!isFinite(E)  || Math.abs(E)  > MAX_FIELD ? null : Number(E.toExponential(2)));
    }
  }

  if (chartCampo) chartCampo.destroy();

  const graphTitle  = document.getElementById("graphTitle").value  || "Campo Elétrico";
  const graphLabelX = document.getElementById("graphLabelX").value || "Posição x (m)";
  const graphLabelY = document.getElementById("graphLabelY").value || "Campo Elétrico (N/C)";
  const colorEx = document.getElementById("colorEx").value;
  const colorEy = document.getElementById("colorEy").value;
  const colorE  = document.getElementById("colorE").value;

  const generateSmartTicks = (minVal, maxVal) => {
    const range = maxVal - minVal;
    let step;
    if (range <= 0.1) step = 0.01;
    else if (range <= 1) step = 0.1;
    else if (range <= 10) step = 1;
    else if (range <= 100) step = 10;
    else step = Math.pow(10, Math.floor(Math.log10(range)) - 1);

    const ticks = [];
    const start = Math.floor(minVal / step) * step;
    const end   = Math.ceil(maxVal / step) * step;
    for (let i = start; i <= end; i += step) ticks.push(Number(i.toFixed(10)));
    return { ticks, step };
  };

  const { step: xStep } = generateSmartTicks(Math.min(...labels), Math.max(...labels));

  const datasets = [];

  if (showEx) datasets.push({
    label: "Eₓ (N/C)", data: dataEx, borderColor: colorEx,
    backgroundColor: colorEx + "1a", borderWidth: 2, tension: 0.2,
    spanGaps: false, pointRadius: 0
  });

  if (showEy) datasets.push({
    label: "Eᵧ (N/C)", data: dataEy, borderColor: colorEy,
    backgroundColor: colorEy + "1a", borderWidth: 2, tension: 0.2,
    spanGaps: false, pointRadius: 0
  });

  if (showE) datasets.push({
    label: "|E| (N/C)", data: dataE, borderColor: colorE,
    backgroundColor: colorE + "1a", borderWidth: 2.5, tension: 0.2,
    spanGaps: false, pointRadius: 0
  });

  const chartCtx = document.getElementById("graficoCampo").getContext("2d");
  chartCampo = new Chart(chartCtx, {
    type: "line",
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      interaction: { mode: "index", intersect: false },
      plugins: {
        title: {
          display: true,
          text: graphTitle,
          font: { size: 16, weight: "bold" }
        },
        legend: {
          display: true,
          position: "top",
          labels: { padding: 15, font: { size: 12 } }
        },
        tooltip: {
          backgroundColor: "rgba(0,0,0,0.8)",
          padding: 12,
          titleFont: { size: 12 },
          bodyFont: { size: 11 },
          callbacks: {
            label(context) {
              const v = context.parsed.y;
              if (v === null) return `${context.dataset.label}: [singularidade]`;
              return `${context.dataset.label}: ${v}`;
            }
          }
        }
      },
      scales: {
        x: {
          type: "linear",
          title: { display: true, text: graphLabelX, font: { size: 12, weight: "bold" } },
          grid: { color: "rgba(0,0,0,0.05)" },
          ticks: {
            callback(value) {
              return value.toFixed(xStep.toString().split(".")[1]?.length || 0);
            }
          }
        },
        y: {
          title: { display: true, text: graphLabelY, font: { size: 12, weight: "bold" } },
          type: "linear",
          grid: { color: "rgba(0,0,0,0.05)" }
        }
      }
    }
  });
}

function baixarGraficoCampo() {
  if (!chartCampo) {
    alert("Gere o gráfico primeiro!");
    return;
  }
  const graphCanvas = document.getElementById("graficoCampo");
  const url = graphCanvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "campo_eletrico.png";
  link.href = url;
  link.click();
}

// =================== TUTORIAL ===================
function toggleTutorial() {
  const content = document.getElementById("tutorialContent");
  const icon = document.querySelector(".tutorial-icon");
  const isOpen = content.classList.toggle("open");
  content.style.display = isOpen ? "block" : "none";
  if (icon) icon.textContent = isOpen ? "▲" : "▼";
}

// =================== COLLAPSIBLE SECTIONS ===================
document.querySelectorAll(".section-header").forEach(header => {
  header.addEventListener("click", () => {
    header.classList.toggle("collapsed");
    header.nextElementSibling?.classList.toggle("hidden");
  });
});

// =================== WIRE UP BUTTONS ===================
document.getElementById("btnAddPositive")?.addEventListener("click", () => addCharge(1));
document.getElementById("btnAddNegative")?.addEventListener("click", () => addCharge(-1));
document.getElementById("btnAddTestCharge")?.addEventListener("click", addTestCharge);
document.getElementById("btnDeleteSelected")?.addEventListener("click", deleteSelected);
document.getElementById("btnDeleteAll")?.addEventListener("click", deleteAll);
document.getElementById("fieldLinesCount")?.addEventListener("input", e => {
  const v = parseInt(e.target.value);
  if (v >= 1) { fieldLinesPerCharge = v; fieldLinesDirty = true; }
});
document.getElementById("btnMover")?.addEventListener("click", updatePositionFromInputs);
document.getElementById("btnToggleField")?.addEventListener("click", toggleField);
document.getElementById("btnToggleProjector")?.addEventListener("click", toggleProjectorMode);
document.getElementById("btnToggleFieldLines")?.addEventListener("click", toggleFieldLines);
document.getElementById("scaleSelect")?.addEventListener("change", updateScale);
document.getElementById("btnGerarGrafico")?.addEventListener("click", gerarGraficoCampo);
document.getElementById("btnBaixarGrafico")?.addEventListener("click", baixarGraficoCampo);
document.getElementById("btnTutorialToggle")?.addEventListener("click", toggleTutorial);

// =================== START ===================
update();
