const User = require("../models/User");

const updateUser = async (req,res,next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new:true});
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// Since we're not returning anything, we removed the const var_name and replace the var_name in the (200).json() with a message instead
const deleteUser = async (req,res,next) => {
  try {
    awaitUser.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    next(err);
  }
};

const getUser = async (req,res,next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user)
  } catch (err) {
    next(err);
  }
};

const getUsers = async (req,res,next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = { updateUser, deleteUser, getUser, getUsers };