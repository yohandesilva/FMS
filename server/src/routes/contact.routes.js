const express = require("express");
const { contactSupport, getAllInquiries } = require("../controllers/contactSupportController");

const router = express.Router();

// Route to submit a contact inquiry
router.post("/contactSupport", contactSupport);

// Route to fetch all inquiries
router.get("/inquiries", getAllInquiries);

module.exports = router;