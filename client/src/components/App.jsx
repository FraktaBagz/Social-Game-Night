import React, { useState } from 'react';
import SignUpPage from './signUp.js';
import { useAuth } from '../firebase/contexts/AuthContext.js';
import HomePage from './views/homepage/HomePage.jsx';
import JudgeView from './views/judgeview/JudgeView.jsx';
import PlayerView from './views/playerview/PlayerView.jsx';
import Lobby from './views/lobby/Lobby.jsx';

function App() {
  const [pageview, setPageview] = useState('HomePage');

  const { signUp, currentUser, setCurrentUser } = useAuth();

  if (currentUser) {
    return (
      <>
        <div>Hello user</div>
        <button onClick={() => setCurrentUser(null)}>logout</button>
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
        <SignUpPage />
      </div>
    </>
  )
}

export default App;