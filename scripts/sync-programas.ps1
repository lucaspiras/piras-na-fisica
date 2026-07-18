# sync-programas.ps1
# Escaneia Programas/ e adiciona cards ausentes em programas.html

$root       = Split-Path -Parent $PSScriptRoot
$indexFile  = Join-Path $root "programas.html"
$programDir = Join-Path $root "programas"

# Arquivos de suporte que nao devem virar cards
$excludeNames = @('tutorial', 'professor', 'admin', 'readme')

Write-Host ""
Write-Host "=== sync-programas ===" -ForegroundColor Cyan

# --- Ler programas.html atual ---
$html = [System.IO.File]::ReadAllText($indexFile, [System.Text.Encoding]::UTF8)

# --- Encontrar todos os .html dentro das subpastas de Programas/ ---
$allHtml = Get-ChildItem -Path $programDir -Recurse -Filter "*.html" |
    Where-Object { $_.DirectoryName -ne $programDir }

# --- Filtrar: descartar arquivos de suporte ---
$candidates = $allHtml | Where-Object {
    $base = $_.BaseName.ToLower()
    $excluded = $false
    foreach ($ex in $excludeNames) {
        if ($base -like "*$ex*") { $excluded = $true; break }
    }
    -not $excluded
}

# --- Detectar quais nao estao referenciados em programas.html ---
$missing = $candidates | Where-Object {
    $folder = $_.Directory.Name
    $file   = $_.Name
    $html -notmatch [regex]::Escape("$folder/$file")
}

if ($missing.Count -eq 0) {
    Write-Host "OK - programas.html ja esta atualizado." -ForegroundColor Green
    Write-Host ""
    exit 0
}

Write-Host "Programas nao listados encontrados:" -ForegroundColor Yellow

# --- Montar bloco de novos cards como lista de linhas ---
$cardLines = [System.Collections.Generic.List[string]]::new()

foreach ($f in $missing) {
    $href = "/programas/$($f.Directory.Name)/$($f.Name)"

    # Tentar extrair <title> do arquivo HTML
    $src        = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    $titleMatch = [regex]::Match($src, '(?i)<title>([^<]+)</title>')
    if ($titleMatch.Success) {
        $title = $titleMatch.Groups[1].Value.Trim()
    } else {
        $title = (Get-Culture).TextInfo.ToTitleCase(($f.Directory.Name -replace '_', ' '))
    }

    $folderLabel = (Get-Culture).TextInfo.ToTitleCase(($f.Directory.Name -replace '_', ' '))

    Write-Host "  + $href" -ForegroundColor Yellow
    Write-Host "    Titulo: $title" -ForegroundColor Gray

    $cardLines.Add("")
    $cardLines.Add("    <a href=`"$href`" class=`"conteudo-card`">")
    $cardLines.Add("      <span class=`"icone`">&#x1F527;</span>")
    $cardLines.Add("      <h3>$title</h3>")
    $cardLines.Add("      <p>Programa interativo - $folderLabel.</p>")
    $cardLines.Add("    </a>")
}

# --- Localizar ponto de insercao: linha com </section> que fecha .conteudos-grid ---
# Estrategia: inserir os cards antes da ULTIMA </section> antes de </main>
$lines = $html -split "`n"

# Encontrar o indice da linha </section> que precede </main>
$insertIdx = -1
for ($i = $lines.Count - 1; $i -ge 0; $i--) {
    if ($lines[$i] -match '^\s*</section>') {
        $insertIdx = $i
        break
    }
}

if ($insertIdx -lt 0) {
    Write-Host "ERRO: nao foi possivel localizar ponto de insercao em programas.html." -ForegroundColor Red
    exit 1
}

# Montar array final
$newLines = [System.Collections.Generic.List[string]]::new()
for ($i = 0; $i -lt $insertIdx; $i++) {
    $newLines.Add($lines[$i])
}
foreach ($cl in $cardLines) {
    $newLines.Add($cl)
}
for ($i = $insertIdx; $i -lt $lines.Count; $i++) {
    $newLines.Add($lines[$i])
}

$updated = $newLines -join "`n"
[System.IO.File]::WriteAllText($indexFile, $updated, [System.Text.Encoding]::UTF8)

Write-Host ""
Write-Host "$($missing.Count) card(s) adicionado(s) com sucesso a programas.html." -ForegroundColor Green
Write-Host ""
