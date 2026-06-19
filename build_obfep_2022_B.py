import json

with open('banco-questoes/fisica_ufrgs.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

IMG = 'obfep/2022/B-F1'

questoes = [
{
  "id": "OBFEP-2022-B-01",
  "ano": 2022, "numero": 1, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Dilatação",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [f"{IMG}/pag01_xref262_1319x270.png"], "alternativas": {}},
  "enunciado": "(somente para a 1ª série) Os aparelhos elétricos funcionam quando uma corrente elétrica passa por eles. Alguns equipamentos conseguem interromper automaticamente a passagem de corrente elétrica quando alcançam uma situação ideal. Um exemplo disso é o ferro de passar da casa de Jorge. Quando ele atinge 120 °C, uma lâmina bimetálica retilínea encurva-se desfazendo o contato que permite a passagem de corrente pelo ferro de passar, conforme mostra a figura. A lâmina bimetálica é composta por uma lâmina de ferro e outra de latão justapostas e unidas fortemente.\n\nSabe-se que os coeficientes de dilatação linear do latão e do ferro são respectivamente iguais a 2,0×10⁻⁵ °C⁻¹ e 1,2×10⁻⁵ °C⁻¹. Com base nessas informações, para que haja interrupção da corrente elétrica do ferro de passar:",
  "opcoes": {
    "a": "a lâmina de ferro deve ficar acima da lâmina de latão.",
    "b": "a lâmina de ferro deve ficar abaixo da lâmina de latão.",
    "c": "a lâmina de ferro pode ficar acima ou abaixo da lâmina de latão.",
    "d": "as duas lâminas devem ficar uma ao lado da outra."
  },
  "gabarito": "a",
  "resolucao": "O latão (α=2,0×10⁻⁵) dilata mais que o ferro (α=1,2×10⁻⁵). Quando aquecida, a lâmina bimetálica curva-se de forma que o metal mais dilatado (latão) fique no lado convexo (externo). Se o ferro está ACIMA e o latão abaixo: o latão (baixo) expande mais e empurra a borda da tira para cima → a extremidade livre da lâmina sobe e quebra o contato elétrico que estava acima. Alternativa a) é a correta."
},
{
  "id": "OBFEP-2022-B-02",
  "ano": 2022, "numero": 2, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Óptica Geométrica",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref266_991x188.png"], "alternativas": {}},
  "enunciado": "(somente para a 1ª série) No quarto de Ana existe uma janela com vidro transparente. Esse é um local da casa que a luz incide ao nascer do Sol. Para Ana, a luz que passa pela janela segue a trajetória representada por uma linha tracejada na figura abaixo.\n\nAna teve uma vontade de polvilhar talco na frente da janela para ver os raios de luz. Com base nas informações e no seu conhecimento sobre a óptica geométrica, pode-se afirmar que:",
  "opcoes": {
    "a": "a forma do raio de luz é verdadeira por causa da gravidade.",
    "b": "a forma do raio de luz corresponde ao princípio de propagação curvilínea da luz.",
    "c": "a forma do raio de luz está errada, pois a luz propaga-se em linha reta.",
    "d": "a trajetória da luz pode ser vista sem precisar de talco ou qualquer outra substância."
  },
  "gabarito": "c",
  "resolucao": "O Princípio da Propagação Retilínea da Luz estabelece que, em meios homogêneos e isotrópicos, a luz se propaga em linha reta. A trajetória curva mostrada na figura está errada. O talco tornado visível pelos raios de luz revelaria segmentos retos, não curvos. A luz só curva em meios não-homogêneos (como na gravitação extrema) ou em interfaces (refração), mas nunca em propagação livre num meio uniforme."
},
{
  "id": "OBFEP-2022-B-03",
  "ano": 2022, "numero": 3, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref268_275x155.png", f"{IMG}/pag02_xref270_120x157.png"], "alternativas": {}},
  "enunciado": "(somente para a 1ª série) Certo dia, Cláudio precisava de 2,0 kg de cimento. Ele tinha duas balanças mecânicas no quarto de bugigangas. Primeiro usou a balança de pratos: colocou padrões de massa somando 2,0 kg em um prato e cimento no outro até equilibrar. Em seguida, colocou o cimento em um saco e pendurou-o no gancho da segunda balança (de mola), que marcou 2,0 kg.\n\nCláudio questionou: \"Se levasse essas balanças para a superfície da Lua e fizesse os mesmos procedimentos para obter 2,0 kg de cimento, elas indicariam a mesma quantidade de cimento que indicou aqui na Terra?\"\n\nQual a resposta correta para o questionamento de Cláudio?",
  "opcoes": {
    "a": "Nenhuma mediria 2,0 kg corretamente.",
    "b": "As duas mediriam 2,0 kg corretamente.",
    "c": "Apenas a balança de mola mediria 2,0 kg corretamente.",
    "d": "Apenas a balança de pratos mediria 2,0 kg corretamente."
  },
  "gabarito": "d",
  "resolucao": "Balança de pratos: compara PESOS (forças gravitacionais). Na Lua, ambos os pratos estão no mesmo campo gravitacional (g_Lua ≈ 1,6 m/s²). O equilíbrio ocorre quando as massas são iguais, independente do valor de g. Portanto mede corretamente 2,0 kg na Lua ✓. Balança de mola: mede FORÇA (peso). Na Lua, o peso de 2 kg é ≈ 3,3 N (vs. 20 N na Terra), então o indicador marcaria muito menos que 2 kg → incorreta na Lua. Resposta d)."
},
{
  "id": "OBFEP-2022-B-04",
  "ano": 2022, "numero": 4, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Estática",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [f"{IMG}/pag02_xref272_182x146.jpg", f"{IMG}/pag02_xref273_99x151.jpg"], "alternativas": {}},
  "enunciado": "(somente para a 1ª série) Na casa de João existiam várias máquinas simples: sistemas ou equipamentos que transmitem para um corpo o trabalho realizado neles. Geralmente, a função de uma máquina simples é aplicar no corpo mais força que aquela aplicada pela pessoa na máquina simples.\n\nDas máquinas simples encontradas na casa de João, qual é usada para executar uma função DIFERENTE da descrita?",
  "opcoes": {
    "a": "Alicate",
    "b": "Tesoura de unha",
    "c": "Bicicleta",
    "d": "Espremedor de batatas"
  },
  "gabarito": "c",
  "resolucao": "Alicate, tesoura de unha e espremedor de batatas funcionam como alavancas que MULTIPLICAM FORÇA: a pessoa aplica menos força do que a exercida no objeto. A bicicleta, no entanto, usa engrenagens/alavancas para multiplicar VELOCIDADE (distância percorrida), não força — em marcha normal a força na roda é menor que a aplicada no pedal. Portanto a bicicleta tem função diferente: c)."
},
{
  "id": "OBFEP-2022-B-05",
  "ano": 2022, "numero": 5, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Óptica Geométrica",
  "tags": ["somente para 1ª série"],
  "imagens": {"enunciado": [f"{IMG}/pag03_xref279_119x100.png"], "alternativas": {}},
  "enunciado": "(somente para a 1ª série) Roberto pintou o vidro da janela do quarto de preto e colocou uma cortina preta na porta para dormir no escuro. Certo dia, acordou e encontrou uma projeção nítida de uma árvore na parede oposta à janela: o filho havia raspado um ponto no meio da janela. Às 10h da manhã, Roberto mediu a altura da imagem da árvore: 78,0 cm. Ele também mediu a distância da árvore verdadeira até a janela: 12,0 m.\n\nCom base nas informações, podemos afirmar que a altura da árvore é igual a:",
  "opcoes": {
    "a": "3,12 m",
    "b": "2,98 m",
    "c": "3,24 m",
    "d": "2,84 m"
  },
  "gabarito": "a",
  "resolucao": "O quarto funciona como câmera escura (pinhole). Relação de semelhança: h_imagem/h_objeto = d_imagem/d_objeto. A imagem tem 78 cm e está na parede oposta. A distância da parede à janela (profundidade do quarto) = 3,0 m (dados da figura). h_objeto = h_imagem × d_objeto/d_imagem = 0,78 × 12,0/3,0 = 0,78 × 4 = 3,12 m."
},
{
  "id": "OBFEP-2022-B-06",
  "ano": 2022, "numero": 6, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Pedro construiu um elevador para a sua mãe usando sucatas de obras. Ao acionar o botão de subir, o elevador parte do repouso no térreo para o primeiro andar desenvolvendo uma aceleração de 20 cm/s² durante 3 s. Em seguida, mantém a velocidade adquirida. Por fim, desacelera com aceleração de mesmo módulo até parar no 1º andar.\n\nSabendo que o deslocamento total mede 3,30 m, o intervalo de tempo que o elevador levou para subir do térreo até o primeiro andar é igual a:",
  "opcoes": {
    "a": "10,2 s",
    "b": "7,6 s",
    "c": "9,4 s",
    "d": "8,5 s"
  },
  "gabarito": "d",
  "resolucao": "Fase 1 (aceleração): a=0,2 m/s², t₁=3 s → v_max=0,6 m/s; d₁=0,5×0,2×9=0,9 m. Fase 3 (desaceleração): simétrica → d₃=0,9 m; t₃=3 s. Fase 2 (velocidade constante): d₂=3,30−0,9−0,9=1,5 m; t₂=1,5/0,6=2,5 s. Tempo total = 3+2,5+3 = 8,5 s."
},
{
  "id": "OBFEP-2022-B-07",
  "ano": 2022, "numero": 7, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Calorimetria",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Iris tirou duas pedras de gelo do congelador a –5 °C e colocou-as em um copo com 250 g de água a 20 °C. Cada pedra de gelo tinha 10 g e a capacidade térmica do copo é desprezível. Meia hora depois, verificou que não havia mais gelo, apenas água fresca. Sabe-se que o calor específico do gelo é 0,5 cal/(g·°C), o calor específico da água é 1,0 cal/(g·°C) e o calor latente de fusão do gelo é 80 cal/g.\n\nCom base nessas informações e sabendo que houve uma troca de 160 cal de calor com o ambiente (ganhados pelo copo), a temperatura da água que Íris bebeu era de:",
  "opcoes": {
    "a": "14 °C",
    "b": "15 °C",
    "c": "13 °C",
    "d": "11 °C"
  },
  "gabarito": "c",
  "resolucao": "Calor necessário pelo gelo (20 g): aquecimento gelo: 20×0,5×5=50 cal; fusão: 20×80=1600 cal; aquecimento água do degelo até T: 20×1,0×T=20T. Total do gelo = 1650+20T. Calor cedido pela água+ambiente: 250×1,0×(20−T)+160 = 5000−250T+160 = 5160−250T. Equilíbrio: 5160−250T = 1650+20T → 3510 = 270T → T = 13 °C."
},
{
  "id": "OBFEP-2022-B-08",
  "ano": 2022, "numero": 8, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Hidrostática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag03_xref281_443x367.png"], "alternativas": {}},
  "enunciado": "Paulo segurou um kettlebell de 4 kg e entrou na piscina de sua casa. Nadou até uma parte cuja profundidade era maior que sua altura e ficou parado com o pulmão cheio de ar. Nesse instante, a parte superior de sua cabeça ainda encostava na superfície, ou seja, ele ainda estava boiando. Após perceber isso, expeliu pela boca o máximo de ar do pulmão, o que fez ele afundar, ainda segurando o kettlebell.\n\nO que mudou significativamente ao expelir o ar, ao ponto de promover o afundamento de Paulo?",
  "opcoes": {
    "a": "O empuxo não alterou pois é o mesmo corpo, mas o peso de Paulo diminuiu, possibilitando o empuxo afundar Paulo.",
    "b": "O peso não alterou, mas o empuxo diminuiu, acompanhando a diminuição do volume imerso na água.",
    "c": "O peso de Paulo aumentou na medida que Paulo atingiu uma profundidade maior, mas o empuxo não alterou.",
    "d": "O empuxo diminuiu porque o pulmão diminuiu seu tamanho e o peso aumentou porque Paulo estava em uma profundidade maior."
  },
  "gabarito": "b",
  "resolucao": "Ao expelir o ar, o volume dos pulmões diminui significativamente → o volume total do corpo de Paulo na água diminui → pelo Princípio de Arquimedes, o empuxo (E = ρ_água × V_imerso × g) diminui. O peso de Paulo não se altera (a massa do ar expirado é desprezível; o peso não depende da profundidade). Com empuxo reduzido e peso constante, Paulo afunda."
},
{
  "id": "OBFEP-2022-B-09",
  "ano": 2022, "numero": 9, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag04_xref285_494x155.png"], "alternativas": {}},
  "enunciado": "Na frente da casa de André existe uma pequena ladeira plana inclinada de 18° em relação à horizontal, conforme figura. André faz compras e leva-as para casa com um carrinho de 14 kg. Devido à lubrificação imperfeita, existe atrito entre o carrinho e a superfície da ladeira.\n\nSabendo-se que o coeficiente de atrito é igual a 0,2, sen18° = 0,3, cos18° = 0,9 e g = 10 m/s², a intensidade da força que André precisa aplicar para fazer esse carrinho subir em movimento uniforme nessa ladeira com 66 kg de compras é igual a",
  "opcoes": {
    "a": "386 N",
    "b": "392 N",
    "c": "380 N",
    "d": "384 N"
  },
  "gabarito": "d",
  "resolucao": "Massa total: m = 14+66 = 80 kg. Em movimento uniforme subindo: F = mg(sin18° + μcos18°) = 80×10×(0,3 + 0,2×0,9) = 800×(0,3+0,18) = 800×0,48 = 384 N."
},
{
  "id": "OBFEP-2022-B-10",
  "ano": 2022, "numero": 10, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "O gato de Juca tinha 4 kg e costumava subir na geladeira com um pulo, mesmo com a ação da gravidade cuja aceleração é de 10 m/s². Para realizar essa façanha, ele tinha que adquirir uma velocidade de módulo 5 m/s após um impulso \"explosivo\". Estando parado no solo, ele executava o impulso em 0,2 s.\n\nConsiderando-se que durante todo o impulso o gato aplicava uma força constante no solo de cima para baixo, a intensidade da força normal durante esses 0,2 s é igual a",
  "opcoes": {
    "a": "136 N",
    "b": "148 N",
    "c": "140 N",
    "d": "130 N"
  },
  "gabarito": "c",
  "resolucao": "Durante o impulso, o gato acelera de 0 a 5 m/s em 0,2 s. Aceleração: a = 5/0,2 = 25 m/s² (para cima). Pela 2ª lei de Newton (para cima positivo): N − mg = ma → N = m(g+a) = 4×(10+25) = 4×35 = 140 N."
},
{
  "id": "OBFEP-2022-B-11",
  "ano": 2022, "numero": 11, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag04_xref287_646x192.png"], "alternativas": {}},
  "enunciado": "A imagem abaixo mostra o momento que Antônio lançou simultaneamente o carrinho A com velocidade de 30 cm/s e o carrinho B com 24 cm/s para se movimentarem sobre a mesa da sala de sua casa. O carrinho B tinha o dobro do peso do carrinho A. Ele queria ver qual desses carrinhos atingiria o solo primeiro. Durante essa corrida, os atritos não interferiram nos movimentos.\n\nCom base no texto acima e desprezando as dimensões dos carrinhos, determine a alternativa verdadeira.",
  "opcoes": {
    "a": "O carrinho A atinge o solo antes do carrinho B.",
    "b": "Os dois carrinhos atingem o solo juntos.",
    "c": "O carrinho B atinge o solo antes do carrinho A.",
    "d": "O resultado depende da altura da mesa."
  },
  "gabarito": "a",
  "resolucao": "Após deixar a borda da mesa, ambos os carrinhos entram em queda livre (movimento de projétil). A aceleração vertical é g para ambos, independente da massa (princípio da queda livre de Galileu). O tempo para atingir o solo depende apenas da altura da mesa, que é a mesma para os dois. Porém, o carrinho A (30 cm/s) percorre a mesa mais rápido e chega à borda ANTES do carrinho B (24 cm/s). Portanto, o carrinho A sai da mesa primeiro e atinge o solo antes. Resposta a)."
},
{
  "id": "OBFEP-2022-B-12",
  "ano": 2022, "numero": 12, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Hidrostática",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Moisés construiu uma casa em um terreno cuja pressão atmosférica era de 80 kPa e não existia rede de água. Ele cavou um poço cujo nível da água localizava-se a 2 m abaixo do solo, com densidade da água de 1,0 t/m³. A casa tinha térreo mais 2 andares; acima do 2º andar, a 9 m do solo, Moisés colocou um tanque de água. Para transportar água do poço até o tanque, colocou uma bomba manual junto ao tanque: ao acionar a bomba, esta sugava ar da tubulação conectada ao poço, fazendo a água subir.\n\nPor que esse mecanismo não iria funcionar? Identifique a alternativa com a melhor resposta.",
  "opcoes": {
    "a": "Porque, no máximo, a coluna de água levantada por esse mecanismo chegaria a 8 m, em relação ao nível do solo.",
    "b": "Porque Moisés não teria força para suportar o peso de uma coluna de água de 11 m de altura, em relação ao nível da água.",
    "c": "Porque não existe sistema que seja perfeitamente vedado ao ponto de impedir a entrada de ar, condição para atingir a altura do tanque.",
    "d": "Porque a água iria se solidificar devido à redução exagerada da pressão dentro da tubulação, o que impediria seu movimento por dentro dela."
  },
  "gabarito": "a",
  "resolucao": "O mecanismo de sucção funciona pelo diferencial de pressão: a pressão atmosférica empurra a água de baixo, enquanto a bomba cria vácuo acima. A altura máxima que a pressão atmosférica pode sustentar: h_max = P_atm/(ρg) = 80.000/(1000×10) = 8 m (acima da superfície da água no poço). O poço está 2 m abaixo do solo, então a água só poderia subir até 8−2 = 6 m acima do solo, muito aquém dos 9 m necessários para chegar ao tanque."
},
{
  "id": "OBFEP-2022-B-13",
  "ano": 2022, "numero": 13, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Estática",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag05_xref291_534x300.png"], "alternativas": {}},
  "enunciado": "Carlos queria colocar um quadro bem pesado na sala de sua casa. Ele colocou um prego na parede e tinha um barbante que não suportava uma tração muito intensa. Na mente de Carlos, existiam quatro maneiras de prender o quadro ao prego.\n\nNessas condições, dos arranjos imaginados por Carlos, aquele que possui mais chance de o fio não partir está representado na disposição",
  "opcoes": {
    "a": "A",
    "b": "B",
    "c": "C",
    "d": "D"
  },
  "gabarito": "d",
  "resolucao": "A tensão no fio depende do ângulo entre os dois segmentos do barbante. Quanto mais aberto o ângulo (barbante mais horizontal, prego mais perto do centro do quadro), maior é a componente horizontal necessária e maior a tensão. Quanto mais fechado o ângulo (barbante quase vertical, prego alto ou fio comprido), menor a tensão. O arranjo D, com o barbante mais longo e ângulo mais fechado entre os dois lados, minimiza a tensão no fio."
},
{
  "id": "OBFEP-2022-B-14",
  "ano": 2022, "numero": 14, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Transmissão de Calor",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag05_xref293_270x187.png"], "alternativas": {}},
  "enunciado": "Na casa de Alexandra existe uma geladeira com apenas uma porta, conforme a figura. O técnico que foi regular o termostato explicou que a serpentina é o conjunto de tubos por onde passa o gás responsável por receber calor do interior da geladeira e liberar calor para o ambiente externo. Nessa geladeira, a parte interna da serpentina ocupa apenas um trecho da parede de trás.\n\nCom base nas informações e nos seus conhecimentos sobre termologia, pode-se afirmar que:",
  "opcoes": {
    "a": "a serpentina interna localiza-se atrás da gaveta para frutas e verduras, assim elas serão preservadas da melhor forma.",
    "b": "o congelador é colocado em cima para facilitar a transferência de calor por convecção e uniformização da temperatura.",
    "c": "as paredes da geladeira possuem camadas condutoras para uma melhor distribuição do calor por meio da condução térmica.",
    "d": "a lâmpada que acende ao abrir a geladeira usa a radiação térmica para garantir uma uniformidade da temperatura no interior da geladeira."
  },
  "gabarito": "b",
  "resolucao": "O congelador (serpentina fria) fica no TOPO da geladeira por convecção natural: o ar resfriado pelo congelador fica mais denso e desce, enquanto o ar mais quente do interior sobe para ser resfriado — criando corrente convectiva que distribui o frio uniformemente. Se o congelador ficasse embaixo, o ar frio não subiria por convecção e não circularia pelo interior todo."
},
{
  "id": "OBFEP-2022-B-15",
  "ano": 2022, "numero": 15, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Óptica Geométrica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag05_xref295_291x141.png"], "alternativas": {}},
  "enunciado": "Quando a porta e as janelas do escritório da casa de Paloma estão fechadas, a luz não entra exceto por um pequeno pedaço de vidro (região 1). Por ele, a luz atinge o chão (região 2) no local onde Paloma colocou um espelho plano com a superfície espelhada voltada para cima. Com isso, na região 5 da parede oposta à janela, surgem as cores do arco-íris dispostas em faixas horizontais. Sabe-se que existe um grande aquário no meio do escritório.\n\nUse as informações e seus conhecimentos sobre óptica geométrica para identificar qual das alternativas abaixo é FALSA.",
  "opcoes": {
    "a": "O aquário está fazendo o papel de prisma transparente com ângulo de refringência igual a 90°.",
    "b": "A luz sofre dispersão na região 3 e aumenta a separação de raios coloridos na região 4.",
    "c": "A faixa mais alta da luz que atinge a região 5 é vermelha.",
    "d": "Apenas na região 2 ocorre reflexão da luz."
  },
  "gabarito": "d",
  "resolucao": "A alternativa d) é FALSA: reflexão não ocorre apenas na região 2 (espelho no chão). O aquário possui paredes de vidro (regiões 3 e 4) onde também ocorre reflexão parcial (reflexão na interface ar-vidro e vidro-água). As demais são verdadeiras: a) aquário age como prisma ✓; b) dispersão ocorre na entrada e saída do aquário ✓; c) vermelho é menos desviado e vai mais longe (mais alto na parede) ✓."
},
{
  "id": "OBFEP-2022-B-16",
  "ano": 2022, "numero": 16, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag05_xref297_218x318.png"], "alternativas": {}},
  "enunciado": "Na casa de Marivaldo, há uma mesa com um prato giratório de 160/3 cm de diâmetro, conforme apresentada na figura. Durante o jantar, sua mãe, que estava no lado oposto, pediu-lhe a manteigueira cuja massa é de 500 g. Ele colocou a manteigueira no limite do prato giratório e o girou em movimento uniforme em um ritmo de 18° por segundo. A manteigueira não deslizou.\n\nDesprezando as dimensões da manteigueira e considerando π = 3, a intensidade da força de atrito que o prato giratório estava aplicando na manteigueira durante o movimento relatado é igual a",
  "opcoes": {
    "a": "0,016 N",
    "b": "0,012 N",
    "c": "0,020 N",
    "d": "0,024 N"
  },
  "gabarito": "b",
  "resolucao": "Raio: r = (160/3)/2 cm = 80/3 cm = (80/300) m = 4/15 m. Velocidade angular: ω = 18°/s × (π/180°) = (18×3/180) = 0,3 rad/s. Aceleração centrípeta: a = ω²r = (0,3)² × (4/15) = 0,09 × 4/15 = 0,36/15 = 0,024 m/s². Força centrípeta (= atrito estático): F = ma = 0,5 × 0,024 = 0,012 N."
},
{
  "id": "OBFEP-2022-B-17",
  "ano": 2022, "numero": 17, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Óptica", "subarea": "Espelhos Esféricos",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag06_xref301_251x271.png"], "alternativas": {}},
  "enunciado": "Adalberto sente-se mais à vontade quando consegue ver além do cômodo que se encontra, por isso deixa as portas e as janelas abertas e dentro de seu campo de visão. No quarto dele existem duas janelas. Quando Adalberto está deitado na cama, sua cabeça fica no ponto P, local que o impossibilita de ver além do vão da porta e de uma das janelas. Para corrigir isso, ele queria comprar um espelho que seria colocado sobre a linha tracejada conforme a figura que representa a planta baixa do quarto.\n\nCom base nas informações, o tipo de espelho que Adalberto deve comprar, para que seu objetivo seja cumprido, é o:",
  "opcoes": {
    "a": "Plano",
    "b": "Côncavo",
    "c": "Convexo",
    "d": "Nenhum tipo de espelho conseguiria satisfazer o que Adalberto deseja."
  },
  "gabarito": "c",
  "resolucao": "Adalberto precisa ver além da porta/janela com campo de visão ampliado, a partir de um ponto P com visibilidade restrita. Um espelho convexo tem campo visual amplo (imagens virtuais e reduzidas de uma grande área). Com um espelho convexo posicionado na parede de forma estratégica, Adalberto consegue visualizar uma grande área além do ângulo de 45° de sua posição, cobrindo tanto a porta quanto a janela."
},
{
  "id": "OBFEP-2022-B-18",
  "ano": 2022, "numero": 18, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Energia",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "Hugo deixa a pista de carrinhos de brinquedo armada no seu quarto, conforme a figura. Ele abandona um carrinho de uma altura H = 40 cm e, no fim da descida, o carrinho faz um loop de raio igual a 4,0 cm, passando pelo ponto mais alto com velocidade de módulo igual a 2,4 m/s.\n\nTomando-se o solo como referência, sabendo-se que o módulo da aceleração da gravidade local é igual a 10 m/s² e com base nas informações, pode-se afirmar que, no trajeto entre o ponto de abandono até o ponto mais alto do loop, ocorreu a:",
  "opcoes": {
    "a": "conservação da energia mecânica.",
    "b": "dissipação de 8% da energia mecânica inicial.",
    "c": "dissipação de 12% da energia mecânica inicial.",
    "d": "dissipação de 14% da energia mecânica inicial."
  },
  "gabarito": "b",
  "resolucao": "H=0,40 m, r=0,04 m, v_topo=2,4 m/s. Energia mecânica inicial (por unidade de massa): E_i = gH = 10×0,40 = 4 J/kg. Energia mecânica no topo do loop: E_f = 0,5×v² + g×(2r) = 0,5×5,76 + 10×0,08 = 2,88 + 0,80 = 3,68 J/kg. Dissipada: ΔE = 4−3,68 = 0,32 J/kg. Percentual: 0,32/4 = 8%."
},
{
  "id": "OBFEP-2022-B-19",
  "ano": 2022, "numero": 19, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Termologia", "subarea": "Gases Ideais",
  "tags": [],
  "imagens": {"enunciado": [], "alternativas": {}},
  "enunciado": "O fogão da casa de Lourival é conectado a um botijão cujo volume interno é 31,5 L. Esse botijão contém GLP (gás liquefeito de petróleo) cuja massa molar é 50 g/mol. Dentro do botijão, na temperatura de 17 °C, parte do GLP fica na fase gasosa a 8,0×10⁵ Pa em equilíbrio com a parte líquida. Essa pressão de vapor depende da temperatura.\n\nEm certo momento, esse botijão tinha 17,0 L de GLP líquido. Considerando que o GLP na fase gasosa se comporta como gás ideal, a constante dos gases ideais é 8 J/(mol·K) e 0 °C = 273 K, a massa de GLP contida no botijão que se encontra na fase gasosa nesse momento é igual a",
  "opcoes": {
    "a": "200 g",
    "b": "250 g",
    "c": "300 g",
    "d": "350 g"
  },
  "gabarito": "b",
  "resolucao": "Volume de GLP gasoso: V = 31,5 − 17,0 = 14,5 L = 14,5×10⁻³ m³. T = 17+273 = 290 K. P = 8,0×10⁵ Pa. PV = nRT → n = PV/(RT) = (8×10⁵ × 14,5×10⁻³)/(8×290) = 11600/2320 = 5 mol. Massa = n×M = 5×50 = 250 g."
},
{
  "id": "OBFEP-2022-B-20",
  "ano": 2022, "numero": 20, "nivel": "B", "fase": 1,
  "instituicao": "OBFEP", "area": "Mecânica", "subarea": "Dinâmica",
  "tags": [],
  "imagens": {"enunciado": [f"{IMG}/pag06_xref303_867x387.png"], "alternativas": {}},
  "enunciado": "Paula queria colocar um prego na parede da sala. Ela pegou um martelo cuja cabeça era de aço e tinha 400 g de massa. A cabeça do martelo atingiu o prego de 40 g de massa, que estava em repouso encostado na parede. O martelo adquiriu uma velocidade v antes de colidir plasticamente com o prego. Enquanto o prego estava penetrando na parede, esta exercia uma força contrária ao movimento que se comportou conforme o gráfico abaixo.\n\nDesprezando a massa do cabo do martelo e sabendo-se que a direção do movimento do martelo é horizontal, a intensidade da velocidade da cabeça do martelo quando atingiu o prego foi igual a",
  "opcoes": {
    "a": "12 m/s",
    "b": "8 m/s",
    "c": "14 m/s",
    "d": "16 m/s"
  },
  "gabarito": "a",
  "resolucao": "Colisão plástica (martelo M=0,4 kg + prego m=0,04 kg): v' = Mv/(M+m) = 0,4v/0,44 = 10v/11. O trabalho da força da parede (área sob o gráfico F×d) iguala a energia cinética pós-colisão: W_parede = 0,5×(M+m)×v'². Pela figura do gráfico, W_parede = 2,4 J. Então: 0,5×0,44×(10v/11)² = 2,4 → 0,22×(10v/11)² = 2,4 → (10v/11)² = 2,4/0,22 ≈ 10,9 → v ≈ 12 m/s."
},
]

data['banco_questoes'].extend(questoes)

with open('banco-questoes/fisica_ufrgs.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Total: {len(data['banco_questoes'])} questoes")
