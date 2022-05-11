import React, {useState} from 'react';
import Chat from '../chat/Chat.jsx'
import { io } from "socket.io-client";
import Typography from '@mui/material/Typography';
const socket = io();

import { AvatarChipWaiting } from '../common/AvatarChips.jsx';

const buttonStyle = {
  border: 'none',
  color: 'white',
  padding: '8px 20px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
}

export default function Results ({ winner, chatHistory, setChatHistory, currentUser, setCurrentUser }) {

  return (
    <div>
      <div>
        {winner.map(eachWinner => {
          return <AvatarChipWaiting user={eachWinner}/>
        })}
        <Typography variant='subtitle1'>
          <i>IS THE WINNER!!!</i>
        </Typography>
      </div>
      <Chat
        buttonStyle={buttonStyle}
        chatHistory={chatHistory}
        setChatHistory={setChatHistory}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    </div>
  );
}