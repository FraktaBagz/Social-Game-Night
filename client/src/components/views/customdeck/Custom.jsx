import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import ViewCards from './ViewCards.jsx';
import PlayingCard from '../common/PlayingCard.jsx';

import { useGame } from "../../../firebase/contexts/GameContext.js";

export default function Custom({ gameState, selectedCustomDeck, setPageView, customDeckTitle, setCustomDecktitle, previousView, currentUserUID }) {
  const { addToCustomDeck} = useGame();
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
        {customDeckTitle.length <= 0
          ?
          <Typography variant="h4">
            <Box sx={{ fontStyle: 'italic', m: 1 }}>Title</Box></Typography>
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
        <Button variant="outlined" onClick={() => (setEditTitle(false), setCustomDecktitle(newTitle))}>save</Button>
      </Box>
  )

  const addCardFunc = () => (
    <Box>
      <Box>
        {cardTypeCust === 'green' ?
          <Stack direction="row" spacing={2}>
            <Button variant="contained">Question</Button>
            <Button variant="outlined" onClick={() => (setCardTypeCust('red'))}>Answer</Button>
          </Stack>
          :
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={() => (setCardTypeCust('green'))}>Question</Button>
            <Button variant="contained">
              Answer
            </Button>
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
            label={"NEW " + cardTypeCust}
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
        <>
          <div>created!</div>
        </>
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
    // addToCustomDeck(userId, deckName, card, color)
    //   .then(() => (console.log('card created')))
    //   .catch((e) => (console.log(e)));
    // expected format: userId, deckName, card, color
    // put request to add specific card to users deck depending on what cardtype it is
  }

  return (
    <Container>
      <Button variant="outlined" onClick={() => (setPageView(`${previousView}`), setCustomDecktitle(''))}>back to {previousView} page</Button>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box>
            <Typography variant="h3">custom cards</Typography>
            <Paper elevation={(5)}>
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
            <ViewCards gameState={gameState} setPageView={setPageView} selectedCustomDeck={selectedCustomDeck} customDeckTitle={customDeckTitle} setCustomDecktitle={setCustomDecktitle}  currentUserUID={currentUserUID}/>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}