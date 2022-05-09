const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const io = require('socket.io')(http);
const path = require('path');
const gameHandler = require('./gameService/gameHandlers.js')

// app.get('/', (req, res) => {
//   res.sendFile('/Users/grample/Desktop/repos/Social-Game-Night/client/public/chat.html');
// });

app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('chat message', (msg, room) => {
    console.log('emitting message', msg)
    io.to(room).emit('chat message', msg);
  });
  //when the server gets a 'game action' message, it will send the given obj to be processed by a game logic handler in the handlers file
  socket.on('game action', (msg) => {
    io.emit(gameHandler(msg))
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
//to join a new room, we will need to have a username and room
//user can come from the react context and the room will have to be explicitly declared in a text box or something.
  socket.on('joinRoom', ({user, room}) => {
    socket.join(room);
    socket.broadcast.to(room).emit('chat message', {user: user, text: `${user} has joined the party`})
  })
});

// This will emit the event to all connected sockets
// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

http.listen(3001, () => {
  console.log('listening on *:3001');
});
const firebase = require('firebase/compat/app');
const { getFirestore, collection, addDoc, doc, getDoc } = require('firebase/firestore');

const application = firebase.initializeApp(firebaseConfig);
const db = getFirestore(application);

// addDoc(collection(db, "users"), {
//   first: "Ada",
//   last: "Lovelace",
//   born: 1815
// })
//   .then(docRef => {
//     console.log("Document written with ID: ", docRef.id);
//   })
//   .catch(e => {
//     console.error("Error adding document: ", e);
//   });

const userRef = doc(db, 'users', 'O2wXmC6tp7pVm0Jvjoem');
getDoc(userRef)
  .then(doc => {
    if (doc) {
      console.log(doc.data());
    }
  })
  .catch(err => {
    console.log(err);
  });

module.exports.db = getFirestore(application);
