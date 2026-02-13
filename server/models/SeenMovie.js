const mongoose = require("mongoose");

const SeenMovieSchema = new mongoose.Schema({
  itemId: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ["movie", "tv", "documentary"],
    required: true
  },
  title: String,
  genre: String,
  seenAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicates PER TYPE
SeenMovieSchema.index({ itemId: 1, type: 1 }, { unique: true });

module.exports = mongoose.model("SeenMovie", SeenMovieSchema);
