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
// const socket = io('localhost:3001');

const customDecksSample = {
  skipasddfs: {
    // questions: [
    greenCard: [
      {
        label: 'skiplabel1',
        extra: '1(ridiculous, senseless, foolish) ',
        sets: '1default green',
      },
      {
        label: '2some prompt',
        extra: '2(plentiful, ample, numerous) ',
        sets: '2default green',
      },
      {
        label: '3some prompt',
        extra: '3(obsessive, consuming, captivating) ',
        sets: '3default green',
      },],
    // answers: [
    redCard: [
      {
        label: '1Absurd',
        extra: '1(ridiculous, senseless, foolish) ',
        sets: '1default red',
      },
      {
        label: '2Abundant',
        extra: '2(plentiful, ample, numerous) ',
        sets: '2default red',
      },
      {
        label: '3Addictive',
        extra: '3(obsessive, consuming, captivating) ',
        sets: '3default red',
      },
      {
        label: '4Absurd',
        extra: '4(ridiculous, senseless, foolish) ',
        sets: '4default red',
      },
      {
        label: '5bundant',
        extra: '5(plentiful, ample, numerous) ',
        sets: '5default red',
      },
      {
        label: 'Addictive',
        extra: '(obsessive, consuming, captivating) ',
        sets: 'default red',
      },]
  },
  skipasds: {
    // questions: [
    greenCard: [
      {
        label: 'skiplabel1',
        extra: '1(ridiculous, senseless, foolish) ',
        sets: '1default green',
      },
      {
        label: '2some prompt',
        extra: '2(plentiful, ample, numerous) ',
        sets: '2default green',
      },
      {
        label: '3some prompt',
        extra: '3(obsessive, consuming, captivating) ',
        sets: '3default green',
      },],
    // answers: [
    redCard: [
      {
        label: '1Absurd',
        extra: '1(ridiculous, senseless, foolish) ',
        sets: '1default red',
      },
      {
        label: '2Abundant',
        extra: '2(plentiful, ample, numerous) ',
        sets: '2default red',
      },
      {
        label: '3Addictive',
        extra: '3(obsessive, consuming, captivating) ',
        sets: '3default red',
      },
      {
        label: '4Absurd',
        extra: '4(ridiculous, senseless, foolish) ',
        sets: '4default red',
      },
      {
        label: '5bundant',
        extra: '5(plentiful, ample, numerous) ',
        sets: '5default red',
      },
      {
        label: 'Addictive',
        extra: '(obsessive, consuming, captivating) ',
        sets: 'default red',
      },]
  },
  skipsaaaa: {
    // questions: [
    greenCard: [
      {
        label: 'skiplabel1',
        extra: '1(ridiculous, senseless, foolish) ',
        sets: '1default green',
      },
      {
        label: '2some prompt',
        extra: '2(plentiful, ample, numerous) ',
        sets: '2default green',
      },
      {
        label: '3some prompt',
        extra: '3(obsessive, consuming, captivating) ',
        sets: '3default green',
      },],
    // answers: [
    redCard: [
      {
        label: '1Absurd',
        extra: '1(ridiculous, senseless, foolish) ',
        sets: '1default red',
      },
      {
        label: '2Abundant',
        extra: '2(plentiful, ample, numerous) ',
        sets: '2default red',
      },
      {
        label: '3Addictive',
        extra: '3(obsessive, consuming, captivating) ',
        sets: '3default red',
      },
      {
        label: '4Absurd',
        extra: '4(ridiculous, senseless, foolish) ',
        sets: '4default red',
      },
      {
        label: '5bundant',
        extra: '5(plentiful, ample, numerous) ',
        sets: '5default red',
      },
      {
        label: 'Addictive',
        extra: '(obsessive, consuming, captivating) ',
        sets: 'default red',
      },]
  },
  skipssss: {
    // questions: [
    greenCard: [
      {
        label: 'skiplabel1',
        extra: '1(ridiculous, senseless, foolish) ',
        sets: '1default green',
      },
      {
        label: '2some prompt',
        extra: '2(plentiful, ample, numerous) ',
        sets: '2default green',
      },
      {
        label: '3some prompt',
        extra: '3(obsessive, consuming, captivating) ',
        sets: '3default green',
      },],
    // answers: [
    redCard: [
      {
        label: '1Absurd',
        extra: '1(ridiculous, senseless, foolish) ',
        sets: '1default red',
      },
      {
        label: '2Abundant',
        extra: '2(plentiful, ample, numerous) ',
        sets: '2default red',
      },
      {
        label: '3Addictive',
        extra: '3(obsessive, consuming, captivating) ',
        sets: '3default red',
      },
      {
        label: '4Absurd',
        extra: '4(ridiculous, senseless, foolish) ',
        sets: '4default red',
      },
      {
        label: '5bundant',
        extra: '5(plentiful, ample, numerous) ',
        sets: '5default red',
      },
      {
        label: 'Addictive',
        extra: '(obsessive, consuming, captivating) ',
        sets: 'default red',
      },]
  },
  skipgmaa: {
    // questions: [
    greenCard: [
      {
        label: 'skiplabel1',
        extra: '1(ridiculous, senseless, foolish) ',
        sets: '1default green',
      },
      {
        label: '2some prompt',
        extra: '2(plentiful, ample, numerous) ',
        sets: '2default green',
      },
      {
        label: '3some prompt',
        extra: '3(obsessive, consuming, captivating) ',
        sets: '3default green',
      },],
    // answers: [
    redCard: [
      {
        label: '1Absurd',
        extra: '1(ridiculous, senseless, foolish) ',
        sets: '1default red',
      },
      {
        label: '2Abundant',
        extra: '2(plentiful, ample, numerous) ',
        sets: '2default red',
      },
      {
        label: '3Addictive',
        extra: '3(obsessive, consuming, captivating) ',
        sets: '3default red',
      },
      {
        label: '4Absurd',
        extra: '4(ridiculous, senseless, foolish) ',
        sets: '4default red',
      },
      {
        label: '5bundant',
        extra: '5(plentiful, ample, numerous) ',
        sets: '5default red',
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

const dummyWinner = [
  {
    name: "Nathaniel",
    title: "The Brave",
    avatar:
      "https://www.kindpng.com/picc/m/3-35984_transparent-emotion-clipart-transparent-background-happy-emoji-png.png",
  }
];

const dummyWinners = [
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
  }
];

// const App = function () {
export default function App() {
  const { signUp, currentUser, setCurrentUser } = useAuth();
  const { getUser, getDeck, getDecks } = useGame();
  // const [pageView, setPageView] = useState('SignIn');
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pageView, setPageView] = useState('CustomDeck');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [gameState, setGameState] = useState({});
  const [defaultDeck, setDefaultDeck] = useState(customDecksSample.skip);
  const [customDecks, setCustomDecks] = useState(customDecksSample);
  const [selectedCustomDeck, setSelectedCustomDeck] = useState({
    title: {
      // questions: [
      greenCard: [
      ],
      // answers: [
      redCard: [
      ]
    },
  });
  const [deletedCard, setDeletedCard] = useState(false);
  const [postCard, setPostCard] = useState(false);
  const [customDeckTitle, setCustomDeckTitle] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { user: "Bot", text: "This is the beginning of the chat history" },
  ]);
  const [name, setName] = useState('');
  const [host, setHost] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(() => {
    if (currentUser) {
      console.log("currentUser Name: ", currentUser.name);
      console.log("currentUser ID: ", currentUser.UID);
    }
    socket.on("new game", (gameObj) => {
      console.log('Starting new game...');
      gameObj = JSON.parse(gameObj);
      setGameState(gameObj);
      setPageView('PlayerView');
    });
    socket.on('join game', (msg) => {
      console.log('A new player has entered the room');
      msg = JSON.parse(msg);
      setConnectedUsers([...connectedUsers, msg.user]);
    })
    socket.on('host change', (msg) => {
      msg = JSON.parse(msg)
      if (currentUser !== null) {
        if (msg !== null) {
          if (currentUser.UID === msg.UID) {
            setHost(true)
          }
        }
      }
    })
    socket.on('update connected users', (msg) => {
      msg = JSON.parse(msg)
      setConnectedUsers(msg)
    })
    socket.on('update connected users2', (msg) => {
      msg = JSON.parse(msg)
      setConnectedUsers(msg)
    })
    socket.on('request current users', () => {
      console.log('Socket is requesting current user...')
      socket.emit('rebuild current users', JSON.stringify(currentUser))
    })
    socket.on('set host', () => {
      setHost(true)
    })
    socket.on("game action", (gameObj) => {
      console.log('gameAction received...');
      gameObj = JSON.parse(gameObj);
      setGameState(gameObj);
    });
  }, [currentUser]);

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
    getDeck('default', 'default')
      .then((deck) => {
        if (deck.greenCard) {
          deck['questions'] = deck['greenCard'];
          deck['answers'] = deck['redCard'];
          delete deck['greenCard'];
          delete deck['redCard'];
        }
        setDefaultDeck(deck);
      })
      .catch((e) => console.log(e));
  }, [isLoggedIn]);

  // grabs custom decks pls keep
  useEffect(() => {
    if (currentUser) {
      getDecks(currentUser.UID)
        .then((usersCustomDecks) => {
          setCustomDecks(usersCustomDecks);
          setDeletedCard(false);
          setPostCard(false);
        })
        .catch((e) => console.log(e));
    }
  }, [currentUser, deletedCard, postCard]);

  var handleViewClick = (view) => {
    // e.preventDefault();
    setPageView(view);
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
      <Navbar handleViewClick={handleViewClick} pageView={pageView} />
      {/* <button onClick={handleViewClick} value='SignUp'>SignUp</button>
      <button onClick={handleViewClick} value='SignIn'>SignIn</button>
      <button onClick={handleViewClick} value='HomePage'>HomePage</button>
      <button onClick={handleViewClick} value='JudgeView'>JudgeView</button>
      <button onClick={handleViewClick} value='PlayerView'>PlayerView</button>
      <button onClick={handleViewClick} value='Lobby'>Lobby</button>
      <button onClick={handleViewClick} value='LobbyRestyle'>LobbyRestyle</button>
      <button onClick={handleViewClick} value='CustomDeck'>CustomDeck</button>
      <button onClick={handleViewClick} value='avatarExample'>avatarExample</button>
      <button onClick={handleViewClick} value='results'>results</button> */}
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
          setCurrentUser={setCurrentUser}
          setGameState={setGameState}
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
          setCustomDeckTitle={setCustomDeckTitle}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
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
          setCustomDeckTitle={setCustomDeckTitle}
        />
      ) : null}
      {pageView === "CustomDeck" ? (
        <CustomDeck
          gameState={gameState}
          setPageView={setPageView}
          customDecks={customDecks}
          setSelectedCustomDeck={setSelectedCustomDeck}
          setCustomDeckTitle={setCustomDeckTitle}
          pageView={pageView}
          // currentUserUID={currentUser.UID}
        />
      ) : null}
      {pageView === "Custom" ? (
        <Custom
          gameState={gameState}
          setPageView={setPageView}
          previousView={"Lobby"}
          setSelectedCustomDeck={setSelectedCustomDeck}
          selectedCustomDeck={selectedCustomDeck}
          customDeckTitle={customDeckTitle}
          setCustomDeckTitle={setCustomDeckTitle}
          // currentUserUID={currentUser.UID}
          setDeletedCard={setDeletedCard}
          setPostCard={setPostCard}
          deletedCard={deletedCard}
          postCard={postCard}
        />
      ) : null}
      {pageView === "ViewCards" ? (
        <ViewCards
          gameState={gameState}
          setPageView={setPageView}
          selectedCustomDeck={selectedCustomDeck}
          customDeckTitle={customDeckTitle}
          setCustomDeckTitle={setCustomDeckTitle}
          // currentUserUID={currentUser.UID}
          setDeletedCard={setDeletedCard}
          setPostCard={setPostCard}
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
        <Results
          gameState={gameState}
          setPageView={setPageView}
          winner={dummyWinners}
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      ) : null}

    </>
  );
}

// export {socket, App,};