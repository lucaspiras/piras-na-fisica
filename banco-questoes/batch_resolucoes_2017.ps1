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

$r01 = 'Pedra lancada verticalmente sem resistencia do ar. A aceleracao e constante e igual a -g (para baixo) durante todo o movimento: subida, ponto mais alto e descida. Grafico a(t): linha horizontal constante em -g. Alternativa C.'
$r02 = 'MUA: a = 2s/t^2 = 2*100/100 = 2 m/s^2. v_med = 100/10 = 10 m/s = 36 km/h -> I verdadeira. a = 2 m/s^2 (nao 10 m/s^2) -> II falsa. v_max = a*t = 2*10 = 20 m/s (nao 10 m/s) -> III falsa. Apenas I. Alternativa A.'
$r03 = 'Aceleracao: a = Delta_v / Delta_t = 10 m/s / 2 s = 5 m/s^2. 2a Lei de Newton: m = F/a = 20/5 = 4 kg. Alternativa B.'
$r04 = 'omega = 2*pi/T = 2*pi/4 = pi/2 rad/s. a_c = omega^2 * R = (pi/2)^2 * 6 = (pi^2/4)*6 = 3*pi^2/2 m/s^2. Alternativa B.'
$r05 = 'Forca gravitacional nula em P (a D/3 de m1 e 2D/3 de m2): G*m*m1/(D/3)^2 = G*m*m2/(2D/3)^2. Simplificando: m1*9 = m2*9/4. m1/m2 = 1/4. Alternativa A.'
$r06 = 'Momento linear do CM: p_cmx = (m*2v0*cos(theta) + 2m*v0*cos(theta))/(3m) = 4v0*cos(theta)/3. p_cmy = (m*(-2v0*sin(theta)) + 2m*v0*sin(theta))/(3m) = 0. CM se move horizontalmente para a direita: trajetoria III. Alternativa C.'
$r07 = 'Colisao perfeitamente inelastica: velocidade final = velocidade do CM. |v_cm| = 4*v0*cos(theta)/3 (componente horizontal; componente vertical e zero). Alternativa E.'
$r08 = 'Trabalho = area sob o grafico F*x de 0 a 4 m: triangulo de base 4 m e altura 6 N. W = (1/2)*4*6 = 12 J. Alternativa B.'
$r09 = 'Pelo teorema trabalho-energia, Ec = W acumulado. Em x=2m: area do triangulo de 0 a 2 = (1/2)*2*6 = 6 J. Em x=4m: area total = 12 J. Ec(2m)=6 J e Ec(4m)=12 J. Alternativa E.'
$r10 = 'Equacao de continuidade (fluido incompressivel): A1*v1 = A2*v2. A2 = A1/4 -> v2 = 4*v1. v2/v1 = 4. Alternativa A.'
$r11 = 'I: FALSA (agua se contrai de 0 a 4 grC; nem todos os materiais se expandem). II: VERDADEIRA (ponto de ebulicao depende da pressao). III: VERDADEIRA (calor latente de vaporizacao e a energia por unidade de massa no processo de ebulicao). Apenas II e III. Alternativa D.'
$r12 = 'Gas ideal a temperatura constante: pV = nRT = constante -> p proporcional a 1/V. O grafico p*V e uma hiperbole decrescente. Alternativa A.'
$r13 = 'Diagrama de fases: ponto a e o ponto triplo (pa, Ta). I: p > pa nao permite sublimacao (solido vai direto para liquido) -> verdadeira. II: ponto b no estado liquido pode ser vaporizado por processo isotermico (diminuir P) ou isobarico (aumentar T) -> verdadeira. III: c(L) -> d(S) com mesma pressao (isobarico) e solidificacao -> verdadeira. Todas corretas. Alternativa E.'
$r14 = 'Energia interna do gas ideal depende so da temperatura: mesmos estados i e f -> DeltaU igual nos dois processos. No diagrama P*V, processo I ocorre pelo caminho abaixo (area menor sob a curva) -> WI < WII. Alternativa B.'
$r15 = 'Seis cargas iguais em vertices de hexagono regular. I: por simetria o campo resultante no centro e zero (cargas opostas se cancelam par a par) -> FALSA. II: potencial V = 6kQ/R; trabalho = qV = 6kQq/R -> VERDADEIRA. III: forca sobre carga de prova = qE = 0 -> VERDADEIRA. Apenas II e III. Alternativa D.'
$r16 = 'Tres caminhos em paralelo entre (i) e (ii): superior 2R, medio R, inferior 2R. R_eq: 1/R_eq = 1/(2R) + 1/R + 1/(2R) = 1/R + 1/R = 2/R -> R_eq = R/2. Potencia total: P = V^2/R_eq = V^2/(R/2) = 2V^2/R. Alternativa A.'
$r17 = 'Feixe de eletrons em +z (da esquerda para a direita em direcao a tela). Ima se aproxima por baixo com polo N voltado para cima -> B aponta para cima (+y). F = q(v x B) = (-e)(v*z x B*y) = (-e)(v*B)(-x) = +e*v*B em +x (para a direita = seta 2). Alternativa B.'
$r18 = 'Ima (N a esquerda, S a direita) se move para a esquerda (em direcao ao observador). Espira 1: polo N se aproxima -> fluxo crescente -> corrente induzida cria campo oposto -> corrente horaria (vista pelo observador). Espira 2: polo S se afasta -> fluxo diminui -> corrente induzida mantem fluxo -> corrente anti-horaria. Alternativa C.'
$r19 = 'Imagem I e virtual, ereta e menor que o objeto O. Lente divergente sempre forma imagem virtual, ereta e reduzida. A lente fica a direita da imagem I (imagem virtual de lente divergente se forma entre objeto e lente). Alternativa C.'
$r20 = 'O feixe se aproxima da normal ao mudar de meio -> segundo meio mais denso -> n2 > n1. Velocidade diminui. Frequencia permanece constante. Comprimento de onda lambda = v/f diminui (v cai, f constante). Alternativa D.'
$r21 = 'O padrao de franjas alternadas claras e escuras com intensidade decrescente a partir do centro, causado por um fio de cabelo obstruindo a luz, e resultado do fenomeno de difracao. Alternativa A.'
$r22 = 'I: d1 (264 Hz) tem menor f -> maior periodo T = 1/f -> VERDADEIRA. II: ondas sonoras no ar a mesma temperatura tem mesma velocidade independente da frequencia -> VERDADEIRA. III: d3 (440 Hz) tem maior frequencia -> e o mais agudo, nao o mais grave -> FALSA. Apenas I e II. Alternativa D.'
$r23 = 'Razao de decaimento: 0,625/10 = 1/16 = (1/2)^4 -> 4 meias-vidas decorridas. Idade = 4 * 5730 = 22920 anos. Alternativa E.'
$r24 = 'f = c/lambda = (3*10^8)/(600*10^-9) = 5*10^14 Hz. E = h*f = 6,6*10^-34 * 5*10^14 = 3,3*10^-19 J. Alternativa E.'
$r25 = 'Grafico Ec x f: duas retas paralelas (mesma inclinacao h), com limiares fI (menor) e fII (maior). I: para f > fII, Ec(I) > Ec(II) pois W_I < W_II -> afirmacao I diz o contrario -> FALSA. II: W_II = h*fII > h*fI = W_I -> VERDADEIRA. III: inclinacao das retas = h (Planck) -> VERDADEIRA. Apenas II e III. Alternativa D.'

