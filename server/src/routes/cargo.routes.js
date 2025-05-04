const express = require("express");
const router = express.Router();
const cargoController = require("../controllers/cargo.controller");
const { auth, adminAuth } = require("../middleware/auth.middleware");

// User routes
router.post("/", auth, (req, res) => cargoController.createCargoBooking(req, res));
router.get("/:id", (req, res) => cargoController.getCargoDetails(req, res));
router.post("/:id/adf", auth, (req, res) => cargoController.submitADF(req, res));

// Admin routes
router.get("/", adminAuth, (req, res) => cargoController.getAllCargoBookings(req, res)); 
router.patch("/:id/status", adminAuth, (req, res) => cargoController.updateCargoStatus(req, res));
router.get("/:id/adf", adminAuth, (req, res) => cargoController.getADFByCargo(req, res));

module.exports = router;