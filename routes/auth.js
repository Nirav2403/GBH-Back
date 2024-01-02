const express = require("express");
const { body } = require("express-validator");
const AuthController = require("../controllers/auth");

const loginValidation = [
  body("username").notEmpty().withMessage("username is required."),
  body("email")
    .isEmail()
    .withMessage("Invalid valid Email address format")
    .trim()
    .toLowerCase(),
  body("password")
    .isLength({ min: 8, max: 100 })
    .withMessage("Password must be more than 8 characters long")
    .trim(),
];

const router = express.Router();

router.post("/signup", AuthController.createUser);
router.post("/login", AuthController.loginUser);

module.exports = router;
