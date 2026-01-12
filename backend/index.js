require("dotenv").config();
const mongoose = require("mongoose");


console.log("🔥🔥🔥 BACKEND FILE CONFIRMED RUNNING 🔥🔥🔥");

const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const app = express();
const PORT = 5000;

// middleware
app.use(express.json());

// root test route (keep this)
app.get("/", (req, res) => {
  res.send("ROOT ROUTE WORKING");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });


// 🔥 PHASE 2 ROUTES
app.use("/api/tasks", taskRoutes);

// start server (ALWAYS LAST)
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
