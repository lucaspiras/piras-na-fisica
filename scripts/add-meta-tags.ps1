# Adiciona meta description + Open Graph nas paginas principais do site.
# Idempotente: pula arquivos que ja tem og:title.
# Uso: powershell -File scripts\add-meta-tags.ps1

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$base = 'https://pirasnafisica.com.br'

# arquivo relativo => @(titulo OG, descricao, url relativa)
$pages = [ordered]@{
  'index.html' = @(
    'Piras na Física — um portal diferente para estudar Física',
    'Portal gratuito de Física para o Ensino Médio: conteúdos completos, simuladores interativos, estudos dirigidos e listas de exercícios.',
    '/')
  'conteudos.html' = @(
    'Conteúdos de Física — Piras na Física',
    'Textos completos de Física para o Ensino Médio: cinemática, leis de Newton, energia, termodinâmica, óptica, ondas, eletricidade e física moderna.',
    '/conteudos.html')
  'atividades.html' = @(
    'Atividades de Física — Piras na Física',
    'Estudos dirigidos interativos e listas de exercícios de Física com correção automática e feedback imediato.',
    '/atividades.html')
  'estudos_dirigidos.html' = @(
    'Estudos Dirigidos — Piras na Física',
    'Estudos dirigidos interativos de Física: teoria resumida, calculadoras, gráficos dinâmicos e quizzes com feedback imediato.',
    '/estudos_dirigidos.html')
  'lista_de_exercicios.html' = @(
    'Listas de Exercícios — Piras na Física',
    'Listas de exercícios de Física com modo estudo (gabarito imediato) e modo avaliação, com relatório de desempenho exportável.',
    '/lista_de_exercicios.html')
  'programas.html' = @(
    'Simuladores e Programas — Piras na Física',
    'Simuladores interativos de Física: movimento 2D, pêndulo forçado, força elétrica, gráficos científicos, conversor de unidades e mais.',
    '/programas.html')
  'conteudos\grandezas-fisicas\index.html' = @(
    'Grandezas Físicas e Unidades — Piras na Física',
    'O que é Física, método científico, grandezas físicas, Sistema Internacional, notação científica e algarismos significativos.',
    '/conteudos/grandezas-fisicas/')
  'conteudos\cinematica\index.html' = @(
    'Cinemática — Piras na Física',
    'Cinemática completa: MRU, MRUV, queda livre, lançamentos vertical, horizontal e oblíquo e movimento circular uniforme.',
    '/conteudos/cinematica/')
  'conteudos\leis-newton\index.html' = @(
    'Leis de Newton — Piras na Física',
    'As três leis de Newton, força de atrito, plano inclinado e força centrípeta, com exemplos resolvidos passo a passo.',
    '/conteudos/leis-newton/')
  'conteudos\trabalho-energia\index.html' = @(
    'Trabalho e Energia — Piras na Física',
    'Trabalho de uma força, potência, energia cinética, energia potencial e conservação da energia mecânica.',
    '/conteudos/trabalho-energia/')
  'conteudos\termodinamica\index.html' = @(
    'Termodinâmica — Piras na Física',
    'Temperatura, calor, calorimetria, mudanças de estado, dilatação, gases e as leis da termodinâmica.',
    '/conteudos/termodinamica/')
  'conteudos\ondulatoria\index.html' = @(
    'Ondulatória — Piras na Física',
    'Características das ondas, fenômenos ondulatórios, som, efeito Doppler e espectro eletromagnético.',
    '/conteudos/ondulatoria/')
  'conteudos\optica\index.html' = @(
    'Óptica — Piras na Física',
    'Natureza da luz, reflexão, refração, espelhos planos e esféricos, lentes e o olho humano.',
    '/conteudos/optica/')
  'conteudos\eletricidade\index.html' = @(
    'Eletricidade — Piras na Física',
    'Carga elétrica, Lei de Coulomb, campo elétrico, corrente elétrica, resistência, Lei de Ohm, circuitos e potência elétrica.',
    '/conteudos/eletricidade/')
  'conteudos\fisica-moderna\index.html' = @(
    'Física Moderna — Piras na Física',
    'Modelos atômicos, relatividade, efeito fotoelétrico e radioatividade explicados para o Ensino Médio.',
    '/conteudos/fisica-moderna/')
}

$anchor = '  <link rel="apple-touch-icon" href="/img/icons/apple-touch-icon.png">'
$utf8 = New-Object System.Text.UTF8Encoding($false)
$done = 0

foreach ($rel in $pages.Keys) {
  $file = Join-Path $root $rel
  if (-not (Test-Path $file)) { Write-Output "NAO ENCONTRADO: $rel"; continue }
  $text = [System.IO.File]::ReadAllText($file)
  # Remove bloco inserido anteriormente (permite re-rodar para corrigir)
  $text = $text -replace '(?s)\r?\n  <meta name="description"[^>]*>.*?<meta name="twitter:card"[^>]*>', ''
  if (-not $text.Contains($anchor)) { Write-Output "SEM ANCORA: $rel"; continue }

  $title = $pages[$rel][0]; $desc = $pages[$rel][1]; $url = $base + $pages[$rel][2]
  $block = @"
$anchor
  <meta name="description" content="$desc">
  <meta property="og:type" content="website">
  <meta property="og:title" content="$title">
  <meta property="og:description" content="$desc">
  <meta property="og:image" content="$base/img/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:type" content="image/png">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:url" content="$url">
  <meta name="twitter:card" content="summary_large_image">
"@

  $newText = $text.Replace($anchor, $block)
  [System.IO.File]::WriteAllText($file, $newText, $utf8)
  $done++
}

Write-Output "Meta tags adicionadas em $done pagina(s)."
