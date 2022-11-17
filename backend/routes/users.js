const express = require("express");
const { updateUser, deleteUser, getUser, getUsers} = require("../controllers/user");
const { verifyUser, verifyAdmin } = require("../utils/verifyToken");
const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next) => {
//   res.send("Hello user, you're logged in");
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next) => {
//   res.send("Hello user, you're logged in and you can delete your account");
// })

// router.get("/checkAdmin/:id", verifyAdmin, (req,res,next) => {
//   res.send("Hello admin, you're logged in and you can delete all accounts");
// })

// Update
router.put("/:id", verifyUser, updateUser);

// Delete
router.delete("/:id", verifyUser, deleteUser);

// GET
router.get("/:id", verifyUser, getUser);

// GET ALL
router.get("/", verifyAdmin, getUsers);



module.exports = router