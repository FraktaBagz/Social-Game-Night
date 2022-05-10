import React, {useState} from 'react';
import Chat from '../chat/Chat.jsx'
import { io } from "socket.io-client";
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

export default function Results (winnerName) {

  return (
    <div>
      <div>
        <AvatarChipWaiting userInfo={winnerName}/> IS THE WINNER!!!
      </div>
      <Chat buttonStyle={buttonStyle}/>
    </div>
  )
}