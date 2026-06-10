// Lista 1 — MRUV: Velocidade e Aceleração
window.QUIZ_QUESTIONS = [

  // ── Q1 · Fácil · Múltipla escolha ──────────────────────────────────
  {
    type: 'objective',
    difficulty: 'fácil',
    text: 'Um carro percorre uma rodovia em linha reta com velocidade constante de 90 km/h. Qual é a aceleração desse carro?',
    options: [
      '1 m/s² — proporcional à velocidade',
      '25 m/s² — velocidade ao quadrado dividida por t',
      '0 m/s² — velocidade constante não gera aceleração',
      '90 m/s² — igual ao valor numérico da velocidade'
    ],
    correct: 2,
    explanation: 'Aceleração mede <em>variação</em> de velocidade. Se v é constante, Δv = 0 → a = Δv/Δt = 0. O carro está em MRU, não MRUV.'
  },

  // ── Q2 · Fácil · Numérica (ônibus) ─────────────────────────────────
  {
    type: 'numeric',
    difficulty: 'fácil',
    text: 'Um ônibus urbano parte do repouso e atinge 12 m/s em 8 s com aceleração uniforme. Qual é a aceleração média em m/s²?',
    answer: 1.5,
    tolerance: 0.1,
    unit: 'm/s²',
    explanation: 'a = (v − v₀) / t = (12 − 0) / 8 = 1,5 m/s².'
  },

  // ── Q3 · Médio · Múltipla escolha (análise de sinais) ──────────────
  {
    type: 'objective',
    difficulty: 'médio',
    text: 'Um objeto se move no sentido negativo (v &lt; 0) e tem aceleração também negativa (a &lt; 0). O que acontece com o módulo da velocidade ao longo do tempo?',
    options: [
      'Diminui — v e a têm sinais opostos; a aceleração freia o movimento',
      'Aumenta — v e a têm o mesmo sinal; a aceleração reforça o movimento',
      'Permanece constante — v e a iguais se cancelam',
      'O objeto para imediatamente'
    ],
    correct: 1,
    explanation: 'Quando v e a têm o <strong>mesmo sinal</strong> (ambos negativos), a aceleração reforça o movimento naquela direção: o objeto fica mais rápido nesse sentido e |v| cresce com o tempo. Sinais iguais → |v| aumenta; sinais opostos → |v| diminui.'
  },

  // ── Q4 · Médio · Numérica (avião) ──────────────────────────────────
  {
    type: 'numeric',
    difficulty: 'médio',
    text: 'Um avião de carga precisa atingir 75 m/s para decolar. Partindo do repouso com aceleração constante de 2,5 m/s², em quantos segundos ele atinge essa velocidade?',
    answer: 30,
    tolerance: 0.5,
    unit: 's',
    explanation: 'v = v₀ + a·t → 75 = 0 + 2,5·t → t = 75 / 2,5 = 30 s.'
  },

  // ── Q5 · Médio · Múltipla escolha (frenagem) ───────────────────────
  {
    type: 'objective',
    difficulty: 'médio',
    text: 'Durante uma frenagem de emergência, um carro passa de 20 m/s para 0 em 4 s. Qual é a aceleração durante a frenagem?',
    options: [
      '+5 m/s² — o carro ainda se move para frente',
      '−20 m/s² — igual à velocidade inicial com sinal negativo',
      '−0,2 m/s² — resultado de −1/(v₀·t)',
      '−5 m/s² — aceleração oposta ao sentido do movimento'
    ],
    correct: 3,
    explanation: 'a = (v − v₀) / t = (0 − 20) / 4 = −5 m/s². O sinal negativo indica que a aceleração é oposta ao movimento (frenagem). v e a têm sinais opostos → |v| diminui até zero.'
  },

  // ── Q6 · Fácil · Numérica (trem) ───────────────────────────────────
  {
    type: 'numeric',
    difficulty: 'fácil',
    text: 'Um trem parte com v₀ = 15 m/s e mantém aceleração constante de 0,4 m/s². Qual é a velocidade em m/s após t = 25 s?',
    answer: 25,
    tolerance: 0.5,
    unit: 'm/s',
    explanation: 'v = v₀ + a·t = 15 + 0,4 × 25 = 15 + 10 = 25 m/s.'
  },

  // ── Q7 · Médio · Múltipla escolha (bola lançada — análise de sinais)
  {
    type: 'objective',
    difficulty: 'médio',
    text: 'Uma bola é lançada verticalmente para cima. Adotando ↑ como sentido positivo, durante a subida a velocidade é positiva (v &gt; 0). Qual é o sinal da aceleração gravitacional e o que isso implica para o módulo da velocidade?',
    options: [
      'a &gt; 0 — mesmo sinal que v; |v| aumenta durante a subida',
      'a = 0 — sem aceleração na subida; v permanece constante',
      'a &lt; 0 — sinais opostos; |v| diminui (a bola perde velocidade)',
      'a &gt; 0 — a bola acelera ao subir e desacelera ao descer'
    ],
    correct: 2,
    explanation: 'Com eixo ↑, a gravidade aponta para baixo: a = −g &lt; 0. Como v &gt; 0 e a &lt; 0, os sinais são <strong>opostos</strong> → a aceleração é contrária ao movimento → |v| diminui. A bola perde velocidade durante toda a subida.'
  },

  // ── Q8 · Médio · Discursiva (F1) ───────────────────────────────────
  {
    type: 'text',
    difficulty: 'médio',
    text: 'Explique, com suas próprias palavras, o que significa dizer que um carro de Fórmula 1 tem aceleração de 15 m/s². Mostre como a velocidade evoluiria nos primeiros 3 segundos, partindo do repouso.',
    model: 'Aceleração de 15 m/s² significa que a velocidade cresce 15 m/s a cada segundo. Partindo do repouso (v₀ = 0): após 1 s → v = 15 m/s; após 2 s → v = 30 m/s; após 3 s → v = 45 m/s. A fórmula v = v₀ + a·t = 0 + 15t resume essa progressão.'
  },

  // ── Q9 · Difícil · Múltipla escolha (inversão de sentido) ──────────
  {
    type: 'objective',
    difficulty: 'difícil',
    text: 'Um objeto tem v₀ = −12 m/s e aceleração constante a = +3 m/s². O que acontece com o <em>módulo</em> da velocidade ao longo do tempo?',
    options: [
      'Aumenta continuamente desde o início, pois a aceleração é positiva',
      'Diminui continuamente, pois a velocidade é negativa',
      'Primeiro diminui até zero (t = 4 s), depois aumenta',
      'Permanece constante em 12 m/s'
    ],
    correct: 2,
    explanation: 'v₀ = −12 m/s e a = +3 m/s²: sinais <strong>opostos</strong> → |v| diminui. Em t = 4 s, v = −12 + 3×4 = 0 (objeto para). Após t = 4 s, v &gt; 0 e a &gt; 0 (mesmo sinal) → |v| cresce novamente. O objeto inverte o sentido de movimento.'
  },

  // ── Q10 · Médio · Numérica (foguete) ───────────────────────────────
  {
    type: 'numeric',
    difficulty: 'médio',
    text: 'Um foguete parte do repouso com aceleração constante de 25 m/s² durante 6 s de combustão. Qual é a velocidade ao final desse intervalo (em m/s)?',
    answer: 150,
    tolerance: 1,
    unit: 'm/s',
    explanation: 'v = v₀ + a·t = 0 + 25 × 6 = 150 m/s.'
  },

  // ── Q11 · Médio · Múltipla escolha (carro freia) ───────────────────
  {
    type: 'objective',
    difficulty: 'médio',
    text: 'Um carro viaja a 24 m/s e aciona os freios com desaceleração constante de 4 m/s² (em módulo). Em quantos segundos ele para completamente?',
    options: ['4 s', '6 s', '8 s', '10 s'],
    correct: 1,
    explanation: 'v = v₀ + a·t → 0 = 24 + (−4)·t → t = 24/4 = 6 s. a = −4 m/s² (oposta ao movimento) e v = +24 m/s → sinais opostos → |v| diminui até zero.'
  },

  // ── Q12 · Fácil · Numérica (moto) ──────────────────────────────────
  {
    type: 'numeric',
    difficulty: 'fácil',
    text: 'Uma motocicleta parte do repouso e atinge 18 m/s em 9 s com aceleração uniforme. Qual é a aceleração (em m/s²)?',
    answer: 2,
    tolerance: 0.1,
    unit: 'm/s²',
    explanation: 'a = (v − v₀) / t = (18 − 0) / 9 = 2 m/s².'
  },

  // ── Q13 · Difícil · Múltipla escolha ───────────────────────────────
  {
    type: 'objective',
    difficulty: 'difícil',
    text: 'Um objeto tem v₀ = 18 m/s e a = −3 m/s². Qual é a velocidade em t = 8 s?',
    options: ['−6 m/s', '42 m/s', '6 m/s', '−42 m/s'],
    correct: 0,
    explanation: 'v = 18 + (−3) × 8 = 18 − 24 = −6 m/s. O objeto desacelerou (sinais opostos), parou em t = 6 s e depois acelerou no sentido negativo (sinais iguais após t = 6 s).'
  },

  // ── Q14 · Médio · Discursiva ────────────────────────────────────────
  {
    type: 'text',
    difficulty: 'médio',
    text: 'Um colega afirma: <em>"Se a aceleração de um objeto é zero, então ele está parado."</em> Você concorda? Escreva uma explicação completa e dê um exemplo do cotidiano.',
    model: 'Não concordo. Aceleração zero significa que a velocidade não está variando — não que o objeto está parado. Um carro na rodovia a 110 km/h com velocidade constante tem a = 0 (MRU). O repouso é um caso especial: v = 0 com a = 0, mas a = 0 sozinho apenas garante velocidade constante, que pode ser qualquer valor, inclusive zero.'
  },

  // ── Q15 · Médio · Numérica (metrô) ─────────────────────────────────
  {
    type: 'numeric',
    difficulty: 'médio',
    text: 'Um metrô sai do repouso com aceleração constante de 1,5 m/s². Em quantos segundos ele atinge 18 m/s?',
    answer: 12,
    tolerance: 0.5,
    unit: 's',
    explanation: 'v = v₀ + a·t → 18 = 0 + 1,5·t → t = 18 / 1,5 = 12 s.'
  },

  // ── Q16 · Difícil · Múltipla escolha (avião pouso) ─────────────────
  {
    type: 'objective',
    difficulty: 'difícil',
    text: 'Um avião comercial pousa com velocidade de 60 m/s e freia uniformemente até parar em 30 s. Qual é a aceleração de frenagem?',
    options: [
      '+2 m/s² — positiva, pois o avião ainda avança',
      '−0,5 m/s² — resultado de −t/v₀',
      '−2 m/s² — negativa, contrária ao sentido de pouso',
      '−30 m/s² — igual ao tempo com sinal negativo'
    ],
    correct: 2,
    explanation: 'a = (v − v₀) / t = (0 − 60) / 30 = −2 m/s². Sinais opostos: v = +60 m/s e a = −2 m/s² → |v| diminui até zero. O sinal negativo confirma que a aceleração é contrária ao movimento.'
  }

];
