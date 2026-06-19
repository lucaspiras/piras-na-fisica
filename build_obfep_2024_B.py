#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Adiciona OBFEP 2024 Nível B (20 questões) ao banco de questões."""
import json, pathlib

JSON = pathlib.Path('banco-questoes/fisica_ufrgs.json')
IMG  = 'obfep/2024/B-F1'

nivel_b = [
  {
    "id": "OBFEP-2024-B-01",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "B", "fase": 1,
    "numero": 1, "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Atrito",
    "tags": ["somente para 1ª série"], "imagens": {},
    "enunciado": "Em uma realidade alternativa, as superfícies sólidas não possuem atrito. Identifique a alternativa que certamente NÃO se aplica para essa realidade alternativa devido à ausência de atrito.",
    "opcoes": {
      "a": "Ao pular, as pessoas atingem alturas maiores que o próprio corpo.",
      "b": "A forma de segurar uma caneta ou um lápis não é igual à de nossa realidade.",
      "c": "As pessoas não se movimentam livremente ao andar em um piso horizontal como em nossa realidade.",
      "d": "O movimento de automóveis não poderia ser controlado pelas rodas."
    },
    "gabarito": "a",
    "resolucao": "Idêntica à A.4: saltar verticalmente não depende do atrito (b, c, d são consequências diretas da ausência de atrito; a não é)."
  },
  {
    "id": "OBFEP-2024-B-02",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "B", "fase": 1,
    "numero": 2, "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Conservação de energia",
    "tags": ["somente para 1ª série"], "imagens": {},
    "enunciado": "Em uma realidade alternativa, os ossos são constituídos por material parcialmente elástico que amortece impactos. Uma pessoa de 80 kg caiu de 80 m de altura. Após quicar no solo a primeira vez, subiu até 20 m. Desprezando a influência do ar, qual a quantidade de energia mecânica transformada em térmica na primeira colisão? (g = 10 m/s²)",
    "opcoes": {
      "a": "64.000 J",
      "b": "32.000 J",
      "c": "48.000 J",
      "d": "86.000 J"
    },
    "gabarito": "c",
    "resolucao": "EP antes do impacto: 80×10×80 = 64.000 J. EP após o quique: 80×10×20 = 16.000 J. Energia transformada em calor = 64.000 – 16.000 = 48.000 J."
  },
  {
    "id": "OBFEP-2024-B-03",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "B", "fase": 1,
    "numero": 3, "tipo_questao": "multipla_escolha",
    "area": "Física Moderna", "subarea": "Relatividade especial",
    "tags": ["somente para 1ª série"], "imagens": {},
    "enunciado": "Em uma realidade alternativa, a luz tem velocidade bem menor, fazendo com que o comprimento de um carro assuma o valor de 4,0 m em repouso e 3,2 m quando a 300 km/h. Qual o valor da velocidade da luz nessa realidade alternativa?",
    "opcoes": {"a": "400 km/h", "b": "500 km/h", "c": "600 km/h", "d": "1000 km/h"},
    "gabarito": "b",
    "resolucao": "L = L_0√(1–(v/c)²) → 3,2 = 4,0√(1–(300/c)²) → 0,8 = √(1–(300/c)²) → 0,64 = 1–(300/c)² → (300/c)² = 0,36 → c = 300/0,6 = 500 km/h."
  },
  {
    "id": "OBFEP-2024-B-04",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "B", "fase": 1,
    "numero": 4, "tipo_questao": "multipla_escolha",
    "area": "Termologia", "subarea": "Escalas termométricas",
    "tags": ["somente para 1ª série"], "imagens": {"enunciado": [f"{IMG}/pag02_xref42_295x373.png"]},
    "enunciado": "Em uma realidade alternativa, Anders Celsius usou o mercúrio (solidifica a –40 °C e ferve a 360 °C na nossa realidade) para definir a escala. Uma temperatura de 60 °C nessa realidade alternativa corresponderia a que temperatura na nossa realidade?",
    "opcoes": {"a": "250 °C", "b": "320 °C", "c": "200 °C", "d": "400 °C"},
    "gabarito": "c",
    "resolucao": "T_real = T_alt × 4 + (–40) = 60 × 4 – 40 = 240 – 40 = 200 °C."
  },
  {
    "id": "OBFEP-2024-B-05",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "B", "fase": 1,
    "numero": 5, "tipo_questao": "multipla_escolha",
    "area": "Óptica", "subarea": "Lentes",
    "tags": ["somente para 1ª série"], "imagens": {"enunciado": [f"{IMG}/pag02_xref44_450x210.png"]},
    "enunciado": "O vidro possui índice de refração maior que o da água. Em uma realidade alternativa, o vidro possui índice de refração menor que o da água. Vemos abaixo os perfis de quatro tipos de lentes de vidros mergulhadas em água. Qual a alternativa que indica a classificação dessas lentes nessa realidade alternativa?",
    "opcoes": {
      "a": "divergente: A e C; convergentes: B e D",
      "b": "divergente: C e D; convergentes: A e B",
      "c": "divergente: B e D; convergentes: A e C",
      "d": "divergente: A e B; convergentes: C e D"
    },
    "gabarito": "d",
    "resolucao": "Quando o índice de refração do vidro é menor que o do meio (água), as lentes invertem seu comportamento: lentes biconvexas e convexas (A e B) tornam-se divergentes; lentes bicôncavas e côncavas (C e D) tornam-se convergentes."
  },
  {
    "id": "OBFEP-2024-B-06",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "B", "fase": 1,
    "numero": 6, "tipo_questao": "multipla_escolha",
    "area": "Óptica", "subarea": "Óptica atmosférica",
    "tags": [], "imagens": {"enunciado": [f"{IMG}/pag02_xref46_546x273.png"]},
    "enunciado": "Em uma realidade alternativa, a Terra havia perdido toda a sua atmosfera. Identifique a alternativa que NÃO corresponde a uma característica dessa realidade alternativa que diferencia da nossa para pessoas na superfície da Terra.",
    "opcoes": {
      "a": "A Lua vista permanece com o mesmo tamanho durante a noite de lua cheia.",
      "b": "Uma localidade recebe luz solar por um período diário maior do que na nossa realidade.",
      "c": "Não existe diferença entre Sol real e Sol aparente.",
      "d": "O céu estrelado é visto durante o dia-claro e durante a noite."
    },
    "gabarito": "b",
    "resolucao": "Sem atmosfera: não há refração (Sol real = Sol aparente, c verdadeiro); não há espalhamento de luz (estrelas visíveis de dia, d verdadeiro). Contudo, SEM atmosfera o período de luz solar é MENOR (a refração atmosférica prolonga o dia em nossa realidade). Afirmar que seria MAIOR é incorreto → b não corresponde a uma característica real da alt."
  },
  {
    "id": "OBFEP-2024-B-07",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "B", "fase": 1,
    "numero": 7, "tipo_questao": "multipla_escolha",
    "area": "Óptica", "subarea": "Reflexão e absorção",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, a grande maioria dos corpos sólidos não permite refração da luz, a absorção não é seletiva e 95% da reflexão é regular. Nessa realidade, a superfície da grande maioria dos objetos sólidos, quando iluminados por luz branca, possui uma aparência:",
    "opcoes": {
      "a": "opaca de cor branca.",
      "b": "transparente.",
      "c": "opaca de cor preta.",
      "d": "espelhada."
    },
    "gabarito": "d",
    "resolucao": "Com 95% de reflexão especular (regular) de luz branca e absorção não seletiva (uniforme em todos os comprimentos de onda), a superfície age como um espelho: reflete praticamente toda a luz incidente na mesma direção → aparência espelhada."
  },
  {
    "id": "OBFEP-2024-B-08",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "B", "fase": 1,
    "numero": 8, "tipo_questao": "multipla_escolha",
    "area": "Astronomia", "subarea": "Gravitação",
    "tags": [], "imagens": {"enunciado": [f"{IMG}/pag03_xref52_1271x1126.png"]},
    "enunciado": "Em uma realidade alternativa, na órbita da Terra existe outro planeta igual à Terra desde sua formação. Toda vez que um desses planetas está no afélio, o outro está no periélio, de forma que nunca se encontram. Considerando a situação inicial representada na figura, qual a situação seguinte para esse par de planetas nessa realidade alternativa?",
    "opcoes": {
      "a": "situação A",
      "b": "Situação B",
      "c": "situação C",
      "d": "Situação D"
    },
    "gabarito": "c",
    "resolucao": "Os dois planetas ocupam posições opostas na órbita (separados por 180°) e sempre permanecem assim. Partindo da configuração inicial, após meio período os planetas trocam de posição entre si, o que corresponde à situação C conforme ilustrado."
  },
  {
    "id": "OBFEP-2024-B-09",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "B", "fase": 1,
    "numero": 9, "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Gravitação",
    "tags": [], "imagens": {"enunciado": [f"{IMG}/pag03_xref50_319x393.png"]},
    "enunciado": "Em uma realidade alternativa, um bloco fixado em uma parede produz forças gravitacionais da mesma ordem de grandeza que o peso dos corpos próximos. Uma esfera de 1,6 kg permaneceu parada no ar presa apenas a um fio na horizontal. Calcule o valor da força gravitacional que o bloco produz na esfera. (g = 10 N/kg; sen 53° = 4/5; cos 53° = 3/5)",
    "opcoes": {"a": "12 N", "b": "16 N", "c": "18 N", "d": "20 N"},
    "gabarito": "d",
    "resolucao": "Peso da esfera: P = 1,6 × 10 = 16 N. O fio é horizontal (tensão T horizontal). O bloco atrai a esfera a 53° acima da horizontal. Equilíbrio vertical: F_bloco × sen 53° = P → F_bloco × 4/5 = 16 → F_bloco = 20 N."
  },
  {
    "id": "OBFEP-2024-B-10",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "B", "fase": 1,
    "numero": 10, "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Cinemática",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, a Terra não tem rotação e é habitada por extraterrestres em naves que precisam manter o Sol próximo do zênite. Se o raio da Terra é aproximadamente 6.000 km, qual a velocidade média que esses povos devem desenvolver para nunca deixar de receber energia solar próximo ao zênite? (Dica: faça aproximações em π e na duração do ano.)",
    "opcoes": {"a": "4 km/h.", "b": "5 km/h.", "c": "6 km/h.", "d": "7 km/h."},
    "gabarito": "a",
    "resolucao": "Sem rotação, o Sol completa um ciclo em 1 ano ≈ 8760 h (≈ 9000 h com aproximação). Circunferência ≈ 2×3×6000 = 36.000 km. v = 36.000/8760 ≈ 4,1 km/h ≈ 4 km/h."
  },
  {
    "id": "OBFEP-2024-B-11",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "B", "fase": 1,
    "numero": 11, "tipo_questao": "multipla_escolha",
    "area": "Mecânica dos Fluidos", "subarea": "Pressão atmosférica",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, a densidade do ar permanece constante e igual à do nível do mar (ρ = 1,2 kg/m³) até o fim da atmosfera. Sabendo que a pressão ao nível do mar é 102.000 Pa, a altura do Monte Everest é 8,8 km e g = 10 m/s², determine qual das alternativas é correta para essa realidade alternativa.",
    "opcoes": {
      "a": "O limite da atmosfera fica no meio da altura do Monte Everest.",
      "b": "A atmosfera ultrapassa o pico do Monte Evereste em quase 1 quilômetro.",
      "c": "O pico do Monte Evereste é exatamente o limite da atmosfera.",
      "d": "O limite da atmosfera fica a menos de 1 quilômetro abaixo do pico do Monte Everest."
    },
    "gabarito": "d",
    "resolucao": "Altura da atmosfera: h = p_0/(ρg) = 102.000/(1,2×10) = 8.500 m = 8,5 km. O Everest tem 8,8 km; diferença = 0,3 km < 1 km → o limite da atmosfera fica a menos de 1 km abaixo do pico."
  },
  {
    "id": "OBFEP-2024-B-12",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "B", "fase": 1,
    "numero": 12, "tipo_questao": "multipla_escolha",
    "area": "Mecânica dos Fluidos", "subarea": "Empuxo",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, os homens podem aumentar seu volume em até 50%. Um homem de 84 L e 82 kg deve atravessar um rio com seu filho de 14 kg sem que este se molhe. Qual é o volume máximo desse homem que ficará acima da água (ρ_água = 1,2 kg/L)?",
    "opcoes": {"a": "40 L", "b": "46 L", "c": "52 L", "d": "64 L"},
    "gabarito": "b",
    "resolucao": "Volume máximo = 84 × 1,5 = 126 L. Massa total = 82 + 14 = 96 kg. Volume submerso (empuxo = peso): V_sub = 96/1,2 = 80 L. Volume acima da água = 126 – 80 = 46 L."
  },
  {
    "id": "OBFEP-2024-B-13",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "B", "fase": 1,
    "numero": 13, "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Lançamento de projéteis",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, a aceleração da gravidade terrestre mede 2 m/s². Qual seria o valor máximo para o recorde de salto em distância de Mike Powell nessa realidade, considerando que ele saltaria com 10 m/s a 45°? (sen 45° = cos 45° = √2/2)",
    "opcoes": {"a": "50 m", "b": "46 m", "c": "40 m", "d": "32 m"},
    "gabarito": "a",
    "resolucao": "Alcance máximo: R = v_0² × sen(2θ)/g = 100 × 1/2 = 50 m."
  },
  {
    "id": "OBFEP-2024-B-14",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "B", "fase": 1,
    "numero": 14, "tipo_questao": "multipla_escolha",
    "area": "Termologia", "subarea": "Dilatação térmica",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, os coeficientes de dilatação volumétrica possuem valores próximos a 5×10⁻² °C⁻¹. Marcos e sua lagartixa passam do corredor (30 °C) para a sala (20 °C). Identifique a alternativa que relata algo que certamente NÃO aconteceria nessa situação.",
    "opcoes": {
      "a": "Caso a lagartixa se afaste de Marcos, seu tamanho iria diminuir significativamente.",
      "b": "A mochila de Marcos cresceria significativamente, ao ser colocada no chão.",
      "c": "Marcos não mudaria de tamanho porque seu corpo mantém a temperatura.",
      "d": "Marcos cederia calor para suas roupas as quais não sofreriam grandes mudanças."
    },
    "gabarito": "b",
    "resolucao": "Com β ≈ 0,05 °C⁻¹ e ΔT = –10 °C (do corredor para a sala), a mochila ENCOLHERIA em ~50% do volume (ΔV/V = 0,05×10 = 0,5), não cresceria. As demais alternativas são plausíveis: a lagartixa esfria e encolhe (a); Marcos é endotérmico, não muda de tamanho (c); Marcos cede calor às roupas (d)."
  },
  {
    "id": "OBFEP-2024-B-15",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "B", "fase": 1,
    "numero": 15, "tipo_questao": "multipla_escolha",
    "area": "Cinemática", "subarea": "MRUV",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, as concepções aristotélicas são verdadeiras e uma esfera de chumbo de 1 kg desce 45 m no mesmo tempo que em nossa realidade. Quanto tempo levará para uma esfera de chumbo de 2 kg cair 120 m nessa realidade alternativa?",
    "opcoes": {"a": "3 s", "b": "6 s", "c": "18 s", "d": "4 s"},
    "gabarito": "d",
    "resolucao": "Idêntica à A.12: v_1 = 15 m/s; v_2 = 30 m/s; t = 120/30 = 4 s."
  },
  {
    "id": "OBFEP-2024-B-16",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "B", "fase": 1,
    "numero": 16, "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Gravitação",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, a Terra não tem atmosfera. Um projétil é lançado de um canhão rente à superfície com velocidade suficiente para orbitar a Terra. Sabendo que o raio da Terra é 6,05 mil km e g = 9,8 m/s², determine essa velocidade.",
    "opcoes": {"a": "7,7 km/s", "b": "6,4 km/s", "c": "4,9 km/s", "d": "8,2 km/s"},
    "gabarito": "a",
    "resolucao": "v = √(g×R) = √(9,8 × 6,05×10⁶) = √(59,29×10⁶) ≈ 7,7×10³ m/s = 7,7 km/s."
  },
  {
    "id": "OBFEP-2024-B-17",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "B", "fase": 1,
    "numero": 17, "tipo_questao": "multipla_escolha",
    "area": "Termologia", "subarea": "Termodinâmica",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, automóveis capturam energia térmica da água de um reservatório e a convertem integralmente em trabalho. Um carro de 500 kg (incluindo 25 kg de água a 20 °C) parte do repouso e atinge 20 m/s. Determine a temperatura final da água no reservatório. (c_água = 4 J/g°C)",
    "opcoes": {"a": "19 °C", "b": "14 °C", "c": "16 °C", "d": "12 °C"},
    "gabarito": "a",
    "resolucao": "EC = ½×500×400 = 100.000 J. Calor extraído = 100.000 J (100% convertido). Q = mc×ΔT → 100.000 = 25.000×4×ΔT → ΔT = 1 °C. T_final = 20 – 1 = 19 °C."
  },
  {
    "id": "OBFEP-2024-B-18",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "B", "fase": 1,
    "numero": 18, "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Gravitação",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, a Terra possui a mesma densidade média e o mesmo raio que a nossa, mas é oca, formada por uma casca de 1 megâmetro de espessura. Qual o valor aproximado da aceleração da gravidade na superfície dessa Terra alternativa? (V_esfera ≈ 4R³; g ≈ 0,06M/R² onde M em yottagram e R em megâmetro)",
    "opcoes": {"a": "3 m/s²", "b": "5 m/s²", "c": "4 m/s²", "d": "2 m/s²"},
    "gabarito": "c",
    "resolucao": "R=6 Mm, casca 1 Mm → r_interno=5 Mm. M_oca/M_sólida = (6³–5³)/6³ = (216–125)/216 = 91/216. g_oca = g_sólida × 91/216 ≈ 10 × 0,421 ≈ 4,2 m/s² ≈ 4 m/s²."
  },
  {
    "id": "OBFEP-2024-B-19",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "B", "fase": 1,
    "numero": 19, "tipo_questao": "multipla_escolha",
    "area": "Termologia", "subarea": "Condução térmica",
    "tags": [], "imagens": {"enunciado": [f"{IMG}/pag06_xref65_628x310.png", f"{IMG}/pag06_xref67_566x332.png", f"{IMG}/pag06_xref69_945x691.png"]},
    "enunciado": "Em uma realidade alternativa, existe um material condutor térmico perfeito (k→∞). Três blocos cúbicos de 1 m de aresta estão arrumados entre água fervendo e gelo fundente em regime estacionário (lei de Fourier: ϕ = k·A·ΔT/L). O bloco B é constituído por esse material e os demais por condutores comuns. Identifique o gráfico que melhor representa a distribuição da temperatura pelo bloco B.",
    "opcoes": {
      "a": "Gráfico 1",
      "b": "Gráfico 2",
      "c": "Gráfico 3",
      "d": "Gráfico 4"
    },
    "gabarito": "b",
    "resolucao": "Com k→∞ no bloco B, o gradiente de temperatura em B é zero (sem gradiente, qualquer fluxo pode existir). Isso significa que a temperatura é uniforme (constante) ao longo de B. O gráfico que mostra temperatura constante no bloco B é o Gráfico 2."
  },
  {
    "id": "OBFEP-2024-B-20",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "B", "fase": 1,
    "numero": 20, "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Dinâmica",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, é possível produzir corpos com massa gravitacional (m_g) e inercial (m_i) diferentes. O corpo B tem m_i = m_g = 1 kg. Na segunda experiência (corpos abandonados, g = 10 N/kg), |a_A| = 5 m/s² e |a_B| = 10 m/s². Identifique as massas do corpo A.",
    "opcoes": {
      "a": "m_g = –1 kg e m_i = 0,5 kg.",
      "b": "m_g = 1 kg e m_i = 2 kg.",
      "c": "m_g = –1 kg e m_i = 2 kg.",
      "d": "m_g = 1 kg e m_i = 0,5 kg."
    },
    "gabarito": "c",
    "resolucao": "Para B livre: F_B = m_g_B × g = 10 N; a_B = F_B/m_i_B = 10/1 = 10 m/s² ✓. Para A: m_g_A negativo → força gravitacional de módulo |m_g_A|×g para cima. Com tensão nula (corpos separados): |m_g_A|×10 = m_i_A × 5 → m_i_A = 2|m_g_A|. Na primeira experiência (equilíbrio com fio): T = m_g_B×g = 10 N e T = |m_g_A|×g → |m_g_A| = 1 kg → m_i_A = 2 kg. Logo m_g_A = –1 kg, m_i_A = 2 kg."
  }
]

data = json.loads(JSON.read_text(encoding='utf-8'))
data['banco_questoes'].extend(nivel_b)
JSON.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"Total: {len(data['banco_questoes'])} questões")
