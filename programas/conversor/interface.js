// interface.js

import { grandezas } from "./grandezas.js";
import { converterValor, converterComposto, formatarNumero } from "./conversoes.js";

const STORAGE_KEY = "conversorUnidadesPersonalizadas_v2";
let customUnits = {};

// ── BOOTSTRAP ──────────────────────────────────────────────────────────────

loadPersistedUnits();
initSimples();
initComposto();
initPersonalizado();

// ── PERSISTÊNCIA ───────────────────────────────────────────────────────────

function loadPersistedUnits() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
      || localStorage.getItem("conversorUnidadesPersonalizadas")
      || "{}";
    const data = JSON.parse(raw);
    for (const gName in data) {
      const g = grandezas[gName];
      if (!g || g.base === "K") continue;
      customUnits[gName] = customUnits[gName] || {};
      for (const simbolo in data[gName]) {
        const entry = data[gName][simbolo];
        const fator = typeof entry === "number" ? entry : entry.fator;
        const nome  = typeof entry === "number" ? simbolo : (entry.nome || simbolo);
        customUnits[gName][simbolo] = { fator, nome };
        if (g.unidades[simbolo] === undefined) {
          g.unidades[simbolo] = fator;
        }
      }
    }
  } catch (e) {
    console.error("Erro ao carregar unidades personalizadas:", e);
  }
}

function savePersistedUnits() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customUnits));
  } catch (e) {
    console.error("Erro ao salvar unidades personalizadas:", e);
  }
}

// ── CONVERSOR SIMPLES ───────────────────────────────────────────────────────

function initSimples() {
  const selGrandeza = document.getElementById("grandeza");

  for (const g in grandezas) {
    selGrandeza.add(new Option(grandezas[g].nome, g));
  }

  selGrandeza.addEventListener("change", atualizarUnidadesSimples);
  atualizarUnidadesSimples();

  document.getElementById("btnConverter").addEventListener("click", converterSimples);
}

function atualizarUnidadesSimples() {
  const key = document.getElementById("grandeza").value;
  const g   = grandezas[key];
  const selOrigem  = document.getElementById("unidadeOrigem");
  const selDestino = document.getElementById("unidadeDestino");
  selOrigem.innerHTML  = "";
  selDestino.innerHTML = "";

  for (const simbolo in g.unidades) {
    const label = customUnits[key]?.[simbolo]
      ? `${customUnits[key][simbolo].nome} (${simbolo})`
      : simbolo;
    selOrigem.add(new Option(label, simbolo));
    selDestino.add(new Option(label, simbolo));
  }

  if (selDestino.options.length > 1) selDestino.selectedIndex = 1;
}

function converterSimples() {
  const key    = document.getElementById("grandeza").value;
  const g      = grandezas[key];
  const valor  = Number(document.getElementById("valor").value);
  const u1     = document.getElementById("unidadeOrigem").value;
  const u2     = document.getElementById("unidadeDestino").value;
  const result = converterValor(g, valor, u1, u2);

  const label1 = customUnits[key]?.[u1] ? `${customUnits[key][u1].nome} (${u1})` : u1;
  const label2 = customUnits[key]?.[u2] ? `${customUnits[key][u2].nome} (${u2})` : u2;

  document.getElementById("resultado").textContent =
    `${formatarNumero(valor)} ${label1} = ${formatarNumero(result)} ${label2}`;
}

// ── CONVERSOR COMPOSTO ──────────────────────────────────────────────────────

const COMP_SECTIONS = {
  velocidade: "compVelocidade",
  area:       "compArea",
  volume:     "compVolume",
  forca:      "compForca"
};

