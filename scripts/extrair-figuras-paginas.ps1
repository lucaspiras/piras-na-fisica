# extrair-figuras-paginas.ps1
# Irmao de extrair-figuras-eds.ps1, para as figuras que nascem numa pagina
# comum do site: listas de exercicios e apresentacoes. Gera .svg avulsos e
# autossuficientes em img/animacoes/<assunto>/, prontos para slide, prova ou
# outro site. Rodar da raiz do projeto:
#
#     powershell -File scripts\extrair-figuras-paginas.ps1
#
# Cada figura declara um PERFIL, que diz de onde sai a paleta e como se resolve
# o tema escuro do arquivo avulso:
#
#   lista       -> atividades/listas/listas.css, secao "FIGURAS DAS LISTAS",
#                  classes .fg-*. As paginas das listas acompanham o tema do
#                  site, entao o escuro sai do proprio [data-theme="dark"].
#   apresentacao-> css/apresentacoes.css, secao "FIGURAS DAS APRESENTACOES",
#                  classes .fga-*. Os decks sao claros por decisao de projeto e
#                  nao tem bloco escuro; ele vem da tabela $TemasEscuros abaixo,
#                  como acontece nos EDs.
#
# Diferenca comum aos dois perfis, em relacao ao script dos EDs: as pontas de
# seta ficam num <svg> de defs compartilhado pela pagina inteira. O arquivo
# avulso precisa levar as suas, senao o marker-end aponta para nada; o script
# copia so os <marker> que a figura usa e os desconsidera na conferencia.
#
# Ao final, confere que a assinatura de elementos do desenho gerado e' igual a
# do inline, desconsiderando o <defs> injetado. Divergiu, falha.
#
# Para acrescentar uma figura: ponha data-avulso="<assunto>/<nome>" no <svg> da
# pagina, garanta que nenhuma cor esta em atributo, e adicione uma linha em
# $Figuras. Depois cadastre no catalogo img/animacoes/index.html.

$ErrorActionPreference = 'Stop'

# ----------------------------------------------------------------------------
# MANIFESTO
# ----------------------------------------------------------------------------
$LISTA_FORCAS = 'atividades/listas/forcas/lista_1_peso_normal_tracao.html'

$Figuras = @(
  @{ Html = $LISTA_FORCAS
     Slug = 'forcas/4-forca-inclinada-e-normal'
     Resumo = 'Forca empurrando o bloco 30 graus abaixo da horizontal: a normal passa do peso.' }

  @{ Html = $LISTA_FORCAS
     Slug = 'forcas/5-normal-no-plano-inclinado'
     Resumo = 'Normal e peso num plano inclinado de 30 graus, saindo do mesmo ponto do bloco.' }

  @{ Html = $LISTA_FORCAS
     Slug = 'forcas/6-dois-blocos-ligados-por-fio'
     Resumo = 'Dois blocos ligados por um fio sobre a mesa, puxados por uma forca horizontal.' }

  @{ Html = $LISTA_FORCAS
     Slug = 'forcas/7-luminaria-em-dois-fios'
     Resumo = 'Luminaria sustentada por dois fios simetricos a 30 graus do teto.' }

  @{ Html = $LISTA_FORCAS
     Slug = 'forcas/8-maquina-de-atwood'
     Resumo = 'Maquina de Atwood: polia fixa no teto com 3 kg de um lado e 5 kg do outro.' }

  @{ Html = $LISTA_FORCAS
     Slug = 'forcas/9-bloco-na-mesa-e-corpo-pendurado'
     Resumo = 'Bloco na mesa ligado por fio que passa na polia da borda ate um corpo pendurado.' }

  @{ Html = $LISTA_FORCAS
     Slug = 'forcas/10-elevador-freando-na-descida'
     Resumo = 'Cabine de elevador em corte, com lustre e pessoa na balanca, descendo e freando.' }

  @{ Html = $LISTA_FORCAS
     Slug = 'forcas/11-tres-blocos-em-serie'
     Resumo = 'Tres blocos em serie na mesa, ligados por dois fios, puxados por uma forca.' }

  @{ Html = $LISTA_FORCAS
     Slug = 'forcas/12-bloco-preso-na-rampa'
     Resumo = 'Bloco em repouso na rampa de 30 graus, preso por fio paralelo a superficie.' }

  @{ Html = $LISTA_FORCAS
     Slug = 'forcas/13-rampa-com-polia-no-topo'
     Resumo = 'Rampa de 30 graus com polia no topo e corpo pendurado do outro lado do fio.' }


  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/forcas-newton/index.html'
     Perfil = 'apresentacao'
     Slug = 'gravitacao/1-sol-e-terra-se-atraem'
     Resumo = 'Sol e Terra se atraindo: o par de setas tem o mesmo tamanho nos dois corpos.' }

  @{ Html = 'disciplinas/fisica_1_mecanica/apresentacoes/forcas-newton/index.html'
     Perfil = 'apresentacao'
     Slug = 'gravitacao/2-piano-e-a-terra'
     Resumo = 'Piano acima do horizonte curvo da Terra, com o peso apontando para o centro do planeta.' }
)

