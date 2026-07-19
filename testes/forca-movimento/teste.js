/* =============================================================
   Teste sobre Mecânica — renderização e envio
   Mesmo padrão da prova de MRU
   (disciplinas/fisica_1_mecanica/provas/fisica_1_prova_MRU/script.js):
   REST do Supabase, lê o gabarito no servidor e grava resposta + resultado.
   Depende de questoes.js (BLOCOS, QUESTOES, TOTAL_QUESTOES).
   ============================================================= */

const SUPABASE_URL      = 'https://ksxaxkqnooercwndpdut.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_eK6ljdM_K9cAdWezjyegJw_SudfxPjj';

const announcer = document.getElementById('announcer');

function announce(msg) {
  announcer.textContent = '';
  requestAnimationFrame(() => { announcer.textContent = msg; });
}

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ── Renderização das questões ───────────────────────────────────────────────
function renderQuestao(q) {
  let opcoesHTML = '';
  let opcoesImgHTML = '';

  if (q.tipo === 'imagem') {
    opcoesImgHTML = `
      <div class="opcoes-figura">
        <img src="${esc(q.opcoesImg.src)}" alt="${esc(q.opcoesImg.alt)}" loading="lazy">
      </div>
      <p class="opcoes-figura-dica">Escolha abaixo a letra correspondente ao esquema:</p>`;

    opcoesHTML = q.letras.map(l => `
      <li class="option-item">
        <label>
          <input type="radio" name="q${q.num}" value="${l}"
                 aria-label="Alternativa ${l.toUpperCase()} da questão ${q.num}">
          <span class="option-letter">${l.toUpperCase()}</span>
        </label>
      </li>`).join('');
  } else {
    opcoesHTML = q.opcoes.map(op => `
      <li class="option-item">
        <label>
          <input type="radio" name="q${q.num}" value="${op.id}"
                 aria-label="Alternativa ${op.id.toUpperCase()}: ${esc(op.texto)}">
          <span class="option-letter">${op.id.toUpperCase()})</span>
          <span class="option-label">${esc(op.texto)}</span>
        </label>
      </li>`).join('');
  }

  return `
    <div class="question-card" id="q${q.num}-card">
      <span class="question-number">Questão ${q.num} de ${TOTAL_QUESTOES}</span>
      <div class="question-text" id="q${q.num}-text">${q.enunciado}</div>
      ${opcoesImgHTML}
      <ul class="options-list ${q.tipo === 'imagem' ? 'letras-list' : ''}"
          role="radiogroup" aria-labelledby="q${q.num}-text">
        ${opcoesHTML}
      </ul>
    </div>`;
}

