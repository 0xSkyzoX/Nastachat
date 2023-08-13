const user = require("express").Router()
const jwt = require("jsonwebtoken");
const secretKey = 'yournightmarecode';
const User = require("../../database/user");

user.get("/:id", async (req, res) => {
     const _userid = req.params.id 
     var token = req.headers.authorization.split(' ')[1];

     try {
          const decoded = jwt.verify(token, secretKey)
          const user = await User.findOne(decoded.email)
          if (user.email !== decoded.email) {
               return res.status(401).json({message: "Invalid Token User"})
          }
          const _user = await User.findOne({id: _userid})
          if (!user) {
               return res.status(400).json({message: "User Not Found"})
          }
          const response = {
               fullname: _user.fullname,
               username: _user.username,
               avatar: _user.profile.avatar
          }
          return res.json({user: response}).status(200)
     }catch(err) {

      }
})