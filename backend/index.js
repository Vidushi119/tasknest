console.log("🔥🔥🔥 BACKEND FILE CONFIRMED RUNNING 🔥🔥🔥");

const express = require("express");
const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("ROOT ROUTE WORKING");
});

app.get("/api/tasks", (req, res) => {
  res.json([
    { id: 1, title: "Learn MERN" },
    { id: 2, title: "Build TaskNest" }
  ]);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
