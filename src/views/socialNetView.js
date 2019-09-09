const viewSocialNet = `
<nav class="nav-menu" > <a class="active" href="#"id="logout">Logout</a></nav>
<section class="current-user">
  <img src="" alt="current-user-picture" class="current-user-picture" id="current-user-picture">
  <div class="current-user-data">
  <h2 id="current-user-name"></h2>
  <p id="current-user-mail"></p>
  </div>
</section>
<form action="" class="post-form">
  <textarea name="" id="" cols="30" rows="10" class="post-text"></textarea>
  <div>
  <img src="img/upload-btn.jpeg" class="upload" id="img-upload"/>
  <input type="file" id="upload" style="display:none"/>
    <button type="submit">Compartir</button>
  </div>
</form>`;

const viewTheSocialNet = () => {
  document.getElementById('container').innerHTML = null;
  const mainElem = document.createElement('section');
  mainElem.innerHTML = viewSocialNet;

  const logOut = mainElem.querySelector('#logout');

  const userPhoto = mainElem.querySelector('#current-user-picture');
  const userName = mainElem.querySelector('#current-user-name');
  const userEmail = mainElem.querySelector('#current-user-mail');
  const upload = mainElem.querySelector('#img-upload');


  upload.addEventListener('click', () => { mainElem.querySelector('#upload').click(); });

  const userActive = () => {
    const user = firebase.auth().currentUser;
    if (user != null) {
      userPhoto.setAttribute('src', user.photoURL === null ? 'img/default-avatar.png' : user.photoURL);
      userName.textContent = user.displayName;
      userEmail.textContent = user.email;
    }
  };

  logOut.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  });
  userActive();
  return mainElem;
};

export { viewTheSocialNet };
