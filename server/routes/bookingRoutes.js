const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Booking = require("../models/appointmentModel");
const Patient = require("../models/patientModel");
const { auth, authorize } = require("../middleware/auth");

const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;
const VALID_STATUSES = ["pending", "confirmed", "cancelled"];

const isNonEmpty = (v) => typeof v === "string" && v.trim().length > 0;

const parseDate = (value) => {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};

const buildAppointmentPayload = async (body) => {
  let firstName = body.firstName?.trim();
  let lastName = body.lastName?.trim();
  let contact = body.contact?.trim();
  let patientId = body.patient || body.patientId || null;

  if (patientId) {
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return { error: "Invalid patient ID" };
    }
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return { error: "Patient not found" };
    }
    firstName = patient.firstName;
    lastName = patient.lastName;
    contact = patient.phone;
  }

  if (!isNonEmpty(firstName) || !isNonEmpty(lastName) || !isNonEmpty(contact)) {
    return {
      error: "Patient association or firstName, lastName and contact are required",
    };
  }

  const date = parseDate(body.date);
  if (!date) {
    return { error: "Valid date is required" };
  }

  const time = body.time?.trim();
  if (!time || !TIME_REGEX.test(time)) {
    return { error: "Valid time (HH:MM) is required" };
  }

  const status = body.status && VALID_STATUSES.includes(body.status)
    ? body.status
    : "pending";

  return {
    data: {
      patient: patientId || undefined,
      firstName,
      lastName,
      contact,
      date,
      time,
      status,
      notes: body.notes?.trim() || "",
    },
  };
};

// Create appointment — Secretary only
router.post(
  "/bookings",
  auth,
  authorize("Secretary"),
  async (req, res) => {
    try {
      const result = await buildAppointmentPayload(req.body);
      if (result.error) {
        return res.status(400).json({ message: result.error });
      }

      const booking = await Booking.create(result.data);
      const populated = await Booking.findById(booking._id).populate(
        "patient",
        "firstName lastName phone email dateOfBirth allergies medicalNotes"
      );

      res.status(201).json({
        message: "Appointment created successfully",
        booking: populated,
      });
    } catch (error) {
      res.status(400).json({ message: "Error creating appointment" });
    }
  }
);

// List appointments — Secretary & Doctor
router.get(
  "/bookings",
  auth,
  authorize("Secretary", "Doctor"),
  async (req, res) => {
    try {
      const { date, status, today } = req.query;
      const filter = {};

      if (status && VALID_STATUSES.includes(status)) {
        filter.status = status;
      }

      if (today === "true" || today === "1") {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59, 999);
        filter.date = { $gte: start, $lte: end };
      } else if (date) {
        const day = parseDate(date);
        if (!day) {
          return res.status(400).json({ message: "Invalid date filter" });
        }
        const start = new Date(day);
        start.setHours(0, 0, 0, 0);
        const end = new Date(day);
        end.setHours(23, 59, 59, 999);
        filter.date = { $gte: start, $lte: end };
      }

      const bookings = await Booking.find(filter)
        .populate(
          "patient",
          "firstName lastName phone email dateOfBirth allergies medicalNotes bloodType"
        )
        .sort({ date: 1, time: 1 });

      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Error fetching appointments" });
    }
  }
);

// Get one appointment — Secretary & Doctor
router.get(
  ["/getAppointment/:id", "/bookings/:id"],
  auth,
  authorize("Secretary", "Doctor"),
  async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid appointment ID" });
      }

      const booking = await Booking.findById(req.params.id).populate(
        "patient",
        "firstName lastName phone email dateOfBirth allergies medicalNotes bloodType address"
      );

      if (!booking) {
        return res.status(404).json({ message: "Appointment not found" });
      }

      res.status(200).json(booking);
    } catch (error) {
      res.status(500).json({ message: "Error fetching appointment" });
    }
  }
);

// Update appointment — Secretary only
router.put(
  ["/updateAppointment/:id", "/bookings/:id"],
  auth,
  authorize("Secretary"),
  async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid appointment ID" });
      }

      const result = await buildAppointmentPayload(req.body);
      if (result.error) {
        return res.status(400).json({ message: result.error });
      }

      const updatedBooking = await Booking.findByIdAndUpdate(
        req.params.id,
        result.data,
        { new: true, runValidators: true }
      ).populate(
        "patient",
        "firstName lastName phone email dateOfBirth allergies medicalNotes"
      );

      if (!updatedBooking) {
        return res.status(404).json({ message: "Appointment not found" });
      }

      res.status(200).json(updatedBooking);
    } catch (error) {
      res.status(500).json({ message: "Error updating appointment" });
    }
  }
);

// Cancel appointment (soft) — Secretary only
router.patch(
  "/cancelAppointment/:id",
  auth,
  authorize("Secretary"),
  async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid appointment ID" });
      }

      const updatedBooking = await Booking.findByIdAndUpdate(
        req.params.id,
        { status: "cancelled" },
        { new: true }
      );

      if (!updatedBooking) {
        return res.status(404).json({ message: "Appointment not found" });
      }

      res.status(200).json({
        message: "Appointment cancelled successfully",
        booking: updatedBooking,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to cancel the appointment" });
    }
  }
);

// Delete appointment — Secretary only
router.delete(
  ["/deleteAppointment/:id", "/bookings/:id"],
  auth,
  authorize("Secretary"),
  async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid appointment ID" });
      }

      const booking = await Booking.findByIdAndDelete(id);
      if (!booking) {
        return res.status(404).json({ message: "Appointment not found" });
      }

      res
        .status(200)
        .json({ message: "Appointment deleted successfully", booking });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete the appointment" });
    }
  }
);

// Confirm appointment — Secretary only
router.patch(
  "/confirmAppointment/:id",
  auth,
  authorize("Secretary"),
  async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid appointment ID" });
      }

      const updatedBooking = await Booking.findByIdAndUpdate(
        req.params.id,
        { status: "confirmed" },
        { new: true }
      );

      if (!updatedBooking) {
        return res.status(404).json({ message: "Appointment not found" });
      }

      res.status(200).json({
        message: "Appointment confirmed successfully",
        booking: updatedBooking,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to confirm the appointment" });
    }
  }
);

module.exports = router;
