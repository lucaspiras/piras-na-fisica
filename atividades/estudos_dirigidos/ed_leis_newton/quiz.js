// quiz.js — Questões e motor de quiz das Leis de Newton

(function () {
  'use strict';

  function stripHtmlLocal(str) {
    return str.replace(/<[^>]+>/g, '');
  }

  // ================================================================
  // BANCO DE QUESTÕES
  // ================================================================
  const QUIZZES = {

    // TÓPICO 1 — Força: a linguagem da dinâmica
    quiz1: [
      {
        type: 'numeric',
        text: 'Uma mochila de 8 kg está pendurada, em repouso, num gancho. Qual é a intensidade do peso dela, em newtons? (use g = 10 m/s²)',
        answer: 80,
        tolerance: 0.5,
        unit: 'N',
        explanation: 'P = m · g = 8 × 10 = 80 N. Como a mochila está em repouso, a resultante nela é nula e a tração do gancho também vale 80 N — mas atenção: peso e tração agem no MESMO corpo (a mochila) e por isso não formam um par ação–reação; elas apenas se equilibram.'
      },
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
        text: 'Sobre a força normal, qual afirmação é correta?',
        options: [
          'É sempre igual ao peso do corpo, em qualquer situação.',
          'É a reação do peso, formando com ele um par ação–reação.',
          'É a força que a superfície exerce no corpo apoiado, perpendicular à superfície; nem sempre é igual ao peso.',
          'Aponta sempre para baixo, no mesmo sentido do peso.'
        ],
        correct: 2,
        explanation: 'A normal é perpendicular à superfície de contato. Ela só coincide em intensidade com o peso em casos particulares (superfície horizontal, sem outras forças verticais). Num plano inclinado ela é menor que o peso, e num elevador acelerado ela muda enquanto o peso continua o mesmo. E ela não é a reação do peso: a reação do peso é a força que o corpo faz na Terra.'
      }
    ],

    // TÓPICO 2 — 1ª Lei: inércia e referenciais inerciais
    quiz2: [
      {
        type: 'objective',
        text: 'Você está num ônibus que arranca. Uma sacola pendurada no corrimão se inclina para trás, aparentemente sem que nada a empurre. Como um observador na calçada descreve a mesma cena?',
        options: [
          'A sacola tende a manter a velocidade que tinha, e o ônibus avança à frente dela — por isso ela fica "atrasada".',
          'Uma força de inércia real empurra a sacola para trás.',
          'O peso da sacola aumenta enquanto o ônibus acelera.',
          'O ar dentro do ônibus arrasta a sacola no sentido contrário ao movimento.'
        ],
        correct: 0,
        explanation: 'Para quem está na calçada — um referencial inercial — não há mistério: a sacola apenas mantém a velocidade anterior enquanto o ônibus acelera. Dentro do ônibus, que é um referencial não inercial, a 1ª Lei parece falhar, e somos levados a inventar uma "força para trás" que nenhum corpo exerce. É exatamente esse o conteúdo próprio da 1ª Lei: dizer em quais referenciais as leis valem.'
      },
      {
        type: 'objective',
        text: 'Um trenó desliza sobre gelo praticamente sem atrito, em linha reta e com velocidade constante. O que se pode afirmar sobre a força resultante nele?',
        options: [
          'É uma força para a frente, proporcional à sua velocidade.',
          'É uma força para a frente, um pouco maior que o atrito.',
          'É nula.',
          'É uma força para trás, que o mantém em linha reta.'
        ],
        correct: 2,
        explanation: 'Velocidade constante em linha reta significa aceleração zero e, portanto, força resultante nula. O trenó continua por inércia, sem precisar de nenhuma força no sentido do movimento. Manter velocidade não custa força: mudá-la, sim.'
      },
      {
        type: 'objective',
        text: 'Puxando a toalha bem rápido, os pratos sobre a mesa quase não se movem. Qual é a melhor explicação?',
        options: [
          'A toalha perde o atrito quando é puxada rapidamente.',
          'Os pratos tendem a permanecer em repouso (inércia) e o atrito age por um tempo curtíssimo, produzindo variação de velocidade mínima.',
          'A gravidade sobre os pratos aumenta durante o puxão.',
          'A força do puxão é transferida integralmente para a toalha, e nenhuma força age nos pratos.'
        ],
        correct: 1,
        explanation: 'A ideia em destaque é a inércia: os pratos tendem a continuar em repouso. Mas note que a 2ª Lei também está presente e é ela que fecha o raciocínio — existe atrito nos pratos, sim, só que ele age por um intervalo de tempo muito pequeno, de modo que a variação de velocidade que ele consegue produzir é desprezível. Nenhuma cena é de uma lei só.'
      },
      {
        type: 'objective',
        text: 'Uma sonda espacial, longe de qualquer astro, desliga os motores. O que acontece com o seu movimento?',
        options: [
          'Ela para imediatamente, pois não há mais força propulsora.',
          'Ela vai perdendo velocidade aos poucos, até parar.',
          'Ela passa a se mover em círculos.',
          'Ela continua se movendo em linha reta com velocidade constante, indefinidamente.'
        ],
        correct: 3,
        explanation: 'Sem força resultante, a velocidade se conserva — é a 1ª Lei em sua forma mais limpa, longe do atrito que confunde nossa intuição terrestre. Achar que ela iria "perdendo velocidade" é a intuição aristotélica: procurar o que mantém o movimento, quando a pergunta certa é o que o muda.'
      }
    ],

    // TÓPICO 3 — 2ª Lei: quantidade de movimento e F = m·a
    quiz3: [
      {
        type: 'numeric',
        text: 'Um carrinho de supermercado com massa total de 25 kg é empurrado por uma força horizontal de 60 N. O atrito com o piso vale 10 N, no sentido oposto ao movimento. Qual é o módulo da aceleração do carrinho, em m/s²?',
        answer: 2,
        tolerance: 0.1,
        unit: 'm/s²',
        explanation: 'Primeiro a resultante: F_res = 60 − 10 = 50 N. Depois a 2ª Lei: a = F_res / m = 50 / 25 = 2 m/s². O erro mais comum é usar os 60 N e obter 2,4 m/s² — quem determina a aceleração é a força RESULTANTE, nunca uma força isolada.'
      },
      {
        type: 'numeric',
        text: 'Que força resultante, em newtons, é necessária para dar a um corpo de 2 kg uma aceleração de 3 m/s²?',
        answer: 6,
        tolerance: 0.1,
        unit: 'N',
        explanation: 'F_res = m · a = 2 × 3 = 6 N. Vale lembrar de onde vem a unidade: 1 N é justamente a força que dá a 1 kg a aceleração de 1 m/s², ou seja, 1 N = 1 kg·m/s².'
      },
      {
        type: 'objective',
        text: 'É mais difícil pôr em movimento um carrinho de compras cheio do que vazio, aplicando a mesma força. Por quê?',
        options: [
          'O carrinho cheio tem mais peso, e a gravidade o prende ao chão.',
          'A força de atrito desaparece quando o carrinho está vazio.',
          'O carrinho cheio tem mais massa — mais inércia — então a mesma força produz menor aceleração.',
          'A 3ª Lei age com mais intensidade sobre o carrinho cheio.'
        ],
        correct: 2,
        explanation: 'Pela 2ª Lei, a = F/m: com mais massa, a mesma força gera menos aceleração. A massa é a medida quantitativa da inércia, isto é, da resistência do corpo a ter seu movimento alterado. (O atrito também cresce com a carga, mas o efeito central aqui é o aumento da massa.)'
      },
      {
        type: 'objective',
        text: 'Um caminhão de 8 000 kg se move a 1 m/s e uma moto de 200 kg a 40 m/s. Sobre a quantidade de movimento dos dois:',
        options: [
          'A moto tem quantidade de movimento muito maior, porque é bem mais rápida.',
          'Os dois têm a mesma quantidade de movimento: 8 000 kg·m/s.',
          'O caminhão tem quantidade de movimento maior, porque é bem mais massivo.',
          'Não é possível comparar sem conhecer as forças aplicadas.'
        ],
        correct: 1,
        explanation: 'p = m · v. Caminhão: 8 000 × 1 = 8 000 kg·m/s. Moto: 200 × 40 = 8 000 kg·m/s. A quantidade de movimento combina quanta matéria se move com quão rápido ela se move — e é dela que fala o enunciado preciso da 2ª Lei: a força resultante determina a rapidez com que essa grandeza varia.'
      }
    ],

    // TÓPICO 4 — 3ª Lei: pares de interação
    quiz4: [
      {
        type: 'objective',
        text: 'Um livro está em repouso sobre a mesa. O peso do livro (para baixo) e a força normal da mesa sobre o livro (para cima) têm a mesma intensidade e sentidos opostos. Elas formam um par ação–reação?',
        options: [
          'Sim, porque têm a mesma intensidade e sentidos opostos.',
          'Não: as duas agem no <em>mesmo</em> corpo (o livro) e têm naturezas diferentes. A reação ao peso é a força do livro sobre a Terra; a reação à normal é a força do livro sobre a mesa.',
          'Sim, porque uma é a causa e a outra é o efeito.',
          'Não, porque a normal é sempre um pouco maior que o peso — é o que impede o livro de afundar.'
        ],
        correct: 1,
        explanation: 'Um par ação–reação nunca atua no mesmo corpo. Aqui peso e normal apenas se equilibram no livro (isso é 1ª Lei, não 3ª), e cada uma tem o seu próprio par, em outro corpo. Um teste decisivo: coloque outro objeto sobre o livro. A normal muda; o peso do livro não. Se fossem um par, teriam de mudar juntas.'
      },
      {
        type: 'objective',
        text: 'As forças de um par ação–reação têm a mesma intensidade e sentidos opostos. Por que elas não se anulam, permitindo que os corpos se movam?',
        options: [
          'Porque uma delas é sempre ligeiramente maior que a outra.',
          'Porque acontecem em instantes diferentes: primeiro a ação, depois a reação.',
          'Porque agem em corpos diferentes — uma em cada corpo do par.',
          'Porque de fato se anulam, e o movimento vem de outra causa.'
        ],
        correct: 2,
        explanation: 'Para saber se um corpo acelera, você soma apenas as forças que agem NELE — e a parceira de cada uma está no outro corpo, fora dessa soma. Também vale corrigir a ideia de ordem temporal: as duas forças são simultâneas, e os nomes "ação" e "reação" são apenas rótulos, não uma sequência causal.'
      },
      {
        type: 'objective',
        text: 'Um foguete acelera no vácuo do espaço, onde não há ar. Qual é a explicação newtoniana correta?',
        options: [
          'Os gases empurram contra o ar externo, que serve de apoio.',
          'A queima do combustível reduz o peso e ele sobe sozinho.',
          'O foguete expele gases num sentido (ação) e recebe dos gases uma força no sentido oposto (reação).',
          'A inércia dos gases arrasta o foguete para frente.'
        ],
        correct: 2,
        explanation: 'O foguete empurra os gases para trás; pela 3ª Lei, os gases empurram o foguete para frente. Por isso ele funciona no vácuo — não precisa de nada externo para "empurrar contra". Note ainda que aqui a massa do foguete diminui durante o movimento, e é justamente por isso que a versão F_res = m·a, com massa fixa, não dá conta desse caso.'
      },
      {
        type: 'objective',
        text: 'Dois patinadores, inicialmente em repouso e parados um em frente ao outro no gelo, se empurram. O de maior massa adquire menor velocidade. Qual princípio explica isso?',
        options: [
          'O patinador mais leve recebe uma força maior do que a que ele aplica.',
          'As forças do par são iguais e opostas; como a quantidade de movimento total se conserva, quem tem mais massa ganha menos velocidade.',
          'O atrito com o gelo distribui as forças de forma desigual.',
          'O patinador mais leve tem mais inércia, e por isso se move mais.'
        ],
        correct: 1,
        explanation: 'Pela 3ª Lei, os dois recebem forças de mesma intensidade e sentidos opostos. Como as forças do par são iguais, opostas e colineares, a quantidade de movimento total do sistema não muda: o que um ganha, o outro perde exatamente. E pela 2ª Lei, a mesma força produz menos aceleração em quem tem mais massa — daí a menor velocidade final. Inércia maior significa resistir mais à mudança, não mover-se mais.'
      }
    ],

    // TÓPICO 5 — Força resultante, equilíbrio e DCL
    quiz5: [
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
        text: 'Uma caixa de 10 kg é empurrada por uma força horizontal de 40 N, sobre um piso onde o atrito vale 10 N. Qual é o módulo da aceleração da caixa, em m/s²?',
        answer: 3,
        tolerance: 0.1,
        unit: 'm/s²',
        explanation: 'No eixo vertical não há aceleração: N = P = 100 N. No horizontal, F_res = 40 − 10 = 30 N, e então a = 30 / 10 = 3 m/s². É exatamente o roteiro do diagrama de corpo livre: somar as forças eixo por eixo antes de aplicar a 2ª Lei.'
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
      },
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
      }
    ],

    // TÓPICO 6 — Nenhuma situação é de uma lei só
    quiz6: [
      {
        type: 'objective',
        text: 'Um ônibus freia bruscamente e um passageiro em pé é lançado para a frente, até que o corrimão o segura. Qual é a análise <strong>completa</strong> dessa cena?',
        options: [
          'Só a 1ª Lei está envolvida: é um caso puro de inércia.',
          'A 1ª Lei explica por que o passageiro mantém a velocidade que já tinha; a 2ª Lei descreve a força do corrimão (e o atrito dos pés) que o desacelera; a 3ª Lei diz que ele empurra o corrimão com a mesma intensidade.',
          'A 2ª Lei é dispensável, porque durante a freada nenhuma força age sobre o passageiro.',
          'A freada cria uma força para a frente que empurra o passageiro contra o corrimão.'
        ],
        correct: 1,
        explanation: 'Visto da rua — um referencial inercial — o passageiro não é "jogado" para frente: ele apenas mantém a velocidade que tinha, enquanto o ônibus desacelera embaixo dele (1ª Lei). Quem de fato o para é a força do corrimão mais o atrito dos pés, e é a 2ª Lei que liga essa resultante à desaceleração dele. Pela 3ª Lei, ele empurra o corrimão de volta com a mesma intensidade. E não existe nenhuma força para a frente: ela só "aparece" porque olhamos de dentro do ônibus, que freando não é um referencial inercial.'
      },
      {
        type: 'objective',
        text: 'Um carro arranca a partir do repouso. Qual sequência descreve corretamente o encadeamento das três leis?',
        options: [
          'O motor cria uma força que empurra o carro diretamente para a frente, e só a 2ª Lei está envolvida.',
          'O pneu empurra o asfalto para trás e o asfalto empurra o pneu para a frente (3ª); essa força é a resultante que acelera o carro (2ª); e você afunda no banco porque tende a manter sua velocidade (1ª).',
          'A inércia do carro é convertida em força pelo motor, e o atrito não desempenha papel algum.',
          'O ar empurra o carro para a frente enquanto as rodas giram.'
        ],
        correct: 1,
        explanation: 'É a cadeia completa. A força que acelera o carro é externa e vem do asfalto, por meio do atrito — sem esse par da 3ª Lei as rodas girariam no lugar. A 2ª Lei quantifica: essa força, menos as resistências, dividida pela massa, dá a aceleração. E a 1ª explica sua sensação: você tende a permanecer com a velocidade anterior, e é o banco que aplica a força que o leva junto.'
      },
      {
        type: 'objective',
        text: 'Quando um livro diz que certa situação "é um exemplo da 1ª Lei", o que isso significa exatamente?',
        options: [
          'Que somente a 1ª Lei atua naquela situação, e as outras duas estão ausentes.',
          'Que as outras duas leis foram temporariamente suspensas.',
          'Que a 1ª Lei responde à pergunta em destaque naquela cena — mas as três leis, e a escolha do referencial, continuam operando.',
          'Que a situação não pode ser analisada pela 2ª nem pela 3ª Lei.'
        ],
        correct: 2,
        explanation: 'O rótulo indica qual lei responde à pergunta que está sendo feita, não que as outras desapareceram. Em toda situação real as três leis operam simultaneamente, e por baixo delas ainda há a escolha do referencial. Confundir o rótulo com a cena completa é uma das principais fontes de erro em dinâmica.'
      }
    ],

    // TÓPICO 7 — Aristóteles × Newton
    quiz7: [
      {
        type: 'objective',
        text: 'Um ciclista para de pedalar numa ciclovia plana e vai perdendo velocidade até parar. Qual explicação é newtoniana?',
        options: [
          'Acabou a força que mantinha a bicicleta em movimento.',
          'A bicicleta gastou a inércia que havia acumulado ao pedalar.',
          'Existe uma força resultante contrária ao movimento (atrito nos eixos e nos pneus, mais resistência do ar) que produz uma desaceleração; sem ela, a bicicleta seguiria indefinidamente.',
          'A velocidade da bicicleta se transformou em massa.'
        ],
        correct: 2,
        explanation: 'Manter velocidade constante não exige força nenhuma — exige apenas resultante nula. O que faz a bicicleta parar não é a ausência de uma força "para a frente", e sim a presença de forças para trás. A primeira alternativa é a intuição aristotélica: procura o que MANTÉM o movimento, quando a pergunta certa é o que o MUDA. E inércia não é um combustível que se gasta.'
      },
      {
        type: 'objective',
        text: 'Uma bola é chutada e sobe pelo ar. Desprezando a resistência do ar, quais forças agem sobre ela enquanto sobe?',
        options: [
          'Uma força do chute para cima, maior que o peso.',
          'Apenas o peso, dirigido para baixo.',
          'Uma força para cima igual ao peso, o que a mantém subindo.',
          'Nenhuma força, pois ela já foi chutada.'
        ],
        correct: 1,
        explanation: 'Depois que o pé deixa a bola, não existe nenhuma "força do chute" viajando com ela — a única força é o peso, para baixo. Ela sobe porque já possui velocidade para cima (inércia), enquanto o peso a desacelera. Dizer que a bola carrega a força do chute é a teoria medieval do ímpeto, que a 1ª Lei substitui.'
      },
      {
        type: 'objective',
        text: 'A relação "F ∝ v" (força proporcional à velocidade) resume melhor qual pensamento?',
        options: [
          'O pensamento newtoniano, expresso na 2ª Lei.',
          'A concepção aristotélica e do senso comum, na qual mais força significa mais velocidade.',
          'A 3ª Lei de Newton.',
          'O princípio da inércia.'
        ],
        correct: 1,
        explanation: 'Aristóteles nunca escreveu essa relação — ela é um resumo moderno, feito por nós, de uma tese qualitativa que envolvia também a resistência do meio. Ainda assim ela capta bem a intuição: mais força, mais velocidade. Newton corrige o alvo: a força resultante determina a variação do movimento, não a velocidade em si, o que no caso de massa constante nos dá F_res = m·a.'
      }
    ],

    // TÓPICO 8 — Limites de validade
    quiz8: [
      {
        type: 'objective',
        text: 'Sobre os limites de validade da mecânica newtoniana, qual afirmação é correta?',
        options: [
          'A relatividade e a mecânica quântica provaram que Newton estava errado, e suas leis não devem mais ser usadas.',
          'As leis de Newton são uma aproximação excelente para velocidades muito menores que a da luz e para objetos de escala macroscópica — regime em que continuam sendo a física usada na engenharia e em missões espaciais.',
          'As leis de Newton só falham em laboratório; na natureza elas valem sempre.',
          'As leis de Newton valem em qualquer referencial, inercial ou não.'
        ],
        correct: 1,
        explanation: 'Toda teoria física tem um domínio de validade, e delimitá-lo é o que a torna científica. Fora do domínio de Newton (velocidades próximas à da luz, escala atômica, gravidade muito intensa) usamos a relatividade e a mecânica quântica. Dentro dele, Newton é tão exato quanto se precisa.'
      },
      {
        type: 'objective',
        text: 'O que afirma o princípio da correspondência, ao comparar as teorias modernas com a mecânica de Newton?',
        options: [
          'Que toda teoria nova precisa contradizer a anterior para ser considerada um avanço.',
          'Que a mecânica newtoniana e a relatividade fazem exatamente as mesmas previsões em todos os regimes.',
          'Que as teorias modernas reproduzem os resultados newtonianos no limite de baixas velocidades e de escalas grandes.',
          'Que Newton continua válido apenas na Terra, e a relatividade apenas no espaço.'
        ],
        correct: 2,
        explanation: 'Uma teoria nova tem de explicar tudo o que a antiga já explicava bem — e é isso que a relatividade e a mecânica quântica fazem em relação a Newton nos regimes de baixa velocidade e escala macroscópica. Vale notar ainda que a formulação da 2ª Lei em termos de quantidade de movimento sobrevive na relatividade (com uma definição modificada de p), enquanto a versão F_res = m·a não sobrevive.'
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
      if (pct >= 90) msg = '🏆 Excelente! Você pensa como Newton!';
      else if (pct >= 70) msg = '👍 Muito bom! Revise os pontos em que errou.';
      else if (pct >= 50) msg = '📚 Razoável. Releia os tópicos com dificuldade.';
      else msg = '💪 Continue! Cuidado com a intuição aristotélica — releia e tente de novo.';
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
