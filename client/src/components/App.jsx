import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SignUpPage from './views/signup/SignUp.jsx';
import SignInPage from './views/signin/SignIn.jsx';
import { useAuth } from '../firebase/contexts/AuthContext.js';
import { auth } from '../firebase/firebase.js';
import HomePage from './views/homepage/HomePage.jsx';
import JudgeView from './views/judgeview/JudgeView.jsx';
import PlayerView from './views/playerview/PlayerView.jsx';
import Lobby from './views/lobby/Lobby.jsx';
import CustomDeck from './views/customdeck/CustomDeck.jsx';
import { AvatarChipWaiting, AvatarChipPicking } from './views/common/AvatarChips.jsx';

// if (isLoggedIn) {
//   return (
//     <>
//       <div>Hello user</div>
//       <button onClick={handleLogState}>logout</button>
//     </>
//   );
// }

// return (
//   <>
//     {/* {pageview === 'HomePage' ? <HomePage /> : null}
//     {pageview === 'JudgeView' ? <JudgeView /> : null}
//     {pageview === 'PlayerView' ? <PlayerView /> : null}
//     {pageview === 'Lobby' ? <Lobby /> : null} */}
//     <div>
//       <SignUpPage handleLogState={handleLogState} />
//       <br ></br>
//       <LoginPage handleLogState={handleLogState} />
//     </div>

//   </>
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

export default function App() {
  const [pageView, setPageView] = useState('SignIn');
  const [gameState, setGameState] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { signUp, currentUser, setCurrentUser } = useAuth();

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

  // useEffect(() => {
  //   if (Object.keys(currentUser).length !== 0) {
  //     setPageView('HomePage')
  //   }
  // }, [currentUser])

  if (!isLoggedIn) {
    return (
      <ThemeProvider theme={theme}>
        {pageView === 'SignUp' ? <SignUpPage handleLogState={handleLogState} gameState={gameState} setPageView={setPageView} theme={theme} /> : null}
        {pageView === 'SignIn' ? <SignInPage handleLogState={handleLogState} gameState={gameState} setPageView={setPageView} theme={theme} /> : null}
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      {/* {pageView === 'SignUp' ? <SignUpPage gameState={gameState} setPageView={setPageView} theme={theme} /> : null}
      {pageView === 'SignIn' ? <SignInPage gameState={gameState} setPageView={setPageView} theme={theme} /> : null} */}
      {pageView === 'HomePage' ? <HomePage handleLogState={handleLogState} gameState={gameState} currentUser={currentUser} setCurrentUser={setCurrentUser} setPageView={setPageView} theme={theme} /> : null}
      {pageView === 'JudgeView' ? <JudgeView gameState={gameState} /> : null}
      {pageView === 'PlayerView' ? <PlayerView gameState={gameState} /> : null}
      {pageView === 'Lobby' ? <Lobby gameState={gameState} /> : null}
      {pageView === 'CustomDeck' ? <CustomDeck gameState={gameState} /> : null}
      {pageView === 'avatarExample' ? <div><AvatarChipPicking /><br /><AvatarChipWaiting /></div> : null}
    </ThemeProvider>
  )
}
