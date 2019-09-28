import MockFirebase from 'mock-cloud-firestore';
import {
  addPost, postViewer, updatePost, deletePost,
} from '../src/lib/firestore.js';


const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        uidDoc1: {
          userID: '9aGZj0IyVbTlvEU5x25mzjaVngJ3',
          comment: 'Prueba 1',
          image: 'https://firebasestorage.googleapis.com/v0/b/social-net-43b5d.appspot.com/o/images%2Fazure.png?alt=media&token=75be4afc-115e-4d46-afa7-97bef1ace88e',
          userName: 'Kat Kode',
          userEmail: '123@123.com',
          userPhoto: 'https://firebasestorage.googleapis.com/v0/b/social-net-43b5d.appspot.com/o/images%2Fazure.png?alt=media&token=75be4afc-115e-4d46-afa7-97bef1ace88e',
          publishDate: { seconds: 1569530881, nanoseconds: 592000000 },
          privacy: 1,
        },
        uidDoc2: {
          userID: '7aGZj0IyVbTlvEU5x25mzjaVngJ3',
          comment: 'Prueba 3',
          image: 'https://firebasestorage.googleapis.com/v0/b/social-net-43b5d.appspot.com/o/images%2Fazure.png?alt=media&token=75be4afc-115e-4d46-afa7-97bef1ace88e',
          userName: 'Sab',
          userEmail: '456@456.com',
          userPhoto: 'https://firebasestorage.googleapis.com/v0/b/social-net-43b5d.appspot.com/o/images%2Fazure.png?alt=media&token=75be4afc-115e-4d46-afa7-97bef1ace88e',
          publishDate: { seconds: 1569530881, nanoseconds: 592000000 },
          privacy: 0,
        },
      },
    },
  },
};

// global.firebase = new MockFirebase(fixtureData);
global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

const postObject = {
  userID: 'Dj6UdULZTQXM1SbxibTjdBpiNEZ2',
  comment: 'Prueba 2',
  image: '',
  userName: 'Sabrina Campos',
  userEmail: 'sabrinaacm@gmail.com',
  userPhoto: 'https://lh3.googleusercontent.com/a-/AAuE7mBkH0mKoMaLjtyKBTqdZpajxq0K2',
  publishDate: { seconds: 1569534002, nanoseconds: 511000000 },
  privacy: 0,
};


describe('addPost', () => {
  it('agrega un post en la data', done => addPost(postObject)
    .then(() => {
      postViewer(
        (data) => {
          const foundObj = data.find(post => post.data().userID === 'Dj6UdULZTQXM1SbxibTjdBpiNEZ2');
          expect(foundObj.data().comment).toBe('Prueba 2');
          done();
        },
      );
    }));
});

const newPost = {
  image: '',
  comment: 'Prueba 4',
  privacy: '1',
};

describe('updatePost', () => {
  it('edita un post', (done) => {
    updatePost('uidDoc2', newPost)
      .then(() => {
        postViewer(
          (data) => {
            const foundObj = data.find(post => post.data().comment === 'Prueba 4');
            expect(foundObj.data().privacy).toBe('1');
            done();
          },
        );
      });
  });
});

describe('deletePost', () => {
  it('borra un post', (done) => {
    deletePost('uidDoc1')
      .then(() => {
        postViewer(
          (data) => {
            const foundObj = data.find(post => post.data().comment === 'Prueba 1');
            expect(foundObj).toBe(undefined);
            done();
          },
        );
      });
  });
});
