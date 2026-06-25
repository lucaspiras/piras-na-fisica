// main.js — Calculadoras e exportação — Lançamentos de Projéteis

(function () {
  'use strict';

  const G = 10;

  // ================================================================
  // CALCULADORA — LANÇAMENTO HORIZONTAL
  // ================================================================
  const calcHorizBtn = document.getElementById('calcHorizontal');
  const calcResultH  = document.getElementById('calc-result-h');

  function readNum(id) {
    const el = document.getElementById(id);
    if (!el) return NaN;
    return el.value.trim() === '' ? NaN : parseFloat(el.value);
  }

  function showResult(el, lines, ok) {
    if (!el) return;
    el.innerHTML = lines.join('<br>');
    el.style.color = ok ? '#4cd964' : '#ff6b6b';
  }

  function fmt(n) { return +n.toFixed(4) + ''; }

  if (calcHorizBtn) {
    calcHorizBtn.addEventListener('click', function () {
      const v0 = readNum('calc-v0h');
      const h  = readNum('calc-hh');
      if (isNaN(v0) || isNaN(h) || v0 <= 0 || h <= 0) {
        showResult(calcResultH, ['⚠️ Informe v₀ > 0 e h > 0.'], false);
        return;
      }
      const t  = Math.sqrt(2 * h / G);
      const x  = v0 * t;
      const vy = G * t;
      showResult(calcResultH, [
        '✓ Tempo de queda: <strong>t = ' + fmt(t) + ' s</strong>',
        '✓ Alcance horizontal: <strong>x = ' + fmt(x) + ' m</strong>',
        '✓ Velocidade vertical na chegada: <strong>vᵧ = ' + fmt(vy) + ' m/s</strong>',
      ], true);
    });

    ['calc-v0h', 'calc-hh'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('keydown', e => { if (e.key === 'Enter') calcHorizBtn.click(); });
    });
  }

  // ================================================================
  // CALCULADORA — LANÇAMENTO OBLÍQUO
  // ================================================================
  const calcObliqBtn = document.getElementById('calcObliquo');
  const calcResultO  = document.getElementById('calc-result-o');

  if (calcObliqBtn) {
    calcObliqBtn.addEventListener('click', function () {
      const v0    = readNum('calc-v0o');
      const theta = readNum('calc-theta');
      if (isNaN(v0) || isNaN(theta) || v0 <= 0 || theta <= 0 || theta >= 90) {
        showResult(calcResultO, ['⚠️ Informe v₀ > 0 e 0° < θ < 90°.'], false);
        return;
      }
      const rad = theta * Math.PI / 180;
      const v0x = v0 * Math.cos(rad);
      const v0y = v0 * Math.sin(rad);
      const T   = 2 * v0y / G;
      const R   = v0x * T;
      const H   = (v0y * v0y) / (2 * G);
      showResult(calcResultO, [
        '✓ v₀ₓ = v₀ · cos θ = <strong>' + fmt(v0x) + ' m/s</strong>',
        '✓ v₀ᵧ = v₀ · sen θ = <strong>' + fmt(v0y) + ' m/s</strong>',
        '✓ Tempo de voo: <strong>T = ' + fmt(T) + ' s</strong>',
        '✓ Altura máxima: <strong>H = ' + fmt(H) + ' m</strong>',
        '✓ Alcance: <strong>R = ' + fmt(R) + ' m</strong>',
      ], true);
    });

    ['calc-v0o', 'calc-theta'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('keydown', e => { if (e.key === 'Enter') calcObliqBtn.click(); });
    });
  }

  // ================================================================
  // BOTÃO REINICIAR
  // ================================================================
  const resetBtn = document.getElementById('resetAll');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      if (typeof window.LOQuizReset === 'function') window.LOQuizReset();
    });
  }

  // ================================================================
  // EXPORTAR RELATÓRIO
  // ================================================================
  const TOPIC_NAMES = {
    quiz1: 'Tópico 01 — Movimento de Projétil',
    quiz2: 'Tópico 02 — Lançamento Oblíquo',
    quiz3: 'Tópico 03 — Componentes da Velocidade Inicial',
    quiz4: 'Tópico 04 — Equações do Lançamento Oblíquo',
    quiz5: 'Tópico 05 — Trajetória e Alcance',
    quiz6: 'Tópico 06 — Alcance Máximo',
    quiz7: 'Tópico 07 — Altura Máxima e Tempo de Voo',
    quiz8: 'Tópico 08 — Lançamento Horizontal (caso especial)',
    quiz9: 'Tópico 09 — Casos Especiais',
  };

  function stripHtml(str) { return str.replace(/<[^>]+>/g, ''); }

  function generateReport() {
    const state = window.LOQuizState;
    const data  = window.LOQuizData;
    if (!data || !state) return 'Dados não disponíveis.';

    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR');
    const name = (document.getElementById('studentName') || {}).value || '';

    const lines = [
      '╔══════════════════════════════════════════╗',
      '║  RELATÓRIO DE ESTUDO                     ║',
      '║  Lançamentos de Projéteis                ║',
      '║  Horizontal e Oblíquo                    ║',
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

  const downloadBtn = document.getElementById('downloadReportBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function () {
      const text = generateReport();
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href = url;
      a.download = 'relatorio_lancamentos_' + new Date().toISOString().slice(0, 10) + '.txt';
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
      const subject = encodeURIComponent('Relatorio de Estudo — Lancamentos de Projeteis');
      const body    = encodeURIComponent(generateReport());
      window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
    });
  }

})();
