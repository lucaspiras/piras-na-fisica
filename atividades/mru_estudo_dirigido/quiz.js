// quiz.js — Questões e motor de quiz do MRU

(function() {
  'use strict';

  function stripHtmlLocal(str) {
    return str.replace(/<[^>]+>/g, '');
  }

  // ================================================================
  // BANCO DE QUESTÕES
  // Tipo "objective": alternativas, apenas uma correta (índice 0-based)
  // Tipo "numeric":   resposta numérica + tolerância + unidade
  // ================================================================
  const QUIZZES = {

    quiz1: [
      {
        type: 'objective',
        text: 'Um passageiro dentro de um trem em movimento dorme em sua poltrona. Em relação ao trem, esse passageiro está:',
        options: ['Em repouso', 'Em movimento uniforme', 'Em movimento acelerado', 'Em queda livre'],
        correct: 0,
        explanation: 'Em relação ao trem (referencial = trem), o passageiro não muda de posição — está em repouso.'
      },
      {
        type: 'objective',
        text: 'Para que possamos descrever o movimento de um objeto, é indispensável definir:',
        options: ['A massa do objeto', 'Um referencial', 'A temperatura do ambiente', 'A cor do objeto'],
        correct: 1,
        explanation: 'Todo movimento é relativo. Precisamos de um referencial para dizer se algo se move ou está em repouso.'
      },
      {
        type: 'objective',
        text: 'Dois observadores A e B estão em trens que se movem em sentidos opostos com a mesma velocidade. Para o observador A, o observador B:',
        options: [
          'Está em repouso',
          'Move-se com o dobro da velocidade em relação ao chão',
          'Move-se com metade da velocidade em relação ao chão',
          'Está no mesmo referencial que A'
        ],
        correct: 1,
        explanation: 'Se cada um vai a v em sentidos opostos, a velocidade relativa entre eles é 2v — o dobro da velocidade medida em relação ao chão.'
      }
    ],

    quiz2: [
      {
        type: 'numeric',
        text: 'Um carro está na posição S = 80 m. Ele percorre 50 m no sentido positivo. Qual é sua nova posição (em metros)?',
        answer: 130,
        tolerance: 1,
        unit: 'm',
        explanation: 'S<sub>f</sub> = 80 + 50 = 130 m'
      },
      {
        type: 'objective',
        text: 'Um atleta corre 400 m em volta de uma pista circular e retorna ao ponto de partida. Qual é o deslocamento e a distância percorrida?',
        options: [
          'Deslocamento = 0 m, distância = 400 m',
          'Deslocamento = 400 m, distância = 400 m',
          'Deslocamento = 400 m, distância = 0 m',
          'Deslocamento = 0 m, distância = 0 m'
        ],
        correct: 0,
        explanation: 'O atleta voltou ao ponto de partida, então ΔS = 0. Mas ele percorreu 400 m de caminho real.'
      },
      {
        type: 'numeric',
        text: 'Um móvel parte de S₀ = −20 m e vai até S<sub>f</sub> = 60 m. Qual é o deslocamento ΔS (em metros)?',
        answer: 80,
        tolerance: 1,
        unit: 'm',
        explanation: 'ΔS = S<sub>f</sub> − S₀ = 60 − (−20) = 80 m'
      }
    ],

    quiz3: [
      {
        type: 'numeric',
        text: 'Um ciclista percorre 120 m em 8 s. Qual é a sua velocidade média (em m/s)?',
        answer: 15,
        tolerance: 0.5,
        unit: 'm/s',
        explanation: 'v<sub>m</sub> = ΔS / Δt = 120 / 8 = 15 m/s'
      },
      {
        type: 'numeric',
        text: 'Um carro viaja a 90 km/h. Qual é essa velocidade em m/s?',
        answer: 25,
        tolerance: 0.5,
        unit: 'm/s',
        explanation: '90 km/h ÷ 3,6 = 25 m/s'
      },
      {
        type: 'objective',
        text: 'Um carro percorre 200 m para frente e depois 200 m de volta ao ponto de partida, em 40 s no total. A velocidade média do percurso todo é:',
        options: [
          '10 m/s, pois o deslocamento é zero',
          '0 m/s, pois o deslocamento é zero',
          '10 m/s, pois a distância total é 400 m',
          '5 m/s, pois percorreu apenas 200 m'
        ],
        correct: 1,
        explanation: 'Velocidade média = ΔS / Δt. Como o carro voltou ao ponto de partida, ΔS = 0, logo v<sub>m</sub> = 0.'
      }
    ],

    quiz4: [
      {
        type: 'objective',
        text: 'No MRU, a relação entre velocidade instantânea e velocidade média é:',
        options: [
          'A velocidade instantânea é sempre maior que a média',
          'São iguais em qualquer instante',
          'A velocidade instantânea é sempre menor que a média',
          'Não existe relação entre elas'
        ],
        correct: 1,
        explanation: 'No MRU a velocidade é constante — logo a velocidade instantânea em qualquer momento é igual à velocidade média.'
      },
      {
        type: 'objective',
        text: 'O velocímetro de um carro indica 72 km/h constantemente durante 5 minutos. Isso caracteriza:',
        options: [
          'Movimento Retilíneo Uniformemente Variado (MRUV)',
          'Movimento Retilíneo Uniforme (MRU)',
          'Queda livre',
          'Movimento circular uniforme'
        ],
        correct: 1,
        explanation: 'Velocidade constante em linha reta = MRU. O velocímetro constante confirma v = cte.'
      },
      {
        type: 'objective',
        text: 'Uma grandeza vetorial possui:',
        options: [
          'Apenas módulo',
          'Apenas direção e sentido',
          'Módulo, direção e sentido',
          'Apenas unidade e módulo'
        ],
        correct: 2,
        explanation: 'Grandezas vetoriais têm três características: módulo (intensidade), direção e sentido.'
      }
    ],

    quiz5: [
      {
        type: 'numeric',
        text: 'Um trem parte da posição S₀ = 500 m com velocidade de 20 m/s. Qual a sua posição após 15 s?',
        answer: 800,
        tolerance: 2,
        unit: 'm',
        explanation: 'S = 500 + 20 × 15 = 500 + 300 = 800 m'
      },
      {
        type: 'numeric',
        text: 'Um carro com S₀ = 0 e v = 25 m/s. Em quanto tempo (em segundos) ele chega à posição S = 350 m?',
        answer: 14,
        tolerance: 0.5,
        unit: 's',
        explanation: 't = (S − S₀) / v = 350 / 25 = 14 s'
      },
      {
        type: 'objective',
        text: 'Na equação S = S₀ + vt, o que acontece com S quando v é negativo?',
        options: [
          'S aumenta com o tempo',
          'S diminui com o tempo',
          'S fica constante',
          'S varia de forma não linear'
        ],
        correct: 1,
        explanation: 'Com v < 0, cada segundo que passa subtrai de S. O móvel se afasta no sentido negativo.'
      }
    ],

    quiz6: [
      {
        type: 'objective',
        text: 'A função horária S(t) = 10 + 5t descreve um móvel. Qual é a posição inicial e a velocidade?',
        options: [
          'S₀ = 5 m e v = 10 m/s',
          'S₀ = 10 m e v = 5 m/s',
          'S₀ = 0 m e v = 10 m/s',
          'S₀ = 10 m e v = −5 m/s'
        ],
        correct: 1,
        explanation: 'Na forma S = S₀ + vt, o termo independente é S₀ = 10 m e o coeficiente de t é v = 5 m/s.'
      },
      {
        type: 'numeric',
        text: 'Para a função S(t) = −30 + 8t, qual é a posição do móvel em t = 5 s (em metros)?',
        answer: 10,
        tolerance: 1,
        unit: 'm',
        explanation: 'S(5) = −30 + 8 × 5 = −30 + 40 = 10 m'
      },
      {
        type: 'objective',
        text: 'O gráfico da função horária S(t) no MRU tem formato de:',
        options: [
          'Parábola (curva)',
          'Reta oblíqua (inclinada)',
          'Reta horizontal',
          'Curva exponencial'
        ],
        correct: 1,
        explanation: 'S = S₀ + vt é uma função do 1º grau em t — seu gráfico é sempre uma reta. Se v ≠ 0, ela é oblíqua.'
      }
    ],

    quiz7: [
      {
        type: 'objective',
        text: 'No gráfico S × t do MRU, o que o coeficiente angular (inclinação) da reta representa?',
        options: [
          'A posição inicial do móvel',
          'A aceleração do móvel',
          'A velocidade do móvel',
          'O tempo de percurso'
        ],
        correct: 2,
        explanation: 'O coeficiente angular (tg do ângulo com o eixo t) é ΔS/Δt = velocidade v.'
      },
      {
        type: 'objective',
        text: 'No gráfico v × t do MRU, a área sob a reta horizontal representa:',
        options: [
          'A aceleração',
          'O deslocamento',
          'O tempo',
          'A posição instantânea'
        ],
        correct: 1,
        explanation: 'Área = v × t = deslocamento ΔS. Geometricamente, a área do retângulo formado é exatamente o deslocamento.'
      },
      {
        type: 'objective',
        text: 'No gráfico S × t, dois móveis A e B têm retas que se cruzam num ponto. Isso significa que:',
        options: [
          'Os dois têm a mesma velocidade',
          'Os dois partiram do mesmo lugar',
          'No instante do cruzamento, os dois estão na mesma posição',
          'Os dois vão parar ao mesmo tempo'
        ],
        correct: 2,
        explanation: 'O ponto de intersecção das retas indica o momento em que S<sub>A</sub> = S<sub>B</sub>: os dois estão na mesma posição ao mesmo tempo — é o encontro!'
      }
    ],

    quiz8: [
      {
        type: 'objective',
        text: 'Um móvel tem função horária S = 200 − 15t. Ele realiza:',
        options: [
          'MRU progressivo (v > 0)',
          'MRU retrógrado (v < 0)',
          'Repouso',
          'Movimento acelerado'
        ],
        correct: 1,
        explanation: 'O coeficiente de t é −15, logo v = −15 m/s < 0: MRU retrógrado.'
      },
      {
        type: 'objective',
        text: 'Um carro vai do ponto A ao B (sentido positivo) e depois do B de volta ao A, ambos em MRU. No percurso de volta, a velocidade é:',
        options: [
          'A mesma que na ida (positiva)',
          'Zero',
          'Negativa (sentido oposto)',
          'Maior em módulo do que na ida'
        ],
        correct: 2,
        explanation: 'Na volta o móvel vai no sentido negativo — a velocidade tem sinal negativo (retrógrado).'
      },
      {
        type: 'numeric',
        text: 'Um móvel tem S = 400 − 20t. Em que instante (em segundos) ele passa pelo referencial (S = 0)?',
        answer: 20,
        tolerance: 0.5,
        unit: 's',
        explanation: '0 = 400 − 20t → 20t = 400 → t = 20 s'
      }
    ],

    quiz9: [
      {
        type: 'numeric',
        text: 'Dois carros partem em sentidos opostos: A com S<sub>A</sub> = 10t e B com S<sub>B</sub> = 300 − 20t. Em que instante (s) eles se encontram?',
        answer: 10,
        tolerance: 0.5,
        unit: 's',
        explanation: '10t = 300 − 20t → 30t = 300 → t = 10 s'
      },
      {
        type: 'numeric',
        text: 'No encontro do exercício anterior (S<sub>A</sub> = 10t, S<sub>B</sub> = 300 − 20t, t = 10 s), qual é a posição do encontro (em metros)?',
        answer: 100,
        tolerance: 2,
        unit: 'm',
        explanation: 'S = 10 × 10 = 100 m (ou: 300 − 20 × 10 = 100 m ✓)'
      },
      {
        type: 'objective',
        text: 'Para encontrar onde dois móveis A e B se encontram, devemos:',
        options: [
          'Igualar as velocidades dos dois',
          'Igualar as posições: S<sub>A</sub>(t) = S<sub>B</sub>(t) e resolver para t',
          'Subtrair as funções e encontrar a derivada',
          'Somar as posições iniciais e dividir pela velocidade média'
        ],
        correct: 1,
        explanation: 'Encontro = mesma posição ao mesmo tempo. Igualamos S<sub>A</sub>(t) = S<sub>B</sub>(t) e resolvemos a equação para t.'
      }
    ]

  };

  // Expõe banco de questões para geração de relatório
  window.MRUQuizData = QUIZZES;

  // ================================================================
  // ESTADO GLOBAL DO QUIZ
  // ================================================================
  window.MRUQuizState = {
    answered: {},   // id_questão: { correct: bool }
    total: 0,
    score: 0
  };

  // ================================================================
  // RENDERIZA QUESTÕES
  // ================================================================
  function renderQuiz(containerId, questions) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = `<div class="quiz-title">✦ Questões de verificação</div>`;

    questions.forEach((q, i) => {
      const qid = `${containerId}_q${i}`;
      html += `<div class="question-block" id="qblock_${qid}">`;
      html += `<span class="question-num">Questão ${i + 1}</span>`;
      html += `<p class="question-text">${q.text}</p>`;

      if (q.type === 'objective') {
        html += `<div class="options-list" id="opts_${qid}">`;
        const letters = ['A', 'B', 'C', 'D', 'E'];
        q.options.forEach((opt, oi) => {
          html += `<button class="option-btn" data-qid="${qid}" data-oi="${oi}" data-correct="${q.correct}"
            aria-label="Opção ${letters[oi]}: ${stripHtmlLocal(opt)}">
            <span class="opt-letter" aria-hidden="true">${letters[oi]}</span>${opt}
          </button>`;
        });
        html += `</div>`;
      } else {
        // Numeric
        html += `<div class="numeric-row">
          <input type="number" class="numeric-inp" id="inp_${qid}" placeholder="resposta" step="any"
            aria-label="Digite a resposta em ${q.unit}" />
          <span class="numeric-unit" aria-hidden="true">${q.unit}</span>
          <button class="submit-btn" data-qid="${qid}" data-answer="${q.answer}" data-tol="${q.tolerance}"
            aria-label="Verificar resposta">Verificar</button>
        </div>`;
      }

      html += `<div class="feedback" id="fb_${qid}" role="status" aria-live="polite" aria-atomic="true"></div>`;
      html += `</div>`;
    });

    container.innerHTML = html;
    window.MRUQuizState.total += questions.length;
    updateScoreDisplay();
    bindEvents(container, questions, containerId);
  }

  // ================================================================
  // BIND DE EVENTOS
  // ================================================================
  function bindEvents(container, questions, quizId) {

    // Objetivas
    container.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const qid = this.dataset.qid;
        if (window.MRUQuizState.answered[qid]) return; // já respondida

        const oi = parseInt(this.dataset.oi);
        const correct = parseInt(this.dataset.correct);

        // Desabilita todos os botões dessa questão
        container.querySelectorAll(`[data-qid="${qid}"]`).forEach(b => b.disabled = true);

        const isRight = oi === correct;
        this.classList.add(isRight ? 'correct' : 'wrong');

        // Marca a correta também (se errou)
        if (!isRight) {
          container.querySelectorAll(`[data-qid="${qid}"]`)[correct].classList.add('correct');
        }

        // Encontra a questão original
        const qIndex = parseInt(qid.split('_q')[1]);
        const q = questions[qIndex];

        showFeedback(qid, isRight, q.explanation);
        registerAnswer(qid, isRight);
      });
    });

    // Numéricas
    container.querySelectorAll('.submit-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const qid = this.dataset.qid;
        if (window.MRUQuizState.answered[qid]) return;

        const inp = document.getElementById(`inp_${qid}`);
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
          showFeedback(qid, false, 'Por favor, digite um número.');
          return;
        }

        const answer = parseFloat(this.dataset.answer);
        const tol    = parseFloat(this.dataset.tol);
        const isRight = Math.abs(val - answer) <= tol;

        inp.disabled = true;
        this.disabled = true;

        const qIndex = parseInt(qid.split('_q')[1]);
        const q = questions[qIndex];

        showFeedback(qid, isRight, q.explanation);
        registerAnswer(qid, isRight);
      });

      // Enter na input
      const qid = btn.dataset.qid;
      const inp = document.getElementById(`inp_${qid}`);
      if (inp) {
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') btn.click(); });
      }
    });
  }

  // ================================================================
  // FEEDBACK
  // ================================================================
  function showFeedback(qid, isRight, explanation) {
    const fb = document.getElementById(`fb_${qid}`);
    if (!fb) return;
    fb.className = 'feedback show ' + (isRight ? 'correct' : 'wrong');
    const icon = isRight ? '✓ Correto!' : '✗ Incorreto.';
    fb.innerHTML = `<strong>${icon}</strong> ${explanation}`;
  }

  // ================================================================
  // REGISTRO E PLACAR
  // ================================================================
  function registerAnswer(qid, isRight) {
    window.MRUQuizState.answered[qid] = { correct: isRight };
    if (isRight) window.MRUQuizState.score++;
    updateScoreDisplay();
  }

  function updateScoreDisplay() {
    const numEl = document.getElementById('score-num');
    const totEl = document.getElementById('score-total');
    const msgEl = document.getElementById('score-msg');
    if (!numEl) return;

    numEl.textContent = window.MRUQuizState.score;
    totEl.textContent = window.MRUQuizState.total;

    const answered = Object.keys(window.MRUQuizState.answered).length;
    const pct = window.MRUQuizState.total > 0
      ? Math.round((window.MRUQuizState.score / window.MRUQuizState.total) * 100)
      : 0;

    if (answered === 0) {
      msgEl.textContent = 'Responda as questões para ver seu placar!';
    } else if (answered < window.MRUQuizState.total) {
      msgEl.textContent = `Você respondeu ${answered} de ${window.MRUQuizState.total} questões. Continue!`;
    } else {
      let msg = '';
      if (pct >= 90) msg = '🏆 Excelente! Você dominou o MRU!';
      else if (pct >= 70) msg = '👍 Muito bom! Revise os pontos em que errou.';
      else if (pct >= 50) msg = '📚 Razoável. Vale reler os tópicos com dificuldade.';
      else msg = '💪 Continue estudando! Releia os conceitos e tente novamente.';
      msgEl.textContent = `Você acertou ${pct}% das questões. ${msg}`;
    }
  }

  // ================================================================
  // RESET
  // ================================================================
  window.MRUQuizReset = function() {
    window.MRUQuizState.answered = {};
    window.MRUQuizState.score = 0;
    window.MRUQuizState.total = 0;
    initAllQuizzes();
    updateScoreDisplay();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ================================================================
  // INIT — renderiza todos os quizzes
  // ================================================================
  function initAllQuizzes() {
    Object.keys(QUIZZES).forEach(id => {
      renderQuiz(id, QUIZZES[id]);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllQuizzes);
  } else {
    initAllQuizzes();
  }

})();
