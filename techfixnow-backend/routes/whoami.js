const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); // verifies token

// GET /api/whoami  – returns whatever is in the JWT
router.get("/", auth, (req, res) => {
  // auth middleware has already put { userId, role, iat, exp } on req.user
  res.json({ user: req.user });
});

module.exports = router;
