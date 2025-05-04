const express = require("express");
const {
  getAllFlights,
  addFlight,
  editFlight,
  deleteFlight,
  searchRoundTripFlights
} = require("../controllers/flightController");

const router = express.Router();

// Flight Management Routes
router.get("/", getAllFlights); // Get all flights
router.post("/", addFlight); // Add a new flight
router.put("/:id", editFlight); // Edit a flight by ID
router.delete("/:id", deleteFlight); // Delete a flight by ID

//Flight search Routes
//router.get("/search", searchFlights); // Search flights
router.get("/searchRoundTripFlights", searchRoundTripFlights); // Search round-trip flights


module.exports = router;