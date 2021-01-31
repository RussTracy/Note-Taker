const router = require('express').Router();

const { deleteById, findById, createNewNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../db/db');

// get all notes in json
router.get('/notes', (req, res) => {
    res.json(notes);
});

// get single note in json by id
router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    res.json(result);
});

// Post a new note
router.post('/notes', (req, res) => {
    req.body.id = Date.now().toString();
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.')
    }
    else {
        const note = createNewNote(req.body, notes);
        console.log(note);
        res.json(note);
    }
});

// Delete a note
router.delete('/notes/:id', (req, res) => {
    const note = deleteById(req.params.id, notes);
    res.json(note);
});

module.exports = router;