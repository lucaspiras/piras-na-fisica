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

$r16 = 'Ec = 10^20 eV = 10^20 * 1,6e-19 J = 16 J. Ec = (1/2)*m*v^2 -> v^2 = 2*16/0,005 = 6400 -> v = 80 m/s. Alternativa C.'
$r17 = 'MRUV: s1=100m em t=5s e s2=100m de t=5 a t=8s. Equacoes: 100=5v0+12,5a (1); 100=3v0+19,5a (2). De (1): v0=20-2,5a. Substituindo em (2): 60-7,5a+19,5a=100 -> 12a=40 -> a=10/3 aprox 3,3 m/s^2. Alternativa B.'
$r18 = 'Sistema com roldana: bloco horizontal m1=6 kg, bloco suspenso m2=4 kg. Forcas: m2*g = 4*10 = 40 N. Massa total: 10 kg. Aceleracao: a = 40/10 = 4 m/s^2. Tensao: T = m1*a = 6*4 = 24 N. Alternativa A.'
$r19 = 'I: sonda aderiu a Dimorfo -> colisao perfeitamente inelastica -> VERDADEIRA. II: Dimorfo e Didimo estao gravitacionalmente ligados; alteracao na orbita de Dimorfo afeta necessariamente a orbita de Didimo em torno do CM do sistema -> VERDADEIRA. III: a sonda e um objeto externo ao sistema binario; seu impacto transfere momento linear para o sistema, alterando a velocidade do CM do sistema -> VERDADEIRA. I, II e III. Alternativa E.'
$r20 = 'Questao anulada pela banca examinadora. Nao ha gabarito oficial valido.'
$r21 = 'Dilatacao linear: LA = L0*(1+alfa_A*DeltaT) = L0*(1+2*alfa_B*DeltaT); LB = L0*(1+alfa_B*DeltaT). Seja x = alfa_B*DeltaT > 0. LA/LB = (1+2x)/(1+x) = 1 + x/(1+x). Como 0 < x/(1+x) < 1, temos 1 < LA/LB < 2. Alternativa E.'
$r22 = 'Transformacao isochorica: P/T = constante. T1 = 13+273 = 286 K, P1 = 1 atm. T2 = 26+273 = 299 K. P2 = 1*299/286 = 1,045 atm. Maior que 1 atm e menor que 2 atm. Alternativa A.'
$r23 = 'Para ciclo completo: Delta_U = 0 -> Q = W (1a lei). Portanto Q equivale a area do ciclo no diagrama P-V. Ambos os ciclos sao percorridos no sentido horario (W > 0). As figuras estao na mesma escala. Ciclo (I) tem area maior que ciclo (II) -> W(I) > W(II) -> Q(I) > Q(II). Alternativa B.'
$r24 = 'A lupa e uma lente convexa (convergente). Quando o objeto e colocado entre o foco F e o centro optico, a imagem formada e virtual, direta e ampliada. Alternativa A.'
$r25 = 'Esferas em contato atingem mesmo potencial: k*q1/R = k*q2/(2R) -> q2 = 2*q1. Campo na superficie: E1 = k*q1/R^2; E2 = k*q2/(2R)^2 = k*(2q1)/(4R^2) = k*q1/(2R^2). Razao: E1/E2 = (k*q1/R^2)/(k*q1/2R^2) = 2. Alternativa C.'
$r26 = 'Fonte real: V = I*(R + Ri). Para I=4A e R=2,5 Ohm: V = 4*(2,5+Ri) = 10+4Ri. Para I=3A e R=3,5 Ohm: V = 3*(3,5+Ri) = 10,5+3Ri. Igualando: 10+4Ri = 10,5+3Ri -> Ri = 0,5 Ohm. V = 10+4*0,5 = 12 V. Alternativa B.'
$r27 = 'Proton acelerado por campo E ao longo de L: (1/2)*mp*vp^2 = qp*E*L -> vp = sqrt(2*qp*E*L/mp). Raio: r = mp*vp/(qp*B). Para particula alfa (ma=4mp, qa=2qp): va = sqrt(2*qa*E*L/ma) = sqrt(2*2qp*E*L/4mp) = sqrt(qp*E*L/mp) = vp/sqrt(2). Raio: ra = ma*va/(qa*B) = 4mp*(vp/sqrt(2))/(2qp*B) = sqrt(2)*(mp*vp/(qp*B)) = sqrt(2)*r aprox 1,41*r. Alternativa D.'
$r28 = 'O foton e o quantum da radiacao eletromagnetica. Tem massa de repouso igual a zero e carga eletrica nula. Alternativa D.'
$r29 = 'No grafico energia de ligacao por nucleon vs numero de massa: nucleos leves (inicio da curva, a esquerda) tem baixa energia de ligacao por nucleon; nucleos intermediarios tem a maxima. Fusao ocorre pela uniao de nucleos leves (inicio da curva) para formar nucleo com maior energia de ligacao por nucleon, liberando energia. Fissao ocorre com nucleos pesados (final da curva), que ao se quebrar formam fragmentos com maior energia de ligacao. Alternativa E.'
$r30 = 'I: calota austral esta sobre o continente antartico; ao derreter, toda a massa de gelo adiciona agua ao oceano -> eleva o nivel mais do que o gelo flutuante -> VERDADEIRA. II: gelo flutuante ja desloca volume de agua igual a sua massa (Arquimedes); ao derreter, o volume de agua produzida ocupa exatamente o espaco que estava submerso -> nivel nao se altera -> VERDADEIRA. III: a conclusao de que o derretimento da calota continental eleva o nivel e independente da diferenca de densidade entre gelo e agua (o gelo esta em terra, nao flutuando) -> VERDADEIRA. I, II e III. Alternativa E.'

$ids = @('UFRGS-2023-F-16','UFRGS-2023-F-17','UFRGS-2023-F-18','UFRGS-2023-F-19','UFRGS-2023-F-20',
         'UFRGS-2023-F-21','UFRGS-2023-F-22','UFRGS-2023-F-23','UFRGS-2023-F-24','UFRGS-2023-F-25',
         'UFRGS-2023-F-26','UFRGS-2023-F-27','UFRGS-2023-F-28','UFRGS-2023-F-29','UFRGS-2023-F-30')

$ress = @($r16,$r17,$r18,$r19,$r20,$r21,$r22,$r23,$r24,$r25,$r26,$r27,$r28,$r29,$r30)

for ($i = 0; $i -lt 15; $i++) {
    $content = Add-Res $content $ids[$i] $ress[$i]
}

[System.IO.File]::WriteAllText($filePath, $content, [System.Text.UTF8Encoding]::new($false))
Write-Output 'Pronto! 15 resolucoes de 2023 inseridas.'
