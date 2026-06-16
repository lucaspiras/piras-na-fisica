$filePath = 'c:\Users\Usuario\OneDrive\Documentos\Programacao\piras-na-fisica\banco-questoes\fisica_ufrgs.json'
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

function Add-Res($text, $id, $res) {
    $gabPat = '"gabarito": "'
    $idPos = $text.IndexOf('"id": "' + $id + '"')
    if ($idPos -eq -1) { Write-Warning "ID $id not found"; return $text }
    $gabPos = $text.IndexOf($gabPat, $idPos)
    $gabValStart = $gabPos + $gabPat.Length
    $gabValEnd = $text.IndexOf('"', $gabValStart)
    $afterGab = $gabValEnd + 1
    $next = $text.Substring($afterGab, [Math]::Min(30, $text.Length - $afterGab))
    if ($next -match '"resolucao"') { Write-Output "SKIP $id"; return $text }
    $resJson = $res | ConvertTo-Json
    $before = $text.Substring(0, $afterGab)
    $after  = $text.Substring($afterGab)
    return $before + ",`n      `"resolucao`": $resJson" + $after
}

$r16 = 'Lancamento obliquo. Pontos A e C com mesma altura -> mesma Ec -> mesmo modulo de velocidade (mas sentidos diferentes). Em B (ponto mais alto): v_y=0, v_x=v0*cos(theta) -> modulo minimo, nao nulo; aceleracao = g, nao nulo. Componente horizontal constante durante todo o movimento (sem atrito do ar). No ponto C: aceleracao = g, apontando para baixo. Alternativa A.'
$r17 = '3a Lei de Kepler: T^2 proporcional a r^3. TA=1 ano, rA=1e8 km. rB=4e8 km. TB^2 = TA^2*(rB/rA)^3 = 1*4^3 = 64 -> TB = 8 anos. Para re-alinhamento S-A-B na mesma sequencia (A na frente de B), A deve ganhar exatamente uma volta em relacao a B. Delta_theta = 2pi*(1/TA - 1/TB)*t = 2pi. t*(1 - 1/8) = 1 -> t*(7/8) = 1 -> t = 8/7 anos. Alternativa B.'
$r18 = 'Sem forcas externas, o CM de qualquer sistema isolado move-se com velocidade constante. v_CM = (m_A*v_A + m_B*v_B)/(m_A + m_B) = (m_A*0 + m_B*V)/(m_A + m_B) = m_B*V/(m_A+m_B). Como m_A > 0, v_CM < V (inferior a V) e no mesmo sentido de B. Velocidade constante. Alternativa C.'
$r19 = 'Forca F=10 N paralela ao plano inclinado, m=1 kg, g=10 m/s^2. Pela imagem, o plano tem comprimento L=5 m e altura h=3 m. W_F = F*L = 10*5 = 50 J. W_grav = -m*g*h = -1*10*3 = -30 J. Alternativa B.'
$r20 = 'Principio de Pascal: p1 = p2. p2 = P/A2 (pressao para sustentar o automovel). Logo p1 = P/A2. Volume incompressivel: A1*h1 = A2*h2 -> h2 = (A1/A2)*h1. Alternativa B.'
$r21 = 'Gas ideal com quantidade constante: PV/T = constante. Estado A: P_A=3atm, V_A=2L, T_A=300K. A->B (isobarica P=3atm): T_B = T_A*(V_B/V_A) = 300*(6/2) = 900 K. B->C (isochorica V=6L): T_C = T_B*(P_C/P_B) = 900*(6/3) = 1800 K. Alternativa D.'
$r22 = '(V) 2a lei proibe maquina ciclica que converta integralmente calor em trabalho sem outras transferencias. (V) Entropia de sistema isolado nunca diminui; constante em processos reversiveis. (V) Nenhuma maquina real tem eficiencia maior que Carnot (Teorema de Carnot). (V) Variacao de entropia indica o sentido natural e a espontaneidade dos processos. Todas verdadeiras. Alternativa A.'
$r23 = 'Pendulo simples: f = (1/2pi)*sqrt(g/L). Na Lua, g_L = g/6 -> f diminui. Para recuperar a mesma frequencia na Lua: sqrt(g_L/L_novo) = sqrt(g/L) -> L_novo = g_L*L/g = L/6 -> diminuir o comprimento. Alternativa E.'
$r24 = 'Associacao: (1) Relaciona-se a altura do som percebido -> Frequencia (2). (2) Variacao periodica no volume do som -> Batimento (4). (3) Depende de harmonicos alem do fundamental -> Timbre (3). (4) Relaciona-se a amplitude da onda -> Intensidade (1). Sequencia: 2-4-3-1. Alternativa B.'
$r25 = 'Refracao com theta1 > theta2 (raio se aproxima da normal). Lei de Snell: n1*sin(theta1) = n2*sin(theta2). theta1 > theta2 -> sen(theta1) > sen(theta2) -> n2 > n1. I: v = c/n, n2 > n1 -> v2 < v1 -> VERDADEIRA. II: n2 > n1 -> VERDADEIRA. III: frequencia nao muda na refracao -> FALSA. Apenas I e II. Alternativa D.'
$r26 = 'Esferas A (raio R, carga -7e) e B (raio R/2, carga -5e). Carga total: -12e. Apos contato, potencial igual: k*qA/R = k*qB/(R/2) -> qA/R = 2*qB/R -> qA = 2*qB. Conservacao: qA + qB = -12e -> 2qB + qB = -12e -> qB = -4e, qA = -8e. Alternativa B.'
$r27 = '(F) Pardal funciona por inducao eletromagnetica, nao por pressao mecanica. (V) Passagem do veiculo perturba B -> variacao de fluxo -> fem por lei de Faraday. (F) Corrente induzida OPOE a variacao de fluxo (Lei de Lenz), nao tem mesmo sentido. (V) v = d/Delta_t. Sequencia: F-V-F-V. Alternativa A.'
$r28 = 'Producao de par: foton -> eletron + positron (proximo a nucleo). Carga do foton = 0; carga total do par = -e + e = 0 -> carga conservada. Energia conservada (E = mc^2). A massa nao e conservada (foton tem massa zero, particulas tem massa). Momento linear tambem e conservado com ajuda do nucleo. Alternativa C.'
$r29 = 'A: Bohr postulou orbitas quantizadas, nao quaisquer orbitas -> FALSA. B: Planck postulou emissao em quanta (discreta), nao continua -> FALSA. C: Einstein explicou efeito fotoeletrico: E_eletron = hf - W (depende da frequencia f, nao da intensidade) -> VERDADEIRA. D: teoria classica previa catastrofe ultravioleta (energia infinita em altas freq), nao diminuicao -> FALSA. E: quantizacao surgiu para radiacao de corpo negro -> FALSA. Alternativa C.'
$r30 = '(V) Satelites se movem a alta velocidade -> relogios sofrem dilatacao temporal (andam mais devagar que os da Terra), prevista pela relatividade restrita. (F) A diferenca de tempo e significativa (~38 microsegundos/dia) e exige ajuste previo nos relogios a bordo, nao apenas em solo. (V) Os efeitos sao compensados por ajustes previos nos relogios e correcoes continuas para garantir precisao do GPS. Sequencia: V-F-V. Alternativa E.'

$ids = @('UFRGS-2026-F-16','UFRGS-2026-F-17','UFRGS-2026-F-18','UFRGS-2026-F-19','UFRGS-2026-F-20',
         'UFRGS-2026-F-21','UFRGS-2026-F-22','UFRGS-2026-F-23','UFRGS-2026-F-24','UFRGS-2026-F-25',
         'UFRGS-2026-F-26','UFRGS-2026-F-27','UFRGS-2026-F-28','UFRGS-2026-F-29','UFRGS-2026-F-30')

$ress = @($r16,$r17,$r18,$r19,$r20,$r21,$r22,$r23,$r24,$r25,$r26,$r27,$r28,$r29,$r30)

for ($i = 0; $i -lt 15; $i++) {
    $content = Add-Res $content $ids[$i] $ress[$i]
}

[System.IO.File]::WriteAllText($filePath, $content, [System.Text.UTF8Encoding]::new($false))
Write-Output 'Pronto! 15 resolucoes de 2026 inseridas.'
