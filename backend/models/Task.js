// 1️⃣ Import mongoose
const mongoose = require('mongoose');

// 2️⃣ Define the Task schema
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },      // Every task must have a title
    description: { type: String },                // Optional extra info
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' }, // Only these values allowed, default = pending
    createdAt: { type: Date, default: Date.now }  // Auto timestamp
});

// 3️⃣ Export model to use in controllers
module.exports = mongoose.model('Task', taskSchema);

