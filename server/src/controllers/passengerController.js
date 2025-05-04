const PassengerDetail = require("../models/passengerDetail.model");
const jwt = require("jsonwebtoken");

// Save Passenger Details
exports.savePassengerDetails = async (req, res) => {
  try {
    // Extract userId from the token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Validate flight_id
    const { flight_id } = req.body;
    if (!flight_id) {
      return res.status(400).json({ success: false, message: "Flight ID is required" });
    }

    // Create a new passenger detail entry
    const passengerDetail = new PassengerDetail({
      userId,
      ...req.body, // Spread the form data from the request body
    });

    await passengerDetail.save();

    res.status(201).json({
      success: true,
      message: "Passenger details saved successfully",
      passenger_id: passengerDetail._id, // Return the passenger_id
    });
  } catch (error) {
    console.error("Error saving passenger details:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get All Passengers (for admin dashboard)
exports.getAllPassengers = async (req, res) => {
  try {
    // Find all passenger details and populate flight information
    const passengers = await PassengerDetail.find()
      .populate('flight_id')
      .populate('userId', 'username email')
      .lean();
    
    if (!passengers) {
      return res.status(404).json({ success: false, message: "No passengers found" });
    }
    
    res.status(200).json(passengers);
  } catch (error) {
    console.error("Error fetching passengers:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};