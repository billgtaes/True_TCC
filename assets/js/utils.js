const API_BASE = 'http://localhost:8080';

/** Redireciona o usuário com um pequeno estado de carregamento no botão.
 * @param {HTMLButtonElement} botao
 * @param {string} destino
 * @param {HTMLDivElement} btnTexto
 */
function navegarCom(botao, destino) {
  botao.addEventListener("click", () => {
    botao.disabled = true;
    setTimeout(() => {
      window.location.href = destino;
    }, 80);
  })
}

/** Fazer toggle-senha
 * @param {HTMLButtonElement} botao
 * @param {HTMLInputElement} input
 */
function toggleSenha(botao, input) {
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

  botao.innerHTML = SVG_OLHO_ABERTO;

  botao.addEventListener('click', () => {
  const visivel = input.type === 'text';
  input.type = visivel ? 'password' : 'text';
  botao.innerHTML = visivel ? SVG_OLHO_ABERTO : SVG_OLHO_FECHADO;
});
}

/* --- Conexão com a API -------------------------- */
async function apiPost(endpoint, dados) {
  const resposta = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
  });

  let conteudo;

  try {
    conteudo = await resposta.json();
  } catch {
    conteudo = await resposta.text();
  }

  if (!resposta.ok) {
    throw new Error(
      typeof conteudo === 'string' ? conteudo : 'Erro ao comunicar com o servidor.'
    );
  }

  return conteudo;
}

async function apiGet(endpoint) {
  const resposta = await fetch(`${API_BASE}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  let conteudo;

  try {
    conteudo = await resposta.json();
  } catch {
    conteudo = await resposta.text();
  }

  if (!resposta.ok) {
    throw new Error(
      typeof conteudo === 'string'? conteudo : 'Erro ao comunicar com o servidor.'
    );
  }

  return conteudo;
}