// =====================================================
// CONFIGURAÇÃO — preencha com seus dados do Supabase
// =====================================================
const SUPABASE_URL = 'https://ksxaxkqnooercwndpdut.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_eK6ljdM_K9cAdWezjyegJw_SudfxPjj';
// =====================================================

const TOTAL = 20;
const announcer = document.getElementById('announcer');

function announce(msg) {
  announcer.textContent = '';
  requestAnimationFrame(() => { announcer.textContent = msg; });
}

function updateProgress() {
  let answered = 0;
  for (let i = 1; i <= TOTAL; i++) {
    if (document.querySelector(`input[name="q${i}"]:checked`)) answered++;
  }
  const pct = Math.round((answered / TOTAL) * 100);
  document.getElementById('progress-text').textContent = `${answered} de ${TOTAL} questões respondidas`;
  document.getElementById('progress-bar').style.width = pct + '%';
  document.getElementById('progress-bar-container').setAttribute('aria-valuenow', answered);
}

document.querySelectorAll('input[type="radio"]').forEach(r => {
  r.addEventListener('change', updateProgress);
});

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

document.getElementById('btn-retry').addEventListener('click', () => {
  window.location.reload();
});

document.getElementById('btn-submit').addEventListener('click', async function () {
  const nomeAluno = document.getElementById('nome-aluno').value.trim();
  if (!nomeAluno) {
    alert('Por favor, informe seu nome antes de enviar.');
    document.getElementById('nome-aluno').focus();
    return;
  }

  const palavraSecreta = document.getElementById('palavra-secreta').value.trim();
  if (!palavraSecreta) {
    alert('Por favor, crie uma palavra secreta antes de enviar.');
    document.getElementById('palavra-secreta').focus();
    return;
  }

  const missing = [];
  for (let i = 1; i <= TOTAL; i++) {
    if (!document.querySelector(`input[name="q${i}"]:checked`)) missing.push(i);
  }
  if (missing.length > 0) {
    const confirmar = confirm(
      `Você deixou ${missing.length} questão(ões) sem resposta (${missing.slice(0, 5).join(', ')}${missing.length > 5 ? '...' : ''}).\n\nDeseja enviar assim mesmo?`
    );
    if (!confirmar) {
      document.getElementById(`q${missing[0]}-card`).scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
  }
  document.getElementById('missing-warning').style.display = 'none';

  const respostas = {};
  for (let i = 1; i <= TOTAL; i++) {
    const sel = document.querySelector(`input[name="q${i}"]:checked`);
    respostas[`q${i}`] = sel ? sel.value : null;
  }

  this.disabled = true;
  this.textContent = 'Enviando...';
  announce('Enviando suas respostas. Aguarde.');

  try {
    const gabarito = await supabaseFetch('gabarito?select=questao,resposta_correta', 'GET');
    const gabMap = {};
    gabarito.forEach(g => { gabMap[g.questao] = g.resposta_correta; });

    let acertos = 0;
    const detalhes = {};
    for (let i = 1; i <= TOTAL; i++) {
      const q = `q${i}`;
      const marcada = respostas[q];
      const correta = gabMap[q];
      const acertou = marcada === correta;
      if (acertou) acertos++;
      detalhes[q] = { marcada, correta, acertou };
    }

    const respostaId = crypto.randomUUID();

    await supabaseFetch('respostas', 'POST', {
      id: respostaId,
      nome_aluno: nomeAluno,
      palavra_secreta: palavraSecreta,
      respostas
    }, 'return=minimal');

    await supabaseFetch('resultados', 'POST', {
      resposta_id: respostaId,
      nome_aluno: nomeAluno,
      palavra_secreta: palavraSecreta,
      acertos,
      total: TOTAL,
      detalhes
    }, 'return=minimal');

    document.querySelectorAll('input[type="radio"]').forEach(r => r.disabled = true);
    document.getElementById('nome-aluno').disabled = true;
    document.getElementById('palavra-secreta').disabled = true;

    const panel = document.getElementById('result-panel');
    panel.style.display = 'block';
    document.getElementById('result-score').textContent = '✓ Prova enviada!';
    document.getElementById('result-detail').textContent =
      `Suas respostas foram registradas com sucesso, ${nomeAluno}. Você receberá o resultado em breve.`;
    const btnRetry = document.getElementById('btn-retry');
    btnRetry.style.display = 'inline-block';
    btnRetry.textContent = 'Iniciar nova prova';

    panel.focus();
    announce(`Prova enviada com sucesso. Suas respostas foram registradas, ${nomeAluno}. Você receberá o resultado em breve.`);
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });

  } catch (err) {
    console.error('[Supabase] Erro:', err);
    this.disabled = false;
    this.textContent = 'Enviar respostas';
    const warn = document.getElementById('missing-warning');
    warn.style.display = 'block';
    warn.textContent = `Erro ao enviar: ${err.message}. Veja o Console do navegador (F12) para detalhes.`;
    announce('Erro ao enviar a prova.');
  }
});

updateProgress();
