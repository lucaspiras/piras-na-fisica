# extrair-figuras-eds.ps1
# Extrai as figuras inline dos estudos dirigidos para .svg avulsos e
# autossuficientes em img/animacoes/<assunto>/, prontos para slide, prova ou
# outro site. Rodar sempre a partir da raiz do projeto:
#
#     powershell -File scripts\extrair-figuras-eds.ps1
#
# Como funciona. Cada figura marcada no HTML com data-avulso="<assunto>/<nome>"
# e class="fig" e' recortada tal e qual: a geometria NAO e' reescrita aqui.
# As cores vem do bloco "=== CORES DAS FIGURAS ===" do style.css do proprio ED,
# copiado para dentro do arquivo gerado; o tema escuro vem da tabela $TemasEscuros
# abaixo, porque as paginas dos EDs sao claras por decisao de projeto e nao
# devem ganhar um @media (prefers-color-scheme: dark) so por causa da extracao.
#
# Ao final, o script confere que a assinatura de elementos do arquivo gerado e'
# identica a do inline. Divergiu, ele falha: e' o que impede a copia publicada
# de se afastar da que esta no texto.
#
# Para acrescentar uma figura: marque o <svg> no ED com class="fig" e
# data-avulso, garanta que nenhuma cor esta em atributo, e adicione uma linha
# em $Figuras. Depois, cadastre no catalogo img/animacoes/index.html.

$ErrorActionPreference = 'Stop'

# ----------------------------------------------------------------------------
# MANIFESTO
# ----------------------------------------------------------------------------
$Figuras = @(
  @{ Ed = 'atividades/estudos_dirigidos/dinamica/ed_forcas'
     Slug = 'forcas/1-normal-se-ajusta'
     Resumo = 'O mesmo bloco de 5 kg em tres apoios: a normal muda, o peso nao.' }

  @{ Ed = 'atividades/estudos_dirigidos/dinamica/ed_forcas'
     Slug = 'forcas/2-atrito-estatico-cinetico'
     Resumo = 'Grafico da forca de atrito em funcao da forca aplicada, do regime estatico ao cinetico.' }

  @{ Ed = 'atividades/estudos_dirigidos/dinamica/ed_forcas'
     Slug = 'forcas/3-diagrama-corpo-livre'
     Resumo = 'Diagrama de corpo livre em superficie horizontal e em plano inclinado.' }

  @{ Ed = 'atividades/estudos_dirigidos/dinamica/ed_leis_newton'
     Slug = 'leis-de-newton/1-onibus-dois-referenciais'
     Resumo = 'A mesma cena do onibus que arranca, vista da calcada e vista de dentro.' }

  @{ Ed = 'atividades/estudos_dirigidos/dinamica/ed_leis_newton'
     Slug = 'leis-de-newton/2-pares-acao-reacao'
     Resumo = 'Peso e normal no livro nao formam par; cada um tem o seu, em outro corpo.' }

  @{ Ed = 'atividades/estudos_dirigidos/trabalho-energia/ed_trabalho_energia'
     Slug = 'trabalho-energia/1-tres-casos-de-trabalho'
     Resumo = 'Trabalho de uma forca inclinada, paralela e perpendicular ao deslocamento.' }

  @{ Ed = 'atividades/estudos_dirigidos/trabalho-energia/ed_trabalho_energia'
     Slug = 'trabalho-energia/2-quatro-forcas-no-carrinho'
     Resumo = 'As quatro forcas no carrinho e o trabalho que cada uma realiza.' }
)

# ----------------------------------------------------------------------------
# TEMA ESCURO DOS ARQUIVOS AVULSOS
# Um .svg carregado como imagem e' documento a parte e nao enxerga o site.
# Quem abrir o arquivo com o sistema no modo escuro ve estas cores.
# ----------------------------------------------------------------------------
$TemasEscuros = @{
  'dinamica' = @'
      svg {
        --fig-superficie:  #1e293b;
        --fig-superficie-2:#172033;
        --fig-corpo:       #1e293b;
        --fig-corpo-b:     #cbd5e1;
        --fig-apoio:       #94a3b8;
        --fig-guia:        #475569;
        --fig-divisor:     #334155;
        --fig-texto:       #e2e8f0;
        --fig-rotulo:      #94a3b8;
        --fig-peso:        #c084fc;
        --fig-peso-suave:  #2e1065;
        --fig-normal:      #4ade80;
        --fig-normal-suave:#052e16;
        --fig-atrito:      #fb923c;
        --fig-aplicada:    #f87171;
        --fig-tracao:      #22d3ee;
        --fig-ok:          #4ade80;
        --fig-ok-suave:    #14532d;
        --fig-alerta:      #fbbf24;
        --fig-alerta-suave:#451a03;
        --fig-erro:        #f87171;
        --fig-cinza:       #64748b;
        --fig-cinetico:    #fb923c;
        --fig-onibus:      #c9a032;
        --fig-onibus-i:    #2b2a22;
        --fig-vidro:       #24485e;
        --fig-banco:       #3f4d61;
        --fig-pneu:        #0b0f16;
        --fig-calota:      #6b7280;
        --fig-poste:       #4b5563;
        --fig-asfalto:     #2c3138;
        --fig-barra:       #8a5f2b;
        --fig-contorno:    #0b0f16;
      }
'@

  'trabalho-energia' = @'
      svg {
        --fig-fundo:      #111827;
        --fig-fundo-b:    #1f2937;
        --fig-chao:       #cbd5e1;
        --fig-hachura:    #64748b;
        --fig-corpo:      #1e3a5f;
        --fig-corpo-b:    #60a5fa;
        --fig-roda:       #64748b;
        --fig-divisor:    #334155;
        --fig-rotulo:     #94a3b8;
        --fig-texto:      #e2e8f0;
        --fig-forca:      #f87171;
        --fig-forca-t:    #fca5a5;
        --fig-desloc:     #60a5fa;
        --fig-desloc-t:   #93c5fd;
        --fig-angulo:     #4ade80;
        --fig-normal:     #4ade80;
        --fig-normal-t:   #86efac;
        --fig-peso:       #c084fc;
        --fig-peso-t:     #d8b4fe;
        --fig-atrito:     #fb923c;
        --fig-atrito-t:   #fdba74;
        --fig-nulo:       #fbbf24;
        --fig-nulo-t:     #fcd34d;
      }
'@
}

