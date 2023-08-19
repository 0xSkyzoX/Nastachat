const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 4005 });
const authenticatedClients = new Map();
const jwt = require("jsonwebtoken")
const secretKey = 'yournightmarecode';
const User = require("../database/user")

async function authenticateUser(token) {
     var _user;
  try {
     const decoded = jwt.verify(token, secretKey)
     const user = await User.findOne({ email: decoded.email });
     _user = user
  } catch(err)
  {
     console.log(err)
  }
  return _user;
}

wss.on("connection", function connection(ws) {
     console.log("Connected Websocket")
     ws.on("message", async function message(data) {
          const w = JSON.parse(data);
          const user = await authenticateUser(w.token);
          if (user) {
               // Store the authenticated WebSocket client
               authenticatedClients.set(ws, user);
               console.log("Authenticated client connected:", user.id);
          } else {

               console.log("Authentication failed");
               ws.close();
          }
     })
     ws.on("close", function () {
   
          if (authenticatedClients.has(ws)) {
            const user = authenticatedClients.get(ws);
            authenticatedClients.delete(ws);
            console.log("Authenticated client disconnected:", user.id);
          }
        });
});

module.exports = { wss, authenticatedClients }