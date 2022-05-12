// CUSTOM DECK PAGE VIEW
import React, { useState, useEffect } from 'react';

import { useGame } from "../../../firebase/contexts/GameContext.js";

// MUI
// Styles
import { styled } from '@mui/material/styles';
// Layout
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// Inputs
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// Data Display
import Typography from '@mui/material/Typography';
// Icons
import AddIcon from '@mui/icons-material/Add';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// Theme reference
// const theme = createTheme({
//   palette: {
//     type: 'light',
//     primary: {
//       main: '#ea9e48',
//       contrastText: '#ffffff',
//       grey: '#2c2f3a',
//     },
//     secondary: {
//       main: '#e95d70',
//     },
//     background: {
//       default: '#ececec',
//     },
//     info: {
//       main: '#9ce774',
//     },
//   },
// });


export default function CustomDeck({ setPageView, customDecks, setSelectedCustomDeck, customDeckTitle, setCustomDeckTitle, previousView, currentUserUID }) {
  const deckNames = Object.keys(customDecks);
  const [decks, setDecks] = useState(deckNames);
  const [deckTitle, setDeckTitle] = useState('');
  const { initializeDeck } = useGame();

  useEffect(() => {
    setDecks(deckNames)
  }, [customDecks])

  return (

    <Container
      justifyContent="center"
      alignItems="center"
      sx={{
        flexWrap: 'wrap',
        backgroundColor: '#fac09a97',
      }}
    >
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#ddfa9a98',
        }}
      >

        <Stack >

          <Container
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              align="center"
              color="secondary.main"
              variant="h3">Choose your pack</Typography>
          </Container>
          <Container
            justifyContent="center"
            alignItems="center"
            sx={{
              width: '50vw',
              height: 300,
              backgroundColor: 'primary.main',
            }}
          >
            <Stack
              justifyContent="space-evenly"
              direction="row"
            >

              {decks.map(deck => (
                <Stack
                  justifyContent="space-evenly"
                  direction="row"
                  spacing={8}>
                <Item
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    width: 140,
                    height: 192,
                    borderRadius: 4,
                    backgroundColor: "background.default",
                    '&:hover': {
                      backgroundColor: 'primary.contrastText',
                    },
                  }}
                  onClick={() => (
                    setSelectedCustomDeck({ [deck]: customDecks[deck] }),
                    setCustomDeckTitle(deck)
                  )}>
                    {deck}
                  </Item>
                  <Item>
                    {deck}
                  </Item>
                  <Item>
                    {deck}
                  </Item>
                </Stack>

              ))}




              <Item>
                create new here
              </Item>
            </Stack>
            DECKS HERE
          </Container>


        </Stack>





      </Box>


      <Container
        justifyContent="center"
        alignItems="center"
        minWidth="25%"
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            width: '50%',
            display: 'flex',
            flexWrap: 'wrap',
          }}>
          {/* <Typography variant="h3"
          justify="center"
          align="center"
          sx={{
            width: '75%',
            alignItems: "center",
            justify: "center",
            color: 'secondary.main',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
          }} > */}
          <h3 className="custom-deck-title"><strong>Choose Your Deck!</strong></h3>
          {/* </Typography> */}
        </Stack>
        <Container
          className="custom-deck-container"
          sx={{
            width: 650,
            height: 300,
            backgroundColor: 'info.main',
          }} >
          {/* <Typography variant="h3">Custom deck</Typography> */}
          {/* <div onClick={() => (setPageView('HomePage'))}>back to homepage</div> */}

          <Stack
            justifyContent="space-evenly"
            direction="row"
          >
            {decks.map(deck => (
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                key={deck}>
                <Item
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    width: 140,
                    height: 192,
                    borderRadius: 4,
                    backgroundColor: "background.default",
                    '&:hover': {
                      backgroundColor: 'primary.contrastText',
                    },
                  }}
                  onClick={() => (
                    setSelectedCustomDeck({ [deck]: customDecks[deck] }),
                    setCustomDeckTitle(deck)
                  )}>
                  <Typography
                    justifyContent="center"
                    alignItems="center"
                    sx={{ height: '95%' }}
                  >
                    {deck}'s
                  </Typography>
                </Item>
                <Typography>Total Cards: {(customDecks[deck].greenCard).length + (customDecks[deck].redCard).length}</Typography>
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
              </Stack>
            ))}
            <Container
              justifyContent="center"
              alignItems="center"
              sx={{

                width: 140,
              }}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center">
                <Item
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    width: 140,
                    height: 192,
                    borderRadius: 4,
                    backgroundColor: "background.default",
                    '&:hover': {
                      backgroundColor: 'primary.contrastText',
                    },
                  }}
                >
                  <Stack
                    spacing={2}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ height: '95%' }}
                  >
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
                      console.log('userid: ', typeof (currentUserUID), `${currentUserUID}`, 'title"', typeof (deckTitle), deckTitle),
                      initializeDeck(`${currentUserUID}`, deckTitle),
                      setSelectedCustomDeck({
                        [deckTitle]: {
                          greenCard: [
                            {
                              label: 'adjective',
                              extra: '(synonyms) ',
                              sets: deckTitle,
                            }

                          ], redCard: [{
                            label: 'noun',
                            extra: 'sentence',
                            sets: deckTitle,
                          }]
                        }
                      }))}>save</Button>
                  </Stack>
                </Item>
                <Typography>Total Cards: 0</Typography>
              </Stack>
            </Container>
          </Stack>
        </Container >
      </Container >
    </Container>
  )
}
