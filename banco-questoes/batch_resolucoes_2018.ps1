$filePath = 'c:\Users\Usuario\OneDrive\Documentos\Programacao\piras-na-fisica\banco-questoes\fisica_ufrgs.json'
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

function Add-Res($text, $id, $res) {
    $gabPat = '"gabarito": "'
    $idPos = $text.IndexOf('"id": "' + $id + '"')
    if ($idPos -eq -1) { Write-Warning "ID $id not found"; return $text }
    $gabPos = $text.IndexOf($gabPat, $idPos)
    $afterGab = $gabPos + $gabPat.Length + 2
    $next = $text.Substring($afterGab, [Math]::Min(30, $text.Length - $afterGab))
    if ($next -match '"resolucao"') { Write-Output "SKIP $id"; return $text }
    $resJson = $res | ConvertTo-Json
    $before = $text.Substring(0, $afterGab)
    $after  = $text.Substring($afterGab)
    return $before + ",`n      `"resolucao`": $resJson" + $after
}

$r01 = 'Objeto 1 e objeto 2 iniciam queda simultaneamente. Verticalmente, ambos sofrem queda livre: y(t) = h - (1/2)g*t^2. Os graficos de posicao vertical versus tempo sao identicos: parabola partindo de h e chegando a 0 no instante t = q. Alternativa A.'
$r02 = 'Velocidade em relacao ao chao: v_total = 48 m / 30 s = 1,6 m/s. Velocidade da esteira: 1,0 m/s. Velocidade da pessoa em relacao a esteira: 1,6 - 1,0 = 0,6 m/s. Alternativa E.'
$r03 = 'Forca resultante sobre a corda: 780 - 720 = 60 N, apontando para o lado da equipe A (esquerda). Apos ruptura, as equipes sao aceleradas pela propria forca de puxada: aA = 780/300 = 2,6 m/s^2; aB = 720/300 = 2,4 m/s^2. Alternativa B.'
$r04 = 'I: eclipse lunar ocorre com Lua cheia (Terra entre Sol e Lua) -> verdadeira. II: eclipse solar ocorre com Lua entre Sol e Terra, nao a Terra entre Sol e Lua -> falsa. III: a Lua tem periodo de rotacao igual ao de translacao (rotacao sincrona), por isso vemos sempre a mesma face -> verdadeira. Apenas I e III. Alternativa C.'
$r05 = 'P esta a L/3 da esfera 1 e a 2L/3 da esfera 2. v = omega*r (mesma omega): v1/v2 = (L/3)/(2L/3) = 1/2. F = m*omega^2*r (mesma m e omega): F1/F2 = r1/r2 = 1/2. Razoes: 1/2 e 1/2. Alternativa C.'
$r06 = 'Posicao do CM em relacao a P (origem): xCM = (m*(-L/3) + m*(2L/3))/(2m) = (L/3)/2 = L/6. O CM descreve circunferencia de raio L/6. Alternativa D.'
$r07 = 'A forca gravitacional e conservativa: o trabalho realizado depende apenas das posicoes inicial i e final f, nao da trajetoria percorrida. Logo W1 = W2 = W3. Alternativa C.'
$r08 = 'F = k*x, k = 200/0,5 = 400 N/m. Energia elastica: E = (1/2)*400*0,5^2 = 50 J. Toda convertida em Ec: (1/2)*m*v^2 = 50 J. v = sqrt(2*50/0,04) = sqrt(2500) = 50 m/s. Alternativa C.'
$r09 = 'I: em colisoes inelasticas a Ec nao e conservada -> falsa. II: objeto com quantidade de movimento p tem Ec = p^2/(2m) > 0, logo tem energia mecanica -> verdadeira. III: objeto de menor massa pode ter maior p se sua velocidade for suficientemente maior -> falsa. Apenas II. Alternativa B.'
$r10 = 'Empuxo E = P_ar - T_agua = 16 - 14 = 2 N. Volume: V = E/(rho_a*g) = 2/(1000*10) = 2*10^-4 m^3. Densidade: rho = m/V = (16/10)/(2*10^-4) = 1,6/(2*10^-4) = 8,0*10^3 kg/m^3. Alternativa B.'
$r11 = 'Grafico: DeltaL = 0,8 mm para DeltaT = 40 grC. alfa = DeltaL/(L0*DeltaT) = 0,8 mm/(1000 mm * 40 grC) = 2*10^-5 /grC = 20*10^-6 /grC. Alternativa D.'
$r12 = 'Aquecimento do gelo de -10 a 0 grC: Q1 = 100*2,1*10 = 2100 J. Fusao: Q2 = 100*330 = 33000 J. Calor restante: Q3 = 56100 - 2100 - 33000 = 21000 J. Aquecimento da agua: DeltaT = 21000/(100*4,2) = 50 grC. Temperatura final = 50 grC. Alternativa D.'
$r13 = 'Vmax^2 = ((T_oce - T_atm)/T_atm)*E. I: diminuir T_oce reduz o numerador -> Vmax diminui. II: aumentar a diferenca (T_oce - T_atm) -> Vmax aumenta (contribui). III: diminuir E -> Vmax diminui. Apenas o processo II contribui para o aumento. Alternativa B.'
$r14 = 'Gas ideal: Vf/Vi = (Pi/Pf)*(Tf/Ti). Ti = 300 K, Tf = 250 K, Pf/Pi = 0,005. Vf/Vi = (1/0,005)*(250/300) = 200*(5/6) = 166,7 ≈ 167. Alternativa D.'
$r15 = 'Caso 1: com Q proxima e esfera aterrada, Q e afastada -> esfera retorna ao equilibrio com a terra e fica neutra; aterramento desfeito: neutra. Caso 2: aterramento desfeito enquanto Q esta proxima (carga positiva induzida presa na esfera); Q afastada: esfera permanece positivamente carregada. Alternativa A.'
$r16 = 'Circuito em serie: I = 0,20 A. R_lampada = V_lampada/I = 4/0,20 = 20 Ohm. Queda na resistencia interna: V_r = 0,20*5 = 1 V. V_resistor = 15 - 1 - 4 = 10 V. R_resistor = 10/0,20 = 50 Ohm. Alternativa B.'
$r17 = 'Carga negativa. Regiao I: curva para baixo ao entrar -> campo entrando na pagina. Regiao II: semicirculo na parte inferior -> campo saindo da pagina. Regiao III: curva para cima e sai horizontalmente -> campo entrando na pagina. Alternativa A.'
$r18 = 'Variante I: iman em repouso, bobina se aproximando com velocidade V -> variacao de fluxo identica -> mesma corrente (verdadeira). Variante II: corrente crescente em bobina proxima gera campo magnetico variavel -> induz corrente (verdadeira). Variante III: velocidade V/2 -> taxa de variacao diferente -> corrente diferente (falsa). Apenas I e II. Alternativa D.'
$r19 = 'Reflexao total interna exige: (1) n1 > n2 (luz vai de meio mais denso para menos denso). (2) sen(theta1) > n2/n1 (angulo de incidencia maior que o angulo critico). Alternativa E.'
$r20 = 'Figura I (imagem formada a frente da retina): miopia; correcao com lentes divergentes. Figura II (raios interceptados antes de formar imagem, ou seja, imagem atras da retina): hipermetropia; correcao com lentes convergentes. Alternativa E.'
$r21 = 'A alteracao de frequencia de onda por reflexao em superficie em movimento e o efeito Doppler, utilizado pelos radares. Alternativa A.'
$r22 = 'Franja escura: interferencia destrutiva, DeltaL = (n + 1/2)*lambda -> numero semi-inteiro de comprimentos de onda. Ponto central O: DeltaL = 0 -> interferencia construtiva -> franja clara. Alternativa E.'
$r23 = '1 gravitacional: mareas (c). 2 eletromagnetica: estabilidade do atomo, eletrons orbitando nucleo (d). 3 nuclear forte: coesao do nucleo (b). 4 nuclear fraca: decaimento beta (a). Associacao: 1(c)-2(d)-3(b)-4(a). Alternativa C.'
$r24 = 'U-239 -> Np-239: Z aumenta 1 (92 para 93), A invariavel -> decaimento beta-. Np-239 -> Pu-239: Z aumenta 1 (93 para 94), A invariavel -> decaimento beta-. Ambas sao emissoes beta. Alternativa D.'
$r25 = 'Dilatacao temporal e contracao espacial (do espaco) sao consequencias diretas dos postulados da Teoria Especial da Relatividade (Einstein, 1905). Alternativa A.'

$ids = @('UFRGS-2018-F-01','UFRGS-2018-F-02','UFRGS-2018-F-03','UFRGS-2018-F-04','UFRGS-2018-F-05',
         'UFRGS-2018-F-06','UFRGS-2018-F-07','UFRGS-2018-F-08','UFRGS-2018-F-09','UFRGS-2018-F-10',
         'UFRGS-2018-F-11','UFRGS-2018-F-12','UFRGS-2018-F-13','UFRGS-2018-F-14','UFRGS-2018-F-15',
         'UFRGS-2018-F-16','UFRGS-2018-F-17','UFRGS-2018-F-18','UFRGS-2018-F-19','UFRGS-2018-F-20',
         'UFRGS-2018-F-21','UFRGS-2018-F-22','UFRGS-2018-F-23','UFRGS-2018-F-24','UFRGS-2018-F-25')

$ress = @($r01,$r02,$r03,$r04,$r05,$r06,$r07,$r08,$r09,$r10,$r11,$r12,$r13,$r14,$r15,
          $r16,$r17,$r18,$r19,$r20,$r21,$r22,$r23,$r24,$r25)

for ($i = 0; $i -lt 25; $i++) {
    $content = Add-Res $content $ids[$i] $ress[$i]
}

[System.IO.File]::WriteAllText($filePath, $content, [System.Text.UTF8Encoding]::new($false))
Write-Output 'Pronto! 25 resolucoes de 2018 inseridas.'
