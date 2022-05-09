import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SignUpPage from './views/signup/SignUp.jsx';
import SignInPage from './views/signin/SignIn.jsx';
import { useAuth } from '../firebase/contexts/AuthContext.js';
import HomePage from './views/homepage/HomePage.jsx';
import JudgeView from './views/judgeview/JudgeView.jsx';
import PlayerView from './views/playerview/PlayerView.jsx';
import Lobby from './views/lobby/Lobby.jsx';
import CustomDeck from './views/customdeck/CustomDeck.jsx';
import { AvatarChipWaiting, AvatarChipPicking } from './views/common/AvatarChips.jsx';
import Custom from './views/customdeck/Custom.jsx';
import ViewCards from './views/customdeck/ViewCards.jsx';

/*
black #2c2f3a
green #9ce774
red #e95d70
orange #ea9e48
white #ececec
*/

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#ea9e48',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#e95d70',
    },
    background: {
      default: '#ececec',
    },
    info: {
      main: '#9ce774',
    },
  },
});

const customDecksSample =
{
  skips: {
    questions: ['skipsq1', 'skipsq2'],
    answers: ['skipsa1', 'skipsa2']
  },
  skipsgma: {
    questions: ['skipsgq1', 'skipsgq1'],
    answers: ['skipsga1', 'skipsga1']
  }
}

export default function App () {
  // const [pageView, setPageView] = useState('SignUp');
  const [pageView, setPageView] = useState('Custom');
  const [gameState, setGameState] = useState({});
  const [defaultDeck, setDefaultDeck] = useState(['defaultDeck']);
  const [customDecks, setCustomDecks] = useState(customDecksSample);
  const [selectedCustomDeck, setSelectedCustomDeck] = useState({
    dummy: {
      questions: ['dummyq1', 'dummyq2'],
      answers: ['dummya1', 'dummya2']
    }
  });
  const [customDeckTitle, setCustomDecktitle] = useState('');


  const { signUp, currentUser, setCurrentUser } = useAuth();



  // useEffect(() => {
  //   if (Object.keys(currentUser).length !== 0) {
  //     setPageView('HomePage')
  //   }
  // }, [currentUser])

  return (
    <ThemeProvider theme={theme}>
      {pageView === 'SignUp' ? <SignUpPage gameState={gameState} setPageView={setPageView}/> : null}
      {pageView === 'SignIn' ? <SignInPage gameState={gameState} setPageView={setPageView}/> : null}
      {pageView === 'HomePage' ? <HomePage gameState={gameState} currentUser={currentUser} setCurrentUser={setCurrentUser} setPageView={setPageView} /> : null}
      {pageView === 'JudgeView' ? <JudgeView gameState={gameState} setPageView={setPageView}/> : null}
      {pageView === 'PlayerView' ? <PlayerView gameState={gameState} setPageView={setPageView}/> : null}
      {pageView === 'Lobby' ? <Lobby gameState={gameState} setPageView={setPageView}/> : null}
      {pageView === 'CustomDeck' ? <CustomDeck
        gameState={gameState}
        setPageView={setPageView}
        customDecks={customDecks}
        setSelectedCustomDeck={setSelectedCustomDeck}
        setCustomDecktitle={setCustomDecktitle}
        /> : null}
      {pageView === 'Custom' ? <Custom
        gameState={gameState}
        setPageView={setPageView}
        selectedCustomDeck={selectedCustomDeck}
        customDeckTitle={customDeckTitle}
        setCustomDecktitle={setCustomDecktitle} /> : null}
      {pageView === 'ViewCards' ? <ViewCards
        gameState={gameState}
        setPageView={setPageView}
        selectedCustomDeck={selectedCustomDeck}
        customDeckTitle={customDeckTitle}
        setCustomDecktitle={setCustomDecktitle} /> : null}
      {pageView === 'avatarExample' ? <div><AvatarChipPicking /><br /><AvatarChipWaiting /></div> : null}
    </ThemeProvider>
  )
}
