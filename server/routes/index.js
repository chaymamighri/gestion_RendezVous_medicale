const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const bookingRoutes = require("./bookingRoutes");
const contactRoutes = require("./contactRoutes");

router.use(authRoutes);
router.use(bookingRoutes);
router.use(contactRoutes);

module.exports = router;
