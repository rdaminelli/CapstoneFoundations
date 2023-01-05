let flashcards = require('./db.json');

let flashcardId = 4;

module.exports = {
    getFlashcards: (req, res) => {
        res.status(200).send(flashcards);
    },
    postFlashcard: (req, res) => {
        const {question, answer} = req.body;
        flashcards.push({
            id: flashcardId,
            question,
            answer
        });
        flashcardId++;
        res.status(200).send(flashcards)
    },
    delFlashcards: (req, res) => {
        flashcards = [];
        res.status(200).send(flashcards);
    },
    deleteFlashcard: (req, res) => {
        const { id } = req.params
        const flashcardIndex = flashcards.findIndex(flashcard => flashcard.id === +id)
        flashcardIndex === -1 ? res.status(400).send('no flashcard found with this id') : flashcards.splice(flashcardIndex, 1)
        res.status(200).send(flashcards)
    }
};