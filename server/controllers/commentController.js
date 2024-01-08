const { model } = require("mongoose");
const Comment = require("../models/comment");

const createComment = async (req, res) => {
  try {
    // Get data from req
    const noteId = req.params.noteId;
    const contents = req.body.contents;

    // Create comment
    const result = await Comment.create({
      contents,
      userEmail: req.user.email,
      user: req.user._id,
      noteId,
    });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const fetchCommentAll = async (req, res) => {
  try {
    // Get data from req
    const noteId = req.params.noteId;

    const comments = await Comment.find({ noteId });

    res.json({ comments });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const deleteComment = async (req, res) => {
  try {
    // Get data
    const commentId = req.body.commentId;

    // Delete comment
    const result = await Comment.deleteOne({
      _id: commentId,
      user: req.user._id,
    });

    if (result.deletedCount === 1) {
      res.sendStatus(200);
    } else {
      throw new Error("Failed to delete the comment");
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

module.exports = {
  createComment,
  fetchCommentAll,
  deleteComment,
};
