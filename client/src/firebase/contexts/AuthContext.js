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
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserID(user.uid);
      } else {
        setCurrentUserID(null);
      }
      if (currentUserID) {
        getDoc(doc(db, 'users', currentUserID))
          .then((client) => {
            setCurrentUser(client.data());
          })
          .catch((err) => {
            console.log(err);
          })
      }
    });

  }, [currentUserID]);

  function signUp(email, password, name) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        let user = userCredential.user;

        return setDoc(doc(db, "users", user.uid), {
          displayName: name,
        }).then((res) => { });
      })
      .catch((err) => {
        throw err;
      });
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password).catch((err) => {
      throw err;
    });
  }

  function signInAsAnonymous(guestName) {
    return signInAnonymously(auth)
      .then((anonCredential) => {
        let anon = anonCredential.user;

        return setDoc(doc(db, "users", anon.uid), {
          displayName: guestName,
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  const value = {
    signUp,
    currentUser,
    login,
    signInAsAnonymous,
    currentUserID,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
