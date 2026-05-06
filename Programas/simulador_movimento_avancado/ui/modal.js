// ui/modal.js

let currentEditingObject = null;
let onObjectEquationSet = null;
let currentMode = "direct";
let lastFocusedInput = null;

const MATH_IDENTIFIERS = new Set(["sin", "sen", "cos", "tan", "exp", "log", "sqrt", "abs", "pi", "e", "t"]);
const IDENTIFIER_REGEX = /[a-zA-Z_][a-zA-Z0-9_]*/g;

const PRESETS = {
  circular:   { mode: "direct",       equations: [{ variable: "x", expression: "2*cos(t)" }, { variable: "y", expression: "2*sin(t)" }] },
  projectile: { mode: "direct",       equations: [{ variable: "x", expression: "4*t" }, { variable: "y", expression: "5 + 3*t - 4.9*t*t" }] },
  ellipse:    { mode: "direct",       equations: [{ variable: "x", expression: "3*cos(t)" }, { variable: "y", expression: "2*sin(t)" }] },
  lissajous:  { mode: "direct",       equations: [{ variable: "x", expression: "3*cos(3*t)" }, { variable: "y", expression: "2*sin(4*t)" }] },
  spiral:     { mode: "direct",       equations: [{ variable: "x", expression: "0.4*t*cos(t)" }, { variable: "y", expression: "0.4*t*sin(t)" }] },
  freeFall:   { mode: "direct",       equations: [{ variable: "x", expression: "0" }, { variable: "y", expression: "8 - 4.9*t*t" }] },
  pendulum:   { mode: "differential",
    equations: [{ variable: "theta", expression: "omega" }, { variable: "omega", expression: "-(9.8/2)*sin(theta)" }],
    algebraicEquations: [{ variable: "x", expression: "2*sin(theta)" }, { variable: "y", expression: "-2*cos(theta)" }],
    constants: {},
    initialValues: { theta: 0.8, omega: 0 }
  },
};

export function openEquationModal(object, callback, openTab = null) {
  currentEditingObject = object;
  onObjectEquationSet = callback;

  const modal = document.getElementById("equationModal");
  if (!modal) return;

  setupModalTabs();
  setupEquationRows(object);
  populateAppearanceFields(object);

  const defaultTab = openTab || (object.edoSystem ? "differential" : "direct");
  setActiveTab(defaultTab);

  modal.classList.add("active");
  modal.querySelector(".equation-var-input")?.focus();
}

function populateAppearanceFields(object) {
  const labelInput = document.getElementById("objectLabel");
  const colorInput = document.getElementById("objectColor");
  const massInput = document.getElementById("objectMass");
  const shapeRadio = document.querySelector(`input[name="objectShape"][value="${object.shape || "circle"}"]`);

  if (labelInput) labelInput.value = object.label || "";
  if (colorInput) colorInput.value = object.color || "#fb923c";
  if (massInput) massInput.value = object.mass ?? 1.0;
  if (shapeRadio) shapeRadio.checked = true;
}

function setupEquationRows(object) {
  const directRows = object.directSystem?.length
    ? object.directSystem
    : [
        { variable: "x", expression: object.eqXSource || "2*cos(t)" },
        { variable: "y", expression: object.eqYSource || "2*sin(t)" }
      ];

  const differentialRows = object.edoSystem?.equations?.length
    ? object.edoSystem.equations
    : [{ variable: "theta", expression: "omega" }, { variable: "omega", expression: "-(9.8/2)*sin(theta)" }];

  const algebraicRows = object.edoSystem?.algebraicEquations?.length
    ? object.edoSystem.algebraicEquations
    : [{ variable: "x", expression: "2*sin(theta)" }, { variable: "y", expression: "-2*cos(theta)" }];

  renderEquationRows("direct", directRows);
  renderEquationRows("differential", differentialRows);
  renderEquationRows("algebraic", algebraicRows);
  updateConstantsFields(object.edoSystem?.initialValues || {}, object.edoSystem?.constants || {});
}

