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

// Delete json object by id of the object
function deleteById(id, notesArray) {
    const requiredIndex = notesArray.findIndex(el => {
        return el.id === String(id);
    });
    if (requiredIndex === -1) {
        return false;
    };
    // delete 1 element at the required index location which is the element id
    notesArray.splice(requiredIndex, 1);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return notesArray;
};

// Get selected note
function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

// Create a new note
function createNewNote(body, notesArray) {
    const note = body;
    // note.id = notes.length.toString();
    note.id = Date.now().toString();
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

// Return index.html page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Return the add.html page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


// get all notes in json
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// get single note in json by id
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

// Delete a note
app.delete('/api/notes/:id', (req, res) => {
    const result = deleteById(req.params.id, notes);
    res.json(result);
});

// serve up files in the public folder
app.use(express.static('public'));


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});