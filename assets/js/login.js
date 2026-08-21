// SVGs do botão de visibilidade de senha
const SVG_OLHO_ABERTO = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>`;

const SVG_OLHO_FECHADO = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>`;


/* --- Elementos -------------------------------------------- */
const btnVoltar       = document.getElementById('btn-voltar');
const btnToggleSenha  = document.getElementById('toggle-senha');
const inputSenha      = document.getElementById('senha');
const inputEmail      = document.getElementById('email');
const formulario      = document.getElementById('form-login');
const btnEntrar       = document.getElementById('btn-entrar');
const erro            = document.querySelector('.erro');


/* --- Voltar para a página inicial -------------------------- */
navegarCom(btnVoltar, 'index.html');


/* --- Mostrar / ocultar senha ------------------------------ */
btnToggleSenha.innerHTML = SVG_OLHO_ABERTO;

btnToggleSenha.addEventListener('click', () => {
  const visivel = inputSenha.type === 'text';
  inputSenha.type = visivel ? 'password' : 'text';
  btnToggleSenha.innerHTML = visivel ? SVG_OLHO_ABERTO : SVG_OLHO_FECHADO;
  btnToggleSenha.setAttribute('aria-label', visivel ? 'Mostrar senha' : 'Ocultar senha');
});


/* --- Submit do formulário ------------------------------ */
formulario.addEventListener('submit', async (event) => {
  event.preventDefault();

  erro.style.display = 'none';

  const email = inputEmail.value.trim();
  const senha = inputSenha.value;

  if (email === "" || senha === "") {
    erro.textContent = 'Preencha todos os campos.';
    erro.style.display = 'block';
    return;
  } else 

  try {
    btnEntrar.disabled = true;

    const resposta = await apiPost('/auth/login', {email, senha});

    localStorage.setItem('token', resposta.token);
    localStorage.setItem('email', resposta.email);

    window.location.href = 'dashboard.html';

  } catch (e) {
    erro.textContent = e.message;
    erro.style.display = 'block';
  } finally {
    btnEntrar.disabled = false;
  }
});