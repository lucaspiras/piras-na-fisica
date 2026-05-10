// main.js — Calculadora MRUV, reset e exportação de relatório

(function () {
  'use strict';

  // ================================================================
  // CALCULADORA MRUV  —  S = S₀ + v₀t + ½at²
  // Variáveis: v0, v, a, t, ds (ΔS)
  // Usuário preenche 3 campos; calculamos os 2 restantes.
  // ================================================================
  const fv0 = document.getElementById('calc-v0');
  const fv  = document.getElementById('calc-v');
  const fa  = document.getElementById('calc-a');
  const ft  = document.getElementById('calc-t');
  const fds = document.getElementById('calc-ds');
  const calcBtn    = document.getElementById('calcMRUV');
  const calcResult = document.getElementById('calc-result-mruv');

  function readField(el) {
    if (!el) return NaN;
    return el.value.trim() === '' ? NaN : parseFloat(el.value);
  }

  function fillField(el, val) {
    if (el) el.value = val.toFixed(3).replace(/\.?0+$/, '');
  }

  function showCalcResult(lines, ok) {
    if (!calcResult) return;
    calcResult.innerHTML = lines.join('<br>');
    calcResult.style.color = ok ? '#4cd964' : '#ff6b6b';
  }

  if (calcBtn) {
    calcBtn.addEventListener('click', function () {
      const v0 = readField(fv0);
      const v  = readField(fv);
      const a  = readField(fa);
      const t  = readField(ft);
      const ds = readField(fds);

      const known = [v0, v, a, t, ds].map(x => !isNaN(x));
      const nKnown = known.filter(Boolean).length;

      if (nKnown < 3) {
        showCalcResult(['⚠️ Preencha pelo menos 3 campos para calcular.'], false);
        return;
      }
      if (nKnown > 3) {
        showCalcResult(['⚠️ Deixe exatamente 2 campos em branco.'], false);
        return;
      }

      const res = [];

      // Caso: dados v0, v, t
      if (!isNaN(v0) && !isNaN(v) && !isNaN(t) && isNaN(a) && isNaN(ds)) {
        if (Math.abs(t) < 1e-12) { showCalcResult(['⚠️ t não pode ser zero.'], false); return; }
        const ca = (v - v0) / t;
        const cds = (v0 + v) / 2 * t;
        fillField(fa, ca); fillField(fds, cds);
        res.push('a = (v − v₀)/t = ' + ca.toFixed(3) + ' m/s²');
        res.push('ΔS = (v₀+v)/2 · t = ' + cds.toFixed(3) + ' m');
      }
      // Caso: dados v0, v, a
      else if (!isNaN(v0) && !isNaN(v) && !isNaN(a) && isNaN(t) && isNaN(ds)) {
        if (Math.abs(a) < 1e-12) { showCalcResult(['⚠️ a não pode ser zero.'], false); return; }
        const ct = (v - v0) / a;
        const cds = (v * v - v0 * v0) / (2 * a);
        fillField(ft, ct); fillField(fds, cds);
        res.push('t = (v − v₀)/a = ' + ct.toFixed(3) + ' s');
        res.push('ΔS = (v²−v₀²)/(2a) = ' + cds.toFixed(3) + ' m');
      }
      // Caso: dados v0, v, ds
      else if (!isNaN(v0) && !isNaN(v) && !isNaN(ds) && isNaN(a) && isNaN(t)) {
        if (Math.abs(ds) < 1e-12) { showCalcResult(['⚠️ ΔS não pode ser zero.'], false); return; }
        const ca = (v * v - v0 * v0) / (2 * ds);
        const sum = v0 + v;
        if (Math.abs(sum) < 1e-12) { showCalcResult(['⚠️ v₀ + v não pode ser zero.'], false); return; }
        const ct = 2 * ds / sum;
        fillField(fa, ca); fillField(ft, ct);
        res.push('a = (v²−v₀²)/(2ΔS) = ' + ca.toFixed(3) + ' m/s²');
        res.push('t = 2ΔS/(v₀+v) = ' + ct.toFixed(3) + ' s');
      }
      // Caso: dados v0, a, t
      else if (!isNaN(v0) && !isNaN(a) && !isNaN(t) && isNaN(v) && isNaN(ds)) {
        const cv = v0 + a * t;
        const cds = v0 * t + 0.5 * a * t * t;
        fillField(fv, cv); fillField(fds, cds);
        res.push('v = v₀ + a·t = ' + cv.toFixed(3) + ' m/s');
        res.push('ΔS = v₀t + ½at² = ' + cds.toFixed(3) + ' m');
      }
      // Caso: dados v0, a, ds
      else if (!isNaN(v0) && !isNaN(a) && !isNaN(ds) && isNaN(v) && isNaN(t)) {
        const disc = v0 * v0 + 2 * a * ds;
        if (disc < 0) { showCalcResult(['⚠️ Discriminante negativo — sem solução real.'], false); return; }
        const cv = Math.sqrt(disc);
        if (Math.abs(a) < 1e-12) { showCalcResult(['⚠️ a não pode ser zero.'], false); return; }
        const ct = (cv - v0) / a;
        fillField(fv, cv); fillField(ft, ct);
        res.push('v = √(v₀²+2aΔS) = ' + cv.toFixed(3) + ' m/s');
        res.push('t = (v − v₀)/a = ' + ct.toFixed(3) + ' s');
      }
      // Caso: dados v0, t, ds
      else if (!isNaN(v0) && !isNaN(t) && !isNaN(ds) && isNaN(v) && isNaN(a)) {
        if (Math.abs(t) < 1e-12) { showCalcResult(['⚠️ t não pode ser zero.'], false); return; }
        const ca = 2 * (ds - v0 * t) / (t * t);
        const cv = v0 + ca * t;
        fillField(fa, ca); fillField(fv, cv);
        res.push('a = 2(ΔS−v₀t)/t² = ' + ca.toFixed(3) + ' m/s²');
        res.push('v = v₀ + a·t = ' + cv.toFixed(3) + ' m/s');
      }
      // Caso: dados v, a, t
      else if (!isNaN(v) && !isNaN(a) && !isNaN(t) && isNaN(v0) && isNaN(ds)) {
        const cv0 = v - a * t;
        const cds = v * t - 0.5 * a * t * t;
        fillField(fv0, cv0); fillField(fds, cds);
        res.push('v₀ = v − a·t = ' + cv0.toFixed(3) + ' m/s');
        res.push('ΔS = v·t − ½at² = ' + cds.toFixed(3) + ' m');
      }
      // Caso: dados v, a, ds
      else if (!isNaN(v) && !isNaN(a) && !isNaN(ds) && isNaN(v0) && isNaN(t)) {
        const disc = v * v - 2 * a * ds;
        if (disc < 0) { showCalcResult(['⚠️ Discriminante negativo — sem solução real.'], false); return; }
        const cv0 = Math.sqrt(disc);
        if (Math.abs(a) < 1e-12) { showCalcResult(['⚠️ a não pode ser zero.'], false); return; }
        const ct = (v - cv0) / a;
        fillField(fv0, cv0); fillField(ft, ct);
        res.push('v₀ = √(v²−2aΔS) = ' + cv0.toFixed(3) + ' m/s');
        res.push('t = (v − v₀)/a = ' + ct.toFixed(3) + ' s');
      }
      // Caso: dados v, t, ds
      else if (!isNaN(v) && !isNaN(t) && !isNaN(ds) && isNaN(v0) && isNaN(a)) {
        if (Math.abs(t) < 1e-12) { showCalcResult(['⚠️ t não pode ser zero.'], false); return; }
        const cv0 = 2 * ds / t - v;
        const ca = (v - cv0) / t;
        fillField(fv0, cv0); fillField(fa, ca);
        res.push('v₀ = 2ΔS/t − v = ' + cv0.toFixed(3) + ' m/s');
        res.push('a = (v − v₀)/t = ' + ca.toFixed(3) + ' m/s²');
      }
      // Caso: dados a, t, ds
      else if (!isNaN(a) && !isNaN(t) && !isNaN(ds) && isNaN(v0) && isNaN(v)) {
        if (Math.abs(t) < 1e-12) { showCalcResult(['⚠️ t não pode ser zero.'], false); return; }
        const cv0 = (ds - 0.5 * a * t * t) / t;
        const cv = cv0 + a * t;
        fillField(fv0, cv0); fillField(fv, cv);
        res.push('v₀ = (ΔS − ½at²)/t = ' + cv0.toFixed(3) + ' m/s');
        res.push('v = v₀ + a·t = ' + cv.toFixed(3) + ' m/s');
      } else {
        showCalcResult(['⚠️ Combinação de variáveis não reconhecida. Verifique os campos.'], false);
        return;
      }

      showCalcResult(['✓ Calculado:'].concat(res), true);
    });

    // Enter em qualquer campo dispara o cálculo
    [fv0, fv, fa, ft, fds].forEach(el => {
      if (el) el.addEventListener('keypress', e => { if (e.key === 'Enter') calcBtn.click(); });
    });
  }

  // ================================================================
  // BOTÃO REINICIAR
  // ================================================================
  const resetBtn = document.getElementById('resetAll');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      if (typeof window.MRUVQuizReset === 'function') window.MRUVQuizReset();
    });
  }

  // ================================================================
  // EXPORTAR RELATÓRIO
  // ================================================================
  const TOPIC_NAMES = {
    quiz1: 'Tópico 01 — Aceleração',
    quiz2: 'Tópico 02 — Função Horária da Velocidade',
    quiz3: 'Tópico 03 — Função Horária da Posição',
    quiz4: 'Tópico 04 — Equação de Torricelli',
    quiz5: 'Tópico 05 — Velocidade Média no MRUV',
    quiz6: 'Tópico 06 — Gráficos do MRUV',
    quiz7: 'Tópico 07 — Classificação do MRUV',
    quiz8: 'Tópico 08 — Queda Livre',
    quiz9: 'Tópico 09 — Lançamento Vertical',
  };

  function stripHtml(str) { return str.replace(/<[^>]+>/g, ''); }

  function generateReport() {
    const state = window.MRUVQuizState;
    const data  = window.MRUVQuizData;
    if (!data || !state) return 'Dados não disponíveis.';

    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR');

    const lines = [
      '╔══════════════════════════════════════════╗',
      '║  RELATÓRIO DE ESTUDO — MRUV              ║',
      '║  Movimento Retilíneo Uniformemente       ║',
      '║  Variado                                 ║',
      '╚══════════════════════════════════════════╝',
      '',
      'Data: ' + dateStr,
      '',
      '──────────────────────────────────────────',
    ];

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
          } else {
            lines.push('   -> INCORRETA');
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
      a.download = 'relatorio_mruv_' + new Date().toISOString().slice(0, 10) + '.txt';
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
      const subject = encodeURIComponent('Relatório de Estudo — MRUV');
      const body    = encodeURIComponent(generateReport());
      window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
    });
  }

})();
