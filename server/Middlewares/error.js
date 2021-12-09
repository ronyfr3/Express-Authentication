const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //mongodb error handler
  if (err.name === "CastError") {
    err = new ErrorHandler(`${err.path}: ${err.value} is invalid! `, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
