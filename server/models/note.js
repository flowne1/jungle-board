const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    playTime: Number,
    starRatingA: Number,
    starRatingB: Number,
    starRatingOverall: Number,
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
