# extrair-figuras-paginas.ps1
# Irmao de extrair-figuras-eds.ps1, para as figuras que nascem numa pagina
# comum do site: listas de exercicios e apresentacoes. Gera .svg avulsos e
# autossuficientes em img/animacoes/<assunto>/, prontos para slide, prova ou
# outro site. Rodar da raiz do projeto:
#
#     powershell -File scripts\extrair-figuras-paginas.ps1
#
# Cada figura declara um PERFIL, que diz de onde sai a paleta e como se resolve
# o tema escuro do arquivo avulso:
#
#   lista       -> atividades/listas/listas.css, secao "FIGURAS DAS LISTAS",
#                  classes .fg-*. As paginas das listas acompanham o tema do
#                  site, entao o escuro sai do proprio [data-theme="dark"].
#   apresentacao-> css/apresentacoes.css, secao "FIGURAS DAS APRESENTACOES",
#                  classes .fga-*. Os decks sao claros por decisao de projeto e
#                  nao tem bloco escuro; ele vem da tabela $TemasEscuros abaixo,
#                  como acontece nos EDs.
#
# Diferenca comum aos dois perfis, em relacao ao script dos EDs: as pontas de
# seta ficam num <svg> de defs compartilhado pela pagina inteira. O arquivo
# avulso precisa levar as suas, senao o marker-end aponta para nada; o script
# copia so os <marker> que a figura usa e os desconsidera na conferencia.
#
# Figura com animacao: use CSS (@keyframes), nao SMIL. O prefers-reduced-motion
# do CSS nao alcanca SMIL, e resolver ali exigiria JavaScript no deck E no
# arquivo avulso. Com @keyframes, uma media query resolve nos dois. O script
# copia os @keyframes e o bloco de movimento reduzido apenas para as figuras
# que usam alguma classe com animation:.
#
# Ao final, confere que a assinatura de elementos do desenho gerado e' igual a
# do inline, desconsiderando o <defs> injetado. Divergiu, falha.
#
# Para acrescentar uma figura: ponha data-avulso="<assunto>/<nome>" no <svg> da
# pagina, garanta que nenhuma cor esta em atributo, e adicione uma linha em
# $Figuras. Depois cadastre no catalogo img/animacoes/index.html.

$ErrorActionPreference = 'Stop'

# ----------------------------------------------------------------------------
# MANIFESTO
# ----------------------------------------------------------------------------
$LISTA_FORCAS = 'atividades/listas/forcas/lista_1_peso_normal_tracao.html'
$LISTA_ATRITO = 'atividades/listas/forcas/lista_2_atrito.html'
$LISTA_ASSOC  = 'atividades/listas/circuitos/lista_3_associacao_resistores.html'

