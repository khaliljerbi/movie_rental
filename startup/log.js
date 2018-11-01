const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");
const keys = require("../config/keys");
module.exports = () => {
  winston.handleExceptions(
    new winston.transports.File({ filename: "uncaughtException.log" })
  );
  process.on("unhandledRejection", err => {
    throw err;
  });

  winston.add(winston.transports.File, { filename: "logfile.log" });
  winston.add(winston.transports.MongoDB, {
    db: keys.url,
    level: "warning",
    options: { useNewUrlParser: true }
  });
};
