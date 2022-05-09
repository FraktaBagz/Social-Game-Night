import React, {useState} from 'react';
import SignUpPage from '../signup/SignUp.jsx';

export default function HomePage ({ currentUser, setCurrentUser, setPageView }) {
  const handleLogOut = (e) => {
    e.preventDefault();
    setCurrentUser({})
    setPageView('SignUp')
  }

  return (
    <>
      <div>Hello user</div>
      <button onClick={handleLogOut}>logout</button>
    </>
  );

}