/* =============================================================
   Teste sobre Mecânica — consulta do próprio resultado
   Depende de questoes.js (BLOCOS, QUESTOES, TOTAL_QUESTOES).

   Segurança: em vez de um SELECT aberto em fm_resultados (que permitiria
   listar resultados de terceiros), chama a função fm_consultar_resultado,
   que só devolve o registro quando nome E palavra secreta conferem.
   ============================================================= */

const SUPABASE_URL      = 'https://ksxaxkqnooercwndpdut.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_eK6ljdM_K9cAdWezjyegJw_SudfxPjj';

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ── Busca (RPC protegida) ───────────────────────────────────────────────────
async function buscarResultado(nome, palavra) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/fm_consultar_resultado`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify({ p_nome: nome, p_palavra: palavra })
  });
  if (!res.ok) throw new Error(`Erro ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return Array.isArray(data) ? (data[0] ?? null) : (data ?? null);
}

// ── Análise das concepções (newtoniana × aristotélica) ──────────────────────
// Rótulo, por questão, de qual concepção a resposta do aluno reflete.
const CAMP_INFO = {
  newton:      { rotulo: 'Newtoniana',            classe: 'camp-newton'  },
  aristoteles: { rotulo: 'Aristotélica',          classe: 'camp-arist'   },
  impeto:      { rotulo: 'Ímpeto',                classe: 'camp-impeto'  },
  ambas:       { rotulo: 'Newtoniana = Aristotélica', classe: 'camp-ambas' },
  outra:       { rotulo: 'Outra',                 classe: 'camp-outra'   },
  vazia:       { rotulo: '',                      classe: ''             }
};

// Conjunto de respostas aristotélicas de uma questão (aceita string ou lista)
function aristSet(ch) {
  const a = ch && ch.aristoteles;
  return Array.isArray(a) ? a : (a ? [a] : []);
}

function analisarConcepcoes(detalhes) {
  let newton = 0, aristoteles = 0, impeto = 0, outras = 0, respondidas = 0;
  const porQuestao = {};

  QUESTOES.forEach(q => {
    const qk  = `q${q.num}`;
    const det = detalhes[qk] || {};
    const m   = det.marcada || null;
    const c   = det.correta;                 // resposta newtoniana (gabarito)
    const ch  = (typeof CONCEPCOES !== 'undefined' && CONCEPCOES[qk]) || {};

    const ehNewton = !!m && m === c;
    const ehImpeto = !!m && m === ch.impeto;
    const ehArist  = !!m && aristSet(ch).includes(m);

    if (m)        respondidas++;
    if (ehNewton) newton++;
    if (ehArist)  aristoteles++;             // família pré-newtoniana (inclui ímpeto)
    if (ehImpeto) impeto++;
    if (m && !ehNewton && !ehArist) outras++;

    let camp = 'vazia';
    if (!m)                       camp = 'vazia';
    else if (ehNewton && ehArist) camp = 'ambas';   // Q3: não discrimina
    else if (ehNewton)            camp = 'newton';
    else if (ehImpeto)            camp = 'impeto';
    else if (ehArist)             camp = 'aristoteles';
    else                          camp = 'outra';
    porQuestao[qk] = camp;
  });

  // Perfil dominante
  let perfil;
  if (newton >= aristoteles + 5)      perfil = 'newtoniana';
  else if (aristoteles >= newton + 3) perfil = 'aristotelica';
  else                                perfil = 'mista';

  return { newton, aristoteles, impeto, outras, respondidas, porQuestao, perfil };
}

function renderPerfilConceitual(a, total) {
  const textos = {
    newtoniana: {
      titulo: 'Concepção predominantemente newtoniana',
      corpo: 'Na maior parte das situações você analisou as forças como a física moderna faz: o que muda o movimento é a força resultante, e um corpo pode continuar se movendo mesmo sem nenhuma força no sentido do movimento. É a concepção correta segundo a mecânica de Newton.'
    },
    aristotelica: {
      titulo: 'Concepção predominantemente aristotélica',
      corpo: 'Suas respostas seguem, na maioria, o raciocínio do senso comum, o mesmo que dominou a física por quase dois mil anos: para haver movimento é preciso uma força no sentido do movimento, e mais força significa mais velocidade. É uma forma muito natural de pensar, mas que a mecânica de Newton mostra estar equivocada.'
    },
    mista: {
      titulo: 'Concepção mista, em transição',
      corpo: 'Suas respostas misturam as duas visões: em algumas situações você raciocinou como Newton, em outras como Aristóteles. É exatamente o estágio em que está a maioria dos estudantes ao começar a estudar dinâmica.'
    }
  };
  const t = textos[a.perfil];

  const impetoLinha = a.impeto > 0
    ? `<p class="perfil-nota">Dessas respostas pré-newtonianas, <strong>${a.impeto}</strong> seguem especificamente a <strong>teoria do ímpeto</strong> (o corpo continuaria se movendo por um tempo e só depois pararia), uma versão medieval, mais refinada, da ideia aristotélica.</p>`
    : '';

  return `
    <section class="perfil-panel perfil-${a.perfil}" aria-label="Perfil conceitual">
      <h2 class="perfil-titulo">${esc(t.titulo)}</h2>
      <div class="perfil-scores">
        <div class="perfil-score">
          <span class="perfil-num">${a.newton}<span class="perfil-den">/${total}</span></span>
          <span class="perfil-lab">acertos pela física newtoniana</span>
        </div>
        <div class="perfil-score">
          <span class="perfil-num">${a.aristoteles}<span class="perfil-den">/${total}</span></span>
          <span class="perfil-lab">acertos se Aristóteles estivesse certo</span>
        </div>
      </div>
      <p class="perfil-corpo">${esc(t.corpo)}</p>
      ${impetoLinha}
      <p class="perfil-link">
        <a href="concepcoes.html">Entenda as concepções newtoniana e aristotélica do movimento →</a>
      </p>
      <p class="perfil-aviso">As duas contagens não somam 19: uma questão (a bola descendo) tem a mesma resposta nas duas concepções, e respostas que não se encaixam em nenhuma das duas não entram em nenhuma contagem.</p>
    </section>`;
}

