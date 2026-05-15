// engine/object2D.js
import { drawVector, mathToPixels } from './renderer.js';
import { EDOSolver, parseEDOSystem } from './edo.js';
import { parseEquation } from './mathparser.js';

const VECTOR_LENGTH = 42;
const DERIVATIVE_STEP = 0.001;

export default class Object2D {
  constructor({ x, y, eqX = null, eqY = null, eqXSource = "", eqYSource = "", color = "#fb923c", size = 10, id = null, shape = "circle", mass = 1.0, label = "" }) {
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
    this.shape = shape;
    this.mass = mass;
    this.label = label;
    this.id = id || globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;

    this.edoSystem = null;
    this.edoSolver = null;
    this.directSystem = null;
    this.directConstants = {};

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

  getUserVarNames() {
    const std = new Set(['x', 'y', 'vx', 'vy', 'ax', 'ay', 'speed', 'acceleration', 't']);
    if (this.edoSolver && this.edoSystem) {
      const stateVars = this.edoSystem.equations.map(eq => eq.variable);
      const algVars = (this.edoSystem.algebraicEquations || []).map(eq => eq.variable);
      const seen = new Set();
      const result = [];
      for (const v of [...stateVars, ...algVars]) {
        if (!std.has(v) && !seen.has(v)) { seen.add(v); result.push(v); }
      }
      return result;
    }
    if (this.directSystem) {
      return this.directSystem.map(eq => eq.variable).filter(v => !std.has(v));
    }
    return [];
  }

  update(globalTime) {
    if (!this.hasEquation) return;

    const t = this.getLocalTime(globalTime);

    this.prevPrevX = this.prevX;
    this.prevPrevY = this.prevY;
    this.prevX = this.x;
    this.prevY = this.y;

    try {
      if (this.edoSolver) {
        this.updateFromEDO(t);
      } else {
        this.x = this.eqX(t);
        this.y = this.eqY(t);
        this.updateKinematics(t);
      }
    } catch (e) {
      console.error("Erro ao calcular equacao:", e);
    }

    this.path.push({ x: this.x, y: this.y });
    if (this.path.length > 400) this.path.shift();
  }

  updateFromEDO(targetTime) {
    if (!this.edoSolver) return;

    const currentTime = this.edoSolver.getTime();
    const dt = targetTime - currentTime;

    if (dt > 0) {
      const stepSize = 0.001;
      const steps = Math.floor(dt / stepSize);
      const remainder = dt - steps * stepSize;

      for (let i = 0; i < steps; i++) {
        this.edoSolver.step(stepSize);
      }
      if (remainder > 0) {
        this.edoSolver.step(remainder);
      }
    }

    this.applyEDOState();
  }

  setEquations(eqX, eqY, eqXSource = "", eqYSource = "", timeOffset = 0) {
    this.eqX = eqX;
    this.eqY = eqY;
    this.eqXSource = eqXSource;
    this.eqYSource = eqYSource;
    this.timeOffset = timeOffset;
    this.hasEquation = true;
    this.isEditing = false;
    this.edoSystem = null;
    this.edoSolver = null;
    this.directSystem = null;
    this.directConstants = {};
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

  setDirectSystem(equations, timeOffset = 0, constants = {}) {
    const normalizedEquations = normalizeEquationRows(equations);
    // Add defaults so missing position variables don't crash
    if (!normalizedEquations.some((eq) => eq.variable === "x")) normalizedEquations.push({ variable: "x", expression: "0" });
    if (!normalizedEquations.some((eq) => eq.variable === "y")) normalizedEquations.push({ variable: "y", expression: "0" });

    this.directConstants = { ...constants };
    this.directSystem = normalizedEquations.map((eq) => ({
      ...eq,
      fn: parseEquation(eq.expression)
    }));
    this.eqXSource = this.directSystem.find((eq) => eq.variable === "x")?.expression || "";
    this.eqYSource = this.directSystem.find((eq) => eq.variable === "y")?.expression || "";
    this.edoSystem = null;
    this.edoSolver = null;
    this.timeOffset = timeOffset;
    this.hasEquation = true;
    this.isEditing = false;

    this.eqX = (t) => this.evaluateDirectSystem(t).x;
    this.eqY = (t) => this.evaluateDirectSystem(t).y;

    const initialState = this.evaluateDirectSystem(0);
    this.x = initialState.x;
    this.y = initialState.y;
    this.initialX = this.x;
    this.initialY = this.y;
    this.clearMotionHistory();
    this.updateKinematics(0);
  }

  setEDOSystem(edoConfig) {
    const equationRows = normalizeEquationRows(edoConfig?.equations || []);
    const algebraicRows = normalizeEquationRows(edoConfig?.algebraicEquations || []);
    if (!edoConfig || equationRows.length === 0) {
      return;
    }

    this.edoSystem = {
      equations: equationRows,
      algebraicEquations: algebraicRows,
      constants: edoConfig.constants || {},
      initialValues: edoConfig.initialValues || {}
    };

    const system = parseEDOSystem(equationRows.map((eq) => `d${eq.variable}/dt = ${eq.expression}`));

    if (system.equations.length === 0) {
      console.error("Nenhuma equação diferencial válida encontrada.");
      return;
    }

    const initialValues = { ...edoConfig.initialValues };
    system.variables.forEach((variable) => {
      if (initialValues[variable] === undefined) initialValues[variable] = 0;
    });

    this.edoSolver = new EDOSolver(system, initialValues, edoConfig.constants || {}, algebraicRows);
    this.directSystem = null;

    this.hasEquation = true;
    this.isEditing = false;
    this.timeOffset = edoConfig.timeOffset ?? 0;

    this.x = initialValues.x ?? this.x ?? 0;
    this.y = initialValues.y ?? this.y ?? 0;

    this.vx = initialValues.vx ?? initialValues.v ?? 0;
    this.vy = initialValues.vy ?? 0;
    this.applyEDOState();
    this.initialX = this.x;
    this.initialY = this.y;

    this.clearMotionHistory();
    this.applyEDOState();
  }

  updateKinematicsFromEDO() {
    if (!this.edoSolver) return;
    this.applyEDOState();
  }

  applyEDOState() {
    if (!this.edoSolver) return;
    const state = this.edoSolver.getState();
    const algebraicState = this.edoSolver.getAlgebraicState();
    const derivatives = this.edoSolver.getDerivatives();
    const combinedState = { ...state, ...algebraicState };

    this.x = combinedState.x ?? this.x;
    this.y = combinedState.y ?? this.y;
    this.vx = combinedState.vx ?? combinedState.v ?? derivatives.x ?? 0;
    this.vy = combinedState.vy ?? derivatives.y ?? 0;
    this.ax = derivatives.vx ?? derivatives.v ?? 0;
    this.ay = derivatives.vy ?? 0;

    if (this.edoSystem?.algebraicEquations?.length) {
      const estimated = this.estimateAlgebraicKinematics(state, derivatives, combinedState);
      if (combinedState.vx === undefined && combinedState.v === undefined && derivatives.x === undefined) {
        this.vx = estimated.vx;
      }
      if (combinedState.vy === undefined && derivatives.y === undefined) {
        this.vy = estimated.vy;
      }
      if (derivatives.vx === undefined && derivatives.v === undefined) {
        this.ax = estimated.ax;
      }
      if (derivatives.vy === undefined) {
        this.ay = estimated.ay;
      }
    }

    this.velocityMagnitude = Math.hypot(this.vx, this.vy);
    this.velocityDirection = normalize(this.vx, this.vy);
    this.accelerationMagnitude = Math.hypot(this.ax, this.ay);
    this.accelerationDirection = normalize(this.ax, this.ay);
  }

  estimateAlgebraicKinematics(state, derivatives, combinedState) {
    const h = DERIVATIVE_STEP;
    const t = this.edoSolver.getTime();
    const nextState = advanceState(state, derivatives, h);
    const nextAlgebraic = this.edoSolver.getAlgebraicState(nextState, t + h);
    const nextCombined = { ...nextState, ...nextAlgebraic };
    const nextDerivatives = this.edoSolver.getDerivatives(nextState, t + h);
    const afterNextState = advanceState(nextState, nextDerivatives, h);
    const afterNextAlgebraic = this.edoSolver.getAlgebraicState(afterNextState, t + 2 * h);
    const afterNextCombined = { ...afterNextState, ...afterNextAlgebraic };

    const vx = ((nextCombined.x ?? combinedState.x ?? this.x) - (combinedState.x ?? this.x)) / h;
    const vy = ((nextCombined.y ?? combinedState.y ?? this.y) - (combinedState.y ?? this.y)) / h;
    const nextVx = ((afterNextCombined.x ?? nextCombined.x ?? this.x) - (nextCombined.x ?? this.x)) / h;
    const nextVy = ((afterNextCombined.y ?? nextCombined.y ?? this.y) - (nextCombined.y ?? this.y)) / h;

    return {
      vx,
      vy,
      ax: (nextVx - vx) / h,
      ay: (nextVy - vy) / h
    };
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
    if (this.edoSolver && this.edoSystem) {
      this.edoSolver.reset(
        this.edoSystem.initialValues || { x: this.initialX, v: 0 },
        this.edoSystem.constants || {}
      );
      this.x = this.initialX;
      this.y = this.initialY;
      this.vx = this.edoSystem.initialValues?.vx ?? this.edoSystem.initialValues?.v ?? 0;
      this.vy = this.edoSystem.initialValues?.vy ?? 0;
      this.applyEDOState();
    } else if (this.hasEquation) {
      try {
        this.x = this.eqX(0);
        this.y = this.eqY(0);
      } catch (e) {
        console.error("Erro ao zerar objeto:", e);
      }
    }
    this.clearMotionHistory();
    if (this.edoSolver) this.applyEDOState();
    if (this.hasEquation && !this.edoSolver) this.updateKinematics(0);
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

  recordSample(globalTime, interval = 0.1, maxSamples = 600) {
    const t = this.getLocalTime(globalTime);
    if (this.lastSampleTime !== null && t - this.lastSampleTime < interval) return;

    const sample = {
      t,
      x: this.x,
      y: this.y,
      vx: this.vx,
      vy: this.vy,
      ax: this.ax,
      ay: this.ay,
      speed: this.velocityMagnitude,
      acceleration: this.accelerationMagnitude,
      userVars: {}
    };

    const userVarNames = this.getUserVarNames();
    if (userVarNames.length > 0) {
      if (this.edoSolver && this.edoSystem) {
        const state = this.edoSolver.getState();
        userVarNames.forEach(v => { if (v in state) sample.userVars[v] = state[v]; });
      } else if (this.directSystem) {
        const scope = this.evaluateDirectSystem(t);
        userVarNames.forEach(v => { if (v in scope && Number.isFinite(scope[v])) sample.userVars[v] = scope[v]; });
      }
    }

    this.samples.push(sample);
    this.lastSampleTime = t;
    if (this.samples.length > maxSamples) this.samples.shift();
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
      ctx.strokeStyle = `${this.color}66`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Pendulum rod from pivot point
    if (this.shape === "pendulum") {
      const pivotX = this.edoSystem?.constants?.pivotX ?? this.directConstants?.pivotX ?? 0;
      const pivotY = this.edoSystem?.constants?.pivotY ?? this.directConstants?.pivotY ?? 0;
      const pivot = mathToPixels(pivotX, pivotY, canvas);
      ctx.beginPath();
      ctx.moveTo(pivot.px, pivot.py);
      ctx.lineTo(screenX, screenY);
      ctx.strokeStyle = "#6b7280";
      ctx.lineWidth = 2.5;
      ctx.stroke();
      // Pivot dot
      ctx.beginPath();
      ctx.arc(pivot.px, pivot.py, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#374151";
      ctx.fill();
    }

    const vd = this.velocityDirection;
    // Angle so shape points in velocity direction (default: up = -π/2)
    const velocityAngle = vd ? Math.atan2(-vd.y, vd.x) + Math.PI / 2 : 0;
    const s = this.size;

    ctx.save();
    ctx.translate(screenX, screenY);

    switch (this.shape) {
      case "rocket":
        ctx.rotate(velocityAngle);
        this._drawRocket(ctx, s);
        break;
      case "car":
        ctx.rotate(velocityAngle - Math.PI / 2);
        this._drawCar(ctx, s);
        break;
      case "satellite":
        ctx.rotate(velocityAngle);
        this._drawSatellite(ctx, s);
        break;
      case "soccer":
        this._drawSoccer(ctx, s);
        break;
      default:
        this._drawCircle(ctx, s);
        break;
    }

    if (options.selected === this) {
      ctx.beginPath();
      ctx.arc(0, 0, s + 5, 0, Math.PI * 2);
      ctx.strokeStyle = "#1e2a78";
      ctx.lineWidth = 2.5;
      ctx.stroke();
    }

    ctx.restore();

    if (this.label) {
      ctx.fillStyle = "#1f2937";
      ctx.font = "bold 11px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(this.label, screenX, screenY - s - 10);
    }

    if (!this.hasEquation) {
      ctx.fillStyle = "#6b7280";
      ctx.font = "12px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("(clique para editar)", screenX, screenY + s + 20);
    }

    if (this.hasEquation) {
      if (options.showVelocity) this.drawVelocity(ctx, canvas);
      if (options.showAcceleration) this.drawAcceleration(ctx, canvas);
    }
  }

  _drawCircle(ctx, s) {
    ctx.beginPath();
    ctx.arc(0, 0, s, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  _drawSoccer(ctx, s) {
    ctx.beginPath();
    ctx.arc(0, 0, s, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Center pentagon (simplified as filled circle)
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.32, 0, Math.PI * 2);
    ctx.fillStyle = "#111827";
    ctx.fill();

    // 5 outer spots
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
      const r = s * 0.62;
      ctx.beginPath();
      ctx.arc(r * Math.cos(angle), r * Math.sin(angle), s * 0.18, 0, Math.PI * 2);
      ctx.fillStyle = "#111827";
      ctx.fill();
    }
  }

  _drawRocket(ctx, s) {
    // Body
    ctx.beginPath();
    ctx.moveTo(0, -s * 2.0);
    ctx.lineTo(s * 0.65, s * 0.7);
    ctx.lineTo(-s * 0.65, s * 0.7);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();

    // Left fin
    ctx.beginPath();
    ctx.moveTo(-s * 0.65, s * 0.2);
    ctx.lineTo(-s * 1.35, s * 1.0);
    ctx.lineTo(-s * 0.65, s * 0.7);
    ctx.closePath();
    ctx.fillStyle = darkenColor(this.color, 40);
    ctx.fill();

    // Right fin
    ctx.beginPath();
    ctx.moveTo(s * 0.65, s * 0.2);
    ctx.lineTo(s * 1.35, s * 1.0);
    ctx.lineTo(s * 0.65, s * 0.7);
    ctx.closePath();
    ctx.fillStyle = darkenColor(this.color, 40);
    ctx.fill();

    // Outer flame
    ctx.beginPath();
    ctx.moveTo(-s * 0.4, s * 0.7);
    ctx.lineTo(0, s * 1.6);
    ctx.lineTo(s * 0.4, s * 0.7);
    ctx.closePath();
    ctx.fillStyle = "#fb923c";
    ctx.fill();

    // Inner flame
    ctx.beginPath();
    ctx.moveTo(-s * 0.2, s * 0.7);
    ctx.lineTo(0, s * 1.25);
    ctx.lineTo(s * 0.2, s * 0.7);
    ctx.closePath();
    ctx.fillStyle = "#facc15";
    ctx.fill();

    // Window
    ctx.beginPath();
    ctx.arc(0, -s * 0.8, s * 0.28, 0, Math.PI * 2);
    ctx.fillStyle = "#bfdbfe";
    ctx.fill();
    ctx.strokeStyle = "#1e40af";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  _drawCar(ctx, s) {
    const w = s * 1.8;
    const h = s * 0.85;

    // Body
    ctx.fillStyle = this.color;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(-w, -h * 0.5, w * 2, h, s * 0.25);
    } else {
      ctx.rect(-w, -h * 0.5, w * 2, h);
    }
    ctx.fill();

    // Roof
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(-w * 0.55, -h * 1.2, w * 1.1, h * 0.75, s * 0.2);
    } else {
      ctx.rect(-w * 0.55, -h * 1.2, w * 1.1, h * 0.75);
    }
    ctx.fill();

    // Windows
    ctx.fillStyle = "#bfdbfe";
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(-w * 0.48, -h * 1.12, w * 0.44, h * 0.58, s * 0.1);
    } else {
      ctx.rect(-w * 0.48, -h * 1.12, w * 0.44, h * 0.58);
    }
    ctx.fill();
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(w * 0.04, -h * 1.12, w * 0.44, h * 0.58, s * 0.1);
    } else {
      ctx.rect(w * 0.04, -h * 1.12, w * 0.44, h * 0.58);
    }
    ctx.fill();

    // Wheels
    const wheelR = s * 0.55;
    const wheelY = h * 0.38;
    ctx.fillStyle = "#1f2937";
    for (const wx of [-w * 0.58, w * 0.58]) {
      ctx.beginPath();
      ctx.arc(wx, wheelY, wheelR, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(wx, wheelY, wheelR * 0.45, 0, Math.PI * 2);
      ctx.fillStyle = "#9ca3af";
      ctx.fill();
      ctx.fillStyle = "#1f2937";
    }
  }

  _drawSatellite(ctx, s) {
    // Solar panels (left)
    ctx.fillStyle = "#3b82f6";
    ctx.beginPath();
    ctx.rect(-s * 2.4, -s * 0.38, s * 1.6, s * 0.76);
    ctx.fill();
    ctx.strokeStyle = "#1e40af";
    ctx.lineWidth = 0.5;
    ctx.stroke();
    // panel grid lines
    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(-s * 2.4 + (s * 1.6 / 3) * i, -s * 0.38);
      ctx.lineTo(-s * 2.4 + (s * 1.6 / 3) * i, s * 0.38);
      ctx.strokeStyle = "#1e40af66";
      ctx.stroke();
    }

    // Solar panels (right)
    ctx.fillStyle = "#3b82f6";
    ctx.beginPath();
    ctx.rect(s * 0.8, -s * 0.38, s * 1.6, s * 0.76);
    ctx.fill();
    ctx.strokeStyle = "#1e40af";
    ctx.lineWidth = 0.5;
    ctx.stroke();
    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(s * 0.8 + (s * 1.6 / 3) * i, -s * 0.38);
      ctx.lineTo(s * 0.8 + (s * 1.6 / 3) * i, s * 0.38);
      ctx.strokeStyle = "#1e40af66";
      ctx.stroke();
    }

    // Connector struts
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-s * 0.8, 0);
    ctx.lineTo(-s * 2.4, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(s * 0.8, 0);
    ctx.lineTo(s * 2.4, 0);
    ctx.stroke();

    // Body
    ctx.fillStyle = this.color;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(-s * 0.8, -s * 0.8, s * 1.6, s * 1.6, s * 0.2);
    } else {
      ctx.rect(-s * 0.8, -s * 0.8, s * 1.6, s * 1.6);
    }
    ctx.fill();

    // Antenna
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.8);
    ctx.lineTo(0, -s * 1.5);
    ctx.strokeStyle = "#d1d5db";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -s * 1.6, s * 0.18, 0, Math.PI * 2);
    ctx.fillStyle = "#d1d5db";
    ctx.fill();
  }

  drawVelocity(ctx, canvas) {
    if (!this.velocityDirection) return;
    const { px: screenX, py: screenY } = mathToPixels(this.x, this.y, canvas);
    drawVector(ctx, screenX, screenY, this.velocityDirection.x * VECTOR_LENGTH, -this.velocityDirection.y * VECTOR_LENGTH, "#22c55e");
  }

  drawAcceleration(ctx, canvas) {
    if (!this.accelerationDirection) return;
    const { px: screenX, py: screenY } = mathToPixels(this.x, this.y, canvas);
    drawVector(ctx, screenX, screenY, this.accelerationDirection.x * VECTOR_LENGTH, -this.accelerationDirection.y * VECTOR_LENGTH, "#ef4444");
  }

  updateKinematics(t) {
    const h = DERIVATIVE_STEP;
    let vx, vy, ax, ay;

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

  evaluateDirectSystem(t) {
    const scope = { ...this.directConstants, t };
    for (const equation of this.directSystem || []) {
      scope[equation.variable] = equation.fn(t, scope);
    }
    return scope;
  }
}

function normalizeEquationRows(equations) {
  return equations
    .map((eq) => ({
      variable: String(eq.variable || "").trim().toLowerCase(),
      expression: String(eq.expression || "").trim()
    }))
    .filter((eq) => /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(eq.variable) && eq.expression);
}

function advanceState(state, derivatives, dt) {
  const nextState = { ...state };
  Object.keys(derivatives).forEach((variable) => {
    nextState[variable] = (nextState[variable] ?? 0) + derivatives[variable] * dt;
  });
  return nextState;
}

function normalize(x, y) {
  const magnitude = Math.hypot(x, y);
  if (magnitude < 1e-9) return null;
  return { x: x / magnitude, y: y / magnitude };
}

function darkenColor(hex, amount) {
  try {
    const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - amount);
    const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - amount);
    const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - amount);
    return `rgb(${r},${g},${b})`;
  } catch {
    return hex;
  }
}
