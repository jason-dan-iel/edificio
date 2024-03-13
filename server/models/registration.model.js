const mongoose = require("mongoose");

const RegistrationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  college_name: {
    type: String,
    required: true,
  },
  college_city: {
    type: String,
    required: true,
  },
  college_state: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  events: {
    type: Array,
    required: false,
  },
  reference_id: {
    type: String,
    requried: false,
  },
  payment_status:{
    type : Boolean,
    require : false,
    default : false
  },
  accommodation_status:{
    type : Boolean,
    require : false,
    default : false
  }
});

module.exports = mongoose.model("Registrations", RegistrationSchema);
