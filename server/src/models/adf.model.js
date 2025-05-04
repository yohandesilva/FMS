const mongoose = require("mongoose");

const acceptanceDeclarationSchema = new mongoose.Schema(
  {
    cargoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cargo",
      required: true,
    },
    // Flight Details
    flightNo: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    awbNo: {
      type: String,
      required: true,
      trim: true,
    },
    routing: {
      type: String,
      required: true,
      trim: true,
    },
    
    // Shipper Details
    shipper: {
      type: String,
      required: true,
      trim: true,
    },
    telMobile: {
      type: String,
      required: true,
      trim: true,
    },
    cusdecNo: {
      type: String,
      required: false,
      trim: true,
    },
    
    // Loose Cargo
    looseCargoPcs: {
      type: Number,
      default: 0,
    },
    looseWeight: {
      type: Number,
      default: 0,
    },
    looseCbm: {
      type: Number,
      default: 0,
    },
    looseContents: {
      type: String,
      trim: true,
    },
    
    // GOH Details
    gohPcs: {
      type: Number,
      default: 0,
    },
    gohWeight: {
      type: Number,
      default: 0,
    },
    gohCbm: {
      type: Number,
      default: 0,
    },
    gohContents: {
      type: String,
      trim: true,
    },
    
    // Totals
    totalPcs: {
      type: Number,
      required: true,
    },
    totalWeight: {
      type: Number,
      required: true,
    },
    totalCbm: {
      type: Number,
      required: true,
    },
    
    // Dimensions
    dimensions: {
      L: { type: Number, required: true },
      W: { type: Number, required: true },
      H: { type: Number, required: true },
      pcs: { type: Number, required: true },
    },
    
    // Acceptance Pallets - array of objects
    acceptancePallets: [
      {
        palletNo: { type: String, required: true },
        pcs: { type: Number, required: true },
      }
    ],
    
    // ULD/BT entries - array of objects
    uldBtEntries: [
      {
        number: { type: String, required: true },
        pcs: { type: Number, required: true },
      }
    ],
    
    // Signature details
    nicNumber: {
      type: String,
      required: true,
      trim: true,
    },
    shipperSignature: {
      type: String,
      required: true,
      trim: true,
    },
    loadingDate: {
      type: Date,
      required: true,
    },
    
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const AcceptanceDeclaration = mongoose.model("AcceptanceDeclaration", acceptanceDeclarationSchema);

module.exports = AcceptanceDeclaration;