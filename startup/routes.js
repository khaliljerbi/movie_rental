//routes import
const express = require("express");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const register = require("../routes/users");
const login = require("../routes/login");
const error = require("../middlewares/error");


module.exports = app => {
  //routes middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));    
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", register);
  app.use("/api/users", login);
  app.use(error);
};
