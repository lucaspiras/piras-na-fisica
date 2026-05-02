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
const MAX_OBJECTS = 4;

const GRAPH_FIELDS = {
  t: { label: "t (s)", get: (p) => p.t },
  x: { label: "x (m)", get: (p) => p.x },
  y: { label: "y (m)", get: (p) => p.y },
  vx: { label: "vx (m/s)", get: (p) => p.vx },
  vy: { label: "vy (m/s)", get: (p) => p.vy },
  v: { label: "|v| (m/s)", get: (p) => p.speed },
  ax: { label: "ax (m/s²)", get: (p) => p.ax },
  ay: { label: "ay (m/s²)", get: (p) => p.ay },
  a: { label: "|a| (m/s²)", get: (p) => p.acceleration }
};
const GRAPH_COLORS = ["#2f5bea", "#fb923c"];

let objects = [];
let selected = null;
let dragging = null;
let topWindowZIndex = 10;
let resizeObserver = null;

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
  const width = body?.clientWidth || graphCanvas.parentElement?.clientWidth || 900;
  const height = Math.max(220, (body?.clientHeight || 360) - 160);
  graphCanvas.width = Math.max(320, width - 12);
  graphCanvas.height = height;
}

function getOptions() {
  return {
    showTrail: Sidebar.isTrailVisible(),
    showVelocity: Sidebar.isVelocityVisible(),
    showAcceleration: Sidebar.isAccelerationVisible(),
    selected
  };
}

