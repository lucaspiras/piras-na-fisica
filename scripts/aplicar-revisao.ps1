# Poe o site em acordo com scripts/revisao-textos.json.
#
# Cada texto de conteudos/ tem um estado no manifesto:
#
#   revisado    no ar, ja conferido
#   a-conferir  no ar, ainda nao conferido (fila da proxima leva)
#   em-revisao  fora do ar
#
# Um texto "em-revisao" tem o arquivo real renomeado para _<nome>.html, que o
# GitHub Pages nao publica (o Jekyll ignora entradas comecadas por _), e a URL
# publica passa a servir um talao de aviso. Nada e' apagado: o arquivo continua
# versionado e no mesmo diretorio, entao os caminhos relativos das folhas de
# estilo seguem valendo e a revisao local funciona sem ajuste.
#
# O script e' idempotente: rodar duas vezes seguidas nao muda nada.
#
#   powershell -File scripts\aplicar-revisao.ps1 -Simular   # so mostra o que faria
#   powershell -File scripts\aplicar-revisao.ps1
#   powershell -File scripts\gerar-sitemap.ps1              # sempre depois

param([switch]$Simular)

$ErrorActionPreference = 'Stop'
$raiz      = Split-Path -Parent $PSScriptRoot
$manifesto = Join-Path $PSScriptRoot 'revisao-textos.json'
# Nome comprido de proposito: nome de variavel em PowerShell nao distingue
# maiuscula de minuscula, e um $SELO aqui seria a mesma variavel que o $selo
# usado adiante para montar o rotulo do card.
$TEXTO_SELO = 'em revisão'
$MARCA     = '<!-- Gerado por scripts/aplicar-revisao.ps1. Nao editar a mao. -->'
$utf8      = New-Object System.Text.UTF8Encoding($false)

function Get-Texto([string]$caminho) {
  [System.IO.File]::ReadAllText($caminho, $utf8)
}

function Set-Texto([string]$caminho, [string]$texto) {
  if ($Simular) { return }
  [System.IO.File]::WriteAllText($caminho, $texto, $utf8)
}

# Renomeia preservando o historico. Se o arquivo nao estiver sob controle de
# versao, o git mv falha e a movimentacao comum resolve. O destino e' conferido
# depois: mover errado aqui significaria gravar o talao por cima do texto real.
function Move-Arquivo([string]$de, [string]$para) {
  if ($Simular) { return }
  $anterior = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  & git -C $raiz mv -- $de $para | Out-Null
  $ok = ($LASTEXITCODE -eq 0)
  $ErrorActionPreference = $anterior
  if (-not $ok) {
    Move-Item -LiteralPath (Join-Path $raiz $de) -Destination (Join-Path $raiz $para) -Force
  }
  if (-not (Test-Path (Join-Path $raiz $para))) { throw "falha ao mover $de para $para" }
}

# ── Troca da forma do item no hub ──────────────────────────────────────────
# Os hubs nao tem marcacao uniforme: uns trazem o <li> inteiro numa linha,
# outros indentado em varias. Por isso a troca e' estrutural (abertura, seta e
# fechamento), e nao a remontagem do bloco: assim o espacamento original de
# cada hub fica intacto e o diff mostra so o que mudou de fato.

function ConvertTo-Espera([string]$bloco, [string]$slug) {
  $b = [regex]::Replace($bloco,
        '<a href="' + [regex]::Escape($slug) + '\.html" class="sub-link">',
        '<div class="sub-link sub-espera" data-sub="' + $slug + '">')
  $b = [regex]::Replace($b, '<span class="sub-arrow">.*?</span>',
        '<span class="sub-selo">' + $TEXTO_SELO + '</span>', 'Singleline')
  $i = $b.LastIndexOf('</a>')
  $b.Remove($i, 4).Insert($i, '</div>')
}

