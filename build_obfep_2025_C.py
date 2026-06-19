#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Adiciona 15 questoes OBFEP 2025 Nivel C ao banco de questoes."""
import json, pathlib

json_path = pathlib.Path('banco-questoes/fisica_ufrgs.json')
data = json.loads(json_path.read_text(encoding='utf-8'))

IMG = 'obfep/2025/C-F1'

nivel_c = [
  {
    "id": "OBFEP-2025-C-01",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "C", "fase": 1, "numero": 1,
    "tipo_questao": "multipla_escolha",
    "area": "Eletromagnetismo", "subarea": "Magnetismo",
    "tags": ["campo magnético terrestre", "polos magnéticos", "declinação magnética", "aurora boreal"],
    "imagens": {"enunciado": []},
    "enunciado": "A Astronomia requisita apoio da Física em muitos aspectos da investigação sobre planetas e galáxias. Um deles é o mapeamento do campo magnético, o qual revela detalhes sobre a estrutura interna dos planetas e a proteção da atmosfera contra o vento solar. Marte, por exemplo, tornou-se um planeta inóspito quando, ao perder seu campo magnético, teve alterações severas na atmosfera. Sobre o magnetismo terrestre, determine a alternativa correta.",
    "opcoes": {
      "a": "O campo magnético da Terra sai dela pelo polo norte geográfico e entra pelo polo sul geográfico.",
      "b": "A inclinação magnética é maior na região da linha do Equador que nos polos geográficos.",
      "c": "As auroras apenas são vistas na região próxima à linha do Equador, onde o campo magnético é máximo.",
      "d": "Se os polos magnéticos terrestres e os geográficos coincidissem, as declinações magnéticas diminuiriam."
    },
    "gabarito": "d",
    "resolucao": "A declinação magnética é o ângulo entre o norte geográfico e o norte magnético. Se os polos coincidissem, essa diferença angular seria zero — as declinações diminuiriam (até zerar). As demais são falsas: o campo sai pelo polo sul geográfico (norte magnético); a inclinação magnética é MÁXIMA nos polos geográficos e mínima no equador; as auroras são vistas perto dos POLOS, não do equador."
  },
  {
    "id": "OBFEP-2025-C-02",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "C", "fase": 1, "numero": 2,
    "tipo_questao": "multipla_escolha",
    "area": "Termodinâmica", "subarea": "Gás Ideal",
    "tags": ["lei dos gases", "transformação isobárica", "gás ideal"],
    "imagens": {"enunciado": [f"{IMG}/pag01_xref272_379x190.jpg"]},
    "enunciado": "Usualmente, a Química tem que lidar com pressão, volume e temperatura, grandezas físicas típicas de amostras gasosas, como na reação representada na figura. Ela inicia com um pequeno punhado de pó imerso em 0,8 mol de gás, no interior de um recipiente cujo êmbolo estava a 8 cm de altura, todos a 300 K. Devido à reação entre essas amostras, o pó vai desaparecendo. No momento que o pó desapareceu por completo, o êmbolo do recipiente estava a 24 cm de altura e o gás atingiu 400 K de temperatura. Sabendo que a pressão final é igual à inicial, qual a quantidade de gás no final da situação?",
    "opcoes": {
      "a": "1,2 mol",
      "b": "1,8 mol",
      "c": "2,0 mol",
      "d": "2,4 mol"
    },
    "gabarito": "b",
    "resolucao": "Com P constante: PV = nRT → V/nT = R/P = cte. Portanto: V₁/(n₁T₁) = V₂/(n₂T₂). n₂ = n₁ × (V₂/V₁) × (T₁/T₂) = 0,8 × (24/8) × (300/400) = 0,8 × 3 × 0,75 = 1,8 mol."
  },
  {
    "id": "OBFEP-2025-C-03",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "C", "fase": 1, "numero": 3,
    "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Cinemática",
    "tags": ["satélite", "GPS", "velocidade orbital", "relatividade"],
    "imagens": {"enunciado": []},
    "enunciado": "A Geotecnologia é um conjunto de técnicas associadas à coleta e ao processamento de dados geográficos. Sua maior conquista foi a criação do sistema GPS, composto por mais de 30 satélites que, em média, possuem órbita de 162 mil km de circunferência e um período de 720 minutos. Entretanto, pequenos erros estavam sendo detectados em todo sistema. Físicos concluíram que esses erros poderiam ser efeitos relativísticos, caso a velocidade do satélite ultrapassasse 0,00100% da velocidade da luz. Em 2006, as correções relativísticas foram implementadas, o que aumentou o nível de precisão e confiança do sistema GPS. Sabendo que a velocidade da luz é c = 300 mil km/s, calcule a velocidade desses satélites em relação à da luz, utilizando os dados oferecidos.",
    "opcoes": {
      "a": "0,00108%",
      "b": "0,00112%",
      "c": "0,00125%",
      "d": "0,00175%"
    },
    "gabarito": "c",
    "resolucao": "Velocidade do satélite: v = C/T = 162.000 km / 720 min = 225 km/min = 3,75 km/s. Em relação à velocidade da luz: (3,75/300.000) × 100% = 0,00125%."
  },
  {
    "id": "OBFEP-2025-C-04",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "C", "fase": 1, "numero": 4,
    "tipo_questao": "multipla_escolha",
    "area": "Eletromagnetismo", "subarea": "Eletricidade",
    "tags": ["resistividade", "geologia", "lei de Ohm", "resistência elétrica"],
    "imagens": {"enunciado": []},
    "enunciado": "A composição do solo é objeto de estudo da Geologia. A medição da resistividade ρ do solo é um dos métodos preferidos para esse fim, pois é barato, rápido e pouco agressivo. O geólogo estabelece uma tensão entre dois eletrodos fincados no solo, mede a corrente gerada e faz uma estimativa da seção transversal pela qual passa essa corrente. Determine, das substâncias abaixo, a que melhor se encaixa para constituir um solo cujos dados obtidos através desse método foram: distância dos eletrodos de 200 m, tensão entre eles de 50 V, corrente elétrica estabelecida de 2×10⁻³ A e seção transversal de 2 m².",
    "opcoes": {
      "a": "Argilas compactas (ρ = 200 Ω.m)",
      "b": "Arenito (ρ = 250 Ω.m)",
      "c": "Areia argilosa (ρ = 400 Ω.m)",
      "d": "Calcários fissurados (ρ = 800 Ω.m)"
    },
    "gabarito": "b",
    "resolucao": "Resistência: R = V/I = 50/(2×10⁻³) = 25.000 Ω. Resistividade: ρ = R×A/L = 25.000 × 2/200 = 250 Ω.m → Arenito."
  },
  {
    "id": "OBFEP-2025-C-05",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "C", "fase": 1, "numero": 5,
    "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Gravitação",
    "tags": ["marés", "força gravitacional", "movimento circular", "inércia"],
    "imagens": {"enunciado": [f"{IMG}/pag02_xref10_274x254.jpg", f"{IMG}/pag02_xref12_270x402.jpg"]},
    "enunciado": "O fenômeno das marés é estudado pela Geografia e explicado pela Física. De forma simplificada, tal fenômeno ocorre porque as águas oceânicas mantêm uma forma 'oval' com duas protuberâncias, A e B, uma mais próxima e outra mais afastada da Lua. A rotação da Terra faz os continentes passarem por essas protuberâncias, alterando regularmente o nível da água nas regiões costeiras. Um dos fatores que mantém essa forma 'oval' é o efeito da inércia em líquidos em movimentos curvos: eles se concentram nas regiões de maior aceleração centrípeta. Tal comportamento pode ser visto quando rotacionamos um balde com água em torno da corda que o sustenta (imagem à esquerda). Identifique a alternativa correta sobre as características geofísicas que se relacionam ao fenômeno das marés para o momento apresentado na imagem à direita.",
    "opcoes": {
      "a": "A rotação da Terra em torno de seu eixo ajuda a manter essa forma 'oval' das águas oceânicas.",
      "b": "Para a translação da Terra, a região B possui maior aceleração centrípeta que as demais.",
      "c": "O Sol produz um campo gravitacional oposto ao da Lua na região A.",
      "d": "O movimento de translação da Terra ajuda a produzir maré-alta na região A."
    },
    "gabarito": "b",
    "resolucao": "A região B (lado oposto à Lua) é a mais afastada do baricentro Terra-Lua, exigindo maior aceleração centrípeta para a translação orbital. A força gravitacional da Lua é menor em B, fazendo a aceleração centrípeta necessária superar a disponível — criando a protuberância tidal. A alternativa b) está correta."
  },
  {
    "id": "OBFEP-2025-C-06",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "C", "fase": 1, "numero": 6,
    "tipo_questao": "multipla_escolha",
    "area": "Termologia", "subarea": "Dilatação Térmica",
    "tags": ["dilatação aparente", "termômetro de mercúrio", "coeficiente de dilatação volumétrica"],
    "imagens": {"enunciado": []},
    "enunciado": "Os termômetros de mercúrio permitiram que a Medicina tivesse precisão na medição da temperatura. Dentro desse termômetro, o mercúrio é colocado em um reservatório e extravasa para um filamento. A coluna de mercúrio no filamento indica a temperatura. O filamento é tão fino que a dilatação dele e do mercúrio dentro dele é insignificante. Dessa forma, o aumento da coluna de mercúrio no filamento corresponde à dilatação aparente do mercúrio contido no reservatório. Digamos que, em um termômetro a 18 °C, 100 mm³ de mercúrio ocupam o reservatório, enquanto 0,1 mm³ encontram-se no filamento, ocupando uma extensão de 2 cm. Se o coeficiente de dilatação aparente do mercúrio nessa situação é 1,5×10⁻⁴ °C⁻¹, determine quantos cm a coluna de mercúrio no filamento deve crescer se uma pessoa com 38 °C usar esse termômetro.",
    "opcoes": {
      "a": "2 cm",
      "b": "4 cm",
      "c": "6 cm",
      "d": "8 cm"
    },
    "gabarito": "c",
    "resolucao": "ΔV_aparente = V_reservatório × γ_ap × ΔT = 100 × 1,5×10⁻⁴ × (38−18) = 100 × 1,5×10⁻⁴ × 20 = 0,3 mm³. Seção transversal do filamento: A = 0,1 mm³/20 mm = 0,005 mm². Crescimento da coluna: ΔL = ΔV/A = 0,3/0,005 = 60 mm = 6 cm."
  },
  {
    "id": "OBFEP-2025-C-07",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "C", "fase": 1, "numero": 7,
    "tipo_questao": "multipla_escolha",
    "area": "Óptica", "subarea": "Propagação Retilínea",
    "tags": ["sombra", "semelhança de triângulos", "Tales de Mileto", "pirâmide de Quéops"],
    "imagens": {"enunciado": []},
    "enunciado": "Assim como outros pensadores, Tales de Mileto dominou a Geometria e a Óptica aproveitando a aproximação natural entre essas áreas. O historiador e biógrafo Plutarco conta que Tales mediu a altura da Pirâmide de Quéops a partir de conhecimentos da Óptica. Uma maneira de fazer isso usaria uma haste fincada no solo com 4 côvados de altura. A pirâmide de Quéops tem uma base quadrada cujos lados medem 440 côvados. Tales esperou o dia que, pela manhã, os raios solares atingiram a região dessa pirâmide vindo exatamente da direção leste. Em um momento desse dia, quando a sombra dessa haste assumisse o tamanho de 5 côvados, a sombra visível dessa pirâmide no solo teria a forma de um triângulo isósceles cuja altura em relação à base mediria 130 côvados. Sabendo que 1 côvado corresponde a 52 cm, calcule a altura dessa pirâmide usando os dados oferecidos e seu conhecimento de Óptica e Geometria.",
    "opcoes": {
      "a": "132,4 m",
      "b": "145,6 m",
      "c": "148,2 m",
      "d": "151,4 m"
    },
    "gabarito": "b",
    "resolucao": "Com raios vindos do leste, a sombra visível a oeste é um triângulo de altura 130 côvados. A distância total da sombra do vértice ao centro da base = metade do lado oeste (220 côvados) + sombra visível (130 côvados) = 350 côvados. Proporção: h_pirâmide/350 = 4/5 → h = 280 côvados = 280 × 0,52 = 145,6 m."
  },
  {
    "id": "OBFEP-2025-C-08",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "C", "fase": 1, "numero": 8,
    "tipo_questao": "multipla_escolha",
    "area": "Termodinâmica", "subarea": "Ciclo de Carnot",
    "tags": ["Carnot", "rendimento", "potência", "motor térmico"],
    "imagens": {"enunciado": []},
    "enunciado": "A Engenharia Mecânica é a área da engenharia que trabalha com máquinas, motores, sistemas e dispositivos mecânicos. O engenheiro mecânico Nicolas Carnot, procurando aumentar o rendimento de motores térmicos, desenvolveu um ciclo cuja generalização dos seus fundamentos colaborou para a descoberta da segunda lei da termodinâmica. Digamos que um motor térmico trabalhasse com uma fonte quente a 500 K e uma fonte fria a 300 K, retirando 50 J da fonte quente por ciclo na frequência de 40 Hz. Qual a potência útil máxima que esse motor pode desenvolver?",
    "opcoes": {
      "a": "600 W",
      "b": "1200 W",
      "c": "800 W",
      "d": "1000 W"
    },
    "gabarito": "c",
    "resolucao": "Rendimento máximo de Carnot: η = 1 − T_fria/T_quente = 1 − 300/500 = 0,4 = 40%. Trabalho por ciclo: W = η × Q_quente = 0,4 × 50 = 20 J. Potência: P = W × f = 20 × 40 = 800 W."
  },
  {
    "id": "OBFEP-2025-C-09",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "C", "fase": 1, "numero": 9,
    "tipo_questao": "multipla_escolha",
    "area": "Eletromagnetismo", "subarea": "Eletricidade",
    "tags": ["campo elétrico", "capacitor", "DNA", "eletroforese", "força elétrica"],
    "imagens": {"enunciado": [f"{IMG}/pag03_xref18_605x268.jpg"]},
    "enunciado": "A Genética é uma área da Biologia que estuda os genes, unidades de informações hereditárias. A eletroforese em gel é uma técnica que organiza os pedaços do DNA por tamanho usando os conhecimentos da Física. Os pedaços de DNA são eletrizados negativamente e abandonados junto à placa negativa de um capacitor plano conectado a uma pilha, conforme figura. Ao fechar o interruptor, começa uma corrida entre os pedaços de DNA que desenvolvem movimentos uniformes quase que instantaneamente. Quanto mais longo, mais lento. Se abrirmos o interruptor quando os primeiros pedaços estiverem perto da placa positiva, os demais estarão espalhados pelo gel em ordem de tamanho na direção do campo elétrico. Sabendo que a razão carga/comprimento é igual para todos os pedaços de DNA, determine a alternativa verdadeira.",
    "opcoes": {
      "a": "Os menores pedaços chegam primeiro porque desenvolvem maiores acelerações durante todo o trajeto.",
      "b": "Todos os pedaços de DNA sofrem força elétrica de mesmo módulo porque o campo elétrico é uniforme.",
      "c": "Quanto maior o pedaço, maior será a força de resistência, mesmo tendo menor velocidade no trajeto.",
      "d": "Os pedaços de DNA seguem o mesmo sentido do campo elétrico produzido pelo capacitor."
    },
    "gabarito": "c",
    "resolucao": "Como q/L = constante, pedaços maiores têm maior carga total → maior força elétrica. Mas pedaços maiores têm maior resistência ao meio mesmo a velocidades menores (maior área de contato). No regime de velocidade terminal (força elétrica = força de resistência), pedaços maiores ficam mais lentos — e a resistência deles é maior que a dos menores, mesmo assim. A alternativa c) é verdadeira."
  },
  {
    "id": "OBFEP-2025-C-10",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "C", "fase": 1, "numero": 10,
    "tipo_questao": "multipla_escolha",
    "area": "Gravitação", "subarea": "Campo Gravitacional",
    "tags": ["campo gravitacional", "Lua", "Terra", "força gravitacional", "lei da gravitação"],
    "imagens": {"enunciado": []},
    "enunciado": "Você já ouviu falar de que o seu cabelo cresce de forma diferente a depender da fase da Lua que o corte é realizado? A Física reforça a conclusão de que isso é falso ao verificar que a influência gravitacional nos cabelos das pessoas é insignificante em relação à da Terra. Simbolizando o raio da Terra pela letra R, a região da superfície da Terra mais próxima da Lua fica a 60R do centro da Lua. Se considerarmos que a massa da Terra é 80 vezes a massa da Lua, o campo gravitacional produzido pela Terra na sua superfície é",
    "opcoes": {
      "a": "4.800 vezes o campo gravitacional máximo produzido pela Lua na superfície da Terra.",
      "b": "144.000 vezes o campo gravitacional máximo produzido pela Lua na superfície da Terra.",
      "c": "140.000 vezes o campo gravitacional máximo produzido pela Lua na superfície da Terra.",
      "d": "288.000 vezes o campo gravitacional máximo produzido pela Lua na superfície da Terra."
    },
    "gabarito": "d",
    "resolucao": "Campo da Terra na superfície: g_T = GM_T/R². Campo da Lua na superfície da Terra: g_L = GM_L/(60R)² = GM_L/3600R². Razão: g_T/g_L = M_T × 3600 / M_L = 80 × 3600 = 288.000."
  },
  {
    "id": "OBFEP-2025-C-11",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "C", "fase": 1, "numero": 11,
    "tipo_questao": "multipla_escolha",
    "area": "Termodinâmica", "subarea": "Calor",
    "tags": ["intensidade solar", "calor latente", "fusão do gelo", "capacidade térmica"],
    "imagens": {"enunciado": []},
    "enunciado": "A Meteorologia estuda o clima, o que inclui a influência do Sol. Para medir a incidência solar de uma região, o meteorologista realizou uma simples experiência da Física. Colocou no chão uma frigideira preta com a boca voltada para cima. A frigideira tinha uma capacidade térmica de 400 J/°C e estava com 20 °C (temperatura ambiente) quando recebeu um pedaço de gelo de 100 gramas em derretimento. A área da boca da frigideira era 0,08 m² e o Sol estava a pino durante a experiência. Passados 2 minutos, a panela e o gelo atingiram o equilíbrio térmico, permanecendo assim até o gelo derreter por completo, 20 minutos depois do gelo ser colocado na frigideira. Sabendo que o calor latente de fusão do gelo é 80 cal/g e que 1 cal equivale a cerca de 4 J, qual a intensidade solar média revelada nessa experiência? Considere que o sistema frigideira+gelo não perdeu calor, apenas recebeu calor do Sol.",
    "opcoes": {
      "a": "250 W/m²",
      "b": "220 W/m²",
      "c": "200 W/m²",
      "d": "180 W/m²"
    },
    "gabarito": "a",
    "resolucao": "Calor para fundir todo o gelo: Q_fusão = 100 × 80 × 4 = 32.000 J. A frigideira resfriou de 20 °C para 0 °C, liberando Q_frigideira = 400 × 20 = 8.000 J internamente. Energia solar necessária: Q_sol = 32.000 − 8.000 = 24.000 J. Tempo total: 20 min = 1200 s. Intensidade: I = Q/(A×t) = 24.000/(0,08×1200) = 250 W/m²."
  },
  {
    "id": "OBFEP-2025-C-12",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "C", "fase": 1, "numero": 12,
    "tipo_questao": "multipla_escolha",
    "area": "Óptica", "subarea": "Lentes",
    "tags": ["luneta", "lente objetiva", "lente ocular", "ampliação angular"],
    "imagens": {"enunciado": [f"{IMG}/pag04_xref24_1044x247.jpg"]},
    "enunciado": "A luneta é um instrumento da Óptica usado largamente pela Astronomia. Para observar um prédio de 30 m de altura a 1000 m de distância, um menino usa uma luneta que possui duas lentes, a objetiva e a ocular, conforme figura abaixo. A luz que chega do prédio passa pela lente objetiva e forma a imagem 1 com 80 cm de altura a 20 cm da lente ocular. Em seguida, a luz passa pela ocular, formando a imagem observada pelo menino. A ocular é uma lente convergente cuja distância focal mede 30 cm e fica a 20 cm do olho do menino. Para a visão, a noção de altura dos objetos (altura aparente) depende da distância deles até o observador. Podemos considerar que a altura aparente é definida pela razão: (altura real)/(distância até o observador). A imagem do prédio observada pelo menino terá uma altura aparente igual a",
    "opcoes": {
      "a": "100 vezes a altura aparente do prédio quando visto sem luneta.",
      "b": "50 vezes a altura aparente do prédio quando visto sem luneta.",
      "c": "80 vezes a altura aparente do prédio quando visto sem luneta.",
      "d": "120 vezes a altura aparente do prédio quando visto sem luneta."
    },
    "gabarito": "a",
    "resolucao": "A ocular (f=30 cm) com objeto a p=20 cm: 1/p'=1/f−1/p=1/30−1/20=−1/60 → p'=−60 cm (imagem virtual). Ampliação da ocular: A_oc = 60/20 = 3. Altura da imagem final: 3×80 = 240 cm, a 80 cm do olho. Altura aparente com luneta: 240/80=3. Sem luneta: 30/1000=0,03. Ampliação: 3/0,03 = 100 vezes."
  },
  {
    "id": "OBFEP-2025-C-13",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "C", "fase": 1, "numero": 13,
    "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Hidrostática",
    "tags": ["empuxo", "densidade", "salinidade", "ppm"],
    "imagens": {"enunciado": []},
    "enunciado": "Hidrologia é uma ciência que estuda a água na Terra. Pesquisas protagonizadas por essa ciência costumam calcular a salinidade ou concentração salina. Essa grandeza é geralmente medida em ppm que significa partes por milhão: quantidade de gramas de sal por cada um milhão de gramas de água. Um hidrólogo improvisou uma maneira para medir a salinidade de um lago nos Andes. Pegou uma lata vazia e colocou areia até que o conjunto tivesse 0,96 kg de massa. A lata tinha 15 cm de altura e 80 cm² de base. Ao deixá-la no lago boiando, 5 cm de sua altura ficaram acima da linha d'água. Se a densidade da água pura é 1 g/cm³, qual a salinidade desse lago? Considere que certa quantidade de água com sal ou pura ocupa o mesmo volume.",
    "opcoes": {
      "a": "200.000 ppm",
      "b": "220.000 ppm",
      "c": "180.000 ppm",
      "d": "250.000 ppm"
    },
    "gabarito": "a",
    "resolucao": "Volume submerso: 10 cm × 80 cm² = 800 cm³. Empuxo = peso: ρ_sol × 800 = 960 g → ρ_sol = 1,2 g/cm³. Em 1 cm³: 1,0 g de água + 0,2 g de sal. Salinidade: 0,2 g sal / 1,0 g água × 10⁶ = 200.000 ppm."
  },
  {
    "id": "OBFEP-2025-C-14",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "C", "fase": 1, "numero": 14,
    "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Cinemática",
    "tags": ["lançamento de projéteis", "alcance máximo", "resistência do ar"],
    "imagens": {"enunciado": []},
    "enunciado": "Ao estudar projéteis disparados por canhões, a Balística tem, como interesse principal, obter o alcance máximo em solo horizontal. Em geral, obtém-se o verdadeiro alcance máximo de um projétil inserindo fatores de correção ao alcance máximo que seria obtido sem a resistência do ar. Digamos que um projétil é lançado com velocidade máxima de 400 m/s por um canhão. O alcance máximo sem a resistência do ar seria conseguido quando o ângulo de lançamento fosse 45°, cujos seno e cosseno são aproximadamente iguais a 0,7. Devido às características do projétil, estima-se que seu verdadeiro alcance máximo será 60% daquele que teria no vácuo. Adotando 10 m/s² como aceleração da gravidade, determine o verdadeiro alcance máximo desse projétil.",
    "opcoes": {
      "a": "9.408 m",
      "b": "7.820 m",
      "c": "8.632 m",
      "d": "6.984 m"
    },
    "gabarito": "a",
    "resolucao": "Alcance no vácuo: R_vácuo = v₀²×2×sen45°×cos45°/g = 400²×2×0,7×0,7/10 = 160.000×0,98/10 = 15.680 m. Verdadeiro alcance: R_real = 0,60 × 15.680 = 9.408 m."
  },
  {
    "id": "OBFEP-2025-C-15",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "C", "fase": 1, "numero": 15,
    "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Quantidade de Movimento",
    "tags": ["pêndulo balístico", "colisão inelástica", "calor gerado", "energia cinética"],
    "imagens": {"enunciado": []},
    "enunciado": "A Balística é considerada a ciência que estuda o movimento dos projéteis, necessitando de técnicas e conhecimento da Física e da Química em seus estudos. Uma das técnicas consegue determinar a velocidade com que um projétil sai de uma arma. A técnica consiste em disparar a arma na horizontal com um bloco de madeira logo à frente, pendurado por fios. O projétil se aloja no bloco, dando-lhe movimento. Guiado pelos fios, o bloco se comporta como um pêndulo. O experimentador mede a diferença entre a altura máxima e a mínima do movimento do bloco. Digamos que essa técnica seja usada com um projétil de 160 g e um bloco de 23,84 kg. Considerando g = 10 m/s², qual a quantidade de calor gerado pela penetração do projétil no bloco se a diferença entre a altura máxima e mínima do bloco com o projétil medisse 20 cm?",
    "opcoes": {
      "a": "8.224 J",
      "b": "6.388 J",
      "c": "4.096 J",
      "d": "7.152 J"
    },
    "gabarito": "d",
    "resolucao": "Velocidade do conjunto após colisão: v₁ = √(2gh) = √(2×10×0,2) = 2 m/s. Velocidade do projétil antes: v₀ = (m+M)×v₁/m = 24×2/0,16 = 300 m/s. EC antes da colisão: ½×0,16×300² = 7.200 J. EP convertida em calor: o conjunto sobe Δh=20 cm, ganhando: (m+M)×g×Δh = 24×10×0,2 = 48 J. Calor gerado: Q = 7.200 − 48 = 7.152 J."
  }
]

# Append to JSON
data['banco_questoes'].extend(nivel_c)
json_path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"OK — adicionadas {len(nivel_c)} questoes. Total: {len(data['banco_questoes'])}")
