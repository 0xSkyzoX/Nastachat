const friends = require("express").Router();
const User = require("../../database/user");
const jwt = require("jsonwebtoken");
const secretKey = 'yournightmarecode';
const {wss, authenticatedClients} = require("../../src/WebSocket")

function getRandomItems(array, count) {
     const shuffledArray = array.slice();
     let currentIndex = shuffledArray.length;
     let temporaryValue, randomIndex;

     // Fisher-Yates shuffle algorithm
     while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = shuffledArray[currentIndex];
          shuffledArray[currentIndex] = shuffledArray[randomIndex];
          shuffledArray[randomIndex] = temporaryValue;
     }

     return shuffledArray.slice(0, count);
}

const sendNotificationToUser = (userId, notification) => {
     authenticatedClients.forEach((user, ws) => {
          if (user.id == userId  && ws.readyState === 1 ) {
               ws.send(notification)
          }
          console.log(user)
     });
};

friends.get("/", async (req, res) => {
     const token = req.headers.authorization.split(" ")[1]
     if (!token) {
          return res.status(400).json({ message: "Invalid Token" })
     }
     try {
          const decoded = jwt.verify(token, secretKey);
          const user = await User.findOne({ email: decoded.email });
          if (user?.email !== decoded.email) {
               return res.status(401).json({ message: "Unauthorized Token" })
          }
          const users = await User.find()
          const req_user = users.map((_user) => {
               if (_user.id == user.id) {
                    return;
               }
               return {
                    username: _user.username,
                    fullname: _user.fullname,
                    avatar: _user.profile.avatar,
                    id: _user.id
               }
          }
          )
          const filteredFriendData = req_user.filter((item) => item !== undefined);
          return res.status(200).json({ friends: getRandomItems(filteredFriendData, 10) })
     } catch (err) {
          console.log(err)
     }
})

friends.put("/", async (req, res) => {
     const token = req.headers.authorization.split(" ")[1];
     const {friend} = req.body;
     console.log(friend)
     if (!token) {
          return res.status(400).json({ message: "Invalid Token" })
     }
     try {
          const decoded = jwt.verify(token, secretKey)
          const user = await User.findOneAndUpdate({email: decoded.email},  { $push: {"profile.friends": friend}})
          if (!user) {
               return res.status(403).json({ message: "User Not Found" });
          }
          const notification = {
               data: {
                  name: `Friend Request`,
               by: "Nastachat",
               description: `${user.fullname} Followed you!`,
               user_id: user.id
               },
               type: "NOTIFICATION_CREATE"
          }
          
          sendNotificationToUser(friend.id, JSON.stringify(notification))
          await User.findOneAndUpdate({id: friend.id}, {$push: {"profile.notifications": notification.data}})
     }catch(err) {
          console.log(err)
     }

})

friends.put("/:userid/accept", async (req, res) => {
     const token = req.headers.authorization.split(" ")[1];
     const userid = req.params.userid;
     if (!token) {
          return res.status(400).json({ message: "Invalid Token" })
     }
     try {
          const decoded = jwt.verify(token, secretKey)
          const _user = await User.findOne({email: decoded.email})
          const user = await User.findOneAndUpdate({id: userid, "profile.friends.id": _user?.id},  {$set: {"profile.friends.$.accepted": true}})
          if (!user || !_user) {
               return res.status(403).json({ message: "User Not Found" });
          }
          const notification = {
               data: {
                  name: `${_user.fullname}`,
               by: "Nastachat",
               description: `Accepted your friend request!`,
               user_id: user.id
               },
               type: "NOTIFICATION_CREATE"
          }
          sendNotificationToUser(userid, JSON.stringify(notification))
          
     }catch(err) {
          console.log(err)
     }

})

friends.delete("/:id", async (req, res) => {
     const token = req.headers.authorization.split(" ")[1];
     const friendid = req.params.id;
     if (!token)  {
          return res.status(400).json({message: "Invalid Token"})
     }
     if (!friendid) {
          return res.status(400).status({message: "Invalid Friend ID"})
     }
     try {
          const decoded = jwt.verify(token, secretKey)
          const user = await User.findOneAndUpdate({email: decoded.email}, { $pull: {"profile.friends": {id: friendid} }})
          if (user?.email !== decoded.email) {
               return res.status(401).json({message: "Unauthorized Token"})
          }
          if (!user) {
               return res.status(402).json({message: "User Not Found"})
          }
     } catch(err) {
          console.log(err)
     }
})

module.exports = friends