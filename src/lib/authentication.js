const authEmailPass = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then((result) => {
      const currentUser = result.user.displayName;
      alert(`Bienvenid@ ${currentUser}, has ingresado con exito.`);
      return result.user.email;
    });
  // .catch(error => errorCases(error.code));
};

const createUserEmailPass = (email, password, names) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((result) => {
      result.user.updateProfile({
        displayName: names.value,
      });
    })
    .then(() => {
      const user = firebase.auth().currentUser;
      if (user != null) {
        setTimeout(() => {
          alert(`Bienvenid@ ${user.displayName}, tu registro fue exitoso.`);
        }, 400);
      }
    });
  // .catch(error => errorCases(error.code));
};

const loginWithGoogle = () => {
  if (!firebase.auth().currentUser) {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        const infoUser = response.user;
        alert(`Bienvenid@ ${infoUser.displayName}, has ingresado con exito.`);
        return response.user.email;
      });
    // .catch(error => errorCases(error.code));
  } else {
    firebase.auth().signOut();
  }
};

export { authEmailPass, createUserEmailPass, loginWithGoogle };
