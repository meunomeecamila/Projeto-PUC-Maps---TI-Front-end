// ==== CADASTRO DE USUÁRIO ====

const cadastroForm = document.getElementById('cadastro-form');

if (cadastroForm) {
    cadastroForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('reg-username').value;
        const nome = document.getElementById('reg-nome').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('reg-confirm-password').value;

        if (password !== confirmPassword) {
            alert('As senhas não conferem!');
            return;
        }

        const user = {
            username,
            nome,
            email,
            password
        };

        localStorage.setItem('user_' + username, JSON.stringify(user));
        alert('Cadastro realizado com sucesso!');
        window.location.href = 'login.html';
    });
}

// ==== LOGIN ====

const loginForm = document.getElementById('login-form');

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const storedUser = localStorage.getItem('user_' + username);

        if (!storedUser) {
            alert('Usuário não encontrado!');
            return;
        }

        const user = JSON.parse(storedUser);

        if (user.password === password) {
            alert('Login bem-sucedido!');
            localStorage.setItem('loggedInUser', username); // Salvar quem está logado
            window.location.href = 'index.html'; // Redirecionar após login
        } else {
            alert('Senha incorreta!');
        }
    });
}
