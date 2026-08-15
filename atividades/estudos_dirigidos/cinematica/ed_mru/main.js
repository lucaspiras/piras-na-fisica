// main.js — Lógica interativa: conversor e calculadora MRU

(function() {
  'use strict';

  // ================================================================
  // CONVERSOR DE VELOCIDADE (m/s ↔ km/h)
  // ================================================================
  
  // m/s → km/h (multiplicar por 3.6)
  const convMsInput = document.getElementById('conv-ms');
  const convKmhOutput = document.getElementById('conv-kmh');
  
  if (convMsInput && convKmhOutput) {
    convMsInput.addEventListener('input', function() {
      const ms = parseFloat(this.value);
      if (!isNaN(ms)) {
        convKmhOutput.value = (ms * 3.6).toFixed(2);
      } else {
        convKmhOutput.value = '';
      }
    });
  }

  // km/h → m/s (dividir por 3.6)
  const convKmhInput = document.getElementById('conv-kmh2');
  const convMsOutput = document.getElementById('conv-ms2');
  
  if (convKmhInput && convMsOutput) {
    convKmhInput.addEventListener('input', function() {
      const kmh = parseFloat(this.value);
      if (!isNaN(kmh)) {
        convMsOutput.value = (kmh / 3.6).toFixed(2);
      } else {
        convMsOutput.value = '';
      }
    });
  }

  // ================================================================
  // CALCULADORA MRU: S = S₀ + v·t
  // ================================================================
  
  const calcS0 = document.getElementById('calc-s0');
  const calcV = document.getElementById('calc-v');
  const calcT = document.getElementById('calc-t');
  const calcS = document.getElementById('calc-s');
  const calcBtn = document.getElementById('calcMRU');
  const calcResult = document.getElementById('calc-result');

  if (calcBtn) {
    calcBtn.addEventListener('click', function() {
      // Lê os valores dos campos
      const s0 = parseFloat(calcS0.value);
      const v = parseFloat(calcV.value);
      const t = parseFloat(calcT.value);
      const s = parseFloat(calcS.value);

      // Conta quantos campos estão preenchidos
      const filledCount = [s0, v, t, s].filter(x => !isNaN(x)).length;

      // Limpa o resultado anterior
      calcResult.innerHTML = '';

      // Validação
      if (filledCount < 3) {
        calcResult.innerHTML = '<span style="color: #ff6b6b;">⚠️ Preencha pelo menos 3 campos para calcular!</span>';
        return;
      }

      if (filledCount > 3) {
        calcResult.innerHTML = '<span style="color: #ff6b6b;">⚠️ Deixe exatamente um campo vazio!</span>';
        return;
      }

      // Calcula o valor faltante
      let resultText = '';
      let success = true;

      if (isNaN(s0)) {
        // S₀ = S - v·t
        if (Math.abs(v) < 1e-10) {
          calcResult.innerHTML = '<span style="color: #ff6b6b;">⚠️ Velocidade não pode ser zero para calcular S₀!</span>';
          return;
        }
        const result = s - v * t;
        resultText = `<strong>S₀ = ${result.toFixed(2)} m</strong>`;
        calcS0.value = result.toFixed(2);
      } else if (isNaN(v)) {
        // v = (S - S₀) / t
        if (Math.abs(t) < 1e-10) {
          calcResult.innerHTML = '<span style="color: #ff6b6b;">⚠️ Tempo não pode ser zero para calcular v!</span>';
          return;
        }
        const result = (s - s0) / t;
        resultText = `<strong>v = ${result.toFixed(2)} m/s</strong>`;
        calcV.value = result.toFixed(2);
      } else if (isNaN(t)) {
        // t = (S - S₀) / v
        if (Math.abs(v) < 1e-10) {
          calcResult.innerHTML = '<span style="color: #ff6b6b;">⚠️ Velocidade não pode ser zero para calcular t!</span>';
          return;
        }
        const result = (s - s0) / v;
        resultText = `<strong>t = ${result.toFixed(2)} s</strong>`;
        calcT.value = result.toFixed(2);
      } else if (isNaN(s)) {
        // S = S₀ + v·t
        const result = s0 + v * t;
        resultText = `<strong>S = ${result.toFixed(2)} m</strong>`;
        calcS.value = result.toFixed(2);
      }

      // Exibe o resultado
      calcResult.innerHTML = `✓ Calculado: ${resultText}`;
      calcResult.style.color = '#4cd964';
    });
  }

  // Permite calcular pressionando Enter em qualquer campo
  const calcInputs = [calcS0, calcV, calcT, calcS];
  calcInputs.forEach(input => {
    if (input) {
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          calcBtn.click();
        }
      });
    }
  });

  // ================================================================
  // BOTÃO REINICIAR
  // ================================================================
  const resetBtn = document.getElementById('resetAll');
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      if (typeof window.MRUQuizReset === 'function') {
        window.MRUQuizReset();
      }
    });
  }

  // ================================================================
  // EXPORTAR RELATÓRIO
  // ================================================================
  const TOPIC_NAMES = {
    quiz1: 'Tópico 01 — Referencial',
    quiz2: 'Tópico 02 — Posição',
    quiz3: 'Tópico 03 — Velocidade Média',
    quiz4: 'Tópico 04 — Velocidade Instantânea',
    quiz5: 'Tópico 05 — Equações do MRU',
    quiz6: 'Tópico 06 — Função Horária da Posição',
    quiz7: 'Tópico 07 — Gráficos do MRU',
    quiz8: 'Tópico 08 — Classificação do MRU',
    quiz9: 'Tópico 09 — Encontro de Móveis',
  };

  function stripHtml(str) {
    return str.replace(/<[^>]+>/g, '');
  }

  function generateReport() {
    const state = window.MRUQuizState;
    const data  = window.MRUQuizData;
    if (!data || !state) return 'Dados não disponíveis.';

    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR');
    const name = (document.getElementById('studentName') || {}).value || '';

    const lines = [
      '╔══════════════════════════════════════════╗',
      '║  RELATÓRIO DE ESTUDO — MRU               ║',
      '║  Movimento Retilíneo Uniforme            ║',
      '╚══════════════════════════════════════════╝',
      '',
      'Data: ' + dateStr,
    ];
    if (name.trim()) lines.push('Aluno: ' + name.trim());
    lines.push('', '──────────────────────────────────────────');

    let totalAnswered = 0;
    let totalCorrect  = 0;
    let totalQs       = 0;

    Object.keys(data).forEach(function(quizId) {
      const questions = data[quizId];
      lines.push('');
      lines.push(TOPIC_NAMES[quizId] || quizId);
      lines.push('──────────────────────────────────────────');

      questions.forEach(function(q, i) {
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
    lines.push('Piras na Física — fisíca.pirasnafisica.com.br');

    return lines.join('\n');
  }

  const downloadBtn = document.getElementById('downloadReportBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
      const text = generateReport();
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href = url;
      const d = new Date();
      a.download = 'relatorio_mru_' + d.toISOString().slice(0, 10) + '.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  const copyBtn = document.getElementById('copyReportBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      const text = generateReport();
      navigator.clipboard.writeText(text).then(function() {
        const orig = copyBtn.textContent;
        copyBtn.textContent = '✓ Copiado!';
        setTimeout(function() { copyBtn.textContent = orig; }, 2000);
      });
    });
  }

  const emailBtn = document.getElementById('emailReportBtn');
  if (emailBtn) {
    emailBtn.addEventListener('click', function() {
      const text    = generateReport();
      const subject = encodeURIComponent('Relatório de Estudo — MRU');
      const body    = encodeURIComponent(text);
      window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
    });
  }

})();
