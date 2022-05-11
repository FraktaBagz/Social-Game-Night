import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import PlayingCard from "../common/PlayingCard.jsx";

export default function JudgeView({ gameState, isJudge, submittedCards }) {
  const [selectedUser, setSelectedUser] = useState({});
  const [hasPicked, setHasPicked] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const handleWinnerPicked = (e) => {
    e.preventDefault();
    socket.emit(
      "game action",
      JSON.stringify({
        action: "judge selection",
        game: gameState,
        user: selectedUser,
      })
    );
    setHasPicked(true);
  };

  const handleNextRound = (e) => {
    e.preventDefault();
    socket.emit(
      "game action",
      JSON.stringify({
        action: "new round",
        game: gameState,
        user: selectedUser,
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
                      setSelectedUser(card.user);
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
          <PlayingCard color="red" card={selectedCard} />
          {isJudge && !hasPicked ? (
            <>
              <Button variant="contained" onClick={handleWinnerPicked}>
                Confirm
              </Button>
              <Button variant="contained" onClick={() => setSelected({})}>
                Deselect
              </Button>
            </>
          ) : (
            <>
              {isJudge ? (
                <>
                  <Typography>{`WINNER IS: ${selectedUser.name}`}</Typography>
                  <Button onClick={handleNextRound}>Start Next Round</Button>
                </>
              ) : (
                <Typography>{`WINNER IS: ${selectedUser.name}`}</Typography>
              )}
            </>
          )}
        </Stack>
      )}
    </Container>
  );
}
