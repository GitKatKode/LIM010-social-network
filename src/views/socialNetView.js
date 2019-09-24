/* eslint-disable max-len */
import { addPost, uploadImage, postViewer } from '../lib/firestore.js';
import { posts } from './postView.js';

const viewSocialNet = `
<div class="user-card display-flex">
  <img id="current-user-picture" class="current-user-picture">
    <div class="user-card-info">
        <h2 id="current-user-name"></h2>
        <span id="uid-current-user"></span>
        <p id="current-user-mail" class="mail-user"></p>
    </div>
</div>

<form class="display-flex box-form-user" method="post" id="publish-form">
  <div class="container-post-form">
      <textarea class="input-form-user"  id="content-to-post" placeholder="¿Qué quieres compartir?"></textarea>
      <input id="btn-upload-img" type="file" name="new-img" accept="image/png, image/jpeg" class="btn">
  </div>

    <button class="btn btn-form-user icon-text" id="btn-privacy" data-privacy='0'>
    <span class="btn-icon icon-public"></span><span id="text-privacy">Publico</span>
    <span class="icon-arrow icon-arrow-bottom"></span>
    </button>

    <nav class="list-menu none">
    <ul>
    <li class="icon-text" id="btn-public"><span class="btn-icon icon-public" ></span>Publico</li>
    <span class="line-horizontal"></span>
    <li class="icon-text" id="btn-private"><span class="btn-icon icon-private" ></span>Solo yo</li>
    </ul>
    </nav>

    <button class="btn btn-form-user btn-publicar" id="btn-create-post">Publicar</button>
</form>

<div class="container-posts" id="container-posts"></div>
</div>
`;

const viewTheSocialNet = (user) => {
  document.getElementById('container').innerHTML = null;
  const mainElem = document.createElement('section');
  mainElem.setAttribute('id', 'container-net');
  mainElem.setAttribute('class', 'container-net display-flex');
  mainElem.innerHTML = viewSocialNet;

  const userPhoto = mainElem.querySelector('#current-user-picture');
  const userName = mainElem.querySelector('#current-user-name');
  const userEmail = mainElem.querySelector('#current-user-mail');
  const btnUploadImg = mainElem.querySelector('#btn-upload-img');
  const btnUploadPost = mainElem.querySelector('#btn-create-post');
  const form = mainElem.querySelector('#publish-form');
  const thePost = mainElem.querySelector('#container-posts');

  if (user != null) {
    userPhoto.setAttribute('src', user.photoURL === null ? 'img/default-avatar.png' : user.photoURL);
    userName.textContent = user.displayName;
    userEmail.textContent = user.email;
  }
  let urlActive = '';

  const theUrl = (url) => { urlActive = url; };

  btnUploadImg.addEventListener('change', (e) => {
    const image = e.target.files[0];
    uploadImage(image, theUrl);
  });

  btnUploadPost.addEventListener('click', (e) => {
    e.preventDefault();
    const post = mainElem.querySelector('#content-to-post').value;
    const activeDate = new Date();

    const name = user.displayName ? user.displayName : user.email;
    const photo = user.photoURL ? user.photoURL : 'img/default-avatar.png';
    addPost(post, urlActive, user.uid, name, user.email, activeDate, photo)
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
    form.reset();
  });

  postViewer((allPosts) => {
    // thePost.innerHTML += posts(`${user.uid}${dateActive}`, photo, name, post, urlActive, date, 0, 0, '??');
    // publicar post en html

    allPosts.forEach((post) => {
      // eslint-disable-next-line no-underscore-dangle
      const onePost = post.data();
      const activeDate = onePost.publishDate.toDate();
      const date = `
      ${(`0${activeDate.getDate()}`).slice(-2)}/
      ${(`0${activeDate.getMonth() + 1}`).slice(-2)}/
      ${activeDate.getFullYear()}
      ${(`0${activeDate.getHours()}`).slice(-2)}:
      ${(`0${activeDate.getMinutes()}`).slice(-2)}:
      ${(`0${activeDate.getSeconds()}`).slice(-2)}
      `;
      thePost.innerHTML += posts('idpost', onePost.userPhoto, onePost.userName, onePost.comment, onePost.image, date, 0, 0, '??');
    });
  });

  document.getElementById('menu-bar').classList.remove('none');
  document.getElementById('logout').classList.remove('none');
  return mainElem;
};

export { viewTheSocialNet };
