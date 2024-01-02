const mongoose = require("mongoose");

const dbUrl = "mongodb://127.0.0.1:27017/marketing";

const connectDB = () => {
  mongoose
    .connect(dbUrl)
    .then((ans) => {
      console.log("Connected Successful");
    })
    .catch((err) => {
      console.log("Error in the Connection");
    });
};

module.exports = connectDB;
