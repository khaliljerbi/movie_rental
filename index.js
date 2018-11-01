const winston = require("winston");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

require('./startup/log')();
require('./startup/db')();
require('./startup/config')(app);
require('./startup/routes')(app);
require('./startup/validation')();

app.listen(port, () => winston.info(`app listening to port : ${port}...`));
