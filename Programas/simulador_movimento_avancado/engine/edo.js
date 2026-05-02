// engine/edo.js
// Parser e resolvedor de Equacoes Diferenciais Ordinarias.

import { parseEquation } from './mathparser.js';

const MATH_IDENTIFIERS = new Set(['sin', 'sen', 'cos', 'tan', 'exp', 'log', 'sqrt', 'abs', 'pi', 'e']);
const IDENTIFIER_REGEX = /[a-zA-Z_][a-zA-Z0-9_]*/g;

export function parseEDOEquation(equationStr) {
  if (!equationStr || !equationStr.trim()) return null;

  const normalized = equationStr.toLowerCase().replace(/\s+/g, '');
  const equalIndex = normalized.indexOf('=');
  if (equalIndex === -1) return null;

  const lhs = normalized.substring(0, equalIndex);
  const rhs = normalized.substring(equalIndex + 1);
  const derivMatch = lhs.match(/^d([a-zA-Z_][a-zA-Z0-9_]*)\/dt$/);
  if (!derivMatch) return null;

  return {
    derivative: derivMatch[1],
    rhs
  };
}

export function parseEDOSystem(equations) {
  const parsedEquations = equations
    .map(parseEDOEquation)
    .filter(Boolean);

  const variables = new Set(parsedEquations.map((eq) => eq.derivative));
  const constants = new Set();

  parsedEquations.forEach((eq) => {
    for (const id of getIdentifiers(eq.rhs)) {
      if (!MATH_IDENTIFIERS.has(id) && id !== 't' && !variables.has(id)) {
        constants.add(id);
      }
    }
  });

  return {
    equations: parsedEquations,
    variables: Array.from(variables),
    constants: Array.from(constants),
    derivatives: new Map(parsedEquations.map((eq) => [eq.derivative, eq.derivative]))
  };
}

export class EDOSolver {
  constructor(system, initialValues, constants, algebraicEquations = []) {
    this.system = system;
    this.values = { ...initialValues };
    this.constants = { ...constants };
    this.algebraicEquations = algebraicEquations;
    this.time = 0;
    this.compiledEquations = this.compileSystem();
    this.compiledAlgebraicEquations = this.compileAlgebraicEquations();
  }

  compileSystem() {
    const compiled = new Map();

    for (const eq of this.system.equations) {
      try {
        compiled.set(eq.derivative, parseEquation(eq.rhs));
      } catch (e) {
        console.error(`Erro ao compilar equacao ${eq.derivative}:`, e);
      }
    }

    return compiled;
  }

  compileAlgebraicEquations() {
    return this.algebraicEquations.map((eq) => ({
      variable: eq.variable,
      fn: parseEquation(eq.expression)
    }));
  }

  getAlgebraicState(state = this.values, t = this.time) {
    const scope = { ...this.constants, ...state };
    for (const eq of this.compiledAlgebraicEquations) {
      const value = eq.fn(t, scope);
      scope[eq.variable] = Number.isFinite(value) ? value : 0;
    }
    return scope;
  }

  getDerivativeValue(derivative, state, t) {
    const func = this.compiledEquations.get(derivative);
    if (!func) return 0;

    const value = func(t, this.getAlgebraicState(state, t));
    return Number.isFinite(value) ? value : 0;
  }

  getDerivatives(state = this.values, t = this.time) {
    const derivatives = {};
    for (const eq of this.system.equations) {
      derivatives[eq.derivative] = this.getDerivativeValue(eq.derivative, state, t);
    }
    return derivatives;
  }

  step(dt) {
    const derivatives = this.system.equations.map((eq) => eq.derivative);
    if (derivatives.length === 0 || dt <= 0) return this.values;

    const k1 = {};
    for (const deriv of derivatives) {
      k1[deriv] = this.getDerivativeValue(deriv, this.values, this.time);
    }

    const state2 = { ...this.values };
    for (const deriv of derivatives) {
      state2[deriv] = this.values[deriv] + 0.5 * dt * k1[deriv];
    }

    const k2 = {};
    for (const deriv of derivatives) {
      k2[deriv] = this.getDerivativeValue(deriv, state2, this.time + 0.5 * dt);
    }

    const state3 = { ...this.values };
    for (const deriv of derivatives) {
      state3[deriv] = this.values[deriv] + 0.5 * dt * k2[deriv];
    }

    const k3 = {};
    for (const deriv of derivatives) {
      k3[deriv] = this.getDerivativeValue(deriv, state3, this.time + 0.5 * dt);
    }

    const state4 = { ...this.values };
    for (const deriv of derivatives) {
      state4[deriv] = this.values[deriv] + dt * k3[deriv];
    }

    const k4 = {};
    for (const deriv of derivatives) {
      k4[deriv] = this.getDerivativeValue(deriv, state4, this.time + dt);
    }

    for (const deriv of derivatives) {
      this.values[deriv] += (dt / 6) * (k1[deriv] + 2 * k2[deriv] + 2 * k3[deriv] + k4[deriv]);
    }

    this.time += dt;
    return this.values;
  }

  solve(finalTime, maxStep = 0.001) {
    const dt = finalTime - this.time;
    const steps = Math.ceil(Math.max(0, dt) / maxStep);
    if (steps === 0) return { time: this.time, values: { ...this.values } };

    const actualStep = dt / steps;
    for (let i = 0; i < steps; i++) {
      this.step(actualStep);
    }

    return {
      time: this.time,
      values: { ...this.values }
    };
  }

  reset(initialValues, constants) {
    this.values = { ...initialValues };
    this.constants = { ...constants };
    this.time = 0;
  }

  getState() {
    return { ...this.values };
  }

  getTime() {
    return this.time;
  }
}

export function createEDOSolverFromModal(dxEq, dvEq, x0, v0, constants) {
  const equations = [];

  if (dxEq && dxEq.trim()) equations.push(`dx/dt = ${dxEq}`);
  if (dvEq && dvEq.trim()) equations.push(`dv/dt = ${dvEq}`);
  if (equations.length === 0) return null;

  const system = parseEDOSystem(equations);
  if (system.variables.length === 0) return null;

  const initialValues = {};
  for (const variable of system.variables) {
    if (variable === 'x' || variable === 'x1') initialValues[variable] = x0 ?? 0;
    else if (variable === 'v' || variable === 'x2') initialValues[variable] = v0 ?? 0;
    else initialValues[variable] = 0;
  }

  return new EDOSolver(system, initialValues, constants);
}

function getIdentifiers(expression) {
  const ids = [];
  let match;
  IDENTIFIER_REGEX.lastIndex = 0;
  while ((match = IDENTIFIER_REGEX.exec(expression)) !== null) {
    ids.push(match[0]);
  }
  return ids;
}
