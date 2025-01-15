const SECRET = "EverythingIsPlanned";
const jwt = require("jsonwebtoken");
const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET, (err, payload) => {
      if (err) {
        return res.sendStatus(403);
      }
      if (!payload) {
        return res.sendStatus(403);
      }
      req.user = { userId: payload._id };

      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = authenticateJwt;
