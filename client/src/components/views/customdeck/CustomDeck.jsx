// CUSTOM DECK PAGE VIEW
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CustomDeck({ setPageView, customDecks, setSelectedCustomDeck }) {
  const deckNames = Object.keys(customDecks);
  const [decks, setDecks] = useState(deckNames);

  // should pass already customized decks in format below and send custom deck to database. with a post if deck doesn't exist or put request if deck exists already.
  // expected data per deck
  // {
  //   answers: [],
  //   questions: [],
  // }

  // const onClick = (e) => {
  //   e.preventDefault()
  //   setPageView('Custom')
  // }

  return (
    <div >
      {console.log(customDecks)}
      <div>Custom deck</div>
      <div onClick={() => (setPageView('HomePage'))}>back to homepage</div>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        {decks.map(deck => (
          <Item
            onClick={() => (
              setPageView('ViewCards'),
              setSelectedCustomDeck({ [deck]: customDecks[deck] })
        )}>{deck}</Item>
        ))}
      <Item onClick={() => (setPageView('Custom'))}>Custom</Item>
    </Stack>
    </div >
  )
}