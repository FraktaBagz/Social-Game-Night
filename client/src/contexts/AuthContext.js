import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    // if (currentUser) {
    //   console.log('display name: ' + JSON.stringify(currentUser.displayName))
    // }

  }, [currentUser]);

  function signUp(email, password, firstName, lastName) {
    return auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        return res.user.updateProfile({
          displayName: `${firstName} ${lastName}`
        })
      })
      .catch(err => {
        console.log(err)
      });
  }

  const value = {
    currentUser,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
