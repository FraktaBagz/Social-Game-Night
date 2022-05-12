import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase.js';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, setPersistence, inMemoryPersistence, updateProfile } from 'firebase/auth';
import { collection, doc, setDoc, getDoc, getDocs } from 'firebase/firestore';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('on auth here: ,', user)

      if (user) {
        getDoc(doc(db, 'users', user.uid))
          .then((client) => {
            setCurrentUser(client.data());
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        setCurrentUser(null);
      }
    });

  }, []);

  function signUp(email, password, name) {
    return setPersistence(auth, inMemoryPersistence)
      .then(() => {
        return createUserWithEmailAndPassword(auth, email, password)
      })
      .then((userCredential) => {
        let user = userCredential.user;

          return setDoc(doc(db, "users", user.uid), {
            name: name,
            UID: user.uid,
            avatar: '',
            title: '',
          });
        })
      .catch((err) => {
        throw err;
      });
  }

  function login(email, password) {
    // return setPersistence(auth, inMemoryPersistence)
    //   .then(() => {
        return signInWithEmailAndPassword(auth, email, password)
      // })
      .catch((err) => {
        throw err;
      });
  }

  function signInAsAnonymous(guestName) {
    return setPersistence(auth, inMemoryPersistence)
      .then(() => {
        return signInAnonymously(auth)
      })
      .then((anonCredential) => {
        let anon = anonCredential.user;

        return setDoc(doc(db, "users", anon.uid), {
          name: guestName,
          UID: anon.uid,
          avatar: 'https://upload.wikimedia.org/wikipedia/en/2/2d/SSU_Kirby_artwork.png',
          title: '',
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  const value = {
    signUp,
    currentUser,
    setCurrentUser,
    login,
    signInAsAnonymous,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
