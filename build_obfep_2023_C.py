import json

with open('banco-questoes/fisica_ufrgs.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

IMG = 'obfep/2023/C-F1'

questoes = [
{
  "id": "OBFEP-2023-C-01",
  "ano": 2023, "numero": 1, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Espelhos Esféricos",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Na Antiguidade, Arquimedes tinha provado que o espelho parabólico tinha um foco principal, porém o espelho esférico tinha uma região focal principal, logo era um espelho menos confiável. Em 1840, o físico e matemático alemão Carl Gauss estabeleceu condições para que espelhos esféricos pudessem ser estigmáticos para todos os raios incidentes emitidos pelo objeto. A partir daí, os laboratórios passaram a trabalhar com espelhos esféricos gaussianos.\n\nAplique as relações da óptica gaussiana para determinar a altura da imagem de uma vela de 60 mm de altura colocada a 80 cm do vértice de um espelho esférico convexo gaussiano de raio de curvatura igual a 40 cm.",
  "opcoes": {
    "a": "16 mm",
    "b": "12 mm",
    "c": "20 mm",
    "d": "15 mm"
  },
  "gabarito": "b",
  "resolucao": "Espelho convexo: f = −R/2 = −20 cm; p = 80 cm. Equação de Gauss: 1/f = 1/p + 1/q → 1/(−20) = 1/80 + 1/q → 1/q = −1/20 − 1/80 = −5/80 → q = −16 cm (imagem virtual). Ampliação: m = −q/p = 16/80 = 0,2. Altura da imagem: h' = 0,2 × 60 = 12 mm."
},
{
  "id": "OBFEP-2023-C-02",
  "ano": 2023, "numero": 2, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Lentes",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "É comum os cientistas recorrerem a instrumentos para ultrapassar os limites dos sentidos humanos. Uma das primeiras vezes que o homem incorporou tal atitude ocorreu no século XVII, quando Robert Hooke, experimentando o microscópio composto que acabara de inventar, descobriu a célula. Digamos que um fino pedaço de pele humana (objeto) tenha sido colocado a 5 cm da objetiva (primeira lente) de um microscópio composto. Sabe-se que a imagem formada por essa objetiva fica a 4 cm da ocular (segunda lente), em uma posição entre as lentes. Sabendo que as distâncias focais da objetiva e da ocular medem 4 cm e 5 cm, respectivamente, use o conhecimento sobre lentes para calcular o módulo da ampliação linear transversal que esse microscópio está gerando nessa situação.",
  "opcoes": {
    "a": "20",
    "b": "9",
    "c": "16",
    "d": "40"
  },
  "gabarito": "a",
  "resolucao": "Objetiva (f₁=4 cm, p₁=5 cm): 1/q₁ = 1/4 − 1/5 = 1/20 → q₁ = 20 cm → |m₁| = 20/5 = 4. Ocular (f₂=5 cm, p₂=4 cm, objeto entre F e lente): 1/q₂ = 1/5 − 1/4 = −1/20 → q₂ = −20 cm (virtual) → |m₂| = 20/4 = 5. Ampliação total = |m₁ × m₂| = 4 × 5 = 20."
},
{
  "id": "OBFEP-2023-C-03",
  "ano": 2023, "numero": 3, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Hidrostática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref50_973x310.png"], "alternativas": {}},
  "enunciado": "As bombas d'água manuais funcionam da mesma forma que a boca quando usam um canudo para 'puxar' água de um nível mais baixo: suga-se o ar para reduzir a pressão na parte superior do tubo permitindo que a pressão atmosférica, agindo na água que está fora do tubo, empurre água para dentro desse pela parte inferior.\n\nEssa explicação foi criada por Pascal, no século XVII, depois que Torricelli, através de uma montagem experimental, verificou que, se tirar todo o ar da parte superior do tubo, a pressão atmosférica consegue elevar uma coluna de mercúrio, chegando até uma altura de 76 cm caso a montagem esteja no nível do mar.\n\nSabendo que a densidade do mercúrio é 13,6 vezes a densidade da água, qual a altura máxima que a pressão atmosférica ao nível do mar consegue elevar a água?",
  "opcoes": {
    "a": "Aproximadamente 9 m.",
    "b": "Aproximadamente 10 m.",
    "c": "Aproximadamente 11 m.",
    "d": "Aproximadamente 12 m."
  },
  "gabarito": "b",
  "resolucao": "A pressão atmosférica equilibra uma coluna de mercúrio de 76 cm. Como P = ρgh, para a mesma pressão com água (ρ_água = ρ_Hg/13,6): h_água = h_Hg × (ρ_Hg/ρ_água) = 0,76 m × 13,6 ≈ 10,3 m ≈ 10 m."
},
{
  "id": "OBFEP-2023-C-04",
  "ano": 2023, "numero": 4, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Calorimetria",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Um bom exemplo de definição que dialoga com a prática laboratorial é a caloria que Joseph Black ajudou a criar, em 1760: caloria é o calor que 1 grama de água precisa para aumentar 1 °C. Usando essa definição, Black descobriu o calor latente de fusão do gelo (80 cal/g) e o calor específico do cobre (0,09 cal/g°C).\n\nNote que essa definição de caloria usou o grama, o grau Celsius e a água como referência. Se os cientistas do século XVIII definissem a caloria trocando o grama pelo quilograma, o Celsius pelo Fahrenheit e a água pelo cobre, de quanto seria o calor latente de fusão da água?\n\nDados: 0 °C ↔ 32 °F e 100 °C ↔ 212 °F",
  "opcoes": {
    "a": "1,6 cal/g",
    "b": "2,0 cal/g",
    "c": "2,4 cal/g",
    "d": "3,0 cal/g"
  },
  "gabarito": "a",
  "resolucao": "1 nova caloria = calor para aquecer 1 kg = 1000 g de cobre em 1 °F. 1 °F = (100/180) °C = 5/9 °C. Em calorias antigas: 1 nova cal = 1000 × 0,09 × (5/9) = 50 cal antigas. O calor de fusão da água em calorias novas: 80 cal/g ÷ 50 = 1,6 nova cal/g."
},
{
  "id": "OBFEP-2023-C-05",
  "ano": 2023, "numero": 5, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Termodinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref52_741x421.png"], "alternativas": {}},
  "enunciado": "Em 1824, o engenheiro Sadi Carnot trouxe uma sugestão para um problema acerca da força motriz do fogo: 'Quais as transformações que uma amostra gasosa deveria se submeter em um processo cíclico que convertesse em trabalho a maior quantidade do calor retirado de uma fonte quente?' Mesmo sem intenção, ao criar esse ciclo, Carnot deu início a uma linha de pesquisa que resultou na criação da segunda lei da termodinâmica.\n\nSobre o ciclo de Carnot, determine a alternativa verdadeira.",
  "opcoes": {
    "a": "Como o gás retorna à sua situação inicial, nesse ciclo, não existe perda de calor para o ambiente.",
    "b": "Os calores trocados pelo gás e as fontes térmicas nas duas adiabáticas do ciclo de Carnot são opostos.",
    "c": "Quanto maior a diferença nas temperaturas das fontes, menor será o rendimento desse ciclo.",
    "d": "Se fosse possível atingir o zero absoluto, uma máquina de Carnot poderia atingir 100% de rendimento."
  },
  "gabarito": "d",
  "resolucao": "Rendimento de Carnot: η = 1 − T_fria/T_quente. Se T_fria = 0 K (zero absoluto), então η = 1 = 100% — alternativa d) é verdadeira. a) Falsa: o ciclo rejeita calor à fonte fria. b) Falsa: nos processos adiabáticos, Q = 0 por definição (não há troca de calor). c) Falsa: maior diferença de temperatura implica MAIOR rendimento."
},
{
  "id": "OBFEP-2023-C-06",
  "ano": 2023, "numero": 6, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Eletromagnetismo", "subarea": "Eletrostática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag03_xref56_344x660.png"], "alternativas": {}},
  "enunciado": "Em meados do século XVIII, os cientistas já tinham identificado dois tipos de eletricidade: a vítrea, manifestada pelo vidro quando atritado a um pano de algodão, e a resinosa, manifestada por resinas quando atritadas também a um pano de algodão. Tais eletricidades obedeciam à seguinte regra: os iguais se repelem e os diferentes se atraem. Benjamin Franklin, o criador do para-raios, comprovou a natureza elétrica dos raios ao empinar uma pipa presa a um fio condutor. Ao aproximar vidro carregado com eletricidade vítrea ao lado oposto às folhas de um eletroscópio carregado nessa experiência, as folhas abriam mais.\n\nFranklin criou a hipótese de que todos os corpos já possuem fluido elétrico em uma quantidade que os deixam inertes eletricamente (carga nula). Os tipos de eletricidade ativa se manifestavam quando o corpo recebia fluido elétrico (carga elétrica positiva) ou o corpo perdia fluido elétrico (carga elétrica negativa).\n\nDe acordo com o que foi apresentado, identifique a alternativa verdadeira.",
  "opcoes": {
    "a": "Para Franklin, a nuvem da experiência da pipa descrita acima estava eletrizada com carga elétrica negativa.",
    "b": "A parte inferior da nuvem que eletrizou a barra metálica da experiência da pipa estava cheia de prótons em excesso.",
    "c": "Na teoria do fluido elétrico concebida por Franklin, a eletricidade resinosa foi associada à carga elétrica positiva.",
    "d": "Na linguagem atual, o sentido do movimento do suposto fluido elétrico tornou-se o sentido da corrente elétrica convencional."
  },
  "gabarito": "d",
  "resolucao": "As folhas do eletroscópio abriram mais com a aproximação do vidro vítreo (positivo), indicando que o eletroscópio estava carregado com eletricidade vítrea (positiva), portanto a nuvem deu carga positiva ao sistema. Para Franklin, o fluido elétrico flui do corpo com excesso (positivo) para o com déficit (negativo). Esse sentido do fluxo do 'fluido' coincide exatamente com a corrente elétrica convencional atual (sentido da corrente = de + para −). a) Falsa — a nuvem tinha carga positiva. b) Falsa — a parte inferior da nuvem que carregou o sistema estava negativa (indução). c) Falsa — eletricidade resinosa é negativa (deficiência de fluido)."
},
{
  "id": "OBFEP-2023-C-07",
  "ano": 2023, "numero": 7, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Eletromagnetismo", "subarea": "Eletrostática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag03_xref58_512x295.png"], "alternativas": {}},
  "enunciado": "Avaliando a experiência de Coulomb para determinar a relação entre força elétrica e distância, um aspecto pode ser questionado: 'Como ele comparou as cargas elétricas dos corpos envolvidos já que não é possível pesá-las ou vê-las?' Ele confeccionou esferas metálicas de raios r, 2r, 3r etc. Notou que, para distâncias iguais, esferas eletrizadas aos pares por contato produziam forças proporcionais aos seus raios. Concluiu que a carga final de uma esfera em contato com outras é proporcional ao seu raio.\n\nDigamos que Coulomb adotou os seguintes procedimentos:\n\nPrimeiro procedimento [P1]: utilizando uma máquina eletrostática eletrizada, eletrizou por contato uma esfera de raio = 2r com outra de raio = 8r conectadas entre si por um fio condutor;\n\nSegundo procedimento [P2]: desfez os contatos anteriores e estabeleceu um novo contato simultâneo entre a esfera de raio = 8r e mais três esferas de raio = 8r e neutras.\n\nDetermine a alternativa verdadeira sobre a situação das esferas nessa etapa composta por P1 e P2.",
  "opcoes": {
    "a": "Após os dois procedimentos, todas as esferas envolvidas estavam com mesma carga elétrica.",
    "b": "Os campos na superfície das esferas envolvidas em P1 ao finalizar P1 têm o mesmo módulo.",
    "c": "O potencial elétrico no centro das esferas envolvidas em P2 ao finalizar P2 é nulo.",
    "d": "No final de P1, a carga elétrica da esfera de raio = 8r é igual a 16 vezes a da esfera de raio = 2r."
  },
  "gabarito": "a",
  "resolucao": "Em P1: carga distribui proporcionalmente aos raios. Q₂r/Q₈r = 2r/8r = 1/4. Se Q_total = Q: Q₂r = Q/5 × 2 = 2Q/10 e Q₈r = 8Q/10. Em P2: a esfera 8r se conecta a 3 esferas iguais neutras → 4 esferas iguais de 8r compartilham a carga igualmente: cada uma fica com Q₈r/4 = (8Q/10)/4 = 2Q/10. Resultado final: esfera 2r tem 2Q/10; cada uma das 4 esferas 8r tem 2Q/10 → TODAS as 5 esferas têm a mesma carga. Alternativa a) é verdadeira."
},
{
  "id": "OBFEP-2023-C-08",
  "ano": 2023, "numero": 8, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Eletromagnetismo", "subarea": "Eletrostática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag04_xref62_383x465.png"], "alternativas": {}},
  "enunciado": "No século XVII, Isaac Newton demonstrou matematicamente que, se existisse um planeta esférico e oco, constituído apenas por uma fina casca de mesma espessura e densidade, os efeitos gravitacionais seriam nulos no seu interior devido à relação inversamente proporcional entre a força gravitacional (F_g) e o quadrado da distância (F_g ∝ 1/d²).\n\nNo século seguinte, Joseph Priestley criou uma fina esfera metálica oca e eletrizou-a. Ele pegou um pequeno corpo neutro e tocou nessa esfera por fora: com um eletroscópio, verificou que esse corpo foi eletrizado pela esfera. Essa esfera metálica tinha um orifício por onde era possível introduzir esse pequeno corpo. Quando Priestley reproduziu essa experiência, passando esse pequeno corpo neutro pelo orifício até que tocasse a esfera metálica eletrizada por dentro, verificou que esse pequeno corpo não foi eletrizado.\n\nEssa experiência de Priestley:",
  "opcoes": {
    "a": "traz evidências de que F_ele ∝ 1/d².",
    "b": "não utiliza a blindagem eletrostática.",
    "c": "utiliza o poder das pontas.",
    "d": "produz uma eletrização por indução."
  },
  "gabarito": "a",
  "resolucao": "O resultado (campo nulo no interior) é análogo ao que Newton calculou para a gravidade: campo interno nulo IMPLICA lei de força inversamente proporcional ao quadrado da distância. Priestley, por analogia com o argumento de Newton para a gravitação, concluiu que F_elétrica ∝ 1/d² — esse experimento traz evidências para a lei de Coulomb antes mesmo de Coulomb formulá-la."
},
{
  "id": "OBFEP-2023-C-09",
  "ano": 2023, "numero": 9, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Eletromagnetismo", "subarea": "Eletrodinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Um professor de Física reproduziu em laboratório uma experiência que validou as descobertas de Joule. Um resistor foi colocado dentro de uma porção de água. Uma pilha alimentou esse resistor durante 10 min, o que fez a temperatura da água alterar de 6 °C para 9 °C. Ele repetiu a experiência com o mesmo resistor mergulhado na mesma quantidade de água inicialmente a 6 °C. Dessa vez, o resistor foi alimentado por duas pilhas iguais à primeira e arrumadas em série. Desprezando as resistências internas das pilhas, utilize as relações de eletrodinâmica e calorimetria envolvidas para definir qual a temperatura da água no final de 20 min de experiência.",
  "opcoes": {
    "a": "22 °C",
    "b": "18 °C",
    "c": "30 °C",
    "d": "26 °C"
  },
  "gabarito": "c",
  "resolucao": "Exp. 1: V, R, t₁=10 min → ΔT₁=3°C. Energia₁ = V²/R × t₁ ∝ 3°C. Exp. 2: 2 pilhas em série → tensão = 2V; mesmo R; t₂=20 min. Potência₂ = (2V)²/R = 4V²/R = 4×Potência₁. Energia₂ = 4×Potência₁ × 2×t₁ = 8×Energia₁. ΔT₂ = 8×ΔT₁ = 8×3 = 24°C. Temperatura final = 6 + 24 = 30°C."
},
{
  "id": "OBFEP-2023-C-10",
  "ano": 2023, "numero": 10, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Eletromagnetismo", "subarea": "Magnetismo",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag04_xref64_485x395.png"], "alternativas": {}},
  "enunciado": "No final do século XIII, os europeus já sabiam que os polos magnéticos dos ímãs tendem a se alinhar com a direção Norte-Sul, passando a chamar de polo norte magnético do ímã aquele que 'procura' o ponto cardeal Norte. Em 1600, o inglês William Gilbert apresentou a seguinte hipótese: a Terra era um gigantesco ímã — substância ferromagnética imantada. Para que outras pessoas validassem sua hipótese, ele magnetizou uma esfera de ferro, reproduzindo em laboratório, numa escala bem menor, os efeitos que a Terra produz nas agulhas magnéticas das bússolas, incluindo a inclinação e a declinação magnéticas.\n\nSobre as características e as influências do magnetismo da Terra, determine a alternativa correta.",
  "opcoes": {
    "a": "A Terra possui polos magnéticos que estão alinhados com os polos geográficos.",
    "b": "A inclinação magnética em locais próximos aos polos magnéticos da Terra é próxima de zero.",
    "c": "O magnetismo da Terra poderia ser explicado se ela fosse um eletroímã, no lugar de um ímã.",
    "d": "Em todos os pontos da linha do equador, a declinação magnética é zero."
  },
  "gabarito": "c",
  "resolucao": "O magnetismo terrestre é gerado por correntes elétricas no núcleo externo líquido (geodínamo) — análogo a um eletroímã. Portanto, c) é correta: o magnetismo da Terra PODERIA ser explicado por um eletroímã. a) Falsa: os polos magnéticos não coincidem com os geográficos (há declinação). b) Falsa: perto dos polos magnéticos a inclinação é próxima de 90°, não de zero. d) Falsa: a declinação magnética varia ao longo do equador geográfico."
},
{
  "id": "OBFEP-2023-C-11",
  "ano": 2023, "numero": 11, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Eletromagnetismo", "subarea": "Magnetismo",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag05_xref68_1076x380.png"], "alternativas": {}},
  "enunciado": "Um dos laboratórios mais importantes da história da Ciência foi o de Ernest Rutherford. Em 1899, ele distinguiu duas radiações diferentes do 'Raio X', as quais chamou de alfa e beta. Para que as diferenciasse, direcionou toda a radiação de uma fonte para passar entre duas placas de um capacitor plano. Nessa experiência, Rutherford poderia substituir o capacitor por uma fonte de campo magnético uniforme.\n\nUsando a correspondência entre números e sentidos apresentada na imagem, identifique o sentido do campo magnético que desviaria as partículas alfa e beta para os mesmos lados que o campo elétrico do capacitor.",
  "opcoes": {
    "a": "1",
    "b": "2",
    "c": "3",
    "d": "4"
  },
  "gabarito": "c",
  "resolucao": "No capacitor: partículas alfa (carga +) são desviadas para a placa negativa (digamos, para baixo) e partículas beta (carga −) para a placa positiva (para cima). Para reproduzir esses desvios com campo magnético: usando a regra da mão direita para partículas alfas movendo-se na direção da imagem com desvio para baixo, o campo magnético deve apontar na direção 3. A mesma direção de campo desvia betas (carga −) na direção oposta, consistente com o capacitor."
},
{
  "id": "OBFEP-2023-C-12",
  "ano": 2023, "numero": 12, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Óptica Física",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag05_xref70_946x609.png"], "alternativas": {}},
  "enunciado": "O interferômetro de Mach-Zehnder é um experimento muito usado em laboratórios de física ondulatória e física quântica. No esquema, S₁ e S₂ são semi-espelhos que dividem a luz incidente em dois raios de mesma intensidade, um refletido e outro refratado. E₁ e E₂ são espelhos planos. Todas as reflexões acrescentam uma diferença de fase de 90° entre o raio refletido e o incidente; já as refrações não produzem diferença de fase. Os espelhos e os semi-espelhos estão posicionados nos vértices de um quadrado perfeito.\n\nCaso o raio emitido pelo laser fosse intenso e com direção igual à de um dos lados do quadrado, conforme imagem, os detectores D₁ e D₂ registrariam,",
  "opcoes": {
    "a": "respectivamente, nenhuma luz e luz intensa.",
    "b": "igualmente, luz com uma intensidade menor que a luz original.",
    "c": "respectivamente, luz intensa e nenhuma luz.",
    "d": "igualmente, nenhuma luz."
  },
  "gabarito": "c",
  "resolucao": "Caminho A (p/ D₁): S₁(reflexão +90°) → E₁(reflexão +90°) → S₂(transmissão +0°) = 180°. Caminho B (p/ D₁): S₁(transmissão +0°) → E₂(reflexão +90°) → S₂(reflexão +90°) = 180°. Ambos chegam a D₁ com 180° de defasagem acumulada relativa ao raio original, mas com a MESMA fase entre si → interferência construtiva em D₁. Caminho A (p/ D₂): S₁(+90°) → E₁(+90°) → S₂(+90°) = 270°. Caminho B (p/ D₂): S₁(+0°) → E₂(+90°) → S₂(+0°) = 90°. Diferença = 180° → interferência destrutiva em D₂. Resultado: D₁ = luz intensa, D₂ = nenhuma luz."
},
{
  "id": "OBFEP-2023-C-13",
  "ano": 2023, "numero": 13, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Física Moderna", "subarea": "Física Quântica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Se, na montagem experimental da questão anterior (interferômetro de Mach-Zehnder), a intensidade da luz emitida pela fonte laser pudesse ser reduzida até que ela emitisse fótons intermitentes e os detectores fossem altamente sensíveis, ao ponto de conseguir registrar o recebimento de fótons, um por um, teríamos um equipamento capaz de validar alguns comportamentos previstos pela física quântica. Nessas condições, fóton a fóton seria registrado, de tal forma que, depois que muitos tenham sido emitidos,",
  "opcoes": {
    "a": "cada detector tende a ser atingido por metade dos fótons.",
    "b": "todos os fótons atingiriam apenas o detector D₁.",
    "c": "todos os fótons atingiriam apenas o detector D₂.",
    "d": "cada fóton pode atingir qualquer um dos detectores."
  },
  "gabarito": "b",
  "resolucao": "A física quântica prevê que cada fóton individual experimenta interferência consigo mesmo ao percorrer simultaneamente ambos os caminhos em superposição. O padrão de interferência do regime de muitos fótons (C.12) é reproduzido estatisticamente por fótons individuais: a probabilidade de detectar em D₁ é 100% e em D₂ é 0%. Portanto, todos os fótons atingem apenas D₁."
},
{
  "id": "OBFEP-2023-C-14",
  "ano": 2023, "numero": 14, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Física Moderna", "subarea": "Relatividade",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag06_xref78_1330x401.png"], "alternativas": {}},
  "enunciado": "As partículas que vêm do espaço sideral são chamadas de raios cósmicos. Dentre elas, existe o Mésón π. Balões científicos registram que os Mésons π decaem em múons e neutrinos a 9,0 km de altitude, dando origem a múons com velocidade 0,995c (v² ≈ 0,99c²) em relação à Terra. Os múons, por sua vez, decaem em outras partículas, obedecendo à meia-vida de 2,0 μs. Para a relatividade restrita, a meia-vida assumiria o valor de 2 μs se medida em um referencial em que os múons estivessem em repouso. No referencial em que os múons possuem velocidade próxima à da luz, a meia-vida sofreria uma dilatação significativa.\n\nAproximando a velocidade dos múons para a da luz (300.000 km/s) apenas para o cálculo do tempo de movimento dos múons, calcule quantas meias-vidas ocorreram durante esse percurso.\n\nDados: fator de Lorentz γ = 1/√(1 − v²/c²)",
  "opcoes": {
    "a": "1,2",
    "b": "1,5",
    "c": "2,0",
    "d": "1,8"
  },
  "gabarito": "b",
  "resolucao": "Fator de Lorentz: γ = 1/√(1 − 0,99) = 1/√0,01 = 1/0,1 = 10. Tempo no referencial da Terra: t = 9.000 m / (3×10⁸ m/s) = 3×10⁻⁵ s = 30 μs. Meia-vida dilatada (no referencial da Terra): T₁/₂_dilatada = γ × T₁/₂_própria = 10 × 2 μs = 20 μs. Número de meias-vidas = 30 μs / 20 μs = 1,5."
},
{
  "id": "OBFEP-2023-C-15",
  "ano": 2023, "numero": 15, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Física Moderna", "subarea": "Física Quântica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag06_xref80_340x643.png"], "alternativas": {}},
  "enunciado": "No início do século XX, nascia a discussão sobre a dualidade da luz. Em 1923, Arthur Compton direcionou um raio X com frequência 3,0×10²⁰ Hz para uma amostra de grafite. Ele notou que elétrons eram retirados do grafite com 80% da velocidade da luz (β = 4/5 e γ = 5/3) ao mesmo tempo que um novo raio X emergia da amostra formando um ângulo reto com a direção dos elétrons retirados.\n\nCompton baseou-se nos fundamentos usados por Einstein: a energia de um fóton é E = h·f, onde f é sua frequência e h = 6×10⁻³⁴ J·s; a quantidade de movimento dos fótons é q = E/c; a quantidade de movimento de partículas relativísticas é q = γ·m₀·v, onde m₀ é a massa de repouso.\n\nSabendo que a massa de repouso do elétron é 9×10⁻³¹ kg e que a velocidade da luz mede 3×10⁸ m/s, determine a frequência do raio X emergente.\n\nNota: todos os valores foram alterados para que as contas fossem compatíveis com essa prova.",
  "opcoes": {
    "a": "3,2×10²⁰ Hz",
    "b": "2,4×10²⁰ Hz",
    "c": "3,6×10²⁰ Hz",
    "d": "1,8×10²⁰ Hz"
  },
  "gabarito": "b",
  "resolucao": "Como o fóton espalhado e o elétron são perpendiculares entre si, pela conservação vetorial do momento: p₀² = p₁² + p_e² (Pitágoras). p₀ = hf₀/c = (6×10⁻³⁴ × 3×10²⁰)/(3×10⁸) = 6×10⁻²² kg·m/s. p_e = γm₀v = (5/3)(9×10⁻³¹)(0,8 × 3×10⁸) = (5/3)(9×10⁻³¹)(2,4×10⁸) = 3,6×10⁻²² kg·m/s. p₁² = (6×10⁻²²)² − (3,6×10⁻²²)² = 10⁻⁴⁴(36 − 12,96) = 23,04×10⁻⁴⁴ → p₁ = 4,8×10⁻²² kg·m/s. f₁ = p₁·c/h = (4,8×10⁻²² × 3×10⁸)/(6×10⁻³⁴) = 2,4×10²⁰ Hz."
},
]

data['banco_questoes'].extend(questoes)

with open('banco-questoes/fisica_ufrgs.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Total: {len(data['banco_questoes'])} questões")
