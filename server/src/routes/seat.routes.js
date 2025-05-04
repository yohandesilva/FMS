const express = require("express");
const { getSeats, selectSeat, getPassengerSeat } = require("../controllers/seatController");

const router = express.Router();

router.get("/:flight_id", getSeats); // Get seats for a flight
router.post("/select", selectSeat); // Select a seat
router.get("/passenger/:flight_id/:passenger_id", getPassengerSeat); // Get a passenger's seat

module.exports = router;