const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photoURL: { type: String, required: true },
  gitURL: { type: String, required: false },
  IgURL: { type: String, required: false },
  mailURL: { type: String, required: true },
  designation: { type: String, required: true },
});

module.exports = mongoose.model("teamData", TeamSchema);
