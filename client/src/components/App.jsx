import React, { useState, useEffect } from 'react';
import SignUpPage from './views/signup/SignUp.jsx';
import { useAuth } from '../firebase/contexts/AuthContext.js';
import HomePage from './views/homepage/HomePage.jsx';
import JudgeView from './views/judgeview/JudgeView.jsx';
import PlayerView from './views/playerview/PlayerView.jsx';
import Lobby from './views/lobby/Lobby.jsx';
import CustomDeck from './views/customdeck/CustomDeck.jsx';

export default function App () {
  const [pageView, setPageView] = useState('SignUp');
  const [gameState, setGameState] = useState({})

  const { signUp, currentUser, setCurrentUser } = useAuth();
  useEffect(()=>{
    if (currentUser !== null) {
      setPageView('HomePage')
    }
  }, [currentUser])

  return (
    <>
      {pageView === 'SignUp' ? <SignUpPage gameState={gameState}/> : null}
      {pageView === 'HomePage' ? <HomePage gameState={gameState} currentUser={currentUser} setCurrentUser={setCurrentUser}/> : null}
      {pageView === 'JudgeView' ? <JudgeView gameState={gameState}/> : null}
      {pageView === 'PlayerView' ? <PlayerView gameState={gameState}/> : null}
      {pageView === 'Lobby' ? <Lobby gameState={gameState}/> : null}
      {pageView === 'CustomDeck' ? <CustomDeck gameState={gameState}/> : null}
    </>
  )
}