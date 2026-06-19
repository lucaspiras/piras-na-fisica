#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Adiciona OBFEP 2024 Nível C (15 questões) ao banco de questões."""
import json, pathlib

JSON = pathlib.Path('banco-questoes/fisica_ufrgs.json')
IMG  = 'obfep/2024/C-F1'

nivel_c = [
  {
    "id": "OBFEP-2024-C-01",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "C", "fase": 1,
    "numero": 1, "tipo_questao": "multipla_escolha",
    "area": "Física Moderna", "subarea": "Relatividade especial",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, a luz tem velocidade na ordem de grandeza de velocidades de carros de alta performance. O comprimento de um carro a 300 km/h é 20% menor que seu comprimento em repouso. Qual é o valor da velocidade da luz nessa realidade alternativa?",
    "opcoes": {"a": "400 km/h", "b": "500 km/h", "c": "600 km/h", "d": "1000 km/h"},
    "gabarito": "b",
    "resolucao": "L = 0,8 L_0 → √(1–(v/c)²) = 0,8 → (300/c)² = 0,36 → c = 300/0,6 = 500 km/h."
  },
  {
    "id": "OBFEP-2024-C-02",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "C", "fase": 1,
    "numero": 2, "tipo_questao": "multipla_escolha",
    "area": "Eletromagnetismo", "subarea": "Eletrostática",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, as cargas produzidas por triboeletrização são muito maiores. Um homem, após atritar seu sapato de couro em piso de madeira, sobe pela parede de alumínio até ficar de ponta-cabeça no teto de alumínio aterrado. Identifique a alternativa INCORRETA.",
    "opcoes": {
      "a": "O teto ficou eletrizado negativamente por indução.",
      "b": "O corpo do homem está polarizado com carga negativa próxima ao sapato.",
      "c": "Pelo fio-terra, passaram elétrons do teto para o solo.",
      "d": "A ordem de grandeza da força elétrica resultante que age no homem é 10³ N."
    },
    "gabarito": "c",
    "resolucao": "O sapato (positivo após atrito) atrai elétrons do solo para o teto aterrado → elétrons fluem DO SOLO PARA O TETO. A afirmação c diz que elétrons passaram DO TETO PARA O SOLO, que é o sentido oposto. As demais: teto fica negativo por indução (a ✓); corpo polarizado com carga negativa perto do sapato positivo (b ✓); força elétrica ≈ peso ≈ 700 N ≈ 10³ N (d ✓)."
  },
  {
    "id": "OBFEP-2024-C-03",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "C", "fase": 1,
    "numero": 3, "tipo_questao": "multipla_escolha",
    "area": "Termologia", "subarea": "Escalas termométricas",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, Anders Celsius usou o mercúrio (solidifica a –40 °C e ferve a 360 °C em nossa realidade) para definir a escala. Uma temperatura de 60 °C nessa realidade alternativa corresponderia a que temperatura na nossa realidade?",
    "opcoes": {"a": "250 °C", "b": "320 °C", "c": "200 °C", "d": "400 °C"},
    "gabarito": "c",
    "resolucao": "T_real = T_alt × 4 – 40 = 60 × 4 – 40 = 200 °C."
  },
  {
    "id": "OBFEP-2024-C-04",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "C", "fase": 1,
    "numero": 4, "tipo_questao": "multipla_escolha",
    "area": "Cinemática", "subarea": "MRUV",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa aristotélica, a velocidade de queda é proporcional à DENSIDADE do corpo. Uma esfera de chumbo de 1 kg desce 80 m no mesmo tempo que em nossa realidade. Quanto tempo levará para uma esfera de gálio de 2 kg cair 160 m? (d_chumbo ≈ 12 kg/L; d_gálio ≈ 6 kg/L)",
    "opcoes": {"a": "10 s", "b": "16 s", "c": "4 s", "d": "8 s"},
    "gabarito": "b",
    "resolucao": "Tempo em nossa realidade: t = √(2×80/10) = 4 s. v_chumbo = 80/4 = 20 m/s. v_gálio = v_chumbo × (d_gálio/d_chumbo) = 20 × (6/12) = 10 m/s. Tempo para 160 m: t = 160/10 = 16 s."
  },
  {
    "id": "OBFEP-2024-C-05",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "C", "fase": 1,
    "numero": 5, "tipo_questao": "multipla_escolha",
    "area": "Óptica", "subarea": "Propagação da luz",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, uma mãe consegue ver seu filho através de uma parede de cimento. As alternativas descrevem comportamentos não válidos em nossa realidade. Três deles conseguiriam, isoladamente, explicar essa visão. Identifique o comportamento que NÃO conseguiria.",
    "opcoes": {
      "a": "O cimento é transparente para a luz visível.",
      "b": "Os efeitos da difração da luz são muito significativos.",
      "c": "O corpo humano emite raios gamas e estes também ativam a visão humana.",
      "d": "A visão humana só consegue interpretar tons de cinza."
    },
    "gabarito": "d",
    "resolucao": "Cimento transparente (a), difração extrema permitindo contornar obstáculos (b) e emissão/detecção de raios gama que atravessam o cimento (c) — cada um desses mecanismos permitiria ver através da parede. Ver apenas em tons de cinza (d) não tem nenhuma relação com a capacidade de ver através de paredes sólidas."
  },
  {
    "id": "OBFEP-2024-C-06",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "C", "fase": 1,
    "numero": 6, "tipo_questao": "multipla_escolha",
    "area": "Eletromagnetismo", "subarea": "Corrente elétrica",
    "tags": [], "imagens": {"enunciado": [f"{IMG}/pag02_xref51_454x254.png"]},
    "enunciado": "Em uma realidade alternativa, a faixa de frequências eletromagnéticas visíveis é muito maior, permitindo ver o sentido do movimento de cargas em um fio. Ao observar o trecho AB do circuito da figura, um homem dessa realidade notaria:",
    "opcoes": {
      "a": "um rastro seguindo sempre o sentido A → B",
      "b": "um rastro seguindo sempre o sentido B → A",
      "c": "inexistência de rastros.",
      "d": "um rastro que inverte de sentido periodicamente."
    },
    "gabarito": "a",
    "resolucao": "O circuito mostrado na figura é alimentado por uma fonte de corrente contínua (bateria/pilha). A corrente convencional flui em sentido único; no trecho AB, o sentido é de A para B, produzindo rastro sempre no mesmo sentido A → B."
  },
  {
    "id": "OBFEP-2024-C-07",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "C", "fase": 1,
    "numero": 7, "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Conservação de energia",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, os ossos são parcialmente elásticos. Uma pessoa de 80 kg caiu de 80 m. Após quicar no solo a primeira vez, subiu até 5 m. Qual o coeficiente de restituição dessa primeira colisão? (g = 10 m/s²)",
    "opcoes": {"a": "0,25", "b": "0,5", "c": "0,75", "d": "1,0"},
    "gabarito": "a",
    "resolucao": "e = √(h_após/h_antes) = √(5/80) = √(1/16) = 1/4 = 0,25."
  },
  {
    "id": "OBFEP-2024-C-08",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "C", "fase": 1,
    "numero": 8, "tipo_questao": "multipla_escolha",
    "area": "Eletromagnetismo", "subarea": "Supercondutividade",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, a humanidade consegue criar supercondutores acima de 100 °C a baixo custo. Qual das alternativas abaixo mostra algo que NÃO é uma conquista obtida como consequência do uso desses materiais?",
    "opcoes": {
      "a": "Imensa redução do consumo de energia elétrica na transmissão.",
      "b": "Aumento significativo do rendimento dos motores elétricos.",
      "c": "Aumento das distâncias percorridas alcançadas por carros elétricos sem recarga.",
      "d": "Chuveiros elétricos que aquecem a água sem consumir energia elétrica."
    },
    "gabarito": "d",
    "resolucao": "Supercondutores têm resistência nula → zero de dissipação → menos perdas na transmissão (a ✓), motores mais eficientes (b ✓), cargas e transmissões mais eficientes para EVs (c ✓). Porém, para o chuveiro elétrico funcionar ele PRECISA de resistência elétrica para converter energia em calor. Com resistência zero, não há geração de calor → o chuveiro não aqueceria a água (d ✗)."
  },
  {
    "id": "OBFEP-2024-C-09",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "C", "fase": 1,
    "numero": 9, "tipo_questao": "multipla_escolha",
    "area": "Óptica", "subarea": "Óptica atmosférica",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, a Terra havia perdido toda a sua atmosfera. Identifique a alternativa que NÃO corresponde a uma característica dessa realidade alternativa que diferencia da nossa para pessoas na superfície da Terra.",
    "opcoes": {
      "a": "A Lua vista permanece com o mesmo tamanho durante a noite de lua cheia.",
      "b": "Não existe diferença entre Sol real e Sol aparente.",
      "c": "O céu estrelado é visto durante o dia-claro e durante a noite.",
      "d": "Uma localidade recebe luz solar por um período diário maior do que na nossa realidade."
    },
    "gabarito": "d",
    "resolucao": "Sem atmosfera: Sol real = Sol aparente (b ✓); estrelas visíveis de dia (c ✓). A opção d afirma dia MAIOR sem atmosfera, mas ocorre o oposto: sem refração atmosférica, o dia é MAIS CURTO (na nossa realidade a refração prolonga o dia). Logo d é falso para a realidade alt → não corresponde a uma característica correta."
  },
  {
    "id": "OBFEP-2024-C-10",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "C", "fase": 1,
    "numero": 10, "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Gravitação",
    "tags": [], "imagens": {"enunciado": [f"{IMG}/pag03_xref57_319x393.png"]},
    "enunciado": "Em uma realidade alternativa, um bloco fixado na parede produz força gravitacional comparável ao peso de corpos próximos. Uma esfera de 5,0 kg permanece parada no ar presa a um fio horizontal. A tração mede 15 N. Determine o campo gravitacional produzido pelo bloco no local da esfera. (g_Terra < 10 N/kg; sen 53° = 4/5; cos 53° = 3/5)",
    "opcoes": {"a": "4 N/kg", "b": "5 N/kg", "c": "6 N/kg", "d": "10 N/kg"},
    "gabarito": "b",
    "resolucao": "O bloco atrai a esfera a 53° acima da horizontal. Componente horizontal: F × cos53° = T = 15 N → F = 15/(3/5) = 25 N. Campo = F/m = 25/5 = 5 N/kg."
  },
  {
    "id": "OBFEP-2024-C-11",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "C", "fase": 1,
    "numero": 11, "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Gravitação",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, a Terra não tem atmosfera. Um projétil é lançado rente à superfície terrestre (R = 6,48 mil km, g = 8,0 m/s²) com velocidade suficiente para orbitar. Quantas horas levaria para retornar à posição inicial?",
    "opcoes": {"a": "0,2π", "b": "0,3π", "c": "0,4π", "d": "0,5π"},
    "gabarito": "d",
    "resolucao": "v = √(gR) = √(8,0 × 6,48×10⁶) = √(51,84×10⁶) = 7,2×10³ m/s. T = 2πR/v = 2π × 6,48×10⁶/7200 = 2π × 900 s = 1800π s = 1800π/3600 h = 0,5π h."
  },
  {
    "id": "OBFEP-2024-C-12",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "C", "fase": 1,
    "numero": 12, "tipo_questao": "multipla_escolha",
    "area": "Óptica", "subarea": "Reflexão e absorção",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, os corpos sólidos não permitem refração, têm absorção não seletiva e 95% da reflexão é regular. Iluminados por luz branca, a superfície desses objetos possui aparência:",
    "opcoes": {
      "a": "espelhada.",
      "b": "opaca de cor branca.",
      "c": "transparente.",
      "d": "opaca de cor preta."
    },
    "gabarito": "a",
    "resolucao": "Absorção não seletiva + 95% de reflexão especular de luz branca → aparência espelhada (como um espelho)."
  },
  {
    "id": "OBFEP-2024-C-13",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "C", "fase": 1,
    "numero": 13, "tipo_questao": "multipla_escolha",
    "area": "Termologia", "subarea": "Termodinâmica",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, automóveis capturam energia térmica da água e convertem 25% dela em trabalho. Um carro de 500 kg (com 25 kg de água a 20 °C) parte do repouso e atinge 20 m/s. Determine a temperatura final da água. (c_água = 4 J/g°C)",
    "opcoes": {"a": "19 °C", "b": "14 °C", "c": "16 °C", "d": "12 °C"},
    "gabarito": "c",
    "resolucao": "EC = ½×500×400 = 100.000 J (= 25% do calor extraído). Q_total = 100.000/0,25 = 400.000 J. ΔT = Q/(mc) = 400.000/(25.000×4) = 4 °C. T_final = 20 – 4 = 16 °C."
  },
  {
    "id": "OBFEP-2024-C-14",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "C", "fase": 1,
    "numero": 14, "tipo_questao": "multipla_escolha",
    "area": "Termologia", "subarea": "Condução térmica",
    "tags": [], "imagens": {"enunciado": [f"{IMG}/pag04_xref61_566x332.png", f"{IMG}/pag04_xref63_1026x275.png"]},
    "enunciado": "Em uma realidade alternativa, três blocos cúbicos de mesmas dimensões estão entre água fervendo e gelo fundente em regime estacionário. A distribuição de temperatura mostrada não seria possível sem materiais extremos. Definindo k_A, k_B, k_C como as condutividades dos blocos A, B e C, determine a alternativa mais adequada.",
    "opcoes": {
      "a": "K_A = 2k_C e k_B = 0.",
      "b": "K_A = 2k_C e k_B → ∞.",
      "c": "K_C = 2k_A e k_B = 0.",
      "d": "K_C = 2k_A e k_B → ∞."
    },
    "gabarito": "b",
    "resolucao": "O bloco B com k→∞ tem temperatura uniforme (sem gradiente), permitindo que a distribuição no restante do sistema forme perfis lineares com diferentes inclinações. Com fluxo estacionário igual nos três blocos (série), ΔT_A/ΔT_C = k_C/k_A. Se k_A = 2k_C → ΔT_A = ΔT_C/2 (queda de temperatura em A é metade da de C)."
  },
  {
    "id": "OBFEP-2024-C-15",
    "ano": 2024, "instituicao": "OBFEP", "nivel": "C", "fase": 1,
    "numero": 15, "tipo_questao": "multipla_escolha",
    "area": "Mecânica", "subarea": "Dinâmica",
    "tags": [], "imagens": {},
    "enunciado": "Em uma realidade alternativa, corpos podem ter massa gravitacional (m_g) e inercial (m_i) diferentes. O corpo B tem m_i = m_g = 1 kg; no abandono livre (g = 10 N/kg): |a_A| = 5 m/s² e |a_B| = 10 m/s². Identifique as massas do corpo A.",
    "opcoes": {
      "a": "m_g = –1 kg e m_i = 2 kg.",
      "b": "m_g = 1 kg e m_i = 0,5 kg.",
      "c": "m_g = –1 kg e m_i = 0,5 kg.",
      "d": "m_g = 1 kg e m_i = 2 kg."
    },
    "gabarito": "a",
    "resolucao": "A tem m_g negativo (anti-gravidade): força = |m_g_A|×10 para cima. a_A = força/m_i_A = 5 → |m_g_A|×10/m_i_A = 5 → m_i_A = 2|m_g_A|. Do equilíbrio na 1ª experiência: T = m_g_B×g = 10 N = |m_g_A|×g → |m_g_A| = 1 kg → m_i_A = 2 kg. Logo m_g_A = –1 kg, m_i_A = 2 kg."
  }
]

data = json.loads(JSON.read_text(encoding='utf-8'))
data['banco_questoes'].extend(nivel_c)
JSON.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"Total: {len(data['banco_questoes'])} questões")
