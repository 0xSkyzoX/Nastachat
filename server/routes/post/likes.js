const likes = require("express").Router();
const jwt = require("jsonwebtoken");
const secretKey = 'yournightmarecode';
const Post = require("../../database/post");
const User = require("../../database/user");
const { authenticatedClients, wss } = require("../../src/WebSocket.js")

const sendNotificationToUser = (userId, notification) => {
     authenticatedClients.forEach((user, ws) => {
          if (user.id == userId && ws.readyState === 1) {
               ws.send(notification)
          }
     });
};

likes.put("/:postid/likes", async (req, res) => {
     const _postid = req.params.postid;
     const token = req.headers.authorization.split(" ")[1];
     if (!token) {
          return res.status(400).json({ message: "Invalid Token" });
     }
     if (!_postid) {
          return res.status(400).json({ message: "Invalid Post Id" });
     }

     try {
          const decoded = jwt.verify(token, secretKey);
          const _user = await User.findOne({ email: decoded.email });
          if (_user.email !== decoded.email) {
               return res.status(401).json({ message: "Invalid User Token" });
          }
          const filter = { id: _postid };
          const update = { $push: { likes: _user.id } };

          const updatedPost = await Post.findOneAndUpdate(filter, update, { new: true });
          if (!updatedPost) {
               return res.status(403).json({ message: "Post Not Found" });
          }
          const notification = {
               data: {
                    name: `Your Post`,
                    by: "Nastachat",
                    description: `${_user.fullname} liked your post.`
               },
               type: "NOTIFICATION_CREATE"
          }
          if (updatedPost.owner.id !== _user.id) {
               sendNotificationToUser(updatedPost.owner.id, JSON.stringify(notification));
               const saveNotification = await User.findOneAndUpdate({ id: updatedPost.owner.id }, { $push: { "profile.notifications": notification.data } })
               if (!saveNotification) {
                    console.log("User Not Found")
               }
          }

     } catch (err) {
          console.log(err);
          return res.status(500).json({ message: "Server Error" });
     }
});



likes.get("/:postid/likes", async (req, res) => {
     const _postid = req.params.postid;
     const token = req.headers.authorization.split(" ")[1]
     if (!token) {
          return res.status(400).json({ message: "Invalid Token" })
     }
     if (!_postid) {
          return res.status(400).json({ message: "Invalid Post Id" })
     }
     try {
          const decoded = jwt.verify(token, secretKey)
          const _user = await User.findOne({ email: decoded.email })
          if (_user !== decoded.email) {
               return res.status(401).json({ message: "Invalid User Token" })
          }
          const _userid = _user?.id
          const _post = await Post.findOne({ "owner.id": _userid, id: _postid })
          if (!_post) {
               return res.status(403).json({ message: "Post Not Found" })
          }
          return res.status(200).json(_post?.likes)
     } catch (err) {
          console.log(err)
     }
})

likes.delete("/:postid/likes", async (req, res) => {
     const _postid = req.params.postid;
     const token = req.headers.authorization.split(" ")[1];
     if (!token) {
          return res.status(400).json({ message: "Invalid Token" });
     }
     if (!_postid) {
          return res.status(400).json({ message: "Invalid Post Id" });
     }
     try {
          const decoded = jwt.verify(token, secretKey);
          const _user = await User.findOne({ email: decoded.email });
          if (_user?.email !== decoded.email) {
               return res.status(401).json({ message: "Invalid User Token" });
          }
          const _userid = _user?.id;
          const filter = { id: _postid };
          const update = { $pull: { likes: _userid } };

          const updatedPost = await Post.findOneAndUpdate(filter, update, { new: true });

          if (!updatedPost) {
               return res.status(403).json({ message: "Post Not Found" });
          }
     } catch (err) {
          console.log(err);
          return res.status(500).json({ message: "Server Error" });
     }
})

module.exports = likes