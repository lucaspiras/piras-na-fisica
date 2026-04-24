// engine/object2D.js
import { drawVector, mathToPixels } from './renderer.js';

const VECTOR_LENGTH = 42;
const DERIVATIVE_STEP = 0.001;

export default class Object2D {
  constructor({ x, y, eqX = null, eqY = null, eqXSource = "", eqYSource = "", color = "#fb923c", size = 10, id = null }) {
    this.x = x;
    this.y = y;
    this.initialX = x;
    this.initialY = y;
    this.eqX = eqX;
    this.eqY = eqY;
    this.eqXSource = eqXSource;
    this.eqYSource = eqYSource;
    this.color = color;
    this.size = size;
    this.id = id || globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;

    this.path = [];
    this.samples = [];
    this.lastSampleTime = null;
    this.timeOffset = 0;
    this.prevX = null;
    this.prevY = null;
    this.prevPrevX = null;
    this.prevPrevY = null;
    this.velocityMagnitude = 0;
    this.accelerationMagnitude = 0;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.velocityDirection = null;
    this.accelerationDirection = null;

    this.isEditing = false;
    this.hasEquation = eqX !== null && eqY !== null;
  }

  getLocalTime(globalTime) {
    return Math.max(0, globalTime - this.timeOffset);
  }

  update(globalTime) {
    if (!this.hasEquation) return;

    const t = this.getLocalTime(globalTime);

    this.prevPrevX = this.prevX;
    this.prevPrevY = this.prevY;
    this.prevX = this.x;
    this.prevY = this.y;

    try {
      this.x = this.eqX(t);
      this.y = this.eqY(t);
      this.updateKinematics(t);
    } catch (e) {
      console.error("Erro ao calcular equacao:", e);
    }

    this.path.push({ x: this.x, y: this.y });
    if (this.path.length > 300) this.path.shift();
  }

  setEquations(eqX, eqY, eqXSource = "", eqYSource = "", timeOffset = 0) {
    this.eqX = eqX;
    this.eqY = eqY;
    this.eqXSource = eqXSource;
    this.eqYSource = eqYSource;
    this.timeOffset = timeOffset;
    this.hasEquation = true;
    this.isEditing = false;
    try {
      this.x = this.eqX(0);
      this.y = this.eqY(0);
      this.initialX = this.x;
      this.initialY = this.y;
    } catch (e) {
      console.error("Erro ao calcular posicao inicial:", e);
    }
    this.clearMotionHistory();
    if (this.hasEquation) this.updateKinematics(0);
  }

  setInitialPosition(x, y) {
    this.x = x;
    this.y = y;
    this.initialX = x;
    this.initialY = y;
    this.clearMotionHistory();
  }

  resetToInitial() {
    this.timeOffset = 0;
    this.x = this.initialX;
    this.y = this.initialY;
    if (this.hasEquation) {
      try {
        this.x = this.eqX(0);
        this.y = this.eqY(0);
      } catch (e) {
        console.error("Erro ao zerar objeto:", e);
      }
    }
    this.clearMotionHistory();
    if (this.hasEquation) this.updateKinematics(0);
  }

  clearMotionHistory() {
    this.path = [];
    this.samples = [];
    this.lastSampleTime = null;
    this.prevX = null;
    this.prevY = null;
    this.prevPrevX = null;
    this.prevPrevY = null;
    this.velocityMagnitude = 0;
    this.accelerationMagnitude = 0;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.velocityDirection = null;
    this.accelerationDirection = null;
  }

  recordSample(globalTime, interval = 0.1, maxSamples = 400) {
    const t = this.getLocalTime(globalTime);
    if (this.lastSampleTime !== null && t - this.lastSampleTime < interval) return;

    this.samples.push({
      t,
      x: this.x,
      y: this.y,
      vx: this.vx,
      vy: this.vy,
      ax: this.ax,
      ay: this.ay,
      speed: this.velocityMagnitude,
      acceleration: this.accelerationMagnitude
    });
    this.lastSampleTime = t;

    if (this.samples.length > maxSamples) {
      this.samples.shift();
    }
  }

  draw(ctx, canvas, options) {
    const { px: screenX, py: screenY } = mathToPixels(this.x, this.y, canvas);

    if (options.showTrail && this.hasEquation && this.path.length > 1) {
      ctx.beginPath();
      this.path.forEach((p, i) => {
        const { px, py } = mathToPixels(p.x, p.y, canvas);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.strokeStyle = `${this.color}55`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(screenX, screenY, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();

    if (options.selected === this) {
      ctx.strokeStyle = "#1e2a78";
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    if (!this.hasEquation) {
      ctx.fillStyle = "#6b7280";
      ctx.font = "12px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("(clique para editar)", screenX, screenY + 25);
    }

    if (this.hasEquation) {
      if (options.showVelocity) this.drawVelocity(ctx, canvas);
      if (options.showAcceleration) this.drawAcceleration(ctx, canvas);
    }
  }

  drawVelocity(ctx, canvas) {
    if (!this.velocityDirection) return;

    const { px: screenX, py: screenY } = mathToPixels(this.x, this.y, canvas);
    const vxPixels = this.velocityDirection.x * VECTOR_LENGTH;
    const vyPixels = -this.velocityDirection.y * VECTOR_LENGTH;

    drawVector(ctx, screenX, screenY, vxPixels, vyPixels, "#22c55e");
  }

  drawAcceleration(ctx, canvas) {
    if (!this.accelerationDirection) return;

    const { px: screenX, py: screenY } = mathToPixels(this.x, this.y, canvas);
    const axPixels = this.accelerationDirection.x * VECTOR_LENGTH;
    const ayPixels = -this.accelerationDirection.y * VECTOR_LENGTH;

    drawVector(ctx, screenX, screenY, axPixels, ayPixels, "#ef4444");
  }

  updateKinematics(t) {
    const h = DERIVATIVE_STEP;
    let vx;
    let vy;
    let ax;
    let ay;

    if (t >= h) {
      const xBefore = this.eqX(t - h);
      const yBefore = this.eqY(t - h);
      const xNow = this.eqX(t);
      const yNow = this.eqY(t);
      const xAfter = this.eqX(t + h);
      const yAfter = this.eqY(t + h);

      vx = (xAfter - xBefore) / (2 * h);
      vy = (yAfter - yBefore) / (2 * h);
      ax = (xAfter - 2 * xNow + xBefore) / (h * h);
      ay = (yAfter - 2 * yNow + yBefore) / (h * h);
    } else {
      const x0 = this.eqX(0);
      const y0 = this.eqY(0);
      const x1 = this.eqX(h);
      const y1 = this.eqY(h);
      const x2 = this.eqX(2 * h);
      const y2 = this.eqY(2 * h);

      vx = (x1 - x0) / h;
      vy = (y1 - y0) / h;
      ax = (x2 - 2 * x1 + x0) / (h * h);
      ay = (y2 - 2 * y1 + y0) / (h * h);
    }

    this.vx = vx;
    this.vy = vy;
    this.ax = ax;
    this.ay = ay;
    this.velocityMagnitude = Math.hypot(vx, vy);
    this.accelerationMagnitude = Math.hypot(ax, ay);
    this.velocityDirection = normalize(vx, vy);
    this.accelerationDirection = normalize(ax, ay);
  }
}

function normalize(x, y) {
  const magnitude = Math.hypot(x, y);
  if (magnitude < 1e-9) return null;
  return {
    x: x / magnitude,
    y: y / magnitude
  };
}