$Figuras = @(
  @{ Html = $LISTA_FORCAS
     Slug = 'forcas/4-forca-inclinada-e-normal'
     Resumo = 'Forca empurrando o bloco 30 graus abaixo da horizontal: a normal passa do peso.' }

  @{ Html = $LISTA_FORCAS
     Slug = 'forcas/5-normal-no-plano-inclinado'
     Resumo = 'Normal e peso num plano inclinado de 30 graus, saindo do mesmo ponto do bloco.' }

  @{ Html = $LISTA_FORCAS
     Slug = 'forcas/6-dois-blocos-ligados-por-fio'
     Resumo = 'Dois blocos ligados por um fio sobre a mesa, puxados por uma forca horizontal.' }

  @{ Html = $LISTA_FORCAS
     Slug = 'forcas/7-luminaria-em-dois-fios'
     Resumo = 'Luminaria sustentada por dois fios simetricos a 30 graus do teto.' }

  @{ Html = $LISTA_FORCAS
     Slug = 'forcas/8-maquina-de-atwood'
     Resumo = 'Maquina de Atwood: polia fixa no teto com 3 kg de um lado e 5 kg do outro.' }

  @{ Html = $LISTA_FORCAS
     Slug = 'forcas/9-bloco-na-mesa-e-corpo-pendurado'
     Resumo = 'Bloco na mesa ligado por fio que passa na polia da borda ate um corpo pendurado.' }

  @{ Html = $LISTA_FORCAS
     Slug = 'forcas/10-elevador-freando-na-descida'
     Resumo = 'Cabine de elevador em corte, com lustre e pessoa na balanca, descendo e freando.' }

  @{ Html = $LISTA_FORCAS
     Slug = 'forcas/11-tres-blocos-em-serie'
     Resumo = 'Tres blocos em serie na mesa, ligados por dois fios, puxados por uma forca.' }

  @{ Html = $LISTA_FORCAS
     Slug = 'forcas/12-bloco-preso-na-rampa'
     Resumo = 'Bloco em repouso na rampa de 30 graus, preso por fio paralelo a superficie.' }

  @{ Html = $LISTA_FORCAS
     Slug = 'forcas/13-rampa-com-polia-no-topo'
     Resumo = 'Rampa de 30 graus com polia no topo e corpo pendurado do outro lado do fio.' }

  @{ Html = $LISTA_ATRITO
     Slug = 'forcas/31-dinamometro-puxando-bloco'
     Resumo = 'Bloco na mesa puxado por um dinamometro de mola mantido na horizontal.' }

  @{ Html = $LISTA_ATRITO
     Slug = 'forcas/32-forca-inclinada-puxando-com-atrito'
     Resumo = 'Bloco puxado por corda a 37 graus acima da horizontal, com normal, peso e atrito.' }

  @{ Html = $LISTA_ATRITO
     Slug = 'forcas/33-apagador-contra-o-quadro'
     Resumo = 'Apagador apertado contra o quadro vertical: o atrito para cima equilibra o peso.' }

  @{ Html = $LISTA_ATRITO
     Slug = 'forcas/34-bloco-parado-na-rampa-com-atrito'
     Resumo = 'Bloco em repouso na rampa de 37 graus, com o atrito apontando rampa acima.' }

  @{ Html = $LISTA_ATRITO
     Slug = 'forcas/35-caixa-empurrada-rampa-acima'
     Resumo = 'Caixa empurrada rampa acima por forca paralela, subindo com velocidade constante.' }

  @{ Html = $LISTA_ATRITO
     Slug = 'forcas/36-blocos-encostados-com-atrito'
     Resumo = 'Dois blocos encostados no piso com atrito, empurrados por uma forca horizontal.' }

  @{ Html = $LISTA_ATRITO
     Slug = 'forcas/37-blocos-ligados-com-atrito'
     Resumo = 'Dois blocos ligados por fio no piso com atrito, puxados por uma forca horizontal.' }

  @{ Html = $LISTA_ATRITO
     Slug = 'forcas/38-mesa-com-atrito-e-corpo-pendurado'
     Resumo = 'Bloco na mesa com atrito ligado, pela polia da borda, a um corpo pendurado.' }

  @{ Html = $LISTA_ATRITO
     Slug = 'forcas/39-bloco-sobre-bloco'
     Resumo = 'Bloco apoiado sobre outro, puxado por baixo: atrito entre os blocos, piso liso.' }

  @{ Html = $LISTA_ATRITO
     Slug = 'forcas/40-rampa-com-atrito-e-polia'
     Resumo = 'Rampa de 37 graus com atrito e polia no topo, com corpo pendurado do outro lado.' }

  @{ Html = $LISTA_ATRITO
     Slug = 'forcas/41-mesa-entre-dois-corpos-pendurados'
     Resumo = 'Bloco na mesa com atrito entre dois corpos pendurados, um em cada borda.' }

  @{ Html = $LISTA_ATRITO
     Slug = 'forcas/42-caixa-na-carroceria'
     Resumo = 'Caminhonete em movimento com uma caixa solta sobre a carroceria.' }

  @{ Html = $LISTA_ATRITO
     Slug = 'forcas/43-bloco-lancado-rampa-acima'
     Resumo = 'Bloco lancado da base de uma rampa de 37 graus com atrito, subindo.' }

  @{ Html = $LISTA_ATRITO
     Slug = 'forcas/44-forca-inclinada-empurrando-com-atrito'
     Resumo = 'Bloco em repouso empurrado por forca a 37 graus abaixo da horizontal: a normal passa do peso.' }

  @{ Html = $LISTA_ASSOC
     Slug = 'associacao-resistores/14-lista-serie-20-40'
     Resumo = 'Bateria de 12 V alimentando dois resistores em serie, de 20 e 40 ohms.' }

  @{ Html = $LISTA_ASSOC
     Slug = 'associacao-resistores/15-lista-paralelo-30-60'
     Resumo = 'Bateria de 12 V alimentando dois resistores em paralelo, de 30 e 60 ohms.' }

  @{ Html = $LISTA_ASSOC
     Slug = 'associacao-resistores/16-lista-mista-6-12-4'
     Resumo = 'Associacao mista: resistor de 6 ohms em serie com o paralelo de 12 e 4 ohms.' }

  @{ Html = $LISTA_ASSOC
     Slug = 'associacao-resistores/17-lista-resistor-em-curto'
     Resumo = 'Resistor de 30 ohms curto-circuitado por um fio ideal, em serie com um de 10 ohms.' }


  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/forcas-newton/index.html'
     Perfil = 'apresentacao'
     Slug = 'gravitacao/1-sol-e-terra-se-atraem'
     Resumo = 'Sol e Terra se atraindo: o par de setas tem o mesmo tamanho nos dois corpos.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/forcas-newton/index.html'
     Perfil = 'apresentacao'
     Slug = 'gravitacao/2-piano-e-a-terra'
     Resumo = 'Piano acima do horizonte curvo da Terra, com o peso apontando para o centro do planeta.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/forcas-newton/index.html'
     Perfil = 'apresentacao'
     Slug = 'gravitacao/3-terra-e-lua-do-problema'
     Resumo = 'Terra e Lua com as massas marcadas e a reta que une os centros, para montar a conta.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/forcas-newton/index.html'
     Perfil = 'apresentacao'
     Slug = 'gravitacao/4-duas-caixas-no-chao'
     Resumo = 'Duas caixas no chao, com as massas marcadas e a reta de centro a centro.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/forcas-newton/index.html'
     Perfil = 'apresentacao'
     Slug = 'forcas/14-normal-em-tres-situacoes'
     Resumo = 'A normal na mesa, na rampa e contra a parede, com a relacao que vale em cada caso.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/forcas-newton/index.html'
     Perfil = 'apresentacao'
     Slug = 'forcas/15-normal-no-impacto'
     Resumo = 'Corpo que cai de uma altura h e para numa deformacao d: a normal fica h/d vezes o peso.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/forcas-newton/index.html'
     Perfil = 'apresentacao'
     Slug = 'forcas/16-tensao-em-quatro-situacoes'
     Resumo = 'A tensao puxando em quatro arranjos de fio, com direcao e sentido em cada extremo.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/forcas-newton/index.html'
     Perfil = 'apresentacao'
     Slug = 'forcas/17-tensao-no-cabo-do-elevador'
     Resumo = 'O cabo do elevador nos tres estados: T igual, maior e menor que o peso da cabine.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/forcas-newton/index.html'
     Perfil = 'apresentacao'
     Slug = 'forcas/18-par-do-peso'
     Resumo = 'Vaso sobre a mesa sobre o planeta: o par acao-reacao do peso, uma forca em cada corpo.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/forcas-newton/index.html'
     Perfil = 'apresentacao'
     Slug = 'forcas/19-par-da-normal'
     Resumo = 'A mesma cena com o outro par: a normal no vaso e a normal na mesa, no ponto de contato.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/forcas-newton/index.html'
     Perfil = 'apresentacao'
     Slug = 'forcas/20-o-que-e-o-atrito'
     Resumo = 'Treno puxado na neve: a normal perpendicular ao contato e o atrito paralelo a ele.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/forcas-newton/index.html'
     Perfil = 'apresentacao'
     Slug = 'forcas/21-por-que-existe-atrito'
     Resumo = 'Duas superficies ampliadas: contato real em poucos pontos, e o filme de oleo separando.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/forcas-newton/index.html'
     Perfil = 'apresentacao'
     Slug = 'forcas/22-atrito-estatico'
     Resumo = 'Sofa parado: o atrito tem o tamanho exato da forca aplicada, e ha um par de setas nos dois corpos.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/forcas-newton/index.html'
     Perfil = 'apresentacao'
     Slug = 'forcas/23-atrito-cinetico'
     Resumo = 'O mesmo sofa deslizando: sem forca aplicada, o atrito se opoe a velocidade.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/forcas-newton/index.html'
     Perfil = 'apresentacao'
     Slug = 'forcas/24-bloco-empurrado-na-mesa'
     Resumo = 'Bloco na mesa com as quatro forcas, para montar o problema de atrito estatico.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/forcas-newton/index.html'
     Perfil = 'apresentacao'
     Slug = 'forcas/25-frenagem-seco-e-molhado'
     Resumo = 'A 80 km/h, a distancia de frenagem dobra do asfalto seco para o molhado.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/forcas-newton/index.html'
     Perfil = 'apresentacao'
     Slug = 'forcas/26-roda-travada-e-girando'
     Resumo = 'Roda travada desliza e cai no atrito cinetico; roda girando fica no estatico, maior.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/forcas-newton/index.html'
     Perfil = 'apresentacao'
     Slug = 'forcas/27-rampa-que-inclina'
     Resumo = 'Animacao: a prancha vai subindo e a caixa escorrega quando o angulo passa do limiar.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/forcas-newton/index.html'
     Perfil = 'apresentacao'
     Slug = 'forcas/28-da-cena-ao-corpo-isolado'
     Resumo = 'A mesma cena e o corpo isolado ao lado, so com as forcas que agem nele.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/forcas-newton/index.html'
     Perfil = 'apresentacao'
     Slug = 'forcas/29-eixos-e-decomposicao'
     Resumo = 'Eixos alinhados com a rampa: so o peso precisa ser decomposto.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/forcas-newton/index.html'
     Perfil = 'apresentacao'
     Slug = 'forcas/30-bloco-na-rampa-com-atrito'
     Resumo = 'Bloco abandonado numa rampa com atrito, com as tres forcas marcadas.' }

  # --- Trabalho e energia: decks energia-mecanica e energia-dissipacao-potencia, listas de energia ---
  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-mecanica/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/4-cadeia-de-transformacoes'
     Resumo = 'Cadeia de transformacoes de energia em cinco etapas: o Sol emite energia luminosa, a planta a guarda como energia quimica, o alimento leva essa energia quimica ao corpo, e o corpo a transforma na energia cinetica da bicicleta, com uma parte saindo como energia termica.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-mecanica/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/32-rotulo-barra-de-cereal'
     Resumo = 'Tabela de informacao nutricional de uma barra de cereal de 25 gramas, com valor energetico de 90 quilocalorias.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-mecanica/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/5-trabalho-transfere-energia'
     Resumo = 'Um bloco e empurrado por uma forca F ao longo de um deslocamento d.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-mecanica/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/6-forca-inclinada-componentes'
     Resumo = 'Bloco puxado por uma forca F inclinada de um angulo teta em relacao ao chao.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-mecanica/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/7-sinal-do-trabalho'
     Resumo = 'Tres blocos em movimento para a direita.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-mecanica/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/8-carrinho-quatro-forcas'
     Resumo = 'Carrinho de supermercado empurrado para a direita por uma forca F, ao longo de dez metros.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-mecanica/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/9-bloco-acelerado-do-repouso'
     Resumo = 'Um bloco de massa m parte do repouso e e empurrado por uma forca resultante constante ao longo de um deslocamento d.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-mecanica/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/10-frenagem-v-e-2v'
     Resumo = 'Dois carros iguais comecam a frear na mesma linha, com o mesmo freio.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-mecanica/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/11-erguer-caixa-epg'
     Resumo = 'Uma caixa e erguida com velocidade constante por uma forca F igual ao seu peso.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-mecanica/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/12-sobe-guarda-desce-devolve'
     Resumo = 'Dois paineis.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-mecanica/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/13-nivel-zero'
     Resumo = 'Um livro de um quilograma sobre uma mesa de 0,8 metro.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-mecanica/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/14-tres-caminhos-mesma-altura'
     Resumo = 'Tres maneiras de subir ao topo de um predio de altura h: uma escada, um elevador e uma rampa.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-mecanica/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/15-hidreletrica'
     Resumo = 'Usina hidreletrica em corte.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-mecanica/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/16-halter-erguido'
     Resumo = 'Um halter de 50 quilogramas erguido do chao ate dois metros de altura.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-mecanica/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/17-mola-lei-de-hooke'
     Resumo = 'Bloco preso a uma mola horizontal, oscilando em torno da posicao de equilibrio.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-mecanica/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/18-area-forca-elastica'
     Resumo = 'Grafico da forca elastica em funcao da deformacao x: uma reta que sai da origem e chega a k vezes x.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-mecanica/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/19-mola-comprimida'
     Resumo = 'Mola de constante 200 newtons por metro, comprimida 10 centimetros por um bloco encostado nela.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-mecanica/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/20-queda-livre'
     Resumo = 'Bola solta do repouso a cinco metros de altura, caindo ate o chao.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-mecanica/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/21-mola-lanca-bloco-rampa'
     Resumo = 'Mola de constante 800 newtons por metro, comprimida 0,2 metro, prestes a lancar um bloco de 0,4 quilograma por um piso liso ate uma rampa lisa.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-mecanica/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/22-enem-salto-com-vara'
     Resumo = 'As quatro etapas de um salto com vara: na etapa I o atleta corre com a vara; na II apoia a vara no chao e ela se curva; na III atinge certa altura sobre a vara; na IV cai em um colchao.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-dissipacao-potencia/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/23-rampa-com-atrito'
     Resumo = 'Bloco de dois quilogramas solto do alto de uma rampa de cinco metros de altura e dez metros de comprimento.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-dissipacao-potencia/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/24-carro-freando'
     Resumo = 'Carro de mil quilogramas a vinte metros por segundo comecando a frear.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-dissipacao-potencia/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/25-escada-rapida-e-lenta'
     Resumo = 'Duas pessoas iguais sobem escadas iguais.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-dissipacao-potencia/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/26-guindaste'
     Resumo = 'Guindaste erguendo uma carga de quinhentos quilogramas a vinte metros de altura em dez segundos.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-dissipacao-potencia/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/27-relogio-medidor'
     Resumo = 'Medidor de energia com quatro relogios.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-dissipacao-potencia/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/28-enem-relogios-de-luz'
     Resumo = 'Duas leituras do medidor de energia, cada uma com quatro relogios: a leitura atual, de cima, e a do mes passado, de baixo.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-dissipacao-potencia/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/29-sankey-lampadas'
     Resumo = 'Diagramas de fluxo de energia de duas lampadas, com valores tipicos.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-dissipacao-potencia/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/30-eficiencia-em-cadeia'
     Resumo = 'Eficiencia em cadeia.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/energia-dissipacao-potencia/index.html'
     Perfil = 'apresentacao'
     Slug = 'trabalho-energia/31-enem-eficiencia-em-cadeia'
     Resumo = 'Processo em tres etapas: a usina de forca, com eficiencia 0,35; as linhas de transmissao, com 0,90; e a lampada, com 0,05.' }

  @{ Html = 'atividades/listas/energia/lista_1_energia_mecanica.html'
     Slug = 'trabalho-energia/40-lista-caixa-puxada-37-graus'
     Resumo = 'Caixa arrastada sobre um piso horizontal por uma forca de 50 newtons inclinada 37 graus acima da horizontal, ao longo de 8 metros.' }

  @{ Html = 'atividades/listas/energia/lista_1_energia_mecanica.html'
     Slug = 'trabalho-energia/41-lista-grafico-forca-deslocamento'
     Resumo = 'Grafico da forca em funcao do deslocamento: a forca vale 20 newtons de 0 a 4 metros e cai em linha reta ate zero em 8 metros.' }

  @{ Html = 'atividades/listas/energia/lista_1_energia_mecanica.html'
     Slug = 'trabalho-energia/42-lista-tres-trajetorias'
     Resumo = 'Tres trajetorias diferentes, 1, 2 e 3, que levam um corpo do ponto inicial i ao ponto final f, situado uma altura h abaixo.' }

  @{ Html = 'atividades/listas/energia/lista_1_energia_mecanica.html'
     Slug = 'trabalho-energia/43-lista-grafico-mola'
     Resumo = 'Grafico da forca elastica de uma mola em funcao da deformacao: uma reta pela origem que passa por 30 newtons em 0,15 metro.' }

  @{ Html = 'atividades/listas/energia/lista_1_energia_mecanica.html'
     Slug = 'trabalho-energia/44-lista-montanha-russa'
     Resumo = 'Perfil de uma montanha-russa com quatro pontos: A a 20 metros, B a 5 metros, C a 12 metros e D no nivel do chao.' }

  @{ Html = 'atividades/listas/energia/lista_1_energia_mecanica.html'
     Slug = 'trabalho-energia/45-lista-pendulo'
     Resumo = 'Pendulo simples solto do repouso com a massa 0,45 metro acima do ponto mais baixo da trajetoria.' }

  @{ Html = 'atividades/listas/energia/lista_1_energia_mecanica.html'
     Slug = 'trabalho-energia/46-lista-bloco-cai-sobre-mola'
     Resumo = 'Bloco de 2 quilogramas solto 1,8 metro acima do topo de uma mola vertical de constante 2000 newtons por metro.' }

  @{ Html = 'atividades/listas/energia/lista_2_dissipacao_potencia.html'
     Slug = 'trabalho-energia/47-lista-escorregador'
     Resumo = 'Escorregador de 3 metros de altura e 6 metros de pista.' }

  @{ Html = 'atividades/listas/energia/lista_2_dissipacao_potencia.html'
     Slug = 'trabalho-energia/48-lista-bola-quicando'
     Resumo = 'Bola solta de 2 metros de altura que, depois do primeiro quique, sobe so ate 1,5 metro, e cada vez menos nos quiques seguintes.' }

  @{ Html = 'atividades/listas/energia/lista_2_dissipacao_potencia.html'
     Slug = 'trabalho-energia/49-lista-eficiencia-em-cadeia'
     Resumo = 'Cadeia de tres etapas: usina com eficiencia de 40 por cento, linhas de transmissao com 90 por cento e motor com 80 por cento.' }

)

