/* eslint-disable max-len */
const authEmailPass = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

const createUserEmailPass = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

const loginWithGoogle = () => firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());

const loginWithFacebook = () => firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider());

export {
  authEmailPass, createUserEmailPass, loginWithGoogle, loginWithFacebook,
};
