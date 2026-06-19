#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Adiciona 20 questoes OBFEP 2025 Nivel B ao banco de questoes."""
import json, pathlib

json_path = pathlib.Path('banco-questoes/fisica_ufrgs.json')
data = json.loads(json_path.read_text(encoding='utf-8'))

IMG = 'obfep/2025/B-F1'

nivel_b = [
  {
    "id": "OBFEP-2025-B-01",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "B", "fase": 1, "numero": 1,
    "tipo_questao": "multipla_escolha",
    "area": "Gravitação", "subarea": "Campo Gravitacional",
    "tags": ["somente para 1ª série", "campo gravitacional", "Lua", "Sol", "fases da Lua"],
    "imagens": {"enunciado": []},
    "enunciado": "Você já ouviu falar de que o seu cabelo cresce de forma diferente a depender da fase da Lua que o corte for realizado? A partir de seus estudos, a Biologia refuta tal conhecimento popular que surgiu provavelmente quando os homens usavam as fases da Lua para controlar o tempo das etapas de plantios. Analisando o problema pela Física, o cabelo não sofre alterações com as fases da Lua porque, em relação ao próprio campo gravitacional da Terra, o campo gravitacional resultante da influência da Lua e do Sol na superfície da Terra é insignificante, mesmo quando assume o valor máximo, na fase de",
    "opcoes": {
      "a": "lua nova.",
      "b": "lua crescente.",
      "c": "lua minguante.",
      "d": "lua cheia."
    },
    "gabarito": "a",
    "resolucao": "Na lua nova, o Sol e a Lua estão alinhados do mesmo lado da Terra, somando seus campos gravitacionais na superfície terrestre. Esse é o momento de maré de sizígia (máxima) — portanto, o campo gravitacional combinado de Lua e Sol sobre a superfície da Terra atinge seu valor máximo na lua nova."
  },
  {
    "id": "OBFEP-2025-B-02",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "B", "fase": 1, "numero": 2,
    "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Dinâmica",
    "tags": ["somente para 1ª série", "força centrípeta", "centrífuga", "inércia"],
    "imagens": {"enunciado": [f"{IMG}/pag01_xref383_364x314.jpg"]},
    "enunciado": "Apesar de não ser uma ciência, Práticas de Laboratório é um ponto de interseção de várias ciências. A centrífuga é um bom exemplo de como essa área se relaciona com a Física. Nela, misturas homogêneas são colocadas em ampolas para serem centrifugadas. O resultado é o surgimento de fases bem definidas nas ampolas. O sangue, por exemplo, quando centrifugado, divide-se em duas fases: plasma e células sanguíneas. As ampolas giram com o fundo mais afastado do centro de giro, como na imagem. Sobre o que acontece dentro desse equipamento, determine a alternativa INCORRETA.",
    "opcoes": {
      "a": "As máquinas de lavar roupas usam o mesmo princípio para tirar o excesso de água das roupas.",
      "b": "As partículas com mais massa vão para o fundo, expulsando as mais leves para a boca da ampola.",
      "c": "A lei da inércia revela que a amostra não sofre força para acompanhar o movimento da centrífuga.",
      "d": "O fundo da ampola exerce força na mistura para ela descrever o movimento circular."
    },
    "gabarito": "c",
    "resolucao": "A alternativa c) é INCORRETA: para que a amostra descreva movimento circular junto com a ampola, ela PRECISA receber força centrípeta (exercida pela parede do fundo da ampola). A lei da inércia diz que, sem força, a amostra seguiria em linha reta — não que ela não sofre força."
  },
  {
    "id": "OBFEP-2025-B-03",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "B", "fase": 1, "numero": 3,
    "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Cinemática",
    "tags": ["somente para 1ª série", "velocidade média", "tempo de percurso"],
    "imagens": {"enunciado": [f"{IMG}/pag02_xref9_532x284.jpg"]},
    "enunciado": "A Economia é uma ciência social que estuda como a sociedade se comporta em relação à produção, distribuição e uso de bens e serviços. O movimento do transporte de petróleo é de interesse da economia em âmbito global. Os Estados Unidos, por exemplo, precisam importar petróleo para abastecer seu mercado interno. Seu maior fornecedor é a Arábia Saudita. Existem duas rotas para esse transporte, o que pode ser visualizado no mapa ao lado. Um petroleiro desenvolve uma velocidade média de 5 m/s percorrendo os 16 mil km da rota 1. Já na rota 2, de 20 mil km, a velocidade média desenvolvida é 8 m/s. Independente do consumo de combustível, a rota que leva menos tempo para percorrer geralmente é a mais interessante para suprir necessidades econômicas imediatas. Dentre os intervalos de tempo de transporte de petróleo usando essas duas rotas, identifique o menor.",
    "opcoes": {
      "a": "2.400.000 s (quase 28 dias)",
      "b": "2.500.000 s (quase 29 dias)",
      "c": "2.600.000 s (um pouco mais que 30 dias)",
      "d": "2.700.000 s (um pouco mais que 31 dias)"
    },
    "gabarito": "b",
    "resolucao": "Rota 1: t = 16.000.000 m / 5 m/s = 3.200.000 s. Rota 2: t = 20.000.000 m / 8 m/s = 2.500.000 s. O menor tempo é o da rota 2: 2.500.000 s ≈ 29 dias."
  },
  {
    "id": "OBFEP-2025-B-04",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "B", "fase": 1, "numero": 4,
    "tipo_questao": "multipla_escolha",
    "area": "Óptica", "subarea": "Lentes",
    "tags": ["somente para 1ª série", "miopia", "lente divergente", "defeitos da visão"],
    "imagens": {"enunciado": []},
    "enunciado": "A Oftalmologia é uma especialidade médica que trata da saúde dos olhos e da visão, relacionando-se com a Física no mecanismo de funcionamento dos olhos e na correção dos defeitos da visão. Digamos que um oftalmologista prescreveu óculos para uma menina com miopia. Sobre essa menina, identifique a alternativa correta.",
    "opcoes": {
      "a": "Sem os óculos, as imagens de objetos distantes são formadas depois da retina.",
      "b": "As lentes dos óculos são convergentes, logo suas bordas são delgadas.",
      "c": "Se o cristalino dessa menina fosse menos convergente ela poderia não ser míope.",
      "d": "Essa menina possui dificuldade de ver nitidamente objetos próximo a ela."
    },
    "gabarito": "c",
    "resolucao": "A miopia ocorre quando o cristalino é excessivamente convergente, formando a imagem de objetos distantes ANTES da retina. Se o cristalino fosse menos convergente, a imagem se formaria mais próxima da retina. A alternativa c) é correta. Óculos para míope usam lentes divergentes (bordas espessas), e a dificuldade da míope é ver objetos DISTANTES, não próximos."
  },
  {
    "id": "OBFEP-2025-B-05",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "B", "fase": 1, "numero": 5,
    "tipo_questao": "multipla_escolha",
    "area": "Termologia", "subarea": "Dilatação Térmica",
    "tags": ["somente para 1ª série", "dilatação volumétrica", "termômetro de mercúrio"],
    "imagens": {"enunciado": [f"{IMG}/pag02_xref5_184x231.jpg"]},
    "enunciado": "Em 1724, Fahrenheit colaborou com a Medicina criando o termômetro de mercúrio. Nesse termômetro, o mercúrio fica em um espaço fechado criado em um recipiente de vidro (corpo do termômetro). Esse espaço era constituído por um reservatório e um filamento conectados, conforme imagem. O mercúrio ocupava totalmente o reservatório e parcialmente, o filamento. Sobre esse termômetro, identifique a alternativa INCORRETA.",
    "opcoes": {
      "a": "O coeficiente de dilatação volumétrica do mercúrio é maior que o do vidro.",
      "b": "O recipiente de vidro era fechado para que o mercúrio não escape.",
      "c": "Nesse termômetro, o nível do mercúrio no filamento indica a temperatura.",
      "d": "O mercúrio, por ser líquido, dilata termicamente e o vidro, por ser sólido, não."
    },
    "gabarito": "d",
    "resolucao": "A alternativa d) é INCORRETA: sólidos também se dilatam termicamente. O vidro se dilata, mas com coeficiente menor que o do mercúrio — é exatamente essa diferença que permite o funcionamento do termômetro (o mercúrio sobe no filamento porque expande mais que o vidro)."
  },
  {
    "id": "OBFEP-2025-B-06",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "B", "fase": 1, "numero": 6,
    "tipo_questao": "multipla_escolha",
    "area": "Termodinâmica", "subarea": "Gás Ideal",
    "tags": ["lei dos gases", "transformação isobárica", "gás ideal"],
    "imagens": {"enunciado": [f"{IMG}/pag02_xref11_219x233.jpg"]},
    "enunciado": "Ao estudar as reações entre substâncias, a Química tem que lidar com pressão, volume e temperatura, grandezas físicas típicas de amostras gasosas. Essa correlação pode ser exemplificada pela reação retratada na figura ao lado. Ela inicia com um pequeno punhado de pó imerso em 3 mol de gás, no interior de um recipiente cujo êmbolo estava a 12 cm de altura. Devido à reação entre o pó e o gás, no final, o pó desaparece e o êmbolo do recipiente atinge 20 cm de altura, conforme imagem ao lado. Sabendo que os valores da temperatura e da pressão, no final, são iguais aos iniciais, qual a quantidade total de gás no final da situação? Considere que os gases são ideais.",
    "opcoes": {
      "a": "4 mol",
      "b": "5 mol",
      "c": "6 mol",
      "d": "8 mol"
    },
    "gabarito": "b",
    "resolucao": "Com P e T constantes, pela lei dos gases ideais: V ∝ n. Então n₂/n₁ = V₂/V₁ = h₂/h₁ = 20/12 = 5/3. Logo n₂ = 3 × 5/3 = 5 mol."
  },
  {
    "id": "OBFEP-2025-B-07",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "B", "fase": 1, "numero": 7,
    "tipo_questao": "multipla_escolha",
    "area": "Termodinâmica", "subarea": "Ciclo de Carnot",
    "tags": ["Carnot", "rendimento", "segunda lei da termodinâmica"],
    "imagens": {"enunciado": []},
    "enunciado": "A Engenharia Mecânica é a área da engenharia que trabalha com máquinas, motores, sistemas mecânicos e dispositivos. O engenheiro mecânico Nicolas Carnot conseguiu compreender qual o ciclo em que um motor térmico deveria trabalhar para que o rendimento seja máximo submetido a duas fontes: uma, quente e outra, fria. Esse saber ajudou os físicos a compreenderem genericamente certos aspectos da dinâmica energética de toda a natureza, dando origem à segunda lei da termodinâmica. Sobre o Ciclo de Carnot e suas aplicações, determine a alternativa INCORRETA.",
    "opcoes": {
      "a": "Um motor térmico não pode ter rendimento de 100%, assim como o zero kelvin não pode ser atingido.",
      "b": "O ciclo de Carnot possui duas transformações adiabáticas intercaladas por duas isotérmicas.",
      "c": "O ciclo de Carnot com fontes nas temperaturas de 100 °C e 400 °C possui um rendimento de 75%.",
      "d": "A fonte fria reduz o desperdício energético na medida que mantém frio o gás na etapa de compressão."
    },
    "gabarito": "c",
    "resolucao": "O rendimento de Carnot é η = 1 − T_fria/T_quente (em kelvin). T_fria = 373 K, T_quente = 673 K → η = 1 − 373/673 ≈ 44,6%. O valor de 75% é INCORRETO. As demais afirmações são verdadeiras."
  },
  {
    "id": "OBFEP-2025-B-08",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "B", "fase": 1, "numero": 8,
    "tipo_questao": "multipla_escolha",
    "area": "Óptica", "subarea": "Propagação Retilínea",
    "tags": ["propagação retilínea", "sombra", "Tales de Mileto", "reversibilidade da luz"],
    "imagens": {"enunciado": []},
    "enunciado": "A Matemática e a Física se entrelaçam de tal forma que é comum encontrarmos pensadores que se destacaram nessas duas áreas. O historiador e biógrafo Plutarco conta que Tales de Mileto, conhecido como geômetra, mediu a altura da Pirâmide de Quéops a partir de conhecimentos da Óptica. Isso é possível porque tais conhecimentos levam à conclusão de que a altura dos corpos e o tamanho de suas sombras, quando iluminados pelo Sol, são diretamente proporcionais. Dos conhecimentos sobre Óptica apresentados nas alternativas abaixo, identifique aquele que NÃO É USADO para concluir a veracidade da proporcionalidade apresentada.",
    "opcoes": {
      "a": "Princípio de propagação retilínea da Luz.",
      "b": "Princípio da reversibilidade da luz.",
      "c": "A sombra é a região que não é atingida diretamente pela luz da fonte.",
      "d": "A luz solar atinge um local da superfície da Terra em forma de raios paralelos."
    },
    "gabarito": "b",
    "resolucao": "A proporcionalidade entre sombra e altura é demonstrada pela propagação retilínea da luz (a), pela definição de sombra como região sem luz direta (c) e pelo paralelismo dos raios solares (d). O princípio da reversibilidade da luz (b) trata de raios percorrendo o mesmo caminho em sentido inverso — não é necessário para estabelecer a proporcionalidade das sombras."
  },
  {
    "id": "OBFEP-2025-B-09",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "B", "fase": 1, "numero": 9,
    "tipo_questao": "multipla_escolha",
    "area": "Termologia", "subarea": "Dilatação Térmica",
    "tags": ["dilatação linear", "trilhos de trem", "coeficiente de dilatação"],
    "imagens": {"enunciado": []},
    "enunciado": "A Engenharia Civil é uma área de conhecimento que se dedica à construção e manutenção de infraestrutura. Por exemplo, uma ferrovia deveria ser constituída por trilhos de aço de 20 m, no estado do Pará, cuja temperatura anual varia de 24 a 32 °C. Com essa pequena variação térmica, os espaços deixados entre trilhos (juntas) para evitar deformações por dilatação térmica não deveriam ter menos que 2 milímetros de extensão. O engenheiro civil responsável por essa ferrovia pensou em aumentar o tamanho das juntas para que os trilhos não fossem danificados em um eventual incêndio. Considerando que um incêndio poderia elevar a temperatura de até 1200 °C e que o coeficiente de dilatação linear do aço é 12×10⁻⁶ °C⁻¹, qual deveria ser o valor aproximado do tamanho mínimo de cada junta para o trilho não deformar em um incêndio?",
    "opcoes": {
      "a": "24 cm",
      "b": "25 cm",
      "c": "27 cm",
      "d": "29 cm"
    },
    "gabarito": "d",
    "resolucao": "Variação de temperatura máxima: ΔT = 1200 − 24 = 1176 °C. Dilatação linear: ΔL = L₀ × α × ΔT = 20 × 12×10⁻⁶ × 1176 ≈ 0,282 m ≈ 28,2 cm. A junta mínima deve ser superior a 28,2 cm, portanto 29 cm (arredondando para a opção segura acima)."
  },
  {
    "id": "OBFEP-2025-B-10",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "B", "fase": 1, "numero": 10,
    "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Estática",
    "tags": ["equilíbrio de torques", "ponto de apoio", "barra"],
    "imagens": {"enunciado": [f"{IMG}/pag03_xref20_640x277.jpg"]},
    "enunciado": "A Educação Física é uma área do conhecimento que estuda a relação entre o corpo humano e as atividades físicas. A Física serve de suporte para vários aspectos que um profissional de Educação Física tem que lidar. Um bom exemplo é a segurança com os equipamentos. A Física explica por que a primeira anilha a ser colocada em uma barra pode produzir um acidente. No exemplo da figura, uma barra de 9 kg, cujas travas ficam a 130 cm uma da outra, é colocada em um suporte de forma simétrica. As hastes do suporte ficam a 70 cm uma da outra. Das anilhas abaixo, qual a mais pesada que não produziria a rotação da barra se colocada da forma apresentada na figura?",
    "opcoes": {
      "a": "A anilha de 10 kg",
      "b": "A anilha de 15 kg",
      "c": "A anilha de 20 kg",
      "d": "A anilha de 25 kg"
    },
    "gabarito": "a",
    "resolucao": "A anilha colocada na extremidade (junto à trava) cria torque em relação à haste mais próxima. A barra (9 kg) age no centro, equilibrando com o torque da anilha. O ponto de pivô é a haste do suporte. Para não girar, o torque estabilizante da barra deve superar o torque desestabilizante da anilha. A anilha máxima que não causa rotação é de 10 kg."
  },
  {
    "id": "OBFEP-2025-B-11",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "B", "fase": 1, "numero": 11,
    "tipo_questao": "multipla_escolha",
    "area": "Óptica", "subarea": "Espelhos Esféricos",
    "tags": ["espelho côncavo", "ampliação", "odontologia", "dioptria"],
    "imagens": {"enunciado": []},
    "enunciado": "A Odontologia é a área da saúde que se dedica a cuidar dos dentes e das estruturas associadas. Como em outras áreas, ela utiliza instrumentos cujo funcionamento se baseia na Física. Um deles é o espelho bucal, usado por todo dentista para observar áreas de difícil visualização. Alguns são côncavos para ver os detalhes bem pequenos. Digamos que um dentista use um espelho bucal de 50 graus (50 dioptrias) para ver um dente a 1 cm do espelho. Qual a ampliação linear transversal do dente promovida por esse espelho, considerando que o dente esteja no eixo principal do espelho.",
    "opcoes": {
      "a": "1,2",
      "b": "1,5",
      "c": "2,0",
      "d": "2,5"
    },
    "gabarito": "c",
    "resolucao": "50 dioptrias → f = 1/50 m = 2 cm. Objeto a p = 1 cm. Equação de Gauss: 1/f = 1/p + 1/p' → 1/2 = 1/1 + 1/p' → 1/p' = −1/2 → p' = −2 cm (imagem virtual). Ampliação: A = −p'/p = −(−2)/1 = 2,0."
  },
  {
    "id": "OBFEP-2025-B-12",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "B", "fase": 1, "numero": 12,
    "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Hidrostática",
    "tags": ["empuxo", "densidade", "flutuação", "salinidade"],
    "imagens": {"enunciado": []},
    "enunciado": "Hidrologia é uma ciência que estuda a água na Terra. Um dos elementos importantes para as pesquisas protagonizadas por essa ciência é a salinidade ou concentração salina. Um hidrólogo improvisou uma maneira para medir a salinidade de um lago nos Andes. Pegou uma lata vazia e colocou areia até que o conjunto tivesse 0,96 kg de massa. A lata tinha 15 cm de altura e 80 cm² de base. Ao deixá-la no lago boiando, 5 cm de sua altura ficaram acima da linha d'água. Se a densidade da água pura é 1 g/cm³, quanto sal existe em cada cm³ de água desse lago? Considere que certa quantidade de água com sal ou pura ocupa o mesmo volume.",
    "opcoes": {
      "a": "0,5 g",
      "b": "0,4 g",
      "c": "0,3 g",
      "d": "0,2 g"
    },
    "gabarito": "d",
    "resolucao": "Volume submerso: V_sub = 10 cm × 80 cm² = 800 cm³. Equilíbrio: ρ_solução × V_sub = massa → ρ = 960/800 = 1,2 g/cm³. Para cada cm³ de solução: 1 g de água + 0,2 g de sal."
  },
  {
    "id": "OBFEP-2025-B-13",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "B", "fase": 1, "numero": 13,
    "tipo_questao": "multipla_escolha",
    "area": "Óptica", "subarea": "Lentes",
    "tags": ["luneta", "lente objetiva", "lente ocular", "ampliação angular"],
    "imagens": {"enunciado": [f"{IMG}/pag04_xref26_1116x238.jpg"]},
    "enunciado": "A luneta é um instrumento da Óptica usado largamente pela Astronomia. Para observar um prédio de 30 m de altura a 1000 m de distância, um menino usa uma luneta que possui duas lentes, a objetiva e a ocular, conforme figura abaixo. A luz que chega do prédio passa pela lente objetiva e forma a imagem 1 com 80 cm de altura a 20 cm da lente ocular. Em seguida, a luz passa pela ocular, formando a imagem observada pelo menino. A ocular é uma lente convergente cuja distância focal mede 30 cm e fica a 20 cm do olho do menino. Para a visão, a noção de altura dos objetos (altura aparente) depende da distância deles até o observador. Podemos considerar que a altura aparente é definida pela razão: (altura real)/(distância até o observador). A imagem do prédio observada pelo menino terá uma altura aparente igual a",
    "opcoes": {
      "a": "100 vezes a altura aparente do prédio quando visto sem luneta.",
      "b": "50 vezes a altura aparente do prédio quando visto sem luneta.",
      "c": "80 vezes a altura aparente do prédio quando visto sem luneta.",
      "d": "120 vezes a altura aparente do prédio quando visto sem luneta."
    },
    "gabarito": "a",
    "resolucao": "A ocular (f=30 cm) recebe a imagem 1 a p=20 cm: 1/30=1/20+1/p' → p'=−60 cm (imagem virtual). Altura da imagem 2: A = 60/20 × 80 cm = 240 cm. Distância ao olho: 60+20=80 cm. Altura aparente com luneta: 240/80 = 3. Sem luneta: 30m/1000m = 0,03. Razão: 3/0,03 = 100 vezes."
  },
  {
    "id": "OBFEP-2025-B-14",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "B", "fase": 1, "numero": 14,
    "tipo_questao": "multipla_escolha",
    "area": "Termodinâmica", "subarea": "Calor",
    "tags": ["intensidade solar", "calor latente", "fusão do gelo"],
    "imagens": {"enunciado": []},
    "enunciado": "A intensidade solar é uma grandeza física que determina a quantidade de energia luminosa emitida pelo Sol, que uma região recebe. Um geógrafo resolveu fazer uma experiência para obter a incidência solar. Colocou um pedaço de gelo em derretimento em uma frigideira preta com a boca voltada para cima. A panela tinha uma boca de 0,08 m² e o pedaço de gelo tinha 75 gramas. Com o Sol a pino, foram necessários 20 minutos para o gelo derreter por completo. Qual a intensidade solar média onde foi realizada a experiência durante a sua realização? Considere que a energia solar que atravessou a boca da frigideira foi totalmente usada para derreter o gelo. Dados: calor latente de fusão do gelo = 80 cal/g; 1 cal ≈ 4 J.",
    "opcoes": {
      "a": "100 W/m²",
      "b": "150 W/m²",
      "c": "200 W/m²",
      "d": "250 W/m²"
    },
    "gabarito": "d",
    "resolucao": "Calor para fundir: Q = 75 × 80 × 4 = 24.000 J. Tempo: t = 20 min = 1200 s. Área: A = 0,08 m². Intensidade: I = Q/(A×t) = 24.000/(0,08×1200) = 250 W/m²."
  },
  {
    "id": "OBFEP-2025-B-15",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "B", "fase": 1, "numero": 15,
    "tipo_questao": "multipla_escolha",
    "area": "Termologia", "subarea": "Calorimetria",
    "tags": ["combustão", "calor específico", "calorimetria", "butano"],
    "imagens": {"enunciado": []},
    "enunciado": "A equação 2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O trata de uma reação muito utilizada na Química: a combustão completa do gás de cozinha (butano). Para queimar 30 g de gás de cozinha, são necessários cerca de 108 g de gás oxigênio. São liberadas 12 mil calorias de calor com a queima de 1 g de butano. Uma panela com 3 kg de água estava sendo aquecida pela queima de gás de cozinha liberado por uma boca de fogão. Se 75% do calor gerado é absorvido pela água, quanto oxigênio deve ser consumido para que essa porção de água seja aquecida de 10 °C até 70 °C? Dados: calor específico da água = 1 cal/g°C.",
    "opcoes": {
      "a": "72 g",
      "b": "81 g",
      "c": "78 g",
      "d": "96 g"
    },
    "gabarito": "a",
    "resolucao": "Calor absorvido pela água: Q_água = 3000 g × 1 × 60 = 180.000 cal. Calor total gerado: Q_total = 180.000/0,75 = 240.000 cal. Massa de butano queimada: m = 240.000/12.000 = 20 g. Massa de O₂: 20 × (108/30) = 72 g."
  },
  {
    "id": "OBFEP-2025-B-16",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "B", "fase": 1, "numero": 16,
    "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Quantidade de Movimento",
    "tags": ["pêndulo balístico", "conservação do momento linear", "colisão perfeitamente inelástica"],
    "imagens": {"enunciado": []},
    "enunciado": "A Balística é considerada a ciência que estuda o movimento dos projéteis, necessitando de técnicas e conhecimento da Física e da Química em seus estudos. Uma das técnicas consegue determinar a velocidade com que um projétil sai de uma arma. A técnica consiste em disparar a arma na horizontal com um bloco de madeira logo à frente, pendurado por fios. O projétil se aloja no bloco, dando-lhe movimento. Guiado pelos fios, o bloco se comporta como um pêndulo. O experimentador mede a diferença entre a altura máxima e a mínima do movimento do bloco. Digamos que essa técnica seja usada com um projétil de 160 g e um bloco de 23,84 kg. Considerando g = 10 m/s², qual a velocidade que esse projétil é disparado se a diferença entre a altura máxima e mínima do bloco com o projétil medisse 20 cm?",
    "opcoes": {
      "a": "200 m/s",
      "b": "250 m/s",
      "c": "300 m/s",
      "d": "320 m/s"
    },
    "gabarito": "c",
    "resolucao": "Velocidade do conjunto logo após a colisão: v₁ = √(2gΔh) = √(2×10×0,2) = 2 m/s. Pela conservação do momento: m×v₀ = (m+M)×v₁ → 0,16×v₀ = 24×2 = 48 → v₀ = 300 m/s."
  },
  {
    "id": "OBFEP-2025-B-17",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "B", "fase": 1, "numero": 17,
    "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Cinemática",
    "tags": ["lançamento de projéteis", "alcance máximo", "ângulo de 45°"],
    "imagens": {"enunciado": []},
    "enunciado": "Ao estudar projéteis disparados por canhões, a Balística tem como interesse principal obter o alcance máximo com disparo em solo horizontal. Digamos que um projétil é lançado com velocidade máxima de 400 m/s. O alcance máximo sem a presença do ar seria conseguido quando o ângulo de lançamento fosse 45°, cujos senos e cosseno são aproximadamente iguais a 0,7. Considerando a aceleração da gravidade igual a 10 m/s², determine o alcance máximo sem a presença do ar.",
    "opcoes": {
      "a": "14.220 m",
      "b": "15.680 m",
      "c": "16.760 m",
      "d": "17.540 m"
    },
    "gabarito": "b",
    "resolucao": "Alcance máximo: R = v₀²×sin(2θ)/g = v₀²×2×sin45°×cos45°/g = 400²×2×0,7×0,7/10 = 160.000×0,98/10 = 15.680 m."
  },
  {
    "id": "OBFEP-2025-B-18",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "B", "fase": 1, "numero": 18,
    "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Dinâmica",
    "tags": ["força de atrito", "força de recuo", "canhão", "ângulo mínimo"],
    "imagens": {"enunciado": []},
    "enunciado": "Outra preocupação usual da Balística é a força de recuo da arma ao ser disparada. Se essa força não for compensada, a arma pode se movimentar para trás de forma descontrolada, provocando sérios acidentes. Certo canhão antiaéreo dispara projéteis de 25 kg, levando 0,1 s para sair do repouso e atingir a velocidade máxima de 1000 m/s, ainda no canhão. Esse canhão possui 30 toneladas e seu coeficiente de atrito estático mede 0,9 em solo argiloso. Considerando que a aceleração da gravidade mede 10 m/s², determine, em relação à horizontal, o menor ângulo que esse canhão pode disparar seus projéteis, apoiado em solo horizontal argiloso, sem que deslize. Dica: o peso do projétil é desprezível em relação à força do disparo.",
    "opcoes": {
      "a": "60° (cosseno = 0,5 e seno ≅ 0,9)",
      "b": "45° (cosseno ≅ 0,7 e seno ≅ 0,7)",
      "c": "30° (cosseno ≅ 0,9 e seno = 0,5)",
      "d": "0° (cosseno = 1 e seno = 0)"
    },
    "gabarito": "d",
    "resolucao": "Força de disparo: F = m×Δv/Δt = 25×1000/0,1 = 250.000 N. Ao disparar no ângulo θ, a componente horizontal do recuo é F×cosθ e a vertical (para baixo) é F×senθ. Normal: N = Mg+F×senθ = 300.000+250.000×senθ. Condição para não deslizar: F×cosθ ≤ μN. Em θ=0°: 250.000 ≤ 0,9×300.000 = 270.000 ✓. Portanto, o menor ângulo possível é 0°."
  },
  {
    "id": "OBFEP-2025-B-19",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "B", "fase": 1, "numero": 19,
    "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Hidrostática",
    "tags": ["pressão hidrostática", "submarino", "escotilha", "força de pressão"],
    "imagens": {"enunciado": []},
    "enunciado": "A Engenharia Naval é uma área da engenharia que se dedica a embarcações e estruturas marítimas. A Física auxilia essa engenharia em muitos aspectos. Por exemplo, a Física permite definir os critérios para o suporte de uma escotilha (janela de observação subaquática) de um submarino. O submarino brasileiro Amazônia Azul pode mergulhar até 250 m de profundidade e possui escotilhas de 0,3 m². Considerando que a densidade da água do mar é 1000 kg/m³, a aceleração da gravidade mede 10 m/s² e o ar no interior do submarino é mantido a 1 atm, determine a força que o suporte de uma escotilha deve neutralizar.",
    "opcoes": {
      "a": "750 mil newtons",
      "b": "700 mil newtons",
      "c": "650 mil newtons",
      "d": "600 mil newtons"
    },
    "gabarito": "a",
    "resolucao": "Pressão hidrostática a 250 m: ΔP = ρgh = 1000×10×250 = 2.500.000 Pa. Força na escotilha: F = ΔP×A = 2.500.000×0,3 = 750.000 N = 750 mil newtons."
  },
  {
    "id": "OBFEP-2025-B-20",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "B", "fase": 1, "numero": 20,
    "tipo_questao": "multipla_escolha",
    "area": "Termodinâmica", "subarea": "Condução Térmica",
    "tags": ["condutividade térmica", "fluxo de calor", "geladeira", "isolamento térmico"],
    "imagens": {"enunciado": []},
    "enunciado": "A tecnologia é um conjunto de técnicas e de conhecimentos de várias ciências que permitem melhorar a vida das pessoas. Um dos frutos da tecnologia que teve influência direta da Física foi a geladeira. Além do sistema de resfriamento, a geladeira possui um excelente isolamento térmico, conseguindo manter o ambiente interno mais frio que o externo. Digamos que as paredes de uma geladeira sejam preenchidas com uma camada de 3 cm de poliuretano (condutividade térmica = 0,02 W/mK), sendo esta, a única camada isolante. O compressor dessa geladeira desliga quando atinge 2 °C e liga quando atinge 5 °C. Sabendo que a área total das paredes dessa geladeira mede 5 m², qual o fluxo térmico que chega do meio externo quando a temperatura do seu interior está em 3 °C e o ambiente externo está em 21 °C?",
    "opcoes": {
      "a": "50 W",
      "b": "60 W",
      "c": "40 W",
      "d": "80 W"
    },
    "gabarito": "b",
    "resolucao": "Fluxo térmico por condução: φ = λ×A×ΔT/L = 0,02×5×(21−3)/0,03 = 0,02×5×600 = 60 W."
  }
]

# Append to JSON
data['banco_questoes'].extend(nivel_b)
json_path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"OK — adicionadas {len(nivel_b)} questoes. Total: {len(data['banco_questoes'])}")
