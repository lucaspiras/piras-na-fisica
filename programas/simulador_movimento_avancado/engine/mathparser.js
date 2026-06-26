// engine/mathparser.js

export function parseEquation(expr) {
  const normalizedExpr = normalizeExpression(expr);
  const fn = new Function("scope", `
    const sin = Math.sin;
    const sen = Math.sin;
    const cos = Math.cos;
    const tan = Math.tan;
    const exp = Math.exp;
    const log = Math.log;
    const sqrt = Math.sqrt;
    const abs = Math.abs;
    const pi = Math.PI;
    const e = Math.E;
    with (scope) {
      return ${normalizedExpr};
    }
  `);

  return (t, scope = {}) => fn({ ...scope, t });
}

function normalizeExpression(expr) {
  return String(expr)
    .replace(/\bsen\s*\(/gi, "sin(")
    .replace(/(\b[a-zA-Z_][a-zA-Z0-9_]*|\))\.(?=(sin|sen|cos|tan|exp|log|sqrt|abs)\s*\()/gi, "$1*");
}
