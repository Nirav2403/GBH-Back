const mongoose = require("mongoose");
const validator = require("validator");

const organizationSchema = new mongoose.Schema({
  id: {
    type: Number,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: String,
    require: [true, "Organizer name must be require"],
  },
  logo: {
    type: String,
    require: [true, "Organizer logo must be required"],
  },
  email: {
    type: String,
    require: [true, "Organizer email must be required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide valid email address"],
  },
  contact: {
    type: String,
  },
  address: {
    type: String,
  },
});

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
