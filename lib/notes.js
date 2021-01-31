const fs = require("fs");
const path = require("path");

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
        path.join(__dirname, '../db/db.json'),
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
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

// Validate Note input
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    if (!note.id || typeof note.id !== 'string') {
        return false;
    }
    return true;
}

module.exports = {
    deleteById,
    findById,
    createNewNote,
    validateNote
};