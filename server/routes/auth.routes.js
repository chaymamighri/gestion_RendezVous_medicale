const express = require("express");
const router = express.Router();
const UsersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth");

const ALLOWED_ROLES = ["Secretary", "Doctor"];

const signToken = (user) =>
  jwt.sign(
    { userId: user._id.toString(), role: user.role, name: user.name },
    process.env.JWT_SECRET || "dev-jwt-secret",
    { expiresIn: "1d" }
  );

router.post(["/register", "/Register"], async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!ALLOWED_ROLES.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (String(password).length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UsersModel.create({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      password: hashedPassword,
      role,
    });

    const userData = user.toObject();
    delete userData.password;

    res.status(201).json(userData);
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }
    res.status(400).json({ message: "Register failed" });
  }
});

router.post(["/login", "/Login"], async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }

    const user = await UsersModel.findOne({
      email: String(email).trim().toLowerCase(),
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const stored = user.password || "";
    const isBcrypt =
      stored.startsWith("$2a$") ||
      stored.startsWith("$2b$") ||
      stored.startsWith("$2y$");

    let ok = false;
    if (isBcrypt) {
      ok = await bcrypt.compare(password, stored);
    } else {
      // One-time migration for legacy plain-text passwords
      ok = stored === password;
      if (ok) {
        user.password = await bcrypt.hash(password, 10);
        await user.save();
      }
    }

    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken(user);
    const userData = user.toObject();
    delete userData.password;

    res.status(200).json({ token, role: user.role, user: userData });
  } catch {
    res.status(500).json({ message: "Login failed" });
  }
});

router.get("/profile", auth, async (req, res) => {
  try {
    const user = await UsersModel.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});

module.exports = router;