# ----------------------------------------------------------------------------
function Get-Assinatura {
  # A assinatura e' a sequencia de nomes de elemento do desenho, na ordem.
  # E' o que compara o arquivo gerado com o inline sem se importar com
  # indentacao, quebra de linha ou o cabecalho que este script acrescenta.
  param([string]$Svg)
  $corpo = [regex]::Replace($Svg, '(?s)<style>.*?</style>', '')
  $corpo = [regex]::Replace($corpo, '(?s)<title\b.*?</title>', '')
  $corpo = [regex]::Replace($corpo, '(?s)<!--.*?-->', '')
  $nomes = [regex]::Matches($corpo, '<([a-zA-Z][a-zA-Z0-9]*)') | ForEach-Object { $_.Groups[1].Value }
  return ($nomes -join ',')
}

function Remove-Indentacao {
  param([string]$Texto)
  $linhas = $Texto -split "`r?`n"
  $menor = 999
  foreach ($l in $linhas) {
    if ($l.Trim().Length -eq 0) { continue }
    $n = $l.Length - $l.TrimStart(' ').Length
    if ($n -lt $menor) { $menor = $n }
  }
  if ($menor -eq 999) { $menor = 0 }
  $saida = foreach ($l in $linhas) {
    if ($l.Length -ge $menor) { $l.Substring($menor) } else { $l.TrimStart(' ') }
  }
  return ($saida -join "`n")
}

$semBom = New-Object System.Text.UTF8Encoding($false)
$gerados = 0
$falhas = @()

