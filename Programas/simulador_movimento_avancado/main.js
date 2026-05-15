import { parseEquation } from './engine/mathparser.js';
import Object2D from './engine/object2D.js';
import { getTime, resetTime, togglePause as toggleSimulationPause, setSpeed } from './engine/time.js';
import { render, pixelsToMath, mathToPixels, getPixelsPerMeter, setMetersPerUnit, getMetersPerUnit } from './engine/renderer.js';
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

const TABLE_STANDARD_COLUMNS = [
  { key: 't',            label: 't (s)' },
  { key: 'x',            label: 'x (m)' },
  { key: 'y',            label: 'y (m)' },
  { key: 'vx',           label: 'vx (m/s)' },
  { key: 'vy',           label: 'vy (m/s)' },
  { key: 'speed',        label: '|v| (m/s)' },
  { key: 'acceleration', label: '|a| (m/s²)' },
  { key: 'ax',           label: 'ax (m/s²)' },
  { key: 'ay',           label: 'ay (m/s²)' },
];
const DEFAULT_TABLE_COLUMNS = new Set(['t', 'x', 'y', 'vx', 'vy', 'speed', 'acceleration']);
let activeTableColumns = new Set([...DEFAULT_TABLE_COLUMNS]);

// Returns GRAPH_FIELDS extended with user-defined variables from the given object
function getObjectFields(obj) {
  const fields = { ...GRAPH_FIELDS };
  if (!obj) return fields;
  obj.getUserVarNames().forEach(name => {
    if (!fields[name]) {
      fields[name] = { label: name, get: (s) => s.userVars?.[name] ?? null };
    }
  });
  return fields;
}

// ── Zoom / scale ──────────────────────────────────────────────
// Each entry: [metersPerGridUnit, displayLabel]
const SCALE_LEVELS = [
  [0.1,      "0,1 m"],
  [0.5,      "0,5 m"],
  [1,        "1 m"],        // default index 2
  [5,        "5 m"],
  [10,       "10 m"],
  [50,       "50 m"],
  [100,      "100 m"],
  [500,      "500 m"],
  [1000,     "1 km"],
  [5000,     "5 km"],
  [10000,    "10 km"],
  [50000,    "50 km"],
  [100000,   "100 km"],
  [500000,   "500 km"],
  [1e6,      "1.000 km"],
  [1e7,      "10.000 km"],
  [1.496e11, "1 UA"],
];
let currentScaleIndex = 2;

function zoomIn() {
  if (currentScaleIndex > 0) {
    currentScaleIndex--;
    applyScale();
  }
}

function zoomOut() {
  if (currentScaleIndex < SCALE_LEVELS.length - 1) {
    currentScaleIndex++;
    applyScale();
  }
}

function applyScale() {
  const [mpu, label] = SCALE_LEVELS[currentScaleIndex];
  setMetersPerUnit(mpu);
  const zoomLabel = document.getElementById("zoomLabel");
  if (zoomLabel) zoomLabel.textContent = `${label}/div`;
  const zoomInBtn = document.querySelector("[data-action='zoom-in']");
  const zoomOutBtn = document.querySelector("[data-action='zoom-out']");
  if (zoomInBtn) zoomInBtn.disabled = currentScaleIndex === 0;
  if (zoomOutBtn) zoomOutBtn.disabled = currentScaleIndex === SCALE_LEVELS.length - 1;
}

// ── Whiteboard equation presets ───────────────────────────────
const WHITEBOARD_PRESETS = {
  circular:   "x(t) = 2*cos(t)\ny(t) = 2*sin(t)",
  projectile: "x(t) = 4*t\ny(t) = 5 + 3*t - 4.9*t*t",
  ellipse:    "x(t) = 3*cos(t)\ny(t) = 2*sin(t)",
  lissajous:  "x(t) = 3*cos(3*t)\ny(t) = 2*sin(4*t)",
  spiral:     "x(t) = 0.4*t*cos(t)\ny(t) = 0.4*t*sin(t)",
  freeFall:   "x(t) = 0\ny(t) = 8 - 4.9*t*t",
  pendulum:   "d(theta)/dt = omega\nd(omega)/dt = -(9.8/L)*sin(theta)\nx = L*sin(theta) + pivotX\ny = -L*cos(theta) + pivotY\ntheta(0) = 0.8\nomega(0) = 0\nL = 2\npivotX = 0\npivotY = 0",
};

// ── Whiteboard parsing ────────────────────────────────────────
function parseWhiteboardEquations(text) {
  const lines = text.split('\n');
  const direct = [];
  const differential = [];
  const algebraic = [];
  const initialValues = {};
  const constants = {};

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('//') || line.startsWith('#')) continue;

    let m;

    // Initial condition: var(0) = number
    m = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\(0\)\s*=\s*(.+)$/);
    if (m) {
      const val = parseFloat(m[2].trim());
      if (Number.isFinite(val)) { initialValues[m[1]] = val; continue; }
    }

    // Differential: d(var)/dt = expr  or  dvar/dt = expr
    m = line.match(/^d\(?([a-zA-Z_][a-zA-Z0-9_]*)\)?\/dt\s*=\s*(.+)$/);
    if (m) { differential.push({ variable: m[1], expression: m[2].trim() }); continue; }

    // Direct: var(t) = expr
    m = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\(t\)\s*=\s*(.+)$/);
    if (m) { direct.push({ variable: m[1], expression: m[2].trim() }); continue; }

    // var = number_or_expression
    m = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+)$/);
    if (m) {
      const varName = m[1];
      const expr = m[2].trim();
      const numVal = Number(expr);
      const isPureNumber = Number.isFinite(numVal) && /^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(expr);
      if (varName === 'x' || varName === 'y') {
        // Position variables always go to algebraic, even when the value is a constant
        algebraic.push({ variable: varName, expression: expr });
      } else if (isPureNumber) {
        constants[varName] = numVal;
      } else {
        algebraic.push({ variable: varName, expression: expr });
      }
      continue;
    }
  }

  if (differential.length > 0) {
    return { mode: 'differential', equations: differential, algebraicEquations: algebraic, initialValues, constants };
  }
  if (direct.length > 0) {
    return { mode: 'direct', equations: direct, constants };
  }
  // Fallback: treat plain var = expr as direct equations (user wrote without (t))
  if (algebraic.length > 0) {
    return { mode: 'direct', equations: algebraic, constants };
  }
  return null;
}

