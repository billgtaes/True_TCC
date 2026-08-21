const navbar          = document.querySelector('.nav-bar');
const btnToggleBarra  = document.getElementById('btn-barra-lateral');
const btnDashboard    = document.getElementById('btn-dashboard');
const btnPacientes    = document.getElementById('btn-pacientes');
const btnAtividades   = document.getElementById('btn-atividades');
const btnComunicacao  = document.getElementById('btn-comunicacao');
const btnRelatorios   = document.getElementById('btn-relatorios');
const btnConquistas   = document.getElementById('btn-conquistas');

const imgUser         = document.getElementById('user-img');
const nomeUser        = document.getElementById('user-name');
const formacaoUser    = document.getElementById('user-formacao');

let navbarFechada = false;

btnToggleBarra.addEventListener('click', () => {
  navbarFechada = true;
  navbar.classList.add('nav-fechada');
});

document.querySelector('.logo-img').addEventListener('click', () => {
  if (!navbarFechada) return;
  navbarFechada = false;
  navbar.classList.remove('nav-fechada');
});

navegarCom(btnDashboard, "dashboard.html");
navegarCom(btnPacientes, "pacientes.html");
navegarCom(btnAtividades, "atividades.html");
navegarCom(btnComunicacao, "comunicacao.html");
navegarCom(btnRelatorios, "relatorios.html");
navegarCom(btnConquistas, "conquistas.html");

// Informações no footer
async function setUserInfo() {
  const email = localStorage.getItem('email');
  if (!email) {
    window.alert('Algo deu errado, faça o login novamente.');
    window.location.href = 'login.html';
    
  }

  const user = await apiGet(`/usuarios/email/${email}`);

  let imgUrl = user.descricao.Fotourl;
  let nome = user.descricao.nome;
  let formacao = user.descricao.formacao;

  if (nome.length > 15) {
    nome = nome.slice(0, 15) + '...';
  }
  if (formacao.length > 15) {
    formacao = formacao.slice(0, 15) + '...';
  }

  imgUser.src = `../assets/icons/${imgUrl}`;
  nomeUser.textContent = nome;
  formacaoUser.textContent = formacao;
}

//setUserInfo();