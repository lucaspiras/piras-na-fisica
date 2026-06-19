import json

with open('banco-questoes/fisica_ufrgs.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

IMG = 'obfep/2022/C-F1'

questoes = [
{
  "id": "OBFEP-2022-C-01",
  "ano": 2022, "numero": 1, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag01_xref265_235x500.jpg"], "alternativas": {}},
  "enunciado": "Pedro construiu um elevador para a sua mãe usando sucatas de obras. No primeiro teste, Pedro acionou o botão de subir e o elevador partiu do repouso no térreo para o primeiro andar. Durante 3 s, Pedro sentiu como se estivesse mais pesado, a mesma sensação de quando tinha 81,6 kg de massa. Em seguida, ele sentiu o que normalmente sente quando está parado. Por fim, ele se sentiu mais leve, como se tivesse 78,4 kg, durante 3 s, finalizando o movimento.\n\nSabendo que o módulo da aceleração da gravidade local é igual a 10 m/s², a massa real de Pedro é 80 kg e que o deslocamento total mede 3,30 m, o tempo que esse elevador levou para subir do térreo até o primeiro andar é igual a",
  "opcoes": {
    "a": "9,0 s",
    "b": "8,5 s",
    "c": "10,0 s",
    "d": "10,5 s"
  },
  "gabarito": "b",
  "resolucao": "Aceleração: F_ap = m(g+a) → 81,6×10 = 80×(10+a) → a = 0,2 m/s² (subindo com aceleração). Desaceleração: 78,4×10 = 80×(10−a) → a = 0,2 m/s² ✓. Fase 1: t₁=3 s, d₁=0,5×0,2×9=0,9 m, v_max=0,6 m/s. Fase 3: t₃=3 s, d₃=0,9 m. Fase 2: d₂=3,30−1,8=1,5 m; t₂=1,5/0,6=2,5 s. Total: 3+2,5+3 = 8,5 s."
},
{
  "id": "OBFEP-2022-C-02",
  "ano": 2022, "numero": 2, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref268_386x429.jpg"], "alternativas": {}},
  "enunciado": "No terraço da casa de Marcos, existe um ventilador com três níveis de potência. Marcos deixa-o ligado sempre no nível 3. Nessa situação, a potência consumida pelo ventilador é 120 W e passam regularmente 0,72 kg de ar por segundo. Para manter o fluxo de ar, a hélice do ventilador produz 6 N de força constante no ar que passa por ela.\n\nConsiderando-se que o ar passa pelo ventilador perpendicularmente ao círculo descrito pelas pás da sua hélice, a densidade do ar é constante e igual a 1,2 kg/m³, π = 3 e a distância do eixo da hélice às extremidades das pás é igual a 20,0 cm, o rendimento desse ventilador, trabalhando no nível 3, é igual a",
  "opcoes": {
    "a": "25%",
    "b": "40%",
    "c": "50%",
    "d": "45%"
  },
  "gabarito": "a",
  "resolucao": "Área da hélice: A = π×r² = 3×(0,20)² = 0,12 m². Velocidade do ar: ṁ = ρAv → 0,72 = 1,2×0,12×v → v = 5 m/s. Potência útil (trabalho por unidade de tempo sobre o ar): P_util = F×v = 6×5 = 30 W. Rendimento: η = P_util/P_total = 30/120 = 25%."
},
{
  "id": "OBFEP-2022-C-03",
  "ano": 2022, "numero": 3, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref269_602x502.png"], "alternativas": {}},
  "enunciado": "Uma parede do mesmo terraço da questão anterior é feita de vidro, o que permite a entrada de luz solar do chão até o teto. Certo dia, Marco estava vendo a sombra da hélice do ventilador na parede oposta. A luz atingia a hélice de perfil, logo a sombra das extremidades das pás da hélice se movimentava por um segmento de reta AB de 40,0 cm de comprimento.\n\nSabendo-se que cos 60° = 0,50 e que o ventilador estava no nível 3, situação em que sua hélice desenvolve uma frequência de 333,3 rpm, o valor aproximado do deslocamento da sombra da extremidade de uma pá da hélice em 0,03 s, contando a partir do instante que essa sombra atinge o ponto A, é de",
  "opcoes": {
    "a": "2,6 cm",
    "b": "4,6 cm",
    "c": "10,0 cm",
    "d": "20,0 cm"
  },
  "gabarito": "c",
  "resolucao": "f = 333,3/60 ≈ 50/9 Hz. ω = 2πf. Com π=3: ω = 2×3×(50/9) = 100/3 rad/s. Em Δt=0,03 s: Δθ = ω×Δt = (100/3)×0,03 = 1 rad. Com π=3: 1 rad = 180°/π = 60°. Sombra parte de A (extremo da oscilação, θ=180°). Posição em relação ao centro: x = 20×cos(180°+60°) = 20×cos(240°) = 20×(−0,5) = −10 cm. Posição inicial (em A): x₀ = −20 cm. Deslocamento = |−10−(−20)| = 10 cm."
},
{
  "id": "OBFEP-2022-C-04",
  "ano": 2022, "numero": 4, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Ondulatória", "subarea": "Som",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref271_372x310.png"], "alternativas": {}},
  "enunciado": "Eduardo estava treinando a leitura em voz alta do lado de fora de sua casa. Com as janelas e as portas fechadas, a mãe de Eduardo não consegue ouvi-lo, mesmo quando ele está gritando na posição representada na figura. Nessa posição, Eduardo não consegue ver a porta; entretanto, caso essa porta estivesse aberta, a mãe de Eduardo conseguiria ouvi-lo.\n\nSabendo-se que não existem cercas, muros ou árvores próximas da casa, o fenômeno que permite o som emitido por Eduardo, na posição retratada na figura, entrar na casa pela porta aberta é a",
  "opcoes": {
    "a": "Difração",
    "b": "Reflexão",
    "c": "Refração",
    "d": "Interferência"
  },
  "gabarito": "a",
  "resolucao": "Eduardo está em uma posição onde não há linha de visão direta com a porta aberta (a geometria do prédio bloqueia o caminho reto). O som, porém, contorna os obstáculos (quinas da parede da casa) graças à difração: o som se propaga ao redor de bordas e por aberturas, alcançando regiões geometricamente \"na sombra\". É exatamente esse fenômeno de difração que permite o som entrar pela porta aberta mesmo Eduardo não estando em linha reta com ela."
},
{
  "id": "OBFEP-2022-C-05",
  "ano": 2022, "numero": 5, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Transmissão de Calor",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag03_xref280_611x257.jpg"], "alternativas": {}},
  "enunciado": "Na casa de Geovana existe uma geladeira de base quadrada com dimensões 80 cm × 50 cm × 50 cm. Para reduzir o ganho de calor, coloca-se uma camada de 5 cm de poliestireno (isolante térmico) por todas as paredes da geladeira. Quando o interior atinge 10 °C, o compressor liga; quando atinge 2 °C, o compressor desliga.\n\nSabendo-se que a camada de poliestireno é a única entre o interior e o exterior da geladeira e que uma chapa de poliestireno deixa passar 2,5 cal/s se for estabelecido 1 °C de diferença de temperatura entre suas faces de 1 m² de área distanciadas por 1 cm de espessura, pode-se afirmar que o fluxo de calor que passa de fora para dentro dessa geladeira no momento que seu interior atinge 2 °C, com ambiente externo de 20 °C, é igual a",
  "opcoes": {
    "a": "16,8 cal/s",
    "b": "17,6 cal/s",
    "c": "19,8 cal/s",
    "d": "18,9 cal/s"
  },
  "gabarito": "d",
  "resolucao": "Área total da superfície da geladeira: 2×(0,80×0,50) + 2×(0,80×0,50) + 2×(0,50×0,50) = 2×0,40 + 2×0,40 + 2×0,25 = 0,80 + 0,80 + 0,50 = 2,10 m². Condutividade: k = 2,5 cal/(s·°C·m²·cm). Espessura d = 5 cm. ΔT = 20−2 = 18 °C. Fluxo: Φ = k × A × ΔT / d = 2,5 × 2,10 × 18 / 5 = 2,5 × 37,8/5 = 2,5 × 7,56 = 18,9 cal/s."
},
{
  "id": "OBFEP-2022-C-06",
  "ano": 2022, "numero": 6, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Eletromagnetismo", "subarea": "Eletrodinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Para compensar o desafio da quarentena em casa, César deu um carrinho elétrico de controle remoto para o seu filho. O circuito elétrico desse carrinho associa em série seus elementos e é alimentado por uma pilha de 9 V cuja resistência interna mede 12 Ω. Seu motor possui uma força contra-motriz de 6 V e uma resistência interna de 10 Ω. O controle-remoto controla o terceiro elemento do circuito: um reostato cuja resistência elétrica varia de 3,0 a 20 Ω.\n\nDesprezando as resistências dos fios, a potência mecânica máxima produzida pelo motor elétrico desse carrinho é igual a",
  "opcoes": {
    "a": "0,64 W",
    "b": "0,72 W",
    "c": "0,76 W",
    "d": "0,68 W"
  },
  "gabarito": "b",
  "resolucao": "A potência mecânica do motor é P = fcm × I = 6I. Para maximizar P, devemos maximizar a corrente I. Com o reostato no mínimo (R=3 Ω): I = (V − fcm)/(r_pilha + R_motor + R_reostato) = (9−6)/(12+10+3) = 3/25 = 0,12 A. P_mec = 6×0,12 = 0,72 W."
},
{
  "id": "OBFEP-2022-C-07",
  "ano": 2022, "numero": 7, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Ondulatória", "subarea": "Som",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Rodolfo possui um aparelho de som do tipo Mini System cuja potência sonora máxima é 320 W. Ele estava mudando de uma casa ampla para um apartamento pequeno. Na sua antiga casa, costumava ouvir música a 6 m do aparelho de som trabalhando com metade de sua potência máxima.\n\nPara se adequar à nova residência, ele queria trocar seu aparelho por um Micro System de potência sonora máxima igual a 20 W. Desprezando-se as dimensões das fontes de som, os fenômenos de reflexão e difração do som e sabendo-se que a área da esfera é igual a 4πR², a distância que Rodolfo deve ficar do Micro System, trabalhando com a sua potência máxima para ouvir música com metade da intensidade sonora da situação descrita no parágrafo anterior, é de",
  "opcoes": {
    "a": "1,5 m",
    "b": "3,0 m",
    "c": "2,0 m",
    "d": "2,5 m"
  },
  "gabarito": "b",
  "resolucao": "Intensidade antiga: I_old = P_old/(4πd_old²) = 160/(4×3×36) = 160/432 W/m². Intensidade desejada: I_new = I_old/2 = 80/432 W/m². Com o Micro System (P=20 W): I_new = 20/(4π×d²) = 20/(12d²). Igualando: 20/(12d²) = 80/432 → d² = 20×432/(12×80) = 8640/960 = 9 → d = 3 m."
},
{
  "id": "OBFEP-2022-C-08",
  "ano": 2022, "numero": 8, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Refração",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag04_xref284_655x318.jpg"], "alternativas": {}},
  "enunciado": "Depois da aula, um grupo de colegas de Laura foi até a sua casa. No quarto de Laura, tinha um aquário com um peixe. Uma colega ficou observando o peixe no aquário. Os olhos dessa menina e o peixe estavam na mesma normal à superfície da parede de vidro por onde ela o observava. Vendo pela outra parede de vidro, o professor mediu a distância do peixe até a superfície vidro-água da parede de vidro por onde a menina observava o peixe: 32 cm.\n\nSabendo-se que o índice de refração da água é 4/3, do vidro é 1,5 e do ar é 1, que a espessura das paredes de vidro do aquário é 1,5 cm e que os olhos da menina estavam a 20 cm da superfície ar-vidro dessa mesma parede, a distância entre os olhos da colega de Laura e o local do peixe de acordo com o que a visão dela estava indicando é igual a",
  "opcoes": {
    "a": "45 cm",
    "b": "32 cm",
    "c": "36 cm",
    "d": "48 cm"
  },
  "gabarito": "a",
  "resolucao": "Interface água→vidro: d₁' = d₁ × (n_vidro/n_água) = 32 × (1,5 / (4/3)) = 32 × (9/8) = 36 cm (imagem aparente dentro do vidro). A imagem fica a 36 cm da interface interna do vidro, ou seja, a 36+1,5 = 37,5 cm da interface vidro→ar (exterior). Interface vidro→ar: d₂' = 37,5 × (n_ar/n_vidro) = 37,5 × (1/1,5) = 25 cm (imagem aparente no ar). Distância total dos olhos ao peixe aparente: 25+20 = 45 cm."
},
{
  "id": "OBFEP-2022-C-09",
  "ano": 2022, "numero": 9, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Eletromagnetismo", "subarea": "Eletrodinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag04_xref285_251x271.png"], "alternativas": {}},
  "enunciado": "As tomadas da casa de Lídia têm 110 V de tensão elétrica e suportam 10 A. Ela comprou uma extensão para a tomada da sala capaz de conectar simultaneamente os cinco aparelhos que existiam nesse cômodo. Lídia verificou que as potências desses aparelhos eram: 360 W para a televisão; 220 W para o ventilador; 340 W para o computador; 130 W para a impressora e 420 W para o aparelho de som.\n\nDos conjuntos de aparelhos apresentados abaixo, qual contém aparelhos que Lídia não pode ligar simultaneamente para não gerar danos à tomada?",
  "opcoes": {
    "a": "Computador, impressora e ventilador.",
    "b": "Computador, ventilador, aparelho de som.",
    "c": "Computador, televisão e aparelho de som.",
    "d": "Televisão, ventilador e aparelho de som."
  },
  "gabarito": "c",
  "resolucao": "Potência máxima da tomada: P_max = V×I = 110×10 = 1100 W. Verificando cada conjunto: a) 340+130+220 = 690 W ≤ 1100 ✓. b) 340+220+420 = 980 W ≤ 1100 ✓. c) 340+360+420 = 1120 W > 1100 ✗ — supera a capacidade! d) 360+220+420 = 1000 W ≤ 1100 ✓. Resposta c)."
},
{
  "id": "OBFEP-2022-C-10",
  "ano": 2022, "numero": 10, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Calorimetria",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Marta morava em uma região montanhosa e fria. Todo dia, pela manhã, ela tomava banho com a água na temperatura de 3 °C, o que trazia uma sensação de desconforto térmico. Resolveu isso quando comprou um chuveiro elétrico de 4 kW para a sua casa. A temperatura que a água saía do chuveiro dependia da quantidade de água que passava pelo chuveiro no decorrer do tempo.\n\nCom base nas informações e sabendo-se que o calor específico da água é 1 cal/(g·°C) e 1 cal = 4 J, a massa de água em quilogramas que deve passar pelo chuveiro, em 1 minuto, para que Marta tome banho com a água na temperatura de 15 °C é igual a",
  "opcoes": {
    "a": "5,0 kg",
    "b": "4,0 kg",
    "c": "3,0 kg",
    "d": "6,0 kg"
  },
  "gabarito": "a",
  "resolucao": "Potência P=4000 W. Em 1 min: E = 4000×60 = 240000 J = 60000 cal. ΔT = 15−3 = 12 °C. Q = mc ΔT → m = Q/(cΔT) = 60000/(1×12) = 5000 g = 5,0 kg."
},
{
  "id": "OBFEP-2022-C-11",
  "ano": 2022, "numero": 11, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Energia",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag05_xref289_250x532.jpg"], "alternativas": {}},
  "enunciado": "Hugo abandona um carrinho de uma altura H = 40 cm. No fim da descida, o carrinho faz um loop de raio igual a 8,0 cm. Desprezando-se o calor produzido, considerando-se g = 10 m/s² e a massa do carrinho = 200 g, pode-se afirmar corretamente que a intensidade da força que o carrinho exerce no loop quando passa pelo ponto mais alto dele é igual a",
  "opcoes": {
    "a": "8,0 N",
    "b": "9,0 N",
    "c": "10,0 N",
    "d": "12,0 N"
  },
  "gabarito": "c",
  "resolucao": "H=0,40 m, r=0,08 m, m=0,2 kg. Altura do topo do loop = 2r = 0,16 m. Velocidade no topo (energia conservada): v² = 2g(H−2r) = 2×10×(0,40−0,16) = 4,8 m²/s². No topo: força centrípeta resultante = mg + N (ambas apontam para baixo, para o centro). N + mg = mv²/r → N = m(v²/r − g) = 0,2×(4,8/0,08 − 10) = 0,2×(60−10) = 0,2×50 = 10 N. Pela 3ª lei, o carrinho exerce 10 N na pista (para fora)."
},
{
  "id": "OBFEP-2022-C-12",
  "ano": 2022, "numero": 12, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag05_xref290_800x447.jpg"], "alternativas": {}},
  "enunciado": "Alan gosta muito de escalar o vão da porta de seu quarto, conforme a figura. Ele possui massa de 40 kg e para manter-se parado, precisa pressionar com os pés e as mãos a estrutura de madeira que contorna o vão da porta.\n\nSabendo-se que g = 10 m/s², os coeficientes de atrito dinâmico e estático entre a pele de Alan e a madeira valem respectivamente 0,6 e 0,8 e que cada mão e cada pé aplica uma força normal de mesma intensidade na madeira, o valor de uma dessas forças normais para que o menino fique na iminência do movimento é igual a",
  "opcoes": {
    "a": "115 N",
    "b": "90 N",
    "c": "110 N",
    "d": "125 N"
  },
  "gabarito": "d",
  "resolucao": "Na iminência do movimento usa-se o coeficiente de atrito ESTÁTICO (μ_e = 0,8). Peso de Alan: P = 40×10 = 400 N. Há 4 pontos de contato (2 mãos + 2 pés), cada um com força normal N e atrito estático f = μ_e × N = 0,8N. Equilíbrio vertical: soma dos atritos = peso → 4×0,8N = 400 → N = 400/3,2 = 125 N."
},
{
  "id": "OBFEP-2022-C-13",
  "ano": 2022, "numero": 13, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Energia",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag05_xref291_235x235.jpg"], "alternativas": {}},
  "enunciado": "Na varanda da casa de Edinho havia uma rede de proteção bem esticada. Certo dia, ele chutou uma bola de basquete de 400 g que estava inicialmente parada no solo. Essa bola atingiu a rede, deformando-a 10 cm na direção perpendicular a ela. Ao voltar para a posição normal, a rede fez a bola retornar para o interior da varanda. A bola continuou subindo até tocar o teto com 2 m/s de velocidade, como mostra a linha tracejada da figura. Apesar de manifestar um comportamento elástico, a rede dissipou 20% da energia potencial elástica máxima ocorrida nesse processo.\n\nSabendo-se que a rede obedece a lei de Hooke, k = 200 N/m, g = 10 m/s² e a altura do teto é 2,2 m, o valor da velocidade que a bola adquiriu ao ser chutada por Edinho ainda no solo era igual a",
  "opcoes": {
    "a": "9 m/s",
    "b": "8 m/s",
    "c": "6 m/s",
    "d": "7 m/s"
  },
  "gabarito": "d",
  "resolucao": "PE_elástica máxima: E_el = 0,5×k×x² = 0,5×200×(0,1)² = 1 J. Energia devolvida pela rede à bola: E_rede = 0,80×1 = 0,8 J (horizontal). Bola chutada na horizontal (vel. horizontal v_x) com vel. vertical v_y. Na rede (h=0): KE_horizontal = E_rede = 0,8 J → v_x² = 2×0,8/0,4 = 4 m²/s². No teto (h=2,2 m, v_total=2 m/s): E_mec_topo = 0,5×0,4×4 + 0,4×10×2,2 = 0,8+8,8 = 9,6 J. Componente vertical após rede até teto: 0,8 + 0,5×0,4×v_y² = 9,6 → v_y² = (8,8−0)/0,2 = 44 m²/s². Velocidade inicial: v_total² = v_y² + v_x0² = 44+5 = 49 → v = 7 m/s."
},
{
  "id": "OBFEP-2022-C-14",
  "ano": 2022, "numero": 14, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Eletromagnetismo", "subarea": "Magnetismo",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag06_xref294_389x295.png"], "alternativas": {}},
  "enunciado": "Rose tinha uma geladeira comum e costumava comprar ímãs decorativos para enfeitar a superfície externa. Certo dia, ela discutia com o marido que disse que a geladeira não é imantada. Rose discordava. Seu marido pegou vários pregos de ferro de tamanhos diferentes, encostou-os na superfície externa da porta da geladeira e abandonou-os.\n\nSobre o que aconteceu com os pregos e o magnetismo das substâncias envolvidas, determine a alternativa que apresenta uma justificativa verdadeira.",
  "opcoes": {
    "a": "Os pregos ficaram presos como se fossem ímãs decorativos, logo toda a porta da geladeira é um grande ímã permanente atraindo todos os corpos que possuem ferro em sua constituição.",
    "b": "Os pregos não ficaram presos, pois a porta da geladeira é feita com substância diamagnética.",
    "c": "Um ímã decorativo induz a imantação do local da porta próximo a ele; sem esse indutor, esse local perde sua imantação ou esta torna-se insignificante, impossibilitando prender os pregos.",
    "d": "Os pregos ficaram presos, porque são constituídos por substâncias ferromagnéticas, logo são ímãs permanentemente como os decorativos e prendem-se à porta da mesma forma."
  },
  "gabarito": "c",
  "resolucao": "A porta da geladeira é de aço (ferromagnética), mas não é um ímã permanente. Um ímã decorativo (permanente) magnetiza por indução o trecho de porta próximo a ele, e assim se prende. Sem o ímã decorativo, esse local perde a magnetização induzida (materiais ferromagnéticos suaves perdem a imantação sem campo externo). Os pregos de ferro, por sua vez, também são ferromagnéticos mas não são ímãs permanentes — eles cairiam sem um ímã induzindo magnetismo na porta."
},
{
  "id": "OBFEP-2022-C-15",
  "ano": 2022, "numero": 15, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Transmissão de Calor",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Na casa de Paulo, existia um fogão cujo forno tinha uma tampa de vidro que permitia visualizar seu interior equipado por uma lâmpada. Enquanto um frango estava sendo assado no forno, Paulo tocou na tampa do forno com a mão direita. Ele sentiu que a parte externa da tampa estava quente, porém suportável. Nesse momento, ele foi surpreendido pela sua esposa que estava oferecendo-lhe água natural em um copo de alumínio. Imediatamente, ele segurou o copo com a mesma mão que estava tocando a tampa do forno.\n\nSobre esses processos, identifique a alternativa FALSA.",
  "opcoes": {
    "a": "O tipo de radiação eletromagnética que passa pela tampa de vidro possui frequências maiores do que o tipo de radiação que detém a maior quantidade de energia dentro do forno.",
    "b": "Se Paulo segurasse o copo com a mão esquerda, ele teria exatamente a mesma sensação térmica que experimentou usando a mão direita nessa situação.",
    "c": "A parte externa da tampa não fica muito quente porque o vidro reflete significativamente a radiação infravermelha, apesar de promover refração significativa para a luz visível.",
    "d": "Estufas de vidro possuem temperatura interna maior que a externa quando submetidas à incidência solar por causa da mesma propriedade apresentada pelo vidro nessa situação."
  },
  "gabarito": "b",
  "resolucao": "A alternativa b) é FALSA: a mão direita foi aquecida pelo contato com a tampa do forno quente. Ao segurar o copo frio de alumínio com a mão direita (já aquecida), Paulo sentiria menos frio do que sentiria com a mão esquerda (que está à temperatura corporal normal). As sensações térmicas NÃO seriam as mesmas. As demais são verdadeiras: a) luz visível (frequência alta) passa pelo vidro, mas o infravermelho (frequência baixa, maior energia térmica no forno) não ✓; c) vidro é opaco ao IR ✓; d) efeito estufa ✓."
},
]

data['banco_questoes'].extend(questoes)

with open('banco-questoes/fisica_ufrgs.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Total: {len(data['banco_questoes'])} questoes")
