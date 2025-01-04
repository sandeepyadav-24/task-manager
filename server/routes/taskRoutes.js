const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

// Create Task
router.post("/create", async (req, res) => {
  try {
    const { projectId, headline, dueDate, status, description } = req.body;
    const newTask = new Task({
      projectId,
      headline,
      dueDate,
      status,
      description,
    });
    await newTask.save();
    res.status(201).json({ message: "Task created successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Tasks by Project
router.get("/task/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await Task.find({ projectId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Task Status
router.put("/update/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
