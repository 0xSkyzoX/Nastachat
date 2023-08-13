import { ErrorTypes, PostInfo, UserData } from '../datatypes';
import { Constants } from "../contants";

export default class User {
     public error: number;
     private cachedUserData: UserData | null;
     private token: string;
     constructor(token: string) {
          this.cachedUserData = null;
          this.token = token
     }
     /**
      * put the user token in the function params and get this use data
      * @param token User JWT
      * @returns User data, Object
      */
     public async fetchUser(token: string): Promise<UserData> {
          try {
               if (this.cachedUserData) {
                    return this.cachedUserData;
               }

               const response = await fetch(`${Constants.API_BASE}/user`, {
                    method: "POST",
                    headers: {
                         authorization: `Bearer ${token}`,
                         "Content-Type": "application/json"
                    },
               });
               const data = await response.json();
               if (data.message == "expired") {
                    this.error = ErrorTypes.Expired_Token
               }
               if (!response.ok) {
                    return;
               }


               this.cachedUserData = data;
               return this.cachedUserData
          } catch (err) {
               console.log(err);
               throw new Error("Failed to fetch user data.");
          }
     }
     
     public async fetchPosts(token: string): Promise<PostInfo[]> {
          try {
               const response = await fetch(`${Constants.API_BASE}/posts`, {
                    method: "GET",
                    headers: {
                         "Content-Type": "application/json",
                         authorization: `Bearer ${token}`
                    }
               })
               const posts: PostInfo[] = await response.json()
               if (response.ok) {
                    return posts
               }
          } catch (err) {
               console.log(err)
          }
     }
     public async createPost<PostInfo>(post: PostInfo) {
          try {
               const response = await fetch(`${Constants.API_BASE}/posts`, {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                         authorization: `Bearer ${this.token}`
                    },
                    body: JSON.stringify(post)
               })
               if (response.ok) {
                    return response
               }
          } catch (err) {
               console.log(err)
          }
     }
     public async me() {
          
          try {
               const response = await fetch(`${Constants.API_BASE}/user/@me`, {
                    method: "GET",
                    headers: {
                         "Content-Type": "application/json",
                         authorization: `Bearer ${this.token}`
                    }
               })
               const data: UserData = await response.json()
               if (response.ok) {
                    return data
               }
          }catch(err) {
               console.log(err)
          }
     }
     public async avatar(id: string) {
          if (!id) {
               return console.log("Invalid ID")
          }
          try {
               const response = await fetch(`${Constants.API_BASE}/avatar/${id}`, {
                    method: "GET",
                    headers: {
                      'Content-Type': 'application/json',
                      authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                  })
                  return await response.json()
          }catch(err) {
               console.log(err)
          }
     }
}
