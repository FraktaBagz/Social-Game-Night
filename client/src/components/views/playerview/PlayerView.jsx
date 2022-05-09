import React, { useState, useEffect } from 'react';
import Chat from '../chat/Chat.jsx'
import { AvatarChipWaiting, AvatarChipPicking } from '../common/AvatarChips.jsx';
import CustomDeck from '../customdeck/CustomDeck.jsx';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { io } from "socket.io-client";
const socket = io();

export default function PlayerView () {

  return (
    <div className="PlayerViewContainer">
      <div className="Board">

      </div>
      <Chat/>
    </div>
  )
}