# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Sobre o projeto

**pirasnafisica.com.br** — portal gratuito de Física para o Ensino Médio brasileiro. Site estático (HTML/CSS/JS vanilla) hospedado no GitHub Pages com domínio customizado. Supabase é usado apenas pelo bolão da Copa do Mundo (subprojeto isolado).

## Como rodar localmente

Sem build, sem dependências. Basta servir a raiz:

```bash
python -m http.server 8000
# Acesse: http://localhost:8000
```

Abrir arquivos diretamente pelo sistema de arquivos causa erros de `fetch` (CORS). Sempre use um servidor local.

## Estrutura de alto nível

```
/                        # raiz — páginas principais do site
css/style.css            # estilos globais com custom properties
js/theme.js              # dark mode (carregado síncronamente no <head>)
js/include.js            # injeta header/header.html e footer/footer.html
header/, footer/         # fragmentos HTML compartilhados
conteudos/               # 9 temas × N subtópicos (63 páginas)
conteudos/shared.css     # estilos compartilhados entre subtópicos
img/animacoes/           # SVG animados avulsos + catálogo (noindex, fora do sitemap)
banco-questoes/          # banco de questões UFRGS (300 questões)
atividades/              # estudos dirigidos e listas de exercícios interativas
atividades/estudos_dirigidos/<area>/ed_<slug>/   # um ED por pasta, agrupados pelas áreas de conteudos/
atividades/listas/<assunto>/                     # listas de exercícios, uma pasta por assunto
atividades/listas/listas.css                     # folha única de todas as listas
Programas/               # simulações (Canvas) publicadas como mini-apps
scripts/                 # utilitários PowerShell (sitemap, favicon, meta tags)
copa_do_mundo/bolao/     # jogo de bolão — subprojeto separado com Supabase
```

## Sistema de tema (dark mode)

`js/theme.js` é carregado **síncronamente** no `<head>` — antes do CSS — para evitar flash de tema errado. Aplica `data-theme="dark"` no `<html>` quando necessário. Toda página do site precisa dessa linha no `<head>`:

```html
<script src="/js/theme.js"></script>
```

O dark mode é controlado por `[data-theme="dark"]` em `css/style.css`. Não há media query — é sempre opt-in via localStorage (`'claro'` ou `'escuro'`).

## Sistema de header/footer

`js/include.js` faz fetch de `header/header.html` e injeta em `<div id="header">`. Também carrega `js/feedback-modal.js` após o header. Toda página precisa de:

```html
<div id="header"></div>
<!-- conteúdo da página -->
<footer></footer>
<script src="/js/include.js"></script>
```

Os caminhos no `include.js` usam `/` absoluto — funciona para GitHub Pages e servidor local, mas não para abrir `.html` diretamente no navegador.

## Páginas de conteúdo (`conteudos/`)

Cada subtópico segue o padrão:

```html
<link rel="stylesheet" href="../../css/style.css">
<link rel="stylesheet" href="../shared.css">
```

Estrutura da página: hero com breadcrumb + título + fórmula em destaque, seguido de seções de conteúdo. Mini-apps de simulação usam `<canvas>` com lógica JS inline. Cada arquivo HTML termina com um bloco `<!-- IMAGENS NECESSÁRIAS -->` contendo caminhos e descrições das imagens ainda não criadas.

Os hubs de tema ficam em `conteudos/<tema>/index.html`; os subtópicos em `conteudos/<tema>/<subtopico>.html`.

## Figuras e animações (`img/animacoes/`)

**Toda figura ou animação criada para o site é disponibilizada também de forma avulsa e entra no catálogo `img/animacoes/index.html`.** Isso é padrão, não pedido especial: uma figura só existe dentro de um texto serve àquele texto uma vez; solta, ela serve a slides, provas, outros textos e a outros professores.

O fluxo, em três passos:

1. **Desenhar inline na página**, em SVG, dentro de `<figure class="fig-quadro">` (par de quadros vai em `<div class="fig-sequencia">`; figura sozinha ganha também `fig-unica`). Cores **sempre** em classes no CSS, com bloco `[data-theme="dark"]` correspondente. Nunca cor fixa no HTML.
2. **Extrair para `img/animacoes/<assunto>/<n>-<nome>.svg`** com um script, nunca copiando à mão: a cópia manual diverge da publicada na primeira correção de geometria. Ver `img/animacoes/planos-inclinados/` e `img/animacoes/coriolis/` como modelo. O script deve terminar conferindo que a assinatura dos elementos do arquivo gerado é idêntica à do inline.
3. **Cadastrar no catálogo**, em `<section class="anim-secao">` com nota explicando o conjunto e link para onde a figura é usada.

