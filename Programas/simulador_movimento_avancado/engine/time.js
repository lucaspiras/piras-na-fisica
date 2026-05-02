let elapsed = 0;
let lastTick = performance.now();
let speed = 1;
let paused = true; // Inicia pausado

function syncTime() {
  const now = performance.now();
  if (!paused) {
    elapsed += ((now - lastTick) / 1000) * speed;
  }
  lastTick = now;
}

export function getTime() {
  syncTime();
  return elapsed;
}

export function togglePause() {
  syncTime();
  paused = !paused;
}

export function setSpeed(s) {
  syncTime();
  speed = Number(s);
}

export function resetTime() {
  elapsed = 0;
  lastTick = performance.now();
}

export function isPaused() {
  return paused;
}
