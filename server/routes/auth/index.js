const express = require("express");
const crypto = require("crypto");
const secretKey = 'yournightmarecode';
const User = require("../../database/user")
const jwt = require("jsonwebtoken")
const app = express.Router()

function generateSHA256Hash(value) {
     return new Promise((resolve, reject) => {
          const hash = crypto.createHash("sha256");
          hash.update(value);
          const hashedValue = hash.digest('hex');
          resolve(hashedValue);
     });
}

function generateId(length) {
     const characters = '0123456789';
     let id = '';
     for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          id += characters[randomIndex];
     }
     return id;
}

app.post("/register", async (req, res) => {
     const { username, password, email, fullname, type } = req.body;
     const user = await User.findOne({ username: username });
     console.log("Hello Register")
     if (user?.username === username || user?.email === email) {
          return res.status(409).json({ message: "Account already registered" });
     }

     if (!username || !password || !email) {
          return res.status(400).json({ message: "Error, invalid data" });
     }

     try {
          const newUser = new User({
               fullname: fullname,
               password: await generateSHA256Hash(password),
               email: email,
               type: 1,
               username: username,
               id: generateId(14)
          });

          await newUser.save();
          return res.status(200).json({ message: "Registered Successfully!" });
     } catch (err) {
          console.error(err);
          return res.status(500).json({ message: "Internal server error" });
     }
});

app.post("/login", async (req, res) => {
     const { password, email } = req.body;
     try {
          const user = await User.findOne({ email: email });
          if (!user) {
               return res.status(404).json({ error: 'User Not Found' });
          }
          const passwordMatch = crypto.createHash("sha256").update(password).digest("hex")
          console.log(passwordMatch)
          console.log(user?.password)
          if (passwordMatch !== user?.password) {
               return res.status(403).json({ error: 'The username or password is incorrect' });
          }
          const token = jwt.sign({ email }, secretKey, { expiresIn: '24h' });
          return res.status(200).json({ token });
     } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Authentication failed' });
     }
});

app.get('/protected', authenticateToken, (req, res) => {
     try {
          const user = req.user;
          res.status(200).json({ user, message: 'Protected data' });
     } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
     }
});

function authenticateToken(req, res, next) {
     var token = req.headers.authorization.split(' ')[1];
     if (!token) {
          return res.sendStatus(401); // Unauthorized
     }

     jwt.verify(token, secretKey, (err, decoded) => {
          if (err) {
               console.error(err);
               return res.sendStatus(403); // Forbidden
          }
          req.user = decoded;
          next();
     });
}

app.post("/verifyToken", async (req, res) => {
     const { token } = req.body;
     if (!token) {
          return res.status(400).json({ message: "Token is missing" });
     }

     try {
          // Verify the token
          const decoded = jwt.verify(token, secretKey);
          const user = await User.findOne({ email: decoded.email });

          if (!user) {
               return res.status(404).json({ message: "User not found" });
          }
          return res.status(200).json({ user });
     } catch (error) {
          console.error(error);
          // Token verification failed
          return res.status(401).json({ message: "Invalid token" });
     }
});

function checkTokenExpiration(req, res, next) {
     // 'Authorization: Bearer <token>'
     var token = req.headers.authorization.split(' ')[1];
     try {
          if (token) {
               jwt.verify(token, secretKey, (err, decoded) => {
                    if (err) {
                         if (err.name === 'TokenExpiredError') {
                              // send a response, Token has expired
                              return res.status(401).json({ message: 'expired' });
                         } else {
                              return res.status(500).json({ message: 'Token verification failed' });
                         }
                    }
                    req.user = decoded;
                    next();
               });
          } else {
               // No token provided
               return res.status(401).json({ message: 'No token provided' });
          }
     } catch (err) {
          console.log(err)
     }
}

app.post("/user", checkTokenExpiration, async (req, res) => {
     var token = req.headers.authorization.split(' ')[1];

     if (!token) {
          return res.status(400).json({ message: "Token is missing" });
     }
     try {
          const decoded = jwt.verify(token, secretKey);
          const user = await User.findOne({ email: decoded.email });

          if (!user) {
               return res.status(404).json({ message: "User not found" });
          }
          const user_data = {
               username: user.username,
               email: user.email,
               fullname: user.fullname,
               type: user.type,
               verified: user.verified,
               profile: user.profile,
               id: user.id
          }
          return res.status(200).json(user_data);
     } catch (err) {
          return res.status(401).json({ message: "Error" })
     }
})

module.exports = app