/* eslint-disable max-len */
import {
  addPost, uploadImage, postViewer, updatePost, deletePost,
} from '../lib/firestore.js';
import { viewPosts, editPostForm } from './postView.js';

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

    <select name="select privacy" id="select-privacy" class="select-privacy">
    <div class="selectionator">
  <span class="search">
    <span class="shadow">
    </span>
    <span class="overlay">
    </span>
    Options
  </span>
  <div class="menu">
    <ul class="list">
      <li>
        <span class="header">Marketing</span>
        </li>
        <li>
          <span class="header">Sales</span>
        </li>
      </ul>
    </div>
  </div>
    <option value="0" selected>Público</option> 
    <option value="1" >Privado</option>
    </select>

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


  const theUrl = (url) => {
    btnUploadPost.dataset.theUrl = url;
  };

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
    const privacy = mainElem.querySelector('#select-privacy').value;
    const postObject = {
      userID: user.uid,
      comment: post,
      image: btnUploadPost.dataset.theUrl ? btnUploadPost.dataset.theUrl : '',
      userName: name,
      userEmail: user.email,
      userPhoto: photo,
      publishDate: activeDate,
      privacy,
    };
    addPost(postObject)
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
    form.reset();
  });

  postViewer((allPosts) => {
    thePost.innerHTML = null;

    allPosts.forEach((post) => {
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
      const postObject = {
        postID: post.id,
        userID: onePost.userID,
        comment: onePost.comment,
        image: onePost.image,
        userName: onePost.userName,
        userEmail: user.email,
        userPhoto: onePost.userPhoto,
        publishDate: date,
        privacy: onePost.privacy,
      };

      if (postObject.userID === user.uid || postObject.privacy === '0') {
        thePost.innerHTML += viewPosts(postObject);
      }
    });
    const btnEditCollection = document.getElementsByClassName('btn-edit');
    const postsCollection = thePost.querySelectorAll('.box-post-user');
    Object.entries(btnEditCollection).forEach((element) => {
      const singleBtnEdit = element[1];
      if (singleBtnEdit.dataset.user === user.uid) {
        singleBtnEdit.classList.remove('none');
        singleBtnEdit.addEventListener('click', (btnID) => {
          if (btnID.target.dataset.postid) {
            deletePost(btnID.target.dataset.postid);
          } else {
            Object.entries(postsCollection).forEach((article) => {
              const articleID = article[1].dataset.postid;
              let articletoReplace = article[1];
              const postToEdit = btnID.target.id;
              if (articleID === postToEdit) {
                const objToEdit = {
                  postID: postToEdit,
                  userID: articletoReplace.querySelector('.btn-edit').dataset.user,
                  userName: articletoReplace.querySelector('.post-user-name').innerText,
                  userEmail: articletoReplace.querySelector('.cont-post-user-info').dataset.email,
                  userPhoto: articletoReplace.querySelector('.post-user-photo').currentSrc,
                  publishDate: articletoReplace.querySelector('.post-user-date').innerText,
                  comment: articletoReplace.querySelector('.post-user-text').outerText,
                  image: articletoReplace.querySelector('.post-user-img').currentSrc,
                  privacy: '1',
                };
                const elementToEdit = editPostForm(objToEdit);
                const editform = document.createRange().createContextualFragment(elementToEdit);
                articletoReplace = thePost.replaceChild(editform, article[1]);
                const btnPubEdited = thePost.querySelector('#edit-pub-btn');

                const newUrl = (url) => {
                  btnPubEdited.dataset.theUrl = url;
                };
                const btnUploadEditImage = thePost.querySelector('#btn-edit-img');
                let changeImg = 0;
                btnUploadEditImage.addEventListener('change', (event) => {
                  changeImg = 1;
                  const image = event.target.files[0];
                  uploadImage(image, newUrl);
                });

                btnPubEdited.addEventListener('click', (e) => {
                  e.preventDefault();
                  const newPostEdited = {
                    image: changeImg === 0 ? btnUploadEditImage.dataset.img : btnPubEdited.dataset.theUrl,
                    comment: thePost.querySelector('#content-edited').value,
                    privacy: thePost.querySelector('#edited-privacy').value,
                  };
                  updatePost(btnID.target.id, newPostEdited);
                  thePost.innerHTML += '';
                });
              }
            });
          }
        });
      }
    });
  });

  document.getElementById('menu-bar').classList.remove('none');
  document.getElementById('logout').classList.remove('none');
  return mainElem;
};

export { viewTheSocialNet };
