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


export default function CustomDeck({ setPageView, customDecks, setSelectedCustomDeck, customDeckTitle, setCustomDeckTitle, previousView, currentUserUID, pageView }) {
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
        // backgroundColor: '#fac09a97',
      }}
    >
      <Box
        sx={{
          width: '100%',
          // backgroundColor: '#ddfa9a98',
        }}
      >

        <Stack >

          <Container
            justifyContent="center"
            alignItems="center"
          >
            {pageView === 'CustomDeck'
              ? <Typography
                align="center"
                color="secondary.main"
                variant="h3">
                Customize Your Pack!
              </Typography>
              : <Typography
                align="center"
                color="secondary.main"
                variant="h3">
                Choose Your Pack!
              </Typography>
            }
          </Container>

          <Container
            justifyContent="center"
            alignItems="center"
            sx={{
              width: '50vw',
              overflow: 'auto',
              position: 'relative',
              height: 300,
              // background: 'linear-gradient(0deg, #fe6b8b 30%, #ff8e53 90%)',
              background: 'linear-gradient(to left, rgba(246, 246, 246, 0.632) 0%, rgba(0,0,0,0) 20%)',
              backgroundColor: 'info.main',

              // '&::-webkit-scrollbar': {
              //   width: '0em',
              //   height: '0em'
              // },
              // // '&::-webkit-scrollbar-track': {
              // //   boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
              // //   webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
              // // },
              // '&::-webkit-scrollbar-thumb': {
              //   backgroundColor: '#ffffff0',
              //   outline: '0px solid slategrey'
              // }
            }}
          >
            <Stack
              justifyContent="space-evenly"
              direction="row"
              spacing={6}
              sx={{
                width: "max-content",
                overflow: "scroll",
                position:'absolute',
                // '&::-webkit-scrollbar': {
                //   width: '0em',
                //   height: '0em'
                // },
                // '&::-webkit-scrollbar-track': {
                //   boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                //   webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                // },
                // '&::-webkit-scrollbar-thumb': {
                //   backgroundColor: '#ffffff0',
                //   outline: '0px solid slategrey'
                // }
              }}
            >
              {pageView === 'CustomDeck' ?
                <Item
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    width: 140,
                    height: 192,
                    borderRadius: 4,
                    backgroundColor: "background.default",
                  }}
                >
                  <Typography align="center"
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                    justify="center"
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
                        label="Pack Title"
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
                        }))}>save<AddIcon /></Button>
                    </Stack>
                  </Typography>

                </Item>
                : null
              }

              {decks.map(deck => (
                <Stack
                  justifyContent="space-evenly"
                  direction="row-reverse"
                  spacing={8}
                >
                  <Box textAlign='center'>
                    <Item
                      type="submit"
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
                      <Typography align="center"
                        sx={{
                          height: '100%',
                          // display: 'flex',
                          // flexDirection: 'column',
                          justifyContent: 'center',
                        }}
                        justify="center"
                      >{deck}</Typography>
                    </Item>
                    <Typography align="center">Total Cards: {(customDecks[deck].greenCard).length + (customDecks[deck].redCard).length}</Typography>
                    {pageView === 'CustomDeck' ? <Button type="submit"
                      variant="contained"
                      align="center"
                      sx={{
                        justifyContent: 'center',
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
                    </Button> : null}
                  </Box>
                </Stack>

              ))}


            </Stack>
          </Container>
        </Stack>
      </Box>
    </Container>
  )
}
