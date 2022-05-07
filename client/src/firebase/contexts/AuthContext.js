import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db } from '../firebase.js';
import { doc, setDoc } from 'firebase/firestore';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});

  function signUp(email, password, firstName, lastName) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        setCurrentUser(user);

        return setDoc(doc(db, 'users', user.uid), {
          displayName: firstName
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  const value = {
    currentUser,
    setCurrentUser,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
