-- =====================================================
-- Setup Supabase — Prova Final de Física I (Cinemática)
-- Rode este arquivo inteiro no SQL Editor do Supabase.
-- =====================================================

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

-- =====================================================
-- Row Level Security (RLS)
-- =====================================================

ALTER TABLE gabarito_cinematica ENABLE ROW LEVEL SECURITY;
ALTER TABLE respostas_cinematica ENABLE ROW LEVEL SECURITY;
ALTER TABLE resultados_cinematica ENABLE ROW LEVEL SECURITY;

-- gabarito_cinematica: o HTML da prova precisa ler o gabarito para corrigir
CREATE POLICY "leitura publica do gabarito cinematica"
ON gabarito_cinematica FOR SELECT TO anon USING (true);

-- respostas_cinematica: o aluno precisa gravar suas respostas
CREATE POLICY "aluno pode inserir respostas cinematica"
ON respostas_cinematica FOR INSERT TO anon WITH CHECK (true);

-- resultados_cinematica: o sistema grava o resultado calculado
CREATE POLICY "sistema pode inserir resultados cinematica"
ON resultados_cinematica FOR INSERT TO anon WITH CHECK (true);

-- resultados_cinematica: permite consulta_resultado.html buscar por nome + palavra secreta
CREATE POLICY "aluno pode consultar proprio resultado cinematica"
ON resultados_cinematica FOR SELECT TO anon USING (true);