function editObjectEquations(object) {
  Modal.openEquationModal(object, (target, eqXStr, eqYStr, systemConfig) => {
    try {
      if (systemConfig?.mode === "differential") {
        // Modo Equação Diferencial
        systemConfig.timeOffset = getTime();
        target.setEDOSystem(systemConfig);
      } else if (systemConfig?.mode === "direct") {
        target.setDirectSystem(systemConfig.equations, getTime());
      } else {
        // Modo Equação Direta
        const eqX = parseEquation(eqXStr);
        const eqY = parseEquation(eqYStr);
        target.setEquations(eqX, eqY, eqXStr, eqYStr, getTime());
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

  const obj = new Object2D({
    x: (Math.random() - 0.5) * 8,
    y: (Math.random() - 0.5) * 8,
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

function loadCircular() {
  clearScene();
  resetTime();
  const obj = new Object2D({
    x: 2,
    y: 0,
    eqX: parseEquation("2*cos(t)"),
    eqY: parseEquation("2*sin(t)"),
    eqXSource: "2*cos(t)",
    eqYSource: "2*sin(t)"
  });
  objects.push(obj);
  selected = obj;
  updateInfoPanel();
  updateGraphObjectOptions();
  updateObjectTables(getTime());
}

function loadProjectile() {
  clearScene();
  resetTime();
  const obj = new Object2D({
    x: 0,
    y: 4,
    eqX: parseEquation("3*t"),
    eqY: parseEquation("4 + 3*t - 5*t*t"),
    eqXSource: "3*t",
    eqYSource: "4 + 3*t - 5*t*t"
  });
  objects.push(obj);
  selected = obj;
  updateInfoPanel();
  updateGraphObjectOptions();
  updateObjectTables(getTime());
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

function updateInfoPanel() {
  const panel = document.getElementById("infoPanel");
  if (!panel) return;

  if (objects.length === 0) {
    panel.innerHTML = "<h3>Informações</h3><p>Clique em '+ Adicionar objeto' para começar.</p>";
    return;
  }

  let info = "<h3>Informações</h3>";
  info += `<p><small>Origem: centro do canvas. Escala: 1 unidade matemática = 1 m = ${getPixelsPerMeter()} px.</small></p>`;

  objects.forEach((obj, i) => {
    const status = obj.hasEquation ? "Com equação" : "Sem equação";
    const isSelected = obj === selected ? " selecionado" : "";
    const equationSummary = formatObjectEquations(obj);
    info += `<div class="object-info-card${isSelected}">`;
    info += `<strong>Objeto ${i + 1}</strong>`;
    info += `<p>Posição: (${obj.x.toFixed(2)} m, ${obj.y.toFixed(2)} m)</p>`;
    info += `<p>${equationSummary}</p>`;
    info += `<small>${status}</small>`;
    info += `<div class="object-actions">`;
    info += `<button type="button" data-object-index="${i}" data-object-action="edit">Editar</button>`;
    info += `<button type="button" class="danger" data-object-index="${i}" data-object-action="delete">Excluir</button>`;
    info += "</div></div>";
  });

  panel.innerHTML = info;
}

function formatObjectEquations(obj) {
  if (obj.edoSystem?.equations?.length) {
    const differentialEquations = obj.edoSystem.equations
      .map((eq) => `<code>d${escapeHtml(eq.variable)}/dt = ${escapeHtml(eq.expression)}</code>`)
      .join("<br>");
    const algebraicEquations = obj.edoSystem.algebraicEquations?.length
      ? "<br>" + obj.edoSystem.algebraicEquations
        .map((eq) => `<code>${escapeHtml(eq.variable)} = ${escapeHtml(eq.expression)}</code>`)
        .join("<br>")
      : "";
    return differentialEquations + algebraicEquations;
  }

  if (obj.directSystem?.length) {
    return obj.directSystem
      .map((eq) => `<code>${escapeHtml(eq.variable)}(t) = ${escapeHtml(eq.expression)}</code>`)
      .join("<br>");
  }

  const eqX = obj.eqXSource || "sem equação";
  const eqY = obj.eqYSource || "sem equação";
  return `<code>x(t) = ${escapeHtml(eqX)}</code><br><code>y(t) = ${escapeHtml(eqY)}</code>`;
}

function updateObjectTables(t) {
  const panel = document.getElementById("objectTables");
  if (!panel) return;

  if (objects.length === 0) {
    panel.innerHTML = "<h3>Tabelas dos objetos</h3><p>Adicione até 4 objetos para acompanhar tempo local e posição.</p>";
    return;
  }

  const tables = objects.map((obj, index) => {
    const localTime = obj.getLocalTime(t);
    const tableSamples = obj.samples.slice(-12);
    const rows = tableSamples.length === 0
      ? `<tr><td>${localTime.toFixed(2)}</td><td>${obj.x.toFixed(2)}</td><td>${obj.y.toFixed(2)}</td><td>${obj.velocityMagnitude.toFixed(2)}</td><td>${obj.accelerationMagnitude.toFixed(2)}</td></tr>`
      : tableSamples.map((sample) => (
        `<tr><td>${sample.t.toFixed(2)}</td><td>${sample.x.toFixed(2)}</td><td>${sample.y.toFixed(2)}</td><td>${sample.speed.toFixed(2)}</td><td>${sample.acceleration.toFixed(2)}</td></tr>`
      )).join("");

    return `
      <div class="object-table-card">
        <h4>Objeto ${index + 1}</h4>
        <table>
          <thead>
            <tr>
              <th>t local (s)</th>
              <th>x (m)</th>
              <th>y (m)</th>
              <th>|v| (m/s)</th>
              <th>|a| (m/s²)</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  }).join("");

  panel.innerHTML = `<h3>Tabelas dos objetos</h3><div class="object-table-grid">${tables}</div>`;
}

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
      : objects.map((_, index) => `<option value="${index}">Objeto ${index + 1}</option>`).join("");

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
  document.querySelectorAll(".window-panel").forEach((item) => item.classList.remove("active-window"));
  panel.classList.add("active-window");
  topWindowZIndex += 1;
  panel.style.zIndex = String(topWindowZIndex);
}

function startWindowDrag(event) {
  if (window.innerWidth <= 760) return;
  const panel = event.currentTarget.closest(".window-panel");
  if (!panel || !workspace) return;

  activateWindow(panel);
  const panelRect = panel.getBoundingClientRect();
  const workspaceRect = workspace.getBoundingClientRect();
  const startOffsetX = event.clientX - panelRect.left;
  const startOffsetY = event.clientY - panelRect.top;

  panel.setPointerCapture(event.pointerId);
  const move = (moveEvent) => {
    const left = clamp(moveEvent.clientX - workspaceRect.left - startOffsetX, 0, workspace.clientWidth - panel.offsetWidth);
    const top = clamp(moveEvent.clientY - workspaceRect.top - startOffsetY, 0, workspace.clientHeight - panel.offsetHeight);
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
  if (window.innerWidth <= 760) return;
  event.stopPropagation();
  const panel = event.currentTarget.closest(".window-panel");
  if (!panel || !workspace) return;

  activateWindow(panel);
  const startWidth = panel.offsetWidth;
  const startHeight = panel.offsetHeight;
  const startX = event.clientX;
  const startY = event.clientY;

  panel.setPointerCapture(event.pointerId);
  const move = (moveEvent) => {
    const width = clamp(startWidth + (moveEvent.clientX - startX), 260, workspace.clientWidth - panel.offsetLeft);
    const height = clamp(startHeight + (moveEvent.clientY - startY), 220, workspace.clientHeight - panel.offsetTop);
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

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), Math.max(min, max));
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
  if (value === undefined || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function getSeriesPoints(series, t, timeMin, timeMax) {
  if (!series.object) return [];
  const obj = series.object;
  const localTime = obj.getLocalTime(t);
  const samples = obj.samples.concat({
    t: localTime,
    x: obj.x,
    y: obj.y,
    vx: obj.vx,
    vy: obj.vy,
    ax: obj.ax,
    ay: obj.ay,
    speed: obj.velocityMagnitude,
    acceleration: obj.accelerationMagnitude
  });

  return samples
    .filter((sample) => timeMin === null || sample.t >= timeMin)
    .filter((sample) => timeMax === null || sample.t <= timeMax)
    .map((sample) => ({
      x: GRAPH_FIELDS[series.xKey].get(sample),
      y: GRAPH_FIELDS[series.yKey].get(sample),
      t: sample.t
    }))
    .filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y));
}

function drawGraph(t) {
  if (!graphCanvas || !graphCtx) return;
  graphCtx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
  graphCtx.fillStyle = "#ffffff";
  graphCtx.fillRect(0, 0, graphCanvas.width, graphCanvas.height);

  const config = getGraphConfig();
  const preparedSeries = config.series
    .filter((series) => series.enabled)
    .map((series) => ({
      ...series,
      points: getSeriesPoints(series, t, config.timeMin, config.timeMax)
    }))
    .filter((series) => series.points.length >= 2);

  if (preparedSeries.length === 0) {
    drawGraphMessage("Adicione objetos e aguarde amostras dentro do intervalo escolhido.");
    return;
  }

  drawGraphAxes(preparedSeries);
}

function drawGraphAxes(seriesList) {
  const padding = { left: 62, right: 22, top: 30, bottom: 52 };
  const plotWidth = graphCanvas.width - padding.left - padding.right;
  const plotHeight = graphCanvas.height - padding.top - padding.bottom;
  const allPoints = seriesList.flatMap((series) => series.points);
  const xTicks = getNiceTicks(Math.min(...allPoints.map((p) => p.x)), Math.max(...allPoints.map((p) => p.x)), 6);
  const yTicks = getNiceTicks(Math.min(...allPoints.map((p) => p.y)), Math.max(...allPoints.map((p) => p.y)), 6);
  const xRange = { min: xTicks[0], max: xTicks[xTicks.length - 1] };
  const yRange = { min: yTicks[0], max: yTicks[yTicks.length - 1] };
  const toPx = (point) => ({
    x: padding.left + ((point.x - xRange.min) / (xRange.max - xRange.min)) * plotWidth,
    y: padding.top + plotHeight - ((point.y - yRange.min) / (yRange.max - yRange.min)) * plotHeight
  });

  graphCtx.strokeStyle = "#d1d5db";
  graphCtx.lineWidth = 1;
  graphCtx.strokeRect(padding.left, padding.top, plotWidth, plotHeight);
  drawTicks(xTicks, yTicks, padding, plotWidth, plotHeight, xRange, yRange);

  seriesList.forEach((series) => {
    graphCtx.beginPath();
    series.points.forEach((point, index) => {
      const pixel = toPx(point);
      if (index === 0) graphCtx.moveTo(pixel.x, pixel.y);
      else graphCtx.lineTo(pixel.x, pixel.y);
    });
    graphCtx.strokeStyle = series.color;
    graphCtx.lineWidth = 2;
    graphCtx.stroke();
  });

  drawLegend(seriesList, padding);
}

function drawTicks(xTicks, yTicks, padding, plotWidth, plotHeight, xRange, yRange) {
  graphCtx.font = "12px Inter, sans-serif";
  graphCtx.fillStyle = "#4b5563";
  graphCtx.strokeStyle = "#eef2f7";
  graphCtx.lineWidth = 1;

  xTicks.forEach((tick) => {
    const x = padding.left + ((tick - xRange.min) / (xRange.max - xRange.min)) * plotWidth;
    graphCtx.beginPath();
    graphCtx.moveTo(x, padding.top);
    graphCtx.lineTo(x, padding.top + plotHeight);
    graphCtx.stroke();
    graphCtx.textAlign = "center";
    graphCtx.fillText(formatTick(tick), x, padding.top + plotHeight + 18);
  });

  yTicks.forEach((tick) => {
    const y = padding.top + plotHeight - ((tick - yRange.min) / (yRange.max - yRange.min)) * plotHeight;
    graphCtx.beginPath();
    graphCtx.moveTo(padding.left, y);
    graphCtx.lineTo(padding.left + plotWidth, y);
    graphCtx.stroke();
    graphCtx.textAlign = "right";
    graphCtx.fillText(formatTick(tick), padding.left - 8, y + 4);
  });

  graphCtx.fillStyle = "#374151";
  graphCtx.textAlign = "center";
  graphCtx.fillText(currentAxisLabel("x"), padding.left + plotWidth / 2, graphCanvas.height - 12);
  graphCtx.save();
  graphCtx.translate(16, padding.top + plotHeight / 2);
  graphCtx.rotate(-Math.PI / 2);
  graphCtx.fillText(currentAxisLabel("y"), 0, 0);
  graphCtx.restore();
}

function currentAxisLabel(axis) {
  const aKey = document.getElementById(axis === "x" ? "graphXA" : "graphYA")?.value || "t";
  const bEnabled = document.getElementById("graphUseB")?.checked || false;
  const bKey = document.getElementById(axis === "x" ? "graphXB" : "graphYB")?.value || aKey;
  if (bEnabled && aKey !== bKey) return axis.toUpperCase();
  return GRAPH_FIELDS[aKey].label;
}

function drawLegend(seriesList, padding) {
  let x = padding.left;
  const y = 18;
  seriesList.forEach((series) => {
    const objectIndex = objects.indexOf(series.object) + 1;
    const label = `${series.name}: Objeto ${objectIndex}, ${GRAPH_FIELDS[series.yKey].label} x ${GRAPH_FIELDS[series.xKey].label}`;
    graphCtx.fillStyle = series.color;
    graphCtx.fillRect(x, y - 9, 14, 3);
    graphCtx.fillStyle = "#374151";
    graphCtx.textAlign = "left";
    graphCtx.fillText(label, x + 20, y - 4);
    x += Math.min(330, graphCtx.measureText(label).width + 46);
  });
}

function drawGraphMessage(message) {
  graphCtx.fillStyle = "#6b7280";
  graphCtx.font = "14px Inter, sans-serif";
  graphCtx.textAlign = "center";
  graphCtx.fillText(message, graphCanvas.width / 2, graphCanvas.height / 2);
}

function getNiceTicks(min, max, targetCount = 6) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return [0, 1];
  if (Math.abs(max - min) < 1e-12) {
    const delta = Math.abs(max) < 1 ? 1 : Math.abs(max) * 0.2;
    min -= delta;
    max += delta;
  }

  const step = niceStep((max - min) / Math.max(1, targetCount - 1));
  const niceMin = Math.floor(min / step) * step;
  const niceMax = Math.ceil(max / step) * step;
  const ticks = [];
  for (let value = niceMin; value <= niceMax + step * 0.5; value += step) {
    ticks.push(roundTick(value));
  }
  return ticks.length >= 2 ? ticks : [niceMin, niceMin + step];
}

function niceStep(rawStep) {
  const exponent = Math.floor(Math.log10(rawStep));
  const fraction = rawStep / 10 ** exponent;
  const niceFraction = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 4 ? 4 : fraction <= 5 ? 5 : 10;
  return niceFraction * 10 ** exponent;
}

function roundTick(value) {
  return Number(value.toPrecision(12));
}

function formatTick(value) {
  if (Math.abs(value) < 1e-10) return "0";
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(6)));
}

function exportGraphPng() {
  if (!graphCanvas) return;
  drawGraph(getTime());
  const link = document.createElement("a");
  link.download = "grafico-movimento.png";
  link.href = graphCanvas.toDataURL("image/png");
  link.click();
}

function togglePause() {
  toggleSimulationPause();
  Controls.updatePauseButtonText();
}

function toggleTutorial() {
  const content = document.getElementById("tutorialContent");
  const icon = document.querySelector(".tutorial-icon");
  if (!content) return;

  const shouldShow = content.style.display !== "block";
  content.style.display = shouldShow ? "block" : "none";
  if (icon) icon.textContent = shouldShow ? "▲" : "▼";
}

function selectObjectAt(mx, my) {
  for (const obj of objects) {
    const { px, py } = mathToPixels(obj.x, obj.y, canvas);
    if (Math.hypot(mx - px, my - py) < Math.max(15, obj.size + 6)) {
      return obj;
    }
  }
  return null;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const clickedObject = selectObjectAt(e.clientX - rect.left, e.clientY - rect.top);
  selected = clickedObject;
  dragging = clickedObject && !clickedObject.hasEquation ? clickedObject : null;
  if (selected) setGraphSelectionToObject(selected);
  updateInfoPanel();
  drawGraph(getTime());
});

canvas.addEventListener("mousemove", (e) => {
  if (!dragging) return;
  const rect = canvas.getBoundingClientRect();
  const position = pixelsToMath(e.clientX - rect.left, e.clientY - rect.top, canvas);
  dragging.setInitialPosition(position.x, position.y);
  updateInfoPanel();
  updateObjectTables(getTime());
  drawGraph(getTime());
});

canvas.addEventListener("mouseup", () => {
  dragging = null;
});

canvas.addEventListener("mouseleave", () => {
  dragging = null;
});

function update() {
  const t = getTime();
  objects.forEach((obj) => {
    obj.update(t);
    obj.recordSample(t);
  });
  render(ctx, canvas, objects, getOptions());
  updateObjectTables(t);
  drawGraph(t);
  Controls.updateTimeLabel(t);
  requestAnimationFrame(update);
}

window.addRandomObject = addRandomObject;
window.clearScene = clearScene;
window.loadCircular = loadCircular;
window.loadProjectile = loadProjectile;
window.togglePause = togglePause;
window.resetSimulationTime = resetSimulationTime;
window.setSpeed = setSpeed;
window.toggleTutorial = toggleTutorial;
window.closeModal = Modal.closeEquationModal;

document.addEventListener("DOMContentLoaded", () => {
  Sidebar.initializeSidebar();
  Controls.initializeControls();
  Controls.updatePauseButtonText(); // Define texto inicial como "Retomar" (inicia pausado)
  Modal.initializeModal();
  initializeGraphControls();
  initializeWindowPanels();

  document.querySelector("[data-action='add-object']")?.addEventListener("click", addRandomObject);
  document.querySelector("[data-action='tutorial']")?.addEventListener("click", toggleTutorial);
  document.querySelector(".modal-close")?.addEventListener("click", Modal.closeEquationModal);
  document.getElementById("exportGraph")?.addEventListener("click", exportGraphPng);

  [
    "graphObjectA", "graphXA", "graphYA",
    "graphUseB", "graphObjectB", "graphXB", "graphYB",
    "graphTimeMin", "graphTimeMax"
  ].forEach((id) => {
    document.getElementById(id)?.addEventListener("input", () => drawGraph(getTime()));
    document.getElementById(id)?.addEventListener("change", () => drawGraph(getTime()));
  });

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

  resizeCanvas();
  updateGraphObjectOptions();
  updateInfoPanel();
  updateObjectTables(0);
  drawGraph(0);
  update();
});

window.addEventListener("resize", resizeCanvas);
