// ui/modal.js

let currentEditingObject = null;
let onObjectEquationSet = null;

export function openEquationModal(object, callback) {
  currentEditingObject = object;
  onObjectEquationSet = callback;

  const modal = document.getElementById("equationModal");
  if (!modal) {
    console.error("Modal nao encontrado no HTML");
    return;
  }

  const eqXInput = document.getElementById("modalEqX");
  const eqYInput = document.getElementById("modalEqY");

  if (eqXInput) eqXInput.value = object.eqXSource || "";
  if (eqYInput) eqYInput.value = object.eqYSource || "";

  modal.classList.add("active");
  eqXInput?.focus();
}

export function closeEquationModal() {
  document.getElementById("equationModal")?.classList.remove("active");
  currentEditingObject = null;
  onObjectEquationSet = null;
}

export function confirmEquations() {
  if (!currentEditingObject) return;

  const eqX = document.getElementById("modalEqX")?.value.trim();
  const eqY = document.getElementById("modalEqY")?.value.trim();

  if (!eqX || !eqY) {
    alert("Por favor, preencha ambas as equacoes X(t) e Y(t).");
    return;
  }

  onObjectEquationSet?.(currentEditingObject, eqX, eqY);
  closeEquationModal();
}

export function initializeModal() {
  const modal = document.getElementById("equationModal");
  if (!modal) return;

  modal.querySelector("[data-action='confirm']")?.addEventListener("click", confirmEquations);
  modal.querySelector("[data-action='cancel']")?.addEventListener("click", closeEquationModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeEquationModal();
  });

  modal.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeEquationModal();
    if (e.key === "Enter") confirmEquations();
  });
}
