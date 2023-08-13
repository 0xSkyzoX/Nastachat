const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
     title: String,
     img: String,
     description: String,
     owner: {username: String, avatar: String, id: String, fullname: String},
     comments: [{by: {username: String, id: String}, content: String, id: String}],
     id: String,
     likes: [String],
     likesLength: Number,
     createdAt: Date,
     comments_lenght: Number
})

const Post = mongoose.model("posts", postSchema)

module.exports = Post