function initComposto() {
  preencherSelectsCompostos();

  // Defaults de exibição iniciais: km/h → m/s
  const el = id => document.getElementById(id);
  if (el("fromCompL")) el("fromCompL").value = "km";
  if (el("fromCompT")) el("fromCompT").value = "h";
  if (el("toCompT"))   el("toCompT").value   = "s";

  document.getElementById("tipoComposto").addEventListener("change", () => {
    const tipo = document.getElementById("tipoComposto").value;
    for (const [key, id] of Object.entries(COMP_SECTIONS)) {
      const el = document.getElementById(id);
      el.hidden = (key !== tipo);
    }
    preencherSelectsCompostos();
  });

  document.getElementById("btnConverterComposto").addEventListener("click", converterCompostoUI);
}

function preencherSelectsCompostos() {
  const L = Object.keys(grandezas.comprimento.unidades);
  const T = Object.keys(grandezas.tempo.unidades);
  const M = Object.keys(grandezas.massa.unidades);

  const fill = (id, keys) => {
    const el = document.getElementById(id);
    if (!el) return;
    const prev = el.value;
    el.innerHTML = "";
    keys.forEach(k => el.add(new Option(k, k)));
    if (keys.includes(prev)) el.value = prev;
  };

  fill("fromCompL", L); fill("fromCompT", T);
  fill("toCompL",   L); fill("toCompT",   T);
  fill("fromAreaL", L); fill("toAreaL",   L);
  fill("fromVolL",  L); fill("toVolL",    L);
  fill("fromForcaM", M); fill("fromForcaL", L); fill("fromForcaT", T);
  fill("toForcaM",   M); fill("toForcaL",   L); fill("toForcaT",   T);

}

function converterCompostoUI() {
  const tipo  = document.getElementById("tipoComposto").value;
  const valor = Number(document.getElementById("valorComposto").value);
  const div   = document.getElementById("resultadoComposto");

  let fromUnits = {}, toUnits = {};
  let label = "";

  const v = id => document.getElementById(id)?.value;

  if (tipo === "velocidade") {
    fromUnits = { comprimento: v("fromCompL"), tempo: v("fromCompT") };
    toUnits   = { comprimento: v("toCompL"),   tempo: v("toCompT")   };
    label = `${formatarNumero(valor)} ${fromUnits.comprimento}/${fromUnits.tempo}`;
  } else if (tipo === "area") {
    fromUnits = { comprimento: v("fromAreaL") };
    toUnits   = { comprimento: v("toAreaL")   };
    label = `${formatarNumero(valor)} ${fromUnits.comprimento}\xb2`;
  } else if (tipo === "volume") {
    fromUnits = { comprimento: v("fromVolL") };
    toUnits   = { comprimento: v("toVolL")   };
    label = `${formatarNumero(valor)} ${fromUnits.comprimento}\xb3`;
  } else if (tipo === "forca") {
    fromUnits = { massa: v("fromForcaM"), comprimento: v("fromForcaL"), tempo: v("fromForcaT") };
    toUnits   = { massa: v("toForcaM"),   comprimento: v("toForcaL"),   tempo: v("toForcaT")   };
    label = `${formatarNumero(valor)} ${fromUnits.massa}\xb7${fromUnits.comprimento}/${fromUnits.tempo}\xb2`;
  }

  const result = converterComposto(tipo, fromUnits, toUnits, valor, grandezas);

  let resultLabel = "";
  if (tipo === "velocidade") {
    resultLabel = `${toUnits.comprimento}/${toUnits.tempo}`;
  } else if (tipo === "area") {
    resultLabel = `${toUnits.comprimento}\xb2`;
  } else if (tipo === "volume") {
    resultLabel = `${toUnits.comprimento}\xb3`;
  } else if (tipo === "forca") {
    resultLabel = `${toUnits.massa}\xb7${toUnits.comprimento}/${toUnits.tempo}\xb2`;
  }

  div.textContent = isFinite(result)
    ? `${label} = ${formatarNumero(result)} ${resultLabel}`
    : "Erro no cálculo. Verifique os valores selecionados.";
}

// ── UNIDADES PERSONALIZADAS ─────────────────────────────────────────────────

