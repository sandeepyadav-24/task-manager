const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

const dbConnect = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      app.listen(() => {
        console.log("DB Connected");
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
module.exports = dbConnect;
