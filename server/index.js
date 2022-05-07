const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const io = require('socket.io')(http);
const path = require('path')

app.get('/', (req, res) => {
  res.sendFile('/Users/grample/Desktop/repos/Social-Game-Night/client/public/chat.html');
});

// app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});

// This will emit the event to all connected sockets
// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

http.listen(3001, () => {
  console.log('listening on *:3001');
});