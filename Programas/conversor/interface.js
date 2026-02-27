// interface.js

import { grandezas } from "./grandezas.js";
import { converterValor, formatarNumero } from "./conversoes.js";

const selectGrandeza = document.getElementById("grandeza");
const unidadeOrigem = document.getElementById("unidadeOrigem");
const unidadeDestino = document.getElementById("unidadeDestino");
const resultado = document.getElementById("resultado");

const STORAGE_KEY = "conversorUnidadesPersonalizadas";
let unidadesPersistidas = {};

function loadPersistedUnits() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    unidadesPersistidas = data;
    for (let gName in data) {
      const g = grandezas[gName];
      if (!g) continue;
      // não mesclar unidades para grandezas com base em K (temperatura)
      if (g.base === "K") continue;
      for (let u in data[gName]) {
        if (g.unidades[u] === undefined) {
          g.unidades[u] = data[gName][u];
        }
      }
    }
  } catch (e) {
    console.error("Erro ao carregar unidades persistidas:", e);
  }
}

function savePersistedUnits() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(unidadesPersistidas));
  } catch (e) {
    console.error("Erro ao salvar unidades persistidas:", e);
  }
}

for (let g in grandezas) {
  const option = document.createElement("option");
  option.value = g;
  option.textContent = grandezas[g].nome;
  selectGrandeza.appendChild(option);
}

loadPersistedUnits();
selectGrandeza.addEventListener("change", atualizarUnidades);
atualizarUnidades();

function atualizarUnidades() {
  const g = grandezas[selectGrandeza.value];
  unidadeOrigem.innerHTML = "";
  unidadeDestino.innerHTML = "";

  for (let u in g.unidades) {
    unidadeOrigem.add(new Option(u, u));
    unidadeDestino.add(new Option(u, u));
  }
}

window.converter = function () {
  const g = grandezas[selectGrandeza.value];
  const valor = Number(document.getElementById("valor").value);
  const u1 = unidadeOrigem.value;
  const u2 = unidadeDestino.value;

  const r = converterValor(g, valor, u1, u2);
  resultado.innerText = `Resultado: ${formatarNumero(r)} ${u2}`;
};

// Função para exibir mensagem inline no card de unidade personalizada
function mostrarMensagemUnidade(texto, tipo = "erro") {
  const el = document.getElementById("mensagemUnidade");
  if (!el) return;
  el.textContent = texto;
  el.classList.remove("sucesso", "erro");
  el.classList.add(tipo === "sucesso" ? "sucesso" : "erro");
  clearTimeout(mostrarMensagemUnidade._timeout);
  mostrarMensagemUnidade._timeout = setTimeout(() => {
    el.textContent = "";
    el.classList.remove("sucesso", "erro");
  }, 4000);
}

// Função para adicionar unidade personalizada à grandeza selecionada
window.adicionarUnidade = function () {
  const nomeInput = document.getElementById("nomeUnidade");
  const fatorInput = document.getElementById("fatorSI");
  const nome = nomeInput.value.trim();
  const fator = Number(fatorInput.value);
  const g = grandezas[selectGrandeza.value];

  if (!nome) {
    mostrarMensagemUnidade("Digite um nome para a unidade.", "erro");
    nomeInput.focus();
    return;
  }

  if (!isFinite(fator) || fator <= 0) {
    mostrarMensagemUnidade("Insira um fator SI válido (maior que 0).", "erro");
    fatorInput.focus();
    return;
  }

  // Unidades de temperatura usam funções especiais — não suportamos adicionar aqui
  if (g.base === "K") {
    mostrarMensagemUnidade("Adicionar unidades personalizadas não é suportado para Temperatura.", "erro");
    return;
  }

  if (g.unidades[nome] !== undefined) {
    mostrarMensagemUnidade("Essa unidade já existe para a grandeza selecionada.", "erro");
    return;
  }

  // Adiciona e atualiza os selects
  g.unidades[nome] = fator;

  // Persiste a unidade adicionada
  unidadesPersistidas[selectGrandeza.value] = unidadesPersistidas[selectGrandeza.value] || {};
  unidadesPersistidas[selectGrandeza.value][nome] = fator;
  savePersistedUnits();

  atualizarUnidades();
  unidadeOrigem.value = nome;
  unidadeDestino.value = nome;

  // Limpa inputs e informa sucesso
  nomeInput.value = "";
  fatorInput.value = "";
  mostrarMensagemUnidade(`Unidade "${nome}" adicionada com sucesso.`, "sucesso");
};
