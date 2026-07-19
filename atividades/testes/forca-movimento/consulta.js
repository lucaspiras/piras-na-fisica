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

// ── Renderização ────────────────────────────────────────────────────────────
function renderQuestaoResultado(q, detalhes) {
  const det     = detalhes[`q${q.num}`] || {};
  const marcada = det.marcada || null;
  const correta = det.correta;
  const acertou = det.acertou;

  let statusBadge;
  if (!marcada)      statusBadge = '<span class="badge badge-vazio">Não respondida</span>';
  else if (acertou)  statusBadge = '<span class="badge badge-acertou">✓ Acertou</span>';
  else               statusBadge = '<span class="badge badge-errou">✗ Errou</span>';

  // Alternativas: imagem (só letras) ou texto
  const itens = q.tipo === 'imagem'
    ? q.letras.map(l => ({ id: l, texto: `Esquema ${l.toUpperCase()}` }))
    : q.opcoes;

  const imgHTML = q.tipo === 'imagem'
    ? `<div class="opcoes-figura">
         <img src="${esc(q.opcoesImg.src)}" alt="${esc(q.opcoesImg.alt)}" loading="lazy">
       </div>`
    : '';

  const opcoesHTML = itens.map(op => {
    let cls = '', badge = '';
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
    return `
      <li class="option-item ${cls}">
        <div class="option-row">
          <span class="option-letter">${op.id.toUpperCase()})</span>
          <span>${esc(op.texto)}</span>
          ${badge}
        </div>
      </li>`;
  }).join('');

  return `
    <div class="question-card">
      <span class="question-number">Questão ${q.num} de ${TOTAL_QUESTOES} ${statusBadge}</span>
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
        ${b.questoes.map(q => renderQuestaoResultado(q, detalhes)).join('')}
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
