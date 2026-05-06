import { parseEquation } from './engine/mathparser.js';
import Object2D from './engine/object2D.js';
import { getTime, resetTime, togglePause as toggleSimulationPause, setSpeed } from './engine/time.js';
import { render, pixelsToMath, mathToPixels, getPixelsPerMeter } from './engine/renderer.js';
import * as Controls from './ui/controls.js';
import * as Sidebar from './ui/sidebar.js';
import * as Modal from './ui/modal.js';

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const graphCanvas = document.getElementById("graphCanvas");
const graphCtx = graphCanvas?.getContext("2d");
const workspace = document.getElementById("workspace");
const MAX_OBJECTS = 6;

const OBJECT_COLORS = ["#fb923c", "#2f5bea", "#22c55e", "#a855f7", "#ef4444", "#14b8a6"];

const GRAPH_FIELDS = {
  t:  { label: "t (s)",      get: (p) => p.t },
  x:  { label: "x (m)",     get: (p) => p.x },
  y:  { label: "y (m)",     get: (p) => p.y },
  vx: { label: "vx (m/s)",  get: (p) => p.vx },
  vy: { label: "vy (m/s)",  get: (p) => p.vy },
  v:  { label: "|v| (m/s)", get: (p) => p.speed },
  ax: { label: "ax (m/s²)", get: (p) => p.ax },
  ay: { label: "ay (m/s²)", get: (p) => p.ay },
  a:  { label: "|a| (m/s²)",get: (p) => p.acceleration }
};
const GRAPH_COLORS = ["#2f5bea", "#fb923c", "#22c55e", "#a855f7"];

let objects = [];
let selected = null;
let dragging = null;
let topWindowZIndex = 10;
let resizeObserver = null;

// ── Canvas resize ──────────────────────────────────────────────
function resizeCanvas() {
  const container = document.querySelector(".canvas-container");
  if (!container) return;
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
  resizeGraphCanvas();
  updateInfoPanel();
  drawGraph(getTime());
}

function resizeGraphCanvas() {
  if (!graphCanvas) return;
  const body = graphCanvas.closest(".window-body");
  const dpr = window.devicePixelRatio || 1;
  const cssWidth = Math.max(320, (body?.clientWidth || 900) - 24);
  const cssHeight = Math.max(200, (body?.clientHeight || 400) - 24);
  graphCanvas.width = Math.round(cssWidth * dpr);
  graphCanvas.height = Math.round(cssHeight * dpr);
  graphCanvas.style.width = `${cssWidth}px`;
  graphCanvas.style.height = `${cssHeight}px`;
}

function getOptions() {
  return {
    showTrail: Sidebar.isTrailVisible(),
    showVelocity: Sidebar.isVelocityVisible(),
    showAcceleration: Sidebar.isAccelerationVisible(),
    selected
  };
}

// ── Object management ──────────────────────────────────────────
function editObjectEquations(object) {
  Modal.openEquationModal(object, (target, _a, _b, systemConfig) => {
    try {
      if (systemConfig?.mode === "differential") {
        systemConfig.timeOffset = getTime();
        target.setEDOSystem(systemConfig);
      } else if (systemConfig?.mode === "direct") {
        target.setDirectSystem(systemConfig.equations, getTime());
      } else {
        const eqX = parseEquation(systemConfig.eqXStr);
        const eqY = parseEquation(systemConfig.eqYStr);
        target.setEquations(eqX, eqY, systemConfig.eqXStr, systemConfig.eqYStr, getTime());
      }
      updateInfoPanel();
      updateObjectTables(getTime());
      drawGraph(getTime());
    } catch (error) {
      alert(`Erro ao processar equações: ${error.message}`);
    }
  });
}

function addRandomObject() {
  if (objects.length >= MAX_OBJECTS) {
    alert(`Limite de ${MAX_OBJECTS} objetos atingido.`);
    return;
  }

  const color = OBJECT_COLORS[objects.length % OBJECT_COLORS.length];
  const obj = new Object2D({
    x: (Math.random() - 0.5) * 6,
    y: (Math.random() - 0.5) * 6,
    color,
    eqX: null,
    eqY: null
  });

  objects.push(obj);
  selected = obj;
  updateInfoPanel();
  updateGraphObjectOptions();
  updateObjectTables(getTime());
  editObjectEquations(obj);
}

