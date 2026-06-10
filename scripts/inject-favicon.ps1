# Injeta as tags de favicon no <head> de todas as paginas HTML do site.
# Pode ser rodado de novo com seguranca: pula arquivos que ja tem rel="icon".
# Uso: powershell -File scripts\inject-favicon.ps1

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot

$tags = @'
  <link rel="icon" type="image/png" sizes="32x32" href="/img/icons/favicon-32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/img/icons/favicon-16.png">
  <link rel="apple-touch-icon" href="/img/icons/apple-touch-icon.png">
'@

$utf8 = New-Object System.Text.UTF8Encoding($false)
$done = 0; $skipped = 0; $noHead = @()

Get-ChildItem -Path $root -Recurse -Filter *.html |
  Where-Object { $_.FullName -notmatch '\\copa_do_mundo\\' -and $_.Name -ne 'header.html' } |
  ForEach-Object {
    $text = [System.IO.File]::ReadAllText($_.FullName)
    if ($text -match 'rel="icon"' -or $text -match "rel='icon'") { $skipped++; return }

    if ($text -match '(?m)^(\s*)<meta[^>]*name="viewport"[^>]*>') {
      $anchor = $Matches[0]
    } elseif ($text -match '(?m)^(\s*)<meta charset[^>]*>') {
      $anchor = $Matches[0]
    } elseif ($text -match '<head>') {
      $anchor = '<head>'
    } else {
      $noHead += $_.FullName.Replace($root + '\', ''); return
    }

    $newText = $text.Replace($anchor, "$anchor`r`n$tags")
    [System.IO.File]::WriteAllText($_.FullName, $newText, $utf8)
    $done++
  }

Write-Output "Favicon injetado em $done arquivo(s); $skipped ja tinham; sem <head>: $($noHead.Count)"
$noHead | ForEach-Object { Write-Output "  SEM HEAD: $_" }
