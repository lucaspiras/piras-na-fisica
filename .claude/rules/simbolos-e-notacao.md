# Símbolos e notação

Este arquivo fixa qual letra representa cada grandeza nos materiais do Piras na Física, e
vale igualmente para textos de conteúdo, apresentações, listas, estudos dirigidos e provas.
Ao longo dele, primeiro vem a regra geral, depois a tabela por área, depois as colisões
conhecidas e o modo de conviver com elas, e por fim as justificativas das escolhas. O que
ainda não foi decidido está reunido na última seção, declarado como pendência em vez de
ficar implícito.

A razão de existir é simples de enunciar. Um aluno que lê o texto de resistência, resolve a
lista, assiste à apresentação e faz a prova precisa encontrar a mesma letra para a mesma
grandeza nos quatro lugares. Quando não encontra, o esforço dele vai para traduzir notação
em vez de entender Física.

## 1. A regra geral

Uma grandeza, um símbolo, em todo o site. Quando duas áreas diferentes reivindicam a mesma
letra, cada uma fica com ela dentro da sua área, e a tabela da seção 4 registra o acordo.
Quando um texto precisa usar as duas, ele desambigua na própria linha.

Mudar o símbolo de uma grandeza é mudança de padrão, não de página. Se um material novo
precisar de letra diferente da que está aqui, o caminho é alterar este arquivo e varrer o
site, não abrir exceção local.

## 2. Eletricidade: U para tensão, V para potencial

Esta é a decisão que mais aparece, porque eletricidade é onde o site tem mais material.

| grandeza | símbolo | exemplo |
|---|---|---|
| Potencial elétrico num ponto | **V** | V<sub>A</sub>, V<sub>B</sub> |
| Tensão, ddp, fem | **U** | U<sub>AB</sub> = V<sub>A</sub> − V<sub>B</sub> |
| Corrente elétrica | **i** | i = U / R |
| Resistência | **R** | U = R · i |
| Carga elétrica | **q** | U = E<sub>pe</sub> / q |
| Campo elétrico | **E** | E = F / q |
| Potência elétrica | **P** | P = U · i |
| Volt, a unidade | **V** | U = 12 V |

Cabe perceber que a unidade volt continua sendo V, e isso não conflita com nada: unidade
vem depois de número e grandeza não. A frase "U = 12 V" se lê sem esforço, enquanto
"V = 12 V" obriga o leitor a decidir qual V é qual.

A definição de ddp escreve-se **U = E<sub>pe</sub> / q**, e não U = E/q, porque E já é campo
elétrico no mesmo material.

**Por que a letra muda do potencial para a ddp.** A pergunta é natural: se em todo o resto do
site a variação de uma grandeza guarda a letra dela, por que a diferença de potencial não se
escreve com V? Por duas razões, e a segunda é a que importa.

A primeira é de sinal. Δ sempre significa final menos inicial, e a ddp entre A e B é
V<sub>A</sub> − V<sub>B</sub>, isto é, inicial menos final. Para uma carga que vai de A para
B, a ddp é exatamente o oposto da variação de potencial. Usar a mesma letra sugeriria um
padrão que não se cumpre, e um padrão falso confunde mais do que uma letra nova.

A segunda é conceitual. **V<sub>A</sub> sozinho não tem valor até alguém escolher onde fica o
zero**, seja o terra, o infinito ou o polo negativo da pilha; a ddp não depende dessa escolha.
O voltímetro mede U e nunca V<sub>A</sub>, porque ele sempre tem duas pontas. Símbolos
distintos registram essa diferença, que é o ponto mais difícil do assunto.

## 3. Tabela de símbolos por área

### Cinemática e dinâmica