O arquivo avulso é **autossuficiente**: leva o próprio `<style>`, sem buscar fonte, CSS ou script na rede. Exigências:

- Conteúdo do `<style>` dentro de `<![CDATA[ ]]>`. Um `.svg` solto é lido como **XML**, e ali um `<` no CSS abre uma tag.
- Cores em custom properties `--xx-*` declaradas em `svg { }`, para quem hospedar poder retematizar sem mexer no desenho.
- Bloco `@media (prefers-color-scheme: dark)`. O `.svg` carregado como imagem é documento à parte e **não enxerga o `data-theme`** do site.
- Bloco `@media (prefers-reduced-motion: reduce)` desligando `animateMotion` e `animateTransform`.
- `aria-label` vira `<title id>` + `aria-labelledby`, que é o que o navegador lê num `.svg` solto.
- `width`/`height` explícitos (o dobro do viewBox serve), para abrir sozinho num tamanho decente.

Armadilhas já pagas, todas em XML e não em HTML:

- **Atributo sem valor** (`data-chave`) é válido em HTML e **quebra** o XML. Escrever `data-chave=""`.
- **`fill="var(--x)"` não funciona** em SVG (atributos de apresentação não aceitam `var()`). Usar `style="fill:var(--x)"` ou uma classe.
- **`<img>` não executa `<script>`.** SVG com interação precisa de `<object>` ou `<iframe>`, e `<object>` não deduz a proporção sozinho, então pede `aspect-ratio` no CSS.
- **O CSS `prefers-reduced-motion` não alcança SMIL** numa página. Ali é preciso `svg.setCurrentTime(t)` + `pauseAnimations()`, congelando num quadro que ainda explique a figura.

Na página do texto, o bloco `<!-- IMAGENS NECESSÁRIAS -->` some quando a última imagem pendente é feita.

`img/animacoes/` tem `noindex` e está na lista de exclusão de `scripts/gerar-sitemap.ps1`.

### Figuras dos estudos dirigidos

A regra vale igualmente para as figuras dos EDs, e ali a extração é automática. Marque o `<svg>` inline com `class="fig"` e `data-avulso="<assunto>/<nome>"`, tire toda cor de atributo (as classes ficam no bloco `/* === CORES DAS FIGURAS === */` do `style.css` do próprio ED), acrescente uma linha no manifesto `$Figuras` e rode:

```powershell
powershell -File scripts\extrair-figuras-eds.ps1
```

O script recorta a geometria tal e qual, copia a paleta do `style.css` do ED para dentro do arquivo gerado e confere, ao final, que a assinatura de elementos bate com a do inline. Divergiu, ele falha.

Dois pontos em que o ED foge do padrão dos textos de `conteudos/`:

- **As páginas dos EDs são claras por decisão de projeto**, sem `data-theme`. O tema escuro exigido do `.svg` avulso não pode sair do `style.css` do ED, então mora na tabela `$TemasEscuros` do script, uma entrada por área.
- O bloco `@media (prefers-reduced-motion: reduce)` só é emitido **quando a figura tem animação**. Nenhuma das atuais tem.

Figura que já nasceu avulsa (`img/animacoes/trabalho-energia/3-referencial-epg.svg`) não passa pelo script: ela é a fonte, e o ED a consome por `<img src>`.

### Figuras das listas de exercícios

Mesma regra, script próprio. Marque o `<svg class="fig-svg">` com `data-avulso="<assunto>/<nome>"`,
acrescente a linha no manifesto `$Figuras` e rode:

```powershell
powershell -File scripts\extrair-figuras-listas.ps1
```

Três diferenças em relação ao script dos EDs, todas ditadas pela estrutura das listas:

- A paleta é **uma só**, na seção `FIGURAS DAS LISTAS` de `atividades/listas/listas.css`. Não há folha por lista.
- As páginas das listas acompanham o tema do site, então o tema escuro do `.svg` avulso sai do próprio bloco `[data-theme="dark"]`. Não há tabela escrita à mão.
- As pontas de seta ficam num `<svg class="fig-defs">` compartilhado pela página. O arquivo avulso precisa levar as suas, senão o `marker-end` aponta para nada; o script copia só os `<marker>` que aquela figura usa e os desconsidera na conferência de assinatura.

As famílias tipográficas das figuras têm tokens próprios (`--fig-fonte-t`, `--fig-fonte-m`) dentro do bloco de paleta, e não herdam `--fonte`: o arquivo avulso leva a paleta e mais nada.

## Convenções de escrita dos textos

