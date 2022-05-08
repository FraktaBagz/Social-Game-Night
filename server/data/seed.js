const { defaultGreen } = require('./defaultGreen.js');
const { defaultRed } = require('./defaultRed.js');
const { db } = require('../../server/index.js');
const { getFirestore, collection, addDoc, doc, getDoc } = require('firebase/firestore');

//seed default green cards
defaultGreen.forEach((card) => {
  addDoc(collection(db, 'defaultGreen'), {
    label: card.label,
    extra: card.extra,
    sets: card.sets
  })
    .catch(e => {
      console.error('Error adding document: ', e);
    });
});

//seed default red cards
defaultRed.forEach((card) => {
  addDoc(collection(db, 'defaultRed'), {
    label: card.label,
    extra: card.extra,
    sets: card.sets
  })
    .catch(e => {
      console.error('Error adding document: ', e);
    });
});
