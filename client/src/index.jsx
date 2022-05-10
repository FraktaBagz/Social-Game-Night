import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './firebase/contexts/AuthContext.js';
import { GameProvider } from './firebase/contexts/GameContext.js';

import App from './components/App.jsx';

ReactDOM.render(
  <AuthProvider>
    <GameProvider>
      <App />
    </GameProvider>
  </AuthProvider>
  , document.getElementById('root'));
