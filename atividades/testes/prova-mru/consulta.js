const SUPABASE_URL     = 'https://ksxaxkqnooercwndpdut.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_eK6ljdM_K9cAdWezjyegJw_SudfxPjj';

// ── Dados das questões ──────────────────────────────────────────────────────
const QUESTOES = [
  {
    num: 1,
    enunciado: 'O Sistema Internacional de Unidades (SI) foi adotado oficialmente em 1960 e estabelece sete unidades de base. Assinale a alternativa que apresenta corretamente a unidade de base do SI para a grandeza comprimento:',
    opcoes: [
      { id:'a', texto:'centímetro (cm)' },
      { id:'b', texto:'polegada (in)' },
      { id:'c', texto:'quilômetro (km)' },
      { id:'d', texto:'milímetro (mm)' },
      { id:'e', texto:'metro (m)' },
    ]
  },
  {
    num: 2,
    enunciado: 'Antes da criação do Sistema Métrico Decimal, durante a Revolução Francesa (final do século XVIII), as unidades de medida variavam de cidade para cidade, sendo frequentemente baseadas em partes do corpo humano, como o pé, a polegada e o côvado. Sobre a história das unidades de medida, é CORRETO afirmar que:',
    opcoes: [
      { id:'a', texto:'o metro foi originalmente definido como a décima milionésima parte da distância entre o Polo Norte e a linha do Equador, medida ao longo do meridiano que passa por Paris.' },
      { id:'b', texto:'o Sistema Internacional foi criado pelos egípcios em 3000 a.C.' },
      { id:'c', texto:'a polegada e o pé são unidades do Sistema Internacional.' },
      { id:'d', texto:'o quilograma foi definido com base no peso de um homem adulto médio.' },
      { id:'e', texto:'o segundo foi a primeira unidade padronizada do SI, em 1795.' },
    ]
  },
  {
    num: 3,
    enunciado: 'Segundo as normas do Sistema Internacional de Unidades, há regras específicas para a escrita dos símbolos das unidades. Assinale a alternativa em que TODAS as unidades estão escritas corretamente:',
    opcoes: [
      { id:'a', texto:'10 Kg, 5 Mts, 20 seg' },
      { id:'b', texto:'10 kg, 5 m, 20 s' },
      { id:'c', texto:'10 KG, 5 M, 20 S' },
      { id:'d', texto:'10 kgs, 5 ms, 20 ss' },
      { id:'e', texto:'10 Kg., 5 m., 20 s.' },
    ]
  },
  {
    num: 4,
    enunciado: 'Um atleta corre 7,5 km em um treino. Essa distância, expressa em metros, equivale a:',
    opcoes: [
      { id:'a', texto:'75 m' },
      { id:'b', texto:'7.500 m' },
      { id:'c', texto:'750 m' },
      { id:'d', texto:'75.000 m' },
      { id:'e', texto:'750.000 m' },
    ]
  },
  {
    num: 5,
    enunciado: 'Um carro trafega a uma velocidade de 108 km/h em uma rodovia. Essa velocidade, convertida para m/s, é igual a:',
    opcoes: [
      { id:'a', texto:'10 m/s' },
      { id:'b', texto:'20 m/s' },
      { id:'c', texto:'30 m/s' },
      { id:'d', texto:'36 m/s' },
      { id:'e', texto:'60 m/s' },
    ]
  },
  {
    num: 6,
    enunciado: 'Um experimento teve duração de 2 horas, 15 minutos e 30 segundos. A duração total, expressa em segundos, é:',
    opcoes: [
      { id:'a', texto:'8.130 s' },
      { id:'b', texto:'7.530 s' },
      { id:'c', texto:'9.150 s' },
      { id:'d', texto:'9.150 min' },
      { id:'e', texto:'13.530 s' },
    ]
  },
  {
    num: 7,
    enunciado: 'Considere as seguintes transformações de unidades:<br><br>I. 500 cm = 5 m<br>II. 2,5 h = 150 min<br>III. 72 km/h = 20 m/s<br>IV. 3.000 g = 30 kg<br><br>Estão CORRETAS apenas as afirmações:',
    opcoes: [
      { id:'a', texto:'I e II' },
      { id:'b', texto:'I, III e IV' },
      { id:'c', texto:'II, III e IV' },
      { id:'d', texto:'I, II e III' },
      { id:'e', texto:'Todas estão corretas' },
    ]
  },
  {
    num: 8,
    enunciado: '(Unidade fictícia) Em um planeta distante, os habitantes utilizam uma unidade de comprimento chamada "zorg", onde 1 zorg = 4 metros. Eles também usam o "flux" como unidade de tempo, sendo 1 flux = 2 segundos. Qual seria, nesse planeta, a velocidade equivalente a 10 m/s, expressa em zorg/flux?',
    opcoes: [
      { id:'a', texto:'2,5 zorg/flux' },
      { id:'b', texto:'40 zorg/flux' },
      { id:'c', texto:'10 zorg/flux' },
      { id:'d', texto:'20 zorg/flux' },
      { id:'e', texto:'5 zorg/flux' },
    ]
  },
  {
    num: 9,
    enunciado: 'Em uma estrada retilínea, observa-se um marco quilométrico indicando km 50. Sobre o conceito de posição na cinemática, é CORRETO afirmar que:',
    opcoes: [
      { id:'a', texto:'a posição de um ponto é determinada em relação a um referencial adotado (no caso, o marco zero da estrada).' },
      { id:'b', texto:'a posição é a mesma coisa que a distância percorrida pelo veículo.' },
      { id:'c', texto:'a posição independe do referencial escolhido.' },
      { id:'d', texto:'a posição é sempre positiva, qualquer que seja o referencial.' },
      { id:'e', texto:'a posição só pode ser medida em metros, nunca em quilômetros.' },
    ]
  },
  {
    num: 10,
    enunciado: 'Um ciclista parte do ponto A, percorre 300 m para o leste até o ponto B e, em seguida, retorna 100 m para o oeste, parando no ponto C. Sobre essa trajetória, é CORRETO afirmar que:',
    opcoes: [
      { id:'a', texto:'a distância percorrida é 200 m e o deslocamento é 400 m.' },
      { id:'b', texto:'a distância percorrida é 400 m e o deslocamento é 200 m.' },
      { id:'c', texto:'a distância percorrida e o deslocamento são ambos iguais a 300 m.' },
      { id:'d', texto:'a distância percorrida é 400 m e o deslocamento é 400 m.' },
      { id:'e', texto:'a distância percorrida é 200 m e o deslocamento é 200 m.' },
    ]
  },
  {
    num: 11,
    enunciado: 'Assinale a alternativa que diferencia CORRETAMENTE velocidade média e velocidade instantânea:',
    opcoes: [
      { id:'a', texto:'A velocidade média é medida pelo velocímetro do carro, e a velocidade instantânea é calculada ao final da viagem.' },
      { id:'b', texto:'A velocidade instantânea só existe no MRU; a velocidade média só existe em movimentos variados.' },
      { id:'c', texto:'A velocidade média é a razão entre o deslocamento total e o intervalo de tempo total, enquanto a velocidade instantânea é a velocidade em um determinado instante.' },
      { id:'d', texto:'Velocidade média e velocidade instantânea são sempre iguais, em qualquer tipo de movimento.' },
      { id:'e', texto:'A velocidade média é sempre maior que a velocidade instantânea.' },
    ]
  },
  {
    num: 12,
    enunciado: 'Um automóvel percorre 240 km em 3 horas, mantendo velocidade constante em uma rodovia. Qual é a velocidade média do automóvel, em km/h?',
    opcoes: [
      { id:'a', texto:'60 km/h' },
      { id:'b', texto:'70 km/h' },
      { id:'c', texto:'80 km/h' },
      { id:'d', texto:'90 km/h' },
      { id:'e', texto:'120 km/h' },
    ]
  },
  {
    num: 13,
    enunciado: 'Um trem desloca-se com velocidade constante de 25 m/s durante 40 segundos. A distância percorrida pelo trem nesse intervalo de tempo é:',
    opcoes: [
      { id:'a', texto:'100 m' },
      { id:'b', texto:'250 m' },
      { id:'c', texto:'500 m' },
      { id:'d', texto:'1.000 m' },
      { id:'e', texto:'1.250 m' },
    ]
  },
  {
    num: 14,
    enunciado: 'Um caminhão viaja com velocidade média constante de 25 m/s em uma rodovia. Quanto tempo, em horas, ele levará para percorrer uma distância de 360 km?',
    opcoes: [
      { id:'a', texto:'3 horas' },
      { id:'b', texto:'3,5 horas' },
      { id:'c', texto:'4 horas' },
      { id:'d', texto:'4,5 horas' },
      { id:'e', texto:'5 horas' },
    ]
  },
  {
    num: 15,
    enunciado: 'A posição de uma partícula em MRU é dada pela função horária x(t) = 20 + 5t (no SI), onde x é dado em metros e t em segundos. Sobre esse movimento, é CORRETO afirmar que:',
    opcoes: [
      { id:'a', texto:'a posição inicial é 5 m e a velocidade é 20 m/s.' },
      { id:'b', texto:'a posição inicial é zero e a velocidade é 25 m/s.' },
      { id:'c', texto:'a partícula está em repouso, pois trata-se de MRU.' },
      { id:'d', texto:'a posição inicial é 20 m e a velocidade é 5 m/s.' },
      { id:'e', texto:'a velocidade é variável ao longo do tempo.' },
    ]
  },
  {
    num: 16,
    enunciado: 'As cidades A e B encontram-se ao longo de uma mesma rodovia retilínea: a cidade A no km 0 e a cidade B no km 400. No mesmo instante, um carro parte da cidade A em direção a B com velocidade de 60 km/h, enquanto outro carro parte de B em direção a A com velocidade de 40 km/h. Depois de quanto tempo ocorre o encontro entre eles?',
    opcoes: [
      { id:'a', texto:'2 horas' },
      { id:'b', texto:'3 horas' },
      { id:'c', texto:'10 horas' },
      { id:'d', texto:'5 horas' },
      { id:'e', texto:'4 horas' },
    ]
  },
  {
    num: 17,
    enunciado: 'Em uma estrada retilínea, um carro X passa por um posto policial com velocidade constante de 90 km/h. Cinco minutos depois, uma viatura Y inicia perseguição, partindo do mesmo posto com velocidade constante de 120 km/h. Quanto tempo (após a saída da viatura) levará para que a viatura alcance o carro X?',
    opcoes: [
      { id:'a', texto:'10 minutos' },
      { id:'b', texto:'30 minutos' },
      { id:'c', texto:'20 minutos' },
      { id:'d', texto:'25 minutos' },
      { id:'e', texto:'15 minutos' },
    ]
  },
  {
    num: 18,
    enunciado: 'Analise o gráfico da posição x(t) em função do tempo (t) de um móvel em MRU descrito a seguir. Com base no gráfico, a velocidade do móvel é igual a:',
    grafico: `
      <div class="graph-figure" role="img" aria-label="Gráfico de posição por tempo">
        <svg viewBox="0 0 420 320" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <rect width="420" height="320" fill="#f7f7ff"/>
          <line x1="60" y1="280" x2="380" y2="280" stroke="#103f91" stroke-width="2"/>
          <line x1="60" y1="280" x2="60" y2="40" stroke="#103f91" stroke-width="2"/>
          <path d="M60 200 L140 160 L220 120 L300 80 L380 40" fill="none" stroke="#1d7a23" stroke-width="4" stroke-linecap="round"/>
          <circle cx="60" cy="200" r="4" fill="#103f91"/>
          <circle cx="140" cy="160" r="4" fill="#103f91"/>
          <circle cx="220" cy="120" r="4" fill="#103f91"/>
          <circle cx="300" cy="80" r="4" fill="#103f91"/>
          <circle cx="380" cy="40" r="4" fill="#103f91"/>
          <text x="60" y="298" fill="#3a3a3a" font-size="12" text-anchor="middle">0 s</text>
          <text x="220" y="298" fill="#3a3a3a" font-size="12" text-anchor="middle">5 s</text>
          <text x="380" y="298" fill="#3a3a3a" font-size="12" text-anchor="middle">10 s</text>
          <text x="40" y="280" fill="#3a3a3a" font-size="12" text-anchor="end">0 m</text>
          <text x="40" y="240" fill="#3a3a3a" font-size="12" text-anchor="end">5 m</text>
          <text x="40" y="200" fill="#3a3a3a" font-size="12" text-anchor="end">10 m</text>
          <text x="40" y="160" fill="#3a3a3a" font-size="12" text-anchor="end">15 m</text>
          <text x="40" y="120" fill="#3a3a3a" font-size="12" text-anchor="end">20 m</text>
          <text x="40" y="80" fill="#3a3a3a" font-size="12" text-anchor="end">25 m</text>
          <text x="40" y="40" fill="#3a3a3a" font-size="12" text-anchor="end">30 m</text>
        </svg>
        <div class="graph-caption">Gráfico x(t) — posição inicial: 10 m; velocidade: 2 m/s.</div>
      </div>`,
    opcoes: [
      { id:'a', texto:'2 m/s' },
      { id:'b', texto:'4 m/s' },
      { id:'c', texto:'5 m/s' },
      { id:'d', texto:'8 m/s' },
      { id:'e', texto:'10 m/s' },
    ]
  },
  {
    num: 19,
    enunciado: 'O gráfico abaixo representa a velocidade (v) em função do tempo (t) de um veículo em MRU durante 20 segundos. A distância percorrida pelo veículo nesse intervalo de tempo é:',
    grafico: `
      <div class="graph-figure" role="img" aria-label="Gráfico de velocidade por tempo">
        <svg viewBox="0 0 420 260" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <rect width="420" height="260" fill="#f7f7ff"/>
          <line x1="60" y1="220" x2="380" y2="220" stroke="#103f91" stroke-width="2"/>
          <line x1="60" y1="220" x2="60" y2="40" stroke="#103f91" stroke-width="2"/>
          <line x1="60" y1="110" x2="380" y2="110" stroke="#1d7a23" stroke-width="4" stroke-linecap="round"/>
          <circle cx="120" cy="110" r="4" fill="#103f91"/>
          <circle cx="200" cy="110" r="4" fill="#103f91"/>
          <circle cx="280" cy="110" r="4" fill="#103f91"/>
          <circle cx="360" cy="110" r="4" fill="#103f91"/>
          <text x="120" y="235" fill="#3a3a3a" font-size="12" text-anchor="middle">5 s</text>
          <text x="200" y="235" fill="#3a3a3a" font-size="12" text-anchor="middle">10 s</text>
          <text x="280" y="235" fill="#3a3a3a" font-size="12" text-anchor="middle">15 s</text>
          <text x="360" y="235" fill="#3a3a3a" font-size="12" text-anchor="middle">20 s</text>
          <text x="40" y="220" fill="#3a3a3a" font-size="12" text-anchor="end">0 m/s</text>
          <text x="40" y="110" fill="#3a3a3a" font-size="12" text-anchor="end">15 m/s</text>
        </svg>
        <div class="graph-caption">Gráfico v(t) — velocidade constante: 15 m/s.</div>
      </div>`,
    opcoes: [
      { id:'a', texto:'75 m' },
      { id:'b', texto:'150 m' },
      { id:'c', texto:'200 m' },
      { id:'d', texto:'300 m' },
      { id:'e', texto:'400 m' },
    ]
  },
  {
    num: 20,
    enunciado: 'Um motorista percorre a primeira metade de um trajeto de 200 km a uma velocidade média de 50 km/h e a segunda metade a 100 km/h. Qual foi a velocidade média do motorista no trajeto completo?',
    opcoes: [
      { id:'a', texto:'60 km/h' },
      { id:'b', texto:'66,7 km/h' },
      { id:'c', texto:'75 km/h' },
      { id:'d', texto:'80 km/h' },
      { id:'e', texto:'90 km/h' },
    ]
  },
];

// ── Supabase ────────────────────────────────────────────────────────────────
async function buscarResultado(nome, palavra) {
  const encNome   = encodeURIComponent(nome);
  const encPalavra = encodeURIComponent(palavra);
  const url = `${SUPABASE_URL}/rest/v1/resultados?nome_aluno=ilike.${encNome}&palavra_secreta=ilike.${encPalavra}&order=calculado_em.desc&limit=1&select=*`;
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