Valem para todo texto de conteúdo, novo ou editado. Nasceram nos briefs de redação (`briefs/`, pasta ignorada pelo git) e ficam registradas aqui porque cada brief é arquivado em `briefs/feitos/` depois de executado.

**Voz, ritmo e vícios a evitar ficam em `.claude/rules/guia-de-estilo-lucas_1.md`**, que é carregado automaticamente e é a fonte única desse assunto (travessão, negrito, conectores, estrutura do parágrafo, vícios de escrita de IA, citações e epígrafes). Esta seção cobre apenas o que é específico do site: marcação, CSS e onde cada coisa entra na página.

### Parágrafo de abertura

A maioria dos textos abre com um `<p class="content-lead">` **antes** da primeira `<section>`, apresentando o assunto e anunciando o percurso. CSS em `conteudos/shared.css`.

Cuidado ao escrevê-lo: a barra lateral "Neste texto" já lista todas as seções, então uma enumeração das seções apenas duplica o índice. O parágrafo deve trazer o que o índice não dá — por que o assunto importa, que problema o texto resolve, o que nele contraria a intuição. A menção ao percurso vem em prosa e em segundo plano.

Evitar fórmula fixa: se todos os textos começarem com "Neste texto vamos abordar…", vira preenchimento. Textos curtos podem dispensar a abertura.

### Referências bibliográficas

```html
<sup class="ref"><a href="#ref-1" id="cite-1">1</a></sup>

<section class="content-section referencias" id="referencias">
  <h2>Referências</h2>
  <ol>
    <li id="ref-1">SOBRENOME, Nome. <em>Título</em>. Local: Editora, ano.
      <a href="#cite-1" class="voltar" aria-label="Voltar ao texto">↩</a></li>
  </ol>
</section>
```

- Numeração sequencial por **ordem de aparição**. Obra citada mais de uma vez reutiliza o mesmo número (vários retornos numerados na mesma entrada).
- O indicador vem **depois** da pontuação.
- "Referências" entra no índice "Neste texto" como último item.
- Hierarquia para **escolher** o que citar (não para ordenar): fontes primárias, teóricos que as seguiram, referências consagradas, livros, artigos científicos, divulgação, internet.
- Densidade: baixa nos textos da linha básica, só onde a afirmação é discutível ou histórica; alta nos textos de aprofundamento.
- **Nunca inventar dado bibliográfico.** Faltando editora, ano, tradutor, volume ou página, deixar `<!-- VERIFICAR: dado faltante -->` e avisar na resposta.
- **Toda obra citada precisa estar acessível online.** Antes de citar, localizar um link de acesso e conferir que a obra existe e que os dados batem. Sem acesso possível, escolher outra referência ou avisar. Clássicos em domínio público costumam estar no Archive.org, Gallica ou e-rara; artigos brasileiros de ensino, no SciELO.
- Padrão de formatação: **ABNT NBR 6023**, com o título em *itálico* em vez de negrito, por ser mais legível na web.

CSS em `css/style.css`: `.ref`, `.referencias`, `.voltar`.

**Controle:** `not_commit/referencias-controle.html` (ignorado pelo git) reúne todas as obras citadas no site, com referência completa, link de acesso e as páginas que as citam. Atualizar sempre que uma referência for acrescentada.

### Epígrafe

Não confundir com referência. A **epígrafe** é uma frase de efeito que abre o texto, ligada ao tema (um texto sobre caos abre com a borboleta e o furacão; um sobre Sócrates, com "só sei que nada sei"). Atribuição só pelo nome do autor, sem indicador numérico e sem entrada na lista de Referências. As duas coisas convivem no mesmo texto. Regras de uso no guia de estilo, seção 7.

### Emoji e ponto de exclamação

Fora do corpo do texto, os dois têm função e ficam:

- **Emoji como ícone**: caixas de destaque, cards de conceito, cards dos estudos dirigidos.
- **Exclamação em microtexto de interface** ("✓ Copiado!") e em mensagem motivacional, como o retorno de um quiz.

Na prosa dos textos, nenhum dos dois.

### Ao editar um texto existente

Preservar o vocabulário e o ritmo do original: as inserções devem parecer escritas pela mesma pessoa. Correções pedidas como localizadas são localizadas, sem reescrever seções que o pedido não citou.

## Banco de questões UFRGS (`banco-questoes/`)

**Fonte de dados:** `banco-questoes/fisica_ufrgs.json` — chave raiz `banco_questoes` (array de 300 questões).

