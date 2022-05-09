import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
const socket = io();

function Chat () {

  const [messages, setMessages] = useState([{user: 'someLoser', text:'lalala'}]);
  const [text, setText] = useState('');
  const [user, setUser] = useState('');

  function handleChange(e) {
    setText(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit('chat message', JSON.stringify({user: user, text: text}));
  }

  socket.on('chat message', function(msg) {
    setMessages([...messages, JSON.parse(msg)]);
    console.log('msg from server', messages)
  });

  return (
    <div>
    <ul>
      {messages.map((message) => {
        return <li><span>{message.user}</span><span>-</span><span>{message.text}</span></li>
      })}
    </ul>
    <form>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} ></input>
      <input type="text" value={user} onChange={(e) => setUser(e.target.value)} ></input>
      <button type="submit" onClick={handleSubmit}>send</button>
    </form>
    </div>
  )
};

export default Chat;

// var socket = io();

//       var messages = document.getElementById('messages');
//       var form = document.getElementById('form');
//       var input = document.getElementById('input');

//       form.addEventListener('submit', function(e) {
//         e.preventDefault();
//         if (input.value) {
//           socket.emit('chat message', input.value);
//           input.value = '';
//         }
//       });

//       socket.on('chat message', function(msg) {
//         var item = document.createElement('li');
//         item.textContent = msg;
//         messages.appendChild(item);
//         window.scrollTo(0, document.body.scrollHeight);
//       });

