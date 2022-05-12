import React, { useState, useEffect } from 'react';

export default function Rules() {

  return (
    <>
      <div className="rulesContainer">
        <div className="rulesDiv">
          How to play:

          Each player draws 7 answer cards. A judge is selected for the 1st turn.
          The current judge of the turn rotates, so each player gets a turn as judge.
          The player that is the judge of the turn draws a green card from the deck.
          Each player selects a red card that they think best fits the prompt card.
          (The judge does not submit answer cards on their turn.)
          Once each player has selected their cards to answer the prompt, the judge for
          the round reads each answer and selects the answer the like the best.
          The player that submitted the winning answer card for that turn gets a point.
          Once each player has been the judge, the game is over.
          The player that has the most points by the end of the game wins!
        </div >
      </div >
    </>
  )
}