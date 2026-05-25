// quiz.js — Questões e motor de quiz — Unidades de Medida

(function () {
  'use strict';

  function stripHtmlLocal(str) {
    return str.replace(/<[^>]+>/g, '');
  }

  // ================================================================
  // BANCO DE QUESTÕES
  // ================================================================
  const QUIZZES = {

    quiz1: [
      {
        type: 'objective',
        text: 'O que é uma grandeza física?',
        options: [
          'Qualquer número associado a um fenômeno natural',
          'Uma propriedade mensurável de um fenômeno, objeto ou substância, expressa em número e unidade',
          'Apenas grandezas que podem ser vistas a olho nu',
          'Um conceito matemático sem relação com o mundo real'
        ],
        correct: 1,
        explanation: 'Grandeza física é toda propriedade que pode ser medida — expressada por um valor numérico e uma unidade. Sem a unidade, o número não tem significado físico.'
      },
      {
        type: 'numeric',
        text: 'Um cubo tem arestas de 0,5 m cada. Qual é o seu volume em m³?',
        answer: 0.125,
        tolerance: 0.005,
        unit: 'm³',
        explanation: 'V = lado³ = 0,5³ = 0,125 m³'
      },
      {
        type: 'objective',
        text: 'Qual das alternativas apresenta corretamente um par de grandeza escalar e grandeza vetorial?',
        options: [
          'Temperatura (escalar) e Velocidade (vetorial)',
          'Força (escalar) e Massa (vetorial)',
          'Velocidade (escalar) e Temperatura (vetorial)',
          'Distância (vetorial) e Deslocamento (escalar)'
        ],
        correct: 0,
        explanation: 'Temperatura é escalar (tem apenas módulo). Velocidade é vetorial (tem módulo, direção e sentido). Força também é vetorial; massa é escalar.'
      }
    ],

    quiz2: [
      {
        type: 'objective',
        text: 'Qual é a unidade SI de massa?',
        options: ['Grama (g)', 'Quilograma (kg)', 'Libra (lb)', 'Tonelada (t)'],
        correct: 1,
        explanation: 'O quilograma (kg) é a unidade base de massa no SI. O grama, a tonelada e a libra são derivados ou unidades de outros sistemas.'
      },
      {
        type: 'numeric',
        text: 'O Sistema Internacional possui 7 grandezas de base. Quantas são elas?',
        answer: 7,
        tolerance: 0,
        unit: '',
        explanation: 'O SI tem exatamente 7 grandezas de base: comprimento (m), massa (kg), tempo (s), corrente elétrica (A), temperatura termodinâmica (K), quantidade de matéria (mol) e intensidade luminosa (cd).'
      },
      {
        type: 'objective',
        text: 'Qual é o símbolo SI correto para a unidade de temperatura termodinâmica?',
        options: ['°C', 'K', 'F', 'T'],
        correct: 1,
        explanation: 'A grandeza base de temperatura no SI é o Kelvin (K), não o grau Celsius (°C). O Celsius é uma unidade derivada muito usada na prática, mas K é a unidade base oficial.'
      }
    ],

    quiz3: [
      {
        type: 'numeric',
        text: 'Quantos metros há em 1 km?',
        answer: 1000,
        tolerance: 0,
        unit: 'm',
        explanation: 'O prefixo "kilo" (k) significa 10³ = 1000. Portanto, 1 km = 1000 m.'
      },
      {
        type: 'numeric',
        text: 'Um circuito elétrico tem corrente de 250 μA (microamperes). Qual é esse valor em amperes (A)?',
        answer: 0.00025,
        tolerance: 0.000005,
        unit: 'A',
        explanation: 'O prefixo "micro" (μ) significa 10⁻⁶. Portanto, 250 μA = 250 × 10⁻⁶ A = 0,00025 A = 2,5 × 10⁻⁴ A.'
      },
      {
        type: 'objective',
        text: 'O prefixo SI correspondente a 10⁻⁹ é:',
        options: ['Micro (μ)', 'Nano (n)', 'Pico (p)', 'Mili (m)'],
        correct: 1,
        explanation: 'Nano (n) = 10⁻⁹. Micro (μ) = 10⁻⁶, Pico (p) = 10⁻¹², Mili (m) = 10⁻³.'
      }
    ],

    quiz4: [
      {
        type: 'numeric',
        text: '1 polegada equivale aproximadamente a quantos centímetros? (Resposta com 2 casas decimais)',
        answer: 2.54,
        tolerance: 0.05,
        unit: 'cm',
        explanation: '1 polegada (inch) = 2,54 cm exatamente. É uma das conversões mais importantes entre sistemas imperial e SI.'
      },
      {
        type: 'numeric',
        text: '1 milha terrestre equivale a aproximadamente quantos quilômetros? (Use 1,609)',
        answer: 1.609,
        tolerance: 0.05,
        unit: 'km',
        explanation: '1 milha (mile) ≈ 1,609 km = 1609 m. Daí vem a unidade mph (miles per hour) usada nos EUA.'
      },
      {
        type: 'objective',
        text: 'Quais são os países que ainda utilizam o Sistema Imperial como sistema oficial?',
        options: [
          'França, Alemanha e Japão',
          'Estados Unidos, Myanmar e Libéria',
          'China, Índia e Brasil',
          'Canadá, Austrália e Reino Unido'
        ],
        correct: 1,
        explanation: 'Os únicos países que não adotaram o SI como sistema oficial são EUA, Myanmar e Libéria. O Reino Unido e o Canadá usam o SI oficialmente, embora o imperial ainda seja comum no cotidiano.'
      }
    ],

    quiz5: [
      {
        type: 'objective',
        text: 'O metro foi originalmente definido como:',
        options: [
          '1/100 da distância entre dois polos magnéticos',
          '1/10.000.000 da distância do Polo Norte ao equador, ao longo do meridiano de Paris',
          'O comprimento do braço de um monarca francês',
          'A distância percorrida pela luz em 1 segundo'
        ],
        correct: 1,
        explanation: 'Durante a Revolução Francesa (1791), o metro foi definido como a dez-milionésima parte do meridiano terrestre entre o Polo Norte e o Equador. Hoje é definido pela velocidade da luz.'
      },
      {
        type: 'numeric',
        text: 'Em que ano o Sistema Internacional de Unidades (SI) foi formalmente adotado pela Conferência Geral de Pesos e Medidas?',
        answer: 1960,
        tolerance: 0,
        unit: '',
        explanation: 'O SI foi oficialmente adotado em 1960 na 11ª Conferência Geral de Pesos e Medidas (CGPM), em Paris. Em 2019, passou por uma redefinição histórica baseada em constantes físicas fundamentais.'
      },
      {
        type: 'objective',
        text: 'Qual unidade de comprimento histórica era baseada no antebraço humano (do cotovelo até a ponta dos dedos)?',
        options: ['Pé', 'Cúbito (ou côvado)', 'Braça', 'Légua'],
        correct: 1,
        explanation: 'O cúbito (ou côvado) era a distância do cotovelo à ponta do dedo médio — cerca de 44 a 53 cm, variando com a pessoa. Era amplamente usado no Egito Antigo, Babilônia e no mundo bíblico.'
      }
    ],

    quiz6: [
      {
        type: 'objective',
        text: 'Qual das opções a seguir é a forma correta de escrever o símbolo da unidade Newton?',
        options: ['newton', 'NEWTON', 'N', 'n'],
        correct: 2,
        explanation: 'Unidades nomeadas em homenagem a cientistas têm o símbolo em letra maiúscula (N para Newton, J para Joule, W para Watt), mas o nome por extenso é escrito em minúsculo (newton, joule, watt).'
      },
      {
        type: 'objective',
        text: 'Ao escrever "5 metros por segundo", a forma correta em notação SI é:',
        options: ['5 M/S', '5 m/s', '5ms', '5 m/ss'],
        correct: 1,
        explanation: '"m" é minúsculo (metro não é nome de cientista) e "s" é minúsculo (segundo). A barra "/" indica divisão. Correto: 5 m/s. Nunca se usa plural: não se escreve "5 ms" como abreviação de "5 metros".'
      },
      {
        type: 'objective',
        text: 'Ao escrever um valor com unidade, como deve ser feito o espaçamento?',
        options: [
          'Sem espaço: "5m"',
          'Com espaço entre o número e a unidade: "5 m"',
          'Com hífen: "5-m"',
          'Entre parênteses: "5(m)"'
        ],
        correct: 1,
        explanation: 'O SI recomenda um espaço entre o número e o símbolo da unidade: "5 m", "20 m/s", "9,8 m/s²". Exceção: símbolos de grau angular (°) não usam espaço: "45°".'
      }
    ],

    quiz7: [
      {
        type: 'numeric',
        text: 'Usando regra de três simples, converta 72 km/h para m/s. (Dica: 1 km/h = 1000/3600 m/s)',
        answer: 20,
        tolerance: 0.5,
        unit: 'm/s',
        explanation: 'Regra de três: se 1 km/h = 1000/3600 m/s ≈ 0,2778 m/s, então 72 km/h = 72 × 0,2778 = 20 m/s. (Ou: divida por 3,6.)'
      },
      {
        type: 'numeric',
        text: 'Converta 3 horas para segundos usando regra de três. (1 h = 3600 s)',
        answer: 10800,
        tolerance: 10,
        unit: 's',
        explanation: 'Regra de três direta: 1 h → 3600 s, logo 3 h → 3 × 3600 = 10.800 s.'
      },
      {
        type: 'numeric',
        text: 'Converta 150 cm para metros. (100 cm = 1 m)',
        answer: 1.5,
        tolerance: 0.01,
        unit: 'm',
        explanation: '150 cm ÷ 100 = 1,5 m. Pela regra de três: 100 cm → 1 m, 150 cm → 1,5 m.'
      }
    ],

    quiz8: [
      {
        type: 'numeric',
        text: 'Qual é o fator de conversão para transformar metros (m) em centímetros (cm)? (quantos cm há em 1 m)',
        answer: 100,
        tolerance: 0,
        unit: 'cm/m',
        explanation: '1 m = 100 cm. O fator de conversão é 100 cm/m. Multiplicar um valor em metros por 100 dá o resultado em centímetros.'
      },
      {
        type: 'objective',
        text: 'O fator de conversão entre km/h e m/s é:',
        options: [
          '1 km/h = 3,6 m/s  (multiplica por 3,6 para passar de km/h para m/s)',
          '1 km/h = 1/3,6 m/s  (divide por 3,6 para passar de km/h para m/s)',
          '1 km/h = 1000 m/s',
          '1 km/h = 60 m/s'
        ],
        correct: 1,
        explanation: '1 km = 1000 m e 1 h = 3600 s. Logo 1 km/h = 1000/3600 m/s = 1/3,6 m/s ≈ 0,2778 m/s. Para converter km/h → m/s: divida por 3,6.'
      },
      {
        type: 'numeric',
        text: 'Usando fatores de conversão encadeados, converta 1 pé/segundo (ft/s) para km/h. (1 ft = 0,3048 m; 1 km = 1000 m; 1 h = 3600 s). Dê o resultado em km/h com 3 casas decimais.',
        answer: 1.097,
        tolerance: 0.005,
        unit: 'km/h',
        explanation: '1 ft/s × (0,3048 m/ft) × (1 km/1000 m) × (3600 s/h) = 0,3048 × 3600/1000 = 1,09728 km/h ≈ 1,097 km/h'
      }
    ]

  };

  // Expõe para geração de relatório
  window.UnidadesQuizData = QUIZZES;

  // ================================================================
  // ESTADO GLOBAL
  // ================================================================
  window.UnidadesQuizState = {
    answered: {},
    total: 0,
    score: 0
  };

  // ================================================================
  // RENDERIZA QUESTÕES
  // ================================================================
  function renderQuiz(containerId, questions) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = '<div class="quiz-title">✦ Questões de verificação</div>';

    questions.forEach((q, i) => {
      const qid = containerId + '_q' + i;
      html += '<div class="question-block" id="qblock_' + qid + '">';
      html += '<span class="question-num">Questão ' + (i + 1) + '</span>';
      html += '<p class="question-text">' + q.text + '</p>';

      if (q.type === 'objective') {
        const letters = ['A', 'B', 'C', 'D', 'E'];
        html += '<div class="options-list" id="opts_' + qid + '">';
        q.options.forEach((opt, oi) => {
          html += '<button class="option-btn" data-qid="' + qid + '" data-oi="' + oi + '" data-correct="' + q.correct + '"'
            + ' aria-label="Opção ' + letters[oi] + ': ' + stripHtmlLocal(opt) + '">'
            + '<span class="opt-letter" aria-hidden="true">' + letters[oi] + '</span>' + opt
            + '</button>';
        });
        html += '</div>';
      } else {
        html += '<div class="numeric-row">'
          + '<input type="number" class="numeric-inp" id="inp_' + qid + '" placeholder="resposta" step="any"'
          + ' aria-label="Digite a resposta' + (q.unit ? ' em ' + q.unit : '') + '" />'
          + (q.unit ? '<span class="numeric-unit" aria-hidden="true">' + q.unit + '</span>' : '')
          + '<button class="submit-btn" data-qid="' + qid + '" data-answer="' + q.answer + '" data-tol="' + q.tolerance + '"'
          + ' aria-label="Verificar resposta">Verificar</button>'
          + '</div>';
      }

      html += '<div class="feedback" id="fb_' + qid + '" role="status" aria-live="polite" aria-atomic="true"></div>';
      html += '</div>';
    });

    container.innerHTML = html;
    window.UnidadesQuizState.total += questions.length;
    updateScoreDisplay();
    bindEvents(container, questions, containerId);
  }

  // ================================================================
  // EVENTOS
  // ================================================================
  function bindEvents(container, questions) {
    container.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const qid = this.dataset.qid;
        if (window.UnidadesQuizState.answered[qid]) return;

        const oi = parseInt(this.dataset.oi);
        const correct = parseInt(this.dataset.correct);

        container.querySelectorAll('[data-qid="' + qid + '"]').forEach(b => b.disabled = true);

        const isRight = oi === correct;
        this.classList.add(isRight ? 'correct' : 'wrong');
        if (!isRight) container.querySelectorAll('[data-qid="' + qid + '"]')[correct].classList.add('correct');

        const q = questions[parseInt(qid.split('_q')[1])];
        showFeedback(qid, isRight, q.explanation);
        registerAnswer(qid, isRight, { type: 'objective', chosenText: q.options[oi], correctText: q.options[correct] });
      });
    });

    container.querySelectorAll('.submit-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const qid = this.dataset.qid;
        if (window.UnidadesQuizState.answered[qid]) return;

        const inp = document.getElementById('inp_' + qid);
        const val = parseFloat(inp.value);
        if (isNaN(val)) { showFeedback(qid, false, 'Por favor, digite um número.'); return; }

        const answer  = parseFloat(this.dataset.answer);
        const tol     = parseFloat(this.dataset.tol);
        const isRight = Math.abs(val - answer) <= tol;

        inp.disabled = true;
        this.disabled = true;

        const q = questions[parseInt(qid.split('_q')[1])];
        showFeedback(qid, isRight, q.explanation);
        registerAnswer(qid, isRight, { type: 'numeric', chosenValue: val, correctValue: answer, unit: q.unit || '' });
      });

      const qid = btn.dataset.qid;
      const inp = document.getElementById('inp_' + qid);
      if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') btn.click(); });
    });
  }

  // ================================================================
  // FEEDBACK
  // ================================================================
  function showFeedback(qid, isRight, explanation) {
    const fb = document.getElementById('fb_' + qid);
    if (!fb) return;
    fb.className = 'feedback show ' + (isRight ? 'correct' : 'wrong');
    fb.innerHTML = '<strong>' + (isRight ? '✓ Correto!' : '✗ Incorreto.') + '</strong> ' + explanation;
  }

  // ================================================================
  // PLACAR
  // ================================================================
  function registerAnswer(qid, isRight, extra) {
    window.UnidadesQuizState.answered[qid] = Object.assign({ correct: isRight }, extra || {});
    if (isRight) window.UnidadesQuizState.score++;
    updateScoreDisplay();
  }

  function updateScoreDisplay() {
    const numEl = document.getElementById('score-num');
    const totEl = document.getElementById('score-total');
    const msgEl = document.getElementById('score-msg');
    if (!numEl) return;

    numEl.textContent = window.UnidadesQuizState.score;
    totEl.textContent = window.UnidadesQuizState.total;

    const answered = Object.keys(window.UnidadesQuizState.answered).length;
    const pct = window.UnidadesQuizState.total > 0
      ? Math.round((window.UnidadesQuizState.score / window.UnidadesQuizState.total) * 100) : 0;

    if (answered === 0) {
      msgEl.textContent = 'Responda as questões para ver seu placar!';
    } else if (answered < window.UnidadesQuizState.total) {
      msgEl.textContent = 'Você respondeu ' + answered + ' de ' + window.UnidadesQuizState.total + ' questões. Continue!';
    } else {
      let msg = '';
      if (pct >= 90) msg = '🏆 Excelente! Domínio completo das unidades de medida!';
      else if (pct >= 70) msg = '👍 Muito bom! Revise os pontos em que errou.';
      else if (pct >= 50) msg = '📚 Razoável. Releia os tópicos com dificuldade.';
      else msg = '💪 Continue! Releia os conceitos e tente novamente.';
      msgEl.textContent = 'Você acertou ' + pct + '% das questões. ' + msg;
    }
  }

  // ================================================================
  // RESET
  // ================================================================
  window.UnidadesQuizReset = function () {
    window.UnidadesQuizState.answered = {};
    window.UnidadesQuizState.score = 0;
    window.UnidadesQuizState.total = 0;
    initAllQuizzes();
    updateScoreDisplay();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ================================================================
  // INIT
  // ================================================================
  function initAllQuizzes() {
    Object.keys(QUIZZES).forEach(id => renderQuiz(id, QUIZZES[id]));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllQuizzes);
  } else {
    initAllQuizzes();
  }

})();
