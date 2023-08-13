const mongoose = require("mongoose");

const UserShema = new mongoose.Schema({
     fullname: String,
     username: String,
     email: String,
     id: String,
     type: Number,
     verified: {type: Boolean, default: false},
     password: String,
     profile: {avatar: String, bio: String, 
          friends: [{fullname: String, username: String, id: String, requested: Boolean, avatar: String, accepted: Boolean}], 
          notifications: [{name: String, by: String, description: String, href: String,}]},

})

const User = mongoose.model("User", UserShema)

module.exports = User