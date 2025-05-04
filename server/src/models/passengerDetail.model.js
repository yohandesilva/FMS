const mongoose = require("mongoose");

const passengerDetailSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    flight_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight", // Reference to the Flight model
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    passport: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    businessPhone: {
      type: String,
    },
    emergencyContactName: {
      type: String,
    },
    emergencyContactNumber: {
      type: String,
    },
    receiveOffers: {
      type: Boolean,
      default: false,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    documentType: {
      type: String,
      required: true,
    },
    documentNumber: {
      type: String,
      required: true,
    },
    nationalityCountryCode: {
      type: String,
      required: true,
    },
    issuingCountryCode: {
      type: String,
      required: true,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const PassengerDetail = mongoose.model("PassengerDetail", passengerDetailSchema);

module.exports = PassengerDetail;