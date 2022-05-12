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

  useEffect(() => {
    console.log("currentUser: ", currentUser);
    console.log("gameState: ", gameState);
    console.log("connectedUsers: ", connectedUsers);
  }, []);

  useEffect(() => {
    if (gameState.gameState && currentUser) {
      const judge = gameState.users[gameState.gameState.judgeIndex];
      if (currentUser.name === judge.name) {
        setIsJudge(true);
      }
    }
    console.log("gameState---------------------------- ", gameState);
  }, [gameState]);

  let playField;
  if (gameState.gameState && currentUser) {
    if (isJudge) {
      if (judging) {
        playField = (
          <JudgeView isJudge={true} setIsJudge={setIsJudge} setGameState={setGameState} gameState={gameState} submittedCards={submittedCards} />
        );
      } else {
        playField = <JudgeWaiting />;
      }
    } else {
      if (judging) {
        playField = (
          <JudgeView isJudge={false} setIsJudge={setIsJudge} setGameState={setGameState} gameState={gameState} submittedCards={submittedCards} />
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
      <div className="playerViewContainer">
        {/* <Stack
            className="player-list"
            direction="row"
            spacing={2}
            mt={2}
            mb={2}
            sx={{ flexWrap: "wrap", ml: 2 }}
          > */}
        {/* {connectedUsers.map((user, index) => (
              <AvatarChipPicking key={index} userInfo={user} />
            ))} */}

        {/* SAMPLE */}
        {/* <AvatarChipPicking
              user={connectedUsers[judgeIndex]}
            />
            <AvatarChipPicking
              userInfo={connectedUsers[judgeIndex]}
            />
            <AvatarChipPicking
              userInfo={connectedUsers[judgeIndex]}
            />
            <AvatarChipPicking
              userInfo={connectedUsers[judgeIndex]}
            />
            <AvatarChipPicking
              userInfo={connectedUsers[judgeIndex]}
            />
            <AvatarChipPicking
              userInfo={connectedUsers[judgeIndex]}
            />
          </Stack> */}

        <Grid
          container
          direction="row"
          sx={{
            height: "100%"
          }}
        >
          {/* ---------------------------- LEFT SIDE ---------------------------- */}
          <Grid item sm={3}>
            <div className="prompt">
              <Grid
                container
                direction="column"
                sx={{
                  alignItems: "center",
                  backgroundColor: "#ECECEC",
                  padding: "15px",
                  height: "350px",
                  borderRadius: "15px"
                }}
              >
                <Grid item xs={12}>
                  <strong>Prompt:</strong>
                  <hr />
                  <Grid item xs={12} mb={10}>
                    {gameState.gameState ?
                      <PlayingCard color="green" card={gameState.gameState.questionCard} />
                      : null}
                  </Grid>
                </Grid>

              </Grid>
            </div>
            <Grid
              container
              direction="column"
              sx={{ alignItems: "center", justifyContent: "center" }}
            >
              <Grid item xs={12}>
                <AvatarChipPicking
                  userInfo={connectedUsers[judgeIndex]}
                />
              </Grid>
            </Grid>

          </Grid>
          {/* ---------------------------- RIGHT SIDE -------------------------------- */}
          <Grid
            item sm={6.3}
            sx={{
              height: "calc(100vh - 134px)",
              backgroundColor: "#E95D70",
              borderRadius: "15px",
              padding: "15px",
              margin: "18px"
            }}
          >
            {playField}
          </Grid>
        </Grid>
        <div className="playerListContainer">
          <Chat chatHistory={chatHistory} setChatHistory={setChatHistory} currentUser={currentUser || 'fart'} setCurrentUser={setCurrentUser} />
          <hr />
          <h2>Players</h2>
          <div className="playerListDiv">
            <Stack spacing={2}>
              {connectedUsers.length ? connectedUsers.map((userObj, i) => {
                return (
                  <AvatarChipPicking key={i} user={userObj} />
                )
              }) : 'Waiting...'}
            </Stack>
          </div >
        </div>
      </div >
    );
  }
  return null;
}
