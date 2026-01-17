require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

console.log("🔥🔥🔥 BACKEND FILE CONFIRMED RUNNING 🔥🔥🔥");

const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/tasks", taskRoutes);

app.use("/auth", authRoutes);

// root test route
app.get("/", (req, res) => {
  res.send("ROOT ROUTE WORKING");
});

// This is temporary, only for testing.
const { protect } = require("./middleware/authMiddleware");

app.get("/protected-test", protect, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user,
  });
});
//till here


// ❗ ERROR HANDLER — MUST BE AFTER ROUTES
app.use(errorHandler);

// database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });



// start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});