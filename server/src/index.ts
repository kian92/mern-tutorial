import { config } from "dotenv";
config();

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import DeckModel from "./models/Deck";


const PORT = 5123;
const app = express();

app.use(express.json());
app.post('/decks', async (req: Request, res: Response) => {
    const newDeck = new DeckModel({
        title: req.body.title
    });
    const createDeck =  await newDeck.save();
    res.json(createDeck);
});

mongoose.connect(process.env.MONGO_URL ?? "").then(() => {
    console.log(`listening on port ${PORT}`);
    app.listen(PORT);
});
