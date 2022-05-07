import React, {useState} from 'react';
import SignUp from './views/signup/SignUp.jsx';
import { AuthProvider } from '../contexts/AuthContext.js';
import HomePage from './views/homepage/HomePage.jsx';
import JudgeView from './views/judgeview/JudgeView.jsx';
import PlayerView from './views/playerview/PlayerView.jsx';
import Lobby from './views/lobby/Lobby.jsx';
import CustomDeck from './views/customdeck/CustomDeck.jsx';

export default function App () {
  const [pageView, setPageView] = useState('HomePage');
  const [gameState, setGameState] = useState({})

  return (
    <>
      {pageView === 'SignUp' ? <SignUp gameState={gameState}/> : null}
      {pageView === 'HomePage' ? <HomePage gameState={gameState}/> : null}
      {pageView === 'JudgeView' ? <JudgeView gameState={gameState}/> : null}
      {pageView === 'PlayerView' ? <PlayerView gameState={gameState}/> : null}
      {pageView === 'Lobby' ? <Lobby gameState={gameState}/> : null}
      {pageView === 'CustomDeck' ? <CustomDeck gameState={gameState}/> : null}
    </>
  )
}