function renderBlocos() {
  const alvo = document.getElementById('blocos');
  alvo.innerHTML = BLOCOS.map(b => {
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
      ${b.questoes.map(renderQuestao).join('')}
    </section>`;
  }).join('');

  document.querySelectorAll('input[type="radio"]').forEach(r => {
    r.addEventListener('change', updateProgress);
  });
}

// ── Progresso ───────────────────────────────────────────────────────────────
function updateProgress() {
  let respondidas = 0;
  QUESTOES.forEach(q => {
    if (document.querySelector(`input[name="q${q.num}"]:checked`)) respondidas++;
  });
  const pct = Math.round((respondidas / TOTAL_QUESTOES) * 100);
  document.getElementById('progress-text').textContent =
    `${respondidas} de ${TOTAL_QUESTOES} questões respondidas`;
  document.getElementById('progress-bar').style.width = pct + '%';
  document.getElementById('progress-bar-container').setAttribute('aria-valuenow', respondidas);
}

// ── Supabase ────────────────────────────────────────────────────────────────
async function supabaseFetch(path, method, body, prefer = 'return=representation') {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Prefer': prefer
    },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) throw new Error(`Supabase error: ${res.status} ${await res.text()}`);
  if (prefer === 'return=minimal') return null;
  return res.json();
}

// ── Envio ───────────────────────────────────────────────────────────────────
document.getElementById('btn-retry').addEventListener('click', () => window.location.reload());

document.getElementById('btn-submit').addEventListener('click', async function () {
  const campos = {
    nome:         document.getElementById('nome').value.trim(),
    professor:    document.getElementById('professor').value.trim(),
    instituicao:  document.getElementById('instituicao').value.trim(),
    curso_turma:  document.getElementById('curso-turma').value.trim(),
    palavra:      document.getElementById('palavra-secreta').value.trim()
  };

  const obrigatorios = [
    ['nome', 'Informe seu nome antes de enviar.'],
    ['palavra', 'Crie uma palavra secreta antes de enviar.']
  ];
  for (const [chave, msg] of obrigatorios) {
    if (!campos[chave]) {
      alert(msg);
      document.getElementById(chave === 'palavra' ? 'palavra-secreta' : chave).focus();
      return;
    }
  }

  const emBranco = QUESTOES
    .filter(q => !document.querySelector(`input[name="q${q.num}"]:checked`))
    .map(q => q.num);

  if (emBranco.length) {
    const lista = emBranco.slice(0, 5).join(', ') + (emBranco.length > 5 ? '...' : '');
    if (!confirm(`Você deixou ${emBranco.length} questão(ões) sem resposta (${lista}).\n\nDeseja enviar assim mesmo?`)) {
      document.getElementById(`q${emBranco[0]}-card`).scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
  }

  const respostas = {};
  QUESTOES.forEach(q => {
    const sel = document.querySelector(`input[name="q${q.num}"]:checked`);
    respostas[`q${q.num}`] = sel ? sel.value : null;
  });

  this.disabled = true;
  this.textContent = 'Enviando...';
  announce('Enviando suas respostas. Aguarde.');

  try {
    const gabarito = await supabaseFetch('fm_gabarito?select=questao,resposta_correta', 'GET');
    const gab = {};
    gabarito.forEach(g => { gab[g.questao] = g.resposta_correta; });

    let acertos = 0;
    const detalhes = {};
    QUESTOES.forEach(q => {
      const chave   = `q${q.num}`;
      const marcada = respostas[chave];
      const correta = gab[chave];
      const acertou = marcada != null && marcada === correta;
      if (acertou) acertos++;
      detalhes[chave] = { marcada, correta, acertou };
    });

    const respostaId = crypto.randomUUID();

    await supabaseFetch('fm_respostas', 'POST', {
      id: respostaId,
      nome: campos.nome,
      professor: campos.professor || null,
      instituicao: campos.instituicao || null,
      curso_turma: campos.curso_turma || null,
      palavra_secreta: campos.palavra,
      respostas
    }, 'return=minimal');

    await supabaseFetch('fm_resultados', 'POST', {
      resposta_id: respostaId,
      nome: campos.nome,
      palavra_secreta: campos.palavra,
      acertos,
      total: TOTAL_QUESTOES,
      detalhes
    }, 'return=minimal');

    document.querySelectorAll('input[type="radio"], .campo input').forEach(el => el.disabled = true);

    const panel = document.getElementById('result-panel');
    panel.style.display = 'block';
    document.getElementById('result-score').textContent = '✓ Teste enviado!';
    document.getElementById('result-detail').textContent =
      `Suas respostas foram registradas, ${campos.nome}. Guarde sua palavra secreta para consultar o resultado depois.`;
    document.getElementById('btn-retry').style.display = 'inline-block';

    panel.focus();
    announce(`Teste enviado com sucesso. Suas respostas foram registradas, ${campos.nome}.`);
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });

  } catch (err) {
    console.error('[Supabase] Erro:', err);
    this.disabled = false;
    this.textContent = 'Enviar respostas';
    const warn = document.getElementById('missing-warning');
    warn.style.display = 'block';
    warn.textContent = `Erro ao enviar: ${err.message}. Veja o Console do navegador (F12) para detalhes.`;
    announce('Erro ao enviar o teste.');
  }
});

// ── Início ──────────────────────────────────────────────────────────────────
renderBlocos();
updateProgress();
