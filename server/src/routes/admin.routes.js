const express = require("express");
const { addAdmin, login } = require("../controllers/adminAuthController");
const { getAllAdmins, editAdmin, deleteAdmin } = require("../controllers/adminController");

const router = express.Router();

// Admin Authentication Routes
router.post("/addAdmin", addAdmin);
router.post("/login", login);

// Admin Management Routes
router.get("/", getAllAdmins); // Get all admins
router.put("/:id", editAdmin); // Edit admin by ID
router.delete("/:id", deleteAdmin); // Delete admin by ID

module.exports = router;