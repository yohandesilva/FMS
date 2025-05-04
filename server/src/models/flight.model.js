const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
      trim: true,
    },
    to: {
      type: String,
      required: true,
      trim: true,
    },
    departDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
      required: false, // Optional for one-way flights
    },
    airlineName: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"], // Restrict to "active" or "inactive"
      default: "active", // Default status is "active"
    },
    oneWayPrice: {
      type: Number,
      required: true, // Price for one-way flights
      min: 0, // Ensure price is non-negative
    },
    roundTripPrice: {
      type: Number,
      required: false, // Optional for round-trip flights
      min: 0, // Ensure price is non-negative
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;