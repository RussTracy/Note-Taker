const fs = require("fs");
const path = require("path");
const express = require('express');

// Set Port to 80 for published 3001 for local host
const PORT = process.env.PORT || 3001;
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { notes } = require('./db/db');

// Get selected note
function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

function createNewNote(body, notesArray) {
    const note = body;
    note.id = notes.length.toString();
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

// get all notes in json
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// get single note in json
app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    res.json(result);
});

// Post a new note
app.post('/api/notes', (req, res) => {
    const note = createNewNote(req.body, notes);
    console.log(note);
    res.json(note);
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});