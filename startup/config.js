const morgan = require("morgan");
const debug = require("debug")("app:startup");
const config = require("config");

module.exports = (app) => {

    if (!config.get("jwtkey")) {
        throw new Error("FATAL ERROR : jwt variable must be set.");
      }
      
      if (config.get("env") === "developement") {
        app.use(morgan("dev"));
        debug("App started...");
      }

}