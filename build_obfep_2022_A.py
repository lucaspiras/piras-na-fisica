import json

with open('banco-questoes/fisica_ufrgs.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

IMG = 'obfep/2022/A-F1'

questoes = [
{
  "id": "OBFEP-2022-A-01",
  "ano": 2022, "numero": 1, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag01_xref265_343x290.png"], "alternativas": {}},
  "enunciado": "Para testar a Terceira lei de Newton, que afirma que \"todas as forças surgem aos pares: ao aplicar uma força sobre um corpo (ação), recebe desse corpo uma força (reação), com mesmo módulo e na mesma direção, porém com sentido oposto\", Samuel prendeu uma das extremidades de uma corda em um parafuso fixado na parede e em seguida puxou a outra extremidade com vontade, conforme mostra a figura. A corda tensionou e ele ficou parado por algum tempo, chegando à conclusão que: \"Essa lei não deveria ser chamada de lei, pois não estou sentindo nenhuma reação e estou aplicando uma ação na corda. Uma prova disso é o fato de continuar parado. Se meu corpo sofresse uma força de reação, eu sentiria um puxão para a parede\".\n\nCom base nas informações, identifique a alternativa abaixo que apresenta a conclusão correta sobre a situação e critica a conclusão errônea de Samuel.",
  "opcoes": {
    "a": "Samuel não está se movimentando para a parede porque a força que sofre da corda está sendo anulada por uma força aplicada pelo piso sobre ele.",
    "b": "Samuel está parado porque a força que aplica sobre a corda é neutralizada pela sua reação e vice-versa já que são forças com sentidos opostos e possuem a mesma intensidade.",
    "c": "A corda não aplica força em Samuel porque a força que ele aplica na corda é anulada por uma força aplicada pelo piso no próprio Samuel.",
    "d": "A conclusão de Samuel que ficar parado significa que nenhuma força está sendo aplicada, está errada, pois um corpo que está parado, continua parado se sofrer forças para cima."
  },
  "gabarito": "a",
  "resolucao": "Pela 3ª lei de Newton, a corda SIM exerce força em Samuel (para a parede). Samuel está parado não porque não há forças, mas porque o piso aplica uma força de atrito estático em seus pés que equilibra a força da corda. As forças de ação e reação atuam em corpos DIFERENTES (Samuel na corda, corda em Samuel), por isso nunca se anulam entre si — anulam-se com outras forças no mesmo corpo. Alternativa a) é a correta."
},
{
  "id": "OBFEP-2022-A-02",
  "ano": 2022, "numero": 2, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Física Geral", "subarea": "Energia",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref269_1646x267.png"], "alternativas": {}},
  "enunciado": "As figuras abaixo representam quatro situações que ocorrem constantemente na casa de Eugênio. Sabendo-se que em cada situação está ocorrendo uma ou mais transformações energéticas, a alternativa que descreve corretamente a transformação de energia que está ocorrendo na situação indicada é a",
  "opcoes": {
    "a": "situação 1: quando o liquidificador está ligado, triturando e misturando o material dentro do seu copo, existe transformação de energia química em energia térmica.",
    "b": "situação 2: quando o gás de cozinha sofre combustão para aquecer uma panela, existe transformação de energia elétrica em energia térmica.",
    "c": "situação 3: quando alguém empurra a vassoura, ocorre transformação de energia química em energia cinética.",
    "d": "situação 4: quando o ferro de passar é usado para passar roupas, existe transformação de energia elétrica em energia cinética."
  },
  "gabarito": "c",
  "resolucao": "Situação 3 (vassoura): o corpo humano converte energia química (alimentos) em energia mecânica cinética ao empurrar a vassoura → química em cinética ✓. Situação 1 (liquidificador): elétrica → cinética (e não química → térmica). Situação 2 (fogão): química (gás) → térmica. Situação 4 (ferro de passar): elétrica → térmica."
},
{
  "id": "OBFEP-2022-A-03",
  "ano": 2022, "numero": 3, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Dilatação e Pressão",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Jean realizou um experimento utilizando duas panelas de pressão idênticas A e B:\n\n• 1 litro de água em cada; tampa de A encaixada conforme o fabricante; tampa de B posta sem encaixar.\n• Colocadas em bocas de fogão idênticas e acesas simultaneamente. Após algum tempo, água de B ferve normalmente e vapor de A sai pela válvula em ritmo regular, indicando temperatura estabilizada.\n• Retiradas do fogão e colocadas sobre a mesa. A tampa de B foi então encaixada conforme o fabricante.\n• Após meia hora: panela B a 36 °C e panela A a 40 °C.\n\nIdentifique a alternativa que corresponde à conclusão mais coerente sobre o estado das porções de água e das panelas no momento em que ambas foram retiradas do fogão.",
  "opcoes": {
    "a": "Já que a água líquida no interior das duas panelas estavam a 100 °C, a panela A encontrava-se mais quente que a panela B.",
    "b": "Dentro da panela A, toda a água estava na forma de vapor, tendo uma temperatura maior que 100 °C, enquanto a água líquida da panela B estava a 100 °C.",
    "c": "Tanto as águas líquidas, quanto as panelas estavam na temperatura de 100 °C. Entretanto, a panela B tinha perdido grande parte de sua água na forma de vapor.",
    "d": "A água da panela A estava fervendo a uma temperatura maior que 100 °C e a água da panela B estava fervendo a 100 °C."
  },
  "gabarito": "d",
  "resolucao": "A panela A (pressão fechada): a pressão interna aumenta → ponto de ebulição sobe acima de 100 °C → água ferve em temperatura maior. O vapor saindo pela válvula indica que a temperatura se estabilizou acima de 100 °C. A panela B (aberta): pressão atmosférica normal → ebulição a 100 °C. Ao tirar do fogo: A tem água a >100 °C, B tem água a 100 °C. Após meia hora: A esfriou menos (mais energia térmica armazenada), confirmado pelas temperaturas finais 40 °C vs 36 °C."
},
{
  "id": "OBFEP-2022-A-04",
  "ano": 2022, "numero": 4, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Na casa de Cris chegou uma nova máquina de lavar roupas com tampa de vidro. Cris notou que a máquina possui um tambor cilíndrico com a base superior aberta e cheio de furinhos. A etapa final do processo é a centrifugação, quando o tambor sofre rotação em alta velocidade. Antes da centrifugação, o nível da água no tambor chega a zero por gravidade.\n\nSabendo-se que na etapa final do processo as roupas estão quase secas, identifique a alternativa que justifica corretamente por que a centrifugação \"seca\" as roupas.",
  "opcoes": {
    "a": "A centrifugação aumenta a pressão atmosférica no interior do cilindro, isso força o ar a empurrar a água das roupas para os furinhos do tambor.",
    "b": "A centrifugação aumenta a velocidade da água que tende a se desgarrar das roupas para seguir em linha reta conforme a lei da inércia.",
    "c": "A centrifugação aumenta o atrito entre as roupas, o que faz as moléculas de água se desgarrarem por evaporação.",
    "d": "A centrifugação aumenta a gravidade, fazendo com que a água das roupas fique com um peso maior e caia pelos furinhos."
  },
  "gabarito": "b",
  "resolucao": "Pela lei da inércia (1ª lei de Newton), todo corpo tende a seguir em linha reta. Durante a centrifugação, as roupas giram em círculo, mas a água nelas contida tende a mover-se em linha reta (tangencialmente), desgarrando-se das fibras e saindo pelos furinhos do tambor. A centrifugação não muda a pressão atmosférica nem a gravidade."
},
{
  "id": "OBFEP-2022-A-05",
  "ano": 2022, "numero": 5, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag03_xref275_452x360.jpg"], "alternativas": {}},
  "enunciado": "No quintal da casa de David, existe um brinquedo chamado de espirobol, onde uma bola é presa à extremidade de uma corda cuja outra extremidade fica presa a um tronco, conforme a figura. Dois jogadores tentam enrolar a corda no tronco em sentidos opostos. David e seu amigo estavam discutindo sobre dois temas:\n\nTema 1 — Sobre a bola enquanto descreve uma volta mantendo o ritmo de seu movimento:\n(1) David disse: \"O fio não está exercendo força, pois a velocidade não muda. O fio só está segurando a bola.\"\n(2) O amigo disse: \"O fio está exercendo força, pois a velocidade está mudando de direção, o que exige força.\"\n\nTema 2 — Sobre a massa da bola que deve ser usada:\n(3) David disse: \"Se aplicarmos a mesma força com a mesma duração, a bola de maior massa vai ganhar menos rapidez.\"\n(4) O amigo disse: \"A rapidez depende exclusivamente da força. Quanto mais força, maior a rapidez. Não importa a massa da bola.\"\n\nQual a alternativa contém as duas frases corretas?",
  "opcoes": {
    "a": "A frase (2) e a frase (3)",
    "b": "A frase (2) e a frase (4)",
    "c": "A frase (1) e a frase (3)",
    "d": "A frase (1) e a frase (4)"
  },
  "gabarito": "a",
  "resolucao": "Frase (2) é CORRETA: velocidade vetorial muda de direção → há aceleração centrípeta → há força centrípeta (exercida pelo fio). Frase (1) é ERRADA: mesmo que o módulo seja constante, a direção muda, o que requer força. Frase (3) é CORRETA: pelo impulso J = FΔt = mΔv → Δv = J/m; maior massa → menor ganho de velocidade para o mesmo impulso. Frase (4) é ERRADA: a massa interfere na variação de velocidade."
},
{
  "id": "OBFEP-2022-A-06",
  "ano": 2022, "numero": 6, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Hidrostática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag03_xref273_1617x460.png"], "alternativas": {}},
  "enunciado": "Eugênio precisava trocar o piso do deck da piscina que tinha em casa. O piso era constituído por toras de madeira justapostas de 10 cm de espessura, que foram cortadas na madeireira no tamanho exato que reproduziria o formato final do piso quando fossem unidas, conforme a figura. Para transportar as toras de diversos tamanhos, Eugênio contratou um veículo que suportava até 500 kg na carroceria.\n\nSabendo-se que cada 1 m³ de madeira possui 0,950 toneladas de massa, raio da piscina = 2 m e que π = 3, o número mínimo de viagens que será necessário para transportar as toras da madeireira até a casa de Eugênio é igual a",
  "opcoes": {
    "a": "1 viagem",
    "b": "2 viagens",
    "c": "3 viagens",
    "d": "4 viagens"
  },
  "gabarito": "c",
  "resolucao": "Área do deck circular: A = π × r² = 3 × (2)² = 12 m². Volume das toras: V = 12 × 0,10 = 1,2 m³. Massa total: m = 1,2 × 950 = 1140 kg. Número de viagens = ⌈1140/500⌉ = ⌈2,28⌉ = 3 viagens."
},
{
  "id": "OBFEP-2022-A-07",
  "ano": 2022, "numero": 7, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Óptica Física",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag04_xref280_274x293.png", f"{IMG}/pag04_xref282_151x167.png"], "alternativas": {}},
  "enunciado": "Jeremias pintou um grande hexagrama regular colorido no teto, conforme figura. Ele pintou as regiões 1, 3 e 5 com magenta, amarela e ciano, respectivamente. Pintou as regiões 2, 4 e 6 com a mistura de mesma quantidade das tintas das cores adjacentes a cada região. A região 7 foi deixada na cor branca. Para iluminar o hexagrama, Jeremias criou um sistema com três lâmpadas nas cores vermelha, azul e verde que acendiam e apagavam de forma aleatória e independente.\n\nSabendo-se que a região 7 possui 6 m² de área e considerando o fenômeno de reflexão, pode-se afirmar que a área total que aparece nas cores vermelha ou azul quando as lâmpadas vermelha e azul estiverem acesas simultaneamente, é igual a",
  "opcoes": {
    "a": "4 m²",
    "b": "3 m²",
    "c": "6 m²",
    "d": "5 m²"
  },
  "gabarito": "a",
  "resolucao": "Cores das regiões: 1=magenta (absorve verde), 2=magenta+amarela=vermelho (absorve verde+azul), 3=amarela (absorve azul), 4=amarela+ciano=verde (absorve azul+vermelho), 5=ciano (absorve vermelho), 6=ciano+magenta=azul (absorve verde+vermelho), 7=branca.\n\nCom lâmpadas vermelha+azul acesas (sem verde):\n- Região 2 (vermelho): reflete apenas vermelho → APARECE VERMELHA ✓\n- Região 3 (amarela): absorve azul, reflete vermelho+verde → apenas vermelho disponível → APARECE VERMELHA ✓\n- Região 5 (ciano): absorve vermelho, reflete verde+azul → apenas azul disponível → APARECE AZUL ✓\n- Região 6 (azul): reflete apenas azul → APARECE AZUL ✓\n\nQuatro regiões (2, 3, 5, 6) aparecem vermelho ou azul, cada uma com 1 m² (o hexagrama regular tem 6 regiões externas iguais de 1 m² cada). Total = 4 m²."
},
{
  "id": "OBFEP-2022-A-08",
  "ano": 2022, "numero": 8, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Na casa de Florentino existe uma biblioteca particular. Um dos livros é uma adaptação da obra \"Diálogos sobre os dois principais sistemas de mundo\", de Galileu Galilei. O livro descreve uma conversa entre três personagens: Simplício, Salviati e Sagredo. Veja um trecho:\n\nSimplício: \"Se a Terra estivesse em movimento, nós sentiríamos o efeito desse movimento. Um desses efeitos seria um constante vento já que ela estaria sempre avançando pelo ar.\"\n\nSalviati: \"Sagredo, sei que você já navegou em grandes transatlânticos. Você acorda dentro de sua cabine e não sente o balanço do navio. Anda pela cabine com tranquilidade. Lava as mãos e toma banho com a água caindo verticalmente. Tudo sugere que o navio está parado. Entretanto, quando abre as cortinas, vê as águas em calmaria total e percebe que o navio está em movimento em velocidade de cruzeiro.\"\n\nSagredo: \"Sim, muitas vezes. Andando pelo interior do navio, onde não temos a referência do mar, é muito comum vivenciar esse tipo de experiência.\"\n\nSalviati: \"Da mesma forma é a Terra. Só porque não sentimos o efeito do seu movimento, não significa que ela está parada. A falta de um vento ininterrupto deve-se ao fato da atmosfera acompanhar a Terra em movimento.\"\n\nSabendo-se que um dos personagens era filósofo geocêntrico, outro heliocêntrico e o terceiro um leigo imparcial, a análise do trecho permite concluir que:",
  "opcoes": {
    "a": "Salviati era geocêntrico, Simplício era o leigo e Sagredo era heliocêntrico.",
    "b": "Salviati era geocêntrico, Simplício era heliocêntrico e Sagredo era o leigo.",
    "c": "Salviati era heliocêntrico, Simplício era geocêntrico e Sagredo era o leigo.",
    "d": "Salviati era heliocêntrico, Simplício era o leigo e Sagredo era geocêntrico."
  },
  "gabarito": "c",
  "resolucao": "Simplício argumenta que a Terra está parada (sem vento = sem movimento) → posição geocêntrica. Salviati usa o argumento do navio para defender que o movimento não é perceptível de dentro → posição heliocêntrica. Sagredo confirma a experiência do navio de forma imparcial, sem argumentar por nenhum sistema → o leigo inteligente. Resposta c)."
},
{
  "id": "OBFEP-2022-A-09",
  "ano": 2022, "numero": 9, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Física Geral", "subarea": "Astronomia",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag05_xref286_396x314.png"], "alternativas": {}},
  "enunciado": "Na casa de Lilian existe um vão cilíndrico do térreo até o teto, onde uma tampa de vidro impede a entrada de chuva. Esse é um recurso para aproveitar a iluminação natural. Lilian sempre ouviu falar que, ao meio-dia, o Sol passava exatamente acima de nossas cabeças (zênite). Entretanto, estando no térreo e dentro do vão, Lilian nunca conseguiu ver o Sol através da tampa de vidro, mesmo em 21 de junho, dia do ano que o Sol demora mais tempo percorrendo o céu visível na região onde Lilian mora.\n\nDentre as quatro cidades abaixo, qual pode ser a que fica a casa de Lilian?",
  "opcoes": {
    "a": "Havana (capital de Cuba)",
    "b": "Natal (RN)",
    "c": "Porto Alegre (RS)",
    "d": "Ottawa (capital do Canadá)"
  },
  "gabarito": "d",
  "resolucao": "Para que o Sol passe pelo vão cilíndrico vertical, ele precisaria estar no zênite (90° de elevação). Isso só ocorre em locais entre os Trópicos (23,5°S a 23,5°N). O fato de 21 de junho ser o dia mais longo indica que Lilian está no hemisfério norte (solstício de verão boreal). Ottawa (~45°N) está bem fora dos trópicos: o Sol nunca atinge o zênite lá. Havana (~23°N) fica próxima ao Trópico de Câncer, onde o sol quase alcança o zênite no solstício de junho. Ottawa é a única cidade onde o Sol definitivamente nunca passa pelo zênite."
},
{
  "id": "OBFEP-2022-A-10",
  "ano": 2022, "numero": 10, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Termometria",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Paulo Henrique comprou um fogão norte-americano a gás cujo forno indicava a temperatura em Fahrenheit. A resistência do termistor interno obedece à relação R = 500 – 6T + 0,02T², com R em ohm e T em grau Celsius.\n\nPaulo Henrique acendeu o forno na indicação \"assar carnes\". O forno aqueceu até a temperatura de assar carnes, a qual faz a resistência do termistor assumir o valor 100 ohms, e então a temperatura se estabilizou.\n\nCom base nas informações e sabendo-se que o gelo derrete a 0 °C ou 32 °F e a água entra em ebulição a 100 °C ou 212 °F, o número que aparece no visor eletrônico é igual a",
  "opcoes": {
    "a": "312",
    "b": "392",
    "c": "362",
    "d": "432"
  },
  "gabarito": "b",
  "resolucao": "Determinando T em °C: R = 500 – 6T + 0,02T² = 100 → 0,02T² – 6T + 400 = 0 → T² – 300T + 20000 = 0. Discriminante: Δ = 90000 – 80000 = 10000 → T = (300 ± 100)/2 → T = 200 °C ou T = 100 °C. Para assar carnes, T = 200 °C. Convertendo para Fahrenheit: F = 32 + (9/5)×200 = 32 + 360 = 392 °F."
},
{
  "id": "OBFEP-2022-A-11",
  "ano": 2022, "numero": 11, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Transmissão de Calor",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag05_xref288_818x384.png"], "alternativas": {}},
  "enunciado": "O fogão da questão anterior tinha um forno cuja tampa era de vidro, o que permitia visualizar seu interior. Existe uma lâmpada dentro do forno que ajuda a visualização. Quando o forno estava funcionando, Paulo Henrique tocou nessa tampa de vidro com a mão direita e sentiu que a parte externa da tampa estava quente, porém suportável. Nesse momento, Paulo Henrique foi surpreendido pela sua esposa que estava oferecendo-lhe água natural em um copo de alumínio. Imediatamente, ele segurou o copo com a mesma mão que estava tocando a tampa do forno.\n\nSobre o que foi relatado nas questões anteriores e nesta, identifique a alternativa FALSA.",
  "opcoes": {
    "a": "O visor e o termistor fazem parte de um circuito que registra a temperatura do forno, logo podemos considerar que esse sistema é um termômetro.",
    "b": "A parte externa da tampa não fica muito quente porque o vidro reflete significativamente a radiação infravermelha, apesar de ser um bom transmissor de radiação visível.",
    "c": "A grandeza termométrica do termômetro usado no fogão é a resistência elétrica.",
    "d": "Se Paulo segurasse o copo com a mão esquerda, ele teria exatamente a mesma sensação térmica que experimentou usando a mão direita nessa situação."
  },
  "gabarito": "d",
  "resolucao": "A alternativa d) é FALSA: a mão direita de Paulo foi aquecida pelo contato com a tampa quente do forno. Ao segurar o copo frio de alumínio com essa mão já aquecida, a sensação de frio seria menor do que se usasse a mão esquerda (que estava na temperatura corporal normal). As sensações térmicas seriam DIFERENTES. As demais são verdadeiras: a) termistor+visor = termômetro ✓; b) vidro é opaco ao infravermelho ✓; c) resistência elétrica é a grandeza termométrica ✓."
},
{
  "id": "OBFEP-2022-A-12",
  "ano": 2022, "numero": 12, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag06_xref297_438x289.png"], "alternativas": {}},
  "enunciado": "Cris resolveu determinar a velocidade média escalar de uma formiga que seguia a trilha de feromônio nas paredes da sala de sua casa. Cris acionou o cronômetro quando a formiga começou a subir uma parede a partir do ponto A. Essa formiga passou pelos pontos B, C, D, E, F, G e H, nessa ordem, conforme a figura abaixo.\n\nSabendo-se que os números apresentados na figura são distâncias entre linhas horizontais ou verticais em centímetro, que o ponto H foi alcançado quando o cronômetro marcava 20 min e considerando π = 3, a velocidade média escalar da formiga investigada do ponto A até o ponto H é igual a",
  "opcoes": {
    "a": "9,0 mm/s",
    "b": "7,0 mm/s",
    "c": "8,0 mm/s",
    "d": "6,0 mm/s"
  },
  "gabarito": "a",
  "resolucao": "A trajetória inclui segmentos retos e um trecho semicircular (identificado na figura). Somando todos os segmentos conforme as distâncias indicadas na figura e usando π = 3 para o arco, obtém-se a distância total percorrida. Dividindo pelo tempo t = 20 min = 1200 s, chega-se à velocidade média de 9,0 mm/s."
},
{
  "id": "OBFEP-2022-A-13",
  "ano": 2022, "numero": 13, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Física Geral", "subarea": "Medidas e Incertezas",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag06_xref299_431x429.png"], "alternativas": {}},
  "enunciado": "Alan queria apresentar para a madeireira o valor mais provável do comprimento de uma peça de madeira a partir de uma série de medidas coerentes. Para isso, ele fez 7 medições com uma trena laser pouco confiável. Os valores registrados foram:\n\n8,46 m — 8,42 m — 4,90 m — 8,36 m — 8,38 m — 8,46 m — 8,32 m\n\nCom base nessas informações, o erro médio dos valores utilizados por Alan para determinar o comprimento da peça de madeira foi de, aproximadamente,",
  "opcoes": {
    "a": "0 cm",
    "b": "5 cm",
    "c": "3 cm",
    "d": "8 cm"
  },
  "gabarito": "b",
  "resolucao": "O valor 4,90 m é claramente discrepante (outlier) e deve ser descartado. Valores coerentes: 8,46 — 8,42 — 8,36 — 8,38 — 8,46 — 8,32 (6 medidas). Média = (8,46+8,42+8,36+8,38+8,46+8,32)/6 = 50,40/6 = 8,40 m. Desvios absolutos: 0,06 — 0,02 — 0,04 — 0,02 — 0,06 — 0,08. Erro médio = (0,06+0,02+0,04+0,02+0,06+0,08)/6 = 0,28/6 ≈ 0,047 m ≈ 5 cm."
},
{
  "id": "OBFEP-2022-A-14",
  "ano": 2022, "numero": 14, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Transmissão de Calor",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "O fluxo de calor é uma grandeza física medida em watts. Um cobertor é feito de um material que reduz o fluxo de calor para que esse se iguale ao ritmo de produção de calor do corpo humano. O fluxo de calor por um cobertor é diretamente proporcional à área, diretamente proporcional à diferença de temperatura e inversamente proporcional à espessura do cobertor.\n\nUm cobertor de algodão com 18 mm de espessura que cobre 0,8 m² deixa passar 80 W de fluxo de calor quando a diferença de temperatura entre o corpo e o ambiente é de 10 °C.\n\nNa casa de Thais há cobertores de algodão com área superficial de 0,6 m² e espessuras diferentes. A depender da temperatura do dia, ela escolhe o cobertor específico que fará a temperatura junto ao corpo ficar em 20 °C. Quando dorme, o corpo de Thais produz calor no ritmo de 120 W.\n\nA espessura do cobertor que ela deve escolher para dormir agradavelmente em um dia cuja temperatura assuma o valor de 5 °C é igual a",
  "opcoes": {
    "a": "20 mm",
    "b": "36 mm",
    "c": "24 mm",
    "d": "18 mm"
  },
  "gabarito": "ANULADA",
  "resolucao": "Questão anulada pelos organizadores da OBFEP 2022 (\"Não contar a questão\")."
},
{
  "id": "OBFEP-2022-A-15",
  "ano": 2022, "numero": 15, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag06_xref299_431x429.png"], "alternativas": {}},
  "enunciado": "Lídia mandou construir no chão do quintal um tabuleiro de xadrez cujas casas eram quadradas de 50 cm de lado, identificadas por uma letra e um número, com um plano cartesiano sobreposto, conforme a figura.\n\nCerto dia, Lídia viu uma barata no tabuleiro e acionou o seu cronômetro em t₀ = 0 s. De t₀ até t₁ = 10 s, as coordenadas X e Y em centímetros relacionam-se com o tempo t por: X = 140 + 12t e Y = 320 – 15t. Em t₁ = 10 s, a barata estava no ponto P₁(X₁, Y₁). De t₁ até t₂ = 20 s, as coordenadas passaram a obedecer: X = X₁ – 8(t – 10) e Y = Y₁ + 5(t – 10).\n\nEm t₂, a casa do tabuleiro onde a barata se encontrava é a",
  "opcoes": {
    "a": "e5",
    "b": "e6",
    "c": "d5",
    "d": "d6"
  },
  "gabarito": "c",
  "resolucao": "Em t₁=10 s: X₁ = 140+12×10 = 260 cm; Y₁ = 320–15×10 = 170 cm.\nEm t₂=20 s: X₂ = 260–8×10 = 180 cm; Y₂ = 170+5×10 = 220 cm.\nPela figura, origem do plano cartesiano e escala das casas de 50 cm, a posição (180, 220) corresponde à coluna d (X entre 150 e 200 cm) e linha 5 (Y entre 200 e 250 cm) → casa d5."
},
]

data['banco_questoes'].extend(questoes)

with open('banco-questoes/fisica_ufrgs.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Total: {len(data['banco_questoes'])} questoes")
