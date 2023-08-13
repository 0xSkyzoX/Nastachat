const express = require("express");
const user_notifications = express.Router();
const User = require("../../database/user");

user_notifications.get("/notifications", async (req, res) => {
     var token = req.headers.authorization.split(' ')[1];
     try {
          const response = await fetch(`http://localhost:3001/api/verifyToken`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json"
               },
               body: JSON.stringify({token: token})
          })
          const data = await response.json()
          if (!response.status == 200) {
             return res.json({message:"Unauthorized Token"}).status(401)
          }
          return res.json(data.user.profile.notifications).status(200)
     } catch(err) {
          console.log(err)
     }
})

module.exports = user_notifications