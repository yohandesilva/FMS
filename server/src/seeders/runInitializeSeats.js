require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const initializeSeats = require("./initializeSeats");

console.log("MONGODB_URI:", process.env.MONGODB_URI); // Debugging log

const runSeeder = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database.");

    // Provide the flight_id as input
    const flight_id = "67f5c79e170d2eba8d366392"; // Replace with the actual flight ID

    // Run the initializeSeats function
    await initializeSeats(flight_id);

    console.log("Seat initialization completed.");
    process.exit(0); // Exit the script
  } catch (error) {
    console.error("Error initializing seats:", error);
    process.exit(1); // Exit with an error code
  }
};

runSeeder();