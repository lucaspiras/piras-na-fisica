// =================== CONSTANTES ===================
// Constante de Coulomb: k = 9 × 10⁹ N⋅m²/C²
// Usada na fórmula da força/campo elétrico: F = k * q1 * q2 / r²
export const k = 9e9;

// Fator de escala de pixels para metros
// scale = 0.01 significa que 1 pixel = 0.01 m = 1 cm
// Isso permite trabalhar com unidades físicas reais enquanto desenhamos no canvas
export const scale = 0.01;

// =================== FUNÇÕES ===================

/**
 * Calcula a força elétrica que a carga c2 exerce sobre a carga c1
 * Usa a Lei de Coulomb em forma vetorial
 * 
 * @param {Charge} c1 - Carga que sofre a força (carga teste)
 * @param {Charge} c2 - Carga que causa a força (carga fonte)
 * @returns {Object} Objeto com componentes {x, y} da força em Newtons
 * 
 * Funcionamento:
 * 1. Calcula o deslocamento (dx, dy) entre as duas cargas
 * 2. Inverte o sinal de dx para corrigir o sistema de coordenadas do canvas
 * 3. Verifica se as cargas estão muito próximas (singularidade)
 * 4. Calcula a magnitude da força usando F = k * q1 * q2 / r²
 * 5. Decompõe em componentes x e y dividindo pela distância
 */
export function computeForce(c1, c2) {
  // Calcula distância em metros (deslocamento canvas × escala, com inversão em x)
  const dx = -(c2.x - c1.x) * scale;
  const dy = (c2.y - c1.y) * scale;

  // Calcula a distância ao quadrado (mais eficiente que raiz quadrada quando possível)
  const distSq = dx*dx + dy*dy;
  
  // Evita divisão por zero: se as cargas estão no mesmo ponto, força = 0
  if (distSq < 1e-6) return {x:0, y:0};

  // Calcula a distância real extraindo a raiz quadrada
  const dist = Math.sqrt(distSq);
  
  // Calcula a magnitude da força elétrica pela Lei de Coulomb
  // F = k * q1 * q2 / r²
  const F = k * c1.q * c2.q / distSq;

  // Retorna os componentes da força em Newtons
  // Multiplica a magnitude F pelo vetor unitário (dx/dist, dy/dist)
  return {
    x: F * dx / dist,
    y: F * dy / dist
  };
}

/**
 * Calcula a força elétrica resultante que atua sobre uma carga
 * Soma as forças de todas as outras cargas presentes
 * 
 * @param {Charge} target - A carga sobre a qual queremos calcular a força resultante
 * @param {Array<Charge>} charges - Array com todas as cargas do sistema
 * @returns {Object} Objeto com força resultante {fx, fy} em Newtons
 * 
 * Funcionamento:
 * 1. Inicializa fx e fy com zero
 * 2. Para cada carga do sistema (exceto a carga alvo):
 *    - Calcula a força que essa carga exerce sobre a carga alvo
 *    - Soma aos componentes totais
 * 3. Retorna o somatório das forças
 */
export function computeNetForce(target, charges) {
  // Inicializa componentes da força resultante
  let fx = 0, fy = 0;

  // Itera sobre todas as cargas do sistema
  charges.forEach(c => {
    // Ignora a carga alvo (não exerce força sobre si mesma)
    if (c !== target) {
      // Calcula a força que a carga c exerce sobre target
      const f = computeForce(target, c);
      
      // Soma aos componentes totais
      fx += f.x;
      fy += f.y;
    }
  });

  // Retorna a força resultante em Newtons
  return {fx, fy};
}

/**
 * Calcula o campo elétrico em um ponto específico do espaço
 * O campo elétrico é a superposição dos campos de todas as cargas presentes
 * Definição: E = F/q, onde F é a força sobre uma carga de prova q
 * 
 * @param {number} x - Coordenada x do ponto em pixels (coordenada do canvas)
 * @param {number} y - Coordenada y do ponto em pixels (coordenada do canvas)
 * @param {Array<Charge>} charges - Array com todas as cargas do sistema
 * @returns {Object} Objeto com campo elétrico {Ex, Ey} em N/C
 * 
 * Funcionamento:
 * 1. Para cada carga no sistema:
 *    - Calcula o vetor deslocamento do ponto até a carga
 *    - Calcula a magnitude do campo usando E = k * q / r²
 *    - Decompõe em componentes x e y
 * 2. Soma todos os campos (superposição)
 * 3. Retorna o campo resultante
 */
export function computeFieldAt(x, y, charges) {
  // Inicializa componentes do campo elétrico
  let Ex = 0, Ey = 0;

  // Itera sobre todas as cargas do sistema
  charges.forEach(c => {
    // Calcula deslocamento do ponto até a carga (em metros)
    const dx = (x - c.x) * scale;
    const dy = (y - c.y) * scale;

    // Calcula a distância ao quadrado
    const distSq = dx*dx + dy*dy;
    
    // Evita singularidade: se o ponto está muito próximo da carga
    if (distSq < 1e-6) return;

    // Calcula a distância real
    const dist = Math.sqrt(distSq);
    
    // Calcula a magnitude do campo pela Lei de Coulomb
    // E = k * q / r²
    const E = k * c.q / distSq;

    // Soma os componentes do campo desta carga ao total
    // Multiplica a magnitude E pelo vetor unitário (dx/dist, dy/dist)
    Ex += E * dx / dist;
    Ey += E * dy / dist;
  });

  // Retorna o campo elétrico resultante em N/C
  return {Ex, Ey};
}