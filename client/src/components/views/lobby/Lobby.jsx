import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const buttonStyleGreen = {
  backgroundColor: '#4CAF50',
  border: 'none',
  color: 'white',
  padding: '15px 32px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
}
const buttonStyleOrange = {
  backgroundColor: '#FFA500',
  border: 'none',
  color: 'white',
  padding: '15px 32px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
}

export default function Lobby () {
  return (
    <>
      <div className="lobbyContainer">
        <div className="lobbyDiv" style={{float: 'left', width: '60%', borderStyle: 'solid', margin: '10px'}}>
          <h2>Welcome to the Lobby</h2>
          <div className="sessionSettingsDiv" style={{float: 'left', width: '70%', border: 'solid', margin: '10px'}}>
            <h2>Code: 12345</h2>
            <h2>Choose Your Deck!
              <img src="https://m.media-amazon.com/images/I/61R9e+OIEFS._AC_SY679_.jpg" height="200px"></img>
              <img src="https://m.media-amazon.com/images/I/61R9e+OIEFS._AC_SY679_.jpg" height="200px"></img>
              <img src="https://media.istockphoto.com/vectors/black-plus-sign-positive-symbol-vector-id688550958?k=20&m=688550958&s=612x612&w=0&h=wvzUqT3u3feYygOXg3GB9pYBbqIsyu_xpvfTX-6HOd0=" height="200px"></img>
            </h2>
            <h2>Rounds:
              <input type="text"></input>
            </h2>
            <h2>Choosing Time:
              <input type="text"></input> secs</h2>
          </div>
          <div className="buttonsDiv" style={{float: 'left', width: '20%', borderStyle: 'solid', margin: '10px'}}>
            <button style={buttonStyleGreen}>Start Game</button>
            <br></br>
            <button style={buttonStyleOrange}>Leave Game</button>
          </div>
        </div>
        <div className="playerListContainer" style={{float: 'left', width: '20%', borderStyle: 'solid', margin: '10px'}}>
          <h2>Players Connected</h2>
          <div className="playerListDiv">
            <Stack spacing={2}>
              <Item>Nathaniel
                <div>
                  The Brave
                </div>
              </Item>
              <Item>Raymond
                <div>

                The Wise
                </div>
              </Item>
              <Item>Matthew
                <div>

                The Master
                </div>
              </Item>
              <Item>Kim
                <div>

                The Wizard
                </div>
              </Item>
              <Item>James
                <div>

                The Avenger
                </div>
              </Item>
              <Item>Kieran
                <div>

                The Champion
                </div>
              </Item>
            </Stack>
            <div className="chatContainer">
            <div className="chatDiv" style={{borderStyle: 'solid', margin: '10px', float: 'left'}}>
              <h1>Chat Room</h1>
              <ul className="messageContainer" >
                <li>Nathaniel: Is this game gonna start ?? </li>
                <li>Raymond: Cant wait to get started! </li>
                <li>Matthew: Bring it on!</li>
                <li>Kim: if this was tetris I would beat you all</li>
                <li>James: I need more overnight oats in my life</li>
                <li>Kieran: I wish my doggies could Boulder with me</li>
              </ul>
            <input type="text" placeholder="New Message"></input>
            <button>Send</button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}