const profile = require("express").Router();
const User = require("../../database/user");
const jwt = require("jsonwebtoken");
const secretKey = 'yournightmarecode';

profile.get("/:id", async (req, res) => {
     const token = req.headers.authorization.split(" ")[1]
     const _id = req.params.id;
     if (!token) {
          return res.status(400).json({message: "Invalid Token"})
     }
     if (!_id) {
          return res.status(400).json({message: "Invalid User ID"})
     }
     try {
          const decoded = jwt.verify(token, secretKey)
          const _user = await User.findOne({email: decoded.email})
          if (_user.email !== decoded.email) {
               return res.status(401).json({message: "Unauthorized Token"})
          }
          const usr = await User.findOne({id: _id}).lean();
          if (!usr) {
               return res.status(402).json({message: "User Not Found"})
          }
          const user = {
               username: usr.username,
               fullname: usr.fullname,
               avatar: usr.profile.avatar,
               bio: usr.profile.bio,
          }
          res.status(200).json(user)
     } catch(err) {
          console.log(err)
     }
})

module.exports = profile