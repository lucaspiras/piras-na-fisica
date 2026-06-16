param(
    [Parameter(Mandatory)][string]$id,
    [Parameter(Mandatory)][string]$resolucao
)
$filePath = "c:\Users\Usuario\OneDrive\Documentos\Programacao\piras-na-fisica\banco-questoes\fisica_ufrgs.json"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

$idPos = $content.IndexOf('"id": "' + $id + '"')
if ($idPos -eq -1) { Write-Error "ID $id not found"; exit 1 }

$gabPattern = '"gabarito": "'
$gabPos = $content.IndexOf($gabPattern, $idPos)
if ($gabPos -eq -1) { Write-Error "gabarito not found for $id"; exit 1 }

# Position right after the gabarito value closing quote (letter + quote = 2 chars)
$afterGabValue = $gabPos + $gabPattern.Length + 2

# Check if resolucao already exists
$nextChunk = $content.Substring($afterGabValue, [Math]::Min(50, $content.Length - $afterGabValue))
if ($nextChunk -match '"resolucao"') {
    Write-Output "SKIP: resolucao ja existe para $id"
    exit 0
}

$resolJson = $resolucao | ConvertTo-Json
$before = $content.Substring(0, $afterGabValue)
$after  = $content.Substring($afterGabValue)
$insert = ",`n      `"resolucao`": $resolJson"
$content = $before + $insert + $after

[System.IO.File]::WriteAllText($filePath, $content, [System.Text.UTF8Encoding]::new($false))
Write-Output "OK: $id"
