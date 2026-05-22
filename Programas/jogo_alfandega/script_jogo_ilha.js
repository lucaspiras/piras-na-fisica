// script_jogo_ilha.js — lógica compartilhada (módulo ES6)

export const REGRAS = {
  // ── Letras iniciais/finais ──
  comecaVogal:       { label: "Começa com vogal",                   fn: p => /^[aeiouáéíóúâêîôûãõ]/i.test(p) },
  comecaConsoante:   { label: "Começa com consoante",               fn: p => !/^[aeiouáéíóúâêîôûãõ]/i.test(p) },
  terminaVogal:      { label: "Termina com vogal",                  fn: p => /[aeiouáéíóúâêîôûãõ]$/i.test(p) },
  terminaConsoante:  { label: "Termina com consoante",              fn: p => !/[aeiouáéíóúâêîôûãõ]$/i.test(p) },
  comecaIgualTermina:{ label: "Começa e termina com a mesma letra", fn: p => p.length > 1 && p[0] === p[p.length - 1] },
  comecaCom:         { label: "Começa com…",       param: "letra/sílaba", fn: (p, par) => !!par && p.startsWith(par.toLowerCase()) },
  terminaCom:        { label: "Termina com…",      param: "letra/sílaba", fn: (p, par) => !!par && p.endsWith(par.toLowerCase()) },
  contemLetra:       { label: "Contém a letra/sílaba…", param: "letra/sílaba", fn: (p, par) => !!par && p.includes(par.toLowerCase()) },

  // ── Comprimento ──
  par:        { label: "Número par de letras",   fn: p => semEspacos(p).length % 2 === 0 },
  impar:      { label: "Número ímpar de letras", fn: p => semEspacos(p).length % 2 !== 0 },
  curta:      { label: "Até 4 letras",           fn: p => semEspacos(p).length <= 4 },
  longa:      { label: "6 letras ou mais",        fn: p => semEspacos(p).length >= 6 },
  exatamenteN:{ label: "Exatamente N letras",    param: "número", fn: (p, par) => !!par && semEspacos(p).length === parseInt(par) },

  // ── Padrões ──
  letraRepetida:  { label: "Tem letra repetida consecutiva",     fn: p => /(.)\1/i.test(p) },
  duasVogais:     { label: "Duas vogais seguidas",               fn: p => /[aeiouáéíóúâêîôûãõ]{2}/i.test(p) },
  semVogal:       { label: "Sem vogais",                         fn: p => !/[aeiouáéíóúâêîôûãõ]/i.test(p) },
  palindromo:     { label: "Palíndromo",                         fn: p => { const s = semEspacos(p); return s.length > 1 && s === [...s].reverse().join(""); } },
  digrafo:        { label: "Tem dígrafo (lh, nh, ch, ss, rr, qu)", fn: p => /lh|nh|ch|ss|rr|qu/i.test(p) },
  temAcento:      { label: "Tem acento",                         fn: p => /[áéíóúâêîôûãõ]/i.test(p) },
  maisVogais:     { label: "Mais vogais do que consoantes",      fn: p => { const v = vogais(p); return v > semEspacos(p).length - v; } },
  maisConsoantes: { label: "Mais consoantes do que vogais",      fn: p => { const v = vogais(p); return semEspacos(p).length - v > v; } },
  terminaEM:      { label: "Termina com -em ou -ém",             fn: p => /[eé]m$/i.test(p) },
  terminaINHO:    { label: "Diminutivo (-inho / -inha)",         fn: p => /inh[oa]$/i.test(p) },
  plural:         { label: "Plural (-s, -ns, -ões, -ais)",       fn: p => /s$|ns$|ões$|ais$/i.test(p) },

  // ── Encadeamento ──
  cadeia: {
    label: "Começa com a letra que a última palavra termina",
    fn: p => {
      const ultima = localStorage.getItem("ilha_ultima_permitida");
      if (!ultima) return true; // primeira palavra sempre permitida
      return p[0] === ultima[ultima.length - 1];
    }
  },
};

// Chaves que exigem parâmetro extra
export const PARAMETRIZADAS = new Set(["comecaCom", "terminaCom", "contemLetra", "exatamenteN"]);

// ── Helpers internos ─────────────────────────────────────────────────────────

function semEspacos(p) { return p.replace(/\s/g, ""); }
function vogais(p) { return (p.match(/[aeiouáéíóúâêîôûãõ]/gi) || []).length; }

// ── Normalização ─────────────────────────────────────────────────────────────

export function normalizar(p) {
  return p.toLowerCase().trim().replace(/\s+/g, " ");
}

// ── Config ───────────────────────────────────────────────────────────────────

const DEFAULT_CONFIG = { tipo: "auto", chave: "comecaVogal", parametro: null, textoIA: null };

export function getConfig() {
  try { return JSON.parse(localStorage.getItem("ilha_config")) || { ...DEFAULT_CONFIG }; }
  catch { return { ...DEFAULT_CONFIG }; }
}

