import React, { useState, useEffect } from 'react';
import SignUpPage from '../signup/SignUp.jsx';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useFormControl } from '@mui/material/FormControl';
import { motion } from 'framer-motion';
import { io } from "socket.io-client";
const socket = io();
// import {socket} from '../../App.jsx';


export default function HomePage({ currentUser, setCurrentUser, setPageView, theme, handleLogState, setConnectedUsers, connectedUsers }) {
  const handleLogOut = (e) => {
    e.preventDefault();
    setPageView('SignIn');
    handleLogState();
  }

  // const [joiningGame, setJoiningGame] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // const joinGameWithCode = (e) => {
  //   e.preventDefault();
  //   const data = new FormData(e.currentTarget)
  //   console.log(data.get('joinCode'));
  //   //Add logic here to verify the code
  //   //then switch view using setPageView('') to the lobby
  // }

  useEffect(() => {
    // getUser(currentUserID)
    //   .then((user) => {
    //     setCurrentUser(user.data());
    //     setIsLoaded(true);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    console.log('here in homepage', currentUser)

    setIsLoaded(true);
  }, [currentUser]);

  if (!isLoaded) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className="homepage">
      <Grid
        container
        className="home-container"
        alignSelf="center"
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item xd={6} xlg={6}>
          <Grid
            container
            direction="column"
            justifyContent="space-around"
            alignItems="center"
          >
            <Grid item xs={12} sm={6}>
              <img src="https://www.clipartmax.com/png/full/206-2063998_retrieved-on-2017-june-14th-comparing-apples-to-oranges.png" alt="logo"></img>
              <div className="title">
                <h1><strong>APPLES TO ORANGES!</strong></h1>
              </div>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xd={6} xlg={6}>
          <Grid
            container
            rowSpacing={{ xs: 1, sm: 2, md: 3 }}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            direction="column"
            justifyContent="space-around"
            alignItems="center"
          >
            <Grid item xs={12} sm={6}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1 }}
              >
                <Button
                  onClick={() => {
                    setPageView('Lobby')
                    console.log('joining game')
                    socket.emit('join game', JSON.stringify({ user: currentUser })) 
                  }}
                  value="user"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    width: 500,
                    height: 75,
                    borderRadius: 6,
                    backgroundColor: "secondary.main",
                    '&:hover': {
                      backgroundColor: 'primary.grey',
                    },
                  }}
                >
                  CREATE A GAME
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1 }}
              >
                <Button
                  // type="submit"
                  onClick={() => {
                    setPageView('Lobby')
                    console.log('joining game')
                    socket.emit('join game', JSON.stringify({ user: currentUser }))
                  }}
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    width: 500,
                    height: 75,
                    borderRadius: 6,
                    backgroundColor: "secondary.main",
                    '&:hover': {
                      backgroundColor: 'primary.grey',
                    },
                  }}
                >
                  JOIN A GAME
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <motion.div whileHover={{ scale: 1.02 }}>
                <Box
                  sx={{
                    width: 500,
                    height: 100,
                    marginTop: 3,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    backgroundColor: 'info.main',
                    '&:hover': {
                      backgroundColor: 'info.main',
                      // opacity: [0.9, 0.8, 0.8],[]
                    },
                    borderRadius: 8,
                  }}
                >
                  <Typography component="h1" variant="h5">
                    Avatar
                  </Typography>
                  <Typography component="h1" variant="h5">
                    {currentUser ? currentUser.name : 'Display Name'}
                  </Typography>
                  <Button sx={{ color: "#000000" }} onClick={handleLogOut}>
                    LOG OUT
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            {/* {
                joiningGame ?
                  <Grid item xs={12} sm={6}>
                    <Box component="form" noValidate onSubmit={joinGameWithCode}>
                      <Grid container direction="column">
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Enter Code"
                            required
                            name="joinCode"
                            type="joinCode"
                            sx={{ width: 500 }}
                            InputProps={{
                              classes: {
                                notchedOutline: {
                                  borderWidth: "1px",
                                  borderColor: "yellow !important"
                                }
                              }
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 1 }}
                          >
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              sx={{
                                mt: 3,
                                mb: 2,
                                width: 500,
                                height: 75,
                                borderRadius: 6,
                                backgroundColor: "secondary.main",
                                '&:hover': {
                                  backgroundColor: 'primary.grey',
                                },
                              }}
                              onClick={(e) => {
                                socket.emit('join game')
                              }}
                            >
                              Enter
                            </Button>
                          </motion.div>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  : <></>
              } */}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}