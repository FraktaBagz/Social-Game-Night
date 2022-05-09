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

function gameHandler(msg) {
  //each socket will emit a 'game action' to send an object to this function.
  //each object must have an 'action' and 'game' property
  //depending on the action, it might also need a user and card property
  const { action, game, user, card } = msg
  const { gameState: { currentDeck, judgeIndex, judge, judging, userInformation, questionCard, submittedCards, finished, winner }, users, drawRandomCard } = game

  //start a round
  //everyone draws a card
  if (action === 'new round') {
    users.forEach((user) => {
      game.gameState.userInformation[user.UID].cards.push(drawRandomCard(currentDeck.answers))
    })
    //the question card is drawn
    game.gameState.questionCard = drawRandomCard(currentDeck.questions)
  }
  //each user will play a card, we add that card to submittedCards, when submitted cards length is = to # of players - judge, change judging to true
  if (action === 'play card') {
    //find index of played card in hand
    let indexInHand = userInformation[user.UID].cards.indexOf(card);
    //removed played card from hand
    //add played card to submitted cards
    const submission = [user.UID, game.gameState.userInformation[user.UID].cards.splice(indexInHand, 1)];
    game.gameState.submittedCards.push(submission);
    console.log(`${submission[0]}, has played ${submission[1]}`)
    //set judging to true
    if (game.gameState.submittedCards.length === users.length -1) {
      game.gameState.judging = true;
    }
    console.log('all players have submitted cards, judging will commence')
  }

  //judge chooses a card,
  //the client will send a msg with the winner's username and the winning card
  if (action === 'judge selection') {
    game.gameState.winner = user;
    game.gameState.userInformation[user.UID].points += 1;
    game.gameState.judging = false;
    game.gameState.judgeIndex += 1;
  }

  return game;
}

function newGame(msg) {
  const { users, deck } = msg
  let game = new Game(users, deck);
  return game;
}