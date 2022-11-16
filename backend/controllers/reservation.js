const Reservation = require("../models/Reservation");

const createReservation = async (req,res,next) => {
  const newReservation = new Reservation(req.body)
  try {
    const savedReservation = await newReservation.save();
    res.status(200).json(savedReservation);
  } catch (err) {
    next(err);
  }
};

const updateReservation = async (req,res,next) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, { $set: req.body }, { new:true});
    res.status(200).json(updatedReservation);
  } catch (err) {
    next(err);
  }
};

// Since we're not returning anything, we removed the const var_name and replace the var_name in the (200).json() with a message instead
const deleteReservation = async (req,res,next) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.status(200).json("Reservation has been deleted");
  } catch (err) {
    next(err);
  }
};

const getReservation = async (req,res,next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    res.status(200).json(reservation)
  } catch (err) {
    next(err);
  }
};

const getReservations = async (req,res,next) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (err) {
    next(err);
  }
};

module.exports = { createReservation, updateReservation, deleteReservation, getReservation, getReservations };