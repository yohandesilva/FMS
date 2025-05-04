const mongoose = require("mongoose");
const SeatSet = require("../models/seatSet.model");

exports.getSeats = async (req, res) => {
  try {
    const { flight_id } = req.params;

    // Find the SeatSet document for the flight
    const seatSet = await SeatSet.findOne({ flight_id });

    if (!seatSet) {
      return res.status(404).json({ success: false, message: "No seats found for this flight." });
    }

    res.status(200).json({ success: true, seats: seatSet.seats });
  } catch (error) {
    console.error("Error fetching seats:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

exports.selectSeat = async (req, res) => {
  const { flight_id, seatNumber, passenger_id, price } = req.body;

  try {
    // Find the SeatSet document for the flight
    let seatSet = await SeatSet.findOne({ flight_id });

    if (!seatSet) {
      // Create a new SeatSet document if it doesn't exist
      seatSet = new SeatSet({ flight_id, seats: [] });
    }

    // Check if the passenger has already selected a seat
    const passengerSeat = seatSet.seats.find((seat) => seat.passenger_id?.toString() === passenger_id);
    if (passengerSeat) {
      return res.status(400).json({ success: false, message: "You have already selected a seat for this flight." });
    }

    // Check if the seat is already selected
    const existingSeat = seatSet.seats.find((seat) => seat.seatNumber === seatNumber);
    if (existingSeat) {
      return res.status(400).json({ success: false, message: "This seat is already selected." });
    }

    // Add the selected seat to the SeatSet document
    seatSet.seats.push({
      seatNumber,
      passenger_id,
      price,
    });

    await seatSet.save();

    res.status(200).json({ success: true, message: "Seat selected successfully." });
  } catch (error) {
    console.error("Error selecting seat:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

exports.getPassengerSeat = async (req, res) => {
  try {
    const { flight_id, passenger_id } = req.params;

    // Validate the input parameters
    if (!flight_id || !passenger_id) {
      return res.status(400).json({
        success: false,
        message: "Flight ID and Passenger ID are required",
      });
    }

    // Find the seat set for the flight
    const seatSet = await SeatSet.findOne({ flight_id });
    
    if (!seatSet) {
      return res.status(404).json({
        success: false,
        message: "No seats found for this flight",
      });
    }

    // Find the passenger's seat
    const seat = seatSet.seats.find(
      (seat) => seat.passenger_id && seat.passenger_id.toString() === passenger_id
    );

    if (!seat) {
      return res.status(404).json({
        success: false,
        message: "No seat found for this passenger on this flight",
      });
    }

    // Return the seat information
    return res.status(200).json({
      success: true,
      seat: seat,
    });
  } catch (error) {
    console.error("Error fetching passenger seat:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching passenger seat",
    });
  }
};