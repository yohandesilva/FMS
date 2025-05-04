const ContactSupport = require("../models/contactSupport.model");

// Submit a contact inquiry
exports.contactSupport = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, subject, message } = req.body;

    const newContactSupport = new ContactSupport({
      firstName,
      lastName,
      email,
      phoneNumber,
      subject,
      message,
    });
    await newContactSupport.save();

    res.status(201).json({ success: true, message: "Inquiry sent successfully" });
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Fetch all inquiries
exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await ContactSupport.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json({ success: true, inquiries });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};