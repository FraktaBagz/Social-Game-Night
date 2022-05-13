import React, { useState } from 'react';

import { useGame } from "../../../firebase/contexts/GameContext.js";

import ViewCards from './ViewCards.jsx';
import PlayingCard from '../common/PlayingCard.jsx';

// MUI
// Styles
import { styled } from '@mui/material/styles';
// Layout
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
// Inputs
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// Data Display
import Typography from '@mui/material/Typography';
// Icons
import AddIcon from '@mui/icons-material/Add';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

export default function Custom({ gameState, setSelectedCustomDeck, selectedCustomDeck, setPageView, customDeckTitle, setCustomDeckTitle, previousView, currentUserUID, setDeletedCard, setPostCard }) {
  const { addToCustomDeck, getDeck } = useGame();
  const [editTitle, setEditTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(customDeckTitle);
  const [cardTypeCust, setCardTypeCust] = useState('green')
  const [newLabel, setnewLabel] = useState('');
  const [newExtras, setNewExtras] = useState('');
  const [createButton, setCreateButton] = useState(false);

  const editTitleFunc = () => (
    !editTitle
      ?
      <Box>
        {customDeckTitle.length === 0
          ?
          <Typography variant="h4">
            <Box sx={{ fontStyle: 'italic', m: 1 }}>{customDeckTitle}</Box></Typography>
          : <Typography variant="h4">{customDeckTitle}</Typography>}
        {/* <Button variant="outlined" onClick={() => (setEditTitle(true))}>edit</Button> */}
      </Box>
      :
      <Box>
        <TextField
          required
          id="outlined-required"
          label="Deck Title"
          defaultValue={customDeckTitle}
          onChange={(e) => (
            setNewTitle(e.target.value)
          )}
        />
        <br></br>
        <Button variant="outlined" onClick={() => (setEditTitle(false), setCustomDeckTitle(newTitle))}>save</Button>
      </Box>
  )

  const addCardFunc = () => (
    <Box>
      <Box sx={{ p: 2 }}>
        {cardTypeCust === 'green' ?
          <Stack direction="row" spacing={2}>
            <Button variant="contained">adjective</Button>
            <Button variant="outlined" onClick={() => (setCardTypeCust('red'))}>    noun    </Button>
          </Stack>
          :
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={() => (setCardTypeCust('green'))}>adjective</Button>
            <Button variant="contained">    noun    </Button>
          </Stack>
        }
      </Box>
    </Box>
  )

  const createPromptFunc = () => (
    <Box>
      {createButton
        ?
        <>
          <div>{newLabel}</div>
        </>
        :
        <>
          <TextField
            required
            id="outlined-required"
            label={"NEW " + cardTypeCust.toUpperCase()}
            defaultValue=""
            size="small"
            onChange={(e) => (
              setnewLabel(e.target.value)
            )}
          />
        </>
      }
    </Box>
  )

  const createExtrasFunc = () => (
    <Box>
      {createButton
        ?
        <>
          <div>{newLabel}</div>
        </>
        :
        <>
          <TextField
            required
            id="outlined-required"
            label={"extras"}
            defaultValue=""
            size="small"
            onChange={(e) => (
              setNewExtras(e.target.value)
            )}
          />
        </>
      }
    </Box>
  )

  const createButtonFunc = () => (
    <Box>
      {createButton
        ?
        null
        :
        <>
          <Button variant="" onClick={() => (
            newLabel.length > 0 ? (createCard(currentUserUID, newTitle, { label: newLabel, extra: newExtras, sets: newTitle }, cardTypeCust),
              setCreateButton(true)) : null
          )}>create card <AddIcon /></Button>
        </>
      }
    </Box>
  )

  const createnewLabelButton = () => (
    <Box>
      {createButton
        ?
        <>
          <Button variant="" onClick={() => (
            setCreateButton(false),
            setNewTitle(customDeckTitle),
            setnewLabel(''),
            setNewExtras('')
          )}>Create New Card!<AddIcon /></Button>
        </>
        : null
      }
    </Box>
  )

  const createCard = (userId, deckName, card, color) => {
    console.log(userId, deckName, card, color)
    addToCustomDeck(userId, deckName, card, color)
      .then(() => (
        setPostCard(true),
        console.log('card created')))
      .then(() => (
        getDeck(deckName, userId)
          .then((getdeck) => {
            console.log('getting custom deck after card posting', getdeck)
            setSelectedCustomDeck({ [deckName]: getdeck })
          })
          .catch((e) => (
            console.log(e)
          ))
      ))
      .catch((e) => (console.log(e)));
    // expected format: userId, deckName, card, color
    // put request to add specific card to users deck depending on what cardtype it is
  }

  return (
    <Container>
      <Button variant="outlined" onClick={() => (setPageView(`${previousView}`), setCustomDeckTitle(''))}>back to {previousView}<SportsEsportsIcon /></Button>
      <Button variant="outlined" onClick={() => (setPageView('CustomDeck'), setCustomDeckTitle(''))}>back to custom pack<AutoFixHighIcon /></Button>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box>
            <Typography variant="h3">Add a Card!</Typography>
            <Paper sx={{ width: 305 }} elevation={(5)}>
              {editTitleFunc()}
              {addCardFunc()}
              <PlayingCard color={cardTypeCust} card={{
                label: createPromptFunc(),
                extra: createExtrasFunc(),
                sets: newTitle,
              }} />
              {createButtonFunc()}
              {createnewLabelButton()}
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box>
            <ViewCards
              gameState={gameState}
              setPageView={setPageView}
              selectedCustomDeck={selectedCustomDeck}
              customDeckTitle={customDeckTitle}
              setCustomDeckTitle={setCustomDeckTitle}
              currentUserUID={currentUserUID}
              setDeletedCard={setDeletedCard}
              setPostCard={setPostCard}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}