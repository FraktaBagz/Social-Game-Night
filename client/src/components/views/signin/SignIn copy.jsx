import * as React from 'react';
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
import { useState } from 'react';

// our actual code
import { useAuth } from '../../../firebase/contexts/AuthContext.js'

const theme = createTheme();

export default function SignInPage({ setPageView }) {
  const { signUp, currentUser } = useAuth();
  const [isGuest, setIsGuest] = useState(false);
  const [guestName, setGuestName] = useState('')

  console.log('User info: ', useAuth(), useAuth().displayName);

  const submitGuestName = (event) => {
    event.preventDefault();
    console.log('test')
    //firebase tings
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signUp(
      data.get('email'),
      data.get('password'),
      data.get('name'),
    )
      .then((success) => {

      })
      .catch((err) => {
        alert(err.message)
        console.log(err.code, err.message);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >


          <Box component="form" noValidate onSubmit={submitGuestName} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            </Grid>
            <Button
              value="guest"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {setIsGuest(true)}}
            >
              Play as guest
            </Button>
            {
            isGuest ?
              <form onSubmit={submitGuestName}>
                <TextField
                  label="Guest Name"
                  onChange={() => {setGuestName}}
                  value={guestName}
                />
                <Button type="submit">Submit Name</Button>
              </form>
            : <></>
            }
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

