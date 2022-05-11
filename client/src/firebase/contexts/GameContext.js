import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase.js';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, updateProfile } from 'firebase/auth';
import { collection, doc, setDoc, getDocs, getDoc } from 'firebase/firestore';

const GameContext = React.createContext();

export function useGame() {
  return useContext(GameContext);
}

export function GameProvider({ children }) {
  // const [currentUser, setCurrentUser] = useState(null);

  // function getUser(currentUserID) {
  //   return getDoc(doc(db, 'users', currentUserID))
  //     // .then((client) => {
  //     //   setCurrentUser(client.data());
  //     // })
  //     .catch((err) => {
  //       // console.log(err);
  //       throw err;
  //     })
  // }

  function getDeck(deck, uid) {
    let redContainer = [];
    let greenContainer = [];

    return getDoc(doc(db, uid, deck))
      .then((customDeck) => {
        return customDeck.data();
      })
      .catch((err) => {
        throw err;
      })
  }

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
    addToCustomDeck,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}