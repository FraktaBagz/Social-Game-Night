import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import PlayingCard from "../common/PlayingCard.jsx";
import { io } from "socket.io-client";
const socket = io();

export default function JudgeView({ gameState, setIsJudge, isJudge, submittedCards, setGameState }) {
  const [selectedUser, setSelectedUser] = useState({});
  const [winningCard, setWinningCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState({});

  const handleWinnerPicked = (e) => {
    console.log('handleWinnerPicked fired -------')
    e.preventDefault();
    console.log('selectUser: ', selectedUser)
    socket.emit(
      "game action",
      JSON.stringify({
        action: "judge selection",
        game: gameState,
        user: selectedUser,
      })
    );
    setIsJudge(false);

    // console.log('use effect here----------------------------------------- ')
    // socket.emit(
    //   "game action",
    //   JSON.stringify({
    //     action: "new round",
    //     game: gameState,
    //     user: selectedUser,
    //   })
    // );
  };

  useEffect(() => {
    console.log('use effect here----------------------------------------- ')
    socket.emit(
      "game action",
      JSON.stringify({
        action: "new round",
        game: gameState,
        user: selectedUser,
      })
    );
  }, [gameState.winner])

  return (
    <Container style={{ textAlign: "center" }}>
      {isJudge ? (
        <Typography variant="h5">YOU ARE JUDGING SELECT A WINNER</Typography>
      ) : (
        <Typography variant="h5">WAITING FOR JUDGE TO PICK A WINNER</Typography>
      )}
      {Object.keys(selectedCard).length === 0 ? (
        <Stack direction="row" spacing={2} mt={2} sx={{ flexWrap: "wrap" }}>
          {submittedCards.map((card) => (
            <PlayingCard
              color="red"
              card={card[1][0]}
              handleSelectCard={
                isJudge
                  ? (e) => {
                      e.preventDefault();
                      console.log("does this work?");
                      setSelectedCard(card[1][0]);
                      setSelectedUser(card[0]);
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
          {isJudge ? (
            <>
              <Button variant="contained" onClick={handleWinnerPicked}>
                Confirm
              </Button>
              <Button variant="contained" onClick={() => setSelectedCard({})}>
                Deselect
              </Button>
            </>
          ) : null}
        </Stack>
      )}
    </Container>
  );
}
