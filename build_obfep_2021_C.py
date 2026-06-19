import json

with open('banco-questoes/fisica_ufrgs.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

IMG = 'obfep/2021/C-F1'

questoes = [
{
  "id": "OBFEP-2021-C-01",
  "ano": 2021, "numero": 1, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Eletromagnetismo", "subarea": "Eletrostática",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "No século VI a.C., Tales de Mileto descreveu que pedras de âmbar atraíam corpos leves após serem atritadas — propriedade que se esvaía com o tempo. Pedras de magnetita atraíam corpos de ferro sem estímulo externo por tempo indeterminado.\n\nAplicando os conhecimentos atuais sobre eletricidade e magnetismo aos comportamentos descritos por Tales, determine a proposição FALSA:",
  "opcoes": {
    "a": "O âmbar é um isolante elétrico que se eletriza por atrito, sendo capaz de atrair corpos leves ao se aproximar deles, polarizando-os eletricamente.",
    "b": "O âmbar é um gerador elétrico natural, produzindo corrente elétrica de baixa intensidade por causa da indução eletromagnética, atraindo apenas corpos eletricamente condutores.",
    "c": "As pedras de magnetita usadas por Tales eram ímãs permanentes, feitos de materiais ferromagnéticos magnetizados, portanto estavam abaixo do ponto Curie.",
    "d": "As pedras de magnetita usadas por Tales tinham domínios magnéticos que geravam um campo magnético para um sentido preferencial, tornando-se um dipolo magnético."
  },
  "gabarito": "b",
  "resolucao": "A alternativa b) é FALSA: o âmbar é isolante elétrico (não condutor), e se eletriza por atrito (eletrostática), não por indução eletromagnética. Ele atrai corpos leves de qualquer material (não apenas condutores) por polarização elétrica induzida. a), c) e d) são corretas pela física moderna."
},
{
  "id": "OBFEP-2021-C-02",
  "ano": 2021, "numero": 2, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Estática dos Fluidos",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref33_536x320.jpg"], "alternativas": {}},
  "enunciado": "Arquimedes (séc. III a.C.) verificou que 1,22 kg de ouro em pó equilibravam uma coroa fora da água, mas não dentro da água. Se metade do volume da coroa era de prata e a outra metade era de ouro, quanta massa de ouro em pó deveria ser retirada do prato para equilibrar a coroa, ambos dentro da água?\n\nDados: densidade do ouro = 20,0 kg/L; densidade da prata = 10,5 kg/L; densidade da água = 1,00 kg/L",
  "opcoes": {
    "a": "20 g",
    "b": "30 g",
    "c": "40 g",
    "d": "50 g"
  },
  "gabarito": "a",
  "resolucao": "Volumes iguais de ouro e prata: m_Au/20 = m_Ag/10,5 → m_Au = m_Ag × 40/21. Com m_Au + m_Ag = 1,22 kg: m_Ag = 0,42 kg, m_Au = 0,80 kg. V_coroa = 2 × 0,80/20 = 0,08 L. Peso aparente da coroa na água: (1,22 − 0,08)g = 1,14g. Para equilíbrio do ouro em pó na água: m_pó × (1 − 1/20) = 1,14 → m_pó = 1,20 kg. Retirar: 1,22 − 1,20 = 0,02 kg = 20 g."
},
{
  "id": "OBFEP-2021-C-03",
  "ano": 2021, "numero": 3, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "João Filoponos (séc. VI) sugeriu que uma flecha subia em linha reta até o momento que a força motriz cedida pelo arco acabava; logo após, caia verticalmente (Trajetória 1). A Trajetória 2 é a parabólica de Galileu.\n\nUma flecha foi lançada com velocidade horizontal de 10 m/s e velocidade vertical de 60 m/s, correspondendo à direção da Trajetória 1. Qual a diferença entre as alturas máximas das duas trajetórias?\n\nDados: g = 10 m/s²",
  "opcoes": {
    "a": "390 m",
    "b": "420 m",
    "c": "480 m",
    "d": "540 m"
  },
  "gabarito": "d",
  "resolucao": "Trajetória 2 (Galileu): h₂ = v_y²/(2g) = 60²/20 = 180 m. Trajetória 1 (Filoponos): a força motriz mantém a flecha em velocidade constante (compensando a gravidade) até ser esgotada no tempo total de voo galileano: t = 2v_y/g = 12 s. Altura: h₁ = v_y × t = 60 × 12 = 720 m. Diferença: 720 − 180 = 540 m."
},
{
  "id": "OBFEP-2021-C-04",
  "ano": 2021, "numero": 4, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "John Wallis (1668) apresentou a conservação da quantidade de movimento para resolver colisões. Dois carrinhos de carvão A (vazio, 120 kg) e B (com 60 kg de carga: 180 kg total) movimentavam-se em sentidos opostos em uma linha ferroviária: A a 16 m/s (→) e B a 4 m/s (←). A colisão é parcialmente elástica com coeficiente de restituição 0,5. Após a colisão, A inverteu sentido a 2 m/s. Determine o módulo da velocidade do carrinho B após a colisão.",
  "opcoes": {
    "a": "8 m/s",
    "b": "6 m/s",
    "c": "10 m/s",
    "d": "4 m/s"
  },
  "gabarito": "a",
  "resolucao": "Coeficiente de restituição: e = (v_B' − v_A')/(v_A0 − v_B0) onde os sinais indicam sentidos. e = (v_B' − (−2))/(16 − (−4)) = (v_B' + 2)/20 = 0,5 → v_B' + 2 = 10 → v_B' = 8 m/s. Verificação (conservação de momento): p_i = 120×16 + 180×(−4) = 1920 − 720 = 1200 kg·m/s. p_f = 120×(−2) + 180×8 = −240 + 1440 = 1200 kg·m/s ✓."
},
{
  "id": "OBFEP-2021-C-05",
  "ano": 2021, "numero": 5, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Galileu usou planos inclinados para estudar a queda dos corpos. Um desses planos tinha inclinação de 37° em relação à horizontal. O primeiro sino ficava a 16 cm do ponto de abandono. Se uma esfera metálica fosse abandonada nesse plano, ela sofreria força de atrito com intensidade igual a 0,5 vezes o módulo da força normal. Determine o intervalo de tempo, após o abandono, que a esfera levaria para atingir o primeiro sino.\n\nDados: g = 10 m/s²; sen 37° = 0,6; cos 37° = 0,8",
  "opcoes": {
    "a": "0,1 s",
    "b": "0,2 s",
    "c": "0,4 s",
    "d": "0,8 s"
  },
  "gabarito": "c",
  "resolucao": "Normal: N = mg cos37° = 0,8mg. Atrito: f = 0,5 × 0,8mg = 0,4mg (opõe-se ao movimento, subindo o plano). Força resultante descendo o plano: F = mg sin37° − f = 0,6mg − 0,4mg = 0,2mg. Aceleração: a = 0,2g = 2 m/s². Distância: d = ½at² → 0,16 = ½ × 2 × t² = t² → t = 0,4 s."
},
{
  "id": "OBFEP-2021-C-06",
  "ano": 2021, "numero": 6, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Em 1784, George Atwood criou um mecanismo com dois corpos de massas diferentes ligados por um fio em uma polia, onde as forças motoras eram os próprios pesos. Determine o valor da massa do bloco menor que corresponde a uma aceleração de 4 m/s² para os corpos desse mecanismo, considerando que a soma das massas dos dois corpos seja 10 kg.\n\nDados: desconsidere atrito; g = 10 m/s²",
  "opcoes": {
    "a": "4 kg",
    "b": "3 kg",
    "c": "2 kg",
    "d": "1 kg"
  },
  "gabarito": "b",
  "resolucao": "Na máquina de Atwood: a = (m_A − m_B) × g / (m_A + m_B). Com m_A + m_B = 10 kg e a = 4 m/s²: (m_A − m_B) × 10/10 = 4 → m_A − m_B = 4 kg. Sistema: m_A = 7 kg, m_B = 3 kg. Massa do bloco menor: 3 kg."
},
{
  "id": "OBFEP-2021-C-07",
  "ano": 2021, "numero": 7, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Refração",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Newton (1666) provou que a luz branca é policromática. Um feixe fino de luz branca incide em um prisma com ângulo de abertura α = 60,5°. O ângulo de incidência na primeira refração é 68,4° e o desvio da luz vermelha ao atravessar o prisma é 42,8°. O índice de refração da luz violeta no vidro é 1,55.\n\nDados (tabela seno): 23,6° → 0,40; 36,9° → 0,60; 38,3° → 0,62; 68,4° → 0,93\n\nDetermine o ângulo correspondente à abertura do feixe colorido emergente.",
  "opcoes": {
    "a": "2,8°",
    "b": "1,6°",
    "c": "6,2°",
    "d": "3,4°"
  },
  "gabarito": "d",
  "resolucao": "Luz vermelha: D_V = 42,8°. i₂_V = D + α − i₁ = 42,8 + 60,5 − 68,4 = 34,9°. Luz violeta (n=1,55): 1ª refração: sin(r₁) = sin(68,4°)/1,55 = 0,93/1,55 = 0,60 → r₁ = 36,9°. r₂ = α − r₁ = 60,5° − 36,9° = 23,6°. 2ª refração: sin(i₂) = 1,55 × sin(23,6°) = 1,55 × 0,40 = 0,62 → i₂ = 38,3°. D_violeta = i₁ + i₂ − α = 68,4° + 38,3° − 60,5° = 46,2°. Abertura do feixe: D_violeta − D_vermelha = 46,2° − 42,8° = 3,4°."
},
{
  "id": "OBFEP-2021-C-08",
  "ano": 2021, "numero": 8, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Eletromagnetismo", "subarea": "Eletrostática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag04_xref58_664x507.png"], "alternativas": {}},
  "enunciado": "Coulomb (1784) descobriu que a força elétrica tem o mesmo formato que a lei de Newton: F_g = G M_A M_B / d²_AB e F_ele = k Q_A Q_B / d²_AB.\n\nSobre essas leis, suas semelhanças, diferenças e os fenômenos que representam, determine a proposição INDISCUTIVELMENTE FALSA:",
  "opcoes": {
    "a": "No cotidiano, a força elétrica sempre se manifesta e é raro a gravitacional se manifestar porque naturalmente os corpos macroscópicos são eletricamente ativos e gravitacionalmente inertes.",
    "b": "A semelhança entre essas leis sugere que exista um formato único para as leis que regem as interações fundamentais da natureza.",
    "c": "A força gravitacional é sempre atrativa e a elétrica pode ser atrativa ou repulsiva. Por causa disso, a massa não possui sinal positivo e negativo como a carga elétrica.",
    "d": "Enquanto a constante da gravitação universal independe do meio, a constante eletrostática depende do meio por conta da polarização elétrica da matéria."
  },
  "gabarito": "a",
  "resolucao": "A alternativa a) é INDISCUTIVELMENTE FALSA: é justamente o contrário. Corpos macroscópicos têm massa (são gravitacionalmente ativos) e são geralmente eletricamente neutros (eletricamente inativos no cotidiano). A força gravitacional se manifesta o tempo todo (peso). A força elétrica entre corpos macroscópicos é geralmente nula ou fraca por serem neutros. a) inverte a realidade."
},
{
  "id": "OBFEP-2021-C-09",
  "ano": 2021, "numero": 9, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Eletromagnetismo", "subarea": "Eletrodinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Alessandro Volta (1800) descobriu a pilha elétrica ao observar que patas de rã umedecidas pelo fluido natural, penduradas com ganchos de latão em um varal de ferro, contraíam ao tocar os apoios do varal — mesmo sem tempestade.\n\nSobre a compreensão atual desse fenômeno, determine a proposição FALSA:",
  "opcoes": {
    "a": "Quando a pata tocava o apoio do varal, era estabelecido um circuito elétrico, possibilitando o surgimento de uma corrente elétrica mediante a existência de uma força eletromotriz.",
    "b": "O líquido natural das rãs reagia quimicamente com os dois tipos de metal. Esse sistema funcionou como uma pilha elétrica cujos polos eram os pontos de contato da pata com o varal.",
    "c": "Como os músculos da pata da rã eram acionados por correntes elétricas, eles acusaram que ali estava passando corrente elétrica, mesmo sem raios.",
    "d": "Os metais diferentes não precisam do fluido natural das rãs para reagir quimicamente. A função do fluido é tornar a pata condutora, permitindo que elétrons livres a atravessem."
  },
  "gabarito": "d",
  "resolucao": "A alternativa d) é FALSA: o fluido natural das rãs funciona como ELETRÓLITO (condutor iônico), não como simples condutor de elétrons livres. Metais diferentes precisam de um eletrólito entre eles para que a reação eletroquímica aconteça. Sem o eletrólito (fluido), os metais não formam uma pilha. A função do fluido não é 'tornar a pata condutora de elétrons livres' — a pata muscular já conduz; o fluido fornece o eletrólito necessário para a célula galvânica."
},
{
  "id": "OBFEP-2021-C-10",
  "ano": 2021, "numero": 10, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Eletromagnetismo", "subarea": "Magnetismo",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag05_xref66_250x198.jpg"], "alternativas": {}},
  "enunciado": "Em fevereiro de 1820, Oersted verificou que uma corrente elétrica muda a posição da agulha magnética de uma bússola. No experimento, o fio está acima da bússola, alinhado com a agulha que aponta para o Norte.\n\nUma corrente é estabelecida no fio no sentido do Sul para o Norte. O campo magnético produzido por essa corrente na região da agulha tem a mesma intensidade que o campo magnético terrestre no local. Qual o novo sentido no qual a agulha da bússola vai estabilizar?",
  "opcoes": {
    "a": "Continuará apontando para o Norte.",
    "b": "Apontará para o Noroeste.",
    "c": "Apontará para o Sul.",
    "d": "Apontará para o Nordeste."
  },
  "gabarito": "b",
  "resolucao": "Corrente no fio: sentido Sul → Norte (para cima). Pelo regra da mão direita (fio acima da bússola, corrente indo para Norte): no ponto abaixo do fio (onde está a bússola), B_fio aponta para Oeste. Campo terrestre B_T aponta para Norte. Campo resultante = B_T (Norte) + B_fio (Oeste), com |B_T| = |B_fio|. A resultante aponta para Noroeste (45° entre Norte e Oeste). Resposta: b)."
},
{
  "id": "OBFEP-2021-C-11",
  "ano": 2021, "numero": 11, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Termodinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag05_xref67_362x301.jpg"], "alternativas": {}},
  "enunciado": "Nicolas Carnot (1824) descreveu o ciclo da máquina de maior rendimento entre duas fontes de calor (ciclo de Carnot): a→b isotérmica quente, b→c adiabática expansão, c→d isotérmica fria, d→a adiabática compressão.\n\nSobre os argumentos que levam à escolha de cada transformação para atingir o rendimento teórico máximo, determine a proposição FALSA:",
  "opcoes": {
    "a": "De a para b, o gás se mantém em equilíbrio térmico com a fonte quente. Como não muda sua energia interna, o calor é todo transformado em trabalho. Nessa etapa, o rendimento é 100%.",
    "b": "De b para c, o gás reduz a pressão transformando a própria energia interna em trabalho positivo. Isso gera mais trabalho positivo sem consumir calor da fonte, logo aumenta o rendimento.",
    "c": "De c para d, o gás encontra-se em equilíbrio térmico com a fonte fria, obrigando-o a se manter em baixa pressão enquanto retorna. Isso gera pouco trabalho negativo, o que aumenta o rendimento.",
    "d": "De d para a, o gás aumenta a pressão sem realizar trabalho negativo, na medida que não perde calor para a fonte fria."
  },
  "gabarito": "d",
  "resolucao": "A alternativa d) é FALSA: de d para a, o gás sofre compressão adiabática — o trabalho é feito SOBRE o gás (trabalho negativo do ponto de vista do gás). A afirmação 'sem realizar trabalho negativo' é errada. O gás recebe trabalho da máquina (W < 0 para o gás). Isso é necessário para fechar o ciclo, mas representa a etapa de 'custo' do ciclo de Carnot."
},
{
  "id": "OBFEP-2021-C-12",
  "ano": 2021, "numero": 12, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Eletromagnetismo", "subarea": "Eletrodinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Michael Faraday (1831) descobriu a indução eletromagnética. Um gerador usa a energia cinética da água caindo em uma roda d'água para gerar uma força eletromotriz de 100 V em um circuito elétrico constituído por lâmpadas de uma fazenda. O ritmo de transformação de energia cinética em energia elétrica é 400 W.\n\nA resistência elétrica do circuito no qual o gerador está inserido mede:",
  "opcoes": {
    "a": "0,25 Ω",
    "b": "4 Ω",
    "c": "25 Ω",
    "d": "40.000 Ω"
  },
  "gabarito": "c",
  "resolucao": "P = fcem × I → I = P/fcem = 400/100 = 4 A. R = fcem/I = 100/4 = 25 Ω. (Desprezando resistência interna do gerador.)"
},
{
  "id": "OBFEP-2021-C-13",
  "ano": 2021, "numero": 13, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Calorimetria",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag06_xref70_301x151.png"], "alternativas": {}},
  "enunciado": "James Joule (1845) buscou o equivalente mecânico do calor. Em sua experiência: 2,00 kg de água foram colocados em um vasilhame com pás. Dois discos de 1000 g cada desciam 80 cm, fazendo girar o eixo das pás. Os discos repetiam a queda 50 vezes. A variação de temperatura obtida foi de 0,10°C. Joule não considerou a energia cinética residual dos discos nem o atrito das roldanas.\n\nQual o valor aproximado do erro percentual que Joule cometeu na quantidade de joules por caloria?\n\nDados: 1 caloria = 4,2 J (valor atual); c_água = 1 cal/(g·°C); g = 10 m/s²",
  "opcoes": {
    "a": "5%",
    "b": "10%",
    "c": "15%",
    "d": "20%"
  },
  "gabarito": "a",
  "resolucao": "Trabalho total dos discos: W = 50 × 2 × m × g × h = 50 × 2 × 1 × 10 × 0,8 = 800 J. Calor medido: Q = 2000 × 1 × 0,10 = 200 cal. Equivalente calculado: J_Joule = 800/200 = 4 J/cal. Valor atual: 4,2 J/cal. Erro: |4,2 − 4|/4,2 × 100% = 0,2/4,2 × 100% ≈ 4,76% ≈ 5%."
},
{
  "id": "OBFEP-2021-C-14",
  "ano": 2021, "numero": 14, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Ondulatória", "subarea": "Óptica Física",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "James Maxwell (1856) mostrou que a luz é um fenômeno eletromagnético. As ondas eletromagnéticas se propagam no vácuo e possuem características que dependem da frequência.\n\nSobre a teoria eletromagnética da luz e da matéria, determine a proposição FALSA:",
  "opcoes": {
    "a": "Os corpos na temperatura ambiente produzem ondas eletromagnéticas porque as cargas elétricas nos aglomerados atômicos estão constantemente oscilando (agitação térmica).",
    "b": "As ondas ultravioleta e infravermelha possuem, respectivamente, o maior e o menor comprimentos de onda dentre as ondas eletromagnéticas visíveis para os seres humanos.",
    "c": "Os elétrons possuem a capacidade de interagir com a luz porque eles possuem carga elétrica e a luz é composta por campos eletromagnéticos, os quais interagem com carga elétrica.",
    "d": "A teoria de Maxwell a respeito da luz explicou como o Sol pode enviar energia em forma de onda, mesmo sendo provado que o espaço era constituído por vácuo."
  },
  "gabarito": "b",
  "resolucao": "A alternativa b) é FALSA: ultravioleta e infravermelho NÃO são visíveis para os seres humanos. Eles estão fora do espectro visível (400–700 nm). O espectro visível vai do violeta (~400 nm, menor comprimento de onda) ao vermelho (~700 nm, maior comprimento de onda). UV tem comprimento de onda MENOR que violeta; IR tem comprimento MAIOR que vermelho — e nenhum é visível."
},
{
  "id": "OBFEP-2021-C-15",
  "ano": 2021, "numero": 15, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Ondulatória", "subarea": "Óptica Física",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Thomas Young (1801) demonstrou a interferência da luz passando por duas fendas, confirmando sua natureza ondulatória. No séc. XX, a Física Quântica revelou novas facetas da radiação eletromagnética.\n\nAplicando conhecimentos de Física Quântica (dimensões atômicas) e de ondas mecânicas (dimensões macroscópicas) ao experimento de dupla fenda, identifique a proposição VERDADEIRA:",
  "opcoes": {
    "a": "Se o experimento fosse feito com uma fonte de elétrons, com fendas em dimensões atômicas, só existiriam dois lugares sendo atingidos no anteparo.",
    "b": "Se a fonte de luz fosse de baixíssima potência (emissão de um fóton por vez), só existiriam duas regiões do anteparo que iriam receber luz.",
    "c": "Se a fonte emitisse som de única frequência e timbre senoidal, existiriam, na posição do anteparo, regiões de silêncio intercaladas por regiões de barulho.",
    "d": "A mesma experiência que provou, no início do séc. XIX, que a luz era onda poderia ser usada para provar, no séc. XX, que a luz é formada por partículas usando a mesma potência."
  },
  "gabarito": "c",
  "resolucao": "c) é VERDADEIRA: o som é uma onda mecânica. Ao passar pelas duas fendas, sofre difração e interferência. No anteparo, regiões de interferência construtiva (barulho) se alternam com regiões de interferência destrutiva (silêncio). a) FALSA: elétrons com fendas atômicas também mostram padrão de interferência (dualidade onda-partícula). b) FALSA: com um fóton por vez, o padrão de interferência ainda se forma gradualmente (quantum). d) FALSA: dupla fenda demonstra natureza ondulatória, não corpuscular."
},
]

data['banco_questoes'].extend(questoes)

with open('banco-questoes/fisica_ufrgs.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Total: {len(data['banco_questoes'])} questoes")