# ----------------------------------------------------------------------------
# PERFIS
# ----------------------------------------------------------------------------
$Perfis = @{
  'lista' = @{
    Folha  = 'atividades/listas/listas.css'
    Secao  = 'FIGURAS DAS LISTAS'
    Fim    = 'IMPRESS'
    Classe = 'fg-'
    Defs   = 'fig-defs'
    Escuro = ''          # sai do [data-theme="dark"] da propria folha
  }
  'apresentacao' = @{
    Folha  = 'css/apresentacoes.css'
    Secao  = 'FIGURAS DAS APRESENTA'
    Fim    = 'INTERRUPTORES'
    Classe = 'fga-'
    Defs   = 'fga-defs'
    Escuro = 'apresentacao'
  }
}

# ----------------------------------------------------------------------------
# TEMA ESCURO DOS ARQUIVOS AVULSOS
# So para os perfis cuja pagina de origem e' clara e por isso nao tem um bloco
# [data-theme="dark"] de onde copiar.
# ----------------------------------------------------------------------------
$TemasEscuros = @{
  'apresentacao' = @'
        --figa-sol:          #F4B95A;
        --figa-sol-halo:     #4A3A1C;
        --figa-terra:        #0B2F5E;
        --figa-terra-claro:  #2A6BB8;
        --figa-terra-borda:  #7FAEE4;
        --figa-atmosfera:    #4E7CB4;
        --figa-continente:   #2E8B57;
        --figa-continente-2: #46A96C;
        --figa-contorno:     #E6E7EA;
        --figa-vetor:        #F87171;
        --figa-guia:         #6B7280;
        --figa-texto:        #E6E7EA;
        --figa-rotulo:       #A8ABB2;
        --figa-rotulo-claro: #EAF1FC;
        --figa-piano:        #0B0C0E;
        --figa-piano-2:      #23252B;
        --figa-piano-luz:    #3C4049;
        --figa-teclas:       #E8E6E0;
        --figa-lua:          #8B909A;
        --figa-cratera:      #6B7078;
        --figa-caixa:        #7A5A31;
        --figa-caixa-b:      #D2AE79;
        --figa-apoio:        #A8ABB2;
        --figa-hachura:      #6B7280;
        --figa-bloco:        #1E3A5F;
        --figa-bloco-b:      #60A5FA;
        --figa-rampa:        #1E293B;
        --figa-peso:         #C084FC;
        --figa-normal:       #4ADE80;
        --figa-atrito:       #FB923C;
        --figa-tracao:       #22D3EE;
        --figa-fio:          #CBD5E1;
        --figa-polia:        #475569;
        --figa-polia-b:      #CBD5E1;
        --figa-cabine:       #172033;
        --figa-vaso:         #8A5433;
        --figa-vaso-b:       #D89A6C;
        --figa-folha:        #4FB877;
        --figa-oleo:         #3F6E9E;
        --figa-sofa:         #47637E;
        --figa-sofa-2:       #5E7C99;
        --figa-sofa-b:       #A9C0D6;
        --figa-veloc:        #60A5FA;
        --figa-carro:        #A84238;
        --figa-carro-b:      #E8A79F;
        --figa-vidro:        #3E5A73;
        --figa-pneu:         #0F1013;
        --figa-roda:         #6B7078;
        --figa-eixo:         #A8ABB2;
        --figa-ec:           #60A5FA;
        --figa-epg:          #4ADE80;
        --figa-epe:          #F472B6;
        --figa-term:         #F87171;
        --figa-trab:         #FB923C;
        --figa-barra:        #2A2F3A;
        --figa-pele:         #C98F66;
        --figa-roupa:        #CBD5E1;
        --figa-agua:         #3F78B5;
        --figa-branco:       #1F2128;
        --figa-asfalto:      #2A2C33;
        --figa-livro:        #2DD4BF;
        --figa-concreto:     #3A3D45;
        --figa-relevo:       #6B5A40;
        --figa-luz:          #FBBF24;
'@
}