**Estrutura de cada questão:**
```json
{
  "id": "UFRGS-2020-F-01",
  "ano": 2020, "numero": 1,
  "area": "Mecânica", "subarea": "Cinemática",
  "tags": [],
  "imagens": { "enunciado": ["2020/arquivo.png"], "alternativas": {"A": "arq.png"} },
  "enunciado": "Texto com [[IMG:2020/fig.png]] e [[FRAC:num|den]]",
  "opcoes": {"A": "texto", "B": "texto", ...},
  "gabarito": "C",
  "resolucao": "Texto da resolução."
}
```

**Cobertura de anos:**
- 2012–2020: Q01–Q25 por ano (caderno standalone de Física)
- 2022–2026: Q16–Q30 por ano (seção de Física no caderno combinado; 2021 não existe)

**Sintaxe especial no campo `enunciado`:**
- `[[IMG:ano/arquivo.png]]` — insere imagem após o parágrafo onde aparece
- `[[FRAC:num|den]]` — renderiza fração vertical com CSS `.bq-frac`
- `V_x`, `mA`, `FAB` → subscrito automático via `fixSubscripts()` em `index.html`
- Parágrafos que começam com `<table` são renderizados sem wrapper `<p>`

**Imagens:** em `banco-questoes/img/<ano>/`. Nomeação: `<ano>_UFRGS_Q<num>.png` (enunciado) ou `<ano>_UFRGS_Q<num>_<LETRA>.png` (alternativas). Anos 2012–2019 ainda não têm imagens.

**PDFs originais:** em `Provas_vestibulares/` (gitignored). Gabaritos em HTMLs na mesma pasta.

**Progresso:** `banco-questoes/resolucoes_progresso.json` (300/300 com resolução).

## Bolão da Copa (`copa_do_mundo/bolao/`)

Subprojeto isolado com Supabase próprio. Não usa os arquivos `css/style.css` e `js/` da raiz.

**Supabase:** projeto `zmbgprapzgvpnmbtrakp`  
**Auth:** `profiles.is_admin = true` define o administrador  
**Cliente JS:** `supabase.js` — exporta helpers de auth e `callAdmin(action, payload)` para chamar a Edge Function

**Edge Function `admin`** (`supabase/functions/admin/index.ts`):
- Guarda a `service_role` no servidor; verifica `is_admin` antes de qualquer ação
- Rota por `action` via `switch`: `list_participants`, `create_participant`, `reset_password`, `delete_participant`, `list_pools`, `create_pool`, `add_member`, `delete_pool`, `export_data`, `audit_grid`, `prediction_history`
- Deploy: `npx supabase functions deploy admin --project-ref zmbgprapzgvpnmbtrakp`
- Docker não é necessário para o deploy

**Migrações SQL** em `copa_do_mundo/bolao/sql/` — rodar manualmente no Supabase SQL Editor:

| Arquivo | Status |
|---|---|
| `pool-scoring-rules-columns.sql` | ✅ rodado |
| `pool-scoring-rules-rls.sql` | ✅ rodado |
| `views-security-invoker.sql` | ✅ rodado |
| `restore-scoring-grants.sql` | ✅ rodado |
| `admin-lockdown.sql` | ⏳ pendente (verificar nomes de policies antes) |
| `prediction-audit.sql` | ⏳ pendente (+ redeploy Edge Function) |
| `group-standings-fifa.sql` | ⏳ pendente (faz `drop view group_standings_actual`) |
| `match-scoring-per-pool.sql` | ⏳ pendente |
| `prediction-deadlines.sql` | ⏳ pendente |
| `ko-advancing-team.sql` | ⏳ pendente (mata-mata: 8 pts p/ quem acerta o time que avança; adiciona `matches.advancing_team` e `predictions.advancing_team`; substitui `set_match_result`/`update_match_predictions_points`/`clear_match_result`. **Rodar ANTES de usar pool.html/admin.html/sync.mjs novos**) |

