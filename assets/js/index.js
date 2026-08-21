const btnEntrar    = document.getElementById('btn-entrar');
const btnCadastrar = document.getElementById('btn-cadastrar');

navegarCom(btnEntrar, 'login.html');
navegarCom(btnCadastrar, 'cadastro.html');

// Revela elementos com fade sutil ao entrarem na viewport
    document.addEventListener('DOMContentLoaded', () => {
        const reveals = document.querySelectorAll('.reveal');

        if (!('IntersectionObserver' in window)) {
            reveals.forEach(el => el.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        reveals.forEach(el => observer.observe(el));

        // Navegação dos botões (placeholder até as páginas de login/cadastro serem ligadas aqui)
        const goToCadastro = () => window.location.href = '../pages/cadastro.html';
        const goToLogin = () => window.location.href = '../pages/login.html';

        document.getElementById('btn-cadastrar')?.addEventListener('click', goToCadastro);
        document.getElementById('btn-entrar')?.addEventListener('click', goToLogin);
        document.getElementById('btn-cta-hero')?.addEventListener('click', goToCadastro);
        document.getElementById('btn-cta-final')?.addEventListener('click', goToCadastro);
    });