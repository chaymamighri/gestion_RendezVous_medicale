const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", ""],
      default: "",
    },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, default: "" },
    address: { type: String, trim: true, default: "" },
    bloodType: { type: String, trim: true, default: "" },
    allergies: { type: String, trim: true, default: "" },
    medicalNotes: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

patientSchema.index({ lastName: 1, firstName: 1 });
patientSchema.index({ phone: 1 });

module.exports = mongoose.model("Patient", patientSchema);