function clearScene() {
  objects = [];
  selected = null;
  updateInfoPanel();
  updateGraphObjectOptions();
  updateObjectTables(0);
  drawGraph(0);
}

// ── Pre-built scenarios ────────────────────────────────────────
function loadScenario(name) {
  const scenarios = {
    circular: () => {
      const obj = makeObj(0, { eqX: "2*cos(t)", eqY: "2*sin(t)", shape: "circle", label: "MCU" });
      return [obj];
    },
    projectile: () => {
      const obj = makeObj(1, { eqX: "4*t", eqY: "5 + 3*t - 4.9*t*t", shape: "soccer", label: "Projétil" });
      return [obj];
    },
    ellipse: () => {
      const obj = makeObj(2, { eqX: "3*cos(t)", eqY: "2*sin(t)", shape: "satellite", label: "Órbita" });
      return [obj];
    },
    pendulum: () => {
      const obj = makePendulumObj();
      return [obj];
    },
    lissajous: () => {
      const a = makeObj(0, { eqX: "3*cos(3*t)", eqY: "2*sin(4*t)", shape: "circle", label: "Lissajous" });
      return [a];
    },
    spiral: () => {
      const obj = makeObj(3, { eqX: "0.4*t*cos(t)", eqY: "0.4*t*sin(t)", shape: "rocket", label: "Espiral" });
      return [obj];
    },
    freeFall: () => {
      const obj = makeObj(4, { eqX: "0", eqY: "8 - 4.9*t*t", shape: "soccer", label: "Queda livre" });
      return [obj];
    }
  };

  const builder = scenarios[name];
  if (!builder) return;

  clearScene();
  resetTime();
  const newObjects = builder();
  objects.push(...newObjects);
  selected = objects[0] || null;
  updateInfoPanel();
  updateGraphObjectOptions();
  updateObjectTables(getTime());
  drawGraph(getTime());
}

function makeObj(colorIndex, { eqX, eqY, shape = "circle", label = "" }) {
  return new Object2D({
    x: parseEquation(eqX)(0),
    y: parseEquation(eqY)(0),
    eqX: parseEquation(eqX),
    eqY: parseEquation(eqY),
    eqXSource: eqX,
    eqYSource: eqY,
    color: OBJECT_COLORS[colorIndex % OBJECT_COLORS.length],
    shape,
    label
  });
}

function makePendulumObj() {
  const obj = new Object2D({
    x: 2 * Math.sin(0.8),
    y: -2 * Math.cos(0.8),
    color: OBJECT_COLORS[5],
    shape: "pendulum",
    label: "Pêndulo"
  });
  obj.setEDOSystem({
    mode: "differential",
    equations: [
      { variable: "theta", expression: "omega" },
      { variable: "omega", expression: "-(9.8/2)*sin(theta)" }
    ],
    algebraicEquations: [
      { variable: "x", expression: "2*sin(theta)" },
      { variable: "y", expression: "-2*cos(theta)" }
    ],
    constants: {},
    initialValues: { theta: 0.8, omega: 0 },
    timeOffset: 0
  });
  return obj;
}

function deleteObject(object) {
  objects = objects.filter((item) => item !== object);
  if (selected === object) selected = objects[0] || null;
  updateInfoPanel();
  updateGraphObjectOptions();
  updateObjectTables(getTime());
  drawGraph(getTime());
}

function resetSimulationTime() {
  resetTime();
  objects.forEach((obj) => obj.resetToInitial());
  updateInfoPanel();
  updateObjectTables(0);
  drawGraph(0);
  Controls.updateTimeLabel(0);
}

// ── Info panel ─────────────────────────────────────────────────
const SHAPE_LABELS = {
  circle: "Partícula",
  rocket: "Foguete",
  soccer: "Bola",
  car: "Carro",
  pendulum: "Pêndulo",
  satellite: "Satélite"
};

