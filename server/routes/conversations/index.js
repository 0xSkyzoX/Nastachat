const conversation = require('express').Router();
const Conversation = require('../../database/conversations');
const User = require("../../database/user");
const jwt = require("jsonwebtoken");
const secretKey = 'yournightmarecode';

conversation.get("/:id", async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const conversation_id = req.params.id

    try {
        const decoded = jwt.verify(token, secretKey)
        const user = await User.findOne({email: decoded.email})
        const conversation = await Conversation.findOne({id: conversation_id, "members.id": user.id})
        if (!conversation) {
            return res.status(401).json({message: "Unauthorized Token"})
        } else {
            return res.status(200).json({conversation: conversation})
        }
    }catch(err) {
        console.log(err)
    }
})

module.exports = conversation