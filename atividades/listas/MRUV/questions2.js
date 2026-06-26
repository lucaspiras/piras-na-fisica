// Lista 2 — MRUV: Velocidade Média
window.QUIZ_QUESTIONS = [

  // ── Q1 · Fácil · Múltipla escolha ──────────────────────────────────
  {
    type: 'objective',
    difficulty: 'fácil',
    text: 'No MRUV, a velocidade média de um intervalo de movimento é calculada como:',
    options: [
      'v<sub>m</sub> = v₀ · v',
      'v<sub>m</sub> = (v₀ + v) / 2',
      'v<sub>m</sub> = v − v₀',
      'v<sub>m</sub> = v₀ + v'
    ],
    correct: 1,
    explanation: 'No MRUV a velocidade varia linearmente com o tempo. A média de uma função linear é a média aritmética dos extremos: v<sub>m</sub> = (v₀ + v) / 2.'
  },

  // ── Q2 · Fácil · Numérica (carro) ──────────────────────────────────
  {
    type: 'numeric',
    difficulty: 'fácil',
    text: 'Um carro acelera uniformemente de v₀ = 0 até v = 24 m/s. Qual é a velocidade média durante esse intervalo (em m/s)?',
    answer: 12,
    tolerance: 0.5,
    unit: 'm/s',
    explanation: 'v<sub>m</sub> = (v₀ + v) / 2 = (0 + 24) / 2 = 12 m/s.'
  },

  // ── Q3 · Fácil · Numérica (trem) ───────────────────────────────────
  {
    type: 'numeric',
    difficulty: 'fácil',
    text: 'Um trem acelera uniformemente de 10 m/s a 30 m/s em 15 s. Qual é o deslocamento percorrido (em m)?',
    answer: 300,
    tolerance: 2,
    unit: 'm',
    explanation: 'v<sub>m</sub> = (10 + 30) / 2 = 20 m/s; ΔS = v<sub>m</sub> · t = 20 × 15 = 300 m.'
  },

  // ── Q4 · Médio · Múltipla escolha ──────────────────────────────────
  {
    type: 'objective',
    difficulty: 'médio',
    text: 'A fórmula v<sub>m</sub> = (v₀ + v) / 2 é válida para calcular a velocidade média <em>somente no MRUV</em> porque:',
    options: [
      'No MRUV a velocidade é constante, tornando a fórmula trivial',
      'A aceleração constante garante variação linear de v — a média de uma função linear é a média dos extremos',
      'É uma fórmula experimental válida somente em condições de laboratório',
      'No MRUV o deslocamento é sempre igual a v₀ × t'
    ],
    correct: 1,
    explanation: 'A média temporal coincide com a média aritmética dos extremos apenas quando a grandeza varia linearmente. Com aceleração constante (MRUV), a velocidade é linear em t. Em movimentos com aceleração variável, a fórmula não se aplica.'
  },

  // ── Q5 · Médio · Numérica (ônibus) ─────────────────────────────────
  {
    type: 'numeric',
    difficulty: 'médio',
    text: 'Um ônibus parte do repouso (v₀ = 0) e percorre 200 m em 20 s com aceleração uniforme. Qual é a velocidade final (em m/s)?',
    answer: 20,
    tolerance: 0.5,
    unit: 'm/s',
    explanation: 'v<sub>m</sub> = ΔS / t = 200 / 20 = 10 m/s. Como v₀ = 0: v<sub>m</sub> = v / 2 → v = 2 × 10 = 20 m/s.'
  },

  // ── Q6 · Médio · Numérica (carro frenando) ─────────────────────────
  {
    type: 'numeric',
    difficulty: 'médio',
    text: 'Um carro freia uniformemente de 20 m/s até parar em 8 s. Qual foi o comprimento da faixa de frenagem (em m)?',
    answer: 80,
    tolerance: 2,
    unit: 'm',
    explanation: 'v<sub>m</sub> = (20 + 0) / 2 = 10 m/s; ΔS = v<sub>m</sub> · t = 10 × 8 = 80 m.'
  },

  // ── Q7 · Médio · Múltipla escolha (ciclista) ───────────────────────
  {
    type: 'objective',
    difficulty: 'médio',
    text: 'Um ciclista acelera uniformemente de 2 m/s a 10 m/s durante uma descida. Qual é a velocidade média nesse intervalo?',
    options: ['2 m/s', '6 m/s', '8 m/s', '10 m/s'],
    correct: 1,
    explanation: 'v<sub>m</sub> = (2 + 10) / 2 = 6 m/s. A velocidade média é a média aritmética das velocidades inicial e final no MRUV.'
  },

  // ── Q8 · Médio · Numérica (avião decolagem) ────────────────────────
  {
    type: 'numeric',
    difficulty: 'médio',
    text: 'Um avião parte do repouso e percorre 2.400 m de pista em 40 s com aceleração constante para decolar. Qual é a velocidade de decolagem (em m/s)?',
    answer: 120,
    tolerance: 2,
    unit: 'm/s',
    explanation: 'v<sub>m</sub> = ΔS / t = 2400 / 40 = 60 m/s. Como v₀ = 0: v = 2 × v<sub>m</sub> = 2 × 60 = 120 m/s.'
  },

  // ── Q9 · Difícil · Múltipla escolha ────────────────────────────────
  {
    type: 'objective',
    difficulty: 'difícil',
    text: 'Um objeto em MRUV tem v₀ = 8 m/s e v = 24 m/s após t = 4 s. Qual é o deslocamento durante esse intervalo?',
    options: ['32 m', '64 m', '96 m', '128 m'],
    correct: 1,
    explanation: 'v<sub>m</sub> = (8 + 24) / 2 = 16 m/s; ΔS = v<sub>m</sub> · t = 16 × 4 = 64 m.'
  },

  // ── Q10 · Difícil · Numérica (carro de corrida) ────────────────────
  {
    type: 'numeric',
    difficulty: 'difícil',
    text: 'Um carro de corrida aumenta sua velocidade de 40 m/s para 70 m/s em 5 s com aceleração uniforme. Qual é o deslocamento durante essa aceleração (em m)?',
    answer: 275,
    tolerance: 2,
    unit: 'm',
    explanation: 'v<sub>m</sub> = (40 + 70) / 2 = 55 m/s; ΔS = 55 × 5 = 275 m.'
  },

  // ── Q11 · Difícil · Numérica ────────────────────────────────────────
  {
    type: 'numeric',
    difficulty: 'difícil',
    text: 'Em um MRUV, um objeto percorreu ΔS = 280 m em t = 8 s, sendo v₀ = 10 m/s. Qual é a velocidade final (em m/s)?',
    answer: 60,
    tolerance: 1,
    unit: 'm/s',
    explanation: 'v<sub>m</sub> = ΔS / t = 280 / 8 = 35 m/s. Da fórmula: v = 2·v<sub>m</sub> − v₀ = 2 × 35 − 10 = 60 m/s.'
  },

  // ── Q12 · Médio · Discursiva (metrô) ───────────────────────────────
  {
    type: 'text',
    difficulty: 'médio',
    text: 'Um metrô parte do repouso e percorre 360 m em 24 s. Um estudante calculou v<sub>m</sub> = 360 / 24 = 15 m/s e depois encontrou a velocidade final v = 30 m/s. Descreva detalhadamente o raciocínio completo que o estudante usou para chegar à velocidade final.',
    model: 'O estudante usou dois passos encadeados: (1) calculou a velocidade média pela definição geral v<sub>m</sub> = ΔS/t = 360/24 = 15 m/s; (2) aproveitou que, no MRUV com v₀ = 0, vale v<sub>m</sub> = (0 + v)/2, portanto v = 2·v<sub>m</sub> = 2 × 15 = 30 m/s. O resultado é correto: a velocidade final do metrô é 30 m/s.'
  },

  // ── Q13 · Difícil · Numérica (foguete) ─────────────────────────────
  {
    type: 'numeric',
    difficulty: 'difícil',
    text: 'Um foguete tem v₀ = 200 m/s e, com aceleração uniforme, percorre 12.000 m em 40 s. Qual é a velocidade final (em m/s)?',
    answer: 400,
    tolerance: 2,
    unit: 'm/s',
    explanation: 'v<sub>m</sub> = ΔS / t = 12000 / 40 = 300 m/s. Então: v = 2·v<sub>m</sub> − v₀ = 2 × 300 − 200 = 400 m/s.'
  },

  // ── Q14 · Difícil · Múltipla escolha ───────────────────────────────
  {
    type: 'objective',
    difficulty: 'difícil',
    text: 'No MRUV, um objeto parte do <em>repouso</em> (v₀ = 0) e percorre ΔS metros em t segundos com aceleração constante. Qual expressão fornece corretamente a velocidade final?',
    options: [
      'v = ΔS / t',
      'v = 2·ΔS / t',
      'v = ΔS / (2t)',
      'v = ΔS · t'
    ],
    correct: 1,
    explanation: 'v<sub>m</sub> = ΔS/t e, com v₀ = 0: v<sub>m</sub> = v/2. Então v/2 = ΔS/t → v = 2·ΔS/t.'
  },

  // ── Q15 · Fácil · Numérica (boliche) ───────────────────────────────
  {
    type: 'numeric',
    difficulty: 'fácil',
    text: 'Uma bola de boliche é lançada a 6 m/s e vai desacelerando uniformemente até parar após 6 s. Qual foi o deslocamento total (em m)?',
    answer: 18,
    tolerance: 0.5,
    unit: 'm',
    explanation: 'v<sub>m</sub> = (6 + 0) / 2 = 3 m/s; ΔS = v<sub>m</sub> · t = 3 × 6 = 18 m.'
  },

  // ── Q16 · Difícil · Discursiva ──────────────────────────────────────
  {
    type: 'text',
    difficulty: 'difícil',
    text: 'Um colega resolveu um problema assim: <em>"O objeto foi de 10 m/s a 30 m/s. A velocidade média é (10 + 30)/2 = 20 m/s, então em 5 s percorreu 20 × 5 = 100 m."</em> Ele acertou neste caso? A estratégia de calcular v<sub>m</sub> pela média aritmética dos extremos funciona em <strong>qualquer</strong> tipo de movimento? Justifique.',
    model: 'Ele acertou neste caso específico, pois se trata de um MRUV (aceleração constante). A média aritmética (10 + 30)/2 = 20 m/s coincide exatamente com a velocidade média temporal porque a velocidade varia linearmente. Porém, a estratégia NÃO funciona para qualquer movimento: em um MRNUV (aceleração variável), a velocidade não varia linearmente e a média aritmética dos extremos pode ser muito diferente da média temporal real.'
  }

];
