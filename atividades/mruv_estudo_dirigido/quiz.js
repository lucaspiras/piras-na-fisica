// quiz.js — Questões e motor de quiz do MRUV

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
        text: 'O que diferencia o MRUV do MRU?',
        options: [
          'No MRUV a velocidade é constante; no MRU ela varia',
          'No MRUV a velocidade varia uniformemente; no MRU é constante',
          'No MRUV o objeto está sempre em repouso',
          'No MRUV o movimento é circular'
        ],
        correct: 1,
        explanation: 'No MRUV a velocidade muda de forma constante ao longo do tempo — isso é exatamente o que a aceleração constante faz.'
      },
      {
        type: 'numeric',
        text: 'Um carro parte do repouso (v₀ = 0) e atinge v = 30 m/s em t = 6 s. Qual é a aceleração média (em m/s²)?',
        answer: 5,
        tolerance: 0.1,
        unit: 'm/s²',
        explanation: 'a = (v − v₀) / t = (30 − 0) / 6 = 5 m/s²'
      },
      {
        type: 'objective',
        text: 'A unidade de aceleração no SI é:',
        options: ['m/s', 'm·s', 'm/s²', 'kg·m/s'],
        correct: 2,
        explanation: 'Aceleração = variação de velocidade / tempo → [m/s] / [s] = m/s².'
      }
    ],

    quiz2: [
      {
        type: 'numeric',
        text: 'Um trem tem v₀ = 10 m/s e aceleração a = 3 m/s². Qual é a velocidade em t = 4 s?',
        answer: 22,
        tolerance: 0.5,
        unit: 'm/s',
        explanation: 'v = v₀ + a·t = 10 + 3×4 = 10 + 12 = 22 m/s'
      },
      {
        type: 'objective',
        text: 'No gráfico v × t de um MRUV, a curva tem formato de:',
        options: ['Parábola', 'Reta inclinada', 'Reta horizontal', 'Curva exponencial'],
        correct: 1,
        explanation: 'v = v₀ + at é uma função do 1º grau em t — seu gráfico é uma reta. A inclinação (coeficiente angular) é a aceleração a.'
      },
      {
        type: 'objective',
        text: 'Se a aceleração de um objeto é positiva e sua velocidade também é positiva, o que acontece com o módulo da velocidade?',
        options: [
          'Diminui com o tempo',
          'Permanece constante',
          'Aumenta com o tempo',
          'Oscila entre positivo e negativo'
        ],
        correct: 2,
        explanation: 'Quando v e a têm o mesmo sinal, o objeto acelera — o módulo da velocidade cresce. O movimento é chamado de acelerado.'
      }
    ],

    quiz3: [
      {
        type: 'numeric',
        text: 'Um objeto parte de S₀ = 0, com v₀ = 5 m/s e a = 2 m/s². Qual é sua posição em t = 3 s?',
        answer: 24,
        tolerance: 0.5,
        unit: 'm',
        explanation: 'S = S₀ + v₀·t + ½·a·t² = 0 + 5×3 + ½×2×9 = 15 + 9 = 24 m'
      },
      {
        type: 'objective',
        text: 'A função horária da posição no MRUV, S(t) = S₀ + v₀·t + ½·a·t², é um polinômio de grau:',
        options: ['Grau 1 (função linear)', 'Grau 2 (função quadrática)', 'Grau 3 (função cúbica)', 'Grau 0 (constante)'],
        correct: 1,
        explanation: 'O termo ½·a·t² eleva o grau máximo a 2 — é uma função quadrática, cujo gráfico é uma parábola.'
      },
      {
        type: 'numeric',
        text: 'Um objeto parte do repouso (v₀ = 0) com a = −10 m/s² (desacelera). Qual é a posição em t = 2 s? (S₀ = 0)',
        answer: -20,
        tolerance: 1,
        unit: 'm',
        explanation: 'S = 0 + 0×2 + ½×(−10)×4 = −20 m. A posição ficou negativa porque a aceleração é negativa.'
      }
    ],

    quiz4: [
      {
        type: 'numeric',
        text: 'Um carro parte do repouso (v₀ = 0) com a = 5 m/s². Qual é a velocidade após percorrer ΔS = 40 m?',
        answer: 20,
        tolerance: 0.5,
        unit: 'm/s',
        explanation: 'v² = v₀² + 2·a·ΔS = 0 + 2×5×40 = 400 → v = 20 m/s'
      },
      {
        type: 'objective',
        text: 'A equação de Torricelli é mais útil quando:',
        options: [
          'Conhecemos o tempo e queremos a posição',
          'Não conhecemos o tempo e queremos relacionar velocidade e deslocamento',
          'Queremos calcular a aceleração a partir do gráfico',
          'O objeto está em repouso'
        ],
        correct: 1,
        explanation: 'Torricelli elimina o tempo t da equação — perfeita para problemas onde t não é dado nem pedido.'
      },
      {
        type: 'numeric',
        text: 'Um veículo com v₀ = 10 m/s freia com a = −5 m/s² até parar (v = 0). Qual é o deslocamento de frenagem ΔS (em metros)?',
        answer: 10,
        tolerance: 0.5,
        unit: 'm',
        explanation: 'v² = v₀² + 2·a·ΔS → 0 = 100 + 2×(−5)×ΔS → ΔS = 100/10 = 10 m'
      }
    ],

    quiz5: [
      {
        type: 'numeric',
        text: 'Um objeto acelera de v₀ = 0 a v = 20 m/s. Qual é a velocidade média durante esse intervalo?',
        answer: 10,
        tolerance: 0.5,
        unit: 'm/s',
        explanation: 'v<sub>m</sub> = (v₀ + v) / 2 = (0 + 20) / 2 = 10 m/s. No MRUV, a velocidade média é a média aritmética das velocidades extremas.'
      },
      {
        type: 'objective',
        text: 'Como a velocidade média se comporta no MRUV em comparação ao MRU?',
        options: [
          'No MRU a velocidade média varia; no MRUV é constante',
          'No MRU a velocidade média é igual à velocidade (constante); no MRUV é a média de v₀ e v',
          'São iguais nos dois movimentos',
          'No MRUV a velocidade média não existe'
        ],
        correct: 1,
        explanation: 'No MRU, v é constante logo v<sub>m</sub> = v. No MRUV, v varia, e a velocidade média é a média aritmética dos extremos: v<sub>m</sub> = (v₀ + v)/2.'
      },
      {
        type: 'numeric',
        text: 'Um objeto tem velocidade média v<sub>m</sub> = 15 m/s durante t = 4 s. Qual é o deslocamento ΔS (em metros)?',
        answer: 60,
        tolerance: 1,
        unit: 'm',
        explanation: 'ΔS = v<sub>m</sub> × t = 15 × 4 = 60 m'
      }
    ],

    quiz6: [
      {
        type: 'objective',
        text: 'No gráfico v × t do MRUV, o que representa a inclinação (coeficiente angular) da reta?',
        options: [
          'A velocidade inicial do objeto',
          'O deslocamento total',
          'A aceleração do objeto',
          'A posição inicial'
        ],
        correct: 2,
        explanation: 'A inclinação da reta no gráfico v×t é Δv/Δt = aceleração a. Reta crescente → a > 0; decrescente → a < 0.'
      },
      {
        type: 'objective',
        text: 'No gráfico S × t do MRUV, a curva tem formato de:',
        options: ['Reta horizontal', 'Reta inclinada', 'Parábola', 'Hipérbole'],
        correct: 2,
        explanation: 'S(t) = S₀ + v₀t + ½at² é uma equação do 2º grau em t — seu gráfico é uma parábola.'
      },
      {
        type: 'objective',
        text: 'No gráfico v × t, a área da região entre a reta e o eixo t representa:',
        options: ['A aceleração do objeto', 'O deslocamento do objeto', 'A força resultante', 'A energia cinética'],
        correct: 1,
        explanation: 'Área = base × altura = t × v = deslocamento ΔS. Esse resultado vem do cálculo de área do trapézio formado pela reta v×t.'
      }
    ],

    quiz7: [
      {
        type: 'objective',
        text: 'Um objeto tem v > 0 e a < 0. Como classificar esse movimento?',
        options: [
          'MRUV acelerado no sentido positivo',
          'MRUV retardado no sentido positivo',
          'MRUV acelerado no sentido negativo',
          'Repouso'
        ],
        correct: 1,
        explanation: 'v e a têm sinais opostos → o módulo da velocidade diminui → movimento retardado. O objeto anda no sentido positivo (v > 0), mas vai perdendo velocidade.'
      },
      {
        type: 'objective',
        text: 'O módulo da velocidade de um objeto aumenta quando:',
        options: [
          'v e a têm sinais opostos',
          'v e a têm o mesmo sinal',
          'a = 0',
          'v = 0'
        ],
        correct: 1,
        explanation: 'Se v e a apontam na mesma direção (mesmo sinal), a aceleração reforça o movimento → |v| cresce. Isso caracteriza o MRUV acelerado.'
      },
      {
        type: 'numeric',
        text: 'Um objeto tem v₀ = 30 m/s e desacelera com a = −5 m/s². Em que instante t (em segundos) a velocidade se anula?',
        answer: 6,
        tolerance: 0.5,
        unit: 's',
        explanation: 'v = v₀ + at → 0 = 30 − 5t → t = 30/5 = 6 s'
      }
    ],

    quiz8: [
      {
        type: 'objective',
        text: 'Na queda livre, qual é a aceleração do objeto (usando g ≈ 10 m/s²)?',
        options: ['0 m/s²', '5 m/s²', '10 m/s²', '20 m/s²'],
        correct: 2,
        explanation: 'Na queda livre, a única força é a gravidade. A aceleração gravitacional g ≈ 9,8 m/s² ≈ 10 m/s² (aproximação usada no ensino médio).'
      },
      {
        type: 'numeric',
        text: 'Um objeto é largado do repouso (v₀ = 0) e cai livremente durante t = 3 s. Qual é a velocidade atingida? (g = 10 m/s²)',
        answer: 30,
        tolerance: 1,
        unit: 'm/s',
        explanation: 'v = g·t = 10 × 3 = 30 m/s'
      },
      {
        type: 'numeric',
        text: 'Um objeto cai livremente durante 4 s (v₀ = 0, g = 10 m/s²). Qual é a altura percorrida (em metros)?',
        answer: 80,
        tolerance: 2,
        unit: 'm',
        explanation: 'h = ½·g·t² = ½ × 10 × 16 = 80 m'
      }
    ],

    quiz9: [
      {
        type: 'numeric',
        text: 'Uma bola é lançada verticalmente para cima com v₀ = 20 m/s. Qual é a altura máxima atingida? (g = 10 m/s²)',
        answer: 20,
        tolerance: 1,
        unit: 'm',
        explanation: 'Em h<sub>max</sub>, v = 0. Pela Torricelli: 0 = v₀² − 2g·h → h = v₀²/(2g) = 400/20 = 20 m'
      },
      {
        type: 'numeric',
        text: 'Uma bola é lançada para cima com v₀ = 15 m/s. Em quanto tempo (em segundos) ela atinge a altura máxima? (g = 10 m/s²)',
        answer: 1.5,
        tolerance: 0.1,
        unit: 's',
        explanation: 'Na altura máxima, v = 0. v = v₀ − g·t → 0 = 15 − 10t → t = 1,5 s'
      },
      {
        type: 'objective',
        text: 'O que ocorre com a velocidade de um objeto lançado verticalmente para cima no momento em que ele atinge a altura máxima?',
        options: [
          'A velocidade é máxima',
          'A velocidade é zero e a aceleração também',
          'A velocidade é zero, mas a aceleração ainda é g',
          'O objeto entra em repouso permanente'
        ],
        correct: 2,
        explanation: 'Na altura máxima, v = 0 (o objeto para momentaneamente). Mas a gravidade continua agindo — a = g = 10 m/s² para baixo. Por isso o objeto volta a cair.'
      }
    ]

  };

  // Expõe para geração de relatório
  window.MRUVQuizData = QUIZZES;

  // ================================================================
  // ESTADO GLOBAL
  // ================================================================
  window.MRUVQuizState = {
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
          + ' aria-label="Digite a resposta em ' + q.unit + '" />'
          + '<span class="numeric-unit" aria-hidden="true">' + q.unit + '</span>'
          + '<button class="submit-btn" data-qid="' + qid + '" data-answer="' + q.answer + '" data-tol="' + q.tolerance + '"'
          + ' aria-label="Verificar resposta">Verificar</button>'
          + '</div>';
      }

      html += '<div class="feedback" id="fb_' + qid + '" role="status" aria-live="polite" aria-atomic="true"></div>';
      html += '</div>';
    });

    container.innerHTML = html;
    window.MRUVQuizState.total += questions.length;
    updateScoreDisplay();
    bindEvents(container, questions, containerId);
  }

  // ================================================================
  // EVENTOS
  // ================================================================
  function bindEvents(container, questions, quizId) {
    container.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const qid = this.dataset.qid;
        if (window.MRUVQuizState.answered[qid]) return;

        const oi = parseInt(this.dataset.oi);
        const correct = parseInt(this.dataset.correct);

        container.querySelectorAll('[data-qid="' + qid + '"]').forEach(b => b.disabled = true);

        const isRight = oi === correct;
        this.classList.add(isRight ? 'correct' : 'wrong');
        if (!isRight) container.querySelectorAll('[data-qid="' + qid + '"]')[correct].classList.add('correct');

        const q = questions[parseInt(qid.split('_q')[1])];
        showFeedback(qid, isRight, q.explanation);
        registerAnswer(qid, isRight);
      });
    });

    container.querySelectorAll('.submit-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const qid = this.dataset.qid;
        if (window.MRUVQuizState.answered[qid]) return;

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
        registerAnswer(qid, isRight);
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
  function registerAnswer(qid, isRight) {
    window.MRUVQuizState.answered[qid] = { correct: isRight };
    if (isRight) window.MRUVQuizState.score++;
    updateScoreDisplay();
  }

  function updateScoreDisplay() {
    const numEl = document.getElementById('score-num');
    const totEl = document.getElementById('score-total');
    const msgEl = document.getElementById('score-msg');
    if (!numEl) return;

    numEl.textContent = window.MRUVQuizState.score;
    totEl.textContent = window.MRUVQuizState.total;

    const answered = Object.keys(window.MRUVQuizState.answered).length;
    const pct = window.MRUVQuizState.total > 0
      ? Math.round((window.MRUVQuizState.score / window.MRUVQuizState.total) * 100) : 0;

    if (answered === 0) {
      msgEl.textContent = 'Responda as questões para ver seu placar!';
    } else if (answered < window.MRUVQuizState.total) {
      msgEl.textContent = 'Você respondeu ' + answered + ' de ' + window.MRUVQuizState.total + ' questões. Continue!';
    } else {
      let msg = '';
      if (pct >= 90) msg = '🏆 Excelente! Domínio completo do MRUV!';
      else if (pct >= 70) msg = '👍 Muito bom! Revise os pontos em que errou.';
      else if (pct >= 50) msg = '📚 Razoável. Releia os tópicos com dificuldade.';
      else msg = '💪 Continue! Releia os conceitos e tente novamente.';
      msgEl.textContent = 'Você acertou ' + pct + '% das questões. ' + msg;
    }
  }

  // ================================================================
  // RESET
  // ================================================================
  window.MRUVQuizReset = function () {
    window.MRUVQuizState.answered = {};
    window.MRUVQuizState.score = 0;
    window.MRUVQuizState.total = 0;
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
