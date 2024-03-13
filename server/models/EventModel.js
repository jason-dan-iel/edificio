const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  photoURL: { type: String, required: false },
  brochureURL: { type: String, required: false },
  prize: { type: String, required: false },
  prize_money: { type: Number, required: false, default:0 },
});

module.exports = mongoose.model("eventData", EventSchema);
