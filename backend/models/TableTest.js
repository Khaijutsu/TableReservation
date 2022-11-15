var mongoose = require("mongoose");

const reservationSchema = require("./Reservation").schema;

var tS = new mongoose.Schema({
  name: String,
  capacity: Number,
  isAvailable: Boolean,
  location: String,
  reservation: {
    required: false,
    type: reservationSchema
  }
});
var Table = mongoose.model("TableTest", tS);

module.exports.model = Table;
module.exports.schema = tS;