const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  valentineAccepted: { type: Boolean, default: false },
  quizScore: { type: Number, default: 0 }
});

module.exports = mongoose.model("User", UserSchema);
