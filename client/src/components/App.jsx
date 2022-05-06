import React from 'react';
import SignUp from './signUp.js';
import { AuthProvider } from '../contexts/AuthContext.js';

function App() {
  return (
    <AuthProvider>
      <div>
        <SignUp />
      </div>
    </AuthProvider>
  )
}

export default App;