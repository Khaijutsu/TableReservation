const Table = require("../models/Table");

const createTable = async (req,res,next) => {
  const newTable = new Table(req.body)
  try {
    const savedTable = await newTable.save();
    res.status(200).json(savedTable);
  } catch (err) {
    next(err);
  }
};

const updateTable = async (req,res,next) => {
  try {
    const updatedTable = await Table.findByIdAndUpdate(req.params.id, { $set: req.body }, { new:true});
    res.status(200).json(updatedTable);
  } catch (err) {
    next(err);
  }
};

// Since we're not returning anything, we removed the const var_name and replace the var_name in the (200).json() with a message instead
const deleteTable = async (req,res,next) => {
  try {
    await Table.findByIdAndDelete(req.params.id);
    res.status(200).json("Table has been deleted");
  } catch (err) {
    next(err);
  }
};

const getTable = async (req,res,next) => {
  try {
    const table = await Table.findById(req.params.id);
    res.status(200).json(table)
  } catch (err) {
    next(err);
  }
};

const getTables = async (req,res,next) => {
  try {
    const tables = await Table.find();
    res.status(200).json(tables);
  } catch (err) {
    next(err);
  }
};

module.exports = { createTable, updateTable, deleteTable, getTable, getTables };