# ----------------------------------------------------------------------------
function Get-Assinatura {
  # Sequencia de nomes de elemento do desenho, na ordem. Compara o gerado com
  # o inline sem se importar com indentacao, quebra de linha ou cabecalho.
  param([string]$Svg)
  $corpo = [regex]::Replace($Svg, '(?s)<style>.*?</style>', '')
  $corpo = [regex]::Replace($corpo, '(?s)<title\b.*?</title>', '')
  $corpo = [regex]::Replace($corpo, '(?s)<defs>.*?</defs>', '')
  $corpo = [regex]::Replace($corpo, '(?s)<!--.*?-->', '')
  $nomes = [regex]::Matches($corpo, '<([a-zA-Z][a-zA-Z0-9]*)') | ForEach-Object { $_.Groups[1].Value }
  return ($nomes -join ',')
}

function Remove-Indentacao {
  param([string]$Texto)
  $linhas = $Texto -split "`r?`n"
  $menor = 999
  foreach ($l in $linhas) {
    if ($l.Trim().Length -eq 0) { continue }
    $n = $l.Length - $l.TrimStart(' ').Length
    if ($n -lt $menor) { $menor = $n }
  }
  if ($menor -eq 999) { $menor = 0 }
  $saida = foreach ($l in $linhas) {
    if ($l.Length -ge $menor) { $l.Substring($menor) } else { $l.TrimStart(' ') }
  }
  return ($saida -join "`n")
}

