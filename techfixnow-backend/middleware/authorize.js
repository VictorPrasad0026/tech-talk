// middleware/authorize.js
module.exports = function (...allowedRoles) {
  return (req, res, next) => {
    // auth.js must already have set req.user
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated." });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient role." });
    }

    next(); // user has one of the allowed roles
  };
};
