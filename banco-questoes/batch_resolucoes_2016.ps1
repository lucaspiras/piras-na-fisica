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

$r01 = 'Grafico d(m) x t(s): Pedro faz 1600 m em 500 s (v_med = 3,2 m/s), Paulo faz 1600 m em ~575 s (v_med ~ 2,8 m/s). I: v_med Pedro > Paulo -> VERDADEIRA. II: velocidade maxima e de Pedro (800 m em 100 s = 8 m/s), Paulo tem ~4 m/s -> FALSA. III: Pedro parou 300 s, Paulo parou ~150 s -> FALSA. Apenas I. Alternativa A.'
$r02 = 'Plano inclinado sem atrito. Peso do bloco: mg (sempre). Forca normal perpendicular ao plano: N = mg*cos(theta). Alternativa C.'
$r03 = 'Plano inclinado sem atrito. Forca resultante = componente do peso ao longo do plano: F_res = mg*sen(theta). Alternativa B.'
$r04 = 'MCU no sentido horario. No ponto I (topo do circulo): velocidade tangencial aponta para a direita (->). Aceleracao centripeta aponta em direcao ao centro (para baixo). Alternativa C.'
$r05 = 'g_K = G*M_K/R_K^2 = G*(5*M_T)/(1,6*R_T)^2 = 5/2,56 * g_T = 1,95*g ≈ 2g. Alternativa C.'
$r06 = 'Energia cinetica perdida pela particula (transferida a barra): DeltaEc = (1/2)*m*vi^2 - (1/2)*m*(vi/2)^2 = (3/8)*m*vi^2. Toda essa energia e convertida em energia potencial gravitacional da barra: M*g*h = (3/8)*m*vi^2. h = 3*m*vi^2/(8*M*g). Alternativa D.'
$r07 = 'Impulso = variacao de quantidade de movimento da particula: |J| = m*|v_f - v_i| = m*|(-vi/2) - vi| = m*(3*vi/2) = 1,5*m*vi. Alternativa E.'
$r08 = 'MCU: modulo da velocidade constante. Forca resultante e centripeta (perpendicular ao vetor velocidade). Trabalho = F * d * cos(90) = 0. Alternativa B.'
$r09 = 'No ponto mais alto: v_y = 0, v_x = v0x. Ec = (1/2)*m*v0x^2 = m*v0x^2/2. Por conservacao de energia: Ep = (1/2)*m*v0^2 - (1/2)*m*v0x^2 = (1/2)*m*v0y^2 = m*v0y^2/2. Alternativa D.'
$r10 = 'Empuxo: E = rho_liq * g * V_sub. I: E proporcional a rho_liq -> VERDADEIRA. II: E proporcional a V_sub (volume submerso, nao total) -> FALSA. III: E nao depende de rho_obj diretamente -> FALSA. Apenas I. Alternativa A.'
$r11 = 'Q = m*c*DeltaT com Q e DeltaT iguais: m_ar * c_ar = m_ag * c_ag. m_ar/m_ag = c_ag/c_ar = 4. Alternativa E.'
$r12 = 'Gas ideal: colisoes entre moleculas sao elasticas (conservam momento e energia cinetica). Logo a energia cinetica total das moleculas permanece constante. Alternativa B.'
$r13 = 'Grafico I (p x T): linha reta por origem -> p proporcional a T -> volume constante -> ISOCHORICA. Grafico II (V x T): linha reta por origem -> V proporcional a T -> pressao constante -> ISOBARICA. Alternativa D.'
$r14 = 'Maquina de Carnot maxima eficiencia: Tq = 527+273 = 800 K, Tf = 327+273 = 600 K. eta = 1 - Tf/Tq = 1 - 600/800 = 0,25. Q_abs = W/eta = 600/0,25 = 2400 J. Alternativa A.'
$r15 = 'Dentro de um condutor em equilibrio eletrostatico, o campo eletrico e nulo e o potencial e constante, igual ao da superficie: V = kQ/R. O grafico de V(r) para r < R e uma linha horizontal. Alternativa A.'
$r16 = 'I: curva i x V nao e reta -> nao ohmico -> FALSA. II: em V = 6 V, i ≈ 1 A -> R = V/i = 6 Ohm -> VERDADEIRA. III: em V = 8 V, i ≈ 1,2 A -> P = 8*1,2 = 9,6 W (nao 0,15 W) -> FALSA. Apenas II. Alternativa B.'
$r17 = 'Corrente no fio F cria forca magnetica sobre ele (Lei de Ampere). Forca resultante aponta para cima. Pela 3a lei de Newton, o fio exerce forca igual e oposta no iman (para baixo), aumentando a leitura da balanca. Fio: para cima; balanca: aumenta. Alternativa D.'
$r18 = 'Anel cai em direcao ao fio (corrente para a esquerda). Campo do fio acima dele entra na pagina. Ao cair, fluxo aumenta. Pela lei de Lenz, corrente induzida cria campo para fora da pagina -> corrente anti-horaria no anel. Forca induzida opoe o movimento (queda) -> aponta para o topo da pagina. Alternativa C.'
$r19 = 'Espelho concavo: 1/v = 1/f - 1/u = 1/20 - 1/60 = 2/60 -> v = 30 cm. v > 0 -> imagem real (mesmo lado do objeto). Objeto alem do centro (u > 2f) -> imagem invertida. Distancia = 30 cm. Alternativa B.'
$r20 = 'Prisma: dispersao (difracao nao). Luz azul tem maior indice de refracao e e mais desviada. Vermelha, menos desviada. Raio 1 (menos desviado) = vermelha, raio 2 = verde, raio 3 (mais desviado) = azul. Alternativa A.'
$r21 = 'A dispersao da luz branca ao atravessar o prisma ocorre por refracao: cada comprimento de onda tem indice de refracao diferente, logo e desviado por angulos diferentes. Alternativa E.'
$r22 = 'Onda estacionaria com 3 ventres (3a harmonica): L = 3*lambda/2 -> lambda = 2*L/3 = 2*0,50/3 = 1/3 m. f = v/lambda = 40/(1/3) = 120 Hz. Alternativa E.'
$r23 = 'I: ha nucleos estaveis (ex: C-12, Fe-56) -> FALSA. II: apos 2 meias-vidas resta (1/2)^2 = 25% (nao zero) -> FALSA. III: decaimento gama: nucleo excitado emite foton ao transitar para estado de menor energia -> VERDADEIRA. Apenas III. Alternativa C.'
$r24 = 'Modelo de Bohr: Rn = n^2 * R1 e En = E1/n^2. Raio cresce com n^2, energia (em modulo) cai com 1/n^2. Alternativa A.'
$r25 = 'Lei de Wien: T = 2,90e-3/lambda_max. I: Spica pico em ~0,15 micrometro -> T~19300 K, temperatura maior -> maior emissao por Stefan-Boltzmann -> mais brilhante -> VERDADEIRA. II: Sol pico em ~500 nm -> T = 2,9e-3/5e-7 = 5800 K -> VERDADEIRA. III: Antares pico em ~900 nm -> temperatura mais baixa -> mais fria -> VERDADEIRA. Todas corretas. Alternativa E.'

