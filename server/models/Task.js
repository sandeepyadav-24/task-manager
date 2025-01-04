const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  headline: { type: String, required: true },
  dueDate: Date,
  status: {
    type: String,
    enum: ["To-Do", "In-Progress", "Completed"],
    default: "To-Do",
  },
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", taskSchema);
