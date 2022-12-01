const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }

}, {timestamps: true});

var Reservation = mongoose.model("reservations", reservationSchema);

module.exports.model = Reservation;
module.exports.schema = reservationSchema;

// module.exports = mongoose.model("reservations", reservationSchema);




// date: {
//   type: Date,
//   required: true
// },
// time: {
//   type: String,
//   required: true
// },
// location: {
//   type: String,
//   required: true
// },
// capacity: {
//   type: Number,
//   required: true
// },
// tableReservation: {
//   type: table,
//   required: true
// }