export function setConfig(cfg) {
  localStorage.setItem("ilha_config", JSON.stringify(cfg));
  bumpTick();
}

// ── Estado do jogo ───────────────────────────────────────────────────────────

export function getPermitidos() { return JSON.parse(localStorage.getItem("ilha_permitidos") || "[]"); }
export function getProibidos()  { return JSON.parse(localStorage.getItem("ilha_proibidos")  || "[]"); }
export function getPendentes()  { return JSON.parse(localStorage.getItem("ilha_pendentes")  || "[]"); }
export function getRodada()     { return localStorage.getItem("ilha_rodada") || "0"; }

export function bumpTick() {
  localStorage.setItem("ilha_tick", Date.now().toString());
}

export function registrarResultado(palavra, permitido) {
  const p = normalizar(palavra);
  let perm = getPermitidos().filter(x => x !== p);
  let prob = getProibidos().filter(x => x !== p);
  if (permitido) {
    perm.push(p);
    if (getConfig().chave === "cadeia") localStorage.setItem("ilha_ultima_permitida", p);
  } else prob.push(p);
  localStorage.setItem("ilha_permitidos", JSON.stringify(perm));
  localStorage.setItem("ilha_proibidos",  JSON.stringify(prob));
  bumpTick();
}

export function enfileirarPendente(palavra) {
  const p = normalizar(palavra);
  const pendentes = getPendentes();
  if (pendentes.some(x => x.palavra === p)) return null;
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
  pendentes.push({ id, palavra: p, ts: Date.now() });
  localStorage.setItem("ilha_pendentes", JSON.stringify(pendentes));
  bumpTick();
  return id;
}

export function resolverPendente(id, palavra, permitido) {
  const pendentes = getPendentes().filter(x => x.id !== id);
  localStorage.setItem("ilha_pendentes", JSON.stringify(pendentes));
  registrarResultado(palavra, permitido);
  localStorage.setItem("ilha_resp_" + id, permitido ? "1" : "0");
}

export function novaRodada() {
  localStorage.setItem("ilha_permitidos", "[]");
  localStorage.setItem("ilha_proibidos",  "[]");
  localStorage.setItem("ilha_pendentes",  "[]");
  localStorage.removeItem("ilha_ultima_permitida");
  localStorage.setItem("ilha_rodada", String(parseInt(getRodada()) + 1));
  bumpTick();
}

const EXCLUIR_ALEATORIO = new Set(["semVogal", "cadeia"]);

export function novaRodadaAleatoria() {
  const chaves = Object.keys(REGRAS).filter(k => !PARAMETRIZADAS.has(k) && !EXCLUIR_ALEATORIO.has(k));
  const chave = chaves[Math.floor(Math.random() * chaves.length)];
  setConfig({ tipo: "auto", chave, parametro: null, textoIA: null });
  novaRodada();
  return chave;
}

// ── Avaliação ────────────────────────────────────────────────────────────────

export async function avaliar(palavra) {
  const cfg = getConfig();
  const p = normalizar(palavra);

  if (cfg.tipo === "auto") {
    const regra = REGRAS[cfg.chave];
    if (!regra) return false;
    return regra.fn(p, cfg.parametro);
  }

  if (cfg.tipo === "ia") {
    return await avaliarComIA(p, cfg.textoIA);
  }

  return null; // modo manual — chamador enfileira pendente
}

// ── Palavra de exemplo e revelação ──────────────────────────────────────────

const PALAVRAS_EXEMPLO = [
  "abacaxi","abelha","amigo","arvore","azul",
  "elefante","espelho","estrela","escola","escada",
  "ilha","inseto","igual","irma",
  "ovo","orelha","olho","osso",
  "uva","urso","unha","uniforme",
  "bola","borboleta","banana","barco","balde",
  "carro","casa","cenoura","cachorro","cama",
  "dente","dado","dragão","dedo","disco",
  "faca","flor","fogão","ferida","fio",
  "gato","galho","gaveta","girafa","garfo",
  "homem","horta","hotel","hora",
  "janela","jogo","joelho","jornal",
  "kiwi",
  "lua","leite","lata","livro","lápis",
  "mesa","mala","manga","mapa","mão",
  "navio","nuvem","ninho","nó",
  "pato","peixe","porta","pedra","pão",
  "queijo","quadro","quarto",
  "rato","roupa","rua","relógio",
  "sapo","sino","sol","sapato","saco",
  "terra","teto","tigre","tampa","tela",
  "vaca","vento","vidro","vale",
  "xícara","xarope",
  "zebra","zona","zíper",
  "massa","asa","arara",
  "baile","noite","coelho","feijão","loiro",
  "gatinho","casinha","caixinha",
  "animais","flores","sapatos",
  "homem","armazém",
];

