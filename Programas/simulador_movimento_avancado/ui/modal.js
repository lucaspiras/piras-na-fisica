// ui/modal.js

let currentEditingObject = null;
let onObjectEquationSet = null;
let currentMode = "direct";

const MATH_IDENTIFIERS = new Set(["sin", "sen", "cos", "tan", "exp", "log", "sqrt", "abs", "pi", "e", "t"]);
const IDENTIFIER_REGEX = /[a-zA-Z_][a-zA-Z0-9_]*/g;

export function openEquationModal(object, callback) {
  currentEditingObject = object;
  onObjectEquationSet = callback;

  const modal = document.getElementById("equationModal");
  if (!modal) {
    console.error("Modal nao encontrado no HTML");
    return;
  }

  setupModalTabs();
  setupEquationRows(object);

  if (object.edoSystem) switchToDifferentialMode();
  else switchToDirectMode();

  modal.classList.add("active");
  modal.querySelector(".equation-var-input")?.focus();
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
    : [
        { variable: "theta", expression: "omega" }
      ];

  const algebraicRows = object.edoSystem?.algebraicEquations?.length
    ? object.edoSystem.algebraicEquations
    : [
        { variable: "x", expression: "r*sen(theta)" },
        { variable: "y", expression: "r*cos(theta)" }
      ];

  renderEquationRows("direct", directRows);
  renderEquationRows("differential", differentialRows);
  renderEquationRows("algebraic", algebraicRows);
  updateConstantsFields(object.edoSystem?.initialValues || {}, object.edoSystem?.constants || {});
}

function setupModalTabs() {
  const tabs = document.querySelectorAll(".modal-tab");
  tabs.forEach((tab) => {
    tab.onclick = () => {
      if (tab.dataset.tab === "differential") switchToDifferentialMode();
      else switchToDirectMode();
    };
  });
}

function switchToDirectMode() {
  setActiveTab("direct");
}

function switchToDifferentialMode() {
  setActiveTab("differential");
  detectEDOParameters();
}

function setActiveTab(tabName) {
  currentMode = tabName;
  document.querySelectorAll(".modal-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === tabName);
  });
  document.querySelectorAll(".modal-tab-content").forEach((content) => {
    content.style.display = content.id === `tab${capitalize(tabName)}` ? "block" : "none";
  });
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
  const suffix = kind === "differential" ? "/dt" : (kind === "algebraic" ? "" : "(t)");

  return `
    <div class="equation-row" data-equation-row="${kind}">
      <div class="equation-lhs">
        <span>${label}</span>
        <input class="equation-var-input" type="text" value="${variable}" placeholder="x">
        <span>${suffix} =</span>
      </div>
      <input class="equation-expression-input" type="text" value="${expression}" placeholder="expressão">
      <button class="equation-remove-btn" type="button" data-action="remove-equation" aria-label="Remover equação">&times;</button>
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
    return createNumberField(name, `${name} =`, value, "valor");
  });

  const initialFields = variables.map((name) => {
    const inputName = `init_${name}`;
    const value = initialValueOverrides[name] ?? existingInputs[inputName] ?? defaultInitialValue(name);
    return createNumberField(inputName, `${name}(0) =`, value, "valor inicial");
  });

  container.innerHTML = [...constantFields, ...initialFields].join("");
}

function clearConstantsFields() {
  const container = document.getElementById("edoConstantsContainer");
  if (container) {
    container.innerHTML = '<p class="edo-hint">Defina as equações acima para ver as constantes disponíveis.</p>';
  }
}

function createNumberField(name, label, value, placeholder) {
  const safeName = escapeAttribute(name);
  return `
    <div class="edo-constant-row">
      <label for="edo_${safeName}">${escapeHtml(label)}</label>
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
}

export function confirmEquations() {
  if (!currentEditingObject) return;
  if (currentMode === "direct") confirmDirectEquations();
  else confirmDifferentialEquations();
}

function confirmDirectEquations() {
  const equations = collectEquationRows("direct");

  if (!equations.some((eq) => eq.variable === "x") || !equations.some((eq) => eq.variable === "y")) {
    alert("O sistema direto precisa ter pelo menos x(t) e y(t).");
    return;
  }

  onObjectEquationSet?.(currentEditingObject, null, null, {
    mode: "direct",
    equations
  });
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
    if (e.key === "Enter" && !e.shiftKey) {
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
  });

  modal.addEventListener("input", (e) => {
    if (e.target.closest("#differentialEquationsContainer") || e.target.closest("#algebraicEquationsContainer")) {
      detectEDOParameters();
    }
  });

  setupModalTabs();
}

function addEquationRow(kind, row) {
  const container = getRowsContainer(kind);
  if (!container) return;
  container.insertAdjacentHTML("beforeend", createEquationRowHtml(kind, row));
  container.querySelector(".equation-row:last-child .equation-var-input")?.focus();
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
