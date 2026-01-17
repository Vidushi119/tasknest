require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const { errorHandler } = require("./middleware/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { protect } = require("./middleware/authMiddleware");

const app = express();
const PORT = 5000;

console.log("🚨🚨🚨 THIS IS INDEX.JS — IF YOU SEE THIS, FILE IS RUNNING 🚨🚨🚨");

// ---------- MIDDLEWARE ----------
app.use(cors());
app.use(express.json());

// ---------- ROUTES ----------
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Root test route
app.get("/", (req, res) => {
  res.send("ROOT ROUTE WORKING");
});

// Test token route
app.get("/get-test-token", (req, res) => {
  const testUser = {
    _id: "1234567890",
    name: "Test User",
    email: "test@example.com",
  };

  const token = jwt.sign(
    { id: testUser._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Here is your test token",
    token,
  });
});

// Protected test route
app.get("/protected-test", protect, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user,
  });
});

// ---------- ERROR HANDLER ----------
app.use(errorHandler);

// ---------- DATABASE ----------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// ---------- START SERVER ----------
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
