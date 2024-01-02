const { model } = require('mongoose');
const Note = require('../models/note');

const fetchNotes = async (req, res) => {
    // Find the notes
    const notes = await Note.find();

    // Respond with them
    res.json({ notes })
};

const fetchNote = async (req, res) => {
    // Get id off the url
    const noteId = req.params.id;

    // Find the note using that id
    const note = await Note.findById(noteId);

    // Respond with the note
    res.json({ note });
};

const createNote = async (req, res) => {
    // Get the sent in data off request body
    const {title, body} = req.body;

    // Create a note with it
    const note = await Note.create({
        title,
        body,
    })

    // Respond with the new note
    res.json({ note })
};

const updateNote = async (req, res) => {
    // Get the id off the url
    const noteId = req.params.id;

    // Get the data off the req body
    const {title, body} = req.body;

    // Find and update the record
    const note = await Note.findByIdAndUpdate(noteId, {
        title,
        body,
    }, { new : true })

    // Respond with it
    res.json({ note });
};

const deleteNote = async (req, res) => {
    // Get id off url
    const noteId = req.params.id;

    // Delete the note
    const result = await Note.findByIdAndDelete(noteId);

    // Check if the note was actually found and deleted
    if (!result) {
        return res.status(404).json({ error: "Note not found" });
    }

    // Respond with success message
    res.json({ success: "Record deleted" });
};


module.exports = {
    fetchNotes,
    fetchNote,
    createNote,
    updateNote,
    deleteNote,
};