import React from 'react';import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const PlayingCard = ({ type, info }) => {

  let cardColor;
  if (type === 'question') {
    cardColor = 'info.main'
  } else if (type === 'answer') {
    cardColor = 'secondary.main'
  }

  return (
    <Box>
      <Paper sx={{ borderRadius: 0, width: 275, height: 175, textAlign: 'right' }} elevation={4}>
        <Box sx={{ pt: 1, pl: 1, pr: 1, pb: 0, overflow: 'hidden' }}>
          <Typography variant='h4'>example</Typography>
        </Box>
        <Card sx={{ mt: 0, ml: 1, mr: 1, height: 115,  bgcolor: cardColor }}>
          <Box component={Stack} direction="column" justifyContent="center" sx={{ textAlign: "left" }}>
            <Typography variant='h6'>
              {info}
            </Typography>
            <Typography variant='subtitle1'>
              {info}
            </Typography>
            <Typography variant='subtitle1'>
              {info}
            </Typography>
          </Box>
        </Card>
      </Paper>
    </Box>
  )

}

export default PlayingCard;