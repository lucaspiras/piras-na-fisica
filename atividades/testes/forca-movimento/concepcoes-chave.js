/* =============================================================
   Teste sobre Mecânica — chave conceitual
   Respostas previstas pela concepção aristotélica de movimento, questão a questão.

   Este arquivo é carregado APENAS pela consulta de resultado
   (consulta.html) e pela página das concepções (concepcoes.html).
   NÃO é carregado por index.html (a prova), para não expor nenhuma
   pista de resposta a quem ainda está respondendo.

   Campos por questão:
     aristoteles → LISTA de respostas da família aristotélica / senso comum
                   (o movimento exige uma força no seu sentido; a velocidade
                   acompanha a força resultante). Uma questão pode ter várias:
                   são visões aparentadas, com diferenças, por exemplo, sobre
                   como a gravidade entra no desenho. A 1ª da lista é a "central".
     impeto      → (opcional) qual dessas respostas é, especificamente, a da
                   teoria medieval do ímpeto: o corpo mantém o movimento por
                   algum tempo e só depois para (em vez de parar de imediato,
                   como diria o Aristóteles estrito). Sempre também aparece
                   dentro da lista `aristoteles`.

   A resposta newtoniana (gabarito) não fica aqui — ela vem do servidor e já
   está gravada em `detalhes[qN].correta` de cada resultado.

   Observação: a Q3 (bola descendo) inclui a resposta 'a', que é a mesma da
   física newtoniana — nela as duas concepções concordam (só o peso). A 'c'
   (duas setas para baixo: peso + "velocidade") é a versão distintamente
   aristotélica.
   ============================================================= */

const CONCEPCOES = {
  q1:  { aristoteles: ['d', 'b'] },        // d: força ↑ maior que o peso · b: duas forças ↑ (soma > peso), visão deturpada
  q2:  { aristoteles: ['b', 'e'] },        // topo: b equilíbrio (↑ = ↓) · e força nula
  q3:  { aristoteles: ['a', 'c'] },        // a: só o peso (= Newton) · c: peso + "velocidade" (duas setas ↓)
  q4:  { aristoteles: ['b'] },             // força maior que o atrito e crescendo
  q5:  { aristoteles: ['a', 'b', 'd'] },   // força na direção do movimento; a/b sem gravidade, d com gravidade (centrípeta)
  q6:  { aristoteles: ['d', 'c', 'e'] },   // d: peso + tensão + velocidade · c/e: outras versões aristotélicas
  q7:  { aristoteles: ['b'] },             // F pouco > atrito → velocidade pequena e constante
  q8:  { aristoteles: ['a'] },             // reduz F → velocidade diminui
  q9:  { aristoteles: ['b', 'a'], impeto: 'a' }, // b: para imediatamente (estrito) · a: continua e para (ímpeto)
  q10: { aristoteles: ['c'] },             // F pouco > peso → velocidade pequena e constante
  q11: { aristoteles: ['b'] },             // reduz F → velocidade diminui
  q12: { aristoteles: ['a', 'b'], impeto: 'b' }, // a: para imediatamente (estrito) · b: continua e para (ímpeto)
  q13: { aristoteles: ['b', 'c'], impeto: 'c' }, // b: para imediatamente (estrito) · c: continua e para (ímpeto)
  q14: { aristoteles: ['a', 'c'] },        // a: sobe imediatamente · c: para na hora e depois sobe
  q15: { aristoteles: ['a'] },             // lançada p/ baixo → força cresce (setas crescentes)
  q16: { aristoteles: ['a', 'd'] },        // força no sentido do movimento + atrito (duas versões)
  q17: { aristoteles: ['a'] },             // oblíqua subindo → força no sentido do movimento + peso
  q18: { aristoteles: ['d'] },             // oblíqua no topo → força no sentido do movimento + peso
  q19: { aristoteles: ['d'] }              // oblíqua descendo → força no sentido do movimento + peso
};
