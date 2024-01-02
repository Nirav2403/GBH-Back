const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: String,
    require: [true, "Please fill up your first name"],
  },
  lastName: {
    type: String,
    require: [true, "Please fill up your last name"],
  },
  email: {
    type: String,
    require: [true, "Please fill up your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide valid email address"],
  },
  phoneNo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please fill your password"],
    minLength: 8,
    select: false,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  token: { type: String },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.correctPassword = async function (
  typedPassword,
  originalPassword
) {
  return await bcrypt.compare(typedPassword, originalPassword);
};

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// userSchema.virtual("password").set(function () {
//   // return this.password;
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
