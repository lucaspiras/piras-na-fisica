// Constante de Coulomb: k = 9 × 10⁹ N⋅m²/C²
export const k = 9e9;

/**
 * Força elétrica que c2 exerce sobre c1 (Lei de Coulomb vetorial).
 * @param {Charge} c1
 * @param {Charge} c2
 * @param {number} metersPerPixel  metros por pixel da escala atual
 * @returns {{x: number, y: number}} força em Newtons
 */
export function computeForce(c1, c2, metersPerPixel) {
  const dx = -(c2.x - c1.x) * metersPerPixel;
  const dy =  (c2.y - c1.y) * metersPerPixel;
  const distSq = dx * dx + dy * dy;
  if (distSq < 1e-12) return { x: 0, y: 0 };
  const dist = Math.sqrt(distSq);
  const F = k * c1.q * c2.q / distSq;
  return { x: F * dx / dist, y: F * dy / dist };
}

/**
 * Força resultante sobre `target` devida a todas as outras cargas.
 * @param {Charge} target
 * @param {Charge[]} charges
 * @param {number} metersPerPixel
 * @returns {{fx: number, fy: number}} força resultante em Newtons
 */
export function computeNetForce(target, charges, metersPerPixel) {
  let fx = 0, fy = 0;
  charges.forEach(c => {
    if (c !== target) {
      const f = computeForce(target, c, metersPerPixel);
      fx += f.x;
      fy += f.y;
    }
  });
  return { fx, fy };
}

/**
 * Campo elétrico em um ponto (x, y) em pixels, em N/C.
 * @param {number} x  coordenada x no canvas (pixels)
 * @param {number} y  coordenada y no canvas (pixels)
 * @param {Charge[]} charges
 * @param {number} metersPerPixel
 * @returns {{Ex: number, Ey: number}}
 */
export function computeFieldAt(x, y, charges, metersPerPixel) {
  let Ex = 0, Ey = 0;
  charges.forEach(c => {
    const dx = (x - c.x) * metersPerPixel;
    const dy = (y - c.y) * metersPerPixel;
    const distSq = dx * dx + dy * dy;
    if (distSq < 1e-12) return;
    const dist = Math.sqrt(distSq);
    const E = k * c.q / distSq;
    Ex += E * dx / dist;
    Ey += E * dy / dist;
  });
  return { Ex, Ey };
}
