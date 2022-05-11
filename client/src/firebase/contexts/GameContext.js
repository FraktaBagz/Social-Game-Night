import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase.js';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, updateProfile } from 'firebase/auth';
import { collection, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from 'firebase/firestore';

const GameContext = React.createContext();

export function useGame() {
  return useContext(GameContext);
}

export function GameProvider({ children }) {

  // get a specific deck from the db
  function getDeck(deck, uid) {
    return getDoc(doc(db, uid, deck))
      .then((customDeck) => {
        return customDeck.data();
      })
      .catch((err) => {
        throw err;
      })
  }

  // get an array of all decks from a user
  function getDecks = (UID) => {
    let decks = [];
    return getDocs(collection(db, UID))
      .then((data) => {
        data.forEach(deck => {
          if (deck.data().greenCard.length) {
            decks.push(deck.data().greenCard[0].sets);
          } else if (deck.data().redCard.length) {
            decks.push(deck.data().redCard[0].sets);
          }
        });
      })
      .then(() => {
        return decks;
      });
  };

  //initialize new deck
  function initializeDeck(userId, deckName) {
    setDoc(doc(db, userId, deckName), {
      greenCard: [],
      redCard: []
    })
      .catch(e => {
        console.log(err);
      });
  }

  //adds/updates card to deck collection
  function addToCustomDeck(userId, deckName, card, color) {
    let deckRef = doc(db, userId, deckName);

    if (color === 'green') {
      updateDoc(deckRef, {
        greenCard: arrayUnion(card),
      })
        .catch((err) => {
          console.log(err);
        })
    } else {
      updateDoc(deckRef, {
        redCard: arrayUnion(card),
      })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  //remove card from deck collection
  function removeFromCustomDeck(userId, deckName, card, color) {
    let deckRef = doc(db, userId, deckName);

    if (color === 'green') {
      setDoc(deckRef, {
        greenCard: arrayRemove(card),
      })
        .catch((err) => {
          console.log(err);
        })
    } else {
      updateDoc(deckRef, {
        redCard: arrayRemove(card),
      })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  //delete deck
  function deleteCustomDeck(userId, deckName) {
    let deckRef = doc(db, userId, deckName);

    deleteDoc(deckRef)
      .catch((err) => {
        console.log(err);
      });
  }

  const value = {
    getDeck,
    getDecks,
    addToCustomDeck,
    deleteCustomDeck,
    removeFromCustomDeck,
    initializeDeck,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}