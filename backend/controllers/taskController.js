const Task = require("../models/Task");

// CREATE a new task
exports.createTask = async (req, res) => {
  try {
    if (!req.body || !req.body.title) {
  return res.status(400).json({ message: "Title is required" });
}


    const task = await Task.create({
      title: req.body.title
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
