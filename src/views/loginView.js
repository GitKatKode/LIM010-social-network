import { authEmailPass, loginWithGoogle } from '../lib/authentication.js';

const viewLogin = `
    <p class="text-login">Entra a un mundo consciente.<br> <strong> Siente, piensa y actúa. </strong></p>
    <div>
    <input type="email" id="input-mail" class="login-input" autocomplete="username" placeholder="ejemplo@mail.com" required >
    <span id="icon-mail" class="icon-input"></span>
    </div>
    <div class="cont-password">
    <input type="password" id="input-password" class="login-input class-input" autocomplete="password" placeholder="Escribe tu contraseña" equired oninvalid="this.setCustomValidity('Por favor ingresa una contraseña (min 6 caracteres)')" >
    <span id="icon-clave" class="icon-input icon-clave"></span>
    <span id="icon-password" class="icon-input"></span>
    </div>
    <p class="ms-info-alert" id="ms-info-alert"></p>
    <button class="btn login-btn" id="btn-login">Iniciar Sesión</button>
    <div class="cont-btn-redes display-flex">
      <p class="text-peq">O bien ingresar con...</p>
        <button class="btn-circule btn-icon btn-google" id="login-google" style="background-image: url(img/icon-google.png)"></button>
        <button class="btn-circule btn-icon btn-facebook"></button>
    </div>
    <p id="ms-iniciar-registrar" class="text-peq">¿No tienes una cuenta? <a href= "#/viewSignup" id="btn-change-iniciar-registrar">Regístrate</a></p> `;

const viewTheLogin = () => {
  const formElem = document.createElement('form');
  formElem.setAttribute('class', 'display-flex form-login');
  formElem.setAttribute('id', 'form-login');
  formElem.innerHTML += viewLogin;
  return formElem;
};

const login = viewTheLogin();

let setHide = 0;

const loginMail = login.querySelector('#input-mail');
const loginPassword = login.querySelector('#input-password');
const loginGoogle = login.querySelector('#login-google');
const btnLogin = login.querySelector('#btn-login');
const btnKeyLogin = login.querySelector('#icon-clave');

loginGoogle.addEventListener('click', (e) => {
  e.preventDefault();
  loginWithGoogle();
});

btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  authEmailPass(loginMail, loginPassword);
});

btnKeyLogin.addEventListener('click', () => {
  if (setHide === 0) {
    loginPassword.setAttribute('type', 'text');
    setHide = 1;
    btnKeyLogin.classList.add('mostrar');
  } else {
    loginPassword.setAttribute('type', 'password');
    setHide = 0;
    btnKeyLogin.classList.remove('mostrar');
  }
});

export { viewTheLogin };
