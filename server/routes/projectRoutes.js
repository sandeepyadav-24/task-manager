const express = require("express");
const Project = require("../models/Project");
const router = express.Router();
const authenticateJwt = require("../middleware/auth");
const mongoose = require("mongoose");

// Create Project
router.post("/create", authenticateJwt, async (req, res) => {
  try {
    console.log("Reached on Create New Project ");
    console.log(req.user.userId);
    const userId = req.user.userId;
    const { name, priority, tags } = req.body;
    const newProject = new Project({ userId, name, priority, tags });
    await newProject.save();
    res.status(201).json({ message: "Project created successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/user/:projectId", authenticateJwt, async (req, res) => {
  try {
    const { projectId } = req.params;
    console.log("projectId from request:", projectId);
    // Validate and convert userId to ObjectId
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }
    //const userObjectId = new mongoose.Types.ObjectId(`${userId}`);
    //console.log("Converted ObjectId:", userObjectId);

    // Query the database
    {
      /**const projects = await Project.find({
      userId: new mongoose.Types.ObjectId("6778134cca2bc051c1c2c763"),
    }); */
    }
    //_id: new mongoose.Types.ObjectId("6778c2f4e820d78922bfb98d"),
    //console.log("Query results:", projects);
    const projects = await Project.findOne({
      _id: projectId,
    });

    console.log(projects);
    console.log("After Printing project in backend ");
    //if (!projects.length) {
    // return res.status(404).json({ error: "No projects found for this user" });
    //}

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Projects for a User
router.get("/user", authenticateJwt, async (req, res) => {
  try {
    const userId = req.user.userId;
    const projects = await Project.find({ userId });
    //console.log(projects);
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