function initPersonalizado() {
  const selGP = document.getElementById("grandezaPersonalizada");

  for (const g in grandezas) {
    if (grandezas[g].base === "K") continue;
    selGP.add(new Option(grandezas[g].nome, g));
  }

  selGP.addEventListener("change", () => {
    atualizarHint();
    renderListaCustom();
  });

  atualizarHint();
  renderListaCustom();

  document.getElementById("btnAdicionarUnidade").addEventListener("click", adicionarUnidade);
}

function atualizarHint() {
  const key  = document.getElementById("grandezaPersonalizada").value;
  const base = grandezas[key]?.base || "?";
  document.getElementById("fatorHint").textContent =
    `1 [símbolo] = [fator] ${base}`;
}

function adicionarUnidade() {
  const key     = document.getElementById("grandezaPersonalizada").value;
  const nome    = document.getElementById("nomeUnidade").value.trim();
  const simbolo = document.getElementById("simboloUnidade").value.trim();
  const fator   = Number(document.getElementById("fatorSI").value);
  const g       = grandezas[key];

  if (!nome) {
    mostrarMsg("Digite um nome para a unidade.", "erro");
    document.getElementById("nomeUnidade").focus();
    return;
  }
  if (!simbolo) {
    mostrarMsg("Digite um símbolo para a unidade.", "erro");
    document.getElementById("simboloUnidade").focus();
    return;
  }
  if (!isFinite(fator) || fator <= 0) {
    mostrarMsg("Insira um fator SI válido (maior que 0).", "erro");
    document.getElementById("fatorSI").focus();
    return;
  }
  if (g.unidades[simbolo] !== undefined) {
    mostrarMsg(`O símbolo "${simbolo}" já existe nessa grandeza.`, "erro");
    return;
  }

  g.unidades[simbolo] = fator;
  customUnits[key] = customUnits[key] || {};
  customUnits[key][simbolo] = { fator, nome };
  savePersistedUnits();

  renderListaCustom();
  atualizarUnidadesSimples();
  preencherSelectsCompostos();

  document.getElementById("nomeUnidade").value    = "";
  document.getElementById("simboloUnidade").value = "";
  document.getElementById("fatorSI").value        = "";
  mostrarMsg(`Unidade "${nome} (${simbolo})" adicionada.`, "sucesso");
}

function deletarUnidade(gKey, simbolo) {
  delete grandezas[gKey].unidades[simbolo];
  if (customUnits[gKey]) delete customUnits[gKey][simbolo];
  savePersistedUnits();
  renderListaCustom();
  atualizarUnidadesSimples();
  preencherSelectsCompostos();
}

function renderListaCustom() {
  const key = document.getElementById("grandezaPersonalizada").value;
  const div = document.getElementById("listaCustomUnidades");
  const entries = customUnits[key] ? Object.entries(customUnits[key]) : [];
  const base    = grandezas[key]?.base || "";

  if (entries.length === 0) {
    div.innerHTML = "";
    return;
  }

  const header = `<div class="custom-lista-header">Unidades adicionadas</div>`;
  const items  = entries.map(([simbolo, { fator, nome }]) => `
    <div class="custom-item">
      <div class="custom-item-info">
        <span class="custom-item-nome">${nome} (${simbolo})</span>
        <span class="custom-item-fator">= ${formatarNumero(fator)} ${base}</span>
      </div>
      <button class="custom-item-del" data-g="${key}" data-s="${simbolo}" title="Excluir">✕</button>
    </div>`).join("");

  div.innerHTML = header + `<div class="custom-lista">${items}</div>`;

  div.querySelectorAll(".custom-item-del").forEach(btn => {
    btn.addEventListener("click", () => {
      deletarUnidade(btn.dataset.g, btn.dataset.s);
    });
  });
}

function mostrarMsg(texto, tipo) {
  const el = document.getElementById("mensagemUnidade");
  el.textContent = texto;
  el.className = `conv-mensagem ${tipo}`;
  clearTimeout(mostrarMsg._t);
  mostrarMsg._t = setTimeout(() => {
    el.textContent = "";
    el.className = "conv-mensagem";
  }, 4000);
}
