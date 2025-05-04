const Admin = require("../models/admin.model");

// Get All Admins
exports.getAllAdmins = async (req, res) => {
    console.log("getAllAdmins route hit"); // Debugging log
    try {
      const admins = await Admin.find({}, { password: 0 });
      res.status(200).json({ success: true, admins });
    } catch (error) {
      console.error("getAllAdmins Error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

// Edit Admin
exports.editAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email } = req.body;

    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { fullName, email },
      { new: true, runValidators: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    res.status(200).json({ success: true, message: "Admin updated successfully", admin: updatedAdmin });
  } catch (error) {
    console.error("editAdmin Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete Admin
exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAdmin = await Admin.findByIdAndDelete(id);

    if (!deletedAdmin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    res.status(200).json({ success: true, message: "Admin deleted successfully" });
  } catch (error) {
    console.error("deleteAdmin Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};