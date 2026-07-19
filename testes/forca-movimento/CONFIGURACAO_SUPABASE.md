# Configuração — Teste sobre Mecânica (força e movimento)

Projeto Supabase: **`ksxaxkqnooercwndpdut`** (o mesmo das provas).
As tabelas usam o prefixo **`fm_`** para não se misturar com as da prova de MRU
(`respostas`, `gabarito`, `resultados`).

Rode todo o SQL abaixo no **SQL Editor** do Supabase, na ordem.

---

## 1. Tabelas

```sql
-- Gabarito (fica no banco, fora do HTML — o aluno não consegue ler as respostas certas)
create table if not exists fm_gabarito (
  questao          text primary key,
  resposta_correta text not null
);

-- Respostas enviadas
create table if not exists fm_respostas (
  id              uuid primary key default gen_random_uuid(),
  nome            text not null,
  professor       text,
  instituicao     text,
  curso_turma     text,
  palavra_secreta text not null,
  respostas       jsonb not null,
  enviado_em      timestamptz not null default now()
);

-- Resultados calculados no envio
create table if not exists fm_resultados (
  id              uuid primary key default gen_random_uuid(),
  resposta_id     uuid references fm_respostas(id) on delete cascade,
  nome            text not null,
  palavra_secreta text not null,
  acertos         int  not null,
  total           int  not null,
  detalhes        jsonb not null,
  calculado_em    timestamptz not null default now()
);

create index if not exists fm_resultados_busca_idx
  on fm_resultados (lower(nome), lower(palavra_secreta));
```

## 2. Gabarito

Conferido com o professor em 19/07/2026.

```sql
insert into fm_gabarito (questao, resposta_correta) values
  ('q1','c'),  -- só o peso, para baixo (bola subindo)
  ('q2','d'),  -- só o peso, no ponto mais alto (não é força nula)
  ('q3','a'),  -- só o peso, para baixo (bola descendo)
  ('q4','c'),  -- "é constante mas maior do que a força de atrito"
  ('q5','e'),  -- única seta apontando para o centro da Terra
  ('q6','b'),  -- tração ao longo do fio (para o centro) + peso, ambas para baixo
  ('q7','a'),  -- "com velocidade que aumenta"
  ('q8','b'),  -- "aumenta"
  ('q9','c'),  -- "continuará se movimentando com velocidade constante"
  ('q10','b'), -- "com velocidade que aumenta"
  ('q11','a'), -- "aumenta"
  ('q12','c'), -- "continuará subindo com velocidade constante"
  ('q13','a'), -- "continuará descendo com velocidade constante"
  ('q14','b'), -- "continua a descer... com velocidade que diminui"
  ('q15','b'), -- peso constante nos três pontos
  ('q16','c'), -- atrito para trás em A e B; nada em C (repouso)
  ('q17','d'), -- só o peso (subida)
  ('q18','a'), -- só o peso (ponto mais alto)
  ('q19','e')  -- só o peso (descida)
on conflict (questao) do update set resposta_correta = excluded.resposta_correta;
```

## 3. RLS (Row Level Security)

```sql
alter table fm_gabarito   enable row level security;
alter table fm_respostas  enable row level security;
alter table fm_resultados enable row level security;

-- O teste precisa ler o gabarito para corrigir no envio.
drop policy if exists fm_gabarito_leitura on fm_gabarito;
create policy fm_gabarito_leitura
  on fm_gabarito for select to anon using (true);

-- Qualquer respondente pode gravar a própria resposta e o próprio resultado…
drop policy if exists fm_respostas_insert on fm_respostas;
create policy fm_respostas_insert
  on fm_respostas for insert to anon with check (true);

drop policy if exists fm_resultados_insert on fm_resultados;
create policy fm_resultados_insert
  on fm_resultados for insert to anon with check (true);

-- …mas NÃO existe policy de SELECT em fm_respostas / fm_resultados.
-- A consulta do próprio resultado passa pela função da seção 4.
```

## 4. Consulta protegida do resultado

Sem esta função, para o aluno consultar o resultado seria preciso liberar `SELECT` em
`fm_resultados` — o que permitiria a qualquer pessoa **listar os resultados de todos**.
A função abaixo roda como dona da tabela (`security definer`) e só devolve a linha quando
**nome e palavra secreta conferem**.

```sql
create or replace function fm_consultar_resultado(p_nome text, p_palavra text)
returns table (
  nome text, acertos int, total int, detalhes jsonb, calculado_em timestamptz
)
language sql
security definer
set search_path = public
as $$
  select r.nome, r.acertos, r.total, r.detalhes, r.calculado_em
  from fm_resultados r
  where lower(trim(r.nome))            = lower(trim(p_nome))
    and lower(trim(r.palavra_secreta)) = lower(trim(p_palavra))
  order by r.calculado_em desc
  limit 1;
$$;

grant execute on function fm_consultar_resultado(text, text) to anon;
```

---

## 5. Ver as respostas da turma (professor)

No **Table Editor** do Supabase:

- **`fm_respostas`** — quem respondeu (nome, professor, instituição, curso/turma) e o que marcou
  em cada questão (coluna `respostas`, no formato `{"q1":"c","q2":"d",...}`).
- **`fm_resultados`** — acertos por respondente e o detalhamento questão a questão
  (coluna `detalhes`: `{"q1":{"marcada":"c","correta":"c","acertou":true}, ...}`).

Consulta útil — desempenho por questão (quantos acertaram cada uma):

```sql
select chave as questao,
       count(*) filter (where (valor->>'acertou')::boolean) as acertos,
       count(*) as respondentes
from fm_resultados, lateral jsonb_each(detalhes) as t(chave, valor)
group by chave
order by length(chave), chave;
```

---

## Estrutura dos arquivos

```
teste_forca_movimento_lang/
├── index.html              ← o teste
├── consulta.html           ← consulta do próprio resultado
├── questoes.js             ← as 19 questões (usado pelas duas páginas)
├── teste.js                ← renderização + envio
├── consulta.js             ← busca + exibição do resultado
├── styles.css
├── CONFIGURACAO_SUPABASE.md ← este arquivo
└── *.jpg                   ← figuras e alternativas em imagem
```
