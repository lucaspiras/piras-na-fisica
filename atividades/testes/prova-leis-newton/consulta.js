const SUPABASE_URL     = 'https://ksxaxkqnooercwndpdut.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_eK6ljdM_K9cAdWezjyegJw_SudfxPjj';
const TABELA_RESULTADOS = 'resultados_newton';

// ── Dados das questões ──────────────────────────────────────────────────────
const QUESTOES = [
  {
    num: 1,
    enunciado: 'Um ônibus freia bruscamente e um passageiro que estava em pé é lançado para a frente. Qual é a melhor explicação para o que aconteceu?',
    opcoes: [
      { id:'a', texto:'Uma força para a frente passou a agir sobre o passageiro no instante da freada.' },
      { id:'b', texto:'O passageiro tende a manter a velocidade que tinha, e é o ônibus que desacelera debaixo dele.' },
      { id:'c', texto:'A força de atrito dos pés com o piso empurrou o passageiro para a frente.' },
      { id:'d', texto:'O peso do passageiro aumentou durante a freada.' },
      { id:'e', texto:'A inércia é uma força que age para a frente sempre que há freada.' },
    ]
  },
  {
    num: 2,
    enunciado: 'Considere as seguintes afirmações sobre as leis de Newton:<ul class="afirmacoes"><li>I. Um corpo que desliza sobre uma superfície horizontal perfeitamente lisa, sem força horizontal aplicada, segue em linha reta com velocidade constante.</li><li>II. Se a força resultante sobre um corpo é nula, ele está necessariamente em repouso.</li><li>III. Dobrar a força resultante sobre um mesmo corpo dobra a sua aceleração.</li><li>IV. As forças de um par ação–reação agem sempre sobre corpos diferentes e, por isso, nunca se cancelam.</li></ul>Estão CORRETAS apenas as afirmações:',
    opcoes: [
      { id:'a', texto:'I e II.' },
      { id:'b', texto:'II, III e IV.' },
      { id:'c', texto:'I e III.' },
      { id:'d', texto:'I, III e IV.' },
      { id:'e', texto:'Todas estão corretas.' },
    ]
  },
  {
    num: 3,
    enunciado: 'Sobre um corpo de 3 kg, apoiado em uma superfície horizontal sem atrito, age uma força resultante de 12 N. Qual é o módulo da aceleração adquirida pelo corpo?',
    opcoes: [
      { id:'a', texto:'4 m/s²' },
      { id:'b', texto:'0,25 m/s²' },
      { id:'c', texto:'9 m/s²' },
      { id:'d', texto:'36 m/s²' },
      { id:'e', texto:'15 m/s²' },
    ]
  },
  {
    num: 4,
    enunciado: 'Um livro está em repouso sobre uma mesa horizontal. Um estudante afirma que o peso do livro e a força normal que a mesa exerce sobre ele formam um par ação–reação. A afirmação está correta?',
    opcoes: [
      { id:'a', texto:'Sim, porque as duas forças têm o mesmo módulo e sentidos opostos.' },
      { id:'b', texto:'Sim, porque uma é a causa da outra.' },
      { id:'c', texto:'Não, porque o peso é uma força de contato e a normal é uma força de campo.' },
      { id:'d', texto:'Não, porque a normal é maior que o peso quando o livro está em repouso.' },
      { id:'e', texto:'Não, porque as duas agem sobre o mesmo corpo, e um par ação–reação age sempre em corpos diferentes.' },
    ]
  },
  {
    num: 5,
    enunciado: 'Sobre um corpo de 2 kg agem duas forças perpendiculares entre si: uma de 8 N e outra de 6 N. Qual é o módulo da aceleração do corpo?',
    opcoes: [
      { id:'a', texto:'1 m/s²' },
      { id:'b', texto:'7 m/s²' },
      { id:'c', texto:'5 m/s²' },
      { id:'d', texto:'14 m/s²' },
      { id:'e', texto:'20 m/s²' },
    ]
  },
  {
    num: 6,
    enunciado: 'Um corpo tem massa de 6 kg na Terra, onde g = 10 m/s². Esse mesmo corpo é levado à Lua, onde g = 1,6 m/s². Quais são, respectivamente, a massa e o peso do corpo na Lua?',
    opcoes: [
      { id:'a', texto:'6 kg e 9,6 N' },
      { id:'b', texto:'6 kg e 60 N' },
      { id:'c', texto:'0,96 kg e 9,6 N' },
      { id:'d', texto:'9,6 kg e 9,6 N' },
      { id:'e', texto:'6 kg e 6 N' },
    ]
  },
  {
    num: 7,
    enunciado: 'O bloco A, de 5 kg, está em repouso sobre uma mesa horizontal. Além do peso, uma força F de 20 N é aplicada sobre ele, verticalmente de cima para baixo, como mostra a figura. Qual é o módulo da força normal que a mesa exerce sobre o bloco?',
    grafico: `
      <div class="graph-figure" role="img" aria-label="Bloco A apoiado numa mesa horizontal. Uma força F de 20 N aponta verticalmente para baixo sobre o bloco.">
        <svg viewBox="0 0 420 230" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#f7f7ff"/>
          <defs>
      <marker id="ap-q7" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#c0392b"/></marker><marker id="an-q7" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1f5fbf"/></marker><marker id="at-q7" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#7b4fc4"/></marker>
      <marker id="af-q7" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1d7a23"/></marker><marker id="aa-q7" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#d97706"/></marker>
    </defs>
          <line x1="20" y1="180" x2="400" y2="180" stroke="#103f91" stroke-width="2.5"/><path d="M30,180 L19,193 M56,180 L45,193 M82,180 L71,193 M108,180 L97,193 M134,180 L123,193 M160,180 L149,193 M186,180 L175,193 M212,180 L201,193 M238,180 L227,193 M264,180 L253,193 M290,180 L279,193 M316,180 L305,193 M342,180 L331,193 M368,180 L357,193" stroke="#103f91" stroke-width="1.6" fill="none" opacity=".7"/>
    <rect x="160" y="130" width="80" height="50" rx="3" fill="#dfe6f7"
      stroke="#103f91" stroke-width="2"/><text x="200" y="160"
      text-anchor="middle" font-size="15" font-weight="700" fill="#243b63">A</text>
    <line x1="200" y1="60" x2="200" y2="122" stroke="#1d7a23" stroke-width="3"
      marker-end="url(#af-q7)"/><text x="208" y="70" font-size="15" font-weight="700" fill="#1d7a23">F = 20 N</text>
        </svg>
      </div>`,
    opcoes: [
      { id:'a', texto:'30 N' },
      { id:'b', texto:'50 N' },
      { id:'c', texto:'20 N' },
      { id:'d', texto:'70 N' },
      { id:'e', texto:'120 N' },
    ]
  },
  {
    num: 8,
    enunciado: 'Um bloco de 8 kg, inicialmente em repouso sobre um piso horizontal sem atrito, passa a ser puxado por uma força horizontal constante de 32 N, que age durante 5 s. Quais são, respectivamente, o módulo da velocidade do bloco ao fim desse intervalo e a distância percorrida por ele?',
    opcoes: [
      { id:'a', texto:'20 m/s e 100 m' },
      { id:'b', texto:'20 m/s e 50 m' },
      { id:'c', texto:'4 m/s e 20 m' },
      { id:'d', texto:'32 m/s e 80 m' },
      { id:'e', texto:'50 m/s e 20 m' },
    ]
  },
  {
    num: 9,
    enunciado: 'Um bloco de 10 kg está apoiado em repouso sobre uma rampa sem atrito que faz 30° com a horizontal, como mostra a figura. Qual é o módulo da força normal que a rampa exerce sobre o bloco? Use sen 30° = 1/2 e cos 30° = <span class="raiz">√<span class="radicando">3</span></span>/2.',
    grafico: `
      <div class="graph-figure" role="img" aria-label="Bloco apoiado sobre um plano inclinado de 30 graus, sem atrito.">
        <svg viewBox="0 0 440 260" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#f7f7ff"/>
          <defs>
      <marker id="ap-q9" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#c0392b"/></marker><marker id="an-q9" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1f5fbf"/></marker><marker id="at-q9" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#7b4fc4"/></marker>
      <marker id="af-q9" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1d7a23"/></marker><marker id="aa-q9" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#d97706"/></marker>
    </defs>
          <polygon points="40,220 360,220 360,36" fill="#eef2fb" stroke="#103f91" stroke-width="2.5"/>
    <path d="M50,220 L39,233 M76,220 L65,233 M102,220 L91,233 M128,220 L117,233 M154,220 L143,233 M180,220 L169,233 M206,220 L195,233 M232,220 L221,233 M258,220 L247,233 M284,220 L273,233 M310,220 L299,233 M336,220 L325,233" stroke="#103f91" stroke-width="1.6" fill="none" opacity=".7"/>
    <path d="M100,220 A60,60 0 0,0 92,190" fill="none" stroke="#243b63" stroke-width="1.8"/>
    <text x="106" y="213" font-size="14" font-weight="700" fill="#243b63">30°</text>
    <g transform="translate(205,125.1) rotate(-30)"><rect x="-34" y="-28" width="68" height="28" rx="3" fill="#dfe6f7"
      stroke="#103f91" stroke-width="2"/><text x="0" y="-9"
      text-anchor="middle" font-size="15" font-weight="700" fill="#243b63">A</text></g>
    <text x="40" y="250" font-size="13" font-weight="700" fill="#243b63">rampa sem atrito</text>
        </svg>
      </div>`,
    opcoes: [
      { id:'a', texto:'100 N' },
      { id:'b', texto:'50 N' },
      { id:'c', texto:'25<span class="raiz">√<span class="radicando">3</span></span> N' },
      { id:'d', texto:'100<span class="raiz">√<span class="radicando">3</span></span> N' },
      { id:'e', texto:'50<span class="raiz">√<span class="radicando">3</span></span> N' },
    ]
  },
  {
    num: 10,
    enunciado: 'Um lustre de 4 kg está pendurado por um único fio ideal. Considere duas situações: na primeira, ele está preso ao teto de uma sala e permanece em repouso; na segunda, está preso ao teto de um elevador que desce com aceleração constante de 3 m/s², dirigida para baixo. Quais são, respectivamente, as trações no fio nas duas situações?',
    opcoes: [
      { id:'a', texto:'28 N e 40 N' },
      { id:'b', texto:'40 N e 52 N' },
      { id:'c', texto:'40 N e 28 N' },
      { id:'d', texto:'12 N e 28 N' },
      { id:'e', texto:'4 N e 2,8 N' },
    ]
  },
  {
    num: 11,
    enunciado: 'Os blocos A, de 3 kg, e B, de 5 kg, estão ligados por um fio ideal sobre uma mesa horizontal sem atrito. A força F, de 24 N, puxa o bloco B, como mostra a figura. Qual é a tração no fio que liga os dois blocos?',
    grafico: `
      <div class="graph-figure" role="img" aria-label="Dois blocos sobre uma mesa horizontal sem atrito, ligados por um fio. O bloco A está à esquerda; o bloco B, à direita. Uma força F de 24 N puxa o bloco B para a direita.">
        <svg viewBox="0 0 460 190" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#f7f7ff"/>
          <defs>
      <marker id="ap-q11" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#c0392b"/></marker><marker id="an-q11" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1f5fbf"/></marker><marker id="at-q11" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#7b4fc4"/></marker>
      <marker id="af-q11" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1d7a23"/></marker><marker id="aa-q11" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#d97706"/></marker>
    </defs>
          <line x1="20" y1="140" x2="440" y2="140" stroke="#103f91" stroke-width="2.5"/><path d="M30,140 L19,153 M56,140 L45,153 M82,140 L71,153 M108,140 L97,153 M134,140 L123,153 M160,140 L149,153 M186,140 L175,153 M212,140 L201,153 M238,140 L227,153 M264,140 L253,153 M290,140 L279,153 M316,140 L305,153 M342,140 L331,153 M368,140 L357,153 M394,140 L383,153 M420,140 L409,153" stroke="#103f91" stroke-width="1.6" fill="none" opacity=".7"/>
    <rect x="70" y="95" width="62" height="45" rx="3" fill="#dfe6f7"
      stroke="#103f91" stroke-width="2"/><text x="101" y="122.5"
      text-anchor="middle" font-size="15" font-weight="700" fill="#243b63">A</text>
    <line x1="132" y1="118" x2="212" y2="118" stroke="#7b4fc4" stroke-width="3"/>
    <text x="158" y="108" font-size="13" font-weight="700" fill="#7b4fc4">fio</text>
    <rect x="212" y="88" width="78" height="52" rx="3" fill="#dfe6f7"
      stroke="#103f91" stroke-width="2"/><text x="251" y="119"
      text-anchor="middle" font-size="15" font-weight="700" fill="#243b63">B</text>
    <line x1="290" y1="114" x2="380" y2="114" stroke="#1d7a23" stroke-width="3"
      marker-end="url(#af-q11)"/><text x="330" y="104" font-size="15" font-weight="700" fill="#1d7a23">F = 24 N</text>
    <text x="20" y="175" font-size="13" font-weight="700" fill="#243b63">mesa horizontal, sem atrito</text>
        </svg>
      </div>`,
    opcoes: [
      { id:'a', texto:'24 N' },
      { id:'b', texto:'15 N' },
      { id:'c', texto:'9 N' },
      { id:'d', texto:'3 N' },
      { id:'e', texto:'12 N' },
    ]
  },
  {
    num: 12,
    enunciado: 'Os blocos A, de 2 kg, e B, de 3 kg, estão encostados um no outro sobre uma mesa horizontal, como mostra a figura. O coeficiente de atrito cinético entre os blocos e a mesa vale 0,20, e a força F, de 30 N, é aplicada sobre A. Quais são, respectivamente, a aceleração do conjunto e o módulo da força de contato que A exerce sobre B?',
    grafico: `
      <div class="graph-figure" role="img" aria-label="Dois blocos encostados um no outro sobre uma mesa horizontal com atrito. A força F de 30 N empurra o bloco A, que por sua vez empurra o bloco B.">
        <svg viewBox="0 0 460 190" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#f7f7ff"/>
          <defs>
      <marker id="ap-q12" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#c0392b"/></marker><marker id="an-q12" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1f5fbf"/></marker><marker id="at-q12" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#7b4fc4"/></marker>
      <marker id="af-q12" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1d7a23"/></marker><marker id="aa-q12" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#d97706"/></marker>
    </defs>
          <line x1="20" y1="140" x2="440" y2="140" stroke="#103f91" stroke-width="2.5"/><path d="M30,140 L19,153 M56,140 L45,153 M82,140 L71,153 M108,140 L97,153 M134,140 L123,153 M160,140 L149,153 M186,140 L175,153 M212,140 L201,153 M238,140 L227,153 M264,140 L253,153 M290,140 L279,153 M316,140 L305,153 M342,140 L331,153 M368,140 L357,153 M394,140 L383,153 M420,140 L409,153" stroke="#103f91" stroke-width="1.6" fill="none" opacity=".7"/>
    <line x1="60" y1="112" x2="148" y2="112" stroke="#1d7a23" stroke-width="3"
      marker-end="url(#af-q12)"/><text x="62" y="100" font-size="15" font-weight="700" fill="#1d7a23">F = 30 N</text>
    <rect x="150" y="92" width="68" height="48" rx="3" fill="#dfe6f7"
      stroke="#103f91" stroke-width="2"/><text x="184" y="121"
      text-anchor="middle" font-size="15" font-weight="700" fill="#243b63">A</text>
    <rect x="218" y="84" width="80" height="56" rx="3" fill="#f7e6cf"
      stroke="#103f91" stroke-width="2"/><text x="258" y="117"
      text-anchor="middle" font-size="15" font-weight="700" fill="#243b63">B</text>
    <text x="20" y="175" font-size="13" font-weight="700" fill="#243b63">mesa com atrito, μ = 0,20</text>
        </svg>
      </div>`,
    opcoes: [
      { id:'a', texto:'4 m/s² e 18 N' },
      { id:'b', texto:'6 m/s² e 18 N' },
      { id:'c', texto:'4 m/s² e 12 N' },
      { id:'d', texto:'4 m/s² e 30 N' },
      { id:'e', texto:'6 m/s² e 12 N' },
    ]
  },
  {
    num: 13,
    enunciado: 'O bloco A, de 2 kg, está sobre uma mesa horizontal sem atrito, ligado por um fio ideal que passa por uma polia e sustenta o bloco B, de 3 kg, pendurado, como mostra a figura. Soltos do repouso, qual é o módulo da aceleração do conjunto?',
    grafico: `
      <div class="graph-figure" role="img" aria-label="Bloco A sobre uma mesa horizontal sem atrito, ligado por um fio que passa por uma polia na borda da mesa e sustenta o bloco B, pendurado.">
        <svg viewBox="0 0 440 240" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#f7f7ff"/>
          <defs>
      <marker id="ap-q13" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#c0392b"/></marker><marker id="an-q13" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1f5fbf"/></marker><marker id="at-q13" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#7b4fc4"/></marker>
      <marker id="af-q13" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1d7a23"/></marker><marker id="aa-q13" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#d97706"/></marker>
    </defs>
          
    <line x1="20" y1="110" x2="300" y2="110" stroke="#103f91" stroke-width="2.5"/>
    <path d="M30,110 L19,123 M56,110 L45,123 M82,110 L71,123 M108,110 L97,123 M134,110 L123,123 M160,110 L149,123 M186,110 L175,123 M212,110 L201,123 M238,110 L227,123 M264,110 L253,123 M290,110 L279,123" stroke="#103f91" stroke-width="1.6" fill="none" opacity=".7"/>
    <line x1="300" y1="110" x2="300" y2="146" stroke="#103f91" stroke-width="2.5"/>
    <rect x="110" y="66" width="64" height="44" rx="3" fill="#dfe6f7"
      stroke="#103f91" stroke-width="2"/><text x="142" y="93"
      text-anchor="middle" font-size="15" font-weight="700" fill="#243b63">A</text>
    <line x1="174" y1="88" x2="330" y2="88" stroke="#7b4fc4" stroke-width="3"/>
    <circle cx="330" cy="96" r="15" fill="none" stroke="#103f91" stroke-width="2.5"/>
    <circle cx="330" cy="96" r="3" fill="#103f91"/>
    <line x1="345" y1="96" x2="345" y2="166" stroke="#7b4fc4" stroke-width="3"/>
    <rect x="313" y="166" width="64" height="48" rx="3" fill="#dfe6f7"
      stroke="#103f91" stroke-width="2"/><text x="345" y="195"
      text-anchor="middle" font-size="15" font-weight="700" fill="#243b63">B</text>
    <text x="20" y="146" font-size="13" font-weight="700" fill="#243b63">mesa sem atrito</text>
        </svg>
      </div>`,
    opcoes: [
      { id:'a', texto:'10 m/s²' },
      { id:'b', texto:'2 m/s²' },
      { id:'c', texto:'15 m/s²' },
      { id:'d', texto:'5 m/s²' },
      { id:'e', texto:'6 m/s²' },
    ]
  },
  {
    num: 14,
    enunciado: 'Uma pessoa empurra horizontalmente uma caixa pesada com uma força de 30 N, e a caixa não sai do lugar. Qual é o módulo da força de atrito que o chão exerce sobre a caixa nesse instante?',
    opcoes: [
      { id:'a', texto:'Zero, porque a caixa está parada.' },
      { id:'b', texto:'30 N, porque o atrito estático se ajusta à força aplicada enquanto houver equilíbrio.' },
      { id:'c', texto:'Depende apenas do coeficiente de atrito, e não da força aplicada.' },
      { id:'d', texto:'Maior que 30 N, senão a caixa não ficaria parada.' },
      { id:'e', texto:'Igual ao peso da caixa.' },
    ]
  },
  {
    num: 15,
    enunciado: 'O bloco B, de 2 kg, está apoiado sobre o bloco A, de 4 kg, que repousa num piso horizontal sem atrito. O coeficiente de atrito estático entre B e A vale 0,50. Uma força horizontal F é aplicada ao bloco A, como mostra a figura. Qual é o maior valor de F para que B seja arrastado junto, sem deslizar sobre A?',
    grafico: `
      <div class="graph-figure" role="img" aria-label="O bloco B está apoiado em cima do bloco A, que por sua vez está sobre um piso horizontal. Uma força F horizontal é aplicada ao bloco A, o de baixo.">
        <svg viewBox="0 0 440 210" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#f7f7ff"/>
          <defs>
      <marker id="ap-q15" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#c0392b"/></marker><marker id="an-q15" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1f5fbf"/></marker><marker id="at-q15" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#7b4fc4"/></marker>
      <marker id="af-q15" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1d7a23"/></marker><marker id="aa-q15" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#d97706"/></marker>
    </defs>
          <line x1="20" y1="160" x2="420" y2="160" stroke="#103f91" stroke-width="2.5"/><path d="M30,160 L19,173 M56,160 L45,173 M82,160 L71,173 M108,160 L97,173 M134,160 L123,173 M160,160 L149,173 M186,160 L175,173 M212,160 L201,173 M238,160 L227,173 M264,160 L253,173 M290,160 L279,173 M316,160 L305,173 M342,160 L331,173 M368,160 L357,173 M394,160 L383,173" stroke="#103f91" stroke-width="1.6" fill="none" opacity=".7"/>
    <rect x="140" y="112" width="130" height="48" rx="3" fill="#dfe6f7"
      stroke="#103f91" stroke-width="2"/><text x="205" y="141"
      text-anchor="middle" font-size="15" font-weight="700" fill="#243b63">A</text>
    <rect x="168" y="68" width="74" height="44" rx="3" fill="#f7e6cf"
      stroke="#103f91" stroke-width="2"/><text x="205" y="95"
      text-anchor="middle" font-size="15" font-weight="700" fill="#243b63">B</text>
    <line x1="48" y1="136" x2="136" y2="136" stroke="#1d7a23" stroke-width="3"
      marker-end="url(#af-q15)"/><text x="52" y="124" font-size="15" font-weight="700" fill="#1d7a23">F</text>
    <text x="20" y="195" font-size="13" font-weight="700" fill="#243b63">piso sem atrito · entre A e B há atrito</text>
        </svg>
      </div>`,
    opcoes: [
      { id:'a', texto:'10 N' },
      { id:'b', texto:'20 N' },
      { id:'c', texto:'60 N' },
      { id:'d', texto:'30 N' },
      { id:'e', texto:'120 N' },
    ]
  },
  {
    num: 16,
    enunciado: 'Um bloco de 5 kg está em repouso sobre uma superfície horizontal. O coeficiente de atrito estático entre eles vale 0,40. Qual é o maior valor de uma força horizontal que ainda pode ser aplicada sem que o bloco comece a deslizar?',
    opcoes: [
      { id:'a', texto:'2 N' },
      { id:'b', texto:'12,5 N' },
      { id:'c', texto:'50 N' },
      { id:'d', texto:'5 N' },
      { id:'e', texto:'20 N' },
    ]
  },
  {
    num: 17,
    enunciado: 'Um carro trava as rodas e derrapa até parar sobre uma pista horizontal. O coeficiente de atrito cinético entre os pneus e o asfalto vale 0,50. Qual é o módulo da desaceleração do carro durante a derrapagem?',
    opcoes: [
      { id:'a', texto:'0,5 m/s²' },
      { id:'b', texto:'10 m/s²' },
      { id:'c', texto:'5 m/s²' },
      { id:'d', texto:'20 m/s²' },
      { id:'e', texto:'Depende da massa do carro.' },
    ]
  },
  {
    num: 18,
    enunciado: 'Um bloco de 4 kg está em repouso sobre uma rampa com atrito que faz 30° com a horizontal, como mostra a figura. Qual é o menor valor do coeficiente de atrito estático entre o bloco e a rampa capaz de mantê-lo em repouso? Use sen 30° = 1/2 e cos 30° = <span class="raiz">√<span class="radicando">3</span></span>/2.',
    grafico: `
      <div class="graph-figure" role="img" aria-label="Bloco em repouso sobre uma rampa de 30 graus que tem atrito.">
        <svg viewBox="0 0 440 260" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#f7f7ff"/>
          <defs>
      <marker id="ap-q18" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#c0392b"/></marker><marker id="an-q18" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1f5fbf"/></marker><marker id="at-q18" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#7b4fc4"/></marker>
      <marker id="af-q18" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1d7a23"/></marker><marker id="aa-q18" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#d97706"/></marker>
    </defs>
          <polygon points="40,220 360,220 360,36" fill="#eef2fb" stroke="#103f91" stroke-width="2.5"/>
    <path d="M50,220 L39,233 M76,220 L65,233 M102,220 L91,233 M128,220 L117,233 M154,220 L143,233 M180,220 L169,233 M206,220 L195,233 M232,220 L221,233 M258,220 L247,233 M284,220 L273,233 M310,220 L299,233 M336,220 L325,233" stroke="#103f91" stroke-width="1.6" fill="none" opacity=".7"/>
    <path d="M100,220 A60,60 0 0,0 92,190" fill="none" stroke="#243b63" stroke-width="1.8"/>
    <text x="106" y="213" font-size="14" font-weight="700" fill="#243b63">30°</text>
    <g transform="translate(205,125.1) rotate(-30)"><rect x="-34" y="-28" width="68" height="28" rx="3" fill="#dfe6f7"
      stroke="#103f91" stroke-width="2"/><text x="0" y="-9"
      text-anchor="middle" font-size="15" font-weight="700" fill="#243b63">A</text></g>
    <text x="40" y="250" font-size="13" font-weight="700" fill="#243b63">rampa COM atrito · bloco parado</text>
        </svg>
      </div>`,
    opcoes: [
      { id:'a', texto:'<span class="raiz">√<span class="radicando">3</span></span>/3' },
      { id:'b', texto:'<span class="raiz">√<span class="radicando">3</span></span>/2' },
      { id:'c', texto:'1/2' },
      { id:'d', texto:'<span class="raiz">√<span class="radicando">3</span></span>' },
      { id:'e', texto:'<span class="raiz">√<span class="radicando">2</span></span>/2' },
    ]
  },
  {
    num: 19,
    enunciado: 'Um bloco é solto do repouso sobre uma rampa sem atrito que faz 37° com a horizontal. Qual é o módulo da aceleração com que ele desce? Use sen 37° = 0,6 e cos 37° = 0,8.',
    opcoes: [
      { id:'a', texto:'8 m/s²' },
      { id:'b', texto:'6 m/s²' },
      { id:'c', texto:'10 m/s²' },
      { id:'d', texto:'Depende da massa do bloco.' },
      { id:'e', texto:'4,8 m/s²' },
    ]
  },
  {
    num: 20,
    enunciado: 'O bloco A, de 6 kg, está sobre uma mesa horizontal com atrito e ligado por um fio ideal que passa por uma polia e sustenta o bloco B, de 9 kg, pendurado, como mostra a figura. O coeficiente de atrito cinético entre A e a mesa vale 0,50. Soltos do repouso, qual é o módulo da aceleração do conjunto?',
    grafico: `
      <div class="graph-figure" role="img" aria-label="Bloco A sobre uma mesa horizontal com atrito, ligado por um fio que passa por uma polia e sustenta o bloco B, pendurado.">
        <svg viewBox="0 0 440 240" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#f7f7ff"/>
          <defs>
      <marker id="ap-q20" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#c0392b"/></marker><marker id="an-q20" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1f5fbf"/></marker><marker id="at-q20" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#7b4fc4"/></marker>
      <marker id="af-q20" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1d7a23"/></marker><marker id="aa-q20" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#d97706"/></marker>
    </defs>
          
    <line x1="20" y1="110" x2="300" y2="110" stroke="#103f91" stroke-width="2.5"/>
    <path d="M30,110 L19,123 M56,110 L45,123 M82,110 L71,123 M108,110 L97,123 M134,110 L123,123 M160,110 L149,123 M186,110 L175,123 M212,110 L201,123 M238,110 L227,123 M264,110 L253,123 M290,110 L279,123" stroke="#103f91" stroke-width="1.6" fill="none" opacity=".7"/>
    <line x1="300" y1="110" x2="300" y2="146" stroke="#103f91" stroke-width="2.5"/>
    <rect x="110" y="66" width="64" height="44" rx="3" fill="#dfe6f7"
      stroke="#103f91" stroke-width="2"/><text x="142" y="93"
      text-anchor="middle" font-size="15" font-weight="700" fill="#243b63">A</text>
    <line x1="174" y1="88" x2="330" y2="88" stroke="#7b4fc4" stroke-width="3"/>
    <circle cx="330" cy="96" r="15" fill="none" stroke="#103f91" stroke-width="2.5"/>
    <circle cx="330" cy="96" r="3" fill="#103f91"/>
    <line x1="345" y1="96" x2="345" y2="166" stroke="#7b4fc4" stroke-width="3"/>
    <rect x="313" y="166" width="64" height="48" rx="3" fill="#dfe6f7"
      stroke="#103f91" stroke-width="2"/><text x="345" y="195"
      text-anchor="middle" font-size="15" font-weight="700" fill="#243b63">B</text>
    <text x="20" y="146" font-size="13" font-weight="700" fill="#243b63">mesa com atrito, μ = 0,50</text>
        </svg>
      </div>`,
    opcoes: [
      { id:'a', texto:'10 m/s²' },
      { id:'b', texto:'6 m/s²' },
      { id:'c', texto:'3 m/s²' },
      { id:'d', texto:'4 m/s²' },
      { id:'e', texto:'8 m/s²' },
    ]
  },
];

