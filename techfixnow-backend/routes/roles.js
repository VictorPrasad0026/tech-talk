// routes/roles.js
const express = require("express");
const router = express.Router();

router.get("/", (_req, res) => {
  res.json(["user", "expert"]); // don't expose "admin"
});

module.exports = router;
