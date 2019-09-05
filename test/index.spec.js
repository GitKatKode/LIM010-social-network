import {
  authEmailPass, createUserEmailPass, loginWithGoogle, loginWithFacebook,
} from '../src/lib/authentication.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
mockfirestore.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  () => null,
  () => mockauth,
  () => mockfirestore,
);

describe('createUserEmailPass', () => {
  it('Crea un nuevo usuario', () => createUserEmailPass('front@end.la', '123456')
    .then((user) => {
      expect(user.password).toBe('123456');
    }));
});

describe('authEmailPass', () => {
  it('Autentica el usuario', () => authEmailPass('front@end.la', '123456')
    .then((user) => {
      expect(user.email).toBe('front@end.la');
    }));
});

describe('loginWithGoogle', () => {
  it('Ingresa con Google', () => loginWithGoogle()
    .then((result) => {
      expect(result.providerData[0].providerId).toBe('google.com');
    }));
});

describe('loginWithFacebook ', () => {
  it('Ingresa con Facebook', () => loginWithFacebook()
    .then((result) => {
      expect(result.providerData[0].providerId).toBe('facebook.com');
    }));
});
