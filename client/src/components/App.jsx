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
      grey: '#2c2f3a',
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

export default function App () {
  const [pageView, setPageView] = useState('HomePage');
  const [gameState, setGameState] = useState({})
  const { signUp, currentUser, setCurrentUser } = useAuth();

  // useEffect(() => {
  //   if (Object.keys(currentUser).length !== 0) {
  //     setPageView('HomePage')
  //   }
  // }, [currentUser])

  return (
    <ThemeProvider theme={theme}>
      {pageView === 'SignUp' ? <SignUpPage gameState={gameState} setPageView={setPageView} theme={theme}/> : null}
      {pageView === 'SignIn' ? <SignInPage gameState={gameState} setPageView={setPageView} theme={theme}/> : null}
      {pageView === 'HomePage' ? <HomePage gameState={gameState} currentUser={currentUser} setCurrentUser={setCurrentUser} setPageView={setPageView} theme={theme}/> : null}
      {pageView === 'JudgeView' ? <JudgeView gameState={gameState}/> : null}
      {pageView === 'PlayerView' ? <PlayerView gameState={gameState}/> : null}
      {pageView === 'Lobby' ? <Lobby gameState={gameState}/> : null}
      {pageView === 'CustomDeck' ? <CustomDeck gameState={gameState}/> : null}
      {pageView === 'avatarExample' ? <div><AvatarChipPicking /><br /><AvatarChipWaiting /></div> : null}
    </ThemeProvider>
  )
}
