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

})();
