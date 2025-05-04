const User = require("../models/user.model");
const PassengerDetail = require("../models/passengerDetail.model");
const Flight = require("../models/flight.model");

exports.searchAll = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query || query.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: "Search query is required" 
      });
    }

    // Prepare the search results container
    const searchResults = {
      users: [],
      passengers: [],
      flights: []
    };

    // Search in User model
    const users = await User.find({
      $or: [
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ]
    }).limit(10);
    
    searchResults.users = users.map(user => ({
      _id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      type: 'user'
    }));

    // Search in PassengerDetail model
    const passengers = await PassengerDetail.find({
      $or: [
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { passport: { $regex: query, $options: 'i' } }
      ]
    }).populate('flight_id').limit(10);
    
    searchResults.passengers = passengers.map(passenger => ({
      _id: passenger._id,
      name: `${passenger.firstName} ${passenger.lastName}`,
      passport: passenger.passport,
      flight: passenger.flight_id ? {
        from: passenger.flight_id.from,
        to: passenger.flight_id.to,
        flightNumber: `FE${passenger.flight_id._id.toString().slice(-4)}`
      } : null,
      type: 'passenger'
    }));

    // Search in Flight model
    const flights = await Flight.find({
      $or: [
        { from: { $regex: query, $options: 'i' } },
        { to: { $regex: query, $options: 'i' } },
        { airlineName: { $regex: query, $options: 'i' } }
      ]
    }).limit(10);
    
    searchResults.flights = flights.map(flight => ({
      _id: flight._id,
      flightNumber: `FE${flight._id.toString().slice(-4)}`,
      route: `${flight.from} to ${flight.to}`,
      airline: flight.airlineName,
      departDate: flight.departDate,
      type: 'flight'
    }));

    res.status(200).json({
      success: true,
      results: searchResults
    });
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};