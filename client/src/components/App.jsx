import React, { useState, useEffect } from "react";
import { useAuth } from "../firebase/contexts/AuthContext.js";
import { auth } from "../firebase/firebase.js";
import { useGame } from "../firebase/contexts/GameContext.js";
import SignUpPage from "./views/signup/SignUp.jsx";
import SignInPage from "./views/signin/SignIn.jsx";
import Navbar from "./views/navbar/Navbar.jsx";
import HomePage from "./views/homepage/HomePage.jsx";
import JudgeView from "./views/judgeview/JudgeView.jsx";
import PlayerView from "./views/playerview/PlayerView.jsx";
import Lobby from "./views/lobby/Lobby.jsx";
import LobbyRestyle from "./views/lobby/LobbyRestyle.jsx";
import CustomDeck from "./views/customdeck/CustomDeck.jsx";
import { AvatarChipWaiting, AvatarChipPicking } from "./views/common/AvatarChips.jsx";
import Custom from "./views/customdeck/Custom.jsx";
import ViewCards from "./views/customdeck/ViewCards.jsx";
import PlayingCard from "./views/common/PlayingCard.jsx";
import Results from "./views/results/Results.jsx";
import { io } from "socket.io-client";
const socket = io();

const customDecksSample = {
  skips: {
    questions: [
      {
        label: 'some prompt',
        extra: '(ridiculous, senseless, foolish) ',
        sets: 'default green',
      },
      {
        label: 'some prompt',
        extra: '(plentiful, ample, numerous) ',
        sets: 'default green',
      },
      {
        label: 'some prompt',
        extra: '(obsessive, consuming, captivating) ',
        sets: 'default green',
      },],
    answers: [
      {
        label: 'Absurd',
        extra: '(ridiculous, senseless, foolish) ',
        sets: 'default red',
      },
      {
        label: 'Abundant',
        extra: '(plentiful, ample, numerous) ',
        sets: 'default red',
      },
      {
        label: 'Addictive',
        extra: '(obsessive, consuming, captivating) ',
        sets: 'default red',
      },
      {
        label: 'Absurd',
        extra: '(ridiculous, senseless, foolish) ',
        sets: 'default red',
      },
      {
        label: 'Abundant',
        extra: '(plentiful, ample, numerous) ',
        sets: 'default red',
      },
      {
        label: 'Addictive',
        extra: '(obsessive, consuming, captivating) ',
        sets: 'default red',
      },]
  },
}

const customUserInfo = {
  name: "Raymond",
  title: "The Wise",
  avatar:
    "https://upload.wikimedia.org/wikipedia/en/2/2d/SSU_Kirby_artwork.png",
};

