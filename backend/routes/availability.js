const express = require('express');
const createAvailability = require('../controllers/availability');
const router = express.Router();

router.post("/", createAvailability);

module.exports = router;