const mongoose = require("mongoose");

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
    required: true
  },
  location: {
    type: String,
    requried: true
  }
});

module.exports = mongoose.model("tables", tableSchema);

// Chaning the name of the table would create a sub-table aka collection in MongoDB