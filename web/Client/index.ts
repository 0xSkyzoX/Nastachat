import { Constants } from "./contants"
import { EventType, MessageInfo, NotificationsInfo, UserType } from "./datatypes";
import User from "./User/user";
type EventParams<T extends EventType> = T extends "NotificationCreate" ? NotificationsInfo : MessageInfo;

/**
 * the client class to handle server API
 * `/api/user` & `/api/verifyToken` & `/api/login` & `/api/register`
 * @version 1.2.0
 */

export class Client {
     private UserType: number;
     private token: string;
     public readonly user: User;
     public socket: WebSocket = new WebSocket(Constants.GATEWAY)
     constructor({ type, token }: {type?: UserType, token?: string}) {
          this.UserType = type;
          this.user = new User(token);
          this.token = token;
     }
     /**
      * 
      * @param value user token
      * @returns void put token to this.token
      */
     setToken(value: string): void | string {
          if (!value || value.length < 8) {
               return console.error("Invalid Token. use 'client.setToken(YOUR_ACCOUNT_TOKEN)'")
          }
          return this.token = value
     }

     private checkToken(name: string): void {
          if (!this.token || this.token.length < 8) {
               return console.log(`Invalid Token, to use ${name} function you need to add a token.`)
          }
     }
     /**
      * check if the token is valid
      * @returns boolean
      */

     public async verifyToken() {
          this.checkToken("verifyToken")
          try {
               const response = await fetch(`${Constants.API_BASE}/verifyToken`, {
                    method: "POST",
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token: this.token })
               })
               if (response.ok) {
                    return true
               } else {
                    return false
               }
          } catch (err) {
               console.log("error", err)
          }
     }
     /**
      * Event Listener for WebSocket, Nastachat v1.2.0
      * @param type event type
      * @param listener function handler with params includes the data
      */
     public async event<T extends EventType>(type: T, listener: (params: EventParams<T>) => void) {
          const _token = localStorage.getItem("token")
          this.socket.addEventListener('open', function (event) {
               console.log('Connected to WebSocket server');
               // Start HEARTBEAT ACK
               this.send(JSON.stringify({ token: _token }));
          });
          this.socket.addEventListener('message', function (event) {
               const _data = JSON.parse(event.data)
               if (_data.type == "NOTIFICATION_CREATE" && type == "NotificationCreate") {
                    const notification: NotificationsInfo = _data.data
                    listener(notification)
               }
               if (_data.type == "MESSAGE_CREATE" && type == "MessageCreate") {
                    const message: MessageInfo = _data.data
                    listener(message)
               }
          });
     }
}

