const Day = require("../models/Day").model;

const createAvailability = async (req,res,next) => {
  console.log("request attempted");

  console.log(req.body);
  const dateTime = new Date(req.body.date);

  Day.find({ date: dateTime }, (err, docs) => {
    if (!err) {
        const allTables = require("../data/allTables");
        const day = new Day({
          date: dateTime,
          tables: allTables
        });
        day.save(err => {
          console.log("Created new datetime. Here are the default docs");
          Day.find({ date: dateTime }, (err, docs) => {
            err ? res.sendStatus(400) : res.status(200).send(docs[0]);
          }); 
        });
    } 
  });
}
module.exports = createAvailability;