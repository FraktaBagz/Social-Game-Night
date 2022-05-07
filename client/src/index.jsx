import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './firebase/contexts/AuthContext.js';

import App from './components/App.jsx';

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>
  , document.getElementById('root'));