var mongoose = require("mongoose");

var reservationSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String
});
// var Reservation = mongoose.model("Reservation", reservationSchema);

// module.exports.model = Reservation;
// module.exports.schema = reservationSchema;

module.exports = mongoose.model("reservations", reservationSchema);




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