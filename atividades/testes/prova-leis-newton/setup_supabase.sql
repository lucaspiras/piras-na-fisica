-- =====================================================
-- Setup Supabase — Prova 3 de Física I (Leis de Newton e Forças)
-- Rode este arquivo inteiro no SQL Editor do Supabase.
--
-- Tabelas próprias desta prova: as três provas usam q1..q20 como chave,
-- então compartilhar tabela misturaria os gabaritos.
-- =====================================================

CREATE TABLE respostas_newton (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome_aluno text NOT NULL,
  palavra_secreta text NOT NULL,
  respostas jsonb NOT NULL,
  enviado_em timestamptz DEFAULT now()
);

-- O gabarito fica no banco, FORA do HTML: quem abrir o código da prova não o lê.
CREATE TABLE gabarito_newton (
  questao text PRIMARY KEY,
  resposta_correta text NOT NULL
);

INSERT INTO gabarito_newton (questao, resposta_correta) VALUES
  ('q1','b'),('q2','d'),('q3','a'),('q4','e'),('q5','c'),
  ('q6','a'),('q7','d'),('q8','b'),('q9','e'),('q10','c'),
  ('q11','c'),('q12','a'),('q13','e'),('q14','b'),('q15','d'),
  ('q16','e'),('q17','c'),('q18','a'),('q19','b'),('q20','d');

CREATE TABLE resultados_newton (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  resposta_id uuid REFERENCES respostas_newton(id),
  nome_aluno text NOT NULL,
  palavra_secreta text NOT NULL,
  acertos int NOT NULL,
  total int NOT NULL,
  detalhes jsonb NOT NULL,
  calculado_em timestamptz DEFAULT now()
);

-- =====================================================
-- Row Level Security
-- =====================================================
ALTER TABLE gabarito_newton   ENABLE ROW LEVEL SECURITY;
ALTER TABLE respostas_newton  ENABLE ROW LEVEL SECURITY;
ALTER TABLE resultados_newton ENABLE ROW LEVEL SECURITY;

CREATE POLICY "leitura publica do gabarito newton"
ON gabarito_newton FOR SELECT TO anon USING (true);

CREATE POLICY "aluno pode inserir respostas newton"
ON respostas_newton FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "sistema pode inserir resultados newton"
ON resultados_newton FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "aluno pode consultar proprio resultado newton"
ON resultados_newton FOR SELECT TO anon USING (true);
