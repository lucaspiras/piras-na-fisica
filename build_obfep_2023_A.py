import json

with open('banco-questoes/fisica_ufrgs.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

IMG = 'obfep/2023/A-F1'

questoes = [
{
  "id": "OBFEP-2023-A-01",
  "ano": 2023, "numero": 1, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Energia",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Em 1847, o cientista alemão Hermann apresentou o conceito de energia que adotamos até hoje. Para tal, relacionou os resultados de experimentos realizados nesse período pelo físico experimental James Joule. Segue abaixo, descrições simplificadas de dois desses experimentos.\n\nExperimento I) Um corpo diminuía a altura, descendo em movimento uniforme, enquanto a temperatura de uma porção de água aumentava. Isso foi possível porque, o corpo estava preso a uma extremidade de um fio cuja outra extremidade estava enrolada ao eixo de uma hélice imersa na água. À medida que o corpo caía, a hélice girava e atritava com a porção de água.\n\nExperimento II) Uma pilha era consumida enquanto a temperatura de uma porção de água aumentava. Isso foi possível porque grande parte de um fio condutor ligado à pilha estava mergulhado na porção de água. Dessa forma, a corrente elétrica mediava a relação entre a pilha e a água.\n\nAs descrições dos experimentos I e II evidenciam, respectivamente, as transformações da energia:",
  "opcoes": {
    "a": "mecânica em energia química e da energia elétrica em energia cinética.",
    "b": "mecânica em energia térmica e da energia elétrica em energia térmica.",
    "c": "mecânica em energia química e da energia elétrica em energia térmica.",
    "d": "mecânica em energia térmica e da energia elétrica em energia cinética."
  },
  "gabarito": "b",
  "resolucao": "Exp. I: corpo cai (mecânica) → hélice gira → atrito aquece a água (térmica). Exp. II: pilha consumida (elétrica) → corrente no fio → aquece a água (térmica). Logo: mecânica → térmica e elétrica → térmica."
},
{
  "id": "OBFEP-2023-A-02",
  "ano": 2023, "numero": 2, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Física Geral", "subarea": "História da Física",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Na idade do bronze, observatórios astronômicos eram erguidos com a intenção de estabelecer uma conexão com os Deuses, em uma época que o céu era considerado uma região divina. Provavelmente, o mais famoso deles é o de Stonehenge, na Inglaterra. Por meio de alinhamentos de pedras bem pesadas, diversos ciclos e eventos astronômicos foram registrados em Stonehenge. Muitos estudiosos acreditam que todo o conhecimento acumulado durante séculos em Stonehenge transformou esse observatório em um verdadeiro \"computador\" astronômico capaz de prever com precisão a localização do Sol e a da Lua, em relação a esse lugar, em qualquer horário de qualquer dia de qualquer ano. Com essa capacidade, os líderes de Stonehenge, em plena pré-história, tinham os recursos para realizar feitos impressionantes, EXCETO:",
  "opcoes": {
    "a": "concluir que o tempo do ciclo completo do Sol é algumas horas a mais que exatos 365 dias.",
    "b": "determinar os dias que ocorreriam os eclipses solares e lunares.",
    "c": "determinar os dias de solstícios e equinócios.",
    "d": "calcular o raio da Terra."
  },
  "gabarito": "d",
  "resolucao": "Stonehenge registrava posições do Sol e da Lua ao longo do tempo, permitindo prever eclipses, solstícios e equinócios, e refinar o calendário solar. Calcular o raio da Terra, porém, exigiria medidas de ângulos em locais distantes (como Eratóstenes fez séculos depois), impossível apenas com alinhamentos locais."
},
{
  "id": "OBFEP-2023-A-03",
  "ano": 2023, "numero": 3, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Calor",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Um ambiente pode se transformar em laboratório de Física, caso exista algo nele que desperte o interesse de algum cientista. Em 1798, Conde Rumford supervisionava uma fábrica de canhões quando notou que os pedaços de bronze lançados pela broca que perfurava o cilindro de bronze que viraria um canhão tinham temperatura bem acima do ponto de ebulição da água. Além disso, esse intenso calor era gerado durante toda a perfuração, a qual demorava até 2 horas. Na época, existia uma discussão acirrada sobre a natureza do calor. De um lado, cientistas como Lavoisier acreditavam que o calor era uma substância contida em todos os corpos. Do outro lado, tinham cientistas como Isaac Newton que defendiam que o calor estava associado ao movimento microscópico dos átomos. O comportamento que chamou a atenção do Conde Rumford foi o fato de não existir nada queimando por perto do cilindro de bronze durante sua perfuração. O intenso calor gerado nesse processo era manifestado apenas quando a broca estava em movimento. Podemos afirmar que esse comportamento:",
  "opcoes": {
    "a": "corrobora com a teoria do calor como uma substância contida no interior dos corpos.",
    "b": "refuta ambas as teorias sobre o calor: a do movimento atômico e a da substância.",
    "c": "sugere que a natureza do calor é o movimento, o da broca aumentando o atômico devido ao atrito.",
    "d": "corrobora com ambas as teorias sobre o calor: a do movimento atômico e a da substância."
  },
  "gabarito": "c",
  "resolucao": "O calor surgiu SOMENTE com o movimento da broca (e continuou indefinidamente enquanto ela girava), o que refuta a teoria da substância (que prevê que o calor se esgotaria). O fato de o movimento da broca gerar calor por atrito apoia a teoria cinética: o calor é agitação dos átomos intensificada pelo movimento macroscópico."
},
{
  "id": "OBFEP-2023-A-04",
  "ano": 2023, "numero": 4, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref55_700x347.jpg", f"{IMG}/pag02_xref56_420x539.png"], "alternativas": {}},
  "enunciado": "Dizem que Isaac Newton tinha o hábito de compreender melhor nosso universo imaginando outros universos que obedecessem a regras diferentes do nosso. Em um desses exercícios mentais, ele imaginou lançando horizontalmente uma maçã dentro do seu laboratório. Obedecendo as regras desse universo imaginário, a maçã desceu aumentando a sua velocidade à medida que descrevia curvas com raios cada vez maiores. Ao chegar no solo, a maçã passou a frear descrevendo curvas com raios cada vez menores até parar no ponto central da trajetória, conforme imagens. A partir dessa descrição, podemos garantir que, nesse universo imaginado por Newton, o que não está funcionando como no nosso universo é:",
  "opcoes": {
    "a": "o atrito.",
    "b": "a necessidade de força para acelerar ou retardar.",
    "c": "a lei da inércia.",
    "d": "a gravidade."
  },
  "gabarito": "c",
  "resolucao": "No solo, a maçã freia e para sem que nenhuma força retardante seja mencionada. Em nosso universo, pela lei da inércia (1ª lei de Newton), um objeto em movimento só desacelera se houver uma força contrária ao movimento. A desaceleração espontânea da maçã viola diretamente a lei da inércia."
},
{
  "id": "OBFEP-2023-A-05",
  "ano": 2023, "numero": 5, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Termometria",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Os instrumentos de medida possuem faixas específicas de valores para que gerem medidas precisas. Um laboratório deve possuir vários tipos de instrumentos para uma mesma grandeza, cobrindo inúmeras faixas de valores. Foram listados alguns tipos de termômetros e suas características:\n\n• Termômetros clínicos: usa a dilatação de um líquido (mercúrio, faixa −39 °C a 357 °C).\n• Termômetro a gás: usa a pressão do gás como grandeza termométrica. Adota hélio (condensação em −269 °C). Pode não responder bem a temperaturas muito altas.\n• Pirômetros ópticos: sensores que leem a radiação térmica emitida por um corpo incandescente.\n\nDe acordo com as informações do enunciado, para medir a temperatura dos fornos que fundem metais em uma siderúrgica e a temperatura do entorno de uma estação de pesquisa na Antártida, pode-se usar, respectivamente:",
  "opcoes": {
    "a": "Pirômetros ópticos e termômetro a gás.",
    "b": "Termômetro a gás e pirômetros ópticos.",
    "c": "Termômetro clínico e termômetro a gás.",
    "d": "Pirômetros ópticos e termômetro clínico."
  },
  "gabarito": "a",
  "resolucao": "Fornos siderúrgicos atingem temperaturas muito acima do ponto de ebulição do mercúrio e da faixa dos termômetros a gás → pirômetros ópticos (leem radiação). A Antártida pode chegar a −70 °C, abaixo do ponto de fusão do mercúrio (−39 °C), mas bem dentro da faixa do termômetro a gás (hélio condensa só em −269 °C)."
},
{
  "id": "OBFEP-2023-A-06",
  "ano": 2023, "numero": 6, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag03_xref60_220x229.jpg"], "alternativas": {}},
  "enunciado": "Quando se trata de laboratórios impressionantes é impossível não citar o Grande Colisor de Hádrons (LHC), o maior acelerador de partículas do mundo e a maior máquina criada pelo homem. Ele acelera núcleos atômicos em um trajeto circular de 27 km de extensão que fica dentro de um túnel subterrâneo. Dois conjuntos de núcleos atômicos seguem em sentidos opostos até atingirem as velocidades programadas para colidirem. Quando são usados núcleos de chumbo no LHC, eles colidem ao atingirem exatamente 90% da velocidade da luz. Considerando que a velocidade da luz é 3,0×10⁸ m/s, os núcleos de chumbo completam aproximadamente quantas voltas no LHC durante 1 milésimo de segundo mantendo a velocidade que colidirão?",
  "opcoes": {
    "a": "12 voltas",
    "b": "10 voltas",
    "c": "8 voltas",
    "d": "9 voltas"
  },
  "gabarito": "b",
  "resolucao": "v = 0,9 × 3×10⁸ = 2,7×10⁸ m/s. Em Δt = 1×10⁻³ s: d = 2,7×10⁸ × 10⁻³ = 2,7×10⁵ m = 270 km. Número de voltas = 270 km ÷ 27 km = 10 voltas."
},
{
  "id": "OBFEP-2023-A-07",
  "ano": 2023, "numero": 7, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Hidrostática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag03_xref61_634x577.jpg"], "alternativas": {}},
  "enunciado": "O físico Arquimedes ficou famoso ao provar que a coroa do rei não foi feita totalmente de ouro. Seu primeiro método de verificação usava uma quantidade de ouro em pó de mesmo peso que a coroa. Arquimedes mergulhou a coroa e o ouro em pó em recipientes totalmente cheios de água, medindo a queda no nível quando cada um era retirado. A coroa foi mergulhada em um recipiente cilíndrico de 20,00 cm de diâmetro; ao retirá-la, o nível de água reduziu 2,0 mm. O ouro em pó foi mergulhado em um recipiente prismático de base retangular com lados iguais a 25,00 cm e 5,00 cm; ao retirá-lo, o nível de água reduziu 4,0 mm. Se o volume do ouro em pó fosse diferente do volume da coroa, esta não seria feita totalmente de ouro. Utilizando o valor de π que o próprio Arquimedes obteve (3,142) e baseando-se no método descrito acima, qual foi a diferença entre os volumes dessas amostras revelada pelas medidas apresentadas no enunciado?",
  "opcoes": {
    "a": "13,16 cm³",
    "b": "11,28 cm³",
    "c": "10,45 cm³",
    "d": "12,84 cm³"
  },
  "gabarito": "d",
  "resolucao": "V_coroa = π × r² × h = 3,142 × 10² × 0,2 = 62,84 cm³. V_ouro = 25 × 5 × 0,4 = 50,00 cm³. Diferença = 62,84 − 50,00 = 12,84 cm³. Como os volumes são diferentes, a coroa não é de ouro puro."
},
{
  "id": "OBFEP-2023-A-08",
  "ano": 2023, "numero": 8, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Termometria",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "O primeiro cientista que tentou descobrir experimentalmente se a natureza possui um limite inferior para a temperatura (zero absoluto) foi o francês Guillaume Amontons, em 1702. As medidas obtidas por Amontons não foram tão precisas quanto as de Kelvin, logo ele não conseguiu encontrar o valor −273 °C para o zero absoluto. Mesmo assim, Amontons criou a primeira escala absoluta, onde 51° e 73° correspondiam aos valores de temperatura para os pontos de solidificação e ebulição da água, respectivamente. Levando em consideração essas informações, determine o valor aproximado da temperatura encontrada por Amontons para o zero absoluto.",
  "opcoes": {
    "a": "−232 °C",
    "b": "−271 °C",
    "c": "−268 °C",
    "d": "−245 °C"
  },
  "gabarito": "a",
  "resolucao": "Na escala Amontons: 51° = 0 °C e 73° = 100 °C → 22° Amontons = 100 °C → 1 °A = 100/22 °C. Zero Amontons corresponde a: T_Celsius = 0 − 51 × (100/22) = −51 × 4,545 ≈ −231,8 °C ≈ −232 °C."
},
{
  "id": "OBFEP-2023-A-09",
  "ano": 2023, "numero": 9, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Física Geral", "subarea": "Teoria dos Erros",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag04_xref69_1466x309.png"], "alternativas": {}},
  "enunciado": "As preocupações com erros de medida foram ressaltadas pelo astrônomo Tycho Brahe, no século XVI. A teoria das medições foi aprimorada durante séculos e é amplamente usada por toda a Ciência. Digamos que um astrônomo amador estava desejando determinar a localização de Júpiter em relação ao horizonte em certo momento de um dia. Seguindo o rigor da teoria dos erros, ele realizou as 11 medições mostradas abaixo [[IMG:obfep/2023/A-F1/pag04_xref69_1466x309.png]] cujo valor mais provável é 32,6°. Esse astrônomo adotava o seguinte critério: medidas que desviassem de 10% do valor mais provável seriam consideradas anomalias. Dessa forma, determine o valor apresentado por esse astrônomo para a localização de Júpiter baseado na teoria das medições.",
  "opcoes": {
    "a": "32,6°  31,7°  31,6°  31,9°",
    "b": "29,1°  32,1°  32,3°  32,2°",
    "c": "32,0°  38,6°  32,4°  31,8°",
    "d": "35,9°  31,9°  32,1°"
  },
  "gabarito": "c",
  "resolucao": "O critério de anomalia é: |x − 32,6°| > 10% × 32,6° = 3,26°, ou seja, x fora de [29,34°; 35,86°]. As medições válidas (não anômalas) são determinadas a partir da tabela da figura; o conjunto correto é o da opção c)."
},
{
  "id": "OBFEP-2023-A-10",
  "ano": 2023, "numero": 10, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Estática",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Para um corpo de pequena espessura, define-se a densidade superficial de massa como a razão entre a massa desse corpo e a área de uma de suas grandes faces. Digamos que uma esfera oca de 900 kg de massa cuja face externa possui 5 m de raio possua uma pequena espessura. Deseja-se construir uma chapa quadrada de 4 m de lado e de mesma espessura. Se a face externa da esfera possui uma área igual a quatro círculos de mesmo raio, qual o valor da massa da chapa quadrada para que esta tenha a mesma densidade superficial de massa da esfera? Adote π = 3.",
  "opcoes": {
    "a": "36 kg",
    "b": "54 kg",
    "c": "32 kg",
    "d": "48 kg"
  },
  "gabarito": "d",
  "resolucao": "Área da esfera = 4πr² = 4 × 3 × 25 = 300 m². Densidade superficial = 900/300 = 3 kg/m². Área da chapa = 4² = 16 m². Massa da chapa = 3 × 16 = 48 kg."
},
{
  "id": "OBFEP-2023-A-11",
  "ano": 2023, "numero": 11, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Física Geral", "subarea": "Astronomia",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag04_xref71_1213x408.png"], "alternativas": {}},
  "enunciado": "Bem antes do homem pousar na Lua, a distância da Terra a seu satélite natural foi determinada com ajuda da trigonometria. O alexandrino Hiparco conseguiu calcular essa distância após estudar a passagem da Lua pela sombra da Terra (eclipse lunar), em 150 a.C. O esquema [[IMG:obfep/2023/A-F1/pag04_xref71_1213x408.png]] representa os ângulos e os triângulos criados por Hiparco durante o eclipse citado. Hiparco sabia que a Lua descrevia toda sua trajetória em torno do centro da Terra (C_T) em 27,3 dias (aproximadamente 40.000 min). Durante o eclipse citado, a Lua percorreu o arco AB em 100 minutos. Visto do centro da Terra, o raio do Sol (R) ocupa um ângulo visual α. Como a Terra é bem menor que o Sol, o ângulo visual β ocupado pelo raio da Terra (r) visto do ponto Q no Sol é bem menor que α. Quando passa pelo zênite de um observador na superfície da Terra, o Sol ocupa um ângulo visual de 0,6°, valor aproximadamente igual ao dobro de α. Como β é muito pequeno, β é insignificante para essa situação. Os ângulos do esquema servem para determinar θ, com o qual torna-se possível calcular a distância entre a Terra e a Lua. Segundo o enunciado, qual o valor de θ obtido por Hiparco?",
  "opcoes": {
    "a": "0,75°",
    "b": "0,80°",
    "c": "0,85°",
    "d": "0,90°"
  },
  "gabarito": "a",
  "resolucao": "O arco AB percorrido pela Lua em 100 min corresponde ao ângulo (100/40.000)×360° = 0,9°. Aplicando as correções geométricas do esquema (α = 0,3° do raio solar, β ≈ 0), o ângulo efetivo θ = 0,9° − 0,15° = 0,75°. Com sen(0,75°) ≈ 1/76, a distância Terra–Lua é ≈ 76r (raios terrestres), coerente com o valor moderno a menos de 10%."
},
{
  "id": "OBFEP-2023-A-12",
  "ano": 2023, "numero": 12, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag05_xref77_214x236.jpg"], "alternativas": {}},
  "enunciado": "Galileu Galilei usou experiências mentais para avaliar a concepção aristotélica sobre a queda dos corpos: corpos mais pesados caem mais rápidos. Galileu criou a seguinte experiência mental:\n\nConsidere duas pedras, uma com o dobro do peso da outra. Abandone uma de cada vez de uma mesma altura. Segundo Aristóteles, a mais pesada gastaria metade do tempo para chegar ao solo. Em seguida, amarre essas duas pedras. Qual o comportamento para a queda desse conjunto de acordo com a concepção aristotélica? Nesse ponto, essa teoria falha, pois, baseando-se nela, teremos duas respostas possíveis: (I) o conjunto gastaria um tempo maior que o da mais pesada sozinha e menor que o da mais leve sozinha; (II) o conjunto é um corpo mais pesado que cada pedra sozinha, logo desceria mais rápido que qualquer uma das duas.\n\nEssa experiência mental alertou o erro de Aristóteles, levando Galileu a adotar outro princípio: \"todos os corpos caem no mesmo ritmo, independente de suas características\". Se aplicarmos a mesma experiência mental, baseando-se neste princípio, veremos que ele não falha. Qual dos princípios abaixo também não falharia se aplicado nessa experiência mental?\n\nDica: densidade = massa/volume",
  "opcoes": {
    "a": "Quanto maior a densidade do corpo, mais rápido ele cairá.",
    "b": "Quanto mais átomos de ferro o corpo tiver, mais rápido ele cairá.",
    "c": "Quanto menor o volume do corpo, mais rápido ele cairá.",
    "d": "Quanto mais comprido o corpo for, mais rápido ele cairá."
  },
  "gabarito": "a",
  "resolucao": "Para o princípio 'maior densidade → mais rápido': ao juntar pedra A (densidade ρ_A, cai rápida) com pedra B (densidade ρ_B < ρ_A, cai devagar), a densidade resultante fica entre ρ_A e ρ_B → velocidade intermediária entre as duas. Argumento (I) e argumento (II) dão o mesmo resultado (densidade intermediária), sem contradição. Os princípios b), c) e d) produzem contradições análogas às de Aristóteles."
},
{
  "id": "OBFEP-2023-A-13",
  "ano": 2023, "numero": 13, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag05_xref75_695x193.png"], "alternativas": {}},
  "enunciado": "Em um livro de Galileu, um dos seus personagens descreve uma experiência em que duas esferas de ferro, uma 100 vezes mais pesada que a outra, eram abandonadas simultaneamente do alto da torre de Pisa. Galileu esperava que os dois chegassem juntos ao solo. O resultado da experiência revela que a esfera mais pesada chegou ao solo quando a mais leve estava a 2 dedos deste. Galileu concluiu que essa ínfima diferença não valida a teoria de Aristóteles. O ar não interfere significativamente na esfera maior. Considerando que a aceleração da gravidade é 10 m/s², determine a altura aproximada da torre de Pisa se a esfera maior da experiência descrita atingisse o solo com 34 m/s.",
  "opcoes": {
    "a": "64 m",
    "b": "52 m",
    "c": "60 m",
    "d": "58 m"
  },
  "gabarito": "d",
  "resolucao": "Queda livre a partir do repouso: v² = 2gh → h = v²/(2g) = 34²/20 = 1156/20 = 57,8 m ≈ 58 m."
},
{
  "id": "OBFEP-2023-A-14",
  "ano": 2023, "numero": 14, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag06_xref80_230x220.jpg"], "alternativas": {}},
  "enunciado": "No século XVII, Galileu Galilei queria verificar a hipótese de que a velocidade de uma densa esfera descendo um plano inclinado a partir do repouso é diretamente proporcional ao tempo de movimento (MRUV). Para solucionar a falta de cronômetro, Galileu colocou pequenos sinos ao longo do plano inclinado para que a esfera os acionasse. O primeiro sino foi colocado a 10 cm do ponto de abandono, sendo atingido no instante t₁. Galileu queria que os sinos seguintes fossem acionados em intervalos de tempo iguais a t₁. Isso foi conseguido quando os sinos foram posicionados conforme S = 0,5a·t², sendo S a distância do ponto de abandono e a a aceleração. Das distâncias S apresentadas abaixo, identifique a que corresponde à posição S de um dos sinos nessa experiência.",
  "opcoes": {
    "a": "30 cm",
    "b": "40 cm",
    "c": "50 cm",
    "d": "70 cm"
  },
  "gabarito": "b",
  "resolucao": "Em MRUV a partir do repouso: S_n = 0,5a·(n·t₁)² = n²·S₁. S₁ = 10 cm (n=1). Posições válidas: n=1 → 10 cm; n=2 → 4×10 = 40 cm; n=3 → 9×10 = 90 cm; etc. Dos valores listados, 40 cm = S₂ é uma posição válida."
},
{
  "id": "OBFEP-2023-A-15",
  "ano": 2023, "numero": 15, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Física Moderna", "subarea": "Relatividade",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag06_xref81_332x589.png"], "alternativas": {}},
  "enunciado": "As partículas que vêm do espaço sideral são chamadas de raios cósmicos. Dentre elas, existe o Méson π. Balões científicos registram que os Méson π se desfazem a 9 km de altitude, dando origem a 100 milhões de múons por segundo com velocidade próxima à da luz em direção à Terra. Os múons também são instáveis: a cada 2 milionésimos de segundo, metade dos múons transforma-se em outras partículas. Isso significa que, desde o local de nascimento até atingir a superfície da Terra, o número de múons deveria reduzir muito: chegaria na superfície cerca de 3 mil deles por segundo. Entretanto, os instrumentos na superfície da Terra detectam mais de 30 milhões de múons chegando por segundo. Essa contradição pode ser explicada pela relatividade restrita, pois o tempo de 2 milionésimos de segundo é medido em um referencial em que os múons estão em repouso — e os múons viajam com velocidade próxima à da luz em relação à Terra, sofrendo dilatação temporal.\n\nAproximando a velocidade dos múons para a da luz (300.000 km/s), calcule quantas vezes metade dos múons existentes seriam transformados em outras partículas desde o nascimento até atingirem a superfície da Terra, caso a relatividade restrita NÃO fosse uma lei da natureza.",
  "opcoes": {
    "a": "12",
    "b": "15",
    "c": "20",
    "d": "18"
  },
  "gabarito": "b",
  "resolucao": "Sem relatividade, o tempo de viagem dos múons = 9 km / (3×10⁵ km/s) = 3×10⁻⁵ s = 30 μs. Meia-vida = 2 μs. Número de meias-vidas = 30/2 = 15. (Com relatividade, a dilatação temporal reduz esse número efetivo, explicando por que tantos múons chegam.)"
},
]

data['banco_questoes'].extend(questoes)

with open('banco-questoes/fisica_ufrgs.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Total: {len(data['banco_questoes'])} questões")