# ----------------------------------------------------------------------------
# PERFIS
# ----------------------------------------------------------------------------
$Perfis = @{
  'lista' = @{
    Folha  = 'atividades/listas/listas.css'
    Secao  = 'FIGURAS DAS LISTAS'
    Fim    = 'IMPRESS'
    Classe = 'fg-'
    Defs   = 'fig-defs'
    Escuro = ''          # sai do [data-theme="dark"] da propria folha
  }
  'apresentacao' = @{
    Folha  = 'css/apresentacoes.css'
    Secao  = 'FIGURAS DAS APRESENTA'
    Fim    = 'INTERRUPTORES'
    Classe = 'fga-'
    Defs   = 'fga-defs'
    Escuro = 'apresentacao'
  }
}

# ----------------------------------------------------------------------------
# TEMA ESCURO DOS ARQUIVOS AVULSOS
# So para os perfis cuja pagina de origem e' clara e por isso nao tem um bloco
# [data-theme="dark"] de onde copiar.
# ----------------------------------------------------------------------------
$TemasEscuros = @{
  'apresentacao' = @'
        --figa-sol:          #F4B95A;
        --figa-sol-halo:     #4A3A1C;
        --figa-terra:        #3F7FD8;
        --figa-continente:   #3FBB74;
        --figa-contorno:     #E6E7EA;
        --figa-vetor:        #F87171;
        --figa-guia:         #6B7280;
        --figa-texto:        #E6E7EA;
        --figa-rotulo:       #A8ABB2;
        --figa-piano:        #0F1013;
        --figa-piano-2:      #23252B;
        --figa-teclas:       #E8E6E0;
        --figa-solo:         #3FBB74;
        --figa-rotulo-claro: #DCE6F5;
'@
}

