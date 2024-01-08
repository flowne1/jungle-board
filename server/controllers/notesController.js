const { model } = require("mongoose");
const Note = require("../models/note");
const Comment = require("../models/comment");

const fetchNotes = async (req, res) => {
  try {
    // Find the notes
    const notes = await Note.find();
    // Respond with them
    res.json({ notes });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const fetchNote = async (req, res) => {
  try {
    // Get id off the url
    const noteId = req.params.id;
    // Find the note using that id
    const note = await Note.findOne({ _id: noteId });
    // Respond with the note
    res.json({ note });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const createNote = async (req, res) => {
  try {
    // Get the sent in data off request body
    const { createForm, starRatingAll } = req.body;

    // Create a note with it
    const note = await Note.create({
      title: createForm.title,
      body: createForm.body,
      playTime: createForm.playTime,
      genre: createForm.genre,
      developer: createForm.developer,
      publisher: createForm.publisher,
      releaseDate: createForm.releaseDate,
      metacriticUrl: createForm.metacriticUrl,
      price: createForm.price,
      steamRec: createForm.steamRec,
      supportKorean: createForm.supportKorean,
      imgurl: createForm.imgurl,
      user: req.user._id,
      starRatingAll,
      userEmail: req.user.email,
    });
    // Respond with the new note
    res.json({ note });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const updateNote = async (req, res) => {
  try {
    // Get the id off the url
    const noteId = req.params.id;
    console.log(noteId);

    // Get the data off the req body
    const { createForm, starRatingAll } = req.body;

    // Find and update the record
    const note = await Note.findOneAndUpdate(
      { _id: noteId, user: req.user._id },
      {
        title: createForm.title,
        body: createForm.body,
        playTime: createForm.playTime,
        genre: createForm.genre,
        developer: createForm.developer,
        publisher: createForm.publisher,
        releaseDate: createForm.releaseDate,
        metacriticUrl: createForm.metacriticUrl,
        price: createForm.price,
        steamRec: createForm.steamRec,
        supportKorean: createForm.supportKorean,
        imgurl: createForm.imgurl,
        user: req.user._id,
        starRatingAll,
      },
      { new: true }
    );

    // Respond with it
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const deleteNote = async (req, res) => {
  try {
    // Get note id off url
    const noteId = req.params.id;

    // Delete the note
    const result = await Note.deleteOne({ _id: noteId, user: req.user._id });

    // Check if the note was actually found and deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    console.log(result);

    // Find and delete all comments of the note
    const cmtResult = await Comment.deleteMany({ noteId });

    // Respond with success message
    res.json({ success: "Record deleted" });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

module.exports = {
  fetchNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote,
};
