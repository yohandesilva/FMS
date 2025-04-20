const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
      },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    age: {
      type: Number,
      required: false,
      min: 1,
    },
    contactNumber: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10,15}$/, "Please enter a valid contact number"], // Validates 10-15 digit numbers
    },
    address: {
      type: String,
      required: true,
      trim: true,  
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt fields
  }
);

// 🔒 Hash password before saving
userSchema.pre("save", async function (next) { 
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔑 Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// 🎟️ Method to generate JWT token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// 📌 Create a User Model
const User = mongoose.model("User", userSchema);

module.exports = User;
