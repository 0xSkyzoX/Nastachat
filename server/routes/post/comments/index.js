const comments = require('express').Router();
const get = require("./get")
const DELETE = require('./delete')
const post = require("./post")

comments.use("/", get)
comments.use("/", DELETE)
comments.use("/", post)

module.exports = comments