**Geração de PDF do regulamento:** Puppeteer instalado fora do OneDrive em `C:\Users\Usuario\reg-pdf-tool\`. Rodar de lá: `node gerar_pdf_regulamento.mjs <input.html> <output.pdf>`. O script usa mídia `screen` e calcula altura real para gerar página única.

## Listas de exercícios (`atividades/listas/`)

Uma pasta por assunto (`MRUV/`, `circuitos/`, `forcas/`, `lancamentos/`, `leis_newton/`), na ordem dos conteúdos: Cinemática, Dinâmica, Eletricidade. A página `lista_de_exercicios.html` da raiz lista os cards em uma `<section class="ed-area" data-tema="<area>">` por área, e o rótulo de cada card usa o **subtópico**, não a área.

**Todo o CSS mora em `atividades/listas/listas.css`.** Nenhuma página de lista abre bloco `<style>`. O `<head>` carrega, nesta ordem:

```html
<link rel="stylesheet" href="../../../css/style.css" />
<link rel="stylesheet" href="../listas.css" />
```

O que for específico de uma lista entra na folha comum, com o escopo indicado no comentário da seção. Duas opções são ligadas por classe no `<body>`, não por CSS avulso:

- `class="sem-tags"` esconde as etiquetas de dificuldade. A etiqueta continua no HTML, que é onde ela serve de referência para quem monta a lista. É o padrão das listas de resposta aberta.

Blocos de marcação disponíveis: `content-hero` com `breadcrumb`, `lista-meta`/`lista-badge`, `lista-formulas` com `formulas-grid`/`formula-group`, `lista-aviso`, `divisor-section`, `question-block` com `question-header`/`question-num`/`q-tag`/`question-text`/`ol.sub-itens`. Notação: `.frac` com `.frac-num`/`.frac-den` para fração, `.raiz` para o radicando, `.vec` para a seta sobre a variável (o `<sub>` fica **fora** do `.vec`, para a seta cobrir só a letra).

As avaliações (mesma lista sem gabarito) continuam em disco, mas fora de `lista_de_exercicios.html`.

## Estudos dirigidos (`atividades/estudos_dirigidos/`)

Organizados por **grande área**, com os mesmos nomes de pasta usados em `conteudos/`: `grandezas-fisicas/`, `cinematica/`, `dinamica/`, `trabalho-energia/`, `eletricidade/`. Dentro de cada área, uma pasta `ed_<slug>/` por estudo, sempre com os quatro arquivos `index.html`, `style.css`, `quiz.js` e `main.js` (mais os scripts próprios de gráfico ou animação, quando houver).

Os caminhos relativos partem de quatro níveis: `../../../../index.html`, `../../../../img/…`. Para outras pastas de `atividades/` são três: `../../../testes/…`.

A página `estudos_dirigidos.html` lista os cards em uma `<section class="ed-area" data-tema="<area>">` por área, o que puxa as cores de tema definidas em `css/style.css`.

Ao mover um ED de pasta, deixar no caminho antigo um `index.html` de redirecionamento (`meta refresh` + `link rel=canonical` + `location.replace`), como já existe em `atividades/*_estudo_dirigido/`. O `scripts/gerar-sitemap.ps1` ignora essas páginas.

**Motor de quiz.** `quiz.js` expõe `window.NLQuizData`, `window.NLQuizState` e `window.NLQuizReset`; `main.js` consome esses globais para montar o relatório em `.txt`. As chaves `quizN` do banco precisam bater com os `<div class="quiz-section" id="quizN">` do HTML e com o mapa `TOPIC_NAMES` de `main.js`. A numeração das questões segue a ordem no DOM, não a das chaves.

## Scripts PowerShell (`scripts/`)

Rodar sempre a partir da raiz do projeto:

```powershell
powershell -File scripts\gerar-sitemap.ps1         # rodar ao criar/remover páginas HTML
powershell -File scripts\inject-favicon.ps1        # injetar favicons em páginas existentes
powershell -File scripts\add-meta-tags.ps1         # injetar meta description + OG tags
powershell -File scripts\extrair-figuras-eds.ps1   # gerar os .svg avulsos das figuras dos EDs
powershell -File scripts\extrair-figuras-listas.ps1 # idem, para as figuras das listas
```

**Atenção:** scripts `.ps1` com caracteres acentuados precisam ser salvos com UTF-8 **com BOM** (PowerShell 5.1 no Windows lê sem BOM como ANSI e corrompe os acentos).

## SEO e arquivos especiais na raiz

- `google96ec9e2ea3f2a7cc.html` — verificação do Google Search Console. **Não remover.**
- `sitemap.xml` — gerado pelo script; submetido ao Search Console
- `robots.txt` — inclui referência ao sitemap
- GA4 ID: `G-TY56KM22X8` (injetado nas páginas de conteúdo)

## Convenções de CSS

`css/style.css` define tokens semânticos via CSS custom properties:

```css
--bg, --surface, --surface-2, --border, --texto, --text-muted   /* base */
--titulo, --subtitulo                                             /* hierarquia de texto */
--azul, --roxo, --amarelo, --laranja                             /* cores da marca */
--info-bg/border/text, --warn-*, --danger-*, --ok-*             /* caixas semânticas */
--font-body: 'DM Sans'; --font-mono: 'Space Mono'
```

Dark mode sobrescreve esses tokens em `[data-theme="dark"]` — nunca hard-code cores, sempre use as variáveis.
