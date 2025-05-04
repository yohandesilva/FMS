const mongoose = require("mongoose");
const Flight = require("../models/flight.model");
require("dotenv").config();

const seedFlights = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb+srv://kavisha22:A14IxSQPNSOU5eod@fmscluster.9m2ab.mongodb.net/?retryWrites=true&w=majority&appName=FMScluster", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear existing flights
    await Flight.deleteMany({});
    console.log("Existing flights deleted");

    // Define flights
    const flights = [
      {
        from: "New York",
        to: "London",
        departDate: new Date("2025-04-10"),
        returnDate: new Date("2025-04-20"),
        airlineName: "British Airways",
        status: "active",
        oneWayPrice: 500,
        roundTripPrice: 900,
      },                                
      {
        from: "Los Angeles",
        to: "Tokyo",
        departDate: new Date("2025-05-15"),
        returnDate: new Date("2025-05-25"),
        airlineName: "Japan Airlines",
        status: "active",
        oneWayPrice: 700,
        roundTripPrice: 1200,
      },
      {
        from: "Sydney",
        to: "Singapore",
        departDate: new Date("2025-06-01"),
        returnDate: null, // One-way flight
        airlineName: "Singapore Airlines",
        status: "inactive",
        oneWayPrice: 300,
        roundTripPrice: null,
      },
      {
        from: "Dubai",
        to: "Paris",
        departDate: new Date("2025-07-10"),
        returnDate: new Date("2025-07-20"),
        airlineName: "Emirates",
        status: "active",
        oneWayPrice: 400,
        roundTripPrice: 750,
      },
      {
        from: "Mumbai",
        to: "New York",
        departDate: new Date("2025-08-05"),
        returnDate: new Date("2025-08-15"),
        airlineName: "Air India",
        status: "inactive",
        oneWayPrice: 600,
        roundTripPrice: 1100,
      },
    ];

    // Insert flights into database
    await Flight.insertMany(flights);
    console.log("Flights seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding flights:", error);
    process.exit(1);
  }
};

seedFlights();