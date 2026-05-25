// quiz.js — Questões e motor de quiz — Energia

(function () {
  'use strict';

  function stripHtmlLocal(str) { return str.replace(/<[^>]+>/g, ''); }

  // ================================================================
  // BANCO DE QUESTÕES
  // ================================================================
  const QUIZZES = {

    quiz1: [
      {
        type: 'objective',
        text: 'O que é energia, do ponto de vista da física?',
        options: [
          'Uma substância invisível que flui pelos fios elétricos',
          'A velocidade máxima que um objeto pode atingir',
          'A capacidade de um sistema de realizar trabalho ou produzir mudanças',
          'A força exercida por campos sobre corpos em movimento'
        ],
        correct: 2,
        explanation: 'Energia é a capacidade de um sistema de realizar trabalho ou produzir mudanças. Não é uma substância, mas uma propriedade dos sistemas físicos. Ela existe em várias formas e nunca é criada nem destruída.'
      },
      {
        type: 'objective',
        text: 'Uma lâmpada recebe 500 J de energia elétrica e emite 100 J de luz e 400 J de calor. Isso demonstra que:',
        options: [
          'A lâmpada criou 100 J de luz do nada — a energia aumentou',
          'A lâmpada destruiu 400 J — o calor é energia perdida',
          'A energia foi conservada: 500 J entraram e 500 J saíram em outras formas',
          'A eficiência da lâmpada é 80%, portanto a lei de conservação não vale aqui'
        ],
        correct: 2,
        explanation: 'A lei da conservação de energia diz que energia não é criada nem destruída. Os 500 J de entrada se transformaram em 100 J de luz + 400 J de calor = 500 J. Nada foi criado nem destruído. O calor não é energia "perdida" — vai para o ambiente.'
      },
      {
        type: 'objective',
        text: 'Qual das alternativas apresenta corretamente a unidade SI de energia e sua definição?',
        options: [
          'Watt (W) = energia por segundo',
          'Newton (N) = força necessária para 1 kg × 1 m/s²',
          'Joule (J) = trabalho realizado por 1 N deslocando 1 m na direção da força',
          'Coulomb (C) = carga de 6,24 × 10¹⁸ elétrons'
        ],
        correct: 2,
        explanation: 'O joule (J) é a unidade SI de energia e trabalho. Sua definição vem do trabalho: 1 J = 1 N × 1 m = a energia transferida por uma força de 1 newton que desloca um objeto 1 metro na direção da força. O watt é potência (J/s), não energia.'
      }
    ],

    quiz2: [
      {
        type: 'numeric',
        text: 'Uma força constante de 50 N é aplicada paralelamente ao deslocamento de um objeto por 8 m. Qual é o trabalho realizado, em joules?',
        answer: 400,
        tolerance: 0,
        unit: 'J',
        explanation: 'W = F × d × cos(θ) = 50 × 8 × cos(0°) = 50 × 8 × 1 = 400 J. Como a força é paralela ao deslocamento, θ = 0° e cos(0°) = 1.'
      },
      {
        type: 'objective',
        text: 'Em qual situação o trabalho realizado pela força aplicada é zero?',
        options: [
          'Quando a força é muito pequena em relação à massa do objeto',
          'Quando a força é perpendicular ao deslocamento do objeto',
          'Quando o objeto se move em trajetória curva',
          'Quando o objeto já está em repouso antes da força ser aplicada'
        ],
        correct: 1,
        explanation: 'W = F × d × cos(θ). Quando a força é perpendicular ao deslocamento, θ = 90° e cos(90°) = 0, portanto W = 0. Exemplo clássico: a força normal do chão ao carregar um peso horizontalmente — o chão "empurra" verticalmente, mas o deslocamento é horizontal.'
      },
      {
        type: 'objective',
        text: 'O teorema trabalho-energia afirma que:',
        options: [
          'O trabalho total é igual ao produto da força pela energia potencial',
          'A energia cinética é igual ao quadrado da velocidade dividido pela massa',
          'O trabalho total realizado sobre um objeto é igual à variação de sua energia cinética',
          'O trabalho de uma força conservativa é sempre nulo'
        ],
        correct: 2,
        explanation: 'O teorema trabalho-energia afirma que W_total = ΔEc = Ec_final − Ec_inicial. É a ponte fundamental entre força/trabalho e energia. Se W > 0, a Ec aumenta (objeto acelera). Se W < 0, a Ec diminui (objeto desacelera).'
      }
    ],

    quiz3: [
      {
        type: 'numeric',
        text: 'Um objeto de massa 2 kg se move com velocidade de 10 m/s. Qual é sua energia cinética, em joules?',
        answer: 100,
        tolerance: 0,
        unit: 'J',
        explanation: 'Ec = ½ × m × v² = ½ × 2 × 10² = ½ × 2 × 100 = 100 J.'
      },
      {
        type: 'objective',
        text: 'Um carro passa de 50 km/h para 100 km/h. O que acontece com sua energia cinética?',
        options: [
          'Dobra, pois a velocidade dobrou',
          'Aumenta 1,5 vez',
          'Triplica',
          'Quadruplica, pois a energia cinética é proporcional ao quadrado da velocidade'
        ],
        correct: 3,
        explanation: 'Ec = ½mv². Se v dobra, v² quadruplica. Portanto, a energia cinética aumenta quatro vezes. Isso explica por que um choque a 100 km/h é muito mais devastador que a 50 km/h — não é apenas duas vezes pior, mas quatro.'
      },
      {
        type: 'numeric',
        text: 'Um objeto de 4 kg possui energia cinética de 200 J. Qual é sua velocidade, em m/s?',
        answer: 10,
        tolerance: 0,
        unit: 'm/s',
        explanation: 'Ec = ½mv² → 200 = ½ × 4 × v² → 200 = 2v² → v² = 100 → v = 10 m/s.'
      }
    ],

    quiz4: [
      {
        type: 'numeric',
        text: 'Uma pedra de 5 kg está a 8 m de altura em relação ao chão. Qual é sua energia potencial gravitacional? (use g = 10 m/s²)',
        answer: 400,
        tolerance: 0,
        unit: 'J',
        explanation: 'Epg = m × g × h = 5 × 10 × 8 = 400 J.'
      },
      {
        type: 'objective',
        text: 'Quando uma pedra cai livremente de uma certa altura até o chão (desconsiderando o ar), o que acontece com sua energia?',
        options: [
          'A energia cinética aumenta, mas a energia potencial gravitacional permanece constante',
          'A energia potencial gravitacional se converte em energia cinética ao longo da queda',
          'A energia total do sistema aumenta devido à aceleração da gravidade',
          'A energia cinética é destruída ao bater no chão, liberando energia'
        ],
        correct: 1,
        explanation: 'Pela conservação de energia mecânica, a energia potencial gravitacional (Epg = mgh) vai diminuindo conforme a pedra cai e a altura h diminui. Essa energia se converte em energia cinética (Ec = ½mv²). A energia total (Ec + Epg) permanece constante.'
      },
      {
        type: 'numeric',
        text: 'Uma pedra cai do repouso de 20 m de altura. Usando conservação de energia (g = 10 m/s²), qual é a velocidade da pedra ao atingir o chão? (em m/s)',
        answer: 20,
        tolerance: 0,
        unit: 'm/s',
        explanation: 'Conservação: Epg = Ec → mgh = ½mv² → gh = v²/2 → v² = 2 × 10 × 20 = 400 → v = 20 m/s. A massa não aparece — a velocidade final não depende da massa!'
      }
    ],

    quiz5: [
      {
        type: 'objective',
        text: 'Por que é necessário realizar trabalho para aproximar dois prótons (cargas positivas)?',
        options: [
          'Porque os prótons são muito pesados e resistem ao movimento',
          'Porque a força elétrica repulsiva entre eles se opõe à aproximação, e vencer essa força armazena energia potencial no sistema',
          'Porque os prótons perdem energia cinética ao se aproximar, sem ganho de energia potencial',
          'Porque o campo gravitacional entre eles deve ser vencido para aproximá-los'
        ],
        correct: 1,
        explanation: 'Dois prótons se repelem. Para aproximá-los, é preciso realizar trabalho contra a força repulsiva. Esse trabalho não desaparece — fica armazenado como energia potencial elétrica do sistema. Ao serem liberados, se afastam novamente, convertendo essa Ep em Ec.'
      },
      {
        type: 'objective',
        text: 'Qual situação apresenta a melhor analogia com o comportamento de uma carga positiva em um campo elétrico que vai espontaneamente de um ponto de alto potencial para um de baixo potencial?',
        options: [
          'Uma bola subindo uma rampa, ganhando energia potencial gravitacional',
          'Um cubo de gelo derretendo ao sol',
          'Uma pedra caindo de um penhasco, convertendo energia potencial em cinética',
          'Um carro desacelerando até parar'
        ],
        correct: 2,
        explanation: 'A carga positiva "cai" de maior para menor potencial elétrico — exatamente como uma pedra cai de maior para menor altitude. Em ambos os casos, a energia potencial diminui e a energia cinética aumenta. A analogia entre gravitação e eletrostática é muito profunda.'
      },
      {
        type: 'objective',
        text: 'Uma bateria carregada armazena energia na forma de:',
        options: [
          'Elétrons extras acumulados no terminal negativo, que saem rapidamente ao conectar o circuito',
          'Energia potencial elétrica mantida pela separação de cargas, sustentada por reações químicas internas',
          'Calor gerado pelas reações internas, que é convertido em eletricidade ao ser usado',
          'Corrente elétrica circulando rapidamente entre os dois terminais'
        ],
        correct: 1,
        explanation: 'A bateria armazena energia potencial elétrica pela separação de cargas positivas e negativas mantida por reações químicas. A bateria não cria elétrons — ela fornece a diferença de potencial que faz os elétrons já presentes no circuito fluírem, realizando trabalho nos componentes.'
      }
    ],

    quiz6: [
      {
        type: 'objective',
        text: 'Em um pêndulo ideal (sem atrito), no ponto mais alto da oscilação (velocidade momentaneamente zero), o que se pode afirmar sobre a energia?',
        options: [
          'Toda a energia do sistema é cinética, pois é onde a velocidade muda de sentido',
          'A energia mecânica total é zero, pois a velocidade é zero',
          'Toda a energia do sistema é potencial gravitacional (máxima), e a energia cinética é nula',
          'A energia cinética e potencial são iguais nesse ponto específico'
        ],
        correct: 2,
        explanation: 'No ponto mais alto, a velocidade é zero → Ec = 0. Toda a energia mecânica está na forma de energia potencial gravitacional (máxima). Ao descer, Ep diminui e Ec aumenta. No ponto mais baixo, Ep é mínima (zero se escolhermos esse referencial) e Ec é máxima.'
      },
      {
        type: 'objective',
        text: 'Quando há atrito em um sistema mecânico, o que acontece com a energia mecânica (Ec + Ep)?',
        options: [
          'Permanece constante, pois a energia total é sempre conservada',
          'Aumenta, pois o atrito gera energia extra',
          'Diminui, pois parte da energia mecânica se converte em energia térmica — mas a energia total continua constante',
          'Desaparece completamente ao longo do tempo, violando a lei de conservação'
        ],
        correct: 2,
        explanation: 'Com atrito, a energia mecânica (Ec + Ep) diminui — não porque a energia suma, mas porque parte dela se converte em energia térmica (calor) pelo atrito. A energia TOTAL (mecânica + térmica + outras formas) permanece constante. A lei de conservação nunca é violada.'
      },
      {
        type: 'numeric',
        text: 'Uma bola é lançada verticalmente para cima com velocidade inicial de 20 m/s. Usando conservação de energia (g = 10 m/s²), qual é a altura máxima atingida, em metros?',
        answer: 20,
        tolerance: 0,
        unit: 'm',
        explanation: 'No topo: v = 0. Ec_inicial = Ep_final → ½mv₀² = mgh → ½ × 20² = 10 × h → 200 = 10h → h = 20 m. Novamente, a massa cancela e não aparece na resposta.'
      }
    ],

    quiz7: [
      {
        type: 'numeric',
        text: 'Um carrinho parte do repouso de uma altura de 5 m em uma pista sem atrito. Usando conservação de energia (g = 10 m/s²), qual é a velocidade do carrinho no ponto mais baixo da pista, em m/s?',
        answer: 10,
        tolerance: 0,
        unit: 'm/s',
        explanation: 'Ep = Ec → mgh = ½mv² → gh = ½v² → v² = 2 × 10 × 5 = 100 → v = 10 m/s. A massa não afeta a velocidade final em sistemas sem atrito — ela cancela dos dois lados da equação.'
      },
      {
        type: 'objective',
        text: 'Em uma montanha-russa sem atrito, em qual ponto o carrinho possui a maior energia cinética?',
        options: [
          'No ponto mais alto da pista, onde a aceleração é máxima',
          'No ponto mais baixo da pista, onde a altura é mínima e toda a energia potencial virou cinética',
          'No ponto de maior curvatura, onde a força centrípeta é máxima',
          'No meio da pista, onde Ec e Ep são iguais'
        ],
        correct: 1,
        explanation: 'Pela conservação de energia (sem atrito), Ec + Ep = constante. A Ep é mínima no ponto mais baixo (h mínima), portanto a Ec é máxima nesse ponto. É nesse ponto que o carrinho atinge a maior velocidade.'
      },
      {
        type: 'numeric',
        text: 'Um bloco de 2 kg desce uma rampa de h = 5 m. Ao chegar ao fundo, sua velocidade é de 8 m/s. Qual foi a energia dissipada pelo atrito durante a descida? (g = 10 m/s²)',
        answer: 36,
        tolerance: 1,
        unit: 'J',
        explanation: 'Ep inicial = mgh = 2 × 10 × 5 = 100 J. Ec final = ½mv² = ½ × 2 × 64 = 64 J. Energia do atrito = 100 − 64 = 36 J. Essa energia foi convertida em calor pelo atrito entre o bloco e a rampa.'
      }
    ],

    quiz8: [
      {
        type: 'objective',
        text: 'Quanto equivale 1 kWh (quilowatt-hora) em joules?',
        options: [
          '1 000 J',
          '3 600 J',
          '3 600 000 J (3,6 × 10⁶ J)',
          '1 000 000 J'
        ],
        correct: 2,
        explanation: '1 kWh = 1 000 W × 3 600 s = 3 600 000 J = 3,6 MJ. O kWh é usado na conta de luz porque é uma unidade de tamanho mais prático para o consumo doméstico (os valores em joules seriam números enormes e difíceis de usar).'
      },
      {
        type: 'objective',
        text: 'A unidade de potência no Sistema Internacional é o watt (W). O que o watt representa?',
        options: [
          'A quantidade total de energia armazenada em um sistema',
          'A taxa de transferência de energia: 1 W = 1 joule por segundo',
          'A força exercida por 1 newton ao longo de 1 metro',
          'A diferença de potencial elétrico de 1 volt'
        ],
        correct: 1,
        explanation: '1 W = 1 J/s — o watt mede a taxa com que a energia é transferida ou transformada. Uma lâmpada de 60 W transfere 60 joules de energia por segundo. Potência é "quão rápido" a energia é usada, enquanto energia é "quanto" ao todo.'
      },
      {
        type: 'numeric',
        text: 'Um chuveiro elétrico de 5 000 W é utilizado por 6 minutos (360 s). Qual é a energia consumida, em joules?',
        answer: 1800000,
        tolerance: 0,
        unit: 'J',
        explanation: 'Energia = Potência × tempo = 5 000 W × 360 s = 1 800 000 J = 1,8 MJ. Em kWh: 5 kW × (360/3600) h = 5 × 0,1 = 0,5 kWh. Apenas 6 minutos de chuveiro já consomem metade de um kWh!'
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
  function initAllQuizzes() {
    Object.keys(QUIZZES).forEach(id => renderQuiz(id, QUIZZES[id]));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllQuizzes);
  } else {
    initAllQuizzes();
  }

})();
