const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getFlashcards, postFlashcard, delFlashcards, deleteFlashcard } = require("./controller");

app.get("/api/flashcards", getFlashcards);
app.post("/api/flashcards", postFlashcard);
app.delete("/api/flashcards", delFlashcards);
app.delete("/api/flashcards/:id", deleteFlashcard);

app.listen(4004, () => console.log("Server running on 4004"));