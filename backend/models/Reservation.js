const mongoose = require("mongoose");
const table = require("./Table").schema;
const reservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  tableReservation: {
    type: table,
    required: true
  }

}, {timestamps: true});

module.exports = mongoose.model("reservations", reservationSchema);