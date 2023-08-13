const messages = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../../database/user");
const Conversation = require('../../database/conversations');
const secretKey = 'yournightmarecode';
const {wss, authenticatedClients} = require("../../src/WebSocket")
messages.post("/:id/messages", async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(400).json({ message: "Invalid Token" })
    }
    const token = req.headers.authorization.split(" ")[1];
    const id = req.params.id;
    const message = req.body
    try {
        const decoded = jwt.verify(token, secretKey);
        const _user = await User.findOne({email: decoded.email})
        const conversation = await Conversation.findOne({id: id, "members.id": _user.id});
        if (!conversation) {
            return res.status(401).json({message: "Conversation Not Found!"})
        }
        if (message) {
            authenticatedClients.forEach((user, ws) => {
                if (user.id == conversation.members[0].id == _user.id ? conversation.members[1].id : conversation.members[0].id  && ws.readyState === 1) {
                    const messageData = {
                        data: message,
                        type: "MESSAGE_CREATE"
                    };
                    
                    ws.send(JSON.stringify(messageData));
                }
                console.log(user);
            });
            await conversation.updateOne({$push: {messages: message}})
        }
    }catch(err) {
        console.log(err)
    }
})

module.exports = messages