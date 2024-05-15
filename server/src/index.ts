import { config } from "dotenv";
config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { getDecksController } from "./controller/getDecksController";
import { createDeckController } from "./controller/createDeckController";
import { deleteDeckController } from "./controller/deleteDeckcontroller";
import { createCardForDeckController } from "./controller/createCardForDeckController";
import { getDeckByIdController } from "./controller/getDeckByIdController";
import { deleteCardOnDeckController } from "./controller/deleteCardOnDeckController";


const PORT = 5123;
const app = express();

app.use(cors({origin: '*'}));
app.use(express.json());

app.get('/decks', getDecksController);
app.get('/decks/:deckId', getDeckByIdController);
app.post('/decks', createDeckController);
app.delete('/decks/:deckId', deleteDeckController);
app.post('/decks/:deckId/card', createCardForDeckController);
app.delete('/decks/:deckId/card/:index', deleteCardOnDeckController);

mongoose.connect(process.env.MONGO_URL ?? "").then(() => {
    console.log(`listening on port ${PORT}`);
    app.listen(PORT);
});
