
const supabaseUrl = 'https://vlihugczatpmnyjbdmqw.supabase.co';

const supabaseKey =
  'sb_publishable__QOgJ-nSBouPG9kcbpjcAA_MrcVuNqX';

const { createClient } = supabase;

const client = createClient(
  supabaseUrl,
  supabaseKey
);

const form = document.getElementById('feedback-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const rating = document.querySelector(
    'input[name="rating"]:checked'
  ).value;

  const message = document
    .getElementById('message')
    .value
    .trim();

  const email = document
    .getElementById('email')
    .value
    .trim();

  if (!message) {
    alert('Digite um comentário.');
    return;
  }

  const { error } = await client
    .from('feedbacks')
    .insert([
      {
        rating,
        message,
        email,
        page: window.location.pathname
      }
    ]);

  if (error) {
    console.error(error);

    alert('Erro ao enviar feedback.');

    return;
  }

  alert('Feedback enviado com sucesso!');

  form.reset();
});

