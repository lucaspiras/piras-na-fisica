// professor.js — lógica exclusiva do painel do professor (ES6 módulo)

import {
  REGRAS, PARAMETRIZADAS,
  getConfig, setConfig,
  getPermitidos, getProibidos, getPendentes,
  resolverPendente, registrarResultado,
  novaRodada, normalizar
} from './script_jogo_ilha.js';

// ── Inicialização ──────────────────────────────────────────────────────────

export function initProfessor() {
  populateRuleSelect();
  restoreConfig();
  renderFeed();

  document.getElementById("btnTipoAuto").addEventListener("click",   () => setTipo("auto"));
  document.getElementById("btnTipoManual").addEventListener("click", () => setTipo("manual"));
  document.getElementById("btnTipoIA").addEventListener("click",     () => setTipo("ia"));

  document.getElementById("selectRegra").addEventListener("change",  handleRegraChange);
  document.getElementById("btnAplicar").addEventListener("click",    aplicarRegra);
  document.getElementById("btnNovaRodada").addEventListener("click", handleNovaRodada);
  document.getElementById("btnCopiar").addEventListener("click",     copiarListas);

  document.getElementById("btnForcarPermitido").addEventListener("click", () => forcarManual(true));
  document.getElementById("btnForcarProibido").addEventListener("click",  () => forcarManual(false));

  window.addEventListener("storage", e => {
    if (e.key === "ilha_tick")    renderFeed();
    if (e.key === "ilha_config")  restoreConfig(); // sync UI when student changes rule
  });
}

// ── Select de regras ────────────────────────────────────────────────────────

const GRUPOS = [
  {
    label: "Letras iniciais/finais",
    chaves: ["comecaVogal", "comecaConsoante", "terminaVogal", "terminaConsoante",
             "comecaIgualTermina", "comecaCom", "terminaCom", "contemLetra"]
  },
  {
    label: "Comprimento",
    chaves: ["par", "impar", "curta", "longa", "exatamenteN"]
  },
  {
    label: "Padrões",
    chaves: ["letraRepetida", "duasVogais", "semVogal", "palindromo", "digrafo",
             "temAcento", "maisVogais", "maisConsoantes", "terminaEM", "terminaINHO", "plural"]
  },
  {
    label: "Encadeamento",
    chaves: ["cadeia"]
  }
];

function populateRuleSelect() {
  const sel = document.getElementById("selectRegra");
  sel.innerHTML = "";
  GRUPOS.forEach(g => {
    const og = document.createElement("optgroup");
    og.label = g.label;
    g.chaves.forEach(chave => {
      const opt = document.createElement("option");
      opt.value = chave;
      opt.textContent = REGRAS[chave].label;
      og.appendChild(opt);
    });
    sel.appendChild(og);
  });
}

// ── Tipo de avaliação ───────────────────────────────────────────────────────

const TIPO_BTN = { auto: "btnTipoAuto", manual: "btnTipoManual", ia: "btnTipoIA" };

function setTipo(tipo) {
  Object.entries(TIPO_BTN).forEach(([t, id]) => {
    document.getElementById(id).classList.toggle("active", t === tipo);
  });
  document.getElementById("secaoAuto").hidden       = (tipo !== "auto");
  document.getElementById("secaoIA").hidden         = (tipo !== "ia");
  document.getElementById("secaoManualInfo").hidden = (tipo !== "manual");
}

// ── Parâmetro da regra ──────────────────────────────────────────────────────

function handleRegraChange() {
  const chave = document.getElementById("selectRegra").value;
  const precisaParam = PARAMETRIZADAS.has(chave);
  const wrap = document.getElementById("wrapParametro");
  wrap.hidden = !precisaParam;
  if (precisaParam) {
    const lbl = document.getElementById("lblParametro");
    if (chave === "exatamenteN") {
      lbl.textContent = "Número de letras (N)";
      document.getElementById("inputParametro").placeholder = "ex: 5";
    } else {
      lbl.textContent = "Letra ou sílaba";
      document.getElementById("inputParametro").placeholder = "ex: s";
    }
  }
}

