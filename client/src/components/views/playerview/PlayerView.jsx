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
  setPageView,
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
      if (gameState.users[gameState.gameState.judgeIndex]){
        const judge = gameState.users[gameState.gameState.judgeIndex];
        if (currentUser.name === judge.name) {
          setIsJudge(true);
        }
      } else {
        // go through process of finding winner
        // iterate through user list
        let winners = [gameState.gameState.userInformation[0]];
        // keep winner array
        for (let i = 1; i < gameState.gameState.userInformation; i++) {
          let winner = gameState.gameState.userInformation[i]
          // if current iteration === current winner, push
          if (winner.points > winners[0].points) {
            // if current iteration > current winner, restart array
            winners = [winner];
          } else if (winner.points === winners[0].points) {
            winners.push(winner)
          }
        }
        // set winner in gameState to the winners
        gameState.gameState.winner = winners;
        // change page view to 'results'
        setPageView('results');
      }
    }
    console.log("gameState---------------------------- ", gameState);
  }, [gameState]);

  socket.on('next round', () => {
    console.log('new round')
    setSelected({});
    setHasPicked(false);
  })

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
            height: "100%",
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
                  borderRadius: "15px",
                }}
              >
                <Grid item xs={12}>
                  <strong>Prompt:</strong>
                  <hr />
                  <Grid item xs={12} mb={10}>
                    {gameState.gameState ? (
                      <PlayingCard
                        color="green"
                        card={gameState.gameState.questionCard}
                      />
                    ) : null}
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
                <AvatarChipWaiting user={connectedUsers[judgeIndex]} />
              </Grid>
            </Grid>
          </Grid>
          {/* ---------------------------- RIGHT SIDE -------------------------------- */}
          <Grid
            item
            sm={6.3}
            sx={{
              height: "calc(100vh - 134px)",
              backgroundColor: "#E95D70",
              borderRadius: "15px",
              padding: "15px",
              margin: "18px",
            }}
          >
            {playField}
          </Grid>

        </Grid>
        {/* ---------------------------- RIGHT SIDE -------------------------------- */}
        <Grid
          item sm={6.3}
          sx={{
            height: "calc(100vh - 134px)",
            backgroundColor: "#EA9E48",
            borderRadius: "15px",
            padding: "15px",
            margin: "18px"
          }}
        >
          {playField}
        </Grid>
        <div className="playerListContainer">
          <Chat
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            currentUser={currentUser || "fart"}
            setCurrentUser={setCurrentUser}
          />
          <hr />
          <h2>Players</h2>
          <div className="playerListDiv">
            <Stack spacing={2}>
              {connectedUsers.length
                ? connectedUsers.map((userObj, i) => {
                  return <AvatarChipPicking key={i} user={userObj} score={gameState.gameState.userInformation[userObj.name].points} />;
                })
                : "Waiting..."}
            </Stack>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
