// engine/mathparser.js

export function parseEquation(expr) {
  return new Function("t", `
    const sin = Math.sin;
    const cos = Math.cos;
    const tan = Math.tan;
    const exp = Math.exp;
    const log = Math.log;
    const sqrt = Math.sqrt;
    const abs = Math.abs;
    const pi = Math.PI;
    return ${expr};
  `);
}
