const avatar = require('express').Router();
const jwt = require("jsonwebtoken");
const secretKey = 'yournightmarecode';
const User = require("../../database/user");

avatar.get("/:id", async (req, res) => {
    if (!req.headers.authorization) {
        return res.json({ message: "Invalid Token Authorization" }).status(400)
    }
    const token = req.headers.authorization.split(' ')[1];
    const id = req.params.id;
    try {
        const decoded = jwt.verify(token, secretKey);
        const user = await User.findOne({email: decoded.email})
        if (!user) {
            return res.status(401).json({message: "Unauthorized Token"})
        }
        const _user = await User.findOne({id: id})
        if (!_user) {
            return res.status(401).json({message: "User Not Found"})
        }
        res.json({avatar: _user.profile.avatar})
    } catch(err) {
        console.log(err)
    }
})


module.exports = avatar