export async function pedirPalavrasPermitidas(n = 3) {
  const cfg = getConfig();

  if (cfg.tipo === "auto") {
    const regra = REGRAS[cfg.chave];
    if (!regra) return [];
    const shuffled = [...PALAVRAS_EXEMPLO].sort(() => Math.random() - 0.5);
    const found = [];
    for (const p of shuffled) {
      if (regra.fn(p, cfg.parametro)) {
        found.push(p);
        if (found.length === n) break;
      }
    }
    return found;
  }

  if (cfg.tipo === "ia") {
    const apiKey = localStorage.getItem("ilha_apiKey");
    if (!apiKey || !cfg.textoIA) return [];
    const ex = await pedirExemploComIA(cfg.textoIA, apiKey);
    return ex ? [ex] : [];
  }

  return "manual";
}

export function revelarRegra() {
  const cfg = getConfig();
  if (cfg.tipo === "auto") {
    const label = REGRAS[cfg.chave]?.label ?? "Regra desconhecida";
    let texto = cfg.parametro ? `${label}: "${cfg.parametro}"` : label;
    if (cfg.chave === "cadeia") {
      const ultima = localStorage.getItem("ilha_ultima_permitida");
      if (ultima) texto += ` (próxima palavra deve começar com "${ultima[ultima.length - 1]}")`;
    }
    return texto;
  }
  if (cfg.tipo === "ia") return cfg.textoIA ?? "Regra não definida";
  return "manual";
}

async function pedirExemploComIA(regra, apiKey) {
  try {
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-ipc": "true",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 15,
        messages: [{ role: "user",
          content: `Regra da ilha: "${regra}". Dê um exemplo de objeto comum que se encaixa. Responda apenas com o nome do objeto em português, sem pontuação.`
        }]
      })
    });
    if (!resp.ok) return null;
    const data = await resp.json();
    return normalizar(data.content?.[0]?.text || "") || null;
  } catch {
    return null;
  }
}

// ── Verificação de palpite de regra ─────────────────────────────────────────

export async function verificarPalpite(palpiteTexto) {
  const cfg = getConfig();
  const p = normalizar(palpiteTexto);
  if (!p) return null;

  if (cfg.tipo === "manual") return "manual";

  const regraReal = cfg.tipo === "auto"
    ? (REGRAS[cfg.chave]?.label || "") + (cfg.parametro ? ` (${cfg.parametro})` : "")
    : (cfg.textoIA || "");
  if (!regraReal) return null;

  const apiKey = localStorage.getItem("ilha_apiKey");
  if (apiKey) {
    const resultadoIA = await compararPalpiteComIA(p, regraReal, apiKey);
    if (resultadoIA !== null) return resultadoIA;
    // API falhou — cai para comparação local
  }

  // Modo IA sem API key não tem como verificar localmente
  if (cfg.tipo === "ia") return null;

  return compararStringsLocalmente(p, regraReal);
}

function compararStringsLocalmente(palpite, regraReal) {
  const norm = s => s.toLowerCase().trim().replace(/\s+/g, " ");
  const g = norm(palpite);
  const r = norm(regraReal);

  // Correspondência exata ou inclusão direta
  if (g === r || r.includes(g) || g.includes(r)) return true;

  // Sobreposição de palavras relevantes (ignora stopwords curtas)
  const STOP = new Set(["a","e","o","as","os","de","da","do","em","um","uma","que","na","no","ou","se","por","com","mais","menos"]);
  const palavras = s => s.split(/\s+/).filter(w => w.length > 2 && !STOP.has(w));
  const gSet = new Set(palavras(g));
  const rPalavras = palavras(r);
  if (rPalavras.length === 0) return false;
  const matches = rPalavras.filter(w => gSet.has(w)).length;
  return matches / rPalavras.length >= 0.6;
}

async function compararPalpiteComIA(palpite, regraReal, apiKey) {
  try {
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-ipc": "true",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 5,
        messages: [{ role: "user",
          content: `Regra real da ilha: "${regraReal}". O aluno achou que a regra é: "${palpite}". Ignorando diferenças de vocabulário, o aluno capturou a mesma ideia? Responda apenas: SIM ou NÃO.`
        }]
      })
    });
    if (!resp.ok) return null;
    const data = await resp.json();
    return (data.content?.[0]?.text?.trim().toUpperCase() || "").startsWith("SIM");
  } catch {
    return null;
  }
}

async function avaliarComIA(palavra, regra) {
  const apiKey = localStorage.getItem("ilha_apiKey");
  if (!apiKey || !regra) return null;
  try {
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-ipc": "true",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 5,
        messages: [{ role: "user",
          content: `Regra da ilha: "${regra}". O objeto "${palavra}" entra na ilha? Responda apenas: SIM ou NÃO.`
        }]
      })
    });
    if (!resp.ok) return null;
    const data = await resp.json();
    return (data.content?.[0]?.text?.trim().toUpperCase() || "").startsWith("SIM");
  } catch {
    return null;
  }
}
