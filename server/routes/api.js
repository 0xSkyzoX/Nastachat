const express = require("express");
const api = express.Router()
const app = require("./auth/index")
const user_notifications = require("./user/notifications")
const me = require("./user/@me")
const post = require("./post/index")
const likes = require("./post/likes")
const upload_router = require("./upload/index")
const friends = require("./user/friends")
const inbox = require("./conversations/inbox")
const profile = require("./profile/index");
const protect_conversation =  require("./conversations/protect");
const messages =  require("./conversations/messages");
const conversation = require("./conversations/index");
const comments = require("./post/comments/index");
const avatar = require("./user/avatar");

// main api route
api.use("/", app)

// user api route
app.use('/user', user_notifications)
app.use('/user', me)
app.use("/posts", post)
app.use("/posts", likes)
app.use("/upload", upload_router)
app.use("/friends", friends)
app.use("/conversations", inbox)
app.use("/profile", profile)
app.use("/conversation", protect_conversation)
app.use("/conversation", conversation)
app.use("/posts", comments)
app.use("/avatar", avatar)
app.use("/conversation", messages)

module.exports = api