function updateInfoPanel() {
  const panel = document.getElementById("infoPanel");
  if (!panel) return;

  if (objects.length === 0) {
    panel.innerHTML = `
      <div class="empty-state">
        <p>Adicione um objeto para começar.</p>
        <button type="button" data-action="add-object" class="btn-add-object-inline">+ Adicionar objeto</button>
      </div>`;
    return;
  }

  panel.innerHTML = objects.map((obj, i) => {
    const isSelected = obj === selected;
    const ec = 0.5 * obj.mass * obj.velocityMagnitude ** 2;
    const shapeLabel = SHAPE_LABELS[obj.shape] || obj.shape;
    const displayName = obj.label ? `${obj.label}` : `Objeto ${i + 1}`;

    return `
      <div class="object-info-card${isSelected ? " selecionado" : ""}">
        <div class="object-info-header">
          <div class="object-info-title">
            <span style="width:10px;height:10px;border-radius:50%;background:${escapeHtml(obj.color)};display:inline-block;flex-shrink:0"></span>
            ${escapeHtml(displayName)}
            <span class="object-shape-badge">${escapeHtml(shapeLabel)}</span>
          </div>
        </div>
        <div class="kinematic-grid">
          <div class="kinematic-item">
            <span class="k-label">x</span>
            <span class="k-value">${obj.x.toFixed(3)} m</span>
          </div>
          <div class="kinematic-item">
            <span class="k-label">y</span>
            <span class="k-value">${obj.y.toFixed(3)} m</span>
          </div>
          <div class="kinematic-item">
            <span class="k-label">vx</span>
            <span class="k-value velocity">${obj.vx.toFixed(3)} m/s</span>
          </div>
          <div class="kinematic-item">
            <span class="k-label">vy</span>
            <span class="k-value velocity">${obj.vy.toFixed(3)} m/s</span>
          </div>
          <div class="kinematic-item">
            <span class="k-label">|v|</span>
            <span class="k-value velocity">${obj.velocityMagnitude.toFixed(3)} m/s</span>
          </div>
          <div class="kinematic-item">
            <span class="k-label">|a|</span>
            <span class="k-value acceleration">${obj.accelerationMagnitude.toFixed(3)} m/s²</span>
          </div>
        </div>
        <div class="equation-summary">${formatObjectEquations(obj)}</div>
        <div class="ec-row">EC = <strong>${ec.toFixed(3)} J</strong> &nbsp;|&nbsp; m = ${obj.mass.toFixed(2)} kg</div>
        <div class="object-actions">
          <button type="button" data-object-index="${i}" data-object-action="edit">Editar</button>
          <button type="button" class="danger" data-object-index="${i}" data-object-action="delete">Excluir</button>
        </div>
      </div>`;
  }).join("");
}

function formatObjectEquations(obj) {
  if (obj.edoSystem?.equations?.length) {
    const diff = obj.edoSystem.equations
      .map((eq) => `<code>d${escapeHtml(eq.variable)}/dt = ${escapeHtml(eq.expression)}</code>`)
      .join(" &nbsp; ");
    const alg = obj.edoSystem.algebraicEquations?.length
      ? " &nbsp; " + obj.edoSystem.algebraicEquations
          .map((eq) => `<code>${escapeHtml(eq.variable)} = ${escapeHtml(eq.expression)}</code>`)
          .join(" &nbsp; ")
      : "";
    return diff + alg;
  }
  if (obj.directSystem?.length) {
    return obj.directSystem
      .map((eq) => `<code>${escapeHtml(eq.variable)}(t) = ${escapeHtml(eq.expression)}</code>`)
      .join(" &nbsp; ");
  }
  return `<code>x(t) = ${escapeHtml(obj.eqXSource || "—")}</code> &nbsp; <code>y(t) = ${escapeHtml(obj.eqYSource || "—")}</code>`;
}

