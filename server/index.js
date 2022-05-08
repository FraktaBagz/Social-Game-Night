const firebase = require('firebase/compat/app');
const { getFirestore, collection, addDoc, doc, getDoc } = require('firebase/firestore');

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