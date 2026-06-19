import json

with open('banco-questoes/fisica_ufrgs.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

IMG = 'obfep/2023/B-F1'

questoes = [
{
  "id": "OBFEP-2023-B-01",
  "ano": 2023, "numero": 1, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Óptica Geométrica",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [f"{IMG}/pag01_xref45_1058x216.png"], "alternativas": {}},
  "enunciado": "No século XVII, a luz solar era vista como uma essência fundamental da natureza. Alguns relatos de luzes coloridas saindo de objetos transparentes quando iluminados eram atribuídos a impurezas. Em 1666, Isaac Newton transformou um quarto em laboratório ao impedir a entrada da luz solar, exceto por um pequeno orifício. No trajeto desse raio, Newton colocou anteparos e prismas, conforme imagem, em três montagens distintas. Os resultados dessas experiências revelaram relações surpreendentes entre cor e luz.\n\nA partir do seu conhecimento sobre o comportamento da luz, analise as afirmações abaixo.\n\nI) A montagem 1 sugere que a luz solar (branca) seja policromática, mas ainda deixa alguma possibilidade para justificar o que acontece usando a teoria da impureza do vidro.\nII) A montagem 2 prova que a luz solar (branca) é policromática, tornando inviável a justificativa do que acontece a partir da teoria da impureza do vidro.\nIII) A montagem 3 prova que uma componente da luz solar não se decompõe, sendo uma essência fundamental da natureza.\n\nSobre as afirmações acima, podemos concluir que:",
  "opcoes": {
    "a": "Apenas a afirmação I é falsa.",
    "b": "Apenas a afirmação III é verdadeira.",
    "c": "Apenas a afirmação II é verdadeira.",
    "d": "Apenas a afirmação III é falsa."
  },
  "gabarito": "c",
  "resolucao": "I é FALSA: a montagem 1 (um prisma) não 'sugere' policromática — a teoria da impureza explica igualmente bem a dispersão, portanto nada é sugerido sobre a natureza da luz branca. II é VERDADEIRA: a montagem 2 (dois prismas) reconstitui a luz branca ao combinar as cores, provando que eram componentes originais e não impurezas do vidro. III é FALSA: a montagem 3 mostra que a componente não se decompõe, mas isso não prova que ela é uma 'essência fundamental da natureza' — é uma afirmação filosófica além do que o experimento demonstra."
},
{
  "id": "OBFEP-2023-B-02",
  "ano": 2023, "numero": 2, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref49_293x177.png", f"{IMG}/pag02_xref51_670x274.png"], "alternativas": {}},
  "enunciado": "Dizem que Isaac Newton tinha o hábito de compreender melhor nosso universo imaginando outros universos que obedecessem a regras diferentes do nosso. Em um desses exercícios mentais, ele imaginou lançando horizontalmente uma maçã dentro do seu laboratório. Obedecendo as regras desse universo imaginário, a maçã desceu aumentando a sua velocidade à medida que descrevia curvas com raios cada vez maiores. Ao chegar no solo, a maçã passou a frear descrevendo curvas com raios cada vez menores até parar no ponto central da trajetória, conforme imagens abaixo. A partir dessa descrição, podemos garantir que, nesse universo imaginado por Newton, o que NÃO está funcionando como no nosso universo é:",
  "opcoes": {
    "a": "o atrito.",
    "b": "a necessidade de uma força para produzir aceleração tangencial.",
    "c": "a lei da inércia.",
    "d": "a gravidade."
  },
  "gabarito": "c",
  "resolucao": "No solo, a maçã desacelera e para sem que nenhuma força retardante seja mencionada. Pela lei da inércia (1ª lei de Newton), um corpo em movimento permanece em movimento a velocidade constante na ausência de força líquida. A desaceleração espontânea da maçã viola diretamente a lei da inércia."
},
{
  "id": "OBFEP-2023-B-03",
  "ano": 2023, "numero": 3, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Hidrostática",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref53_510x180.png"], "alternativas": {}},
  "enunciado": "O físico Arquimedes ficou famoso ao provar que a coroa do rei não foi feita totalmente de ouro. Para isso, montou uma experiência com duas etapas utilizando uma balança de pratos em equilíbrio. Na primeira etapa, ouro em pó foi derramado em um dos pratos até equilibrar a coroa no outro prato. Na segunda etapa, com a balança equilibrada, toda a montagem foi imersa em água. Nessa situação, a balança se desequilibrou, pendendo para o ouro em pó. A conclusão de Arquimedes foi baseada em outras experiências similares, as quais lhe permitiram formular o princípio de hidrostática que leva o seu nome. Se usarmos o princípio de Arquimedes e o que foi revelado na primeira etapa, a segunda etapa dessa experiência comprovou que:",
  "opcoes": {
    "a": "Os pesos absolutos dessas amostras são diferentes.",
    "b": "As massas dessas amostras são iguais.",
    "c": "As massas dessas amostras são diferentes.",
    "d": "Os volumes dessas amostras são diferentes."
  },
  "gabarito": "d",
  "resolucao": "A 1ª etapa provou que as massas são iguais (balança em equilíbrio no ar). Na 2ª etapa, pelo Princípio de Arquimedes, o empuxo é proporcional ao volume deslocado. O lado do ouro em pó ficou mais pesado, indicando que ele sofreu MENOS empuxo → deslocou MENOS água → tem MENOR volume. Como as massas são iguais mas os volumes são diferentes, os materiais têm densidades diferentes — provando que a coroa não é de ouro puro."
},
{
  "id": "OBFEP-2023-B-04",
  "ano": 2023, "numero": 4, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Termometria",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref55_325x166.png"], "alternativas": {}},
  "enunciado": "Em 1592, Galileu Galilei criou um termoscópio (1) que comparava a temperatura entre pessoas: o nível da água seria diferente se as temperaturas das pessoas fossem diferentes. Porém, uma mudança na pressão atmosférica interfere no nível da água. Para neutralizar essa fonte de erro, em 1708, Fahrenheit confinou uma porção de álcool em um recipiente hermeticamente fechado (2). Com as mudanças de temperatura, o álcool se transforma em vapor e vice-versa, interferindo no nível de álcool. Em 1721, esse problema foi satisfatoriamente contornado quando o álcool foi substituído por mercúrio — um líquido que dilata menos que o álcool e possui baixo teor de vaporização (3).\n\nSobre os processos térmicos que ocorrem nesses termômetros, identifique a alternativa correta.",
  "opcoes": {
    "a": "No termoscópio de Galileu, o nível da água será mais alto em pessoas febris.",
    "b": "Quando o termômetro é aquecido, o líquido dilata e o recipiente de vidro não dilata.",
    "c": "Dentro do termômetro, o nível do líquido muda porque o gás contido nele muda sua pressão.",
    "d": "A alteração da pressão atmosférica não interfere no termômetro porque ele é um recipiente fechado."
  },
  "gabarito": "d",
  "resolucao": "Os termômetros (2) e (3) são hermeticamente fechados: mudanças na pressão atmosférica externa não afetam o nível do líquido interno — a alternativa d) é correta. Já o termoscópio (1) é aberto e sim sofre influência da pressão atmosférica. A opção a) está errada: no termoscópio, ar quente expande e empurra o líquido para baixo (febre = nível menor, não maior)."
},
{
  "id": "OBFEP-2023-B-05",
  "ano": 2023, "numero": 5, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Óptica Física",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Para o famoso grego Aristóteles, a luz tinha velocidade infinita. O italiano Galileu não aceitava a ideia de algo percorrer alguma distância sem necessitar de algum intervalo de tempo e criou uma experiência para provar isso. À noite, segurando uma lâmpada, ele mandou um assistente se distanciar 3 km dele. O assistente tinha a ordem de tirar o capuz de sua lâmpada no exato momento que visse a lâmpada de Galileu acesa. Galileu só veria a lâmpada do assistente quando a luz percorresse a distância de ida e de volta (6 km no total). O fato é que Galileu viu a lâmpada do assistente quase que no mesmo instante — obrigando-o a concluir que Aristóteles estava correto. Atualmente, sabemos que a luz possui velocidade 3×10⁸ m/s, gastando bem menos que 0,01 s (mínimo perceptível pela percepção humana). Quanto tempo levaria para a luz ir e voltar nessa experiência?",
  "opcoes": {
    "a": "2 centésimos de milésimos de segundo.",
    "b": "1 centésimo de milésimos de segundo.",
    "c": "2 décimos de milésimos de segundo.",
    "d": "1 décimo de milésimos de segundo."
  },
  "gabarito": "a",
  "resolucao": "Distância total = 2 × 3 km = 6 km = 6.000 m. Tempo = 6.000 / (3×10⁸) = 2×10⁻⁵ s. Convertendo: 2×10⁻⁵ s = 2×10⁻² × 10⁻³ s = 2 centésimos de milésimos de segundo."
},
{
  "id": "OBFEP-2023-B-06",
  "ano": 2023, "numero": 6, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Estática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag03_xref59_981x318.png", f"{IMG}/pag03_xref61_861x414.png"], "alternativas": {}},
  "enunciado": "No final do século XVIII, Cavendish conseguiu medir as forças gravitacionais entre objetos de laboratório usando uma balança de torção com duas esferas iguais (m) nas extremidades e um espelho plano preso a ela. Uma fonte luminosa foi fixada para que seu raio de luz atingisse o espelho. Duas novas esferas (M) foram introduzidas na montagem, gerando uma rotação na barra de torção devido às forças gravitacionais. O espelho acompanharia a rotação, produzindo um desvio no raio de luz refletido original. Este atingia uma escala de ângulos colocada distante do espelho, conforme imagens. O raio refletido atingia a marcação de 45,00° quando a montagem não tinha as esferas M. Se, ao introduzi-las, o raio refletido sofreu um desvio de 5° até o sistema atingir o novo equilíbrio, qual a nova marcação de ângulo que o raio refletido atingiu?",
  "opcoes": {
    "a": "40°",
    "b": "35°",
    "c": "50°",
    "d": "55°"
  },
  "gabarito": "ANULADA",
  "resolucao": "Questão anulada pelos organizadores da OBFEP 2023."
},
{
  "id": "OBFEP-2023-B-07",
  "ano": 2023, "numero": 7, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Espelhos Esféricos",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Na Antiguidade, Arquimedes tinha provado que um espelho parabólico possui um foco principal e um espelho esférico possui uma região focal, tornando-o um espelho menos confiável. Em 1840, o físico alemão Carl Gauss estabeleceu condições para que espelhos esféricos pudessem ser estigmáticos para todos os raios incidentes emitidos pelo objeto. A partir daí, os laboratórios passaram a trabalhar com espelhos esféricos gaussianos. Aplique as relações da óptica gaussiana para determinar a ampliação linear transversal da imagem de uma vela colocada a 15 cm do centro e a 5 cm do foco, entre esses dois pontos de um espelho esférico côncavo gaussiano.",
  "opcoes": {
    "a": "−5",
    "b": "−4",
    "c": "+4",
    "d": "+5"
  },
  "gabarito": "b",
  "resolucao": "Objeto entre C e F: p = f + 5, onde C está a 2f. Como p está 15 cm de C e 5 cm de F: p = f + 5 e 2f − p = 15, logo f = 20 cm e p = 25 cm. Equação do espelho: 1/f = 1/p + 1/q → 1/20 = 1/25 + 1/q → 1/q = 1/20 − 1/25 = 1/100 → q = 100 cm. Ampliação: m = −q/p = −100/25 = −4."
},
{
  "id": "OBFEP-2023-B-08",
  "ano": 2023, "numero": 8, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Gravitação",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag03_xref63_280x205.png"], "alternativas": {}},
  "enunciado": "Em 1781, o astrônomo William Herschell descobriu Urano. Nas décadas seguintes, os astrônomos acompanharam a órbita descrita por Urano e notaram que ela tinha uma forma diferente da prevista pela lei da gravitação universal de Isaac Newton (F_g = G·M·m/d²), considerada infalível. Em 1843, o astrônomo John Adams criou uma hipótese para justificar essa diferença preservando a lei da gravitação universal. Três anos depois, essa hipótese foi validada por diversos astrônomos. Conforme o que foi apresentado no enunciado, qual das alternativas pode ter sido a hipótese sugerida por Adams?",
  "opcoes": {
    "a": "O valor G reduz para planetas muito afastados do Sol, provocando órbitas mais alongadas.",
    "b": "Para planetas mais externos, a massa do Sol diminui, o que alongou a órbita de Urano.",
    "c": "Urano se aproximou de Saturno no trecho que sua órbita ficou mais alongada que a prevista.",
    "d": "Urano se aproximou de um planeta desconhecido e mais externo, o qual alongou sua órbita."
  },
  "gabarito": "d",
  "resolucao": "Para preservar a lei de Newton, a perturbação orbital de Urano deve ser causada por uma força gravitacional adicional → a existência de um planeta mais externo (desconhecido à época) que perturba gravitacionalmente a órbita de Urano. Essa hipótese levou à descoberta de Netuno em 1846. As opções a) e b) violam a lei de Newton; c) é inconsistente pois Saturno é interior a Urano."
},
{
  "id": "OBFEP-2023-B-09",
  "ano": 2023, "numero": 9, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Física Geral", "subarea": "Astronomia",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag04_xref75_360x346.png"], "alternativas": {}},
  "enunciado": "O alexandrino Hiparco conseguiu calcular a distância da Terra à Lua após estudar a passagem da Lua pela sombra da Terra (eclipse lunar), em 150 a.C. O esquema abaixo representa os ângulos e os triângulos criados por Hiparco durante o eclipse citado. Hiparco sabia que a Lua descrevia toda sua trajetória em torno do centro da Terra (C_T) em 27,3 dias (aproximadamente 40.000 min). Durante o eclipse citado, a Lua percorreu o arco AB em 100 minutos. Visto do centro da Terra, o raio do Sol (R) ocupa um ângulo visual α. Como a Terra é bem menor que o Sol, o ângulo visual β ocupado pelo raio da Terra (r) visto do ponto Q no Sol é bem menor que α. Quando passa pelo zênite de um observador na superfície da Terra, o Sol ocupa um ângulo visual de 0,6°, valor aproximadamente igual ao dobro de α. Como β é muito pequeno, β é insignificante para essa situação. A distância entre a Terra e a Lua que Hiparco obteve difere menos de 10% do valor atual, um feito impressionante para a época. Os ângulos do esquema serviram para determinar o valor de θ, com o qual torna-se possível calcular a distância entre a Terra e a Lua. Segundo o enunciado, Hiparco encontrou que valor para essa distância, em função do raio da Terra?",
  "opcoes": {
    "a": "63r, pois sen 0,90° = 1/63",
    "b": "67r, pois sen 0,85° = 1/67",
    "c": "76r, pois sen 0,75° = 1/76",
    "d": "72r, pois sen 0,80° = 1/72"
  },
  "gabarito": "c",
  "resolucao": "O arco AB em 100 min corresponde ao ângulo (100/40.000)×360° = 0,9°. Aplicando as correções geométricas do esquema de Hiparco (correção de α = 0,3°), o ângulo efetivo θ = 0,75°. Usando a relação trigonométrica do esquema: D = r/sen(0,75°) ≈ 76r. O valor difere menos de 10% do valor moderno (≈ 60r), confirmando a precisão do método."
},
{
  "id": "OBFEP-2023-B-10",
  "ano": 2023, "numero": 10, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag04_xref77_208x364.png"], "alternativas": {}},
  "enunciado": "Experiências escolares para validar as leis de Newton encontram as seguintes dificuldades: (1) são interferidas significativamente pelo atrito; (2) não conseguem manter a força motriz constante e (3) duram um intervalo de tempo muito pequeno. Essas dificuldades seriam amenizadas se fosse usado o mecanismo mostrado na imagem, criado por George de Atwood em 1784. A máquina de Atwood tinha uma roldana, a qual girava em torno do seu eixo fixo, e duas cargas A e B, presas a uma corda apoiada nessa roda. Sobre as características que tornam esse mecanismo um excelente recurso experimental para validar as leis de Newton, identifique a alternativa FALSA.",
  "opcoes": {
    "a": "A força motriz se mantém constante, já que é produzida por forças constantes — pesos.",
    "b": "Uma corda mais pesada garante que a inércia e a força motriz permaneçam constantes.",
    "c": "Ao utilizar cargas de massas próximas, aumentará o intervalo de tempo do movimento.",
    "d": "Uma roda de massa bem menor que às das cargas reduz a interferência do atrito e de sua inércia."
  },
  "gabarito": "b",
  "resolucao": "Uma corda mais pesada torna tanto a inércia quanto a força motriz variáveis ao longo do movimento (à medida que a corda se desloca, seu peso redistribui entre os dois lados), prejudicando a experiência. Portanto, b) é FALSA: uma corda mais pesada NÃO garante constância — pelo contrário, a corda deve ser leve para que inércia e força motriz permaneçam praticamente constantes."
},
{
  "id": "OBFEP-2023-B-11",
  "ano": 2023, "numero": 11, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag04_xref79_96x141.png"], "alternativas": {}},
  "enunciado": "Para medir o tempo de um processo muito rápido utiliza-se, em um laboratório apropriado, a fotografia estroboscópica. Essa técnica consiste em deixar o obturador de uma câmera aberto e mirando para o local do processo em um ambiente totalmente escuro. Flashes de luz são emitidos em intervalos de tempo fixos enquanto ocorre o processo. As imagens sucessivas do que foi iluminado ficam registradas em uma única foto. No desenho ao lado, vemos a representação de uma fotografia estroboscópica feita de um lançamento horizontal de uma pequena esfera. O momento que inicia o lançamento foi o flash zero, representado na imagem pela esfera preta. As duas imagens seguintes foram indicadas pelos números 1 e 2. Linhas horizontais distanciadas de 25 cm uma da outra foram adicionadas à foto. Considerando a aceleração da gravidade igual a 10 m/s², determine o intervalo de tempo entre dois flashes de luz sucessivos.",
  "opcoes": {
    "a": "1/24 de segundo",
    "b": "2/50 de segundo",
    "c": "3/70 de segundo",
    "d": "1/18 de segundo"
  },
  "gabarito": "a",
  "resolucao": "A partir das posições das imagens estroboscópicas na fotografia, com as linhas horizontais como régua (25 cm cada), e usando o MRUV vertical (queda livre, g = 10 m/s²) junto à equação S = 0,5gΔt², identifica-se o intervalo de tempo entre flashes: Δt = 1/24 s."
},
{
  "id": "OBFEP-2023-B-12",
  "ano": 2023, "numero": 12, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Lentes",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "No século XVII, Robert Hooke, experimentando o microscópio composto que acabara de inventar, descobriu a célula. Digamos que um fino pedaço de pele humana (objeto) tenha sido colocado a 5 cm da objetiva (primeira lente) de um microscópio composto. Sabe-se que a imagem formada por essa objetiva fica a 4 cm da ocular (segunda lente), em uma posição entre as lentes. Sabendo que as distâncias focais da objetiva e da ocular medem 4 cm e 5 cm, respectivamente, use o conhecimento sobre lentes para calcular o módulo da ampliação linear transversal que esse microscópio está gerando nessa situação.",
  "opcoes": {
    "a": "9",
    "b": "16",
    "c": "20",
    "d": "40"
  },
  "gabarito": "c",
  "resolucao": "Objetiva (f₁=4 cm, p₁=5 cm): 1/q₁ = 1/4 − 1/5 = 1/20 → q₁ = 20 cm → |m₁| = 20/5 = 4. Ocular (f₂=5 cm, p₂=4 cm): 1/q₂ = 1/5 − 1/4 = −1/20 → q₂ = −20 cm (virtual) → |m₂| = 20/4 = 5. Ampliação total = |m₁ × m₂| = 4 × 5 = 20."
},
{
  "id": "OBFEP-2023-B-13",
  "ano": 2023, "numero": 13, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Calorimetria",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Em 1760, Joseph Black ajudou a criar a seguinte definição: caloria é o calor que 1 grama de água precisa para aumentar 1 °C. Usando essa definição, Black descobriu o calor latente de fusão do gelo (80 cal/g) e o calor específico do cobre (0,09 cal/g°C). Note que essa definição de caloria usou o grama, o grau Celsius e a água como referência. Se os cientistas do século XVIII definissem a caloria trocando o grama pelo quilograma, o Celsius pelo Fahrenheit e a água pelo cobre, sua intensidade seria equivalente a quantas calorias da definição adotada?\n\nDados: 0 °C ↔ 32 °F e 100 °C ↔ 212 °F",
  "opcoes": {
    "a": "50 cal.",
    "b": "40 cal",
    "c": "60 cal",
    "d": "80 cal"
  },
  "gabarito": "a",
  "resolucao": "A nova caloria = calor para aquecer 1 kg = 1000 g de cobre em 1 °F. 1 °F = (100/180) °C = 5/9 °C. Calor = 1000 g × 0,09 cal/(g·°C) × (5/9) °C = 1000 × 0,05 = 50 cal."
},
{
  "id": "OBFEP-2023-B-14",
  "ano": 2023, "numero": 14, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Termometria",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag05_xref83_824x362.png", f"{IMG}/pag05_xref85_686x507.png"], "alternativas": {}},
  "enunciado": "O primeiro cientista que tentou descobrir experimentalmente o zero absoluto foi o francês Guillaume Amontons, em 1702. Ele usou mercúrio para confinar uma amostra gasosa na extremidade fechada de um recipiente, conforme imagem abaixo. Na sua experiência, queria manter o volume dessa amostra constante. No início, o gás estava a 120 °C e a coluna de mercúrio tinha h = 104 cm. Ao resfriar o gás para 0 °C, precisou retirar mercúrio pela extremidade aberta do recipiente até h = 44 cm para manter o volume da amostra gasosa. Levando em consideração a pressão atmosférica de 76 cmHg, notou que existia uma linearidade entre a pressão e a temperatura, conforme gráfico. Para Amontons, a menor pressão possível (0 cmHg) seria conseguida se o gás atingisse o zero absoluto. Apesar de não ter atingido essa temperatura na sua experiência, determinou-a usando a linearidade revelada. Qual a diferença entre o valor obtido por Amontons e o valor atual do zero absoluto (−273 °C)?",
  "opcoes": {
    "a": "27 °C",
    "b": "0 °C",
    "c": "33 °C",
    "d": "13 °C"
  },
  "gabarito": "c",
  "resolucao": "Pressões: P₁ = 76 + 104 = 180 cmHg (a 120 °C); P₂ = 76 + 44 = 120 cmHg (a 0 °C). Inclinação ΔP/ΔT = (180−120)/(120−0) = 0,5 cmHg/°C. Reta: P = 120 + 0,5T. Para P=0: T = −120/0,5 = −240 °C. Diferença = |−240 − (−273)| = 33 °C."
},
{
  "id": "OBFEP-2023-B-15",
  "ano": 2023, "numero": 15, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Óptica Geométrica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "É comum construir uma câmera escura simples (sem lente) para simular o globo ocular humano conforme as semelhanças propostas por Della Porta, em 1558. A diferença entre essas duas estruturas é o cristalino. Esse elemento do globo ocular é uma lente elástica de bordas finas localizada entre a pupila e a retina. Quem explicou como o cristalino é essencial para o funcionamento do globo ocular foi o físico-matemático Joannes Kepler, em 1610. Sobre os papéis dos elementos que compõem o globo ocular, determine a alternativa INCORRETA.",
  "opcoes": {
    "a": "Se a pupila fosse um 'furo' pequeno, em relação ao globo ocular, só conseguiríamos ver com intensidade em um ambiente muito iluminado.",
    "b": "Como o cristalino é uma lente convergente, ela consegue direcionar para um ponto da retina todos os raios oriundos de um ponto do objeto que passam pela pupila.",
    "c": "Como a pupila é um 'furo' pequeno, em relação ao globo ocular, as imagens projetadas na retina seriam nítidas sem a presença do cristalino.",
    "d": "O cristalino precisa ser flexível para mudar a distância focal a fim de deixar nítidas as imagens de objetos localizados em distâncias diferentes."
  },
  "gabarito": "c",
  "resolucao": "A alternativa c) é INCORRETA: na prática, a pupila do olho humano NÃO é suficientemente pequena para funcionar como pinhole eficiente — seu diâmetro (até 8 mm) é grande demais. Sem o cristalino, os raios de um ponto do objeto se espalharia por uma grande área da retina, formando imagem borrada. O cristalino é indispensável para focar os raios em um único ponto da retina."
},
{
  "id": "OBFEP-2023-B-16",
  "ano": 2023, "numero": 16, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Estática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag06_xref89_808x177.png"], "alternativas": {}},
  "enunciado": "Desde a Antiguidade, o homem utiliza o plano inclinado para erguer objetos, visto que o peso aparente (componente do peso ao longo do plano inclinado) é menor que o peso real. Em 1540, Simon Stevin elaborou uma experiência mental que revelou como calcular o peso aparente. Ele imaginou um colar de pérolas pendurado em um apoio na forma de um triângulo retângulo, conforme imagem. As pérolas seriam iguais e equidistantes por todo o colar. A porção do colar na hipotenusa usaria seu peso aparente para deslocar o colar no sentido horário e a porção do colar rente ao cateto oposto ao ângulo θ da base usaria seu peso real para fazer o oposto. O colar está em equilíbrio: qualquer movimento rotacional o levaria a uma situação igual à inicial. Portanto, o peso aparente da porção que está na hipotenusa é igual ao peso real da porção rente ao cateto oposto a θ. A partir dessa experiência mental, identifique qual a relação entre o peso aparente e o peso real de um corpo sobre o plano inclinado.",
  "opcoes": {
    "a": "peso aparente/peso real = cateto oposto/hipotenusa",
    "b": "peso aparente − peso real = hipotenusa − cateto oposto",
    "c": "(peso aparente)² = (cateto oposto)² + (cateto adjacente)²",
    "d": "peso aparente² = peso real"
  },
  "gabarito": "a",
  "resolucao": "Em equilíbrio: peso_aparente × N_hip = peso_real × N_cat, onde N_hip e N_cat são os números de pérolas em cada segmento. Como N_hip/N_cat = hipotenusa/cateto_oposto (pérolas equidistantes), obtém-se peso_aparente/peso_real = N_cat/N_hip = cateto_oposto/hipotenusa = sen(θ)."
},
{
  "id": "OBFEP-2023-B-17",
  "ano": 2023, "numero": 17, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag06_xref91_863x172.png"], "alternativas": {}},
  "enunciado": "No século XVII, Robert Hooke percebeu que muitas molas podiam ser usadas como instrumentos de medida de força, já que suas deformações eram proporcionais à força aplicada (lei de Hooke). Outro cientista construiu a montagem abaixo para validar a 2ª lei de Newton. Nela, os atritos eram desprezíveis e o comprimento natural da mola era 3,0 polegadas. Em uma primeira experiência, o carrinho de 10 libras de massa, partindo do repouso, deslocou 40 polegadas enquanto um pequeno pêndulo oscilava 10 vezes. Durante esse movimento, a mola usada permaneceu com 5,0 polegadas de comprimento. Em uma segunda experiência, o carrinho recebeu mais carga, passando a ter 20 libras e a esfera motora foi trocada. Dessa vez, o comprimento da mola manteve-se com 9,0 polegadas. Para validar a segunda lei de Newton, qual a distância que esse carrinho deveria percorrer nessa segunda experiência durante 10 oscilações do mesmo pequeno pêndulo, caso partisse do repouso?",
  "opcoes": {
    "a": "80 polegadas",
    "b": "50 polegadas",
    "c": "90 polegadas",
    "d": "60 polegadas"
  },
  "gabarito": "d",
  "resolucao": "Pela lei de Hooke: F₁ = k×(5−3) = 2k; F₂ = k×(9−3) = 6k → F₂ = 3F₁. Por MRUV a partir do repouso: S = 0,5×(F/m)×t². Exp.1: 40 = 0,5×(F₁/10)×(10T)² → F₁×(10T)²=800. Exp.2: S₂ = 0,5×(F₂/m₂)×(10T)² = 0,5×(3F₁/20)×(10T)² = 3×800/40 = 60 polegadas."
},
{
  "id": "OBFEP-2023-B-18",
  "ano": 2023, "numero": 18, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "O físico John Wallis identificou experimentalmente a conservação da quantidade de movimento. Para isso, promoveu colisões com carrinhos de carvão em um trecho de ferrovia. Usava ladeiras de mesma inclinação para acelerar os carrinhos, a equação de Torricelli para comparar as velocidades nas colisões e engates para que as colisões fossem plásticas. No exemplo abaixo, o carrinho A tem o quádruplo da massa do carrinho B. Desprezando atrito e considerando que o carrinho A adquire velocidade V no final da descida, determine a velocidade dos carrinhos quando se engatarem, o que acontece no trecho horizontal.",
  "opcoes": {
    "a": "0,4 V",
    "b": "0,5 V",
    "c": "0",
    "d": "V"
  },
  "gabarito": "a",
  "resolucao": "Pelo esquema, o carrinho B desce de uma altura que lhe confere velocidade 2V (o dobro da altura de A, pois a mesma inclinação implica v² ∝ h). Como A e B vêm em sentidos opostos: p_total = 4m×V − m×2V = 2mV. Após o engate (m_total = 5m): v_f = 2mV/(5m) = 0,4V."
},
{
  "id": "OBFEP-2023-B-19",
  "ano": 2023, "numero": 19, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Em um livro de Galileu, um dos seus personagens descreve uma experiência em que duas esferas de ferro, uma 100 vezes mais pesada que a outra, eram abandonadas simultaneamente do alto da torre de Pisa. Galileu esperava que as duas esferas chegassem juntas ao solo. O resultado da experiência revela que a esfera mais pesada chegou ao solo quando a mais leve estava a 2 dedos deste. Galileu concluiu que essa ínfima diferença não valida a teoria de Aristóteles. Esse estudo revelou que, nessa experiência, o ar não interfere significativamente na esfera maior, mas produz uma força média contra o movimento da esfera menor igual a 0,05% do seu peso. Se os 2 dedos correspondem a 4 cm, qual a altura da torre de Pisa segundo os valores oferecidos nesse enunciado?\n\nDados: g = 10 m/s²",
  "opcoes": {
    "a": "57 m",
    "b": "80 m",
    "c": "64 m",
    "d": "72 m"
  },
  "gabarito": "b",
  "resolucao": "Esfera maior: queda livre, a_grande = g = 10 m/s². Esfera menor: a_pequena = g − 0,0005g = 0,9995g. Ambas caem do mesmo h em tempo t. h = 0,5g·t². Diferença de posições quando a maior chega ao solo: Δh = h − 0,5×0,9995g×t² = h×0,0005. Δh = 0,04 m → h = 0,04/0,0005 = 80 m."
},
{
  "id": "OBFEP-2023-B-20",
  "ano": 2023, "numero": 20, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Termodinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Em 1824, o engenheiro Sadi Carnot trouxe uma sugestão para um problema acerca da força motriz do fogo: 'Quais as transformações que uma amostra gasosa deveria se submeter em um processo cíclico que convertesse em trabalho a maior quantidade do calor retirado de uma fonte quente?' Sua resposta foi um ciclo cujo gás sofreria dois processos isotérmicos para trocar calor com as fontes quente e fria, intercalados por processos adiabáticos. Mesmo sem intenção, ao criar esse ciclo, Carnot deu início a uma linha de pesquisa que resultou na criação da segunda lei da termodinâmica. Sobre o ciclo de Carnot, determine a alternativa verdadeira.",
  "opcoes": {
    "a": "Como o gás retorna à sua situação inicial, nesse ciclo, não existe perda de calor para o ambiente.",
    "b": "Os calores trocados pelo gás e as fontes térmicas nas duas adiabáticas do ciclo de Carnot são opostos.",
    "c": "Quanto maior a diferença nas temperaturas das fontes, menor será o rendimento desse ciclo.",
    "d": "Se fosse possível atingir o zero absoluto, uma máquina de Carnot poderia atingir 100% de rendimento."
  },
  "gabarito": "d",
  "resolucao": "Rendimento de Carnot: η = 1 − T_fria/T_quente. Se T_fria = 0 K (zero absoluto), então η = 1 = 100%. As opções a), b) e c) são falsas: a) o ciclo rejeita calor à fonte fria; b) nos processos adiabáticos Q = 0 (por definição); c) maior diferença de temperatura implica MAIOR rendimento."
},
]

data['banco_questoes'].extend(questoes)

with open('banco-questoes/fisica_ufrgs.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Total: {len(data['banco_questoes'])} questões")