// ── Object tables ──────────────────────────────────────────────
function updateObjectTables(t) {
  const panel = document.getElementById("objectTables");
  if (!panel) return;

  if (objects.length === 0) {
    panel.innerHTML = '<p class="empty-state-text">Adicione até 6 objetos para acompanhar as grandezas cinemáticas.</p>';
    return;
  }

  panel.innerHTML = objects.map((obj, index) => {
    const localTime = obj.getLocalTime(t);
    const tableSamples = obj.samples.slice(-16);
    const rows = tableSamples.length === 0
      ? `<tr><td>${localTime.toFixed(2)}</td><td>${obj.x.toFixed(3)}</td><td>${obj.y.toFixed(3)}</td><td>${obj.vx.toFixed(3)}</td><td>${obj.vy.toFixed(3)}</td><td>${obj.velocityMagnitude.toFixed(3)}</td><td>${obj.accelerationMagnitude.toFixed(3)}</td></tr>`
      : tableSamples.map((s) =>
          `<tr><td>${s.t.toFixed(2)}</td><td>${s.x.toFixed(3)}</td><td>${s.y.toFixed(3)}</td><td>${s.vx.toFixed(3)}</td><td>${s.vy.toFixed(3)}</td><td>${s.speed.toFixed(3)}</td><td>${s.acceleration.toFixed(3)}</td></tr>`
        ).join("");

    const displayName = obj.label ? escapeHtml(obj.label) : `Objeto ${index + 1}`;

    return `
      <div class="object-table-card">
        <div class="object-table-header">
          <h4><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${escapeHtml(obj.color)};margin-right:6px;vertical-align:middle"></span>${displayName}</h4>
          <button class="btn-csv" type="button" data-export-index="${index}">⬇ CSV</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>t (s)</th><th>x (m)</th><th>y (m)</th>
              <th>vx (m/s)</th><th>vy (m/s)</th>
              <th>|v| (m/s)</th><th>|a| (m/s²)</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  }).join("");
}

function exportObjectCSV(index) {
  const obj = objects[index];
  if (!obj) return;

  const header = "t (s),x (m),y (m),vx (m/s),vy (m/s),|v| (m/s),|a| (m/s²)";
  const rows = obj.samples.map((s) =>
    [s.t, s.x, s.y, s.vx, s.vy, s.speed, s.acceleration]
      .map((v) => v.toFixed(6))
      .join(",")
  );
  const csv = [header, ...rows].join("\n");
  const name = obj.label ? obj.label.replace(/\s+/g, "_") : `objeto_${index + 1}`;
  downloadText(`tabela_${name}.csv`, csv, "text/csv");
}

function exportAllCSV() {
  if (objects.length === 0) return;
  objects.forEach((_, i) => exportObjectCSV(i));
}

function downloadText(filename, content, type = "text/plain") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Graph ──────────────────────────────────────────────────────
function initializeGraphControls() {
  ["graphXA", "graphYA", "graphXB", "graphYB"].forEach((id) => {
    const select = document.getElementById(id);
    if (!select) return;
    select.innerHTML = Object.entries(GRAPH_FIELDS)
      .map(([value, field]) => `<option value="${value}">${field.label}</option>`)
      .join("");
  });

  document.getElementById("graphXA").value = "t";
  document.getElementById("graphYA").value = "x";
  document.getElementById("graphXB").value = "t";
  document.getElementById("graphYB").value = "y";
}

function updateGraphObjectOptions() {
  ["graphObjectA", "graphObjectB"].forEach((id) => {
    const select = document.getElementById(id);
    if (!select) return;
    const previousValue = select.value;
    select.innerHTML = objects.length === 0
      ? '<option value="">Sem objetos</option>'
      : objects.map((obj, index) => {
          const name = obj.label || `Objeto ${index + 1}`;
          return `<option value="${index}">${escapeHtml(name)}</option>`;
        }).join("");
    if (objects[Number(previousValue)]) {
      select.value = previousValue;
    } else if (selected && objects.includes(selected)) {
      select.value = String(objects.indexOf(selected));
    }
  });
}

function getGraphObject(id) {
  const select = document.getElementById(id);
  if (!select) return objects[0] || null;
  return objects[Number(select.value)] || null;
}

function setGraphSelectionToObject(object) {
  const index = objects.indexOf(object);
  if (index < 0) return;
  const select = document.getElementById("graphObjectA");
  if (select) select.value = String(index);
}

function getGraphConfig() {
  return {
    series: [
      {
        enabled: true,
        object: getGraphObject("graphObjectA"),
        xKey: document.getElementById("graphXA")?.value || "t",
        yKey: document.getElementById("graphYA")?.value || "x",
        color: GRAPH_COLORS[0],
        name: "Série A"
      },
      {
        enabled: document.getElementById("graphUseB")?.checked || false,
        object: getGraphObject("graphObjectB"),
        xKey: document.getElementById("graphXB")?.value || "t",
        yKey: document.getElementById("graphYB")?.value || "y",
        color: GRAPH_COLORS[1],
        name: "Série B"
      }
    ],
    timeMin: parseOptionalNumber("graphTimeMin"),
    timeMax: parseOptionalNumber("graphTimeMax")
  };
}

function parseOptionalNumber(id) {
  const value = document.getElementById(id)?.value;
  if (!value) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function getSeriesPoints(series, t, timeMin, timeMax) {
  if (!series.object) return [];
  const obj = series.object;
  const localTime = obj.getLocalTime(t);
  const samples = obj.samples.concat({
    t: localTime, x: obj.x, y: obj.y,
    vx: obj.vx, vy: obj.vy, ax: obj.ax, ay: obj.ay,
    speed: obj.velocityMagnitude, acceleration: obj.accelerationMagnitude
  });

  return samples
    .filter((s) => timeMin === null || s.t >= timeMin)
    .filter((s) => timeMax === null || s.t <= timeMax)
    .map((s) => ({
      x: GRAPH_FIELDS[series.xKey].get(s),
      y: GRAPH_FIELDS[series.yKey].get(s),
      t: s.t
    }))
    .filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y));
}

function drawGraph(t) {
  if (!graphCanvas || !graphCtx) return;
  const dpr = window.devicePixelRatio || 1;
  const cssW = graphCanvas.width / dpr;
  const cssH = graphCanvas.height / dpr;

  graphCtx.save();
  graphCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  graphCtx.clearRect(0, 0, cssW, cssH);
  graphCtx.fillStyle = "#ffffff";
  graphCtx.fillRect(0, 0, cssW, cssH);

  const config = getGraphConfig();
  const preparedSeries = config.series
    .filter((s) => s.enabled)
    .map((s) => ({ ...s, points: getSeriesPoints(s, t, config.timeMin, config.timeMax) }))
    .filter((s) => s.points.length >= 2);

  if (preparedSeries.length === 0) {
    drawGraphMessage("Adicione objetos e aguarde amostras no intervalo selecionado.", cssW, cssH);
  } else {
    drawGraphAxes(preparedSeries, cssW, cssH);
  }
  graphCtx.restore();
}

function drawGraphAxes(seriesList, W, H) {
  const pad = { left: 66, right: 28, top: 32, bottom: 52 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;
  const allPoints = seriesList.flatMap((s) => s.points);
  const xTicks = getNiceTicks(Math.min(...allPoints.map((p) => p.x)), Math.max(...allPoints.map((p) => p.x)), 6);
  const yTicks = getNiceTicks(Math.min(...allPoints.map((p) => p.y)), Math.max(...allPoints.map((p) => p.y)), 6);
  const xRange = { min: xTicks[0], max: xTicks[xTicks.length - 1] };
  const yRange = { min: yTicks[0], max: yTicks[yTicks.length - 1] };
  const xSpan = xRange.max - xRange.min || 1;
  const ySpan = yRange.max - yRange.min || 1;
  const toPx = (p) => ({
    x: pad.left + ((p.x - xRange.min) / xSpan) * plotW,
    y: pad.top + plotH - ((p.y - yRange.min) / ySpan) * plotH
  });

  // Background
  graphCtx.fillStyle = "#fafafa";
  graphCtx.fillRect(pad.left, pad.top, plotW, plotH);

  // Grid lines
  graphCtx.strokeStyle = "#e2e8f0";
  graphCtx.lineWidth = 1;
  xTicks.forEach((tick) => {
    const x = pad.left + ((tick - xRange.min) / xSpan) * plotW;
    graphCtx.beginPath(); graphCtx.moveTo(x, pad.top); graphCtx.lineTo(x, pad.top + plotH); graphCtx.stroke();
  });
  yTicks.forEach((tick) => {
    const y = pad.top + plotH - ((tick - yRange.min) / ySpan) * plotH;
    graphCtx.beginPath(); graphCtx.moveTo(pad.left, y); graphCtx.lineTo(pad.left + plotW, y); graphCtx.stroke();
  });

  // Zero lines
  if (xRange.min <= 0 && xRange.max >= 0) {
    const x = pad.left + ((0 - xRange.min) / xSpan) * plotW;
    graphCtx.strokeStyle = "#94a3b8"; graphCtx.lineWidth = 1;
    graphCtx.beginPath(); graphCtx.moveTo(x, pad.top); graphCtx.lineTo(x, pad.top + plotH); graphCtx.stroke();
  }
  if (yRange.min <= 0 && yRange.max >= 0) {
    const y = pad.top + plotH - ((0 - yRange.min) / ySpan) * plotH;
    graphCtx.strokeStyle = "#94a3b8"; graphCtx.lineWidth = 1;
    graphCtx.beginPath(); graphCtx.moveTo(pad.left, y); graphCtx.lineTo(pad.left + plotW, y); graphCtx.stroke();
  }

  // Border
  graphCtx.strokeStyle = "#cbd5e1";
  graphCtx.lineWidth = 1;
  graphCtx.strokeRect(pad.left, pad.top, plotW, plotH);

  // Tick labels
  graphCtx.font = "11px Inter, sans-serif";
  graphCtx.fillStyle = "#64748b";
  xTicks.forEach((tick) => {
    const x = pad.left + ((tick - xRange.min) / xSpan) * plotW;
    graphCtx.textAlign = "center";
    graphCtx.fillText(formatTick(tick), x, pad.top + plotH + 17);
  });
  yTicks.forEach((tick) => {
    const y = pad.top + plotH - ((tick - yRange.min) / ySpan) * plotH;
    graphCtx.textAlign = "right";
    graphCtx.fillText(formatTick(tick), pad.left - 6, y + 4);
  });

  // Axis labels
  graphCtx.font = "12px Inter, sans-serif";
  graphCtx.fillStyle = "#374151";
  graphCtx.textAlign = "center";
  graphCtx.fillText(currentAxisLabel("x"), pad.left + plotW / 2, H - 10);
  graphCtx.save();
  graphCtx.translate(14, pad.top + plotH / 2);
  graphCtx.rotate(-Math.PI / 2);
  graphCtx.fillText(currentAxisLabel("y"), 0, 0);
  graphCtx.restore();

  // Series lines (with anti-aliasing smoothing)
  seriesList.forEach((series) => {
    graphCtx.save();
    graphCtx.beginPath();
    series.points.forEach((point, index) => {
      const pixel = toPx(point);
      if (index === 0) graphCtx.moveTo(pixel.x, pixel.y);
      else graphCtx.lineTo(pixel.x, pixel.y);
    });
    graphCtx.strokeStyle = series.color;
    graphCtx.lineWidth = 2;
    graphCtx.lineJoin = "round";
    graphCtx.lineCap = "round";
    graphCtx.stroke();
    graphCtx.restore();

    // End dot
    if (series.points.length > 0) {
      const last = toPx(series.points[series.points.length - 1]);
      graphCtx.beginPath();
      graphCtx.arc(last.x, last.y, 4, 0, Math.PI * 2);
      graphCtx.fillStyle = series.color;
      graphCtx.fill();
    }
  });

  drawLegend(seriesList, pad);
}

function drawLegend(seriesList, pad) {
  let x = pad.left;
  const y = 18;
  seriesList.forEach((series) => {
    const objectIndex = objects.indexOf(series.object) + 1;
    const objName = series.object?.label || `Objeto ${objectIndex}`;
    const label = `${objName} — ${GRAPH_FIELDS[series.yKey].label} × ${GRAPH_FIELDS[series.xKey].label}`;
    graphCtx.fillStyle = series.color;
    graphCtx.fillRect(x, y - 7, 16, 3);
    graphCtx.fillStyle = "#374151";
    graphCtx.font = "11px Inter, sans-serif";
    graphCtx.textAlign = "left";
    graphCtx.fillText(label, x + 22, y - 2);
    x += Math.min(320, graphCtx.measureText(label).width + 44);
  });
}

function drawGraphMessage(message, W, H) {
  graphCtx.fillStyle = "#94a3b8";
  graphCtx.font = "13px Inter, sans-serif";
  graphCtx.textAlign = "center";
  graphCtx.fillText(message, W / 2, H / 2);
}

function currentAxisLabel(axis) {
  const aKey = document.getElementById(axis === "x" ? "graphXA" : "graphYA")?.value || "t";
  const bEnabled = document.getElementById("graphUseB")?.checked || false;
  const bKey = document.getElementById(axis === "x" ? "graphXB" : "graphYB")?.value || aKey;
  if (bEnabled && aKey !== bKey) return axis.toUpperCase();
  return GRAPH_FIELDS[aKey]?.label || aKey;
}

function getNiceTicks(min, max, targetCount = 6) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return [0, 1];
  if (Math.abs(max - min) < 1e-12) {
    const delta = Math.abs(max) < 1 ? 1 : Math.abs(max) * 0.2;
    min -= delta; max += delta;
  }
  const step = niceStep((max - min) / Math.max(1, targetCount - 1));
  const niceMin = Math.floor(min / step) * step;
  const niceMax = Math.ceil(max / step) * step;
  const ticks = [];
  for (let v = niceMin; v <= niceMax + step * 0.5; v += step) ticks.push(roundTick(v));
  return ticks.length >= 2 ? ticks : [niceMin, niceMin + step];
}

function niceStep(raw) {
  const e = Math.floor(Math.log10(raw));
  const f = raw / 10 ** e;
  const nice = f <= 1 ? 1 : f <= 2 ? 2 : f <= 4 ? 4 : f <= 5 ? 5 : 10;
  return nice * 10 ** e;
}

function roundTick(v) { return Number(v.toPrecision(12)); }
function formatTick(v) {
  if (Math.abs(v) < 1e-10) return "0";
  return Number.isInteger(v) ? String(v) : String(Number(v.toFixed(6)));
}

function exportGraphPng() {
  if (!graphCanvas) return;
  drawGraph(getTime());
  // Export at full DPR resolution
  const link = document.createElement("a");
  link.download = "grafico-movimento.png";
  link.href = graphCanvas.toDataURL("image/png");
  link.click();
}

// ── Window panels (drag & resize) ─────────────────────────────
function initializeWindowPanels() {
  const panels = Array.from(document.querySelectorAll(".window-panel"));
  panels.forEach((panel, index) => {
    panel.style.zIndex = String(index + 1);
    panel.addEventListener("pointerdown", () => activateWindow(panel));

    const header = panel.querySelector(".window-header");
    const resizeHandle = panel.querySelector(".resize-handle");
    if (header) header.addEventListener("pointerdown", startWindowDrag);
    if (resizeHandle) resizeHandle.addEventListener("pointerdown", startWindowResize);
  });

  if (window.ResizeObserver) {
    resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      drawGraph(getTime());
    });
    document.querySelectorAll(".window-body").forEach((body) => resizeObserver.observe(body));
  }
}

function activateWindow(panel) {
  document.querySelectorAll(".window-panel").forEach((p) => p.classList.remove("active-window"));
  panel.classList.add("active-window");
  topWindowZIndex += 1;
  panel.style.zIndex = String(topWindowZIndex);
}

function startWindowDrag(event) {
  if (window.innerWidth <= 800) return;
  const panel = event.currentTarget.closest(".window-panel");
  if (!panel || !workspace) return;

  // Don't drag if clicking a button inside the header
  if (event.target.closest("button")) return;

  activateWindow(panel);
  const panelRect = panel.getBoundingClientRect();
  const workspaceRect = workspace.getBoundingClientRect();
  const offsetX = event.clientX - panelRect.left;
  const offsetY = event.clientY - panelRect.top;

  panel.setPointerCapture(event.pointerId);
  const move = (e) => {
    const left = clamp(e.clientX - workspaceRect.left - offsetX, 0, workspace.clientWidth - panel.offsetWidth);
    const top = clamp(e.clientY - workspaceRect.top - offsetY, 0, workspace.clientHeight - panel.offsetHeight);
    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
    panel.style.right = "auto";
  };
  const stop = () => {
    panel.removeEventListener("pointermove", move);
    panel.removeEventListener("pointerup", stop);
    panel.removeEventListener("pointercancel", stop);
  };
  panel.addEventListener("pointermove", move);
  panel.addEventListener("pointerup", stop);
  panel.addEventListener("pointercancel", stop);
}

function startWindowResize(event) {
  if (window.innerWidth <= 800) return;
  event.stopPropagation();
  const panel = event.currentTarget.closest(".window-panel");
  if (!panel || !workspace) return;

  activateWindow(panel);
  const startWidth = panel.offsetWidth;
  const startHeight = panel.offsetHeight;
  const startX = event.clientX;
  const startY = event.clientY;

  panel.setPointerCapture(event.pointerId);
  const move = (e) => {
    const width = clamp(startWidth + (e.clientX - startX), 260, workspace.clientWidth - panel.offsetLeft);
    const height = clamp(startHeight + (e.clientY - startY), 200, workspace.clientHeight - panel.offsetTop);
    panel.style.width = `${width}px`;
    panel.style.height = `${height}px`;
    resizeCanvas();
    drawGraph(getTime());
  };
  const stop = () => {
    panel.removeEventListener("pointermove", move);
    panel.removeEventListener("pointerup", stop);
    panel.removeEventListener("pointercancel", stop);
  };
  panel.addEventListener("pointermove", move);
  panel.addEventListener("pointerup", stop);
  panel.addEventListener("pointercancel", stop);
}

function clamp(v, min, max) { return Math.min(Math.max(v, min), Math.max(min, max)); }

// ── UI helpers ─────────────────────────────────────────────────
function togglePause() {
  toggleSimulationPause();
  Controls.updatePauseButtonText();
}

function toggleTutorial() {
  const content = document.getElementById("tutorialContent");
  const icon = document.querySelector(".tutorial-icon");
  if (!content) return;
  const show = content.style.display !== "block";
  content.style.display = show ? "block" : "none";
  if (icon) icon.textContent = show ? "▲" : "▼";
}

function selectObjectAt(mx, my) {
  for (const obj of objects) {
    const { px, py } = mathToPixels(obj.x, obj.y, canvas);
    if (Math.hypot(mx - px, my - py) < Math.max(16, obj.size + 8)) return obj;
  }
  return null;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

// ── Canvas mouse ───────────────────────────────────────────────
canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const clicked = selectObjectAt(e.clientX - rect.left, e.clientY - rect.top);
  selected = clicked;
  dragging = clicked && !clicked.hasEquation ? clicked : null;
  if (selected) setGraphSelectionToObject(selected);
  updateInfoPanel();
  drawGraph(getTime());
});

canvas.addEventListener("mousemove", (e) => {
  if (!dragging) return;
  const rect = canvas.getBoundingClientRect();
  const pos = pixelsToMath(e.clientX - rect.left, e.clientY - rect.top, canvas);
  dragging.setInitialPosition(pos.x, pos.y);
  updateInfoPanel();
  updateObjectTables(getTime());
  drawGraph(getTime());
});

canvas.addEventListener("mouseup", () => { dragging = null; });
canvas.addEventListener("mouseleave", () => { dragging = null; });

// ── Main loop ──────────────────────────────────────────────────
function update() {
  const t = getTime();
  objects.forEach((obj) => { obj.update(t); obj.recordSample(t); });
  render(ctx, canvas, objects, getOptions());
  updateObjectTables(t);
  drawGraph(t);
  Controls.updateTimeLabel(t);
  requestAnimationFrame(update);
}

// ── Window globals (for inline handlers) ──────────────────────
window.addRandomObject = addRandomObject;
window.clearScene = clearScene;
window.togglePause = togglePause;
window.resetSimulationTime = resetSimulationTime;
window.setSpeed = setSpeed;
window.toggleTutorial = toggleTutorial;
window.closeModal = Modal.closeEquationModal;

// ── Init ───────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  Sidebar.initializeSidebar();
  Controls.initializeControls();
  Controls.updatePauseButtonText();
  Modal.initializeModal();
  initializeGraphControls();
  initializeWindowPanels();

  // Add object buttons (sidebar + empty state)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action='add-object']");
    if (btn) addRandomObject();
  });

  document.querySelector("[data-action='tutorial']")?.addEventListener("click", toggleTutorial);
  document.querySelector(".modal-close")?.addEventListener("click", Modal.closeEquationModal);
  document.getElementById("exportGraph")?.addEventListener("click", exportGraphPng);
  document.getElementById("exportAllCSV")?.addEventListener("click", exportAllCSV);

  // Scenario buttons
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-scenario]");
    if (!btn) return;
    const scenario = btn.dataset.scenario;
    if (scenario === "clear") clearScene();
    else loadScenario(scenario);
  });

  // Graph controls
  [
    "graphObjectA", "graphXA", "graphYA",
    "graphUseB", "graphObjectB", "graphXB", "graphYB",
    "graphTimeMin", "graphTimeMax"
  ].forEach((id) => {
    document.getElementById(id)?.addEventListener("input", () => drawGraph(getTime()));
    document.getElementById(id)?.addEventListener("change", () => drawGraph(getTime()));
  });

  // Info panel actions (edit / delete) + empty state add button
  document.getElementById("infoPanel")?.addEventListener("click", (e) => {
    const button = e.target.closest("[data-object-action]");
    if (!button) return;
    const obj = objects[Number(button.dataset.objectIndex)];
    if (!obj) return;
    selected = obj;
    setGraphSelectionToObject(obj);
    if (button.dataset.objectAction === "edit") editObjectEquations(obj);
    if (button.dataset.objectAction === "delete") deleteObject(obj);
    updateInfoPanel();
  });

  // Table CSV export buttons
  document.getElementById("objectTables")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-export-index]");
    if (btn) exportObjectCSV(Number(btn.dataset.exportIndex));
  });

  resizeCanvas();
  updateGraphObjectOptions();
  updateInfoPanel();
  updateObjectTables(0);
  drawGraph(0);
  update();
});

window.addEventListener("resize", resizeCanvas);
