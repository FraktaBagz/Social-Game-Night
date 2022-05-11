// CUSTOM DECK PAGE VIEW
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useGame } from "../../../firebase/contexts/GameContext.js";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CustomDeck({ setPageView, customDecks, setSelectedCustomDeck, customDeckTitle, setCustomDeckTitle, previousView, currentUserUID }) {
  const deckNames = Object.keys(customDecks);
  const [decks, setDecks] = useState(deckNames);
  const [deckTitle, setDeckTitle] = useState('');
  const { initializeDeck } = useGame();

  useEffect(() => {
    setDecks(deckNames)
  }, [customDecks])

  // should pass already customized decks in format below and send custom deck to database. with a post if deck doesn't exist or put request if deck exists already.
  // expected data per deck
  // {
  //   answers: [],
  //   questions: [],
  // }

  return (
    <Container
      className="custom-deck-container"
      sx={{
        width: 650,
        height: 300,
        backgroundColor: 'info.main',
      }} >
      {/* <Typography variant="h3">Custom deck</Typography> */}
      {/* <div onClick={() => (setPageView('HomePage'))}>back to homepage</div> */}
      <h3 className="custom-deck-title"><strong>Choose Your Deck!</strong></h3>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        {decks.map(deck => (
          <div key={deck}>
            <Item
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                width: 75,
                height: 25,
                borderRadius: 4,
                backgroundColor: "primary.main",
                '&:hover': {
                  backgroundColor: 'primary.contrastText',
                },
              }}
              onClick={() => (
                setSelectedCustomDeck({ [deck]: customDecks[deck] }),
                setCustomDeckTitle(deck)
              )}>{deck}'s
            </Item>
            <span>Total Cards: {(customDecks[deck].greenCard).length + (customDecks[deck].redCard).length}</span>
            <Button type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                width: 75,
                height: 25,
                borderRadius: 4,
                backgroundColor: "secondary.main",
                '&:hover': {
                  backgroundColor: 'primary.grey',
                },
              }} onClick={() => (
                setPageView('Custom'),
                setSelectedCustomDeck({ [deck]: customDecks[deck] }),
                setCustomDeckTitle(deck)
              )}>Edit
            </Button>
          </div>
        ))}
        <Item >
          <TextField
            required
            id="outlined-required"
            label="Deck Title"
            defaultValue={customDeckTitle}
            onChange={(e) => (
              setCustomDeckTitle(e.target.value),
              setDeckTitle(e.target.value)
            )} />
          <Button variant="outlined" onClick={() => (setPageView('Custom'),
          console.log('userid: ', typeof(currentUserUID), `${currentUserUID}`, 'title"', typeof(deckTitle), deckTitle ),
          initializeDeck(`${currentUserUID}`, deckTitle),
          setSelectedCustomDeck({
            [deckTitle]: {
              greenCard: [
                {
                  label: 'some prompt',
                  extra: '(ridiculous, senseless, foolish) ',
                  sets: 'default green',
                }

              ], redCard: [{
                label: 'some prompt',
                extra: '(ridiculous, senseless, foolish) ',
                sets: 'default green',
              }]
            }
          }))}>save</Button>
        </Item>
      </Stack>
    </Container >
  )
}
