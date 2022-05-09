const db = require('../firebase');
const { doc, getDoc } = require('firebase/firestore');

module.exports = {
  getUser: function (userId) {
    let userRef = doc(db, 'users', userId);

    return getDoc(userRef)
      .then(doc => {
        if (doc) {
          return doc.data();
        }
      })
      .catch(err => {
        throw err;
      });
  },
  getDeck: function (deckId) {

  },
}