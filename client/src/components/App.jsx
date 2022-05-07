import React, { useState, useEffect } from 'react';
import SignUpPage from './views/signup/SignUp.jsx';
import { useAuth } from '../firebase/contexts/AuthContext.js';
import HomePage from './views/homepage/HomePage.jsx';
import JudgeView from './views/judgeview/JudgeView.jsx';
import PlayerView from './views/playerview/PlayerView.jsx';
import Lobby from './views/lobby/Lobby.jsx';
import CustomDeck from './views/customdeck/CustomDeck.jsx';
import Custom from './views/customdeck/Custom.jsx';
import ViewCards from './views/customdeck/ViewCards.jsx';

const customDecksSample =
  {
    skips: {
      questions: ['card1', 'card2'],
      answers: ['answer1', 'answer2']
    },
    skipsgma: {
      questions: ['card1', 'card2'],
      answers: ['answer1', 'answer2']
    }
  }


export default function App() {
  // const [pageView, setPageView] = useState('SignUp');
  const [pageView, setPageView] = useState('CustomDeck');
  const [gameState, setGameState] = useState({});
  const [defaultDeck, setDefaultDeck] = useState(['defaultDeck']);
  const [customDecks, setCustomDecks] = useState(customDecksSample);
  const [selectedCustomDeck, setSelectedCustomDeck] = useState({});

  const { signUp, currentUser, setCurrentUser } = useAuth();
  // useEffect(()=>{
  //   if (currentUser !== null) {
  //     setPageView('CustomDeck')
  //   }
  // }, [currentUser])

  return (
    <>
      {pageView === 'SignUp' ? <SignUpPage gameState={gameState} /> : null}
      {pageView === 'HomePage' ? <HomePage gameState={gameState} currentUser={currentUser} setCurrentUser={setCurrentUser} /> : null}
      {pageView === 'JudgeView' ? <JudgeView gameState={gameState} /> : null}
      {pageView === 'PlayerView' ? <PlayerView gameState={gameState} /> : null}
      {pageView === 'Lobby' ? <Lobby gameState={gameState} /> : null}
      {pageView === 'CustomDeck' ? <CustomDeck gameState={gameState} setPageView={setPageView} customDecks={customDecks} setSelectedCustomDeck={setSelectedCustomDeck}/> : null}
      {pageView === 'Custom' ? <Custom gameState={gameState} setPageView={setPageView} /> : null}
      {pageView === 'ViewCards' ? <ViewCards gameState={gameState} setPageView={setPageView} selectedCustomDeck={selectedCustomDeck} /> : null}
    </>
  )
}