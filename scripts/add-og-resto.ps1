# Adiciona bloco Open Graph generico (titulo da pagina + logo quadrado) em todas as
# paginas que ainda nao tem og:title. As 15 paginas principais (add-meta-tags.ps1) sao puladas.
# Uso: powershell -File scripts\add-og-resto.ps1

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$base = 'https://pirasnafisica.com.br'
$desc = 'Portal gratuito de Física para o Ensino Médio: conteúdos, simuladores, estudos dirigidos e listas de exercícios.'

$anchor = '  <link rel="apple-touch-icon" href="/img/icons/apple-touch-icon.png">'
$utf8 = New-Object System.Text.UTF8Encoding($false)
$done = 0; $skipped = 0; $semTitulo = @()

Get-ChildItem -Path $root -Recurse -Filter *.html |
  Where-Object { $_.FullName -notmatch '\\copa_do_mundo\\' -and $_.Name -ne 'header.html' -and $_.Name -ne 'admin.html' } |
  ForEach-Object {
    $text = [System.IO.File]::ReadAllText($_.FullName)
    if ($text -match 'property="og:title"') { $skipped++; return }
    if (-not $text.Contains($anchor)) { return }

    $rel = $_.FullName.Substring($root.Length + 1).Replace('\', '/')
    if ($rel -eq 'index.html') { $url = "$base/" }
    elseif ($rel.EndsWith('/index.html')) { $url = "$base/" + $rel.Substring(0, $rel.Length - 10) }
    else { $url = "$base/$rel" }

    if ($text -match '<title>\s*(.+?)\s*</title>') { $title = $Matches[1] }
    else { $semTitulo += $rel; $title = 'Piras na Física' }

    $block = @"
$anchor
  <meta name="description" content="$desc">
  <meta property="og:type" content="website">
  <meta property="og:title" content="$title">
  <meta property="og:description" content="$desc">
  <meta property="og:image" content="$base/img/og-logo.jpg">
  <meta property="og:image:width" content="1080">
  <meta property="og:image:height" content="1080">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:url" content="$url">
"@

    $newText = $text.Replace($anchor, $block)
    [System.IO.File]::WriteAllText($_.FullName, $newText, $utf8)
    $done++
  }

Write-Output "OG generico adicionado em $done pagina(s); $skipped ja tinham OG proprio."
$semTitulo | ForEach-Object { Write-Output "  SEM <title>: $_" }
