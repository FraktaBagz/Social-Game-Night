// CUSTOM DECK PAGE VIEW
import React, { useState } from 'react';

export default function ViewCards({ setPageView }) {
  const [decks, setDecks] = useState(['deck1', 'deck2', 'deck3']);

  return (
    <div >
      <div>AllCards in deck</div>
      <div>back to custom deck page</div>
    </div>
  )
}