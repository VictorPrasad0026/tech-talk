const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const validator = require("validator");

// GET /api/profile
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

// PUT /api/profile - update profile data with validation
router.put("/", auth, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const updates = {};

    if (name !== undefined) {
      if (typeof name !== "string" || name.trim().length < 2) {
        return res
          .status(400)
          .json({ message: "Name must be at least 2 characters." });
      }
      updates.name = name.trim();
    }

    if (email !== undefined) {
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format." });
      }
      // Check if email is taken by another user
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser && existingUser._id.toString() !== req.user.userId) {
        return res.status(400).json({ message: "Email already in use." });
      }
      updates.email = email.toLowerCase();
    }

    if (password !== undefined) {
      if (typeof password !== "string" || password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters." });
      }
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    if (Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json({ message: "No valid fields provided for update." });
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