function setupModalTabs() {
  document.querySelectorAll(".modal-tab").forEach((tab) => {
    tab.onclick = () => {
      if (tab.dataset.tab === "differential") setActiveTab("differential");
      else if (tab.dataset.tab === "appearance") setActiveTab("appearance");
      else setActiveTab("direct");
    };
  });
}

function setActiveTab(tabName) {
  currentMode = tabName === "appearance" ? (currentMode === "appearance" ? "direct" : currentMode) : tabName;
  document.querySelectorAll(".modal-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === tabName);
  });
  document.querySelectorAll(".modal-tab-content").forEach((content) => {
    content.style.display = content.id === `tab${capitalize(tabName)}` ? "block" : "none";
  });
  if (tabName === "differential") detectEDOParameters();
}

function renderEquationRows(kind, rows) {
  const container = getRowsContainer(kind);
  if (!container) return;
  container.innerHTML = rows.map((row) => createEquationRowHtml(kind, row)).join("");
}

function createEquationRowHtml(kind, row) {
  const variable = escapeAttribute(row.variable || "");
  const expression = escapeAttribute(row.expression || "");
  const label = kind === "differential" ? "d" : "";
  const suffix = kind === "differential" ? "/dt =" : (kind === "algebraic" ? "=" : "(t) =");

  return `
    <div class="equation-row" data-equation-row="${kind}">
      <div class="equation-lhs">
        <span class="eq-prefix">${label}</span>
        <input class="equation-var-input" type="text" value="${variable}" placeholder="var" spellcheck="false" autocomplete="off">
        <span class="eq-suffix">${suffix}</span>
      </div>
      <input class="equation-expression-input" type="text" value="${expression}" placeholder="expressão em t" spellcheck="false" autocomplete="off">
      <button class="equation-remove-btn" type="button" data-action="remove-equation" aria-label="Remover">&times;</button>
    </div>
  `;
}

export function detectEDOParameters() {
  const differentialRows = collectEquationRows("differential");
  const algebraicRows = collectEquationRows("algebraic");
  if (differentialRows.length === 0 && algebraicRows.length === 0) {
    clearConstantsFields();
    return;
  }
  updateConstantsFields();
}

function updateConstantsFields(initialValueOverrides = {}, constantOverrides = {}) {
  const container = document.getElementById("edoConstantsContainer");
  if (!container) return;

  const existingInputs = {};
  container.querySelectorAll("input").forEach((input) => {
    existingInputs[input.name] = input.value;
  });

  const differentialRows = collectEquationRows("differential");
  const algebraicRows = collectEquationRows("algebraic");
  const variables = differentialRows.map((row) => row.variable);
  const algebraicVariables = algebraicRows.map((row) => row.variable);
  const constants = detectConstants([...differentialRows, ...algebraicRows], [...variables, ...algebraicVariables]);

  if (variables.length === 0 && constants.length === 0) {
    clearConstantsFields();
    return;
  }

  const constantFields = constants.map((name) => {
    const value = constantOverrides[name] ?? existingInputs[name] ?? "";
    return createNumberField(name, `${name}`, value, "valor");
  });

  const initialFields = variables.map((name) => {
    const inputName = `init_${name}`;
    const value = initialValueOverrides[name] ?? existingInputs[inputName] ?? defaultInitialValue(name);
    return createNumberField(inputName, `${name}(0)`, value, "valor inicial");
  });

  container.innerHTML = `
    <div class="edo-constants-grid">
      ${[...constantFields, ...initialFields].join("")}
    </div>
  `;
}

function clearConstantsFields() {
  const container = document.getElementById("edoConstantsContainer");
  if (container) {
    container.innerHTML = '<p class="edo-hint">Defina as equações acima para ver as variáveis disponíveis.</p>';
  }
}

