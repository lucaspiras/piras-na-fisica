// conversoes.js

export function converterValor(grandeza, valor, unidadeOrigem, unidadeDestino) {

  if (grandeza.base === "K") {
    const valorSI = grandeza.unidades[unidadeOrigem](valor);
    return grandeza.inverso[unidadeDestino](valorSI);
  }

  const valorSI = valor * grandeza.unidades[unidadeOrigem];
  return valorSI / grandeza.unidades[unidadeDestino];
}

export function formatarNumero(valor) {
  return valor.toLocaleString("pt-BR", {
    maximumFractionDigits: 4
  });
}
