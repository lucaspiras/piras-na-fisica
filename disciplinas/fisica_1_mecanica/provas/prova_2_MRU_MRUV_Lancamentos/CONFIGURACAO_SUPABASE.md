# Configuração — Prova Final de Física I (Cinemática) no Supabase

Esta prova usa o **mesmo projeto Supabase** já configurado para a prova de
Unidades de Medida e MRU, porém com **tabelas próprias** (`gabarito_cinematica`,
`respostas_cinematica`, `resultados_cinematica`). Isso é necessário porque as
duas provas usam as mesmas chaves de questão (`q1` a `q20`) e compartilhar a
tabela `gabarito` faria uma prova sobrescrever o gabarito da outra.

`SUPABASE_URL` e `SUPABASE_ANON_KEY` já estão preenchidos em `script.js` e
`consulta.js` com os mesmos valores do projeto existente — não é preciso
criar um novo projeto Supabase, só as tabelas novas abaixo.

## 1. Criar as tabelas no Supabase

Acesse seu projeto no [supabase.com](https://supabase.com), vá em **SQL Editor** e execute:

```sql
-- Respostas enviadas pelos alunos
CREATE TABLE respostas_cinematica (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome_aluno text NOT NULL,
  palavra_secreta text NOT NULL,
  respostas jsonb NOT NULL,
  enviado_em timestamptz DEFAULT now()
);

-- Gabarito (fica no banco, fora do HTML)
CREATE TABLE gabarito_cinematica (
  questao text PRIMARY KEY,
  resposta_correta text NOT NULL
);

-- Inserir gabarito (extraído da prova em PDF)
INSERT INTO gabarito_cinematica (questao, resposta_correta) VALUES
  ('q1','d'),('q2','b'),('q3','c'),('q4','d'),('q5','c'),
  ('q6','c'),('q7','c'),('q8','a'),('q9','e'),('q10','a'),
  ('q11','e'),('q12','d'),('q13','c'),('q14','a'),('q15','c'),
  ('q16','d'),('q17','b'),('q18','b'),('q19','d'),('q20','e');

-- Resultados calculados automaticamente após o envio
CREATE TABLE resultados_cinematica (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  resposta_id uuid REFERENCES respostas_cinematica(id),
  nome_aluno text NOT NULL,
  palavra_secreta text NOT NULL,
  acertos int NOT NULL,
  total int NOT NULL,
  detalhes jsonb NOT NULL,
  calculado_em timestamptz DEFAULT now()
);
```

---

## 2. Configurar permissões (Row Level Security)

No Supabase, vá em **Authentication → Policies** e habilite as seguintes políticas:

### Tabela `gabarito_cinematica`
```sql
CREATE POLICY "leitura publica do gabarito cinematica"
ON gabarito_cinematica FOR SELECT TO anon USING (true);
```

### Tabela `respostas_cinematica`
```sql
CREATE POLICY "aluno pode inserir respostas cinematica"
ON respostas_cinematica FOR INSERT TO anon WITH CHECK (true);
```

### Tabela `resultados_cinematica`
```sql
CREATE POLICY "sistema pode inserir resultados cinematica"
ON resultados_cinematica FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "aluno pode consultar proprio resultado cinematica"
ON resultados_cinematica FOR SELECT TO anon USING (true);
```

> A última política permite que `consulta_resultado.html` funcione (o aluno
> busca pelo próprio nome + palavra secreta). Se preferir que **só você**
> veja os resultados pelo painel do Supabase, não crie essa política de
> SELECT — nesse caso, remova ou não use `consulta_resultado.html`.

---

## 3. Como você (professor) recebe os resultados de forma independente

Você não depende do aluno te enviar nada: todo envio grava direto nas tabelas
`respostas_cinematica` e `resultados_cinematica` no Supabase assim que o botão
"Enviar respostas" é clicado.

- **Painel do Supabase** (mais simples): **Table Editor → resultados_cinematica**
  mostra nome, acertos, total e o detalhamento questão a questão de todos os
  alunos, em tempo real, sem depender da política de SELECT para `anon`.
- **Exportar tudo**: no Table Editor há um botão para exportar a tabela como
  CSV, útil para conferir a turma inteira de uma vez.

---

## 4. Testar localmente

Abra `prova_final_2026_01_primeira_etapa.html` diretamente no navegador (ou
use a extensão **Live Server** no VSCode). Preencha um nome, responda algumas
questões e clique em Enviar. Verifique no Supabase, em **Table Editor**, se
apareceram registros em `respostas_cinematica` e `resultados_cinematica`.

---

## 5. Hospedar a prova (opcional)

Para que o aluno acesse de qualquer lugar, hospede a pasta gratuitamente em:
- **Vercel** — arraste a pasta para [vercel.com/new](https://vercel.com/new)
- **Netlify** — arraste para [app.netlify.com](https://app.netlify.com)
- **GitHub Pages** — suba os arquivos para um repositório público e ative Pages

---

## Estrutura dos arquivos

```
/
├── prova_final_2026_01_primeira_etapa.html   ← arquivo da prova (abre no navegador)
├── consulta_resultado.html                    ← consulta de resultado (opcional para o aluno)
├── script.js                                  ← lógica de envio/correção da prova
├── consulta.js                                ← lógica de consulta de resultado
├── styles.css / consulta.css                  ← estilos (compartilhados com a prova de MRU)
├── logo_ifsul_horizontal.png
└── CONFIGURACAO_SUPABASE.md                   ← este arquivo
```
