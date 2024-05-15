import { Request, Response } from "express";
import DeckModel from "../models/Deck";

export async function deleteCardOnDeckController(req: Request, res: Response) {
    const deckId = req.params.deckId;
    const cardIndex = req.params.index;
    const deck = await DeckModel.findById(deckId);
    if (!deck) return res.status(400).send('no desk of this id exists');

    const { text } = req.body;
    deck.cards.splice(parseInt(cardIndex), 1);

    await deck.save();
    res.json(deck);
}
