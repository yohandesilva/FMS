const Flight = require("../models/flight.model");

// Get All Flights
exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json({ success: true, flights });
  } catch (error) {
    console.error("getAllFlights Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Add a New Flight
exports.addFlight = async (req, res) => {
  try {
    const { from, to, departDate, returnDate, airlineName, status, oneWayPrice, roundTripPrice } = req.body;

    const newFlight = new Flight({
      from,
      to,
      departDate,
      returnDate,
      airlineName,
      status,
      oneWayPrice,
      roundTripPrice,
    });

    await newFlight.save();
    res.status(201).json({ success: true, message: "Flight added successfully", flight: newFlight });
  } catch (error) {
    console.error("addFlight Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Edit a Flight
exports.editFlight = async (req, res) => {
  try {
    const { id } = req.params;
    const { from, to, departDate, returnDate, airlineName, status, oneWayPrice, roundTripPrice } = req.body;

    const updatedFlight = await Flight.findByIdAndUpdate(
      id,
      { from, to, departDate, returnDate, airlineName, status, oneWayPrice, roundTripPrice },
      { new: true, runValidators: true }
    );

    if (!updatedFlight) {
      return res.status(404).json({ success: false, message: "Flight not found" });
    }

    res.status(200).json({ success: true, message: "Flight updated successfully", flight: updatedFlight });
  } catch (error) {
    console.error("editFlight Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete a Flight
exports.deleteFlight = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFlight = await Flight.findByIdAndDelete(id);

    if (!deletedFlight) {
      return res.status(404).json({ success: false, message: "Flight not found" });
    }

    res.status(200).json({ success: true, message: "Flight deleted successfully" });
  } catch (error) {
    console.error("deleteFlight Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/////
exports.searchRoundTripFlights = async (req, res) => {
  try {
    const { from, to, departDate, returnDate } = req.query;

    // Ensure dates are parsed correctly and filter only active flights
    const query = {
      from,
      to,
      departDate: new Date(departDate),
      status: "active", // Filter only active flights
    };

    if (returnDate) {
      query.returnDate = new Date(returnDate);
    }

    // Find flights based on the query
    const flights = await Flight.find(query);

    res.status(200).json({ success: true, flights });
  } catch (error) {
    console.error("searchRoundTripFlights Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};