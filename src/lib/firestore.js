const addPost = (newPost, url, name, email, date) => firebase.firestore().collection('posts').add({
  comment: newPost,
  image: url,
  userName: name,
  userEmail: email,
  publishDate: date,
});

// const deletePost = post => firebase.firestore().collection('posts').doc(post).delete();

const uploadImage = (imgFile, callback) => {
  const theImgUrl = firebase.storage().ref(`images/${imgFile.name}`).put(imgFile);
  theImgUrl.on('state_changed', null, null, () => {
    theImgUrl.snapshot.ref.getDownloadURL().then((url) => {
      callback(url);
    });
  });
};

export { addPost, uploadImage };
