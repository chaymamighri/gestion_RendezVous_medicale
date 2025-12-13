const express = require("express");
const router = express.Router();

// Import des routes
const authRoutes = require("./authRoutes");
const bookingRoutes = require("./bookingRoutes");
const contactRoutes = require("./contactRoutes");

// Montage des routes
router.use("/", authRoutes);
router.use("/", bookingRoutes);
router.use("/", contactRoutes);

module.exports = router;