// CUSTOM DECK PAGE VIEW
import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ViewCards({ setPageView, selectedCustomDeck }) {
  const decks = Object.keys(selectedCustomDeck);
  const deckName = decks[0]
  const deck = selectedCustomDeck[deckName]

  const deletecard = (type, card) => {
    // put request here
    console.log('delete', type, card)
  }

  return (
    <div >
      <div>AllCards in deck</div>
      <div onClick={() => (setPageView('CustomDeck'))}>back to custom deck page</div>
      <h1>{deckName}</h1>
      <div>Questions</div>
      <div>
        <Stack direction="row" spacing={2}>
          {deck.questions.map((question, key) => (
            <div key={key}>
              <div onClick={ () => (deletecard('question', question))}>X</div>
              <Item >{question}</Item>
            </div>
          ))}
        </Stack>
      </div>
      <div>Answers</div>
      <div>
        <Stack direction="row" spacing={2}>
          {deck.answers.map((answer, key) => (
            <div key={key}>
              <div onClick={ () => (deletecard('answer', answer))}>X</div>
              <Item>{answer}</Item>
            </div>
          ))}
        </Stack>
      </div>
    </div>
  )
}