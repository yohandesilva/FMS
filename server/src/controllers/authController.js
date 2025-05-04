const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Signup
exports.signup = async (req, res) => {
  try {

    console.log("Received Data:", req.body); // Debugging log
    const { firstName, lastName, email, password, age, contactNumber, address } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Create new user
    const newUser = new User({
      userID: email, // Assuming userID is email for uniqueness
      firstName,
      lastName,
      email,
      password,
      age,
      contactNumber,
      address,
    });
    await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    //console.log(error);
    console.error("Signup Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = user.generateAuthToken();
    res.json({ success: true, token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (error) {
    //console.error("Login Error:", error);// Debugging log
    res.status(500).json({ success: false, message: "Server error:user not validated.enter 6 digit password" });
  }
};

//
