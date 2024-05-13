import { config } from "dotenv";
config();

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import DeckModel from "./models/Deck";
import cors from "cors";


const PORT = 5123;
const app = express();

app.use(cors({origin: '*'}));
app.use(express.json());

app.get('/decks', async (req: Request, res: Response) => {

    const desks = await DeckModel.find();
    res.json(desks);
})

app.post('/decks', async (req: Request, res: Response) => {
    const newDeck = new DeckModel({
        title: req.body.title
    });
    const createDeck =  await newDeck.save();
    res.json(createDeck);
});

app.delete('/decks/:deckId', async (req: Request, res: Response) => {
    const deckId = req.params.deckId;

    const deck = await DeckModel.findByIdAndDelete(deckId);
    res.json(deck);
});

mongoose.connect(process.env.MONGO_URL ?? "").then(() => {
    console.log(`listening on port ${PORT}`);
    app.listen(PORT);
});
