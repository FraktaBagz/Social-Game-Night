import React, {useState} from 'react';
import SignUpPage from '../signup/SignUp.jsx';

export default function HomePage ({currentUser, setCurrentUser}) {
  if (currentUser) {
    console.log(currentUser)
    return (
      <>
        <div>Hello {currentUser.displayName}</div>
        <button onClick={() => setCurrentUser(null)}>logout</button>
      </>
    );
  } else {
    return (
        <SignUpPage />
    )
  }
}