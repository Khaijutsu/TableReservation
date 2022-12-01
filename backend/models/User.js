const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true // prevents users with the same username
  },
  email: {
    type: String,
    required: true,
    unique: true 
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  mailingAddress: String,
  billingAddress: String,
  dinerNumber: Number,
  points: Number,
  paymentMethod: String,
}, {timestamps: true});

module.exports = mongoose.model("users", userSchema);