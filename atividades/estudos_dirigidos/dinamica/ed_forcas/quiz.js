// quiz.js — Questões e motor de quiz das Forças

(function () {
  'use strict';

  function stripHtmlLocal(str) {
    return str.replace(/<[^>]+>/g, '');
  }

  // ================================================================
  // BANCO DE QUESTÕES
  // ================================================================
  const QUIZZES = {

    // TÓPICO 1 — O que é uma força
    quiz1: [
      {
        type: 'objective',
        text: 'Qual afirmação descreve corretamente o que é uma força, na dinâmica?',
        options: [
          'É uma propriedade que um corpo possui, como a sua massa.',
          'É uma interação entre dois corpos: sempre se pode dizer quem a exerce e sobre quem.',
          'É a quantidade de movimento armazenada dentro de um corpo.',
          'É uma grandeza escalar, definida apenas por um valor numérico.'
        ],
        correct: 1,
        explanation: 'Não existe "a força de um objeto": existe a força que a Terra faz na maçã, que a mesa faz no livro, que o pé faz na bola. Esse é o teste mais útil para saber se você nomeou uma força de verdade — se não há agente, provavelmente não é força. E força é vetorial: tem intensidade, direção e sentido.'
      },
      {
        type: 'objective',
        text: 'Qual das quatro forças da mecânica escolar age <strong>à distância</strong>, sem contato entre os corpos?',
        options: [
          'A força normal.',
          'A força de atrito.',
          'A tração.',
          'O peso.'
        ],
        correct: 3,
        explanation: 'O peso é a única força de campo que aparece na mecânica do Ensino Médio: a Terra atrai o corpo sem tocá-lo, e a atração atravessa o vácuo. Normal, atrito e tração são forças de contato, e se distinguem pela direção em relação à superfície: a normal é perpendicular a ela, o atrito é paralelo, e a tração age ao longo do fio.'
      },
      {
        type: 'objective',
        text: 'Duas forças de 10 N cada uma atuam sobre um mesmo corpo. Qual conjunto de valores é possível para o módulo da resultante?',
        options: [
          'Apenas 20 N, porque as forças sempre se somam.',
          'Qualquer valor entre 0 N e 20 N, dependendo do ângulo entre elas.',
          'Apenas 0 N ou 20 N.',
          'Sempre 10 N, porque as forças têm o mesmo módulo.'
        ],
        correct: 1,
        explanation: 'Força é grandeza vetorial, e a soma depende da orientação. No mesmo sentido, o resultado é 20 N; em sentidos opostos, 0 N; perpendiculares, cerca de 14 N. Essa é a razão de a dinâmica trabalhar quase sempre com a resultante, e não com uma força isolada.'
      }
    ],

    // TÓPICO 2 — Peso
    quiz2: [
      {
        type: 'numeric',
        text: 'Uma mochila de 8 kg está pendurada, em repouso, num gancho. Qual é a intensidade do peso dela, em newtons? (use g = 10 m/s²)',
        answer: 80,
        tolerance: 0.5,
        unit: 'N',
        explanation: 'P = m · g = 8 × 10 = 80 N. Como a mochila está em repouso, a resultante nela é nula e a tração do gancho também vale 80 N — mas atenção: peso e tração agem no MESMO corpo (a mochila) e por isso não formam um par ação–reação; elas apenas se equilibram.'
      },
      {
        type: 'numeric',
        text: 'Um astronauta de 70 kg pousa em Marte, onde g = 3,7 m/s². Qual é o peso dele em Marte, em newtons? (arredonde para o inteiro mais próximo)',
        answer: 259,
        tolerance: 2,
        unit: 'N',
        explanation: 'P = m · g = 70 × 3,7 = 259 N. Na Terra, o mesmo astronauta pesaria cerca de 686 N. A massa continua sendo 70 kg nos dois lugares: quem muda de astro para astro é a aceleração da gravidade, e portanto o peso.'
      },
      {
        type: 'objective',
        text: 'Uma bola é lançada verticalmente para cima. Desprezando a resistência do ar, o que se pode dizer da força peso no ponto mais alto da trajetória?',
        options: [
          'Ela se anula, pois a velocidade nesse ponto é zero.',
          'Ela inverte o sentido e passa a apontar para cima.',
          'Ela continua valendo m·g e apontando para baixo, exatamente como na subida e na descida.',
          'Ela diminui, porque a bola está mais longe do chão.'
        ],
        correct: 2,
        explanation: 'Velocidade nula não significa força nula. O peso é m·g e aponta para baixo durante toda a trajetória — é justamente por isso que a bola para de subir e começa a descer. Confundir velocidade zero com força zero é o erro que a questão da laranja de Monteiro Lobato explora.'
      },
      {
        type: 'objective',
        text: 'Sobre a diferença entre massa e peso, qual afirmação é correta?',
        options: [
          'Massa e peso são a mesma grandeza, medida em unidades diferentes.',
          'A massa é medida em newtons e o peso em quilogramas.',
          'A massa mede a quantidade de matéria e a inércia, e é a mesma em qualquer lugar; o peso é a força de atração e varia com o astro.',
          'O peso é constante em todo o Universo, e a massa varia com a gravidade local.'
        ],
        correct: 2,
        explanation: 'A massa (kg) é uma propriedade do corpo e mede sua inércia. O peso (N) é uma força, resultado da interação com um astro, e muda conforme g. Na Lua, sua massa é idêntica e seu peso é cerca de seis vezes menor.'
      }
    ],

    // TÓPICO 3 — Normal
    quiz3: [
      {
        type: 'objective',
        text: 'Sobre a força normal, qual afirmação é correta?',
        options: [
          'É sempre igual ao peso do corpo, em qualquer situação.',
          'É a reação do peso, formando com ele um par ação–reação.',
          'É a força que a superfície exerce no corpo apoiado, perpendicular à superfície; nem sempre é igual ao peso.',
          'Aponta sempre para baixo, no mesmo sentido do peso.'
        ],
        correct: 2,
        explanation: 'A normal é perpendicular à superfície de contato. Ela só coincide em intensidade com o peso em casos particulares (superfície horizontal, sem aceleração vertical e sem outras forças verticais). Num plano inclinado ela é menor que o peso, e num elevador acelerado ela muda enquanto o peso continua o mesmo. E ela não é a reação do peso: a reação do peso é a força que o corpo faz na Terra.'
      },
      {
        type: 'numeric',
        text: 'Um bloco de 5 kg está em repouso sobre uma mesa horizontal. Um fio vertical preso a ele o puxa para cima com 20 N. Qual é a intensidade da força normal, em newtons? (use g = 10 m/s²)',
        answer: 30,
        tolerance: 0.5,
        unit: 'N',
        explanation: 'No eixo vertical não há aceleração, então a soma das forças é nula: N + T − P = 0, ou seja, N = P − T = 50 − 20 = 30 N. Repare que o peso continua valendo 50 N: quem se ajustou foi a normal. Esse é o teste decisivo contra a ideia de que N e P formam um par ação–reação — se formassem, teriam de mudar juntas.'
      },
      {
        type: 'numeric',
        text: 'Uma pessoa de 60 kg está sobre uma balança dentro de um elevador que sobe acelerando a 2 m/s². Que valor de força, em newtons, a balança registra? (use g = 10 m/s²)',
        answer: 720,
        tolerance: 2,
        unit: 'N',
        explanation: 'A balança mede a normal, não o peso. Com o eixo positivo para cima: N − P = m·a, ou seja, N = 600 + 60 × 2 = 720 N. O peso continua sendo 600 N o tempo todo. É por isso que se diz que a balança "mente" no elevador: ela nunca mediu o peso, e sim o apoio.'
      }
    ],

    // TÓPICO 4 — Tração
    quiz4: [
      {
        type: 'objective',
        text: 'Qual afirmação sobre a força de tração está correta?',
        options: [
          'Um fio pode tanto puxar quanto empurrar o corpo preso a ele.',
          'A tração aponta sempre na direção do fio, e só pode puxar o corpo.',
          'A tração é sempre igual ao peso do corpo pendurado, em qualquer situação.',
          'A tração aponta sempre na vertical, mesmo num fio inclinado.'
        ],
        correct: 1,
        explanation: 'Fio puxa, nunca empurra: se a situação exigisse um empurrão, o fio simplesmente amoleceria e a tração cairia a zero. A direção é a do próprio fio, seja ele vertical, horizontal ou inclinado. E o valor não tem fórmula própria — sai da 2ª Lei aplicada aos corpos ligados. T = P vale só no caso particular do corpo pendurado em repouso.'
      },
      {
        type: 'numeric',
        text: 'Dois blocos, A de 2 kg e B de 3 kg, estão ligados por um fio ideal sobre uma mesa horizontal sem atrito. Uma força de 20 N puxa o bloco B na horizontal, e o fio arrasta A atrás dele. Qual é a intensidade da tração no fio, em newtons?',
        answer: 8,
        tolerance: 0.2,
        unit: 'N',
        explanation: 'Primeiro o conjunto: a = F / (mA + mB) = 20 / 5 = 4 m/s². Depois o bloco A isolado, onde a única força horizontal é a tração: T = mA · a = 2 × 4 = 8 N. O roteiro é sempre esse — a aceleração sai do conjunto, e a tração sai de um dos corpos isolado.'
      },
      {
        type: 'objective',
        text: 'Nos problemas escolares, o que significa dizer que o fio e a polia são <strong>ideais</strong>?',
        options: [
          'Que o fio é elástico e a polia gira livremente, aumentando a tração.',
          'Que o fio é inextensível e de massa desprezível, e a polia não tem massa nem atrito no eixo — de modo que a tração é a mesma nos dois extremos.',
          'Que a tração no fio é sempre igual ao peso do corpo mais pesado do sistema.',
          'Que o fio suporta qualquer tração, mas a polia altera o valor dessa tração.'
        ],
        correct: 1,
        explanation: 'São duas idealizações, e não detalhes menores: é delas que vem a permissão para escrever um único T em todo o fio. A polia ideal apenas muda a direção do fio, sem alterar o valor da tração. Fios reais têm massa e esticam, e polias reais têm atrito — nesses casos a tração deixa de ser a mesma nos dois lados.'
      }
    ],

    // TÓPICO 5 — Atrito
    quiz5: [
      {
        type: 'objective',
        text: 'Um bloco em repouso sobre uma mesa tem F<sub>at,máx</sub> = 5 N. Uma pessoa o empurra na horizontal com 3 N e ele não se move. Quanto vale a força de atrito nesse instante?',
        options: [
          '5 N, que é o valor máximo do atrito estático.',
          '3 N, exatamente o necessário para impedir o movimento.',
          '0 N, porque o bloco está parado.',
          '8 N, a soma da força aplicada com o atrito máximo.'
        ],
        correct: 1,
        explanation: 'O atrito estático não tem valor fixo: ele vale exatamente o necessário para manter o corpo parado, até o limite de μe·N. Com 3 N aplicados, o atrito responde com 3 N; com 4 N, responde com 4 N. Só ao ultrapassar 5 N o bloco começa a deslizar — e aí o atrito passa a ser o cinético, μc·N, que é menor.'
      },
      {
        type: 'numeric',
        text: 'Um caixote de 20 kg desliza sobre um piso horizontal com μ<sub>c</sub> = 0,3. Qual é a intensidade da força de atrito cinético, em newtons? (use g = 10 m/s²)',
        answer: 60,
        tolerance: 0.5,
        unit: 'N',
        explanation: 'No piso horizontal e sem outras forças verticais, N = P = 200 N. Então Fat = μc · N = 0,3 × 200 = 60 N. Cabe perceber a ordem dos passos: o atrito depende da normal, e a normal precisa ser calculada antes. Num plano inclinado, N seria menor, e o atrito também.'
      },
      {
        type: 'objective',
        text: 'No modelo de atrito usado no Ensino Médio, o que <strong>não</strong> afeta a intensidade da força de atrito?',
        options: [
          'O par de materiais em contato.',
          'A força normal entre as superfícies.',
          'A área de contato aparente entre as superfícies.',
          'O fato de o corpo estar parado ou já deslizando.'
        ],
        correct: 2,
        explanation: 'Um tijolo deitado ou de pé sofre o mesmo atrito: a área aparente maior distribui a mesma força normal por mais pontos, e os efeitos se compensam. O que importa é o coeficiente μ (o par de materiais) e a normal. E o regime importa muito: μe e μc são diferentes, com μc quase sempre menor.'
      },
      {
        type: 'objective',
        text: 'Por que o freio ABS impede que as rodas travem numa frenagem de emergência?',
        options: [
          'Porque com as rodas travadas o pneu desliza, e o atrito cinético é menor que o estático que atua com a roda girando.',
          'Porque as rodas travadas aumentam a força normal sobre o carro.',
          'Porque o atrito cinético cresce com a velocidade, e travar as rodas aumentaria demais essa força.',
          'Porque com as rodas travadas o coeficiente de atrito do asfalto diminui.'
        ],
        correct: 0,
        explanation: 'Com a roda girando, o ponto de contato do pneu não desliza sobre o asfalto, e vale o atrito estático — o regime mais forte. Travando a roda, o pneu passa a arrastar, e vale o cinético, menor. O ABS existe para manter a frenagem no regime mais forte, o que encurta a distância de parada e ainda preserva o controle da direção.'
      }
    ],

    // TÓPICO 6 — Força resultante
    quiz6: [
      {
        type: 'numeric',
        text: 'Duas forças horizontais atuam sobre uma caixa: 30 N para a direita e 20 N para a esquerda. Qual é o módulo da força resultante, em newtons?',
        answer: 10,
        tolerance: 0.1,
        unit: 'N',
        explanation: 'Forças na mesma direção e sentidos opostos se subtraem: 30 − 20 = 10 N, apontando para a direita. Se estivessem no mesmo sentido, somariam 50 N; se fossem perpendiculares, o resultado sairia por Pitágoras.'
      },
      {
        type: 'numeric',
        text: 'Um carrinho de supermercado com massa total de 25 kg é empurrado por uma força horizontal de 60 N. O atrito com o piso vale 10 N, no sentido oposto ao movimento. Qual é o módulo da aceleração do carrinho, em m/s²?',
        answer: 2,
        tolerance: 0.1,
        unit: 'm/s²',
        explanation: 'Primeiro a resultante: F_res = 60 − 10 = 50 N. Depois a 2ª Lei: a = F_res / m = 50 / 25 = 2 m/s². O erro mais comum é usar os 60 N e obter 2,4 m/s² — quem determina a aceleração é a força RESULTANTE, nunca uma força isolada.'
      },
      {
        type: 'objective',
        text: 'Duas forças de 8 N e 5 N atuam num corpo mantido em repouso por uma terceira força. Que valor essa terceira força NÃO pode ter?',
        options: [
          '12 N',
          '3 N',
          '8 N',
          '14 N'
        ],
        correct: 3,
        explanation: 'A resultante de duas forças de 8 N e 5 N varia entre |8 − 5| = 3 N e 8 + 5 = 13 N, conforme o ângulo entre elas. Como o corpo está em repouso, a terceira força precisa anular exatamente essa resultante, e portanto seu módulo também tem de estar entre 3 N e 13 N. 14 N está fora da faixa.'
      },
      {
        type: 'objective',
        text: 'Um paraquedista desce com velocidade constante (velocidade terminal). O que se pode afirmar?',
        options: [
          'O peso é maior que a resistência do ar, e por isso ele continua descendo.',
          'O peso dele diminuiu até se igualar à resistência do ar.',
          'A resistência do ar cresceu até igualar o peso; a resultante é nula e a velocidade não muda.',
          'A resultante aponta para cima, e por isso ele desacelera continuamente.'
        ],
        correct: 2,
        explanation: 'Velocidade constante implica resultante nula — é equilíbrio dinâmico. A resistência do ar aumenta com a velocidade até igualar o peso, e a partir daí a queda é uniforme. O peso não diminuiu em momento algum: o que mudou foi a força de resistência.'
      }
    ],

    // TÓPICO 7 — Diagrama de corpo livre
    quiz7: [
      {
        type: 'objective',
        text: 'Você desenha o diagrama de corpo livre de um bloco que está sendo empurrado sobre uma mesa horizontal. Qual dos itens abaixo NÃO deve aparecer nesse diagrama?',
        options: [
          'A força de atrito que a mesa exerce no bloco.',
          'A força que o bloco exerce na mesa.',
          'O peso do bloco.',
          'A força aplicada por quem empurra o bloco.'
        ],
        correct: 1,
        explanation: 'Num diagrama de corpo livre entram somente as forças que agem NO corpo isolado. A força que o bloco exerce na mesa é a parceira (3ª Lei) da normal, mas atua em outro corpo — a mesa — e portanto fica fora deste diagrama. Misturar as duas é o erro que gera resultantes sempre nulas e a conclusão falsa de que nada poderia acelerar.'
      },
      {
        type: 'numeric',
        text: 'Uma caixa de 10 kg é empurrada por uma força horizontal de 40 N, sobre um piso onde o atrito vale 10 N. Qual é o módulo da aceleração da caixa, em m/s²?',
        answer: 3,
        tolerance: 0.1,
        unit: 'm/s²',
        explanation: 'No eixo vertical não há aceleração: N = P = 100 N. No horizontal, F_res = 40 − 10 = 30 N, e então a = 30 / 10 = 3 m/s². É exatamente o roteiro do diagrama de corpo livre: somar as forças eixo por eixo antes de aplicar a 2ª Lei.'
      },
      {
        type: 'objective',
        text: 'Num diagrama de corpo livre de um bloco apoiado num plano inclinado, sem atrito, quais forças devem aparecer?',
        options: [
          'Peso, normal e uma força ao longo da rampa que puxa o bloco para baixo.',
          'Apenas o peso, porque o bloco desce sozinho.',
          'Peso e normal, apenas — e a normal é perpendicular à rampa, não à vertical.',
          'Peso, normal e a força que o bloco faz na rampa.'
        ],
        correct: 2,
        explanation: 'Sem atrito e sem fio, só há duas forças no bloco: o peso, vertical para baixo, e a normal, perpendicular à superfície inclinada. O bloco desce porque a componente do peso paralela à rampa não é equilibrada por nada — mas essa componente não é uma força nova a desenhar: é uma parte do próprio peso, obtida na decomposição. E a força que o bloco faz na rampa age na rampa, não nele.'
      }
    ],

    // TÓPICO 8 — Aplicações
    quiz8: [
      {
        type: 'objective',
        text: 'Um menino lança uma bola verticalmente para cima. Desprezando a resistência do ar, quais forças atuam sobre a bola enquanto ela sobe?',
        options: [
          'Uma força do chute para cima, maior que o peso.',
          'Apenas o peso, dirigido para baixo.',
          'Uma força para cima igual ao peso, o que a mantém subindo.',
          'Nenhuma força, pois ela já foi lançada.'
        ],
        correct: 1,
        explanation: 'Depois que a mão deixa a bola, não existe nenhuma "força do lançamento" viajando com ela — a única força é o peso, para baixo. Ela sobe porque já possui velocidade para cima, enquanto o peso a desacelera. Dizer que a bola carrega a força do lançamento é a teoria medieval do ímpeto, que a 1ª Lei de Newton substitui.'
      },
      {
        type: 'objective',
        text: 'Em "Viagem ao Céu", Monteiro Lobato escreve que a laranja lançada para cima sobe enquanto a força que a lançou é maior que seu peso, e cai quando o peso se torna maior. Qual é a correção física dessa passagem?',
        options: [
          'A descrição está certa: a força do lançamento realmente vai diminuindo no ar.',
          'Depois de deixar a mão, só o peso atua sobre a laranja; e a aceleração dela não depende da massa.',
          'A laranja sobe porque a gravidade fica temporariamente mais fraca perto do chão.',
          'No ponto mais alto todas as forças se anulam, e por isso a laranja para.'
        ],
        correct: 1,
        explanation: 'Lobato descreve a teoria do ímpeto, não a física de Newton. Após o lançamento, a única força é o peso — a "força que lançou" deixou de existir no instante em que a mão perdeu contato. E como a = g independe da massa, a laranja e uma melancia teriam a mesma aceleração. No topo, a velocidade é nula, mas a força não.'
      },
      {
        type: 'numeric',
        text: 'Um bloco de 4 kg é puxado por um fio horizontal com 30 N, sobre um piso com μ<sub>c</sub> = 0,25. Qual é o módulo da aceleração do bloco, em m/s²? (use g = 10 m/s²)',
        answer: 5,
        tolerance: 0.1,
        unit: 'm/s²',
        explanation: 'Vertical: N = P = 40 N. Atrito: Fat = μc · N = 0,25 × 40 = 10 N. Horizontal: F_res = 30 − 10 = 20 N. Pela 2ª Lei, a = 20 / 4 = 5 m/s². Note a cadeia inteira do estudo num só exercício: a normal alimenta o atrito, o atrito entra na resultante, e a resultante dá a aceleração.'
      }
    ]

  };

  // Expõe para geração de relatório
  window.NLQuizData = QUIZZES;

  // ================================================================
  // ESTADO GLOBAL
  // ================================================================
  window.NLQuizState = {
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
    window.NLQuizState.total += questions.length;
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
        if (window.NLQuizState.answered[qid]) return;

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
        if (window.NLQuizState.answered[qid]) return;

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
    window.NLQuizState.answered[qid] = Object.assign({ correct: isRight }, extra || {});
    if (isRight) window.NLQuizState.score++;
    updateScoreDisplay();
  }

  function updateScoreDisplay() {
    const numEl = document.getElementById('score-num');
    const totEl = document.getElementById('score-total');
    const msgEl = document.getElementById('score-msg');
    if (!numEl) return;

    numEl.textContent = window.NLQuizState.score;
    totEl.textContent = window.NLQuizState.total;

    const answered = Object.keys(window.NLQuizState.answered).length;
    const pct = window.NLQuizState.total > 0
      ? Math.round((window.NLQuizState.score / window.NLQuizState.total) * 100) : 0;

    if (answered === 0) {
      msgEl.textContent = 'Responda as questões para ver seu placar!';
    } else if (answered < window.NLQuizState.total) {
      msgEl.textContent = 'Você respondeu ' + answered + ' de ' + window.NLQuizState.total + ' questões. Continue!';
    } else {
      let msg = '';
      if (pct >= 90) msg = '🏆 Excelente! Você já identifica as forças de olho fechado.';
      else if (pct >= 70) msg = '👍 Muito bom! Revise os pontos em que errou.';
      else if (pct >= 50) msg = '📚 Razoável. Releia os tópicos com dificuldade.';
      else msg = '💪 Continue! Refaça os diagramas de corpo livre antes de refazer as contas.';
      msgEl.textContent = 'Você acertou ' + pct + '% das questões. ' + msg;
    }
  }

  // ================================================================
  // RESET
  // ================================================================
  window.NLQuizReset = function () {
    window.NLQuizState.answered = {};
    window.NLQuizState.score = 0;
    window.NLQuizState.total = 0;
    initAllQuizzes();
    updateScoreDisplay();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    _seededShuffle(targets, 20260729);
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
