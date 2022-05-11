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
}) {
  const [selected, setSelected] = useState({});
  const [isJudge, setIsJudge] = useState(false);

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
  };

  // this.gameState.userInformation[user.UID] = {
  //   cards: [],
  //   points: 0,
  // }
  // let currentUser = {
  //   name: "Raymond",
  //   title: "The Wise",
  //   avatar:
  //     "https://upload.wikimedia.org/wikipedia/en/2/2d/SSU_Kirby_artwork.png",
  // };

  useEffect(() => {
    console.log("currentUser: ", currentUser);
    console.log("gameState: ", gameState);
    console.log("connectedUsers: ", connectedUsers);
  }, []);

  useEffect(() => {
    if (gameState.judgeIndex && connectedUsers[gameState.judgeIndex].name === currentUser.name) {
      setIsJudge(true);
    }
  }, [gameState]);

  //hard code some fake data to use
  // connectedUsers = [
  //   {
  //     name: "Nathaniel",
  //     title: "The Brave",
  //     avatar:
  //       "https://www.kindpng.com/picc/m/3-35984_transparent-emotion-clipart-transparent-background-happy-emoji-png.png",
  //   },
  //   {
  //     name: "Raymond",
  //     title: "The Wise",
  //     avatar:
  //       "https://upload.wikimedia.org/wikipedia/en/2/2d/SSU_Kirby_artwork.png",
  //   },
  //   {
  //     name: "Matthew",
  //     title: "The Hell Raiser",
  //     avatar:
  //       "https://mpng.subpng.com/20180624/zyt/kisspng-magic-rush-heroes-wikia-character-western-restaurants-5b2fccfed0dfb9.9185671315298593268556.jpg",
  //   },
  //   {
  //     name: "Kim",
  //     title: "The Wizard",
  //     avatar:
  //       "https://w7.pngwing.com/pngs/525/864/png-transparent-wizard-holding-staff-dungeons-dragons-pathfinder-roleplaying-game-d20-system-wizard-magician-wizard-cartoon-d20-system-wizard-thumbnail.png",
  //   },
  // ];

  // let gameState = {
  //   currentDeck: {
  //     questions: [
  //       {
  //         label: "some prompt",
  //         extra: "(ridiculous, senseless, foolish) ",
  //         sets: "default green",
  //       },
  //       {
  //         label: "some prompt",
  //         extra: "(plentiful, ample, numerous) ",
  //         sets: "default green",
  //       },
  //       {
  //         label: "some prompt",
  //         extra: "(obsessive, consuming, captivating) ",
  //         sets: "default green",
  //       },
  //     ],
  //     answers: [
  //       {
  //         label: "Absurd",
  //         extra: "(ridiculous, senseless, foolish) ",
  //         sets: "default red",
  //       },
  //       {
  //         label: "Abundant",
  //         extra: "(plentiful, ample, numerous) ",
  //         sets: "default red",
  //       },
  //       {
  //         label: "Addictive",
  //         extra: "(obsessive, consuming, captivating) ",
  //         sets: "default red",
  //       },
  //       {
  //         label: "Absurd",
  //         extra: "(ridiculous, senseless, foolish) ",
  //         sets: "default red",
  //       },
  //       {
  //         label: "Abundant",
  //         extra: "(plentiful, ample, numerous) ",
  //         sets: "default red",
  //       },
  //       {
  //         label: "Addictive",
  //         extra: "(obsessive, consuming, captivating) ",
  //         sets: "default red",
  //       },
  //     ],
  //   },
  //   judgeIndex: 0,
  //   judging: false,
  //   userInformation: {}, //UID: {cards: [], points:0}
  //   questionCard: {
  //     label: "some prompt",
  //     extra: "(obsessive, consuming, captivating) ",
  //     sets: "default green",
  //   }, //{label: 'string', extra: 'lala', set: 'lala'}
  //   hasPicked: [], // do we need this?
  //   submittedCards: [
  //     {
  //       label: "Absurd",
  //       extra: "(ridiculous, senseless, foolish) ",
  //       sets: "default red",
  //     },
  //     {
  //       label: "Abundant",
  //       extra: "(plentiful, ample, numerous) ",
  //       sets: "default red",
  //     },
  //     {
  //       label: "Addictive",
  //       extra: "(obsessive, consuming, captivating) ",
  //       sets: "default red",
  //     },
  //   ],
  //   finished: false,
  //   winner: null,
  // };

  const { judgeIndex, judging, submittedCards, questionCard } = gameState;

  //isJudge = true/false if you are the judge
  //judging = true/false if all answers have been submitted
  let playField;
  if (isJudge) {
    if (judging) {
      playField = <JudgeView isJudge={true} submittedCards={submittedCards} />;
    } else {
      playField = <JudgeWaiting />;
    }
  } else {
    if (judging) {
      playField = <JudgeView isJudge={false} submittedCards={submittedCards} />;
    } else {
      if (Object.keys(selected).length === 0) {
        playField = (
          <Stack direction="row" spacing={2} mt={2} sx={{ flexWrap: "wrap" }}>
            {gameState.gameState ? gameState.gameState.userInformation[currentUser.name].cards.map((answer) =>
              <PlayingCard color='red' card={answer} handleSelectCard={(e) => {
                e.preventDefault();
                //answer is whatever card that gets clicked on
                console.log(answer);
                socket.emit('game action', JSON.stringify({action: 'play card', game: gameState, user: currentUser, card: answer[0]}))
              }}/>
            ) : <div>loading</div> }
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
            <Button variant="contained" onClick={handleConfirmSelection}>
              Confirm
            </Button>
            <Button variant="contained" onClick={() => setSelected({})}>
              Deselect
            </Button>
          </Stack>
        );
      }
    }
  }

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
          <AvatarChipPicking key={index} userInfo={user} />
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
              {gameState.gameState ?
                <PlayingCard color="green" card={gameState.gameState.questionCard} />
                : null}
            </Grid>
            <Grid item xs={12}>
              <AvatarChipPicking
                userInfo={connectedUsers[judgeIndex]}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* ---------------------------- MIDDLE -------------------------------- */}
        <Grid item xs={6}>
          {playField}
        </Grid>
        {/* ---------------------------- RIGHT SIDE ---------------------------- */}
        <Grid item xs={3}>
          <Chat chatHistory={chatHistory} setChatHistory={setChatHistory} />
        </Grid>
        {/* -------------------------------------------------------------------- */}
      </Grid>
    </div>
  );
}
