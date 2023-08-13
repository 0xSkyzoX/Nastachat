const Post = require("../../database/post");
const post = require("express").Router();
const jwt = require("jsonwebtoken");
const secretKey = 'yournightmarecode';
const User = require("../../database/user")

post.get("/", async (req, res) => {
     var token = req.headers.authorization.split(' ')[1];
   
     if (!token) {
       return res.status(400).json({ message: "Invalid Token" });
     }
   
     try {
       const decoded = jwt.verify(token, secretKey);
       const user = await User.findOne({ email: decoded.email });
   
       if (!user) {
         return res.status(401).json({ message: "User Not Found" });
       }
       
       const friends = user.profile.friends.filter((friend) => friend.accepted === true);
       const friendIds = friends.map((friend) => friend.id);
   
       const posts = await Post.find({
         $or: [
           { "owner.id": { $in: friendIds } },
           { "owner.id": { $in: user.id } },
         ],
       }).lean();

       const postsEdited = await Promise.all(posts.map(async (post) => {
        const user = await User.findOne({ id: post.owner.id });
        return {
          ...post,
          owner: {
            username: user.username,
            avatar: user.profile.avatar,
            id: user.id,
            fullname: user.fullname,
          },
          comments: []
        };
      }));
      
   
       if (!posts) {
         return res.status(400).json({ message: "Posts Not Found (you have no posts)" });
       }
   
       return res.json({posts: postsEdited}).status(200);
     } catch (err) {
       console.log(err);
     }
});
   
post.get("/:id", (req, res) => {
  
})

post.post("/", async (req, res) => {
     var token = req.headers.authorization.split(' ')[1];

     const req_post = req.body
    const post = {...req_post, comments: []}
     if (!token) {
          return res.status(400).json({message: "Invalid Token"})
     }
     try {
          const decoded = jwt.verify(token, secretKey)
          const _user = await User.findOne({email: decoded.email})
          if (!_user) {
               return res.status(401).json({message: "User Not Found"})
          }
          const new_post = new Post(post)
          await new_post.save()
          return res.json({post: new_post}).status(200)
     } catch(err) {
          console.log(err)
     }
})

module.exports = post