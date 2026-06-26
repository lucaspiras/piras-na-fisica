// main.js — Calculadora de conversão, reset e exportação — Unidades de Medida

(function () {
  'use strict';

  // ================================================================
  // TABELA DE CONVERSÃO
  // Todas as unidades são armazenadas como fatores para converter
  // para a unidade base SI de cada grandeza.
  // ================================================================
  const CONVERSIONS = {
    comprimento: {
      label: 'Comprimento',
      base: 'm',
      units: {
        'm':  { label: 'Metro (m)',           factor: 1 },
        'km': { label: 'Quilômetro (km)',      factor: 1000 },
        'cm': { label: 'Centímetro (cm)',      factor: 0.01 },
        'mm': { label: 'Milímetro (mm)',       factor: 0.001 },
        'μm': { label: 'Micrômetro (μm)',      factor: 1e-6 },
        'nm': { label: 'Nanômetro (nm)',       factor: 1e-9 },
        'in': { label: 'Polegada (in)',        factor: 0.0254 },
        'ft': { label: 'Pé (ft)',              factor: 0.3048 },
        'yd': { label: 'Jarda (yd)',           factor: 0.9144 },
        'mi': { label: 'Milha terrestre (mi)', factor: 1609.344 },
      }
    },
    massa: {
      label: 'Massa',
      base: 'kg',
      units: {
        'kg': { label: 'Quilograma (kg)', factor: 1 },
        'g':  { label: 'Grama (g)',       factor: 0.001 },
        'mg': { label: 'Miligrama (mg)',  factor: 1e-6 },
        't':  { label: 'Tonelada (t)',    factor: 1000 },
        'lb': { label: 'Libra (lb)',      factor: 0.45359237 },
        'oz': { label: 'Onça (oz)',       factor: 0.028349523 },
      }
    },
    tempo: {
      label: 'Tempo',
      base: 's',
      units: {
        's':   { label: 'Segundo (s)',      factor: 1 },
        'ms':  { label: 'Milissegundo (ms)',factor: 0.001 },
        'min': { label: 'Minuto (min)',     factor: 60 },
        'h':   { label: 'Hora (h)',         factor: 3600 },
        'd':   { label: 'Dia (d)',          factor: 86400 },
      }
    },
    velocidade: {
      label: 'Velocidade',
      base: 'm/s',
      units: {
        'm/s':   { label: 'Metro por segundo (m/s)',   factor: 1 },
        'km/h':  { label: 'Quilômetro por hora (km/h)',factor: 1 / 3.6 },
        'mph':   { label: 'Milha por hora (mph)',       factor: 0.44704 },
        'ft/s':  { label: 'Pé por segundo (ft/s)',     factor: 0.3048 },
        'kn':    { label: 'Nó (kn)',                   factor: 0.514444 },
      }
    },
    area: {
      label: 'Área',
      base: 'm²',
      units: {
        'm²':  { label: 'Metro quadrado (m²)',      factor: 1 },
        'km²': { label: 'Quilômetro quadrado (km²)',factor: 1e6 },
        'cm²': { label: 'Centímetro quadrado (cm²)',factor: 1e-4 },
        'ha':  { label: 'Hectare (ha)',              factor: 10000 },
        'ft²': { label: 'Pé quadrado (ft²)',         factor: 0.092903 },
        'in²': { label: 'Polegada quadrada (in²)',   factor: 6.4516e-4 },
      }
    }
  };

  // ================================================================
  // PREENCHE SELETORES
  // ================================================================
  const selGrandeza = document.getElementById('conv-grandeza');
  const selDe       = document.getElementById('conv-de');
  const selPara     = document.getElementById('conv-para');
  const inputValor  = document.getElementById('conv-valor');
  const btnConverter= document.getElementById('conv-btn');
  const resultBox   = document.getElementById('conv-result');

  function populateUnits(grandeza) {
    if (!selDe || !selPara) return;
    const g = CONVERSIONS[grandeza];
    if (!g) return;

    selDe.innerHTML = '';
    selPara.innerHTML = '';

    Object.entries(g.units).forEach(([key, u]) => {
      selDe.innerHTML  += '<option value="' + key + '">' + u.label + '</option>';
      selPara.innerHTML += '<option value="' + key + '">' + u.label + '</option>';
    });

    // Seleciona um destino diferente por padrão
    if (selPara.options.length > 1) selPara.selectedIndex = 1;
  }

  if (selGrandeza) {
    // Popula seletor de grandezas
    Object.entries(CONVERSIONS).forEach(([key, g]) => {
      selGrandeza.innerHTML += '<option value="' + key + '">' + g.label + '</option>';
    });

    selGrandeza.addEventListener('change', function () {
      populateUnits(this.value);
    });

    populateUnits(selGrandeza.value || 'comprimento');
  }

  // ================================================================
  // CONVERSÃO
  // ================================================================
  function fmt(n) {
    if (Math.abs(n) === 0) return '0';
    if (Math.abs(n) >= 0.001 && Math.abs(n) < 1e7) {
      // Remove zeros à direita
      return parseFloat(n.toPrecision(6)).toString();
    }
    return n.toExponential(4);
  }

  function doConvert() {
    if (!resultBox || !inputValor || !selDe || !selPara || !selGrandeza) return;

    const valor = parseFloat(inputValor.value);
    if (isNaN(valor)) {
      resultBox.innerHTML = '<span class="conv-error">⚠️ Digite um valor numérico.</span>';
      return;
    }

    const grandezaKey = selGrandeza.value;
    const g = CONVERSIONS[grandezaKey];
    const deKey   = selDe.value;
    const paraKey = selPara.value;

    if (!g || !g.units[deKey] || !g.units[paraKey]) {
      resultBox.innerHTML = '<span class="conv-error">⚠️ Unidades não reconhecidas.</span>';
      return;
    }

    const factorDe   = g.units[deKey].factor;
    const factorPara = g.units[paraKey].factor;
    const valorBase  = valor * factorDe;       // converte para unidade base
    const resultado  = valorBase / factorPara; // converte para unidade destino

    const labelDe   = g.units[deKey].label;
    const labelPara = g.units[paraKey].label;
    const deSimb    = deKey;
    const paraSimb  = paraKey;

    // Fator direto De → Para
    const fatorDireto = factorDe / factorPara;

    resultBox.innerHTML =
      '<div class="conv-res-title">Resultado</div>' +
      '<div class="conv-res-value">' + fmt(valor) + ' ' + deSimb + ' = <strong>' + fmt(resultado) + ' ' + paraSimb + '</strong></div>' +
      '<hr class="conv-divider">' +
      '<div class="conv-method">' +
        '<div class="conv-method-title">📐 Pelo fator de conversão</div>' +
        '<div class="conv-step">1 ' + deSimb + ' = ' + fmt(fatorDireto) + ' ' + paraSimb + '</div>' +
        '<div class="conv-step">' + fmt(valor) + ' ' + deSimb + ' × ' + fmt(fatorDireto) + ' = <strong>' + fmt(resultado) + ' ' + paraSimb + '</strong></div>' +
      '</div>' +
      '<div class="conv-method">' +
        '<div class="conv-method-title">📏 Pela regra de três</div>' +
        '<div class="conv-step">1 ' + deSimb + ' ↔ ' + fmt(fatorDireto) + ' ' + paraSimb + '</div>' +
        '<div class="conv-step">' + fmt(valor) + ' ' + deSimb + ' ↔ x ' + paraSimb + '</div>' +
        '<div class="conv-step">x = ' + fmt(valor) + ' × ' + fmt(fatorDireto) + ' = <strong>' + fmt(resultado) + ' ' + paraSimb + '</strong></div>' +
      '</div>';
  }

  if (btnConverter) btnConverter.addEventListener('click', doConvert);
  if (inputValor) inputValor.addEventListener('keypress', e => { if (e.key === 'Enter') doConvert(); });

  // ================================================================
  // BOTÃO REINICIAR
  // ================================================================
  const resetBtn = document.getElementById('resetAll');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      if (typeof window.UnidadesQuizReset === 'function') window.UnidadesQuizReset();
    });
  }

  // ================================================================
  // EXPORTAR RELATÓRIO
  // ================================================================
  const TOPIC_NAMES = {
    quiz1: 'Tópico 01 — O que é uma Grandeza Física?',
    quiz2: 'Tópico 02 — Sistema Internacional de Unidades',
    quiz3: 'Tópico 03 — Múltiplos e Submúltiplos do SI',
    quiz4: 'Tópico 04 — Sistema Imperial de Medidas',
    quiz5: 'Tópico 05 — História das Unidades de Medida',
    quiz6: 'Tópico 06 — Como Escrever Unidades Corretamente',
    quiz7: 'Tópico 07 — Conversão por Regra de Três',
    quiz8: 'Tópico 08 — Conversão por Fator de Conversão',
  };

  function stripHtml(str) { return str.replace(/<[^>]+>/g, ''); }

  function generateReport() {
    const state = window.UnidadesQuizState;
    const data  = window.UnidadesQuizData;
    if (!data || !state) return 'Dados não disponíveis.';

    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR');
    const name = (document.getElementById('studentName') || {}).value || '';

    const lines = [
      '╔══════════════════════════════════════════╗',
      '║  RELATÓRIO DE ESTUDO                     ║',
      '║  Unidades de Medida e Conversões         ║',
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
      a.download = 'relatorio_unidades_' + new Date().toISOString().slice(0, 10) + '.txt';
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
      const subject = encodeURIComponent('Relatório de Estudo — Unidades de Medida');
      const body    = encodeURIComponent(generateReport());
      window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
    });
  }

})();
