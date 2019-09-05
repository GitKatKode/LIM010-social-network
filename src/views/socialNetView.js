
const viewSocialNet = `
  <p class="text-login">Entra a un mundo consciente.<br> <strong> Siente, piensa y actúa. </strong></p>
  <a href="#" id="logout">Logout</a> 
  `;

const viewTheSocialNet = () => {
  document.getElementById('container').innerHTML = null;
  const mainElem = document.createElement('section');
  mainElem.innerHTML = viewSocialNet;

  const logOut = mainElem.querySelector('#logout');

  logOut.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  });

  return mainElem;
};

export { viewTheSocialNet };
