const Task = require("../models/Task");
const asyncHandler = require("../middleware/asyncHandler");

/**
 * @desc    Get logged-in user's tasks
 * @route   GET /tasks
 * @access  Private
 */
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.status(200).json(tasks);
});

/**
 * @desc    Create new task
 * @route   POST /tasks
 * @access  Private
 */
const createTask = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Task title is required");
  }

  const task = await Task.create({
    title,
    user: req.user._id,
  });

  res.status(201).json(task);
});

/**
 * @desc    Update task
 * @route   PUT /tasks/:id
 * @access  Private
 */
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // ❗ Authorization check
  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  task.title = req.body.title ?? task.title;
  task.completed = req.body.completed ?? task.completed;

  const updatedTask = await task.save();
  res.status(200).json(updatedTask);
});

/**
 * @desc    Delete task
 * @route   DELETE /tasks/:id
 * @access  Private
 */
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // ❗ Authorization check
  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await task.deleteOne();
  res.status(200).json({ message: "Task deleted successfully" });
});

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
