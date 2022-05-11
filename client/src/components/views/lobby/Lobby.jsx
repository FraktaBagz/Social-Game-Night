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
import { io } from "socket.io-client";
const socket = io();

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

export default function Lobby({ theme, gameState, setPageView, customDecks, setSelectedCustomDeck, setCustomDecktitle, chatHistory, setChatHistory, name, host, connectedUsers, defaultDeck, currentUser, setCurrentUser }) {
  var count = 0;

  function createGame() {
    socket.emit('new game', JSON.stringify({users: connectedUsers, deck: defaultDeck}));
  }

  var count = 0;
  return (
    <>
      <div className="lobbyContainer">
        <div className="lobbyDiv" style={{ float: 'left', width: '60%', borderStyle: 'solid', margin: '10px' }}>
          <h2>Welcome to the Lobby</h2>
          <div className="sessionSettingsDiv" style={{ float: 'left', width: '70%', border: 'solid', margin: '10px' }}>
            <AvatarList/>
            <h1>Game code: -----</h1>
            {host
              ? <>
                <h2>Choose Your Deck!</h2>
                <CustomDeck gameState={gameState}
                  setPageView={setPageView}
                  customDecks={customDecks}
                  setSelectedCustomDeck={setSelectedCustomDeck}
                  setCustomDecktitle={setCustomDecktitle} previousView={'Lobby'} />
              </>
              : null
            }
          </div>
          <div className="buttonsDiv" style={{ float: 'left', width: '20%', borderStyle: 'solid', margin: '10px' }}>
            {host ?
              <Button type="submit" fullWidth variant="contained" sx={sx}
                onClick={() => {
                  createGame();
                  setPageView('PlayerView')
                }}>
                Start Game!
              </Button>
              : null}
            <Button type="submit" fullWidth variant="contained" sx={sx}
              onClick={() => {
                setPageView('HomePage')
              }}>
              Leave Game
            </Button>
          </div>
        </div>
        <div className="playerListContainer" style={{ float: 'left', width: '30%', borderStyle: 'solid', margin: '10px' }}>
          <h2>Players Connected</h2>
          <div className="playerListDiv">
            <Stack spacing={2}>
              {connectedUsers.map((userObj) => {
                return (
                  <AvatarChipPicking key={count+=1} user={userObj} />
                )
              })}
            </Stack>
            <Chat
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              currentUser={currentUser || 'fart'}
              setCurrentUser={setCurrentUser}
            />
          </div>
        </div>
      </div>
    </>
  )
}