import React, { useState } from 'react';
import { useAuth } from '../firebase/contexts/AuthContext.js';

function LoginPage(props) {
  const { login, signInAsAnonymous, currentUserID } = useAuth();

  const [credential, setCredential] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    setCredential({ ...credential, [event.target.name]: event.target.value });
  };

  return (
    <>
      <h1>LOGIN</h1>
      <input onChange={handleChange} placeholder='email' name='email'></input>
      <input onChange={handleChange} placeholder='password' name='password'></input>
      <button onClick={() => {
        props.handleLogState();
        login(credential.email, credential.password)
          .catch((err) => {
            console.log(err);
          });
      }}>Login</button>

      <h1>LOGIN AS ANONYMOUS</h1>
      <button onClick={() => {
        props.handleLogState();
        signInAsAnonymous()
          .catch((err) => {
            console.log(err);
          });
      }}>Login</button>
    </>
  );
}

export default LoginPage;