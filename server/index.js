const firebase = require('firebase/compat/app');
const { getFirestore, collection, addDoc, doc, getDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyB4cKcO1n9yXZHKho0xrzw9oGHpmZ9pS4M",
  authDomain: "blue-ocean-89efd.firebaseapp.com",
  projectId: "blue-ocean-89efd",
  storageBucket: "blue-ocean-89efd.appspot.com",
  messagingSenderId: "280780835729",
  appId: "1:280780835729:web:17535b214af55cb506a830",
  measurementId: "G-CGT4Z78V8C"
};

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);

// addDoc(collection(db, "users"), {
//   first: "Ada",
//   last: "Lovelace",
//   born: 1815
// })
//   .then(docRef => {
//     console.log("Document written with ID: ", docRef.id);
//   })
//   .catch(e => {
//     console.error("Error adding document: ", e);
//   });

const userRef = doc(db, 'users', 'O2wXmC6tp7pVm0Jvjoem');
getDoc(userRef)
  .then(doc => {
    if (doc) {
      console.log(doc.data());
    }
  })
  .catch(err => {
    console.log(err);
  });

module.exports.db = getFirestore(app);