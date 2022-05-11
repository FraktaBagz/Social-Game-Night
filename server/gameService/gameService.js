// assume deck format { noun: [], verb: [] }
// assume users = [ { uid: 128731, name: 'Nathaniel' }, ... ]

// not hooked up to anything -- need to work with server people

// not used atm
let Lobby = function (host) {
  this.host = host;
  this.players = [host];
}

let Game = function (users, deck) {
  this.users = users;
  this.deck = deck;
  this.gameState = {
      currentDeck: deck, // {questions: [], answers: []}
      judgeIndex: 0,
      // judge: this.users[this.gameState.judgeIndex],
      judging: false,
      userInformation: { //UID: {cards: [], points:0}
      },
      questionCard: null,
      hasPicked: [], // do we need this?
      submittedCards: [], // [playerid, cardIndex]
      finished: true,
      winner: null,
  }

  this.drawRandomCard = (deckArray) => {
    let randomIndex = Math.floor((deckArray.length - 0.0000001) * Math.random())
    return deckArray.splice(randomIndex, 1)[0];
  }

  this.startRound = () => {
    // listen for a bunch of packets
    // try to advance game depending on packets received
    console.log(`STARTING A ROUND, INDEX ${this.gameState.judgeIndex.toString().bold} is judging.`)

    // all clients grab one card from pile
    for (let user in this.gameState.userInformation) {
      console.log(`${user} grabs a card.`)
      this.gameState.userInformation[user].cards.push(this.drawRandomCard(this.gameState.currentDeck.questions))
    }

    // !! send game state to clients !!

    // !! wait for clients to send requests !!

    // fake logic -- mimicing requests from clients
    for (let user in this.gameState.userInformation) {
      this.gameState.hasPicked.push('user');
      console.log(`${user} adds a card to pile.`)
      this.gameState.submittedCards.push([this.drawRandomCard(this.gameState.userInformation[user].cards), user])
    }

    // check all clients have submitted
    // e.g. hasPicked.length === users.length - 1 OR individually add clients and check against list
    // when last player submits card, change judging to true
    this.gameState.judging = true;
    console.log('All players have submitted cards!', this.gameState.submittedCards)

    // !! send game state to clients repesenting judging with all submitted cards

    console.log('Swapping to JUDGING phase.', `\nJudge is picking from list:`, this.gameState.submittedCards)

    // wait for judge to submit winner card [uid, cardindex]
    // !! expect a reply from judge client picking a winner !!

    // fake logic -- mimicing a judge selecting a card
    this.gameState.winner = (this.drawRandomCard(this.gameState.submittedCards))
    console.log(`Judge has picked card ${this.gameState.winner[0]}`)

    // received a reply from judge -- apply points to winner
    this.gameState.userInformation[this.gameState.winner[1]].points++
    console.log(`${this.gameState.winner[1]} receives point for winning this round!\nThey are at ${this.gameState.userInformation[this.gameState.winner[1]].points} point(s).`)

    // !! send game state back with round winner !!

    // clean up game for next round
    this.cleanUpRound();

    // increment judge index
    this.gameState.judgeIndex++

    // if all players haven't judged, start new round
    if (this.gameState.judgeIndex < this.users.length) {
      console.log(`All players have not judged yet. Currently at index ${this.gameState.judgeIndex} of ${this.users.length}.`)
      this.startRound()
    // else end game
    } else {
      console.log(`All players have judged! Ending game now.`)
      this.endGame();
    }
  }

  this.endGame = () => {
    // find winner ** DOES NOT HANDLE TIES YET -- FIGURE OUT **
    let winner = [null, { uid: '', points: 0 }];
    for (let user in this.gameState.userInformation) {
      if (this.gameState.userInformation[user].points > winner[1].points) {
        winner = [user, this.gameState.userInformation[user]];
      }
    }
    console.log(`${winner[0]} is the winner!`)
  }

  this.cleanUpRound = () => {
    // clean up the gameState object for next round
    console.log('Cleaning up the round data for next round.')
    this.gameState.judging = false;
    this.gameState.hasntPicked = [];
    this.gameState.submittedCards = [];
    this.gameState.winner = null;
    this.gameState.finished = false;
  }

  users.map((user) => { // change to fit identifiers that we end up using
    // gives each user points for specific information
    this.gameState.userInformation[user.name] = {
      cards: [],
      points: 0,
    }
    // give each player 6 cards -- 7th card is picked up on first round.
    for (let i = 0; i < 6; i++) {
      this.gameState.userInformation[user.name].cards.push(this.drawRandomCard(this.gameState.currentDeck.answers))
    }
  })

}


// fake data
let users = [{ UID: 'nathaniel', name: 'nathaniel', }, { UID: 'kim', name: 'kim', }, { UID: 'julian', name: 'julian', }, { UID: 'patrick', name: 'patrick', }]
// let users = [{ UID: 0, name: 'nathaniel', }, { UID: 1, name: 'kim', }, { UID: 2, name: 'julian', }, { UID: 3, name: 'patrick', }]
let deck = { questions: [], answers: [], }
let i = 0;
while (i < 500) {
  deck.questions.push(i.toString());
  deck.answers.push(i.toString());
  i++
}

// function newGame(msg) {
//   const { users, deck } = msg
//   let game = new Game(users, deck);

//   // for (let j = 0; j < game.users.length; j++) {
//   //   game.gameState.userInformation[game.users[j]] = []
//   // }
//   console.log('userInfo: ', game.gameState.userInformation)
//   // for (let i = 0; i < 7; i++) {
//   //   for (let j = 0; j < game.users.length; j++) {
//   //     game.gameState.userInformation[game.users[j]].push(game.drawRandomCard(game.gameState.currentDeck.questions))
//   //     console.log(`${game.users[j]}'s hand: ${game.gameState.userInformation[game.users[j]]}`)
//   //   }
//   // }

//   return game;
// }

// console.log('newgmae', newGame({users: users, deck: deck}))

// start game and start a round
// let newGame1 = new Game(users, deck)
// newGame1.startRound();

module.exports = { Game: Game };