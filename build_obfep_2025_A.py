#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Adiciona 15 questoes OBFEP 2025 Nivel A ao banco de questoes."""
import json, pathlib

json_path = pathlib.Path('banco-questoes/fisica_ufrgs.json')
data = json.loads(json_path.read_text(encoding='utf-8'))

IMG = 'obfep/2025/A-F1'

nivel_a = [
  {
    "id": "OBFEP-2025-A-01",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "A", "fase": 1, "numero": 1,
    "tipo_questao": "multipla_escolha",
    "area": "Tópicos Especiais", "subarea": "História da Física",
    "tags": ["Alexandria", "história da ciência"],
    "imagens": {"enunciado": []},
    "enunciado": "Sabemos que a cultura do Egito antigo é riquíssima, bem como a grega. Essas culturas se cruzaram em diversos momentos da História, mas, nada se compara ao que aconteceu na cidade de Alexandria. Fundada por Alexandre, quando invadiu o Egito, essa cidade nasceu com um espírito unificador, tornando-se um terreno fértil para as mais diversas correntes intelectuais e um exemplo marcante de como o contexto histórico pode interferir no desenvolvimento da Ciência. As alternativas abaixo listam descobertas científicas obtidas por pessoas que estudaram em Alexandria, ainda na Antiguidade. Qual delas podemos considerar que NÃO se relaciona diretamente com a Física?",
    "opcoes": {
      "a": "Bomba d'água em forma de parafuso que transportava água de um local mais baixo até um mais alto.",
      "b": "Para equilibrar uma gangorra, o corpo mais pesado deve estar mais próximo do eixo de rotação.",
      "c": "Ao mergulhar um corpo, a diminuição do seu peso aparente é proporcional ao volume imerso.",
      "d": "Aprofundamento na anatomia humana devido às primeiras dissecações sistemáticas em cadáveres."
    },
    "gabarito": "d",
    "resolucao": "As alternativas a), b) e c) correspondem, respectivamente, ao parafuso de Arquimedes (hidrostática), ao princípio dos torques/alavancas e ao princípio de Arquimedes — todas descobertas de Física. A alternativa d) trata de anatomia humana, área da Biologia/Medicina, sem relação direta com a Física."
  },
  {
    "id": "OBFEP-2025-A-02",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "A", "fase": 1, "numero": 2,
    "tipo_questao": "multipla_escolha",
    "area": "Termologia", "subarea": "Mudanças de Estado",
    "tags": ["ponto de fusão", "metalurgia"],
    "imagens": {"enunciado": []},
    "enunciado": "A Metalurgia é a ciência que estuda metais e ligas metálicas. Sua relação com Termologia é visceral já que a principal técnica de manipulação do metal é a fusão. Digamos que uma mistura de diversos metais tenha sido colocada em um forno especial para se aplicar um processo muito usado em Metalurgia. Com o passar do tempo, escorre dessa mistura o estanho líquido. Após mais um tempo, chega a vez de escorrer o chumbo. Por último, após muito tempo, escorre o ferro. Sobre o processo descrito é INCORRETO afirmar que",
    "opcoes": {
      "a": "a temperatura do forno foi diminuindo com o passar do tempo.",
      "b": "consiste em uma técnica para separar metais diferentes contidos em uma mistura.",
      "c": "o metal de menor ponto de fusão dessa mistura foi o estanho e o de maior, foi o ferro.",
      "d": "esse processo funciona porque cada metal possui um ponto de fusão específico."
    },
    "gabarito": "a",
    "resolucao": "O estanho escorre primeiro (menor ponto de fusão), depois o chumbo e por último o ferro (maior ponto de fusão). Portanto, a temperatura do forno foi AUMENTANDO ao longo do tempo, e não diminuindo. A alternativa a) é INCORRETA."
  },
  {
    "id": "OBFEP-2025-A-03",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "A", "fase": 1, "numero": 3,
    "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Dinâmica",
    "tags": ["força centrípeta", "centrífuga", "inércia"],
    "imagens": {"enunciado": [f"{IMG}/pag01_xref266_299x257.jpg"]},
    "enunciado": "Apesar de não ser uma ciência, Práticas de Laboratório é um ponto de interseção de várias ciências. A centrífuga é um bom exemplo de como essa área se relaciona com a Física. Nela, misturas homogêneas são colocadas em ampolas para serem centrifugadas. O resultado é o surgimento de fases bem definidas nas ampolas. O sangue, por exemplo, quando centrifugado, divide-se em duas fases: plasma e células sanguíneas. As ampolas giram com o fundo mais afastado do centro de giro, como na imagem. Sobre o que acontece dentro desse equipamento, determine a alternativa INCORRETA.",
    "opcoes": {
      "a": "As máquinas de lavar roupas usam o mesmo princípio para tirar o excesso de água das roupas.",
      "b": "As partículas com mais massa vão para o fundo, expulsando as mais leves para a boca da ampola.",
      "c": "As leis de Newton revelam que a amostra não sofre força para acompanhar o movimento da centrífuga.",
      "d": "Se o fundo da ampola fosse frágil, ele arrebentaria porque as partículas tendem a seguir em linha reta."
    },
    "gabarito": "c",
    "resolucao": "A alternativa c) é INCORRETA: para que a amostra descreva movimento circular junto com a ampola, ela PRECISA receber força centrípeta (exercida pela parede do fundo da ampola). As partículas mais densas acumulam-se no fundo por precisarem de mais força para curvar sua trajetória."
  },
  {
    "id": "OBFEP-2025-A-04",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "A", "fase": 1, "numero": 4,
    "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Hidrostática",
    "tags": ["volume", "pressão", "expansão de gás"],
    "imagens": {"enunciado": [f"{IMG}/pag02_xref5_284x236.jpg"]},
    "enunciado": "A Química se interessa pelos processos que transformam algumas substâncias (reagentes) em outras substâncias (produtos). Muitas dessas substâncias aparecem na forma gasosa, exercendo pressão em todo o recipiente que as contém, situação estudada pela Física. Essa correlação pode ser exemplificada pela reação retratada na figura ao lado, onde uma quantidade de pó reage quimicamente com o gás ao seu redor, transformando-se em outros gases. O aumento da quantidade de gás faz a tampa do recipiente subir 400 mm. Se a tampa tinha uma área de 200 cm², qual o aumento do volume total das substâncias contidas nesse recipiente?",
    "opcoes": {
      "a": "0,2 dm³",
      "b": "0,8 dm³",
      "c": "2,0 dm³",
      "d": "8,0 dm³"
    },
    "gabarito": "d",
    "resolucao": "Deslocamento da tampa: 400 mm = 40 cm. Aumento de volume: ΔV = A × Δh = 200 cm² × 40 cm = 8.000 cm³ = 8 dm³."
  },
  {
    "id": "OBFEP-2025-A-05",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "A", "fase": 1, "numero": 5,
    "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Cinemática",
    "tags": ["satélite", "período", "rotação", "translação"],
    "imagens": {"enunciado": []},
    "enunciado": "A Engenharia Aeroespacial é uma área de estudo que se dedica ao projeto, construção e manutenção de espaçonaves, estações espaciais e satélites. Ela necessita de cálculos extremamente precisos e um vasto conhecimento de Física. Um satélite, por exemplo, é um corpo sem sistema de propulsão, deixado em certa altitude para transladar em torno da Terra por vários anos. Para isso acontecer, não pode haver erros na velocidade que deve possuir. Além disso, o satélite possui uma antena parabólica que deve apontar sempre para a Terra, necessitando de um movimento de rotação igualmente preciso. Um satélite que, em uma hora, descreve regularmente um ângulo de 60° em relação ao centro da Terra (translação), precisará completar uma volta em torno de si (rotação) em quantas horas?",
    "opcoes": {
      "a": "4 horas",
      "b": "6 horas",
      "c": "5 horas",
      "d": "8 horas"
    },
    "gabarito": "b",
    "resolucao": "Em 1 hora o satélite percorre 60° na translação. Para completar 360°, serão necessárias 360°/60° = 6 horas. Para a antena sempre apontar para a Terra, o período de rotação deve ser igual ao de translação: 6 horas."
  },
  {
    "id": "OBFEP-2025-A-06",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "A", "fase": 1, "numero": 6,
    "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Cinemática",
    "tags": ["velocidade média", "tempo de percurso", "conversão de unidades"],
    "imagens": {"enunciado": [f"{IMG}/pag02_xref9_555x361.jpg"]},
    "enunciado": "A Economia é uma ciência social que estuda como a sociedade se comporta em relação à produção, distribuição e uso de bens e serviços. O movimento do transporte de petróleo é de interesse da economia em âmbito global. Os Estados Unidos, por exemplo, precisam importar petróleo para abastecer seu mercado interno. A Arábia Saudita é um dos seus fornecedores. Existem duas rotas marítimas entre esses países, o que pode ser visualizado no mapa ao lado. Apesar da rota 2 ser mais curta, nela, um petroleiro não consegue desenvolver uma grande velocidade média, o que faz a viagem demorar mais. Por isso, muitas vezes, a rota 1 é a escolhida, mesmo que o petroleiro gaste mais combustível. Se a rota 1 possui 20 mil km de comprimento e a velocidade média de um petroleiro viajando nela é 8 m/s, quanto tempo leva para ele percorrer essa rota?",
    "opcoes": {
      "a": "2.500.000 s (quase 29 dias)",
      "b": "2.400.000 s (quase 28 dias)",
      "c": "2.600.000 s (praticamente 30 dias)",
      "d": "2.700.000 s (um pouco mais que 31 dias)"
    },
    "gabarito": "a",
    "resolucao": "Distância: 20.000 km = 20.000.000 m. Velocidade: 8 m/s. Tempo: t = d/v = 20.000.000/8 = 2.500.000 s ≈ 28,9 dias."
  },
  {
    "id": "OBFEP-2025-A-07",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "A", "fase": 1, "numero": 7,
    "tipo_questao": "multipla_escolha",
    "area": "Termodinâmica", "subarea": "Energia",
    "tags": ["conservação de energia", "cadeia alimentar", "ecologia"],
    "imagens": {"enunciado": [f"{IMG}/pag02_xref7_532x284.jpg"]},
    "enunciado": "A Ecologia utiliza pirâmides para representar a dinâmica de um ecossistema, como a que vemos na figura ao lado. Essa pirâmide pertence ao ecossistema de uma ilha bem distante de continentes e de outras ilhas. Essa ilha é rica em pés de cenouras, alimento preferido dos coelhos que lá vivem. As cobras caçam os coelhos em suas tocas e as águias se alimentam das cobras. A pirâmide representa a quantidade de energia disponível em cada nível trófico (setores da pirâmide) desse equilibrado ecossistema. Sobre essa pirâmide e o conceito físico de energia, identifique a alternativa correta.",
    "opcoes": {
      "a": "A energia total contida na ilha diminui devido aos processos metabólicos ocorridos nos seres vivos que habitam a ilha.",
      "b": "Os processos metabólicos ajudam a reduzir a energia dos níveis tróficos ao liberar calor e gerar substâncias com menos energia química.",
      "c": "A energia solar é transformada por todos os seres vivos desse ecossistema em energia disponível para realizarem as tarefas habituais.",
      "d": "As fezes e os restos mortais não ajudam a reduzir a quantidade de energia disponível por qualquer nível trófico desse ecossistema."
    },
    "gabarito": "b",
    "resolucao": "O metabolismo converte energia química dos alimentos em trabalho mecânico e calor — o calor dissipado reduz a energia química disponível em cada nível trófico. A alternativa b) está correta. A energia solar é captada apenas pelos produtores (cenouras), não por todos os seres vivos (c) é errada). A energia total do sistema fechado não diminui pela 1ª lei, mas o calor sai para o ambiente (a) é imprecisa)."
  },
  {
    "id": "OBFEP-2025-A-08",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "A", "fase": 1, "numero": 8,
    "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Cinemática",
    "tags": ["período", "ciclo lunar", "contagem de eventos periódicos"],
    "imagens": {"enunciado": []},
    "enunciado": "Você já ouviu falar de que o seu cabelo cresce de forma diferente a depender da fase da Lua que o corte é realizado? A Biologia já estudou inúmeras vezes esse tema, refutando tal conhecimento popular em todos os estudos. Muitos deles usaram os conhecimentos da Física para reforçar essa conclusão ao verificar que as mudanças nos efeitos lunares nos cabelos são insignificantes com a mudança da fase da Lua. É bem provável que esse conhecimento popular tenha nascido quando os homens usavam as fases da Lua para controlar o tempo das etapas de plantios, baseando-se na regularidade da duração do ciclo lunar: 29,5 dias. Notamos que essa crença resistiu ao tempo em alguns grupos humanos. Digamos que, uma família de um desses grupos corte os cabelos das crianças sempre no dia de lua cheia. Quantas vezes as crianças terão seus cabelos cortados durante o ano que inicia quando a Lua está na posição de quarto-crescente? Considere que o ano possui 365 dias.",
    "opcoes": {
      "a": "11 vezes",
      "b": "12 vezes",
      "c": "13 vezes",
      "d": "14 vezes"
    },
    "gabarito": "c",
    "resolucao": "Do quarto-crescente até a primeira lua cheia há 29,5/4 ≈ 7,4 dias. Restam 365 − 7,4 = 357,6 dias, que comportam 357,6/29,5 ≈ 12,1 ciclos completos. Total de luas cheias: 1 + 12 = 13 cortes."
  },
  {
    "id": "OBFEP-2025-A-09",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "A", "fase": 1, "numero": 9,
    "tipo_questao": "multipla_escolha",
    "area": "Termologia", "subarea": "Escalas de Temperatura",
    "tags": ["Fahrenheit", "Celsius", "conversão de temperatura"],
    "imagens": {"enunciado": []},
    "enunciado": "A literatura médica considera que a pessoa está com febre a partir da temperatura de 37,8 °C. Nos Estados Unidos e na Inglaterra, usa-se a temperatura na escala Fahrenheit. O conhecimento popular nesses países considera febre quando o corpo humano atinge temperaturas com três dígitos inteiros, ou seja, valores maiores ou iguais a 100 °F. Apesar do próprio Fahrenheit não ter adotado essa referência para elaborar sua escala, as pessoas costumam usá-la. Vamos verificar se esse conhecimento popular está distante do que é adotado na Medicina. Calcule a temperatura em Celsius que corresponde a 100 °F. Dados: a água congela a 0 °C e a 32 °F e entra em ebulição a 100 °C e 212 °F.",
    "opcoes": {
      "a": "37,0",
      "b": "37,5",
      "c": "37,8",
      "d": "38,0"
    },
    "gabarito": "c",
    "resolucao": "Usando a relação (C/100) = (F − 32)/180: C = (100 − 32) × 100/180 = 68 × 5/9 ≈ 37,78 °C ≈ 37,8 °C. Coincide exatamente com o critério médico."
  },
  {
    "id": "OBFEP-2025-A-10",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "A", "fase": 1, "numero": 10,
    "tipo_questao": "multipla_escolha",
    "area": "Óptica", "subarea": "Óptica Geométrica",
    "tags": ["altura aparente", "percepção visual", "semelhança de triângulos"],
    "imagens": {"enunciado": []},
    "enunciado": "Cada vez mais a Neurociência nos mostra como o cérebro é fascinante. Esse órgão transforma os pulsos nervosos emitidos pelos sensores do corpo em sentidos: visão, audição, tato, olfato e paladar. A visão, por exemplo, é uma interpretação cerebral de pulsos nervosos emitidos pelo olho. Para esse sentido, a noção de altura dos objetos depende da distância deles até o observador, o que faz um lápis próximo aparentemente ser maior que uma montanha muito distante. Podemos considerar que a altura aparente elaborada pelo cérebro é definida pela razão: (altura real)/(distância do observador). Sobre um prédio de 100 m de altura a 400 m de distância e um lápis de 20 cm posicionado verticalmente a 40 cm de distância do mesmo observador, podemos afirmar que, aparentemente, o lápis terá",
    "opcoes": {
      "a": "o dobro do tamanho do prédio.",
      "b": "o triplo do tamanho do prédio.",
      "c": "o mesmo tamanho do prédio.",
      "d": "metade do tamanho do prédio."
    },
    "gabarito": "a",
    "resolucao": "Altura aparente do prédio: 100 m / 400 m = 0,25. Altura aparente do lápis: 0,20 m / 0,40 m = 0,50. Razão: 0,50/0,25 = 2. O lápis parece ter o dobro do tamanho do prédio."
  },
  {
    "id": "OBFEP-2025-A-11",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "A", "fase": 1, "numero": 11,
    "tipo_questao": "multipla_escolha",
    "area": "Tópicos Especiais", "subarea": "Estimativa e Medição",
    "tags": ["área", "mapa quadriculado", "estimativa"],
    "imagens": {"enunciado": [f"{IMG}/pag03_xref16_396x310.jpg"]},
    "enunciado": "A intensidade solar é uma grandeza física que determina a quantidade de energia luminosa emitida pelo Sol, que uma região recebe. Ela é um aspecto do clima de uma região, o qual interfere na dinâmica socioeconômica, sendo, portanto, objeto de estudo da Geografia. Um geógrafo queria estudar uma cidade. Com um equipamento eletrônico, obteve a incidência solar, mas precisava da área ocupada pela cidade para determinar a quantidade de energia solar que ela recebe. Ele conseguiu um mapa, representado na imagem ao lado. A região escura do mapa é a área ocupada pela cidade. Os quadrados da grade quadriculada do mapa possuem lados de 1 km. Determine a alternativa que melhor representa o valor da área ocupada pela cidade.",
    "opcoes": {
      "a": "40 km²",
      "b": "50 km²",
      "c": "60 km²",
      "d": "70 km²"
    },
    "gabarito": "a",
    "resolucao": "Contando os quadrados inteiros e estimando os parciais no mapa quadriculado, a área da região escura totaliza aproximadamente 40 km²."
  },
  {
    "id": "OBFEP-2025-A-12",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "A", "fase": 1, "numero": 12,
    "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Cinemática",
    "tags": ["lançamento de projéteis", "alcance", "função horária"],
    "imagens": {"enunciado": []},
    "enunciado": "A Balística é a ciência que estuda o movimento dos projéteis, vinculando-se diretamente com a Física. A Balística costuma prever a maior distância que um projétil consegue atingir quando retorna ao solo horizontal onde foi disparado por um canhão: alcance máximo. No vácuo, a altura h desse projétil em relação ao solo, medida em metros, mudaria conforme a equação h = 200t – 5t², onde t é o tempo contado em segundos a partir do disparo. Ainda no vácuo, a distância horizontal d entre o projétil e o canhão, medida em metros, mudaria conforme a equação d = 300t. Determine o alcance máximo no vácuo para esse projétil.",
    "opcoes": {
      "a": "6 km",
      "b": "8 km",
      "c": "10 km",
      "d": "12 km"
    },
    "gabarito": "d",
    "resolucao": "O projétil retorna ao solo quando h = 0: 200t − 5t² = 0 → t(200 − 5t) = 0 → t = 40 s. Alcance: d = 300 × 40 = 12.000 m = 12 km."
  },
  {
    "id": "OBFEP-2025-A-13",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "A", "fase": 1, "numero": 13,
    "tipo_questao": "multipla_escolha",
    "area": "Gravitação", "subarea": "Gravitação",
    "tags": ["satélites", "período orbital", "eclipses", "Marte"],
    "imagens": {"enunciado": []},
    "enunciado": "A Astronomia estuda os corpos celestes e os fenômenos que ocorrem fora da atmosfera. Atualmente, sabemos que Marte possui duas luas, Fobos e Deimos, cujos períodos são 7 h e 30 h, respectivamente. Enquanto, na Terra, ocorrem de 2 a 7 eclipses por ano, em Marte, a frequência de eclipses é bem maior, pois suas luas orbitam Marte praticamente no mesmo plano da órbita de Marte em torno do Sol. Considerando que um dia marciano tem uma duração igual ao dia terrestre, determine a alternativa INCORRETA sobre os eclipses marcianos.",
    "opcoes": {
      "a": "Em cada ciclo em torno de Marte, cada satélite promove dois eclipses.",
      "b": "Em um dia marciano, poderá existir mais eclipses do que em um ano terrestre.",
      "c": "Durante um ciclo de Deimos em torno de Marte, Fobos pode promover 4 ou 5 eclipses solares.",
      "d": "No momento que Deimos promove um eclipse solar, Fobos promove um eclipse lunar."
    },
    "gabarito": "d",
    "resolucao": "Fobos e Deimos orbitam independentemente, sem sincronização. Não há razão para que, sempre que Deimos cause um eclipse solar, Fobos esteja na posição de eclipse lunar simultaneamente. A alternativa d) é INCORRETA. As demais são verdadeiras: cada lua faz dois eclipses por ciclo (solar e lunar); Fobos faz 30/7 ≈ 4,3 ciclos por ciclo de Deimos (4 ou 5 eclipses)."
  },
  {
    "id": "OBFEP-2025-A-14",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "A", "fase": 1, "numero": 14,
    "tipo_questao": "multipla_escolha",
    "area": "Óptica", "subarea": "Propagação Retilínea",
    "tags": ["sombra", "semelhança de triângulos", "Tales de Mileto", "pirâmide de Quéops"],
    "imagens": {"enunciado": []},
    "enunciado": "A Geometria e a Física se encontram na Óptica devido ao princípio da propagação retilínea da luz. Plutarco conta que Tales de Mileto mediu a altura da Pirâmide de Quéops adotando que os comprimentos das sombras são diretamente proporcionais às alturas dos respectivos objetos. Na época de Tales, o Egito usava o côvado como unidade de comprimento. A equipe de Tales usou uma haste fincada no solo com 4 côvados de altura. Em um momento do dia que a sombra dessa haste tinha 5 côvados de comprimento, a distância da sombra do vértice superior da pirâmide de Quéops até o centro da sua base media 350 côvados. Sabendo que 1 côvado corresponde a 52 cm, determine a altura da pirâmide de Quéops.",
    "opcoes": {
      "a": "132,4 m",
      "b": "145,6 m",
      "c": "148,2 m",
      "d": "151,4 m"
    },
    "gabarito": "b",
    "resolucao": "Pela proporcionalidade das sombras: h_pirâmide/350 = 4/5 → h = 280 côvados. Convertendo: 280 × 0,52 m = 145,6 m."
  },
  {
    "id": "OBFEP-2025-A-15",
    "ano": 2025, "instituicao": "OBFEP", "nivel": "A", "fase": 1, "numero": 15,
    "tipo_questao": "multipla_escolha",
    "area": "Tópicos Especiais", "subarea": "Geometria Aplicada",
    "tags": ["parábola", "ponto máximo", "ponte"],
    "imagens": {"enunciado": [f"{IMG}/pag04_xref21_399x163.jpg"]},
    "enunciado": "A Engenharia Civil é uma área de conhecimento que se dedica à construção e manutenção de infraestrutura, aplicando usualmente conhecimentos da Física e da Matemática. Um engenheiro civil planejou uma ponte na forma de um arco de parábola cujas coordenadas dos seus pontos obedeciam à equação y = 0,4x – 0,002x² para o plano cartesiano da imagem. Se essa ponte ocupa um vão de 200 metros, qual a altura máxima da ponte, em relação ao solo?",
    "opcoes": {
      "a": "20 m",
      "b": "18 m",
      "c": "24 m",
      "d": "30 m"
    },
    "gabarito": "a",
    "resolucao": "Máximo em dy/dx = 0: 0,4 − 0,004x = 0 → x = 100 m. Altura máxima: y = 0,4(100) − 0,002(100²) = 40 − 20 = 20 m."
  }
]

# Append to JSON
data['banco_questoes'].extend(nivel_a)
json_path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"OK — adicionadas {len(nivel_a)} questoes. Total: {len(data['banco_questoes'])}")
