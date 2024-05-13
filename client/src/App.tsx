import React, { useState, useEffect } from 'react'
import './App.css'

type TDeck = {
  title : string,
  _id : string
}

function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState('')

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const response = await fetch('http://localhost:5123/decks', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
      })
    });
    const deck = await response.json();
    setDecks([...decks, deck]);
    setTitle("");
  }

useEffect(() => {
  async function fetchDeck() {
    const response = await fetch('http://localhost:5123/decks');
    const newDecks = await response.json();
    setDecks(newDecks);
  }
  fetchDeck();
}, [])

async function handleDeleteDeck(id: string) {
  await fetch(`http://localhost:5123/decks/${id}`, {
    method: "DELETE"
  })
  setDecks(decks.filter((deck) => deck._id !== id));
};

  return (
    <div className='App'>
      <ul className='decks'>
        {
          decks.map((deck) => (
            <li key={deck._id}>
              <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
              {deck.title}
            </li>
          ))
        }
        
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor='deck-title'>Deck Title</label>
        <input
          id='deck-title'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
        <button>Create Deck</button>
      </form>
    </div>
  )
}

export default App
