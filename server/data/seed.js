const { defaultGreen } = require("./defaultGreen.js");
const { defaultRed } = require("./defaultRed.js");
const { db } = require("../firebase/firebase.js");
const {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
} = require("firebase/firestore");

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

const addCustomDeck = (redDeck, greenDeck, deckName) => {
  greenDeck.forEach((card) => {
    addDoc(collection(db, deckName + " green"), {
      label: card.label,
      extra: card.extra,
      sets: card.sets,
    }).catch((e) => {
      console.error("Error adding document: ", e);
    });
  });

  redDeck.forEach((card) => {
    addDoc(collection(db, deckName + " red"), {
      label: card.label,
      extra: card.extra,
      sets: card.sets,
    }).catch((e) => {
      console.error("Error adding document: ", e);
    });
  });
};

addCustomDeck(
  [
    {
      label: "Absurd",
      extra: "(ridiculous, senseless, foolish) ",
      sets: "default red",
    },
  ],
  [
    {
      label: "Absurd",
      extra: "(ridiculous, senseless, foolish) ",
      sets: "default red",
    },
  ],
  "test"
);
