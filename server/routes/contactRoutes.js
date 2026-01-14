const express = require("express");
const router = express.Router();
const ContactModel = require("../models/contactModel");

router.post(["/messages", "/Messages"], async (req, res) => {
  try {
    const contacts = await ContactModel.create(req.body);
    res.json(contacts);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get(["/messages", "/getMessages"], async (req, res) => {
  try {
    const messages = await ContactModel.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages", error });
  }
});

module.exports = router;
