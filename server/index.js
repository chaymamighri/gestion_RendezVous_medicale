const mongoose = require('mongoose');
const express = require("express");
require("./config/db");
const cors = require("cors");
const UsersModel = require("./models/usersModel");
const Booking = require("./models/appointmentModel");
const ContactModel = require("./models/contactModel");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/Register", (req, res) => {
  UsersModel.create(req.body)
    .then((user) => res.json(user))
    .catch((error) => res.json(error));
});

app.post("/Login", (req, res) => {
  const { email, password } = req.body;
  UsersModel.findOne({ email: email, password: password })
    .then((user) => res.json(user))
    .catch((error) => res.json(error));
});

// route for sending bookings
app.post("/bookings", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: "Booking confirmed", booking });
  } catch (error) {
    res.status(400).json({ error: "Error creating booking", details: error });
  }
});

// route to get bookings

app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find(req.body);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Error fetching bookings", details: error });
  }
});

//receive data

app.get("/getAppointment/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const bookings = await Booking.findById({ _id: id });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Error fetching bookings", details: error });
  }
});

// update

app.put("/updateAppointment/:id", (req, res) => {
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
      res.status(500).json({ message: "Error updating appointment" }); // Send a 500 error response
    });
});

app.delete("/deleteAppointment/:id", (req, res) => {
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

// sending Messages
app.post("/Messages", (req, res) => {
  console.log(req.body);
  ContactModel.create(req.body)
    .then((contacts) => res.json(contacts))
    .catch((error) => res.status(400).json(error));
});

app.get("/getMessages", (req, res) => {
  ContactModel.find()
    .then((messages) => res.status(200).json(messages))
    .catch((error) => {
      console.error("Error retrieving messages:", error);
      res.status(500).json({ message: "Failed to fetch messages", error });
    });
});

//confirm appointment
app.patch("/confirmAppointment/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Mise à jour du statut du rendez-vous
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status: "confirmed" }, // Met le statut à "confirmed"
      { new: true } // Retourne le rendez-vous mis à jour
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

// run server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
