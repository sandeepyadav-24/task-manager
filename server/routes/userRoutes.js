const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const router = express.Router();
const SECRET = "EverythingIsPlanned";
const jwt = require("jsonwebtoken");

// SIGN UP ROUTE
router.post("/signup", async (req, res) => {
  console.log("Reached Here");
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ messgae: "Already registered User" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// LOGIN ROUTE

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ _id: user._id }, SECRET);
    return res.status(201).json({ message: "login successful", token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
