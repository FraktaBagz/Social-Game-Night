import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import PlayingCard from "../common/PlayingCard.jsx";

export default function JudgeView({ gameState }) {
  const [selected, setSelected] = useState({});

  const handleWinnerPicked = (e) => {
    e.preventDefault();
    console.log('winning card confirmed')
    //card object stored in <selected> variable
    //add game logic here to submit this card as a the winning one
  }

  //hard code array of all submitted cards:
  const submittedCards = [
    {
      label: "Absurd",
      extra: "(ridiculous, senseless, foolish) ",
      sets: "default red",
    },
    {
      label: "Abundant",
      extra: "(plentiful, ample, numerous) ",
      sets: "default red",
    },
    {
      label: "Addictive",
      extra: "(obsessive, consuming, captivating) ",
      sets: "default red",
    },
    {
      label: "Absurd",
      extra: "(ridiculous, senseless, foolish) ",
      sets: "default red",
    },
  ];

  return (
    <Container style={{ textAlign: "center" }}>
      <Typography variant="h5">
        YOU ARE JUDGING SELECT A WINNER
      </Typography>
      {Object.keys(selected).length === 0 ? (
        <Stack direction="row" spacing={2} mt={2} sx={{ flexWrap: "wrap" }}>
          {submittedCards.map((card) => (
            <PlayingCard
              color="red"
              card={card}
              handleSelectCard={(e) => {
                e.preventDefault();
                setSelected(card);
              }}
            />
          ))}
        </Stack>
      ) : (
        <Stack
          direction="column"
          spacing={2}
          mt={2}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <PlayingCard color="red" card={selected} />
          <Button variant="contained" onClick={handleWinnerPicked}>
            Confirm
          </Button>
          <Button variant="contained" onClick={() => setSelected({})}>
            Deselect
          </Button>
        </Stack>
      )}
    </Container>
  );
}
