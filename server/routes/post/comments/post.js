const post = require('express').Router();
const jwt = require("jsonwebtoken");
const User = require("../../../database/user");
const Post = require("../../../database/post");
const secretKey = 'yournightmarecode';

post.post("/:id/comments", async (req, res) => {
    const id = req.params.id;
    if (!req.headers.authorization) {
        return res.json({ message: "Invalid Token Authorization" }).status(400)
    }
    if (!req.body) {
        return res.json({message: "Invalid Comment Data"}).status(403)
    }
    const comment = req.body
    const token = req.headers.authorization.split(' ')[1]

    try {
        const decoded = jwt.verify(token, secretKey);
        const user = await User.findOne({email: decoded.email});
        const post = await Post.findOne({id: id});
        if (!user) {
            return res.status(401).json({message: "Unauthorized User"})
        }
        if (!post){
            return res.status(402).json({message: "Post Not Found"})
        }
        await post.updateOne({$push: {comments: comment}})
     }catch(err) {
        console.log(err)
    }

})

module.exports = post