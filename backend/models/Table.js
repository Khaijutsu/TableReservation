const mongoose = require("mongoose");
const reservationSchema = require("./Reservation").schema;

const tableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  isAvailable: {
    type: Boolean,
    required: false
  },
  location: {
    type: String,
    required: true
  }
});

var Table = mongoose.model("tables", tableSchema);

module.exports.model = Table;
module.exports.schema = tableSchema;

// module.exports = mongoose.model("tables", tableSchema);

// Changing the name of the table would create a sub-table aka collection in MongoDB