/* ══════════════════════════════════════
   JUNTAR PDFs — Lógica principal
   Processamento 100% local (pdf-lib)
   ══════════════════════════════════════ */

'use strict';

/* ── Elementos do DOM ── */
const dropzone     = document.getElementById('dropzone');
const fileInput    = document.getElementById('fileInput');
const fileListEl   = document.getElementById('fileList');
const controls     = document.getElementById('controls');
const btnLimpar    = document.getElementById('btnLimpar');
const btnJuntar    = document.getElementById('btnJuntar');
const progressWrap = document.getElementById('progressWrap');
const progressFill = document.getElementById('progressFill');
const progressLabel= document.getElementById('progressLabel');
const mensagemEl   = document.getElementById('mensagem');
const cardSalvar   = document.getElementById('cardSalvar');
const descSalvar   = document.getElementById('descSalvar');
const btnDownload  = document.getElementById('btnDownload');
const previewWrap  = document.getElementById('previewWrap');
const pdfPreview   = document.getElementById('pdfPreview');
const btnNovoMerge = document.getElementById('btnNovoMerge');
const nomeArquivo  = document.getElementById('nomeArquivo');

/* ── Estado ── */
let arquivos = [];        // Array de { file: File, pages: number|null }
let pdfBytes = null;      // Uint8Array do PDF gerado
let dragSrcIndex = null;

/* ══════════════════
   DROPZONE / INPUT
══════════════════ */

dropzone.addEventListener('click', () => fileInput.click());
dropzone.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') fileInput.click(); });

dropzone.addEventListener('dragover', e => { e.preventDefault(); dropzone.classList.add('drag-over'); });
dropzone.addEventListener('dragleave', () => dropzone.classList.remove('drag-over'));
dropzone.addEventListener('drop', e => {
  e.preventDefault();
  dropzone.classList.remove('drag-over');
  adicionarArquivos(Array.from(e.dataTransfer.files));
});

fileInput.addEventListener('change', () => {
  adicionarArquivos(Array.from(fileInput.files));
  fileInput.value = '';
});

function adicionarArquivos(files) {
  const pdfs = files.filter(f => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'));
  if (pdfs.length === 0) {
    mostrarMensagem('Nenhum arquivo PDF encontrado na seleção.', 'aviso');
    return;
  }
  pdfs.forEach(f => arquivos.push({ file: f, pages: null }));
  renderizarLista();
  esconderMensagem();
  lerPaginas();
}

/* ══════════════════
   LEITURA DE PÁGINAS
══════════════════ */

async function lerPaginas() {
  for (let i = 0; i < arquivos.length; i++) {
    if (arquivos[i].pages !== null) continue;
    try {
      const buf = await arquivos[i].file.arrayBuffer();
      const doc = await PDFLib.PDFDocument.load(buf, { ignoreEncryption: true });
      arquivos[i].pages = doc.getPageCount();
    } catch {
      arquivos[i].pages = '?';
    }
    renderizarLista();
  }
}

/* ══════════════════
   LISTA DE ARQUIVOS
══════════════════ */

function renderizarLista() {
  if (arquivos.length === 0) {
    fileListEl.hidden = true;
    fileListEl.innerHTML = '';
    controls.hidden = true;
    return;
  }
  fileListEl.hidden = false;
  controls.hidden = false;
  fileListEl.innerHTML = '';

  arquivos.forEach((item, idx) => {
    const el = document.createElement('div');
    el.className = 'pdf-file-item';
    el.draggable = true;
    el.dataset.index = idx;

    const pageLabel = item.pages === null ? '…' : item.pages === '?' ? '?' : `${item.pages} pág.`;
    const size = formatarTamanho(item.file.size);

    el.innerHTML = `
      <span class="pdf-file-handle" title="Arrastar para reordenar">⠿</span>
      <svg class="pdf-file-icon" width="18" height="18" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="1.8" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
      <div class="pdf-file-info">
        <span class="pdf-file-name" title="${escapeHtml(item.file.name)}">${escapeHtml(item.file.name)}</span>
        <span class="pdf-file-meta">${size}</span>
      </div>
      <span class="pdf-file-pages">${pageLabel}</span>
      <button class="pdf-file-del" data-idx="${idx}" title="Remover" aria-label="Remover ${escapeHtml(item.file.name)}">✕</button>
    `;

    /* Drag-and-drop para reordenar */
    el.addEventListener('dragstart', e => {
      dragSrcIndex = idx;
      e.dataTransfer.effectAllowed = 'move';
      setTimeout(() => el.classList.add('dragging'), 0);
    });
    el.addEventListener('dragend', () => {
      el.classList.remove('dragging');
      document.querySelectorAll('.pdf-file-item').forEach(e => e.classList.remove('drag-target'));
    });
    el.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      document.querySelectorAll('.pdf-file-item').forEach(e => e.classList.remove('drag-target'));
      el.classList.add('drag-target');
    });
    el.addEventListener('drop', e => {
      e.preventDefault();
      el.classList.remove('drag-target');
      if (dragSrcIndex === null || dragSrcIndex === idx) return;
      const moved = arquivos.splice(dragSrcIndex, 1)[0];
      arquivos.splice(idx, 0, moved);
      dragSrcIndex = null;
      renderizarLista();
    });

    fileListEl.appendChild(el);
  });

  /* Botões de remover */
  fileListEl.querySelectorAll('.pdf-file-del').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx, 10);
      arquivos.splice(idx, 1);
      renderizarLista();
      if (arquivos.length === 0) esconderMensagem();
    });
  });
}

