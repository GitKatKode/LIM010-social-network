import { authEmailPass, loginWithGoogle, loginWithFacebook } from '../lib/authentication.js';
import { errorCases } from '../lib/authErrors.js';

const viewLogin = `
<div class="display-flex"><p class="text-login">Entra a un mundo consciente.<br> <strong> Siente, piensa y actúa. </strong></p></div>
<form class="display-flex form-login">    
<div>
    <input type="email" id="input-mail" class="login-input" autocomplete="username" placeholder="ejemplo@mail.com" required oninvalid="this.setCustomValidity('Por favor ingresa tu correo!')">
    <span id="icon-mail" class="icon-input"></span>
    </div>
    <div class="cont-password">
    <input type="password" id="input-password" class="login-input class-input" autocomplete="password" placeholder="Escribe tu contraseña" required oninvalid="this.setCustomValidity('Por favor ingresa una contraseña (min 6 caracteres)')" >
    <span id="icon-clave" class="icon-input icon-clave"></span>
    <span id="icon-password" class="icon-input"></span>
    </div>
    <p class="ms-info-alert" id="ms-info-alert"></p>
    <button class="btn login-btn" id="btn-login">Iniciar Sesión</button>
    <div class="cont-btn-redes display-flex">
      <p class="text-peq">O bien ingresar con...</p>
        <button class="btn-icon btn-google" id="login-google"></button>
        <button class="btn-icon btn-facebook" id="login-facebook"></button>
    </div>
    <p id="ms-iniciar-registrar" class="text-peq">¿No tienes una cuenta? <a href= "#/viewSignup" id="btn-change-iniciar-registrar">Regístrate</a></p> </form>`;

const viewTheLogin = () => {
  const formElem = document.createElement('form');
  formElem.setAttribute('class', 'sec-autentificacion display-flex form-login');
  formElem.setAttribute('id', 'form-login');
  formElem.innerHTML = viewLogin;

  const loginMail = formElem.querySelector('#input-mail');
  const loginPassword = formElem.querySelector('#input-password');
  const loginGoogle = formElem.querySelector('#login-google');
  const loginFacebook = formElem.querySelector('#login-facebook');
  const btnLogin = formElem.querySelector('#btn-login');
  const btnKeyLogin = formElem.querySelector('#icon-clave');
  const errorMsg = formElem.querySelector('#ms-info-alert');

  let setHide = 0;

  loginGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    loginWithGoogle();
  });

  loginFacebook.addEventListener('click', (e) => {
    e.preventDefault();
    loginWithFacebook();
  });

  btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    authEmailPass(loginMail.value, loginPassword.value)
      .catch((error) => {
        errorCases(error.code, errorMsg);
      });
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

  return formElem;
};


export { viewTheLogin };