| grandeza | símbolo | observação |
|---|---|---|
| Posição | s | s<sub>0</sub> para a inicial |
| Deslocamento | d | d = s − s<sub>0</sub>. Não usar Δs |
| Velocidade | v | v<sub>0</sub>, v<sub>m</sub> para média |
| Aceleração | a | a<sub>c</sub> para centrípeta |
| Tempo e intervalo de tempo | t | d = v · t. O Δt é exceção, ver abaixo |
| Massa | m | |
| Gravidade | g | |
| Força | F | F<sub>R</sub> para resultante, F<sub>c</sub> para centrípeta |
| Peso | P | P = m · g |
| Normal | N | |
| Tração | T | T<sub>R</sub> quando houver mais de uma |
| Atrito | F<sub>at</sub> | F<sub>at,e</sub> e F<sub>at,c</sub> só quando as duas convivem |
| Coeficiente de atrito | μ<sub>e</sub>, μ<sub>c</sub> | |
| Ângulo | θ | |
| Período | T | ver a seção 4 |
| Frequência | f | |

**O tempo é t, inclusive quando é intervalo.** A distinção entre instante e variação é
verdadeira, mas carregar Δ em toda fórmula de cinemática polui a expressão sem ensinar nada:
escreve-se **d = v · t**, não d = v · Δt. O Δt fica reservado para o trecho em que o texto
compara dois instantes de propósito e a diferença entre eles é o assunto.

**O atrito leva vírgula no índice.** F<sub>at,e</sub> em vez de F<sub>ate</sub>, porque a
segunda forma se lê como palavra. É exceção à economia de índices do resto da tabela, e vale
só para o atrito.

### Trabalho e energia

| grandeza | símbolo | observação |
|---|---|---|
| Trabalho | **W** | W = F · d · cos θ. Sempre W, nunca T, inclusive em termodinâmica |
| Energia cinética | E<sub>c</sub> | |
| Energia potencial gravitacional | E<sub>pg</sub> | |
| Energia potencial elástica e elétrica | E<sub>pe</sub> | desambiguar no texto quando as duas aparecem |
| Energia mecânica | E<sub>m</sub> | E<sub>mi</sub> e E<sub>mf</sub> para inicial e final |
| Potência | P | ver a seção 4 |

### Termodinâmica

| grandeza | símbolo | observação |
|---|---|---|
| Calor | Q | |
| Energia interna | U | ΔU = Q − W |
| Trabalho | W | o mesmo W da mecânica |
| Temperatura | T | ver a seção 4 |

## 4. Colisões conhecidas, e como conviver com elas

Quatro letras carregam mais de um sentido no site. Nenhuma delas é erro: são colisões que a
própria Física carrega, e o que se pode fazer é mantê-las separadas por área e avisar o
leitor onde elas se encostam.

| letra | sentidos | como fica |
|---|---|---|
| **U** | tensão (eletricidade), energia interna (termodinâmica) | Cada uma reina na sua área. Nenhuma fórmula do ensino médio usa as duas, e a energia interna quase sempre aparece como ΔU. |
| **P** | peso (mecânica), potência (energia e eletricidade) | Separadas por área. Em texto que trate das duas, escrever a potência como P e nomeá-la por extenso na primeira ocorrência. |
| **T** | tração, temperatura, período | Eram quatro até o trabalho passar a W. Em dinâmica é tração; em termodinâmica é temperatura; em ondas e MCU é período. Quando duas convivem, nomear por extenso. |
| **E** | campo elétrico, energia (com índice), fem | O índice resolve: E sozinho é campo elétrico, E<sub>c</sub> e E<sub>p</sub> são energia. A fem escreve-se por extenso ou como U da fonte. |

O princípio é que **a desambiguação é trabalho do texto, não do aluno**. Quando duas leituras
são possíveis na mesma página, nomear a grandeza por extenso na primeira aparição custa seis
palavras e evita a dúvida inteira.

## 5. Como escrever

- Índices em HTML vão em `<sub>`, nunca em caractere Unicode subscrito nem em underline. O
  `<sub>` é lido por leitor de tela e sobrevive à busca da página.
- Em SVG, `<sub>` não existe: usar `<tspan dy="4" font-size="…">`.
- Unidade sempre depois do número e com espaço: 12 V, 3 A, 60 Ω. Nunca 12V.
- Multiplicação com o ponto médio `·`, não com `*` nem com `x`.
- A grandeza não vai em itálico no corpo do site. A convenção tipográfica de grandeza em
  itálico é de texto impresso acadêmico, e aqui o itálico já tem outra função, descrita no
  guia de estilo.