# ----------------------------------------------------------------------------
function Get-Assinatura {
  # Sequencia de nomes de elemento do desenho, na ordem. Compara o gerado com
  # o inline sem se importar com indentacao, quebra de linha ou cabecalho.
  param([string]$Svg)
  $corpo = [regex]::Replace($Svg, '(?s)<style>.*?</style>', '')
  $corpo = [regex]::Replace($corpo, '(?s)<title\b.*?</title>', '')
  $corpo = [regex]::Replace($corpo, '(?s)<defs>.*?</defs>', '')
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

function Indenta {
  param([string]$Texto, [int]$N)
  $pad = ' ' * $N
  return (($Texto -split "`r?`n" | ForEach-Object { if ($_.Trim()) { $pad + $_ } else { '' } }) -join "`n")
}

# ----------------------------------------------------------------------------
# PALETA, LIDA UMA VEZ POR PERFIL USADO
# ----------------------------------------------------------------------------
$Paletas = @{}
foreach ($nome in ($Figuras | ForEach-Object { if ($_.Perfil) { $_.Perfil } else { 'lista' } } | Select-Object -Unique)) {
  if (-not $Perfis.ContainsKey($nome)) { throw "perfil desconhecido: $nome" }
  $perfil = $Perfis[$nome]
  if (-not (Test-Path $perfil.Folha)) { throw "folha nao encontrada: $($perfil.Folha)" }
  $css = [System.IO.File]::ReadAllText((Resolve-Path $perfil.Folha))

  $mSec = [regex]::Match($css, "(?s)$([regex]::Escape($perfil.Secao))(.*?)$([regex]::Escape($perfil.Fim))")
  if (-not $mSec.Success) { throw "secao '$($perfil.Secao)' nao encontrada em $($perfil.Folha)" }
  $secao = $mSec.Groups[1].Value

  $mClaro = [regex]::Match($secao, '(?s):root \{(.*?)\n\}')
  if (-not $mClaro.Success) { throw "bloco :root da paleta nao encontrado em $($perfil.Folha)" }
  $claro = Indenta (Remove-Indentacao $mClaro.Groups[1].Value.Trim("`r", "`n")) 6

  if ($perfil.Escuro) {
    if (-not $TemasEscuros.ContainsKey($perfil.Escuro)) { throw "sem tema escuro para '$($perfil.Escuro)'" }
    $escuro = $TemasEscuros[$perfil.Escuro]
  } else {
    $mEscuro = [regex]::Match($secao, '(?s)\[data-theme="dark"\] \{(.*?)\n\}')
    if (-not $mEscuro.Success) { throw "bloco [data-theme=`"dark`"] nao encontrado em $($perfil.Folha)" }
    $escuro = Indenta (Remove-Indentacao $mEscuro.Groups[1].Value.Trim("`r", "`n")) 8
  }

  # as regras de classe sao o desenho; o que posiciona a figura na pagina fica de fora
  $pref = [regex]::Escape($perfil.Classe)
  $regras = [regex]::Matches($secao, "(?m)^\.$pref[^\r\n]*\{[^\r\n]*\}$") |
            ForEach-Object { '    ' + $_.Value }
  if ($regras.Count -lt 8) { throw "poucas regras .$($perfil.Classe)* em $($perfil.Folha) ($($regras.Count))" }

  $Paletas[$nome] = @{ Claro = $claro; Escuro = $escuro; Regras = ($regras -join "`n") }
}

# ----------------------------------------------------------------------------
$semBom = New-Object System.Text.UTF8Encoding($false)
$gerados = 0
$falhas = @()
$htmlCache = @{}
$defsCache = @{}

foreach ($fig in $Figuras) {
  $perfilNome = if ($fig.Perfil) { $fig.Perfil } else { 'lista' }
  $pal = $Paletas[$perfilNome]
  if (-not (Test-Path $fig.Html)) { throw "lista nao encontrada: $($fig.Html)" }
  if (-not $htmlCache.ContainsKey($fig.Html)) {
    $htmlCache[$fig.Html] = [System.IO.File]::ReadAllText((Resolve-Path $fig.Html))
  }
  $html = $htmlCache[$fig.Html]

  # --- pontas de seta disponiveis na pagina --------------------------------
  $chaveDefs = "$perfilNome|$($fig.Html)"
  if (-not $defsCache.ContainsKey($chaveDefs)) {
    $tabela = @{}
    $mDefs = [regex]::Match($html, "(?s)<svg class=`"$($Perfis[$perfilNome].Defs)`".*?</svg>")
    if ($mDefs.Success) {
      foreach ($mk in [regex]::Matches($mDefs.Value, '(?s)<marker id="([^"]+)".*?</marker>')) {
        $tabela[$mk.Groups[1].Value] = (Remove-Indentacao $mk.Value)
      }
    }
    $defsCache[$chaveDefs] = $tabela
  }
  $marcadores = $defsCache[$chaveDefs]

  # --- recorta o <svg> marcado ---------------------------------------------
  $slug = [regex]::Escape($fig.Slug)
  $m = [regex]::Match($html, "(?s)<svg\b[^>]*data-avulso=`"$slug`".*?</svg>")
  if (-not $m.Success) { throw "figura nao encontrada na lista: $($fig.Slug)" }
  $inline = $m.Value

  $viewBox = [regex]::Match($inline, 'viewBox="([^"]+)"').Groups[1].Value
  $rotulo  = [regex]::Match($inline, 'aria-label="([^"]+)"').Groups[1].Value
  if (-not $viewBox) { throw "sem viewBox: $($fig.Slug)" }
  if (-not $rotulo)  { throw "sem aria-label: $($fig.Slug)" }

  # cor em atributo passaria batida pelo tema; e' erro de origem
  $crua = [regex]::Match($inline, '(fill|stroke)="(#|rgb)')
  if ($crua.Success) { throw "cor em atributo na figura $($fig.Slug)" }

  $vb = $viewBox -split '\s+'
  $largura = [int]([double]$vb[2] * 2)
  $altura  = [int]([double]$vb[3] * 2)

  $assunto  = ($fig.Slug -split '/')[0]
  $nome     = ($fig.Slug -split '/')[1]
  $tituloId = "$assunto-$nome"

  # --- so os marcadores que esta figura usa --------------------------------
  $usados = [regex]::Matches($inline, 'url\(#([^)]+)\)') |
            ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique | Sort-Object
  $blocoDefs = ''
  if ($usados.Count -gt 0) {
    $partes = foreach ($u in $usados) {
      if (-not $marcadores.ContainsKey($u)) { throw "marcador '#$u' usado em $($fig.Slug) nao existe no bloco de defs da pagina" }
      Indenta $marcadores[$u] 4
    }
    $blocoDefs = "  <defs>`n" + ($partes -join "`n") + "`n  </defs>`n"
  }

  # --- corpo do desenho -----------------------------------------------------
  $corpo = $inline
  $corpo = [regex]::Replace($corpo, '(?s)^<svg\b[^>]*>', '')
  $corpo = [regex]::Replace($corpo, '</svg>$', '')
  $corpo = Indenta (Remove-Indentacao $corpo) 2
  $corpo = $corpo.Trim("`n")

  # --- monta o arquivo ------------------------------------------------------
  $sb = New-Object System.Text.StringBuilder
  [void]$sb.AppendLine('<?xml version="1.0" encoding="UTF-8"?>')
  [void]$sb.AppendLine("<!-- $($fig.Resumo)")
  [void]$sb.AppendLine('     Autossuficiente: pode ser aberto direto no navegador, usado em <img src>,')
  [void]$sb.AppendLine('     inserido em slide ou importado em editor vetorial.')
  [void]$sb.AppendLine("     Fonte da geometria: $($fig.Html)")
  [void]$sb.AppendLine('     Gerado por scripts/extrair-figuras-paginas.ps1 — nao editar a mao. -->')
  [void]$sb.AppendLine("<svg xmlns=`"http://www.w3.org/2000/svg`" viewBox=`"$viewBox`" width=`"$largura`" height=`"$altura`"")
  [void]$sb.AppendLine("     role=`"img`" aria-labelledby=`"$tituloId`">")
  [void]$sb.AppendLine("  <title id=`"$tituloId`">$rotulo</title>")
  [void]$sb.AppendLine('  <style><![CDATA[')
  [void]$sb.AppendLine('    svg {')
  [void]$sb.AppendLine($pal.Claro)
  [void]$sb.AppendLine('    }')
  [void]$sb.AppendLine('')
  [void]$sb.AppendLine('    /* Quem abrir o arquivo com o sistema no modo escuro ve a versao noturna.')
  [void]$sb.AppendLine('       Embutido aqui porque o .svg carregado como imagem e um documento a')
  [void]$sb.AppendLine('       parte e nao enxerga o data-theme da pagina. */')
  [void]$sb.AppendLine('    @media (prefers-color-scheme: dark) {')
  [void]$sb.AppendLine('      svg {')
  [void]$sb.AppendLine($pal.Escuro)
  [void]$sb.AppendLine('      }')
  [void]$sb.AppendLine('    }')
  [void]$sb.AppendLine('')
  [void]$sb.AppendLine($pal.Regras)
  [void]$sb.AppendLine('  ]]></style>')
  if ($blocoDefs) { [void]$sb.Append($blocoDefs) }
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
    Write-Host ("  ok  {0,-48} {1} elementos, {2} seta(s)" -f "$assunto/$nome.svg", ($aInline -split ',').Count, $usados.Count)
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