function ConvertTo-Link([string]$bloco, [string]$slug) {
  $b = [regex]::Replace($bloco,
        '<div class="sub-link sub-espera" data-sub="' + [regex]::Escape($slug) + '">',
        '<a href="' + $slug + '.html" class="sub-link">')
  $b = [regex]::Replace($b, '<span class="sub-selo">.*?</span>',
        '<span class="sub-arrow">→</span>', 'Singleline')
  $i = $b.LastIndexOf('</div>')
  $b.Remove($i, 6).Insert($i, '</a>')
}

# Acha o <li> de um subtopico no hub, na forma que estiver. Devolve $null se
# nao achar. Fora do ar o bloco fecha em </div></li>, e o </div> da sub-info
# nunca e' seguido de </li>, entao a busca nao-gulosa para no lugar certo.
function Find-Bloco([string]$html, [string]$slug) {
  $esc = [regex]::Escape($slug)
  $m = [regex]::Match($html, '<li>\s*<a href="' + $esc + '\.html" class="sub-link">.*?</a>\s*</li>', 'Singleline')
  if ($m.Success) { return $m }
  $m = [regex]::Match($html, '<li>\s*<div class="sub-link sub-espera" data-sub="' + $esc + '">.*?</div>\s*</li>', 'Singleline')
  if ($m.Success) { return $m }
  return $null
}

# ── Talao que ocupa a URL publica enquanto o texto esta fora do ar ──────────
$MOLDE_TALAO = @'
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="32x32" href="/img/icons/favicon-32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/img/icons/favicon-16.png">
  <link rel="apple-touch-icon" href="/img/icons/apple-touch-icon.png">
  <script src="/js/theme.js"></script>
  <meta name="robots" content="noindex">
  <title>{TITULO} · em revisão | Piras na Física</title>
  <link rel="stylesheet" href="../../css/style.css">
</head>
<body>

{MARCA}

<div id="header"></div>
<script src="../../js/include.js"></script>

<main class="pagina-revisao">
  <span class="revisao-icone">✏️</span>
  <p class="revisao-tema">{TEMA}</p>
  <h1>{TITULO}</h1>

  <div class="revisao-texto">
    <p>Este texto está fora do ar porque ainda não passou pela revisão humana:
      a conferência da física, a correção da escrita e o ajuste das explicações.
      Ele volta assim que essa leitura estiver feita.</p>
    <p>O que continua publicado no site é o que já foi conferido.</p>
  </div>

  <div class="revisao-links">
    <a href="index.html">Textos de {TEMA}</a>
    <a href="/conteudos.html">Todos os conteúdos</a>
    <a href="/sobre.html">Por que isto acontece</a>
  </div>
</main>

<footer></footer>

</body>
</html>
'@

# ── Leitura do manifesto ───────────────────────────────────────────────────
$dados   = ConvertFrom-Json (Get-Texto $manifesto)
$temas   = @($dados.PSObject.Properties | Where-Object { -not $_.Name.StartsWith('_') } | ForEach-Object { $_.Name })
$VALIDOS = @('revisado', 'a-conferir', 'em-revisao')

$itens    = @()   # cada texto, com estado do manifesto e dados vindos do hub
$nomeTema = @{}   # tema -> nome de exibicao, lido de conteudos.html
$erros    = @()

# ── Nome de exibicao de cada tema, tirado do card em conteudos.html ─────────
$caminhoIndice = Join-Path $raiz 'conteudos.html'
$htmlIndice    = Get-Texto $caminhoIndice
foreach ($t in $temas) {
  $m = [regex]::Match($htmlIndice,
    '<a href="conteudos/' + [regex]::Escape($t) + '/index\.html" class="conteudo-card">(?<corpo>.*?)</a>',
    'Singleline')
  if (-not $m.Success) { $erros += "conteudos.html nao tem o card do tema '$t'"; continue }
  $h3 = [regex]::Match($m.Groups['corpo'].Value, '<h3>(?<t>.*?)</h3>', 'Singleline')
  if (-not $h3.Success) { $erros += "o card de '$t' em conteudos.html nao tem <h3>"; continue }
  $nomeTema[$t] = $h3.Groups['t'].Value.Trim()
}

