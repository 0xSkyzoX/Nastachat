const me = require('express').Router();
const secretKey = 'yournightmarecode';
const User = require("../../database/user");
const jwt = require("jsonwebtoken")

me.get("/@me", async (req, res) => {
     if (!req.headers.authorization) {
          return res.status(401).json({message: "Invalid User Token"})
     }
     var token = req.headers.authorization.split(' ')[1];
     
     try {
          const decoded = jwt.verify(token, secretKey);
          const user = await User.findOne({email: decoded.email})
          if (!user) {
               return res.status(400).json({message: "Invalid User"})
          }
          const _user = {
               username: user.username,
               email: user.email,
               fullname: user.fullname,
               type: user.type,
               verified: user.verified,
               profile: user.profile,
               id: user.id
          }
          return res.json(_user).status(200)
     } catch(err) {
          res.send("Unexpected Error")
          console.log(err)
     }
})
me.get("/friends/@me", async (req, res) => {
     const token = req.headers.authorization.split(" ")[1]
     if (!token) {
          return res.status(400).json({message: "Invalid Token"})
     }
     try {
          const decoded = jwt.verify(token, secretKey);
          const user = await User.findOne({email: decoded.email});
          if (user?.email == decoded.email) {
               return res.status(401).json({message: "Unauthorized Token"})
          }
          return res.status(200).json({friends: user.profile.friends})
     } catch(err){
          console.log(err)
     }
})


me.patch("/@me", async (req, res) => {
     var token = req.headers.authorization.split(' ')[1];

     const {user} = req.body

     if (!token) {
          return res.status(401).json({message: "Invalid User Token"})
     }
     const decoded = jwt.verify(token, secretKey);
     try {
          const _user = await User.findOne({email: decoded.email})
          if (!_user) {
               return res.status(400).json({message: "Invalid User"})
          }
          await _user.updateOne(user)
     } catch(err) {
          res.send("Unexpected Error")
          console.log(err)
     }
})

module.exports = me