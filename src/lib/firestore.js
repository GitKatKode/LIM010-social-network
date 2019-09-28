/* eslint-disable max-len */
const addPost = postObject => firebase.firestore().collection('posts').doc().set(postObject);

const updatePost = (postID, newPost) => firebase.firestore().collection('posts').doc(postID).update(newPost);

// const deletePost = post => firebase.firestore().collection('posts').doc(post).delete();

// firebase.firestore().collection('posts')
//   .onSnapshot((s) => { s.forEach(d => firebase.firestore().collection('posts')
//  .doc(d.id).delete()); });


const uploadImage = (imgFile, callback) => {
  const theImgUrl = firebase.storage().ref(`images/${imgFile.name}`).put(imgFile);
  theImgUrl.on('state_changed', null, null, () => {
    theImgUrl.snapshot.ref.getDownloadURL().then((url) => {
      callback(url);
    });
  });
};

const postViewer = callback => firebase.firestore().collection('posts')
  .onSnapshot((querySnapshot) => {
    const postsArray = [];
    querySnapshot.forEach((doc) => {
      postsArray.push(doc);
    });
    callback(postsArray);
  });

export {
  addPost, uploadImage, postViewer, updatePost,
};