function createNumberField(name, label, value, placeholder) {
  const safeName = escapeAttribute(name);
  return `
    <div class="edo-constant-row">
      <label for="edo_${safeName}">${escapeHtml(label)} =</label>
      <input type="number" id="edo_${safeName}" name="${safeName}" value="${escapeAttribute(String(value))}" step="any" placeholder="${placeholder}">
    </div>
  `;
}

function detectConstants(rows, variables) {
  const variableSet = new Set(variables);
  const constants = new Set();
  rows.forEach((row) => {
    for (const id of getIdentifiers(row.expression)) {
      if (!MATH_IDENTIFIERS.has(id) && !variableSet.has(id)) {
        constants.add(id);
      }
    }
  });
  return Array.from(constants).sort();
}

export function closeEquationModal() {
  document.getElementById("equationModal")?.classList.remove("active");
  currentEditingObject = null;
  onObjectEquationSet = null;
  currentMode = "direct";
  lastFocusedInput = null;
}

export function confirmEquations() {
  if (!currentEditingObject) return;
  applyAppearance();
  if (currentMode === "differential") confirmDifferentialEquations();
  else confirmDirectEquations();
}

function applyAppearance() {
  if (!currentEditingObject) return;
  const label = document.getElementById("objectLabel")?.value.trim() || "";
  const mass = parseFloat(document.getElementById("objectMass")?.value) || 1.0;
  const color = document.getElementById("objectColor")?.value || "#fb923c";
  const shapeRadio = document.querySelector('input[name="objectShape"]:checked');
  const shape = shapeRadio?.value || "circle";

  currentEditingObject.label = label;
  currentEditingObject.mass = mass;
  currentEditingObject.color = color;
  currentEditingObject.shape = shape;
}

function confirmDirectEquations() {
  const equations = collectEquationRows("direct");
  if (!equations.some((eq) => eq.variable === "x") || !equations.some((eq) => eq.variable === "y")) {
    alert("O sistema direto precisa ter pelo menos x(t) e y(t).");
    return;
  }
  onObjectEquationSet?.(currentEditingObject, null, null, { mode: "direct", equations });
  closeEquationModal();
}

function confirmDifferentialEquations() {
  const equations = collectEquationRows("differential");
  const algebraicEquations = collectEquationRows("algebraic");

  if (equations.length === 0) {
    alert("Por favor, preencha pelo menos uma equação diferencial.");
    return;
  }

  const constants = {};
  const initialValues = {};
  const container = document.getElementById("edoConstantsContainer");

  container?.querySelectorAll("input").forEach((input) => {
    const value = Number.parseFloat(input.value);
    const numericValue = Number.isFinite(value) ? value : 0;
    if (input.name.startsWith("init_")) {
      initialValues[input.name.substring(5)] = numericValue;
    } else {
      constants[input.name] = numericValue;
    }
  });

  onObjectEquationSet?.(currentEditingObject, null, null, {
    mode: "differential",
    equations,
    algebraicEquations,
    constants,
    initialValues
  });
  closeEquationModal();
}

function applyPreset(presetKey) {
  const preset = PRESETS[presetKey];
  if (!preset) return;

  if (preset.mode === "direct") {
    renderEquationRows("direct", preset.equations);
    setActiveTab("direct");
  } else if (preset.mode === "differential") {
    renderEquationRows("differential", preset.equations);
    renderEquationRows("algebraic", preset.algebraicEquations || []);
    setActiveTab("differential");
    setTimeout(() => {
      updateConstantsFields(preset.initialValues || {}, preset.constants || {});
    }, 0);
  }
}