// ── Supabase ────────────────────────────────────────────────────────────────
async function buscarResultado(nome, palavra) {
  const encNome   = encodeURIComponent(nome);
  const encPalavra = encodeURIComponent(palavra);
  const url = `${SUPABASE_URL}/rest/v1/${TABELA_RESULTADOS}?nome_aluno=ilike.${encNome}&palavra_secreta=ilike.${encPalavra}&order=calculado_em.desc&limit=1&select=*`;
  const res = await fetch(url, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    }
  });
  if (!res.ok) throw new Error(`Erro ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.length ? data[0] : null;
}

// ── Renderização ─────────────────────────────────────────────────────────────
function renderResultado(resultado) {
  const { nome_aluno, acertos, total, detalhes, calculado_em } = resultado;
  const pct = Math.round((acertos / total) * 100);
  const data = new Date(calculado_em).toLocaleString('pt-BR');

  document.getElementById('res-nome').textContent = nome_aluno;
  document.getElementById('res-score').textContent = `${acertos} / ${total}`;
  document.getElementById('res-detalhe').textContent = `${pct}% de acertos — enviado em ${data}`;

  const container = document.getElementById('questoes-resultado');
  container.innerHTML = '';

  QUESTOES.forEach(q => {
    const det = detalhes[`q${q.num}`] || {};
    const marcada = det.marcada || null;
    const correta = det.correta;
    const acertou = det.acertou;

    let statusBadge = '';
    if (!marcada) {
      statusBadge = '<span class="badge badge-vazio">Não respondida</span>';
    } else if (acertou) {
      statusBadge = '<span class="badge badge-acertou">✓ Acertou</span>';
    } else {
      statusBadge = '<span class="badge badge-errou">✗ Errou</span>';
    }

    let opcoesHTML = '';
    q.opcoes.forEach(op => {
      let cls = '';
      let badge = '';

      if (op.id === correta && op.id === marcada) {
        cls = 'correct';
        badge = '<span class="result-badge correct-badge">✓ Correta — sua resposta</span>';
      } else if (op.id === correta) {
        cls = 'correct';
        badge = '<span class="result-badge correct-badge">✓ Correta</span>';
      } else if (op.id === marcada) {
        cls = 'wrong';
        badge = '<span class="result-badge wrong-badge">✗ Sua resposta</span>';
      }

      opcoesHTML += `
        <li class="option-item ${cls}">
          <div class="option-row">
            <span class="option-letter">${op.id.toUpperCase()})</span>
            <span>${op.texto}</span>
            ${badge}
          </div>
        </li>`;
    });

    container.innerHTML += `
      <div class="question-card">
        <span class="question-number">Questão ${q.num} de 20 ${statusBadge}</span>
        <div class="question-text">${q.enunciado}</div>
        ${q.grafico || ''}
        <ul class="options-list result-options">${opcoesHTML}</ul>
      </div>`;
  });

  document.getElementById('result-section').style.display = 'block';
  document.getElementById('result-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Evento de busca ──────────────────────────────────────────────────────────
document.getElementById('btn-buscar').addEventListener('click', async function () {
  const nome   = document.getElementById('nome-busca').value.trim();
  const palavra = document.getElementById('palavra-busca').value.trim();
  const errEl  = document.getElementById('search-error');

  if (!nome || !palavra) {
    errEl.textContent = 'Preencha seu nome e a palavra secreta para consultar.';
    errEl.style.display = 'block';
    return;
  }

  errEl.style.display = 'none';
  this.disabled = true;
  this.textContent = 'Buscando...';

  try {
    const resultado = await buscarResultado(nome, palavra);
    if (!resultado) {
      errEl.textContent = `Nenhum resultado encontrado. Verifique se o nome e a palavra secreta estão iguais aos que você digitou na prova.`;
      errEl.style.display = 'block';
      document.getElementById('result-section').style.display = 'none';
    } else {
      renderResultado(resultado);
    }
  } catch (err) {
    errEl.textContent = `Erro ao buscar: ${err.message}`;
    errEl.style.display = 'block';
  } finally {
    this.disabled = false;
    this.textContent = 'Consultar';
  }
});

['nome-busca', 'palavra-busca'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('btn-buscar').click();
  });
});
