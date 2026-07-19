const SUPABASE_URL     = 'https://ksxaxkqnooercwndpdut.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_eK6ljdM_K9cAdWezjyegJw_SudfxPjj';
const TABELA_RESULTADOS = 'resultados_cinematica';

// ── Dados das questões ──────────────────────────────────────────────────────
const QUESTOES = [
  {
    num: 1,
    enunciado: '(Unidade fictícia) Em um planeta distante, os habitantes utilizam o "grimm" como unidade de distância, em que 1 grimm = 10 metros, e o "tock" como unidade de tempo, em que 1 tock = 15 segundos. Qual seria, nesse planeta, a aceleração equivalente a 10 m/s², expressa em grimm/tock²?',
    opcoes: [
      { id:'a', texto:'45 grimm/tock²' },
      { id:'b', texto:'450 grimm/tock²' },
      { id:'c', texto:'22,5 grimm/tock²' },
      { id:'d', texto:'225 grimm/tock²' },
      { id:'e', texto:'112,5 grimm/tock²' },
    ]
  },
  {
    num: 2,
    enunciado: 'Considere as seguintes afirmações sobre conversões de unidades:<br><br>I. 4.500 g equivalem a 4,5 kg.<br>II. 2,5 km equivalem a 2.500 m.<br>III. 3 minutos e 20 segundos equivalem a 200 s.<br>IV. 54 km/h equivalem a 10 m/s.<br><br>Estão CORRETAS apenas as afirmações:',
    opcoes: [
      { id:'a', texto:'I e II' },
      { id:'b', texto:'I, II e III' },
      { id:'c', texto:'II, III e IV' },
      { id:'d', texto:'I, III e IV' },
      { id:'e', texto:'Todas estão corretas' },
    ]
  },
  {
    num: 3,
    enunciado: 'Um carro se desloca em uma estrada retilínea com velocidade constante de 72 km/h. Determine a distância percorrida por esse carro em um intervalo de 15 minutos.',
    opcoes: [
      { id:'a', texto:'12 km' },
      { id:'b', texto:'24 km' },
      { id:'c', texto:'18 km' },
      { id:'d', texto:'15 km' },
      { id:'e', texto:'20 km' },
    ]
  },
  {
    num: 4,
    enunciado: 'O gráfico a seguir representa a posição x, em metros, de uma bicicleta em função do tempo t, em segundos, durante um trecho em que ela se desloca em MRU. Com base no gráfico, a velocidade da bicicleta é:',
    grafico: `
      <div class="graph-figure" role="img" aria-label="Gráfico de posição por tempo de uma bicicleta">
        <svg viewBox="0 0 420 320" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <rect width="420" height="320" fill="#f7f7ff"/>
          <line x1="60" y1="280" x2="380" y2="280" stroke="#103f91" stroke-width="2"/>
          <line x1="60" y1="280" x2="60" y2="40" stroke="#103f91" stroke-width="2"/>
          <path d="M60 211 L327 74" fill="none" stroke="#1d7a23" stroke-width="4" stroke-linecap="round"/>
          <circle cx="60" cy="211" r="4" fill="#103f91"/>
          <circle cx="327" cy="74" r="4" fill="#103f91"/>
          <text x="60" y="298" fill="#3a3a3a" font-size="12" text-anchor="middle">0 s</text>
          <text x="167" y="298" fill="#3a3a3a" font-size="12" text-anchor="middle">2 s</text>
          <text x="273" y="298" fill="#3a3a3a" font-size="12" text-anchor="middle">4 s</text>
          <text x="380" y="298" fill="#3a3a3a" font-size="12" text-anchor="middle">6 s</text>
          <text x="40" y="280" fill="#3a3a3a" font-size="12" text-anchor="end">0 m</text>
          <text x="40" y="211" fill="#3a3a3a" font-size="12" text-anchor="end">10 m</text>
          <text x="40" y="143" fill="#3a3a3a" font-size="12" text-anchor="end">20 m</text>
          <text x="40" y="74" fill="#3a3a3a" font-size="12" text-anchor="end">30 m</text>
        </svg>
        <div class="graph-caption">Gráfico x(t) — posição inicial: 10 m; posição em t = 5 s: 30 m.</div>
      </div>`,
    opcoes: [
      { id:'a', texto:'2 m/s' },
      { id:'b', texto:'6 m/s' },
      { id:'c', texto:'10 m/s' },
      { id:'d', texto:'4 m/s' },
      { id:'e', texto:'8 m/s' },
    ]
  },
  {
    num: 5,
    enunciado: 'A posição de um trem que se desloca em MRU ao longo de uma via retilínea é dada pela função horária x(t) = 15 + 8t (SI). Determine a posição do trem no instante t = 6 s.',
    opcoes: [
      { id:'a', texto:'48 m' },
      { id:'b', texto:'71 m' },
      { id:'c', texto:'63 m' },
      { id:'d', texto:'55 m' },
      { id:'e', texto:'15 m' },
    ]
  },
  {
    num: 6,
    enunciado: 'Sobre as diferenças entre o Movimento Retilíneo Uniforme (MRU) e o Movimento Retilíneo Uniformemente Variado (MRUV), assinale a alternativa CORRETA:',
    opcoes: [
      { id:'a', texto:'No MRU a aceleração é constante e não nula, enquanto no MRUV a velocidade é sempre nula.' },
      { id:'b', texto:'MRU e MRUV são o mesmo tipo de movimento, diferindo apenas no nome.' },
      { id:'c', texto:'No MRU a velocidade é constante e a aceleração é nula; no MRUV a aceleração é constante e não nula, fazendo a velocidade variar uniformemente com o tempo.' },
      { id:'d', texto:'No MRUV a velocidade é sempre constante, assim como no MRU.' },
      { id:'e', texto:'A aceleração no MRU é sempre maior que a aceleração no MRUV.' },
    ]
  },
  {
    num: 7,
    enunciado: 'Uma bola parte do repouso e desce uma rampa com aceleração constante de 5 m/s², atingindo a base da rampa após 6 segundos. Qual foi a velocidade média da bola nesse intervalo de tempo?',
    opcoes: [
      { id:'a', texto:'30 m/s' },
      { id:'b', texto:'10 m/s' },
      { id:'c', texto:'15 m/s' },
      { id:'d', texto:'7,5 m/s' },
      { id:'e', texto:'20 m/s' },
    ]
  },
  {
    num: 8,
    enunciado: 'Uma moto parte da posição inicial de 10 m, com velocidade inicial de 5 m/s, e acelera uniformemente a 2 m/s². Determine a posição da moto no instante t = 4 s.',
    opcoes: [
      { id:'a', texto:'46 m' },
      { id:'b', texto:'54 m' },
      { id:'c', texto:'40 m' },
      { id:'d', texto:'36 m' },
      { id:'e', texto:'30 m' },
    ]
  },
  {
    num: 9,
    enunciado: 'O gráfico a seguir representa a velocidade v, em m/s, de um carro em função do tempo t, em segundos, durante um movimento retilíneo uniformemente variado (MRUV). Com base no gráfico, a aceleração do carro é:',
    grafico: `
      <div class="graph-figure" role="img" aria-label="Gráfico de velocidade por tempo de um carro em MRUV">
        <svg viewBox="0 0 420 260" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <rect width="420" height="260" fill="#f7f7ff"/>
          <line x1="60" y1="220" x2="380" y2="220" stroke="#103f91" stroke-width="2"/>
          <line x1="60" y1="220" x2="60" y2="40" stroke="#103f91" stroke-width="2"/>
          <path d="M60 190 L140 160 L220 130 L300 100 L380 70" fill="none" stroke="#1d7a23" stroke-width="4" stroke-linecap="round"/>
          <circle cx="60" cy="190" r="4" fill="#103f91"/>
          <circle cx="140" cy="160" r="4" fill="#103f91"/>
          <circle cx="220" cy="130" r="4" fill="#103f91"/>
          <circle cx="300" cy="100" r="4" fill="#103f91"/>
          <circle cx="380" cy="70" r="4" fill="#103f91"/>
          <text x="60" y="238" fill="#3a3a3a" font-size="12" text-anchor="middle">0 s</text>
          <text x="220" y="238" fill="#3a3a3a" font-size="12" text-anchor="middle">5 s</text>
          <text x="380" y="238" fill="#3a3a3a" font-size="12" text-anchor="middle">10 s</text>
          <text x="40" y="220" fill="#3a3a3a" font-size="12" text-anchor="end">0 m/s</text>
          <text x="40" y="190" fill="#3a3a3a" font-size="12" text-anchor="end">5 m/s</text>
          <text x="40" y="70" fill="#3a3a3a" font-size="12" text-anchor="end">25 m/s</text>
        </svg>
        <div class="graph-caption">Gráfico v(t) — velocidade inicial: 5 m/s; velocidade em t = 10 s: 25 m/s.</div>
      </div>`,
    opcoes: [
      { id:'a', texto:'0,5 m/s²' },
      { id:'b', texto:'4 m/s²' },
      { id:'c', texto:'1 m/s²' },
      { id:'d', texto:'3 m/s²' },
      { id:'e', texto:'2 m/s²' },
    ]
  },
  {
    num: 10,
    enunciado: 'Em uma estrada retilínea, um carro A encontra-se 100 m à frente de um carro B. No instante t = 0, o carro A move-se com velocidade constante de 10 m/s (MRU), enquanto o carro B parte do repouso, no mesmo instante e no mesmo sentido, acelerando uniformemente a 4 m/s² (MRUV). Depois de quanto tempo o carro B alcança o carro A?',
    opcoes: [
      { id:'a', texto:'10 s' },
      { id:'b', texto:'8 s' },
      { id:'c', texto:'20 s' },
      { id:'d', texto:'5 s' },
      { id:'e', texto:'15 s' },
    ]
  },
  {
    num: 11,
    enunciado: 'Um trem que se desloca a 30 m/s inicia uma frenagem uniforme, com desaceleração constante de 3 m/s², até parar completamente. Qual é a distância percorrida pelo trem durante a frenagem?',
    opcoes: [
      { id:'a', texto:'100 m' },
      { id:'b', texto:'300 m' },
      { id:'c', texto:'50 m' },
      { id:'d', texto:'200 m' },
      { id:'e', texto:'150 m' },
    ]
  },
  {
    num: 12,
    enunciado: 'Sobre a queda livre e os lançamentos vertical, horizontal e oblíquo, assinale a alternativa CORRETA:',
    opcoes: [
      { id:'a', texto:'Em todos esses movimentos, a aceleração da gravidade atua apenas na direção horizontal.' },
      { id:'b', texto:'No lançamento horizontal, a velocidade horizontal aumenta constantemente devido à gravidade.' },
      { id:'c', texto:'A queda livre e o lançamento oblíquo apresentam exatamente a mesma trajetória.' },
      { id:'d', texto:'Na queda livre e no lançamento vertical, o movimento ocorre apenas na direção vertical, sob ação exclusiva da aceleração da gravidade; nos lançamentos horizontal e oblíquo, o movimento resulta da composição de um MRU na horizontal com um MRUV na vertical.' },
      { id:'e', texto:'No lançamento oblíquo, a componente horizontal da velocidade varia uniformemente ao longo do tempo.' },
    ]
  },
  {
    num: 13,
    enunciado: 'Uma pedra é abandonada, em queda livre, do topo de um penhasco de 80 m de altura. Determine o tempo que a pedra leva para atingir o solo.',
    opcoes: [
      { id:'a', texto:'8 s' },
      { id:'b', texto:'2 s' },
      { id:'c', texto:'4 s' },
      { id:'d', texto:'16 s' },
      { id:'e', texto:'6 s' },
    ]
  },
  {
    num: 14,
    enunciado: 'Um jogador de beisebol rebate a bola, lançando-a verticalmente para cima com velocidade inicial de 60 m/s. Determine a altura máxima atingida pela bola.',
    opcoes: [
      { id:'a', texto:'180 m' },
      { id:'b', texto:'90 m' },
      { id:'c', texto:'360 m' },
      { id:'d', texto:'60 m' },
      { id:'e', texto:'120 m' },
    ]
  },
  {
    num: 15,
    enunciado: 'Uma bola de gude é lançada horizontalmente com velocidade de 15 m/s a partir do topo de uma mesa de 5 m de altura. Determine o tempo que a bola leva para atingir o chão.',
    opcoes: [
      { id:'a', texto:'2 s' },
      { id:'b', texto:'0,5 s' },
      { id:'c', texto:'1 s' },
      { id:'d', texto:'5 s' },
      { id:'e', texto:'3 s' },
    ]
  },
  {
    num: 16,
    enunciado: 'Um avião de resgate solta horizontalmente um pacote de suprimentos com velocidade de 40 m/s, de uma altura de 45 m em relação ao solo. Determine a que distância horizontal do ponto de lançamento o pacote atinge o solo.',
    opcoes: [
      { id:'a', texto:'90 m' },
      { id:'b', texto:'135 m' },
      { id:'c', texto:'45 m' },
      { id:'d', texto:'120 m' },
      { id:'e', texto:'60 m' },
    ]
  },
  {
    num: 17,
    enunciado: 'Um jogador de futebol chuta uma bola com velocidade inicial de 60 m/s, formando um ângulo de 45° com o solo. Determine a altura máxima atingida pela bola.',
    opcoes: [
      { id:'a', texto:'45 m' },
      { id:'b', texto:'90 m' },
      { id:'c', texto:'180 m' },
      { id:'d', texto:'360 m' },
      { id:'e', texto:'22,5 m' },
    ]
  },
  {
    num: 18,
    enunciado: 'Assinale a alternativa que descreve CORRETAMENTE o comportamento do gráfico da velocidade em função do tempo (v x t) para o MRU e para o MRUV:',
    opcoes: [
      { id:'a', texto:'Em ambos os movimentos, o gráfico v x t é sempre uma reta horizontal.' },
      { id:'b', texto:'No MRU, o gráfico v x t é uma reta horizontal, pois a velocidade permanece constante; no MRUV, o gráfico v x t é uma reta inclinada, crescente ou decrescente, pois a velocidade varia uniformemente com o tempo.' },
      { id:'c', texto:'No MRUV, o gráfico v x t é sempre uma reta horizontal, assim como no MRU.' },
      { id:'d', texto:'No MRU, o gráfico v x t é uma parábola, e no MRUV, uma reta horizontal.' },
      { id:'e', texto:'O gráfico v x t não permite diferenciar o MRU do MRUV.' },
    ]
  },
  {
    num: 19,
    enunciado: 'Um canhão dispara um projétil com velocidade inicial de 25 m/s, formando um ângulo de 53° com a horizontal (sen 53° = 0,8 e cos 53° = 0,6). Determine o alcance horizontal do projétil.',
    opcoes: [
      { id:'a', texto:'40 m' },
      { id:'b', texto:'80 m' },
      { id:'c', texto:'100 m' },
      { id:'d', texto:'60 m' },
      { id:'e', texto:'50 m' },
    ]
  },
  {
    num: 20,
    enunciado: 'Um atleta arremessa um dardo com velocidade inicial de 35 m/s, formando um ângulo de 30° com a horizontal. Determine o tempo total que o dardo permanece no ar, até retornar à mesma altura de lançamento.',
    opcoes: [
      { id:'a', texto:'1,75 s' },
      { id:'b', texto:'7 s' },
      { id:'c', texto:'14 s' },
      { id:'d', texto:'10 s' },
      { id:'e', texto:'3,5 s' },
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
