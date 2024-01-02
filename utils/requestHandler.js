const _ = require("lodash");
const { StatusCodes } = require("http-status-codes");
const Logger = require("./logger");

class RequestHandler {
  constructor() {
    this.logger = Logger;
    this.sendSuccess = this.sendSuccess.bind(this);
    this.sendError = this.sendError.bind(this);
    this.throwIf = this.throwIf.bind(this);
    this.validateJoi = this.validateJoi.bind(this);
    this.throwError = this.throwError.bind(this);
  }

  throwIf(fn, status, errorType, errorMessage) {
    return (result) =>
      fn(result) ? this.throwError(status, errorType, errorMessage)() : result;
  }

  validateJoi(err, status, errorType, errorMessage) {
    if (err) {
      this.logger.log(`error in validating request : ${errorMessage}`, "warn");
    }
    return !_.isNull(err)
      ? this.throwError(status, errorType, errorMessage)()
      : "";
  }

  throwError(status, errorType, errorMessage) {
    return (e) => {
      if (!e) e = new Error(errorMessage || "Default Error");
      e.status = status;
      e.errorType = errorType;
      throw e;
    };
  }

  catchError(res, error) {
    if (!error) error = new Error("Default error");
    res.status(error.status || 500).json({
      type: "error",
      message: error.message || "Unhandled error",
      error,
    });
  }

  sendSuccess(res, message, status) {
    this.logger.log(
      `a request has been made and proccessed successfully at: ${new Date()}`,
      "info"
    );
    return (data, globalData) => {
      if (_.isUndefined(status)) {
        status = 200;
      }
      res.status(status).json({
        type: "success",
        message: message || "Success result",
        data,
        ...globalData,
      });
    };
  }

  sendError(req, res, error) {
    this.logger.log(
      `error ,Error during processing request: ${`${req.protocol}://${req.get(
        "host"
      )}${req.originalUrl}`} details message:`,
      "error"
    );

    return res.status(error.status).json({
      type: "error",
      status: error.status,
      message: error?.message,
      error: error.error?.errors,
    });
  }
}
module.exports = RequestHandler;
