import React, { useState, useEffect } from "react";
import SignUpPage from "./views/signup/SignUp.jsx";
import SignInPage from "./views/signin/SignIn.jsx";
import { useAuth } from "../firebase/contexts/AuthContext.js";
import { auth } from "../firebase/firebase.js";
import HomePage from "./views/homepage/HomePage.jsx";
import JudgeView from "./views/judgeview/JudgeView.jsx";
import PlayerView from "./views/playerview/PlayerView.jsx";
import Lobby from "./views/lobby/Lobby.jsx";
import LobbyRestyle from "./views/lobby/LobbyRestyle.jsx";
import CustomDeck from "./views/customdeck/CustomDeck.jsx";
import {
  AvatarChipWaiting,
  AvatarChipPicking,
} from "./views/common/AvatarChips.jsx";
import Custom from "./views/customdeck/Custom.jsx";
import ViewCards from "./views/customdeck/ViewCards.jsx";
import PlayingCard from "./views/common/PlayingCard.jsx";
import Results from "./views/results/Results.jsx";
import { io } from "socket.io-client";
const socket = io();

const customDecksSample = {
  skips: {
    questions: ["skipsq1", "skipsq2"],
    answers: ["skipsa1", "skipsa2"],
  },
  skipsgma: {
    questions: ["skipsgq1", "skipsgq1"],
    answers: ["skipsga1", "skipsga1"],
  },
};

const customUserInfo = {
  name: "Raymond",
  title: "The Wise",
  avatar:
    "https://upload.wikimedia.org/wikipedia/en/2/2d/SSU_Kirby_artwork.png",
};

export default function App() {
  //currentUser currently not getting defined
  const { signUp, currentUser, setCurrentUser, getDeck } = useAuth();
  const [pageView, setPageView] = useState("SignIn");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [gameState, setGameState] = useState({});
  //want to set the default deck from a db query
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
    setGameState(gameObj);
  });

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

  useEffect(() => {
    getDeck()
      .then((deck) => {
        setDefaultDeck(deck);
      })
      .catch((e) => console.log(e));
  }, []);

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
          <PlayingCard type="question" info="question example" />
          <br />
          <PlayingCard type="answer" info="answer example" />
        </div>
      ) : null}
      {pageView === "results" ? (
        <Results gameState={gameState} setPageView={setPageView} />
      ) : null}
    </>
  );
}
