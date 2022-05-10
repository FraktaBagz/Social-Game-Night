const { db } = require('../../server/index.js');
const { getFirestore, collection, addDoc, doc, getDoc, getDocs } = require('firebase/firestore');

// helper functions

// get an entire collection from firestore database
const getCollection = (collectionName) => {
  let container = [];
  return getDocs(collection(db, 'defaultRed'))
    .then((snapShot) => {
      snapShot.forEach((doc) => {
        container.push(doc.data());
      });
    })
    .then(() => {
      return container;
    })
    .catch((err) => {
      console.log(err);
    });
};
