import React, { useState, useEffect } from 'react';
import Chat from '../chat/Chat.jsx'
import { AvatarChipWaiting, AvatarChipPicking } from '../common/AvatarChips.jsx';
import AvatarList from '../common/AvatarList.jsx';
import CustomDeck from '../customdeck/CustomDeck.jsx';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { io } from "socket.io-client";
const socket = io();
// import {socket} from '../../App.jsx';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const sx = {
  mt: 3, mb: 2, width: 150, height: 50, borderRadius: 4,
  backgroundColor: "secondary.main",
  '&:hover': {
    backgroundColor: 'primary.grey',
  }
}

export default function Lobby({ theme, gameState, setPageView, customDecks, setSelectedCustomDeck, setCustomDeckTitle, chatHistory, setChatHistory, name, host, connectedUsers, defaultDeck, currentUser, setCurrentUser }) {
  const [gameCode, setGameCode] = useState('12345');

  function createGame() {
    socket.emit('new game', JSON.stringify({ users: connectedUsers, deck: defaultDeck }));
  }

  function handleCodeClick() {
    navigator.clipboard.writeText(gameCode)
      .then(() => {
        alert('Copied game code to clipboard: ' + gameCode);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="lobbyContainer">
        <div className="lobbyDiv">
          <h1 className="welcome"><strong>Welcome to the Lobby!</strong></h1>
          <div className="sessionSettingsDiv">
            <div className="game-code">
              <h3 onClick={handleCodeClick}>Game code: 12345</h3>
              <p><strong>click to copy</strong></p>
            </div>
            {host
              ? <div>
                <CustomDeck gameState={gameState}
                  setPageView={setPageView}
                  customDecks={customDecks}
                  setSelectedCustomDeck={setSelectedCustomDeck}
                  setCustomDeckTitle={setCustomDeckTitle} previousView={'Lobby'} />
              </div>
              : null
            }
          </div>
          <div className="buttonsDiv">
            {host ?
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1 }}
              >
                <Button type="submit" fullWidth variant="contained" sx={sx}
                  onClick={() => {
                    createGame();
                    setPageView('PlayerView');
                  }}>
                  Start Game!
                </Button>
              </motion.div>
              : null}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
            >
              <Button type="submit" fullWidth variant="contained" sx={sx}
                onClick={() => {
                  createGame();
                }}>
                Leave Game
              </Button>
            </motion.div>
          </div>
        </div>
        <div className="playerListContainer">
          <Chat
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
          <hr />
          <h2>Players Connected</h2>
          <div className="playerListDiv">
            <Stack spacing={2}>
              {connectedUsers.length ? connectedUsers.map((userObj, i) => {
                return (
                  <AvatarChipPicking key={i} user={userObj} />
                )
              }) : 'Waiting...'}
            </Stack>
          </div >
        </div >
      </div >
    </>
  )
}