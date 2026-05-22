/**
 * feedback-modal.js — Modal de feedback reutilizável para os Programas
 * Inclua este script no final do <body> de qualquer programa.
 * Adicione um botão com onclick="FeedbackModal.open()" para abrir.
 */

const FeedbackModal = (() => {
  const SUPABASE_URL = 'https://vlihugczatpmnyjbdmqw.supabase.co';
  const SUPABASE_KEY = 'sb_publishable__QOgJ-nSBouPG9kcbpjcAA_MrcVuNqX';

  let supabaseClient = null;

  // ── CSS ─────────────────────────────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('fb-modal-styles')) return;
    const style = document.createElement('style');
    style.id = 'fb-modal-styles';
    style.textContent = `
      /* Trigger button */
      .fb-trigger {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 3px 12px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.03em;
        border: 1.5px solid #6a2fe8;
        color: #6a2fe8;
        background: transparent;
        cursor: pointer;
        font-family: inherit;
        text-transform: uppercase;
        transition: background 0.15s, color 0.15s;
        white-space: nowrap;
        line-height: 1.6;
      }
      .fb-trigger:hover {
        background: #6a2fe8;
        color: #fff;
      }

      /* Overlay */
      .fb-overlay {
        display: none;
        position: fixed;
        inset: 0;
        background: rgba(15, 20, 50, 0.55);
        backdrop-filter: blur(3px);
        z-index: 9999;
        align-items: center;
        justify-content: center;
        padding: 1rem;
      }
      .fb-overlay.fb-open {
        display: flex;
      }

      /* Card */
      .fb-card {
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        width: 100%;
        max-width: 460px;
        animation: fb-slide-in 0.2s ease;
        overflow: hidden;
      }
      @keyframes fb-slide-in {
        from { opacity: 0; transform: translateY(-16px) scale(0.97); }
        to   { opacity: 1; transform: translateY(0)  scale(1); }
      }

      /* Header do card */
      .fb-card-header {
        display: flex;
        align-items: center;
        gap: 0.7rem;
        padding: 1.1rem 1.4rem 0.9rem;
        border-bottom: 1.5px solid #f0f0f0;
      }
      .fb-card-header-icon { font-size: 1.5rem; flex-shrink: 0; }
      .fb-card-header-text { flex: 1; }
      .fb-card-header-text h2 {
        margin: 0;
        font-size: 1.05rem;
        font-weight: 700;
        color: #1e2a78;
        font-family: inherit;
      }
      .fb-card-header-text p {
        margin: 0.15rem 0 0;
        font-size: 0.82rem;
        color: #666;
        font-family: inherit;
      }
      .fb-close {
        background: none;
        border: none;
        font-size: 1.3rem;
        color: #999;
        cursor: pointer;
        padding: 4px 6px;
        border-radius: 6px;
        line-height: 1;
        transition: background 0.15s, color 0.15s;
        flex-shrink: 0;
      }
      .fb-close:hover { background: #f5f5f5; color: #333; }

      /* Body do card */
      .fb-card-body { padding: 1.2rem 1.4rem 0; }
      .fb-form-group { margin-bottom: 1rem; }
      .fb-form-group label {
        display: block;
        font-size: 0.85rem;
        font-weight: 600;
        color: #444;
        margin-bottom: 0.4rem;
        font-family: inherit;
      }
      .fb-radio-row { display: flex; gap: 1.2rem; }
      .fb-radio-row label {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        font-weight: 400;
        cursor: pointer;
      }
      .fb-form-group textarea {
        width: 100%;
        box-sizing: border-box;
        padding: 0.6rem 0.8rem;
        border: 1.5px solid #d1d5db;
        border-radius: 8px;
        font-size: 0.93rem;
        font-family: inherit;
        resize: vertical;
        min-height: 90px;
        transition: border-color 0.15s, box-shadow 0.15s;
        background: #f9fafb;
        color: #1f2933;
      }
      .fb-form-group textarea:focus {
        outline: none;
        border-color: #6a2fe8;
        box-shadow: 0 0 0 3px rgba(106,47,232,0.12);
        background: #fff;
      }
      .fb-form-group input[type="email"] {
        width: 100%;
        box-sizing: border-box;
        padding: 0.55rem 0.8rem;
        border: 1.5px solid #d1d5db;
        border-radius: 8px;
        font-size: 0.93rem;
        font-family: inherit;
        transition: border-color 0.15s, box-shadow 0.15s;
        background: #f9fafb;
        color: #1f2933;
      }
      .fb-form-group input[type="email"]:focus {
        outline: none;
        border-color: #6a2fe8;
        box-shadow: 0 0 0 3px rgba(106,47,232,0.12);
        background: #fff;
      }
      .fb-note {
        font-size: 0.78rem;
        color: #999;
        margin: -0.4rem 0 1rem;
        font-family: inherit;
      }

      /* Footer do card */
      .fb-card-footer { padding: 0.8rem 1.4rem 1.3rem; }
      .fb-submit {
        width: 100%;
        padding: 0.65rem 1rem;
        background: linear-gradient(90deg, #2f5bea, #6a2fe8);
        color: #fff;
        border: none;
        border-radius: 8px;
        font-size: 0.97rem;
        font-weight: 700;
        font-family: inherit;
        cursor: pointer;
        transition: opacity 0.15s, transform 0.1s;
      }
      .fb-submit:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
      .fb-submit:disabled { opacity: 0.6; cursor: not-allowed; }
      .fb-msg {
        margin-top: 0.7rem;
        padding: 0.55rem 0.9rem;
        border-radius: 8px;
        font-size: 0.88rem;
        font-family: inherit;
        display: none;
      }
      .fb-msg.ok {
        display: block;
        background: #f0fdf4;
        border: 1.5px solid #86efac;
        color: #166534;
      }
      .fb-msg.err {
        display: block;
        background: #fff1f2;
        border: 1.5px solid #fecdd3;
        color: #9f1239;
      }
    `;
    document.head.appendChild(style);
  }

  // ── HTML ─────────────────────────────────────────────────────────────────────
  function injectHTML() {
    if (document.getElementById('fb-overlay')) return;
    const el = document.createElement('div');
    el.innerHTML = `
      <div id="fb-overlay" class="fb-overlay" role="dialog" aria-modal="true" aria-labelledby="fb-title">
        <div class="fb-card">
          <div class="fb-card-header">
            <span class="fb-card-header-icon" aria-hidden="true">💬</span>
            <div class="fb-card-header-text">
              <h2 id="fb-title">Deixe sua opinião</h2>
              <p>Crítica, sugestão ou elogio — tudo é bem-vindo.</p>
            </div>
            <button class="fb-close" id="fb-close-btn" aria-label="Fechar">✕</button>
          </div>
          <div class="fb-card-body">
            <form id="fb-form" novalidate>
              <div class="fb-form-group">
                <label>Você curtiu?</label>
                <div class="fb-radio-row">
                  <label><input type="radio" name="fb-rating" value="Sim" checked> Sim</label>
                  <label><input type="radio" name="fb-rating" value="Não"> Não</label>
                </div>
              </div>
              <div class="fb-form-group">
                <label for="fb-message">Comentário, crítica ou sugestão</label>
                <textarea id="fb-message" placeholder="O que você achou? Como podemos melhorar?" required></textarea>
              </div>
              <div class="fb-form-group">
                <label for="fb-email">E-mail (opcional)</label>
                <input id="fb-email" type="email" placeholder="seu@email.com">
              </div>
              <p class="fb-note">Seu e-mail só será usado se quiser receber uma resposta.</p>
            </form>
          </div>
          <div class="fb-card-footer">
            <button class="fb-submit" id="fb-submit-btn" type="button">Enviar feedback</button>
            <div class="fb-msg" id="fb-msg"></div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(el.firstElementChild);
    bindEvents();
  }

  // ── Supabase (lazy) ──────────────────────────────────────────────────────────
  function loadSupabase() {
    return new Promise((resolve, reject) => {
      if (supabaseClient) { resolve(); return; }
      if (document.getElementById('fb-supabase-sdk')) {
        waitForSupabase(resolve, reject);
        return;
      }
      const s = document.createElement('script');
      s.id = 'fb-supabase-sdk';
      s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      s.onload = () => waitForSupabase(resolve, reject);
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function waitForSupabase(resolve, reject, attempts = 0) {
    if (window.supabase) {
      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
      resolve();
    } else if (attempts < 20) {
      setTimeout(() => waitForSupabase(resolve, reject, attempts + 1), 100);
    } else {
      reject(new Error('Supabase SDK não carregou.'));
    }
  }

  // ── Eventos ──────────────────────────────────────────────────────────────────
  function bindEvents() {
    const overlay = document.getElementById('fb-overlay');
    const closeBtn = document.getElementById('fb-close-btn');
    const submitBtn = document.getElementById('fb-submit-btn');

    closeBtn.addEventListener('click', close);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('fb-open')) close();
    });

    submitBtn.addEventListener('click', handleSubmit);
  }

  async function handleSubmit() {
    const msg = document.getElementById('fb-msg');
    const submitBtn = document.getElementById('fb-submit-btn');
    const message = document.getElementById('fb-message').value.trim();
    const email = document.getElementById('fb-email').value.trim();
    const rating = document.querySelector('input[name="fb-rating"]:checked').value;

    msg.className = 'fb-msg';
    msg.textContent = '';

    if (!message) {
      msg.className = 'fb-msg err';
      msg.textContent = 'Por favor, escreva um comentário antes de enviar.';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando…';

    try {
      await loadSupabase();
      const { error } = await supabaseClient.from('feedbacks').insert([{
        rating,
        message,
        email: email || null,
        page: window.location.pathname
      }]);

      if (error) throw error;

      msg.className = 'fb-msg ok';
      msg.textContent = 'Obrigado! Feedback enviado com sucesso.';
      document.getElementById('fb-form').reset();
      setTimeout(close, 2200);
    } catch (err) {
      console.error('Feedback error:', err);
      msg.className = 'fb-msg err';
      msg.textContent = 'Erro ao enviar. Tente novamente.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar feedback';
    }
  }

  // ── API pública ──────────────────────────────────────────────────────────────
  function open() {
    injectStyles();
    injectHTML();
    const overlay = document.getElementById('fb-overlay');
    overlay.classList.add('fb-open');
    document.getElementById('fb-message').focus();
  }

  function close() {
    const overlay = document.getElementById('fb-overlay');
    if (overlay) overlay.classList.remove('fb-open');
  }

  injectStyles();

  return { open, close };
})();
