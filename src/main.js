import { changeView } from './lib/viewController.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDwrTO5x8MAy2dCBaiUW4TACtUbQDtV4RE',
  authDomain: 'social-net-43b5d.firebaseapp.com',
  databaseURL: 'https://social-net-43b5d.firebaseio.com',
  projectId: 'social-net-43b5d',
  storageBucket: '',
  messagingSenderId: '1066417284678',
  appId: '1:1066417284678:web:1b3cdc75749c5f9c',
};

firebase.initializeApp(firebaseConfig);
firebase.auth().useDeviceLanguage();

const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => {
    changeView(window.location.hash);
  });
};

window.addEventListener('load', init);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    window.location.hash = '#/social-network';
  } else {
    window.location.hash = '';
  }
});
