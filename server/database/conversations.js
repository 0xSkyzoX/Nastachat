const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
     type: String,
     id: String,
     members: [{username: String,
     fullname: String,
     avatar: String,
     id: String
     }],
     messages: [{
          content: String,
          author: {username: String,
               fullname: String,
               avatar: String,
               id: String
               },
               createdAt: String
     }]
})

const Conversation = mongoose.model("Conversations", ConversationSchema)
module.exports = Conversation