# Configuração — Prova Online com Supabase

## 1. Criar as tabelas no Supabase

Acesse seu projeto no [supabase.com](https://supabase.com), vá em **SQL Editor** e execute:

```sql
-- Respostas enviadas pelos alunos
CREATE TABLE respostas (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome_aluno text NOT NULL,
  respostas jsonb NOT NULL,
  enviado_em timestamptz DEFAULT now()
);

-- Gabarito (fica no banco, fora do HTML)
CREATE TABLE gabarito (
  questao text PRIMARY KEY,
  resposta_correta text NOT NULL
);

-- Inserir gabarito
INSERT INTO gabarito (questao, resposta_correta) VALUES
  ('q1','b'),('q2','a'),('q3','b'),('q4','c'),('q5','c'),
  ('q6','b'),('q7','b'),('q8','b'),('q9','b'),('q10','b'),
  ('q11','b'),('q12','c'),('q13','d'),('q14','c'),('q15','b'),
  ('q16','c'),('q17','b'),('q18','a'),('q19','d'),('q20','b');

-- Resultados calculados automaticamente após o envio
CREATE TABLE resultados (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  resposta_id uuid REFERENCES respostas(id),
  nome_aluno text NOT NULL,
  acertos int NOT NULL,
  total int NOT NULL,
  detalhes jsonb NOT NULL,
  calculado_em timestamptz DEFAULT now()
);
```

---

## 2. Configurar permissões (Row Level Security)

No Supabase, vá em **Authentication → Policies** e habilite as seguintes políticas para cada tabela:

### Tabela `gabarito`
- Permissão: **SELECT** para `anon` (o HTML precisa ler o gabarito)
```sql
CREATE POLICY "leitura publica do gabarito"
ON gabarito FOR SELECT TO anon USING (true);
```

### Tabela `respostas`
- Permissão: **INSERT** para `anon`
```sql
CREATE POLICY "aluno pode inserir respostas"
ON respostas FOR INSERT TO anon WITH CHECK (true);
```

### Tabela `resultados`
- Permissão: **INSERT** para `anon`
```sql
CREATE POLICY "sistema pode inserir resultados"
ON resultados FOR INSERT TO anon WITH CHECK (true);
```

> ⚠️ Não dê SELECT em `resultados` para `anon` — assim o aluno não consegue consultar o resultado pelo HTML.

---

## 3. Conectar o HTML

Abra o arquivo `prova_online_acessivel.html` no VSCode e localize o bloco no topo do `<script>`:

```js
const SUPABASE_URL = 'COLE_SUA_URL_AQUI';
const SUPABASE_ANON_KEY = 'COLE_SUA_CHAVE_AQUI';
```

Substitua pelos valores encontrados em **Project Settings → API**:
- **Project URL** → cole em `SUPABASE_URL`
- **anon / public key** → cole em `SUPABASE_ANON_KEY`

---

## 4. Testar localmente

Abra o HTML diretamente no navegador (ou use a extensão **Live Server** no VSCode).
Preencha um nome, responda algumas questões e clique em Enviar.

Verifique no Supabase em **Table Editor** se apareceram registros nas tabelas `respostas` e `resultados`.

---

## 5. Ver os resultados dos alunos

No Supabase, acesse **Table Editor → resultados**. Você verá:

| nome_aluno | acertos | total | calculado_em | detalhes |
|---|---|---|---|---|
| João Silva | 15 | 20 | 2025-... | { q1: {marcada:'b', correta:'b', acertou:true}, ... } |

A coluna `detalhes` mostra questão a questão o que o aluno marcou e se acertou.

---

## 6. Hospedar a prova (opcional)

Para que o aluno acesse de qualquer lugar, você pode hospedar o HTML gratuitamente em:
- **Vercel** — arraste a pasta do projeto para [vercel.com/new](https://vercel.com/new)
- **Netlify** — arraste para [app.netlify.com](https://app.netlify.com)
- **GitHub Pages** — suba o arquivo para um repositório público e ative Pages nas configurações

---

## Estrutura dos arquivos

```
/
├── prova_online_acessivel.html   ← arquivo da prova (abre no navegador)
└── CONFIGURACAO_SUPABASE.md      ← este arquivo
```
