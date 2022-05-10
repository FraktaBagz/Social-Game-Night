import React, { useState, useEffect } from 'react';
import Chat from '../chat/Chat.jsx'
import { AvatarChipWaiting, AvatarChipPicking } from '../common/AvatarChips.jsx';
import PlayingCard from '../common/PlayingCard.jsx';
import CustomDeck from '../customdeck/CustomDeck.jsx';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { io } from "socket.io-client";
const socket = io();

export default function PlayerView() {
  const fakeGameState = {
    currentDeck: [],
    judgeIndex: 0,
    judging: false,
    userInformation: {
    },
    questionCard: null,
    hasPicked: [],
    submittedCards: [],
    finished: true,
    winner: null,
  }

  return (
    <div className="PlayerViewContainer">
      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', ml: 2 }}>
      
        <AvatarChipPicking userInfo={{
          name: 'Nathaniel',
          title: 'The Brave',
          avatar: 'https://www.kindpng.com/picc/m/3-35984_transparent-emotion-clipart-transparent-background-happy-emoji-png.png'
        }} />
        <AvatarChipPicking userInfo={{
          name: 'Nathaniel',
          title: 'The Brave',
          avatar: 'https://www.kindpng.com/picc/m/3-35984_transparent-emotion-clipart-transparent-background-happy-emoji-png.png'
        }} />
        <AvatarChipPicking userInfo={{
          name: 'Nathaniel',
          title: 'The Brave',
          avatar: 'https://www.kindpng.com/picc/m/3-35984_transparent-emotion-clipart-transparent-background-happy-emoji-png.png'
        }} />
        <AvatarChipPicking userInfo={{
          name: 'Nathaniel',
          title: 'The Brave',
          avatar: 'https://www.kindpng.com/picc/m/3-35984_transparent-emotion-clipart-transparent-background-happy-emoji-png.png'
        }} />
        <AvatarChipPicking userInfo={{
          name: 'Nathaniel',
          title: 'The Brave',
          avatar: 'https://www.kindpng.com/picc/m/3-35984_transparent-emotion-clipart-transparent-background-happy-emoji-png.png'
        }} />
        <AvatarChipPicking userInfo={{
          name: 'Nathaniel',
          title: 'The Brave',
          avatar: 'https://www.kindpng.com/picc/m/3-35984_transparent-emotion-clipart-transparent-background-happy-emoji-png.png'
        }} />
        <AvatarChipPicking userInfo={{
          name: 'Nathaniel',
          title: 'The Brave',
          avatar: 'https://www.kindpng.com/picc/m/3-35984_transparent-emotion-clipart-transparent-background-happy-emoji-png.png'
        }} />
        <AvatarChipPicking userInfo={{
          name: 'Nathaniel',
          title: 'The Brave',
          avatar: 'https://www.kindpng.com/picc/m/3-35984_transparent-emotion-clipart-transparent-background-happy-emoji-png.png'
        }} />
      </Stack>

      <Grid container direction="row" sx={{ alignItems: 'flex-end'}} >
        {/* ---------------------------- LEFT SIDE ---------------------------- */}
        <Grid item xs={2}>
          <Grid container direction="column">
            <Grid item xs={12}>
              <PlayingCard color='green' card={{}} /><br />
            </Grid>
            <Grid item xs={12}>
              {/* Judge avatar */}
            </Grid>
          </Grid>
        </Grid>
        {/* ---------------------------- MIDDLE -------------------------------- */}
        <Grid item xs={6}>
          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
            <PlayingCard color='red' card={{}} /><br />
            <PlayingCard color='red' card={{}} /><br />
            <PlayingCard color='red' card={{}} /><br />
            <PlayingCard color='red' card={{}} /><br />
            <PlayingCard color='red' card={{}} /><br />
            <PlayingCard color='red' card={{}} /><br />
            <PlayingCard color='red' card={{}} /><br />
          </Stack>
        </Grid>
        {/* ---------------------------- RIGHT SIDE ---------------------------- */}
        <Grid item xs={4}>
          <Chat />
        </Grid>
        {/* -------------------------------------------------------------------- */}
      </Grid>
    </div>
  )
}