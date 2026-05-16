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
  axis: "#565672",
  selected: "#a78bfa"
};

// =================== STATE ===================
let charges = [];
let selectedCharge = null;
let dragging = null;
let showField = true;
let metersPerPixel = 0.01;

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
  }

  get q() {
    return this.qMicro * 1e-6;
  }

  draw() {
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
}

// =================== CHARGE MANAGEMENT ===================
function addCharge(sign) {
  charges.push(new Charge(
    Math.random() * canvas.width,
    Math.random() * canvas.height,
    sign * chargeMagnitude
  ));
}

function deleteSelected() {
  if (!selectedCharge) return;
  charges = charges.filter(c => c !== selectedCharge);
  selectedCharge = null;
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

function updateScale() {
  const select = document.getElementById("scaleSelect");
  metersPerPixel = parseFloat(select.value);
}
window.updateScale = updateScale;

// =================== FIELD DRAWING ===================
function drawField() {
  const spacing = 30;
  const arrowLen = 15;

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
      ctx.strokeStyle = COLORS.field;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const angle = Math.atan2(uy, ux);
      const size = 5;
      ctx.beginPath();
      ctx.moveTo(endX, endY);
      ctx.lineTo(endX - size * Math.cos(angle - Math.PI / 6), endY - size * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(endX - size * Math.cos(angle + Math.PI / 6), endY - size * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fillStyle = COLORS.field;
      ctx.fill();
    }
  }
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
  let html = `<h3>Cargas</h3>`;
  html += `<table class="table"><tr><th>#</th><th>q (µC)</th><th>x (m)</th><th>y (m)</th></tr>`;

  charges.forEach((c, i) => {
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

  if (selectedCharge) {
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

  infoPanel.innerHTML = html;
}

// =================== ANIMATION LOOP ===================
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (showField) drawField();
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
document.getElementById("btnDeleteSelected")?.addEventListener("click", deleteSelected);
document.getElementById("btnMover")?.addEventListener("click", updatePositionFromInputs);
document.getElementById("btnToggleField")?.addEventListener("click", toggleField);
document.getElementById("scaleSelect")?.addEventListener("change", updateScale);
document.getElementById("btnGerarGrafico")?.addEventListener("click", gerarGraficoCampo);
document.getElementById("btnBaixarGrafico")?.addEventListener("click", baixarGraficoCampo);
document.getElementById("btnTutorialToggle")?.addEventListener("click", toggleTutorial);

// =================== START ===================
update();