function Indenta {
  param([string]$Texto, [int]$N)
  $pad = ' ' * $N
  return (($Texto -split "`r?`n" | ForEach-Object { if ($_.Trim()) { $pad + $_ } else { '' } }) -join "`n")
}

# ----------------------------------------------------------------------------
# PALETA, LIDA UMA VEZ POR PERFIL USADO
# ----------------------------------------------------------------------------
$Paletas = @{}
foreach ($nome in ($Figuras | ForEach-Object { if ($_.Perfil) { $_.Perfil } else { 'lista' } } | Select-Object -Unique)) {
  if (-not $Perfis.ContainsKey($nome)) { throw "perfil desconhecido: $nome" }
  $perfil = $Perfis[$nome]
  if (-not (Test-Path $perfil.Folha)) { throw "folha nao encontrada: $($perfil.Folha)" }
  $css = [System.IO.File]::ReadAllText((Resolve-Path $perfil.Folha))

  $mSec = [regex]::Match($css, "(?s)$([regex]::Escape($perfil.Secao))(.*?)$([regex]::Escape($perfil.Fim))")
  if (-not $mSec.Success) { throw "secao '$($perfil.Secao)' nao encontrada em $($perfil.Folha)" }
  $secao = $mSec.Groups[1].Value

  $mClaro = [regex]::Match($secao, '(?s):root \{(.*?)\n\}')
  if (-not $mClaro.Success) { throw "bloco :root da paleta nao encontrado em $($perfil.Folha)" }
  $claro = Indenta (Remove-Indentacao $mClaro.Groups[1].Value.Trim("`r", "`n")) 6

  if ($perfil.Escuro) {
    if (-not $TemasEscuros.ContainsKey($perfil.Escuro)) { throw "sem tema escuro para '$($perfil.Escuro)'" }
    $escuro = $TemasEscuros[$perfil.Escuro]
  } else {
    $mEscuro = [regex]::Match($secao, '(?s)\[data-theme="dark"\] \{(.*?)\n\}')
    if (-not $mEscuro.Success) { throw "bloco [data-theme=`"dark`"] nao encontrado em $($perfil.Folha)" }
    $escuro = Indenta (Remove-Indentacao $mEscuro.Groups[1].Value.Trim("`r", "`n")) 8
  }

  # as regras de classe sao o desenho; o que posiciona a figura na pagina fica de fora
  $pref = [regex]::Escape($perfil.Classe)
  $regras = [regex]::Matches($secao, "(?m)^\.$pref[^\r\n]*\{[^\r\n]*\}$") |
            ForEach-Object { '    ' + $_.Value }
  if ($regras.Count -lt 8) { throw "poucas regras .$($perfil.Classe)* em $($perfil.Folha) ($($regras.Count))" }

  # Blocos multilinha: @keyframes e o bloco de movimento reduzido. Ficam de fora
  # da varredura de regras acima, que so' pega classe de uma linha so'.
  $blocos = @()
  foreach ($m in [regex]::Matches($secao, '(?s)@keyframes\s+[\w-]+\s*\{.*?\n\}')) {
    $blocos += (Indenta (Remove-Indentacao $m.Value) 4)
  }
  foreach ($m in [regex]::Matches($secao, '(?s)@media \(prefers-reduced-motion: reduce\)\s*\{.*?\n\}')) {
    $blocos += (Indenta (Remove-Indentacao $m.Value) 4)
  }
  # De que classes estamos falando: as que tem animation: na propria regra.
  $animadas = [regex]::Matches(($regras -join "`n"), '(?m)^\s*\.([\w-]+)[^\r\n]*animation:') |
              ForEach-Object { $_.Groups[1].Value }

  $Paletas[$nome] = @{ Claro = $claro; Escuro = $escuro; Regras = ($regras -join "`n")
                       Blocos = ($blocos -join "`n`n"); Animadas = $animadas }
}

# ----------------------------------------------------------------------------
$semBom = New-Object System.Text.UTF8Encoding($false)
$gerados = 0
$falhas = @()
$htmlCache = @{}
$defsCache = @{}

foreach ($fig in $Figuras) {
  $perfilNome = if ($fig.Perfil) { $fig.Perfil } else { 'lista' }
  $pal = $Paletas[$perfilNome]
  if (-not (Test-Path $fig.Html)) { throw "lista nao encontrada: $($fig.Html)" }
  if (-not $htmlCache.ContainsKey($fig.Html)) {
    $htmlCache[$fig.Html] = [System.IO.File]::ReadAllText((Resolve-Path $fig.Html))
  }
  $html = $htmlCache[$fig.Html]

  # --- pontas de seta disponiveis na pagina --------------------------------
  $chaveDefs = "$perfilNome|$($fig.Html)"
  if (-not $defsCache.ContainsKey($chaveDefs)) {
    $tabela = @{}
    $mDefs = [regex]::Match($html, "(?s)<svg class=`"$($Perfis[$perfilNome].Defs)`".*?</svg>")
    if ($mDefs.Success) {
      foreach ($mk in [regex]::Matches($mDefs.Value, '(?s)<marker id="([^"]+)".*?</marker>')) {
        $tabela[$mk.Groups[1].Value] = (Remove-Indentacao $mk.Value)
      }
    }
    $defsCache[$chaveDefs] = $tabela
  }
  $marcadores = $defsCache[$chaveDefs]

  # --- recorta o <svg> marcado ---------------------------------------------
  $slug = [regex]::Escape($fig.Slug)
  $m = [regex]::Match($html, "(?s)<svg\b[^>]*data-avulso=`"$slug`".*?</svg>")
  if (-not $m.Success) { throw "figura nao encontrada na lista: $($fig.Slug)" }
  $inline = $m.Value

  $viewBox = [regex]::Match($inline, 'viewBox="([^"]+)"').Groups[1].Value
  $rotulo  = [regex]::Match($inline, 'aria-label="([^"]+)"').Groups[1].Value
  if (-not $viewBox) { throw "sem viewBox: $($fig.Slug)" }
  if (-not $rotulo)  { throw "sem aria-label: $($fig.Slug)" }

  # cor em atributo passaria batida pelo tema; e' erro de origem
  $crua = [regex]::Match($inline, '(fill|stroke)="(#|rgb)')
  if ($crua.Success) { throw "cor em atributo na figura $($fig.Slug)" }

  $vb = $viewBox -split '\s+'
  $largura = [int]([double]$vb[2] * 2)
  $altura  = [int]([double]$vb[3] * 2)

  $assunto  = ($fig.Slug -split '/')[0]
  $nome     = ($fig.Slug -split '/')[1]
  $tituloId = "$assunto-$nome"

  # --- so os marcadores que esta figura usa --------------------------------
  # o que a figura define nela mesma (gradiente, recorte) ja viaja no corpo;
  # do bloco compartilhado da pagina so precisa vir o que ela referencia sem definir
  $proprios = [regex]::Matches($inline, 'id="([^"]+)"') | ForEach-Object { $_.Groups[1].Value }
  $usados = [regex]::Matches($inline, 'url\(#([^)]+)\)') |
            ForEach-Object { $_.Groups[1].Value } |
            Where-Object { $proprios -notcontains $_ } |
            Select-Object -Unique | Sort-Object
  $blocoDefs = ''
  if ($usados.Count -gt 0) {
    $partes = foreach ($u in $usados) {
      if (-not $marcadores.ContainsKey($u)) { throw "marcador '#$u' usado em $($fig.Slug) nao existe no bloco de defs da pagina" }
      Indenta $marcadores[$u] 4
    }
    $blocoDefs = "  <defs>`n" + ($partes -join "`n") + "`n  </defs>`n"
  }

  # --- corpo do desenho -----------------------------------------------------
  $corpo = $inline
  $corpo = [regex]::Replace($corpo, '(?s)^<svg\b[^>]*>', '')
  $corpo = [regex]::Replace($corpo, '</svg>$', '')
  $corpo = Indenta (Remove-Indentacao $corpo) 2
  $corpo = $corpo.Trim("`n")

  # --- monta o arquivo ------------------------------------------------------
  $sb = New-Object System.Text.StringBuilder
  [void]$sb.AppendLine('<?xml version="1.0" encoding="UTF-8"?>')
  [void]$sb.AppendLine("<!-- $($fig.Resumo)")
  [void]$sb.AppendLine('     Autossuficiente: pode ser aberto direto no navegador, usado em <img src>,')
  [void]$sb.AppendLine('     inserido em slide ou importado em editor vetorial.')
  [void]$sb.AppendLine("     Fonte da geometria: $($fig.Html)")
  [void]$sb.AppendLine('     Gerado por scripts/extrair-figuras-paginas.ps1 — nao editar a mao. -->')
  [void]$sb.AppendLine("<svg xmlns=`"http://www.w3.org/2000/svg`" viewBox=`"$viewBox`" width=`"$largura`" height=`"$altura`"")
  [void]$sb.AppendLine("     role=`"img`" aria-labelledby=`"$tituloId`">")
  [void]$sb.AppendLine("  <title id=`"$tituloId`">$rotulo</title>")
  [void]$sb.AppendLine('  <style><![CDATA[')
  [void]$sb.AppendLine('    svg {')
  [void]$sb.AppendLine($pal.Claro)
  [void]$sb.AppendLine('    }')
  [void]$sb.AppendLine('')
  [void]$sb.AppendLine('    /* Quem abrir o arquivo com o sistema no modo escuro ve a versao noturna.')
  [void]$sb.AppendLine('       Embutido aqui porque o .svg carregado como imagem e um documento a')
  [void]$sb.AppendLine('       parte e nao enxerga o data-theme da pagina. */')
  [void]$sb.AppendLine('    @media (prefers-color-scheme: dark) {')
  [void]$sb.AppendLine('      svg {')
  [void]$sb.AppendLine($pal.Escuro)
  [void]$sb.AppendLine('      }')
  [void]$sb.AppendLine('    }')
  [void]$sb.AppendLine('')
  [void]$sb.AppendLine($pal.Regras)
  # Os keyframes so viajam com quem usa uma classe animada, para nao inchar as
  # outras 25 figuras com regras que elas nunca chamam.
  $usaAnimacao = $false
  foreach ($c in $pal.Animadas) {
    if ($inline -match ('class="[^"]*\b' + $c + '\b')) { $usaAnimacao = $true }
  }
  if ($usaAnimacao -and $pal.Blocos) {
    [void]$sb.AppendLine('')
    [void]$sb.AppendLine($pal.Blocos)
  }
  [void]$sb.AppendLine('  ]]></style>')
  if ($blocoDefs) { [void]$sb.Append($blocoDefs) }
  [void]$sb.AppendLine($corpo)
  [void]$sb.AppendLine('</svg>')
  $saida = $sb.ToString() -replace "`r`n", "`n"

  # --- grava ----------------------------------------------------------------
  $destinoDir = Join-Path 'img/animacoes' $assunto
  if (-not (Test-Path $destinoDir)) { New-Item -ItemType Directory -Path $destinoDir -Force | Out-Null }
  $destino = Join-Path $destinoDir "$nome.svg"
  [System.IO.File]::WriteAllText((Join-Path (Get-Location) $destino), $saida, $semBom)

  # --- confere a assinatura -------------------------------------------------
  $aInline = Get-Assinatura $inline
  $aGerado = Get-Assinatura ([System.IO.File]::ReadAllText((Resolve-Path $destino)))
  if ($aInline -ne $aGerado) {
    $falhas += "$($fig.Slug): assinatura divergente`n   inline: $aInline`n   gerado: $aGerado"
  } else {
    Write-Host ("  ok  {0,-48} {1} elementos, {2} seta(s)" -f "$assunto/$nome.svg", ($aInline -split ',').Count, $usados.Count)
    $gerados++
  }
}

Write-Host ''
if ($falhas.Count -gt 0) {
  Write-Host 'FALHAS na conferencia de assinatura:' -ForegroundColor Red
  $falhas | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
  exit 1
}
Write-Host "$gerados figura(s) extraida(s); assinatura identica a do inline em todas." -ForegroundColor Green
Write-Host 'Lembre de cadastrar as novas no catalogo img/animacoes/index.html.'
