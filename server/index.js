const db = require('./firebase/firebase');
const { doc, getDoc } = require('firebase/firestore');

const userRef = doc(db, 'users', 'a7G3wcRhqzbskejW0lYAFe7HPat2');

getDoc(userRef)
  .then(doc => {
    if (doc) {
      console.log(doc.data());
    }
  })
  .catch(err => {
    console.log(err);
  });