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
import { useState } from 'react';

// our actual code
import { useAuth } from '../../../firebase/contexts/AuthContext.js'

export default function SignInPage({ setPageView, handleLogState }) {
  const { signUp, login, currentUser, signInAsAnonymous } = useAuth();
  const [isGuest, setIsGuest] = useState(false);
  const [guestName, setGuestName] = useState('')

  const submitGuestName = (event) => {
    event.preventDefault();
    console.log('test')
    //firebase tings
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);


    login(data.get('email'), data.get('password'))
      .then(() => {
        setPageView('HomePage');
        handleLogState();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            value="user"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link variant="body2" onClick={() => { setPageView('SignUp') }}>
                Don't have an account? Sign Up Here!
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Button
          value="guest"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => {
            setIsGuest(true)
          }}
        >
          Play as guest
        </Button>
        {
          isGuest ?
            <div>
              <TextField
                required
                fullWidth
                id="guestName"
                label="Guest Name"
                name="guestName"
                onChange={(e) => { setGuestName(e.target.value) }}
              />
              <Button type="submit" onClick={() => {
                handleLogState();
                setPageView('HomePage');
                signInAsAnonymous(guestName)
                  .catch((err) => {
                    console.log(err);
                  });
              }}>Submit Name</Button>
            </div>
            : <></>
        }
      </Box>
    </Container>
  );
}

