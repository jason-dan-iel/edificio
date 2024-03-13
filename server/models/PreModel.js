const mongoose = require("mongoose");

const PreRegisterSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  age: {
    required: true,
    type: Number,
  },
  contact: {
    required: true,
    type: Number,
  },
  college: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  city: {
    required: true,
    type: String,
  },
  state: {
    required: true,
    type: String,
  },
  gender: {
    required: true,
    type: String,
  },
  year: {
    required: true,
    type: String,
  },
  accommodation: {
    required: true,
    type: String,
  },
  events : {
    required :  true,
    type : [String],
    default : [],
  }
});

module.exports = mongoose.model("Data", PreRegisterSchema);
