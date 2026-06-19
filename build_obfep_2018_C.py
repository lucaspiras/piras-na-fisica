import json

with open('banco-questoes/fisica_ufrgs.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

IMG = 'obfep/2018/C-F1'

questoes = [
{
  "id": "OBFEP-2018-C-01",
  "ano": 2018, "numero": 1, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Estática dos Fluidos",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref34_500x375.jpg"], "alternativas": {}},
  "enunciado": "Em uma cafeteira elétrica, a água fria é aquecida no recipiente inferior, sobe pelo tubo de elevação e passa pelo filtro. Uma válvula impede o retorno. Não existe bomba de água. Identifique a proposição FALSA.",
  "opcoes": {
    "a": "O mecanismo mostra que, em um dado desnível de altura, uma mesma substância sempre terá uma mesma diferença de pressão.",
    "b": "A água quente é menos densa que a água fria, por isso, nesse sistema, a altura que ela ocupa tende a ser maior que a da água fria.",
    "c": "O fenômeno da dilatação térmica da água ocorre devido ao seu aquecimento, isso reduz a densidade da água.",
    "d": "A água aquecida precisa ocupar mais espaço. Como a válvula impede o seu retorno ao recipiente, ela sobe pelo tubo de elevação."
  },
  "gabarito": "a",
  "resolucao": "A proposição a) é falsa: ΔP = ρgh depende da densidade ρ, que varia com a temperatura. A água quente (menor ρ) produz MENOR diferença de pressão para o mesmo desnível que a água fria. Logo, uma mesma substância em temperaturas diferentes NÃO terá a mesma ΔP para um dado desnível. As demais são verdadeiras: b) ✓ (menos densa → mais volume), c) ✓ (dilatação reduz densidade), d) ✓ (a válvula força a subida)."
},
{
  "id": "OBFEP-2018-C-02",
  "ano": 2018, "numero": 2, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Transmissão de Calor",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Eliete descobriu que ligar um ventilador com vento para o congelador de geladeira faz o gelo derreter rapidamente. Sobre os eventos, determine a proposição FALSA.",
  "opcoes": {
    "a": "A temperatura acima da esperada para o resto da geladeira, quando o congelador fica cheio de gelo, deve-se ao fato de que o gelo reduz a troca de calor entre o congelador e o resto da geladeira.",
    "b": "O gelo se forma pela condensação do vapor de água do ar que se encontra na geladeira. Quanto mais vezes a porta da geladeira é aberta, mais vapor de água chega para se transformar em gelo.",
    "c": "Os congeladores desse tipo de geladeira ficam na parte superior ao invés da parte inferior apenas para se tornar mais cômoda a colocação e a retirada de alimentos do congelador.",
    "d": "Sem vento, o ar quente que entra no congelador esfria e deixa de derreter o gelo. O vento produzido pelo ventilador é constantemente quente (em relação ao gelo), o que derrete o gelo mais rapidamente."
  },
  "gabarito": "c",
  "resolucao": "A proposição c) é falsa: os congeladores ficam na parte superior por razão física — o ar frio (mais denso) desce do congelador e resfria toda a geladeira por convecção natural. Se ficassem na parte inferior, o ar frio permaneceria embaixo sem circular. Não é apenas uma questão de conveniência."
},
{
  "id": "OBFEP-2018-C-03",
  "ano": 2018, "numero": 3, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Robson chutou inadvertidamente seu martelo em um telhado inclinado de 25°. O martelo ganhou 4 m/s no sentido da inclinação. A distância até a borda do telhado é 18 m. Coeficiente de atrito dinâmico = 0,5.\n\nDados: sen 25° ≈ 0,4; cos 25° ≈ 0,9; g = 10 m/s²",
  "opcoes": {
    "a": "O martelo vai parar a 2 m da borda do telhado.",
    "b": "O martelo vai parar a 4 m da borda do telhado.",
    "c": "O martelo desce acelerando, logo passará da borda do telhado e cairá livremente.",
    "d": "Mesmo retardando, o martelo não consegue parar antes da borda do telhado."
  },
  "gabarito": "a",
  "resolucao": "Aceleração ao longo do telhado: a = g·sen25° − μ·g·cos25° = 10×0,4 − 0,5×10×0,9 = 4 − 4,5 = −0,5 m/s² (desaceleração). Distância para parar: v² = v₀² + 2as → 0 = 16 − 2×0,5×s → s = 16 m. O martelo para a 16 m do ponto inicial, ou seja, a 18 − 16 = 2 m da borda."
},
{
  "id": "OBFEP-2018-C-04",
  "ano": 2018, "numero": 4, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Ondulatória",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Aristides instalou uma antena parabólica para receber sinais de satélite geoestacionário. Sobre o processo de transmissão e recepção de sinal via satélite, identifique a proposição VERDADEIRA.",
  "opcoes": {
    "a": "Os satélites espiões com período menor que 1 dia descrevem órbitas mais afastadas da Terra que os geoestacionários.",
    "b": "Os sinais de satélites de comunicação são ondas eletromagnéticas cujas frequências são compatíveis com as transições eletrônicas dos átomos dos gases da atmosfera.",
    "c": "A antena parabólica consegue captar o sinal do satélite mesmo com baixa intensidade em virtude de concentrar o sinal espalhado por uma grande área em um único ponto.",
    "d": "O captador de sinal da antena parabólica fica localizado no seu vértice, ponto que concentra o feixe de raios paralelos vindo do satélite."
  },
  "gabarito": "c",
  "resolucao": "a) Falsa: menor período → menor órbita (mais próxima da Terra). b) Falsa: sinais de satélite são micro-ondas/rádio, não na faixa de transições eletrônicas atômicas. c) Verdadeira: o espelho parabólico reflete raios paralelos (do satélite distante) para o foco, concentrando o sinal fraco. d) Falsa: o captador fica no FOCO, não no vértice."
},
{
  "id": "OBFEP-2018-C-05",
  "ano": 2018, "numero": 5, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Refração",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag04_xref42_399x414.jpg"], "alternativas": {}},
  "enunciado": "Judith olha de frente para um aquário cúbico (80 cm de aresta). O peixe P está no centro do aquário, na mesma altura dos olhos de Judith e a 70 cm deles. Se Judith olhar na direção da linha tracejada (perpendicular à face frontal), a que distância ela verá o peixe?\n\nDados: v_luz_água = 225 Mm/s; v_luz_vácuo = 300 Mm/s",
  "opcoes": {"a": "55 cm", "b": "60 cm", "c": "65 cm", "d": "80 cm"},
  "gabarito": "b",
  "resolucao": "Índice de refração da água: n = 300/225 = 4/3. O peixe está no centro do aquário = 40 cm da face frontal. A face frontal está a 70 − 40 = 30 cm dos olhos de Judith. Profundidade aparente do peixe (refração): d_ap = d_real/n = 40/(4/3) = 40×3/4 = 30 cm. Distância total aparente: 30 (até a face) + 30 (aparente dentro da água) = 60 cm."
},
{
  "id": "OBFEP-2018-C-06",
  "ano": 2018, "numero": 6, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Reflexão",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Ainda na situação do aquário cúbico, Judith pode ver o peixe olhando para as faces laterais AC e BD, mesmo sem espelhos. Sobre essas possibilidades, podemos afirmar:",
  "opcoes": {
    "a": "A imagem do peixe na face AC produz uma nova imagem do peixe na face BD. Graças a isso Judith consegue ver o peixe olhando para AC ou BD.",
    "b": "Quando a luz é refratada, parte dela sofre reflexão. O percentual de luz refletida só se torna significativo quando o ângulo de incidência se aproxima do valor 0°.",
    "c": "O reflexo do peixe nas faces AC e BD pode ser visto sobreposto à imagem do ambiente externo associada à luz que refrata por essas mesmas faces.",
    "d": "A luz que sai do peixe e segue para as faces AC e BD só pode chegar aos olhos de Judith se sofrer, nessas faces, a reflexão total, ou seja, se o ângulo de incidência for maior que o ângulo limite."
  },
  "gabarito": "c",
  "resolucao": "c) Verdadeiro: nas faces laterais, a luz do peixe incide a ângulos que permitem reflexão parcial interna (abaixo do ângulo crítico). Judy vê simultaneamente o reflexo do peixe (por reflexão parcial) sobreposto à imagem do ambiente externo (por refração). d) é falsa porque a reflexão TOTAL requer ângulo > ângulo limite; se ocorresse reflexão total, nenhuma luz passaria, e Judith não veria o ambiente externo."
},
{
  "id": "OBFEP-2018-C-07",
  "ano": 2018, "numero": 7, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Oscilações",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Um balanço (pêndulo simples) com cordas de 4 m completa 16 ciclos por minuto na Terra. Quantos ciclos por minuto esse pêndulo completaria na superfície de Marte, onde g_Marte = g_Terra/4?",
  "opcoes": {"a": "4 ciclos", "b": "8 ciclos", "c": "32 ciclos", "d": "64 ciclos"},
  "gabarito": "b",
  "resolucao": "T ∝ √(L/g). T_Marte = T_Terra × √(g_Terra/g_Marte) = T_Terra × √4 = 2T_Terra. O período dobra, portanto a frequência cai à metade: n_Marte = 16/2 = 8 ciclos/min."
},
{
  "id": "OBFEP-2018-C-08",
  "ano": 2018, "numero": 8, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Eletromagnetismo", "subarea": "Circuitos",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Laura usa um chuveiro com resistência de 5,5 Ω, tensão de 110 V e vazão de 3,3 kg/min. Qual o aumento de temperatura que esse chuveiro produz na água?\n\nDados: c_água = 4 J/(g·°C)",
  "opcoes": {"a": "4 °C", "b": "6 °C", "c": "8 °C", "d": "10 °C"},
  "gabarito": "d",
  "resolucao": "Potência do chuveiro: P = V²/R = 110²/5,5 = 12100/5,5 = 2200 W. Vazão: 3,3 kg/min = 3300 g/min = 55 g/s. Equilíbrio: P = ṁ × c × ΔT → 2200 = 55 × 4 × ΔT = 220 × ΔT → ΔT = 10 °C."
},
{
  "id": "OBFEP-2018-C-09",
  "ano": 2018, "numero": 9, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Eletromagnetismo", "subarea": "Circuitos",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "O rádio de Marcelino tem: pilhas (fcem = 12 V, r = 0,1 Ω), alto-falante (fccm' = 9 V), demais resistências r' = 0,2 Ω, reostato R variando de 0 a 1,2 Ω. Marcelino sempre ouve com metade da potência sonora máxima. Qual a corrente no circuito nessa condição?",
  "opcoes": {"a": "2,5 A", "b": "5,0 A", "c": "7,5 A", "d": "10,0 A"},
  "gabarito": "b",
  "resolucao": "Potência máxima ocorre com R=0: I_max = (fcem − fccm')/(r + r') = (12−9)/(0,1+0,2) = 3/0,3 = 10 A. P_max = fccm' × I_max = 9×10 = 90 W. Metade da potência: P = 45 W. Como P = fccm' × I: 45 = 9×I → I = 5 A."
},
{
  "id": "OBFEP-2018-C-10",
  "ano": 2018, "numero": 10, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Ondulatória", "subarea": "Ondas Mecânicas",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "O som do rádio de Marcelino pode ser ouvido em todos os cômodos da casa. Identifique a proposição FALSA sobre esse fenômeno:",
  "opcoes": {
    "a": "Não existe interferência destrutiva do som emitido pelo rádio na casa de Marcelino já que em todos os lugares é possível ouvir o som do aparelho.",
    "b": "O som se espalha pela casa de Marcelino devido à reflexão, refração e difração.",
    "c": "O som é uma onda longitudinal, logo não pode ser polarizada.",
    "d": "A velocidade do som na parede é maior que no ar já que as moléculas na parede estão mais próximas, transferindo com mais rapidez a vibração recebida."
  },
  "gabarito": "a",
  "resolucao": "A proposição a) é falsa: a interferência destrutiva ocorre em qualquer situação com duas ou mais fontes de ondas (ou reflexões), independentemente de poder-se ouvir o som em todos os lugares. O fato de haver som em toda a casa não significa que não há interferência destrutiva — apenas que não há pontos de silêncio absoluto, pois a geometria da casa e a difração evitam regiões de anulação completa."
},
{
  "id": "OBFEP-2018-C-11",
  "ano": 2018, "numero": 11, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Eletromagnetismo", "subarea": "Indução",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Jorge usa uma furadeira que, mantendo velocidade de rotação constante, consome 440 W. O motor gera uma taxa de variação de fluxo magnético de 6000 Wb/min. Tensão da tomada: 110 V. Qual a resistência interna da furadeira?",
  "opcoes": {"a": "1,0 Ω", "b": "1,5 Ω", "c": "2,0 Ω", "d": "2,5 Ω"},
  "gabarito": "d",
  "resolucao": "Corrente consumida: I = P/V = 440/110 = 4 A. Força contra-eletromotriz (back-EMF) do motor: ε' = dΦ/dt = 6000/60 = 100 Wb/s = 100 V. Equação do circuito: V = I×R + ε' → 110 = 4×R + 100 → 4R = 10 → R = 2,5 Ω."
},
{
  "id": "OBFEP-2018-C-12",
  "ano": 2018, "numero": 12, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Eletromagnetismo", "subarea": "Eletromagnetismo",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Ímãs colados no verso de propagandas prendem-se à porta da geladeira. Sobre esses ímãs e o processo de adesão, podemos afirmar:",
  "opcoes": {
    "a": "Esses ímãs são ímãs temporários.",
    "b": "A composição desses ímãs é constituída essencialmente por materiais diamagnéticos.",
    "c": "Para que esses ímãs se prendam à porta de geladeira, basta que ela seja constituída por qualquer metal.",
    "d": "O local da porta da geladeira em contato com o ímã torna-se um ímã temporário."
  },
  "gabarito": "d",
  "resolucao": "d) Verdadeiro: a porta da geladeira é de material ferromagnético. Quando o ímã permanente (das propagandas) se aproxima, induz magnetização temporária no local de contato, tornando-o um ímã temporário — mecanismo que mantém o ímã preso. a) Falso (são ímãs permanentes). b) Falso (são ferromagnéticos ou ferrimagnéticos). c) Falso (deve ser especificamente ferromagnético, não qualquer metal)."
},
{
  "id": "OBFEP-2018-C-13",
  "ano": 2018, "numero": 13, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Gases",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Na casa de dona Florinda, a pressão atmosférica é 87,0 kPa e a água ferve a 87 °C. Uma coluna de 30 cm de água está na panela. Cada bolha formada no fundo tem volume 0,4 cm³ e se forma com a mesma pressão da água ao redor.\n\nQual a massa de cada bolha?\n\nDados: g = 10 m/s²; R = 8 J/(mol·K); ρ_água = 1,0×10³ kg/m³; M_água = 18 g/mol; 0 °C = 273 K",
  "opcoes": {
    "a": "2,25×10⁻¹ mg",
    "b": "2,50×10⁻¹ mg",
    "c": "3,25×10⁻¹ mg",
    "d": "3,75×10⁻¹ mg"
  },
  "gabarito": "a",
  "resolucao": "Pressão no fundo da panela: P = P_atm + ρgh = 87000 + 1000×10×0,30 = 90000 Pa. T = 87 + 273 = 360 K. V = 0,4 cm³ = 0,4×10⁻⁶ m³. Mol de vapor: n = PV/(RT) = 90000×0,4×10⁻⁶/(8×360) = 0,036/2880 = 1,25×10⁻⁵ mol. Massa: m = n×M = 1,25×10⁻⁵×18 = 2,25×10⁻⁴ g = 2,25×10⁻¹ mg."
},
{
  "id": "OBFEP-2018-C-14",
  "ano": 2018, "numero": 14, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Gases",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Sobre o fenômeno de ebulição descrito na questão anterior, identifique a proposição FALSA:",
  "opcoes": {
    "a": "Durante a subida da bolha pela água, seu volume aumenta porque a pressão externa diminui.",
    "b": "As bolhas sobem porque o empuxo sobre elas é maior que o peso delas.",
    "c": "Durante a formação da bolha, a massa da água transformada em vapor exerce um trabalho de 36 mJ na água, considerando que foi um processo isobárico.",
    "d": "As bolhas são constituídas por ar: uma mistura de gases com vapor de água."
  },
  "gabarito": "d",
  "resolucao": "A proposição d) é falsa: as bolhas de ebulição são formadas por VAPOR D'ÁGUA, não por ar. A ebulição é o processo em que o líquido se transforma em vapor no interior da massa líquida. Se as bolhas fossem de ar, seria outro fenômeno (nucleação de gases dissolvidos). Verificação de c): W = PΔV = 90000×0,4×10⁻⁶ = 0,036 J = 36 mJ ✓."
},
{
  "id": "OBFEP-2018-C-15",
  "ano": 2018, "numero": 15, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Física Moderna", "subarea": "Óptica Quântica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Lâmpadas incandescentes, halógenas, fluorescentes e LED têm a mesma potência. A transmissão de calor por condução entre essas lâmpadas e o ar é desprezível. Identifique a proposição FALSA sobre as diferenças e semelhanças entre essas lâmpadas:",
  "opcoes": {
    "a": "Após atingir a temperatura de trabalho, a maioria da energia elétrica consumida por esses tipos de lâmpadas é transformada em energia eletromagnética incorporada em ondas eletromagnéticas.",
    "b": "A maior quantidade de energia irradiada pelas lâmpadas incandescentes está associada a frequências abaixo do visível, por isso elas possuem baixo rendimento luminoso.",
    "c": "As lâmpadas incandescentes produzem luz de frequências diferentes enquanto toda lâmpada LED produz luz de mesma frequência, por isso o rendimento das últimas é maior.",
    "d": "A quantidade de fótons emitidos por segundo pelas lâmpadas incandescentes é maior que pelas lâmpadas LED."
  },
  "gabarito": "c",
  "resolucao": "A proposição c) é falsa: não é verdade que 'toda lâmpada LED produz luz de mesma frequência'. LEDs brancos comerciais usam um chip azul + fósforo para produzir espectro contínuo (visível amplo). Além disso, o maior rendimento do LED não decorre de emitir uma única frequência, mas de converter energia elétrica em luz visível com muito menos dissipação de calor que as incandescentes."
},
]

data['banco_questoes'].extend(questoes)

with open('banco-questoes/fisica_ufrgs.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Total: {len(data['banco_questoes'])} questoes")
