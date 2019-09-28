const viewPosts = objToPost => `
<article class="box-post-user" id="${objToPost.userID}" data-privacy="${objToPost.privacy}" data-postID="${objToPost.postID}">
  <div class="post-user-info">
    <img class="post-user-photo" src="${objToPost.userPhoto}">
    <div class="cont-post-user-info" data-email="${objToPost.userEmail}">
      <p class="post-user-name">${objToPost.userName}</p>
      <div class="display-flex cont-post-user-date">
        <span class="post-user-date">${objToPost.publishDate}</span>
        <button class="btn-curve btn-icon ${objToPost.privacy}"></button>
      </div>
    </div>
 
</div>
  <div class="post-user-cont">
    <p class="post-user-text">${objToPost.comment}</p>
    <img class="post-user-img" src="${objToPost.image}">
  </div>
  <div class="post-user-nav display-flex">
    <button class="btn btn-form-user icon-text btn-edit none" data-user="${objToPost.userID}" id="${objToPost.postID}">
        <span class="btn-icon icon-comentario"></span>Editar
    </button>
    <button class="btn delete-post btn-edit none" data-user="${objToPost.userID}" data-postid="${objToPost.postID}">Eliminar</button>
  </div>
</article>`;

const editPostForm = objToPost => `
<form class="display-flex box-form-user" method="post" id="edit-form">
  <div class="container-post-form">
      <textarea class="input-form-user"  id="content-edited">${objToPost.comment}</textarea>
      <input id="btn-edit-img" type="file" name="new-img" accept="image/png, image/jpeg" class="btn" data-img="${objToPost.image}">
  </div>
  <img class="img-to-post" id="img-to-post-update" src="${objToPost.image}">
    <select name="select privacy" id="edited-privacy">
    <option value="0" selected>Público</option> 
    <option value="1" >Privado</option>
    </select>

    <button class="btn btn-form-user btn-publicar" id="edit-pub-btn">Publicar</button>
</form>`;
export { viewPosts, editPostForm };