// ── Restaurar configuração atual ────────────────────────────────────────────

function restoreConfig() {
  const cfg = getConfig();

  setTipo(cfg.tipo || "auto");

  if (cfg.chave && document.getElementById("selectRegra").querySelector(`[value="${cfg.chave}"]`)) {
    document.getElementById("selectRegra").value = cfg.chave;
  }
  handleRegraChange();

  if (cfg.parametro) {
    document.getElementById("inputParametro").value = cfg.parametro;
  }

  if (cfg.textoIA) {
    document.getElementById("textareaRegra").value = cfg.textoIA;
  }

  const savedKey = localStorage.getItem("ilha_apiKey") || "";
  document.getElementById("inputApiKey").value = savedKey;

  atualizarDescricaoAtual(cfg);
}

function atualizarDescricaoAtual(cfg) {
  const el = document.getElementById("regraAtual");
  if (!el) return;
  if (cfg.tipo === "auto") {
    const regra = REGRAS[cfg.chave];
    const label = regra ? regra.label : "—";
    el.textContent = cfg.parametro ? `${label}: "${cfg.parametro}"` : label;
  } else if (cfg.tipo === "manual") {
    el.textContent = "Manual (professor decide cada palavra)";
  } else if (cfg.tipo === "ia") {
    el.textContent = cfg.textoIA ? `IA: "${cfg.textoIA}"` : "IA (sem regra definida)";
  }
}

// ── Aplicar regra ───────────────────────────────────────────────────────────

function aplicarRegra() {
  const tipo = tipoAtivo();
  let cfg = { tipo };

  if (tipo === "auto") {
    const chave = document.getElementById("selectRegra").value;
    const parametro = PARAMETRIZADAS.has(chave)
      ? normalizar(document.getElementById("inputParametro").value)
      : null;
    cfg.chave = chave;
    cfg.parametro = parametro || null;
    if (PARAMETRIZADAS.has(chave) && !parametro) {
      mostrarMensagem("⚠️ Insira o parâmetro para esta regra.", "erro");
      return;
    }
  } else if (tipo === "ia") {
    const textoIA = document.getElementById("textareaRegra").value.trim();
    const apiKey  = document.getElementById("inputApiKey").value.trim();
    if (!textoIA) { mostrarMensagem("⚠️ Descreva a regra da ilha.", "erro"); return; }
    if (!apiKey)  { mostrarMensagem("⚠️ Insira a chave de API.", "erro"); return; }
    cfg.textoIA = textoIA;
    localStorage.setItem("ilha_apiKey", apiKey);
  }

  setConfig(cfg);
  atualizarDescricaoAtual(cfg);
  mostrarMensagem("✅ Regra aplicada! Nova rodada iniciada.", "ok");
  novaRodada();
  renderFeed();
}

function tipoAtivo() {
  return Object.entries(TIPO_BTN).find(([, id]) =>
    document.getElementById(id).classList.contains("active")
  )?.[0] ?? "auto";
}

// ── Feed ao vivo ────────────────────────────────────────────────────────────

