// CUSTOM DECK PAGE VIEW
import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import PlayingCard from '../common/PlayingCard.jsx';

import { useGame } from "../../../firebase/contexts/GameContext.js";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ViewCards({
  gameState, setPageView, selectedCustomDeck, customDeckTitle, setCustomDecktitle, currentUserUID
}) {
  const { removeFromCustomDeck } = useGame();
  const decks = Object.keys(selectedCustomDeck);
  const deckName = decks[0]
  const deck = selectedCustomDeck[deckName]

  const deletecard = (userId, deckName, card, color) => {
    // removeFromCustomDeck(userId, deckName, card, color)
    //   .then(() => (console.log('card deleted')))
    //   .catch((e) => (console.log(e)));

    // each time the card is deleted, useEffect custom deck to dynamically render the page with this update

    console.log(currentUserUID)
    console.log('delete', userId, deckName, card, color)
  }

  return (
    <Container >
      <div>AllCards in deck</div>
      {/* <div onClick={() => (setPageView('CustomDeck'))}>back to custom deck page</div> */}
      <h1>{deckName}</h1>
      <div>Questions</div>
      <div>
        <Stack direction="row" spacing={2}>
          {deck.questions.map((question, key) => (
            <div key={key}>
              <div onClick={() => (deletecard(currentUserUID, customDeckTitle, { label: question.label, extra: question.extra, sets: question.sets }, 'green'))}>X</div>
              <Item >{question.label}</Item>
              <PlayingCard color="green" card={{
                label: question.label,
                extra: question.extra,
                sets: question.sets,
              }} />
            </div>
          ))}
        </Stack>
      </div>
      <div>Answers</div>
      <div>
        <Stack direction="row" spacing={2}>
          {deck.answers.map((answer, key) => (
            <div key={key}>
              <div onClick={() => (deletecard(currentUserUID, customDeckTitle, { label: answer.label, extra: answer.extra, sets: answer.sets }, 'red'))}>X</div>
              <Item>{answer.label}</Item>
              <PlayingCard color="red" card={{
                label: answer.label,
                extra: answer.extra,
                sets: answer.sets,
              }} />
            </div>
          ))}
        </Stack>
      </div>
    </Container>
  )
}