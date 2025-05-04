const Seat = require("../models/seatSet.model");

const initializeSeats = async (flight_id) => {
  const seatNumbers = [];
  for (let row = 1; row <= 30; row++) {
    ["A", "B", "C", "D", "E", "F"].forEach((col) => {
      seatNumbers.push(`${row}${col}`);
    });
  }

  const seats = seatNumbers.map((seatNumber) => ({
    flight_id,
    seatNumber,
  }));

  await Seat.insertMany(seats);
};

module.exports = initializeSeats;