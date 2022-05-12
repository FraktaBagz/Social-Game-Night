import React, {useState} from 'react';
import ResultsChat from './results_chat/ResultsChat.jsx'
import { io } from "socket.io-client";
import Typography from '@mui/material/Typography';
const socket = io();
// import {socket} from '../../App.jsx';

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
    <div className='results-page'>
    <div className='winner-container'>
        {winner.map(eachWinner => {
          return <AvatarChipWaiting user={eachWinner}/>
        })}
        <Typography variant='subtitle1'>
          <i>IS THE WINNER!!!</i>
        </Typography>
        <div style={{marginTop: '1px'}}>
      <ResultsChat
        buttonStyle={buttonStyle}
        chatHistory={chatHistory}
        setChatHistory={setChatHistory}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
        </div>
    </div>
    </div>
  );
}