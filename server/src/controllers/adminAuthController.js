const Admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Admin addAdmin
exports.addAdmin = async (req, res) => {
  try {
    console.log("Received Data:", req.body); // Debugging log
    const { fullName, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

    // Create new admin
    const newAdmin = new Admin({
      fullName,
      email,
      password,
      // role defaults to "admin" via schema, no need to specify unless overriding
    });
    await newAdmin.save();

    res.status(201).json({ success: true, message: "Admin registered successfully" });
  } catch (error) {
    console.error("addAdmin Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Admin Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = admin.generateAuthToken();
    res.json({
      success: true,
      token,
      admin: { id: admin._id, email: admin.email, fullName: admin.fullName, role: admin.role },
    });
  } catch (error) {
    console.error("Login Error:", error); // Debugging log
    res.status(500).json({ success: false, message: "Server error: admin not validated" });
  }
};