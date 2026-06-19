import json

with open('banco-questoes/fisica_ufrgs.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

IMG = 'obfep/2021/B-F1'

questoes = [
{
  "id": "OBFEP-2021-B-01",
  "ano": 2021, "numero": 1, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [f"{IMG}/pag01_xref20_420x430.png"], "alternativas": {}},
  "enunciado": "No século XVIII e XVII a.C., os babilônicos desenvolveram a astronomia matemática. Seu modelo de universo colocava a Terra parada no centro, com o limite sendo uma esfera (o firmamento) onde as estrelas ficavam presas. O firmamento possuía uma velocidade angular um pouco maior que a do Sol e mesmo sentido de movimento, ambos uniformes.\n\nUma determinada estrela que se movimentava no mesmo plano do Sol levava sempre o mesmo intervalo de tempo para cruzar com o Sol. Os astrônomos babilônicos verificaram que esse intervalo é exatamente 365 dias. Com base no modelo geocêntrico e considerando que o Sol se movimenta em um plano perpendicular ao eixo de rotação do firmamento, podemos afirmar que a velocidade angular do firmamento é:",
  "opcoes": {
    "a": "Um pouco menor que 361 °/dia.",
    "b": "Exatamente 361 °/dia.",
    "c": "Um pouco maior que 361 °/dia.",
    "d": "Exatamente 360 °/dia."
  },
  "gabarito": "a",
  "resolucao": "Em 1 dia solar (24 h), o Sol percorre 360°/365 ≈ 0,986°/dia ao longo da eclíptica, além da rotação diária. O firmamento ganha exatamente 360° sobre o Sol em 365 dias. Por definição do dia solar, a Terra gira 360° + (360°/365) ≈ 360,986°/dia em relação às estrelas. Portanto, o firmamento gira um pouco menos que 361°/dia solar — exatamente 360 × (366/365) ≈ 360,986°/dia. Resposta: a)."
},
{
  "id": "OBFEP-2021-B-02",
  "ano": 2021, "numero": 2, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Aristóteles criou uma síntese para os movimentos naturais e forçados. Cada substância primordial (terra, água, ar, fogo) possui um lugar natural. Ao chegar no seu lugar natural, a substância entra em repouso instantaneamente, pois perde o motivo do seu movimento, exceto se existisse um agente externo para forçar o movimento. Os corpos celestes eram feitos de éter.\n\nAbaixo são descritos alguns movimentos:\nI – Uma pedra, quando abandonada do alto de uma torre, cai verticalmente.\nII – Uma bola de boliche movimentando-se sobre um piso horizontal após ser lançada por uma pessoa.\nIII – Bolhas subindo verticalmente após saírem da boca de uma pessoa no fundo de uma piscina.\nIV – Um balão com ar quente subindo verticalmente após perder o contato com o solo.\nV – O constante movimento da Lua.\n\nDois desses movimentos entram em contradição com as regras descritas. Quais?",
  "opcoes": {
    "a": "Os movimentos I e II",
    "b": "Os movimentos III e IV",
    "c": "Os movimentos I e V",
    "d": "Os movimentos II e V"
  },
  "gabarito": "d",
  "resolucao": "II: após o lançamento, o agente externo (pessoa) se vai. Sem motor, o corpo não deveria continuar se movendo horizontalmente. Contradição. V: a Lua, feita de éter, já está em seu lugar natural (orbita). Pelo modelo descrito, deveria repousar ao atingir o lugar natural — mas move-se perpetuamente. Contradição. I e III e IV são consistentes com o modelo aristotélico. Resposta: d)."
},
{
  "id": "OBFEP-2021-B-03",
  "ano": 2021, "numero": 3, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Estática",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Simon Stevin (séc. XVI) propôs uma experiência mental com uma corda de espessura uniforme contornando um plano inclinado apoiada em três polias perfeitas. O trecho AB (altura do plano) é o menor; o trecho AC (comprimento do plano inclinado) é o maior. Stevin concluiu que o 'peso efetivo' do trecho AC (que tende a descer pelo plano) é igual ao peso real do trecho AB.\n\nIsaac Newton reinterpretou essa situação dividindo o peso real do trecho AC em dois vetores: Px (componente na direção do plano) e Py (componente perpendicular ao plano). Determine a proposição FALSA.",
  "opcoes": {
    "a": "O 'peso efetivo' do trecho AC é Px.",
    "b": "Comprimento do trecho AB = Comprimento do trecho AC × sen θ",
    "c": "O peso do trecho AC é anulado pela normal exercida pelo plano.",
    "d": "Como o peso real de cada trecho é proporcional ao seu comprimento e Px = P_AB, então Px = P_AC × sen θ."
  },
  "gabarito": "c",
  "resolucao": "A alternativa c) é FALSA: a normal do plano anula apenas a componente perpendicular Py, não o peso total de AC. O peso total P_AC = Px + Py (vetorialmente). Apenas Py é contrabalançado pela normal; Px não é anulado (é ele que desliza pela inclinação). a) ✓ — O 'peso efetivo' é mesmo Px = P_AC × sen θ = P_AB. b) ✓ — Relação trigonométrica no triângulo do plano inclinado. d) ✓ — Consequência de a)."
},
{
  "id": "OBFEP-2021-B-04",
  "ano": 2021, "numero": 4, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Em 1633, Galileu Galilei dedicou-se a compreender a queda dos corpos usando planos inclinados. Sem velocímetro, ele verificou que os deslocamentos, a partir do abandono, eram diretamente proporcionais ao quadrado do tempo (s ∝ t²). Com base nisso, determine a proposição FALSA.",
  "opcoes": {
    "a": "A velocidade não pode ser proporcional ao tempo e ao deslocamento simultaneamente.",
    "b": "Esse movimento é uniformemente variado já que se encaixa na função horária de espaço desse tipo de movimento.",
    "c": "A velocidade é diretamente proporcional ao deslocamento.",
    "d": "Sem as leis da dinâmica não podemos concluir que esse tipo de movimento será equivalente a uma queda-livre."
  },
  "gabarito": "c",
  "resolucao": "De s = ½at²: v = ds/dt = at → v ∝ t (proporcional ao TEMPO). Assim, t ∝ v, logo s ∝ t² ∝ v² — a velocidade é proporcional a √s, não linearmente proporcional a s. A alternativa c) é FALSA: v ∝ √s, não v ∝ s."
},
{
  "id": "OBFEP-2021-B-05",
  "ano": 2021, "numero": 5, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [f"{IMG}/pag03_xref65_217x217.png"], "alternativas": {}},
  "enunciado": "Em 1656, Cristian Huygens criou a aceleração centrípeta ao investigar por que seu relógio de pêndulo marcava tempos diferentes em lugares diferentes. Sua hipótese era que a aceleração centrípeta produzida pela rotação da Terra diminuía a aceleração de queda dos corpos.\n\nDetermine qual das grandezas abaixo NÃO aumenta ao viajar de Paris (onde o relógio foi construído) para as Guianas (na linha do equador), por causa do movimento de rotação da Terra.",
  "opcoes": {
    "a": "A velocidade angular.",
    "b": "O raio da trajetória.",
    "c": "A velocidade linear.",
    "d": "A aceleração centrípeta."
  },
  "gabarito": "a",
  "resolucao": "A Terra gira como um corpo rígido: ω é o MESMO em qualquer latitude. Viajando de Paris (lat. ~49°N) ao equador (0°): o raio da trajetória circular r aumenta; a velocidade linear v = ωr aumenta; a aceleração centrípeta a_c = ω²r aumenta. Mas a velocidade angular ω não muda (é propriedade global da Terra). Resposta: a)."
},
{
  "id": "OBFEP-2021-B-06",
  "ano": 2021, "numero": 6, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Estática dos Fluidos",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "No século III a.C., Arquimedes verificou que 1,22 kg de ouro em pó equilibravam uma coroa fora da água, mas não dentro da água. Se metade do volume da coroa era de prata e a outra metade era de ouro, quanta massa de ouro em pó deveria ser retirada do prato para equilibrar a coroa, ambos dentro da água?\n\nDados: densidade do ouro = 20,0 kg/L; densidade da prata = 10,5 kg/L; densidade da água = 1,00 kg/L",
  "opcoes": {
    "a": "20 g",
    "b": "30 g",
    "c": "40 g",
    "d": "50 g"
  },
  "gabarito": "a",
  "resolucao": "Volumes iguais de ouro e prata: V_Au = m_Au/20, V_Ag = m_Ag/10,5. Condição V_Au = V_Ag: m_Au/20 = m_Ag/10,5 → m_Au = m_Ag × 40/21. Com m_Au + m_Ag = 1,22 kg: m_Ag × (61/21) = 1,22 → m_Ag = 0,42 kg, m_Au = 0,80 kg. V_coroa = 2 × 0,80/20 = 0,08 L. Peso aparente da coroa na água: (1,22 − 0,08)g = 1,14g. Para equilíbrio: m_ouro_pó − m_ouro_pó/20 = 1,14 → m_ouro_pó × 19/20 = 1,14 → m_ouro_pó = 1,20 kg. Retirar: 1,22 − 1,20 = 0,02 kg = 20 g."
},
{
  "id": "OBFEP-2021-B-07",
  "ano": 2021, "numero": 7, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag03_xref78_468x279.jpg"], "alternativas": {}},
  "enunciado": "João Filoponos (séc. VI) sugeriu que uma flecha subia em linha reta até o momento que a força motriz cedida pelo arco acabava; logo após, caia verticalmente. A Trajetória 1 representa essa descrição. A Trajetória 2 é a parabólica de Galileu.\n\nUma flecha foi lançada com velocidade horizontal de 10 m/s e velocidade vertical de 60 m/s, correspondendo à direção da Trajetória 1. Qual a diferença entre as alturas máximas das duas trajetórias?\n\nDados: g = 10 m/s²",
  "opcoes": {
    "a": "390 m",
    "b": "420 m",
    "c": "480 m",
    "d": "540 m"
  },
  "gabarito": "d",
  "resolucao": "Trajetória 2 (Galileu): h₂ = v_y²/(2g) = 60²/20 = 180 m. Trajetória 1 (Filoponos): a força motriz mantém a flecha em linha reta a velocidade constante (sem desaceleração) até ser esgotada no tempo em que a trajetória galileana completa o voo total: t = 2v_y/g = 12 s. Nesse tempo, a componente vertical percorrida: h₁ = v_y × t = 60 × 12 = 720 m. Diferença: 720 − 180 = 540 m."
},
{
  "id": "OBFEP-2021-B-08",
  "ano": 2021, "numero": 8, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag04_xref81_104x86.png"], "alternativas": {}},
  "enunciado": "Em 1668, John Wallis apresentou a lei da conservação da quantidade de movimento para resolver colisões. Dois carrinhos de carvão A (vazio) e B (com 60 kg de carga) movimentavam-se em sentidos opostos: A a 16 m/s para a direita e B a 4 m/s para a esquerda. Após a colisão, o carrinho A inverteu o sentido e passou a se movimentar com 2 m/s. Determine o módulo da velocidade do carrinho B imediatamente após a colisão.\n\nDados: massa do carrinho de carvão vazio = 120 kg",
  "opcoes": {
    "a": "8 m/s",
    "b": "6 m/s",
    "c": "10 m/s",
    "d": "4 m/s"
  },
  "gabarito": "a",
  "resolucao": "m_A = 120 kg, m_B = 180 kg. Conservação do momento (→ positivo): 120×16 + 180×(−4) = 120×(−2) + 180×v_B'. 1920 − 720 = −240 + 180v_B' → 1200 = −240 + 180v_B' → v_B' = 1440/180 = 8 m/s (no mesmo sentido que B estava movendo inicialmente)."
},
{
  "id": "OBFEP-2021-B-09",
  "ano": 2021, "numero": 9, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Em 1784, George Atwood criou um mecanismo com dois corpos de massas diferentes ligados por um fio em uma polia, onde as forças motoras eram os próprios pesos. Determine o valor da massa do bloco menor que corresponde a uma aceleração de 4 m/s² para os corpos desse mecanismo, considerando que a soma das massas dos dois corpos é 10 kg.\n\nDados: desconsidere atrito; g = 10 m/s²",
  "opcoes": {
    "a": "4 kg",
    "b": "3 kg",
    "c": "2 kg",
    "d": "1 kg"
  },
  "gabarito": "b",
  "resolucao": "Na máquina de Atwood: a = (m_A − m_B)×g / (m_A + m_B). Com m_A + m_B = 10 kg e a = 4 m/s²: (m_A − m_B)×10/10 = 4 → m_A − m_B = 4 kg. Sistema: m_A = 7 kg, m_B = 3 kg. A massa do bloco menor é 3 kg."
},
{
  "id": "OBFEP-2021-B-10",
  "ano": 2021, "numero": 10, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Gravitação",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Newton fundiu a 3ª lei de Kepler, a aceleração centrípeta de Huygens e a lei fundamental da mecânica para criar a lei da gravitação universal. Ele usou a aceleração de queda livre (g = 9,8 m/s²) e a aceleração centrípeta da Lua (a_c = 0,0027 m/s²), com R_Lua = 60 × Raio da Terra.\n\nSobre o relato descrito e as leis de Newton, determine a proposição VERDADEIRA:",
  "opcoes": {
    "a": "Newton fez experimentos precisos para comprovar a hipótese de que a força gravitacional é inversamente proporcional ao quadrado da distância.",
    "b": "A lei fundamental da mecânica trata a relação entre a força e a aceleração centrípeta de forma diferente da relação entre força e a aceleração de queda dos corpos.",
    "c": "Não se pode usar as leis de Kepler para comparar os movimentos da Lua e de um satélite artificial já que tais leis são apenas aplicáveis aos planetas.",
    "d": "O valor da aceleração da gravidade é aproximadamente 60² vezes o valor apresentado para a aceleração centrípeta da Lua, exatamente como prevê as leis de Newton."
  },
  "gabarito": "d",
  "resolucao": "g/a_Lua = 9,8/0,0027 ≈ 3630 ≈ 60² = 3600. Como R_Lua = 60 × R_Terra e a força gravitacional ∝ 1/r², a aceleração cai com o quadrado da distância: g/a_Lua = (R_Lua/R_Terra)² = 60². Isso é exatamente o que a lei da gravitação universal prevê. Proposição d) é verdadeira."
},
{
  "id": "OBFEP-2021-B-11",
  "ano": 2021, "numero": 11, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Estática dos Fluidos",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Em 1643, Torricelli produziu vácuo entornando uma ampola de vidro cheia de mercúrio com a boca mergulhada em mercúrio. O mercúrio desceu deixando 76 cm de coluna acima do nível do recipiente. Esse espaço era vácuo. Qual deveria ser o tamanho da coluna de água formada em uma ampola idêntica trocando mercúrio por água, no mesmo local?\n\nDados: densidade do mercúrio = 13,6 kg/L; densidade da água = 1,00 kg/L. Desconsidere a mudança da água para vapor.",
  "opcoes": {
    "a": "9,8 m",
    "b": "10,0 m",
    "c": "10,2 m",
    "d": "10,3 m"
  },
  "gabarito": "d",
  "resolucao": "A pressão atmosférica suporta a coluna de líquido: P_atm = ρ × g × h. Logo h ∝ 1/ρ. h_água = h_Hg × (ρ_Hg/ρ_água) = 0,76 × 13,6/1,00 = 0,76 × 13,6 = 10,336 m ≈ 10,3 m."
},
{
  "id": "OBFEP-2021-B-12",
  "ano": 2021, "numero": 12, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Termometria",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "O termoscópio de Galileu tem uma esfera oca de ar ligada a um tubo fino imerso em líquido: ao aquecer a esfera, o ar expande e o nível do líquido no tubo desce. O 'termoscópio 2.0' tem a esfera preenchida de líquido: ao aquecer a esfera, o líquido expande e o nível sobe no tubo. Determine a proposição CORRETA.",
  "opcoes": {
    "a": "Como a densidade do líquido é fator significativo para os dois tipos, é melhor usar álcool do que água.",
    "b": "Se existir mudança na pressão atmosférica, a precisão será afetada da mesma forma para os dois tipos.",
    "c": "No termoscópio de Galileu, o nível do líquido desloca mais com a mudança de temperatura, podendo fazer melhores comparações.",
    "d": "Os intervalos de tempo para o nível estabilizar são muito próximos para os dois tipos."
  },
  "gabarito": "c",
  "resolucao": "O gás (ar) tem coeficiente de expansão térmica muito maior que o líquido. No termoscópio de Galileu, a esfera de ar reage mais a variações de temperatura, causando maior deslocamento do nível no tubo. O termoscópio 2.0 depende da expansão do líquido, que é muito menor. Logo, o de Galileu mostra mais deslocamento por grau de variação de temperatura — c) é verdadeira. Obs.: o termoscópio de Galileu também é muito mais sensível a variações de pressão atmosférica (o que é uma desvantagem, tornando b) falsa)."
},
{
  "id": "OBFEP-2021-B-13",
  "ano": 2021, "numero": 13, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Calorimetria",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Em 1761, Joseph Black descobriu o calor latente. Medidas mais precisas verificaram que, para derreter completamente um bloco de gelo a 0°C sem provocar alteração de temperatura depois disso, é necessário misturá-lo a uma porção de água de mesma massa a 80°C. Considerando o calor específico da água igual a 4 J/(g·°C), qual o valor do calor latente de fusão do gelo?",
  "opcoes": {
    "a": "320 J/g",
    "b": "20 J/g",
    "c": "80 J/g",
    "d": "84 J/g"
  },
  "gabarito": "a",
  "resolucao": "Calor cedido pela água: Q_cedido = m × 4 × (80 − 0) = 320m J. Calor recebido pelo gelo (só fusão, sem variação de temperatura): Q_recebido = m × L. Equilíbrio: m × L = 320m → L = 320 J/g."
},
{
  "id": "OBFEP-2021-B-14",
  "ano": 2021, "numero": 14, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Termodinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Em 1798, o Conde Rumford supervisionou a perfuração de cilindros de canhão e notou que o calor produzido pela fricção era imenso e de duração ilimitada — capaz de ferver grandes quantidades de água. Quando cessava a fricção, a broca e o cilindro resfriavam até a temperatura ambiente.\n\nSobre esse fenômeno, determine a proposição FALSA:",
  "opcoes": {
    "a": "Esse fenômeno cria desconfianças a respeito da teoria do calórico, pois, se o calor era uma substância, não poderia ser produzida em larga escala sem uma fonte quente enorme.",
    "b": "Na teoria cinética do calor, a fricção poderia ser compreendida como um processo de transferência do movimento da broca para o movimento invisível dos átomos.",
    "c": "Esse fenômeno valoriza a teoria cinética do calor na medida que aponta para o movimento intenso e de longa duração da broca como a fonte capaz de gerar a imensa quantidade de calor.",
    "d": "Esse fenômeno reforça a teoria do calórico na medida que mostra a transferência do calórico de uma fonte quente para a broca e para o cilindro, enquanto essa fonte quente se resfria."
  },
  "gabarito": "d",
  "resolucao": "A alternativa d) é FALSA: não existe uma 'fonte quente' que se esfrie. O calor é produzido pela fricção de forma aparentemente inesgotável enquanto há movimento — exatamente o que refuta a teoria do calórico (que exigiria uma substância finita). Esse experimento favorece a teoria cinética, não a teoria do calórico."
},
{
  "id": "OBFEP-2021-B-15",
  "ano": 2021, "numero": 15, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Energia",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Hermann Helmholtz (1847) apresentou a conservação geral da energia. Determine a proposição abaixo que apresenta uma quantidade de energia DIFERENTE da energia potencial elástica acumulada por uma mola com k = 21 kN/m comprimida de 40 cm.\n\nDados: equivalente mecânico do calor: 1 cal = 4,2 J; g = 10 m/s²; calor latente de ebulição da água = 540 cal/g; calor específico da água = 1 cal/(g·°C); densidade da água = 1 kg/L",
  "opcoes": {
    "a": "A energia potencial gravitacional de um carrinho de 80 kg a 2,1 m de altura.",
    "b": "A quantidade de calor necessária para transformar em vapor 0,7 g de água a 100°C.",
    "c": "A energia cinética de um cavalo de 840 kg correndo a 7,2 km/h.",
    "d": "A quantidade de calor necessária para aquecer 5 mL de água de 20°C até ferver."
  },
  "gabarito": "b",
  "resolucao": "E_mola = ½kx² = ½ × 21000 × 0,16 = 1680 J. a) E_pot = 80×10×2,1 = 1680 J ✓. b) Q = 0,7×540 = 378 cal = 378×4,2 = 1587,6 J ≠ 1680 J — DIFERENTE. c) v = 7,2/3,6 = 2 m/s; KE = ½×840×4 = 1680 J ✓. d) Q = 5×1×80 = 400 cal = 1680 J ✓. Resposta: b)."
},
{
  "id": "OBFEP-2021-B-16",
  "ano": 2021, "numero": 16, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Termodinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag06_xref87_447x294.png"], "alternativas": {}},
  "enunciado": "Jacques Charles (1787) verificou que o volume de um gás a pressão constante aumenta com a temperatura. Para certo punhado de gás, os valores obedecem ao gráfico: V = 4,0 L a 0°C e V = 5,2 L a 84°C.\n\nLord Kelvin (1848), analisando os trabalhos de Charles, propôs que existe um limite inferior de temperatura: quando uma amostra de gás atingisse volume nulo, sua temperatura seria mínima. Usando os dados do gráfico, determine o valor do limite inferior de temperatura na escala Celsius.",
  "opcoes": {
    "a": "–270 °C",
    "b": "–280 °C",
    "c": "–290 °C",
    "d": "–300 °C"
  },
  "gabarito": "b",
  "resolucao": "Taxa de variação: ΔV/ΔT = (5,2 − 4,0)/(84 − 0) = 1,2/84 = 1/70 L/°C. Para V = 0, partindo de T = 0°C com V = 4,0 L: ΔT = 4,0 / (1/70) = 280°C abaixo de 0°C. Temperatura mínima = −280°C."
},
{
  "id": "OBFEP-2021-B-17",
  "ano": 2021, "numero": 17, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Óptica Geométrica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Al-Hazen (séc. X) encontrou o cristalino no olho humano. Della Porta (1558) comparou o olho humano a uma câmera escura: a retina é onde as imagens são projetadas, a pupila é o orifício. Della Porta notou que um orifício pequeno produz imagem nítida e sutil; um orifício grande produz imagem intensa e pouco nítida. Concluiu que o olho tem um orifício enorme (pupila) — mas as imagens são nítidas.\n\nDetermine a proposição VERDADEIRA.",
  "opcoes": {
    "a": "As imagens produzidas na retina são astigmáticas. A retina emite sinais elétricos e o cérebro corrige a falta de nitidez.",
    "b": "O cristalino converge o feixe luminoso divergente que passa pela pupila para um ponto da retina, permitindo que fontes pontuais gerem imagens pontuais (nítidas) e intensas.",
    "c": "Em um ambiente escuro, a pupila aumenta de tamanho para gerar mais nitidez na imagem e o cristalino fica mais divergente.",
    "d": "O cristalino, por ser uma lente convergente, projeta uma imagem invertida na retina. Se não existisse o cristalino, a imagem seria direita."
  },
  "gabarito": "b",
  "resolucao": "O cristalino é a solução para o paradoxo: apesar da pupila grande (que produziria imagem borrada em uma câmera escura), o cristalino foca cada feixe divergente de uma fonte pontual em um único ponto da retina — produzindo imagem nítida E intensa. b) é verdadeira. c) é falsa: a pupila se dilata para captar mais luz, mas a nitidez é garantida pelo cristalino — que fica mais convergente (não divergente) ao focar objetos próximos."
},
{
  "id": "OBFEP-2021-B-18",
  "ano": 2021, "numero": 18, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Óptica Geométrica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag07_xref93_290x144.jpg", f"{IMG}/pag07_xref95_238x145.jpg", f"{IMG}/pag07_xref97_346x147.png", f"{IMG}/pag07_xref99_194x136.jpg"], "alternativas": {}},
  "enunciado": "Della Porta estudou espelhos côncavos e convexos, preparando o caminho para Johann Gauss analisar esses instrumentos rigorosamente. A imagem apresenta 4 formas de usar espelhos côncavos e convexos:\n1 — Espelhos côncavos concentrando raios solares;\n2 — Antena parabólica côncava com receptor no foco;\n3 — Espelho para maquiagem (objeto próximo);\n4 — Retrovisor de veículo (espelho convexo).\n\nSobre a utilização dos espelhos revelada por cada imagem, determine a proposição FALSA.",
  "opcoes": {
    "a": "1: espelhos côncavos convergindo raios solares para um foco comum. Serve como arma ao aumentar a concentração de calor da luz solar para incendiar barcos.",
    "b": "2: espelho côncavo convergindo ondas eletromagnéticas para o foco principal, onde fica o receptor. Serve para aumentar a intensidade do sinal.",
    "c": "3: espelho convexo produzindo imagem direita, ampliada e virtual de objeto próximo dele. Serve para visualizar detalhes da face.",
    "d": "4: espelho convexo produzindo imagem direita, reduzida e virtual de objetos afastados dele. Serve para ter um campo visual maior que o espelho plano."
  },
  "gabarito": "c",
  "resolucao": "A alternativa c) é FALSA: um espelho CONVEXO SEMPRE produz imagem virtual, direita e DIMINUÍDA, independente da posição do objeto. O espelho que produz imagem ampliada de objetos próximos é o CÔNCAVO (quando o objeto está entre o foco e o vértice). O espelho de maquiagem é côncavo, não convexo."
},
{
  "id": "OBFEP-2021-B-19",
  "ano": 2021, "numero": 19, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Óptica Geométrica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag08_xref103_210x118.png"], "alternativas": {}},
  "enunciado": "Em 1610, Galileu usou uma luneta como instrumento científico. Na figura, duas lentes convergentes e uma caneta (objeto) estão posicionadas para que uma pessoa visualize uma imagem ampliada. A caneta está a 10 cm da lente objetiva; a lente ocular está a 44 cm da lente objetiva; a pessoa observa pela ocular.\n\nDetermine o módulo da ampliação linear transversal total da imagem visualizada pela pessoa. (Condições de Gauss satisfeitas.)\n\nDados: distância focal da lente objetiva = 8 cm; distância focal da lente ocular = 6 cm",
  "opcoes": {
    "a": "5",
    "b": "6",
    "c": "8",
    "d": "12"
  },
  "gabarito": "d",
  "resolucao": "Objetiva (f₁ = 8 cm, d_o = 10 cm): 1/d_i = 1/8 − 1/10 = 1/40 → d_i = 40 cm. m₁ = −d_i/d_o = −4. Imagem a 40 cm da objetiva → 44 − 40 = 4 cm antes da ocular. Ocular (f₂ = 6 cm, d_o = 4 cm): 1/d_i = 1/6 − 1/4 = −1/12 → d_i = −12 cm (virtual). m₂ = −(−12)/4 = 3. Ampliação total: |m₁ × m₂| = |−4 × 3| = 12."
},
{
  "id": "OBFEP-2021-B-20",
  "ano": 2021, "numero": 20, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Refração",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Ptolomeu estudou a refração no séc. II, construindo tabelas de ângulos de incidência e refração para ar→água, ar→vidro e água→vidro. Apenas no séc. XVII, Snell (1621) e Descartes (1637) encontraram a relação entre esses ângulos. Sobre esse fenômeno e suas leis, determine a proposição VERDADEIRA:",
  "opcoes": {
    "a": "O índice de refração da água é maior que o do vidro.",
    "b": "Para um mesmo dioptro, os senos dos ângulos de incidência e de refração são diretamente proporcionais.",
    "c": "Quanto maior o ângulo de incidência, menor é o desvio que a luz sofre ao refratar.",
    "d": "Se o ângulo de incidência for 0°, a luz não sofre refração."
  },
  "gabarito": "b",
  "resolucao": "A lei de Snell-Descartes: n₁ sen θ₁ = n₂ sen θ₂, logo sen θ₁/sen θ₂ = n₂/n₁ = constante. Isso significa que os senos são diretamente proporcionais — b) é VERDADEIRA. a) Falsa: vidro tem índice maior que água. c) Falsa: o desvio geralmente aumenta com o ângulo. d) Falsa: ângulo de incidência 0° → raio passa sem desvio (mas isso é refração sem deflexão, não ausência de refração)."
},
]

data['banco_questoes'].extend(questoes)

with open('banco-questoes/fisica_ufrgs.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Total: {len(data['banco_questoes'])} questoes")
