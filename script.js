// Funções de Exibição de Formulários
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

  if (username === '' || password === '' || password !== passwordConfirm) {
    registerError.textContent = 'Verifique as informações.';
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

// Funções de Login e Logout
function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  const loginError = document.getElementById('login-error');
  const users = JSON.parse(localStorage.getItem('users')) || {};

  if (users[username] && users[username] === password) {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('main-panel').style.display = 'block';
    startIoTMonitoring();
  } else {
    loginError.textContent = 'Credenciais incorretas.';
    loginError.style.display = 'block';
  }
}

function logout() {
  document.getElementById('main-panel').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
}

// Função de Geração e Cópia de Senhas
function generatePassword() {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";

  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  const passwordList = document.getElementById('generated-passwords');
  const passwordItem = document.createElement('li');
  passwordItem.innerHTML = `${password} <button onclick="copyPassword('${password}')">Copiar</button>`;
  passwordList.appendChild(passwordItem);
}

function copyPassword(password) {
  navigator.clipboard.writeText(password).then(() => {
    alert("Senha copiada!");
  });
}

// Funções de Monitoramento IoT e Relatório
let operationTime = 0;
let criticalAlerts
