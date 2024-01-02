const express = require("express");
const AuthRoutes = require("./auth");
const ResponseHandler = require("../middlewares/responseHandler");

const router = express.Router();

router.use("/auth", AuthRoutes);

router.use(ResponseHandler);

module.exports = router;
