import { viewTheLogin } from '../views/loginView.js';
import { viewTheSignup } from '../views/signupView.js';

const container = document.getElementById('container');

const changeView = (router) => {
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
    default:
      return router;
  }
};
export { changeView };