export function initializeModal() {
  const modal = document.getElementById("equationModal");
  if (!modal) return;

  modal.querySelector("[data-action='confirm']")?.addEventListener("click", confirmEquations);
  modal.querySelector("[data-action='cancel']")?.addEventListener("click", closeEquationModal);
  modal.querySelector(".modal-close")?.addEventListener("click", closeEquationModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeEquationModal();
  });

  modal.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeEquationModal();
    if (e.key === "Enter" && !e.shiftKey && e.target.tagName !== "BUTTON") {
      e.preventDefault();
      confirmEquations();
    }
  });

  modal.addEventListener("click", (e) => {
    const action = e.target?.dataset?.action;
    if (action === "add-direct-equation") addEquationRow("direct", { variable: "", expression: "" });
    if (action === "add-differential-equation") addEquationRow("differential", { variable: "", expression: "" });
    if (action === "add-algebraic-equation") addEquationRow("algebraic", { variable: "", expression: "" });
    if (action === "remove-equation") {
      e.target.closest(".equation-row")?.remove();
      if (currentMode === "differential") detectEDOParameters();
    }

    // Math palette insertion
    const insertText = e.target?.dataset?.insert;
    if (insertText) {
      insertAtCursor(insertText);
    }

    // Preset loading
    const presetKey = e.target?.dataset?.preset;
    if (presetKey) {
      applyPreset(presetKey);
    }
  });

  // Track last focused equation input for palette insertion
  modal.addEventListener("focusin", (e) => {
    if (e.target.classList.contains("equation-expression-input") || e.target.classList.contains("equation-var-input")) {
      lastFocusedInput = e.target;
    }
  });

  modal.addEventListener("input", (e) => {
    if (e.target.closest("#differentialEquationsContainer") || e.target.closest("#algebraicEquationsContainer")) {
      detectEDOParameters();
    }
  });

  setupModalTabs();
}

function insertAtCursor(text) {
  const input = lastFocusedInput;
  if (!input) return;

  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;
  const before = input.value.substring(0, start);
  const after = input.value.substring(end);
  input.value = before + text + after;
  const cursor = start + text.length;
  input.setSelectionRange(cursor, cursor);
  input.focus();

  if (input.closest("#differentialEquationsContainer") || input.closest("#algebraicEquationsContainer")) {
    detectEDOParameters();
  }
}

function addEquationRow(kind, row) {
  const container = getRowsContainer(kind);
  if (!container) return;
  container.insertAdjacentHTML("beforeend", createEquationRowHtml(kind, row));
  const newInput = container.querySelector(".equation-row:last-child .equation-expression-input");
  newInput?.focus();
  lastFocusedInput = newInput || null;
  if (kind === "differential" || kind === "algebraic") detectEDOParameters();
}

function collectEquationRows(kind) {
  const container = getRowsContainer(kind);
  if (!container) return [];

  return Array.from(container.querySelectorAll(".equation-row"))
    .map((row) => ({
      variable: row.querySelector(".equation-var-input")?.value.trim().toLowerCase() || "",
      expression: row.querySelector(".equation-expression-input")?.value.trim() || ""
    }))
    .filter((row) => isValidVariableName(row.variable) && row.expression);
}

function getRowsContainer(kind) {
  if (kind === "direct") return document.getElementById("directEquationsContainer");
  if (kind === "algebraic") return document.getElementById("algebraicEquationsContainer");
  return document.getElementById("differentialEquationsContainer");
}

function isValidVariableName(value) {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value);
}

function defaultInitialValue(variable) {
  if (currentEditingObject?.edoSystem?.initialValues?.[variable] !== undefined) {
    return currentEditingObject.edoSystem.initialValues[variable];
  }
  if (variable === "x") return currentEditingObject?.x ?? 0;
  if (variable === "y") return currentEditingObject?.y ?? 0;
  return 0;
}

function getIdentifiers(expression) {
  const ids = [];
  let match;
  IDENTIFIER_REGEX.lastIndex = 0;
  while ((match = IDENTIFIER_REGEX.exec(expression.toLowerCase())) !== null) {
    ids.push(match[0]);
  }
  return ids;
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}
