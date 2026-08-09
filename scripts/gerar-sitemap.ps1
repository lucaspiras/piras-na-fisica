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
  '/disciplinas/',       # em construcao (ver excecoes abaixo)
  '/img/animacoes/',     # catalogo de assets, util para mim e nao para o aluno
  '/not_commit/',        # rascunhos locais, ignorados pelo git
  '/Provas_vestibulares/', # PDFs e gabaritos originais, ignorados pelo git
  'feedback/admin.html'  # painel administrativo
)
$padraoExcluir = ($excluir -join '|')

# Excecoes: paginas que entram no sitemap MESMO estando numa pasta excluida.
# Necessario porque /disciplinas/ guarda material que NAO pode ser indexado
# (gabarito em correcoes/folha_optica_gabarito.html, o corretor de provas e as
# provas em si). Por isso a pasta segue bloqueada e liberamos item a item, em
# vez de afrouxar a exclusao.
$incluirMesmoAssim = @(
  '/disciplinas/eletricidade_basica/apresentacoes/circuitos/index.html',
  '/disciplinas/eletricidade_basica/apresentacoes/associacao-de-resistores/index.html',
  '/disciplinas/fisica_1_mecanica/apresentacoes/leis-de-newton/index.html',
  '/disciplinas/fisica_1_mecanica/apresentacoes/forcas-newton/index.html'
)
$padraoIncluir = ($incluirMesmoAssim -join '|')

$urls = Get-ChildItem -Path $root -Recurse -Filter *.html |
  Where-Object {
    # Normaliza separador para / (funciona igual no Windows e Linux)
    $norm = $_.FullName.Replace('\', '/')
    # A excecao e avaliada ANTES da exclusao: uma pagina da allowlist entra
    # mesmo estando dentro de uma pasta bloqueada.
    ($norm -match $padraoIncluir -or $norm -notmatch $padraoExcluir) -and
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
