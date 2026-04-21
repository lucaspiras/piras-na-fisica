import {
  computeForce,
  computeNetForce,
  computeFieldAt
} from "./physics.js";


import { k, scale } from "./physics.js";



const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const infoPanel = document.getElementById("infoPanel");
const container = document.querySelector(".canvas-container");
const COLORS = {
  positive: "#fb923c",   // laranja
  negative: "#2f5bea",   // azul
  force: "#facc15",      // amarelo
  field: "rgba(106,47,232,0.5)", // roxo
  axis: "#9ca3af",
  selected: "#1e2a78"
};





// =================== ESTADO ===================
let charges = [];
let selectedCharge = null;
let dragging = null;
let showField = true;

// =================== INPUTS ===================
const chargeInput = document.getElementById("chargeValue");
const inputX = document.getElementById("posX");
const inputY = document.getElementById("posY");

let chargeMagnitude = parseFloat(chargeInput.value);

chargeInput.addEventListener("input", e => {
  chargeMagnitude = parseFloat(e.target.value);
});

// =================== RESIZE ===================
function resizeCanvas() {
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;

  // garante mesma largura do painel
  infoPanel.style.maxWidth = container.clientWidth + "px";
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();





// =================== UTIL ===================
function formatSci(num) {
  if (num === 0) return "0";
  const exp = Math.floor(Math.log10(Math.abs(num)));
  const mant = num / Math.pow(10, exp);
  return `${mant.toFixed(2)} × 10<sup>${exp}</sup>`;
}

function toWorld(x, y) {
  return {
    x: x - canvas.width / 2,
    y: canvas.height / 2 - y
  };
}

function toCanvas(x, y) {
  return {
    x: x + canvas.width / 2,
    y: canvas.height / 2 - y
  };
}

// =================== CLASSE ===================
class Charge {
  constructor(x, y, qMicro) {
    this.x = x;
    this.y = y;
    this.qMicro = qMicro;
  }

  get q() {
    return this.qMicro * 1e-6;
  }

  draw() {
    const visualQ = Math.min(Math.abs(this.qMicro), 10);
    const r = Math.max(12, visualQ * 3);

    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
    ctx.fillStyle = this.qMicro > 0 ? COLORS.positive : COLORS.negative;
    ctx.fill();

    if (this === selectedCharge) {
      ctx.strokeStyle = COLORS.selected;
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    ctx.fillStyle = "white";
    ctx.font = "13px Inter";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.qMicro.toFixed(1), this.x, this.y);
  }
}

// =================== FUNÇÕES ===================
function addCharge(sign) {
  charges.push(new Charge(
    Math.random() * canvas.width,
    Math.random() * canvas.height,
    sign * chargeMagnitude
  ));
}

function deleteSelected() {
  if (!selectedCharge) return;
  charges = charges.filter(c => c !== selectedCharge);
  selectedCharge = null;
}

function updatePositionFromInputs() {
  if (!selectedCharge) return;

  const x = parseFloat(inputX.value);
  const y = parseFloat(inputY.value);

  const pos = toCanvas(x, y);
  selectedCharge.x = pos.x;
  selectedCharge.y = pos.y;
}

function toggleField() {
  showField = !showField;
}


// =================== CAMPO ===================
function drawField() {
  const spacing = 30;
  const arrowLen = 15;

  for (let px = 0; px < canvas.width; px += spacing) {
    for (let py = 0; py < canvas.height; py += spacing) {
      const {Ex, Ey} = computeFieldAt(px, py, charges);

      const mag = Math.sqrt(Ex*Ex + Ey*Ey);
      if (mag === 0) continue;

      const ux = Ex / mag;
      const uy = Ey / mag;

      const endX = px + ux * arrowLen;
      const endY = py + uy * arrowLen;

      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = COLORS.field;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // ponta da seta
      const angle = Math.atan2(uy, ux);
      const size = 5;

      ctx.beginPath();
      ctx.moveTo(endX, endY);
      ctx.lineTo(
        endX - size * Math.cos(angle - Math.PI/6),
        endY - size * Math.sin(angle - Math.PI/6)
      );
      ctx.lineTo(
        endX - size * Math.cos(angle + Math.PI/6),
        endY - size * Math.sin(angle + Math.PI/6)
      );
      ctx.closePath();
      ctx.fillStyle = COLORS.field;
      ctx.fill();
    }
  }
}

// =================== DESENHO ===================
function drawAxes() {
  ctx.strokeStyle = COLORS.axis;
  ctx.lineWidth = 1.2;

  ctx.beginPath();
  ctx.moveTo(0, canvas.height/2);
  ctx.lineTo(canvas.width, canvas.height/2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(canvas.width/2, 0);
  ctx.lineTo(canvas.width/2, canvas.height);
  ctx.stroke();
}

function drawForceVector() {
  if (!selectedCharge) return;

  const {fx, fy} = computeNetForce(selectedCharge, charges);
  const mag = Math.sqrt(fx*fx + fy*fy);
  if (mag === 0) return;

  const ux = -fx / mag;
  const uy = -fy / mag;

  const length = 60;

  const endX = selectedCharge.x + ux * length;
  const endY = selectedCharge.y + uy * length;

  ctx.beginPath();
  ctx.moveTo(selectedCharge.x, selectedCharge.y);
  ctx.lineTo(endX, endY);
 ctx.strokeStyle = COLORS.force;
  ctx.lineWidth = 3;
  ctx.stroke();

  const angle = Math.atan2(uy, ux);
  const size = 10;

  ctx.beginPath();
  ctx.moveTo(endX, endY);
  ctx.lineTo(
    endX - size * Math.cos(angle - Math.PI/6),
    endY - size * Math.sin(angle - Math.PI/6)
  );
  ctx.lineTo(
    endX - size * Math.cos(angle + Math.PI/6),
    endY - size * Math.sin(angle + Math.PI/6)
  );
  ctx.closePath();
  ctx.fillStyle = COLORS.force;
  ctx.fill();
}



// =================== PAINEL ===================
function updateInfoPanel() {
  let html = `<h3>📊 Cargas</h3>`;

  html += `<table class="table">
    <tr>
      <th>#</th><th>q (µC)</th><th>x (cm)</th><th>y (cm)</th>
    </tr>`;

  charges.forEach((c, i) => {
    const w = toWorld(c.x, c.y);
    const selected = c === selectedCharge ? "selected" : "";

    html += `
      <tr class="${selected}">
        <td>${i+1}</td>
        <td>${c.qMicro.toFixed(2)}</td>
        <td>${w.x.toFixed(0)}</td>
        <td>${w.y.toFixed(0)}</td>
      </tr>
    `;
  });

  html += `</table>`;

  if (selectedCharge) {
    const {fx, fy} = computeNetForce(selectedCharge, charges)
    const f = Math.sqrt(fx*fx + fy*fy);

    html += `
      <div class="force-box">
        Fx = ${formatSci(fx)} N<br>
        Fy = ${formatSci(fy)} N<br>
        <div class="force-main">|F| = ${formatSci(f)} N</div>
      </div>
    `;
  }

  infoPanel.innerHTML = html;
}

// =================== LOOP ===================
function update() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  if (showField) drawField();

  drawAxes();
  drawForceVector();

  charges.forEach(c => c.draw());

  updateInfoPanel();

  requestAnimationFrame(update);
}

// =================== INTERAÇÃO ===================
canvas.addEventListener("mousedown", e => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  selectedCharge = null;
  dragging = null;

  charges.forEach(c => {
    const dx = mx - c.x;
    const dy = my - c.y;

    // 🔥 HITBOX MAIOR (melhoria importante)
    if (Math.sqrt(dx*dx + dy*dy) < 20) {
      selectedCharge = c;
      dragging = c;

      const w = toWorld(c.x, c.y);
      inputX.value = w.x.toFixed(0);
      inputY.value = w.y.toFixed(0);
    }
  });
});

canvas.addEventListener("mousemove", e => {
  if (dragging) {
    const rect = canvas.getBoundingClientRect();
    dragging.x = e.clientX - rect.left;
    dragging.y = e.clientY - rect.top;
  }
});

canvas.addEventListener("mouseup", () => dragging = null);

//------------------ GRÁFICO DO CAMPO ELÉTRICO ------------------//

let chartCampo = null;

function gerarGraficoCampo() {
  if (charges.length === 0) {
    alert("Adicione pelo menos uma carga para gerar o gráfico!");
    return;
  }

  // Verificar quais componentes o usuário quer ver
  const showEx = document.getElementById("showEx").checked;
  const showEy = document.getElementById("showEy").checked;
  const showE = document.getElementById("showE").checked;

  if (!showEx && !showEy && !showE) {
    alert("Selecione pelo menos um componente (Eₓ, Eᵧ ou |E|)!");
    return;
  }

  const labels = [];
  let dataEx = [];
  let dataEy = [];
  let dataE = [];

  const step = 3; // resolução em pixels (quanto menor, mais pontos)
  const SINGULARITY_THRESHOLD = 15; // pixels - aumentado para zona maior
  const MAX_FIELD = 1e5; // limite de campo para evitar valores absurdos

  // Percorre ao longo do eixo x (y = centro do canvas)
  for (let x = 0; x < canvas.width; x += step) {
    const canvasX = x;
    const canvasY = canvas.height / 2;

    // 🔥 Verificar se está muito perto de uma carga (singularidade)
    let nearSingularity = false;
    for (let c of charges) {
      const dx = canvasX - c.x;
      const dy = canvasY - c.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      if (dist < SINGULARITY_THRESHOLD) {
        nearSingularity = true;
        break;
      }
    }

    // Converter para metros (eixo correto)
    const xReal = (canvasX - canvas.width/2) * scale;
    labels.push(Number(xReal.toFixed(4)));

    if (nearSingularity) {
      // Quebra a linha perto da singularidade
      dataEx.push(null);
      dataEy.push(null);
      dataE.push(null);
    } else {
      const {Ex, Ey} = computeFieldAt(canvasX, canvasY, charges);
      const E = Math.sqrt(Ex*Ex + Ey*Ey);

      // Validar valores finitos
      if (!isFinite(Ex) || Math.abs(Ex) > MAX_FIELD) {
        dataEx.push(null);
      } else {
        dataEx.push(Number(Ex.toExponential(2)));
      }

      if (!isFinite(Ey) || Math.abs(Ey) > MAX_FIELD) {
        dataEy.push(null);
      } else {
        dataEy.push(Number(Ey.toExponential(2)));
      }

      if (!isFinite(E) || Math.abs(E) > MAX_FIELD) {
        dataE.push(null);
      } else {
        dataE.push(Number(E.toExponential(2)));
      }
    }
  }

  // Pós-processamento: detectar jumps drásticos e quebrar linhas
  const processData = (dataArray) => {
    const processed = [...dataArray];
    
    // Primeira passagem: detectar e marcar singularidades
    for (let i = 1; i < processed.length - 1; i++) {
      const prev = processed[i - 1];
      const curr = processed[i];
      const next = processed[i + 1];

      // Se tem um null, pula
      if (prev === null || curr === null || next === null) continue;

      // Detectar mudança drástica de sinal
      const signChange = (prev > 0 && next < 0) || (prev < 0 && next > 0);
      
      if (signChange) {
        // Marcar este ponto e vizinhos como null para criar gap maior
        processed[i] = null;
        // Expandir zona de null para ambos os lados
        if (i - 1 >= 0) processed[i - 1] = null;
        if (i + 1 < processed.length) processed[i + 1] = null;
        if (i - 2 >= 0) processed[i - 2] = null;
        if (i + 2 < processed.length) processed[i + 2] = null;
      }
    }
    
    return processed;
  };

  dataEx = processData(dataEx);
  dataEy = processData(dataEy);
  dataE = processData(dataE);

  // Destruir gráfico anterior se existir
  if (chartCampo) {
    chartCampo.destroy();
  }

  // Ler configurações de personalização do usuário
  const graphTitle = document.getElementById("graphTitle").value || "Campo Elétrico";
  const graphLabelX = document.getElementById("graphLabelX").value || "Posição x (m)";
  const graphLabelY = document.getElementById("graphLabelY").value || "Campo Elétrico (N/C)";
  const colorEx = document.getElementById("colorEx").value;
  const colorEy = document.getElementById("colorEy").value;
  const colorE = document.getElementById("colorE").value;

  // Função para gerar escala automática inteligente
  const generateSmartTicks = (minVal, maxVal) => {
    const range = maxVal - minVal;
    let step;
    
    // Decidir o passo baseado no range
    if (range <= 0.1) step = 0.01;
    else if (range <= 1) step = 0.1;
    else if (range <= 10) step = 1;
    else if (range <= 100) step = 10;
    else step = Math.pow(10, Math.floor(Math.log10(range)) - 1);
    
    const ticks = [];
    const start = Math.floor(minVal / step) * step;
    const end = Math.ceil(maxVal / step) * step;
    
    for (let i = start; i <= end; i += step) {
      ticks.push(Number(i.toFixed(10))); // Evita problemas de ponto flutuante
    }
    
    return { ticks, step };
  };

  // Gerar escala para eixo X
  const xMin = Math.min(...labels);
  const xMax = Math.max(...labels);
  const { ticks: xTicks, step: xStep } = generateSmartTicks(xMin, xMax);

  // Construir datasets dinamicamente baseado nas seleções
  const datasets = [];

  if (showEx) {
    datasets.push({
      label: "Eₓ (N/C)",
      data: dataEx,
      borderColor: colorEx,
      backgroundColor: colorEx + "1a",
      borderWidth: 2,
      tension: 0.2,
      spanGaps: false,
      pointRadius: 2,
      pointHoverRadius: 5
    });
  }

  if (showEy) {
    datasets.push({
      label: "Eᵧ (N/C)",
      data: dataEy,
      borderColor: colorEy,
      backgroundColor: colorEy + "1a",
      borderWidth: 2,
      tension: 0.2,
      spanGaps: false,
      pointRadius: 2,
      pointHoverRadius: 5
    });
  }

  if (showE) {
    datasets.push({
      label: "|E| (N/C)",
      data: dataE,
      borderColor: colorE,
      backgroundColor: colorE + "1a",
      borderWidth: 2.5,
      tension: 0.2,
      spanGaps: false,
      pointRadius: 1,
      borderDash: [5, 5]
    });
  }

  const ctx = document.getElementById("graficoCampo").getContext("2d");

  chartCampo = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      interaction: {
        mode: "index",
        intersect: false
      },
      plugins: {
        title: {
          display: true,
          text: graphTitle,
          font: {
            size: 16,
            weight: 'bold'
          }
        },
        legend: {
          display: true,
          position: 'top',
          labels: {
            padding: 15,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleFont: { size: 12 },
          bodyFont: { size: 11 },
          callbacks: {
            label: function(context) {
              const value = context.parsed.y;
              if (value === null) return `${context.dataset.label}: [singularidade]`;
              return `${context.dataset.label}: ${value}`;
            }
          }
        }
      },
      scales: {
        x: {
          type: 'linear',
          title: {
            display: true,
            text: graphLabelX,
            font: { size: 12, weight: 'bold' }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            callback: function(value) {
              return value.toFixed(xStep.toString().split('.')[1]?.length || 0);
            }
          }
        },
        y: {
          title: {
            display: true,
            text: graphLabelY,
            font: { size: 12, weight: 'bold' }
          },
          type: 'linear',
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        }
      }
    }
  });
}


//------------------ DOWNLOAD DO GRÁFICO ------------------//
function baixarGraficoCampo() {
  if (!chartCampo) {
    alert("Gere o gráfico primeiro!");
    return;
  }

  const canvas = document.getElementById("graficoCampo");
  const url = canvas.toDataURL("image/png");
  
  const link = document.createElement("a");
  link.download = "campo_eletrico.png";
  link.href = url;
  link.click();
}


function toggleTutorial() {
  const content = document.getElementById("tutorialContent");
  const icon = document.querySelector(".tutorial-icon");

  content.classList.toggle("open");

  if (content.classList.contains("open")) {
    content.style.display = "block";
    icon.textContent = "▲";
  } else {
    content.style.display = "none";
    icon.textContent = "▼";
  }
}



// =================== START ===================
update();

// =================== EXPOSIÇÃO GLOBAL ===================
// Expõe funções ao escopo global para os atributos onclick do HTML
window.addCharge = addCharge;
window.deleteSelected = deleteSelected;
window.updatePositionFromInputs = updatePositionFromInputs;
window.toggleField = toggleField;
window.gerarGraficoCampo = gerarGraficoCampo;
window.baixarGraficoCampo = baixarGraficoCampo;
window.toggleTutorial = toggleTutorial;