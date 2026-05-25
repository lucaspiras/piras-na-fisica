// main.js — Interatividade geral: scroll, calculadora, reset

(function () {
  'use strict';

  /* ══════════════════════════════════════════════
     SCROLL — revela tópicos ao entrar na viewport
  ══════════════════════════════════════════════ */
  function initScrollReveal() {
    const topics = document.querySelectorAll('.topic');
    if (!topics.length) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.07 });

    topics.forEach(t => obs.observe(t));
  }

  /* ══════════════════════════════════════════════
     SUMÁRIO — destaca item ativo ao rolar
  ══════════════════════════════════════════════ */
  function initSumarioActive() {
    const sections = document.querySelectorAll('.topic');
    const links    = document.querySelectorAll('.sum-list a');
    if (!sections.length || !links.length) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(l => l.style.color = '');
          const id = e.target.id;
          const active = document.querySelector(`.sum-list a[href="#${id}"]`);
          if (active) active.style.color = '#c8a951';
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => obs.observe(s));
  }

  /* ══════════════════════════════════════════════
     CALCULADORA — Lei de Coulomb
     F = k * |q1| * |q2| / r²
     q1, q2 em µC → converte para C internamente
  ══════════════════════════════════════════════ */
  function initCalculadora() {
    const btn = document.getElementById('btnCoulomb');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const k = 9e9;

      const fEl  = document.getElementById('coul-F');
      const q1El = document.getElementById('coul-q1');
      const q2El = document.getElementById('coul-q2');
      const rEl  = document.getElementById('coul-r');
      const res  = document.getElementById('coul-result');

      const vals = {
        F:  fEl.value  === '' ? null : parseFloat(fEl.value),
        q1: q1El.value === '' ? null : parseFloat(q1El.value) * 1e-6,
        q2: q2El.value === '' ? null : parseFloat(q2El.value) * 1e-6,
        r:  rEl.value  === '' ? null : parseFloat(rEl.value)
      };

      const blanks = Object.keys(vals).filter(k => vals[k] === null);

      if (blanks.length !== 1) {
        res.textContent = blanks.length === 0
          ? 'Deixe exatamente um campo em branco para calcular.'
          : 'Preencha pelo menos três campos.';
        res.style.color = '#c0392b';
        return;
      }

      res.style.color = '';
      const unknown = blanks[0];

      try {
        let resultado;
        switch (unknown) {
          case 'F':
            resultado = k * Math.abs(vals.q1) * Math.abs(vals.q2) / (vals.r ** 2);
            res.textContent = `F = ${fmtNum(resultado)} N`;
            fEl.value = fmtNum(resultado);
            break;
          case 'q1':
            resultado = (vals.F * vals.r ** 2) / (k * Math.abs(vals.q2));
            res.textContent = `|q₁| = ${fmtNum(resultado * 1e6)} µC`;
            q1El.value = fmtNum(resultado * 1e6);
            break;
          case 'q2':
            resultado = (vals.F * vals.r ** 2) / (k * Math.abs(vals.q1));
            res.textContent = `|q₂| = ${fmtNum(resultado * 1e6)} µC`;
            q2El.value = fmtNum(resultado * 1e6);
            break;
          case 'r':
            resultado = Math.sqrt(k * Math.abs(vals.q1) * Math.abs(vals.q2) / vals.F);
            res.textContent = `r = ${fmtNum(resultado)} m`;
            rEl.value = fmtNum(resultado);
            break;
        }
      } catch (e) {
        res.textContent = 'Erro no cálculo. Verifique os valores.';
        res.style.color = '#c0392b';
      }
    });
  }

  function fmtNum(n) {
    if (Math.abs(n) >= 1e4 || (Math.abs(n) < 1e-3 && n !== 0)) {
      return n.toExponential(3);
    }
    return parseFloat(n.toPrecision(4)).toString();
  }

  /* ══════════════════════════════════════════════
     BOTÃO RESET
  ══════════════════════════════════════════════ */
  function initReset() {
    const btn = document.getElementById('btnReset');
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (window.EletroReset) window.EletroReset();
    });
  }

  /* ══════════════════════════════════════════════
     EXPORTAR RELATÓRIO
  ══════════════════════════════════════════════ */
  function initReport() {
    const TOPIC_NAMES = {
      quiz1: 'Tópico 01 — Cargas Elétricas',
      quiz2: 'Tópico 02 — Processos de Eletrização',
      quiz3: 'Tópico 03 — Condutores e Isolantes',
      quiz4: 'Tópico 04 — Lei de Coulomb',
      quiz5: 'Tópico 05 — Força Elétrica, Cargas e Distância',
      quiz6: 'Tópico 06 — Campo Elétrico',
      quiz7: 'Tópico 07 — Força Resultante com Múltiplas Cargas',
      quiz8: 'Tópico 08 — Aplicações no Cotidiano',
    };

    function stripHtml(str) { return str.replace(/<[^>]+>/g, ''); }

    function generateReport() {
      const state = window.EletroState;
      const data  = window.EletroQuizData;
      if (!data || !state) return 'Dados não disponíveis.';

      const now = new Date();
      const dateStr = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR');
      const name = (document.getElementById('studentName') || {}).value || '';

      const lines = [
        '╔══════════════════════════════════════════╗',
        '║  RELATÓRIO DE ESTUDO                     ║',
        '║  Eletrostática                           ║',
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

          lines.push('Q' + (i + 1) + ': ' + stripHtml(q.texto));
          if (answered) {
            totalAnswered++;
            if (answered.acertou) {
              totalCorrect++;
              lines.push('   -> CORRETA');
              if (answered.type === 'obj') {
                lines.push('   Sua resposta: ' + stripHtml(answered.chosenText));
              } else if (answered.type === 'num') {
                lines.push('   Sua resposta: ' + answered.chosenValue + ' ' + answered.unit);
              }
            } else {
              lines.push('   -> INCORRETA');
              if (answered.type === 'obj') {
                lines.push('   Sua resposta: ' + stripHtml(answered.chosenText));
                lines.push('   Resposta correta: ' + stripHtml(answered.correctText));
              } else if (answered.type === 'num') {
                lines.push('   Sua resposta: ' + answered.chosenValue + ' ' + answered.unit);
                lines.push('   Resposta correta: ' + answered.correctValue + ' ' + answered.unit);
              }
              lines.push('   Explicação: ' + stripHtml(q.explicacao));
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

    const downloadBtn = document.getElementById('downloadReportBtn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', function () {
        const text = generateReport();
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement('a');
        a.href = url;
        a.download = 'relatorio_eletrostatica_' + new Date().toISOString().slice(0, 10) + '.txt';
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
        const subject = encodeURIComponent('Relatório de Estudo — Eletrostática');
        const body    = encodeURIComponent(generateReport());
        window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
      });
    }
  }

  /* ══════════════════════════════════════════════
     INIT GLOBAL
  ══════════════════════════════════════════════ */
  function init() {
    initScrollReveal();
    initSumarioActive();
    initCalculadora();
    initReset();
    initReport();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
