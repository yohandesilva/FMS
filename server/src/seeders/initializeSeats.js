const mongoose = require("mongoose");
const SeatSet = require("../models/seatSet.model"); // Import the SeatSet model

const initializeSeats = async (flight_id) => {
    const seatNumbers = [];
    for (let row = 1; row <= 30; row++) {
      ["A", "B", "C", "H", "J", "K"].forEach((col) => {
        seatNumbers.push({
          seatNumber: `${row}${col}`,
          status: "available", // Set default status to "available"
          passenger_id: null,
        });
      });
    }
  
    const seatSet = new SeatSet({
      flight_id,
      seats: seatNumbers,
    });
  
    await seatSet.save();
    console.log("Seats initialized successfully.");
  };
  module.exports = initializeSeats; // Export the function