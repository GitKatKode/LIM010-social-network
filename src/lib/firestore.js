const addPost = (newPost, url, userID, name, email, date, photo) => firebase.firestore().collection('posts')
  .doc(`${userID}${date}`)
  .set({
    userID,
    comment: newPost,
    image: url,
    userName: name,
    userEmail: email,
    userPhoto: photo,
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

const postViewer = callback => firebase.firestore().collection('posts')
  .onSnapshot((querySnapshot) => {
    const postsArray = [];
    querySnapshot.forEach((doc) => {
      postsArray.push(doc);
    });
    callback(postsArray);
  });

export { addPost, uploadImage, postViewer };
