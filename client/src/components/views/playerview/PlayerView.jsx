import React, { useState, useEffect } from "react";
import Chat from "../chat/Chat.jsx";
import {
  AvatarChipWaiting,
  AvatarChipPicking,
} from "../common/AvatarChips.jsx";
import PlayingCard from "../common/PlayingCard.jsx";
import CustomDeck from "../customdeck/CustomDeck.jsx";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { io } from "socket.io-client";
import JudgeWaiting from "../judgeview/JudgeWaiting.jsx";
import JudgeView from "../judgeview/JudgeView.jsx";
const socket = io();

export default function PlayerView({
  gameState,
  connectedUsers,
  chatHistory,
  setChatHistory,
  customDecksSample,
  currentUser,
  setCurrentUser,
  setGameState,
}) {
  // const winnerRef = useRef(null);
  const [selected, setSelected] = useState({});
  const [isJudge, setIsJudge] = useState(false);
  const [hasPicked, setHasPicked] = useState(false);

  if (gameState.gameState) {
    var { judgeIndex, judging, submittedCards, questionCard } =
      gameState.gameState;
  }

  const handleConfirmSelection = (e) => {
    //selcted state contains the card object to submit to socket.io
    console.log(selected);
    socket.emit(
      "game action",
      JSON.stringify({
        action: "play card",
        game: gameState,
        user: currentUser,
        card: selected,
      })
    );
    setHasPicked(true);
  };

  // useEffect(() => {
  //   setSelected({});
  //   setHasPicked(false);
  // }, []);
  // function usePrevious(value) {
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = value;
  //   });
  //   return ref.current;
  // }

  // if (gameState.gameState) {
  //   const { winner } = gameState
  //   const prevAmount = usePrevious({winner});
  // }
  // useEffect(() => {
  //   if(prevAmount.receiveAmount !== receiveAmount) {

  //   }

  // }, [receiveAmount, sendAmount])

  useEffect(() => {
    if (gameState.gameState && currentUser) {
      const judge = gameState.users[gameState.gameState.judgeIndex];
      if (currentUser.name === judge.name) {
        setIsJudge(true);
      }
    }
    console.log("gameState---------------------------- ", gameState);
  }, [gameState]);

  // socket.on('next round', (msg) => {
  //   setSelected({});
  //   setHasPicked(false);
  // })

  // socket.on('new round', (msg) => {
  //   if (gameState.gameState && currentUser) {
  //     const judge = gameState.users[gameState.gameState.judgeIndex];
  //     if (currentUser.name === judge.name) {
  //       setIsJudge(true);
  //     }
  //   }
  // })

  // socket.on('new game', (msg) => {
  //   if (gameState.gameState && currentUser) {
  //     const judge = gameState.users[gameState.gameState.judgeIndex];
  //     if (currentUser.name === judge.name) {
  //       setIsJudge(true);
  //     }
  //   }
  // })

  let playField;
  if (gameState.gameState && currentUser) {
    if (isJudge) {
      if (judging) {
        playField = (
          <JudgeView
            isJudge={true}
            setIsJudge={setIsJudge}
            setGameState={setGameState}
            gameState={gameState}
            submittedCards={submittedCards}
          />
        );
      } else {
        playField = <JudgeWaiting />;
      }
    } else {
      if (judging) {
        playField = (
          <JudgeView
            isJudge={false}
            setIsJudge={setIsJudge}
            setGameState={setGameState}
            gameState={gameState}
            submittedCards={submittedCards}
          />
        );
      } else {
        if (Object.keys(selected).length === 0) {
          playField = (
            <Stack direction="row" spacing={2} mt={2} sx={{ flexWrap: "wrap" }}>
              {gameState.gameState ? (
                gameState.gameState.userInformation[currentUser.name].cards.map(
                  (answer) => {
                    if (answer !== null) {
                      return (
                        <PlayingCard
                          color="red"
                          card={answer}
                          handleSelectCard={(e) => {
                            e.preventDefault();
                            console.log(answer);
                            setSelected(answer);
                          }}
                        />
                      );
                    }
                  }
                )
              ) : (
                <div>loading</div>
              )}
            </Stack>
          );
        } else {
          playField = (
            <Stack
              direction="column"
              spacing={2}
              mt={2}
              sx={{ alignItems: "center", justifyContent: "center" }}
            >
              <PlayingCard color="red" card={selected} />
              {!hasPicked ? (
                <>
                  <Button variant="contained" onClick={handleConfirmSelection}>
                    Confirm
                  </Button>
                  <Button variant="contained" onClick={() => setSelected({})}>
                    Deselect
                  </Button>
                </>
              ) : null}
            </Stack>
          );
        }
      }
    }
  }

  if (playField) {
    return (
      <div className="PlayerViewContainer">
        <Stack
          direction="row"
          spacing={2}
          mt={2}
          mb={40}
          sx={{ flexWrap: "wrap", ml: 2 }}
        >
          {connectedUsers.map((user, index) => (
            <AvatarChipPicking key={index} user={user} />
          ))}
        </Stack>

        <Grid
          container
          direction="row"
          alignSelf="flex-end"
          sx={{ alignItems: "flex-end" }}
        >
          {/* ---------------------------- LEFT SIDE ---------------------------- */}
          <Grid item xs={3}>
            <Grid
              container
              direction="column"
              sx={{ alignItems: "center", justifyContent: "center" }}
            >
              <Grid item xs={12} mb={10}>
                {gameState.gameState ? (
                  <PlayingCard
                    color="green"
                    card={gameState.gameState.questionCard}
                  />
                ) : null}
              </Grid>
              <Grid item xs={12}>
                {gameState.gameState ? (
                  <AvatarChipPicking user={connectedUsers[judgeIndex]} />
                ) : null}
              </Grid>
            </Grid>
          </Grid>
          {/* ---------------------------- MIDDLE -------------------------------- */}
          <Grid item xs={6}>
            <Button
              variant="contained"
              sx={{
                color: "primary.contrastText",
                backgroundColor: "secondary.main",
                borderRadius: 15,
              }}
              onClick={(e) => {
                e.preventDefault;
                setSelected({});
                setHasPicked(false);
              }}
            >NEXT ROUND</Button>
            {playField}
          </Grid>
          {/* ---------------------------- RIGHT SIDE ---------------------------- */}
          <Grid item xs={3}>
            <Chat
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              currentUser={currentUser || "fart"}
              setCurrentUser={setCurrentUser}
            />
          </Grid>
          {/* -------------------------------------------------------------------- */}
        </Grid>
      </div>
    );
  }
  return null;
}
