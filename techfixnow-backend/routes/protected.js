const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

// Route accessible only to admins
router.get("/admin-only", auth, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome, admin!" });
});

// Route accessible only to experts
router.post("/expert-task", auth, authorize("expert"), (req, res) => {
  res.json({ message: "Expert task done!" });
});

// Route accessible to users or experts
router.get("/dashboard", auth, authorize("user", "expert"), (req, res) => {
  res.json({ message: `Hello ${req.user.role}, welcome to your dashboard.` });
});

module.exports = router;
