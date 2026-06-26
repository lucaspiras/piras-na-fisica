# Gera o sitemap.xml na raiz do site varrendo todos os .html publicados.
# Rode de novo sempre que criar/remover paginas: powershell -File scripts\gerar-sitemap.ps1

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$base = 'https://pirasnafisica.com.br'

# Pastas/arquivos que NAO entram no sitemap (rascunhos, fragmentos, admin)
# Padroes com / funcionam no Windows (apos normalizacao) e no Linux.
$excluir = @(
  '/copa_do_mundo/',     # projeto separado
  '/header/',            # fragmento carregado via JS
  '/conteudos_texto/',   # versao antiga, orfa
  '/Listas_Exercicios/', # orfa (nao linkada)
  '/disciplinas/',       # em construcao
  'feedback/admin.html'  # painel administrativo
)
$padraoExcluir = ($excluir -join '|')

$urls = Get-ChildItem -Path $root -Recurse -Filter *.html |
  Where-Object {
    # Normaliza separador para / (funciona igual no Windows e Linux)
    $norm = $_.FullName.Replace('\', '/')
    # Exclui pastas da lista e qualquer stub de redirect (detectado pelo meta refresh)
    $norm -notmatch $padraoExcluir -and
    (Get-Content $_.FullName -Raw) -notmatch 'http-equiv="refresh"'
  } |
  ForEach-Object {
    $rel = $_.FullName.Substring($root.Length + 1).Replace('\', '/')
    if ($rel -eq 'index.html') { $loc = "$base/" }
    elseif ($rel.EndsWith('/index.html')) { $loc = "$base/" + $rel.Substring(0, $rel.Length - 10) }
    else { $loc = "$base/$rel" }
    $lastmod = $_.LastWriteTime.ToString('yyyy-MM-dd')
    "  <url><loc>$loc</loc><lastmod>$lastmod</lastmod></url>"
  } | Sort-Object

$xml = @('<?xml version="1.0" encoding="UTF-8"?>',
         '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">') + $urls + '</urlset>'

$utf8 = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllLines((Join-Path $root 'sitemap.xml'), $xml, $utf8)
Write-Output "sitemap.xml gerado com $($urls.Count) URLs."
