/* =============================================================
   Teste sobre Mecânica — dados das questões
   Carregado tanto pelo teste (index.html) quanto pela consulta de
   resultado (consulta.html), para não duplicar o conteúdo.

   Adaptado de: SILVEIRA, F., MOREIRA, M.A. e AXT, R.
   "Estrutura interna de testes de conhecimento em Física: um exemplo em Mecânica."

   tipo: 'texto'  → alternativas de texto
   tipo: 'imagem' → as alternativas são a imagem `opcoesImg`; o aluno escolhe a letra
   ============================================================= */

const TOTAL_QUESTOES = 19;

const BLOCOS = [
  {
    titulo: 'Questões 1 a 3',
    intro: 'A figura se refere a uma bola lançada verticalmente para cima. <strong>A</strong> é um ponto da subida, <strong>B</strong> é o ponto mais alto da trajetória e <strong>C</strong> é um ponto da descida.',
    figura: {
      src: 'img/fig_1_q123.jpg',
      alt: 'Uma pessoa lança uma bola verticalmente para cima. A trajetória é indicada por uma linha tracejada, com o ponto A na subida, o ponto B no alto e o ponto C na descida.'
    },
    questoes: [
      {
        num: 1,
        enunciado: 'No ponto A, quando a bola está subindo, qual dos desenhos melhor representa a(s) força(s) exercidas na bola?',
        tipo: 'imagem',
        opcoesImg: {
          src: 'img/q1_resp.jpg',
          alt: 'Cinco diagramas de forças sobre a bola, rotulados de A a E: (A) uma seta para cima; (B) uma seta grande para cima e uma menor para baixo; (C) apenas uma seta para baixo; (D) uma seta para cima e uma menor para baixo; (E) uma seta para cima e uma para baixo, de tamanhos iguais.'
        },
        letras: ['a', 'b', 'c', 'd', 'e']
      },
      {
        num: 2,
        enunciado: 'No ponto B, quando a bola atinge o ponto mais alto da trajetória, qual dos desenhos melhor representa a(s) força(s) exercidas na bola?',
        tipo: 'imagem',
        opcoesImg: {
          src: 'img/q2_resp.jpg',
          alt: 'Cinco diagramas rotulados de A a E: (A) uma seta longa para cima e duas menores para baixo; (B) uma seta para cima e uma para baixo, de tamanhos iguais; (C) uma seta curta para cima e uma longa para baixo; (D) apenas uma seta para baixo; (E) nenhuma seta, indicando força nula.'
        },
        letras: ['a', 'b', 'c', 'd', 'e']
      },
      {
        num: 3,
        enunciado: 'No ponto C, quando a bola está descendo, qual dos desenhos melhor representa a(s) força(s) exercidas na bola?',
        tipo: 'imagem',
        opcoesImg: {
          src: 'img/q3_resp.jpg',
          alt: 'Cinco diagramas rotulados de A a E: (A) apenas uma seta para baixo; (B) uma seta para cima e uma para baixo; (C) duas setas para baixo; (D) nenhuma seta, indicando força nula; (E) uma seta para cima e duas para baixo.'
        },
        letras: ['a', 'b', 'c', 'd', 'e']
      }
    ]
  },

  {
    titulo: 'Questão 4',
    intro: 'A figura se refere a um corpo que foi abandonado em repouso sobre uma rampa.',
    figura: {
      src: 'img/fig_q4.jpg',
      alt: 'Um corpo desliza sobre uma rampa inclinada, mostrado em três posições sucessivas, com setas indicando o sentido do movimento rampa abaixo.'
    },
    questoes: [
      {
        num: 4,
        enunciado: 'A figura se refere a um corpo que foi abandonado em repouso sobre uma rampa (é desprezível a força resistiva do ar no corpo e é constante a força de atrito com a rampa). Ele passa a deslizar com velocidade que cresce uniformemente no tempo. Assim sendo, pode-se afirmar que a força exercida no corpo rampa abaixo:',
        tipo: 'texto',
        opcoes: [
          { id: 'a', texto: 'é igual à força de atrito.' },
          { id: 'b', texto: 'é maior do que a força de atrito e está crescendo.' },
          { id: 'c', texto: 'é constante mas maior do que a força de atrito.' }
        ]
      }
    ]
  },

  {
    titulo: 'Questão 5',
    questoes: [
      {
        num: 5,
        enunciado: 'As figuras se referem a um satélite descrevendo movimento circular uniforme em torno da Terra. As setas simbolizam as forças exercidas sobre o satélite. Qual das figuras melhor representa a(s) força(s) sobre o satélite?',
        tipo: 'imagem',
        opcoesImg: {
          src: 'img/fig_q5.jpg',
          alt: 'Cinco figuras rotuladas de A a E, cada uma com a Terra ao centro e um satélite sobre uma órbita circular tracejada, com diferentes setas representando as forças sobre o satélite.'
        },
        letras: ['a', 'b', 'c', 'd', 'e']
      }
    ]
  },

  {
    titulo: 'Questão 6',
    questoes: [
      {
        num: 6,
        enunciado: 'As figuras se referem a um menino que faz girar, em uma trajetória circular em um plano vertical, uma pedra presa ao extremo de um fio. Em qual das figuras a(s) força(s) sobre a pedra está(ão) melhor representada(s) pela(s) seta(s)?',
        tipo: 'imagem',
        opcoesImg: {
          src: 'img/fig_q6.jpg',
          alt: 'Cinco figuras rotuladas de A a E, cada uma mostrando um menino girando uma pedra presa a um fio em trajetória circular vertical, com diferentes setas representando as forças sobre a pedra.'
        },
        letras: ['a', 'b', 'c', 'd', 'e']
      }
    ]
  },

  {
    titulo: 'Questões 7 a 9',
    intro: 'A figura se refere a um indivíduo que empurra uma caixa sobre uma superfície horizontal, onde existe atrito.',
    figura: {
      src: 'img/fig_q_789.jpg',
      alt: 'Um indivíduo empurra uma caixa sobre uma superfície horizontal.'
    },
    questoes: [
      {
        num: 7,
        enunciado: 'Inicialmente o indivíduo realiza uma força com intensidade um pouco maior do que a força de atrito. Portanto a caixa se movimentará:',
        tipo: 'texto',
        opcoes: [
          { id: 'a', texto: 'com velocidade que aumenta.' },
          { id: 'b', texto: 'com velocidade pequena e constante.' },
          { id: 'c', texto: 'com velocidade grande e constante.' }
        ]
      },
      {
        num: 8,
        enunciado: 'A caixa está sendo empurrada por uma força com intensidade muito maior do que a da força de atrito. Então o indivíduo diminui a intensidade da força mas ela continua sendo um pouco mais intensa do que a da força de atrito. Portanto a velocidade da caixa:',
        tipo: 'texto',
        opcoes: [
          { id: 'a', texto: 'diminui.' },
          { id: 'b', texto: 'aumenta.' },
          { id: 'c', texto: 'permanece constante.' }
        ]
      },
      {
        num: 9,
        enunciado: 'A caixa está sendo empurrada por uma força com intensidade maior do que a da força de atrito. Então o indivíduo diminui a intensidade da força até que ela se iguale à da força de atrito. Portanto a caixa:',
        tipo: 'texto',
        opcoes: [
          { id: 'a', texto: 'continuará se movimentando mas acabará parando.' },
          { id: 'b', texto: 'parará em seguida.' },
          { id: 'c', texto: 'continuará se movimentando com velocidade constante.' }
        ]
      }
    ]
  },

  {
    titulo: 'Questões 10 a 14',
    intro: 'A figura se refere a um elevador movimentado por um motor.',
    figura: {
      src: 'img/fig_q_10_14.jpg',
      alt: 'Um elevador suspenso por um cabo ligado a um motor.'
    },
    questoes: [
      {
        num: 10,
        enunciado: 'O elevador está inicialmente parado e então o motor exerce sobre o elevador uma força um pouco mais intensa do que o peso do elevador. Assim sendo, pode-se afirmar que o elevador subirá:',
        tipo: 'texto',
        opcoes: [
          { id: 'a', texto: 'com velocidade grande e constante.' },
          { id: 'b', texto: 'com velocidade que aumenta.' },
          { id: 'c', texto: 'com velocidade pequena e constante.' }
        ]
      },
      {
        num: 11,
        enunciado: 'O elevador está subindo e o motor está exercendo uma força cuja intensidade é muito maior do que a do peso do elevador. Então a força que o motor exerce diminui de intensidade mas permanece ainda um pouco maior do que a do peso do elevador. Portanto a velocidade do elevador:',
        tipo: 'texto',
        opcoes: [
          { id: 'a', texto: 'aumenta.' },
          { id: 'b', texto: 'diminui.' },
          { id: 'c', texto: 'não se altera.' }
        ]
      },
      {
        num: 12,
        enunciado: 'O elevador está subindo e o motor está exercendo uma força com intensidade maior do que a do peso do elevador. Então a força que o motor exerce diminui de intensidade, se igualando a do peso do elevador. Portanto o elevador:',
        tipo: 'texto',
        opcoes: [
          { id: 'a', texto: 'parará em seguida.' },
          { id: 'b', texto: 'continuará subindo durante algum tempo mas acabará parando.' },
          { id: 'c', texto: 'continuará subindo com velocidade constante.' }
        ]
      },
      {
        num: 13,
        enunciado: 'O elevador está descendo e o motor exerce sobre ele uma força com intensidade menor do que a do peso do elevador. Então a intensidade da força que o motor exerce aumenta e se iguala a do peso do elevador. Portanto o elevador:',
        tipo: 'texto',
        opcoes: [
          { id: 'a', texto: 'continuará descendo com velocidade constante.' },
          { id: 'b', texto: 'parará em seguida.' },
          { id: 'c', texto: 'continuará descendo durante algum tempo mas acabará parando.' }
        ]
      },
      {
        num: 14,
        enunciado: 'O elevador está descendo e o motor exerce sobre ele uma força menos intensa do que a do peso do elevador. Então a força que o motor exerce aumenta de intensidade, se tornando muito mais intensa do que o peso do elevador. Portanto o elevador:',
        tipo: 'texto',
        opcoes: [
          { id: 'a', texto: 'imediatamente sobe.' },
          { id: 'b', texto: 'continua a descer durante algum tempo com velocidade que diminui.' },
          { id: 'c', texto: 'imediatamente para e em seguida sobe com grande velocidade.' }
        ]
      }
    ]
  },

  {
    titulo: 'Questão 15',
    intro: 'A figura se refere a um indivíduo que, do topo de uma torre, arremessa para baixo uma bola.',
    figura: {
      src: 'img/fig_q_15.jpg',
      alt: 'Do alto de uma torre, uma pessoa arremessa uma bola para baixo; os pontos A, B e C marcam posições sucessivas durante a queda.'
    },
    questoes: [
      {
        num: 15,
        enunciado: 'A figura se refere a um indivíduo que, do topo de uma torre, arremessa para baixo uma bola. Os pontos A, B e C são pontos da trajetória da bola após o arremesso. É desprezível a força de resistência do ar sobre a bola. As setas nos esquemas seguintes simbolizam as forças exercidas sobre a bola nos pontos A, B e C. Qual dos esquemas seguintes melhor representa a(s) força(s) sobre a bola?',
        tipo: 'imagem',
        opcoesImg: {
          src: 'img/q15_resp.jpg',
          alt: 'Três esquemas rotulados A, B e C. Cada um mostra a bola nos pontos A, B e C com setas para baixo: no esquema A as setas crescem de tamanho ponto a ponto; no esquema B as setas têm o mesmo tamanho nos três pontos; no esquema C as setas também crescem.'
        },
        letras: ['a', 'b', 'c']
      }
    ]
  },

  {
    titulo: 'Questão 16',
    intro: 'A figura se refere a um indivíduo que lança com grande velocidade uma bola sobre uma superfície horizontal com atrito.',
    figura: {
      src: 'img/fig_q_16.jpg',
      alt: 'Uma pessoa lança uma bola sobre uma superfície horizontal com atrito; os pontos A e B ficam no trecho em que a bola ainda rola e no ponto C a bola está parada.'
    },
    questoes: [
      {
        num: 16,
        enunciado: 'A figura se refere a um indivíduo que lança com grande velocidade uma bola sobre uma superfície horizontal com atrito. Os pontos A e B são pontos da trajetória da bola após o lançamento, quando a bola já está rolando; no ponto C a bola está finalmente em repouso. As setas nos desenhos seguintes simbolizam as forças horizontais sobre a bola nos pontos A, B e C. Qual dos esquemas melhor representa a(s) força(s) sobre a bola?',
        tipo: 'imagem',
        opcoesImg: {
          src: 'img/q16_resp.jpg',
          alt: 'Cinco esquemas rotulados de A a E mostrando as forças horizontais sobre a bola nos pontos A, B e C, combinando setas para a frente e para trás; em alguns esquemas não há seta alguma no ponto C.'
        },
        letras: ['a', 'b', 'c', 'd', 'e']
      }
    ]
  },

  {
    titulo: 'Questões 17 a 19',
    intro: 'A figura se refere a uma pedra arremessada obliquamente. <strong>A</strong> é um ponto da subida, <strong>B</strong> é o ponto mais alto da trajetória e <strong>C</strong> é um ponto da descida.',
    figura: {
      src: 'img/fig_q_17-19.jpg',
      alt: 'Uma pessoa arremessa uma pedra obliquamente; a trajetória é uma parábola tracejada, com o ponto A na subida, o ponto B no ponto mais alto e o ponto C na descida.'
    },
    questoes: [
      {
        num: 17,
        enunciado: 'No ponto A, qual é o esquema que melhor representa a(s) força(s) sobre a pedra?',
        tipo: 'imagem',
        opcoesImg: {
          src: 'img/q17_resp.jpg',
          alt: 'Cinco diagramas rotulados de A a E com setas sobre a pedra no ponto A, combinando uma seta na direção do movimento (diagonal para cima) e uma seta para baixo.'
        },
        letras: ['a', 'b', 'c', 'd', 'e']
      },
      {
        num: 18,
        enunciado: 'No ponto B, qual é o esquema que melhor representa a(s) força(s) sobre a pedra?',
        tipo: 'imagem',
        opcoesImg: {
          src: 'img/q18_resp.jpg',
          alt: 'Cinco diagramas rotulados de A a E com setas sobre a pedra no ponto mais alto, combinando setas horizontal, para cima e para baixo.'
        },
        letras: ['a', 'b', 'c', 'd', 'e']
      },
      {
        num: 19,
        enunciado: 'No ponto C, qual é o esquema que melhor representa a(s) força(s) sobre a pedra?',
        tipo: 'imagem',
        opcoesImg: {
          src: 'img/q19_resp.jpg',
          alt: 'Cinco diagramas rotulados de A a E com setas sobre a pedra no ponto C, durante a descida.'
        },
        letras: ['a', 'b', 'c', 'd', 'e']
      }
    ]
  }
];

// Lista plana das questões, na ordem — útil para progresso e para a consulta.
const QUESTOES = BLOCOS.flatMap(b => b.questoes);
