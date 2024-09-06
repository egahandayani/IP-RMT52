require("dotenv").config();
const express = require("express");
const { errorHandler } = require("./middlewares/errorHandler");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("./routes"));
app.use(errorHandler);

module.exports = app;
