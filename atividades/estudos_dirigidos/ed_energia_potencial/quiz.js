// quiz.js — Questões e motor de quiz — Energia Potencial e Conservação

(function () {
  'use strict';

  function stripHtmlLocal(str) { return str.replace(/<[^>]+>/g, ''); }

  // ================================================================
  // BANCO DE QUESTÕES
  // ================================================================
  const QUIZZES = {

    quiz4: [
      {
        type: 'numeric',
        text: 'Uma pedra de 5 kg está a 8 m de altura. Qual é sua energia potencial gravitacional em relação ao chão? (use g = 10 m/s²)',
        answer: 400,
        tolerance: 0,
        unit: 'J',
        explanation: 'Epg = m × g × h = 5 × 10 × 8 = 400 J.'
      },
      {
        type: 'numeric',
        text: 'Uma pedra de 2 kg cai de 20 m de altura até uma saliência na parede a 8 m do chão. Qual é a variação de energia potencial gravitacional da pedra entre esses dois pontos? (use g = 10 m/s² e inclua o sinal na resposta)',
        answer: -240,
        tolerance: 0,
        unit: 'J',
        explanation: 'ΔEpg = m × g × (h<sub>f</sub> − h<sub>i</sub>) = 2 × 10 × (8 − 20) = 20 × (−12) = −240 J. O sinal negativo indica que a energia potencial gravitacional diminuiu, pois a pedra desceu. Confirmando separadamente: Epg<sub>f</sub> − Epg<sub>i</sub> = (2×10×8) − (2×10×20) = 160 − 400 = −240 J.'
      },
      {
        type: 'objective',
        text: 'Quando uma pedra cai livremente de uma certa altura até o chão (desconsiderando o ar), o que acontece com sua energia?',
        options: [
          'A energia cinética aumenta, mas a energia potencial gravitacional permanece constante.',
          'A energia potencial gravitacional se converte em energia cinética ao longo da queda.',
          'A energia total do sistema aumenta devido à aceleração da gravidade.',
          'A energia cinética é destruída ao bater no chão, liberando energia.'
        ],
        correct: 1,
        explanation: 'Pela conservação de energia mecânica, a energia potencial gravitacional (Epg = mgh) vai diminuindo conforme a pedra cai e a altura h diminui. Essa energia se converte em energia cinética (Ec = ½mv²). A energia total (Ec + Epg) permanece constante.'
      },
      {
        type: 'objective',
        text: 'Uma caixa de 3 kg está sobre uma mesa de 1 m de altura em relação ao chão. Adotando o chão como referencial (h = 0), sua Epg é 30 J. Se adotarmos a mesa como novo referencial (h = 0 na mesa), qual é a Epg da caixa sobre a mesa?',
        options: [
          'Ainda 30 J — a energia potencial não depende do referencial escolhido.',
          '−30 J — pois a caixa está abaixo do referencial original.',
          '0 J — pois h = 0 foi definido na posição da caixa.',
          'Depende da massa da caixa e da aceleração da gravidade.'
        ],
        correct: 2,
        explanation: 'Epg = mgh. Se definimos h = 0 na posição da própria caixa (topo da mesa), então h = 0 e Epg = mg × 0 = 0 J. Isso mostra que o valor de Epg depende do referencial adotado — por isso apenas a variação ΔEpg é fisicamente significativa e independe do referencial.'
      }
    ],

    quizEpe: [
      {
        type: 'objective',
        text: 'Uma mola é comprimida 2 cm e armazena uma certa energia potencial elástica. Se a compressão for dobrada para 4 cm, o que acontece com a energia potencial elástica?',
        options: [
          'Dobra, pois a deformação dobrou.',
          'Triplica.',
          'Quadruplica, pois Epe é proporcional ao quadrado da deformação.',
          'Permanece a mesma, pois k não mudou.'
        ],
        correct: 2,
        explanation: 'Epe = ½kx². Se x dobra (2x), Epe = ½k(2x)² = 4 × ½kx². A energia potencial elástica quadruplica. Esse é o mesmo comportamento da energia cinética em relação à velocidade: ambas crescem com o quadrado de sua grandeza de referência.'
      },
      {
        type: 'numeric',
        text: 'Uma mola de constante elástica k = 400 N/m é comprimida 0,1 m em relação à sua posição natural. Qual é sua energia potencial elástica?',
        answer: 2,
        tolerance: 0,
        unit: 'J',
        explanation: 'Epe = ½ × k × x² = ½ × 400 × (0,1)² = ½ × 400 × 0,01 = 2 J.'
      },
      {
        type: 'objective',
        text: 'Em um sistema massa-mola ideal oscilando horizontalmente (sem atrito), ao passar pela posição de equilíbrio (posição natural da mola, x = 0):',
        options: [
          'A energia potencial elástica é máxima e a energia cinética é zero.',
          'A energia potencial elástica é zero e a energia cinética é máxima.',
          'A energia potencial elástica e a energia cinética são iguais.',
          'A energia mecânica total é zero, pois a deformação é zero.'
        ],
        correct: 1,
        explanation: 'Em x = 0, a mola está na posição natural: Epe = ½k(0)² = 0. Toda a energia mecânica está na forma de energia cinética, que é máxima nesse ponto. Atenção: a energia mecânica total não é zero — ela foi toda transferida para a forma cinética.'
      },
      {
        type: 'numeric',
        text: 'Uma mola de k = 50 N/m é comprimida 0,2 m e prende um bloco de 0,5 kg inicialmente em repouso sobre uma superfície horizontal sem atrito. Ao ser liberado, qual é a velocidade do bloco ao passar pela posição de equilíbrio? (em m/s)',
        answer: 2,
        tolerance: 0,
        unit: 'm/s',
        explanation: 'Epe inicial = ½ × 50 × (0,2)² = ½ × 50 × 0,04 = 1 J. Na posição de equilíbrio, Epe = 0 e toda a energia é cinética: Ec = ½mv² = 1 J → ½ × 0,5 × v² = 1 → v² = 4 → v = 2 m/s.'
      }
    ],

    quizEm: [
      {
        type: 'objective',
        text: 'A energia mecânica de um sistema é definida como:',
        options: [
          'Apenas a energia cinética, pois é a energia associada ao movimento.',
          'Apenas a energia potencial, pois é a energia armazenada pela posição.',
          'A soma da energia cinética com as energias potenciais do sistema.',
          'A diferença entre a energia cinética e a energia potencial.'
        ],
        correct: 2,
        explanation: 'A energia mecânica é Em = Ec + Ep. Ela reúne a energia cinética (associada ao movimento) e as energias potenciais do sistema (gravitacional, elástica, etc.). As demais alternativas descrevem apenas uma parte da energia mecânica, ou uma combinação incorreta.'
      },
      {
        type: 'objective',
        text: 'Em qual das situações abaixo a energia mecânica é conservada?',
        options: [
          'Um bloco deslizando sobre uma superfície com atrito cinético.',
          'Uma pedra em queda livre no vácuo.',
          'Um automóvel freando até parar.',
          'Uma bola quicando e perdendo altura a cada salto.'
        ],
        correct: 1,
        explanation: 'Na queda livre no vácuo, apenas a gravidade (força conservativa) realiza trabalho sobre a pedra. Não há atrito nem resistência do ar. A energia potencial gravitacional se converte integralmente em energia cinética, e a energia mecânica total se conserva. Nas demais situações, forças dissipativas (atrito cinético, resistência do ar) convertem parte da energia mecânica em energia térmica.'
      },
      {
        type: 'objective',
        text: 'Um pêndulo real é solto e oscila durante alguns minutos até parar completamente. O que acontece com a energia mecânica do sistema durante esse processo?',
        options: [
          'Permanece constante, pois a lei de conservação de energia é sempre válida.',
          'Aumenta gradualmente, pois a gravidade realiza trabalho positivo em cada oscilação.',
          'Diminui gradualmente, sendo convertida em energia térmica pela resistência do ar e pelo atrito no ponto de suspensão.',
          'É anulada completamente e destruída quando o pêndulo para.'
        ],
        correct: 2,
        explanation: 'A resistência do ar e o atrito no ponto de suspensão são forças dissipativas: convertem energia mecânica em energia térmica a cada oscilação. A amplitude diminui progressivamente. Quando o pêndulo para, toda a energia mecânica inicial foi convertida em calor. A energia total do universo se conserva, mas não a energia mecânica isolada do sistema.'
      }
    ],

    quizConserv: [
      {
        type: 'objective',
        text: 'Em um pêndulo ideal (sem atrito e sem resistência do ar), no ponto mais baixo da trajetória, onde a velocidade é máxima:',
        options: [
          'Toda a energia mecânica é potencial gravitacional, pois é o ponto de equilíbrio.',
          'A energia cinética e a energia potencial gravitacional são iguais nesse ponto.',
          'A energia cinética assume seu valor máximo e a energia potencial gravitacional assume seu valor mínimo.',
          'A energia mecânica é zero, pois a altura é zero.'
        ],
        correct: 2,
        explanation: 'No ponto mais baixo da trajetória, a altura é mínima e, portanto, a energia potencial gravitacional é mínima. Como a energia mecânica se conserva, a energia cinética é máxima nesse ponto. É por isso que a velocidade também é máxima.'
      },
      {
        type: 'numeric',
        text: 'Um pêndulo é solto do repouso de uma posição a 0,8 m acima do ponto mais baixo da trajetória. Desprezando atrito e resistência do ar, qual é a velocidade do pêndulo no ponto mais baixo? (g = 10 m/s²)',
        answer: 4,
        tolerance: 0,
        unit: 'm/s',
        explanation: 'Conservação de energia mecânica: mgh = ½mv² → v² = 2gh = 2 × 10 × 0,8 = 16 → v = 4 m/s. A massa do pêndulo cancela e não afeta o resultado. A velocidade depende apenas da altura de soltura.'
      },
      {
        type: 'numeric',
        text: 'Um esquiador parte do repouso do topo de uma ladeira a 20 m de altura em relação à base. Desprezando atrito e resistência do ar, qual é a velocidade do esquiador ao chegar na base? (g = 10 m/s²)',
        answer: 20,
        tolerance: 0,
        unit: 'm/s',
        explanation: 'mgh = ½mv² → v² = 2gh = 2 × 10 × 20 = 400 → v = 20 m/s. A massa do esquiador cancela dos dois lados da equação. Dois esquiadores de massas diferentes, partindo da mesma altura sem atrito, atingem a mesma velocidade na base.'
      },
      {
        type: 'numeric',
        text: 'Uma pedra cai do repouso de 45 m de altura, sem resistência do ar. Qual é a velocidade da pedra ao atingir o chão? (g = 10 m/s²)',
        answer: 30,
        tolerance: 0,
        unit: 'm/s',
        explanation: 'Em = constante: Epg = Ec → mgh = ½mv² → v² = 2gh = 2 × 10 × 45 = 900 → v = 30 m/s. A massa cancela — a velocidade final depende apenas da altura e de g.'
      },
      {
        type: 'numeric',
        text: 'Uma mola de k = 200 N/m é comprimida 0,5 m e lança um bloco de 2 kg horizontalmente sobre uma superfície sem atrito. Qual é a velocidade do bloco ao deixar a mola? (em m/s)',
        answer: 5,
        tolerance: 0,
        unit: 'm/s',
        explanation: 'Epe = ½ × 200 × (0,5)² = ½ × 200 × 0,25 = 25 J. Ao ser liberado, toda a energia potencial elástica se converte em energia cinética: Ec = ½mv² = 25 J → ½ × 2 × v² = 25 → v² = 25 → v = 5 m/s.'
      }
    ],

    quiz7: [
      {
        type: 'numeric',
        text: 'Um carrinho parte do repouso de uma altura de 20 m em uma pista sem atrito. Usando conservação de energia (g = 10 m/s²), qual é a velocidade do carrinho no ponto mais baixo da pista, em m/s?',
        answer: 20,
        tolerance: 0,
        unit: 'm/s',
        explanation: 'Ep = Ec → mgh = ½mv² → gh = ½v² → v² = 2 × 10 × 20 = 400 → v = 20 m/s. A massa não afeta a velocidade final em sistemas sem atrito — ela cancela dos dois lados da equação.'
      },
      {
        type: 'objective',
        text: 'Em uma montanha-russa sem atrito, em qual ponto o carrinho possui a maior energia cinética?',
        options: [
          'No ponto mais alto da pista, onde a aceleração é máxima.',
          'No ponto mais baixo da pista, onde a altura é mínima e toda a energia potencial virou cinética.',
          'No ponto de maior curvatura, onde a força centrípeta é máxima.',
          'No meio da pista, onde Ec e Ep são iguais.'
        ],
        correct: 1,
        explanation: 'Pela conservação de energia (sem atrito), Ec + Ep = constante. A Ep é mínima no ponto mais baixo (h mínima), portanto a Ec é máxima nesse ponto. É nesse ponto que o carrinho atinge a maior velocidade.'
      },
      {
        type: 'numeric',
        text: 'Um bloco de 2 kg desce uma rampa de h = 8 m. Ao chegar ao fundo, sua velocidade é de 10 m/s. Qual foi a energia dissipada pelo atrito durante a descida? (g = 10 m/s²)',
        answer: 60,
        tolerance: 1,
        unit: 'J',
        explanation: 'Ep inicial = mgh = 2 × 10 × 8 = 160 J. Ec final = ½mv² = ½ × 2 × 100 = 100 J. Energia dissipada = 160 − 100 = 60 J. Essa energia foi convertida em calor pelo atrito entre o bloco e a rampa.'
      },
      {
        type: 'numeric',
        text: 'Uma bola de 0,5 kg é lançada verticalmente para cima com v₀ = 20 m/s, sem resistência do ar. A que altura a bola atinge a velocidade de 10 m/s? (g = 10 m/s²)',
        answer: 15,
        tolerance: 0,
        unit: 'm',
        explanation: 'Conservação de energia: ½mv₀² = ½mv² + mgh. A massa cancela: ½v₀² = ½v² + gh → ½ × 400 = ½ × 100 + 10 × h → 200 = 50 + 10h → h = 15 m.'
      }
    ],

    quizDissip: [
      {
        type: 'objective',
        text: 'Um bloco desliza sobre uma superfície rugosa e para completamente. O que acontece com sua energia cinética inicial?',
        options: [
          'É destruída pelo atrito — desaparece do universo.',
          'Converte-se em energia potencial gravitacional, armazenada no bloco.',
          'Transforma-se em energia térmica: o bloco e a superfície ficam levemente mais quentes.',
          'É armazenada no bloco como energia química para uso futuro.'
        ],
        correct: 2,
        explanation: 'O atrito cinético é uma força dissipativa: converte energia mecânica em energia térmica. As moléculas na região de contato vibram mais intensamente, aumentando a temperatura do bloco e da superfície. A energia não desaparece — transforma-se. A lei de conservação de energia total nunca é violada.'
      },
      {
        type: 'objective',
        text: 'Em um sistema com forças dissipativas (como atrito cinético), qual expressão representa corretamente o balanço de energia entre dois instantes 1 e 2?',
        options: [
          'Em₁ = Em₂ (a energia mecânica se conserva mesmo com atrito).',
          'Em₁ − Em₂ = Q, onde Q &gt; 0 é a energia dissipada como calor.',
          'Em₁ + Em₂ = Q (a soma das energias mecânicas iguala o calor gerado).',
          'Em₁ = Em₂ × Q (a energia mecânica final é proporcional ao calor).'
        ],
        correct: 1,
        explanation: 'Com forças dissipativas, a energia mecânica diminui do instante 1 para o 2. A diferença Em₁ − Em₂ = Q > 0 é convertida em energia térmica. Reescrevendo: Em₁ = Em₂ + Q. Isso garante a conservação da energia total: o que saiu da energia mecânica entrou na energia térmica.'
      },
      {
        type: 'numeric',
        text: 'Um carrinho de 2 kg parte do repouso de h = 5 m e chega ao fundo da rampa com v = 6 m/s. Qual é a energia dissipada pelo atrito durante a descida? (g = 10 m/s²)',
        answer: 64,
        tolerance: 0,
        unit: 'J',
        explanation: 'Em₁ = Epg = mgh = 2 × 10 × 5 = 100 J. Em₂ = Ec = ½mv² = ½ × 2 × 36 = 36 J. Q = Em₁ − Em₂ = 100 − 36 = 64 J. Essa energia foi convertida em calor pelo atrito entre o carrinho e a rampa.'
      },
      {
        type: 'numeric',
        text: 'Uma caixa de 3 kg parte do repouso de h = 8 m em uma rampa e chega ao fundo com v = 10 m/s. Qual é a energia dissipada pelo atrito durante a descida? (g = 10 m/s²)',
        answer: 90,
        tolerance: 0,
        unit: 'J',
        explanation: 'Em₁ = mgh = 3 × 10 × 8 = 240 J. Em₂ = ½mv² = ½ × 3 × 100 = 150 J. Q = Em₁ − Em₂ = 240 − 150 = 90 J. Essa energia foi dissipada como calor pelo atrito, aquecendo levemente a caixa e a superfície da rampa.'
      }
    ]

  };

  // Expõe para relatório
  window.EnergiaQuizData = QUIZZES;

  // ================================================================
  // ESTADO GLOBAL
  // ================================================================
  window.EnergiaQuizState = {
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
      html += '<span class="question-num">Questão ' + ((_numBase[containerId] || 0) + i + 1) + '</span>';
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
    window.EnergiaQuizState.total += questions.length;
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
        if (window.EnergiaQuizState.answered[qid]) return;

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
        if (window.EnergiaQuizState.answered[qid]) return;

        const inp = document.getElementById('inp_' + qid);
        const val = parseFloat(inp.value);
        if (isNaN(val)) { showFeedback(qid, false, 'Por favor, digite um número.'); return; }

        const answer = parseFloat(this.dataset.answer);
        const tol    = parseFloat(this.dataset.tol);
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
    window.EnergiaQuizState.answered[qid] = Object.assign({ correct: isRight }, extra || {});
    if (isRight) window.EnergiaQuizState.score++;
    updateScoreDisplay();
  }

  function updateScoreDisplay() {
    const numEl = document.getElementById('score-num');
    const totEl = document.getElementById('score-total');
    const msgEl = document.getElementById('score-msg');
    if (!numEl) return;

    numEl.textContent = window.EnergiaQuizState.score;
    totEl.textContent = window.EnergiaQuizState.total;

    const answered = Object.keys(window.EnergiaQuizState.answered).length;
    const pct = window.EnergiaQuizState.total > 0
      ? Math.round((window.EnergiaQuizState.score / window.EnergiaQuizState.total) * 100) : 0;

    if (answered === 0) {
      msgEl.textContent = 'Responda as questões para ver seu placar!';
    } else if (answered < window.EnergiaQuizState.total) {
      msgEl.textContent = 'Você respondeu ' + answered + ' de ' + window.EnergiaQuizState.total + ' questões. Continue!';
    } else {
      let msg = '';
      if (pct >= 90) msg = '⚡ Excelente! Você domina o conceito de energia!';
      else if (pct >= 70) msg = '👍 Muito bom! Revise os pontos em que errou.';
      else if (pct >= 50) msg = '📚 Razoável. Releia os tópicos com mais dificuldade.';
      else msg = '💪 Continue! Releia os conceitos e tente novamente.';
      msgEl.textContent = 'Você acertou ' + pct + '% das questões. ' + msg;
    }
  }

  // ================================================================
  // RESET
  // ================================================================
  window.EnergiaQuizReset = function () {
    window.EnergiaQuizState.answered = {};
    window.EnergiaQuizState.score = 0;
    window.EnergiaQuizState.total = 0;
    initAllQuizzes();
    updateScoreDisplay();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ================================================================
  // INIT
  // ================================================================
  // ================================================================
  // NUMERAÇÃO SEQUENCIAL (segue a ordem no DOM, não a das chaves)
  // ================================================================
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

  // ================================================================
  // DISTRIBUIÇÃO BALANCEADA DA ALTERNATIVA CORRETA ENTRE AS LETRAS
  // Reposiciona apenas a opção correta (distratores mantêm a ordem),
  // de forma determinística e estável entre recarregamentos.
  // ================================================================
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
      if (q.type === 'objective' && Array.isArray(q.options)
          && !q.options.some(o => _isPinnedOpt(String(o)))) objs.push(q);
    }));
    const targets = objs.map((_, i) => i % 4);
    _seededShuffle(targets, 20260609);
    objs.forEach((q, i) => {
      const n = q.options.length;
      const target = targets[i] % n;
      const correctOpt = q.options[q.correct];
      const rest = q.options.filter((_, idx) => idx !== q.correct);
      const out = [];
      let r = 0;
      for (let p = 0; p < n; p++) out.push(p === target ? correctOpt : rest[r++]);
      q.options = out;
      q.correct = target;
    });
  }

  function initAllQuizzes() {
    arrangeAnswers();
    computeNumbering();
    Object.keys(QUIZZES).forEach(id => renderQuiz(id, QUIZZES[id]));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllQuizzes);
  } else {
    initAllQuizzes();
  }

})();
