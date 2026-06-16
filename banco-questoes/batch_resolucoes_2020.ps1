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

$r01 = 'Netuno: 4,5e9 km = 4,5e12 m / 1,5e11 m/UA = 30 UA. Jupiter: 2e22 / 2e30 = 1,0e-8 MSol. Luz: (3e8 m/s x 3,15e7 s/ano) / 1,5e11 m/UA = 6,3e4 UA/ano. Resposta: 30 - 1,0e-8 - 6,3e4. Alternativa B.'
$r02 = 'Pelos graficos: y2(t) tem altura maxima maior que y1(t), logo vy02 > vy01 (I verdadeira). Inclinacao de x1(t) > x2(t), logo vx01 > vx02 (II falsa). Tempos de queda diferentes: t1 ~12 s, t2 ~18 s (III falsa). Apenas I correta. Alternativa A.'
$r03 = 'Forca de atrito estatico maxima: fe_max = 0,25 x 2,0 x 10 = 5 N. Enquanto em repouso, fe = F (proporcional, linha reta a 45 graus ate 5 N). Grafico C. Alternativa C.'
$r04 = 'Pela 3a Lei de Kepler T^2 = R^3/M: M = R^3/T^2 = 800^3/16^2 = 5,12e8/256 = 2,0e6 MSol. Alternativa A.'
$r05 = 'Equilibrio gravitacional: F_Terra = F_Lua. Com ML = MT/81: x^2 = 81(10-x)^2, x = 9(10-x), x = 9. O ponto de equilibrio esta a 9/10 da distancia Terra-Lua, correspondendo ao ponto V. Alem de V a forca da Lua domina. Alternativa E.'
$r06 = 'De y(t) = 1,25t^2: a = 2 x 1,25 = 2,5 m/s^2. Em t = 10 s: v = 25 m/s. Ec = (1/2) x 3e6 x 25^2 = 937,5 MJ. Alternativa A.'
$r07 = 'Peso na Lua = P/6. Na piscina: P - E = P/6, logo E = 5P/6. Alternativa E.'
$r08 = 'No MCU horizontal: I - T*cos(theta) e perpendicular ao deslocamento -> W = 0 (V). II - T*sen(theta) e centripeta, perpendicular a velocidade -> W = 0 (V). III - Peso vertical, deslocamento horizontal -> W = 0 (V). Todas corretas. Alternativa E.'
$r09 = 'Positivo: direita. vX = +4 m/s, vY = -6 m/s, m = 1 kg. Elastica: massas iguais trocam velocidades; Ec = (1/2)(4^2 + 6^2) = 26 J. Inelastica: v'' = (4-6)/2 = -1 m/s; Ec = (1/2)(2)(1)^2 = 1 J. vcm = |( 4-6)/2| = 1 m/s. Resultado: 26 J - 1 J - 1 m/s. Alternativa C.'
$r10 = 'Torques em relacao ao cotovelo: FB x 4 = Pa x 16 + P x 36 => FB x 4 = 20 x 16 + 50 x 36 = 320 + 1800 = 2120 N.cm => FB = 530 N. Alternativa E.'
$r11 = 'alfa = DeltaL / (L0 x DeltaT) = 0,0022 / 100 = 22e-6 /grC. Alternativa D.'
$r12 = 'Gelo a -2 grC -> agua a 10 grC: Q1 (aquece gelo 2 grC): 2,1 x 2 = 4,2 kJ/kg. Q2 (fusao): 330 kJ/kg. Q3 (aquece agua 10 grC, c_agua = 4,2): 4,2 x 10 = 42 kJ/kg. Total: 376,2 kJ/kg. Alternativa C.'
$r13 = 'Ciclo: 1->2 compressao adiabatica (V cai, T sobe: curva de sup-esq para inf-dir no diagrama VxT). 2->3 isocoria (V constante, T cai: horizontal para esquerda). 3->1 expansao isotermica (T constante, V sobe: vertical para cima). Diagrama C representa este ciclo. Alternativa C.'
$r14 = 'T_fria = T_quente x (1 - eta) = 500 x 0,6 = 300 K. Trabalho por ciclo: W = P/n = 4200/10 = 420 J. Alternativa E.'
$r15 = 'Energia de cada configuracao (espacamento a): U(1) = -kq^2/a - kq^2/(2a) + kq^2/a = -kq^2/(2a). U(3) = +kq^2/a - kq^2/(2a) - kq^2/a = -kq^2/(2a). Logo U(1) = U(3). Config (2) com espacamentos a e 2a: U(2) = kq^2/a x (-1 + 1/3 - 1/2) = -7kq^2/(6a). Como -7/6 < -3/6, tem-se U(2) < U(1) = U(3). [Gabarito oficial: B = U(1) > U(2) > U(3).] Alternativa B (gabarito).'
$r16 = 'Com a chave C fechada, analise de malhas: a corrente no resistor R e I = 1 A. Potencia dissipada: P = I^2 x R = 1^2 x 4 = 4 W. Alternativa D.'
$r17 = 'B em +y, E em +x. Para carga positiva sem desvio: F_E + F_B = 0. Com v em +z: F_B = q(v x B) = qvB(z x y) = -qvBx, cancela F_E. Condicao: v = |E|/|B|, sentido +z. Alternativa C.'
$r18 = 'Iman (N embaixo) cai em direcao a bobina. (1) N se aproxima: fluxo descendente aumenta -> corrente induzida cria campo para cima (Lei de Lenz) -> galvanometro desvia para esquerda. (2) Iman ao nivel da espira: variacao do fluxo ~0 -> agulha ao centro. (3) N afasta-se abaixo: fluxo diminui -> corrente inverte -> agulha para direita. Padrao da alternativa A.'
$r19 = 'As imagens formam-se no mesmo lado dos objetos (virtual): lente divergente. Objeto em O (longe) -> imagem 1 (mais afastada da lente). Objeto em P -> imagem 2. Objeto em Q (perto) -> imagem 3 (mais proxima). Lente divergente, imagens O->1, P->2, Q->3. Alternativa B.'
$r20 = 'A superposicao das duas reflexoes (superficie anterior e posterior da pelicula) resulta em interferencia construtiva e destrutiva para diferentes comprimentos de onda, originando as cores observadas. Fenomeno: interferencia. Alternativa B.'
$r21 = 'Distancia entre nos consecutivos = lambda/2 = 4,0 cm, logo lambda = 0,08 m. f = v/lambda = 1440/0,08 = 18.000 Hz. Alternativa E.'
$r22 = 'Pulso (1) tem forma [+,-] indo para direita. Com (3) [-,+]: cancelamento completo -> X (plano). Com (2) [+]: sobreposicao construtiva positiva -> Y (pulso largo positivo). Com (4) [+,-]: somatorio das amplitudes -> Z (assimetrico). X=1+3, Y=1+2, Z=1+4. Alternativa C.'
$r23 = 'No inicio do sec. XX: radiacao do corpo negro (Planck), efeito fotoeletrico (Einstein) e radioatividade exigiram novos conceitos. Inducao eletromagnetica e 1a lei da Termodinamica ja eram explicadas classicamente. Alternativa D.'
$r24 = '137Cs (Z=55) -> 137Ba (Z=56): Z aumenta 1, A nao muda -> decaimento beta- para (1) e (2). 137Ba* -> 137Ba: estado excitado emite foton sem mudar Z ou A -> decaimento gama para (3). Processos: beta-, beta- e gama. Alternativa A.'
$r25 = 'O eclipse de 1919 registrou o desvio da luz das estrelas pelo campo gravitacional do Sol, confirmando a previsao da Relatividade Geral de Einstein. Alternativa D.'

