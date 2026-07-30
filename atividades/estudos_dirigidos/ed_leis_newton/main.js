// main.js — Scroll reveal, sumário ativo, reset e relatório — Leis de Newton
// Sem calculadora: a 2ª Lei é trabalhada conceitualmente, não como conta de F/m.

(function () {
  'use strict';

  // ================================================================
  // SCROLL REVEAL
  // ================================================================
  function initScrollReveal() {
    const topics = document.querySelectorAll('.topic');
    if (!topics.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.05 });
    topics.forEach(t => obs.observe(t));
  }

  // ================================================================
  // SUMÁRIO ATIVO
  // ================================================================
  function initSumarioActive() {
    const sections = document.querySelectorAll('.topic');
    const links    = document.querySelectorAll('.sum-list a');
    if (!sections.length || !links.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(l => l.style.color = '');
          const active = document.querySelector('.sum-list a[href="#' + e.target.id + '"]');
          if (active) active.style.color = 'var(--accent)';
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => obs.observe(s));
  }

  // ================================================================
  // BOTÃO REINICIAR
  // ================================================================
  function initReset() {
    const btn = document.getElementById('resetAll');
    if (!btn) return;
    btn.addEventListener('click', function () {
      if (typeof window.NLQuizReset === 'function') window.NLQuizReset();
    });
  }

  // ================================================================
  // EXPORTAR RELATÓRIO
  // ================================================================
  const TOPIC_NAMES = {
    quiz1: 'Tópico 01 — Força: a linguagem da dinâmica',
    quiz2: 'Tópico 02 — 1ª Lei: inércia e referenciais inerciais',
    quiz3: 'Tópico 03 — 2ª Lei: quantidade de movimento e F = m·a',
    quiz4: 'Tópico 04 — 3ª Lei: pares de interação',
    quiz5: 'Tópico 05 — Força resultante, equilíbrio e DCL',
    quiz6: 'Tópico 06 — Nenhuma situação é de uma lei só',
    quiz7: 'Tópico 07 — Aristóteles × Newton',
    quiz8: 'Tópico 08 — Limites de validade',
  };

  function stripHtml(str) { return str.replace(/<[^>]+>/g, ''); }

  function generateReport() {
    const state = window.NLQuizState;
    const data  = window.NLQuizData;
    if (!data || !state) return 'Dados não disponíveis.';

    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR');
    const name = (document.getElementById('studentName') || {}).value || '';

    const lines = [
      '╔══════════════════════════════════════════╗',
      '║  RELATÓRIO DE ESTUDO                     ║',
      '║  As Três Leis de Newton                  ║',
      '╚══════════════════════════════════════════╝',
      '',
      'Data: ' + dateStr,
    ];
    if (name.trim()) lines.push('Aluno: ' + name.trim());
    lines.push('', '──────────────────────────────────────────');

    let totalAnswered = 0, totalCorrect = 0, totalQs = 0;

    Object.keys(data).forEach(function (quizId) {
      const questions = data[quizId];
      lines.push('');
      lines.push(TOPIC_NAMES[quizId] || quizId);
      lines.push('──────────────────────────────────────────');

      questions.forEach(function (q, i) {
        const qid      = quizId + '_q' + i;
        const answered = state.answered[qid];
        totalQs++;

        lines.push('Q' + (i + 1) + ': ' + stripHtml(q.text));
        if (answered) {
          totalAnswered++;
          if (answered.correct) {
            totalCorrect++;
            lines.push('   -> CORRETA');
            if (answered.type === 'objective') {
              lines.push('   Sua resposta: ' + stripHtml(answered.chosenText));
            } else if (answered.type === 'numeric') {
              lines.push('   Sua resposta: ' + answered.chosenValue + ' ' + answered.unit);
            }
          } else {
            lines.push('   -> INCORRETA');
            if (answered.type === 'objective') {
              lines.push('   Sua resposta: ' + stripHtml(answered.chosenText));
              lines.push('   Resposta correta: ' + stripHtml(answered.correctText));
            } else if (answered.type === 'numeric') {
              lines.push('   Sua resposta: ' + answered.chosenValue + ' ' + answered.unit);
              lines.push('   Resposta correta: ' + answered.correctValue + ' ' + answered.unit);
            }
            lines.push('   Explicação: ' + stripHtml(q.explanation));
          }
        } else {
          lines.push('   -> (não respondida)');
        }
        lines.push('');
      });
    });

    const pct = totalQs > 0 ? Math.round((totalCorrect / totalQs) * 100) : 0;
    lines.push('══════════════════════════════════════════');
    lines.push('RESULTADO FINAL: ' + totalCorrect + '/' + totalQs + ' (' + pct + '%)');
    lines.push('Respondidas: ' + totalAnswered + '/' + totalQs);
    lines.push('');
    lines.push('Piras na Física — pirasnafisica.com.br');

    return lines.join('\n');
  }

  function initReport() {
    const downloadBtn = document.getElementById('downloadReportBtn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', function () {
        const text = generateReport();
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement('a');
        a.href = url;
        a.download = 'relatorio_leis_newton_' + new Date().toISOString().slice(0, 10) + '.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }

    const copyBtn = document.getElementById('copyReportBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        navigator.clipboard.writeText(generateReport()).then(function () {
          const orig = copyBtn.textContent;
          copyBtn.textContent = '✓ Copiado!';
          setTimeout(function () { copyBtn.textContent = orig; }, 2000);
        });
      });
    }

    const emailBtn = document.getElementById('emailReportBtn');
    if (emailBtn) {
      emailBtn.addEventListener('click', function () {
        const subject = encodeURIComponent('Relatório de Estudo — As Três Leis de Newton');
        const body    = encodeURIComponent(generateReport());
        window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
      });
    }
  }

  // ================================================================
  // INIT
  // ================================================================
  function init() {
    initScrollReveal();
    initSumarioActive();
    initReset();
    initReport();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