/* ══════════════════
   LIMPAR
══════════════════ */

btnLimpar.addEventListener('click', () => {
  arquivos = [];
  pdfBytes = null;
  renderizarLista();
  esconderMensagem();
  cardSalvar.hidden = true;
});

/* ══════════════════
   JUNTAR
══════════════════ */

btnJuntar.addEventListener('click', async () => {
  if (arquivos.length < 2) {
    mostrarMensagem('Adicione pelo menos 2 arquivos PDF para juntar.', 'aviso');
    return;
  }

  btnJuntar.disabled = true;
  cardSalvar.hidden = true;
  pdfBytes = null;
  esconderMensagem();

  mostrarProgresso(0, 'Iniciando…');

  try {
    const merged = await PDFLib.PDFDocument.create();

    for (let i = 0; i < arquivos.length; i++) {
      const label = `Copiando ${escapeHtml(arquivos[i].file.name)} (${i + 1}/${arquivos.length})`;
      mostrarProgresso(Math.round((i / arquivos.length) * 90), label);

      const buf = await arquivos[i].file.arrayBuffer();
      let doc;
      try {
        doc = await PDFLib.PDFDocument.load(buf, { ignoreEncryption: true });
      } catch (err) {
        mostrarMensagem(`Erro ao ler "${arquivos[i].file.name}": arquivo inválido ou protegido.`, 'erro');
        esconderProgresso();
        btnJuntar.disabled = false;
        return;
      }

      const pages = await merged.copyPages(doc, doc.getPageIndices());
      pages.forEach(p => merged.addPage(p));
    }

    mostrarProgresso(95, 'Finalizando documento…');
    pdfBytes = await merged.save();

    const totalPags = merged.getPageCount();
    const tamanho = formatarTamanho(pdfBytes.byteLength);

    mostrarProgresso(100, 'Concluído!');
    setTimeout(esconderProgresso, 600);

    descSalvar.textContent = `${totalPags} páginas · ${tamanho} — escolha como salvar o documento.`;
    cardSalvar.hidden = false;
    cardSalvar.scrollIntoView({ behavior: 'smooth', block: 'start' });

    exibirPreview(pdfBytes);

  } catch (err) {
    mostrarMensagem(`Erro inesperado: ${err.message}`, 'erro');
    esconderProgresso();
  } finally {
    btnJuntar.disabled = false;
  }
});

/* ══════════════════
   SALVAR — LOCAL
══════════════════ */

btnDownload.addEventListener('click', () => {
  if (!pdfBytes) return;
  const nome = sanitizarNome(nomeArquivo.value) || 'documento_unificado';
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `${nome}.pdf`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 60000);
});

/* ══════════════════
   PREVIEW
══════════════════ */

function exibirPreview(bytes) {
  const blob = new Blob([bytes], { type: 'application/pdf' });
  const url  = URL.createObjectURL(blob);
  pdfPreview.src = url;
  previewWrap.hidden = false;
}

/* ══════════════════
   NOVO MERGE
══════════════════ */

btnNovoMerge.addEventListener('click', () => {
  arquivos = [];
  pdfBytes = null;
  renderizarLista();
  esconderMensagem();
  cardSalvar.hidden = true;
  previewWrap.hidden = true;
  pdfPreview.src = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ══════════════════
   UTILITÁRIOS
══════════════════ */

function mostrarProgresso(pct, label) {
  progressWrap.hidden = false;
  progressFill.style.width = `${pct}%`;
  progressLabel.textContent = label;
}

function esconderProgresso() {
  progressWrap.hidden = true;
  progressFill.style.width = '0%';
}

function mostrarMensagem(texto, tipo = 'aviso') {
  mensagemEl.textContent = texto;
  mensagemEl.className = `pdf-mensagem ${tipo}`;
}

function esconderMensagem() {
  mensagemEl.textContent = '';
  mensagemEl.className = 'pdf-mensagem';
}

function formatarTamanho(bytes) {
  if (bytes < 1024)       return `${bytes} B`;
  if (bytes < 1048576)    return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

function sanitizarNome(nome) {
  return nome.trim().replace(/[<>:"/\\|?*\x00-\x1f]/g, '_').replace(/\s+/g, '_');
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
