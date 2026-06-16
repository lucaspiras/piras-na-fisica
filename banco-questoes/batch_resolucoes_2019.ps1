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

$r01 = 'Grafico a-t: intervalo 1 (a negativa), intervalo 2 (a=0), intervalo 3 (a positiva). No grafico d-t: curva concava para baixo (desacelera), segmento reto com menor inclinacao (v constante), curva concava para cima (acelera). Alternativa A.'
$r02 = 'Aceleracao de A: aA = FA/m = 20/m. Componente horizontal de FB: FB*cos(theta) = 50*0,8 = 40 N. Aceleracao de B: aB = 40/m. Razao aB/aA = 40/20 = 2. Alternativa C.'
$r03 = 'Lei da gravitacao: F proporcional a 1/r^2. Sonda a rS = rT/24. Razao FS/FT = (rT/rS)^2 = 24^2 = 576. Alternativa E.'
$r04 = 'Torque do pedal: tau_pedal = FP*RP. Tensao na correia: T = FP*RP/RD (equilibrio de torques na coroa dianteira). Torque transmitido a roda traseira: tau = T*RE = RE*RP*FP/RD. Alternativa A.'
$r05 = 'Energia da mola: (1/2)kX^2 = mgh. Para massa 2m e compressao 2X: (1/2)k(2X)^2 = 2m*g*H -> 4*(1/2)kX^2 = 2mgH -> 4mgh = 2mgH -> H = 2h. Alternativa D.'
$r06 = 'Velocidade constante implica equilibrio de forcas: forca de atrito = Mg*sen(theta). Descendo altura h, percurso no plano = h/sen(theta). Trabalho da forca peso: W_P = +Mgh. Trabalho do atrito: W_at = -Mg*sen(theta)*(h/sen(theta)) = -Mgh. Alternativa B.'
$r07 = 'Cortado o fio, bloco B desliza pelo plano inclinado: trajetoria diagonal (para baixo e lateralmente). Para o sistema B+P, forca horizontal externa = 0 (piso sem atrito), logo CM do sistema desce verticalmente. Alternativa E.'
$r08 = 'Queda livre: v = g*T (com T = tempo de queda). Quantidade de movimento ao atingir o solo: p = M*v = M*g*T. Alternativa D.'
$r09 = 'Impulso = area sob F-t: triangulo (0-10 s) = (1/2)*10*100000 = 500000 N*s; retangulo (10-20 s) = 10*100000 = 1000000 N*s; trapezio (20-30 s) = (1/2)*(100000+150000)*10 = 1250000 N*s. Total I = 2750000 N*s. Peso do combustivel: Pc = I/Isp = 2750000/2000 = 1375 N. Massa: m = Pc/g = 1375/10 = 137,5 kg. Alternativa B.'
$r10 = 'Equilibrio de pressoes na base do tubo em U: rho_agua*6 = rho_liquido*9 (alturas em cm). rho_liquido = 6/9 = 0,67 g/cm3, aproximadamente 0,7 g/cm3. Alternativa D.'
$r11 = 'Energia absorvida: SAR*t = 1,5 * (6*60) = 1,5*360 = 540 J/kg. Variacao de temperatura: DeltaT = 540/3600 = 0,15 grC. Alternativa B.'
$r12 = 'I: volumes iguais, mesma T e mesmo DeltaT sob P constante -> DeltaV = V*(DeltaT/T) igual -> verdadeira. II: mesma T e P -> PV = nRT -> mesmo n (Avogadro) -> verdadeira. III: P constante -> V/T = nR/P = const -> V proporcional a T -> verdadeira. Todas corretas. Alternativa E.'
$r13 = 'Estado i: P=1e4 N/m2, V=2e-3 m3. Estado f: P=2e4 N/m2, V=4e-3 m3. Processo I (isobarico P=1e4 ate V=4e-3, depois isochorico): WI = 1e4*(4e-3-2e-3) = 20 J. Processo II (diagonal): WII = (1e4+2e4)/2*(4e-3-2e-3) = 30 J. Alternativa C.'
$r14 = 'Processo I: primeiro isobarico (P constante, V cresce de 2e-3 a 4e-3), depois isochorico (V constante, P cresce). Energia interna do gas ideal depende so da temperatura; estados i e f sao iguais para os dois processos, logo Delta_UI = Delta_UII. Alternativa D.'
$r15 = 'Paredes do perfil a 45 graus. Equilibrio da esfera: componente vertical N*cos45 = P e componente horizontal N*sen45 = Fe. Dividindo: Fe/P = sen45/cos45 = 1, logo Fe = P. Alternativa A.'
$r16 = 'Equipotenciais com linhas fechadas mais densas indicam carga maior. Cargas 1 e 2 tem equipotenciais com topologia de repulsao (mesmo sinal). Carga 3 apresenta maior numero de linhas (maior modulo). Ordem: q1 < q2 < q3. Alternativa A.'
$r17 = 'Campo externo de N para S (para a direita). Corrente no fio entrando na pagina. Campo do fio: sentido horario ao redor do fio. Acima do fio: campos somam (linhas mais densas). Abaixo: campos se opoem (ponto neutro, linhas fechadas ao redor). Configuracao da alternativa B. Alternativa B.'
$r18 = 'O aquecimento das panelas por campos magneticos alternados e inducao eletromagnetica, regida pela lei de Faraday-Lenz. Alternativa B.'
$r19 = 'Tubo aberto, modo fundamental: comprimento = lambda/2. Tubo 1 (L): lambda1 = 2L. Tubo 2 (L/2): lambda2 = 2*(L/2) = L. Razao lambda1/lambda2 = 2. Razao f1/f2 = lambda2/lambda1 = 1/2. Alternativa C.'
$r20 = 'Em onda mecanica longitudinal, o meio oscila paralelamente a direcao de propagacao. O transporte de energia ocorre na mesma direcao (paralela). Nao ha transporte de materia. Alternativa C.'
$r21 = 'Imagem em espelho plano e simetrica ao objeto em relacao ao espelho. Espelho horizontal; objeto O esta acima e a esquerda. Imagem fica abaixo do espelho na mesma posicao horizontal de O, correspondendo ao ponto 1. Alternativa A.'
$r22 = 'I: falsa (difracao ocorre em todos os tipos de onda, nao apenas sonoras). II: verdadeira (fenda mais estreita -> difracao mais acentuada). III: verdadeira (comprimento de onda maior -> difracao mais acentuada). Apenas II e III. Alternativa D.'
$r23 = 'Transicoes de eletrons entre niveis da eletrosfera resultam em emissao de fotons. Na faixa do visivel, isso corresponde a luz visivel. Alternativa B.'
$r24 = 'I: orbitas com N inteiros de comprimentos de onda de Broglie evidenciam dualidade onda-particula do eletron -> verdadeira. II: orbitas nao precisam ser circulares -> falsa. III: N e o numero quantico que identifica a orbita -> verdadeira. Apenas I e III. Alternativa C.'
$r25 = '1. Velocidades proximas da luz: Fisica Relativistica (c). 2. Dimensoes atomicas: Fisica Quantica (b). 3. Unificacao eletricidade e magnetismo por Maxwell: Fisica Classica (a). Correspondencia: 1(c), 2(b), 3(a). Alternativa E.'

