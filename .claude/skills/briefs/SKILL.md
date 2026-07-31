---
name: briefs
description: Verifica a pasta briefs/ do projeto e executa os briefs pendentes de redação/correção de textos do site. Use quando o usuário digitar /briefs, pedir para "ver se tem brief novo", "rodar os briefs" ou "executar o brief".
---

# Executar briefs pendentes

A pasta `briefs/` guarda instruções de redação e correção de textos do site, escritas pelo usuário. Ela é **ignorada pelo git** (`.gitignore`): os briefs são instruções de trabalho, não fazem parte do site e **nunca devem ser commitados**.

## Convenção da pasta

```
briefs/
├── brief-NN-assunto.md   ← PENDENTE (na raiz)
└── feitos/
    └── brief-NN-assunto.md   ← JÁ EXECUTADO
```

Regra: **o que está na raiz de `briefs/` está pendente.** O que está em `briefs/feitos/` já foi feito.

## Procedimento

### 1. Levantar os pendentes

```bash
ls briefs/*.md 2>/dev/null
```

Se não houver nenhum arquivo na raiz de `briefs/`, informe que não há brief pendente e **pare por aqui**. Não vasculhe `briefs/feitos/` em busca de trabalho.

### 2. Ler o brief por inteiro antes de tocar em qualquer arquivo

Leia o `.md` completo. Briefs costumam trazer, além do trabalho em si:

- **Arquivo(s) alvo** e escopo explícito
- **Fora de escopo** — respeite à risca; não faça trabalho não pedido
- **Restrições de estilo** que valem para todo o site
- **Uma seção "O que não fazer"**

Havendo mais de um pendente, execute na ordem de numeração do nome (`brief-01`, `brief-02`, …), um de cada vez.

### 3. Antes de escrever

- Leia o arquivo alvo inteiro para pegar o tom, o vocabulário e as convenções de marcação já usadas.
- Se o brief manda criar um padrão reutilizável (CSS, componente), **inspecione os estilos existentes primeiro** e siga as convenções do projeto (variáveis semânticas de `css/style.css`, nunca cor hard-coded).
- Correções pedidas como localizadas são localizadas: não reescreva seções que o brief não citou.

### 4. Regra dura sobre dados bibliográficos

**Nunca invente dado bibliográfico** — editora, ano, tradutor, volume, página, DOI. Se faltar algo e o brief não fornecer, deixe no HTML:

```html
<!-- VERIFICAR: dado faltante -->
```

e **liste esses pontos na resposta final ao usuário**. Não complete de memória, mesmo que pareça óbvio. O mesmo vale para qualquer afirmação factual que o brief não sustente: em caso de dúvida, pergunte em vez de improvisar.

Se o brief pedir uma decisão que pode ficar confusa para o leitor (por exemplo, consolidar duas referências numa só), e a instrução disser "me avise em vez de improvisar", **avise mesmo** — não escolha sozinho.

### 5. Verificar antes de concluir

Rode o que fizer sentido para o tipo de alteração:

- Âncoras e links internos resolvem (`#ref-N`, `#cite-N`, links entre páginas)
- Nenhuma classe CSS órfã (usada no HTML mas inexistente no CSS)
- Numeração das referências sequencial pela ordem de aparição, sem buracos nem repetições indevidas
- Página serve sem erro (`python -m http.server` + `curl -o /dev/null -w '%{http_code}'`)
- Se criou ou removeu páginas: `powershell -File scripts\gerar-sitemap.ps1`

### 6. Arquivar

Só depois de verificado:

```bash
mkdir -p briefs/feitos && git mv --force briefs/<arquivo>.md briefs/feitos/ 2>/dev/null || mv briefs/<arquivo>.md briefs/feitos/
```

(`mv` simples basta, já que a pasta é ignorada pelo git.)

### 7. Relatar

Na resposta final, cubra:

- O que foi alterado, arquivo por arquivo
- Os itens do brief que ficaram **pendentes** e por quê (ex.: `TODO` de link para texto que ainda não existe)
- Todos os `<!-- VERIFICAR -->` deixados, com o dado que falta em cada um
- Qualquer ponto em que você discordou do brief ou encontrou um problema nele — dizer isso é mais útil do que cumprir a instrução ao pé da letra e deixar um erro passar

## Nunca

- Commitar ou dar push (nem dos briefs, nem das alterações) sem o usuário pedir explicitamente.
- Versionar a pasta `briefs/` ou removê-la do `.gitignore`.
- Marcar um brief como feito sem ter verificado o resultado.
- Executar um brief que está em `briefs/feitos/`.
