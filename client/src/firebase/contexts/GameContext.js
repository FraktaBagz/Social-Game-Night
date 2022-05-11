import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase.js';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, updateProfile } from 'firebase/auth';
import { collection, doc, setDoc, getDoc, getDocs, updateDoc, arrayUnion, arrayRemove, deleteDoc } from 'firebase/firestore';

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
  function getDecks(UID) {
    let decks = [];
    let decks2 = {}
    return getDocs(collection(db, UID))
      .then((data) => {
        data.forEach(deck => {
          let deckName = ''
          // decks.push(deck.data())
          if (deck.data().greenCard.length) {
            deckName = deck.data().greenCard[0].sets
            decks.push({ [deckName]: deck.data() });
            decks2[deckName] = deck.data()
          } else if (deck.data().redCard.length) {
            deckName = deck.data().redCard[0].sets;
            decks.push({ [deckName]: deck.data() });
            decks2[deckName] = deck.data()
          }
        });
      })
      .then(() => {
        return decks2;
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
      return updateDoc(deckRef, {
        greenCard: arrayUnion(card),
      })
        .catch((err) => {
          console.log(err);
        })
    } else {
      return updateDoc(deckRef, {
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
      return setDoc(deckRef, {
        greenCard: arrayRemove(card),
      })
        .catch((err) => {
          console.log(err);
        })
    } else {
      return updateDoc(deckRef, {
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