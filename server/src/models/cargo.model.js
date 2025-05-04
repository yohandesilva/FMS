const mongoose = require("mongoose");

const cargoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
    date: {
      type: Date,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
      min: 0,
    },
    dimensions: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["general", "perishable", "dangerous", "fragile", "valuable"],
      default: "general",
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["requested", "accepted", "in-transit", "delivered", "cancelled"],
      default: "requested",
    },
    trackingNumber: {
      type: String,
      unique: true,
      // This will be generated when the cargo is confirmed
    },
    flight_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
      // This will be assigned when a flight is allocated to the cargo
    },
    price: {
      type: Number,
      min: 0,
      // This will be calculated based on weight, dimensions, and type
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    acceptanceDeclaration: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcceptanceDeclaration",
      // Reference to the AD form submitted for this cargo
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create a function to generate tracking numbers
cargoSchema.statics.generateTrackingNumber = function() {
  const prefix = "CRG";
  const randomDigits = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  const timestamp = Date.now().toString().slice(-4);
  return `${prefix}${randomDigits}${timestamp}`;
};

// Middleware to handle tracking number generation
cargoSchema.pre('save', async function(next) {
  // If this is a new cargo booking and no tracking number exists
  if (this.isNew && !this.trackingNumber) {
    this.trackingNumber = this.constructor.generateTrackingNumber();
  }
  next();
});

const Cargo = mongoose.model("Cargo", cargoSchema);

module.exports = Cargo; 