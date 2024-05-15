import { Request, Response } from "express";
import DeckModel from "../models/Deck";

export async function getDeckByIdController(req: Request, res: Response) {
    const deckId = req.params.deckId;
    const deck = await DeckModel.findById(deckId);
    if (!deck) return res.status(400).send('no desk of this id exists');

    res.json(deck);
}
