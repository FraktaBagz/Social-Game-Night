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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormControl } from '@mui/material/FormControl';


export default function HomePage ({ currentUser, setCurrentUser, setPageView }) {
  const handleLogOut = (e) => {
    e.preventDefault();
    setCurrentUser({})
    setPageView('SignUp')
  }

  const [joiningGame, setJoiningGame] = useState(false)

  const joinGameWithCode = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget)
    console.log(data.get('joinCode'));
    //Add logic here to verify the code
    //then switch view using setPageView('') to the lobby
  }

  useEffect(() => {
    console.log(currentUser)
  }, [])


const theme = createTheme({
  palette: {
    primary: {
      light: '#9CE774',
      main: '#E95D70',
      dark: '#2C2F3A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#EA9E48',
      main: '#9CE774',
      dark: '#151515',
      contrastText: '#000',
    },
  },
});

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid
          container
          alignSelf="center"
          // rowSpacing={{ xs: 1, sm: 2, md: 3 }}
          // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
{/* ----------------------------left side------------------------------------------- */}
          <Grid item xd={6} sm={6}>
            <Grid
              container
              // rowSpacing={{ xs: 1, sm: 2, md: 3 }}
              // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              direction="column"
              justifyContent="space-around"
              alignItems="center"
            >
              <Grid item xs={12} sm={6}>
                <Box
                  sx ={{
                    width: 500,
                    height: 400,
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      opacity: [0.9, 0.8, 0.8],
                    },
                    borderRadius: 15,
                  }}
                >
                  <Typography
                  component="h1"
                  variant="h5"
                  sx={{
                    alignSelf: "center",
                    color: "primary.contrastText"
                  }}
                  >
                    APPLES TO ORANGES
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                    sx ={{
                      width: 500,
                      height: 100,
                      marginTop: 8,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      backgroundColor: 'secondary.main',
                      '&:hover': {
                        backgroundColor: 'secondary.main',
                        opacity: [0.9, 0.8, 0.8],
                      },
                      borderRadius: 8,
                    }}
                  >
                  <Typography component="h1" variant="h5">
                    Avatar
                  </Typography>
                  <Typography component="h1" variant="h5">
                    Display Name
                  </Typography>
                  <Button sx={{color: "#000000"}} onClick={handleLogOut}>
                    LOG OUT
                  </Button>
                </Box>
              </Grid>

            </Grid>
          </Grid>
{/* -----------------------------right side----------------------------------------- */}
          <Grid item xd={6} sm={6}>
            <Grid
              container
              rowSpacing={{ xs: 1, sm: 2, md: 3 }}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              direction="column"
              justifyContent="space-around"
              alignItems="center"
            >

              <Grid item xs={12} sm={6}>
                <Button
                  onClick={() => {setPageView('SignUp')}}
                  value="user"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    width: 500,
                    height: 75,
                    borderRadius: 6,
                    backgroundColor: "secondary.light",
                  }}
                >
                  CREATE A GAME
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  // type="submit"
                  onClick={() => {setJoiningGame(true)}}
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    width: 500,
                    height: 75,
                    borderRadius: 6,
                    backgroundColor: "secondary.light",
                  }}
                >
                  JOIN A GAME
                </Button>
              </Grid>
              {
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
                          sx={{width: 500}}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
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
                          backgroundColor: "secondary.light",
                        }}
                        >
                          Enter
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                : <></>
              }
            </Grid>
          </Grid>
{/* -------------------------------------------------------------------------------- */}
        </Grid>
      </ThemeProvider>
    </>
  );
}