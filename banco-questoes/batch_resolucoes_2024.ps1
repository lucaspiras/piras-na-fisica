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

$r16 = 'Grafico v(t) a partir do grafico a(t). v = integral de a. Onde a > 0, v cresce; onde a = 0, v e constante; onde a muda de sinal, v tem inflexao. O grafico C representa corretamente a integracao grafica da aceleracao fornecida. Alternativa C.'
$r17 = 'Maquina de Atwood: M > m. Forca resultante sobre o sistema: (M-m)*g. Massa total: M+m. Aceleracao: a = (M-m)*g/(M+m). Alternativa A.'
$r18 = 'Impulso-Momento: I = M*v0 -> v0 = 2/1 = 2 m/s (velocidade logo apos o impulso). No ponto de equilibrio, toda Ec: (1/2)*M*v0^2 = (1/2)*k*A^2. A = v0*sqrt(M/k) = 2*sqrt(1/16) = 2/4 = 1/2 m. Alternativa C.'
$r19 = 'Empuxo: E = P_ar - P_agua = 50 - 30 = 20 N. Volume: V = E/(rho_agua*g) = 20/(1000*10) = 2e-3 m^3 = 2 dm^3. Massa: m = P_ar/g = 50/10 = 5 kg. Densidade: rho = m/V = 5/(2e-3) = 2500 = 2,5*10^3 kg/m^3. Alternativa E.'
$r20 = 'Capacidade calorifica: C = inclinacao do grafico Q(T). Lendo a figura: C_X = 42 J/K, C_Y = 21 J/K. Como as massas sao iguais: razao c_X/c_Y = C_X/C_Y = 42/21 = 2. Alternativa B.'
$r21 = 'Ciclo termodinamico (diagrama P-V): area do ciclo = trabalho liquido = 101,3 J = 1 L*atm. Estado r: pela lei dos gases ideais, Tr = Tp*(Pr*Vr)/(Pp*Vp). Pela geometria do ciclo, Tr = 400 K. Alternativa D.'
$r22 = 'I: energia interna de gas ideal depende apenas de T e n -> VERDADEIRA. II: agua se contrai entre 0 grC e 4 grC (anomalia da agua) -> FALSA. III: maior pressao -> maior temperatura de ebulicao (lei de Clausius-Clapeyron) -> VERDADEIRA. Apenas I e III. Alternativa C.'
$r23 = 'Pulso transversal se movendo para a direita. Ponto 1: esta na frente do pulso (onde o meio ainda vai ser perturbado); ao se aproximar a crista, sobe. Ponto 2: esta na descida traseira do pulso; ao pulso seguir para a direita, o ponto desce. Conforme a figura das alternativas, o par B representa corretamente os movimentos. Alternativa B.'
$r24 = 'Raio entra radialmente na superficie curva -> incide perpendicular -> nao refrata. Atinge a superficie plana do semicilindro. Como o vidro e mais denso que o ar, o raio refratado se afasta da normal ao passar para o ar. O raio refletido (r) atinge a superficie curva de dentro; por simetria, emerge sem desvio. Pela geometria da figura, os raios refratados sao os 3 e 5. Alternativa D.'
$r25 = 'Efeito Doppler. O carro move-se para a direita, passando por O1 (a frente), O2 (ao lado) e O3 (atras). Para O1 (carro se aproxima): f1 > f_emitida. Para O3 (carro se afasta): f3 < f_emitida. Para O2 (ao lado): f2 aprox igual a f_emitida. Ordem crescente: f3 < f2 < f1. Alternativa A.'
$r26 = 'Para duas cargas iguais e opostas (+q e -q) fixas (dipolo), nao existe ponto externo onde a forca resultante sobre uma carga de prova seja nula. Entre as cargas, ambas as forcas apontam no mesmo sentido. Fora (extensao do dipolo), a forca de atracao da carga oposta e sempre maior que a repulsao da carga igual (devido a distancias diferentes). Inexiste tal posicao. Alternativa E.'
$r27 = 'fem induzida = -dPhi/dt. Onde o fluxo e constante (dPhi/dt = 0): fem = 0. Onde o fluxo varia linearmente: fem = constante. O grafico D representa a derivada temporal negativa do fluxo magnetico dado. Alternativa D.'
$r28 = 'Usando F = q*(v x B). Particula 1 (q neg, v=+z, B=-y): v x B = z x (-y) = -(-x) = +x; F = (-e)*(+x) = -x -> forca em -x. Particula 2 (q pos, F dada, B dado): resolvendo v x B para a forca dada, v = -x. Particula 3 (q neg, B=-x, F=+z): v x (-x) deve dar -z; experimentando v = -y: (-y) x (-x) = y x x = -z; F = (-e)*(-z) = +z -> VERDADEIRO. v = -y. Alternativa A.'
$r29 = 'E = m*c^2 -> m = L/c^2, onde L = luminosidade = 3,8e26 W. m_por_segundo = 3,8e26/(3e8)^2 = 3,8e26/9e16 = 4,2e9 kg/s. Em um dia: m_dia = 4,2e9 * 86400 = 3,6e14 kg. Alternativa B.'
$r30 = 'I: energia do eletron emitido = hf - W (funcao trabalho); depende da frequencia f, nao da intensidade -> VERDADEIRA. II: foton tem massa de repouso zero; sua energia E=hf nao representa massa real -> FALSA. III: foton e emitido quando eletron transita de nivel mais energetico para menos energetico -> VERDADEIRA. Apenas I e III. Alternativa C.'

$ids = @('UFRGS-2024-F-16','UFRGS-2024-F-17','UFRGS-2024-F-18','UFRGS-2024-F-19','UFRGS-2024-F-20',
         'UFRGS-2024-F-21','UFRGS-2024-F-22','UFRGS-2024-F-23','UFRGS-2024-F-24','UFRGS-2024-F-25',
         'UFRGS-2024-F-26','UFRGS-2024-F-27','UFRGS-2024-F-28','UFRGS-2024-F-29','UFRGS-2024-F-30')

$ress = @($r16,$r17,$r18,$r19,$r20,$r21,$r22,$r23,$r24,$r25,$r26,$r27,$r28,$r29,$r30)

for ($i = 0; $i -lt 15; $i++) {
    $content = Add-Res $content $ids[$i] $ress[$i]
}

[System.IO.File]::WriteAllText($filePath, $content, [System.Text.UTF8Encoding]::new($false))
Write-Output 'Pronto! 15 resolucoes de 2024 inseridas.'