export function renderFeed() {
  const perm = getPermitidos();
  const prob = getProibidos();
  const pend = getPendentes();

  // Estatísticas
  document.getElementById("statPermitidos").textContent = perm.length;
  document.getElementById("statProibidos").textContent  = prob.length;
  document.getElementById("statPendentes").textContent  = pend.length;

  // Feed
  const feedEl = document.getElementById("feedLista");
  const itens = [];

  pend.forEach(({ id, palavra }) => {
    itens.push({ tipo: "pendente", id, palavra });
  });
  [...perm].reverse().forEach(p => itens.push({ tipo: "permitido", palavra: p }));
  [...prob].reverse().forEach(p => itens.push({ tipo: "proibido",  palavra: p }));

  if (itens.length === 0) {
    feedEl.innerHTML = '<li class="feed-vazio">Nenhuma submissão ainda.</li>';
    return;
  }

  feedEl.innerHTML = itens.map(item => {
    if (item.tipo === "pendente") {
      return `<li class="feed-item pendente" data-id="${item.id}" data-palavra="${item.palavra}">
        <span class="feed-palavra">${item.palavra}</span>
        <span class="feed-tag">⏳ aguardando</span>
        <div class="feed-acoes">
          <button class="feed-btn-ok" data-id="${item.id}" data-palavra="${item.palavra}">✅</button>
          <button class="feed-btn-nao" data-id="${item.id}" data-palavra="${item.palavra}">❌</button>
        </div>
      </li>`;
    }
    const cls = item.tipo === "permitido" ? "permitido" : "proibido";
    const tag = item.tipo === "permitido" ? "✅ permitido" : "❌ proibido";
    return `<li class="feed-item ${cls}">
      <span class="feed-palavra">${item.palavra}</span>
      <span class="feed-tag">${tag}</span>
    </li>`;
  }).join("");

  feedEl.querySelectorAll(".feed-btn-ok").forEach(btn => {
    btn.addEventListener("click", () => aprovarPendente(btn.dataset.id, btn.dataset.palavra));
  });
  feedEl.querySelectorAll(".feed-btn-nao").forEach(btn => {
    btn.addEventListener("click", () => rejeitarPendente(btn.dataset.id, btn.dataset.palavra));
  });
}

// ── Aprovação/Rejeição de pendentes ────────────────────────────────────────

function aprovarPendente(id, palavra) {
  resolverPendente(id, palavra, true);
  renderFeed();
}

function rejeitarPendente(id, palavra) {
  resolverPendente(id, palavra, false);
  renderFeed();
}

// ── Override manual ─────────────────────────────────────────────────────────

function forcarManual(permitido) {
  const raw = document.getElementById("inputForcar").value.trim();
  if (!raw) { mostrarMensagem("⚠️ Digite uma palavra para forçar.", "erro"); return; }
  const p = normalizar(raw);
  registrarResultado(p, permitido);
  document.getElementById("inputForcar").value = "";
  mostrarMensagem(`${permitido ? "✅" : "❌"} "${p}" adicionado(a) como ${permitido ? "permitido" : "proibido"}.`, "ok");
  renderFeed();
}

// ── Nova rodada ─────────────────────────────────────────────────────────────

function handleNovaRodada() {
  if (!confirm("Iniciar nova rodada? As listas de permitidos e proibidos serão apagadas.")) return;
  novaRodada();
  renderFeed();
  mostrarMensagem("🔄 Nova rodada iniciada.", "ok");
}

// ── Copiar listas ───────────────────────────────────────────────────────────

function copiarListas() {
  const perm = getPermitidos();
  const prob = getProibidos();
  const txt = [
    "✅ PERMITIDOS:",
    perm.length ? perm.map(p => `  • ${p}`).join("\n") : "  (nenhum)",
    "",
    "❌ PROIBIDOS:",
    prob.length ? prob.map(p => `  • ${p}`).join("\n") : "  (nenhum)"
  ].join("\n");
  navigator.clipboard.writeText(txt).then(() => {
    mostrarMensagem("📋 Listas copiadas para a área de transferência.", "ok");
  }).catch(() => {
    mostrarMensagem("⚠️ Não foi possível copiar. Tente manualmente.", "erro");
  });
}

// ── UI helpers ───────────────────────────────────────────────────────────────

function mostrarMensagem(txt, tipo) {
  const el = document.getElementById("msgRegra");
  el.textContent = txt;
  el.className = "prof-mensagem " + tipo;
  clearTimeout(el._timer);
  el._timer = setTimeout(() => { el.textContent = ""; el.className = "prof-mensagem"; }, 4000);
}
