const express = require("express");
const router = express.Router();

router.get("/middle", authenticateJwt, (req, res) => {
  const userId = req.headers;
  res.status(200).json({ UserId: userId });
});
