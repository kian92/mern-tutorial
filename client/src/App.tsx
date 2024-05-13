import React, { useState, useEffect } from 'react'
import './App.css'
import { Link } from 'react-router-dom';
import { createDeck } from './api/createDeck';
import { getDecks } from './api/getDecks';
import { deleteDeck } from './api/deleteDeck';

type TDeck = {
  title : string,
  _id : string
}

function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState('')

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();

    const deck = await createDeck(title);
    setDecks([...decks, deck]);
    setTitle("");
  }

useEffect(() => {
  async function fetchDeck() {
    const newDecks = await getDecks();
    setDecks(newDecks);
  }
  fetchDeck();
}, [])

async function handleDeleteDeck(id: string) {
  await deleteDeck(id);
  setDecks(decks.filter((deck) => deck._id !== id));
};

  return (
    <div className='App'>
      <ul className='decks'>
        {
          decks.map((deck) => (
            <li key={deck._id}>
              <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
              <Link to={`deck/${deck._id}`}>{deck.title}</Link>
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
