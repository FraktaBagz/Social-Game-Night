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
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} = require("firebase/firestore");

//seed initial data
// function seedData(userId, deckName, greenCards, redCards) {
//   let customDeckRef = doc
//   setDoc(doc(db, userId, deckName), {
//     greenCard: greenCards,
//     redCard: redCards
//   })
//     .catch(e => {
//       console.error('Error adding document: ', e);
//     });
// }

//initializeDeck('default', 'default');
// seedData('default', 'default', defaultGreen, defaultRed);

// enter node server/data/seed.js into terminal to seed data
