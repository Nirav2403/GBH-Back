const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/apiError");
const RequestHandler = require("../utils/requestHandler");
const Logger = require("../utils/logger");

const ResponseHandler = async (e, req, res, next) => {
  if (e instanceof Error) {
    const statusCode = e.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const errorMessage = e.message || "Internal Server Error";
    const error = new AppError(statusCode, errorMessage, e);

    const { sendError } = new RequestHandler();
    await sendError(req, res, error);
  } else {
    const { sendSuccess } = new RequestHandler();
    const message = e?.message || "Success";
    const status = e?.status || 200;
    const data = e?.data || {};

    const sendResponse = sendSuccess(res, message, status);
    console.log(sendResponse);
    await sendResponse(data);
  }
};

module.exports = ResponseHandler;
