const { defaultGreen } = require("./defaultGreen.js");
const { defaultRed } = require("./defaultRed.js");
const db = require("../firebase/firebase.js");
const {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
} = require("firebase/firestore");

function addToCustomDeck(userId, deckName, greenCards, redCards) {
  let customDeckRef = doc
  setDoc(doc(db, userId, deckName), {
    greenCards: greenCards,
    redCards: redCards
  })
    .catch(e => {
      console.error('Error adding document: ', e);
    });
}

// addToCustomDeck('1', 'for skip grandma', defaultGreen, defaultRed);

//seed default green cards
// defaultGreen.forEach((card) => {
//   addDoc(collection(db, 'defaultGreen'), {
//     label: card.label,
//     extra: card.extra,
//     sets: card.sets
//   })
//     .catch(e => {
//       console.error('Error adding document: ', e);
//     });
// });

// //seed default red cards
// defaultRed.forEach((card) => {
//   addDoc(collection(db, 'defaultRed'), {
//     label: card.label,
//     extra: card.extra,
//     sets: card.sets
//   })
//     .catch(e => {
//       console.error('Error adding document: ', e);
//     });
// });

// enter node server/data/seed.js into terminal to seed data
