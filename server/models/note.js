const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    // User input data
    title: String,
    body: String,
    playTime: Number,
    starRatingAll: {
      starRatingA: Number,
      starRatingB: Number,
    },
    starRatingOverall: Number,
    genre: String,
    developer: String,
    publisher: String,
    releaseDate: String,
    metacriticUrl: String,
    price: String,
    steamRec: String,
    supportKorean: Boolean,
    imgurl: String,
    userEmail: String,

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// 별점(overall) 계산을 위한 미들웨어
noteSchema.pre("save", function (next) {
  if (this.starRatingA && this.starRatingB) {
    this.starRatingOverall = (this.starRatingA + this.starRatingB) / 2;
  }
  next();
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