export default function App() {
  const { signUp, currentUser, setCurrentUser } = useAuth();
  const { getUser, getDeck } = useGame();
  const [pageView, setPageView] = useState('HomePage');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [gameState, setGameState] = useState({});
  const [defaultDeck, setDefaultDeck] = useState(customDecksSample.skips);
  const [customDecks, setCustomDecks] = useState(customDecksSample);
  const [selectedCustomDeck, setSelectedCustomDeck] = useState({
    dummy: {
      questions: ["dummyq1", "dummyq2"],
      answers: ["dummya1", "dummya2"],
    },
  });
  const [customDeckTitle, setCustomDecktitle] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { user: "Bot", text: "This is the beginning of the chat history" },
  ]);
  const [name, setName] = useState("MrJoel");
  const [host, setHost] = useState(true);
  const [connectedUsers, setConnectedUsers] = useState([
    {
      name: "Nathaniel",
      title: "The Brave",
      avatar:
        "https://www.kindpng.com/picc/m/3-35984_transparent-emotion-clipart-transparent-background-happy-emoji-png.png",
    },
    {
      name: "Raymond",
      title: "The Wise",
      avatar:
        "https://upload.wikimedia.org/wikipedia/en/2/2d/SSU_Kirby_artwork.png",
    },
    {
      name: "Matthew",
      title: "The Hell Raiser",
      avatar:
        "https://mpng.subpng.com/20180624/zyt/kisspng-magic-rush-heroes-wikia-character-western-restaurants-5b2fccfed0dfb9.9185671315298593268556.jpg",
    },
    {
      name: "Kim",
      title: "The Wizard",
      avatar:
        "https://w7.pngwing.com/pngs/525/864/png-transparent-wizard-holding-staff-dungeons-dragons-pathfinder-roleplaying-game-d20-system-wizard-magician-wizard-cartoon-d20-system-wizard-thumbnail.png",
    },
  ]);

  useEffect(() => {
    console.log("currentUser: ", currentUser);
  }, []);

  socket.on("new game", (gameObj) => {
    gameObj = JSON.parse(gameObj);
    socket.emit('game action', JSON.stringify({ action: 'new round', game: gameObj }))
  });

  socket.on('join game', (msg) => {
    console.log('new player entered room')
    msg = JSON.parse(msg);
    console.log(msg)
    setConnectedUsers([...connectedUsers, msg.user])
  })

  socket.on("game action", (gameObj) => {
    gameObj = JSON.parse(gameObj);
    setGameState(gameObj);
  });

  function handleLogState() {
    if (isLoggedIn) {
      auth
        .signOut()
        .then(() => {
          setIsLoggedIn(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsLoggedIn(true);
    }
  }

  // useEffect(() => {
  //   console.log('calling get deck');
  //   getDeck()
  //     .then((deck) => {
  //       setDefaultDeck(deck);
  //     })
  //     .catch((e) => console.log(e));
  // }, []);

  var handleViewClick = (e) => {
    e.preventDefault();
    setPageView(e.target.value);
  };

  if (!isLoggedIn) {
    return (
      <>
        {pageView === "SignUp" ? (
          <SignUpPage
            handleLogState={handleLogState}
            gameState={gameState}
            setPageView={setPageView}
          />
        ) : null}
        {pageView === "SignIn" ? (
          <SignInPage
            handleLogState={handleLogState}
            gameState={gameState}
            setPageView={setPageView}
          />
        ) : null}
      </>
    );
  }

  return (
    <>
      <Navbar />
      <button onClick={handleViewClick} value='SignUp'>SignUp</button>
      <button onClick={handleViewClick} value='SignIn'>SignIn</button>
      <button onClick={handleViewClick} value='HomePage'>HomePage</button>
      <button onClick={handleViewClick} value='JudgeView'>JudgeView</button>
      <button onClick={handleViewClick} value='PlayerView'>PlayerView</button>
      <button onClick={handleViewClick} value='Lobby'>Lobby</button>
      <button onClick={handleViewClick} value='LobbyRestyle'>LobbyRestyle</button>
      <button onClick={handleViewClick} value='CustomDeck'>CustomDeck</button>
      <button onClick={handleViewClick} value='avatarExample'>avatarExample</button>
      <button onClick={handleViewClick} value='results'>results</button>
      {pageView === "HomePage" ? (
        <HomePage
          gameState={gameState}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          handleLogState={handleLogState}
          setPageView={setPageView}
          connectedUsers={connectedUsers}
          setConnectedUsers={setConnectedUsers}
        />
      ) : null}
      {pageView === "JudgeView" ? (
        <JudgeView
          gameState={gameState}
          setPageView={setPageView}
        />
      ) : null}
      {pageView === "PlayerView" ? (
        <PlayerView
          gameState={gameState}
          setPageView={setPageView}
          customDecksSample={customDecksSample}
          connectedUsers={connectedUsers}
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
          currentUser={currentUser}
        />
      ) : null}
      {pageView === "Lobby" ? (
        <Lobby
          gameState={gameState}
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
          name={name}
          host={host}
          connectedUsers={connectedUsers}
          setPageView={setPageView}
          customDecks={customDecks}
          defaultDeck={defaultDeck}
          setSelectedCustomDeck={setSelectedCustomDeck}
          setCustomDecktitle={setCustomDecktitle}
        />
      ) : null}
      {pageView === "LobbyRestyle" ? (
        <LobbyRestyle
          gameState={gameState}
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
          name={name}
          host={host}
          connectedUsers={connectedUsers}
          setPageView={setPageView}
          customDecks={customDecks}
          defaultDeck={defaultDeck}
          setSelectedCustomDeck={setSelectedCustomDeck}
          setCustomDecktitle={setCustomDecktitle}
        />
      ) : null}
      {pageView === "CustomDeck" ? (
        <CustomDeck
          gameState={gameState}
          setPageView={setPageView}
          customDecks={customDecks}
          setSelectedCustomDeck={setSelectedCustomDeck}
          setCustomDecktitle={setCustomDecktitle}
        />
      ) : null}
      {pageView === "Custom" ? (
        <Custom
          gameState={gameState}
          setPageView={setPageView}
          previousView={"Lobby"}
          selectedCustomDeck={selectedCustomDeck}
          customDeckTitle={customDeckTitle}
          setCustomDecktitle={setCustomDecktitle}
        />
      ) : null}
      {pageView === "ViewCards" ? (
        <ViewCards
          gameState={gameState}
          setPageView={setPageView}
          selectedCustomDeck={selectedCustomDeck}
          customDeckTitle={customDeckTitle}
          setCustomDecktitle={setCustomDecktitle}
        />
      ) : null}
      {pageView === "avatarExample" ? (
        <div>
          <AvatarChipPicking picking={true} user={customUserInfo} />
          <br />
          <AvatarChipPicking picking={false} user={customUserInfo} />
          <br />
          <AvatarChipWaiting user={customUserInfo} />
          <br />
          <PlayingCard card={customDecksSample.skips.questions[0]} color='green' />
          <br />
          <PlayingCard card={customDecksSample.skips.answers[0]} color='red' />
        </div>
      ) : null}
      {pageView === "results" ? (
        <Results gameState={gameState} setPageView={setPageView} user={customUserInfo} chatHistory={chatHistory} setChatHistory={setChatHistory} />
      ) : null}
    </>
  );
}
