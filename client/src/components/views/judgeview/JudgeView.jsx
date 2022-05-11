import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import PlayingCard from "../common/PlayingCard.jsx";

export default function JudgeView({ gameState, isJudge, submittedCards }) {
  const [selected, setSelected] = useState({});

  const handleWinnerPicked = (e) => {
    e.preventDefault();
    console.log("winning card confirmed");
    //card object stored in <selected> variable
    //add game logic here to submit this card as a the winning one
    socket.emit(
      "game action",
      JSON.stringify({
        action: "play card",
        game: gameState,
        user: currentUser,
        card: selected,
      })
    );
  };

  return (
    <Container style={{ textAlign: "center" }}>
      {isJudge ? (
        <Typography variant="h5">YOU ARE JUDGING SELECT A WINNER</Typography>
      ) : (
        <Typography variant="h5">WAITING FOR JUDGE TO PICK A WINNER</Typography>
      )}

      {Object.keys(selected).length === 0 ? (
        <Stack direction="row" spacing={2} mt={2} sx={{ flexWrap: "wrap" }}>
          {submittedCards.map((card) => (
            <PlayingCard
              color="red"
              card={card}
              handleSelectCard={
                isJudge
                  ? (e) => {
                      e.preventDefault();
                      setSelected(card);
                    }
                  : null
              }
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
          {isJudge ? (
            <>
              <Button variant="contained" onClick={handleWinnerPicked}>
                Confirm
              </Button>
              <Button variant="contained" onClick={() => setSelected({})}>
                Deselect
              </Button>
            </>
          ) : (
            <></>
          )}
        </Stack>
      )}
    </Container>
  );
}
