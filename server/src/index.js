const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const uri = process.env.MONGODB_URL;
const api = require("../routes/api")

// Middleware
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: "10mb"}));

app.use("/api", api)

app.listen(3001, console.log("App listening to 3001 port..."))

mongoose.set("strictQuery", false);
mongoose.connect(uri)