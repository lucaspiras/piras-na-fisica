// ui/sidebar.js

export function isTrailVisible() {
  return document.getElementById("trail")?.checked ?? true;
}

export function isVelocityVisible() {
  return document.getElementById("vel")?.checked ?? true;
}

export function isAccelerationVisible() {
  return document.getElementById("acc")?.checked ?? false;
}

export function initializeSidebar() {
  document.getElementById("trail")?.addEventListener("change", isTrailVisible);
  document.getElementById("vel")?.addEventListener("change", isVelocityVisible);
  document.getElementById("acc")?.addEventListener("change", isAccelerationVisible);
}
