const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
require("dotenv").config();

const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/flight-ease", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear existing users
    await User.deleteMany({});
    console.log("Existing users deleted");

    // Define users
    const users = [
      {
        userID: "user001",
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice@example.com",
        password: await bcrypt.hash("password123", 10),
        age: 28,
        contactNumber: "94771234567",
        address: "123 Main Street, Colombo",
        role: "user",
      },
      {
        userID: "user002",
        firstName: "Bob",
        lastName: "Smith",
        email: "bob@example.com",
        password: await bcrypt.hash("password123", 10),
        age: 34,
        contactNumber: "94772223344",
        address: "456 Elm Street, Galle",
        role: "user",
      },
      {
        userID: "user003",
        firstName: "Charlie",
        lastName: "Brown",
        email: "charlie@example.com",
        password: await bcrypt.hash("password123", 10),
        age: 25,
        contactNumber: "94773334455",
        address: "789 Pine Street, Kandy",
        role: "user",
      },
      {
        userID: "user004",
        firstName: "David",
        lastName: "Lee",
        email: "david@example.com",
        password: await bcrypt.hash("password123", 10),
        age: 40,
        contactNumber: "94774445566",
        address: "234 Oak Street, Jaffna",
        role: "user",
      },
      {
        userID: "user005",
        firstName: "Emma",
        lastName: "Williams",
        email: "emma@example.com",
        password: await bcrypt.hash("password123", 10),
        age: 30,
        contactNumber: "94775556677",
        address: "567 Birch Street, Matara",
        role: "user",
      },
      {
        userID: "admin001",
        firstName: "Admin",
        lastName: "One",
        email: "admin1@flightease.com",
        password: await bcrypt.hash("admin123", 10),
        age: 45,
        contactNumber: "94776667788",
        address: "Flight Ease HQ, Colombo",
        role: "admin",
      },
      {
        userID: "admin002",
        firstName: "Admin",
        lastName: "Two",
        email: "admin2@flightease.com",
        password: await bcrypt.hash("admin123", 10),
        age: 50,
        contactNumber: "94777778899",
        address: "Flight Ease HQ, Katunayake",
        role: "admin",
      },
    ];

    // Insert users into database
    await User.insertMany(users);
    console.log("Users seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
  }
};

seedUsers();
