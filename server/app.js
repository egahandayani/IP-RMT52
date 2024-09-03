require("dotenv").config();
const express = require("express");
const { errorHandler } = require("./middlewares/errorHandler");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require('"./routes'));
app.use(errorHandler);

module.exports = app;
