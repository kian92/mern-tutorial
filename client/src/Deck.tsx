import React, { useState, useEffect } from 'react';
import { getDeckById } from './api/getDeckById';
import { useParams } from "react-router-dom";
import './Deck.css';
import { createCard } from './api/createCard';
import { deleteCardByIndex } from './api/deleteCardByIndex';

type TDeck = {
    title: string,
    cards: string[],
    _id: string
}

const Deck = () => {
    const [cards, setCards] = useState<string[]>([]);
    const [deck, setDeck] = useState<TDeck | undefined>();
    const [text, setText] = useState('');
    const { deckId } = useParams();

    useEffect(() => {
        async function fetchDeck() {
            if (!deckId) return;
            const deck = await getDeckById(deckId);
            setDeck(deck);
            setCards(deck.cards)
        }
        fetchDeck();
    }, [deckId])

    async function handleCreateDeck(e: React.FormEvent) {
        e.preventDefault();

        const { cards } = await createCard(text, deckId!);

        setCards(cards);
        setText("");
    }

    async function handleDeleteCard(index: number) {
        if (!deckId) return;
        const { cards } = await deleteCardByIndex(deckId!, index);
        setCards(cards);
    }


    return (
        <div className='Deck'>
            <h1>{deck?.title}</h1>
            <ul className="cards">
                {cards.map((card, index) => (
                    <li key={index}>
                        <button onClick={() => handleDeleteCard(index)}>X</button>
                        {card}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleCreateDeck}>
                <label htmlFor="card-text">Card Text</label>
                <input
                    id="card-text"
                    value={text}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setText(e.target.value);
                    }}
                />
                <button>Create Card</button>
            </form>
        </div>
    )
}

export default Deck