// ── Renderização das questões ───────────────────────────────────────────────
function renderQuestaoResultado(q, detalhes, camp) {
  const det     = detalhes[`q${q.num}`] || {};
  const marcada = det.marcada || null;
  const correta = det.correta;
  const acertou = det.acertou;
  const ch      = (typeof CONCEPCOES !== 'undefined' && CONCEPCOES[`q${q.num}`]) || {};

  let statusBadge;
  if (!marcada)      statusBadge = '<span class="badge badge-vazio">Não respondida</span>';
  else if (acertou)  statusBadge = '<span class="badge badge-acertou">✓ Acertou</span>';
  else               statusBadge = '<span class="badge badge-errou">✗ Errou</span>';

  const info = CAMP_INFO[camp] || CAMP_INFO.vazia;
  const campBadge = (marcada && info.rotulo)
    ? `<span class="badge camp-badge ${info.classe}">Sua resposta: ${esc(info.rotulo)}</span>`
    : '';

  // Alternativas: imagem (só letras) ou texto
  const itens = q.tipo === 'imagem'
    ? q.letras.map(l => ({ id: l, texto: `Esquema ${l.toUpperCase()}` }))
    : q.opcoes;

  const imgHTML = q.tipo === 'imagem'
    ? `<div class="opcoes-figura">
         <img src="${esc(q.opcoesImg.src)}" alt="${esc(q.opcoesImg.alt)}" loading="lazy">
       </div>`
    : '';

  // Marca a alternativa que representa a visão aristotélica (quando difere da correta)
  const setArist = aristSet(ch);
  const ehArist = id => id !== correta && setArist.includes(id);

  const opcoesHTML = itens.map(op => {
    let cls = '';
    const badges = [];
    if (op.id === correta && op.id === marcada) {
      cls = 'correct';
      badges.push('<span class="result-badge correct-badge">✓ Correta — sua resposta</span>');
    } else if (op.id === correta) {
      cls = 'correct';
      badges.push('<span class="result-badge correct-badge">✓ Correta (Newton)</span>');
    } else if (op.id === marcada) {
      cls = 'wrong';
      badges.push('<span class="result-badge wrong-badge">✗ Sua resposta</span>');
    }
    if (ehArist(op.id)) {
      const rot = op.id === ch.impeto ? 'visão do ímpeto' : 'visão aristotélica';
      badges.push(`<span class="result-badge arist-badge">⚖ ${rot}</span>`);
    }
    return `
      <li class="option-item ${cls}">
        <div class="option-row">
          <span class="option-letter">${op.id.toUpperCase()})</span>
          <span>${esc(op.texto)}</span>
          ${badges.join(' ')}
        </div>
      </li>`;
  }).join('');

  return `
    <div class="question-card">
      <span class="question-number">Questão ${q.num} de ${TOTAL_QUESTOES} ${statusBadge}${campBadge}</span>
      <div class="question-text">${q.enunciado}</div>
      ${imgHTML}
      <ul class="options-list result-options">${opcoesHTML}</ul>
    </div>`;
}

function renderResultado(r) {
  const detalhes = typeof r.detalhes === 'string' ? JSON.parse(r.detalhes) : r.detalhes;
  const pct  = Math.round((r.acertos / r.total) * 100);
  const data = new Date(r.calculado_em).toLocaleString('pt-BR');

  document.getElementById('res-nome').textContent    = r.nome;
  document.getElementById('res-score').textContent   = `${r.acertos} / ${r.total}`;
  document.getElementById('res-detalhe').textContent = `${pct}% de acertos — enviado em ${data}`;

  const analise = analisarConcepcoes(detalhes);
  const perfilEl = document.getElementById('perfil-conceitual');
  if (perfilEl) perfilEl.innerHTML = renderPerfilConceitual(analise, r.total);

  document.getElementById('questoes-resultado').innerHTML =
    BLOCOS.map(b => {
      const figuraHTML = b.figura ? `
        <figure class="figura">
          <img src="${esc(b.figura.src)}" alt="${esc(b.figura.alt)}" loading="lazy">
        </figure>` : '';
      const introHTML = (b.intro || b.figura) ? `
        <div class="bloco-intro">
          <h2>${esc(b.titulo)}</h2>
          ${b.intro ? `<p>${b.intro}</p>` : ''}
          ${figuraHTML}
        </div>` : '';
      return `<section class="bloco">
        ${introHTML}
        ${b.questoes.map(q => renderQuestaoResultado(q, detalhes, analise.porQuestao[`q${q.num}`])).join('')}
      </section>`;
    }).join('');

  const sec = document.getElementById('result-section');
  sec.style.display = 'block';
  sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Evento de busca ─────────────────────────────────────────────────────────
document.getElementById('btn-buscar').addEventListener('click', async function () {
  const nome    = document.getElementById('nome-busca').value.trim();
  const palavra = document.getElementById('palavra-busca').value.trim();
  const errEl   = document.getElementById('search-error');

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
      errEl.textContent = 'Nenhum resultado encontrado. Confira se o nome e a palavra secreta estão iguais aos que você digitou no teste.';
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
