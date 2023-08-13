const protect_conversation = require("express").Router();
const Conversation = require("../../database/conversations");
const jwt = require("jsonwebtoken");
const User = require("../../database/user");
const secretKey = 'yournightmarecode';

protect_conversation.get("/verify/:id", async (req, res) => {
     const token = req.headers.authorization.split(" ")[1];
     const conversation_id = req.params.id;

     if (!token) {
          return res.status(400).json({message: "Invalid Token"})
     }

     try {
          const decoded = jwt.verify(token, secretKey)
          const user = await User.findOne({email: decoded.email})
          if (!user?.email == decoded.email) {
               return res.status(401).json({message: "Unauthorzed Token"})
          }
          const conversation = await Conversation.findOne({id: conversation_id, 'members.id': user.id})
          if (!conversation) {
               return res.status(401).json({message: "Unauthorized Conversation"})
          }
          res.status(200).json({message: "Authorized"})
     } catch (err) {

     }
})

module.exports = protect_conversation