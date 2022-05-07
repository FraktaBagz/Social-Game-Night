import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase.js';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, updateProfile } from 'firebase/auth';
import { db } from '../firebase.js';
import { doc, setDoc } from 'firebase/firestore';

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
        });
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

  function signInAsAnonymous() {
    return signInAnonymously(auth)
      .then((anonCredential) => {
        let anon = anonCredential.user;

        return setDoc(doc(db, 'users', anon.uid), {
          displayName: 'name'
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  const value = {
    signUp,
    login,
    signInAsAnonymous,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
