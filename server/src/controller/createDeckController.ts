import { Request, Response } from "express";
import DeckModel from "../models/Deck";

export async function createDeckController(req: Request, res: Response) {
    const newDeck = new DeckModel({
        title: req.body.title
    });
    const createDeck =  await newDeck.save();
    res.json(createDeck);
}
