import React, {useState, useEffect} from 'react';
import Chat from '../chat/Chat.jsx'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { io } from "socket.io-client";
const socket = io();

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const buttonStyle = {
  border: 'none',
  color: 'white',
  padding: '8px 20px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
}
const BSG = {
  backgroundColor: '#4CAF50'
}
const BSO = {
  backgroundColor: '#FFA500',
}

export default function Lobby () {
  const [user, setUser] = useState('MrJoel');
  const [connectedUsers, setConnectedUsers] = useState([{
    user: 'Nathaniel',
    title: 'The Brave',
    avatar: 'https://www.kindpng.com/picc/m/3-35984_transparent-emotion-clipart-transparent-background-happy-emoji-png.png'
  },
  {
    user: 'Raymond',
    title: 'The Wise',
    avatar: 'https://upload.wikimedia.org/wikipedia/en/2/2d/SSU_Kirby_artwork.png'
  },
  {
    user: 'Matthew',
    title: 'The Hell Raiser',
    avatar: 'https://mpng.subpng.com/20180624/zyt/kisspng-magic-rush-heroes-wikia-character-western-restaurants-5b2fccfed0dfb9.9185671315298593268556.jpg'
  },
  {
    user: 'Kim',
    title: 'The Wizard',
    avatar: 'https://w7.pngwing.com/pngs/525/864/png-transparent-wizard-holding-staff-dungeons-dragons-pathfinder-roleplaying-game-d20-system-wizard-magician-wizard-cartoon-d20-system-wizard-thumbnail.png'
  }])
  var count = 0;
  return (
    <>
      <div className="lobbyContainer">
        <div className="lobbyDiv" style={{float: 'left', width: '60%', borderStyle: 'solid', margin: '10px'}}>
          <h2>Welcome to the Lobby</h2>
          <div className="sessionSettingsDiv" style={{float: 'left', width: '70%', border: 'solid', margin: '10px'}}>
            <h1>Game code: 12345</h1>
            <h2>Choose Your Deck!</h2>
            <img src="https://m.media-amazon.com/images/I/61R9e+OIEFS._AC_SY679_.jpg" height="200px"></img>
            <img src="https://m.media-amazon.com/images/I/61R9e+OIEFS._AC_SY679_.jpg" height="200px"></img>
            <img src="https://media.istockphoto.com/vectors/black-plus-sign-positive-symbol-vector-id688550958?k=20&m=688550958&s=612x612&w=0&h=wvzUqT3u3feYygOXg3GB9pYBbqIsyu_xpvfTX-6HOd0=" height="200px"></img>

            <h2>Rounds:
              <input type="text"></input>
            </h2>
            <h2>Choosing Time:
              <input type="text"></input> secs</h2>
          </div>
          <div className="buttonsDiv" style={{float: 'left', width: '20%', borderStyle: 'solid', margin: '10px'}}>
          <Button sx={{color: "#000000"}} onClick={()=>{alert('yahaha')}}>
                      LOG OUT
                    </Button>

            <button style={{...buttonStyle, ...BSG}}>Start Game</button>
            <br></br>
            <button style={{...buttonStyle, ...BSO}}>Leave Game</button>
          </div>
        </div>
        <div className="playerListContainer" style={{float: 'left', width: '30%', borderStyle: 'solid', margin: '10px'}}>
          <h2>Players Connected</h2>
          <div className="playerListDiv">
            <Stack spacing={2}>
            {connectedUsers.map((userObj)=>{
              return (
                <Item key={count+=1}>
                <img src={`${userObj.avatar}`} height="50px"></img>
                <div style={{display: 'inline-block'}}>{userObj.user}
                  <div>
                    {userObj.title}
                  </div>
                </div>
              </Item>
              )
            })}
            </Stack>
            <Chat buttonStyle={buttonStyle}/>
          </div>
        </div>
      </div>
    </>
  )
}