// grandezas.js

export const grandezas = {

  comprimento: {
    nome: "Comprimento",
    base: "m",
    unidades: {
      m: 1,
      km: 1000,
      cm: 0.01,
      mm: 0.001,
      in: 0.0254,
      ft: 0.3048,
      yd: 0.9144,
      mi: 1609.34
    }
  },

  tempo: {
    nome: "Tempo",
    base: "s",
    unidades: {
      s: 1,
      min: 60,
      h: 3600,
      dia: 86400
    }
  },

  massa: {
    nome: "Massa",
    base: "kg",
    unidades: {
      kg: 1,
      g: 0.001,
      mg: 0.000001,
      lb: 0.453592
    }
  },

  temperatura: {
    nome: "Temperatura",
    base: "K",
    unidades: {
      K: v => v,
      C: v => v + 273.15,
      F: v => (v - 32) * 5/9 + 273.15
    },
    inverso: {
      K: v => v,
      C: v => v - 273.15,
      F: v => (v - 273.15) * 9/5 + 32
    }
  },

  velocidade: {
    nome: "Velocidade",
    base: "m/s",
    unidades: {
      "m/s": 1,
      "km/h": 1 / 3.6,
      "mph": 0.44704
    }
  },

  forca: {
    nome: "Força",
    base: "N",
    unidades: {
      N: 1,
      kN: 1000,
      lbf: 4.44822
    }
  }
};