# ── Cada texto: estado no manifesto, marcacao no hub, arquivo no disco ──────
foreach ($t in $temas) {
  $hub = Join-Path $raiz "conteudos\$t\index.html"
  if (-not (Test-Path $hub)) { $erros += "hub inexistente: conteudos/$t/index.html"; continue }
  $htmlHub = Get-Texto $hub

  foreach ($prop in $dados.$t.PSObject.Properties) {
    $slug   = $prop.Name
    $estado = $prop.Value
    $ref    = "$t/$slug"

    if ($VALIDOS -notcontains $estado) {
      $erros += "$ref tem estado '$estado'; use " + ($VALIDOS -join ', ')
      continue
    }

    $bloco = Find-Bloco $htmlHub $slug
    if ($null -eq $bloco) { $erros += "$ref nao aparece na lista de conteudos/$t/index.html"; continue }

    $titulo = [regex]::Match($bloco.Value, '<h3>(?<v>.*?)</h3>', 'Singleline').Groups['v'].Value.Trim()
    if (-not $titulo) { $erros += "$ref nao tem titulo (<h3>) no hub"; continue }

    $publico = Join-Path $raiz "conteudos\$t\$slug.html"
    $oculto  = Join-Path $raiz "conteudos\$t\_$slug.html"
    $temPub  = Test-Path $publico
    $temOcu  = Test-Path $oculto

    if (-not $temPub -and -not $temOcu) { $erros += "$ref nao existe no disco"; continue }
    if ($temPub -and $temOcu) {
      # so e' aceitavel se o publico for o talao gerado por este script
      if ((Get-Texto $publico) -notmatch [regex]::Escape($MARCA)) {
        $erros += "$ref tem dois arquivos reais ($slug.html e _$slug.html); resolva a mao"
        continue
      }
    }

    $itens += [pscustomobject]@{
      Tema    = $t
      Slug    = $slug
      Estado  = $estado
      Titulo  = $titulo
      NoAr    = (-not $temOcu)
      Publico = $publico
    }
  }
}

if ($erros.Count -gt 0) {
  Write-Output 'O manifesto e o site nao batem. Nada foi alterado:'
  $erros | ForEach-Object { Write-Output "  - $_" }
  exit 1
}

# ── Disco: renomeia e grava (ou apaga) o talao ─────────────────────────────
$acoes = @()

foreach ($i in $itens) {
  $foraDoAr = ($i.Estado -eq 'em-revisao')

  if ($foraDoAr -and $i.NoAr) {
    Move-Arquivo "conteudos/$($i.Tema)/$($i.Slug).html" "conteudos/$($i.Tema)/_$($i.Slug).html"
    $acoes += "sai do ar   $($i.Tema)/$($i.Slug)"
  }
  elseif ((-not $foraDoAr) -and (-not $i.NoAr)) {
    if ((Test-Path $i.Publico) -and (-not $Simular)) { Remove-Item -LiteralPath $i.Publico -Force }
    Move-Arquivo "conteudos/$($i.Tema)/_$($i.Slug).html" "conteudos/$($i.Tema)/$($i.Slug).html"
    $acoes += "volta ao ar $($i.Tema)/$($i.Slug)"
  }

  if ($foraDoAr) {
    $talao = $MOLDE_TALAO.Replace('{TITULO}', $i.Titulo).Replace('{TEMA}', $nomeTema[$i.Tema]).Replace('{MARCA}', $MARCA)
    $atual = ''
    if ((-not $i.NoAr) -and (Test-Path $i.Publico)) { $atual = Get-Texto $i.Publico }
    if ($atual -ne $talao) { Set-Texto $i.Publico $talao }
  }
}

