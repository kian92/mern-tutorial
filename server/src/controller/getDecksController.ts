import { Request, Response } from "express";
import DeckModel from "../models/Deck";

export async function getDecksController(req: Request, res: Response) {
    const desks = await DeckModel.find();
    res.json(desks);
}
