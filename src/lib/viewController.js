import { viewTheLogin } from '../views/loginView.js';
import { viewTheSignup } from '../views/signupView.js';
import { viewTheSocialNet } from '../views/socialNetView.js';
import { theUserIs } from './authentication.js';

const container = document.getElementById('container');
export const changeView = (router) => {
  container.innerHTML = '<div class="banner display-flex"><p class="text-login">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at ante leo. Sed venenatis, nisl non maximus consequat.</p></div> ';
  switch (router) {
    case '':
    {
      return container.appendChild(viewTheLogin());
    }
    case '#/':
    {
      return container.appendChild(viewTheLogin());
    }
    case '#/viewSignup':
    {
      return container.appendChild(viewTheSignup());
    }
    case '#/social-network':
    {
      return theUserIs(objUser => container.appendChild(viewTheSocialNet(objUser)));
    }
    default:
    {
      return container.appendChild(viewTheLogin());
    }
  }
};
