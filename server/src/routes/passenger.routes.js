const express = require("express");
const { 
  savePassengerDetails, 
  getAllPassengers 
} = require("../controllers/passengerController");

const router = express.Router();

// Save passenger details
router.post("/details", savePassengerDetails);

// Get all passengers (for admin dashboard)
router.get("/all", getAllPassengers);

module.exports = router;