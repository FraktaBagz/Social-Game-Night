import React, {useState} from 'react';
import SignUpPage from '../signup/SignUp.jsx';

export default function HomePage ({currentUser, setCurrentUser}) {

  if (currentUser) {
    return (
      <>
        <div>Hello user</div>
        <button onClick={() => setCurrentUser(null)}>logout</button>
      </>
    );
  } else {
    return (
        <SignUpPage />
    )
  }
}