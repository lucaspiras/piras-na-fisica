#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Adiciona OBFEP 2024 Nível A (15 questões) ao banco de questões."""
import json, pathlib

JSON = pathlib.Path('banco-questoes/fisica_ufrgs.json')
IMG  = 'obfep/2024/A-F1'

nivel_a = [
  {
    "id": "OBFEP-2024-A-01",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "A", "fase": 1,
    "numero": 1, "tipo_questao": "multipla_escolha",
    "area": "Astronomia", "subarea": "Fases da Lua e eclipses",
    "tags": [], "imagens": {},
    "enunciado": "Quando os centros da Terra, da Lua e do Sol encontram-se em uma mesma linha, estando a Lua entre os outros dois astros, pode ocorrer dois tipos de eclipses solares para uma pessoa que esteja nessa mesma linha: o anular e o total. Essa diferença existe porque a Lua não descreve uma órbita regular em torno da Terra. Sabemos também que a Lua está se afastando da Terra. Em uma realidade alternativa, a distância média da Lua à Terra é o dobro da nossa realidade. Considerando que a luz segue sempre em linha reta, podemos afirmar que, nessa realidade alternativa:",
    "opcoes": {
      "a": "A frequência que ocorre eclipse solar anular é maior que na nossa realidade.",
      "b": "A frequência que ocorre eclipse solar total é maior que na nossa realidade.",
      "c": "A sombra da Lua pode cobrir toda a Terra.",
      "d": "Não existe eclipse solar."
    },
    "gabarito": "a",
    "resolucao": "Com a Lua ao dobro da distância, ela aparece com metade do diâmetro angular do Sol. Assim, nunca cobrirá completamente o disco solar → eclipses totais deixam de existir e todos os eclipses passam a ser anulares. A frequência de eclipses anulares é portanto maior que na nossa realidade."
  },
  {
    "id": "OBFEP-2024-A-02",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "A", "fase": 1,
    "numero": 2, "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Cinemática",
    "tags": [], "imagens": {},
    "enunciado": "O planeta Terra sofre rotação e translação em torno do Sol. Em uma realidade alternativa, a única diferença na formação do planeta Terra é que ele se consolidou sem rotação em torno de um eixo passando pelo seu centro. Sobre essas realidades, identifique a alternativa correta.",
    "opcoes": {
      "a": "Na realidade alternativa, não existe diferença entre o período de um dia completo e o ano.",
      "b": "Na realidade alternativa, a linha do Equador pode ser definida usando o mesmo critério de nossa realidade.",
      "c": "Não existe grande diferença nas condições de sobrevivência para a flora e a fauna entre essas realidades.",
      "d": "Não existiria grande diferença no regime de chuvas no decorrer do ano entre essas realidades."
    },
    "gabarito": "a",
    "resolucao": "Sem rotação sideral própria, a Terra ainda 'roda' uma vez por ano em relação ao Sol devido à translação. O período do dia solar (ciclo dia/noite) passa a ser igual ao período de translação (1 ano). As demais alternativas são falsas: sem polos de rotação, não há equador geográfico pelo critério usual; as condições de sobrevivência são radicalmente diferentes (um hemisfério permanentemente voltado ao Sol); e o regime de chuvas seria completamente diferente."
  },
  {
    "id": "OBFEP-2024-A-03",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "A", "fase": 1,
    "numero": 3, "tipo_questao": "multipla_escolha",
    "area": "Astronomia", "subarea": "Fases da Lua e eclipses",
    "tags": [], "imagens": {},
    "enunciado": "Na nossa realidade, o período de translação da Lua é 29,5 dias, igual ao seu período de rotação. Em uma realidade alternativa, a Lua está mais próxima da Terra, tem período de translação igual a 1 dia e o de sua rotação mede 1 ano. Qual a alternativa FALSA sobre como a Lua é vista pelas pessoas que estão na superfície da Terra nessa nova realidade?",
    "opcoes": {
      "a": "Em cada dia, a face da Lua voltada para a Terra está um pouco diferente.",
      "b": "A posição da Lua em relação ao horizonte não muda.",
      "c": "Para quem consegue ver a Lua-cheia, as fases da Lua mudam durante um dia.",
      "d": "A Lua não poderá ser vista durante o dia claro."
    },
    "gabarito": "d",
    "resolucao": "Com período de translação = 1 dia (mesmo que a rotação da Terra), a Lua é geoestacionária: sua posição no horizonte não muda (b verdadeiro). Sua rotação anual faz a face visível variar levemente a cada dia (a verdadeiro). Como a Lua orbita a Terra em 1 dia, as fases se completam em 1 dia para quem vê a Lua cheia (c verdadeiro). A alternativa FALSA é d: como a Lua está fixamente acima do horizonte para quem a vê, ela é visível durante o dia e a noite."
  },
  {
    "id": "OBFEP-2024-A-04",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "A", "fase": 1,
    "numero": 4, "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Atrito",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, as superfícies sólidas não possuem atrito, pois todas são perfeitamente lisas. Identifique a alternativa que certamente NÃO se aplica para essa realidade alternativa devido à ausência de atrito.",
    "opcoes": {
      "a": "Ao pular, as pessoas atingem alturas maiores que o próprio corpo.",
      "b": "A forma de segurar uma caneta ou um lápis não é igual à de nossa realidade.",
      "c": "As pessoas não se movimentam livremente ao andar em um piso horizontal como em nossa realidade.",
      "d": "O movimento de automóveis não poderia ser controlado pelas rodas."
    },
    "gabarito": "a",
    "resolucao": "Sem atrito, não se consegue agarrar objetos (b), não se consegue caminhar (c) e as rodas não tração nem freiam veículos (d) — todas consequências diretas da ausência de atrito. Já atingir alturas maiores que o próprio corpo ao pular é algo que atletas fazem em nossa realidade normal; saltar verticalmente não depende fundamentalmente do atrito, logo (a) não é uma consequência da ausência de atrito."
  },
  {
    "id": "OBFEP-2024-A-05",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "A", "fase": 1,
    "numero": 5, "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Dinâmica",
    "tags": [], "imagens": {"enunciado": [f"{IMG}/pag02_xref39_291x367.png"]},
    "enunciado": "Em uma realidade alternativa, o volume é a medida da inércia. Nessas duas realidades, temos um corpo todo preenchido sobre um skate que parte do repouso em direção a uma bandeira sob ação de uma força constante, conforme imagem. O corpo pode ser constituído por aço ou por madeira. Desprezando qualquer atrito, determine qual a alternativa é a verdadeira quanto ao tempo que o corpo chega na bandeirola.",
    "opcoes": {
      "a": "Na nossa realidade, o corpo chega na bandeirola no mesmo tempo sendo de aço ou de madeira.",
      "b": "Na nossa realidade, se o corpo for de aço, chega mais rápido do que se for de madeira.",
      "c": "Na realidade alternativa, se o corpo for de madeira, chega mais rápido do que se for de aço.",
      "d": "Na realidade alternativa, o corpo chega na bandeirola no mesmo tempo sendo de aço ou de madeira."
    },
    "gabarito": "d",
    "resolucao": "Na nossa realidade (F=ma), aço tem maior massa que madeira para o mesmo volume → menor aceleração → chega mais tarde. Na realidade alternativa, a inércia é o volume. Para corpos de mesmo volume (mesmo corpo, mesma forma), a inércia é igual → mesma aceleração → chegam ao mesmo tempo. Alternativa d é verdadeira."
  },
  {
    "id": "OBFEP-2024-A-06",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "A", "fase": 1,
    "numero": 6, "tipo_questao": "multipla_escolha",
    "area": "Tópicos Especiais", "subarea": "Energia e cotidiano",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, o corpo humano desenvolveu a capacidade de transformar energia luminosa em química, abastecendo diretamente os músculos. Os alimentos seriam processados para as demais funcionalidades e para os músculos quando não houvesse luz. Identifique a alternativa que certamente NÃO se aplica para essa realidade alternativa.",
    "opcoes": {
      "a": "Os primeiros grupos humanos tiveram mais vantagens de permanecer nômades do que virar sedentários.",
      "b": "Existe mais estímulos para usar meios de transporte não motorizados, como bicicleta.",
      "c": "Os seres humanos tendem a desenvolver mais hábitos noturnos do que diurnos.",
      "d": "A humanidade tende a queimar menos combustíveis, o que resultaria em um planeta menos poluído."
    },
    "gabarito": "c",
    "resolucao": "Se os músculos são abastecidos pela luz solar, há grande incentivo a se mover durante o dia (a, b verdadeiras); é natural queimar menos alimentos e combustíveis (d verdadeira). Mas, precisamente porque a luz solar provê energia muscular, os humanos seriam MAIS diurnos — não noturnos. A alternativa c afirma que desenvolveriam mais hábitos noturnos, o que é incorreto nessa realidade."
  },
  {
    "id": "OBFEP-2024-A-07",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "A", "fase": 1,
    "numero": 7, "tipo_questao": "multipla_escolha",
    "area": "Tópicos Especiais", "subarea": "Unidades de medida",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, a Terra gira 4 vezes mais rápida, o dia foi dividido em 10 horas e cada hora foi dividida em 10 minutos. Quantos minutos dessa realidade alternativa corresponde a 18 minutos da nossa realidade?",
    "opcoes": {"a": "8 min", "b": "6 min", "c": "4 min", "d": "5 min"},
    "gabarito": "d",
    "resolucao": "Um dia real na alt = 1/4 do nosso = 1440/4 = 360 minutos reais. Na alt, 1 dia = 100 alt-min. Portanto 1 alt-min = 360/100 = 3,6 min reais. Logo 18 min reais = 18/3,6 = 5 alt-min."
  },
  {
    "id": "OBFEP-2024-A-08",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "A", "fase": 1,
    "numero": 8, "tipo_questao": "multipla_escolha",
    "area": "Termologia", "subarea": "Escalas termométricas",
    "tags": [], "imagens": {"enunciado": [f"{IMG}/pag02_xref41_428x129.png"]},
    "enunciado": "Em uma realidade alternativa, Anders Celsius optou por usar o mercúrio no lugar da água para definir a escala. Uma temperatura de 200 °C na nossa realidade corresponde a que temperatura nessa realidade alternativa? Considere que, em nossa realidade, o mercúrio se solidifica a –40 °C e entra em ebulição a 360 °C.",
    "opcoes": {"a": "50 °C", "b": "60 °C", "c": "70 °C", "d": "80 °C"},
    "gabarito": "b",
    "resolucao": "Na escala alternativa: 0 °Calt = –40 °C (solidificação do Hg) e 100 °Calt = 360 °C (ebulição). Intervalo de 400 °C reais para 100 °Calt → 1 °Calt = 4 °C reais. Conversão: T_alt = (T_real + 40)/4 = (200 + 40)/4 = 60 °Calt."
  },
  {
    "id": "OBFEP-2024-A-09",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "A", "fase": 1,
    "numero": 9, "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Conservação de energia",
    "tags": [], "imagens": {},
    "enunciado": "Um carro elétrico partiu com 2000 J de energia química (útil). Sua bateria descarregou completamente (0 J) e ele parou com 1500 J de energia potencial gravitacional. Durante a subida, foram produzidos 300 J de energia térmica no total. Com base nessa descrição, identifique a lei que não é obedecida nessa realidade alternativa.",
    "opcoes": {
      "a": "Lei da inércia.",
      "b": "Lei fundamental da mecânica.",
      "c": "Lei da ação e reação.",
      "d": "Conservação da energia."
    },
    "gabarito": "d",
    "resolucao": "Balanço de energia: 2000 J iniciais → 1500 J (EP) + 300 J (calor) = 1800 J. Faltam 200 J: o total de saída (1800 J) é menor que o de entrada (2000 J), o que viola a conservação de energia. As leis mecânicas de Newton (a, b, c) não são verificáveis ou questionadas com esses dados."
  },
  {
    "id": "OBFEP-2024-A-10",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "A", "fase": 1,
    "numero": 10, "tipo_questao": "multipla_escolha",
    "area": "Tópicos Especiais", "subarea": "Grandezas físicas",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, todos os objetos são constituídos por pequenos cubos de 2 mm de aresta. Um homem dessa realidade é constituído por 8 milhões desses cubos. Qual o seu volume? (1 milhão de mm³ = 1 litro)",
    "opcoes": {"a": "64 litros", "b": "32 litros", "c": "16 litros", "d": "128 litros"},
    "gabarito": "a",
    "resolucao": "Volume de 1 cubo = (2 mm)³ = 8 mm³. Total = 8.000.000 × 8 = 64.000.000 mm³ = 64 milhões de mm³/1.000.000 = 64 litros."
  },
  {
    "id": "OBFEP-2024-A-11",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "A", "fase": 1,
    "numero": 11, "tipo_questao": "multipla_escolha",
    "area": "Ondas", "subarea": "Intensidade de radiação",
    "tags": [], "imagens": {"enunciado": [f"{IMG}/pag03_xref50_417x229.png"]},
    "enunciado": "Com o Sol no zênite, cada m² na superfície recebe 1300 J/s de energia solar. Em um dia com nuvens, só chegam 300 J/s por m². Em uma realidade alternativa, a radiação solar atravessa a atmosfera e as nuvens sem perda. Durante 1 minuto, qual a quantidade aproximada de energia solar que a piscina (vista de cima, conforme figura) recebe a mais na realidade alternativa em relação à nossa? Use π = 3.",
    "opcoes": {
      "a": "2.240.000 J",
      "b": "1.820.000 J",
      "c": "2.640.000 J",
      "d": "1.320.000 J"
    },
    "gabarito": "d",
    "resolucao": "Energia extra por m² por minuto = (1300 – 300) × 60 = 60.000 J/m². A piscina na figura tem área de 22 m² (retângulo 8×2 m + semicírculo r=2: A = 16 + 3×4/2 = 16 + 6 = 22 m², com π=3). Energia total extra = 60.000 × 22 = 1.320.000 J."
  },
  {
    "id": "OBFEP-2024-A-12",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "A", "fase": 1,
    "numero": 12, "tipo_questao": "multipla_escolha",
    "area": "Cinemática", "subarea": "MRUV",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, as concepções aristotélicas são verdadeiras: os corpos caem em movimento uniforme e a velocidade de queda é proporcional à massa. Uma esfera de chumbo de 1 kg desce em queda-livre por 45 m de altura no mesmo tempo que em nossa realidade. Quanto tempo levará para uma esfera de chumbo de 2 kg cair 120 m nessa realidade alternativa?",
    "opcoes": {"a": "3 s", "b": "4 s", "c": "6 s", "d": "18 s"},
    "gabarito": "b",
    "resolucao": "Em nossa realidade: t = √(2×45/10) = 3 s. Na alt, 1 kg cai 45 m em 3 s (MRU) → v_1 = 45/3 = 15 m/s. Para 2 kg (mesma substância): v_2 = 2v_1 = 30 m/s. Tempo para 120 m: t = 120/30 = 4 s."
  },
  {
    "id": "OBFEP-2024-A-13",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "A", "fase": 1,
    "numero": 13, "tipo_questao": "multipla_escolha",
    "area": "Mecânica dos Fluidos", "subarea": "Pressão atmosférica",
    "tags": [], "imagens": {},
    "enunciado": "Na nossa realidade, a pressão atmosférica p (em cmHg) em função da altitude h (em km) segue p = 76 – 10h + 0,2h². Em uma realidade alternativa, a equação é p = 71 – 80h. Qual a altitude em nossa realidade que tem a mesma pressão atmosférica da altitude de 500 m dessa realidade alternativa?",
    "opcoes": {"a": "6 km", "b": "5 km", "c": "4 km", "d": "3 km"},
    "gabarito": "b",
    "resolucao": "Pressão na alt com h = 0,5 km: p = 71 – 80×0,5 = 71 – 40 = 31 cmHg. Na nossa realidade: 76 – 10h + 0,2h² = 31 → 0,2h² – 10h + 45 = 0 → h² – 50h + 225 = 0 → h = (50 ± 40)/2 → h = 5 km (solução dentro do intervalo 0–8 km)."
  },
  {
    "id": "OBFEP-2024-A-14",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "A", "fase": 1,
    "numero": 14, "tipo_questao": "multipla_escolha",
    "area": "Termologia", "subarea": "Calor específico",
    "tags": [], "imagens": {},
    "enunciado": "Três panelas iguais A, B e C foram colocadas sobre chamas iguais. Dentro: 0,5 kg de água (A), 1 kg de água (B) e 0,5 kg de areia (C), todos a 20 °C. Após alguns minutos atingem T_A, T_B e T_C. O mesmo evento ocorreu em uma realidade alternativa, onde energia térmica e temperatura são grandezas equivalentes. Determine a alternativa correta.",
    "opcoes": {
      "a": "Na nossa realidade, T_A = T_B = T_C.",
      "b": "Na nossa realidade, T_B > T_A > T_C.",
      "c": "Na realidade alternativa, T_A = T_B = T_C.",
      "d": "Na realidade alternativa, T_B > T_A > T_C."
    },
    "gabarito": "c",
    "resolucao": "Em nossa realidade: ΔT = Q/(mc). Com Q igual para todos: T_C > T_A > T_B (c_areia < c_água; B tem o dobro de massa de A). Na realidade alternativa, Q = T (equivalentes) → mesma Q fornecida → mesma temperatura final para todos: T_A = T_B = T_C."
  },
  {
    "id": "OBFEP-2024-A-15",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "A", "fase": 1,
    "numero": 15, "tipo_questao": "multipla_escolha",
    "area": "Física Moderna", "subarea": "Relatividade especial",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, a velocidade da luz é 500 km/h. Um automóvel em repouso mede 4,0 m. De acordo com a Relatividade, qual seria o comprimento desse automóvel se ele atingisse 300 km/h?",
    "opcoes": {"a": "2,4 m", "b": "2,8 m", "c": "3,2 m", "d": "3,6 m"},
    "gabarito": "c",
    "resolucao": "L = L_0 × √(1 – (v/c)²) = 4,0 × √(1 – (300/500)²) = 4,0 × √(1 – 0,36) = 4,0 × √0,64 = 4,0 × 0,8 = 3,2 m."
  }
]

data = json.loads(JSON.read_text(encoding='utf-8'))
data['banco_questoes'].extend(nivel_a)
JSON.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"Total: {len(data['banco_questoes'])} questões")