function formatEquationsForWhiteboard(obj) {
  const lines = [];
  if (obj.edoSystem?.equations?.length) {
    obj.edoSystem.equations.forEach(eq => lines.push(`d(${eq.variable})/dt = ${eq.expression}`));
    obj.edoSystem.algebraicEquations?.forEach(eq => lines.push(`${eq.variable} = ${eq.expression}`));
    const knownVars = new Set([
      ...obj.edoSystem.equations.map(eq => eq.variable),
      ...(obj.edoSystem.algebraicEquations || []).map(eq => eq.variable),
    ]);
    Object.entries(obj.edoSystem.constants || {}).forEach(([k, v]) => {
      if (!knownVars.has(k)) lines.push(`${k} = ${v}`);
    });
    Object.entries(obj.edoSystem.initialValues || {}).forEach(([k, v]) => {
      lines.push(`${k}(0) = ${v}`);
    });
  } else if (obj.directSystem?.length) {
    Object.entries(obj.directConstants || {}).forEach(([k, v]) => lines.push(`${k} = ${v}`));
    obj.directSystem.forEach(eq => lines.push(`${eq.variable}(t) = ${eq.expression}`));
  } else if (obj.eqXSource || obj.eqYSource) {
    if (obj.eqXSource) lines.push(`x(t) = ${obj.eqXSource}`);
    if (obj.eqYSource) lines.push(`y(t) = ${obj.eqYSource}`);
  }
  return lines.join('\n');
}

function applyWhiteboardEquations(obj, text, card) {
  try {
    const parsed = parseWhiteboardEquations(text);
    if (!parsed) return { success: false, message: "Nenhuma equação válida encontrada." };

    // Merge constants: whiteboard-defined values overridden by UI constant inputs
    const inputConstants = {};
    card?.querySelectorAll('.constant-input').forEach(inp => {
      const v = parseFloat(inp.value);
      if (inp.dataset.constVar && Number.isFinite(v)) inputConstants[inp.dataset.constVar] = v;
    });
    const mergedConstants = { ...(parsed.constants || {}), ...inputConstants };

    if (parsed.mode === 'differential') {
      // Initial condition inputs take priority over values written in whiteboard text
      card?.querySelectorAll('.condition-input').forEach(inp => {
        const v = parseFloat(inp.value);
        if (inp.dataset.condVar && Number.isFinite(v)) parsed.initialValues[inp.dataset.condVar] = v;
      });
      // Default x=0 and y=0 when not defined instead of rejecting the system
      const hasX = parsed.equations.some(eq => eq.variable === 'x') ||
                   parsed.algebraicEquations?.some(eq => eq.variable === 'x');
      const hasY = parsed.equations.some(eq => eq.variable === 'y') ||
                   parsed.algebraicEquations?.some(eq => eq.variable === 'y');
      if (!hasX) (parsed.algebraicEquations = parsed.algebraicEquations || []).push({ variable: 'x', expression: '0' });
      if (!hasY) (parsed.algebraicEquations = parsed.algebraicEquations || []).push({ variable: 'y', expression: '0' });
      parsed.timeOffset = getTime();
      parsed.constants = mergedConstants;
      obj.setEDOSystem(parsed);
    } else {
      // Default x=0 and y=0 when not defined
      const hasX = parsed.equations.some(eq => eq.variable === 'x');
      const hasY = parsed.equations.some(eq => eq.variable === 'y');
      if (!hasX) parsed.equations.push({ variable: 'x', expression: '0' });
      if (!hasY) parsed.equations.push({ variable: 'y', expression: '0' });
      obj.setDirectSystem(parsed.equations, getTime(), mergedConstants);
    }

    updateObjectTables(getTime());
    drawGraph(getTime());
    updateGraphAxisOptions('A', getGraphObject('graphObjectA'));
    updateGraphAxisOptions('B', getGraphObject('graphObjectB'));
    updateTableColumnsEditor();
    return { success: true };
  } catch (e) {
    return { success: false, message: e.message };
  }
}

function insertAtCursorInTextarea(textarea, text) {
  const start = textarea.selectionStart ?? textarea.value.length;
  const end = textarea.selectionEnd ?? textarea.value.length;
  textarea.value = textarea.value.substring(0, start) + text + textarea.value.substring(end);
  const cursor = start + text.length;
  textarea.setSelectionRange(cursor, cursor);
  textarea.focus();
}

function showWhiteboardStatus(card, result) {
  const status = card?.querySelector(".whiteboard-status");
  if (!status) return;
  status.textContent = result.success ? "✓ Aplicado" : `⚠ ${result.message}`;
  status.className = `whiteboard-status ${result.success ? "status-ok" : "status-error"}`;
  if (result.success) {
    setTimeout(() => { status.textContent = ""; status.className = "whiteboard-status"; }, 3000);
  }
}

