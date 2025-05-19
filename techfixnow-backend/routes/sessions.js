const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

// now you can use router.post(), router.get(), etc.
router.post("/:id/accept", auth, authorize("expert"), async (req, res) => {
  // your route logic here
});

module.exports = router;
