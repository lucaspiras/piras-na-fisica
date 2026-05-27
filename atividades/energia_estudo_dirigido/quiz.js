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
      }
    ],

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
      }
    ],

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
      }
    ],

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
        explanation: 'ΔEpg = m × g × (h<sub>f</sub> − h<sub>i</sub>) = 2 × 10 × (8 − 20) = 20 × (−12) = −240 J. O sinal negativo indica que a energia potencial gravitacional diminuiu, pois a pedra desceu. Podemos confirmar calculando separadamente: Epg<sub>f</sub> − Epg<sub>i</sub> = (2×10×8) − (2×10×20) = 160 − 400 = −240 J.'
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
    ],

    quiz5: [
      {
        type: 'objective',
        text: 'Por que é necessário realizar trabalho para aproximar dois prótons (cargas positivas)?',
        options: [
          'Porque os prótons são muito pesados e resistem ao movimento.',
          'Porque a força elétrica repulsiva entre eles se opõe à aproximação, e vencer essa força armazena energia potencial no sistema.',
          'Porque os prótons perdem energia cinética ao se aproximar, sem ganho de energia potencial.',
          'Porque o campo gravitacional entre eles deve ser vencido para aproximá-los.'
        ],
        correct: 1,
        explanation: 'Dois prótons se repelem. Para aproximá-los, é preciso realizar trabalho contra a força repulsiva. Esse trabalho não desaparece — fica armazenado como energia potencial elétrica do sistema. Ao serem liberados, se afastam novamente, convertendo essa Ep em Ec.'
      },
      {
        type: 'objective',
        text: 'Qual situação apresenta a melhor analogia com o comportamento de uma carga positiva em um campo elétrico que vai espontaneamente de um ponto de alto potencial para um de baixo potencial?',
        options: [
          'Uma bola subindo uma rampa, ganhando energia potencial gravitacional.',
          'Um cubo de gelo derretendo ao sol.',
          'Uma pedra caindo de um penhasco, convertendo energia potencial em cinética.',
          'Um carro desacelerando até parar.'
        ],
        correct: 2,
        explanation: 'A carga positiva "cai" de maior para menor potencial elétrico — exatamente como uma pedra cai de maior para menor altitude. Em ambos os casos, a energia potencial diminui e a energia cinética aumenta. A analogia entre gravitação e eletrostática é muito profunda.'
      },
      {
        type: 'objective',
        text: 'Uma bateria carregada armazena energia na forma de:',
        options: [
          'Elétrons extras acumulados no terminal negativo, que saem rapidamente ao conectar o circuito.',
          'Energia potencial elétrica mantida pela separação de cargas, sustentada por reações químicas internas.',
          'Calor gerado pelas reações internas, que é convertido em eletricidade ao ser usado.',
          'Corrente elétrica circulando rapidamente entre os dois terminais.'
        ],
        correct: 1,
        explanation: 'A bateria armazena energia potencial elétrica pela separação de cargas positivas e negativas mantida por reações químicas. A bateria não cria elétrons — ela fornece a diferença de potencial que faz os elétrons já presentes no circuito fluírem, realizando trabalho nos componentes.'
      }
    ],

    quiz6: [
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
      },
      {
        type: 'numeric',
        text: 'Uma pedra cai do repouso de 45 m de altura, sem resistência do ar. Usando conservação de energia mecânica (g = 10 m/s²), qual é a velocidade da pedra ao atingir o chão? (em m/s)',
        answer: 30,
        tolerance: 0,
        unit: 'm/s',
        explanation: 'Em = constante: Epg = Ec → mgh = ½mv² → v² = 2gh = 2 × 10 × 45 = 900 → v = 30 m/s. A massa cancela — a velocidade final depende apenas da altura e de g.'
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
      },
      {
        type: 'objective',
        text: 'O que a constante elástica k de uma mola representa?',
        options: [
          'A força máxima que a mola pode exercer antes de quebrar.',
          'A rigidez da mola: quanto maior k, maior a força exercida e mais energia armazenada para uma mesma deformação.',
          'A deformação máxima que a mola pode sofrer sem se deformar permanentemente.',
          'A energia total que a mola armazena quando comprimida até seu limite.'
        ],
        correct: 1,
        explanation: 'k é a constante de proporcionalidade entre força e deformação (Lei de Hooke: F = kx). Uma mola rígida (k grande) exige mais força para a mesma deformação x e armazena mais energia (Epe = ½kx²). Uma mola mole (k pequeno) deforma facilmente com pouca força.'
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
        explanation: 'Ep inicial = mgh = 2 × 10 × 8 = 160 J. Ec final = ½mv² = ½ × 2 × 100 = 100 J. Energia do atrito = 160 − 100 = 60 J. Essa energia foi convertida em calor pelo atrito entre o bloco e a rampa.'
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
