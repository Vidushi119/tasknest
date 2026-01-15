require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

console.log("🔥🔥🔥 BACKEND FILE CONFIRMED RUNNING 🔥🔥🔥");

const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = 5000;

// middleware
app.use(cors());            // ✅ allow frontend requests
app.use(express.json());

// routes
app.use("/tasks", taskRoutes);

// root test route
app.get("/", (req, res) => {
  res.send("ROOT ROUTE WORKING");
});

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
app.use(errorHandler);