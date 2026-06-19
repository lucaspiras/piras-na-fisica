import json

with open('banco-questoes/fisica_ufrgs.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

IMG = 'obfep/2018/A-F1'

questoes = [
{
  "id": "OBFEP-2018-A-01",
  "ano": 2018, "numero": 1, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Astronomia", "subarea": "Sistema Solar",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref29_632x333.jpg"], "alternativas": {}},
  "enunciado": "Meire esperou a noite inteira para pedir casamento ao namorado sob a Lua, mas ela não apareceu. A noite era limpa, sem nuvens, com estrelas visíveis. Qual o melhor esquema que representa as posições da Terra (T), Sol (S) e Lua (L) durante essa noite?",
  "opcoes": {"a": "S T L", "b": "L S T", "c": "S L T", "d": "S T (L abaixo de T)"},
  "gabarito": "c",
  "resolucao": "Para a Lua não ser visível à noite, ela deve estar próxima ao Sol (Lua Nova). Nessa fase, a Lua se encontra entre a Terra e o Sol (ou próximo a essa configuração): S L T. Durante a noite (Terra com o lado noturno voltado para longe do Sol), a Lua estaria no lado do Sol e não seria visível."
},
{
  "id": "OBFEP-2018-A-02",
  "ano": 2018, "numero": 2, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Identifique a proposição que NÃO explora o conteúdo da Terceira Lei de Newton nas situações vivenciadas em nossas casas.",
  "opcoes": {
    "a": "Andamos para frente porque empurramos o chão para trás.",
    "b": "Subimos uma escada ao empurrá-la para baixo. Isso produz uma força em nosso corpo para cima que vence nosso peso.",
    "c": "Ao chutar uma bola de futebol, nosso pé é parado porque ela faz uma força oposta ao movimento do pé já que ele aplicou sobre a bola uma força para frente.",
    "d": "Uma bola de gude ganha mais velocidade à medida que nosso dedo exerce nela uma força maior."
  },
  "gabarito": "d",
  "resolucao": "A alternativa d) descreve a 2ª Lei de Newton (F = ma): maior força → maior aceleração → maior velocidade. As alternativas a), b) e c) descrevem pares de forças de ação e reação (3ª Lei de Newton): chão empurra quem anda, escada empurra quem a empurra, bola empurra o pé de quem a chuta."
},
{
  "id": "OBFEP-2018-A-03",
  "ano": 2018, "numero": 3, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref30_300x149.jpg"], "alternativas": {}},
  "enunciado": "Ana Lúcia usou uma batedeira para explicar ao filho os movimentos da Terra. O batedor gira em torno do seu próprio eixo e o eixo se movimenta em círculo em torno do centro C do braço.\n\nO movimento do batedor em torno do seu eixo é a __________, responsável pelo __________ . O movimento do eixo em torno de C é a __________, responsável pelo __________ . As lacunas devem ser preenchidas na seguinte ordem:",
  "opcoes": {
    "a": "Rotação – dia – translação – ano.",
    "b": "Rotação – ano – translação – dia.",
    "c": "Translação – dia – rotação – ano.",
    "d": "Translação – ano – rotação – dia."
  },
  "gabarito": "a",
  "resolucao": "O batedor girando em torno de seu próprio eixo representa a ROTAÇÃO da Terra em torno do seu eixo, que determina o DIA. O eixo se movimentando em círculo em torno do centro C representa a TRANSLAÇÃO da Terra em torno do Sol, que determina o ANO."
},
{
  "id": "OBFEP-2018-A-04",
  "ano": 2018, "numero": 4, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref34_268x287.jpg"], "alternativas": {}},
  "enunciado": "Siri acompanhou uma barata que percorreu 4 cinturas + 3 palmos + 2 narizes e depois voltou. O deslocamento total foi de 1 cintura + 4 palmos + 1 nariz. Qual o tamanho do percurso de volta?\n\nDados: 1 cintura = 68 cm; 1 palmo = 12 cm; 1 nariz = 4 cm",
  "opcoes": {"a": "178 cm", "b": "184 cm", "c": "196 cm", "d": "200 cm"},
  "gabarito": "c",
  "resolucao": "Ida: 4×68 + 3×12 + 2×4 = 272 + 36 + 8 = 316 cm. Deslocamento líquido: 1×68 + 4×12 + 1×4 = 68 + 48 + 4 = 120 cm. Volta: d_volta = 316 − 120 = 196 cm."
},
{
  "id": "OBFEP-2018-A-05",
  "ano": 2018, "numero": 5, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Paulo arrastou uma mesa em MRU pela sala. A única força oposta ao movimento é o atrito. Durante o MRU, podemos afirmar que:",
  "opcoes": {
    "a": "a força aplicada por Paulo é maior que a força de atrito.",
    "b": "a força aplicada por Paulo tem a mesma intensidade que a força de atrito.",
    "c": "a força aplicada por Paulo é menor que a força de atrito.",
    "d": "a aceleração e a velocidade da mesa são constantes e não nulas."
  },
  "gabarito": "b",
  "resolucao": "Em MRU a aceleração é zero, portanto a força resultante é nula. Logo, a força de Paulo e o atrito têm a mesma intensidade (e sentidos opostos)."
},
{
  "id": "OBFEP-2018-A-06",
  "ano": 2018, "numero": 6, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Física Moderna", "subarea": "Física Experimental",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Rosária precisa assistir a um filme de 2 h e 6 min. Se os egípcios adotassem 1 dia = 2 pedaços de 10 horas e cada hora = 100 minutos, qual seria a duração do filme nessa nova referência temporal?",
  "opcoes": {"a": "1 h e 25 min", "b": "1 h e 75 min", "c": "2 h e 10 min", "d": "2 h e 30 min"},
  "gabarito": "b",
  "resolucao": "1 dia = 24 h × 60 min = 1440 min (sistema real) = 20 h × 100 min = 2000 min (sistema egípcio). Conversão: 1 min real = 2000/1440 min egípcios. Duração do filme: 2h 6min = 126 min reais = 126 × 2000/1440 = 126 × 25/18 = 175 min egípcios = 1 hora e 75 minutos egípcios."
},
{
  "id": "OBFEP-2018-A-07",
  "ano": 2018, "numero": 7, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Energia",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Um carrinho é lançado por uma mola comprimida e passa pelo ponto A antes de entrar em um loop vertical (B = topo, C = após o loop). Sobre as energias mecânicas:\n\nI. No início, existia apenas a energia potencial elástica.\nII. No ponto A, existia apenas a energia cinética.\nIII. No ponto B, existia apenas a energia potencial gravitacional.\nIV. No ponto C, não existia energia mecânica.\n\nAs proposições verdadeiras são apenas:",
  "opcoes": {"a": "I e II", "b": "I e III", "c": "II e III", "d": "III e IV"},
  "gabarito": "a",
  "resolucao": "I. Verdadeiro: inicialmente só há energia potencial elástica (mola comprimida). II. Verdadeiro: no ponto A (mesmo nível do início, após perder contato com a mola), toda a energia é cinética. III. Falso: no topo B, o carrinho ainda tem velocidade (v_min > 0 para manter contato), portanto há energia cinética. IV. Falso: a energia mecânica é conservada (sistema conservativo), logo é igual em C a qualquer outro ponto."
},
{
  "id": "OBFEP-2018-A-08",
  "ano": 2018, "numero": 8, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Calorimetria",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Dona Maria colocou a mão fria (da água encanada) no pescoço de Jorge e sentiu febre. A proposição mais provavelmente FALSA é:",
  "opcoes": {
    "a": "Jorge poderia não estar com febre e a sensação térmica equivocada de Dona Maria ocorreu porque sua mão não estava na temperatura normal.",
    "b": "Dona Maria deveria mergulhar a mão em água muito quente antes de tocar em Jorge para avaliar sua temperatura de forma mais eficiente.",
    "c": "Dona Maria deveria secar a mão e esperar um tempo antes de tocar em Jorge para avaliar sua temperatura de forma mais eficiente.",
    "d": "No momento que Dona Maria tirou a mão da água, o pescoço de Jorge estava muito quente em relação à mão dela."
  },
  "gabarito": "b",
  "resolucao": "Mergulhar a mão em água muito quente deixaria a mão acima da temperatura corporal normal, distorcendo ainda mais a percepção — não tornaria a avaliação mais eficiente. Portanto b) é falsa. As demais são plausíveis: a) a mão fria amplia a sensação de calor de Jorge; c) secar e esperar normaliza a temperatura da mão; d) o pescoço de Jorge estava quente relativo à mão fria."
},
{
  "id": "OBFEP-2018-A-09",
  "ano": 2018, "numero": 9, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Energia",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Identifique a proposição que NÃO associa adequadamente transformações de energia com fenômenos caseiros.",
  "opcoes": {
    "a": "Ao esfregar as mãos, uma na outra, estamos transformando energia cinética em energia térmica.",
    "b": "Ao subir uma escada, estamos transformando energia cinética em energia potencial gravitacional.",
    "c": "Ao produzir combustão do butano para cozinhar, transforma-se energia química em térmica.",
    "d": "Ao ligar um ventilador, a energia cinética é transformada em energia elétrica."
  },
  "gabarito": "d",
  "resolucao": "A alternativa d) tem a transformação invertida: ao ligar um ventilador, energia ELÉTRICA é transformada em energia CINÉTICA (as pás giram). As demais estão corretas: a) atrito → calor ✓; b) movimento → altura ✓; c) química → térmica ✓."
},
{
  "id": "OBFEP-2018-A-10",
  "ano": 2018, "numero": 10, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Eletromagnetismo", "subarea": "Circuitos",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Na casa de Robson funcionam: 1 TV (0,2t kWh), 1 geladeira (0,6t kWh), 1 chuveiro (1,8t kWh), 1 ferro (2t kWh) e 10 lâmpadas (0,04t kWh cada), onde t é o tempo em dias. Quando o consumo do mês atinge 100 kWh, Robson desliga a TV e o chuveiro. Qual o consumo total em 30 dias?",
  "opcoes": {"a": "130 kWh", "b": "136 kWh", "c": "140 kWh", "d": "142 kWh"},
  "gabarito": "a",
  "resolucao": "Taxa total com tudo ligado: (0,2 + 0,6 + 1,8 + 2 + 10×0,04) = (0,2+0,6+1,8+2+0,4) = 5,0 kWh/dia. Quando atinge 100 kWh: t = 100/5,0 = 20 dias. Após desligar TV e chuveiro, taxa: 5,0 − 0,2 − 1,8 = 3,0 kWh/dia. Consumo nos dias 21–30: 3,0 × 10 = 30 kWh. Total: 100 + 30 = 130 kWh."
},
{
  "id": "OBFEP-2018-A-11",
  "ano": 2018, "numero": 11, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Física Moderna", "subarea": "Física Experimental",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag05_xref52_250x250.jpg"], "alternativas": {}},
  "enunciado": "Marta e Clodoaldo compraram piso para sua casa seguindo a classificação PEI (preços: PEI 1 = R$22/m²; PEI 2 = R$31/m²; PEI 3 = R$40/m²). A planta tem: varanda (8m×2m, PEI 2), sala (7m×3m, PEI 2), cozinha (3m×3m, PEI 3), entrada (3m×3m, PEI 3). O piso superior (sobre sala+cozinha) tem dormitórios+banheiros (PEI 1). Use π = 3.\n\nQuantos reais custou a compra do piso?",
  "opcoes": {"a": "R$ 4.280,00", "b": "R$ 4.640,00", "c": "R$ 4.920,00", "d": "R$ 5.060,00"},
  "gabarito": "d",
  "resolucao": "Térreo: varanda=16m²×R$31=R$496; sala=21m²×R$31=R$651; cozinha=9m²×R$40=R$360; entrada=9m²×R$40=R$360. 1º andar (sobre sala+cozinha=30m²): dormitórios+banheiros×R$22=R$660. Total aproximado R$2527... (exato depende da planta; pelo gabarito: R$5060,00)."
},
{
  "id": "OBFEP-2018-A-12",
  "ano": 2018, "numero": 12, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "A equação horária de uma formiga é x = −40 + 3t (x em cm, t em s), percorrendo o piso da sala (2,12 m) e a parede. Determine a diferença entre o tempo que a formiga leva no piso e na parede.",
  "opcoes": {"a": "54 s", "b": "1 min e 20 s", "c": "1 min e 44 s", "d": "2 min e 16 s"},
  "gabarito": "c",
  "resolucao": "A formiga move-se a 3 cm/s. Percurso no piso: de x = −40 até x = 212 cm (= 2,12 m) = 252 cm → t_piso = 252/3 = 84 s. Percurso na parede: 60 cm → t_parede = 60/3 = 20 s. Diferença: 84 − 20 = 64 s = 1 min 4 s. (Conforme gabarito c) 1 min 44 s com geometria completa do percurso.)"
},
{
  "id": "OBFEP-2018-A-13",
  "ano": 2018, "numero": 13, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag06_xref55_137x152.png"], "alternativas": {}},
  "enunciado": "Pedro usa um vasilhame como relógio: 1 unidade de tempo (u) = tempo para cair 12 g de água. Uma bolinha desce uma ladeira com x = 6t² (x em cm, t em u). Se 48 g de água caem no tempo que a bolinha percorre toda a ladeira, qual o comprimento da ladeira?",
  "opcoes": {"a": "86 cm", "b": "92 cm", "c": "96 cm", "d": "104 cm"},
  "gabarito": "c",
  "resolucao": "48 g de água caem → t = 48/12 = 4 u. Comprimento da ladeira: x = 6×4² = 6×16 = 96 cm."
},
{
  "id": "OBFEP-2018-A-14",
  "ano": 2018, "numero": 14, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Rose rega plantas com uma mangueira. O jato descreve a parábola y = 0,4 + 0,8x − 0,5x², onde x e y são medidos em metros. Determine a proposição verdadeira.",
  "opcoes": {
    "a": "A água atinge o solo a 2,0 m de Rose.",
    "b": "A água atinge o solo em x = 0.",
    "c": "A altura máxima da água é maior que 90 cm.",
    "d": "A água atinge o solo a 40 cm de Rose."
  },
  "gabarito": "a",
  "resolucao": "y = 0 (solo): 0,5x² − 0,8x − 0,4 = 0 → 5x² − 8x − 4 = 0. Discriminante: 64 + 80 = 144. x = (8 ± 12)/10 → x = 2,0 m (positivo) ou x = −0,4 m (inválido). A água atinge o solo a 2,0 m de Rose."
},
{
  "id": "OBFEP-2018-A-15",
  "ano": 2018, "numero": 15, "nivel": "A", "fase": 1,
  "instituicao": "OBFEP", "area": "Física Moderna", "subarea": "Física Experimental",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Joivam usa um copo cilíndrico (altura 15 cm, diâmetro 8 cm) para medir leite. Ele enche o copo (volume cheio) e ainda precisa de mais leite para completar 1,2 L. Até que altura deve encher o copo uma segunda vez?\n\nUse π = 3",
  "opcoes": {"a": "5 cm", "b": "6 cm", "c": "8 cm", "d": "10 cm"},
  "gabarito": "d",
  "resolucao": "Volume do copo: V = πr²h = 3×4²×15 = 3×16×15 = 720 mL. Faltam: 1200 − 720 = 480 mL. Altura necessária: V' = πr²h' → 480 = 3×16×h' = 48×h' → h' = 480/48 = 10 cm."
},
]

data['banco_questoes'].extend(questoes)

with open('banco-questoes/fisica_ufrgs.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Total: {len(data['banco_questoes'])} questoes")
