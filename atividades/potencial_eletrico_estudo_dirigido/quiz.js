// quiz.js — Questões e motor de quiz — Potencial Elétrico

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
        text: 'A força elétrica é classificada como uma força conservativa. O que isso significa para o trabalho que ela realiza ao mover uma carga entre dois pontos?',
        options: [
          'O trabalho depende da velocidade com que a carga se move',
          'O trabalho depende do caminho percorrido entre os dois pontos',
          'O trabalho independe do caminho — depende apenas das posições inicial e final',
          'O trabalho é sempre zero, pois a força elétrica é interna ao sistema'
        ],
        correct: 2,
        explanation: 'Uma força conservativa realiza trabalho que depende exclusivamente dos pontos inicial e final, não do caminho percorrido. Isso é o que permite definir energia potencial — e é análogo à força gravitacional. É por isso que podemos falar em "diferença de potencial" entre dois pontos, independentemente do caminho.'
      },
      {
        type: 'numeric',
        text: 'Uma carga de 2 C está em um campo elétrico de 100 N/C. A força sobre a carga é F = q·E = 200 N. Se a carga se desloca 0,3 m na direção do campo (θ = 0°), qual é o trabalho realizado pelo campo elétrico, em joules?',
        answer: 60,
        tolerance: 0,
        unit: 'J',
        explanation: 'W = F × d × cos(θ) = 200 × 0,3 × cos(0°) = 200 × 0,3 × 1 = 60 J. O ângulo θ = 0° porque a força e o deslocamento estão na mesma direção. Cos(0°) = 1.'
      },
      {
        type: 'objective',
        text: 'Quando uma carga positiva se move espontaneamente na direção do campo elétrico, o que acontece com sua energia potencial elétrica (Ep) e sua energia cinética (Ec)?',
        options: [
          'Ep aumenta e Ec diminui',
          'Ep diminui e Ec aumenta — o campo faz trabalho positivo sobre a carga',
          'Ep e Ec permanecem constantes durante o movimento',
          'Ep aumenta e Ec aumenta — o campo fornece energia extra ao sistema'
        ],
        correct: 1,
        explanation: 'Quando o campo faz trabalho positivo (W > 0) sobre a carga — o que ocorre quando ela se move na direção do campo — a energia potencial diminui e a energia cinética aumenta. É análogo à pedra caindo: perde Ep gravitacional e ganha Ec. O campo converte energia potencial em cinética.'
      }
    ],

    quiz2: [
      {
        type: 'objective',
        text: 'Dois prótons são mantidos próximos um do outro e depois liberados. O que acontece com a energia potencial elétrica do sistema ao longo do tempo?',
        options: [
          'Permanece constante, pois a carga total do sistema não muda',
          'Aumenta, pois os prótons se afastam e ganham velocidade',
          'Diminui, pois a Ep repulsiva positiva se converte em Ec enquanto os prótons se afastam',
          'Torna-se negativa, pois a força repulsiva atua no sentido contrário ao deslocamento'
        ],
        correct: 2,
        explanation: 'Os dois prótons têm Ep positiva (repulsão). Ao serem liberados, a força repulsiva os empurra para longe — o campo faz trabalho positivo. Como W = −ΔEp, temos ΔEp < 0: a Ep diminui. Essa energia vai para a Ec dos prótons — eles se afastam cada vez mais rápido, com a Ec crescendo.'
      },
      {
        type: 'objective',
        text: 'A energia potencial elétrica de um elétron (q = −e) próximo a um próton (q = +e) é negativa (Ep < 0). O que isso significa fisicamente?',
        options: [
          'O sistema não tem energia real — valor negativo é apenas matemático',
          'É preciso fornecer energia ao sistema para separar o elétron do próton — as cargas estão presas pela atração',
          'O sistema libera energia espontaneamente apenas por ter cargas opostas',
          'O elétron não pode se aproximar do próton pois isso violaria a conservação de energia'
        ],
        correct: 1,
        explanation: 'Ep negativa indica que o sistema está em um estado ligado: para separar o elétron do próton (levar r → ∞, onde Ep = 0), é preciso fornecer energia. Esse é o conceito fundamental do átomo de hidrogênio — o elétron está ligado ao próton com Ep ≈ −13,6 eV, a energia de ionização.'
      },
      {
        type: 'numeric',
        text: 'A energia potencial elétrica de uma carga num ponto é Ep = 30 J. Se a carga vale q = 5 C, qual é o potencial elétrico V nesse ponto, em volts?',
        answer: 6,
        tolerance: 0,
        unit: 'V',
        explanation: 'V = Ep / q = 30 / 5 = 6 V. O potencial elétrico é a energia potencial por unidade de carga. Se o ponto tem potencial V = 6 V, qualquer carga q colocada ali terá Ep = q × V joules.'
      }
    ],

    quiz3: [
      {
        type: 'numeric',
        text: 'A energia potencial elétrica de uma carga num ponto é Ep = 60 J e a carga vale q = 3 C. Qual é o potencial elétrico V nesse ponto, em volts?',
        answer: 20,
        tolerance: 0,
        unit: 'V',
        explanation: 'V = Ep / q = 60 / 3 = 20 V. Por definição, V = Ep/q — o potencial elétrico é a energia potencial por unidade de carga de +1 C.'
      },
      {
        type: 'objective',
        text: 'A unidade volt (V) é equivalente a:',
        options: [
          'Newton por metro (N/m)',
          'Joule por coulomb (J/C)',
          'Watt por ampere, mas não equivale a J/C',
          'Coulomb por segundo (C/s)'
        ],
        correct: 1,
        explanation: '1 V = 1 J/C por definição: V = Ep/q = joules / coulombs. Também é verdade que 1 V = 1 W/A (pois P = V·I → V = P/I = W/A), mas a definição fundamental é J/C. O coulomb por segundo (C/s) é o ampere — unidade de corrente, não de potencial.'
      },
      {
        type: 'objective',
        text: 'O potencial elétrico é uma grandeza:',
        options: [
          'Vetorial — tem direção e sentido, apontando do maior para o menor valor',
          'Escalar — tem apenas valor numérico, sem direção ou sentido',
          'Tensorial — descrito por uma matriz de componentes em cada ponto do espaço',
          'Vetorial — coincide com a direção do campo elétrico em cada ponto'
        ],
        correct: 1,
        explanation: 'O potencial elétrico é escalar — em cada ponto do espaço ele é simplesmente um número (positivo, negativo ou zero), sem direção. Isso difere do campo elétrico, que é vetorial. Essa propriedade escalar é o que torna o potencial tão útil: potenciais de várias cargas se somam algebricamente, sem precisar somar vetores.'
      }
    ],

    quiz4: [
      {
        type: 'numeric',
        text: 'Qual é o potencial elétrico a uma distância de r = 0,1 m de uma carga Q = +2 μC? (k = 9 × 10⁹ N·m²/C²)',
        answer: 180000,
        tolerance: 1000,
        unit: 'V',
        explanation: 'V = k × Q / r = 9×10⁹ × 2×10⁻⁶ / 0,1 = 9×10⁹ × 2×10⁻⁵ = 18×10⁴ = 180 000 V = 180 kV. Mesmo uma carga de poucos microcoulombs cria potenciais muito elevados em distâncias curtas.'
      },
      {
        type: 'objective',
        text: 'Qual é a grande vantagem de usar o potencial elétrico (escalar) em vez do campo elétrico (vetorial) ao calcular o efeito de múltiplas cargas em um ponto?',
        options: [
          'O potencial é sempre positivo, facilitando a comparação de valores',
          'O potencial depende apenas da maior carga presente, ignorando as menores',
          'Os potenciais de várias cargas se somam algebricamente, sem precisar somar vetores',
          'O potencial é zero fora da região entre as cargas, simplificando o cálculo'
        ],
        correct: 2,
        explanation: 'Como o potencial é escalar, o potencial total criado por um conjunto de cargas em um ponto é simplesmente a soma algébrica (com sinal) dos potenciais de cada carga: V_total = V₁ + V₂ + V₃ + ... Isso é muito mais simples que somar vetores campo elétrico, que exige decompor em componentes x, y, z.'
      },
      {
        type: 'objective',
        text: 'Uma carga negativa Q = −3 μC está isolada no espaço. O potencial elétrico V criado por ela em qualquer ponto do espaço (exceto em Q):',
        options: [
          'É sempre positivo, pois depende do módulo da carga',
          'É sempre negativo, e seu módulo diminui com a distância (tende a zero no infinito)',
          'É zero em todos os pontos, pois cargas negativas não criam campo ou potencial',
          'É positivo perto da carga e negativo longe dela'
        ],
        correct: 1,
        explanation: 'V = kQ/r. Como Q < 0, V < 0 em qualquer r > 0. À medida que r aumenta, |V| diminui e V se aproxima de zero (V → 0 quando r → ∞, que é o referencial padrão). Portanto, o potencial criado por uma carga negativa é negativo em todo o espaço e aumenta (fica menos negativo) com a distância.'
      }
    ],

    quiz5: [
      {
        type: 'objective',
        text: 'O campo elétrico aponta sempre em qual direção em relação ao potencial elétrico?',
        options: [
          'Na direção de maior para menor potencial — o campo "desce" o morro de potencial',
          'Na direção de menor para maior potencial — o campo aponta para onde o potencial aumenta',
          'Perpendicularmente ao gradiente de potencial — nunca na direção de variação de V',
          'Paralelo às superfícies equipotenciais — acompanhando as regiões de mesmo V'
        ],
        correct: 0,
        explanation: 'E = −ΔV/Δx: o campo elétrico aponta no sentido de maior queda do potencial — de regiões de maior V para regiões de menor V. É exatamente como o campo gravitacional aponta para baixo (direção de maior queda da "altitude" h). Por isso o campo é perpendicular às superfícies equipotenciais: ao longo de uma equipotencial, V não muda, então E nessa direção é zero.'
      },
      {
        type: 'objective',
        text: 'Ao mover uma carga ao longo de uma superfície equipotencial, qual é o trabalho realizado pelo campo elétrico?',
        options: [
          'Máximo — as equipotenciais são onde o campo é mais intenso',
          'Negativo — o campo se opõe ao movimento sobre uma equipotencial',
          'Zero — pois ΔV = 0 e, portanto, W = q · ΔV = 0',
          'Depende da magnitude da carga — pode ser zero ou positivo'
        ],
        correct: 2,
        explanation: 'W = q × ΔV. Numa superfície equipotencial, V é constante em todos os pontos, portanto ΔV = 0 entre quaisquer dois pontos da mesma superfície. Logo, W = q × 0 = 0. Isso também confirma que o campo elétrico é perpendicular às equipotenciais: se o campo tivesse componente paralela à equipotencial, ele faria trabalho sobre a carga ao longo dela — contradição.'
      },
      {
        type: 'numeric',
        text: 'Duas placas paralelas separadas por d = 0,01 m têm uma diferença de potencial de 100 V entre elas. Qual é a intensidade do campo elétrico uniforme entre as placas, em V/m?',
        answer: 10000,
        tolerance: 0,
        unit: 'V/m',
        explanation: 'E = ΔV / d = 100 / 0,01 = 10 000 V/m = 10 kV/m. Esse é o campo uniforme entre placas paralelas. A unidade V/m é equivalente a N/C — ambas descrevem a mesma grandeza física (campo elétrico).'
      }
    ],

    quiz6: [
      {
        type: 'numeric',
        text: 'O potencial elétrico no ponto A é VA = 3 V e no ponto B é VB = 15 V. Qual é a diferença de potencial ΔV = VB − VA, em volts?',
        answer: 12,
        tolerance: 0,
        unit: 'V',
        explanation: 'ΔV = VB − VA = 15 − 3 = 12 V. O ponto B está a 12 V acima do ponto A. Uma carga positiva se moveria espontaneamente de B para A (de maior para menor potencial), enquanto uma carga negativa se moveria de A para B.'
      },
      {
        type: 'objective',
        text: 'Quando dizemos que uma pilha AA tem tensão de 1,5 V, isso significa que:',
        options: [
          'O terminal positivo está exatamente 1,5 V acima do potencial zero absoluto do universo',
          'A pilha armazena 1,5 joules de energia por coulomb de carga',
          'Existe uma diferença de potencial de 1,5 V entre o terminal positivo e o negativo da pilha',
          '1,5 coulombs de carga estão armazenados no interior da pilha'
        ],
        correct: 2,
        explanation: '1,5 V é a diferença de potencial entre os terminais da pilha. O potencial absoluto de cada terminal não importa — o que faz as cargas fluírem é a diferença. Da mesma forma, a água não flui por causa da altitude absoluta dos canos, mas pela diferença de altura entre o início e o fim do percurso.'
      },
      {
        type: 'objective',
        text: 'Qual instrumento de medida é utilizado para medir a diferença de potencial (tensão) entre dois pontos de um circuito?',
        options: [
          'Amperímetro — conectado em série com o componente',
          'Ohmímetro — mede a resistência entre os dois pontos',
          'Voltímetro — conectado em paralelo entre os dois pontos',
          'Wattímetro — mede a potência dissipada no componente'
        ],
        correct: 2,
        explanation: 'O voltímetro mede a diferença de potencial (tensão) entre dois pontos. Ele é conectado em paralelo com o trecho que se deseja medir — para não alterar significativamente a corrente do circuito, ele tem resistência elétrica muito alta. O amperímetro mede corrente (série); o ohmímetro mede resistência; o wattímetro mede potência.'
      }
    ],

    quiz7: [
      {
        type: 'numeric',
        text: 'Uma diferença de potencial de 5 V move uma carga de 4 C entre dois pontos. Qual é o trabalho realizado pelo campo elétrico, em joules?',
        answer: 20,
        tolerance: 0,
        unit: 'J',
        explanation: 'W = q × ΔV = 4 × 5 = 20 J. O campo elétrico realizou 20 joules de trabalho — essa energia foi transferida da energia potencial elétrica para outra forma (cinética, calor, luz etc.).'
      },
      {
        type: 'numeric',
        text: 'Um campo elétrico realiza 60 J de trabalho ao mover uma carga de 2 C entre dois pontos. Qual é a diferença de potencial entre esses pontos, em volts?',
        answer: 30,
        tolerance: 0,
        unit: 'V',
        explanation: 'W = q × ΔV → ΔV = W / q = 60 / 2 = 30 V. Portanto, os dois pontos estão separados por uma diferença de potencial de 30 V.'
      },
      {
        type: 'objective',
        text: 'Uma bateria de 12 V fornece energia ao longo de um circuito. Para cada coulomb de carga que percorre o circuito, qual é a energia fornecida pela bateria?',
        options: [
          '1 J — a energia é distribuída igualmente entre todos os coulombs',
          '12 J — pois 1 V = 1 J/C e portanto 12 V = 12 J/C',
          '12 W — pois a bateria tem potência de 12 watts',
          'Depende da resistência do circuito'
        ],
        correct: 1,
        explanation: 'W = q × ΔV = 1 C × 12 V = 12 J. Por definição, 1 V = 1 J/C — portanto uma ddp de 12 V fornece 12 joules de energia para cada coulomb de carga que passa. Essa energia é distribuída pelos componentes do circuito (resistores, LEDs, motores) em diversas formas.'
      }
    ],

    quiz8: [
      {
        type: 'objective',
        text: 'Na analogia entre gravitação e eletrostática, qual grandeza elétrica corresponde à altura h no campo gravitacional?',
        options: [
          'A corrente elétrica I (amperes)',
          'A carga elétrica q (coulombs)',
          'O potencial elétrico V (volts)',
          'O campo elétrico E (N/C)'
        ],
        correct: 2,
        explanation: 'A altura h é a "posição" no campo gravitacional que determina a energia potencial gravitacional (Epg = mgh). De forma análoga, o potencial elétrico V é a "altitude elétrica" que determina a energia potencial elétrica (Ep = qV). Cargas positivas livres "caem" de alto para baixo potencial — assim como pedras caem de maior para menor altura.'
      },
      {
        type: 'objective',
        text: 'Uma carga positiva é colocada em repouso em um ponto de potencial elétrico alto. O que acontece quando ela é liberada?',
        options: [
          'Permanece em repouso — o campo elétrico só age sobre cargas em movimento',
          'Move-se espontaneamente em direção a pontos de maior potencial elétrico',
          'Move-se espontaneamente em direção a pontos de menor potencial elétrico, ganhando velocidade',
          'Oscila entre regiões de alto e baixo potencial em torno do ponto inicial'
        ],
        correct: 2,
        explanation: 'Uma carga positiva se move espontaneamente de maior para menor potencial — exatamente como uma pedra cai de maior para menor altitude. Nesse processo, a energia potencial elétrica (Ep = qV) diminui e a energia cinética aumenta. O campo elétrico aponta justamente nessa direção (de maior para menor V), fazendo a força sobre a carga positiva apontar para onde V diminui.'
      },
      {
        type: 'objective',
        text: 'O que mantém a diferença de potencial entre os terminais de uma pilha durante seu funcionamento?',
        options: [
          'Elétrons extras armazenados no terminal negativo que não conseguem sair',
          'Reações químicas internas que continuamente separam cargas positivas e negativas, mantendo a ddp',
          'A resistência elétrica dos fios que impede o equilíbrio de potencial',
          'Um campo magnético gerado pela corrente elétrica no interior da pilha'
        ],
        correct: 1,
        explanation: 'As reações químicas internas da pilha são a força que "bombeia" as cargas de um terminal ao outro, mantendo a diferença de potencial. Quando as reações químicas se esgotam (pilha "acabada"), a ddp cai a zero e a corrente para. É exatamente a analogia da bomba d\'água: sem a bomba funcionando, a diferença de pressão/altura diminui até o equilíbrio.'
      }
    ]

  };

  // Expõe para relatório
  window.PotencialQuizData = QUIZZES;

  // ================================================================
  // ESTADO GLOBAL
  // ================================================================
  window.PotencialQuizState = {
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

    const header = container.querySelector('.quiz-header');
    let html = header ? header.outerHTML : '<div class="quiz-header">✦ Questões de verificação</div>';

    questions.forEach((q, i) => {
      const qid = containerId + '_q' + i;
      html += '<div class="q-block" id="qblock_' + qid + '">';
      html += '<span class="q-num">Questão ' + (i + 1) + '</span>';
      html += '<p class="q-text">' + q.text + '</p>';

      if (q.type === 'objective') {
        const letters = ['A', 'B', 'C', 'D', 'E'];
        html += '<div class="opts" id="opts_' + qid + '">';
        q.options.forEach((opt, oi) => {
          html += '<button class="opt-btn" data-qid="' + qid + '" data-oi="' + oi + '" data-correct="' + q.correct + '"'
            + ' aria-label="Opção ' + letters[oi] + ': ' + stripHtmlLocal(opt) + '">'
            + '<span class="opt-ltr" aria-hidden="true">' + letters[oi] + '</span>' + opt
            + '</button>';
        });
        html += '</div>';
      } else {
        html += '<div class="num-row">'
          + '<input type="number" class="num-inp" id="inp_' + qid + '" placeholder="resposta" step="any"'
          + ' aria-label="Digite a resposta' + (q.unit ? ' em ' + q.unit : '') + '" />'
          + (q.unit ? '<span class="num-unit" aria-hidden="true">' + q.unit + '</span>' : '')
          + '<button class="ver-btn" data-qid="' + qid + '" data-answer="' + q.answer + '" data-tol="' + q.tolerance + '"'
          + ' aria-label="Verificar resposta">Verificar</button>'
          + '</div>';
      }

      html += '<div class="fb" id="fb_' + qid + '" role="status" aria-live="polite" aria-atomic="true"></div>';
      html += '</div>';
    });

    container.innerHTML = html;
    window.PotencialQuizState.total += questions.length;
    updateScoreDisplay();
    bindEvents(container, questions);
  }

  // ================================================================
  // EVENTOS
  // ================================================================
  function bindEvents(container, questions) {
    container.querySelectorAll('.opt-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const qid = this.dataset.qid;
        if (window.PotencialQuizState.answered[qid]) return;

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

    container.querySelectorAll('.ver-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const qid = this.dataset.qid;
        if (window.PotencialQuizState.answered[qid]) return;

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
    fb.className = 'fb show ' + (isRight ? 'certo' : 'erro');
    fb.innerHTML = '<strong>' + (isRight ? '✓ Correto!' : '✗ Incorreto.') + '</strong> ' + explanation;
  }

  // ================================================================
  // PLACAR
  // ================================================================
  function registerAnswer(qid, isRight, extra) {
    window.PotencialQuizState.answered[qid] = Object.assign({ correct: isRight }, extra || {});
    if (isRight) window.PotencialQuizState.score++;
    updateScoreDisplay();
  }

  function updateScoreDisplay() {
    const scoreEl = document.getElementById('p-score');
    const totalEl = document.getElementById('p-total');
    const msgEl   = document.getElementById('p-msg');
    const arc     = document.getElementById('ring-arc');
    if (!scoreEl) return;

    const score = window.PotencialQuizState.score;
    const total = window.PotencialQuizState.total;
    scoreEl.textContent = score;
    totalEl.textContent = total;

    if (arc && total > 0) {
      const pct = score / total;
      const circumference = 326.7;
      arc.style.strokeDashoffset = circumference * (1 - pct);
    }

    const answered = Object.keys(window.PotencialQuizState.answered).length;
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;

    if (!msgEl) return;
    if (answered === 0) {
      msgEl.textContent = 'Responda as questões para ver seu placar!';
    } else if (answered < total) {
      msgEl.textContent = 'Você respondeu ' + answered + ' de ' + total + '. Continue!';
    } else {
      let msg = '';
      if (pct >= 90) msg = '⚡ Excelente! Você domina o potencial elétrico!';
      else if (pct >= 70) msg = '👍 Muito bom! Revise os pontos em que errou.';
      else if (pct >= 50) msg = '📚 Razoável. Releia os tópicos com dificuldade.';
      else msg = '💪 Continue! Releia os conceitos e tente novamente.';
      msgEl.textContent = 'Você acertou ' + pct + '% das questões. ' + msg;
    }
  }

  // ================================================================
  // RESET
  // ================================================================
  window.PotencialQuizReset = function () {
    window.PotencialQuizState.answered = {};
    window.PotencialQuizState.score = 0;
    window.PotencialQuizState.total = 0;
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
