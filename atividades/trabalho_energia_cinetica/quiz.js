// quiz.js — Questões e motor de quiz — Trabalho e Energia Cinética

(function () {
  'use strict';

  function stripHtmlLocal(str) { return str.replace(/<[^>]+>/g, ''); }

  // ================================================================
  // BANCO DE QUESTÕES
  // ================================================================
  const QUIZZES = {

    // Tópico 01 — O que é Energia? (3 questões)
    quiz1: [
      {
        type: 'objective',
        text: 'O que é energia, do ponto de vista da física?',
        options: [
          'Uma substância invisível que flui pelos fios elétricos.',
          'A velocidade máxima que um objeto pode atingir.',
          'A capacidade de um sistema de realizar trabalho ou produzir mudanças.',
          'A força exercida por campos sobre corpos em movimento.'
        ],
        correct: 2,
        explanation: 'Energia é a capacidade de um sistema de realizar trabalho ou produzir mudanças. Não é uma substância, mas uma propriedade dos sistemas físicos. Ela existe em várias formas e nunca é criada nem destruída.'
      },
      {
        type: 'objective',
        text: 'Uma lâmpada recebe 500 J de energia elétrica e emite 100 J de luz e 400 J de calor. Isso demonstra que:',
        options: [
          'A lâmpada criou 100 J de luz do nada — a energia aumentou.',
          'A lâmpada destruiu 400 J — o calor é energia perdida.',
          'A energia foi conservada: 500 J entraram e 500 J saíram em outras formas.',
          'A eficiência da lâmpada é 80%, portanto a lei de conservação não vale aqui.'
        ],
        correct: 2,
        explanation: 'A lei da conservação de energia diz que energia não é criada nem destruída. Os 500 J de entrada se transformaram em 100 J de luz + 400 J de calor = 500 J. Nada foi criado nem destruído. O calor não é energia "perdida" — vai para o ambiente.'
      },
      {
        type: 'objective',
        text: 'Qual das alternativas apresenta corretamente a unidade SI de energia e sua definição?',
        options: [
          'Watt (W) = energia por segundo.',
          'Newton (N) = força necessária para 1 kg × 1 m/s².',
          'Joule (J) = trabalho realizado por 1 N deslocando 1 m na direção da força.',
          'Coulomb (C) = carga de 6,24 × 10¹⁸ elétrons.'
        ],
        correct: 2,
        explanation: 'O joule (J) é a unidade SI de energia e trabalho. Sua definição vem do trabalho: 1 J = 1 N × 1 m = a energia transferida por uma força de 1 newton que desloca um objeto 1 metro na direção da força. O watt é potência (J/s), não energia.'
      }
    ],

    // Tópico 02 — Unidades de Energia (3 questões)
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
        explanation: '1 kWh = 1 000 W × 3 600 s = 3 600 000 J = 3,6 MJ. O kWh é usado na conta de luz porque é uma unidade de tamanho mais prático para o consumo doméstico — os valores em joules seriam enormes e pouco intuitivos.'
      },
      {
        type: 'objective',
        text: 'Em um rótulo de alimento, o valor "100 Calorias" se refere na verdade a 100 kcal (quilocalorias). Usando 1 kcal ≈ 4 180 J, quantos joules isso representa?',
        options: [
          '4 180 J',
          '41 800 J',
          '418 000 J',
          '4 180 000 J'
        ],
        correct: 2,
        explanation: '1 Caloria (com C maiúsculo) = 1 kcal ≈ 4 180 J. Logo, 100 kcal = 100 × 4 180 = 418 000 J ≈ 418 kJ. Esse é o valor energético de um pão francês — energia suficiente para levantar uma pessoa de 60 kg a aproximadamente 710 m de altura, se toda a energia fosse convertida sem perdas.'
      },
      {
        type: 'numeric',
        text: 'Uma bateria recarregável armazena 9 Wh (watt-hora) de energia. Sabendo que 1 Wh = 3 600 J, qual é a energia armazenada em joules?',
        answer: 32400,
        tolerance: 0,
        unit: 'J',
        explanation: '9 Wh × 3 600 J/Wh = 32 400 J = 32,4 kJ. O watt-hora é uma unidade de energia (não de potência): é a energia consumida por um dispositivo de 1 W durante 1 hora. Pequenas baterias de celular têm tipicamente 10–15 Wh, o que equivale a 36 000–54 000 J.'
      }
    ],

    // Tópico 03 — Trabalho de uma Força (4 questões)
    quiz2: [
      {
        type: 'numeric',
        text: 'Uma força constante de 30 N é aplicada paralelamente ao deslocamento de um objeto por 6 m. Qual é o trabalho realizado, em joules?',
        answer: 180,
        tolerance: 0,
        unit: 'J',
        explanation: 'W = F × d × cos(θ) = 30 × 6 × cos(0°) = 30 × 6 × 1 = 180 J. Como a força é paralela ao deslocamento, θ = 0° e cos(0°) = 1.'
      },
      {
        type: 'objective',
        text: 'Em qual situação o trabalho realizado pela força aplicada é zero?',
        options: [
          'Quando a força é muito pequena em relação à massa do objeto.',
          'Quando a força é perpendicular ao deslocamento do objeto.',
          'Quando o objeto se move em trajetória curva.',
          'Quando o objeto já está em repouso antes da força ser aplicada.'
        ],
        correct: 1,
        explanation: 'W = F × d × cos(θ). Quando a força é perpendicular ao deslocamento, θ = 90° e cos(90°) = 0, portanto W = 0. Exemplo clássico: a força normal do chão ao carregar um peso horizontalmente — o chão "empurra" verticalmente, mas o deslocamento é horizontal.'
      },
      {
        type: 'objective',
        text: 'Uma pessoa aplica uma força de 50 N contrária ao movimento de uma bola que se desloca 3 m nessa direção. O trabalho realizado por essa força é:',
        options: [
          'W = +150 J, pois a força e o deslocamento têm o mesmo módulo.',
          'W = 0, pois a bola continua se movendo.',
          'W = −150 J, pois força e deslocamento têm sentidos opostos (cos 180° = −1).',
          'Impossível determinar sem conhecer a massa da bola.'
        ],
        correct: 2,
        explanation: 'W = F × d × cos(θ). Quando a força é oposta ao deslocamento, θ = 180° e cos(180°) = −1. Logo W = 50 × 3 × (−1) = −150 J. Trabalho negativo significa que a força retirou energia do objeto — é exatamente o papel do atrito e dos freios.'
      },
      {
        type: 'objective',
        text: 'Um carro elétrico usa freios regenerativos: ao frear, o motor vira gerador e converte energia cinética em energia elétrica armazenada na bateria. Qual é o sinal do trabalho realizado pela força de frenagem sobre o carro?',
        options: [
          'Positivo, pois o carro ainda está em movimento durante a frenagem.',
          'Nulo, pois o carro vai parar e a velocidade final é zero.',
          'Negativo, pois a força de frenagem é contrária ao deslocamento e retira energia cinética do carro.',
          'Depende da eficiência do motor — pode ser positivo ou negativo.'
        ],
        correct: 2,
        explanation: 'A força de frenagem é oposta ao movimento (θ = 180°), logo W = F × d × cos(180°) = −F × d < 0. O trabalho negativo indica que a força retira energia cinética do carro. Nos freios regenerativos, essa energia não é dissipada como calor, mas convertida em energia elétrica. O sinal do trabalho não depende da destinação da energia, mas da relação entre força e deslocamento.'
      }
    ],

    // Tópico 04 — Trabalho com Várias Forças (4 questões)
    quiz2b: [
      {
        type: 'numeric',
        text: 'Uma pessoa empurra um carrinho com força horizontal de 35 N ao longo de 4 m. O atrito exerce uma força de 5 N oposta ao movimento. Qual é o trabalho total realizado sobre o carrinho, em joules?',
        answer: 120,
        tolerance: 0,
        unit: 'J',
        explanation: 'W<sub>pessoa</sub> = 35 × 4 × cos(0°) = +140 J. W<sub>atrito</sub> = 5 × 4 × cos(180°) = −20 J. Peso e normal são perpendiculares ao deslocamento: W = 0 J para cada. W<sub>total</sub> = 140 − 20 = 120 J. O trabalho total positivo faz o carrinho acelerar.'
      },
      {
        type: 'numeric',
        text: 'Um bloco de 6 kg desliza horizontalmente com aceleração constante de 3 m/s², percorrendo 4 m. Usando a 2ª Lei de Newton para calcular a força resultante, qual é o trabalho da força resultante, em joules?',
        answer: 72,
        tolerance: 0,
        unit: 'J',
        explanation: 'F<sub>res</sub> = m × a = 6 × 3 = 18 N. W<sub>res</sub> = F<sub>res</sub> × d = 18 × 4 = 72 J. Esse é o Caminho 2: quando se conhece a aceleração, é mais rápido calcular F<sub>res</sub> pela 2ª Lei e usar W = F<sub>res</sub> × d, sem precisar conhecer cada força individualmente.'
      },
      {
        type: 'objective',
        text: 'Um bloco desliza horizontalmente sobre uma superfície. Dentre as forças que agem sobre ele (peso, normal, atrito), qual realiza trabalho diferente de zero?',
        options: [
          'O peso, pois age continuamente sobre o bloco durante o movimento.',
          'A normal, pois é a força de contato com a superfície.',
          'O atrito, pois é a única força com componente na direção do deslocamento.',
          'Peso e normal, pois juntos sustentam o bloco.'
        ],
        correct: 2,
        explanation: 'O peso e a normal são verticais — perpendiculares ao deslocamento horizontal — logo cos(90°) = 0 e W = 0 para ambos. O atrito é horizontal e oposto ao movimento: W<sub>atrito</sub> = −f × d &lt; 0. Somente o atrito realiza trabalho (negativo), retirando energia cinética do bloco e convertendo em calor.'
      },
      {
        type: 'numeric',
        text: 'Um bloco é puxado horizontalmente por uma força de 25 N na direção do movimento. Ao mesmo tempo, sofre atrito de 10 N e uma força adicional de 5 N, ambas opostas ao movimento. O bloco se desloca 4 m. Qual é o trabalho total, em joules?',
        answer: 40,
        tolerance: 0,
        unit: 'J',
        explanation: 'W<sub>tração</sub> = 25 × 4 × cos(0°) = +100 J. W<sub>atrito</sub> = 10 × 4 × cos(180°) = −40 J. W<sub>extra</sub> = 5 × 4 × cos(180°) = −20 J. Peso e normal são perpendiculares: W = 0. W<sub>total</sub> = 100 − 40 − 20 = 40 J.'
      }
    ],

    // Tópico 05 — Energia Cinética (4 questões)
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
          'Dobra, pois a velocidade dobrou.',
          'Aumenta 1,5 vez.',
          'Triplica.',
          'Quadruplica, pois a energia cinética é proporcional ao quadrado da velocidade.'
        ],
        correct: 3,
        explanation: 'Ec = ½mv². Se v dobra, v² quadruplica. Portanto, a energia cinética aumenta quatro vezes. Isso explica por que um choque a 100 km/h é muito mais devastador que a 50 km/h — não é apenas duas vezes pior, mas quatro.'
      },
      {
        type: 'numeric',
        text: 'Um objeto de 8 kg possui energia cinética de 100 J. Qual é sua velocidade, em m/s?',
        answer: 5,
        tolerance: 0,
        unit: 'm/s',
        explanation: 'Ec = ½mv² → 100 = ½ × 8 × v² → 100 = 4v² → v² = 25 → v = 5 m/s.'
      },
      {
        type: 'objective',
        text: 'Duas bolas têm a mesma massa. A bola A se move a 6 m/s e a bola B a 3 m/s. Qual é a razão entre suas energias cinéticas (Ec<sub>A</sub> / Ec<sub>B</sub>)?',
        options: [
          '2 — a bola A é duas vezes mais rápida, portanto tem o dobro da energia cinética.',
          '3 — razão direta entre as velocidades.',
          '4 — Ec é proporcional ao quadrado da velocidade: (6/3)² = 4.',
          '6 — razão entre os quadrados das velocidades somados.'
        ],
        correct: 2,
        explanation: 'Ec = ½mv². Como as massas são iguais: Ec<sub>A</sub> / Ec<sub>B</sub> = v<sub>A</sub>² / v<sub>B</sub>² = 6² / 3² = 36 / 9 = 4. A bola A tem 4 vezes mais energia cinética que a bola B, embora seja apenas 2 vezes mais rápida. Esse crescimento quadrático é fundamental para entender por que velocidades altas são tão perigosas.'
      }
    ],

    // Tópico 06 — Teorema Trabalho-Energia Cinética (4 questões)
    quizT: [
      {
        type: 'objective',
        text: 'O teorema trabalho-energia cinética afirma que:',
        options: [
          'O trabalho total é igual ao produto da força pela energia potencial.',
          'A energia cinética é sempre igual ao trabalho realizado por uma única força.',
          'O trabalho total realizado sobre um objeto é igual à variação de sua energia cinética.',
          'O trabalho de qualquer força conservativa é sempre nulo.'
        ],
        correct: 2,
        explanation: 'O teorema trabalho-energia cinética afirma que W<sub>total</sub> = ΔEc = Ec<sub>f</sub> − Ec<sub>i</sub>. O "total" é fundamental: deve-se somar o trabalho de TODAS as forças. Se W<sub>total</sub> &gt; 0, a Ec aumenta (acelera). Se W<sub>total</sub> &lt; 0, a Ec diminui (desacelera).'
      },
      {
        type: 'numeric',
        text: 'Uma força resultante de 36 N age paralelamente ao deslocamento de um bloco de 4 kg, inicialmente em repouso, ao longo de 2 m. Usando o teorema trabalho-energia, qual é a velocidade final do bloco, em m/s?',
        answer: 6,
        tolerance: 0,
        unit: 'm/s',
        explanation: 'W<sub>total</sub> = F × d = 36 × 2 = 72 J. Pelo teorema W<sub>total</sub> = ΔEc = ½mv² − 0: 72 = ½ × 4 × v² → 72 = 2v² → v² = 36 → v = 6 m/s. A velocidade inicial era zero, então Ec<sub>i</sub> = 0.'
      },
      {
        type: 'objective',
        text: 'Um carro freia de 20 m/s até parar completamente. Pelo teorema trabalho-energia, o que se pode concluir sobre o trabalho total realizado sobre ele durante a frenagem?',
        options: [
          'O trabalho total é positivo, pois o carro estava em movimento antes de frear.',
          'O trabalho total é nulo, pois o carro para e sua velocidade final é zero.',
          'O trabalho total é negativo: ΔEc = 0 − ½mv² < 0, pois os freios opõem-se ao movimento.',
          'O trabalho total depende apenas da massa do carro, não da velocidade inicial.'
        ],
        correct: 2,
        explanation: 'W<sub>total</sub> = ΔEc = Ec<sub>f</sub> − Ec<sub>i</sub> = 0 − ½mv². Como ½mv² &gt; 0, o trabalho total é negativo. As forças de frenagem são contrárias ao movimento (θ = 180°), fazem trabalho negativo e reduzem a energia cinética do carro a zero. Essa energia vai para o calor nas pastilhas de freio.'
      },
      {
        type: 'numeric',
        text: 'Um objeto de massa 5 kg tem velocidade inicial de 4 m/s e velocidade final de 10 m/s. Usando o teorema trabalho-energia cinética, qual foi o trabalho total realizado sobre o objeto, em joules?',
        answer: 210,
        tolerance: 0,
        unit: 'J',
        explanation: 'W<sub>total</sub> = ΔEc = ½mv<sub>f</sub>² − ½mv<sub>i</sub>² = ½ × 5 × 10² − ½ × 5 × 4² = 250 − 40 = 210 J. O trabalho total positivo confirma que a força resultante estava a favor do movimento e aumentou a energia cinética do objeto.'
      }
    ],

    // Tópico 07 — Potência (4 questões)
    quiz9: [
      {
        type: 'objective',
        text: 'A unidade de potência no Sistema Internacional é o watt (W). O que o watt representa?',
        options: [
          'A quantidade total de energia armazenada em um sistema.',
          'A taxa de transferência de energia: 1 W = 1 joule por segundo.',
          'A força exercida por 1 newton ao longo de 1 metro.',
          'A diferença de potencial elétrico de 1 volt.'
        ],
        correct: 1,
        explanation: '1 W = 1 J/s — o watt mede a taxa com que a energia é transferida ou transformada. Potência é "quão rápido" a energia é usada, enquanto energia é "quanto" ao todo. Uma lâmpada de 60 W consome 60 J a cada segundo que permanece ligada.'
      },
      {
        type: 'numeric',
        text: 'Um atleta de 80 kg sobe 4 m de escadas em 2 s. Determine a potência desenvolvida, considerando velocidade constante e desprezando gastos energéticos além do trabalho contra a gravidade. (g = 10 m/s²)',
        answer: 1600,
        tolerance: 0,
        unit: 'W',
        explanation: 'W = m × g × h = 80 × 10 × 4 = 3 200 J. P = W / t = 3 200 / 2 = 1 600 W. Esse valor equivale a mais de 2 cv — possível apenas em esforços explosivos de curta duração. Em esforço sustentado, um atleta treinado consegue manter ~200–400 W por longos períodos.'
      },
      {
        type: 'numeric',
        text: 'Um motor com potência de 3 000 W precisa elevar uma carga de 150 kg até 10 m de altura. Em quantos segundos ele conclui a tarefa, considerando que o movimento ocorre a velocidade constante e sem perdas? (g = 10 m/s²)',
        answer: 5,
        tolerance: 0,
        unit: 's',
        explanation: 'W = m × g × h = 150 × 10 × 10 = 15 000 J. t = W / P = 15 000 / 3 000 = 5 s. A fórmula P = W/t pode ser reorganizada para t = W/P sempre que se conhece o trabalho total e a potência disponível.'
      },
      {
        type: 'objective',
        text: 'Um motor elétrico mantém um veículo em velocidade constante de 20 m/s, exercendo uma força de tração de 500 N paralela ao movimento (P = F · v). Qual é a potência desenvolvida?',
        options: [
          '25 W',
          '250 W',
          '10 000 W (10 kW)',
          '100 000 W (100 kW)'
        ],
        correct: 2,
        explanation: 'P = F × v = 500 × 20 = 10 000 W = 10 kW. Essa é a expressão direta de P = F · v, válida quando a força é constante e paralela ao movimento. Como a velocidade é constante, a tração é igual à resistência total (atrito + arrasto). Para manter 40 m/s com a mesma resistência, seriam necessários 20 000 W — o dobro da potência.'
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
      if (pct >= 90) msg = '⚡ Excelente! Você domina esses conceitos!';
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
