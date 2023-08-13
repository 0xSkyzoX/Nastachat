const inbox = require("express").Router();
const User = require("../../database/user");
const jwt = require("jsonwebtoken");
const secretKey = 'yournightmarecode';
const Conversation = require("../../database/conversations")

const generateId = (length) => {
     const characters = '0123456789';
     let id = '';
     for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          id += characters[randomIndex];
     }
     return id;
}

inbox.get("/inbox/list", async (req, res) => {
     const token = req.headers.authorization.split(" ")[1]
     if (!token) {
          return res.status(400).json({ message: "Invalid Token" })
     }
     try {
          const decoded = jwt.verify(token, secretKey)
          const user = await User.findOne({ email: decoded.email }).lean()
          if (!user) {
               return res.status(401).json({ message: "Unauthorized Token" })
          }
          const friends = user.profile.friends.filter((friend) => friend.accepted === true)
          const response = await Promise.all(friends.map(async (friend) => {
               const conversation = await Conversation.findOne({
                    "members.id": { $all: [friend.id, user.id] }
                  });                  
               console.log(conversation)
               const id = generateId(14)
               if (!conversation) {
                    const newConversation = new Conversation({
                         id: id,
                         type: "PRIVATE",
                         members: [{
                              username: user.username,
                              avatar: user.profile.avatar,
                              id: user.id,
                              fullname: user.fullname
                         }, 
                         {
                              username: friend.username,
                              avatar: friend.avatar,
                              id: friend.id,
                              fullname: friend.fullname
                         }
                    ]
                    })
                    await newConversation.save()
               } else {
                    const _user = await User.findOne({ id: friend.id })
                    return {
                         ...friend,
                         bio: _user.profile.bio,
                         conversation_id: conversation.id
                    }
               }
               
          }))
          
          return res.status(200).json({ inbox: response })
     } catch (err) {
          console.log(err)
     }
})

module.exports = inbox