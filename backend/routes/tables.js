const express = require("express");
const { createTable, updateTable, deleteTable, getTable, getTables } = require("../controllers/table");
const { verifyAdmin } = require("../utils/verifyToken");
const router = express.Router();


// Create
router.post("/", verifyAdmin, createTable);

// Update
router.put("/:id", verifyAdmin, updateTable);

// Delete
router.delete("/:id", verifyAdmin, deleteTable);

// GET
router.get("/:id", getTable);

// GET ALL
router.get("/", getTables);


module.exports = router