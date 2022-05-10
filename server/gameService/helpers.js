function drawRandomCard (deckArray) {
  let randomIndex = Math.floor((deckArray.length - 0.0000001) * Math.random())
    return deckArray.splice(randomIndex, 1)[0];
}

function newRound (game) {
  game.users.forEach((user) => {
    game.gameState.userInformation[user.UID].cards.push(drawRandomCard(currentDeck.answers));
  })
  //the question card is drawn
  game.gameState.questionCard = drawRandomCard(currentDeck.questions);
  return game;
}

function playCard (game) {
  //find index of played card in hand
  let indexInHand = userInformation[user.UID].cards.indexOf(card);
  //removed played card from hand
  //add played card to submitted cards
  game.gameState.submittedCards.push([user.UID, game.gameState.userInformation[user.UID].cards.splice(indexInHand, 1)]);
  //set judging to true
  if (game.gameState.submittedCards.length === users.length -1) {
    game.gameState.judging = true;
  }
}