// ui/controls.js
import { isPaused } from '../engine/time.js';

export function updatePauseButtonText() {
  const btn = document.querySelector('[data-action="pause"]');
  if (btn) {
    btn.textContent = isPaused() ? "Retomar" : "Pausar";
  }
}

export function updateSpeedLabel(speed) {
  const label = document.querySelector('[data-label="speed"]');
  if (label) {
    label.textContent = `Velocidade: ${speed.toFixed(1)}x`;
  }
}

export function updateTimeLabel(t) {
  const label = document.querySelector('[data-label="time"]');
  if (label) {
    label.textContent = `t = ${t.toFixed(2)} s`;
  }
}

export function initializeControls() {
  const pauseBtn = document.querySelector('[data-action="pause"]');
  pauseBtn?.addEventListener('click', () => {
    window.togglePause();
  });

  const resetBtn = document.querySelector('[data-action="reset-time"]');
  resetBtn?.addEventListener('click', () => {
    window.resetSimulationTime();
  });

  const speedInput = document.querySelector('[data-action="speed"]');
  speedInput?.addEventListener('input', (e) => {
    const speed = Number(e.target.value);
    window.setSpeed(speed);
    updateSpeedLabel(speed);
  });

  // Toggle para minimizar tabela
  const collapseBtn = document.querySelector('[data-action="collapse-tables"]');
  collapseBtn?.addEventListener('click', () => {
    const panel = document.querySelector('.panel-data');
    panel.classList.toggle('collapsed');
  });

  // Toggle série B do gráfico
  const useBCheckbox = document.getElementById('graphUseB');
  const seriesB = document.getElementById('seriesB');
  useBCheckbox?.addEventListener('change', (e) => {
    if (seriesB) {
      seriesB.style.display = e.target.checked ? 'grid' : 'none';
    }
  });

  // Botão rolar para baixo no sidebar
  const scrollDownBtn = document.querySelector('[data-action="scroll-down"]');
  scrollDownBtn?.addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.scrollTo({ top: sidebar.scrollHeight, behavior: 'smooth' });
  });
}
