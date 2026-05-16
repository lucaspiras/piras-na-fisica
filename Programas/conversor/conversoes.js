// conversoes.js

export function converterValor(grandeza, valor, unidadeOrigem, unidadeDestino) {
  if (grandeza.base === "K") {
    const valorSI = grandeza.unidades[unidadeOrigem](valor);
    return grandeza.inverso[unidadeDestino](valorSI);
  }
  const valorSI = valor * grandeza.unidades[unidadeOrigem];
  return valorSI / grandeza.unidades[unidadeDestino];
}

export function converterComposto(tipo, fromUnits, toUnits, valor, grandezas) {
  if (tipo === "velocidade") {
    const Lf = grandezas.comprimento.unidades[fromUnits.comprimento];
    const Tf = grandezas.tempo.unidades[fromUnits.tempo];
    const Lt = grandezas.comprimento.unidades[toUnits.comprimento];
    const Tt = grandezas.tempo.unidades[toUnits.tempo];
    return valor * (Lf * Tt) / (Lt * Tf);
  }
  if (tipo === "area") {
    const Lf = grandezas.comprimento.unidades[fromUnits.comprimento];
    const Lt = grandezas.comprimento.unidades[toUnits.comprimento];
    return valor * (Lf ** 2) / (Lt ** 2);
  }
  if (tipo === "volume") {
    const Lf = grandezas.comprimento.unidades[fromUnits.comprimento];
    const Lt = grandezas.comprimento.unidades[toUnits.comprimento];
    return valor * (Lf ** 3) / (Lt ** 3);
  }
  if (tipo === "forca") {
    const Mf = grandezas.massa.unidades[fromUnits.massa];
    const Lf = grandezas.comprimento.unidades[fromUnits.comprimento];
    const Tf = grandezas.tempo.unidades[fromUnits.tempo];
    const Mt = grandezas.massa.unidades[toUnits.massa];
    const Lt = grandezas.comprimento.unidades[toUnits.comprimento];
    const Tt = grandezas.tempo.unidades[toUnits.tempo];
    return valor * (Mf * Lf * Tt * Tt) / (Mt * Lt * Tf * Tf);
  }
  return NaN;
}

const SUPS = { '0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','-':'⁻' };

export function formatarNumero(valor) {
  if (!isFinite(valor)) return "—";
  const abs = Math.abs(valor);
  if (abs === 0) return "0";
  if (abs >= 1e-4 && abs < 1e7) {
    return valor.toLocaleString("pt-BR", { maximumSignificantDigits: 6 });
  }
  let exp = Math.floor(Math.log10(abs));
  let mantissa = parseFloat((valor / Math.pow(10, exp)).toPrecision(4));
  if (Math.abs(mantissa) >= 10) { mantissa /= 10; exp += 1; }
  const mantissaStr = mantissa.toLocaleString("pt-BR", { maximumSignificantDigits: 4 });
  const expStr = String(exp).split("").map(c => SUPS[c] ?? c).join("");
  return `${mantissaStr} × 10${expStr}`;
}
