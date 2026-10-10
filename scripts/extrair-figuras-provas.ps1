# extrair-figuras-provas.ps1
# Terceiro irmao de extrair-figuras-eds.ps1 e extrair-figuras-paginas.ps1, agora para
# as figuras que nascem numa PROVA ou no seu gabarito. Gera .svg avulsos e
# autossuficientes em img/animacoes/<assunto>/, prontos para slide, outra prova ou
# outro site. Rodar da raiz do projeto:
#
#     powershell -File scripts\extrair-figuras-provas.ps1
#
# Cada figura declara um PERFIL, que diz de onde vem a cor:
#
#   enunciado -> figura da prova impressa. E' tinta preta em atributo, de proposito:
#                a prova vai para o papel, e cor ali nao ajuda nem imprime bem. O
#                arquivo avulso sai igual, sem tema escuro, e o catalogo avisa.
#   resposta  -> figura do gabarito. Usa o sistema de cor do site (--fig-*, classes
#                .fig-*), que o gabarito carrega no bloco "=== CORES DAS FIGURAS ==="
#                do proprio <style>. O script copia esse bloco para dentro de cada
#                .svg, porque o arquivo avulso e' um documento a parte e nao enxerga o
#                CSS da pagina; com ele vem o modo escuro.
#
# O manifesto nao fica aqui: ele e' scripts\figuras-provas.json, escrito junto com a
# marcacao data-avulso nos HTML. Assim a lista de figuras e os nomes dos arquivos tem
# uma fonte so.
#
# Ao final, confere que a assinatura de elementos do desenho gerado e' igual a do
# inline. Divergiu, falha: e' o que impede a copia publicada de se afastar da que esta
# na prova.

$ErrorActionPreference = 'Stop'

$Raiz = Split-Path -Parent $PSScriptRoot
$Manifesto = Join-Path $PSScriptRoot 'figuras-provas.json'
$Destino = Join-Path $Raiz 'img\animacoes'

if (-not (Test-Path $Manifesto)) {
  throw "nao achei o manifesto $Manifesto"
}
$Figuras = Get-Content $Manifesto -Raw -Encoding UTF8 | ConvertFrom-Json

# ----------------------------------------------------------------------------
# O bloco de cor do gabarito, copiado uma vez e reaproveitado em toda figura de
# resposta.
# ----------------------------------------------------------------------------
function Get-BlocoDeCor([string]$caminhoHtml) {
  $html = Get-Content $caminhoHtml -Raw -Encoding UTF8
  $ini = $html.IndexOf('/* === CORES DAS FIGURAS === */')
  $fim = $html.IndexOf('/* === FIM DAS CORES DAS FIGURAS === */')
  if ($ini -lt 0 -or $fim -lt 0) { return $null }
  return $html.Substring($ini, $fim - $ini + '/* === FIM DAS CORES DAS FIGURAS === */'.Length)
}

function Get-Svg([string]$html, [string]$slug) {
  # acha o <svg ...data-avulso="slug"...> e o seu </svg>
  $marca = 'data-avulso="' + $slug + '"'
  $i = $html.IndexOf($marca)
  if ($i -lt 0) { return $null }
  $ini = $html.LastIndexOf('<svg', $i)
  $fim = $html.IndexOf('</svg>', $i)
  if ($ini -lt 0 -or $fim -lt 0) { return $null }
  return $html.Substring($ini, $fim + 6 - $ini)
}

function Get-Assinatura([string]$svg) {
  # a sequencia de nomes de elemento, que nao pode mudar da copia para o original
  ([regex]::Matches($svg, '<([a-zA-Z][\w-]*)') | ForEach-Object { $_.Groups[1].Value }) -join ','
}

$feitas = 0
$avisos = @()