// Names that are never user constants (builtins + loop var t + position outputs)
const BUILTIN_NAMES = new Set([
  'sin', 'sen', 'cos', 'tan', 'asin', 'acos', 'atan', 'atan2',
  'sqrt', 'exp', 'log', 'ln', 'abs', 'pow', 'max', 'min',
  'floor', 'ceil', 'round', 'sign', 't', 'pi', 'e', 'x', 'y'
]);

function extractIdentifiers(expr) {
  const ids = new Set();
  const re = /[a-zA-Z_][a-zA-Z0-9_]*/g;
  let m;
  while ((m = re.exec(expr)) !== null) ids.add(m[0]);
  return ids;
}

function detectEDOVariables(text) {
  const vars = [];
  const seen = new Set();
  for (const rawLine of text.split('\n')) {
    const m = rawLine.trim().match(/^d\(?([a-zA-Z_][a-zA-Z0-9_]*)\)?\/dt\s*=/);
    if (m && !seen.has(m[1])) { seen.add(m[1]); vars.push(m[1]); }
  }
  return vars;
}

function getTextInitialValues(text) {
  const vals = {};
  for (const rawLine of text.split('\n')) {
    const m = rawLine.trim().match(/^([a-zA-Z_][a-zA-Z0-9_]*)\(0\)\s*=\s*(.+)$/);
    if (m) { const v = parseFloat(m[2].trim()); if (Number.isFinite(v)) vals[m[1]] = v; }
  }
  return vals;
}

function detectUserConstants(text) {
  // All names that are not user constants
  const excluded = new Set([...BUILTIN_NAMES, ...detectEDOVariables(text)]);
  const usedInRhs = new Set();
  const explicitValues = {}; // var = number definitions

  for (const rawLine of text.split('\n')) {
    const line = rawLine.trim();
    if (!line || line.startsWith('//') || line.startsWith('#')) continue;
    let m;
    if (/^([a-zA-Z_][a-zA-Z0-9_]*)\(0\)\s*=/.test(line)) continue; // initial conditions

    m = line.match(/^d\(?([a-zA-Z_][a-zA-Z0-9_]*)\)?\/dt\s*=\s*(.+)$/);
    if (m) { extractIdentifiers(m[2]).forEach(id => usedInRhs.add(id)); continue; }

    m = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\(t\)\s*=\s*(.+)$/);
    if (m) { excluded.add(m[1]); extractIdentifiers(m[2]).forEach(id => usedInRhs.add(id)); continue; }

    m = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+)$/);
    if (m) {
      const varName = m[1], expr = m[2].trim();
      const numVal = parseFloat(expr);
      const isPure = Number.isFinite(numVal) && /^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(expr);
      if (varName === 'x' || varName === 'y') {
        extractIdentifiers(expr).forEach(id => usedInRhs.add(id));
      } else if (isPure) {
        explicitValues[varName] = numVal; // explicitly defined constant
      } else {
        excluded.add(varName); // algebraic output — not a constant
        extractIdentifiers(expr).forEach(id => usedInRhs.add(id));
      }
    }
  }

  // Gather: identifiers used in RHS that aren't excluded + explicitly defined constants
  const seen = new Set();
  const result = [];
  // Explicit constants first (so they appear at top)
  for (const [name, value] of Object.entries(explicitValues)) {
    if (!excluded.has(name) && !seen.has(name)) { result.push({ name, defaultValue: value }); seen.add(name); }
  }
  // Then implicit (used but undefined) constants
  for (const id of usedInRhs) {
    if (!excluded.has(id) && !seen.has(id) && !explicitValues[id]) {
      result.push({ name: id, defaultValue: null }); seen.add(id);
    }
  }
  return result;
}

function updateConditionsSection(card, text) {
  const section = card?.querySelector('.whiteboard-conditions');
  if (!section) return;

  const edoVars = detectEDOVariables(text);
  const userConsts = detectUserConstants(text);

  if (edoVars.length === 0 && userConsts.length === 0) { section.style.display = 'none'; return; }

  // Preserve existing input values before rebuilding
  const savedConds = {};
  section.querySelectorAll('.condition-input').forEach(inp => {
    if (inp.dataset.condVar && inp.value !== '') savedConds[inp.dataset.condVar] = inp.value;
  });
  const savedConsts = {};
  section.querySelectorAll('.constant-input').forEach(inp => {
    if (inp.dataset.constVar && inp.value !== '') savedConsts[inp.dataset.constVar] = inp.value;
  });
  const textInitVals = getTextInitialValues(text);

  let html = '';
  if (edoVars.length > 0) {
    html += `<div class="conditions-subblock"><div class="conditions-header">Condições iniciais (t = 0)</div><div class="conditions-grid">${
      edoVars.map(v => {
        const val = savedConds[v] ?? (textInitVals[v] !== undefined ? String(textInitVals[v]) : '');
        return `<label class="condition-label"><span class="condition-var">${escapeHtml(v)}(0) =</span><input type="number" step="any" class="condition-input" data-cond-var="${escapeHtml(v)}" value="${escapeHtml(val)}"></label>`;
      }).join('')
    }</div></div>`;
  }
  if (userConsts.length > 0) {
    html += `<div class="conditions-subblock"><div class="conditions-header">Constantes</div><div class="conditions-grid">${
      userConsts.map(({ name, defaultValue }) => {
        const val = savedConsts[name] ?? (defaultValue !== null ? String(defaultValue) : '');
        return `<label class="condition-label"><span class="condition-var">${escapeHtml(name)} =</span><input type="number" step="any" class="constant-input" data-const-var="${escapeHtml(name)}" value="${escapeHtml(val)}" placeholder="0"></label>`;
      }).join('')
    }</div></div>`;
  }
  section.style.display = 'block';
  section.innerHTML = html;
}

