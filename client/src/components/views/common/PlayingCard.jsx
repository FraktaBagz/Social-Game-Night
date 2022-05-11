import React from 'react'; import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const PlayingCard = ({ color, card, handleSelectCard }) => {

  // card object structure:
  // label: 'some prompt',
  // extra: '(ridiculous, senseless, foolish) ',
  // sets: 'default green',

  let cardColor;
  if (color === 'green') {
    cardColor = 'info.main'
  } else if (color === 'red') {
    cardColor = 'secondary.main'
  }

  // console.log(card)

  return (
    <Box>
      <Paper sx={{ borderRadius: 0, width: 275, height: 175, textAlign: 'right' }} elevation={4}>
        <Box sx={{ pt: 1, pl: 1, pr: 1, pb: 0, overflow: 'hidden' }}>
          <Typography variant='h4'>{card.label}</Typography>
        </Box>
        <Card sx={{ mt: 0, ml: 1, mr: 1, height: 115, bgcolor: cardColor }}>
          <Box component={Stack} direction="column" justifyContent="center" sx={{ textAlign: "left" }}>
            <Typography variant='h6'>
              {/* {card.extra} */}
              Extra goes here pr
            </Typography>
            <Typography variant='subtitle1'>
              {/* {card.sets} */}
              Sets goes here
            </Typography>
            {handleSelectCard ?
              <Button
                onClick={handleSelectCard}
                contained
                sx={{
                  color: 'primary.contrastText',
                  borderRadius: 15,
                }}
              >
                Select Card
              </Button>
              : <></>}
          </Box>
        </Card>
      </Paper>
    </Box>
  )

}

export default PlayingCard;