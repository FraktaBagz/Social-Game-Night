import React, {useState} from 'react';
import SignUp from './signUp.js';
import { AuthProvider } from '../contexts/AuthContext.js';
import HomePage from './views/homepage/HomePage.jsx';
import JudgeView from './views/judgeview/JudgeView.jsx';
import PlayerView from './views/playerview/PlayerView.jsx';
import Lobby from './views/lobby/Lobby.jsx';

function App() {
  const [pageview, setPageview] = useState('HomePage');

  return (
    <>
      {pageview === 'HomePage' ? <HomePage/> : null}
      {pageview === 'JudgeView' ? <JudgeView/> : null}
      {pageview === 'PlayerView' ? <PlayerView/> : null}
      {pageview === 'Lobby' ? <Lobby/> : null}
      {/* <AuthProvider>
        <div>
          <SignUp />
        </div>
      </AuthProvider> */}
    </>
  )
}

export default App;