var mongoose = require("mongoose");
const tS = require("./TableTest").schema;

var daySchema = new mongoose.Schema({
  date: Date,
  tables: [tS]
});
var Day = mongoose.model("Day", daySchema);

module.exports.model = Day;
module.exports.schema = daySchema;