const get = require('express').Router();
const User = require('../../../database/user');
const Post = require('../../../database/post');
const jwt = require('jsonwebtoken');
const secretKey = 'yournightmarecode';

// api/posts/{post.id}/comments/all
get.get('/:id/comments/all', async (req, res) => {
    const id = req.params.id;
    if (!req.headers.authorization) {
        return res.json({ message: "Invalid Token Authorization" }).status(400)
    }
    const token = req.headers.authorization.split(' ')[1]

    try {
        const decoded = jwt.verify(token, secretKey)
        const user = await User.findOne({ email: decoded.email })
        const post = await Post.findOne({ id: id })
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized Token' })
        }
        if (!post) {
            return res.status(402).json({ message: "Post Not Found" })
        }
        const acceptedFriends = user.profile.friends.filter((friend) => friend.accepted === true)
        const findPostOwnerFriend = acceptedFriends.find((friend) => friend.id === post.owner.id)

        if (findPostOwnerFriend) {
            res.status(200).json({ comments: post.comments })
        } else if (post.owner.id === user.id) {
            res.status(200).json({ comments: post.comments })
        } else {
            res.status(403).json({ message: "You Don't Have Access to see This Post" })
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = get