import {
  computeForce,
  computeNetForce,
  computeFieldAt
} from "./physics.js";

import { k, scale } from "./physics.js";

// =================== ELEMENTOS DO DOM ===================
// Obtém referência ao canvas onde tudo será desenhado
const canvas = document.getElementById("canvas");

// Contexto 2D do canvas para desenhar formas, linhas e textos
const ctx = canvas.getContext("2d");

// Painel lateral que exibe informações sobre as cargas e forças
const infoPanel = document.getElementById("infoPanel");

// Container que envolve o canvas (usado para cálculos de dimensão)
const container = document.querySelector(".canvas-container");

// =================== PALETA DE CORES ===================
// Define as cores visuais usadas em toda a simulação
const COLORS = {
  positive: "#fb923c",   // laranja para cargas positivas
  negative: "#2f5bea",   // azul para cargas negativas
  force: "#facc15",      // amarelo para o vetor de força resultante
  forceIndividual: "#ef4444", // vermelho para forças individuais
  field: "rgba(106,47,232,0.5)", // roxo semi-transparente para o campo elétrico
  axis: "#9ca3af",       // cinza para os eixos coordenados
  selected: "#1e2a78"    // azul escuro para destacar uma carga selecionada
};

// =================== ESTADO GLOBAL ===================
// Array que armazena todas as cargas criadas no simulador
let charges = [];

// Referência à carga que está selecionada (pode ser null)
let selectedCharge = null;

// Referência à carga que está sendo arrastada com o mouse (pode ser null)
let dragging = null;

// Flag que controla se o campo elétrico deve ser visualizado
let showField = true;

// Escala do simulador (pixels por unidade de distância)
// 1 = 1 pixel = 1 cm, 10 = 1 pixel = 10 cm, 100 = 1 pixel = 1 m
let pixelsPerUnit = 100;

// =================== REFERÊNCIAS AOS INPUTS ===================
// Input que controla a magnitude da carga a ser criada
const chargeInput = document.getElementById("chargeValue");

// Inputs para as coordenadas x e y da carga selecionada
const inputX = document.getElementById("posX");
const inputY = document.getElementById("posY");

// Variável que armazena o valor atual da magnitude de carga
let chargeMagnitude = parseFloat(chargeInput.value);

// Atualiza a magnitude quando o usuário muda o input
chargeInput.addEventListener("input", e => {
  chargeMagnitude = parseFloat(e.target.value);
});

// =================== REDIMENSIONAMENTO DO CANVAS ===================
/**
 * Ajusta as dimensões do canvas para ocupar todo o espaço disponível
 * É chamada quando a janela é redimensionada
 */
function resizeCanvas() {
  // Define largura e altura do canvas = tamanho do container
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;

  // Mantém o painel de informações com a mesma largura do canvas
  infoPanel.style.maxWidth = container.clientWidth + "px";
}

// Redimensiona o canvas quando a janela muda de tamanho
window.addEventListener("resize", resizeCanvas);

// Redimensiona o canvas na primeira vez que a página carrega
resizeCanvas();

// =================== FUNÇÕES UTILITÁRIAS ===================
/**
 * Formata um número em notação científica (ex: 2.5 × 10³)
 * Útil para exibir números muito grandes ou muito pequenos
 * 
 * @param {number} num - O número a ser formatado
 * @returns {string} String em formato de notação científica com HTML
 */
function formatSci(num) {
  // Se o número é zero, retorna "0"
  if (num === 0) return "0";
  
  // Calcula o expoente (potência de 10)
  const exp = Math.floor(Math.log10(Math.abs(num)));
  
  // Calcula a mantissa (número antes do × 10^n)
  const mant = num / Math.pow(10, exp);
  
  // Retorna formatado como "2.50 × 10<sup>3</sup>" (HTML com sobrescrito)
  return `${mant.toFixed(2)} × 10<sup>${exp}</sup>`;
}

/**
 * Converte coordenadas do canvas (pixels) para coordenadas do mundo físico
 * O canvas tem origem (0,0) no topo-esquerdo, mas a física usa origem no centro
 * Eixo Y é invertido no canvas (positivo para baixo), mas é positivo para cima na física
 * 
 * @param {number} x - Coordenada x no canvas (pixels)
 * @param {number} y - Coordenada y no canvas (pixels)
 * @returns {Object} Objeto com coordenadas {x, y} no sistema de coordenadas do mundo físico
 */
function toWorld(x, y) {
  // Converte pixels para metros usando a escala
  // pixelsPerUnit: 1 = 1 cm, 10 = 10 cm, 100 = 1 m
  return {
    x: (x - canvas.width / 2) / pixelsPerUnit,
    y: (canvas.height / 2 - y) / pixelsPerUnit
  };
}

/**
 * Converte coordenadas do mundo físico para o canvas (pixels)
 * É o inverso da função toWorld()
 * 
 * @param {number} x - Coordenada x no sistema de mundo
 * @param {number} y - Coordenada y no sistema de mundo
 * @returns {Object} Objeto com coordenadas {x, y} no canvas (pixels)
 */
function toCanvas(x, y) {
  // Converte metros para pixels usando a escala
  return {
    x: x * pixelsPerUnit + canvas.width / 2,
    y: canvas.height / 2 - y * pixelsPerUnit
  };
}

// =================== CLASSE CHARGE (CARGA ELÉTRICA) ===================
/**
 * Classe que representa uma carga elétrica ponitual no espaço
 * Armazena posição, magnitude de carga, e pode desenhar a si mesma
 */
class Charge {
  /**
   * Cria uma nova carga elétrica
   * 
   * @param {number} x - Coordenada x no canvas (pixels)
   * @param {number} y - Coordenada y no canvas (pixels)
   * @param {number} qMicro - Magnitude da carga em microcoulombs (µC)
   */
  constructor(x, y, qMicro) {
    this.x = x;                    // Posição x em pixels
    this.y = y;                    // Posição y em pixels
    this.qMicro = qMicro;          // Carga em microcoulombs
  }

  /**
   * Getter que converte a carga de microcoulombs para coulombs
   * Usada nos cálculos de força e campo elétrico
   * 1 µC = 10⁻⁶ C
   * 
   * @returns {number} Carga em coulombs
   */
  get q() {
    return this.qMicro * 1e-6;
  }

  /**
   * Desenha a carga no canvas
   * Mostra um círculo colorido (laranja para positivo, azul para negativo)
   * com a magnitude da carga escrita dentro
   */
  draw() {
    // Limita o tamanho visual máximo da carga a 10 µC para não ficar gigante
    const visualQ = Math.min(Math.abs(this.qMicro), 10);
    
    // Raio do círculo: mínimo 12 pixels, máximo aumenta com magnitude de carga
    const r = Math.max(12, visualQ * 3);

    // Desenha o círculo
    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
    
    // Cor baseada no sinal da carga
    ctx.fillStyle = this.qMicro > 0 ? COLORS.positive : COLORS.negative;
    ctx.fill();

    // Se esta é a carga selecionada, desenha um contorno especial
    if (this === selectedCharge) {
      ctx.strokeStyle = COLORS.selected;
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    // Desenha o valor da carga dentro do círculo em branco
    ctx.fillStyle = "white";
    ctx.font = "13px Inter";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.qMicro.toFixed(1), this.x, this.y);
  }
}

// =================== FUNÇÕES DE MANIPULAÇÃO DE CARGAS ===================
/**
 * Adiciona uma nova carga ao simulador com posição aleatória
 * 
 * @param {number} sign - Sinal da carga: 1 para positiva, -1 para negativa
 * 
 * Funcionamento:
 * 1. Cria uma nova instância de Charge
 * 2. Posição x e y aleatórias dentro do canvas
 * 3. Magnitude de carga vem do input "chargeValue"
 * 4. Adiciona ao array global "charges"
 */
function addCharge(sign) {
  charges.push(new Charge(
    Math.random() * canvas.width,    // x aleatório
    Math.random() * canvas.height,   // y aleatório
    sign * chargeMagnitude           // q = ±valor do input
  ));
}

/**
 * Remove a carga selecionada do simulador
 * Não faz nada se nenhuma carga estiver selecionada
 */
function deleteSelected() {
  if (!selectedCharge) return;
  
  // Filtra o array removendo a carga selecionada
  charges = charges.filter(c => c !== selectedCharge);
  
  // Limpa a seleção
  selectedCharge = null;
}

/**
 * Atualiza a posição da carga selecionada baseado nos inputs de coordenadas
 * Os valores dos inputs estão em centímetros (cm), convertemos para pixels
 */
function updatePositionFromInputs() {
  if (!selectedCharge) return;

  // Lê os valores dos inputs
  const x = parseFloat(inputX.value);
  const y = parseFloat(inputY.value);

  // Converte de coordenadas de mundo para pixels no canvas
  const pos = toCanvas(x, y);
  
  // Atualiza a posição da carga
  selectedCharge.x = pos.x;
  selectedCharge.y = pos.y;
}

/**
 * Alterna a visualização do campo elétrico
 * Se está visível, fica invisível. Se invisível, fica visível.
 */
function toggleField() {
  showField = !showField;
}

/**
 * Atualiza a escala do simulador baseado na seleção do usuário
 */
function updateScale() {
  const select = document.getElementById("scaleSelect");
  pixelsPerUnit = parseInt(select.value);
}


// =================== FUNÇÕES DE DESENHO DO CAMPO ELÉTRICO ===================
/**
 * Desenha o campo elétrico em todo o canvas como um conjunto de setas
 * Cada seta mostra a direção e magnitude do campo naquela posição
 * 
 * Funcionamento:
 * 1. Cria uma grade de pontos uniformemente espaçados no canvas
 * 2. Para cada ponto, calcula o campo elétrico usando computeFieldAt()
 * 3. Desenha uma seta apontando na direção do campo (e com tamanho proporcional à magnitude)
 */
function drawField() {
  // Espaçamento entre as setas da grade em pixels (maior = menos setas, mais rápido)
  const spacing = 30;
  
  // Tamanho de cada seta em pixels
  const arrowLen = 15;

  // Itera sobre todos os pontos da grade
  for (let px = 0; px < canvas.width; px += spacing) {
    for (let py = 0; py < canvas.height; py += spacing) {
      // Calcula o campo elétrico neste ponto
      const {Ex, Ey} = computeFieldAt(px, py, charges);

      // Calcula a magnitude do campo
      const mag = Math.sqrt(Ex*Ex + Ey*Ey);
      
      // Se o campo é praticamente zero, pula para o próximo ponto
      if (mag === 0) continue;

      // Normaliza o campo para obter um vetor unitário (apenas direção)
      const ux = Ex / mag;
      const uy = Ey / mag;

      // Calcula o ponto final da seta
      const endX = px + ux * arrowLen;
      const endY = py + uy * arrowLen;

      // Desenha a linha da seta
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = COLORS.field;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Desenha a ponta da seta (triângulo)
      const angle = Math.atan2(uy, ux);
      const size = 5;

      ctx.beginPath();
      ctx.moveTo(endX, endY);
      // Desenha duas linhas que formam a ponta triangular
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

// =================== FUNÇÕES DE DESENHO DOS EIXOS ===================
/**
 * Desenha os eixos coordenados (x e y) no centro do canvas
 * Com marcas e valores de distância baseados na escala atual
 */
function drawAxes() {
  // Cor e espessura das linhas dos eixos
  ctx.strokeStyle = COLORS.axis;
  ctx.lineWidth = 1.2;

  // Desenha o eixo x (horizontal) no meio do canvas
  ctx.beginPath();
  ctx.moveTo(0, canvas.height/2);
  ctx.lineTo(canvas.width, canvas.height/2);
  ctx.stroke();

  // Desenha o eixo y (vertical) no meio do canvas
  ctx.beginPath();
  ctx.moveTo(canvas.width/2, 0);
  ctx.lineTo(canvas.width/2, canvas.height);
  ctx.stroke();

  // Configurações para as marcas e labels
  ctx.fillStyle = "#6b7280";
  ctx.font = "11px Inter";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  // Centro do canvas
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  // Determina a unidade e espaçamento baseado na escala
  let unit, spacing, unitLabel;
  if (pixelsPerUnit === 1) {
    // 1 pixel = 1 cm
    unit = "cm";
    spacing = 100;  // 100 cm = 1 m
    unitLabel = "cm";
  } else if (pixelsPerUnit === 10) {
    // 1 pixel = 10 cm
    unit = "cm";
    spacing = 10;  // 10 pixels = 100 cm = 1 m
    unitLabel = "m";
  } else {
    // 1 pixel = 1 m
    unit = "m";
    spacing = 100;  // 100 pixels = 100 m
    unitLabel = "m";
  }
  
  // Desenha marcas no eixo X (direita do centro)
  for (let px = centerX + spacing; px < canvas.width; px += spacing) {
    const value = Math.round((px - centerX) / pixelsPerUnit);
    if (value > 0) {
      // Marca
      ctx.beginPath();
      ctx.moveTo(px, centerY - 5);
      ctx.lineTo(px, centerY + 5);
      ctx.stroke();
      // Label
      const label = pixelsPerUnit >= 100 ? (value / 100) + " " + unitLabel : value + " " + unit;
      ctx.fillText(label, px, centerY + 8);
    }
  }
  
  // Desenha marcas no eixo X (esquerda do centro)
  for (let px = centerX - spacing; px > 0; px -= spacing) {
    const value = Math.round((centerX - px) / pixelsPerUnit);
    if (value > 0) {
      ctx.beginPath();
      ctx.moveTo(px, centerY - 5);
      ctx.lineTo(px, centerY + 5);
      ctx.stroke();
      const label = pixelsPerUnit >= 100 ? (value / 100) + " " + unitLabel : value + " " + unit;
      ctx.fillText("-" + label, px, centerY + 8);
    }
  }

  // Marca o eixo Y (para cima do centro - valores positivos)
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  
  for (let py = centerY - spacing; py > 0; py -= spacing) {
    const value = Math.round((centerY - py) / pixelsPerUnit);
    if (value > 0) {
      ctx.beginPath();
      ctx.moveTo(centerX - 5, py);
      ctx.lineTo(centerX + 5, py);
      ctx.stroke();
      const label = pixelsPerUnit >= 100 ? (value / 100) + " " + unitLabel : value + " " + unit;
      ctx.fillText(label, centerX - 8, py);
    }
  }
  
  // Marca o eixo Y (para baixo do centro - valores negativos)
  for (let py = centerY + spacing; py < canvas.height; py += spacing) {
    const value = Math.round((py - centerY) / pixelsPerUnit);
    if (value > 0) {
      ctx.beginPath();
      ctx.moveTo(centerX - 5, py);
      ctx.lineTo(centerX + 5, py);
      ctx.stroke();
      const label = pixelsPerUnit >= 100 ? (value / 100) + " " + unitLabel : value + " " + unit;
      ctx.fillText("-" + label, centerX - 8, py);
    }
  }

  // Label "0" no centro
  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  ctx.fillText("0", centerX - 8, centerY + 8);
}

// =================== FUNÇÕES DE DESENHO DO VETOR DE FORÇA ===================
/**
 * Desenha uma seta representando um vetor de força
 * 
 * @param {number} startX - Posição x inicial (pixels)
 * @param {number} startY - Posição y inicial (pixels)
 * @param {number} endX - Posição x final (pixels)
 * @param {number} endY - Posição y final (pixels)
 * @param {string} color - Cor da seta
 * @param {number} lineWidth - Espessura da linha
 * @param {number} arrowSize - Tamanho da ponta da seta
 */
function drawArrow(startX, startY, endX, endY, color, lineWidth = 2, arrowSize = 8) {
  // Desenha a linha da seta
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.stroke();

  // Calcula o ângulo da seta
  const dx = endX - startX;
  const dy = endY - startY;
  const angle = Math.atan2(dy, dx);

  // Desenha a ponta triangular da seta
  ctx.beginPath();
  ctx.moveTo(endX, endY);
  ctx.lineTo(
    endX - arrowSize * Math.cos(angle - Math.PI/6),
    endY - arrowSize * Math.sin(angle - Math.PI/6)
  );
  ctx.lineTo(
    endX - arrowSize * Math.cos(angle + Math.PI/6),
    endY - arrowSize * Math.sin(angle + Math.PI/6)
  );
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

/**
 * Desenha os vetores de força sobre a carga selecionada:
 * - Setas vermelhas menores para cada força individual
 * - Seta amarela maior para a força resultante
 * 
 * Funcionamento:
 * 1. Para cada outra carga, calcula a força que ela exerce sobre a carga selecionada
 * 2. Desenha uma seta vermelha pequena para cada força individual
 * 3. Calcula e desenha a força resultante em amarelo
 */
function drawForceVector() {
  // Se nenhuma carga está selecionada, não desenha nada
  if (!selectedCharge) return;

  // Primeiro, desenha as forças individuais de cada carga
  let totalFx = 0;
  let totalFy = 0;

  charges.forEach(otherCharge => {
    // Ignora a carga selecionada (ela não exerce força sobre si mesma)
    if (otherCharge === selectedCharge) return;

    // Calcula a força que esta carga exerce sobre a carga selecionada
    const {x: fx, y: fy} = computeForce(selectedCharge, otherCharge);
    
    // Soma para obter a força resultante
    totalFx += fx;
    totalFy += fy;

    // Calcula a magnitude desta força individual
    const mag = Math.sqrt(fx*fx + fy*fy);
    
    // Se a força é muito pequena, não desenha
    if (mag < 1e-10) return;

    // Normaliza o vetor para obter a direção
    const ux = fx / mag;
    const uy = -fy / mag; // Inverte y para o canvas

    // Tamanho da seta de força individual (20% maior que antes)
    const length = Math.min(96, 36 + mag * 0.00015);

    // Desenha a seta individual
    drawArrow(
      selectedCharge.x,
      selectedCharge.y,
      selectedCharge.x + ux * length,
      selectedCharge.y + uy * length,
      COLORS.forceIndividual,
      2.5,
      8
    );
  });

  // Agora desenha a força resultante
  const resultMag = Math.sqrt(totalFx*totalFx + totalFy*totalFy);
  
  // Se a força resultante é muito pequena, não desenha
  if (resultMag < 1e-10) return;

  // Normaliza a força resultante
  const ux = totalFx / resultMag;
  const uy = -totalFy / resultMag;

  // Tamanho da seta proporcional (30% maior que as vermelhas)
  const length = 52 + resultMag * 0.00052;  // ~30% maior que a fórmula das vermelhas

  // Desenha a seta da força resultante
  drawArrow(
    selectedCharge.x,
    selectedCharge.y,
    selectedCharge.x + ux * length,
    selectedCharge.y + uy * length,
    COLORS.force,
    4,
    12
  );
}



// =================== FUNÇÕES DE ATUALIZAÇÃO DO PAINEL DE INFORMAÇÕES ===================
/**
 * Atualiza o painel lateral que mostra:
 * 1. Tabela com todas as cargas (posição e magnitude)
 * 2. Força resultante sobre a carga selecionada (Fx, Fy, |F|)
 * 
 * Funcionamento:
 * 1. Cria HTML com uma tabela listando todas as cargas
 * 2. Se uma carga está selecionada, calcula e exibe a força resultante
 * 3. Insere todo o HTML no painel
 */
function updateInfoPanel() {
  // Começa com um heading
  let html = `<h3>📊 Cargas</h3>`;

  // Cria a tabela de cargas
  html += `<table class="table">
    <tr>
      <th>#</th><th>q (µC)</th><th>x (cm)</th><th>y (cm)</th>
    </tr>`;

  // Itera sobre cada carga e adiciona uma linha à tabela
  charges.forEach((c, i) => {
    // Converte posição do canvas para coordenadas de mundo
    const w = toWorld(c.x, c.y);
    
    // Marca como "selected" se for a carga selecionada (para CSS destacar)
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

  // Se uma carga está selecionada, mostra as forças resultantes
  if (selectedCharge) {
    // Calcula a força resultante sobre a carga selecionada
    const {fx, fy} = computeNetForce(selectedCharge, charges);
    
    // Calcula a magnitude da força
    const f = Math.sqrt(fx*fx + fy*fy);

    // Cria uma caixa com as informações de força
    html += `
      <div class="force-box">
        Fx = ${formatSci(fx)} N<br>
        Fy = ${formatSci(fy)} N<br>
        <div class="force-main">|F| = ${formatSci(f)} N</div>
      </div>
    `;
  }

  // Insere o HTML no painel
  infoPanel.innerHTML = html;
}

// =================== LOOP DE ANIMAÇÃO ===================
/**
 * Função principal que roda em loop para animar a simulação
 * É chamada a cada quadro (60 vezes por segundo com requestAnimationFrame)
 * 
 * Funcionamento:
 * 1. Limpa o canvas (apaga tudo que foi desenhado antes)
 * 2. Desenha o campo elétrico (se ativado)
 * 3. Desenha os eixos coordenados
 * 4. Desenha o vetor de força sobre a carga selecionada
 * 5. Desenha todas as cargas
 * 6. Atualiza o painel de informações
 * 7. Agenda a próxima execução desta função
 */
function update() {
  // Limpa todo o canvas (retangular de 0,0 até canvas.width, canvas.height)
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha o campo elétrico se estiver ativado
  if (showField) drawField();

  // Desenha os eixos x e y
  drawAxes();
  
  // Desenha o vetor de força sobre a carga selecionada
  drawForceVector();

  // Desenha todas as cargas no canvas
  charges.forEach(c => c.draw());

  // Atualiza o painel lateral com informações sobre as cargas e forças
  updateInfoPanel();

  // Agenda a próxima execução desta função no próximo quadro
  requestAnimationFrame(update);
}

// =================== FUNÇÕES DE INTERAÇÃO COM MOUSE ===================
/**
 * Evento: Quando o mouse é pressionado no canvas
 * Verifica se clicou em alguma carga (para selecioná-la ou arrastá-la)
 */
canvas.addEventListener("mousedown", e => {
  // Obtém a posição do mouse relativa ao canvas
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  // Limpa seleção anterior
  selectedCharge = null;
  dragging = null;

  // Verifica se clicou em alguma carga
  charges.forEach(c => {
    const dx = mx - c.x;
    const dy = my - c.y;

    // Se a distância do mouse até a carga é menor que 20 pixels, está dentro da hitbox
    if (Math.sqrt(dx*dx + dy*dy) < 20) {
      // Seleciona e marca para arrastamento
      selectedCharge = c;
      dragging = c;

      // Preenche os inputs de posição com as coordenadas da carga
      const w = toWorld(c.x, c.y);
      inputX.value = w.x.toFixed(0);
      inputY.value = w.y.toFixed(0);
    }
  });
});

/**
 * Evento: Quando o mouse se move sobre o canvas
 * Se uma carga está sendo arrastada, segue o mouse
 */
canvas.addEventListener("mousemove", e => {
  if (dragging) {
    const rect = canvas.getBoundingClientRect();
    // Atualiza a posição da carga arrastada para seguir o mouse
    dragging.x = e.clientX - rect.left;
    dragging.y = e.clientY - rect.top;
  }
});

/**
 * Evento: Quando o mouse é solto (para de arrastar a carga)
 */
canvas.addEventListener("mouseup", () => {
  dragging = null;
});

//================== FUNÇÕES DE GRÁFICOS DO CAMPO ELÉTRICO =================

// Variável global que armazena a instância do gráfico Chart.js
// Usada para destruir o gráfico anterior quando um novo é criado
let chartCampo = null;

/**
 * Gera gráficos do campo elétrico ao longo do eixo x
 * Permite escolher quais componentes visualizar: Eₓ, Eᵧ, ou |E|
 * 
 * Funcionamento:
 * 1. Coleta dados do campo elétrico em vários pontos ao longo do eixo x
 * 2. Trata singularidades (pontos muito perto de cargas onde E → ∞)
 * 3. Cria um gráfico interativo usando Chart.js
 * 4. Permite personalizar título, labels e cores
 */
function gerarGraficoCampo() {
  // Verifica se há pelo menos uma carga
  if (charges.length === 0) {
    alert("Adicione pelo menos uma carga para gerar o gráfico!");
    return;
  }

  // Lê as checkboxes do usuário para saber quais componentes mostrar
  const showEx = document.getElementById("showEx").checked;  // Campo em x?
  const showEy = document.getElementById("showEy").checked;  // Campo em y?
  const showE = document.getElementById("showE").checked;    // Magnitude do campo?

  // Verifica se pelo menos uma opção foi selecionada
  if (!showEx && !showEy && !showE) {
    alert("Selecione pelo menos um componente (Eₓ, Eᵧ ou |E|)!");
    return;
  }

  // Arrays que armazenarão os dados do gráfico
  const labels = [];    // Posições x em metros
  let dataEx = [];      // Componente Eₓ do campo
  let dataEy = [];      // Componente Eᵧ do campo
  let dataE = [];       // Magnitude |E| do campo

  // Resolução de coleta de dados em pixels (menor = mais pontos, mais lento)
  const step = 3;
  
  // Distância mínima de uma carga para considerar a singularidade
  const SINGULARITY_THRESHOLD = 15;
  
  // Valor máximo de campo para evitar valores absurdos perto de cargas
  const MAX_FIELD = 1e5;

  // Percorre o canvas ao longo do eixo x (no meio da altura)
  for (let x = 0; x < canvas.width; x += step) {
    const canvasX = x;
    const canvasY = canvas.height / 2;  // Sempre no meio (eixo x)

    // Verifica se está muito perto de uma carga (singularidade)
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

    // Converte a posição do canvas para metros (coordenadas de mundo)
    const xReal = (canvasX - canvas.width/2) * scale;
    labels.push(Number(xReal.toFixed(4)));

    // Se está perto de uma singularidade, não computa (deixa null para quebrar a linha)
    if (nearSingularity) {
      dataEx.push(null);
      dataEy.push(null);
      dataE.push(null);
    } else {
      // Calcula o campo neste ponto
      const {Ex, Ey} = computeFieldAt(canvasX, canvasY, charges);
      const E = Math.sqrt(Ex*Ex + Ey*Ey);

      // Armazena Eₓ (se for um número válido e dentro dos limites)
      if (!isFinite(Ex) || Math.abs(Ex) > MAX_FIELD) {
        dataEx.push(null);
      } else {
        dataEx.push(Number(Ex.toExponential(2)));
      }

      // Armazena Eᵧ (se for um número válido e dentro dos limites)
      if (!isFinite(Ey) || Math.abs(Ey) > MAX_FIELD) {
        dataEy.push(null);
      } else {
        dataEy.push(Number(Ey.toExponential(2)));
      }

      // Armazena |E| (se for um número válido e dentro dos limites)
      if (!isFinite(E) || Math.abs(E) > MAX_FIELD) {
        dataE.push(null);
      } else {
        dataE.push(Number(E.toExponential(2)));
      }
    }
  }

  /**
   * Função auxiliar: processa dados para detectar e marcar mudanças drásticas de sinal
   * Isso ajuda a quebrar a linha do gráfico nas singularidades
   * 
   * @param {Array} dataArray - Array de dados do campo
   * @returns {Array} Array processado com null nos pontos de descontinuidade
   */
  const processData = (dataArray) => {
    const processed = [...dataArray];
    
    // Passa pelos dados procurando por mudanças drásticas de sinal
    for (let i = 1; i < processed.length - 1; i++) {
      const prev = processed[i - 1];
      const curr = processed[i];
      const next = processed[i + 1];

      // Pula se houver null (já está quebrado)
      if (prev === null || curr === null || next === null) continue;

      // Detecta mudança de sinal (positivo para negativo ou vice-versa)
      const signChange = (prev > 0 && next < 0) || (prev < 0 && next > 0);
      
      if (signChange) {
        // Marca este ponto e vizinhos como null para criar um gap visual maior
        processed[i] = null;
        if (i - 1 >= 0) processed[i - 1] = null;
        if (i + 1 < processed.length) processed[i + 1] = null;
        if (i - 2 >= 0) processed[i - 2] = null;
        if (i + 2 < processed.length) processed[i + 2] = null;
      }
    }
    
    return processed;
  };

  // Processa os dados para marcar descontinuidades
  dataEx = processData(dataEx);
  dataEy = processData(dataEy);
  dataE = processData(dataE);

  // Destrói o gráfico anterior se existir (evita criar múltiplos gráficos)
  if (chartCampo) {
    chartCampo.destroy();
  }

  // Lê as configurações personalizadas do usuário
  const graphTitle = document.getElementById("graphTitle").value || "Campo Elétrico";
  const graphLabelX = document.getElementById("graphLabelX").value || "Posição x (m)";
  const graphLabelY = document.getElementById("graphLabelY").value || "Campo Elétrico (N/C)";
  const colorEx = document.getElementById("colorEx").value;
  const colorEy = document.getElementById("colorEy").value;
  const colorE = document.getElementById("colorE").value;

  /**
   * Gera uma escala inteligente para o eixo x baseada no range dos dados
   * 
   * @param {number} minVal - Valor mínimo
   * @param {number} maxVal - Valor máximo
   * @returns {Object} Objeto com {ticks: array de marcas, step: incremento}
   */
  const generateSmartTicks = (minVal, maxVal) => {
    const range = maxVal - minVal;
    let step;
    
    // Decide o tamanho do passo baseado no range
    if (range <= 0.1) step = 0.01;
    else if (range <= 1) step = 0.1;
    else if (range <= 10) step = 1;
    else if (range <= 100) step = 10;
    else step = Math.pow(10, Math.floor(Math.log10(range)) - 1);
    
    const ticks = [];
    const start = Math.floor(minVal / step) * step;
    const end = Math.ceil(maxVal / step) * step;
    
    // Gera as marcas do eixo
    for (let i = start; i <= end; i += step) {
      ticks.push(Number(i.toFixed(10)));
    }
    
    return { ticks, step };
  };

  // Gera escala para o eixo x
  const xMin = Math.min(...labels);
  const xMax = Math.max(...labels);
  const { ticks: xTicks, step: xStep } = generateSmartTicks(xMin, xMax);

  // Monta os datasets do gráfico dinamicamente baseado na seleção do usuário
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

  // Obtém o contexto 2D do canvas do gráfico
  const ctx = document.getElementById("graficoCampo").getContext("2d");

  // Cria o novo gráfico com Chart.js
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

//================== FUNÇÕES DE DOWNLOAD DO GRÁFICO =================

/**
 * Baixa o gráfico do campo elétrico como uma imagem PNG
 * Usa a funcionalidade nativa do canvas para exportar como imagem
 */
function baixarGraficoCampo() {
  // Verifica se há um gráfico para baixar
  if (!chartCampo) {
    alert("Gere o gráfico primeiro!");
    return;
  }

  // Obtém o canvas do gráfico
  const canvas = document.getElementById("graficoCampo");
  
  // Converte o canvas para URL de imagem (PNG)
  const url = canvas.toDataURL("image/png");
  
  // Cria um link de download
  const link = document.createElement("a");
  link.download = "campo_eletrico.png";  // Nome do arquivo
  link.href = url;
  
  // Simula um clique para fazer o download
  link.click();
}

//================== FUNÇÕES DE TUTORIAL =================

/**
 * Alterna a visibilidade do tutorial (expande ou recolhe)
 */
function toggleTutorial() {
  const content = document.getElementById("tutorialContent");
  const icon = document.querySelector(".tutorial-icon");

  // Alterna a classe "open" para mostrar/esconder o conteúdo
  content.classList.toggle("open");

  // Atualiza o ícone (▲ para aberto, ▼ para fechado)
  if (content.classList.contains("open")) {
    content.style.display = "block";
    icon.textContent = "▲";
  } else {
    content.style.display = "none";
    icon.textContent = "▼";
  }
}

//================== INICIALIZAÇÃO E EXPOSIÇÃO GLOBAL =================

// Inicia o loop de animação principal
update();

/**
 * Expõe as funções ao escopo global (window) para que os atributos onclick no HTML possam chamá-las
 * Sem isso, os botões HTML não conseguem chamar essas funções
 */
window.addCharge = addCharge;
window.deleteSelected = deleteSelected;
window.updatePositionFromInputs = updatePositionFromInputs;
window.toggleField = toggleField;
window.gerarGraficoCampo = gerarGraficoCampo;
window.baixarGraficoCampo = baixarGraficoCampo;
window.toggleTutorial = toggleTutorial;