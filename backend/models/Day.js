var mongoose = require("mongoose");
const tableSchema = require("./Table").schema;

var daySchema = new mongoose.Schema({
  date: Date,
  tables: [tableSchema]
});
var Day = mongoose.model("Day", daySchema);
module.exports.model = Day;
module.exports.schema = daySchema;