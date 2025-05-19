require("dotenv").config();
console.log("Mongo URI:", process.env.MONGO_URI);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// connect to MongoDB … (already done)
//routes
app.use("/api/auth", require("./routes/auth")); // register & login

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const protectedRoutes = require("./routes/protected");
app.use("/api/protected", protectedRoutes);

app.use("/api/profile", require("./routes/profile")); // protected profile

app.use("/api/admin", require("./routes/admin")); // admin-only routes
app.use("/api/sessions", require("./routes/sessions")); // mixed routes
app.use("/api/whoami", require("./routes/whoami")); // who am i
app.use("/api/roles", require("./routes/roles")); // drop down roles.js
app.use("/api/protected", require("./routes/protected")); // protected profile
app.use("/api/profile", require("./routes/profile")); // update profile
app.use("/api/password", require("./routes/password"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
