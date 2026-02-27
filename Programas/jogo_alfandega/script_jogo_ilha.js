let permitidos = [];
let proibidos = [];

let regraAtual = localStorage.getItem("regra") || "c";

// ---------- JOGO ----------
function verificar() {
  const input = document.getElementById("objeto");
  if (!input) return;

  const palavra = input.value.toLowerCase().trim();
  const resposta = document.getElementById("resposta");

  if (palavra === "") return;

  if (permitidos.includes(palavra) || proibidos.includes(palavra)) {
    resposta.textContent = "⚠️ Palavra já testada!";
    input.value = "";
    return;
  }

  if (regraDoFiscal(palavra)) {
    permitidos.push(palavra);
    resposta.textContent = "✅ Pode entrar!";
  } else {
    proibidos.push(palavra);
    resposta.textContent = "❌ Barrado!";
  }

  atualizarListas();
  input.value = "";
}

// ---------- REGRAS ----------
function regraDoFiscal(p) {
  switch (regraAtual) {
    case "c": return p.startsWith("c");
    case "par": return p.length % 2 === 0;
    case "vogal": return ["a","e","i","o","u"].includes(p[0]);
  }
}

// ---------- LISTAS ----------
function atualizarListas() {
  const lp = document.getElementById("listaPermitidos");
  const lb = document.getElementById("listaProibidos");
  if (!lp || !lb) return;

  lp.innerHTML = "";
  lb.innerHTML = "";

  permitidos.forEach(p => lp.innerHTML += `<li>${p}</li>`);
  proibidos.forEach(p => lb.innerHTML += `<li>${p}</li>`);

  document.getElementById("qtdPermitidos").textContent = permitidos.length;
  document.getElementById("qtdProibidos").textContent = proibidos.length;
}

// ---------- PROFESSOR ----------
function trocarRegra() {
  regraAtual = document.getElementById("regraSelecionada").value;
  localStorage.setItem("regra", regraAtual);
  novaRodada();
}

function novaRodada() {
  permitidos = [];
  proibidos = [];
}

function regraDoFiscal(p) {
  switch (regraAtual) {

    case "c":
      return p.startsWith("c");

    case "par":
      return p.length % 2 === 0;

    case "vogal":
      return ["a","e","i","o","u"].includes(p[0]);

    case "repetida":
      return /(.)\1/.test(p); // letra repetida

    case "duasVogais":
      return /[aeiou]{2}/.test(p);

    case "semVogal":
      return !/[aeiou]/.test(p);

    case "impar":
      return p.length % 2 !== 0;

    case "energia":
      return ["energia","força","trabalho","calor"].includes(p);

    default:
      return false;
  }
}
