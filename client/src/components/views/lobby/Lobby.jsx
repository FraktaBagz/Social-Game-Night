import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
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
  padding: '10px 26px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
}

export default function Lobby () {
  const [chatContent, setChatContent] = useState('');
  const [messages, setMessages] = useState([{user: 'someLoser', text:'lalala'},
    {user: 'Nathaniel', text: 'Is this game gonna start ?? '},
    {user: 'Raymond', text: 'Cant wait to get started! '},
    {user: 'Matthew', text: 'Bring it on!'},
    {user: 'Kim', text: 'if this was tetris I would beat you all'},
    {user: 'James', text: 'I need more overnight oats in my life'},
    {user: 'Kieran', text: 'I wish my doggies could Boulder with me'},
    {user: 'Joel', text: 'I wish I was supersonic legend in RL'},
    {user: 'Thinh', text: 'When are we getting hotpot?'},
    {user: 'Nathaniel', text: 'Is this game gonna start ?? '},
    {user: 'Raymond', text: 'Cant wait to get started! '},
    {user: 'Matthew', text: 'Bring it on!'},
    {user: 'Kim', text: 'if this was tetris I would beat you all'},
    {user: 'James', text: 'I need more overnight oats in my life'},
    {user: 'Kieran', text: 'I wish my doggies could Boulder with me'},
    {user: 'Joel', text: 'I wish I was supersonic legend in RL'},
    {user: 'Thinh', text: 'When are we getting hotpot?'},
]);

  const [text, setText] = useState('');
  const [user, setUser] = useState('MrJoel');

  useEffect(()=>{
    document.getElementById("inputChat")
    .addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        document.getElementById("buttonChat").click();
      }
    });
  }, [])
  const checkEmotes=(keyword)=>{
    var emote = keyword.split('').slice(keyword.indexOf(':')+1).join('')
    console.log('e', emote)
    var chatContentC = chatContent
    console.log(chatContent)
    chatContentC = chatContentC.replace(`:${emote}`, '')
    console.log('replaced?', chatContentC)
    setChatContent(`${chatContentC}`)
    console.log(chatContent)
    var emotesObj = {
      ANELE: 'https://static-cdn.jtvnw.net/emoticons/v1/3792/1.0',
      ArgieBB: 'https://static-cdn.jtvnw.net/emoticons/v1/51838/1.0',
      ArsonNoSexy: 'https://static-cdn.jtvnw.net/emoticons/v1/50/1.0'
    }
    var emoteURL = emotesObj[emote]
    let div = document.getElementById('messageContainer')
    let li = document.createElement("li")
    let img = document.createElement("img")
    img.src = `${emoteURL}`
    li.append(`${user}: ${chatContent}`)
    div.prepend(li)
    document.getElementById('inputChat').value = '';
    li.append(img)
     return(emotesObj[emote])
  }

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
            <button style={buttonStyleGreen}>Start Game</button>
            <br></br>
            <button style={buttonStyleOrange}>Leave Game</button>
          </div>
        </div>
        <div className="playerListContainer" style={{float: 'left', width: '30%', borderStyle: 'solid', margin: '10px'}}>
          <h2>Players Connected</h2>
          <div className="playerListDiv">
            <Stack spacing={2}>
              <Item>
                <img src="https://www.kindpng.com/picc/m/3-35984_transparent-emotion-clipart-transparent-background-happy-emoji-png.png" height="50px"></img>
                <div style={{display: 'inline-block'}}>Nathaniel
                  <div>
                    The Brave
                  </div>
                </div>
              </Item>
              <Item>
                <img src="https://upload.wikimedia.org/wikipedia/en/2/2d/SSU_Kirby_artwork.png" height="50px"></img>
                <div style={{display: 'inline-block'}}>Raymond
                  <div>
                    The Wise
                  </div>
                </div>
              </Item>
              <Item>
                <img src="https://mpng.subpng.com/20180624/zyt/kisspng-magic-rush-heroes-wikia-character-western-restaurants-5b2fccfed0dfb9.9185671315298593268556.jpg" height="50px"></img>
                <div style={{display: 'inline-block'}}>Matthew
                  <div>
                    The Master
                  </div>
                </div>
              </Item>
              <Item>
                <img src="https://w7.pngwing.com/pngs/525/864/png-transparent-wizard-holding-staff-dungeons-dragons-pathfinder-roleplaying-game-d20-system-wizard-magician-wizard-cartoon-d20-system-wizard-thumbnail.png" height="50px"></img>
                <div style={{display: 'inline-block'}}>Kim
                  <div>
                    The Wizard
                  </div>
                </div>
              </Item>
              <Item>
                <img src="https://pngimg.com/uploads/ironman/ironman_PNG37.png" height="50px"></img>
                <div style={{display: 'inline-block'}}>James
                  <div>
                    The Avenger
                  </div>
                </div>
              </Item>
              <Item>
                <img src="https://static-cdn.jtvnw.net/emoticons/v1/3792/1.0" height="70px"></img>
                <div style={{display: 'inline-block'}}>Kieran
                  <div>
                    The Champion
                  </div>
                </div>
              </Item>
            </Stack>
            <div className="chatContainer">
            <div className="chatDiv" >
              <h1>Chat Room</h1>
              <ul id="messageContainer" className="messageContainer" style={{borderStyle: 'solid', margin: '10px', float: 'left', overflowY:'scroll', overflow: 'scroll', height: '200px', fontSize: '18px'
              , display: 'flex', flexDirection: 'column-reverse'
            }}>
                {messages.map((obj)=>{
                  return <li>{obj.user}: {obj.text}</li>
                })}
              </ul>
            <input id="inputChat" type="text" placeholder="New Message" style={{fontSize:'22px'}} onChange={(e)=>{setChatContent(e.target.value)}}></input>

            <button id="buttonChat"style={buttonStyleOrange} onClick={(e)=>{
              console.log('Placeholder before socket.emit is updated')
              let div = document.getElementById('messageContainer')
              let li = document.createElement("li")
              if (chatContent.indexOf(':') > -1) {
                checkEmotes(chatContent)
                var emoteURL = checkEmotes(chatContent)

                return;
              }
              li.append(`${user}: ${chatContent}`)
              div.prepend(li)
              document.getElementById('inputChat').value = '';
              // socket.emit('add chat message', this.state.msg)
              // socket.on('incoming chat message', (img) => {
              // })
            }}>Send</button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}