// middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  /* 1️⃣  Read the Authorization header
         Expect the form:  Bearer <token>                        */
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied." });
  }

  /* 2️⃣  Extract the token string */
  const token = authHeader.split(" ")[1];

  try {
    /* 3️⃣  Verify signature + expiration
           — returns whatever you signed at login
           e.g. { userId, role, iat, exp }                     */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /* 4️⃣  Attach payload so later middleware / routes can use it */
    req.user = decoded;

    next(); // ✅ authenticated, continue to the next handler
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Token is not valid." });
  }
};
