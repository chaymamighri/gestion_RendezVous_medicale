const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const bookingRoutes = require("./bookingRoutes");
const patientRoutes = require("./patientRoutes");

router.use(authRoutes);
router.use(patientRoutes);
router.use(bookingRoutes);

module.exports = router;
