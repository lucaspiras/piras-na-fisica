// quiz.js — Questões e motor do quiz — Eletrostática

(function () {
  'use strict';

  /* ══════════════════════════════════════════════
     BANCO DE QUESTÕES
  ══════════════════════════════════════════════ */
  const BANCO = {

    quiz1: [
      {
        tipo: 'obj',
        texto: 'A carga elétrica de um próton é igual a +1,6 × 10⁻¹⁹ C. Quantos prótons são necessários para obter uma carga total de 3,2 × 10⁻¹⁹ C?',
        opts: ['1 próton', '2 prótons', '4 prótons', '8 prótons'],
        certa: 1,
        explicacao: 'q = n · e → n = q / e = 3,2×10⁻¹⁹ / 1,6×10⁻¹⁹ = 2 prótons.'
      },
      {
        tipo: 'obj',
        texto: 'Dois corpos eletricamente carregados são aproximados um do outro e se repelem. Isso indica que:',
        opts: [
          'Um é positivo e o outro é negativo',
          'Os dois possuem cargas de mesmo sinal',
          'Um dos corpos está neutro',
          'Nenhuma das alternativas'
        ],
        certa: 1,
        explicacao: 'Cargas de mesmo sinal (ambos + ou ambos −) se repelem. Cargas de sinais opostos se atraem.'
      },
      {
        tipo: 'num',
        texto: 'Um corpo tem excesso de 5 × 10¹² elétrons. Sabendo que e = 1,6 × 10⁻¹⁹ C, qual é a carga elétrica desse corpo (em µC — microcoulombs)? Dê o valor como número negativo.',
        resposta: -800,
        tolerancia: 5,
        unidade: 'µC',
        explicacao: 'q = n · e = 5×10¹² × 1,6×10⁻¹⁹ = 8×10⁻⁷ C = −0,8 µC ≈ −800 nC. Atenção: 1 µC = 10⁻⁶ C → q = −0,8 µC. Se sua resposta foi −0,8 (em µC), está correto!'
      }
    ],

    quiz2: [
      {
        tipo: 'obj',
        texto: 'Uma caneta plástica esfregada no cabelo adquire carga negativa. Isso ocorre porque:',
        opts: [
          'O cabelo perdeu prótons para a caneta',
          'A caneta ganhou elétrons provenientes do cabelo',
          'A caneta perdeu elétrons para o cabelo',
          'Houve criação de novas cargas pelo atrito'
        ],
        certa: 1,
        explicacao: 'No atrito, elétrons são transferidos entre os corpos. A caneta ganhou elétrons do cabelo e ficou negativa. O cabelo ficou positivo. Não há criação de cargas — princípio da conservação.'
      },
      {
        tipo: 'obj',
        texto: 'Um bastão carregado positivamente toca uma esfera condutora neutra. Após o contato, a esfera fica:',
        opts: [
          'Com carga negativa',
          'Com carga positiva',
          'Neutra, pois não houve atrito',
          'Positiva somente na superfície de contato'
        ],
        certa: 1,
        explicacao: 'Na eletrização por contato, o condutor adquire carga de mesmo sinal do corpo que o tocou. O bastão positivo "rouba" elétrons da esfera, deixando-a positiva.'
      },
      {
        tipo: 'obj',
        texto: 'No processo de eletrização por indução (com aterramento), o corpo eletrizado fica com carga de sinal:',
        opts: [
          'Igual ao do indutor',
          'Oposto ao do indutor',
          'Nulo, pois não houve contato',
          'Depende do material do corpo'
        ],
        certa: 1,
        explicacao: 'Na indução com aterramento, o aterramento drena as cargas de mesmo sinal do indutor. As cargas de sinal oposto ficam retidas → corpo eletrizado com sinal oposto ao indutor.'
      }
    ],

    quiz3: [
      {
        tipo: 'obj',
        texto: 'Em um condutor em equilíbrio eletrostático, o campo elétrico em seu interior é:',
        opts: [
          'Muito intenso',
          'Igual ao campo externo',
          'Nulo',
          'Depende da forma do condutor'
        ],
        certa: 2,
        explicacao: 'Em equilíbrio eletrostático, as cargas se redistribuem até anular o campo interno. Por isso E = 0 dentro de um condutor em equilíbrio (princípio da Gaiola de Faraday).'
      },
      {
        tipo: 'obj',
        texto: 'Por que materiais isolantes não conduzem corrente elétrica?',
        opts: [
          'Porque possuem excesso de prótons',
          'Porque não possuem elétrons livres para se mover',
          'Porque repelem todas as cargas elétricas',
          'Porque possuem carga elétrica nula'
        ],
        certa: 1,
        explicacao: 'Condutores têm elétrons livres que se movem facilmente. Nos isolantes, os elétrons estão fortemente ligados aos átomos — não há portadores livres de carga.'
      },
      {
        tipo: 'obj',
        texto: 'Um para-raios aproveita o "efeito das pontas" do seguinte modo:',
        opts: [
          'A ponta conduz melhor porque é maior',
          'A maior curvatura concentra mais cargas, ionizando o ar e atraindo descargas',
          'A ponta reflete as descargas elétricas',
          'A ponta absorve a umidade do ar, prevenindo descargas'
        ],
        certa: 1,
        explicacao: 'Em condutores com geometria de ponta (alta curvatura), a densidade de carga superficial é maior. Isso ioniza o ar ao redor e cria um caminho condutor preferencial para a descarga atmosférica.'
      }
    ],

    quiz4: [
      {
        tipo: 'num',
        texto: 'Duas cargas de q₁ = 3 µC e q₂ = 4 µC estão separadas por r = 0,6 m no vácuo. Calcule a força elétrica entre elas em mN (mili-newtons). Use k = 9×10⁹ N·m²/C².',
        resposta: 300,
        tolerancia: 10,
        unidade: 'mN',
        explicacao: 'F = k·q₁·q₂/r² = 9×10⁹ × 3×10⁻⁶ × 4×10⁻⁶ / 0,36 = 108×10⁻³ / 0,36 = 0,3 N = 300 mN.'
      },
      {
        tipo: 'obj',
        texto: 'A força de Coulomb entre duas cargas é 12 N. Se as duas cargas forem dobradas e a distância mantida, a nova força será:',
        opts: ['12 N', '24 N', '48 N', '6 N'],
        certa: 2,
        explicacao: 'F ∝ q₁·q₂. Se q₁ → 2q₁ e q₂ → 2q₂: F\' = k·(2q₁)·(2q₂)/r² = 4·F = 4×12 = 48 N.'
      },
      {
        tipo: 'obj',
        texto: 'A Lei de Coulomb afirma que a força elétrica entre dois corpos carregados é:',
        opts: [
          'Diretamente proporcional à distância',
          'Inversamente proporcional ao produto das cargas',
          'Proporcional ao produto das cargas e inversamente proporcional ao quadrado da distância',
          'Independente da distância entre os corpos'
        ],
        certa: 2,
        explicacao: 'F = k·|q₁|·|q₂|/r². Portanto F ∝ q₁·q₂ (direta) e F ∝ 1/r² (inversa do quadrado da distância).'
      }
    ],

    quiz5: [
      {
        tipo: 'obj',
        texto: 'A força de Coulomb entre duas cargas é F. A distância é reduzida à metade, mantendo-se as cargas. A nova força será:',
        opts: ['F/4', 'F/2', '2F', '4F'],
        certa: 3,
        explicacao: 'F ∝ 1/r². Se r → r/2: F\' = k·q₁q₂/(r/2)² = 4·k·q₁q₂/r² = 4F.'
      },
      {
        tipo: 'num',
        texto: 'A força entre duas cargas é 90 N. Mantendo as cargas iguais, a que distância (em metros) a força será 10 N? A distância inicial era r₀ = 1 m.',
        resposta: 3,
        tolerancia: 0.1,
        unidade: 'm',
        explicacao: 'F₁/F₂ = r₂²/r₁² → 90/10 = r₂²/1² → r₂² = 9 → r₂ = 3 m.'
      },
      {
        tipo: 'obj',
        texto: 'Duas cargas de mesmo valor são separadas por 2 m com força F. Se uma carga for triplicada e a distância dobrada, a nova força é:',
        opts: ['3F/4', '3F/2', '3F', '12F'],
        certa: 0,
        explicacao: 'F\'/F = (3q·q)/(q·q) · (2/4)² = 3 · 1/4 = 3/4. Portanto F\' = 3F/4.'
      }
    ],

    quiz6: [
      {
        tipo: 'num',
        texto: 'Uma carga de Q = 8 µC gera um campo elétrico. A que distância r (em metros) o campo elétrico vale E = 2×10⁵ N/C? Use k = 9×10⁹.',
        resposta: 0.6,
        tolerancia: 0.05,
        unidade: 'm',
        explicacao: 'E = k·Q/r² → r² = k·Q/E = 9×10⁹·8×10⁻⁶/(2×10⁵) = 72000/200000 = 0,36 → r = 0,6 m.'
      },
      {
        tipo: 'obj',
        texto: 'Uma carga de prova positiva de 2 µC está em um ponto onde o campo elétrico é E = 3×10⁴ N/C. Qual a força elétrica sobre ela?',
        opts: ['0,06 N', '0,6 N', '6 N', '60 N'],
        certa: 0,
        explicacao: 'F = q·E = 2×10⁻⁶ × 3×10⁴ = 6×10⁻² = 0,06 N.'
      },
      {
        tipo: 'obj',
        texto: 'As linhas de campo elétrico ao redor de uma carga negativa são:',
        opts: [
          'Radiais, saindo da carga para fora',
          'Radiais, convergindo em direção à carga',
          'Paralelas e horizontais',
          'Circulares ao redor da carga'
        ],
        certa: 1,
        explicacao: 'O campo elétrico aponta na direção em que uma carga positiva seria empurrada. Em torno de uma carga negativa, ela atrairia a carga positiva → linhas convergem para a carga negativa.'
      }
    ],

    quiz7: [
      {
        tipo: 'obj',
        texto: 'O Princípio da Superposição das forças elétricas afirma que:',
        opts: [
          'A força sobre uma carga é a média das forças individuais',
          'A força sobre uma carga é a soma vetorial das forças exercidas por cada uma das demais',
          'Apenas a carga mais próxima exerce força',
          'A força resultante é sempre nula quando há mais de duas cargas'
        ],
        certa: 1,
        explicacao: 'Cada par de cargas interage independentemente. A força resultante sobre uma carga é a soma vetorial (com módulo, direção e sentido) de todas as forças individuais.'
      },
      {
        tipo: 'num',
        texto: 'Três cargas colineares: q₁ = +2 µC em x=0, q₂ = +2 µC em x=3m, q₃ = +1 µC em x=6m. A força sobre q₃ deve ser calculada. F₁₃ (repulsão de q₁): use k=9×10⁹. Qual o valor de F₁₃ em mN (mili-newtons)?',
        resposta: 0.5,
        tolerancia: 0.05,
        unidade: 'mN',
        explicacao: 'F₁₃ = k·q₁·q₃/r² = 9×10⁹ × 2×10⁻⁶ × 1×10⁻⁶ / 36 = 18×10⁻³/36 = 5×10⁻⁴ N = 0,5 mN.'
      },
      {
        tipo: 'obj',
        texto: 'Nesse mesmo problema (q₁=+2µC em x=0, q₂=+2µC em x=3m, q₃=+1µC em x=6m), a força resultante sobre q₃ aponta:',
        opts: [
          'Para a esquerda (sentido −x), pois q₂ é mais próxima e repele mais',
          'Para a direita (sentido +x), pois ambas repelem q₃ nesse sentido',
          'É nula, pois as duas forças se anulam',
          'Depende do sinal das cargas'
        ],
        certa: 1,
        explicacao: 'Ambas q₁ e q₂ são positivas e repelem q₃ (positiva). q₃ está à direita de ambas → as duas forças empurram q₃ para a direita (+x). A resultante aponta para a direita.'
      }
    ],

    quiz8: [
      {
        tipo: 'obj',
        texto: 'A Gaiola de Faraday é usada para proteger equipamentos eletrônicos sensíveis porque:',
        opts: [
          'Aquece o interior, afastando cargas externas',
          'O campo elétrico interno a um condutor fechado em equilíbrio é nulo',
          'Reflete todas as ondas eletromagnéticas',
          'Absorve as cargas elétricas externas'
        ],
        certa: 1,
        explicacao: 'Em um condutor fechado em equilíbrio, E = 0 internamente. Campos elétricos externos não penetram — princípio da Gaiola de Faraday. Usado em aviões, salas de servidores, MRI hospitalar etc.'
      },
      {
        tipo: 'obj',
        texto: 'Na pintura eletrostática, as partículas de tinta e o objeto a ser pintado possuem:',
        opts: [
          'Mesma carga — se repelem para cobrir toda a superfície',
          'Cargas opostas — a atração garante a adesão uniforme',
          'Ambos são neutros — apenas o jato de ar distribui a tinta',
          'A tinta é neutra e o objeto é carregado positivamente'
        ],
        certa: 1,
        explicacao: 'As partículas de tinta são carregadas (ex: negativamente) e o objeto é aterrado (positivo em relação). A atração coulombiana garante cobertura uniforme com mínimo desperdício.'
      },
      {
        tipo: 'obj',
        texto: 'O para-raios protege edificações aproveitando principalmente o princípio de:',
        opts: [
          'Eletrização por atrito — o vento esfrega o para-raios e neutraliza a nuvem',
          'Efeito das pontas — alta curvatura concentra cargas e ioniza o ar, criando caminho condutor para a descarga',
          'Gaiola de Faraday — o campo interno do edifício é nulo',
          'Eletrização por contato — o para-raios transfere carga para a nuvem'
        ],
        certa: 1,
        explicacao: 'O efeito das pontas faz com que o campo elétrico seja muito intenso nas extremidades do para-raios, ionizando o ar e tornando-o condutor. A descarga atmosférica é atraída para esse caminho e conduzida com segurança ao solo.'
      }
    ]

  };

  // Expõe banco de questões para geração de relatório
  window.EletroQuizData = BANCO;

  /* ══════════════════════════════════════════════
     ESTADO GLOBAL
  ══════════════════════════════════════════════ */
  window.EletroState = {
    answered: {},
    score: 0,
    total: 0
  };

  /* ══════════════════════════════════════════════
     RENDERIZA UM QUIZ
  ══════════════════════════════════════════════ */
  function renderQuiz(id, questoes) {
    const zona = document.getElementById(id);
    if (!zona) return;

    let html = `<div class="quiz-header">✦ Questões de verificação</div>`;

    questoes.forEach((q, i) => {
      const qid = `${id}_q${i}`;
      html += `<div class="q-block" id="qb_${qid}">`;
      html += `<span class="q-num">Questão ${i + 1}</span>`;
      html += `<p class="q-text">${q.texto}</p>`;

      if (q.tipo === 'obj') {
        const letras = ['A', 'B', 'C', 'D'];
        html += `<div class="opts">`;
        q.opts.forEach((op, oi) => {
          html += `<button class="opt-btn" data-qid="${qid}" data-oi="${oi}" data-certa="${q.certa}">
            <span class="opt-ltr">${letras[oi]}</span>${op}
          </button>`;
        });
        html += `</div>`;
      } else {
        html += `<div class="num-row">
          <input type="number" class="num-inp" id="ni_${qid}" placeholder="resposta" step="any"/>
          <span class="num-unit">${q.unidade}</span>
          <button class="ver-btn" data-qid="${qid}" data-resp="${q.resposta}" data-tol="${q.tolerancia}">Verificar</button>
        </div>`;
      }

      html += `<div class="fb" id="fb_${qid}"></div>`;
      html += `</div>`;
    });

    zona.innerHTML = html;
    window.EletroState.total += questoes.length;
    updatePlacar();
    bindEvents(zona, questoes);
  }

  /* ══════════════════════════════════════════════
     BIND EVENTOS
  ══════════════════════════════════════════════ */
  function bindEvents(zona, questoes) {

    zona.querySelectorAll('.opt-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const qid = this.dataset.qid;
        if (window.EletroState.answered[qid]) return;

        const oi = parseInt(this.dataset.oi);
        const certa = parseInt(this.dataset.certa);
        const acertou = oi === certa;

        zona.querySelectorAll(`[data-qid="${qid}"]`).forEach(b => b.disabled = true);
        this.classList.add(acertou ? 'correct' : 'wrong');
        if (!acertou) {
          zona.querySelectorAll(`[data-qid="${qid}"]`)[certa].classList.add('correct');
        }

        const qi = parseInt(qid.split('_q')[1]);
        mostrarFeedback(qid, acertou, questoes[qi].explicacao);
        registrar(qid, acertou, { type: 'obj', chosenText: questoes[qi].opts[oi], correctText: questoes[qi].opts[certa] });
      });
    });

    zona.querySelectorAll('.ver-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const qid = this.dataset.qid;
        if (window.EletroState.answered[qid]) return;

        const inp = document.getElementById(`ni_${qid}`);
        const val = parseFloat(inp.value);
        if (isNaN(val)) { mostrarFeedback(qid, false, 'Digite um número válido.'); return; }

        const resp = parseFloat(this.dataset.resp);
        const tol  = parseFloat(this.dataset.tol);
        const acertou = Math.abs(val - resp) <= tol;

        inp.disabled = true;
        this.disabled = true;

        const qi = parseInt(qid.split('_q')[1]);
        mostrarFeedback(qid, acertou, questoes[qi].explicacao);
        registrar(qid, acertou, { type: 'num', chosenValue: val, correctValue: resp, unit: questoes[qi].unidade || '' });
      });

      // Enter
      const qid = btn.dataset.qid;
      const inp = document.getElementById(`ni_${qid}`);
      if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') btn.click(); });
    });
  }

  /* ══════════════════════════════════════════════
     FEEDBACK
  ══════════════════════════════════════════════ */
  function mostrarFeedback(qid, acertou, exp) {
    const el = document.getElementById(`fb_${qid}`);
    if (!el) return;
    el.className = 'fb show ' + (acertou ? 'certo' : 'erro');
    el.innerHTML = `<strong>${acertou ? '✓ Correto!' : '✗ Incorreto.'}</strong> ${exp}`;
  }

  /* ══════════════════════════════════════════════
     PLACAR
  ══════════════════════════════════════════════ */
  function registrar(qid, acertou, extra) {
    window.EletroState.answered[qid] = Object.assign({ acertou }, extra || {});
    if (acertou) window.EletroState.score++;
    updatePlacar();
  }

  function updatePlacar() {
    const scoreEl = document.getElementById('p-score');
    const totalEl = document.getElementById('p-total');
    const msgEl   = document.getElementById('p-msg');
    const ring    = document.getElementById('ringCircle');
    if (!scoreEl) return;

    scoreEl.textContent = window.EletroState.score;
    totalEl.textContent = window.EletroState.total;

    const answered = Object.keys(window.EletroState.answered).length;
    const pct = window.EletroState.total > 0
      ? window.EletroState.score / window.EletroState.total
      : 0;

    // Anel SVG: circunferência = 2π·42 ≈ 264
    if (ring) {
      const offset = 264 - pct * 264;
      ring.style.strokeDashoffset = offset;
      ring.style.transition = 'stroke-dashoffset .5s ease';
    }

    if (answered === 0) {
      msgEl.textContent = 'Responda as questões para ver seu desempenho.';
    } else if (answered < window.EletroState.total) {
      msgEl.textContent = `${answered} de ${window.EletroState.total} questões respondidas — continue!`;
    } else {
      const p = Math.round(pct * 100);
      if (p >= 90) msgEl.textContent = `${p}% — Excelente! Você dominou a Eletrostática! ⚡`;
      else if (p >= 70) msgEl.textContent = `${p}% — Muito bom! Revise os pontos em que errou.`;
      else if (p >= 50) msgEl.textContent = `${p}% — Razoável. Vale rever os tópicos mais difíceis.`;
      else msgEl.textContent = `${p}% — Continue estudando e tente novamente!`;
    }
  }

  /* ══════════════════════════════════════════════
     RESET
  ══════════════════════════════════════════════ */
  window.EletroReset = function () {
    window.EletroState.answered = {};
    window.EletroState.score = 0;
    window.EletroState.total = 0;
    initAll();
    updatePlacar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ══════════════════════════════════════════════
     INIT
  ══════════════════════════════════════════════ */
  function initAll() {
    Object.keys(BANCO).forEach(id => renderQuiz(id, BANCO[id]));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();
