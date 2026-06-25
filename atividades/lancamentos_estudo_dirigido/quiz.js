// quiz.js — Questões e motor de quiz — Lançamentos de Projéteis

(function () {
  'use strict';

  function stripHtmlLocal(str) { return str.replace(/<[^>]+>/g, ''); }

  // ================================================================
  // BANCO DE QUESTÕES
  // Nova ordem: Oblíquo (geral) → Trajetória → Horizontal (caso especial)
  // ================================================================
  const QUIZZES = {

    // ── TÓPICO 01 — Movimento de Projétil ──────────────────────────
    quiz1: [
      {
        type: 'objective',
        text: 'O princípio da independência das componentes afirma que, no estudo de um projétil:',
        options: [
          'Existem dois movimentos distintos que se somam para criar a trajetória curva',
          'As componentes horizontal e vertical de um único movimento podem ser analisadas de forma independente, sem que uma interfira na outra',
          'Só existe movimento vertical, pois a gravidade domina a trajetória',
          'A velocidade horizontal aumenta à medida que o projétil cai'
        ],
        correct: 1,
        explanation: 'O projétil realiza um único movimento no espaço. O princípio da independência das componentes permite analisar a componente horizontal (MRU) e a vertical (MRUV) separadamente — os resultados se combinam para descrever o movimento completo, sem que uma componente interfira na outra.'
      },
      {
        type: 'objective',
        text: 'Em um lançamento de projétil (sem resistência do ar), qual componente da velocidade permanece constante durante todo o voo?',
        options: [
          'A componente vertical vᵧ, pois a gravidade é constante',
          'A componente horizontal vₓ, pois nenhuma força age nessa direção',
          'As duas componentes, pois a velocidade total é constante',
          'Nenhuma componente é constante'
        ],
        correct: 1,
        explanation: 'É justamente a independência das componentes que permite essa análise: na direção horizontal não há força (ar desprezado), então vₓ permanece constante durante todo o voo. Na vertical, a gravidade age continuamente, alterando vᵧ — sem que isso afete vₓ.'
      },
      {
        type: 'objective',
        text: 'Em um lançamento oblíquo, a grandeza que é máxima exatamente no ponto mais alto da trajetória é:',
        options: [
          'A velocidade total do projétil',
          'A componente horizontal da velocidade',
          'A componente vertical da velocidade',
          'A energia potencial gravitacional'
        ],
        correct: 3,
        explanation: 'No ponto mais alto, o projétil está na maior altura — portanto a energia potencial gravitacional Ep = mgh é máxima. A velocidade total é mínima (vₓ apenas), e vᵧ = 0.'
      }
    ],

    // ── TÓPICO 02 — Lançamento Oblíquo ─────────────────────────────
    quiz2: [
      {
        type: 'objective',
        text: 'O lançamento oblíquo ocorre quando a velocidade inicial v₀ está:',
        options: [
          'Totalmente na direção vertical, apontando para cima',
          'Totalmente na direção horizontal, paralela ao solo',
          'Inclinada em relação à horizontal, formando um ângulo θ',
          'Em qualquer direção — o ângulo não importa'
        ],
        correct: 2,
        explanation: 'O lançamento oblíquo é caracterizado por uma velocidade inicial que forma um ângulo θ com a horizontal — diferente do horizontal (θ=0) e do vertical (θ=90°). É o caso mais geral.'
      },
      {
        type: 'objective',
        text: 'No ponto mais alto da trajetória oblíqua, o que acontece com a velocidade do projétil?',
        options: [
          'A velocidade total é zero — o projétil para completamente',
          'Apenas vᵧ = 0; vₓ continua com seu valor original v₀ · cosθ',
          'Apenas vₓ = 0; vᵧ ainda é não nula',
          'A velocidade duplica, convertendo energia potencial em cinética'
        ],
        correct: 1,
        explanation: 'No ponto mais alto, o projétil não sobe nem desce momentaneamente — portanto vᵧ = 0. Mas vₓ = v₀cosθ continua intacta. A velocidade mínima do voo ocorre exatamente no topo: v_min = v₀cosθ.'
      },
      {
        type: 'objective',
        text: 'O ângulo θ no lançamento oblíquo é medido em relação:',
        options: [
          'À vertical — representa o desvio da queda livre',
          'À horizontal — indica a inclinação de v₀ em relação ao solo',
          'Ao vetor velocidade final — mede a curvatura total',
          'À linha de trajetória no instante de chegada'
        ],
        correct: 1,
        explanation: 'θ é o ângulo entre o vetor velocidade inicial v₀ e a direção horizontal. Portanto a componente horizontal é v₀cosθ (adjacente) e a vertical é v₀senθ (oposta).'
      }
    ],

    // ── TÓPICO 03 — Componentes do Lançamento Oblíquo ──────────────
    quiz3: [
      {
        type: 'numeric',
        text: 'Um projétil é lançado com v₀ = 50 m/s e θ = 37°. Sabendo que cos 37° = 0,8, qual é a componente horizontal v₀ₓ (em m/s)?',
        answer: 40,
        tolerance: 0.5,
        unit: 'm/s',
        explanation: 'v₀ₓ = v₀ · cosθ = 50 × 0,8 = 40 m/s. Essa componente permanece constante durante todo o voo, pois não há força horizontal.'
      },
      {
        type: 'numeric',
        text: 'O mesmo projétil (v₀ = 50 m/s, θ = 37°, sen 37° = 0,6): qual é a componente vertical inicial v₀ᵧ (em m/s)?',
        answer: 30,
        tolerance: 0.5,
        unit: 'm/s',
        explanation: 'v₀ᵧ = v₀ · senθ = 50 × 0,6 = 30 m/s. Essa componente decresce até zero no topo, depois cresce negativamente na descida.'
      },
      {
        type: 'objective',
        text: 'Durante todo o voo de um projétil oblíquo, qual afirmação é sempre verdadeira?',
        options: [
          'vₓ = v₀ · cosθ = constante, pois não há força horizontal',
          'vᵧ = v₀ · senθ = constante, pois v₀ᵧ é a velocidade inicial',
          'A velocidade total é constante, pois energia se conserva',
          'Tanto vₓ quanto vᵧ diminuem com o tempo'
        ],
        correct: 0,
        explanation: 'Sem força horizontal, vₓ = v₀cosθ permanece inalterado do início ao fim. vᵧ varia continuamente pela ação da gravidade.'
      }
    ],

    // ── TÓPICO 04 — Equações do Lançamento Oblíquo ─────────────────
    quiz4: [
      {
        type: 'numeric',
        text: 'Projétil lançado com v₀ = 50 m/s e θ = 37° (sen 37° = 0,6). Em quanto tempo (em segundos) ele atinge a altura máxima? (g = 10 m/s²)',
        answer: 3,
        tolerance: 0.1,
        unit: 's',
        explanation: 'No topo, vᵧ = 0. Usando vᵧ = v₀ᵧ − g·t → 0 = 30 − 10t → t_subida = 3 s. O tempo de voo total é T = 2 × 3 = 6 s.'
      },
      {
        type: 'numeric',
        text: 'O mesmo projétil (v₀ = 50 m/s, θ = 37°, v₀ᵧ = 30 m/s). Qual é a altura máxima H (em metros)? (g = 10 m/s²)',
        answer: 45,
        tolerance: 0.5,
        unit: 'm',
        explanation: 'H = v₀ᵧ² / (2g) = 900 / 20 = 45 m. Ou por Torricelli: 0 = v₀ᵧ² − 2gH → H = v₀ᵧ²/(2g).'
      },
      {
        type: 'numeric',
        text: 'O mesmo projétil (v₀ = 50 m/s, θ = 37°). Qual é o tempo total de voo T (em segundos)? (g = 10 m/s²)',
        answer: 6,
        tolerance: 0.1,
        unit: 's',
        explanation: 'T = 2 · t_subida = 2 × 3 = 6 s. O projétil leva o mesmo tempo para subir e para descer (lançado e pousado na mesma altura) — simetria da trajetória parabólica.'
      }
    ],

    // ── TÓPICO 05 — Trajetória ──────────────────────────────────────
    quiz5: [
      {
        type: 'objective',
        text: 'A trajetória de um projétil lançado obliquamente (sem resistência do ar) tem formato de:',
        options: [
          'Reta inclinada, pois a velocidade é quase constante',
          'Arco de círculo, pois a aceleração é constante',
          'Parábola, pois x cresce linearmente enquanto y cresce com t²',
          'Elipse, pois a gravidade curva o trajeto de forma suave'
        ],
        correct: 2,
        explanation: 'Como x = v₀ₓ·t (MRU) e y = v₀ᵧ·t − ½gt² (MRUV), eliminando t obtemos uma equação do tipo y = ax − bx² — uma parábola.'
      },
      {
        type: 'objective',
        text: 'A fórmula do alcance horizontal R de um lançamento oblíquo (lançado e pousado na mesma altura) é:',
        options: [
          'R = v₀² · cosθ / g',
          'R = v₀² · sen(2θ) / g',
          'R = v₀ · senθ · T / 2',
          'R = v₀² / (g · cosθ)'
        ],
        correct: 1,
        explanation: 'R = v₀ₓ · T = (v₀cosθ)(2v₀senθ/g) = v₀² · 2senθcosθ / g = v₀² · sen(2θ) / g. A identidade trignométrica sen(2θ) = 2senθcosθ simplifica o resultado.'
      },
      {
        type: 'numeric',
        text: 'O mesmo projétil de antes (v₀ = 50 m/s, θ = 37°, v₀ₓ = 40 m/s, T = 6 s). Qual é o alcance R (em metros)?',
        answer: 240,
        tolerance: 2,
        unit: 'm',
        explanation: 'R = v₀ₓ · T = 40 × 6 = 240 m. Ou: R = v₀² · sen(2×37°)/g = 2500 · sen(74°)/10 ≈ 240 m.'
      }
    ],

    // ── TÓPICO 06 — Alcance Máximo ─────────────────────────────────
    quiz6: [
      {
        type: 'objective',
        text: 'Para qual ângulo de lançamento θ o alcance horizontal é máximo (com v₀ e g fixos)?',
        options: [
          'θ = 30°, pois equilibra subida e alcance',
          'θ = 45°, pois sen(2 × 45°) = sen(90°) = 1, valor máximo',
          'θ = 60°, pois a componente vertical é maior',
          'θ = 90°, pois toda a velocidade é aproveitada'
        ],
        correct: 1,
        explanation: 'R = v₀² · sen(2θ)/g é máximo quando sen(2θ) = 1, ou seja, 2θ = 90° → θ = 45°. Nesse ângulo R_max = v₀²/g.'
      },
      {
        type: 'numeric',
        text: 'Um projétil é lançado com v₀ = 20 m/s e θ = 45°. Qual é o alcance R (em metros)? (g = 10 m/s²)',
        answer: 40,
        tolerance: 0.5,
        unit: 'm',
        explanation: 'R = v₀² · sen(90°) / g = 400 × 1 / 10 = 40 m. Para θ = 45°: R_max = v₀²/g diretamente.'
      },
      {
        type: 'objective',
        text: 'Dois projéteis com mesma v₀: um lançado a 30°, outro a 60°. Qual é a relação entre seus alcances?',
        options: [
          'Os alcances são iguais, pois 30° e 60° são ângulos complementares e sen(2×30°) = sen(2×60°)',
          'O de 60° tem maior alcance, pois sobe mais alto',
          'O de 30° tem maior alcance, pois tem maior componente horizontal',
          'Depende da massa do projétil'
        ],
        correct: 0,
        explanation: 'sen(2×30°) = sen(60°) e sen(2×60°) = sen(120°) = sen(60°). Os dois senos são iguais, portanto R é o mesmo. Ângulos complementares (soma = 90°) sempre produzem o mesmo alcance.'
      }
    ],

    // ── TÓPICO 07 — Altura e Tempo de Voo ──────────────────────────
    quiz7: [
      {
        type: 'objective',
        text: 'Por que o tempo de descida é igual ao de subida em um lançamento oblíquo (pousando na mesma altura)?',
        options: [
          'Porque a velocidade inicial e final têm o mesmo módulo',
          'Porque a trajetória parabólica é simétrica em relação ao ponto mais alto',
          'Porque a aceleração gravitacional dobra na descida',
          'Porque vₓ é constante durante todo o voo'
        ],
        correct: 1,
        explanation: 'A trajetória parabólica é simétrica em relação ao eixo vertical que passa pelo ponto mais alto. Portanto t_subida = t_descida = v₀ᵧ/g e T = 2v₀ᵧ/g.'
      },
      {
        type: 'numeric',
        text: 'Um projétil com v₀ = 40 m/s e θ = 30° (sen 30° = 0,5). Qual é a altura máxima H (em metros)? (g = 10 m/s²)',
        answer: 20,
        tolerance: 0.5,
        unit: 'm',
        explanation: 'v₀ᵧ = 40 × 0,5 = 20 m/s. H = v₀ᵧ²/(2g) = 400/20 = 20 m.'
      },
      {
        type: 'numeric',
        text: 'O mesmo projétil (v₀ = 40 m/s, θ = 30°, v₀ᵧ = 20 m/s). Qual é o tempo total de voo T (em segundos)? (g = 10 m/s²)',
        answer: 4,
        tolerance: 0.1,
        unit: 's',
        explanation: 'T = 2 · v₀ᵧ/g = 2 × 20/10 = 4 s. Dica: t_subida = 20/10 = 2 s; T = 2 × 2 = 4 s.'
      }
    ],

    // ── TÓPICO 08 — Lançamento Horizontal (caso especial) ──────────
    quiz8: [
      {
        type: 'objective',
        text: 'O lançamento horizontal pode ser visto como um caso especial do oblíquo com:',
        options: [
          'θ = 90°, pois toda a velocidade vai para cima',
          'θ = 45°, pois é o ângulo de maior alcance',
          'θ = 0°, pois v₀ é completamente horizontal e v₀ᵧ = 0',
          'θ = qualquer valor — só muda a altura de lançamento'
        ],
        correct: 2,
        explanation: 'Com θ = 0°: v₀ₓ = v₀·cos0° = v₀ e v₀ᵧ = v₀·sen0° = 0. Toda a velocidade inicial é horizontal — não há componente vertical de partida. O movimento vertical começa como queda livre.'
      },
      {
        type: 'numeric',
        text: 'Um objeto é lançado horizontalmente com v₀ = 10 m/s a partir de h = 20 m. Quanto tempo leva para atingir o solo? (g = 10 m/s²)',
        answer: 2,
        tolerance: 0.05,
        unit: 's',
        explanation: 'Na vertical: h = ½gt² → 20 = ½ × 10 × t² → t² = 4 → t = 2 s. A velocidade horizontal não altera o tempo de queda.'
      },
      {
        type: 'numeric',
        text: 'O mesmo objeto (v₀ = 10 m/s, t = 2 s). A que distância horizontal x (em metros) cai?',
        answer: 20,
        tolerance: 0.5,
        unit: 'm',
        explanation: 'x = v₀ · t = 10 × 2 = 20 m. Horizontalmente é MRU: velocidade constante, sem aceleração.'
      }
    ],

    // ── TÓPICO 09 — Casos Especiais ────────────────────────────────
    quiz9: [
      {
        type: 'objective',
        text: 'Dois projéteis com mesma v₀: um a θ = 30°, outro a θ = 60°. Além do mesmo alcance, o que mais difere entre eles?',
        options: [
          'Nada — as trajetórias são idênticas',
          'O de 60° atinge maior altura e leva mais tempo de voo',
          'O de 30° atinge maior altura e leva mais tempo de voo',
          'O de 45° teria o maior alcance, não os dois citados'
        ],
        correct: 1,
        explanation: 'O de 60° tem v₀ᵧ maior (v₀sen60° > v₀sen30°), portanto sobe mais alto (H ∝ v₀ᵧ²) e fica mais tempo no ar (T ∝ v₀ᵧ). Mesmo alcance, trajetória mais "alta e lenta".'
      },
      {
        type: 'objective',
        text: 'O que acontece com o alcance R quando θ = 90°?',
        options: [
          'R é máximo, pois toda a velocidade é aproveitada',
          'R = v₀²/g, o maior alcance possível',
          'R = 0, pois o projétil sobe e cai no mesmo ponto',
          'Depende da altura inicial h₀'
        ],
        correct: 2,
        explanation: 'A 90°, v₀ₓ = v₀cos90° = 0 — não há componente horizontal. O projétil sobe verticalmente e retorna ao ponto de partida: R = 0. Pela fórmula: R = v₀²·sen(180°)/g = 0.'
      },
      {
        type: 'numeric',
        text: 'Se um projétil lançado a θ = 30° percorre certo alcance R, qual ângulo (em graus) produziria exatamente o mesmo alcance R?',
        answer: 60,
        tolerance: 1,
        unit: '°',
        explanation: 'Ângulos complementares (soma = 90°) geram o mesmo alcance. O complementar de 30° é 90° − 30° = 60°. Confirmação: sen(2×30°) = sen(60°) = sen(120°) = sen(2×60°).'
      }
    ]

  };

  window.LOQuizData = QUIZZES;

  window.LOQuizState = { answered: {}, total: 0, score: 0 };

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
      html += '<span class="question-num">Questão ' + ((_numBase[containerId] || 0) + i + 1) + '</span>';
      html += '<p class="question-text">' + q.text + '</p>';

      if (q.type === 'objective') {
        const letters = ['A','B','C','D','E'];
        html += '<div class="options-list" id="opts_' + qid + '">';
        q.options.forEach((opt, oi) => {
          html += '<button class="option-btn" data-qid="' + qid + '" data-oi="' + oi + '" data-correct="' + q.correct + '"'
            + ' aria-label="Opção ' + letters[oi] + ': ' + stripHtmlLocal(opt) + '">'
            + '<span class="opt-letter" aria-hidden="true">' + letters[oi] + '</span>' + opt + '</button>';
        });
        html += '</div>';
      } else {
        html += '<div class="numeric-row">'
          + '<input type="number" class="numeric-inp" id="inp_' + qid + '" placeholder="resposta" step="any"'
          + ' aria-label="Digite a resposta em ' + q.unit + '" />'
          + '<span class="numeric-unit" aria-hidden="true">' + q.unit + '</span>'
          + '<button class="submit-btn" data-qid="' + qid + '" data-answer="' + q.answer + '" data-tol="' + q.tolerance + '"'
          + ' aria-label="Verificar resposta">Verificar</button></div>';
      }
      html += '<div class="feedback" id="fb_' + qid + '" role="status" aria-live="polite" aria-atomic="true"></div>';
      html += '</div>';
    });

    container.innerHTML = html;
    window.LOQuizState.total += questions.length;
    updateScoreDisplay();
    bindEvents(container, questions, containerId);
  }

  function bindEvents(container, questions, quizId) {
    container.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const qid = this.dataset.qid;
        if (window.LOQuizState.answered[qid]) return;
        const oi = parseInt(this.dataset.oi), correct = parseInt(this.dataset.correct);
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
        if (window.LOQuizState.answered[qid]) return;
        const inp = document.getElementById('inp_' + qid);
        const val = parseFloat(inp.value);
        if (isNaN(val)) { showFeedback(qid, false, 'Por favor, digite um número.'); return; }
        const answer = parseFloat(this.dataset.answer), tol = parseFloat(this.dataset.tol);
        const isRight = Math.abs(val - answer) <= tol;
        inp.disabled = true; this.disabled = true;
        const q = questions[parseInt(qid.split('_q')[1])];
        showFeedback(qid, isRight, q.explanation);
        registerAnswer(qid, isRight, { type: 'numeric', chosenValue: val, correctValue: answer, unit: q.unit || '' });
      });
      const inp = document.getElementById('inp_' + btn.dataset.qid);
      if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') btn.click(); });
    });
  }

  function showFeedback(qid, isRight, explanation) {
    const fb = document.getElementById('fb_' + qid);
    if (!fb) return;
    fb.className = 'feedback show ' + (isRight ? 'correct' : 'wrong');
    fb.innerHTML = '<strong>' + (isRight ? '✓ Correto!' : '✗ Incorreto.') + '</strong> ' + explanation;
  }

  function registerAnswer(qid, isRight, extra) {
    window.LOQuizState.answered[qid] = Object.assign({ correct: isRight }, extra || {});
    if (isRight) window.LOQuizState.score++;
    updateScoreDisplay();
  }

  function updateScoreDisplay() {
    const numEl = document.getElementById('score-num');
    const totEl = document.getElementById('score-total');
    const msgEl = document.getElementById('score-msg');
    if (!numEl) return;
    numEl.textContent = window.LOQuizState.score;
    totEl.textContent = window.LOQuizState.total;
    const answered = Object.keys(window.LOQuizState.answered).length;
    const pct = window.LOQuizState.total > 0 ? Math.round(window.LOQuizState.score / window.LOQuizState.total * 100) : 0;
    if (answered === 0) msgEl.textContent = 'Responda as questões para ver seu placar!';
    else if (answered < window.LOQuizState.total) msgEl.textContent = 'Você respondeu ' + answered + ' de ' + window.LOQuizState.total + ' questões. Continue!';
    else {
      const msgs = ['💪 Continue! Releia os conceitos e tente novamente.','📚 Razoável. Releia os tópicos com dificuldade.','👍 Muito bom! Revise os pontos em que errou.','🏆 Excelente! Domínio completo dos lançamentos!'];
      msgEl.textContent = 'Você acertou ' + pct + '% das questões. ' + msgs[pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 50 ? 1 : 0];
    }
  }

  window.LOQuizReset = function () {
    window.LOQuizState.answered = {};
    window.LOQuizState.score = 0;
    window.LOQuizState.total = 0;
    _answersArranged = false;
    initAllQuizzes();
    updateScoreDisplay();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  let _numBase = {};
  function computeNumbering() {
    _numBase = {};
    const present = Object.keys(QUIZZES).filter(id => document.getElementById(id));
    present.sort((a, b) => {
      const ea = document.getElementById(a), eb = document.getElementById(b);
      return (ea.compareDocumentPosition(eb) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1;
    });
    let acc = 0;
    present.forEach(id => { _numBase[id] = acc; acc += QUIZZES[id].length; });
  }

  function _seededShuffle(arr, seed) {
    let s = seed >>> 0;
    for (let i = arr.length - 1; i > 0; i--) {
      s = (s * 1664525 + 1013904223) >>> 0;
      const j = s % (i + 1);
      const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  function _isPinnedOpt(opt) { return /nenhuma das|todas as alternativas|n\.d\.a\./i.test(opt); }
  let _answersArranged = false;
  function arrangeAnswers() {
    if (_answersArranged) return;
    _answersArranged = true;
    const objs = [];
    Object.keys(QUIZZES).forEach(id => QUIZZES[id].forEach(q => {
      if (q.type === 'objective' && Array.isArray(q.options) && !q.options.some(o => _isPinnedOpt(String(o)))) objs.push(q);
    }));
    const targets = objs.map((_, i) => i % 4);
    _seededShuffle(targets, 20260609);
    objs.forEach((q, i) => {
      const n = q.options.length, target = targets[i] % n;
      const correctOpt = q.options[q.correct];
      const rest = q.options.filter((_, idx) => idx !== q.correct);
      const out = []; let r = 0;
      for (let p = 0; p < n; p++) out.push(p === target ? correctOpt : rest[r++]);
      q.options = out; q.correct = target;
    });
  }

  function initAllQuizzes() {
    arrangeAnswers();
    computeNumbering();
    Object.keys(QUIZZES).forEach(id => renderQuiz(id, QUIZZES[id]));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAllQuizzes);
  else initAllQuizzes();

})();
