const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Patient = require("../models/patientModel");
const { auth, authorize } = require("../middleware/auth");

const isNonEmpty = (v) => typeof v === "string" && v.trim().length > 0;

// List / search patients — Secretary & Doctor
router.get(
  "/patients",
  auth,
  authorize("Secretary", "Doctor"),
  async (req, res) => {
    try {
      const { q } = req.query;
      const filter = {};

      if (q && String(q).trim()) {
        const term = String(q).trim();
        filter.$or = [
          { firstName: { $regex: term, $options: "i" } },
          { lastName: { $regex: term, $options: "i" } },
          { phone: { $regex: term, $options: "i" } },
          { email: { $regex: term, $options: "i" } },
        ];
      }

      const patients = await Patient.find(filter).sort({
        lastName: 1,
        firstName: 1,
      });
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch patients" });
    }
  }
);

// Get one patient — Secretary & Doctor
router.get(
  "/patients/:id",
  auth,
  authorize("Secretary", "Doctor"),
  async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid patient ID" });
      }
      const patient = await Patient.findById(req.params.id);
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
      res.status(200).json(patient);
    } catch {
      res.status(500).json({ message: "Failed to fetch patient" });
    }
  }
);

// Create patient — Secretary only
router.post(
  "/patients",
  auth,
  authorize("Secretary"),
  async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        phone,
        email,
        address,
        bloodType,
        allergies,
        medicalNotes,
      } = req.body;

      if (!isNonEmpty(firstName) || !isNonEmpty(lastName) || !isNonEmpty(phone)) {
        return res.status(400).json({
          message: "firstName, lastName and phone are required",
        });
      }

      const patient = await Patient.create({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        dateOfBirth: dateOfBirth || undefined,
        gender: gender || "",
        phone: phone.trim(),
        email: email?.trim() || "",
        address: address?.trim() || "",
        bloodType: bloodType?.trim() || "",
        allergies: allergies?.trim() || "",
        medicalNotes: medicalNotes?.trim() || "",
      });

      res.status(201).json(patient);
    } catch (error) {
      res.status(400).json({ message: "Failed to create patient" });
    }
  }
);

// Update patient — Secretary only
router.put(
  "/patients/:id",
  auth,
  authorize("Secretary"),
  async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid patient ID" });
      }

      const {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        phone,
        email,
        address,
        bloodType,
        allergies,
        medicalNotes,
      } = req.body;

      if (!isNonEmpty(firstName) || !isNonEmpty(lastName) || !isNonEmpty(phone)) {
        return res.status(400).json({
          message: "firstName, lastName and phone are required",
        });
      }

      const patient = await Patient.findByIdAndUpdate(
        req.params.id,
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          dateOfBirth: dateOfBirth || null,
          gender: gender || "",
          phone: phone.trim(),
          email: email?.trim() || "",
          address: address?.trim() || "",
          bloodType: bloodType?.trim() || "",
          allergies: allergies?.trim() || "",
          medicalNotes: medicalNotes?.trim() || "",
        },
        { new: true, runValidators: true }
      );

      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }

      res.status(200).json(patient);
    } catch {
      res.status(400).json({ message: "Failed to update patient" });
    }
  }
);

// Delete patient — Secretary only
router.delete(
  "/patients/:id",
  auth,
  authorize("Secretary"),
  async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid patient ID" });
      }

      const patient = await Patient.findByIdAndDelete(req.params.id);
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }

      res.status(200).json({ message: "Patient deleted successfully", patient });
    } catch {
      res.status(500).json({ message: "Failed to delete patient" });
    }
  }
);

module.exports = router;
