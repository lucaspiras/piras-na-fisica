// ui/modal.js — simplified to appearance-only settings

let currentEditingObject = null;
let onAppearanceSet = null;

export function openAppearanceModal(object, callback) {
  currentEditingObject = object;
  onAppearanceSet = callback;

  const modal = document.getElementById("equationModal");
  if (!modal) return;

  populateAppearanceFields(object);
  modal.classList.add("active");
  document.getElementById("objectLabel")?.focus();
}

export function closeAppearanceModal() {
  document.getElementById("equationModal")?.classList.remove("active");
  currentEditingObject = null;
  onAppearanceSet = null;
}

function confirmAppearance() {
  if (!currentEditingObject) return;
  applyAppearance();
  onAppearanceSet?.(currentEditingObject);
  closeAppearanceModal();
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

export function initializeModal() {
  const modal = document.getElementById("equationModal");
  if (!modal) return;

  modal.querySelector("[data-action='confirm']")?.addEventListener("click", confirmAppearance);
  modal.querySelector("[data-action='cancel']")?.addEventListener("click", closeAppearanceModal);
  modal.querySelector(".modal-close")?.addEventListener("click", closeAppearanceModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeAppearanceModal();
  });

  modal.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAppearanceModal();
    if (e.key === "Enter" && e.target.tagName !== "BUTTON") {
      e.preventDefault();
      confirmAppearance();
    }
  });
}
