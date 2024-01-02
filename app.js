const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const route = require("./routes");
const constants = require("./config/cors");

const config = require("./config/appConfig");
// const ErrorLogger = require("./config/logger");

const ENVIRONMENT = config.app.env;

const app = express();
app.set("config", config);
// app.use(logger(ENVIRONMENT === "development" ? "dev" : "common"));
// app.use(logger("combined", ErrorLogger));
app.use(cors(constants.corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api", route);

module.exports = app;
