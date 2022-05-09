import React from 'react';import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const PlayingCard = () => {

  return (
    <Box>
      <Paper sx={{ borderRadius: 0, width: 275, height: 175, textAlign: 'right' }}>
        <Box sx={{ p: 1 }}>
          <Typography variant='h3'>sheesh</Typography>
        </Box>
        <Card sx={{ m: 1 }}>
          <Box component={Stack} direction="column" justifyContent="center">
            <Typography variant='h6'>
              words
            </Typography>
            <Typography variant='subtitle1'>
              title
            </Typography>
            <Typography variant='subtitle1'>
              title
            </Typography>
          </Box>
        </Card>
      </Paper>
    </Box>
  )

}

export default PlayingCard;