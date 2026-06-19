import json

with open('banco-questoes/fisica_ufrgs.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

IMG = 'obfep/2019/C-F1'

questoes = [
{
  "id": "OBFEP-2019-C-01",
  "ano": 2019, "numero": 1, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Transmissão de Calor",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Em Urupema (SC), Adriana tinha dois casacos: um de lã (espessura 2,4 mm) e outro de poliéster (espessura 1,8 mm). Qual desses casacos deve ser usado para se proteger do frio com maior eficiência?\n\nDados: condutividade térmica da lã = 0,04 W/(m·K); condutividade térmica do poliéster = 0,03 W/(m·K)",
  "opcoes": {
    "a": "O casaco de lã é mais eficiente.",
    "b": "O casaco de poliéster é mais eficiente.",
    "c": "Os dois são igualmente eficientes.",
    "d": "Não é possível definir qual o casaco é o mais eficiente."
  },
  "gabarito": "c",
  "resolucao": "A resistência térmica por unidade de área é R = d/k. R_lã = 2,4×10⁻³/0,04 = 0,06 m²K/W. R_poliéster = 1,8×10⁻³/0,03 = 0,06 m²K/W. As resistências são iguais → os dois casacos são igualmente eficientes."
},
{
  "id": "OBFEP-2019-C-02",
  "ano": 2019, "numero": 2, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref38_230x240.jpg"], "alternativas": {}},
  "enunciado": "O elevador do Yachthouse possui contrapeso, funcionando como adaptação da 'máquina de Atwood'. O elevador (E) tem 1200 kg e o contrapeso (C) tem 800 kg. Um motor (M) produz uma diferença entre as trações nas extremidades do cabo de 9000 N. Calcule a aceleração do elevador ao subir.\n\nDados: g = 10 m/s²; despreze o atrito.",
  "opcoes": {"a": "2,0 m/s²", "b": "2,5 m/s²", "c": "3,0 m/s²", "d": "3,5 m/s²"},
  "gabarito": "b",
  "resolucao": "Para o sistema (E subindo, C descendo): Força resultante = ΔT − (m_E − m_C)g = 9000 − (1200 − 800)×10 = 9000 − 4000 = 5000 N. Massa total = 1200 + 800 = 2000 kg. a = 5000/2000 = 2,5 m/s²."
},
{
  "id": "OBFEP-2019-C-03",
  "ano": 2019, "numero": 3, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Eletromagnetismo", "subarea": "Circuitos",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag03_xref42_396x216.jpg"], "alternativas": {}},
  "enunciado": "Itaipu alimenta Chapecó via circuito com dois fios de cobre. Itaipu: gerador com f.c.e.m. = 18 kV. Chapecó: receptor com f.c.c.m. = 12 kV. Os fios têm seção transversal de 9 mm² e comprimento total de 400 km (ida + volta). Resistividade do cobre: 1,8×10⁻² mm²/m. Qual a potência consumida por Chapecó?\n\n(Distância Itaipu–Chapecó = 200 km)",
  "opcoes": {"a": "30 kW", "b": "35 kW", "c": "40 kW", "d": "45 kW"},
  "gabarito": "d",
  "resolucao": "Resistência total dos dois fios: R = ρ × L_total / A = 1,8×10⁻² × 400×10³ / 9 = 800 Ω (por fio) × 2 fios = 1600 Ω. Corrente: I = (f.c.e.m. − f.c.c.m.) / R = (18000 − 12000) / 1600 = 6000/1600 = 3,75 A. Potência de Chapecó: P = f.c.c.m. × I = 12000 × 3,75 = 45000 W = 45 kW."
},
{
  "id": "OBFEP-2019-C-04",
  "ano": 2019, "numero": 4, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Estática dos Fluidos",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Em Campos do Jordão (SP), Adriana usou um barômetro de Torricelli com éter (pressão de vapor = 58,6 kPa). A coluna de éter mediu 2,0 m. Qual a pressão atmosférica local?\n\nDados: densidade do éter = 710 kg/m³; g = 10 m/s²",
  "opcoes": {"a": "72,8 kPa", "b": "76,4 kPa", "c": "80,4 kPa", "d": "86,7 kPa"},
  "gabarito": "a",
  "resolucao": "No barômetro com líquido de pressão de vapor não nula: P_atm = P_vapor + ρgh = 58600 + 710 × 10 × 2,0 = 58600 + 14200 = 72800 Pa = 72,8 kPa."
},
{
  "id": "OBFEP-2019-C-05",
  "ano": 2019, "numero": 5, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Se o meteorito de Bendegó (5 toneladas) atingisse Aegaeon (menor satélite de Júpiter, 10⁸ toneladas), no sentido contrário ao seu movimento, alteraria a velocidade de Aegaeon de 15,2357 km/s para 15,2356 km/s. Desprezando o aumento de massa de Aegaeon, qual a velocidade do Bendegó no espaço?",
  "opcoes": {"a": "1,0×10³ km/s", "b": "2,0×10³ km/s", "c": "3,0×10² km/s", "d": "4,0×10² km/s"},
  "gabarito": "b",
  "resolucao": "Conservação do momento: m_Ae × Δv = m_B × v_B. 10⁸ × (15,2357 − 15,2356) = 5 × v_B. 10⁸ × 10⁻⁴ = 5 × v_B. v_B = 10⁴/5 = 2×10³ km/s."
},
{
  "id": "OBFEP-2019-C-06",
  "ano": 2019, "numero": 6, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Uma onça pintada pode desenvolver aceleração de 12 m/s² durante 0,6 s a partir do repouso. A que distância da grade ela deve estar para cheguar à grade exatamente em 0,6 s?",
  "opcoes": {"a": "1,42 m", "b": "1,88 m", "c": "1,94 m", "d": "2,16 m"},
  "gabarito": "d",
  "resolucao": "MRUV a partir do repouso: d = ½at² = ½ × 12 × (0,6)² = 6 × 0,36 = 2,16 m."
},
{
  "id": "OBFEP-2019-C-07",
  "ano": 2019, "numero": 7, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Óptica Geométrica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag04_xref55_512x328.jpg"], "alternativas": {}},
  "enunciado": "A superfície do lago da Serra da Mesa funciona como espelho convexo com foco C no centro da Terra (6.000 km de profundidade). O Sol está no infinito, portanto sua imagem ficaria no centro da Terra. Adriana estimou que a imagem fica a 4.000 km do Centro da Terra (deslocada em direção à superfície). Isso ocorre porque a atmosfera age como uma lente convergente com centro óptico a 15.000 km de altitude. Qual a distância focal dessa lente?",
  "opcoes": {"a": "8 mil km", "b": "10 mil km", "c": "12 mil km", "d": "16 mil km"},
  "gabarito": "c",
  "resolucao": "Sem atmosfera: espelho convexo (f_espelho = −6000 km), Sol no infinito → imagem no foco = centro da Terra (6000 km abaixo). Para a imagem ficar a 4000 km do centro (= 2000 km abaixo da superfície), analisa-se o efeito da lente atmosférica: a lente a 15000 km de altitude deve criar um objeto virtual para o espelho a 3000 km de altitude (calculado pelo espelho: 1/d_i + 1/d_o = 1/f; d_i=−2000km; f=−6000km → d_o=3000km). Para a lente convergente com foco paralelo do Sol (d_o=∞): f_lente = distância da lente ao objeto que criou = 15000 − 3000 = 12000 km."
},
{
  "id": "OBFEP-2019-C-08",
  "ano": 2019, "numero": 8, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Uma lancha (800 kg) no Rio São Francisco tem área de seção transversal imersa A = 2 − 0,05V (m²) e força de resistência da água R = 20AV (N), onde V é a velocidade em m/s. A força motora é 336 N. Determine a velocidade máxima em MRU.",
  "opcoes": {"a": "12 m/s", "b": "16 m/s", "c": "20 m/s", "d": "28 m/s"},
  "gabarito": "d",
  "resolucao": "Em MRU: força motora = resistência. 336 = 20 × (2 − 0,05V) × V = 40V − V². V² − 40V + 336 = 0. Discriminante: Δ = 1600 − 1344 = 256. V = (40 ± 16)/2. V₁ = 28 m/s, V₂ = 12 m/s. Para V=28: A = 2 − 1,4 = 0,6 > 0 ✓. A velocidade máxima (estado de cruzeiro) é V = 28 m/s."
},
{
  "id": "OBFEP-2019-C-09",
  "ano": 2019, "numero": 9, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Óptica Geométrica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Na Toca da Boa Vista (BA), Carlos posicionou uma lente convergente (f = 2 m) a 2,5 m de uma vela (chama de 3 cm de comprimento vertical). Uma imagem foi projetada na parede da caverna. Qual o comprimento vertical da chama projetada?",
  "opcoes": {"a": "12 cm", "b": "15 cm", "c": "18 cm", "d": "21 cm"},
  "gabarito": "a",
  "resolucao": "1/d_i = 1/f − 1/d_o = 1/2 − 1/2,5 = 0,10 → d_i = 10 m. Ampliação: |m| = d_i/d_o = 10/2,5 = 4. Imagem: 3 × 4 = 12 cm."
},
{
  "id": "OBFEP-2019-C-10",
  "ano": 2019, "numero": 10, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Calorimetria",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Adriana colocou um bloco de ácido acético (40 g, inicialmente a 5,0 °C) no chão a 40 °C em Bom Jesus (PI). A potência de absorção de calor foi de 160 W. Quanto tempo levou para atingir equilíbrio com o chão?\n\nDados: T_fusão = 16,6 °C; c (sólido e líquido) = 0,60 cal/(g·°C); L_fusão = 52 cal/g; 1 cal = 4 J",
  "opcoes": {"a": "1 min e 13 s", "b": "1 min e 24 s", "c": "1 min e 48 s", "d": "2 min e 6 s"},
  "gabarito": "a",
  "resolucao": "Q_total = 40×0,60×11,6 + 40×52 + 40×0,60×23,4 = 278,4 + 2080 + 561,6 = 2920 cal = 11680 J. t = Q/P = 11680/160 = 73 s = 1 min 13 s."
},
{
  "id": "OBFEP-2019-C-11",
  "ano": 2019, "numero": 11, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Gravitação",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag05_xref58_909x268.jpg"], "alternativas": {}},
  "enunciado": "Da base de Alcântara (MA), deve ser lançado um satélite para orbitar a Terra em trajetória circular com raio de 10.000 km (a partir do centro da Terra). Qual a velocidade orbital necessária?\n\nDados: G = 6×10⁻¹¹ N·m²/kg²; massa da Terra = 6×10²⁴ kg",
  "opcoes": {"a": "2000 m/s", "b": "3000 m/s", "c": "4000 m/s", "d": "6000 m/s"},
  "gabarito": "d",
  "resolucao": "Força gravitacional = força centrípeta: GMm/r² = mv²/r → v² = GM/r = (6×10⁻¹¹ × 6×10²⁴)/(10⁴×10³) = 36×10¹³/10⁷ = 36×10⁶ m²/s². v = 6×10³ m/s = 6000 m/s."
},
{
  "id": "OBFEP-2019-C-12",
  "ano": 2019, "numero": 12, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag05_xref59_428x424.jpg"], "alternativas": {}},
  "enunciado": "Na Estrada de Ferro Carajás (PA), um trem de 100 toneladas sobe uma ladeira inclinada de 26° com velocidade constante de 5 m/s. O coeficiente de atrito cinético é 0,2. Qual a potência útil do motor do trem?\n\nDados: sen 26° = 0,4; cos 26° = 0,9; g = 10 m/s²",
  "opcoes": {"a": "2,5 MW", "b": "2,9 MW", "c": "3,2 MW", "d": "3,6 MW"},
  "gabarito": "b",
  "resolucao": "F_motor em MRU: F = mg·sen26° + μmg·cos26° = 100×10⁴ × (0,4 + 0,2×0,9) = 10⁶ × 0,58 = 5,8×10⁵ N. P = F × v = 5,8×10⁵ × 5 = 2,9×10⁶ W = 2,9 MW."
},
{
  "id": "OBFEP-2019-C-13",
  "ano": 2019, "numero": 13, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Ondulatória", "subarea": "Ondas Mecânicas",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag05_xref61_376x120.jpg"], "alternativas": {}},
  "enunciado": "A Ponte de Tacoma entrou em colapso quando o vento oscilava a 0,25 Hz, em ressonância com o segundo harmônico do trecho AB (120 m entre os mastros fixos). Qual a velocidade da onda associada a esse harmônico?",
  "opcoes": {"a": "30 m/s", "b": "40 m/s", "c": "50 m/s", "d": "60 m/s"},
  "gabarito": "a",
  "resolucao": "O 2° harmônico de uma corda fixada nas duas extremidades tem comprimento de onda λ = L = 120 m (dois nós nas extremidades + um ventre no meio → duas meias-ondas encaixadas no comprimento L). v = f × λ = 0,25 × 120 = 30 m/s."
},
{
  "id": "OBFEP-2019-C-14",
  "ano": 2019, "numero": 14, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "A Cachoeira do El Dourado (AM) tem 361,25 m de altura. A água inicia a queda com velocidade horizontal de 17 m/s. Qual a tangente do ângulo formado pela velocidade final com a horizontal?\n\nDados: g = 10 m/s²; resistência do ar desprezível",
  "opcoes": {"a": "3", "b": "4", "c": "5", "d": "10"},
  "gabarito": "c",
  "resolucao": "Velocidade vertical ao atingir a base: v_y² = 2gh = 2×10×361,25 = 7225 → v_y = 85 m/s. Tangente do ângulo com a horizontal: tan θ = v_y/v_x = 85/17 = 5."
},
{
  "id": "OBFEP-2019-C-15",
  "ano": 2019, "numero": 15, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Eletromagnetismo", "subarea": "Eletrostática",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "No voo de volta, o avião entrou em nuvem de trovoada com raios entre as nuvens. Carlos acalmou a irmã dizendo que a superfície externa condutora do avião possui uma propriedade que impede a interferência das cargas elétricas externas nos sistemas eletrônicos internos. Que propriedade é essa?",
  "opcoes": {
    "a": "Poder das pontas.",
    "b": "Blindagem eletrostática.",
    "c": "Baixa absorvidade.",
    "d": "Alta refletividade."
  },
  "gabarito": "b",
  "resolucao": "A gaiola de Faraday (blindagem eletrostática): uma casca condutora fechada isola o interior de campos elétricos externos. No condutor em equilíbrio eletrostático, o campo interno é zero. O avião age como uma gaiola de Faraday, protegendo os sistemas eletrônicos internos de perturbações elétricas externas."
},
]

data['banco_questoes'].extend(questoes)

with open('banco-questoes/fisica_ufrgs.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Total: {len(data['banco_questoes'])} questoes")
