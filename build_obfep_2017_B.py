import json

with open('banco-questoes/fisica_ufrgs.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

IMG = 'obfep/2017/B-F1'

questoes = [
{
  "id": "OBFEP-2017-B-01",
  "ano": 2017, "numero": 1, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Estática dos Fluidos",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [f"{IMG}/pag01_xref28_379x165.jpg"], "alternativas": {}},
  "enunciado": "Uma parede de barragem tem 25 m de largura e deve segurar água até 8 m de altura. A pressão média sobre essa parede é igual à pressão no meio da coluna d'água (4 m de altura).\n\nQual a força total que essa parede neutralizará quando o nível de água atingir o máximo?\n\nDados: g = 10 m/s²; ρ_água = 1 kg/L; prefixo Mega = 10⁶",
  "opcoes": {"a": "4 MN", "b": "6 MN", "c": "8 MN", "d": "10 MN"},
  "gabarito": "c",
  "resolucao": "Pressão média (a 4 m de profundidade): P_med = ρgh = 1000×10×4 = 40000 Pa = 40 kPa. Área da parede: A = 25×8 = 200 m². Força: F = P_med × A = 40000 × 200 = 8×10⁶ N = 8 MN."
},
{
  "id": "OBFEP-2017-B-02",
  "ano": 2017, "numero": 2, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Termometria",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref31_1008x434.png"], "alternativas": {}},
  "enunciado": "As temperaturas máxima e mínima da região do mar de Aral atingem 113 °F e 5 °F. Sabendo que a fusão do gelo ocorre a 32 °F e a ebulição da água a 212 °F, quais as indicações dessas temperaturas na escala Celsius?",
  "opcoes": {"a": "–20 °C e 45 °C", "b": "–20 °C e 35 °C", "c": "–15 °C e 45 °C", "d": "–15 °C e 35 °C"},
  "gabarito": "c",
  "resolucao": "C = (F − 32) × 5/9. Para 5 °F: C = (5−32) × 5/9 = −27×5/9 = −15 °C. Para 113 °F: C = (113−32) × 5/9 = 81×5/9 = 45 °C."
},
{
  "id": "OBFEP-2017-B-03",
  "ano": 2017, "numero": 3, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Óptica Geométrica",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref33_543x462.jpg"], "alternativas": {}},
  "enunciado": "Um fogão solar usa uma calota espelhada côncava com a panela posicionada à sua frente. Qual a ação que NÃO iria aumentar a eficiência do aquecimento da panela?",
  "opcoes": {
    "a": "O eixo principal deve estar apontado para o Sol.",
    "b": "A panela deve estar localizada no centro de curvatura.",
    "c": "A parte externa da panela deve estar pintada de preto.",
    "d": "A forma da calota deve ser parabólica."
  },
  "gabarito": "b",
  "resolucao": "Para máxima concentração de energia, a panela deve estar no FOCO do espelho côncavo (ou parabólico), não no centro de curvatura. O centro de curvatura fica a uma distância 2f do vértice — nele, os raios paralelos ao eixo convergem antes e depois da panela, não concentrando adequadamente. As demais ações aumentam a eficiência: a) eixo apontado para o Sol maximiza radiação recebida; c) superfície preta maximiza absorção; d) forma parabólica focaliza raios paralelos perfeitamente."
},
{
  "id": "OBFEP-2017-B-04",
  "ano": 2017, "numero": 4, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Dilatação",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [f"{IMG}/pag03_xref36_250x188.png"], "alternativas": {}},
  "enunciado": "A geleira PROT-C tem uma linha AB de 200 km separando os lados Leste e Oeste. No verão, o lado Oeste aquece de −12 °C a −2 °C e o lado Leste, de −12 °C a −10 °C. Qual a diferença entre as dilatações de AB nos dois lados?\n\nDado: coeficiente de dilatação volumétrico do gelo = 153×10⁻⁶ °C⁻¹",
  "opcoes": {"a": "81,6 m", "b": "82,5 m", "c": "86,4 m", "d": "88,2 m"},
  "gabarito": "a",
  "resolucao": "Coeficiente linear: α = γ/3 = 153×10⁻⁶/3 = 51×10⁻⁶ °C⁻¹. L = 200 km = 200000 m. ΔL = L × α × ΔT. Oeste: ΔT=10°C → ΔL_O = 200000×51×10⁻⁶×10 = 102 m. Leste: ΔT=2°C → ΔL_L = 200000×51×10⁻⁶×2 = 20,4 m. Diferença: 102 − 20,4 = 81,6 m."
},
{
  "id": "OBFEP-2017-B-05",
  "ano": 2017, "numero": 5, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Estática",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [f"{IMG}/pag03_xref38_326x187.png"], "alternativas": {}},
  "enunciado": "Um braço mecânico de usina de ondas tem 24 m de comprimento. O flutuador (na extremidade) aplica 6.000 N. O pistão da bomba hidráulica fica a 2 m do eixo de rotação. O sistema está em equilíbrio.\n\nQual a força sobre o pistão?",
  "opcoes": {"a": "500 N", "b": "800 N", "c": "36 kN", "d": "72 kN"},
  "gabarito": "d",
  "resolucao": "Equilíbrio de torques: F_flutuador × 24 = F_pistão × 2. 6000 × 24 = F_pistão × 2 → F_pistão = 144000/2 = 72000 N = 72 kN."
},
{
  "id": "OBFEP-2017-B-06",
  "ano": 2017, "numero": 6, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Física Moderna", "subarea": "Física e Sociedade",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Nas conferências da ONU sobre desenvolvimento sustentável (RIO 92, RIO+20), definiram-se Objetivos do Desenvolvimento Sustentável (ODS). Existe um desses objetivos que dialoga mais diretamente com a Física. Identifique-o.",
  "opcoes": {
    "a": "Segurança sustentável da água. Acesso universal à água potável e saneamento básico; garantia de eficiência maior na gestão dos recursos hidrominerais.",
    "b": "Energia limpa universal. Aumentar o acesso universal à energia limpa, minimizando a poluição e o impacto à saúde, além de reduzir o impacto do aquecimento global.",
    "c": "Ecossistemas produtivos e saudáveis. Assegurar os serviços ecossistêmicos e da biodiversidade com melhor gestão, restauro e conservação do meio ambiente.",
    "d": "Segurança alimentar sustentável. Fim da fome e segurança na produção de alimentos com distribuição e consumo sustentáveis."
  },
  "gabarito": "b",
  "resolucao": "O objetivo que mais dialoga diretamente com a Física é o da Energia Limpa Universal (b). Fenômenos físicos como conversão de energia, termodinâmica, eletromagnetismo e energia nuclear são centrais para desenvolver tecnologias de energia limpa e eficiente. Os demais objetivos envolvem mais biologia, química e ciências sociais."
},
{
  "id": "OBFEP-2017-B-07",
  "ano": 2017, "numero": 7, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Transmissão de Calor",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "O efeito estufa natural mantém a Terra aquecida: a radiação solar passa pela atmosfera, atinge a Terra, é absorvida e transformada em radiação terrestre. Gases como o CO₂ refletem essa radiação terrestre de volta. Se a quantidade de gases de efeito estufa aumentasse muito, determine a proposição que corresponde a algo que NÃO iria acontecer.",
  "opcoes": {
    "a": "A quantidade de radiação terrestre refletida aumentaria, logo sairia menor quantidade de calor, e a Terra sofreria aquecimento.",
    "b": "A grande quantidade de gelo das calotas polares iria derreter, aumentando o nível dos oceanos.",
    "c": "Aumentaria a quantidade de vapor no ar, alterando o clima e a dinâmica das precipitações atmosféricas.",
    "d": "Aumentaria a quantidade de radiação solar que atingiria a superfície da Terra."
  },
  "gabarito": "d",
  "resolucao": "O efeito estufa intensificado não aumenta a quantidade de radiação SOLAR que chega à superfície — esse processo atua na radiação TERRESTRE (infravermelho emitido pela Terra), não na radiação solar (visível) que chega do Sol. De fato, mais gases de efeito estufa podem até reduzir levemente a radiação solar pela dispersão, mas certamente não a aumentam. As demais consequências (a, b, c) são esperadas com o aquecimento global."
},
{
  "id": "OBFEP-2017-B-08",
  "ano": 2017, "numero": 8, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Gravitação",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Se fosse possível colocar a órbita da Lua no mesmo plano da órbita da Terra E reduzir o raio da órbita lunar, determine a proposição FALSA caso essas alterações fossem realizadas.",
  "opcoes": {
    "a": "Ocorreriam 13 eclipses solares durante o ano.",
    "b": "A diferença entre a altura da maré cheia e da maré vazia aumentaria.",
    "c": "Seria necessário aumentar a velocidade da Lua para que ela descrevesse um MCU.",
    "d": "O período de translação da Lua diminuiria."
  },
  "gabarito": "a",
  "resolucao": "Com raio menor: c) v = √(GM/r), menor r → maior v ✓; d) T² ∝ r³, menor r → menor T ✓; b) forças de maré ∝ 1/r³, menor r → marés maiores ✓. Para a): com a Lua no mesmo plano e período menor que 27 dias, haveria MAIS que 13 eclipses por ano (pois atualmente existem ~12-13 e menor período aumentaria esse número). Portanto, a afirmação de '13 eclipses' é falsa — ocorreriam mais eclipses."
},
{
  "id": "OBFEP-2017-B-09",
  "ano": 2017, "numero": 9, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Estática dos Fluidos",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Sobre o derretimento de icebergs (água doce solidificada) no oceano, determine a proposição VERDADEIRA.",
  "opcoes": {
    "a": "Um iceberg, ao derreter completamente, não aumenta o nível da água, pois a água do derretimento ocupará exatamente o volume do iceberg que estava imerso.",
    "b": "Um iceberg, ao derreter completamente, aumenta o nível da água do mar, pois a água do derretimento ocupará mais que o volume imerso do iceberg.",
    "c": "A água doce que surge do iceberg em derretimento possui uma densidade maior que a água salgada.",
    "d": "O derretimento do gelo boiando no oceano altera mais o nível dos oceanos que o do gelo sobre o solo firme."
  },
  "gabarito": "b",
  "resolucao": "Um iceberg desloca um volume de água salgada igual à sua massa dividida pela densidade da água salgada (ρ_sal ≈ 1025 kg/m³). Ao derreter, produz água doce com volume = massa/ρ_água_doce (≈ massa/1000). Como 1000 < 1025, o volume de água doce produzida é MAIOR que o volume deslocado de água salgada → o nível sobe ligeiramente. b) é verdadeira. c) é falsa (água doce é menos densa). d) é falsa (gelo sobre solo firme, ao derreter, contribui MAIS para elevar o nível dos oceanos)."
},
{
  "id": "OBFEP-2017-B-10",
  "ano": 2017, "numero": 10, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Refração",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Um detector de contaminação fluvial usa um laser. No dia da medição, o raio de laser no ar faz 33° com a HORIZONTAL ao atingir a superfície da água/resina (ângulo de incidência = 57° com a normal). Dentro do líquido, o raio forma 78° com a HORIZONTAL (ângulo de refração = 12° com a normal).\n\nReferência: Normal (n<1,5); Atenção (1,5≤n<2,0); Perigo (2,0≤n<3,5); Rio contaminado (n≥3,5)\n\nDados: sen 57°=0,84; sen 12°=0,21",
  "opcoes": {
    "a": "Normal (n < 1,5)",
    "b": "Atenção (1,5 ≤ n < 2,0)",
    "c": "Perigo de contaminação (2,0 ≤ n < 3,5)",
    "d": "Rio contaminado (n ≥ 3,5)"
  },
  "gabarito": "d",
  "resolucao": "Lei de Snell: n_ar × sen(θ_ar) = n_liq × sen(θ_liq). θ_ar = 90°−33° = 57° (da normal); θ_liq = 90°−78° = 12° (da normal). n_liq = sen(57°)/sen(12°) = 0,84/0,21 = 4,0. Como n=4,0 ≥ 3,5 → Rio contaminado."
},
{
  "id": "OBFEP-2017-B-11",
  "ano": 2017, "numero": 11, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Gravitação",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag05_xref118_400x208.jpg"], "alternativas": {}},
  "enunciado": "Os satélites CBERS-1 e CBERS-2 foram lançados para monitorar a Amazônia em órbita geoestacionária com MCU. Foram lançados com 12.000 km/h em um local cuja aceleração da gravidade é 3.000 km/h². O raio da Terra é 6.000 km. Qual a altitude das órbitas?",
  "opcoes": {"a": "36.000 km", "b": "42.000 km", "c": "46.000 km", "d": "52.000 km"},
  "gabarito": "b",
  "resolucao": "Para MCU: aceleração centrípeta = aceleração gravitacional local. g_local = v²/r → r = v²/g_local = (12000)²/3000 = 144000000/3000 = 48000 km. Altitude = r − R_Terra = 48000 − 6000 = 42000 km."
},
{
  "id": "OBFEP-2017-B-12",
  "ano": 2017, "numero": 12, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Energia",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag06_xref127_629x200.jpg"], "alternativas": {}},
  "enunciado": "Uma hidroelétrica (queda de 40 m, η=100%) e uma termoelétrica trabalham em parceria no rio Cana Brava. Vazão máxima: 2.000.000 kg/s; mínima: 400.000 kg/s. A termoelétrica produz 64 MJ por kg de CO₂. 1 crédito de carbono = 1 tonelada de CO₂ economizado.\n\nQuanto tempo leva, no período de baixa vazão, para perder 1 crédito de carbono produzindo a mesma potência do período de alta vazão?\n\nDados: g = 10 m/s²; Mega = 10⁶",
  "opcoes": {"a": "1 min e 40 s", "b": "2 min e 0 s", "c": "2 min e 20 s", "d": "2 min e 30 s"},
  "gabarito": "a",
  "resolucao": "Potência hidrelétrica máxima: P_max = Q_max × g × h = 2×10⁶ × 10 × 40 = 800 MW. Potência mínima: P_min = 4×10⁵ × 10 × 40 = 160 MW. Déficit coberto pela termoelétrica: 640 MW = 640×10⁶ W. Energia para 1 crédito (1 ton CO₂): 1000 × 64×10⁶ = 64×10⁹ J. Tempo: t = 64×10⁹ / (640×10⁶) = 100 s = 1 min 40 s."
},
{
  "id": "OBFEP-2017-B-13",
  "ano": 2017, "numero": 13, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Energia",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag07_xref130_320x200.jpg"], "alternativas": {}},
  "enunciado": "Uma usina termosolar com espelhos de 600.000 m² capta 0,2 kW/m² de energia solar e produz 80.000 kW elétricos. O calor latente de vaporização da água é 2.000 kJ/kg e a vazão de água pelos tubos é 5 kg/s.\n\nQual percentual da potência desperdiçada vai para a vaporização da água?",
  "opcoes": {"a": "20 %", "b": "25 %", "c": "30 %", "d": "40 %"},
  "gabarito": "b",
  "resolucao": "Potência solar captada: 600000 × 0,2 = 120000 kW. Potência elétrica: 80000 kW. Potência desperdiçada total: 120000 − 80000 = 40000 kW. Potência de vaporização: L × ṁ = 2000 × 5 = 10000 kW. Percentual: 10000/40000 = 25%."
},
{
  "id": "OBFEP-2017-B-14",
  "ano": 2017, "numero": 14, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Calorimetria",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag08_xref133_349x167.jpg"], "alternativas": {}},
  "enunciado": "Na usina nuclear Angra 1, o reator libera 2.000 MW de calor para o circuito interno, que converte 800 MW em energia mecânica para a turbina. O restante é absorvido por 4 toneladas/s de água do mar a 15 °C. Qual a temperatura dessa água ao retornar ao mar?\n\nDado: c_água = 4 J/(g·°C)",
  "opcoes": {"a": "60 °C", "b": "70 °C", "c": "80 °C", "d": "90 °C"},
  "gabarito": "d",
  "resolucao": "Calor liberado para água do mar: 2000 − 800 = 1200 MW = 1,2×10⁹ W. Vazão: 4 t/s = 4×10⁶ g/s. ΔT = P/(ṁ × c) = 1,2×10⁹/(4×10⁶ × 4) = 1,2×10⁹/1,6×10⁷ = 75 °C. T_final = 15 + 75 = 90 °C."
},
{
  "id": "OBFEP-2017-B-15",
  "ano": 2017, "numero": 15, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag08_xref134_530x276.jpg"], "alternativas": {}},
  "enunciado": "Um técnico (90 kg) foi parar na extremidade de uma pá de aerogerador em MCU, com aceleração centrípeta de 4 m/s². O cabo o manteve preso. Qual a força máxima que esse cabo suportou?\n\nDado: g = 10 m/s²",
  "opcoes": {"a": "540 N", "b": "860 N", "c": "1260 N", "d": "1340 N"},
  "gabarito": "c",
  "resolucao": "A força máxima no cabo ocorre no ponto mais baixo da trajetória circular, onde a tensão T suporta o peso e fornece a força centrípeta: T − mg = ma_c → T = m(g + a_c) = 90×(10 + 4) = 90×14 = 1260 N."
},
{
  "id": "OBFEP-2017-B-16",
  "ano": 2017, "numero": 16, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Física Moderna", "subarea": "Física e Sociedade",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag08_xref137_426x359.jpg"], "alternativas": {}},
  "enunciado": "Um fazendeiro precisa escolher entre biodigestor ou aerogerador para produção de energia elétrica. Identifique a proposição que NÃO é um argumento coerente para a escolha:",
  "opcoes": {
    "a": "A queima do biogás não é muito eficiente na geração de energia elétrica porque os geradores precisam ser movimentados por motores térmicos de baixo rendimento. Os aerogeradores já utilizam o movimento do vento.",
    "b": "Com o custo de um aerogerador é possível construir vários biodigestores que poderão gerar a mesma quantidade de energia elétrica além de todos os demais benefícios.",
    "c": "Os biodigestores precisam de constante introdução de dejetos e retirada de biofertilizantes. Já os aerogeradores utilizam um processo autônomo.",
    "d": "Acidentes com biodigestores são mais perigosos que com aerogeradores porque estes últimos estão no alto, longe do contato direto com as pessoas e os animais."
  },
  "gabarito": "d",
  "resolucao": "A alternativa d) não é um argumento coerente: a localização dos aerogeradores 'no alto' não torna os acidentes com biodigestores necessariamente mais perigosos. Na verdade, acidentes com biogás (explosão/incêndio) podem ser muito graves, mas a justificativa apresentada — comparar a altitude do aerogerador com o perigo do biodigestor — é uma argumentação equivocada e não coerente. Os demais são argumentos válidos de custo-benefício ou operacionalidade."
},
{
  "id": "OBFEP-2017-B-17",
  "ano": 2017, "numero": 17, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Gases",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag09_xref140_448x161.png"], "alternativas": {}},
  "enunciado": "Um balão meteorológico contém 5 L de hélio ao nível do solo (T₁=27°C, P_atm=100 kPa). A elasticidade do balão sempre aumenta 20 kPa a pressão interna. O balão subiu até uma altitude onde T₂=−63°C e P_atm=10 kPa.\n\nQuanto o balão dilatou (ΔV)?\n\nDado: 0 K = −273°C",
  "opcoes": {"a": "7 L", "b": "8 L", "c": "9 L", "d": "10 L"},
  "gabarito": "c",
  "resolucao": "P₁ = 100 + 20 = 120 kPa; T₁ = 300 K; V₁ = 5 L. P₂ = 10 + 20 = 30 kPa; T₂ = 210 K. Lei dos gases: P₁V₁/T₁ = P₂V₂/T₂ → V₂ = V₁ × (P₁/P₂) × (T₂/T₁) = 5 × (120/30) × (210/300) = 5 × 4 × 0,7 = 14 L. ΔV = 14 − 5 = 9 L."
},
{
  "id": "OBFEP-2017-B-18",
  "ano": 2017, "numero": 18, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Um carro em Manaus desenvolve velocidade média de 72 km/h. A resistência do ar é R = 5v² (SI). O carro libera 1 kg de CO₂ por dia a cada 100 N de força motriz média. 1 crédito de carbono = 1 ton de CO₂.\n\nQuantos créditos de carbono por carro são ganhos por mês ao substituir carros a combustão por elétricos?",
  "opcoes": {"a": "0,6 créditos", "b": "0,7 créditos", "c": "0,8 créditos", "d": "0,9 créditos"},
  "gabarito": "a",
  "resolucao": "v = 72 km/h = 20 m/s. R = 5×20² = 2000 N. Em MRU: F_motor = R = 2000 N. CO₂/dia = 2000/100 = 20 kg. CO₂/mês = 20×30 = 600 kg = 0,6 ton = 0,6 créditos de carbono."
},
{
  "id": "OBFEP-2017-B-19",
  "ano": 2017, "numero": 19, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Termodinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Um motor a gasolina opera entre T_hot=427°C e T_cold=77°C. Eficiência atual: 25%. Um novo motor promete atingir 4/5 do rendimento máximo de Carnot nessas temperaturas.\n\nQual percentual de CO₂ os automóveis deixariam de emitir com esse novo motor?\n\nDado: 0 K = −273°C",
  "opcoes": {"a": "32,5 %", "b": "35,0 %", "c": "37,5 %", "d": "40,0 %"},
  "gabarito": "c",
  "resolucao": "η_Carnot = 1 − T_fria/T_quente = 1 − 350/700 = 0,5 = 50%. Novo motor: η_novo = (4/5)×50% = 40%. Calor consumido é proporcional ao CO₂ emitido. Para mesma potência W útil: Q_atual = W/0,25 = 4W; Q_novo = W/0,40 = 2,5W. Redução de CO₂: (Q_atual − Q_novo)/Q_atual = (4W − 2,5W)/4W = 1,5/4 = 37,5%."
},
{
  "id": "OBFEP-2017-B-20",
  "ano": 2017, "numero": 20, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag10_xref144_355x191.png"], "alternativas": {}},
  "enunciado": "A transposição do São Francisco sobe a água 39,2 m em 7 km de ladeira. A água desce esse mesmo trecho em MRU a 1,4 m/s. Uma esfera parte do repouso e desce sem atrito.\n\nQual a diferença dos tempos de descida?\n\nDado: g = 10 m/s²",
  "opcoes": {"a": "4.500 s", "b": "4.800 s", "c": "5.200 s", "d": "5.600 s"},
  "gabarito": "a",
  "resolucao": "Água (MRU): t_água = 7000/1,4 = 5000 s. Esfera (MRUV sem atrito): a = g×sen θ = g×(h/L) = 10×(39,2/7000) = 0,056 m/s². L = ½at² → t² = 2×7000/0,056 = 250000 → t_esfera = 500 s. Diferença: 5000 − 500 = 4500 s."
},
]

data['banco_questoes'].extend(questoes)

with open('banco-questoes/fisica_ufrgs.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Total: {len(data['banco_questoes'])} questoes")
