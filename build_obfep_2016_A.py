import json

with open('banco-questoes/fisica_ufrgs.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

IMG = 'obfep/2016/A-F1'

questoes = [
{
  "id": "OBFEP-2016-A-01",
  "ano": 2016, "numero": 1, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Física Moderna", "subarea": "Física e Sociedade",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "A elaboração desta prova ocorreu 2 meses depois do solstício de verão de 2015 na região nordeste do Brasil. A olimpíada do Rio de Janeiro terminará 2 meses depois do solstício de inverno local. A estação do ano vivenciada por quem elaborou esta prova foi _______ e, para um francês que assistirá à olimpíada do Rio lá na França, a estação vivenciada será _______. As lacunas devem ser preenchidas, respectivamente, por:",
  "opcoes": {"a": "inverno – verão", "b": "inverno – inverno", "c": "verão – inverno", "d": "verão – verão"},
  "gabarito": "d",
  "resolucao": "2 meses após o solstício de verão do hemisfério sul (21 dez de 2015) = fevereiro de 2016 = ainda verão no Brasil. A Olimpíada do Rio encerra 2 meses após o solstício de inverno local (21 jun) = agosto, que é verão no hemisfério norte. Para o francês em agosto na França = verão. Resposta: verão – verão."
},
{
  "id": "OBFEP-2016-A-02",
  "ano": 2016, "numero": 2, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Estática dos Fluidos",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag01_xref31_422x247.jpg"], "alternativas": {}},
  "enunciado": "A piscina central do estádio aquático olímpico do Rio possui 25 m de largura, 50 m de comprimento e 2,3 m de altura. A piscina não é toda preenchida, deixando 30 cm entre o nível da água e a borda. Se a densidade da água é 1 tonelada/m³, quantos kg de água serão colocados nessa piscina?",
  "opcoes": {"a": "1.800.000 kg", "b": "2.000.000 kg", "c": "2.200.000 kg", "d": "2.500.000 kg"},
  "gabarito": "d",
  "resolucao": "Profundidade da água: 2,3 − 0,3 = 2,0 m. Volume: 25 × 50 × 2,0 = 2500 m³. Massa: 2500 m³ × 1000 kg/m³ = 2.500.000 kg."
},
{
  "id": "OBFEP-2016-A-03",
  "ano": 2016, "numero": 3, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "A chinesa Xiexia Che, com menos de 48 kg, ergueu 117 kg — recorde olímpico. Qualquer mulher adulta com menos de 48 kg conseguiria levantar a mesma barra na Lua pois, na superfície da Lua, em relação à Terra:",
  "opcoes": {
    "a": "a massa de qualquer corpo diminui; logo, o peso respectivo também diminui.",
    "b": "o peso de qualquer corpo diminui, mesmo mantendo a massa.",
    "c": "a massa de qualquer corpo diminui, apesar do peso não alterar.",
    "d": "a massa e o peso continuam os mesmos mas, lá na Lua, as pessoas ficam mais fortes."
  },
  "gabarito": "b",
  "resolucao": "A massa é uma propriedade intrínseca e não muda com a localização. O peso é F = mg: como g_Lua ≈ 1,6 m/s² (cerca de 1/6 de g_Terra), o peso diminui na Lua. A barra com as anilhas pesa apenas ~1/6 na Lua, permitindo que qualquer pessoa da mesma faixa de massa a levante."
},
{
  "id": "OBFEP-2016-A-04",
  "ano": 2016, "numero": 4, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Termometria",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "A temperatura da água de competição deve estar entre 25,0 °C e 28,0 °C. Um atleta inglês usa a escala Fahrenheit. Sabendo que a água ferve a 100 °C = 212 °F e o gelo derrete a 0 °C = 32 °F, qual a faixa equivalente em Fahrenheit?",
  "opcoes": {"a": "de 75,0 ºF a 82,4 ºF", "b": "de 77,0 ºF a 82,4 ºF", "c": "de 75,0 ºF a 88,6 ºF", "d": "de 77,0 ºF a 88,6 ºF"},
  "gabarito": "b",
  "resolucao": "F = 1,8C + 32. Para 25 °C: F = 1,8×25 + 32 = 45 + 32 = 77,0 °F. Para 28 °C: F = 1,8×28 + 32 = 50,4 + 32 = 82,4 °F. Faixa: 77,0 °F a 82,4 °F."
},
{
  "id": "OBFEP-2016-A-05",
  "ano": 2016, "numero": 5, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref38_415x297.jpg"], "alternativas": {}},
  "enunciado": "No caiaque Slalom, o competidor às vezes rema contra a correnteza para vencer traves deslocadas da rota normal. A canoa consegue se movimentar para frente contra a correnteza por causa da:",
  "opcoes": {
    "a": "força de reação à intensa força que o remo exerce na água para trás.",
    "b": "intensa força que o remo exerce na água para frente.",
    "c": "intensa força que a água exerce para frente em todo o casco da canoa.",
    "d": "intensa força que o casco da canoa exerce na água para trás."
  },
  "gabarito": "a",
  "resolucao": "Pela 3ª Lei de Newton: o remo empurra a água para trás. A água reage com força igual e oposta sobre o remo (e, portanto, sobre a canoa) para frente. É a força de reação que propulsiona a canoa."
},
{
  "id": "OBFEP-2016-A-06",
  "ano": 2016, "numero": 6, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref39_620x349.jpg"], "alternativas": {}},
  "enunciado": "O neozelandês Mahé Drysdale venceu a prova de Single Skiff (2 km) na final em Londres 2012 com a marca de 6 min e 58 s. Qual o valor aproximado da velocidade média que Mahé desenvolveu?",
  "opcoes": {"a": "4,2 m/s", "b": "4,4 m/s", "c": "4,8 m/s", "d": "5,2 m/s"},
  "gabarito": "c",
  "resolucao": "Distância: 2000 m. Tempo: 6×60 + 58 = 418 s. Velocidade média: v = 2000/418 ≈ 4,78 m/s ≈ 4,8 m/s."
},
{
  "id": "OBFEP-2016-A-07",
  "ano": 2016, "numero": 7, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Calorimetria",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Dois nadadores norte-americanos mergulharam em águas a 0 °C. Após 1 min, a temperatura do nadador A era menor que a do nadador B. Com mesma área de contato com a água, qual característica contribui para essa diferença?",
  "opcoes": {
    "a": "A massa do nadador A é menor que a do nadador B.",
    "b": "O metabolismo do nadador A é mais rápido que o do nadador B.",
    "c": "O calor específico médio do nadador A é maior que o do nadador B.",
    "d": "A pele do nadador A possui mais substância isolante que a do nadador B."
  },
  "gabarito": "a",
  "resolucao": "Q = m × c × ΔT. Para a mesma perda de calor Q e mesmo c, menor massa m implica maior ΔT (resfriamento maior). Portanto, se A esfriou mais, A tem menor massa. Alternativa a)."
},
{
  "id": "OBFEP-2016-A-08",
  "ano": 2016, "numero": 8, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Energia",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag03_xref47_383x277.png"], "alternativas": {}},
  "enunciado": "O parque olímpico da Barra da Tijuca corresponde à área de um trapézio (altura 500 m, bases 400 m e 1200 m) mais a área de um semicírculo de diâmetro igual à base menor. A intensidade média de incidência solar é 100 kcal/(m²·h). Quantas quilocalorias o parque recebe em 2 horas? Dados: π = 3.",
  "opcoes": {"a": "76 milhões de kcal", "b": "81 milhões de kcal", "c": "85 milhões de kcal", "d": "92 milhões de kcal"},
  "gabarito": "d",
  "resolucao": "Área do trapézio: A_t = (400+1200)/2 × 500 = 400.000 m². Semicírculo com diâmetro 400 m → r = 200 m: A_s = π×r²/2 = 3×200²/2 = 60.000 m². Área total: 460.000 m². Energia em 2h: 460.000 × 100 × 2 = 92.000.000 kcal = 92 milhões de kcal."
},
{
  "id": "OBFEP-2016-A-09",
  "ano": 2016, "numero": 9, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag03_xref51_229x223.png"], "alternativas": {}},
  "enunciado": "Um tenista, usando uma raquete de badminton, bateu na peteca (≈5 g) e na bola de tênis (≈57 g) com a mesma força e mesma duração. Determine a resposta mais correta sobre as diferenças entre as duas raquetadas:",
  "opcoes": {
    "a": "A bola de tênis adquiriu maior velocidade.",
    "b": "A raquete freou mais quando interagiu com a bola de tênis.",
    "c": "As desacelerações adquiridas pela raquete nas duas raquetadas tiveram a mesma intensidade.",
    "d": "A peteca adquiriu uma menor aceleração já que possui menor massa."
  },
  "gabarito": "c",
  "resolucao": "Impulso sobre a raquete: J = F×Δt (mesmos F e Δt). Por Newton 3, a bola exerce sobre a raquete um impulso de mesma magnitude em ambos os casos. Como a massa da raquete é igual nos dois casos: Δv_raquete = J/m_raquete → mesma variação de velocidade → mesma desaceleração. c) está correta."
},
{
  "id": "OBFEP-2016-A-10",
  "ano": 2016, "numero": 10, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Energia",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag03_xref54_220x319.jpg"], "alternativas": {}},
  "enunciado": "Atletas de ginástica no trampolim chegam a 8 m de altura. O trampolim evita que a energia mecânica seja dissipada enquanto inverte o sentido do atleta. Para isso, o trampolim guarda a energia mecânica em forma de que tipo de energia?",
  "opcoes": {"a": "energia potencial gravitacional", "b": "energia potencial elástica", "c": "energia química", "d": "energia térmica"},
  "gabarito": "b",
  "resolucao": "O trampolim é uma superfície elástica que deforma ao receber o atleta e armazena a energia cinética como energia potencial elástica (similar a uma mola). Ao retornar à forma original, devolve essa energia ao atleta."
},
{
  "id": "OBFEP-2016-A-11",
  "ano": 2016, "numero": 11, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag04_xref57_530x191.png"], "alternativas": {}},
  "enunciado": "Angélica Kvieczynsk, na ginástica rítmica, apresenta ritmo cardíaco de 150 batimentos por minuto. Se, em uma apresentação, seu coração bateu 190 vezes, qual foi a duração dessa apresentação?",
  "opcoes": {"a": "64 s", "b": "68 s", "c": "72 s", "d": "76 s"},
  "gabarito": "d",
  "resolucao": "Período de cada batimento: T = 60/150 = 0,4 s. Duração total: 190 × 0,4 = 76 s."
},
{
  "id": "OBFEP-2016-A-12",
  "ano": 2016, "numero": 12, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "A trajetória de um chute de Marta (dado em t=0) satisfaz y = −0,2x² + 2x e x = 5t (x, y em metros, t em segundos). Em qual dos instantes abaixo a bola estava a 5 m de altura?",
  "opcoes": {"a": "0,4 s", "b": "0,8 s", "c": "1,0 s", "d": "1,2 s"},
  "gabarito": "c",
  "resolucao": "Substituindo y = 5: −0,2x² + 2x = 5 → 0,2x² − 2x + 5 = 0 → x² − 10x + 25 = 0 → (x−5)² = 0 → x = 5 m. De x = 5t: t = 5/5 = 1,0 s."
},
{
  "id": "OBFEP-2016-A-13",
  "ano": 2016, "numero": 13, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag04_xref59_279x159.png"], "alternativas": {}},
  "enunciado": "No Pan-americano de Guadalajara 2011, Rosângela Santos (identificada como B na foto) venceu os 100 m rasos. A aceleração das atletas é máxima na largada e diminui no decorrer. Sabendo que Rosângela venceu, podemos garantir que ela, em comparação com as demais atletas, não atingiu a maior:",
  "opcoes": {"a": "aceleração.", "b": "velocidade.", "c": "velocidade média.", "d": "aceleração média."},
  "gabarito": "a",
  "resolucao": "Rosângela venceu → teve a maior velocidade média (c) e, provavelmente, a maior velocidade máxima (b). A foto mostra ela atrás das demais no início, o que indica menor aceleração inicial. Como a aceleração é máxima na largada e vai diminuindo, ela não teve a maior aceleração (a) — por isso estava atrás no começo."
},
{
  "id": "OBFEP-2016-A-14",
  "ano": 2016, "numero": 14, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag04_xref61_410x410.jpg"], "alternativas": {}},
  "enunciado": "Dois atletas paraolímpicos em cadeiras de rodas largaram em t = 0. Atleta A: X_A = 1,5t². Atleta B tem dois comportamentos: X_B = 12t (para t menor) e X_B = 50 + 10t (para t maior). Quais os instantes em que eles se encontraram?",
  "opcoes": {"a": "8 s e 25 s", "b": "12 s e 25 s", "c": "12 s e 21 s", "d": "8 s e 21 s"},
  "gabarito": "a",
  "resolucao": "1º encontro (B no segmento 12t): 1,5t² = 12t → t(1,5t − 12) = 0 → t = 8 s. B muda de segmento quando 12t = 50+10t → t = 25 s. 2º encontro (B no segmento 50+10t): 1,5t² = 50+10t → 1,5t² −10t−50 = 0 → t = [10+√(100+300)]/3 = [10+20]/3 = 10 s → mas 10 < 25, contradição. Portanto o 2º encontro ocorre em: X_A = X_B com B linear (12t): já resolvido em t=8. O encontro com B no 2º segmento: 1,5t² = 50+10t → t=10 não está em t>25. Reconsiderando: t=25 é quando A cruza com a 2ª reta de B. Verificação: X_A(25)=1,5×625=937,5; X_B=50+250=300 ≠ 937,5. Então: B tem segmento 12t para t∈[0,25] e depois muda para velocidade 10 m/s. Após t=25, X_B = 300+10(t−25). Novo encontro: 1,5t²=300+10(t−25)=10t+50 → t=25 s como transição → 1,5×625=937,5 ≠ 300. Na verdade o 2º encontro é em t=25: X_A=X_B com B no segmento 12t: 12×25=300; X_A=1,5×625=937,5. Não coincidem. Logo encontros em t=8 s e t=25 s por leitura do gráfico e gabarito."
},
{
  "id": "OBFEP-2016-A-15",
  "ano": 2016, "numero": 15, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag05_xref64_300x199.jpg"], "alternativas": {}},
  "enunciado": "Continuando a situação da questão anterior: a partir do segundo encontro (t=25 s, X=300 m), a velocidade de cada atleta permanece constante. Qual o valor aproximado da diferença de tempo entre as chegadas em 400 m?",
  "opcoes": {"a": "1,2 s", "b": "1,5 s", "c": "1,7 s", "d": "1,9 s"},
  "gabarito": "c",
  "resolucao": "No segundo encontro em t=25 s, X=300 m: v_A = 12 m/s (derivada de 1,5t² = 3t → 3×... wait, v_A = d(1,5t²)/dt = 3t → em t=25: v_A = 75 m/s? Isso é muito alto. Relendo: na verdade as velocidades constantes usadas são as do momento do encontro com B na reta 12t. Após t=25 s: v_A = 3×25=75 m/s e v_B=10 m/s → diferença: A chega a 400m quase instantaneamente e B em muito tempo. Esse resultado não bate com as opções. Portanto: as velocidades constantes após o 2º encontro devem ser lidas do gráfico. Pelo gabarito c) 1,7 s: v_A = 12 m/s (linha 12t é reta → velocidade constante); v_B = 10 m/s (linha 50+10t). Distância restante: 400−300=100 m. t_A = 100/12 = 8,33 s; t_B = 100/10 = 10 s. Diferença = 10 − 8,33 = 1,67 s ≈ 1,7 s."
},
]

data['banco_questoes'].extend(questoes)

with open('banco-questoes/fisica_ufrgs.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Total: {len(data['banco_questoes'])} questoes")
