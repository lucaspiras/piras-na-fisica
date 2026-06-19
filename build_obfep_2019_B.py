import json

with open('banco-questoes/fisica_ufrgs.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

IMG = 'obfep/2019/B-F1'

questoes = [
{
  "id": "OBFEP-2019-B-01",
  "ano": 2019, "numero": 1, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Termometria",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Em Urupema (SC), a cidade mais fria do Brasil, já foi registrada uma temperatura de 15,8 °F. Sabendo que 32 °F equivale a 0 °C e 212 °F equivale a 100 °C, determine a menor temperatura registrada no Brasil na escala Celsius.",
  "opcoes": {"a": "–7 °C", "b": "–8 °C", "c": "–9 °C", "d": "–10 °C"},
  "gabarito": "c",
  "resolucao": "C = (F − 32) × 5/9 = (15,8 − 32) × 5/9 = (−16,2) × 5/9 = −81/9 = −9 °C."
},
{
  "id": "OBFEP-2019-B-02",
  "ano": 2019, "numero": 2, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [f"{IMG}/pag01_xref23_400x258.jpg"], "alternativas": {}},
  "enunciado": "A Torre 1 do Yachthouse Residence Club, no Balneário Camboriú (SC), tem 276 m de altura. Os elevadores desse prédio sobem com 5 m/s e descem com 7 m/s. Se dois elevadores partissem simultaneamente, um do ponto mais alto e outro do ponto mais baixo do prédio, em que altura eles iriam se encontrar? Despreze as dimensões dos elevadores e as distâncias percorridas para ganhar velocidade.",
  "opcoes": {"a": "108 m", "b": "115 m", "c": "126 m", "d": "138 m"},
  "gabarito": "b",
  "resolucao": "Os elevadores se encontram quando a soma das distâncias percorridas é 276 m. Velocidade de encontro: 5 + 7 = 12 m/s de aproximação. Tempo: t = 276/12 = 23 s. Altura do elevador que sobe: 5 × 23 = 115 m."
},
{
  "id": "OBFEP-2019-B-03",
  "ano": 2019, "numero": 3, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Energia",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Na visita à Usina de Itaipu (PR), Carlos anotou as transformações de energia envolvidas no processo de geração elétrica: a água é represada (alto), desce por condutos até as turbinas, movimenta o rotor do gerador que produz eletricidade.\n\nIdentifique a transformação de energia que NÃO ocorre nesse processo.",
  "opcoes": {
    "a": "O movimento da água produz transformação de energia térmica em energia cinética.",
    "b": "Ao perder altura, a água sofre transformação de energia potencial gravitacional em energia cinética.",
    "c": "O atrito com a tubulação produz transformação de energia cinética em energia térmica.",
    "d": "O movimento do rotor do gerador ganha energia cinética a partir da energia cinética da água."
  },
  "gabarito": "a",
  "resolucao": "A alternativa a) descreve uma transformação de CALOR em energia cinética, o que não ocorre no processo hidrelétrico. O que ocorre é a transformação de energia potencial gravitacional (água na altura) em energia cinética (queda da água), e desta em energia elétrica (via gerador). Não há geração de energia cinética a partir de energia térmica nesse processo."
},
{
  "id": "OBFEP-2019-B-04",
  "ano": 2019, "numero": 4, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Calorimetria",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Em Campos do Jordão (SP), a cidade mais alta do Brasil, Carlos fez uma afirmação com conceitos aplicados de forma errada sobre o frio. Adriana o corrigiu imediatamente. Identifique qual das frases abaixo poderia ter sido usada por Adriana para corrigir Carlos.",
  "opcoes": {
    "a": "Campos do Jordão é uma cidade com pouco calor.",
    "b": "Quando tocamos no chão de Campos do Jordão, sentimos frio por perdermos calor.",
    "c": "Em Campos do Jordão, o frio consegue passar.",
    "d": "Em Campos do Jordão eu sinto frio porque passa frio para mim."
  },
  "gabarito": "b",
  "resolucao": "O conceito correto é que 'frio' não é uma substância que flui. Sentimos frio porque PERDEMOS calor para o ambiente mais frio. A alternativa b) usa corretamente o conceito de transferência de calor: 'sentimos frio por perdermos calor'. As alternativas c) e d) tratam o frio como algo que 'passa' ou 'vai para' alguém, o que é fisicamente errado."
},
{
  "id": "OBFEP-2019-B-05",
  "ano": 2019, "numero": 5, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Física Moderna", "subarea": "Física Experimental",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "O meteorito de Bendegó (o maior do Brasil, no Museu Nacional, RJ) teve suas dimensões medidas por três equipes diferentes. A média das medidas é o Valor mais Provável (Vmp). O Vmp é mais confiável quanto menor for a média dos desvios das medidas em comparação ao próprio Vmp.\n\nDimensão | Vmp\nComprimento | 2,2 m (medidas: 1,9; 2,0; 2,2; 2,4; 2,5)\nLargura | 1,5 m (medidas: 1,2; 1,3; 1,6; 1,7; 1,7)\nAltura | 0,7 m (medidas: 0,5; 0,6; 0,8; 0,8; 0,8)\n\nQual dimensão possui o Vmp mais confiável?",
  "opcoes": {"a": "O comprimento.", "b": "A largura.", "c": "A altura.", "d": "O comprimento e a altura."},
  "gabarito": "a",
  "resolucao": "Média dos desvios em relação ao Vmp, dividida pelo Vmp: Comprimento: desvios = 0,3+0,2+0+0,2+0,3 = 1,0; média = 0,20; relativo = 0,20/2,2 = 9,1%. Largura: desvios = 0,3+0,2+0,1+0,2+0,2 = 1,0; média = 0,20; relativo = 0,20/1,5 = 13,3%. Altura: desvios = 0,2+0,1+0,1+0,1+0,1 = 0,6; média = 0,12; relativo = 0,12/0,7 = 17,1%. Menor desvio relativo: comprimento (9,1%). Resposta: a)."
},
{
  "id": "OBFEP-2019-B-06",
  "ano": 2019, "numero": 6, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Transmissão de Calor",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Em Urupema (SC), Adriana viu um conjunto de grandes estufas de vidro em construção. Pesquisando, descobriu que a temperatura interna de uma estufa é maior que a externa, por isso as plantas não morrem mesmo em um ambiente externo muito frio.\n\nIdentifique a principal propriedade da estufa que faz a temperatura interna ser maior que a externa.",
  "opcoes": {
    "a": "O vidro é um isolante térmico como uma garrafa térmica, assim mantém a temperatura interna inicial por um longo tempo.",
    "b": "O vidro é quebradiço, mas possui uma alta resistência mecânica.",
    "c": "O vidro possui um alto calor específico, tornando-se uma espécie de equilibrador térmico.",
    "d": "O vidro transmite muito bem a luz, mas não transmite bem a radiação infravermelha."
  },
  "gabarito": "d",
  "resolucao": "O efeito estufa do vidro: a luz solar (visível + UV) atravessa o vidro e aquece o interior. Os objetos internos aquecidos emitem radiação infravermelha (calor), mas o vidro NÃO é transparente ao infravermelho — retém esse calor dentro. Essa propriedade seletiva (transparente ao visível, opaco ao IR) é o mecanismo fundamental que mantém a temperatura interna alta."
},
{
  "id": "OBFEP-2019-B-07",
  "ano": 2019, "numero": 7, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag03_xref37_263x196.jpg"], "alternativas": {}},
  "enunciado": "O elevador do Yachthouse possui um contrapeso funcionando como uma 'máquina de Atwood'. Carlos pesquisou sobre essa máquina com um corpo de 2,4 kg e outro de 3,6 kg.\n\nConsiderando o sistema conservativo, qual a aceleração dos corpos quando movimentam-se a partir do repouso?\n\nDados: g = 10 m/s²",
  "opcoes": {"a": "1,0 m/s²", "b": "1,5 m/s²", "c": "2,0 m/s²", "d": "2,5 m/s²"},
  "gabarito": "c",
  "resolucao": "Na máquina de Atwood: a = (m_B − m_A) × g / (m_A + m_B) = (3,6 − 2,4) × 10 / (3,6 + 2,4) = 1,2 × 10 / 6,0 = 2,0 m/s²."
},
{
  "id": "OBFEP-2019-B-08",
  "ano": 2019, "numero": 8, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Energia",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Uma das 20 turbinas de Itaipu tem vazão de 700 m³/s. A água é represada a uma altura de 120 m acima da turbina. A potência de produção de energia elétrica de uma turbina é 630 MW. Qual o rendimento da transformação de energia mecânica em elétrica?\n\nDados: g = 10 m/s²; ρ_água = 1000 kg/m³",
  "opcoes": {"a": "75%", "b": "65%", "c": "60%", "d": "50%"},
  "gabarito": "a",
  "resolucao": "Potência mecânica disponível: P_mec = ρ × Q × g × h = 1000 × 700 × 10 × 120 = 840 × 10⁶ W = 840 MW. Rendimento: η = P_elétrica/P_mecânica = 630/840 = 75%."
},
{
  "id": "OBFEP-2019-B-09",
  "ano": 2019, "numero": 9, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Estática dos Fluidos",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Em Campos do Jordão (1628 m de altitude), Adriana mediu com um barômetro de Torricelli um comprimento de 60 cm para a coluna de mercúrio. A pressão atmosférica estava mais próxima de:\n\nDados: ρ_mercúrio = 13.600 kg/m³; g = 9,8 m/s²",
  "opcoes": {"a": "72 kPa", "b": "78 kPa", "c": "80 kPa", "d": "82 kPa"},
  "gabarito": "c",
  "resolucao": "P = ρgh = 13600 × 9,8 × 0,60 = 13600 × 5,88 = 79.968 Pa ≈ 80 kPa."
},
{
  "id": "OBFEP-2019-B-10",
  "ano": 2019, "numero": 10, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "O meteorito de Bendegó (5 toneladas) atingiu o menor satélite de Júpiter, Aegaeon, no sentido contrário ao seu movimento. Isso teria alterado a velocidade de Aegaeon de 15,2357 km/s para 15,2356 km/s. Desprezando o aumento de massa de Aegaeon, calcule a velocidade do Bendegó no espaço.\n\nDados: massa de Aegaeon = 10⁸ toneladas; massa do Bendegó = 5 toneladas",
  "opcoes": {"a": "1×10³ km/s", "b": "2×10³ km/s", "c": "3×10³ km/s", "d": "4×10³ km/s"},
  "gabarito": "b",
  "resolucao": "Conservação do momento: m_Ae × v_Ae0 + m_B × (−v_B) = m_Ae × v_Ae1 (desprezando variação de massa). m_Ae × (v_Ae0 − v_Ae1) = m_B × v_B. 10⁸ × (15,2357 − 15,2356) = 5 × v_B. 10⁸ × 0,0001 = 5 × v_B. v_B = 10⁴/5 = 2000 km/s = 2×10³ km/s."
},
{
  "id": "OBFEP-2019-B-11",
  "ano": 2019, "numero": 11, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag05_xref54_335x82.jpg"], "alternativas": {}},
  "enunciado": "No Pantanal do Mato Grosso, o veterinário mostrou a Carlos um gráfico da força resultante F em função do tempo para o ataque de uma onça pintada (60 kg), a partir do repouso. O gráfico mostra: F aumenta linearmente de 0 a 2400 N no intervalo 0 a 0,1 s; depois diminui linearmente de 2400 N para 2000 N no intervalo 0,1 a 0,4 s.\n\nQual a velocidade que a onça atinge em 0,4 s?",
  "opcoes": {"a": "28,2 km/h", "b": "36,8 km/h", "c": "42,6 km/h", "d": "46,8 km/h"},
  "gabarito": "d",
  "resolucao": "Pelo teorema impulso-quantidade de movimento: v = Impulso/m. Impulso total = área sob o gráfico F×t. Fase 1 (0 a 0,1 s, triângulo): I₁ = ½ × 2400 × 0,1 = 120 N·s. Fase 2 (0,1 a 0,4 s, trapézio): I₂ = ½ × (2400 + 2000) × 0,3 = 660 N·s. Total: I = 780 N·s. v = 780/60 = 13 m/s = 13 × 3,6 = 46,8 km/h."
},
{
  "id": "OBFEP-2019-B-12",
  "ano": 2019, "numero": 12, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Refração",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "No lago da Serra da Mesa (GO), ao meio-dia sem vento, a água fica parada e a luz ilumina o fundo. Carlos, à margem, localiza a parte emersa de um pau (ponto Q) a 2,9 m de distância. Devido à refração, Carlos vê a parte inferior do pau (ponto W) olhando na direção que forma 53° com a vertical. Sabendo que o índice de refração da água é 4/3, calcule a profundidade em que o ponto W se encontra.\n\nDados: altura dos olhos de Carlos = 1,5 m; sen 53° = 0,8; cos 53° = 0,6",
  "opcoes": {"a": "0,6 m", "b": "0,8 m", "c": "1,2 m", "d": "1,6 m"},
  "gabarito": "c",
  "resolucao": "Lei de Snell na superfície da água: 1 × sen(53°) = (4/3) × sen(r) → 0,8 = (4/3) × sen(r) → sen(r) = 0,6 → r = 37° (ângulo refratado na água). Olhos de Carlos a 1,5 m de altura, linha de visão a 53° da vertical: a horizontal da interseção com a água fica a 1,5 × tan(53°) = 1,5 × (4/3) = 2,0 m da margem (ponto P). O pau (ponto Q e W) está a 2,9 m da margem → distância horizontal de P a W: 2,9 − 2,0 = 0,9 m. No fundo: profundidade = 0,9 / tan(37°) = 0,9 / (0,6/0,8) = 0,9 × 0,8/0,6 = 0,9 × (4/3) = 1,2 m."
},
{
  "id": "OBFEP-2019-B-13",
  "ano": 2019, "numero": 13, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Estática dos Fluidos",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "No Rio São Francisco, a família Almeida alugou uma lancha. À medida que se aproximavam de Juazeiro (BA), devido ao aumento de evaporação e concentração de partículas sólidas, a água do rio ficava mais densa. Isso significa que, durante a viagem da família Almeida:",
  "opcoes": {
    "a": "O volume imerso da lancha aumenta.",
    "b": "O peso da lancha aumenta.",
    "c": "O volume emerso da lancha continua o mesmo.",
    "d": "O volume emerso da lancha aumenta."
  },
  "gabarito": "d",
  "resolucao": "A lancha flutua em equilíbrio: empuxo = peso. Peso é constante. Empuxo = ρ_água × V_imerso × g = constante. Como ρ_água aumenta, V_imerso diminui (precisa de menos volume para gerar o mesmo empuxo). Se V_imerso diminui e o volume total da lancha é fixo → V_emerso = V_total − V_imerso aumenta. A lancha 'sobe' um pouco na água."
},
{
  "id": "OBFEP-2019-B-14",
  "ano": 2019, "numero": 14, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Óptica Geométrica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Na Toca da Boa Vista (BA), com apenas uma vela (chama de 3 cm vertical), Carlos posicionou uma lente convergente (f = 2 m) a exatos 2,5 m da vela. Uma imagem astigmática foi produzida na parede da caverna. Qual o comprimento vertical da chama projetada na parede?",
  "opcoes": {"a": "12 cm", "b": "15 cm", "c": "18 cm", "d": "21 cm"},
  "gabarito": "a",
  "resolucao": "Lei de Gauss: 1/d_i = 1/f − 1/d_o = 1/2 − 1/2,5 = 0,50 − 0,40 = 0,10 → d_i = 10 m. Ampliação: |m| = d_i/d_o = 10/2,5 = 4. Altura da imagem: 3 × 4 = 12 cm."
},
{
  "id": "OBFEP-2019-B-15",
  "ano": 2019, "numero": 15, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Calorimetria",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Em Bom Jesus (PI), a cidade mais quente do Brasil, Adriana colocou um bloco de ácido acético (40 g, inicialmente a 5,0 °C, vindo da geladeira) sobre o chão a 40 °C. Qual a quantidade de calor absorvida pelo ácido acético até atingir equilíbrio térmico com o chão?\n\nDados: T_fusão = 16,6 °C; T_ebulição = 118,0 °C; c (sólido e líquido) = 0,60 cal/(g·°C); L_fusão = 52 cal/g",
  "opcoes": {"a": "2920 cal", "b": "3080 cal", "c": "3120 cal", "d": "3260 cal"},
  "gabarito": "a",
  "resolucao": "Q = m×c×(16,6−5) + m×L + m×c×(40−16,6) = 40×0,60×11,6 + 40×52 + 40×0,60×23,4 = 40×(6,96 + 52 + 14,04) = 40 × 73 = 2920 cal."
},
{
  "id": "OBFEP-2019-B-16",
  "ano": 2019, "numero": 16, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "A base de lançamentos de foguetes de Alcântara (MA) fica praticamente na linha do Equador. O raio da Terra mede 6.400 km. Qual a aceleração centrípeta de Alcântara devido à rotação da Terra? Use π = 3.",
  "opcoes": {"a": "360 km/h²", "b": "400 km/h²", "c": "420 km/h²", "d": "500 km/h²"},
  "gabarito": "b",
  "resolucao": "T = 24 h, R = 6400 km, π = 3. ω = 2π/T = 2×3/24 = 0,25 rad/h. a_c = ω²R = (0,25)² × 6400 = 0,0625 × 6400 = 400 km/h²."
},
{
  "id": "OBFEP-2019-B-17",
  "ano": 2019, "numero": 17, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Na Estrada de Ferro Carajás (PA), um trem de 100 toneladas sobe em MRU uma ladeira inclinada de 26°. A força de atrito contrária ao movimento tem coeficiente de atrito de 0,2. Qual o valor da força motora que aponta no sentido do movimento?\n\nDados: sen 26° = 0,4; cos 26° = 0,9",
  "opcoes": {"a": "38 tf", "b": "44 tf", "c": "52 tf", "d": "58 tf"},
  "gabarito": "d",
  "resolucao": "Normal: N = 100 × cos26° = 90 tf. Atrito (opondo subida): f = μN = 0,2 × 90 = 18 tf. Componente do peso na descida: P_// = 100 × sen26° = 40 tf. Em MRU (F_net = 0): F_motor = 40 + 18 = 58 tf."
},
{
  "id": "OBFEP-2019-B-18",
  "ano": 2019, "numero": 18, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Estática",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Na Ponte Phelippe Daou (Manaus), o primeiro cabo de estaiamento de cada lado faz 74° com a horizontal e tem tração de 200 kN. O último cabo faz 19° com a horizontal. A força vertical de cada cabo deve ter a mesma intensidade. Determine a tração do último cabo.\n\nDados: sen 74° = 0,96; cos 74° = 0,28; sen 19° = 0,32; cos 19° = 0,95",
  "opcoes": {"a": "400 kN", "b": "450 kN", "c": "500 kN", "d": "600 kN"},
  "gabarito": "d",
  "resolucao": "Força vertical do 1º cabo: F_v = T₁ × sen74° = 200 × 0,96 = 192 kN. Para o último cabo ter a mesma força vertical: T₂ × sen19° = 192. T₂ × 0,32 = 192 → T₂ = 600 kN."
},
{
  "id": "OBFEP-2019-B-19",
  "ano": 2019, "numero": 19, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "A Cachoeira do El Dourado (AM), maior queda d'água do Brasil, tem 361,25 m de altura. A água inicia a queda com velocidade horizontal de 3,00 m/s. Desprezando dimensões e resistência do ar, qual o alcance horizontal da água nesse lançamento?\n\nDados: g = 10 m/s²",
  "opcoes": {"a": "18,6 m", "b": "22,4 m", "c": "25,5 m", "d": "28,0 m"},
  "gabarito": "c",
  "resolucao": "Tempo de queda: h = ½gt² → 361,25 = 5t² → t² = 72,25 → t = 8,5 s. Alcance horizontal: x = v_x × t = 3,00 × 8,5 = 25,5 m."
},
{
  "id": "OBFEP-2019-B-20",
  "ano": 2019, "numero": 20, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Dilatação",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "As asas de um Boeing 767 têm área total de 300 m². Decolando em Manaus (32 °C) e voando a 2 °C, qual a contração das asas em relação à situação em Manaus? A courace do avião é de aço com coeficiente de dilatação linear de 12 × 10⁻⁶ °C⁻¹.\n\n(Considere que a courace está sempre em equilíbrio térmico com o ambiente externo.)",
  "opcoes": {"a": "0,192 m²", "b": "0,216 m²", "c": "0,284 m²", "d": "0,308 m²"},
  "gabarito": "b",
  "resolucao": "ΔT = 32 − 2 = 30 °C (resfriamento). Coeficiente de dilatação superficial: β = 2α = 24 × 10⁻⁶ °C⁻¹. ΔA = A × β × ΔT = 300 × 24 × 10⁻⁶ × 30 = 300 × 720 × 10⁻⁶ = 0,216 m² (contração)."
},
]

data['banco_questoes'].extend(questoes)

with open('banco-questoes/fisica_ufrgs.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Total: {len(data['banco_questoes'])} questoes")
