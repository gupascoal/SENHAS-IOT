// Funções para alternar entre as telas de login e cadastro
function showRegister() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'block';
}

function showLogin() {
  document.getElementById('register-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
}

// Função de Cadastro
function register() {
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;
  const passwordConfirm = document.getElementById('register-password-confirm').value;
  const registerError = document.getElementById('register-error');

  if (username === '' || password === '') {
    registerError.textContent = 'Preencha todos os campos.';
    registerError.style.display = 'block';
    return;
  }

  if (password !== passwordConfirm) {
    registerError.textContent = 'As senhas não correspondem.';
    registerError.style.display = 'block';
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || {};

  if (users[username]) {
    registerError.textContent = 'Usuário já existe.';
    registerError.style.display = 'block';
    return;
  }

  users[username] = password;
  localStorage.setItem('users', JSON.stringify(users));

  alert('Cadastro realizado com sucesso!');
  showLogin();
}

// Função de Login
function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  const loginError = document.getElementById('login-error');

  const users = JSON.parse(localStorage.getItem('users')) || {};

  if (users[username] && users[username] === password) {
    alert('Login bem-sucedido!');
    loginError.style.display = 'none';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('password-generator').style.display = 'block'; // Exibe o gerador de senha após o login
  } else {
    loginError.textContent = 'Usuário ou senha incorretos.';
    loginError.style.display = 'block';
  }
}

// Função para Gerar Senha Forte
function generatePassword() {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  document.getElementById('generated-password').textContent = `Senha Gerada: ${password}`;
}
