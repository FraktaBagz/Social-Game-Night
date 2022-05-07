import React, { useState } from 'react';
import { auth } from '../firebase/firebase.js';
import SignUpPage from './signUp.js';
import LoginPage from './loginpage.js';
import HomePage from './views/homepage/HomePage.jsx';
import JudgeView from './views/judgeview/JudgeView.jsx';
import PlayerView from './views/playerview/PlayerView.jsx';
import Lobby from './views/lobby/Lobby.jsx';

function App() {
  const [pageview, setPageview] = useState('HomePage');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogState() {
    if (isLoggedIn) {
      auth.signOut()
        .then(() => {
          setIsLoggedIn(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsLoggedIn(true);
    }
  };

  if (isLoggedIn) {
    return (
      <>
        <div>Hello user</div>
        <button onClick={handleLogState}>logout</button>
      </>
    );
  }

  return (
    <>
      {/* {pageview === 'HomePage' ? <HomePage /> : null}
      {pageview === 'JudgeView' ? <JudgeView /> : null}
      {pageview === 'PlayerView' ? <PlayerView /> : null}
      {pageview === 'Lobby' ? <Lobby /> : null} */}
      <div>
        <SignUpPage handleLogState={handleLogState} />
        <br ></br>
        <LoginPage handleLogState={handleLogState} />
      </div>

    </>
  )
}

export default App;