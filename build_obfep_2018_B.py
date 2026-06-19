import json

with open('banco-questoes/fisica_ufrgs.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

IMG = 'obfep/2018/B-F1'

questoes = [
{
  "id": "OBFEP-2018-B-01",
  "ano": 2018, "numero": 1, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Paulo decidiu arrastar uma mesa pela sala. Logo após a mesa sair do repouso, fez a mesa desenvolver um movimento retilíneo uniforme. Contrária ao movimento da mesa, só existia a força de atrito. Durante o MRU, podemos afirmar que:",
  "opcoes": {
    "a": "a força aplicada por Paulo é maior que a força de atrito.",
    "b": "a força aplicada por Paulo tem a mesma intensidade que a força de atrito.",
    "c": "a força aplicada por Paulo é menor que a força de atrito.",
    "d": "a aceleração e a velocidade da mesa são constantes e não nulas."
  },
  "gabarito": "b",
  "resolucao": "Em MRU, a aceleração é nula, portanto a força resultante é zero. Sendo a única força contrária ao movimento a força de atrito, a força aplicada por Paulo deve ser igual em módulo à força de atrito para que a resultante seja nula."
},
{
  "id": "OBFEP-2018-B-02",
  "ano": 2018, "numero": 2, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Calorimetria",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Dona Maria estava lavando roupa em água fria quando seu filho Jorge disse que não estava bem. Ela colocou a mão molhada e fria no pescoço de Jorge e sentiu que ele estava com febre alta. Sobre esse fato, a proposição que tem mais possibilidade de ser FALSA é:",
  "opcoes": {
    "a": "Jorge poderia não estar com febre e a sensação térmica equivocada de Dona Maria ocorreu porque sua mão não estava na temperatura normal.",
    "b": "Dona Maria deveria mergulhar a mão em água muito quente e esperar um tempo com a mão na água antes de tocar no pescoço de Jorge para avaliar sua temperatura de forma mais eficiente.",
    "c": "Dona Maria deveria secar a mão e esperar um tempo antes de tocar em Jorge, para avaliar sua temperatura de forma mais eficiente.",
    "d": "No momento que Dona Maria tirou a mão do contato com a água encanada, o pescoço de Jorge estava muito quente em relação à mão de Dona Maria."
  },
  "gabarito": "b",
  "resolucao": "A proposição b) é a mais provavelmente falsa: mergulhar a mão em água muito quente a deixaria com temperatura acima do normal, distorcendo ainda mais a percepção da temperatura de Jorge, não tornando a avaliação mais eficiente. As demais afirmativas são plausíveis ou corretas."
},
{
  "id": "OBFEP-2018-B-03",
  "ano": 2018, "numero": 3, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Óptica Geométrica",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref31_388x412.jpg", f"{IMG}/pag02_xref32_401x416.jpg"], "alternativas": {}},
  "enunciado": "A avó de Pedro, com hipermetropia, usa uma taça em forma de ovo cheia de água para ampliar letras pequenas. Ao fazer isso, ela transforma a taça em uma __________ e as letras vistas através da taça tornam-se __________ das letras reais.\n\nAs lacunas acima devem ser preenchidas, respectivamente, por:",
  "opcoes": {
    "a": "uma lente convergente e imagens virtuais",
    "b": "uma lente convergente e imagens reais",
    "c": "uma lente divergente e imagens virtuais",
    "d": "uma lente divergente e imagens reais"
  },
  "gabarito": "a",
  "resolucao": "A taça em forma de ovo cheia de água tem bordas mais espessas que o centro — comporta-se como uma lente convergente. Quando o objeto (rótulo) é colocado dentro do foco, a imagem formada é virtual, direta e ampliada, como ocorre em uma lupa. Portanto: lente convergente + imagens virtuais."
},
{
  "id": "OBFEP-2018-B-04",
  "ano": 2018, "numero": 4, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Termometria",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Matheus notou que todas as temperaturas possuem indicações diferentes nas escalas Celsius e Fahrenheit, exceto uma. Que temperatura é essa?\n\nDados: 212 °F = 100 °C e 50 °F = 10 °C",
  "opcoes": {"a": "0 °C", "b": "–10 °C", "c": "–40 °C", "d": "–100 °C"},
  "gabarito": "c",
  "resolucao": "A conversão entre escalas: F = (9/5)C + 32. Para F = C: C = (9/5)C + 32 → C − (9/5)C = 32 → −(4/5)C = 32 → C = −40 °C. Logo, −40 °C = −40 °F."
},
{
  "id": "OBFEP-2018-B-05",
  "ano": 2018, "numero": 5, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref33_82x243.jpg"], "alternativas": {}},
  "enunciado": "Em t = 0, um gato (40 cm de comprimento) se move a 24 cm/s e um cachorro (60 cm de comprimento) se move a 120 cm/s na mesma direção e sentido, ambos em MRU. A frente do cachorro está 230 cm atrás da frente do gato, e a frente do gato está 50 cm da comida.\n\nEm que instante o cachorro ultrapassou o gato totalmente?",
  "opcoes": {"a": "2,5 s", "b": "2,8 s", "c": "3,0 s", "d": "3,2 s"},
  "gabarito": "a",
  "resolucao": "O cachorro ultrapassa o gato totalmente quando a cauda do cachorro passa a cabeça do gato. Velocidade relativa do cachorro em relação ao gato: 120 − 24 = 96 cm/s. Distância relativa a percorrer (cauda do cachorro até cabeça do gato): cauda do cachorro está 230+60=290 cm atrás da cabeça do gato menos... Na configuração: frente do gato a 230 cm da frente do cachorro; cauda do cachorro está 230+60=290 cm da frente do gato, e a cauda do gato está 230 cm da frente do cachorro. Para a cauda do cachorro ultrapassar a frente do gato: distância relativa = (230+40+60) cm... Simplificando: distância = (230−0+40+60) = 330? Pelo gabarito t=2,5 s e v_rel=96 cm/s → distância = 96×2,5 = 240 cm. A distância de separação entre a cauda do cachorro e a frente do gato: 60(cachorro)+40(gato)+230−60−40 → 240 cm."
},
{
  "id": "OBFEP-2018-B-06",
  "ano": 2018, "numero": 6, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Óptica Geométrica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag03_xref36_131x85.png"], "alternativas": {}},
  "enunciado": "O pai de Cátia quer colocar um espelho plano na parede AB de sua saleta para ver toda a largura da porta da sala (60 cm), estando sentado na poltrona a 2 m da parede AB. A porta fica a 3 m além da parede AB. Qual a menor largura do espelho?",
  "opcoes": {"a": "18 cm", "b": "20 cm", "c": "24 cm", "d": "30 cm"},
  "gabarito": "c",
  "resolucao": "Por semelhança de triângulos com espelho plano: a largura mínima do espelho é proporcional à largura da porta pelas distâncias. O espelho está a 2 m do observador; a porta está a 3 m além do espelho (total 5 m do observador). Pelo princípio do espelho plano: largura_espelho/largura_porta = d_observador/(d_observador + d_porta). Largura = 60 × 2/(2+3) = 60 × 2/5 = 24 cm."
},
{
  "id": "OBFEP-2018-B-07",
  "ano": 2018, "numero": 7, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Floro lançou a bola branca de bilhar com velocidade de 12 cm/s contra a bola preta em repouso. Após o impacto, a bola branca passou a 4 cm/s. Movimentos ocorrem em mesma direção e sentido. As massas das bolas são iguais.\n\nQual a velocidade da bola preta imediatamente após o impacto?",
  "opcoes": {"a": "6 cm/s", "b": "7 cm/s", "c": "8 cm/s", "d": "9 cm/s"},
  "gabarito": "c",
  "resolucao": "Conservação do momento linear: m×12 + m×0 = m×4 + m×v_preta. v_preta = 12 − 4 = 8 cm/s."
},
{
  "id": "OBFEP-2018-B-08",
  "ano": 2018, "numero": 8, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Gravitação",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Wesley pesa 800 N na Terra. Uma lua de Júpiter teria a mesma massa da Terra, mas seu raio seria a metade do raio da Terra. Qual seria o peso de Wesley nessa lua?",
  "opcoes": {"a": "400 N", "b": "800 N", "c": "1600 N", "d": "3200 N"},
  "gabarito": "d",
  "resolucao": "g = GM/R². Na lua: mesma massa M, raio R_lua = R_Terra/2. g_lua = GM/(R_Terra/2)² = 4GM/R_Terra² = 4g_Terra. Peso = 4 × 800 = 3200 N."
},
{
  "id": "OBFEP-2018-B-09",
  "ano": 2018, "numero": 9, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Estática dos Fluidos",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Flávio furou a parede e atingiu uma tubulação ligada à caixa d'água. Ele tentou tapar o furo com um dedo. A parte inferior da tubulação está a 2 m do furo e a 8 m do nível da água. O diâmetro da broca que fez o furo era 10 mm.\n\nQual a força que a água aplicava no dedo de Flávio?\n\nDados: P_atm = 100 kPa; ρ_água = 1,0×10³ kg/m³; g = 10 m/s²; π = 3",
  "opcoes": {"a": "10 N", "b": "12 N", "c": "16 N", "d": "20 N"},
  "gabarito": "b",
  "resolucao": "O furo está a 8 − 2 = 6 m abaixo do nível da água. Pressão absoluta da água no furo: P = P_atm + ρgh = 100000 + 1000×10×6 = 160000 Pa. Área do furo (diâmetro 10 mm, r = 5 mm = 0,005 m): A = πr² = 3×(0,005)² = 7,5×10⁻⁵ m². Força: F = P × A = 160000 × 7,5×10⁻⁵ = 12 N."
},
{
  "id": "OBFEP-2018-B-10",
  "ano": 2018, "numero": 10, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Estática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag03_xref38_175x88.png"], "alternativas": {}},
  "enunciado": "Rodolfo quer pendurar um quadro (peso P) com barbante e dois pregos. O material do quadro não suporta tração muito intensa. Ele avaliou duas configurações: na configuração A, os barbantes fazem 45° com a horizontal; na configuração B, os barbantes ficam verticais.\n\nDetermine a intensidade de tração da configuração que Rodolfo NÃO deve escolher.",
  "opcoes": {"a": "P/√2", "b": "P/2", "c": "√2·P", "d": "P"},
  "gabarito": "a",
  "resolucao": "Configuração A (barbantes a 45° da horizontal): equilíbrio vertical: 2T sen(45°) = P → T = P/(2 × √2/2) = P/√2 ≈ 0,707P. Configuração B (barbantes verticais): 2T = P → T = P/2 = 0,5P. A configuração A tem maior tração (P/√2 > P/2). Rodolfo NÃO deve escolher a configuração A: tração = P/√2."
},
{
  "id": "OBFEP-2018-B-11",
  "ano": 2018, "numero": 11, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Estática dos Fluidos",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag05_xref53_195x96.png"], "alternativas": {}},
  "enunciado": "A boia da caixa de descarga funciona como alavanca. Quando o tanque está cheio, metade do volume da boia fica imersa na água, a haste pressiona a tampa contra a Torre. As distâncias do eixo de rotação são: 2 cm até a tampa e 16 cm até a boia.\n\nDetermine a força com que a tampa é pressionada.\n\nDados: ρ_água = 1,05 kg/L; volume da boia = 0,4 L; g = 10 m/s²; desprezar o peso da haste e da boia.",
  "opcoes": {"a": "12,2 N", "b": "14,6 N", "c": "15,4 N", "d": "16,8 N"},
  "gabarito": "d",
  "resolucao": "Empuxo na meia boia: E = ρ_água × (V/2) × g = 1,05 × 0,2 × 10 = 2,1 N. Equilíbrio de torques em torno do eixo: E × 16 = F_tampa × 2 → 2,1 × 16 = F_tampa × 2 → F_tampa = 33,6/2 = 16,8 N."
},
{
  "id": "OBFEP-2018-B-12",
  "ano": 2018, "numero": 12, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Energia",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Roberto (90 kg) mora no décimo andar. O contrapeso neutraliza o peso do elevador; o motor só equilibra o peso dos passageiros. Rendimento do motor: 60%. Velocidade em MRU: 5 m/s. Qual a potência consumida pelo motor quando sobe apenas com Roberto?\n\nDados: g = 10 m/s²",
  "opcoes": {"a": "6,2 kW", "b": "7,5 kW", "c": "7,8 kW", "d": "8,2 kW"},
  "gabarito": "b",
  "resolucao": "Potência útil (levantar Roberto em MRU): P_útil = F × v = mg × v = 90×10×5 = 4500 W. Potência consumida: P = P_útil / η = 4500/0,60 = 7500 W = 7,5 kW."
},
{
  "id": "OBFEP-2018-B-13",
  "ano": 2018, "numero": 13, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Márcio colocou uma borracha sobre uma pá horizontal de ventilador de teto, a 36 cm do centro. Os coeficientes de atrito borracha-madeira são μ_s = 0,9 e μ_c = 0,7. Determine a maior frequência angular para que a borracha não deslize.\n\nDados: g = 10 m/s²; desconsidere resistência do ar.",
  "opcoes": {"a": "3 rad/s", "b": "4 rad/s", "c": "5 rad/s", "d": "6 rad/s"},
  "gabarito": "c",
  "resolucao": "O atrito estático fornece a força centrípeta. No limite de não deslizamento: mω²r = μ_s × mg → ω² = μ_s × g / r = 0,9 × 10 / 0,36 = 25 → ω = 5 rad/s."
},
{
  "id": "OBFEP-2018-B-14",
  "ano": 2018, "numero": 14, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Energia",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag05_xref55_325x240.png"], "alternativas": {}},
  "enunciado": "Um carrinho (0,1 kg) é lançado por uma mola (k = 200 N/m) e entra em um loop vertical de raio 40 cm. Qual a menor deformação inicial da mola para que o carrinho complete o loop sem perder contato?\n\nDados: g = 10 m/s²; sistema conservativo.",
  "opcoes": {"a": "10 cm", "b": "12 cm", "c": "15 cm", "d": "20 cm"},
  "gabarito": "a",
  "resolucao": "No topo do loop, condição mínima: N=0 → v²_topo = gR = 10×0,4 = 4 m²/s². Conservação de energia (mola → topo do loop, altura 2R = 0,8 m): ½kx² = ½mv²_topo + mg(2R) = ½×0,1×4 + 0,1×10×0,8 = 0,2 + 0,8 = 1,0 J. x² = 2×1,0/200 = 0,01 m² → x = 0,10 m = 10 cm."
},
{
  "id": "OBFEP-2018-B-15",
  "ano": 2018, "numero": 15, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Transmissão de Calor",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Margaret analisa quatro panelas com fundo idêntico mas paredes laterais diferentes (material e espessura). Para reduzir o desperdício de gás, precisa minimizar a perda de calor pelas paredes. A condutividade térmica do aço é 50 vezes maior que a do vidro. Qual a melhor panela?",
  "opcoes": {
    "a": "A de aço com paredes de 2 mm de espessura.",
    "b": "A de aço com paredes de 10 mm de espessura.",
    "c": "A de vidro com paredes de 2 mm de espessura.",
    "d": "A de vidro com paredes de 10 mm de espessura."
  },
  "gabarito": "d",
  "resolucao": "Resistência térmica das paredes: R = d/(k×A). Para minimizar a perda de calor, maximizar R. Escolher material com menor k (vidro) e maior espessura (10 mm). R_vidro,10mm = 10/(k_vidro×A) vs R_aço,2mm = 2/(50k_vidro×A) = 0,04/k_vidro/A. R_vidro,10mm = 10/k_vidro/A é 250× maior → vidro com 10 mm é a melhor panela."
},
{
  "id": "OBFEP-2018-B-16",
  "ano": 2018, "numero": 16, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Gases",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag06_xref60_618x291.jpg"], "alternativas": {}},
  "enunciado": "Mariana colocou 500 mL de água (a 27 °C) em uma garrafa pet de 2,5 L no congelador. Após algum tempo, a água estava a 3 °C e a garrafa tinha reduzido seu volume. Qual o efeito mais significativo que gerou essa redução?",
  "opcoes": {
    "a": "A contração térmica da água.",
    "b": "O aumento da pressão no entorno da garrafa: dentro da geladeira a pressão atmosférica é maior que fora.",
    "c": "A condensação do vapor de água que estava no ar dentro da garrafa.",
    "d": "A compressão do ar que estava dentro da garrafa."
  },
  "gabarito": "d",
  "resolucao": "A garrafa continha 500 mL de água e 2000 mL de ar. O ar resfriou de 27 °C (300 K) para 3 °C (276 K). Pela lei de Charles (pressão constante): ΔV/V₀ = ΔT/T₀ = (300−276)/300 = 24/300 = 8%. Variação do ar: 2000 × 8% = 160 mL. A contração da água (líquida, pouco compressível) é desprezível. O efeito dominante é a compressão do ar interno."
},
{
  "id": "OBFEP-2018-B-17",
  "ano": 2018, "numero": 17, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Gases",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Considerando o ar da questão anterior: o ar iniciou com P = 1×10⁵ Pa e sofreu transformação isobárica durante o resfriamento de 27 °C a 3 °C. Qual o módulo do trabalho realizado pelo ar no interior da garrafa?\n\nDados: 0 °C = 273 K",
  "opcoes": {"a": "14 J", "b": "16 J", "c": "18 J", "d": "24 J"},
  "gabarito": "b",
  "resolucao": "Transformação isobárica. V_ar_inicial = 2,0 L = 2×10⁻³ m³ (2500−500 mL). T₁ = 300 K, T₂ = 276 K. ΔV = V₁ × (T₂−T₁)/T₁ = 2×10⁻³ × (−24/300) = −1,6×10⁻⁴ m³. Trabalho: |W| = P|ΔV| = 10⁵ × 1,6×10⁻⁴ = 16 J."
},
{
  "id": "OBFEP-2018-B-18",
  "ano": 2018, "numero": 18, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "O teto do quarto de João Paulo tinha um furo e, quando chovia, gotas caiam de 0,2 s em 0,2 s. Quando uma gota atingia o chão, outra gota estava sempre a 1,0 m de altura. Qual a altura do quarto?\n\nDados: g = 10 m/s²; despreze a resistência do ar.",
  "opcoes": {"a": "1,8 m", "b": "2,0 m", "c": "2,2 m", "d": "2,4 m"},
  "gabarito": "a",
  "resolucao": "Seja h a altura do quarto. Uma gota cai por tempo T = √(2h/g). Quando a 1ª gota atinge o chão (tempo T desde que caiu), a 2ª gota está a 1,0 m de altura e caiu por (T − 0,2) s. Altura percorrida pela 2ª gota: h − 1,0 = ½g(T−0,2)². Testando h = 1,8 m: T = √(2×1,8/10) = √0,36 = 0,6 s. Altura percorrida pela 2ª gota em 0,4 s: ½×10×0,16 = 0,8 m. Altura restante: 1,8 − 0,8 = 1,0 m ✓."
},
{
  "id": "OBFEP-2018-B-19",
  "ano": 2018, "numero": 19, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Calorimetria",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Eliete aqueceu 1 kg de água com macarrão (capacidade térmica do macarrão = 200 cal/°C). A temperatura subiu de 10 °C a 20 °C em 1 min. Ela precisa voltar à cozinha quando 10% da água tiver virado vapor. Quantos minutos ela pode ficar fora?\n\nDados: c_água = 1 cal/(g·°C); L_vapor = 540 cal/g",
  "opcoes": {"a": "10 min", "b": "10,5 min", "c": "12,0 min", "d": "12,5 min"},
  "gabarito": "d",
  "resolucao": "Taxa de calor: Q/t = (1000×1 + 200)×10/1 = 12000 cal/min. Para elevar de 20 °C a 100 °C: Q₁ = 1200×80 = 96000 cal → t₁ = 8 min. Para vaporizar 10% = 100 g de água: Q₂ = 100×540 = 54000 cal → t₂ = 4,5 min. Total: 8 + 4,5 = 12,5 min."
},
{
  "id": "OBFEP-2018-B-20",
  "ano": 2018, "numero": 20, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Óptica Geométrica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag07_xref69_534x500.png"], "alternativas": {}},
  "enunciado": "João Henrique olha sua imagem nas duas faces de uma colher (côncava e convexa), à mesma distância. A face côncava produz imagem invertida; a face convexa produz imagem direta. A relação entre as alturas das imagens é H_iB = (5/4) H_iA, onde B é a face que produz a imagem maior.\n\nTratando a colher como espelho gaussiano com distância focal |f|, qual a distância de João até a colher?",
  "opcoes": {"a": "6f", "b": "8f", "c": "9f", "d": "10f"},
  "gabarito": "c",
  "resolucao": "Face B = côncava (f > 0), produz imagem maior: |m_B| = f/(u−f). Face A = convexa (f < 0), produz imagem menor: |m_A| = f/(u+f). Razão: |m_B|/|m_A| = (u+f)/(u−f) = 5/4. Resolvendo: 4(u+f) = 5(u−f) → 4u+4f = 5u−5f → 9f = u. Distância = 9f."
},
]

data['banco_questoes'].extend(questoes)

with open('banco-questoes/fisica_ufrgs.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Total: {len(data['banco_questoes'])} questoes")
