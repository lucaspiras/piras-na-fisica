import json

with open('banco-questoes/fisica_ufrgs.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

IMG = 'obfep/2016/C-F1'

questoes = [
{
  "id": "OBFEP-2016-C-01",
  "ano": 2016, "numero": 1, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "O recorde olímpico da maratona (42,195 km) é de 2 h e 6 min, conseguido pelo queniano Samuel Wanjiru em 2008. Determine o valor aproximado da velocidade média de Samuel.",
  "opcoes": {"a": "296 m/min", "b": "312 m/min", "c": "335 m/min", "d": "384 m/min"},
  "gabarito": "c",
  "resolucao": "Tempo: 2×60 + 6 = 126 min. Velocidade média: v = 42195 / 126 ≈ 334,9 m/min ≈ 335 m/min."
},
{
  "id": "OBFEP-2016-C-02",
  "ano": 2016, "numero": 2, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Termometria",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Dados meteorológicos indicam que no Rio de Janeiro, no horário da maratona olímpica de 2016, a temperatura média será de 10 °C. Qual o valor desta temperatura em Fahrenheit? (gelo derrete a 32 °F; água ferve a 212 °F e 100 °C)",
  "opcoes": {"a": "24 ºF", "b": "36 ºF", "c": "46 ºF", "d": "50 ºF"},
  "gabarito": "d",
  "resolucao": "F = 1,8 × C + 32 = 1,8 × 10 + 32 = 18 + 32 = 50 °F."
},
{
  "id": "OBFEP-2016-C-03",
  "ano": 2016, "numero": 3, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref30_340x255.jpg"], "alternativas": {}},
  "enunciado": "No rugby, um defensor (90 kg, 30 km/h) agarrou no ar um atacante (70 kg, 10 km/h) que se movia no mesmo sentido. Qual a velocidade dos dois unidos logo após a jogada?",
  "opcoes": {"a": "18,32 km/h", "b": "21,25 km/h", "c": "24,16 km/h", "d": "32,46 km/h"},
  "gabarito": "b",
  "resolucao": "Conservação de momento (sistema isolado no ar): p_total = m₁v₁ + m₂v₂ = 90×30 + 70×10 = 2700+700 = 3400 kg·km/h. Velocidade conjunta: v = 3400/(90+70) = 3400/160 = 21,25 km/h."
},
{
  "id": "OBFEP-2016-C-04",
  "ano": 2016, "numero": 4, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref31_399x302.jpg"], "alternativas": {}},
  "enunciado": "Usain Bolt, o homem mais rápido (9,58 s em 100 m), usa apoios que impedem o tênis de deslizar. Com coeficientes de atrito estático 0,8 e cinético 0,6 no asfalto, qual a aceleração máxima que Bolt conseguiria com tênis normal? Dado: g = 10 m/s².",
  "opcoes": {"a": "6 m/s²", "b": "7 m/s²", "c": "8 m/s²", "d": "9 m/s²"},
  "gabarito": "c",
  "resolucao": "A força de atrito estático máxima (antes do deslizamento) é: f_s = μ_s × mg. Aceleração máxima: a = f_s/m = μ_s × g = 0,8 × 10 = 8 m/s²."
},
{
  "id": "OBFEP-2016-C-05",
  "ano": 2016, "numero": 5, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Ondulatória", "subarea": "Interferência",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref32_318x315.jpg"], "alternativas": {}},
  "enunciado": "No nado sincronizado, duas nadadoras oscilam a 1,6 Hz em oposição de fase, gerando ondas que se propagam a 0,96 m/s. Uma boia a 2,3 m de uma das nadadoras não oscila. A que distância da OUTRA nadadora pode estar esta boia?",
  "opcoes": {"a": "2,3 m", "b": "2,4 m", "c": "2,5 m", "d": "2,6 m"},
  "gabarito": "a",
  "resolucao": "λ = v/f = 0,96/1,6 = 0,6 m. Para fontes em oposição de fase (diferença de fase = π), a boia não oscila (nó) quando a diferença de caminho é 0, λ, 2λ, ... → |d₁ − d₂| = nλ. Com d₁=2,3 m e n=0: d₂ = 2,3 m."
},
{
  "id": "OBFEP-2016-C-06",
  "ano": 2016, "numero": 6, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Lançamento de Projéteis",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Uma tacada de golfe lança a bola com 50 m/s a 30° em relação à horizontal. Sem interferência do ar, qual o alcance? Dados: g = 10 m/s²; sen 30° = 0,5; cos 30° ≈ 0,9.",
  "opcoes": {"a": "225 m", "b": "256 m", "c": "280 m", "d": "320 m"},
  "gabarito": "a",
  "resolucao": "R = v₀² × sen(2θ)/g. sen(60°) = 2×sen30°×cos30° = 2×0,5×0,9 = 0,9. R = 50² × 0,9 / 10 = 2500×0,9/10 = 225 m."
},
{
  "id": "OBFEP-2016-C-07",
  "ano": 2016, "numero": 7, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Eletrostática", "subarea": "Força Elétrica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag03_xref42_327x261.jpg"], "alternativas": {}},
  "enunciado": "Aleksey Lovchev mantém 256 kg a 2,4 m do solo. O mesmo efeito seria conseguido com duas esferas eletrizadas com cargas iguais, separadas por 2,4 m. Qual o valor da carga elétrica de cada esfera? Dados: k = 9×10⁹ N·m²·C⁻²; g = 10 m/s².",
  "opcoes": {"a": "0,64 dC", "b": "1,28 mC", "c": "2,40 C", "d": "3,24 nC"},
  "gabarito": "b",
  "resolucao": "Força elétrica = peso: kq²/r² = mg. q² = mgr²/k = 256×10×2,4²/(9×10⁹) = 2560×5,76/(9×10⁹) = 14745,6/(9×10⁹) = 1,6384×10⁻⁶. q = 1,28×10⁻³ C = 1,28 mC."
},
{
  "id": "OBFEP-2016-C-08",
  "ano": 2016, "numero": 8, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Daniele Hypolito (45 kg) dá 2 giros na barra mais alta das barras assimétricas com o corpo reto, massa a 1,5 m da barra, passando com 4 m/s na parte mais baixa no último giro. Determine a intensidade da força que ela deve fazer na barra ao passar pela parte mais baixa. Dado: g = 10 m/s².",
  "opcoes": {"a": "760 N", "b": "820 N", "c": "880 N", "d": "930 N"},
  "gabarito": "d",
  "resolucao": "No ponto mais baixo, T − mg = mv²/r → T = m(g + v²/r) = 45×(10 + 4²/1,5) = 45×(10 + 10,67) = 45×20,67 ≈ 930 N."
},
{
  "id": "OBFEP-2016-C-09",
  "ano": 2016, "numero": 9, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Lentes",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Um arqueiro míope usa óculos que corrigem a visão para 70 m. A luz do alvo, ao refratar nas lentes, chega aos olhos como se fosse produzida a 35 m. Qual o valor da distância focal da lente?",
  "opcoes": {"a": "70 m", "b": "–70 m", "c": "35 m", "d": "–35 m"},
  "gabarito": "b",
  "resolucao": "Objeto real em p = 70 m (positivo). Imagem virtual no mesmo lado do objeto: q = −35 m (negativo). Equação de Gauss: 1/f = 1/p + 1/q = 1/70 + 1/(−35) = 1/70 − 2/70 = −1/70 → f = −70 m. Lente divergente, como esperado para miopia."
},
{
  "id": "OBFEP-2016-C-10",
  "ano": 2016, "numero": 10, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Eletromagnetismo", "subarea": "Circuitos Elétricos",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "O aquecedor elétrico da piscina olímpica deve produzir 60.000 kcal/min. É composto por um fio de 90 m de comprimento e 8 mm² de seção transversal. Qual o valor da tensão mínima para que cumpra sua tarefa? Dados: resistividade = 0,2 Ω·mm²/m; 1 cal = 4 J.",
  "opcoes": {"a": "3,0 kV", "b": "4,0 kV", "c": "5,0 kV", "d": "6,0 kV"},
  "gabarito": "a",
  "resolucao": "Potência: P = 60.000 kcal/min × 4000 J/kcal ÷ 60 s/min = 4.000.000 W = 4 MW. Resistência: R = ρL/A = 0,2×90/8 = 18/8 = 2,25 Ω. Tensão: V = √(P×R) = √(4×10⁶ × 2,25) = √(9×10⁶) = 3000 V = 3,0 kV."
},
{
  "id": "OBFEP-2016-C-11",
  "ano": 2016, "numero": 11, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Estática dos Fluidos",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Um atleta de polo aquático (91 kg, volume corporal = 90 L) manteve 40% do corpo fora da água. Qual a intensidade da força resultante para baixo que as pernas aplicam na água? Dado: g = 10 m/s²; ρ_água = 1 kg/L.",
  "opcoes": {"a": "280 N", "b": "320 N", "c": "370 N", "d": "410 N"},
  "gabarito": "c",
  "resolucao": "Volume submerso: 60% × 90 = 54 L. Empuxo: E = 1×54×10 = 540 N (↑). Peso: P = 91×10 = 910 N (↓). Equilíbrio: F_pernas + E − P = 0 → F_pernas = P − E = 910 − 540 = 370 N (↓ sobre a água)."
},
{
  "id": "OBFEP-2016-C-12",
  "ano": 2016, "numero": 12, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Refração",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Um inspetor com olhos a 1,5 m acima da borda da piscina mira no ponto P (a 2,0 m dos pés na superfície da água) para ver a imagem da tampa T. A distância de P até T mede 5,0 m (oblíqua, em linha reta através da água). Determine a distância horizontal entre a vertical de P e a tampa T. Dado: n_água = 4/3.",
  "opcoes": {"a": "1,5 m", "b": "2,0 m", "c": "2,5 m", "d": "3,0 m"},
  "gabarito": "d",
  "resolucao": "Ângulo de incidência: sen θ₁ = 2/√(2²+1,5²) = 2/2,5 = 0,8. Lei de Snell: 1×0,8 = (4/3)×sen θ₂ → sen θ₂ = 0,6; cos θ₂ = 0,8. O raio refratado percorre 5,0 m até T (PT oblíquo). Componentes de PT: horizontal h = PT×sen θ₂ = 5×0,6 = 3,0 m; vertical d = PT×cos θ₂ = 5×0,8 = 4,0 m (profundidade da piscina). Distância horizontal entre vertical de P e tampa T: h = 3,0 m."
},
{
  "id": "OBFEP-2016-C-13",
  "ano": 2016, "numero": 13, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Circuito de mountain bike (5 km). Em t=0, um retardatário inicia nova volta (v₀=4 m/s, constante por 10 s). Em t=2 s, o líder inicia nova volta (v₀=4 m/s, a=1 m/s²). A que distância da linha de chegada o líder ultrapassou o retardatário? Trate os atletas como pontos materiais.",
  "opcoes": {"a": "20 m", "b": "24 m", "c": "32 m", "d": "36 m"},
  "gabarito": "b",
  "resolucao": "X_retardatário = 4t (para 0 ≤ t ≤ 10 s). X_líder = 4(t−2) + (1/2)(1)(t−2)² para t ≥ 2 s. Encontro: 4t = 4(t−2) + 0,5(t−2)² → 4t = 4t−8+0,5(t−2)² → 8 = 0,5(t−2)² → (t−2)² = 16 → t−2 = 4 → t = 6 s. X = 4×6 = 24 m da linha de chegada/início."
},
{
  "id": "OBFEP-2016-C-14",
  "ano": 2016, "numero": 14, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Energia",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "No salto com vara, Fabiana Murer (60 kg) está na deformação máxima da vara com v=3 m/s. A energia potencial elástica máxima equivale à de uma mola de k=19.200 N/m com x=0,5 m. Na altura máxima, ela passa com 1 m/s. Qual a altura máxima? Dado: g = 10 m/s²; sistema conservativo; despreze a altura inicial.",
  "opcoes": {"a": "3,6 m", "b": "4,0 m", "c": "4,2 m", "d": "4,4 m"},
  "gabarito": "d",
  "resolucao": "E_elástica = (1/2)kx² = (1/2)(19200)(0,5²) = (1/2)(19200)(0,25) = 2400 J. Conservação: E_elástica + (1/2)mv₀² = mgh_max + (1/2)mv_topo². 2400 + (1/2)(60)(9) = 60×10×h + (1/2)(60)(1). 2400+270 = 600h+30 → 2670−30 = 600h → h = 2640/600 = 4,4 m."
},
{
  "id": "OBFEP-2016-C-15",
  "ano": 2016, "numero": 15, "nivel": "C", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Calorimetria",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Um disco feminino (1 kg) é lançado a 30 m/s a 45° e chega ao solo com 20 m/s. Todo o calor do atrito foi absorvido pelo disco. Qual a variação de temperatura? Dados: c_disco = 0,2 J/(g·°C); despreze a altura inicial.",
  "opcoes": {"a": "1,25 ºC", "b": "1,69 ºC", "c": "2,16 ºC", "d": "2,56 ºC"},
  "gabarito": "a",
  "resolucao": "Energia dissipada = variação de energia cinética (altura inicial = final): Q = (1/2)(1)(30²) − (1/2)(1)(20²) = 450 − 200 = 250 J. c = 0,2 J/(g·°C) = 200 J/(kg·°C). ΔT = Q/(mc) = 250/(1×200) = 1,25 °C."
},
]

data['banco_questoes'].extend(questoes)

with open('banco-questoes/fisica_ufrgs.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Total: {len(data['banco_questoes'])} questoes")
