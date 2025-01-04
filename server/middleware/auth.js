const SECRET = "EverythingIsPlanned";
const jwt = require("jsonwebtoken");
const authenticateJwt = (req, res, next) => {
  console.log("Reacehd Middleware");
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log(token);
    jwt.verify(token, SECRET, (err, payload) => {
      console.log("Just before Payload");
      console.log(payload);
      if (err) {
        return res.sendStatus(403);
      }
      if (!payload) {
        return res.sendStatus(403);
      }
      req.user = { userId: payload._id };
      console.log(req.user.userId);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = authenticateJwt;
