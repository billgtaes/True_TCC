/* --- Elementos -------------------------------------------- */
const btnVoltar             = document.getElementById('btn-voltar');
const btnToggleSenha        = document.getElementById('toggle-senha');
const inputNome             = document.getElementById('nome');
const inputEmail            = document.getElementById('email');
const inputCPF              = document.getElementById('cpf');
const inputCelular          = document.getElementById('celular');
const btnToggleConfirmSenha = document.getElementById('toggle-confirm-senha');
const inputSenha            = document.getElementById('senha');
const inputConfirmSenha     = document.getElementById('confirm-senha')
const formulario            = document.getElementById('form-cadastro');
const btnCadastrar          = document.getElementById('btn-cadastrar');
const barra                 = document.querySelector('.progresso');
const forcaSenha            = document.querySelector('.forca-senha');
const textoForca            = document.querySelector('.texto-forca');
const erro                  = document.querySelector('.erro');


/* --- Voltar para a página inicial -------------------------- */
navegarCom(btnVoltar, 'index.html');

/* --- Deixar toggleSenha funcional -------------------------- */
toggleSenha(btnToggleSenha, inputSenha);
toggleSenha(btnToggleConfirmSenha, inputConfirmSenha);

/* --- Força da senha -------------------------- */
let nivelSenha;
inputSenha.addEventListener('input', () => {  
  const senha = inputSenha.value;

  if (senha.length === 0) {
    barra.style.width = '0%';
    forcaSenha.style.display = "none";
  } else {
    forcaSenha.style.display = "block";
    
    nivelSenha = 0;

    if (senha.length >= 8) nivelSenha++; // tamanho > 8
    if (/[A-Z]/.test(senha)) nivelSenha++; // letra maiúscula
    if (/[a-z]/.test(senha)) nivelSenha++; // letra minúscula
    if (/\d/.test(senha)) nivelSenha++; // número
    if (/[^A-Za-z0-9]/.test(senha)) nivelSenha++; // símbolo

    switch (nivelSenha) {
        case 0:
        case 1:
        barra.style.width = '20%';
        barra.style.backgroundColor = '#dc3545';
        textoForca.textContent = 'Senha muito fraca';
        break;

        case 2:
        barra.style.width = '40%';
        barra.style.backgroundColor = '#fd7e14';
        textoForca.textContent = 'Senha fraca';
        break;

        case 3:
        barra.style.width = '60%';
        barra.style.backgroundColor = '#ffc107';
        textoForca.textContent = 'Senha média';
        break;

        case 4:
        barra.style.width = '80%';
        barra.style.backgroundColor = '#20c997';
        textoForca.textContent = 'Senha forte';
        break;

        case 5:
        barra.style.width = '100%';
        barra.style.backgroundColor = '#198754';
        textoForca.textContent = 'Senha muito forte';
        break;
    }
  }
});


/* --- Submit do formulário -------------------------- */
formulario.addEventListener('submit', async (event) => {
  event.preventDefault();

  erro.style.display = 'none';

  const nome = inputNome.value.trim();
  const email = inputEmail.value.trim();
  const senha = inputSenha.value;
  const confirmSenha = inputConfirmSenha.value;

  if (nome === "" || email === "" || senha === "" || confirmSenha == "" || cpf == "" || celular == "") {
    erro.textContent = 'Preencha todos os campos.';
    erro.style.display = 'block';
    return;
  } else if (senha !== confirmSenha) {
    erro.textContent = 'As senhas não coincidem.';
    erro.style.display = 'block';
    return;
  } else if (nivelSenha < 5) {
    erro.textContent = 'A senha é muito fraca.';
    erro.style.display = 'block';
    return;
  }

  try {
    btnCadastrar.disabled = true;

    await apiPost('/usuarios/criar', {
      nome,
      email,
      senha,
      cpf,
      celular
    });

    window.location.href = 'informacoes.html';

  } catch (e) {
    erro.textContent = e.message;
    erro.style.display = 'block';
  } finally {
    btnCadastrar.disabled = false;
  }
});