foreach ($fig in $Figuras) {
  $html = Get-Content (Join-Path $Raiz $fig.html) -Raw -Encoding UTF8
  $svg = Get-Svg $html $fig.slug
  if (-not $svg) { throw "nao achei a figura $($fig.slug) em $($fig.html)" }

  $perfil = if ($fig.html -like 'gabarito*' -or $fig.html -like '*gabarito*') { 'resposta' } else { 'enunciado' }

  # viewBox -> width/height do arquivo avulso, ao dobro, como no resto do catalogo
  $m = [regex]::Match($svg, 'viewBox="0 0 ([\d.]+) ([\d.]+)"')
  if (-not $m.Success) { throw "figura $($fig.slug) sem viewBox" }
  $w = [double]$m.Groups[1].Value
  $h = [double]$m.Groups[2].Value

  $id = ($fig.slug -replace '/', '-')
  $titulo = $fig.resumo

  # corpo: o que esta ENTRE a abertura e o fecho. O fecho sai fora, senao o arquivo
  # gerado fica com dois </svg> e deixa de ser XML valido.
  $corpo = $svg.Substring($svg.IndexOf('>') + 1)
  if ($corpo.EndsWith('</svg>')) { $corpo = $corpo.Substring(0, $corpo.Length - 6) }
  $corpo = $corpo -replace '\s*data-avulso="[^"]*"', ''

  $estilo = ''
  if ($perfil -eq 'resposta') {
    $bloco = Get-BlocoDeCor (Join-Path $Raiz $fig.html)
    if (-not $bloco) { throw "nao achei o bloco de cores em $($fig.html)" }
    $estilo = "  <style><![CDATA[`n" + $bloco + "`n  ]]></style>`n"
  }

  # DOIS HIFENS SEGUIDOS SAO PROIBIDOS DENTRO DE COMENTARIO XML, e foi assim que a
  # primeira versao gerou dezessete arquivos que nenhum navegador abria: a nota dizia
  # "sistema (--fig-*)" e o documento inteiro deixava de ser XML valido.
  $nota = if ($perfil -eq 'resposta') {
    "     Cor pelo sistema de variaveis fig-* do site, com o modo escuro junto."
  } else {
    "     Tinta preta: a figura nasceu numa prova impressa e nao tem tema escuro."
  }

  $saida = @"
<?xml version="1.0" encoding="UTF-8"?>
<!-- $titulo
     Autossuficiente: pode ser aberto direto no navegador, usado em <img src>,
     inserido em slide ou importado em editor vetorial.
$nota
     Fonte da geometria: $($fig.html -replace '\\','/')
     Gerado por scripts/extrair-figuras-provas.ps1 - nao editar a mao. -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 $w $h" width="$([int]($w*2))" height="$([int]($h*2))"
     role="img" aria-labelledby="$id">
  <title id="$id">$titulo</title>
$estilo$corpo
</svg>
"@

  $arquivo = Join-Path $Destino ($fig.slug -replace '/', '\')
  $arquivo = "$arquivo.svg"
  $pasta = Split-Path -Parent $arquivo
  if (-not (Test-Path $pasta)) { New-Item -ItemType Directory -Path $pasta -Force | Out-Null }
  Set-Content -Path $arquivo -Value $saida -Encoding UTF8 -NoNewline

  # conferencia: a assinatura do desenho tem de bater com a do inline
  $gerado = Get-Content $arquivo -Raw -Encoding UTF8
  $corpoGerado = $gerado.Substring($gerado.IndexOf('</title>') + 8)
  if ($perfil -eq 'resposta') {
    $corpoGerado = $corpoGerado.Substring($corpoGerado.IndexOf(']]></style>') + 11)
  }
  $a = Get-Assinatura $corpo
  $b = Get-Assinatura $corpoGerado
  if ($a -ne $b) {
    $avisos += "$($fig.slug): a assinatura do desenho mudou na copia"
  }
  $feitas++
}

Write-Host "$feitas figuras extraidas para img/animacoes/"
if ($avisos.Count) {
  $avisos | ForEach-Object { Write-Host "  FALHA $_" }
  throw "a copia divergiu do inline"
}
Write-Host "assinatura conferida: a copia e' identica ao inline em todas"

# O arquivo avulso e' XML, e nao HTML: o navegador nao perdoa nada. Vale conferir aqui
# mesmo, porque um .svg malformado nao avisa, so aparece em branco no catalogo.
$ruins = @()
foreach ($fig in $Figuras) {
  $arquivo = (Join-Path $Destino ($fig.slug -replace '/', '\')) + '.svg'
  try { [xml](Get-Content $arquivo -Raw -Encoding UTF8) | Out-Null }
  catch { $ruins += "$($fig.slug): $($_.Exception.Message)" }
}
if ($ruins.Count) {
  $ruins | ForEach-Object { Write-Host "  FALHA $_" }
  throw "ha .svg que nao e' XML valido"
}
Write-Host "xml conferido: os $feitas arquivos abrem como documento"
