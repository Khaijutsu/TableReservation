const express = require("express");
const { createReservation, updateReservation, deleteReservation, getReservation, getReservations } = require("../controllers/reservation");
const router = express.Router();



// Create
router.post("/", createReservation);

// Update
router.put("/:id", updateReservation);

// Delete
router.delete("/:id", deleteReservation);

// GET
router.get("/:id", getReservation);

// GET ALL
router.get("/", getReservations);


module.exports = router