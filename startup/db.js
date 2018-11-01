const mongoose = require("mongoose");
const keys = require("../config/keys");
const winston = require('winston');
module.exports = () => {
  mongoose.connect(keys.url,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
      }
    )
    .then(() => winston.info("Connected to MongoDB ! "))
    
};
