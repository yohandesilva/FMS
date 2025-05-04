const mongoose = require("mongoose");

const seatSetSchema = new mongoose.Schema(
  {
    flight_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight", // Reference to the Flight model
      required: true,
    },
    seats: [
      {
        seatNumber: {
          type: String, // e.g., "1A", "1B", "1C"
          required: true,
        },
        // status: {
        //   type: String,
        //   enum: ["available", "unavailable"], // Seat availability
        //   default: "available", // Default to "available"
        // },
        passenger_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "PassengerDetail", // Reference to the PassengerDetail model
          default: null, // Default to null
        },
        price: {
          type: Number, // Price for chargeable seats
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Pre-save hook to set the status based on user_id
// seatSetSchema.pre("save", function (next) {
//   this.seats.forEach((seat) => {
//     seat.status = seat.passenger_id ? "unavailable" : "available";
//   });
//   next();
// });

const SeatSet = mongoose.model("SeatSet", seatSetSchema);

module.exports = SeatSet;