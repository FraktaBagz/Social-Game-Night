import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './firebase/contexts/AuthContext.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './components/App.jsx';

/*
black #2c2f3a
green #9ce774
red #e95d70
orange #ea9e48
white #ececec
*/

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#ea9e48',
      contrastText: '#ffffff',
      grey: '#2c2f3a',
    },
    secondary: {
      main: '#e95d70',
    },
    background: {
      default: '#ececec',
    },
    info: {
      main: '#9ce774',
    },
  },
});

ReactDOM.render(
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </AuthProvider>
  , document.getElementById('root'));