$ids = @('UFRGS-2019-F-01','UFRGS-2019-F-02','UFRGS-2019-F-03','UFRGS-2019-F-04','UFRGS-2019-F-05',
         'UFRGS-2019-F-06','UFRGS-2019-F-07','UFRGS-2019-F-08','UFRGS-2019-F-09','UFRGS-2019-F-10',
         'UFRGS-2019-F-11','UFRGS-2019-F-12','UFRGS-2019-F-13','UFRGS-2019-F-14','UFRGS-2019-F-15',
         'UFRGS-2019-F-16','UFRGS-2019-F-17','UFRGS-2019-F-18','UFRGS-2019-F-19','UFRGS-2019-F-20',
         'UFRGS-2019-F-21','UFRGS-2019-F-22','UFRGS-2019-F-23','UFRGS-2019-F-24','UFRGS-2019-F-25')

$ress = @($r01,$r02,$r03,$r04,$r05,$r06,$r07,$r08,$r09,$r10,$r11,$r12,$r13,$r14,$r15,
          $r16,$r17,$r18,$r19,$r20,$r21,$r22,$r23,$r24,$r25)

for ($i = 0; $i -lt 25; $i++) {
    $content = Add-Res $content $ids[$i] $ress[$i]
}

[System.IO.File]::WriteAllText($filePath, $content, [System.Text.UTF8Encoding]::new($false))
Write-Output 'Pronto! 25 resolucoes de 2019 inseridas.'
