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

$r16 = 'Lancamento horizontal. No referencial do aviao, a carga tem velocidade inicial zero. Sem resistencia do ar, a componente horizontal relativa ao aviao permanece zero; a componente vertical cresce com a gravidade. Apos t = 5 s: v_rel = g*t = 10*5 = 50 m/s. Alternativa C.'
$r17 = 'Sistema de 3 blocos (mA=3, mB=2, mC=1 kg) sob F=18 N. Aceleracao: a = 18/6 = 3 m/s^2. I: a forca F realiza trabalho positivo sobre o sistema (superficie lisa, sem dissipacao) -> FALSA. II: FAB = (mB+mC)*a = 3*3 = 9 N; FCB = mC*a = 1*3 = 3 N -> VERDADEIRA. III: FA_res = 3*3=9 N, FB_res=2*3=6 N, FC_res=1*3=3 N -> VERDADEIRA. Apenas II e III. Alternativa D.'
$r18 = 'Saturno: rS = 10*rT, MS = 100*MT. Forca: F_S = G*M_sol*(100*MT)/(10*rT)^2 = G*M_sol*MT/rT^2 = F_T -> aproximadamente igual. Aceleracao: a_S = F_S/MS = F_T/(100*MT) = a_T/100 -> menor que a da Terra. Alternativa E.'
$r19 = 'Colisao perfeitamente inelastica 2D. Momentos: px = (1/2)*2 = 1 kg*m/s; py = (1/3)*3 = 1 kg*m/s. |p_total| = sqrt(2) kg*m/s (nao 2, logo C e falsa). m_total = 5/6 kg. |v_f| = sqrt(2)/(5/6) aprox 1,70 m/s (nao 2,4, logo D e falsa). Ec_inicial = (1/2)*(1/3)*9 + (1/2)*(1/2)*4 = 3/2 + 1 = 5/2 J. Ec_final = |p|^2/(2*m_total) = 2/(2*(5/6)) = 6/5 J. Alternativa E.'
$r20 = 'Sistema massa-mola: m = 0,5 kg, xmax = 0,02 m, vmax = 0,04 m/s. Pela igualdade de energias no equilibrio e no extremo: (1/2)*k*xmax^2 = (1/2)*m*vmax^2. k = m*vmax^2/xmax^2 = 0,5*(0,04)^2/(0,02)^2 = 0,5*4 = 2 N/m. Energia mecanica: E = (1/2)*k*xmax^2 = (1/2)*2*(0,02)^2 = 4e-4 J = 0,4 mJ. Alternativa C.'
$r21 = 'Bloco flutuando na interface agua-oleo. Volume na agua: 4V/5; no oleo: V/5. Equilibrio de empuxos: rho_agua*(4V/5) + rho_oleo*(V/5) = rho_bloco*V. 1000*(4/5) + rho_oleo*(1/5) = 900. 800 + rho_oleo/5 = 900. rho_oleo = 500 kg/m^3. Alternativa C.'
$r22 = 'Ciclo termodinamico em diagrama P-V. Ciclo percorrido no sentido horario: W_liquido > 0 (area positiva). Pela 1a lei para ciclo completo: Q_liquido = W_liquido. Logo ciclos horarios absorvem mais calor do que cedem. Pela figura, os ciclos 1 e 3 sao percorridos no sentido horario. Alternativa B.'
$r23 = 'Maquina termica com T2 > T1, W > 0. Usando 1a lei: W = Q2 - Q1 (Q2 extraido de T2, Q1 cedido a T1). Poss. 1: Q2 > Q1 > 0 -> W = Q2-Q1 > 0 -> valida. Poss. 2: Q1 > Q2 > 0 -> W = Q2-Q1 < 0 -> contradiz W > 0 -> invalida. Poss. 3: Q1 < 0 -> maquina extrai calor de ambos os reservatorios -> viola a 2a lei da Termodinamica -> invalida. Apenas a possibilidade 1 e correta. Alternativa A.'
$r24 = 'Lendo os comprimentos de onda das tres ondas na figura: onda 2 tem maior lambda, onda 1 e intermediaria, onda 3 tem menor lambda. Razoes: lambda1/lambda2 = 3/4; lambda1/lambda3 = 3/2; lambda2/lambda3 = 2. Verificacao: lambda2 = (4/3)*lambda1 e lambda3 = (1/2)*lambda2 = (2/3)*lambda1 -> lambda2/lambda3 = 2 e lambda1/lambda3 = 3/2. Alternativa D.'
$r25 = 'Questao anulada pela banca examinadora. Nao ha gabarito oficial valido.'
$r26 = 'Interferencia em fenda dupla: d = 0,16 mm = 1,6e-4 m, L = 5 m, h = 2 cm = 0,02 m. Comprimento de onda: lambda = d*h/L = (1,6e-4)*(0,02)/5 = 3,2e-6/5 = 6,4e-7 m = 640 nm. Alternativa D.'
$r27 = 'Esferas condutoras a, b, c com raios R, 2R, 3R. Carga total: +2Q - 3Q - 2Q = -3Q. Apos contato via fio, atingem mesmo potencial: V = k*q/r. k*qa/R = k*qb/(2R) = k*qc/(3R) -> qa:qb:qc = 1:2:3. Conservacao: qa+qb+qc = -3Q -> x+2x+3x = -3Q -> x = -Q/2. qa = -Q/2, qb = -Q, qc = -3Q/2. Alternativa E.'
$r28 = 'Circuito: R1 e R3 em paralelo (R1||R3 = 2*2/(2+2) = 1 Ohm), em serie com R2 (1 Ohm). Resistencia total: R_total = 1 + 1 = 2 Ohm. Tensao da fonte = 12 V. Corrente em R2: i = 12/2 = 6 A. Alternativa C.'
$r29 = 'Ima se move ao longo do eixo da bobina. I: corrente induzida existe sempre que ha variacao de fluxo, ou seja, sempre que o ima se move (nao precisa acelerar) -> FALSA. II: ima move para a esquerda -> fluxo pelo lado de onde o ima se afasta diminui -> corrente induzida (Lei de Lenz) flui de a para b para criar campo que mantenha o fluxo -> VERDADEIRA. III: quando ima esta completamente inserido, taxa de variacao de fluxo e minima (proximo a zero) -> corrente minima, nao maxima -> FALSA. Apenas II. Alternativa B.'
$r30 = 'Hipotese de De Broglie: toda particula massiva com momento linear p possui comprimento de onda associado lambda = h/p, onde h e a constante de Planck. Alternativa A.'

$ids = @('UFRGS-2022-F-16','UFRGS-2022-F-17','UFRGS-2022-F-18','UFRGS-2022-F-19','UFRGS-2022-F-20',
         'UFRGS-2022-F-21','UFRGS-2022-F-22','UFRGS-2022-F-23','UFRGS-2022-F-24','UFRGS-2022-F-25',
         'UFRGS-2022-F-26','UFRGS-2022-F-27','UFRGS-2022-F-28','UFRGS-2022-F-29','UFRGS-2022-F-30')

$ress = @($r16,$r17,$r18,$r19,$r20,$r21,$r22,$r23,$r24,$r25,$r26,$r27,$r28,$r29,$r30)

for ($i = 0; $i -lt 15; $i++) {
    $content = Add-Res $content $ids[$i] $ress[$i]
}

[System.IO.File]::WriteAllText($filePath, $content, [System.Text.UTF8Encoding]::new($false))
Write-Output 'Pronto! 15 resolucoes de 2022 inseridas.'
