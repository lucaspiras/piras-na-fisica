# Gera arquivos HTML stub para redirecionar URLs antigas para novas (GitHub Pages).
# Rode apos mover arquivos: powershell -File scripts\gerar-redirects.ps1
#
# Configuracao: edite scripts\redirects.txt com uma linha por redirect:
#   caminho/antigo/pagina.html -> caminho/novo/pagina.html
#   pasta-antiga/              -> pasta-nova/
# Caminhos relativos a raiz do site (sem barra inicial).
#
# O destino pode ser uma URL absoluta (https://...), para paginas que foram para OUTRO
# dominio (ex.: copa_do_mundo/ -> gincanas.pirasnafisica.com.br). Nesse caso o stub repassa
# ?query e #hash ao destino, e sem JavaScript cai num meta refresh (sem a query).
#
# -Somente <prefixo>  gera so as linhas cuja ORIGEM comeca por esse prefixo, sem regenerar
#                     os stubs antigos (ex.: -Somente copa_do_mundo/).
param([string]$Somente = '')

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$base = 'https://pirasnafisica.com.br'
$configPath = Join-Path $PSScriptRoot 'redirects.txt'

if (-not (Test-Path $configPath)) {
    $exemplo = "# Redirects -- um por linha, formato: origem -> destino`r`n" +
               "# Caminhos relativos a raiz do site (sem / inicial).`r`n" +
               "# Linhas em branco e comentarios (# ...) sao ignorados.`r`n" +
               "#`r`n" +
               "# Exemplos:`r`n" +
               "# conteudos/cinematica/conceitos.html -> fisica/cinematica/conceitos.html`r`n" +
               "# atividades/mru_estudo_dirigido/     -> atividades/cinematica/mru/`r`n"
    $utf8 = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($configPath, $exemplo, $utf8)
    Write-Host "Arquivo de configuracao criado em scripts\redirects.txt -- edite-o e rode o script novamente."
    exit 0
}

$linhas = Get-Content $configPath -Encoding UTF8 | Where-Object { $_ -notmatch '^\s*(#|$)' }
$count = 0

foreach ($linha in $linhas) {
    if ($linha -notmatch '\s*->\s*') {
        Write-Warning "Linha ignorada (formato invalido): $linha"
        continue
    }
    $partes = $linha -split '\s*->\s*', 2
    $origem  = $partes[0].Trim().TrimStart('/')
    if ($Somente -and -not $origem.StartsWith($Somente.TrimStart('/'))) { continue }
    $bruto   = $partes[1].Trim()
    $externo = $bruto -match '^https?://'
    $destino = if ($externo) { $bruto } else { '/' + $bruto.TrimStart('/') }

    # Se origem termina em /, e pasta -- criar index.html dentro
    $arquivo = if ($origem.EndsWith('/')) {
        Join-Path (Join-Path $root $origem.TrimEnd('/')) 'index.html'
    } else {
        Join-Path $root $origem
    }

    $dir = Split-Path $arquivo
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force $dir | Out-Null }

    $canonico = if ($externo) { $destino } else { $base + $destino }

    $html = "<!DOCTYPE html>`r`n" +
"<html lang=""pt-BR"">`r`n" +
"<head>`r`n" +
"  <meta charset=""UTF-8"">`r`n" +
"  <meta http-equiv=""refresh"" content=""0; url=$destino"">`r`n" +
"  <link rel=""canonical"" href=""$canonico"">`r`n" +
"  <script>window.location.replace(""$destino"")</script>`r`n" +
"</head>`r`n" +
"<body>`r`n" +
"  <p>Redirecionando&#8230; <a href=""$destino"">Clique aqui</a> se n&#227;o redirecionar.</p>`r`n" +
"</body>`r`n" +
"</html>`r`n"

    if ($externo) {
        $html = "<!DOCTYPE html>`r`n" +
"<html lang=""pt-BR"">`r`n" +
"<head>`r`n" +
"  <meta charset=""UTF-8"">`r`n" +
"  <title>P&#225;gina movida</title>`r`n" +
"  <link rel=""canonical"" href=""$canonico"">`r`n" +
"  <script>window.location.replace(""$destino"" + window.location.search + window.location.hash)</script>`r`n" +
"  <noscript><meta http-equiv=""refresh"" content=""0; url=$destino""></noscript>`r`n" +
"</head>`r`n" +
"<body>`r`n" +
"  <p>Esta p&#225;gina mudou para <a href=""$destino"">$destino</a>.</p>`r`n" +
"</body>`r`n" +
"</html>`r`n"
    }

    $utf8 = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($arquivo, $html, $utf8)
    Write-Host "  $origem  ->  $destino"
    $count++
}

Write-Host ""
Write-Host "$count redirect(s) gerado(s)."
