const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Booking = require("../models/appointmentModel");

// route for sending bookings
router.post("/bookings", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: "Booking confirmed", booking });
  } catch (error) {
    res.status(400).json({ error: "Error creating booking", details: error });
  }
});

// route to get bookings
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find(req.body);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Error fetching bookings", details: error });
  }
});

// receive data
router.get("/getAppointment/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const bookings = await Booking.findById({ _id: id });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Error fetching bookings", details: error });
  }
});

// update
router.put("/updateAppointment/:id", (req, res) => {
  const id = req.params.id;

  Booking.findByIdAndUpdate(
    { _id: id },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      contact: req.body.contact,
      date: req.body.date,
      time: req.body.time,
      status: req.body.status || "pending",
    }
  )
    .then((updatedBooking) => {
      if (!updatedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(updatedBooking);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error updating appointment" });
    });
});

// delete
router.delete("/deleteAppointment/:id", (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid appointment ID" });
  }
  Booking.findByIdAndDelete({ _id: id })
    .then((booking) => {
      if (!booking) {
        return res.status(404).json({ error: "Appointment not found" });
      }
      res.json({ message: "Appointment deleted successfully", booking });
    })
    .catch((error) =>
      res.status(500).json({ error: "Failed to delete the appointment" })
    );
});

// confirm appointment
router.patch("/confirmAppointment/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Mise à jour du statut du rendez-vous
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status: "confirmed" },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json({
      message: "Appointment confirmed successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Error confirming appointment:", error);
    res.status(500).json({ error: "Failed to confirm the appointment" });
  }
});

module.exports = router;