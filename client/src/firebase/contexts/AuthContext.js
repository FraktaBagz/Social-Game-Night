import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase.js';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, updateProfile } from 'firebase/auth';
import { collection, doc, setDoc, getDoc, getDocs } from 'firebase/firestore';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUserID, setCurrentUserID] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserID(user.uid);
      } else {
        setCurrentUserID(null);
      }
    });
  }, [])

  function signUp(email, password, firstName, lastName) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        let user = userCredential.user;

        return setDoc(doc(db, 'users', user.uid), {
          displayName: firstName
        })
          .then(res => {

          })
      })
      .catch((err) => {
        throw err;
      });
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .catch((err) => {
        throw err;
      });
  }

  function signInAsAnonymous(guestName) {
    return signInAnonymously(auth)
      .then((anonCredential) => {
        let anon = anonCredential.user;

        console.log(guestName);
        return setDoc(doc(db, 'users', anon.uid), {
          displayName: guestName
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  function getDeck(deck) {
    let redContainer = [];
    let greenContainer = [];

    return getDocs(collection(db, 'defaultRed'))
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          redContainer.push(doc.data());
        });

        return getDocs(collection(db, 'defaultGreen'));
      })
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          greenContainer.push(doc.data());
        });
      })
      .then(() => {
        // console.log(redContainer, greenContainer)
        let deck = {
          questions: redContainer,
          answers: greenContainer
        };

        return deck;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const value = {
    signUp,
    login,
    signInAsAnonymous,
    getDeck,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