$ids = @('UFRGS-2016-F-01','UFRGS-2016-F-02','UFRGS-2016-F-03','UFRGS-2016-F-04','UFRGS-2016-F-05',
         'UFRGS-2016-F-06','UFRGS-2016-F-07','UFRGS-2016-F-08','UFRGS-2016-F-09','UFRGS-2016-F-10',
         'UFRGS-2016-F-11','UFRGS-2016-F-12','UFRGS-2016-F-13','UFRGS-2016-F-14','UFRGS-2016-F-15',
         'UFRGS-2016-F-16','UFRGS-2016-F-17','UFRGS-2016-F-18','UFRGS-2016-F-19','UFRGS-2016-F-20',
         'UFRGS-2016-F-21','UFRGS-2016-F-22','UFRGS-2016-F-23','UFRGS-2016-F-24','UFRGS-2016-F-25')

$ress = @($r01,$r02,$r03,$r04,$r05,$r06,$r07,$r08,$r09,$r10,$r11,$r12,$r13,$r14,$r15,
          $r16,$r17,$r18,$r19,$r20,$r21,$r22,$r23,$r24,$r25)

for ($i = 0; $i -lt 25; $i++) {
    $content = Add-Res $content $ids[$i] $ress[$i]
}

[System.IO.File]::WriteAllText($filePath, $content, [System.Text.UTF8Encoding]::new($false))
Write-Output 'Pronto! 25 resolucoes de 2016 inseridas.'
