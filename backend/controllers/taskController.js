const Task = require("../models/Task");
const asyncHandler = require("../middleware/asyncHandler");

/**
 * @desc    Get all tasks (with optional filtering)
 * @route   GET /tasks
 * @query   status=completed | pending
 */
const getTasks = asyncHandler(async (req, res) => {
  const { status } = req.query;

  let filter = {};
  if (status === "completed") {
    filter.completed = true;
  } else if (status === "pending") {
    filter.completed = false;
  }

  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  res.status(200).json(tasks);
});

/**
 * @desc    Create new task
 * @route   POST /tasks
 */
const createTask = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Task title is required");
  }

  const task = await Task.create({
    title,
    completed: false,
  });

  res.status(201).json(task);
});

/**
 * @desc    Update task
 * @route   PUT /tasks/:id
 */
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  task.title = req.body.title ?? task.title;
  task.completed = req.body.completed ?? task.completed;

  const updatedTask = await task.save();
  res.status(200).json(updatedTask);
});

/**
 * @desc    Delete task
 * @route   DELETE /tasks/:id
 */
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  await task.deleteOne();
  res.status(200).json({ message: "Task deleted successfully" });
});

/**
 * @desc    Get task statistics
 * @route   GET /tasks/stats
 */
const getTaskStats = asyncHandler(async (req, res) => {
  const total = await Task.countDocuments();
  const completed = await Task.countDocuments({ completed: true });
  const pending = total - completed;

  res.status(200).json({ total, completed, pending });
});

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
};
