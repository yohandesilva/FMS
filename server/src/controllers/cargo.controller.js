const Cargo = require("../models/cargo.model");
const AcceptanceDeclaration = require("../models/adf.model");
const jwt = require("jsonwebtoken");

// Create Cargo Booking
exports.createCargoBooking = async (req, res) => {
  try {
    // Extract userId from token
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Create new cargo booking
    const cargoBooking = new Cargo({
      userId,
      from: req.body.from,
      to: req.body.to,
      date: new Date(req.body.date),
      weight: req.body.weight,
      dimensions: req.body.dimensions,
      type: req.body.type,
      description: req.body.description
    });

    // Save the cargo booking
    await cargoBooking.save();

    res.status(201).json({
      success: true,
      message: "Cargo booking created successfully",
      cargo: cargoBooking
    });
  } catch (error) {
    console.error("Create Cargo Booking Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// Get all cargo bookings - NEW ADMIN ENDPOINT
exports.getAllCargoBookings = async (req, res) => {
  try {
    // Find all cargo bookings with user details
    const cargoBookings = await Cargo.find()
      .populate('userId', 'firstName lastName email')
      .populate('flight_id', 'from to airlineName')
      .sort({ createdAt: -1 }); // Sort by creation date, newest first
      
    res.status(200).json({
      success: true,
      count: cargoBookings.length,
      cargoBookings
    });
  } catch (error) {
    console.error("Get All Cargo Bookings Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// Get Cargo Booking Details
exports.getCargoDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const cargo = await Cargo.findById(id)
      .populate('userId', 'firstName lastName email')
      .populate('flight_id', 'from to airlineName departDate')
      .populate('acceptanceDeclaration');
    
    if (!cargo) {
      return res.status(404).json({
        success: false,
        message: "Cargo booking not found"
      });
    }

    res.status(200).json({
      success: true,
      cargo
    });
  } catch (error) {
    console.error("Get Cargo Details Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// Update cargo status - NEW ADMIN ENDPOINT
exports.updateCargoStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paymentStatus, flight_id } = req.body;
    
    // Build update object with only provided fields
    const updateData = {};
    if (status) updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    if (flight_id) updateData.flight_id = flight_id;
    
    // Find and update the cargo booking
    const updatedCargo = await Cargo.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedCargo) {
      return res.status(404).json({
        success: false,
        message: "Cargo booking not found"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Cargo booking updated successfully",
      cargo: updatedCargo
    });
  } catch (error) {
    console.error("Update Cargo Status Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// Submit Acceptance Declaration Form
exports.submitADF = async (req, res) => {
  try {
    const { id } = req.params;
    const adfData = req.body;
    
    // Find the cargo booking
    const cargo = await Cargo.findById(id);
    
    if (!cargo) {
      return res.status(404).json({
        success: false,
        message: "Cargo booking not found"
      });
    }
    
    // Format the data for the ADF model
    const formattedAdfData = {
      cargoId: id,
      flightNo: adfData.flightNo,
      date: adfData.date,
      awbNo: adfData.awbNo,
      routing: adfData.routing,
      shipper: adfData.shipper,
      telMobile: adfData.telMobile,
      cusdecNo: adfData.cusdecNo,
      looseCargoPcs: adfData.looseCargoPcs,
      looseWeight: adfData.looseWeight,
      looseCbm: adfData.looseCbm,
      looseContents: adfData.looseContents,
      gohPcs: adfData.gohPcs,
      gohWeight: adfData.gohWeight,
      gohCbm: adfData.gohCbm,
      gohContents: adfData.gohContents,
      totalPcs: adfData.totalPcs,
      totalWeight: adfData.totalWeight,
      totalCbm: adfData.totalCbm,
      dimensions: {
        L: adfData.dimensionsL,
        W: adfData.dimensionsW,
        H: adfData.dimensionsH,
        pcs: adfData.dimensionsPcs
      },
      acceptancePallets: adfData.acceptancePallets,
      uldBtEntries: adfData.uldBtEntries,
      nicNumber: adfData.nicNumber,
      shipperSignature: adfData.shipperSignature,
      loadingDate: adfData.loadingDate
    };

    // Create a new ADF document
    const newADF = new AcceptanceDeclaration(formattedAdfData);
    await newADF.save();

    // Update the cargo with the ADF reference
    cargo.acceptanceDeclaration = newADF._id;
    cargo.status = "accepted"; // Update cargo status
    await cargo.save();
    
    res.status(200).json({
      success: true,
      message: "Acceptance Declaration Form submitted successfully",
      adf: newADF
    });
  } catch (error) {
    console.error("Submit ADF Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// Get ADF Details by Cargo ID - NEW ADMIN ENDPOINT
exports.getADFByCargo = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Looking for ADF with cargoId:", id);
    
    // Find ADF document for this cargo
    const adf = await AcceptanceDeclaration.findOne({ cargoId: id });
    
    if (!adf) {
      return res.status(404).json({
        success: false,
        message: "No Acceptance Declaration Form found for this cargo"
      });
    }
    
    console.log("Found ADF with data:", adf);
    
    res.status(200).json({
      success: true,
      adf
    });
  } catch (error) {
    console.error("Get ADF By Cargo Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};