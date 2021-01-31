const fs = require("fs");
const {
    deleteById,
    findById,
    createNewNote,
    validateNote,
} = require("../lib/notes.js");
const { notes } = require("../db/db");

// Prevent test data from being written to json file
jest.mock('fs');

test("creates a note object", () => {
    const note = createNewNote(
        { title: "New Note", text: "This is a new note!", id: Date.now().toString() },
        notes
    );

    expect(note.title).toBe("New Note");
    expect(note.text).toBe("This is a new note!");
    expect(note.id).toEqual(expect.any(String));
});

test("finds by id", () => {
    const startingNotes = [
        {
            title: "Old Note",
            text: "This is an old note!",
            id: "1612122473105"
        },
        {
            title: "New Note",
            text: "This is a new note!",
            id: "1612122486822"
        }
    ];

    const result = findById("1612122473105", startingNotes);

    expect(result.title).toBe("Old Note");
});

test("validates note content", () => {
    const note = {
        title: "New Note",
        text: "This is a new note!",
        id: "1612122486822"
    };
    const invalidNoteTitle = {
        text: "This is a new note!",
        id: "1612122486822"
    };
    const invalidNoteText = {
        title: "New Note",
        id: "1612122486822"
    };

    const result = validateNote(note);
    const result2 = validateNote(invalidNoteTitle);
    const result3 = validateNote(invalidNoteText);

    expect(result).toBe(true);
    expect(result2).toBe(false);
    expect(result3).toBe(false);
});