# ── Hubs: cada item vira link ou item desativado ───────────────────────────
foreach ($t in $temas) {
  $hub     = Join-Path $raiz "conteudos\$t\index.html"
  $htmlHub = Get-Texto $hub
  $antes   = $htmlHub

  foreach ($i in @($itens | Where-Object { $_.Tema -eq $t })) {
    $bloco = Find-Bloco $htmlHub $i.Slug
    if ($null -eq $bloco) { continue }

    $forma = 'link'
    if ($bloco.Value -match 'class="sub-link sub-espera"') { $forma = 'espera' }
    $alvo = 'link'
    if ($i.Estado -eq 'em-revisao') { $alvo = 'espera' }
    if ($forma -eq $alvo) { continue }   # ja esta como deve; nao mexer na formatacao

    if ($alvo -eq 'espera') { $novo = ConvertTo-Espera $bloco.Value $i.Slug }
    else                    { $novo = ConvertTo-Link   $bloco.Value $i.Slug }

    # Remove/Insert em vez de [regex]::Replace: o texto de substituicao e' HTML
    # cru e nao deve passar pela expansao de $1, $& e afins.
    $htmlHub = $htmlHub.Remove($bloco.Index, $bloco.Length).Insert($bloco.Index, $novo)
  }

  if ($htmlHub -ne $antes) { Set-Texto $hub $htmlHub }
}

# ── conteudos.html: selo do card de cada tema ──────────────────────────────
$antesIndice = $htmlIndice
foreach ($t in $temas) {
  $doTema = @($itens | Where-Object { $_.Tema -eq $t })
  $total  = $doTema.Count
  $noAr   = @($doTema | Where-Object { $_.Estado -ne 'em-revisao' }).Count

  if     ($noAr -eq $total) { $selo = '' }
  elseif ($noAr -eq 0)      { $selo = $TEXTO_SELO }
  else                      { $selo = "$noAr de $total textos revisados" }

  $m = [regex]::Match($htmlIndice,
    '(?<abre><a href="conteudos/' + [regex]::Escape($t) + '/index\.html" class="conteudo-card">)(?<corpo>.*?)(?<fecha></a>)',
    'Singleline')
  $corpo = [regex]::Replace($m.Groups['corpo'].Value, '\s*<span class="card-selo">.*?</span>', '', 'Singleline')
  if ($selo) {
    $corpo = $corpo.TrimEnd() + "`n      <span class=`"card-selo`">$selo</span>`n    "
  }
  $novoCard = $m.Groups['abre'].Value + $corpo + $m.Groups['fecha'].Value
  if ($m.Value -ne $novoCard) {
    $htmlIndice = $htmlIndice.Remove($m.Index, $m.Length).Insert($m.Index, $novoCard)
  }
}
if ($htmlIndice -ne $antesIndice) { Set-Texto $caminhoIndice $htmlIndice }

# ── _em-revisao.html: fila de revisao, so para uso local ───────────────────
$fora = @($itens | Where-Object { $_.Estado -eq 'em-revisao' })
$fila = @($itens | Where-Object { $_.Estado -eq 'a-conferir' })

