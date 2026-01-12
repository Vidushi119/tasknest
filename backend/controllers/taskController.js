const Task = require('../models/Task');

const getTasks = (req, res) => {
    res.send("Controller is working");
};

module.exports = { getTasks };