$ids = @('UFRGS-2017-F-01','UFRGS-2017-F-02','UFRGS-2017-F-03','UFRGS-2017-F-04','UFRGS-2017-F-05',
         'UFRGS-2017-F-06','UFRGS-2017-F-07','UFRGS-2017-F-08','UFRGS-2017-F-09','UFRGS-2017-F-10',
         'UFRGS-2017-F-11','UFRGS-2017-F-12','UFRGS-2017-F-13','UFRGS-2017-F-14','UFRGS-2017-F-15',
         'UFRGS-2017-F-16','UFRGS-2017-F-17','UFRGS-2017-F-18','UFRGS-2017-F-19','UFRGS-2017-F-20',
         'UFRGS-2017-F-21','UFRGS-2017-F-22','UFRGS-2017-F-23','UFRGS-2017-F-24','UFRGS-2017-F-25')

$ress = @($r01,$r02,$r03,$r04,$r05,$r06,$r07,$r08,$r09,$r10,$r11,$r12,$r13,$r14,$r15,
          $r16,$r17,$r18,$r19,$r20,$r21,$r22,$r23,$r24,$r25)

for ($i = 0; $i -lt 25; $i++) {
    $content = Add-Res $content $ids[$i] $ress[$i]
}

[System.IO.File]::WriteAllText($filePath, $content, [System.Text.UTF8Encoding]::new($false))
Write-Output 'Pronto! 25 resolucoes de 2017 inseridas.'