$linhas = @()
foreach ($t in $temas) {
  $doTema = @($fora | Where-Object { $_.Tema -eq $t })
  if ($doTema.Count -eq 0) { continue }
  $linhas += "  <h2>$($nomeTema[$t]) <small>$($doTema.Count) fora do ar</small></h2>"
  $linhas += '  <ul>'
  foreach ($i in $doTema) {
    $linhas += "    <li><a href=`"conteudos/$($i.Tema)/_$($i.Slug).html`">$($i.Titulo)</a><code>$($i.Tema)/$($i.Slug)</code></li>"
  }
  $linhas += '  </ul>'
}
foreach ($t in $temas) {
  $doTema = @($fila | Where-Object { $_.Tema -eq $t })
  if ($doTema.Count -eq 0) { continue }
  $linhas += "  <h2 class=`"fila`">$($nomeTema[$t]) <small>no ar, ainda a conferir</small></h2>"
  $linhas += '  <ul>'
  foreach ($i in $doTema) {
    $linhas += "    <li><a href=`"conteudos/$($i.Tema)/$($i.Slug).html`">$($i.Titulo)</a><code>$($i.Tema)/$($i.Slug)</code></li>"
  }
  $linhas += '  </ul>'
}

$paginaFila = @"
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex">
<title>Fila de revisão</title>
$MARCA
<style>
  body { font-family: system-ui, sans-serif; max-width: 820px; margin: 0 auto; padding: 2rem 1.5rem 4rem; line-height: 1.6; color: #1f2933; }
  h1 { margin-bottom: .2rem; }
  p.sub { color: #5b6573; margin-top: 0; font-size: .92rem; }
  h2 { margin: 2rem 0 .5rem; font-size: 1.05rem; border-bottom: 1px solid #ddd; padding-bottom: .3rem; }
  h2.fila { color: #a16207; }
  h2 small { font-weight: 400; color: #8a94a2; font-size: .78rem; }
  ul { list-style: none; padding: 0; margin: 0; }
  li { padding: .3rem 0; }
  code { color: #8a94a2; font-size: .78rem; margin-left: .5rem; }
</style>
</head>
<body>
<h1>Fila de revisão</h1>
<p class="sub">Página local: o nome começa com <code>_</code>, então o GitHub Pages não a
publica. O estado vem de <code>scripts/revisao-textos.json</code>. Depois de revisar um
texto, troque <code>em-revisao</code> por <code>revisado</code> ali e rode
<code>scripts\aplicar-revisao.ps1</code> seguido de <code>scripts\gerar-sitemap.ps1</code>.</p>

$($linhas -join "`n")

</body>
</html>
"@
Set-Texto (Join-Path $raiz '_em-revisao.html') $paginaFila

# ── Conferencia: o hub tem de ter exatamente os links que o manifesto diz ───
$divergencias = @()
if (-not $Simular) {
  foreach ($t in $temas) {
    $htmlHub = Get-Texto (Join-Path $raiz "conteudos\$t\index.html")
    $espera  = ([regex]::Matches($htmlHub, 'class="sub-link sub-espera"')).Count
    $links   = ([regex]::Matches($htmlHub, 'class="sub-link"')).Count
    $doTema  = @($itens | Where-Object { $_.Tema -eq $t })
    $devFora = @($doTema | Where-Object { $_.Estado -eq 'em-revisao' }).Count
    $devNoAr = $doTema.Count - $devFora
    if ($links -ne $devNoAr -or $espera -ne $devFora) {
      $divergencias += "$t : hub com $links links e $espera desativados; manifesto pede $devNoAr e $devFora"
    }
  }
}

# ── Resumo ─────────────────────────────────────────────────────────────────
Write-Output ''
if ($Simular) { Write-Output '(simulacao: nada foi gravado)'; Write-Output '' }

$fmt = '{0,-18} {1,4} {2,9} {3,11} {4,11}'
Write-Output ($fmt -f 'tema', 'tot', 'revisado', 'a-conferir', 'em-revisao')
Write-Output ('-' * 58)
foreach ($t in $temas) {
  $d = @($itens | Where-Object { $_.Tema -eq $t })
  Write-Output ($fmt -f $t, $d.Count,
    @($d | Where-Object { $_.Estado -eq 'revisado'   }).Count,
    @($d | Where-Object { $_.Estado -eq 'a-conferir' }).Count,
    @($d | Where-Object { $_.Estado -eq 'em-revisao' }).Count)
}
Write-Output ('-' * 58)
Write-Output ($fmt -f 'total', $itens.Count,
  @($itens | Where-Object { $_.Estado -eq 'revisado'   }).Count,
  $fila.Count, $fora.Count)

if ($acoes.Count -gt 0) {
  Write-Output ''
  $acoes | Sort-Object | ForEach-Object { Write-Output "  $_" }
}

if ($divergencias.Count -gt 0) {
  Write-Output ''
  Write-Output 'CONFERENCIA FALHOU:'
  $divergencias | ForEach-Object { Write-Output "  - $_" }
  exit 1
}

Write-Output ''
Write-Output "$($fora.Count) textos fora do ar. Fila em _em-revisao.html."
if (-not $Simular) { Write-Output 'Rode agora: powershell -File scripts\gerar-sitemap.ps1' }
