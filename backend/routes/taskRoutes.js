const express = require("express");
const router = express.Router();

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,  //tast statistics feature
} = require("../controllers/taskController");

// IMPORTANT: specific routes first
router.get("/stats", getTaskStats);

// CRUD routes
router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
