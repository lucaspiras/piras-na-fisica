// Lista 1 — Circuitos Elétricos Simples
// Cobre os temas da apresentação: circuito, tensão e ddp, corrente,
// resistência e resistividade, Lei de Ohm e potência.
// 6 questões teóricas (4 objetivas + 2 discursivas) e 14 de cálculo.
window.QUIZ_QUESTIONS = [

  // ══════════════ TEÓRICAS ══════════════

  // ── Q1 · Fácil · Teórica — a corrente não se gasta ─────────────────
  {
    type: 'objective',
    difficulty: 'fácil',
    text: 'Num circuito simples com uma pilha e uma lâmpada, liga-se um amperímetro logo <em>antes</em> da lâmpada e outro logo <em>depois</em> dela. O que eles marcam?',
    options: [
      'O de antes marca mais, porque parte da corrente é consumida pela lâmpada',
      'Os dois marcam o mesmo valor, porque a carga não é consumida — o que a lâmpada consome é energia',
      'O de depois marca mais, porque a lâmpada acelera as cargas',
      'O de depois marca zero, porque toda a corrente foi usada'
    ],
    correct: 1,
    explanation: 'A corrente é a <strong>mesma em todos os pontos</strong> de um circuito simples: o que sai de um polo chega inteiro ao outro. A lâmpada não consome carga, consome <strong>energia</strong> — que ela converte em luz e calor. Carga circula e volta; energia é entregue no caminho.'
  },

  // ── Q2 · Fácil · Teórica — portadores de carga ─────────────────────
  {
    type: 'objective',
    difficulty: 'fácil',
    text: 'Em qual das situações a corrente elétrica é formada <strong>apenas</strong> por cargas negativas em movimento?',
    options: [
      'Numa solução de água com sal',
      'Num fio de cobre',
      'Num raio atravessando o ar',
      'Numa lâmpada fluorescente acesa'
    ],
    correct: 1,
    explanation: 'No metal só os <strong>elétrons livres</strong> se movem; os núcleos ficam presos na rede. Já na água salgada os dois sinais se movem ao mesmo tempo (Na⁺ para um lado, Cl⁻ para o outro) e as contribuições se somam. No raio e na fluorescente, o gás ionizado conduz com íons e elétrons juntos.'
  },

  // ── Q3 · Médio · Teórica — velocidade de deriva ────────────────────
  {
    type: 'objective',
    difficulty: 'médio',
    text: 'Você aciona o interruptor e a lâmpada acende praticamente na hora, embora cada elétron avance apenas alguns centímetros por hora dentro do fio. Como explicar isso?',
    options: [
      'O fio já está cheio de elétrons, e o campo elétrico os põe em movimento quase ao mesmo tempo em toda a extensão',
      'Os elétrons viajam perto da velocidade da luz até chegarem à lâmpada',
      'A pilha injeta elétrons novos no fio, e são eles que viajam rápido',
      'A corrente só parece instantânea; na verdade há um atraso de alguns segundos'
    ],
    correct: 0,
    explanation: 'Ligar o interruptor não coloca elétrons no fio: o fio já está cheio deles. O que corre a perto de 200 mil km/s não é o elétron, é o <strong>campo elétrico</strong>, que põe todos a marchar quase ao mesmo tempo. É um cano já cheio de bolinhas: empurre uma de um lado e outra sai do outro no mesmo instante.'
  },

  // ── Q4 · Médio · Teórica — ôhmico × não-ôhmico ─────────────────────
  {
    type: 'objective',
    difficulty: 'médio',
    text: 'O gráfico V × i de um componente resulta numa <em>curva</em>, e não numa reta. O que se conclui?',
    options: [
      'O componente tem resistência nula',
      'A Lei de Ohm foi violada, o que é impossível',
      'O componente não é ôhmico: sua resistência muda conforme a corrente',
      'O componente está com defeito e deve ser trocado'
    ],
    correct: 2,
    explanation: 'Num condutor <strong>ôhmico</strong> o gráfico V × i é uma reta, e a resistência é a inclinação — constante. Quando a curva entorta, a resistência varia, e a Lei de Ohm não se aplica. É o caso do filamento de uma lâmpada, cuja resistência sobe com a temperatura. A Lei de Ohm não é violada: ela simplesmente vale apenas para materiais ôhmicos.'
  },

  // ── Q5 · Médio · Teórica discursiva — tensão × corrente ────────────
  {
    type: 'text',
    difficulty: 'médio',
    text: 'Explique por que se diz que a pilha <strong>fornece tensão</strong>, e não que ela "fornece corrente". Dê um exemplo em que a mesma pilha produz correntes diferentes.',
    model: 'A pilha mantém uma diferença de potencial fixa entre seus polos — é isso que ela oferece ao circuito. A corrente não é uma reserva guardada na pilha: ela é uma consequência, e quem a determina é o circuito ligado, pela relação i = V/R. Exemplo: uma pilha de 1,5 V ligada a um resistor de 10 Ω produz i = 1,5/10 = 0,15 A; a mesma pilha ligada a um resistor de 30 Ω produz i = 1,5/30 = 0,05 A. A tensão é a mesma nos dois casos, e a corrente cai a um terço porque a resistência triplicou.'
  },

  // ── Q6 · Difícil · Teórica discursiva — sentido convencional ───────
  {
    type: 'text',
    difficulty: 'difícil',
    text: 'Num fio metálico os elétrons se movem do polo negativo para o positivo, mas o <strong>sentido convencional</strong> da corrente é o oposto. Por que essa convenção não atrapalha os cálculos, e por que ela é útil justamente quando os portadores <em>não</em> são elétrons?',
    model: 'A convenção foi fixada no século XVIII, antes de o elétron ser conhecido, e sobreviveu porque funciona. Uma carga negativa indo para a esquerda é eletricamente equivalente a uma carga positiva indo para a direita: o transporte de carga é o mesmo, e todas as contas de corrente, tensão e potência dão o mesmo resultado. A utilidade fica clara quando os portadores não são elétrons. Numa solução de água salgada, Na⁺ e Cl⁻ se movem ao mesmo tempo e em sentidos opostos, e num gás ionizado íons e elétrons conduzem juntos. Definir o sentido pelo que uma carga positiva faria dá uma regra única, válida nos três casos, mesmo quando quem se move é negativo ou quando se movem os dois.'
  },

  // ══════════════ CÁLCULO ══════════════

  // ── Q7 · Fácil · i = Q/t ───────────────────────────────────────────
  {
    type: 'numeric',
    difficulty: 'fácil',
    text: 'Por uma seção de um fio passam 90 C de carga em 1 minuto. Qual é a intensidade da corrente elétrica?',
    answer: 1.5,
    tolerance: 0.05,
    unit: 'A',
    explanation: 'i = Q / t. Atenção à unidade de tempo: 1 minuto = 60 s. Logo i = 90 / 60 = <strong>1,5 A</strong>.'
  },

  // ── Q8 · Fácil · Q = i·t ───────────────────────────────────────────
  {
    type: 'numeric',
    difficulty: 'fácil',
    text: 'Uma corrente de 0,25 A percorre um circuito durante 4 minutos. Quanta carga atravessou uma seção do fio nesse intervalo?',
    answer: 60,
    tolerance: 1,
    unit: 'C',
    explanation: 'De i = Q/t vem Q = i · t. Com t = 4 min = 240 s: Q = 0,25 · 240 = <strong>60 C</strong>.'
  },

  // ── Q9 · Fácil · U = E/q ───────────────────────────────────────────
  {
    type: 'numeric',
    difficulty: 'fácil',
    text: 'Uma fonte entrega 36 J de energia a cada 3 C de carga que a atravessa. Qual é a ddp entre seus polos?',
    answer: 12,
    tolerance: 0.2,
    unit: 'V',
    explanation: 'U = E / q = 36 / 3 = <strong>12 V</strong>. É o que significa 1 volt: 1 joule entregue a cada coulomb de carga.'
  },

  // ── Q10 · Fácil · E = U·q ──────────────────────────────────────────
  {
    type: 'numeric',
    difficulty: 'fácil',
    text: 'Uma pilha de 1,5 V é atravessada por 20 C de carga. Quanta energia ela entrega a essas cargas?',
    answer: 30,
    tolerance: 0.5,
    unit: 'J',
    explanation: 'De U = E/q vem E = U · q = 1,5 · 20 = <strong>30 J</strong>.'
  },

  // ── Q11 · Fácil · Lei de Ohm (i) ───────────────────────────────────
  {
    type: 'numeric',
    difficulty: 'fácil',
    text: 'Um resistor de 220 Ω é ligado a uma tomada de 110 V. Qual é a corrente que o percorre?',
    answer: 0.5,
    tolerance: 0.02,
    unit: 'A',
    explanation: 'V = R · i → i = V / R = 110 / 220 = <strong>0,5 A</strong>.'
  },

  // ── Q12 · Médio · Lei de Ohm (R) ───────────────────────────────────
  {
    type: 'numeric',
    difficulty: 'médio',
    text: 'Um chuveiro elétrico puxa 25 A quando ligado a 220 V. Qual é a resistência da sua resistência de aquecimento?',
    answer: 8.8,
    tolerance: 0.2,
    unit: 'Ω',
    explanation: 'V = R · i → R = V / i = 220 / 25 = <strong>8,8 Ω</strong>. Resistência baixa, corrente alta: é isso que faz o chuveiro esquentar tanto.'
  },

  // ── Q13 · Médio · Lei de Ohm (V) ───────────────────────────────────
  {
    type: 'numeric',
    difficulty: 'médio',
    text: 'Uma corrente de 0,3 A atravessa um resistor de 150 Ω. Qual é a ddp entre os terminais desse resistor?',
    answer: 45,
    tolerance: 1,
    unit: 'V',
    explanation: 'V = R · i = 150 · 0,3 = <strong>45 V</strong>.'
  },

  // ── Q14 · Difícil · Resistividade R = ρL/A ─────────────────────────
  {
    type: 'numeric',
    difficulty: 'difícil',
    text: 'Um fio de cobre tem 20 m de comprimento e secção de 2 mm². A resistividade do cobre é 1,7 × 10⁻⁸ Ω·m. Qual é a resistência desse fio?',
    answer: 0.17,
    tolerance: 0.01,
    unit: 'Ω',
    explanation: 'R = ρL / A. O tropeço está na unidade da área: 2 mm² = 2 × 10⁻⁶ m². Então R = (1,7 × 10⁻⁸ · 20) / (2 × 10⁻⁶) = (3,4 × 10⁻⁷) / (2 × 10⁻⁶) = <strong>0,17 Ω</strong>. Bem pequena — é para isso que servem os fios.'
  },

  // ── Q15 · Médio · Proporcionalidade R ∝ L ──────────────────────────
  {
    type: 'objective',
    difficulty: 'médio',
    text: 'Dois fios do mesmo material e da mesma espessura têm comprimentos L e 3L. Comparada à do fio curto, a resistência do fio longo é:',
    options: [
      'a mesma, porque o material é o mesmo',
      'o triplo',
      'um terço',
      'nove vezes maior'
    ],
    correct: 1,
    explanation: 'Em R = ρL/A, com ρ e A fixos, a resistência é <strong>proporcional ao comprimento</strong>. Triplicar L triplica R. Cabe notar que a área entra dividindo: engrossar o fio <em>reduz</em> a resistência.'
  },

  // ── Q16 · Médio · P = V·i ──────────────────────────────────────────
  {
    type: 'numeric',
    difficulty: 'médio',
    text: 'Um secador de cabelo ligado em 127 V puxa uma corrente de 12 A. Qual é a sua potência?',
    answer: 1524,
    tolerance: 10,
    unit: 'W',
    explanation: 'P = V · i = 127 · 12 = <strong>1524 W</strong>, ou cerca de 1,5 kW.'
  },

  // ── Q17 · Médio · P = R·i² ─────────────────────────────────────────
  {
    type: 'objective',
    difficulty: 'médio',
    text: 'Um resistor de 20 Ω é percorrido por uma corrente de 3 A. Qual é a potência dissipada por efeito Joule?',
    options: [
      '60 W',
      '180 W',
      '6,7 W',
      '23 W'
    ],
    correct: 1,
    explanation: 'P = R · i² = 20 · 3² = 20 · 9 = <strong>180 W</strong>. O erro mais comum é fazer R · i = 60 W, esquecendo que a corrente entra ao quadrado. Dobrar a corrente quadruplica o calor dissipado.'
  },

  // ── Q18 · Médio · i a partir de P e V ──────────────────────────────
  {
    type: 'numeric',
    difficulty: 'médio',
    text: 'Um chuveiro de 5500 W é ligado na rede de 220 V. Qual é a corrente que ele exige?',
    answer: 25,
    tolerance: 0.5,
    unit: 'A',
    explanation: 'De P = V · i vem i = P / V = 5500 / 220 = <strong>25 A</strong>. É por isso que chuveiro pede fiação grossa e disjuntor próprio.'
  },

  // ── Q19 · Difícil · Gráfico V × i ──────────────────────────────────
  {
    type: 'objective',
    difficulty: 'difícil',
    text: 'No gráfico V × i de um condutor ôhmico, o ponto (0,4 A ; 10 V) pertence à reta. Qual é a resistência desse condutor?',
    options: [
      '4 Ω',
      '0,04 Ω',
      '25 Ω',
      '10 Ω'
    ],
    correct: 2,
    explanation: 'Num condutor ôhmico a resistência é a <strong>inclinação</strong> da reta V × i: R = V / i = 10 / 0,4 = <strong>25 Ω</strong>. Como a reta passa pela origem, qualquer outro ponto dela daria o mesmo valor — é justamente isso que significa "resistência constante".'
  },

  // ── Q20 · Difícil · Energia e custo ────────────────────────────────
  {
    type: 'numeric',
    difficulty: 'difícil',
    text: 'Um chuveiro de 5,5 kW é usado 20 minutos por dia. Com a energia elétrica a R$ 0,80 o kWh, qual é o gasto ao fim de 30 dias? Responda em reais.',
    answer: 44,
    tolerance: 1,
    unit: 'R$',
    explanation: 'Em 30 dias o chuveiro fica ligado 30 · 20 min = 600 min = <strong>10 h</strong>. Energia: E = P · t = 5,5 kW · 10 h = 55 kWh. Custo: 55 · 0,80 = <strong>R$ 44,00</strong>. Repare que a conta só fecha com a potência em kW e o tempo em horas — é para isso que existe o kWh.'
  }

];
