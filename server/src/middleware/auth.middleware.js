const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Admin = require("../models/admin.model");

// Regular user authentication
exports.auth = async (req, res, next) => {
  try {
    // Check for token
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    // Extract token
    const token = req.headers.authorization.split(" ")[1];
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }
    
    // Add user to request
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized - Token expired" });
    }
    
    res.status(500).json({ message: "Server error" });
  }
};

// Admin authentication
exports.adminAuth = async (req, res, next) => {
  try {
    // Check for token
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    // Extract token
    const token = req.headers.authorization.split(" ")[1];
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if admin exists
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized - Admin not found" });
    }
    
    // Add admin to request
    req.admin = admin;
    next();
  } catch (error) {
    console.error("Admin Auth Error:", error);
    
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized - Token expired" });
    }
    
    res.status(500).json({ message: "Server error" });
  }
};