const express = require("express");
const router = express.Router();
const ContactModel = require("../models/contactModel");

// sending Messages
router.post("/Messages", (req, res) => {
  console.log(req.body);
  ContactModel.create(req.body)
    .then((contacts) => res.json(contacts))
    .catch((error) => res.status(400).json(error));
});

// get messages
router.get("/getMessages", (req, res) => {
  ContactModel.find()
    .then((messages) => res.status(200).json(messages))
    .catch((error) => {
      console.error("Error retrieving messages:", error);
      res.status(500).json({ message: "Failed to fetch messages", error });
    });
});

module.exports = router;