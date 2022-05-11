import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


export default function JudgeWaiting() {
  return (
    <Container style={{textAlign: "center"}}>
      <Container >
        <Typography variant="h3">
          WAITING FOR ALL PLAYERS TO SUBMIT
        </Typography>
      </Container>
      <img src="https://i.imgur.com/DbCN26K.gif" width="480" height="317" frameBorder="0"></img>
    </Container>
  )
}