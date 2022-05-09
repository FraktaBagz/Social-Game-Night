// CUSTOM DECK PAGE VIEW
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CustomDeck({ setPageView, customDecks, setSelectedCustomDeck, customDeckTitle, setCustomDecktitle, previousView }) {

  // if (Object.keys(customDecks).length <= 0) {
  // }
  const deckNames = Object.keys(customDecks);
  const [decks, setDecks] = useState(deckNames);

  // should pass already customized decks in format below and send custom deck to database. with a post if deck doesn't exist or put request if deck exists already.
  // expected data per deck
  // {
  //   answers: [],
  //   questions: [],
  // }

  return (
    <Container
      sx={{
        width: 300,
        height: 300,
        backgroundColor: 'primary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }} >
      {/* <Typography variant="h3">Custom deck</Typography> */}
      {/* <div onClick={() => (setPageView('HomePage'))}>back to homepage</div> */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        {decks.map(deck => (
          <div key={deck}>
            <span>Total Cards: {(customDecks[deck].questions).length + (customDecks[deck].answers).length}</span>
            <Item
              >{deck}'s
            </Item>
            <Button onClick={() => (
              setPageView('Custom'),
              setSelectedCustomDeck({ [deck]: customDecks[deck] }),
              setCustomDecktitle(deck)
              )}>Edit Deck
            </Button>
          </div>
        ))}
        <Item onClick={() => (setPageView('Custom'), setCustomDecktitle(''), setSelectedCustomDeck({ 'title here': {questions:['question here'], answers:['answer here']}}))}>+</Item>
    </Stack>
    </Container >
  )
}
