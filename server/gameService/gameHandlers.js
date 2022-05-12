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

const { Game } = require('./gameService');
const { getCollection } = require('../data/dbHelpers')

drawRandomCard = (deckArray) => {
  let randomIndex = Math.floor((deckArray.length - 0.0000001) * Math.random())
  return deckArray.splice(randomIndex, 1)[0];
}

function gameHandler(msg) {
  //each socket will emit a 'game action' to send an object to this function.
  //each object must have an 'action' and 'game' property
  //depending on the action, it might also need a user and card property
  msg = JSON.parse(msg);
  console.log('game action msg');
  const { action, game, user, card } = msg;
  const { gameState: { currentDeck, judgeIndex, judge, judging, userInformation, questionCard, submittedCards, finished, winner }, users, } = game;

  //start a round
  //everyone draws a card
  if (action === 'new round') {
    console.log('new round... \n but nothing happened')
    // users.forEach((user) => {
    //   game.gameState.userInformation[user.name].cards.push(drawRandomCard(currentDeck.answers))
    // })
    // //the question card is drawn
    // // clean up the gameState object for next round
    // // console.log('Cleaning up the round data for next round.')
    // // game.gameState.judging = false;
    // // game.gameState.hasntPicked = [];
    // // game.gameState.submittedCards = [];
    // // game.gameState.winner = null;
    // // game.gameState.finished = false;
    // game.gameState.questionCard = drawRandomCard(currentDeck.questions)
  }
  //each user will play a card, we add that card to submittedCards, when submitted cards length is = to # of players - judge, change judging to true
  if (action === 'play card') {
    //find index of played card in hand
    let indexInHand = userInformation[user.name].cards.indexOf(card);
    //removed played card from hand
    //add played card to submitted cards
    const submission = [user, game.gameState.userInformation[user.name].cards.splice(indexInHand, 1)];

    game.gameState.submittedCards.push(submission);
    console.log(`${submission[0]}, has played ${submission[1]}`)
    //set judging to true
    if (game.gameState.submittedCards.length === users.length -1) {
      game.gameState.judging = true;
      console.log('all players have submitted cards, judging will commence')
    }
  }

  //judge chooses a card,
  //the client will send a msg with the winner's username and the winning card
  if (action === 'judge selection') {
    console.log('judge selection');
    game.gameState.winner = user;
    game.gameState.userInformation[user.name].points += 1;
    game.gameState.judging = false;
    game.gameState.judgeIndex += 1;
    users.forEach((user) => {
      if (game.gameState.userInformation[user.name].cards.length === 6) {
        game.gameState.userInformation[user.name].cards.push(drawRandomCard(currentDeck.answers))
      }
    })
    game.gameState.submittedCards = [];
    if (judgeIndex === game.users.length + 1) {
      return 'game over';
    } else {
      return 'next round';
    }
  }

  return game;
};

function newGame(msg) {
  msg = JSON.parse(msg)
  let { users, deck } = msg
  let game = new Game(users, deck);

  users.forEach((user) => {
    game.gameState.userInformation[user.name].cards.push(drawRandomCard(game.gameState.currentDeck.answers))
  });
  //the question card is drawn
  game.gameState.questionCard = drawRandomCard(game.gameState.currentDeck.questions);
  return game;
};

module.exports = {newGame: newGame, gameHandler: gameHandler,};