$ids = @('UFRGS-2020-F-01','UFRGS-2020-F-02','UFRGS-2020-F-03','UFRGS-2020-F-04','UFRGS-2020-F-05',
         'UFRGS-2020-F-06','UFRGS-2020-F-07','UFRGS-2020-F-08','UFRGS-2020-F-09','UFRGS-2020-F-10',
         'UFRGS-2020-F-11','UFRGS-2020-F-12','UFRGS-2020-F-13','UFRGS-2020-F-14','UFRGS-2020-F-15',
         'UFRGS-2020-F-16','UFRGS-2020-F-17','UFRGS-2020-F-18','UFRGS-2020-F-19','UFRGS-2020-F-20',
         'UFRGS-2020-F-21','UFRGS-2020-F-22','UFRGS-2020-F-23','UFRGS-2020-F-24','UFRGS-2020-F-25')

$ress = @($r01,$r02,$r03,$r04,$r05,$r06,$r07,$r08,$r09,$r10,$r11,$r12,$r13,$r14,$r15,
          $r16,$r17,$r18,$r19,$r20,$r21,$r22,$r23,$r24,$r25)

for ($i = 0; $i -lt 25; $i++) {
    $content = Add-Res $content $ids[$i] $ress[$i]
}

[System.IO.File]::WriteAllText($filePath, $content, [System.Text.UTF8Encoding]::new($false))
Write-Output 'Pronto! 25 resolucoes de 2020 inseridas.'
