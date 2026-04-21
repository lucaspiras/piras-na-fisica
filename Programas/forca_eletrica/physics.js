// =================== CONSTANTES ===================
export const k = 9e9;
export const scale = 0.01;

// =================== FUNÇÕES ===================

// força entre duas cargas
export function computeForce(c1, c2) {
  const dx = (c2.x - c1.x) * scale;
  const dy = (c2.y - c1.y) * scale;

  const distSq = dx*dx + dy*dy;
  if (distSq < 1e-6) return {x:0, y:0};

  const dist = Math.sqrt(distSq);
  const F = k * c1.q * c2.q / distSq;

  return {
    x: F * dx / dist,
    y: F * dy / dist
  };
}

// força resultante
export function computeNetForce(target, charges) {
  let fx = 0, fy = 0;

  charges.forEach(c => {
    if (c !== target) {
      const f = computeForce(target, c);
      fx += f.x;
      fy += f.y;
    }
  });

  return {fx, fy};
}

// campo elétrico
export function computeFieldAt(x, y, charges) {
  let Ex = 0, Ey = 0;

  charges.forEach(c => {
    const dx = (x - c.x) * scale;
    const dy = (y - c.y) * scale;

    const distSq = dx*dx + dy*dy;
    if (distSq < 1e-6) return;

    const dist = Math.sqrt(distSq);
    const E = k * c.q / distSq;

    Ex += E * dx / dist;
    Ey += E * dy / dist;
  });

  return {Ex, Ey};
}