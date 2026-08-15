// main.js — Scroll reveal, sumário ativo, reset e relatório — Forças
// Mesma máquina do ED de Leis de Newton, com o banco de questões deste estudo.

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
    quiz1: 'Tópico 01 — O que é uma força',
    quiz2: 'Tópico 02 — Peso: a atração da Terra',
    quiz3: 'Tópico 03 — Normal: o apoio que empurra de volta',
    quiz4: 'Tópico 04 — Tração: o fio que só puxa',
    quiz5: 'Tópico 05 — Atrito: estático e cinético',
    quiz6: 'Tópico 06 — Força resultante',
    quiz7: 'Tópico 07 — Diagrama de corpo livre',
    quiz8: 'Tópico 08 — Aplicações',
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
      '║  Forças: Peso, Normal, Tração e Atrito   ║',
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
        a.download = 'relatorio_forcas_' + new Date().toISOString().slice(0, 10) + '.txt';
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
        const subject = encodeURIComponent('Relatório de Estudo — Forças: Peso, Normal, Tração e Atrito');
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