// ── Canvas resize ──────────────────────────────────────────────
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
function editObjectAppearance(object) {
  Modal.openAppearanceModal(object, () => {
    updateInfoPanel();
    updateObjectTables(getTime());
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
  updateTableColumnsEditor();
}

function clearScene() {
  objects = [];
  selected = null;
  updateInfoPanel();
  updateGraphObjectOptions();
  updateObjectTables(0);
  drawGraph(0);
  updateTableColumnsEditor();
}

// ── Pre-built scenarios ────────────────────────────────────────
function loadScenario(name) {
  const scenarios = {
    circular: () => [makeObj(0, { eqX: "2*cos(t)", eqY: "2*sin(t)", shape: "circle", label: "MCU" })],
    projectile: () => [makeObj(1, { eqX: "4*t", eqY: "5 + 3*t - 4.9*t*t", shape: "soccer", label: "Projétil" })],
    ellipse: () => [makeObj(2, { eqX: "3*cos(t)", eqY: "2*sin(t)", shape: "satellite", label: "Órbita" })],
    pendulum: () => [makePendulumObj()],
    lissajous: () => [makeObj(0, { eqX: "3*cos(3*t)", eqY: "2*sin(4*t)", shape: "circle", label: "Lissajous" })],
    spiral: () => [makeObj(3, { eqX: "0.4*t*cos(t)", eqY: "0.4*t*sin(t)", shape: "rocket", label: "Espiral" })],
    freeFall: () => [makeObj(4, { eqX: "0", eqY: "8 - 4.9*t*t", shape: "soccer", label: "Queda livre" })],
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
  updateTableColumnsEditor();
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
      { variable: "omega", expression: "-(9.8/L)*sin(theta)" }
    ],
    algebraicEquations: [
      { variable: "x", expression: "L*sin(theta) + pivotX" },
      { variable: "y", expression: "-L*cos(theta) + pivotY" }
    ],
    constants: { L: 2, pivotX: 0, pivotY: 0 },
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
  updateTableColumnsEditor();
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

function buildObjectCard(obj, i) {
  const isSelected = obj === selected;
  const shapeLabel = SHAPE_LABELS[obj.shape] || obj.shape;
  const displayName = obj.label ? obj.label : `Objeto ${i + 1}`;
  const equations = formatEquationsForWhiteboard(obj);
  const ec = 0.5 * obj.mass * obj.velocityMagnitude ** 2;
  const kineHidden = obj._kineHidden !== false; // default true (hidden)
  const cardMin = obj._cardMinimized || false;

  const classes = [
    "object-info-card",
    isSelected ? "selecionado" : "",
    kineHidden ? "kine-hidden" : "",
    cardMin ? "card-minimized" : ""
  ].filter(Boolean).join(" ");

  const PALETTE_BTNS = [
    ["sin(", "sin"], ["cos(", "cos"], ["tan(", "tan"], ["sqrt(", "√"],
    ["exp(", "eˣ"], ["log(", "ln"], ["abs(", "|x|"], ["pi", "π"],
    ["**2", "x²"], ["t", "t"]
  ].map(([ins, lbl]) =>
    `<button type="button" class="wb-palette-btn" data-wb-insert="${escapeHtml(ins)}">${escapeHtml(lbl)}</button>`
  ).join("") + `<button type="button" class="wb-palette-btn wb-palette-btn--deriv" data-wb-template="derivative" title="Inserir d(var)/dt = ">d/dt</button>`;

  const PRESET_BTNS = [
    ["circular", "MCU"], ["projectile", "Projétil"], ["ellipse", "Elipse"],
    ["pendulum", "Pêndulo"], ["lissajous", "Lissajous"], ["spiral", "Espiral"], ["freeFall", "Queda livre"]
  ].map(([key, lbl]) =>
    `<button type="button" class="wb-preset-btn" data-wb-preset="${key}">${escapeHtml(lbl)}</button>`
  ).join("");

  const wbPlaceholder = [
    "// Equação direta:",
    "x(t) = 2*cos(t)",
    "y(t) = 2*sin(t)",
    "// ou EDO:",
    "d(theta)/dt = omega",
    "d(omega)/dt = -(9.8/2)*sin(theta)",
    "x = 2*sin(theta)",
    "y = -2*cos(theta)",
    "theta(0) = 0.8"
  ].join("&#10;");

  return `
    <div class="${classes}" data-object-id="${escapeHtml(obj.id)}">
      <div class="object-info-header">
        <button type="button" class="card-toggle-btn" data-object-index="${i}" data-object-action="toggle-card" title="${cardMin ? "Expandir" : "Minimizar"} card"></button>
        <div class="object-info-title">
          <span class="obj-color-dot" style="background:${escapeHtml(obj.color)}"></span>
          ${escapeHtml(displayName)}
          <span class="object-shape-badge">${escapeHtml(shapeLabel)}</span>
        </div>
        <div class="object-header-btns">
          <button type="button" class="kine-toggle-btn" data-object-index="${i}" data-object-action="toggle-kine" title="Mostrar/ocultar valores cinemáticos">≡</button>
          <button type="button" data-object-index="${i}" data-object-action="appearance" title="Editar aparência">✎</button>
          <button type="button" class="danger" data-object-index="${i}" data-object-action="delete" title="Excluir">×</button>
        </div>
      </div>

      <div class="card-body">
        <div class="kinematic-section">
          <div class="kinematic-grid">
            <div class="kinematic-item">
              <span class="k-label">x</span>
              <span class="k-value" data-kv="x">${obj.x.toFixed(3)} m</span>
            </div>
            <div class="kinematic-item">
              <span class="k-label">y</span>
              <span class="k-value" data-kv="y">${obj.y.toFixed(3)} m</span>
            </div>
            <div class="kinematic-item">
              <span class="k-label">vx</span>
              <span class="k-value velocity" data-kv="vx">${obj.vx.toFixed(3)} m/s</span>
            </div>
            <div class="kinematic-item">
              <span class="k-label">vy</span>
              <span class="k-value velocity" data-kv="vy">${obj.vy.toFixed(3)} m/s</span>
            </div>
            <div class="kinematic-item">
              <span class="k-label">|v|</span>
              <span class="k-value velocity" data-kv="v">${obj.velocityMagnitude.toFixed(3)} m/s</span>
            </div>
            <div class="kinematic-item">
              <span class="k-label">|a|</span>
              <span class="k-value acceleration" data-kv="a">${obj.accelerationMagnitude.toFixed(3)} m/s²</span>
            </div>
          </div>
          <div class="ec-row" data-kv="ec">EC = ${ec.toFixed(3)} J &nbsp;|&nbsp; m = ${obj.mass.toFixed(2)} kg</div>
        </div>

        <div class="whiteboard-section">
          <div class="whiteboard-presets">
            <span class="wb-label">Carregar:</span>
            ${PRESET_BTNS}
          </div>
          <textarea
            class="whiteboard-textarea"
            data-object-id="${escapeHtml(obj.id)}"
            placeholder="${wbPlaceholder}"
            spellcheck="false"
            autocomplete="off"
            autocorrect="off"
            rows="6"
          >${escapeHtml(equations)}</textarea>
          <div class="whiteboard-palette">${PALETTE_BTNS}</div>
          <div class="whiteboard-footer">
            <button class="whiteboard-apply-btn" type="button" data-object-index="${i}" data-object-action="apply-equations">Aplicar</button>
            <span class="whiteboard-status"></span>
          </div>
          <div class="whiteboard-conditions" style="display:none;"></div>
        </div>
      </div>
    </div>`;
}

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

  // Smart rebuild: only rebuild if the set/order of objects changed
  const existingCards = panel.querySelectorAll(".object-info-card");
  const existingIds = Array.from(existingCards).map(c => c.dataset.objectId);
  const currentIds = objects.map(o => o.id);
  const needsRebuild = existingIds.length !== currentIds.length ||
    existingIds.some((id, i) => id !== currentIds[i]);

  if (needsRebuild) {
    panel.innerHTML = objects.map((obj, i) => buildObjectCard(obj, i)).join("");
    objects.forEach(obj => {
      const card = panel.querySelector(`[data-object-id="${obj.id}"]`);
      const textarea = card?.querySelector('.whiteboard-textarea');
      if (card && textarea) updateConditionsSection(card, textarea.value);
    });
  }

  // Always update selection highlight
  objects.forEach((obj) => {
    const card = panel.querySelector(`[data-object-id="${obj.id}"]`);
    card?.classList.toggle("selecionado", obj === selected);
  });
}

let _lastKvUpdate = 0;

function updateKinematicsLive() {
  const now = performance.now();
  if (now - _lastKvUpdate < 80) return;
  _lastKvUpdate = now;

  const panel = document.getElementById("infoPanel");
  if (!panel || objects.length === 0) return;

  objects.forEach(obj => {
    const card = panel.querySelector(`[data-object-id="${obj.id}"]`);
    if (!card) return;

    const ec = 0.5 * obj.mass * obj.velocityMagnitude ** 2;
    const kvs = {
      x:  `${obj.x.toFixed(3)} m`,
      y:  `${obj.y.toFixed(3)} m`,
      vx: `${obj.vx.toFixed(3)} m/s`,
      vy: `${obj.vy.toFixed(3)} m/s`,
      v:  `${obj.velocityMagnitude.toFixed(3)} m/s`,
      a:  `${obj.accelerationMagnitude.toFixed(3)} m/s²`,
    };
    Object.entries(kvs).forEach(([key, val]) => {
      const el = card.querySelector(`[data-kv="${key}"]`);
      if (el && el.textContent !== val) el.textContent = val;
    });
    const ecEl = card.querySelector('[data-kv="ec"]');
    const ecText = `EC = ${ec.toFixed(3)} J | m = ${obj.mass.toFixed(2)} kg`;
    if (ecEl && ecEl.textContent !== ecText) ecEl.textContent = ecText;
  });
}

// ── Object tables ──────────────────────────────────────────────
function updateTableColumnsEditor() {
  const container = document.getElementById('tableColumnsConfig');
  if (!container) return;

  const userVarSet = new Set();
  objects.forEach(obj => obj.getUserVarNames().forEach(v => userVarSet.add(v)));
  const allCols = [
    ...TABLE_STANDARD_COLUMNS,
    ...[...userVarSet].map(v => ({ key: v, label: v, isUser: true }))
  ];

  const activeCols   = allCols.filter(col =>  activeTableColumns.has(col.key));
  const availableCols = allCols.filter(col => !activeTableColumns.has(col.key));

  const tagsHtml = activeCols.length === 0
    ? '<span class="table-col-empty">Nenhuma coluna ativa</span>'
    : activeCols.map(col => {
        const badge = col.isUser ? ' <span class="col-user-badge">var</span>' : '';
        return `<span class="table-col-tag">
          ${escapeHtml(col.label)}${badge}
          <button type="button" class="table-col-remove" data-remove-col="${escapeHtml(col.key)}" title="Remover coluna">×</button>
        </span>`;
      }).join('');

  const addSelectHtml = availableCols.length === 0 ? '' : `
    <select id="tableAddCol" class="table-col-add-select">
      <option value="">+ Adicionar coluna...</option>
      ${availableCols.map(col => `<option value="${escapeHtml(col.key)}">${escapeHtml(col.label)}${col.isUser ? ' (var)' : ''}</option>`).join('')}
    </select>`;

  container.innerHTML = `<div class="table-col-tags">${tagsHtml}</div>${addSelectHtml}`;
}

function updateObjectTables(t) {
  const panel = document.getElementById("objectTables");
  if (!panel) return;

  if (objects.length === 0) {
    panel.innerHTML = '<p class="empty-state-text">Adicione até 6 objetos para acompanhar as grandezas cinemáticas.</p>';
    return;
  }

  // Build full column list: standard + all user vars across all objects
  const allUserVarSet = new Set();
  objects.forEach(obj => obj.getUserVarNames().forEach(v => allUserVarSet.add(v)));
  const allColDefs = [
    ...TABLE_STANDARD_COLUMNS,
    ...[...allUserVarSet].map(v => ({ key: v, label: v, isUser: true }))
  ];
  const visibleCols = allColDefs.filter(col => activeTableColumns.has(col.key));

  const getSampleVal = (s, key) => {
    if (key in s && s[key] !== undefined) return s[key];
    if (s.userVars && key in s.userVars) return s.userVars[key];
    return null;
  };

  panel.innerHTML = objects.map((obj, index) => {
    const localTime = obj.getLocalTime(t);

    // Current snapshot with user vars
    const currentUserVars = {};
    if (obj.edoSolver && obj.edoSystem) {
      const state = obj.edoSolver.getState();
      obj.getUserVarNames().forEach(v => { if (v in state) currentUserVars[v] = state[v]; });
    }
    const currentSnapshot = {
      t: localTime, x: obj.x, y: obj.y,
      vx: obj.vx, vy: obj.vy, ax: obj.ax, ay: obj.ay,
      speed: obj.velocityMagnitude, acceleration: obj.accelerationMagnitude,
      userVars: currentUserVars
    };

    const tableSamples = obj.samples.slice(-16);
    const sampleList = tableSamples.length === 0 ? [currentSnapshot] : tableSamples;

    const rows = sampleList.map(s =>
      `<tr>${visibleCols.map(col => {
        const val = getSampleVal(s, col.key);
        const fmt = (val !== null && val !== undefined && Number.isFinite(val))
          ? val.toFixed(col.key === 't' ? 2 : 3)
          : '—';
        return `<td>${fmt}</td>`;
      }).join('')}</tr>`
    ).join('');

    const displayName = obj.label ? escapeHtml(obj.label) : `Objeto ${index + 1}`;

    return `
      <div class="object-table-card">
        <div class="object-table-header">
          <h4><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${escapeHtml(obj.color)};margin-right:6px;vertical-align:middle"></span>${displayName}</h4>
          <button class="btn-csv" type="button" data-export-index="${index}">⬇ CSV</button>
        </div>
        <table>
          <thead><tr>${visibleCols.map(col => `<th>${escapeHtml(col.label)}</th>`).join('')}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  }).join('');
}

function exportObjectCSV(index) {
  const obj = objects[index];
  if (!obj) return;

  const objUserCols = obj.getUserVarNames().map(v => ({ key: v, label: v }));
  const allColDefs = [...TABLE_STANDARD_COLUMNS, ...objUserCols];
  const visibleCols = allColDefs.filter(col => activeTableColumns.has(col.key));

  const getSampleVal = (s, key) => {
    if (key in s && s[key] !== undefined) return s[key];
    if (s.userVars && key in s.userVars) return s.userVars[key];
    return null;
  };

  const header = visibleCols.map(col => col.label).join(',');
  const rows = obj.samples.map(s =>
    visibleCols.map(col => {
      const val = getSampleVal(s, col.key);
      return (val !== null && Number.isFinite(val)) ? val.toFixed(6) : '';
    }).join(',')
  );
  const csv = [header, ...rows].join('\n');
  const name = obj.label ? obj.label.replace(/\s+/g, '_') : `objeto_${index + 1}`;
  downloadText(`tabela_${name}.csv`, csv, 'text/csv');
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
function updateGraphAxisOptions(letter, obj) {
  const xSel = document.getElementById(`graphX${letter}`);
  const ySel = document.getElementById(`graphY${letter}`);
  if (!xSel || !ySel) return;

  const fields = getObjectFields(obj);
  const xPrev = xSel.value;
  const yPrev = ySel.value;

  const optHtml = Object.entries(fields)
    .map(([val, f]) => `<option value="${escapeHtml(val)}">${escapeHtml(f.label)}</option>`)
    .join('');
  xSel.innerHTML = optHtml;
  ySel.innerHTML = optHtml;

  xSel.value = fields[xPrev] ? xPrev : 't';
  ySel.value = fields[yPrev] ? yPrev : (letter === 'A' ? 'x' : 'y');
}

function initializeGraphControls() {
  updateGraphAxisOptions('A', null);
  updateGraphAxisOptions('B', null);
  document.getElementById("graphXA").value = "t";
  document.getElementById("graphYA").value = "x";
  document.getElementById("graphXB").value = "t";
  document.getElementById("graphYB").value = "y";
}

function updateGraphObjectOptions() {
  ["A", "B"].forEach(letter => {
    const id = `graphObject${letter}`;
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
    updateGraphAxisOptions(letter, objects[Number(select.value)] || null);
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

  // Snapshot of current user var values
  const currentUserVars = {};
  if (obj.edoSolver && obj.edoSystem) {
    const state = obj.edoSolver.getState();
    obj.getUserVarNames().forEach(v => { if (v in state) currentUserVars[v] = state[v]; });
  } else if (obj.directSystem) {
    const scope = obj.evaluateDirectSystem(localTime);
    obj.getUserVarNames().forEach(v => { if (v in scope) currentUserVars[v] = scope[v]; });
  }

  const samples = obj.samples.concat({
    t: localTime, x: obj.x, y: obj.y,
    vx: obj.vx, vy: obj.vy, ax: obj.ax, ay: obj.ay,
    speed: obj.velocityMagnitude, acceleration: obj.accelerationMagnitude,
    userVars: currentUserVars
  });

  const fields = getObjectFields(obj);
  const xField = fields[series.xKey];
  const yField = fields[series.yKey];
  if (!xField || !yField) return [];

  return samples
    .filter((s) => timeMin === null || s.t >= timeMin)
    .filter((s) => timeMax === null || s.t <= timeMax)
    .map((s) => ({
      x: xField.get(s),
      y: yField.get(s),
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

  graphCtx.fillStyle = "#fafafa";
  graphCtx.fillRect(pad.left, pad.top, plotW, plotH);

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

  graphCtx.strokeStyle = "#cbd5e1";
  graphCtx.lineWidth = 1;
  graphCtx.strokeRect(pad.left, pad.top, plotW, plotH);

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

  graphCtx.font = "12px Inter, sans-serif";
  graphCtx.fillStyle = "#374151";
  graphCtx.textAlign = "center";
  graphCtx.fillText(currentAxisLabel("x"), pad.left + plotW / 2, H - 10);
  graphCtx.save();
  graphCtx.translate(14, pad.top + plotH / 2);
  graphCtx.rotate(-Math.PI / 2);
  graphCtx.fillText(currentAxisLabel("y"), 0, 0);
  graphCtx.restore();

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
    const fields = getObjectFields(series.object);
    const yLabel = fields[series.yKey]?.label || series.yKey;
    const xLabel = fields[series.xKey]?.label || series.xKey;
    const label = `${objName} — ${yLabel} × ${xLabel}`;
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
  const fields = getObjectFields(getGraphObject("graphObjectA"));
  return fields[aKey]?.label || aKey;
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
    Controls.updateWorkspaceHeight();
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
    Controls.updateWorkspaceHeight();
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
  updateObjectTables(getTime());
  drawGraph(getTime());
});

canvas.addEventListener("mouseup", () => { dragging = null; });
canvas.addEventListener("mouseleave", () => { dragging = null; });

// ── Main loop ──────────────────────────────────────────────────
function update() {
  const t = getTime();
  try {
    objects.forEach((obj) => {
      try { obj.update(t); } catch (e) { console.error("[obj.update]", e); }
      try { obj.recordSample(t); } catch (e) { console.error("[obj.recordSample]", e); }
    });
    render(ctx, canvas, objects, getOptions());
  } catch (e) {
    console.error("[simulador] Erro ao renderizar:", e);
  }
  try { updateKinematicsLive(); } catch (_) {}
  try { updateObjectTables(t); } catch (_) {}
  try { drawGraph(t); } catch (_) {}
  try { Controls.updateTimeLabel(t); } catch (_) {}
  requestAnimationFrame(update);
}

// ── Window globals ──────────────────────────────────────────────
window.addRandomObject = addRandomObject;
window.clearScene = clearScene;
window.togglePause = togglePause;
window.resetSimulationTime = resetSimulationTime;
window.setSpeed = setSpeed;
window.toggleTutorial = toggleTutorial;
window.closeModal = Modal.closeAppearanceModal;

// ── Init ───────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  Sidebar.initializeSidebar();
  Controls.initializeControls();
  Controls.updatePauseButtonText();
  Modal.initializeModal();
  initializeGraphControls();
  initializeWindowPanels();
  applyScale(); // set initial zoom label

  // Add object buttons (sidebar + empty state)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action='add-object']");
    if (btn) addRandomObject();
  });

  // Zoom buttons
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action='zoom-in']");
    if (btn) { zoomIn(); return; }
    const btn2 = e.target.closest("[data-action='zoom-out']");
    if (btn2) { zoomOut(); return; }
  });

  document.querySelector("[data-action='tutorial']")?.addEventListener("click", toggleTutorial);
  document.querySelector(".modal-close")?.addEventListener("click", Modal.closeAppearanceModal);
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

  // Update axis options when selected object changes
  document.getElementById("graphObjectA")?.addEventListener("change", () => {
    updateGraphAxisOptions('A', getGraphObject('graphObjectA'));
  });
  document.getElementById("graphObjectB")?.addEventListener("change", () => {
    updateGraphAxisOptions('B', getGraphObject('graphObjectB'));
  });

  // Table columns — remove chip
  document.getElementById('tableColumnsConfig')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.table-col-remove');
    if (!btn) return;
    activeTableColumns.delete(btn.dataset.removeCol);
    updateTableColumnsEditor();
    updateObjectTables(getTime());
  });

  // Table columns — add from select
  document.getElementById('tableColumnsConfig')?.addEventListener('change', (e) => {
    if (e.target.id !== 'tableAddCol') return;
    const key = e.target.value;
    if (key) {
      activeTableColumns.add(key);
      updateTableColumnsEditor();
      updateObjectTables(getTime());
    }
  });

  // Info panel actions
  document.getElementById("infoPanel")?.addEventListener("click", (e) => {
    // Object action buttons (appearance, delete, apply-equations)
    const actionBtn = e.target.closest("[data-object-action]");
    if (actionBtn) {
      const card = actionBtn.closest(".object-info-card");
      const objId = card?.dataset.objectId;
      const obj = objects.find(o => o.id === objId) ?? objects[Number(actionBtn.dataset.objectIndex)];
      if (!obj) return;

      const action = actionBtn.dataset.objectAction;

      // Card-level toggles: manipulate DOM directly to avoid full rebuild
      if (action === "toggle-card") {
        const isNowMin = card.classList.toggle("card-minimized");
        obj._cardMinimized = isNowMin;
        actionBtn.title = isNowMin ? "Expandir card" : "Minimizar card";
        return;
      }
      if (action === "toggle-kine") {
        obj._kineHidden = card.classList.toggle("kine-hidden");
        return;
      }

      if (action !== "apply-equations") {
        selected = obj;
        setGraphSelectionToObject(obj);
      }

      if (action === "appearance") {
        editObjectAppearance(obj);
      } else if (action === "delete") {
        deleteObject(obj);
        return;
      } else if (action === "apply-equations") {
        const textarea = card?.querySelector(".whiteboard-textarea");
        if (textarea) {
          const result = applyWhiteboardEquations(obj, textarea.value, card);
          showWhiteboardStatus(card, result);
        }
      }

      if (action !== "delete") updateInfoPanel();
      return;
    }

    // Palette insertion
    const insertBtn = e.target.closest("[data-wb-insert]");
    if (insertBtn) {
      const textarea = insertBtn.closest(".object-info-card")?.querySelector(".whiteboard-textarea");
      if (textarea) insertAtCursorInTextarea(textarea, insertBtn.dataset.wbInsert);
      return;
    }

    // Derivative template button
    const templateBtn = e.target.closest("[data-wb-template='derivative']");
    if (templateBtn) {
      const card = templateBtn.closest(".object-info-card");
      const textarea = card?.querySelector(".whiteboard-textarea");
      if (textarea) {
        const start = textarea.selectionStart ?? textarea.value.length;
        const before = textarea.value.substring(0, start);
        const prefix = (before.length > 0 && !before.endsWith('\n')) ? '\n' : '';
        const snippet = prefix + 'd(var)/dt = ';
        textarea.value = textarea.value.substring(0, start) + snippet + textarea.value.substring(textarea.selectionEnd ?? start);
        const varStart = start + prefix.length + 2; // after d(
        textarea.setSelectionRange(varStart, varStart + 3); // select "var"
        textarea.focus();
      }
      return;
    }

    // Preset loading
    const presetBtn = e.target.closest("[data-wb-preset]");
    if (presetBtn) {
      const card = presetBtn.closest(".object-info-card");
      const objId = card?.dataset.objectId;
      const obj = objects.find(o => o.id === objId);
      const textarea = card?.querySelector(".whiteboard-textarea");
      if (obj && textarea) {
        const text = WHITEBOARD_PRESETS[presetBtn.dataset.wbPreset];
        if (text) {
          textarea.value = text;
          updateConditionsSection(card, text);
          const result = applyWhiteboardEquations(obj, text, card);
          showWhiteboardStatus(card, result);
          if (result.success) updateInfoPanel();
        }
      }
      return;
    }
  });

  // Auto-apply equations when textarea loses focus (silent on error, tick on success)
  document.getElementById("infoPanel")?.addEventListener("focusout", (e) => {
    if (!e.target.matches(".whiteboard-textarea")) return;
    const textarea = e.target;
    if (!textarea.value.trim()) return;
    const card = textarea.closest(".object-info-card");
    const obj = objects.find(o => o.id === card?.dataset.objectId);
    if (!obj) return;
    const result = applyWhiteboardEquations(obj, textarea.value, card);
    if (result.success) showWhiteboardStatus(card, result);
  });

  // Ctrl+Enter inside textarea → apply and show status
  document.getElementById("infoPanel")?.addEventListener("keydown", (e) => {
    if (!(e.ctrlKey || e.metaKey) || e.key !== 'Enter') return;
    if (!e.target.matches(".whiteboard-textarea")) return;
    e.preventDefault();
    const textarea = e.target;
    const card = textarea.closest(".object-info-card");
    const obj = objects.find(o => o.id === card?.dataset.objectId);
    if (!obj) return;
    const result = applyWhiteboardEquations(obj, textarea.value, card);
    showWhiteboardStatus(card, result);
  });

  // Debounced update of conditions section while typing
  let _conditionsTimer = null;
  document.getElementById("infoPanel")?.addEventListener("input", (e) => {
    if (!e.target.matches(".whiteboard-textarea")) return;
    const textarea = e.target;
    const card = textarea.closest(".object-info-card");
    clearTimeout(_conditionsTimer);
    _conditionsTimer = setTimeout(() => { if (card) updateConditionsSection(card, textarea.value); }, 400);
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
  updateTableColumnsEditor();
  drawGraph(0);
  update();
});

window.addEventListener("resize", resizeCanvas);