foreach ($fig in $Figuras) {
  $edHtml = Join-Path $fig.Ed 'index.html'
  $edCss  = Join-Path $fig.Ed 'style.css'
  if (-not (Test-Path $edHtml)) { throw "ED nao encontrado: $edHtml" }

  $html = [System.IO.File]::ReadAllText((Resolve-Path $edHtml))
  $css  = [System.IO.File]::ReadAllText((Resolve-Path $edCss))

  # --- recorta o <svg> marcado ---------------------------------------------
  $slug = [regex]::Escape($fig.Slug)
  $m = [regex]::Match($html, "(?s)<svg\b[^>]*data-avulso=`"$slug`".*?</svg>")
  if (-not $m.Success) { throw "figura nao encontrada no ED: $($fig.Slug)" }
  $inline = $m.Value

  $viewBox = [regex]::Match($inline, 'viewBox="([^"]+)"').Groups[1].Value
  $rotulo  = [regex]::Match($inline, 'aria-label="([^"]+)"').Groups[1].Value
  if (-not $viewBox) { throw "sem viewBox: $($fig.Slug)" }
  if (-not $rotulo)  { throw "sem aria-label: $($fig.Slug)" }

  $vb = $viewBox -split '\s+'
  $largura = [int]([double]$vb[2] * 2)
  $altura  = [int]([double]$vb[3] * 2)

  $assunto = ($fig.Slug -split '/')[0]
  $nome    = ($fig.Slug -split '/')[1]
  $tituloId = "$assunto-$nome"

  # --- paleta vinda do style.css do ED -------------------------------------
  $mp = [regex]::Match($css, '(?s)/\* === CORES DAS FIGURAS ===.*?\*/\s*(:root \{.*?)/\* === RESPONSIVE === \*/')
  if (-not $mp.Success) { throw "bloco 'CORES DAS FIGURAS' nao encontrado em $edCss" }
  $paleta = $mp.Groups[1].Value.TrimEnd()
  $paleta = $paleta -replace '^:root \{', 'svg {'
  # as classes .leg-* rotulam a legenda em HTML, fora do desenho
  $paleta = [regex]::Replace($paleta, '(?m)^\.leg-[^\r\n]*\r?\n', '')
  $paleta = [regex]::Replace($paleta, '(?m)^/\* legenda de cores[^\r\n]*\r?\n', '')
  $paleta = ($paleta -split "`r?`n" | ForEach-Object { if ($_.Trim()) { '    ' + $_ } else { '' } }) -join "`n"

  # --- tema escuro ----------------------------------------------------------
  $areaEd = if ($fig.Ed -match 'estudos_dirigidos/([^/]+)/') { $Matches[1] } else { '' }
  if (-not $TemasEscuros.ContainsKey($areaEd)) { throw "sem tema escuro cadastrado para a area '$areaEd'" }
  $escuro = $TemasEscuros[$areaEd]

  # --- movimento reduzido, so se houver animacao ---------------------------
  $temAnimacao = $inline -match '<animate'
  $blocoMovimento = ''
  if ($temAnimacao) {
    $blocoMovimento = @'

    /* Quem pediu menos movimento no sistema recebe a figura congelada. */
    @media (prefers-reduced-motion: reduce) {
      animateMotion, animateTransform, animate { display: none; }
    }
'@
  }

  # --- corpo do desenho, sem os atributos que so servem a pagina ------------
  $corpo = $inline
  $corpo = [regex]::Replace($corpo, '(?s)^<svg\b[^>]*>', '')
  $corpo = [regex]::Replace($corpo, '</svg>$', '')
  $corpo = Remove-Indentacao $corpo
  $corpo = ($corpo -split "`n" | ForEach-Object { if ($_.Trim()) { '  ' + $_ } else { '' } }) -join "`n"
  $corpo = $corpo.Trim("`n")

  # --- monta o arquivo ------------------------------------------------------
  $sb = New-Object System.Text.StringBuilder
  [void]$sb.AppendLine('<?xml version="1.0" encoding="UTF-8"?>')
  [void]$sb.AppendLine("<!-- $($fig.Resumo)")
  [void]$sb.AppendLine('     Autossuficiente: pode ser aberto direto no navegador, usado em <img src>,')
  [void]$sb.AppendLine('     inserido em slide ou importado em editor vetorial.')
  [void]$sb.AppendLine("     Fonte da geometria: $($fig.Ed)/index.html")
  [void]$sb.AppendLine('     Gerado por scripts/extrair-figuras-eds.ps1 — nao editar a mao. -->')
  [void]$sb.AppendLine("<svg xmlns=`"http://www.w3.org/2000/svg`" viewBox=`"$viewBox`" width=`"$largura`" height=`"$altura`"")
  [void]$sb.AppendLine("     role=`"img`" aria-labelledby=`"$tituloId`">")
  [void]$sb.AppendLine("  <title id=`"$tituloId`">$rotulo</title>")
  [void]$sb.AppendLine('  <style><![CDATA[')
  [void]$sb.AppendLine($paleta)
  [void]$sb.AppendLine('')
  [void]$sb.AppendLine('    /* Quem abrir o arquivo com o sistema no modo escuro ve a versao noturna.')
  [void]$sb.AppendLine('       Embutido aqui porque o .svg carregado como imagem e um documento a')
  [void]$sb.AppendLine('       parte e nao enxerga o data-theme da pagina. */')
  [void]$sb.AppendLine('    @media (prefers-color-scheme: dark) {')
  [void]$sb.AppendLine($escuro)
  [void]$sb.AppendLine('    }')
  if ($blocoMovimento) { [void]$sb.AppendLine($blocoMovimento) }
  [void]$sb.AppendLine('  ]]></style>')
  [void]$sb.AppendLine($corpo)
  [void]$sb.AppendLine('</svg>')
  $saida = $sb.ToString() -replace "`r`n", "`n"

  # --- grava ----------------------------------------------------------------
  $destinoDir = Join-Path 'img/animacoes' $assunto
  if (-not (Test-Path $destinoDir)) { New-Item -ItemType Directory -Path $destinoDir -Force | Out-Null }
  $destino = Join-Path $destinoDir "$nome.svg"
  [System.IO.File]::WriteAllText((Join-Path (Get-Location) $destino), $saida, $semBom)

  # --- confere a assinatura -------------------------------------------------
  $aInline = Get-Assinatura $inline
  $aGerado = Get-Assinatura ([System.IO.File]::ReadAllText((Resolve-Path $destino)))
  if ($aInline -ne $aGerado) {
    $falhas += "$($fig.Slug): assinatura divergente`n   inline: $aInline`n   gerado: $aGerado"
  } else {
    Write-Host ("  ok  {0,-46} {1} elementos" -f "$assunto/$nome.svg", ($aInline -split ',').Count)
    $gerados++
  }
}

Write-Host ''
if ($falhas.Count -gt 0) {
  Write-Host 'FALHAS na conferencia de assinatura:' -ForegroundColor Red
  $falhas | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
  exit 1
}
Write-Host "$gerados figura(s) extraida(s); assinatura identica a do inline em todas." -ForegroundColor Green
Write-Host 'Lembre de cadastrar as novas no catalogo img/animacoes/index.html.'
