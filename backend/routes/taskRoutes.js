const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks
} = require("../controllers/taskController");

// GET /tasks
router.get("/", getTasks);

// POST /tasks
router.post("/", createTask);

module.exports = router;



