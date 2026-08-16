// quiz.js — Questões e motor de quiz dos Circuitos Elétricos

(function () {
  'use strict';

  function stripHtmlLocal(str) {
    return str.replace(/<[^>]+>/g, '');
  }

  // ================================================================
  // BANCO DE QUESTÕES
  // ================================================================
  const QUIZZES = {

    // TÓPICO 1 — O que é um circuito
    quiz1: [
      {
        type: 'objective',
        text: 'Uma lâmpada ligada a uma pilha apaga no instante em que um dos fios se solta do polo da pilha. Por quê?',
        options: [
          'Porque a pilha descarrega instantaneamente quando o fio se solta.',
          'Porque o circuito deixa de ser fechado, e sem caminho de volta não há corrente.',
          'Porque a corrente escapa pela ponta solta do fio.',
          'Porque a tensão da pilha cai a zero assim que o fio sai.'
        ],
        correct: 1,
        explanation: 'A tensão da pilha continua exatamente a mesma com o fio solto — se você medir com um voltímetro, lá estão os 1,5 V. O que faltou foi o caminho fechado, que é uma das três condições para existir corrente. Sem circulação não há corrente, e sem corrente a lâmpada não acende.'
      },
      {
        type: 'objective',
        text: 'Quais são as três condições simultâneas para que exista corrente elétrica num condutor?',
        options: [
          'Tensão alta, fio de cobre e circuito curto.',
          'Uma fonte de corrente, um resistor e um interruptor.',
          'Uma diferença de potencial, um caminho fechado e portadores de carga livres.',
          'Carga elétrica em repouso, um campo magnético e um condutor.'
        ],
        correct: 2,
        explanation: 'Faltando qualquer uma das três, não há corrente. É por isso que um fio de cobre solto na gaveta, cheio de elétrons livres, não conduz nada: falta a ddp e falta o caminho fechado. E é por isso que um circuito fechado ligado a uma pilha, mas feito de borracha, também não conduz: faltam os portadores livres.'
      },
      {
        type: 'objective',
        text: 'Num esquema de circuito, dois pontos são ligados por uma linha bem comprida e outros dois por uma linha bem curta. O que isso significa?',
        options: [
          'Nada quanto ao circuito: o esquema só precisa preservar o que está ligado a quê.',
          'Que o primeiro trecho tem mais resistência que o segundo.',
          'Que a corrente demora mais para percorrer o primeiro trecho.',
          'Que a tensão cai mais no trecho comprido.'
        ],
        correct: 0,
        explanation: 'O esquema não é uma planta em escala. Ele troca a fotografia pelos símbolos padronizados justamente porque a única informação que importa é a topologia: quem está conectado a quem. Fios ideais, que é o que as linhas representam, têm resistência desprezível, seja qual for o comprimento no desenho.'
      }
    ],

    // TÓPICO 2 — Tensão
    quiz2: [
      {
        type: 'numeric',
        text: 'Uma fonte entrega 24 J de energia a cada 2 C de carga que a atravessa. Qual é a ddp entre os polos dela, em volts?',
        answer: 12,
        tolerance: 0.1,
        unit: 'V',
        explanation: 'U = E / q = 24 / 2 = 12 V. O volt é literalmente joule por coulomb: dizer que uma bateria é de 12 V é dizer que ela entrega 12 J a cada coulomb de carga que percorre o circuito.'
      },
      {
        type: 'objective',
        text: 'Qual é a diferença essencial entre uma pilha e uma bateria?',
        options: [
          'A pilha é descartável e a bateria é sempre recarregável.',
          'A pilha fornece corrente contínua e a bateria, corrente alternada.',
          'O número de células: a pilha tem uma; a bateria é uma associação de várias.',
          'A pilha é menor fisicamente que a bateria.'
        ],
        correct: 2,
        explanation: 'A pilha é uma única célula eletroquímica; a bateria associa várias, em geral em série para somar a tensão. É por isso que a bateria de um carro, com seis células de cerca de 2 V, fornece 12 V. Recarregável ou não é outra classificação, que corta as duas: existem pilhas recarregáveis e baterias descartáveis.'
      },
      {
        type: 'objective',
        text: 'Sobre a tensão que chega na tomada de casa, é correto afirmar que:',
        options: [
          'É contínua, e por isso os polos são fixos.',
          'É alternada: inverte de sinal 60 vezes por segundo no Brasil, e a corrente muda de sentido junto.',
          'É alternada, mas a corrente que ela produz é contínua.',
          'É contínua de 127 V, igual à de uma bateria de carro ampliada.'
        ],
        correct: 1,
        explanation: 'A rede distribui tensão alternada, a 60 Hz no Brasil. Como a tensão inverte de sinal, a corrente que ela empurra inverte de sentido junto. Pilhas e baterias, ao contrário, mantêm os polos fixos e produzem corrente contínua. Os aparelhos eletrônicos que precisam de CC trazem uma fonte que converte a CA da tomada.'
      },
      {
        type: 'objective',
        text: 'Um voltímetro é ligado entre dois pontos de um circuito. Que grandeza ele está medindo?',
        options: [
          'A força eletromotriz da fonte, sempre.',
          'A corrente que passa entre os dois pontos.',
          'A diferença de potencial entre esses dois pontos.',
          'A resistência do trecho entre os dois pontos.'
        ],
        correct: 2,
        explanation: 'O voltímetro mede ddp, que por definição compara o potencial elétrico entre dois pontos — daí ele ser sempre ligado entre dois pontos, e não no meio do caminho. A fem é uma característica da fonte, e o voltímetro só lê exatamente a fem quando não há corrente circulando; com corrente, a resistência interna faz a leitura ficar um pouco abaixo.'
      }
    ],

    // TÓPICO 3 — Corrente elétrica
    quiz3: [
      {
        type: 'numeric',
        text: 'Por uma secção de um fio passam 30 C de carga em 10 s. Qual é a intensidade da corrente, em ampères?',
        answer: 3,
        tolerance: 0.05,
        unit: 'A',
        explanation: 'i = Q / t = 30 / 10 = 3 A. O ampère é um coulomb por segundo, e vale ter noção do tamanho disso: 1 A corresponde a cerca de 6 × 10¹⁸ elétrons atravessando a secção a cada segundo.'
      },
      {
        type: 'objective',
        text: 'Um amperímetro é colocado antes da lâmpada e outro depois, num circuito simples. O que eles marcam?',
        options: [
          'O de antes marca mais, porque parte da corrente é consumida pela lâmpada.',
          'O de depois marca zero, porque a corrente acaba na lâmpada.',
          'Os dois marcam exatamente o mesmo valor.',
          'Depende do brilho da lâmpada.'
        ],
        correct: 2,
        explanation: 'A corrente é a mesma em todos os pontos de um circuito simples: a carga circula e volta inteira. O que a lâmpada consome é ENERGIA, e não carga. Confundir as duas coisas é o engano mais teimoso do assunto, e um amperímetro de cada lado resolve a discussão na bancada.'
      },
      {
        type: 'objective',
        text: 'Num fio de cobre com 1 A, cada elétron avança cerca de 25 cm por hora. Por que a lâmpada acende no instante em que você liga o interruptor?',
        options: [
          'Porque os elétrons aceleram até quase a velocidade da luz assim que o circuito fecha.',
          'Porque o fio já está cheio de elétrons, e o campo elétrico põe todos a marchar quase ao mesmo tempo.',
          'Porque a corrente da tomada é alternada e não precisa percorrer o fio.',
          'Porque a lâmpada tem elétrons próprios armazenados.'
        ],
        correct: 1,
        explanation: 'Ligar não coloca elétrons no fio: apenas põe a marchar os que já estavam lá. O que percorre o fio a quase 200 mil km/s é o campo elétrico, não o elétron. A imagem que fecha o raciocínio é a de um cano já cheio de bolinhas: empurre uma de um lado e outra sai do outro no mesmo instante, sem que nenhuma tenha atravessado o cano.'
      },
      {
        type: 'objective',
        text: 'Numa solução de água salgada percorrida por corrente, quem são os portadores de carga?',
        options: [
          'Apenas os elétrons livres, como nos metais.',
          'Apenas os íons positivos, porque o sentido convencional é do mais para o menos.',
          'Íons dos dois sinais, movendo-se em sentidos opostos, com as contribuições se somando.',
          'Nenhum: soluções não conduzem corrente elétrica.'
        ],
        correct: 2,
        explanation: 'Na⁺ vai para o eletrodo negativo e Cl⁻ para o positivo. Como cargas de sinais opostos se movem em sentidos opostos, as duas contribuições se SOMAM em vez de se cancelar, o que costuma surpreender. Nos metais é diferente: só os elétrons se movem, porque os núcleos ficam presos na rede.'
      }
    ],

    // TÓPICO 4 — Resistência
    quiz4: [
      {
        type: 'objective',
        text: 'Um resistor traz as faixas marrom, preto, vermelho e ouro. Qual é o valor dele?',
        options: [
          '1 kΩ com tolerância de 5%.',
          '100 Ω com tolerância de 5%.',
          '10 kΩ com tolerância de 10%.',
          '12 Ω com tolerância de 5%.'
        ],
        correct: 0,
        explanation: 'Marrom = 1 e preto = 0, formando o número 10. Vermelho como multiplicador vale × 100, então 10 × 100 = 1 000 Ω = 1 kΩ. A faixa ouro dá tolerância de ±5%, o que significa que o valor real está entre 950 Ω e 1 050 Ω. A leitura começa pela ponta em que as faixas estão mais juntas: a faixa afastada é a última.'
      },
      {
        type: 'objective',
        text: 'De onde vem, microscopicamente, a resistência de um material?',
        options: [
          'Da falta de elétrons livres, que precisam ser criados pela fonte.',
          'Das colisões dos elétrons com os átomos do material, em que eles perdem energia que vira calor.',
          'Do atrito entre a corrente e a parede interna do fio.',
          'Da tensão da fonte, que se desgasta ao atravessar o material.'
        ],
        correct: 1,
        explanation: 'Ao atravessar o material, os elétrons colidem com os átomos da rede e perdem energia a cada colisão. Essa energia não some: vira calor. É esse mecanismo que a resistência mede, e é dele que vem o efeito Joule. Note que os elétrons livres já estão no material antes de a fonte entrar em cena.'
      },
      {
        type: 'objective',
        text: 'Um resistor puro percorrido por corrente converte a energia elétrica em quê?',
        options: [
          'Parte em calor e parte em luz, como um LED.',
          'Parte em calor e parte em movimento, como um motor.',
          'Toda ela em energia térmica.',
          'Nada: ele apenas bloqueia a passagem da corrente, sem converter energia.'
        ],
        correct: 2,
        explanation: 'É o efeito Joule, e o resistor puro não tem outra saída: converte tudo em calor. Vale contrastar com o motor, que transforma parte em movimento, e com o LED, que transforma parte em luz. A conversão é ainda de mão única, porque o calor se espalha pelo ambiente e não volta a ser energia elétrica.'
      },
      {
        type: 'objective',
        text: 'Num chuveiro elétrico e num fusível, a resistência cumpre papéis diferentes. Quais são eles?',
        options: [
          'No chuveiro o aquecimento é o produto desejado; no fusível ele é o mecanismo de proteção, que rompe o fio ao passar do limite.',
          'Nos dois a resistência serve para aquecer a água que passa pelo aparelho.',
          'No chuveiro a resistência bloqueia a corrente; no fusível ela a aumenta.',
          'No fusível o aquecimento é o produto desejado; no chuveiro, um efeito indesejado.'
        ],
        correct: 0,
        explanation: 'É o mesmo efeito Joule com duas finalidades. No chuveiro, na torradeira e no ferro de passar, o calor é exatamente o que se quer. No fusível, o aquecimento serve para romper o fio antes que a fiação da casa aqueça, protegendo o resto do circuito. Já o aquecimento dos fios de transmissão é o caso em que o efeito é só perda.'
      }
    ],

    // TÓPICO 5 — 2ª Lei de Ohm: a resistência de um fio
    quiz5: [
      {
        type: 'numeric',
        text: 'Um fio tem resistência de 4 Ω. Outro fio, do mesmo material e mesma espessura, tem o triplo do comprimento. Qual é a resistência desse segundo fio, em ohms?',
        answer: 12,
        tolerance: 0.1,
        unit: 'Ω',
        explanation: 'Na 2ª Lei de Ohm, R = ρ·L/A, o comprimento entra multiplicando: triplicar L triplica R, então 4 × 3 = 12 Ω. A leitura física é simples: fio mais longo significa mais colisões pelo caminho. Se em vez do comprimento tivéssemos triplicado a área, a resistência cairia para um terço, porque A entra dividindo.'
      },
      {
        type: 'objective',
        text: 'Dois fios são do mesmo material e têm o mesmo comprimento, mas um é mais grosso que o outro. O que se pode afirmar?',
        options: [
          'O mais grosso tem resistência maior, porque tem mais material pelo caminho.',
          'O mais grosso tem resistência menor, porque a área entra dividindo em R = ρ·L/A.',
          'Os dois têm a mesma resistência, porque o material e o comprimento são iguais.',
          'Não é possível comparar sem conhecer a tensão aplicada.'
        ],
        correct: 1,
        explanation: 'A área entra dividindo, então mais grosso significa menos resistência. A leitura física é a de caminhos em paralelo: quanto maior a secção, mais rotas os elétrons têm à disposição. É a mesma razão por que a fiação de um chuveiro é mais grossa que a de uma lâmpada, já que precisa conduzir muito mais corrente sem aquecer.'
      },
      {
        type: 'objective',
        text: 'Qual afirmação sobre resistência e resistividade está correta?',
        options: [
          'São a mesma grandeza, com nomes diferentes.',
          'A resistividade depende da forma da peça; a resistência, não.',
          'A resistividade é propriedade do material; a resistência descreve o objeto, e depende também do comprimento e da área.',
          'A resistividade se mede em ohms e a resistência, em ohms vezes metro.'
        ],
        correct: 2,
        explanation: 'ρ descreve a substância: tabelado o cobre a 20 °C, aquele valor serve para qualquer peça de cobre na mesma temperatura. R descreve a peça específica, e sai de ρ combinada com a geometria: R = ρ·L/A. Dois fios de cobre podem ter resistências bem diferentes e a mesma resistividade. As unidades também distinguem: ρ em Ω·m, R em Ω.'
      },
      {
        type: 'objective',
        text: 'Por que uma lâmpada incandescente quase sempre queima no exato instante em que é ligada?',
        options: [
          'Porque a tensão da rede dá um pico no momento em que o interruptor fecha.',
          'Porque o filamento está frio, e por isso a resistência é baixa e a corrente é máxima nesse instante.',
          'Porque o filamento está frio, e por isso a resistência é máxima e a corrente também.',
          'Porque o vidro da lâmpada ainda não aqueceu e trinca com a corrente.'
        ],
        correct: 1,
        explanation: 'Nos metais, a resistividade cresce com a temperatura. O filamento de tungstênio opera a cerca de 2700 °C e tem, quente, uma resistência aproximadamente dez vezes maior que a frio. No instante da ligação ele ainda está frio: resistência baixa, corrente alta, e é esse pico de corrente que costuma romper o filamento.'
      }
    ],

    // TÓPICO 6 — Lei de Ohm
    quiz6: [
      {
        type: 'numeric',
        text: 'Um resistor de 220 Ω é ligado a uma fonte de 110 V. Qual é a corrente que o percorre, em ampères?',
        answer: 0.5,
        tolerance: 0.02,
        unit: 'A',
        explanation: 'i = V / R = 110 / 220 = 0,5 A. Este é o caso mais comum na prática: a tensão é imposta pela fonte e não muda, e quem decide a corrente é a resistência do que se liga nela.'
      },
      {
        type: 'objective',
        text: 'Uma fonte mantém 12 V fixos. Se a resistência do componente ligado a ela dobra, o que acontece com a corrente?',
        options: [
          'Dobra também.',
          'Cai pela metade.',
          'Não muda, porque a tensão não mudou.',
          'Fica quatro vezes menor.'
        ],
        correct: 1,
        explanation: 'Com V fixo, i = V/R: dobrar R corta a corrente pela metade. Cabe perceber que a resistência não CONSOME corrente, ela LIMITA a corrente. Quem estabelece a tensão é a fonte, e quem decide a corrente é a dupla tensão e resistência.'
      },
      {
        type: 'objective',
        text: 'O gráfico V × i de um componente é uma curva, e não uma reta. O que se conclui?',
        options: [
          'Que o componente está com defeito.',
          'Que a Lei de Ohm foi violada, e a física precisa ser corrigida.',
          'Que a resistência dele não é constante: o componente é não-ôhmico.',
          'Que a corrente medida estava errada.'
        ],
        correct: 2,
        explanation: 'A Lei de Ohm não é uma lei da natureza que tudo obedece: é a descrição de uma classe de materiais, os ôhmicos, em que R se mantém constante. Filamento de lâmpada, diodo, LED e transistor são não-ôhmicos, e não há nada de errado com eles. No gráfico, ôhmico é reta pela origem; qualquer entortada indica que R está mudando.'
      },
      {
        type: 'numeric',
        text: 'Uma bateria de 12 V é curto-circuitada por um fio de 0,05 Ω. Desprezando a resistência interna da bateria, qual seria a corrente pelo curto, em ampères?',
        answer: 240,
        tolerance: 2,
        unit: 'A',
        explanation: 'i = V / R = 12 / 0,05 = 240 A. Pela mesma bateria, uma lâmpada de 60 Ω puxaria apenas 0,2 A: mil e duzentas vezes menos. Tudo isso vira calor num fio que não foi feito para isso, e é por essa razão que existem fusíveis e disjuntores. Na prática a resistência interna da fonte segura bastante esse valor, e numa pilha AA a corrente nem chega perto disso.'
      }
    ],

    // TÓPICO 7 — Potência e energia
    quiz7: [
      {
        type: 'numeric',
        text: 'Um aparelho ligado em 220 V é percorrido por uma corrente de 5 A. Qual é a potência dele, em watts?',
        answer: 1100,
        tolerance: 5,
        unit: 'W',
        explanation: 'P = V · i = 220 × 5 = 1 100 W. Esta forma vale sempre, em qualquer trecho de qualquer circuito, e é a que se usa quando você conhece a tensão e a corrente. As outras duas saem dela por substituição, usando a Lei de Ohm.'
      },
      {
        type: 'objective',
        text: 'Dois resistores de valores diferentes são ligados de modo que a <strong>mesma corrente</strong> passe pelos dois. Qual dissipa mais potência?',
        options: [
          'O de menor resistência, porque deixa passar mais corrente.',
          'O de maior resistência, porque com i comum vale P = R·i².',
          'Os dois dissipam igual, porque a corrente é a mesma.',
          'Não é possível saber sem conhecer a tensão da fonte.'
        ],
        correct: 1,
        explanation: 'A pergunta que resolve a escolha da fórmula é sempre "o que é igual para os dois?". Aqui é a corrente, então a forma útil é P = R·i², e a potência cresce com R. Quando o que é comum é a TENSÃO, a forma útil passa a ser P = V²/R, e aí a conclusão se inverte: quem tem menos resistência consome mais. As três fórmulas dizem a mesma coisa.'
      },
      {
        type: 'numeric',
        text: 'Um chuveiro de 4 400 W é usado 20 minutos por dia. Quanta energia ele consome em 30 dias, em kWh? (arredonde para o inteiro mais próximo)',
        answer: 44,
        tolerance: 1,
        unit: 'kWh',
        explanation: 'Vinte minutos são 1/3 de hora. Consumo diário: 4,4 kW × (1/3) h = 1,47 kWh. Em 30 dias: 1,47 × 30 ≈ 44 kWh. Com tarifa de R$ 0,90 por kWh, isso dá cerca de R$ 40 por mês. Repare que o chuveiro fica ligado pouquíssimo tempo e mesmo assim pesa na conta, porque a potência dele é a maior da casa.'
      },
      {
        type: 'objective',
        text: 'O que exatamente o kWh mede?',
        options: [
          'A potência do aparelho, em quilowatts por hora.',
          'A energia consumida: é a energia de um aparelho de 1 kW ligado por 1 hora.',
          'A corrente média consumida ao longo de uma hora.',
          'O custo da eletricidade num período de uma hora.'
        ],
        correct: 1,
        explanation: 'kWh é unidade de ENERGIA, não de potência: vem de E = P·t, com P em kW e t em horas. A confusão é comum porque o nome tem "hora" dentro, e alguns chegam a ler "quilowatt por hora", o que inverteria o sentido. Em joules, 1 kWh = 3,6 × 10⁶ J.'
      }
    ],

    // TÓPICO 8 — Aplicações
    quiz8: [
      {
        type: 'numeric',
        text: 'Um chuveiro de 5 500 W funciona ligado em 220 V. Qual é a resistência dele, em ohms? (uma casa decimal)',
        answer: 8.8,
        tolerance: 0.2,
        unit: 'Ω',
        explanation: 'Pela tensão fixa da tomada vale P = V²/R, ou seja, R = V²/P = 220² / 5 500 = 48 400 / 5 500 = 8,8 Ω. Também dá para chegar em dois passos: i = P/V = 25 A, e depois R = V/i = 8,8 Ω.'
      },
      {
        type: 'objective',
        text: 'A resistência de um chuveiro é cerca de trinta vezes MENOR que a de uma lâmpada incandescente, embora o chuveiro aqueça muito mais. Como isso se explica?',
        options: [
          'A lâmpada tem mais resistência porque converte energia em luz, e não em calor.',
          'Com a tensão fixa da tomada vale P = V²/R, e nessa forma quem tem menos resistência consome mais potência.',
          'O chuveiro tem uma fonte própria que aumenta a tensão sobre ele.',
          'A conta está errada: a resistência do chuveiro tem de ser maior.'
        ],
        correct: 1,
        explanation: 'Os dois estão ligados à mesma tomada, então o que é comum é a TENSÃO, e a forma certa de ler é P = V²/R. Com V fixo, menos resistência significa mais corrente e mais potência. A intuição erra porque associa "esquentar muito" a "resistir muito", e o que de fato importa é a combinação de tensão e resistência.'
      },
      {
        type: 'objective',
        text: 'Por que um fusível é feito de um fio fino, e não grosso?',
        options: [
          'Para economizar metal na fabricação.',
          'Porque o fio fino tem área pequena e por isso resistência maior, então aquece mais que o resto da fiação e derrete primeiro.',
          'Porque o fio fino conduz melhor a corrente até o limite de segurança.',
          'Para que a corrente passe mais devagar por ele.'
        ],
        correct: 1,
        explanation: 'Na 2ª Lei de Ohm a área entra dividindo, então o fio fino do fusível tem resistência maior que a da fiação da casa. Pelo efeito Joule, o calor gerado nele cresce com o quadrado da corrente. Passando do limite, ele derrete primeiro e abre o circuito, antes que a fiação aqueça. O disjuntor faz o mesmo serviço e pode ser rearmado.'
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
      if (pct >= 90) msg = '🏆 Excelente! Tensão, corrente e resistência já estão no lugar.';
      else if (pct >= 70) msg = '👍 Muito bom! Revise os pontos em que errou.';
      else if (pct >= 50) msg = '📚 Razoável. Releia os tópicos com dificuldade.';
      else msg = '💪 Continue! Antes de calcular, pergunte o que está fixo: a tensão ou a corrente.';
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
