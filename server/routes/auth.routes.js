const express = require("express");
const router = express.Router();
const UsersModel = require("../models/usersModel");

// Inscription
router.post("/Register", (req, res) => {
  UsersModel.create(req.body)
    .then((user) => res.json(user))
    .catch((error) => res.json(error));
});

// Connexion
router.post("/Login", (req, res) => {
  const { email, password } = req.body;
  UsersModel.findOne({ email: email, password: password })
    .then((user) => res.json(user))
    .catch((error) => res.json(error));
});

module.exports = router;