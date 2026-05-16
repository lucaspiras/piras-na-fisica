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
      "μm": 0.000001,
      nm: 0.000000001,
      in: 0.0254,
      ft: 0.3048,
      yd: 0.9144,
      mi: 1609.344
    }
  },

  tempo: {
    nome: "Tempo",
    base: "s",
    unidades: {
      s: 1,
      min: 60,
      h: 3600,
      dia: 86400,
      semana: 604800,
      mes: 2629800,
      ano: 31557600
    }
  },

  massa: {
    nome: "Massa",
    base: "kg",
    unidades: {
      kg: 1,
      g: 0.001,
      mg: 0.000001,
      oz: 0.0283495,
      lb: 0.453592,
      t: 1000,
      "ton (US)": 907.185
    }
  },

  temperatura: {
    nome: "Temperatura",
    base: "K",
    unidades: {
      K: v => v,
      C: v => v + 273.15,
      F: v => (v - 32) * 5 / 9 + 273.15
    },
    inverso: {
      K: v => v,
      C: v => v - 273.15,
      F: v => (v - 273.15) * 9 / 5 + 32
    }
  },

  area: {
    nome: "\xc1rea",
    base: "m\xb2",
    unidades: {
      "m\xb2": 1,
      "cm\xb2": 1e-4,
      "mm\xb2": 1e-6,
      "km\xb2": 1e6,
      "in\xb2": 6.4516e-4,
      "ft\xb2": 0.092903,
      "yd\xb2": 0.836127,
      "mi\xb2": 2589988.11,
      ha: 10000,
      acre: 4046.86
    }
  },

  volume: {
    nome: "Volume",
    base: "m\xb3",
    unidades: {
      "m\xb3": 1,
      "dm\xb3": 0.001,
      "cm\xb3": 1e-6,
      "mm\xb3": 1e-9,
      L: 0.001,
      mL: 1e-6,
      "in\xb3": 1.6387e-5,
      "ft\xb3": 0.028317,
      gal: 0.003785411784,
      qt: 9.4635e-4,
      pt: 4.7318e-4,
      "fl oz": 2.9574e-5
    }
  },

  pressao: {
    nome: "Press\xe3o",
    base: "Pa",
    unidades: {
      Pa: 1,
      kPa: 1000,
      MPa: 1e6,
      bar: 1e5,
      atm: 101325,
      psi: 6894.76,
      mmHg: 133.322
    }
  },

  energia: {
    nome: "Energia",
    base: "J",
    unidades: {
      J: 1,
      kJ: 1000,
      MJ: 1e6,
      cal: 4.184,
      kcal: 4184,
      kWh: 3600000
    }
  },

  velocidade: {
    nome: "Velocidade",
    base: "m/s",
    unidades: {
      "m/s": 1,
      "km/h": 1 / 3.6,
      mph: 0.44704
    }
  },

  forca: {
    nome: "For\xe7a",
    base: "N",
    unidades: {
      N: 1,
      kN: 1000,
      lbf: 4.44822
    }
  }
};
