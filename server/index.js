const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const projectRoutes = require("./routes/projectRoutes");
const dbConnect = require("./db/dbConnection");
const authenticateJwt = require("./middleware/auth");
const PORT = 3000;

require("dotenv").config();

const app = express();
dbConnect();

app.use(express.json());
app.use(cors());
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/project", projectRoutes);
app.use("/middle", authenticateJwt);
console.log("In Server");

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT} `);
});
