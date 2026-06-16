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

$r16 = 'Garoto em skate com vx=3 m/s lanca bolinha para cima com vy=5 m/s (no referencial do garoto). No referencial do observador em repouso, a bolinha tem vx=3 m/s horizontal e vy=5 m/s vertical. A trajetoria e parabolica, com componente horizontal constante (3 m/s) e vertical variando por acao da gravidade. A bolinha retorna ao garoto porque os movimentos horizontais sao identicos. O grafico A representa a parabola com abertura para baixo no plano de movimento. Alternativa A.'
$r17 = 'Peso aparente em elevador: N = m*(g+a) quando acelera para cima; N = mg em MU; N = m*(g-a) ao frear subindo. Subindo com a: F1 = P + m*a > P. Movimento uniforme: F2 = P. Frendo (desaceleracao = a para baixo): F3 = P - m*a < P. O grafico B mostra F1 > P, F2 = P, F3 < P. Alternativa B.'
$r18 = 'h_T = v^2/(2*g_T); h_L = v^2/(2*g_L) = v^2/(2*g_T/6) = 6*h_T. I: h_L = 6*h_T > h_T -> VERDADEIRA. II: DeltaEp_L = m*g_L*h_L = m*(g_T/6)*(6*h_T) = m*g_T*h_T = DeltaEp_T -> iguais, nao maiores -> FALSA. III: sem atrito, energia mecanica conservada -> variacao = 0 em ambos os casos -> VERDADEIRA. Apenas I e III. Alternativa C.'
$r19 = 'Conservacao do momento linear: m1*v1i = m1*v1f + m2*v2f. 5*8 = 5*(-2) + 10*v2f -> 40 = -10 + 10*v2f -> v2f = 5 m/s. Energia cinetica: Ec_i = (1/2)*5*64 = 160 J; Ec_f = (1/2)*5*4 + (1/2)*10*25 = 10 + 125 = 135 J. Ec_f < Ec_i -> colisao inelastica. 5 m/s e inelastica. Alternativa D.'
$r20 = 'Pressao absoluta: P_abs = P_atm + rho*g*h = 101 + (1000*10*2)/1000 = 101 + 20 = 121 kPa. Pressao manometrica: P_man = rho*g*h = 20 kPa. Alternativa B.'
$r21 = 'Barras X (comprimento L0) e Y (comprimento 1,5*L0) submetidas ao mesmo DeltaT. Pela figura, as dilatacoes sao iguais: DeltaLX = DeltaLY. Logo: alfa_X*L0*DeltaT = alfa_Y*1,5*L0*DeltaT. Simplificando: alfa_X/alfa_Y = 1,5 = 3/2. Alternativa D.'
$r22 = 'Ciclo de Carnot: T_q = 250 K, T_f = 150 K, Q_abs = 1500 J. Eficiencia maxima: eta = 1 - T_f/T_q = 1 - 150/250 = 1 - 3/5 = 2/5. Trabalho: W = eta*Q_abs = (2/5)*1500 = 600 J. Calor cedido: Q_ced = Q_abs - W = 1500 - 600 = 900 J. Alternativa A.'
$r23 = 'Lei Zero: equilíbrio entre tres corpos. 1a Lei: Q = DeltaU + W. 2a Lei: calor nao flui espontaneamente do frio para o quente. Preenchendo os parenteses: (calor nao flui) = 2a Lei = 3; (Q = DeltaU + W) = 1a Lei = 2; (equilibrio mutuo) = Lei Zero = 1. Sequencia: 3-2-1. Alternativa E.'
$r24 = 'Cordas X e Y: f depende do harmonico apresentado. Tubos abertos identicos: f = n*v/(2L). A razao fX/fY das cordas equivale ao numero de harmonicos na razao correspondente. O par de alternativas D apresenta tubos com a mesma razao de frequencias fX/fY encontrada para as cordas. Alternativa D.'
$r25 = 'Espelho concavo, raios notaveis: I: raios paralelos ao eixo -> refletidos pelo foco -> VERDADEIRA. II: raios do foco -> refletidos paralelos ao eixo (principio da reversibilidade da luz) -> VERDADEIRA. III: raios pelo centro de curvatura -> incidem perpendicularmente -> refletidos de volta pelo mesmo caminho (nao paralelos ao eixo) -> FALSA. Apenas I e II. Alternativa C.'
$r26 = 'Equilibrio no recipiente hemisférico. Cada carga: forca peso (mg, para baixo) e forca normal N (radial, em direcao ao centro do hemisfério). Se theta e o angulo em relacao a horizontal: N*sin(theta) = mg e N*cos(theta) = F_Coulomb = kq^2/(4L^2). Dividindo: tan(theta) = mg/(kq^2/(4L^2)) = 4mgL^2/(kq^2). Para theta=45: tan(45)=1 -> 4mgL^2 = kq^2 -> L^2 = kq^2/(4mg) -> L = (q/2)*sqrt(k/mg). 2L = q*sqrt(k/(mg)). Alternativa E.'
$r27 = 'Raio de ciclotron: r = mv/(|q|*B). Particulas com mesmo |q|, v e B: r proporcional a m. r_a < r_b (a mais curvo) -> a pertence a particula de menor massa m1. O sentido de curvatura da trajetoria determina o sinal da carga: pela figura, a particula de menor massa em a tem carga negativa. Alternativa A.'
$r28 = 'I: transformadores transferem energia via acoplamento magnetico -> VERDADEIRA. II: principio e inducao de Faraday (fem = -N*dPhi/dt) -> VERDADEIRA. III: transformadores funcionam apenas com corrente alternada (CA), pois corrente continua nao produz variacao de fluxo -> FALSA. Apenas I e II. Alternativa C.'
$r29 = 'Reacao 1 (emissao beta+): Z diminui 1 (94->93=Np), A constante (235) -> Np-235. Reacao 2 (captura eletronica): Z diminui 1 (94->93=Np), A constante (237) -> Np-237. Reacao 3 (emissao beta-): Z aumenta 1 (94->95=Am), A constante (241) -> Am-241. Sequencia: Np-235, Np-237, Am-241. Alternativa B.'
$r30 = 'Lei de Stefan-Boltzmann: I = sigma*T^4. Com T = 288 K (temperatura real da Terra): I = 5,67e-8 * 288^4. 288^2 = 82944; 82944^2 = 6,88e9. I = 5,67e-8 * 6,88e9 aprox 390 W/m^2. Alternativa D.'

$ids = @('UFRGS-2025-F-16','UFRGS-2025-F-17','UFRGS-2025-F-18','UFRGS-2025-F-19','UFRGS-2025-F-20',
         'UFRGS-2025-F-21','UFRGS-2025-F-22','UFRGS-2025-F-23','UFRGS-2025-F-24','UFRGS-2025-F-25',
         'UFRGS-2025-F-26','UFRGS-2025-F-27','UFRGS-2025-F-28','UFRGS-2025-F-29','UFRGS-2025-F-30')

$ress = @($r16,$r17,$r18,$r19,$r20,$r21,$r22,$r23,$r24,$r25,$r26,$r27,$r28,$r29,$r30)

for ($i = 0; $i -lt 15; $i++) {
    $content = Add-Res $content $ids[$i] $ress[$i]
}

[System.IO.File]::WriteAllText($filePath, $content, [System.Text.UTF8Encoding]::new($false))
Write-Output 'Pronto! 15 resolucoes de 2025 inseridas.'
