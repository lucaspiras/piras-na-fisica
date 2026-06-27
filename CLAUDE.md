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
banco-questoes/          # banco de questões UFRGS (300 questões)
atividades/              # estudos dirigidos e listas de exercícios interativas
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

## Scripts PowerShell (`scripts/`)

Rodar sempre a partir da raiz do projeto:

```powershell
powershell -File scripts\gerar-sitemap.ps1   # rodar ao criar/remover páginas HTML
powershell -File scripts\inject-favicon.ps1  # injetar favicons em páginas existentes
powershell -File scripts\add-meta-tags.ps1   # injetar meta description + OG tags
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
