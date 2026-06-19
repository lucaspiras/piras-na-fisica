import json

with open('banco-questoes/fisica_ufrgs.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

IMG = 'obfep/2016/B-F1'

questoes = [
{
  "id": "OBFEP-2016-B-01",
  "ano": 2016, "numero": 1, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [f"{IMG}/pag01_xref33_433x258.jpg"], "alternativas": {}},
  "enunciado": "Tom pergunta a Vinícius: 'No levantamento de peso, quando o atleta ergue aquela barra cheia de anilhas, a barra exerce nas mãos do atleta o peso dela mais o peso das anilhas?' Qual seria a resposta correta?",
  "opcoes": {
    "a": "Sim, a barra exerce o peso dela e transmite o peso das anilhas que estão presas a ela.",
    "b": "Não, a barra só exerce o peso dela. O peso das anilhas é intransferível.",
    "c": "Não, a barra não exerce peso nas mãos do atleta. Ela exerce a reação à força que o atleta aplica nela.",
    "d": "Não, a barra só exerce o peso das anilhas que estão presas a ela."
  },
  "gabarito": "c",
  "resolucao": "Pela 3ª Lei de Newton, a força que a barra exerce nas mãos do atleta é a REAÇÃO à força que as mãos exercem na barra. Não é tecnicamente o 'peso' da barra: é uma força de contato (normal), cujo módulo em equilíbrio estático é igual ao peso total (barra + anilhas), mas a natureza da força é de reação de contato, não peso gravitacional."
},
{
  "id": "OBFEP-2016-B-02",
  "ano": 2016, "numero": 2, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Robson Caetano fez a melhor marca sul-americana dos 100 m rasos: 10,00 s. Vinícius pergunta: 'Será que Robson, quando fez sua melhor marca, ultrapassou os 40 km/h de velocidade em algum instante?' Qual seria a resposta correta?",
  "opcoes": {
    "a": "Não. Se ele percorreu 100 m em 10 s, percorreria 36.000 m em 1 h, ou seja, 36 km/h, menor que 40 km/h.",
    "b": "Sim. Se partiu do repouso (v=0) e sua velocidade média foi 36 km/h, é muito provável que sua velocidade instantânea tenha atingido 4 km/h acima da velocidade média.",
    "c": "Não. Ele não chegou a percorrer 1 quilômetro, nem gastou 1 hora, portanto, é incoerente apresentar sua velocidade em quilômetros por hora.",
    "d": "Sim. Como a maratona tem pouco mais de 42 km, um bom atleta percorreria mais de 42 km em 1 h; portanto, sua velocidade ultrapassou os 40 km/h."
  },
  "gabarito": "b",
  "resolucao": "Velocidade média: 100 m / 10 s = 10 m/s = 36 km/h. Porém, Robson partiu do repouso (v₀=0) e foi acelerando. Para que a média seja 36 km/h, com v₀=0, a velocidade máxima deve ser superior à média. É muito provável que em algum momento ele tenha ultrapassado os 40 km/h."
},
{
  "id": "OBFEP-2016-B-03",
  "ano": 2016, "numero": 3, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref37_308x243.jpg"], "alternativas": {}},
  "enunciado": "O recorde de levantamento de peso é de Vassili Alekseiev: 256 kg. Um ciclista ergueu o fundo de um carro de 830 kg, tirando-o da ciclovia. Quantos newtons de força média o ciclista aplicou no carro ACIMA da força média de Alekseiev? Considere o peso do carro igualmente distribuído entre fundo e frente. Dado: g = 10 m/s².",
  "opcoes": {"a": "1590 N", "b": "1610 N", "c": "1670 N", "d": "1730 N"},
  "gabarito": "a",
  "resolucao": "Força de Alekseiev: F_A = 256 × 10 = 2560 N. Carro: peso total = 830 × 10 = 8300 N; metade (fundo) = 4150 N. Força do ciclista: F_C = 4150 N. Diferença: 4150 − 2560 = 1590 N."
},
{
  "id": "OBFEP-2016-B-04",
  "ano": 2016, "numero": 4, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref38_578x258.jpg"], "alternativas": {}},
  "enunciado": "Na prova de perseguição em equipe (16 voltas × 250 m), a equipe norueguesa completou a prova em 5 min. Qual a velocidade média em km/h?",
  "opcoes": {"a": "44 km/h", "b": "48 km/h", "c": "50 km/h", "d": "52 km/h"},
  "gabarito": "b",
  "resolucao": "Distância: 16 × 250 = 4000 m. Tempo: 5 min = 300 s. v = 4000/300 = 13,33 m/s = 13,33 × 3,6 = 48 km/h."
},
{
  "id": "OBFEP-2016-B-05",
  "ano": 2016, "numero": 5, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Termometria",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Daniel Gabriel Fahrenheit (1724) definiu: fusão do gelo = 32 °F e ebulição da água = 212 °F. A delegação dos EUA recebeu uma cartilha com fórmula que converte Celsius (x) em Fahrenheit (y). Que fórmula é esta?",
  "opcoes": {"a": "y = 1,8x + 32", "b": "y = 1,8x + 6,4", "c": "y = 3,6x + 32", "d": "y = 3,6x + 6,4"},
  "gabarito": "a",
  "resolucao": "A escala Fahrenheit tem 180 divisões (212−32) para os mesmos 100 °C → cada °C equivale a 1,8 °F. Com o ponto fixo (0 °C = 32 °F): F = 1,8C + 32 → y = 1,8x + 32."
},
{
  "id": "OBFEP-2016-B-06",
  "ano": 2016, "numero": 6, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag03_xref43_351x305.jpg"], "alternativas": {}},
  "enunciado": "O gráfico de velocidade escalar × tempo de um atleta no salto em altura mostra três instantes t₁, t₂ e t₃ marcados. O movimento vai do impulso até o amortecimento no colchão (6,8 s). Em qual instante o atleta atinge a altura máxima?",
  "opcoes": {"a": "Apenas em t₁.", "b": "Em t = 6,8 s.", "c": "Em t₁ e t₃.", "d": "Em t₂."},
  "gabarito": "d",
  "resolucao": "Na altura máxima, a velocidade vertical é zero. O gráfico de velocidade escalar mostra o módulo da velocidade. A velocidade é mínima (zero) no ponto mais alto, que corresponde ao instante t₂ (ponto de mínimo entre subida e descida)."
},
{
  "id": "OBFEP-2016-B-07",
  "ano": 2016, "numero": 7, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Bolas de tênis têm massa de 60 g. André Sá consegue imprimir 15 N em uma bola durante o saque. Qual a aceleração resultante? Despreze a força peso. Dado: g = 10 m/s².",
  "opcoes": {
    "a": "8 vezes o valor de g",
    "b": "12 vezes o valor de g",
    "c": "20 vezes o valor de g",
    "d": "25 vezes o valor de g"
  },
  "gabarito": "d",
  "resolucao": "a = F/m = 15 / 0,060 = 250 m/s². Em termos de g: 250/10 = 25 vezes g."
},
{
  "id": "OBFEP-2016-B-08",
  "ano": 2016, "numero": 8, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag03_xref44_366x212.jpg"], "alternativas": {}},
  "enunciado": "Na bocha paralímpica, a esfera do atacante atingiu a do adversário com 3 m/s. Após a colisão, o atacante reduziu para 0,6 m/s (mesmo sentido) e o adversário saiu na mesma direção. Qual o coeficiente de restituição?",
  "opcoes": {"a": "0,4", "b": "0,5", "c": "0,6", "d": "0,7"},
  "gabarito": "c",
  "resolucao": "Conservação de momento (esferas iguais): 3 = 0,6 + v₂' → v₂' = 2,4 m/s. Coeficiente de restituição: e = (v₂' − v₁') / (v₁ − v₂) = (2,4 − 0,6) / (3 − 0) = 1,8/3 = 0,6."
},
{
  "id": "OBFEP-2016-B-09",
  "ano": 2016, "numero": 9, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Energia",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag04_xref52_501x338.jpg"], "alternativas": {}},
  "enunciado": "Marcus Vinicius lança uma flecha de 20 g a 60 m/s deformando o arco 60 cm. Determine a força que o arqueiro mantém enquanto mira. Considere que o arco obedece à lei de Hooke e despreze forças dissipativas.",
  "opcoes": {"a": "120 N", "b": "124 N", "c": "132 N", "d": "136 N"},
  "gabarito": "a",
  "resolucao": "Energia da flecha = energia elástica: (1/2)mv² = (1/2)kx². k = mv²/x² = 0,020 × 60² / 0,60² = 0,020 × 3600 / 0,36 = 200 N/m. Força necessária: F = kx = 200 × 0,60 = 120 N."
},
{
  "id": "OBFEP-2016-B-10",
  "ano": 2016, "numero": 10, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Estática dos Fluidos",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Ronilson de Oliveira (78,70 kg) usa uma canoa de 14,12 kg. A água da lagoa tem densidade 1,02 kg/L. Qual o volume da canoa abaixo do nível da água durante a competição?",
  "opcoes": {"a": "90,0 L", "b": "91,0 L", "c": "92,0 L", "d": "93,0 L"},
  "gabarito": "b",
  "resolucao": "Empuxo = peso total: ρ_água × V × g = (m_atleta + m_canoa) × g → V = (78,70 + 14,12) / 1,02 = 92,82 / 1,02 = 91,0 L."
},
{
  "id": "OBFEP-2016-B-11",
  "ano": 2016, "numero": 11, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Lançamento de Projéteis",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Jan Železný lançou um dardo com 35 m/s a 37° em relação à horizontal. Sem influência do ar, qual o alcance? Dados: g = 10 m/s²; sen 37° = 0,6; cos 37° = 0,8.",
  "opcoes": {"a": "104,2 m", "b": "109,4 m", "c": "117,6 m", "d": "121,0 m"},
  "gabarito": "c",
  "resolucao": "Alcance: R = v₀² × sin(2θ)/g. sin(2×37°) = 2 × sin37° × cos37° = 2×0,6×0,8 = 0,96. R = 35² × 0,96 / 10 = 1225 × 0,96 / 10 = 1176/10 = 117,6 m."
},
{
  "id": "OBFEP-2016-B-12",
  "ano": 2016, "numero": 12, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag04_xref53_424x282.jpg"], "alternativas": {}},
  "enunciado": "O martelo olímpico feminino: bola de ferro de 4 kg presa a um fio de aço de 1,2 m. Anita Wlodarczyk girava a bola a 1,8 m de raio e 30 m/s. Desprezando a gravidade, qual a tração do fio na esfera?",
  "opcoes": {"a": "1800 N", "b": "1900 N", "c": "2000 N", "d": "2400 N"},
  "gabarito": "c",
  "resolucao": "Força centrípeta: F = mv²/r = 4 × 30² / 1,8 = 4 × 900 / 1,8 = 3600 / 1,8 = 2000 N."
},
{
  "id": "OBFEP-2016-B-13",
  "ano": 2016, "numero": 13, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag05_xref56_264x342.jpg"], "alternativas": {}},
  "enunciado": "Joaquim Cruz (800 m, 1984): na última reta, estava a 7 m/s, 4 m atrás de Edwin Koech (7 m/s constante). Joaquim acelerou a 0,5 m/s². Com que velocidade ele ultrapassou Edwin?",
  "opcoes": {"a": "8 m/s", "b": "9 m/s", "c": "10 m/s", "d": "11 m/s"},
  "gabarito": "b",
  "resolucao": "Movimento relativo: Δx(t) = (1/2)×a×t² = 4 m → t² = 4/(0,25) = 16 → t = 4 s. Velocidade de Joaquim ao ultrapassar: v = 7 + 0,5×4 = 9 m/s."
},
{
  "id": "OBFEP-2016-B-14",
  "ano": 2016, "numero": 14, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Refração",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag05_xref57_450x300.jpg"], "alternativas": {}},
  "enunciado": "Com óculos de natação dentro da água, um atleta olha para baixo e vê o fundo da piscina (real: 2 m) a uma profundidade aparente de 1,5 m. Qual o índice de refração da água?",
  "opcoes": {"a": "0,50", "b": "0,75", "c": "1,25", "d": "1,33"},
  "gabarito": "d",
  "resolucao": "n = profundidade real / profundidade aparente = 2,0 / 1,5 = 4/3 ≈ 1,33."
},
{
  "id": "OBFEP-2016-B-15",
  "ano": 2016, "numero": 15, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Calorimetria",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "A piscina olímpica (25×50×2 m) deve ser aquecida de 10 °C até 25 °C em 50 min. Qual a potência mínima do sistema? Dados: c_água = 4,2 kJ/(kg·°C); ρ_água = 1000 kg/m³. Despreze as perdas.",
  "opcoes": {"a": "52.500 kW", "b": "55.200 kW", "c": "60.000 kW", "d": "64.800 kW"},
  "gabarito": "a",
  "resolucao": "Volume: 25×50×2 = 2500 m³. Massa: 2.500.000 kg. ΔT = 25−10 = 15 °C. Q = 2.500.000 × 4,2 × 15 = 157.500.000 kJ. Tempo: 50 min = 3000 s. P = Q/t = 157.500.000/3000 = 52.500 kW."
},
{
  "id": "OBFEP-2016-B-16",
  "ano": 2016, "numero": 16, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Prova de subida de corda (10 m): atleta de 82 kg subiu em 6,7 s. Nos primeiros segundos, ele aplicou força média de 943 N para baixo na corda. Qual o valor da aceleração média deste atleta nesses primeiros segundos? Dado: g = 10 m/s².",
  "opcoes": {"a": "0,8 m/s²", "b": "1,0 m/s²", "c": "1,2 m/s²", "d": "1,5 m/s²"},
  "gabarito": "d",
  "resolucao": "A tensão na corda (força que o atleta exerce para baixo) pela 3ª Lei = T = 943 N puxando o atleta para cima. Equação: T − mg = ma → 943 − 82×10 = 82×a → 943 − 820 = 82a → 123 = 82a → a = 1,5 m/s²."
},
{
  "id": "OBFEP-2016-B-17",
  "ano": 2016, "numero": 17, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Estática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag06_xref60_531x423.png"], "alternativas": {}},
  "enunciado": "Robert Scheidt (iatismo): em MRU, as forças do vento na vela e da água na bolina se equilibram com a resistência da água ao movimento. Obedecendo a escala do quadriculado, determine o valor aproximado da força resultante das duas forças apresentadas no diagrama.",
  "opcoes": {"a": "12 N", "b": "15 N", "c": "16 N", "d": "18 N"},
  "gabarito": "d",
  "resolucao": "Lendo as componentes do vetor resultante no quadriculado (força do vento + força da bolina): a resultante tem módulo ≈ 18 N conforme a escala do diagrama."
},
{
  "id": "OBFEP-2016-B-18",
  "ano": 2016, "numero": 18, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Um ciclista jamaicano percorreu 240 km em 4 horas na prova de estrada. A bicicleta tem rodas de 25 cm de raio. Qual a velocidade angular média das rodas?",
  "opcoes": {"a": "4000 rad/min", "b": "4200 rad/min", "c": "4600 rad/min", "d": "5000 rad/min"},
  "gabarito": "a",
  "resolucao": "Velocidade linear: v = 240 km / 4 h = 60 km/h = 1000 m/min. Velocidade angular: ω = v/r = 1000 / 0,25 = 4000 rad/min."
},
{
  "id": "OBFEP-2016-B-19",
  "ano": 2016, "numero": 19, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Energia",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Uma arma olímpica dispara um projétil de 2 g via expansão gasosa. O gráfico p* × V (pressão efetiva vs. volume) é um triângulo retângulo com p*_max = 18×10⁵ Pa e ΔV = 4×10⁻⁴ m³. Desprezando atrito, com que velocidade o projétil é disparado?",
  "opcoes": {"a": "400 m/s", "b": "500 m/s", "c": "600 m/s", "d": "800 m/s"},
  "gabarito": "c",
  "resolucao": "Trabalho do gás = área do triângulo no gráfico p* × V: W = (1/2) × 18×10⁵ × 4×10⁻⁴ = (1/2) × 720 = 360 J. Energia cinética: W = (1/2)mv² → 360 = (1/2)(2×10⁻³)v² → v² = 360000 → v = 600 m/s."
},
{
  "id": "OBFEP-2016-B-20",
  "ano": 2016, "numero": 20, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Calorimetria",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Vitor Hugo (100 m em 10 s): dormindo, temperatura interna da pele = 40,5 °C, externa = 35,5 °C, fluxo térmico = 4 kW. Correndo, temperaturas mudam para 47,0 °C e 37,0 °C. Quantos gramas de gelo a 0 °C poderiam ser derretidos com o calor que passa pela pele durante a prova? Dados: calor latente de fusão do gelo = 80 cal/g; 1 cal = 4 J.",
  "opcoes": {"a": "240 g", "b": "250 g", "c": "280 g", "d": "300 g"},
  "gabarito": "b",
  "resolucao": "ΔT dormindo = 5 °C → P = 4 kW. ΔT correndo = 10 °C (o dobro) → P_correndo = 8 kW. Calor em 10 s: Q = 8000 × 10 = 80.000 J. Calor latente: L = 80 cal/g × 4 J/cal = 320 J/g. Massa de gelo: m = 80.000 / 320 = 250 g."
},
]

data['banco_questoes'].extend(questoes)

with open('banco-questoes/fisica_ufrgs.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Total: {len(data['banco_questoes'])} questoes")
