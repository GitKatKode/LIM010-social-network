/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
const errorCases = (code, message) => {
  message.classList.add('info-alert');
  switch (code) {
    case 'auth/invalid-email':
      message.textContent = '**El formato del correo ingresado no es valido, verifique e intente de nuevo.';
      break;
    case 'auth/user-not-found':
      message.textContent = '**No hay usuario registrado con ese correo., verifica e intente de nuevo.';
      break;
    case 'auth/wrong-password':
      message.textContent = '**La contraseña no es válida, verifica e intente de nuevo.';
      break;
    case 'auth/email-already-in-use':
      message.textContent = '**El correo electrónico proporcionado esta siendo utilizado por otro miembro., verifica e intente de nuevo.';
      break;
    case 'auth/email-already-exists':
      message.textContent = '**El correo electrónico proporcionado esta siendo utilizado por otro miembro., verifica e intente de nuevo.';
      break;
    case 'auth/weak-password':
      message.textContent = '**La contraseña debe tener al menos 6 caracteres.';
      break;
    default:
      return false;
  }
  return false;
};

export { errorCases };
