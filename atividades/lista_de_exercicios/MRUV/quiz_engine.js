// quiz_engine.js — Motor de quiz para listas de exercícios MRUV
// Requer: window.QUIZ_QUESTIONS, window.QUIZ_MODE ('gabarito'|'avaliacao'), window.LISTA_NOME

(function () {
  'use strict';

  const QUESTIONS  = window.QUIZ_QUESTIONS || [];
  const QUIZ_MODE  = window.QUIZ_MODE  || 'gabarito';   // 'gabarito' | 'avaliacao'
  const LISTA_NOME = window.LISTA_NOME || 'Lista de Exercícios MRUV';
  const EMAIL_DEST = window.EMAIL_DESTINO || '';

  const textCount   = QUESTIONS.filter(q => q.type === 'text').length;
  const autoGradable = QUESTIONS.length - textCount;

  const state = {
    answered:  {},   // qid → { pts, type, chosenOi?, chosenValue?, text? }
    score:     0,
    total:     QUIZ_MODE === 'gabarito' ? QUESTIONS.length : autoGradable,
    finalized: false
  };

  window.ListaState     = state;
  window.ListaQuestions = QUESTIONS;

  // ── Distribuição balanceada das alternativas corretas ──────────────
  function seededShuffle(arr, seed) {
    let s = seed >>> 0;
    for (let i = arr.length - 1; i > 0; i--) {
      s = (s * 1664525 + 1013904223) >>> 0;
      const j = s % (i + 1);
      const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }
  function isPinned(opt) { return /nenhuma das|todas as alternativas|n\.d\.a\./i.test(String(opt)); }

  let _arranged = false;
  function arrangeAnswers() {
    if (_arranged) return;
    _arranged = true;
    const objs = QUESTIONS.filter(q => q.type === 'objective' && !q.options.some(o => isPinned(o)));
    const targets = objs.map((_, i) => i % 4);
    seededShuffle(targets, 20260609);
    objs.forEach((q, i) => {
      const n = q.options.length;
      const target = targets[i] % n;
      const correctOpt = q.options[q.correct];
      const rest = q.options.filter((_, idx) => idx !== q.correct);
      const out = []; let r = 0;
      for (let p = 0; p < n; p++) out.push(p === target ? correctOpt : rest[r++]);
      q.options = out;
      q.correct  = target;
    });
  }

  // ── Helpers ───────────────────────────────────────────────────────
  function stripHtml(s) {
    return String(s)
      .replace(/<[^>]+>/g, '')
      .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
      .replace(/&nbsp;/g, ' ').replace(/&sub;/g, '').replace(/&sup;/g, '')
      .trim();
  }

  const DIFF_CLASS = { 'fácil': 'fácil', 'médio': 'médio', 'difícil': 'difícil' };
  const TYPE_LABEL = { objective: 'múltipla escolha', numeric: 'numérica', text: 'discursiva' };
  const LETTERS    = ['A', 'B', 'C', 'D', 'E'];

  // ── Renderização ─────────────────────────────────────────────────
  function renderAll() {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    let html = '';
    QUESTIONS.forEach((q, i) => {
      const qid = 'q' + i;
      html += `<div class="question-block" id="qblock_${qid}">`;
      html += `<div class="question-header">`;
      html += `<span class="question-num">Questão ${i + 1}</span>`;
      if (q.difficulty) html += `<span class="q-tag ${DIFF_CLASS[q.difficulty] || ''}">${q.difficulty}</span>`;
      html += `<span class="q-tag tipo">${TYPE_LABEL[q.type] || q.type}</span>`;
      html += `</div>`;
      html += `<p class="question-text">${q.text}</p>`;

      if (q.type === 'objective') {
        html += `<div class="options-list" id="opts_${qid}">`;
        q.options.forEach((opt, oi) => {
          html += `<button class="option-btn" data-qid="${qid}" data-oi="${oi}" data-correct="${q.correct}" aria-label="Opção ${LETTERS[oi]}: ${stripHtml(opt)}">`;
          html += `<span class="opt-letter" aria-hidden="true">${LETTERS[oi]}</span>${opt}</button>`;
        });
        html += `</div>`;

      } else if (q.type === 'numeric') {
        html += `<div class="numeric-row">`;
        html += `<input type="number" class="numeric-inp" id="inp_${qid}" placeholder="resposta" step="any" aria-label="Digite a resposta em ${q.unit}" />`;
        html += `<span class="numeric-unit">${q.unit}</span>`;
        html += `<button class="submit-btn" data-qid="${qid}" data-answer="${q.answer}" data-tol="${q.tolerance}">Verificar</button>`;
        html += `</div>`;

      } else if (q.type === 'text') {
        const btnLabel = QUIZ_MODE === 'avaliacao' ? 'Registrar resposta' : 'Ver resposta modelo';
        html += `<textarea class="text-inp" id="inp_${qid}" rows="4" placeholder="Escreva sua resposta aqui…" aria-label="Campo de resposta discursiva"></textarea>`;
        html += `<button class="reveal-btn" data-qid="${qid}">${btnLabel}</button>`;
        html += `<div class="model-answer" id="model_${qid}" style="display:none;">`;
        html += `<strong>Resposta modelo:</strong> ${q.model}`;
        if (QUIZ_MODE === 'gabarito') {
          html += `<div class="self-grade">`;
          html += `<span>Como você se avalia?</span>`;
          html += `<button class="sg-btn sg-right" data-qid="${qid}" data-val="1">✓ Acertei</button>`;
          html += `<button class="sg-btn sg-wrong" data-qid="${qid}" data-val="0">✗ Errei</button>`;
          html += `</div>`;
        }
        html += `</div>`;
      }

      html += `<div class="feedback" id="fb_${qid}" role="status" aria-live="polite"></div>`;
      html += `</div>`;
    });

    container.innerHTML = html;
    updateScore();
    bindEvents(container);
  }

  // ── Eventos ───────────────────────────────────────────────────────
  function bindEvents(container) {

    // Múltipla escolha
    container.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const qid     = this.dataset.qid;
        if (state.answered[qid] !== undefined) return;
        const oi      = parseInt(this.dataset.oi);
        const correct = parseInt(this.dataset.correct);
        const isRight = oi === correct;
        const qi      = parseInt(qid.slice(1));

        container.querySelectorAll(`.option-btn[data-qid="${qid}"]`).forEach(b => b.disabled = true);

        if (QUIZ_MODE === 'gabarito') {
          this.classList.add(isRight ? 'correct' : 'wrong');
          if (!isRight) container.querySelectorAll(`.option-btn[data-qid="${qid}"]`)[correct].classList.add('correct');
          showFeedback(qid, isRight, QUESTIONS[qi].explanation);
        } else {
          this.classList.add('selected');
          showNeutral(qid, 'Resposta registrada.');
        }

        registerAnswer(qid, isRight ? 1 : 0, { type: 'objective', chosenOi: oi });
      });
    });

    // Numérica
    container.querySelectorAll('.submit-btn').forEach(btn => {
      const verify = () => {
        const qid = btn.dataset.qid;
        if (state.answered[qid] !== undefined) return;
        const inp = document.getElementById('inp_' + qid);
        const val = parseFloat(inp.value);
        if (isNaN(val)) { showFeedback(qid, false, 'Por favor, digite um número válido.'); return; }
        const answer  = parseFloat(btn.dataset.answer);
        const tol     = parseFloat(btn.dataset.tol);
        const isRight = Math.abs(val - answer) <= tol;
        const qi      = parseInt(qid.slice(1));
        inp.disabled = true; btn.disabled = true;

        if (QUIZ_MODE === 'gabarito') {
          showFeedback(qid, isRight, QUESTIONS[qi].explanation);
        } else {
          showNeutral(qid, 'Resposta registrada.');
        }

        registerAnswer(qid, isRight ? 1 : 0, { type: 'numeric', chosenValue: val });
      };
      btn.addEventListener('click', verify);
      const inp = document.getElementById('inp_' + btn.dataset.qid);
      if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') verify(); });
    });

    // Discursiva
    container.querySelectorAll('.reveal-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const qid = this.dataset.qid;
        const inp = document.getElementById('inp_' + qid);
        const text = inp ? inp.value.trim() : '';
        if (inp) inp.disabled = true;
        this.disabled = true;

        if (QUIZ_MODE === 'gabarito') {
          const model = document.getElementById('model_' + qid);
          if (model) model.style.display = 'block';
        } else {
          registerAnswer(qid, null, { type: 'text', text });
          showNeutral(qid, 'Resposta registrada.');
        }
      });
    });

    // Autoavaliação discursiva (gabarito mode)
    container.querySelectorAll('.sg-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const qid = this.dataset.qid;
        if (state.answered[qid] !== undefined) return;
        const val     = parseInt(this.dataset.val);
        const isRight = val === 1;
        const inp     = document.getElementById('inp_' + qid);
        const text    = inp ? inp.value.trim() : '';
        this.classList.add(isRight ? 'selected-right' : 'selected-wrong');
        container.querySelectorAll(`.sg-btn[data-qid="${qid}"]`).forEach(b => b.disabled = true);
        const msg = isRight
          ? 'Ótimo! Autoavaliação registrada como correta.'
          : 'Registrado. Releia a resposta modelo e tente entender onde o raciocínio divergiu.';
        showFeedback(qid, isRight, msg);
        registerAnswer(qid, val, { type: 'text', text });
      });
    });
  }

  // ── Finalizar (avaliação sem gabarito) ────────────────────────────
  function finalizeAll() {
    state.finalized = true;
    const box = document.getElementById('resultado-box');
    if (box) box.removeAttribute('hidden');
    const fBtn = document.getElementById('finalizarBtn');
    if (fBtn) { fBtn.textContent = 'Resultado revelado'; fBtn.disabled = true; }

    const container = document.getElementById('quiz-container');
    QUESTIONS.forEach((q, i) => {
      const qid = 'q' + i;
      const ans = state.answered[qid];
      if (!ans) return;

      if (q.type === 'objective' && ans.chosenOi !== undefined) {
        const btns = container.querySelectorAll(`.option-btn[data-qid="${qid}"]`);
        btns.forEach((b, idx) => {
          b.classList.remove('selected');
          if (idx === q.correct)     b.classList.add('correct');
          else if (idx === ans.chosenOi) b.classList.add('wrong');
        });
        showFeedback(qid, ans.pts === 1, q.explanation);
      } else if (q.type === 'numeric' && ans.chosenValue !== undefined) {
        showFeedback(qid, ans.pts === 1, q.explanation);
      } else if (q.type === 'text') {
        const model = document.getElementById('model_' + qid);
        if (model) model.style.display = 'block';
      }
    });

    updateScore();
  }

  // ── Feedback, neutral, placar ─────────────────────────────────────
  function showFeedback(qid, isRight, msg) {
    const fb = document.getElementById('fb_' + qid);
    if (!fb) return;
    fb.className = 'feedback show ' + (isRight ? 'correct' : 'wrong');
    fb.innerHTML = `<strong>${isRight ? '✓ Correto!' : '✗ Incorreto.'}</strong> ${msg}`;
  }

  function showNeutral(qid, msg) {
    const fb = document.getElementById('fb_' + qid);
    if (!fb) return;
    fb.className = 'feedback show neutral';
    fb.innerHTML = msg;
  }

  function registerAnswer(qid, pts, meta) {
    state.answered[qid] = Object.assign({ pts }, meta || {});
    state.score = 0;
    for (const v of Object.values(state.answered)) {
      if (typeof v.pts === 'number' && v.pts !== null) state.score += v.pts;
    }
    updateScore();
  }

  function updateScore() {
    const numEl  = document.getElementById('score-num');
    const totEl  = document.getElementById('score-total');
    const msgEl  = document.getElementById('score-msg');
    const progEl = document.getElementById('progress-msg');

    // progress-msg (visible in avaliacao mode before finalize)
    if (progEl) {
      const answered = Object.keys(state.answered).length;
      progEl.textContent = `${answered} de ${QUESTIONS.length} questões respondidas.`;
    }

    if (!numEl) return;
    numEl.textContent = state.score;
    if (totEl) totEl.textContent = state.total;
    if (!msgEl) return;

    const answered = Object.keys(state.answered).filter(qid => {
      const v = state.answered[qid];
      return v && v.pts !== null;
    }).length;
    const pct = state.total > 0 ? Math.round((state.score / state.total) * 100) : 0;

    if (QUIZ_MODE === 'avaliacao' && !state.finalized) {
      msgEl.textContent = '';
      return;
    }

    if (answered === 0 && QUIZ_MODE === 'gabarito') {
      msgEl.textContent = 'Responda as questões para ver seu resultado!';
    } else if (answered < state.total) {
      msgEl.textContent = `${answered} de ${state.total} questões avaliadas automaticamente. Continue!`;
    } else {
      let msg = '';
      if (pct >= 90) msg = 'Excelente! Domínio sólido do conteúdo!';
      else if (pct >= 70) msg = 'Muito bom! Revise os pontos em que errou.';
      else if (pct >= 50) msg = 'Razoável. Releia os conceitos com dificuldade.';
      else msg = 'Continue! Releia a teoria e tente novamente.';
      msgEl.textContent = `Você acertou ${pct}% (${state.score}/${state.total}). ${msg}`;
    }
  }

  // ── Relatório ─────────────────────────────────────────────────────
  function generateReport() {
    const dateStr  = new Date().toLocaleString('pt-BR');
    const nameEl   = document.getElementById('studentName');
    const name     = nameEl ? nameEl.value.trim() : '';
    const modeStr  = QUIZ_MODE === 'avaliacao' ? 'Avaliação (sem gabarito)' : 'Estudo com gabarito';

    const sep = '─'.repeat(50);
    const lines = [
      '╔' + '═'.repeat(52) + '╗',
      '║  Relatório — ' + LISTA_NOME.substring(0, 38).padEnd(38, ' ') + '║',
      '╚' + '═'.repeat(52) + '╝',
      '',
      'Data:  ' + dateStr,
    ];
    if (name) lines.push('Aluno: ' + name);
    lines.push('Modo:  ' + modeStr, '', sep);

    QUESTIONS.forEach((q, i) => {
      const qid = 'q' + i;
      const ans = state.answered[qid];
      const diff = q.difficulty ? ` [${q.difficulty}]` : '';
      lines.push('');
      lines.push(`Q${i + 1}${diff}: ${stripHtml(q.text).substring(0, 120)}`);

      if (!ans) { lines.push('   → (não respondida)'); return; }

      if (q.type === 'objective') {
        const ok = ans.pts === 1;
        lines.push('   → ' + (ok ? '✓ CORRETA' : '✗ INCORRETA'));
        if (ans.chosenOi !== undefined)
          lines.push('   Sua resposta:    ' + stripHtml(q.options[ans.chosenOi] || ''));
        if (!ok)
          lines.push('   Resposta correta: ' + stripHtml(q.options[q.correct] || ''));
      } else if (q.type === 'numeric') {
        const ok = ans.pts === 1;
        lines.push('   → ' + (ok ? '✓ CORRETA' : '✗ INCORRETA'));
        lines.push('   Sua resposta:    ' + (ans.chosenValue !== undefined ? ans.chosenValue + ' ' + (q.unit || '') : '—'));
        if (!ok) lines.push('   Resposta correta: ' + q.answer + ' ' + (q.unit || ''));
      } else if (q.type === 'text') {
        lines.push('   → (discursiva)');
        if (ans.text) lines.push('   Sua resposta: ' + ans.text.substring(0, 240));
        lines.push('   Resposta modelo: ' + stripHtml(q.model || '').substring(0, 240));
        if (QUIZ_MODE === 'gabarito' && typeof ans.pts === 'number')
          lines.push('   Autoavaliação: ' + (ans.pts === 1 ? 'acertei' : 'errei'));
      }
    });

    const pct = state.total > 0 ? Math.round((state.score / state.total) * 100) : 0;
    lines.push('', sep);
    lines.push('Resultado automático: ' + state.score + '/' + state.total + ' (' + pct + '%)');
    if (textCount > 0) lines.push('(' + textCount + ' questão(ões) discursiva(s) exigem autoavaliação)');
    lines.push('', 'Piras na Física — pirasnafisica.com.br');
    return lines.join('\n');
  }

  function bindReportButtons() {
    const dlBtn = document.getElementById('downloadBtn');
    const cpBtn = document.getElementById('copyBtn');
    const emBtn = document.getElementById('emailBtn');

    if (dlBtn) dlBtn.addEventListener('click', () => {
      const text = generateReport();
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href = url;
      a.download = 'relatorio_mruv_' + new Date().toISOString().slice(0, 10) + '.txt';
      document.body.appendChild(a); a.click();
      document.body.removeChild(a); URL.revokeObjectURL(url);
    });

    if (cpBtn) cpBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(generateReport()).then(() => {
        const orig = cpBtn.textContent;
        cpBtn.textContent = '✓ Copiado!';
        setTimeout(() => { cpBtn.textContent = orig; }, 2200);
      });
    });

    if (emBtn) emBtn.addEventListener('click', () => {
      const sub  = encodeURIComponent('Relatório — ' + LISTA_NOME);
      const body = encodeURIComponent(generateReport());
      window.location.href = 'mailto:' + EMAIL_DEST + '?subject=' + sub + '&body=' + body;
    });
  }

  // ── Reset ─────────────────────────────────────────────────────────
  function resetAll() {
    state.answered  = {};
    state.score     = 0;
    state.finalized = false;

    if (QUIZ_MODE === 'avaliacao') {
      const box  = document.getElementById('resultado-box');
      if (box)   box.setAttribute('hidden', '');
      const fBtn = document.getElementById('finalizarBtn');
      if (fBtn) { fBtn.textContent = 'Finalizar e Ver Resultado'; fBtn.disabled = false; }
    }

    renderAll();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Init ──────────────────────────────────────────────────────────
  function init() {
    arrangeAnswers();
    renderAll();
    const resetBtn = document.getElementById('resetAll');
    if (resetBtn) resetBtn.addEventListener('click', resetAll);
    const fBtn = document.getElementById('finalizarBtn');
    if (fBtn) fBtn.addEventListener('click', finalizeAll);
    bindReportButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
