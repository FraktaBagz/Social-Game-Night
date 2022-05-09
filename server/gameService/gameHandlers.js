//need to define all event listeners
//need to attach appropriate methods for the listeners
//then emit the new game object to all clients

//all possible events:
/*
draw random card
start Round
cards are dealt
judge is chosen
players submit card
judge chooses winning card
winner gets a point
next round starts
*/
const Game = require('./gameService.js');

module.exports = function gameHandler(game, msg) {
  if (msg.action === 'new game') {
    return new Game;
  }
}