- Quando um símbolo aparece pela primeira vez num material, nomear a grandeza por extenso
  junto dele. Isso vale mesmo para os óbvios.

## 6. Justificativas das escolhas

**Por que U para tensão, e não V.** Três razões se somam. A norma ISO 80000-6, e a IEC antes
dela, atribuem U à tensão e reservam V ao potencial elétrico, de modo que U é o símbolo
normalizado e não um regionalismo. Os livros didáticos brasileiros seguem a norma, então o
aluno encontra U no material que tem em casa. E U libera o V para o papel que ele
desempenha no estudo dirigido de potencial elétrico, onde V<sub>A</sub> e V<sub>B</sub> são
potenciais em pontos: só assim a relação U = V<sub>A</sub> − V<sub>B</sub> pode ser escrita,
e ela é justamente o que define a tensão.

**Por que a unidade volt não atrapalha.** Unidade e grandeza ocupam posições diferentes na
frase. O que atrapalhava era usar a mesma letra para as duas, que produzia linhas como
"V = 12 V" e, pior, "[V] = J/C = V" na definição.

**Por que energia potencial é E<sub>p</sub>, e não U.** A notação U para energia potencial
vem dos livros americanos de ensino superior. O site inteiro já escreve E<sub>c</sub>,
E<sub>pg</sub>, E<sub>pe</sub> e E<sub>m</sub>, um sistema coerente em que a letra E diz
"energia" e o índice diz qual. Trocar isso por U quebraria o sistema para resolver um
problema que não existe aqui.

**Por que i minúsculo para corrente.** Acompanha os livros brasileiros e distingue a corrente
instantânea. A maiúscula I também colide visualmente com o algarismo 1 e com o l minúsculo
em várias fontes, inclusive na monoespaçada das fórmulas do site.

## 7. Decisões tomadas pelo Lucas

Registradas aqui com data, para que uma releitura daqui a um ano não as reabra por engano.

| data | decisão |
|---|---|
| 2026-10-12 | Trabalho é **W** em toda parte, mecânica e termodinâmica. O T fica livre para tração, temperatura e período |
| 2026-10-12 | O tempo é **t**, inclusive quando é intervalo. Δt só onde a comparação entre dois instantes é o assunto |
| 2026-10-12 | Atrito é **F<sub>at</sub>**, com F<sub>at,e</sub> e F<sub>at,c</sub> só quando as duas convivem |
| 2026-10-12 | Deslocamento é **d**, posição é **s**, e Δs sai de cena |

## 8. O que ainda falta padronizar

- **E<sub>pe</sub> serve à energia potencial elástica e à elétrica.** Funciona porque nunca
  aparecem na mesma página, mas convém decidir um índice distinto antes que apareçam.

## 9. O estado do site diante desta regra

A regra foi escrita em 2026-10-12 e o site **ainda não foi varrido**. O que falta, por ordem
de tamanho:

| o que | onde | tamanho |
|---|---|---|
| V-grandeza vira U | `apresentacoes/circuitos`, `ed_circuitos`, `_potencia-energia-eletrica`, `_resistencia-ohm`, 3 listas de circuitos | ~94 ocorrências |
| Desfazer a conversão para V | `apresentacoes/associacao-de-resistores` (as duas cópias) | 181 trocas, feitas em 2026-10-12 e a reverter |
| T de trabalho vira W | `conteudos/trabalho-energia/` (5 arquivos), `_campo-eletrico` | ~60 ocorrências |
| Δt vira t, Δs vira d | listas e conteúdos de cinemática | a medir |
| f<sub>e</sub>, f<sub>c</sub> viram F<sub>at</sub> | conteúdos e listas de forças | a medir |
| `U = E/q` vira `U = E<sub>pe</sub>/q` | `apresentacoes/circuitos`, `ed_circuitos` | 2 lugares |

**`ed_potencial_eletrico` não entra em varredura automática.** Os 61 V daquela página são
potencial num ponto e ficam como estão. Qualquer mudança ali é leitura caso a caso.
