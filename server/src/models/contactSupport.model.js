const mongoose = require("mongoose");

const contactSupportSchema = new mongoose.Schema(
  {
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
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
    },
    phoneNumber: {
      type: String,
      required: false,
      match: [/^\d{10,15}$/, "Please enter a valid contact number"],
    },
    subject: {
      type: String,
      enum: ["General Inquiry", "Support", "Feedback"],
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt & updatedAt automatically
  }
);

// 📌 Create ContactSupport Model
const ContactSupport = mongoose.model("ContactSupport", contactSupportSchema);

module.exports = ContactSupport;