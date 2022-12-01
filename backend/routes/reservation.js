const express = require("express");
const { createReservation, updateReservation, deleteReservation, getReservation, getReservations } = require("../controllers/reservation");
const router = express.Router();

router.post("/", createReservation);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);
router.get("/:id", getReservation);
router.get("/", getReservations);

module.exports = router