import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar';
import { ConversationsInfo, MessageInfo, UserData, UserType } from '../Client/datatypes';
import { Constants } from '../Client/contants';
import Auth from '../components/auth';
import ConversationHeader from "../components/conversation-components/header";
import SideInboxList from "../components/conversation-components/sideLeftInboxList";
import guest_profile from "../public/guest.png";
import { Client } from '../Client';

const client = new Client({ token: localStorage.getItem("token") as string, type: UserType.Member })

const InitConversation: ConversationsInfo = {
     members: [{ username: "", avatar: "", fullname: "", id: "", bio: "" }],
     messages: [{ content: "", author: { username: "", fullname: "", id: "", bio: "", avatar: "" }, createdAt: "" }],
     type: "PRIVATE",
     id: ""
}
const initUser: UserData = {
     username: "",
     email: "",
     fullname: "",
     profile: { avatar: "", bio: "", friends: [{ username: "", fullname: "", avatar: "", accepted: false, id: "", requested: false }], notifications: [{ name: "", by: "", description: "" }] },
     verified: false,
     type: 1,
     id: ""
}
const token = window.localStorage.getItem("token");

const Conversation: React.FC = () => {
     const [conversation, setConversation] = useState<ConversationsInfo>(InitConversation)
     const [user, setUser] = useState<UserData>(initUser)
     const [isLoading, setIsLoading] = useState<boolean>(true)
     const [isInboxList, setIsInboxList] = useState<boolean>(true)
     const params = useParams();
     const conversation_id = params.id;
     const navigate = useNavigate();
     const [currentWidth, setCurrentWidth] = useState<number>(window.innerWidth);
     const [content, setContent] = useState<string>("")
     const conversationContainerRef = useRef(null);

     const MessageFormHandler = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!content) return;

          try {
               const payload: MessageInfo = {
                    content: content,
                    author: {
                         username: user.username,
                         fullname: user.fullname,
                         id: user.id, bio:
                              user.profile.bio,
                         avatar: user.profile.avatar
                    },
                    createdAt: new Date().toString()
               }

               setContent("")
               const response = await fetch(`${Constants.API_BASE}/conversation/${conversation_id}/messages`, {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                         authorization: "Bearer " + token
                    },
                    body: JSON.stringify(payload)
               })
               const conversationContainer = document.getElementById("conversation-container");
               if (conversationContainer) {
                    conversationContainer.scrollTop = conversationContainer.scrollHeight;
               }
          } catch (err) {
               console.log(err)
          }
     }

     useEffect(() => {
          client.event("MessageCreate", (message) => {
               setConversation((prevConv) => {
                    const newMessage: MessageInfo[] = [...prevConv.messages, message]
                    return { ...prevConv, messages: newMessage }
               })

          })
     }, [])

     useEffect(() => {
          const verifyConversation = async () => {
               const response = await fetch(`${Constants.API_BASE}/conversation/verify/${conversation_id}`, {
                    method: "GET",
                    headers: {
                         "Content-Type": "application/json",
                         authorization: `Bearer ${token}`
                    }
               })
               if (!response.ok) {
                    return navigate("/dashboard")
               }
          }
          const fetchUser = async () => {
               const _user = await client.user.me()
               setUser(_user)
          }
          fetchUser()
          verifyConversation()
          const getConversation = async () => {
               const response = await fetch(`${Constants.API_BASE}/conversation/${conversation_id}`, {
                    headers: {
                         "Content-Type": "application/json",
                         authorization: `Bearer ${token}`
                    },
                    method: "GET"
               })
               const data = await response.json()
               if (response.ok) {
                    setIsLoading(false)
                    return setConversation(data.conversation)
               }

          }
          getConversation()

          document.title = `Inbox ${user.fullname}`
          const inputElement = document.getElementById("input");
          if (inputElement) {
               inputElement.style.width = `${isInboxList ? window.innerWidth - 300 : window.innerWidth}px`;
          }
          const conversationContainer = document.getElementById("conversation-container");
          if (conversationContainer) {
               conversationContainer.scrollTop += conversationContainer.scrollHeight;
          }
     }, [])

     useEffect(() => {
          // ... (existing useEffect code)
    
          // Scroll to the end when messages change
          if (conversationContainerRef.current) {
             conversationContainerRef.current.scrollTop = conversationContainerRef.current.scrollHeight;
          }
       }, [conversation.messages]);
    

     useEffect(() => {
          const handleResize = (e: UIEvent) => {
               if (e.currentTarget) {
                    const newWidth = e.currentTarget.innerWidth;
                    setCurrentWidth(newWidth);
                    const inputElement = document.getElementById("input");
                    if (inputElement) {
                         inputElement.style.width = `${isInboxList ? window.innerWidth - 300 : currentWidth}px`;
                    }
               }
          };

          window.addEventListener("resize", handleResize);

          return () => {
               window.removeEventListener("resize", handleResize);
          };
     }, []);

     return (
          <div>
               <Navbar />
               <main className='mt-[80px]'>

                    <div className='flex'>
                         <div className={`w-[300px]  ${!isInboxList && "hidden"}`}>
                              <SideInboxList currentConversationId={conversation_id as string} />
                         </div>
                         <div className='w-full  flex flex-col justify-between'>
                              <ConversationHeader conversation={conversation} isLoading={isLoading} user={user}
                                   isInbox={isInboxList}
                                   setIsInbox={setIsInboxList}
                              />
                              <div id="conversation-container" ref={conversationContainerRef} className='mb-16 flex flex-col px-4 py-2 gap-2'>
                                   {conversation.messages.map((message) => {
                                        if (message.author.id !== user.id) {
                                             return (
                                                  <div className='flex justify-end gap-2 items-center'>
                                                      
                                                       <div className='text-end'>
                                                       <h5 className='font-bold text-[25px]'>{message.author.fullname}</h5>
                                                            <p className='text-[20px]'> {message.content}</p>
                                                       </div>
                                                       <div>
                                                        {message.author.avatar ? <img src={message.author.avatar} className={`max-w-[45px] max-h-[45px] rounded-full`} ></img> : <img src={guest_profile} className={`max-w-[45px] max-h-[45px] bg-slate-300 rounded-full`} ></img>}
                                                       </div>
                                                  </div>
                                             )
                                        } else {
                                             return (
                                                  <div className='flex gap-2 items-center'>
                                                       <div>
                                                        {message.author.avatar ? <img src={message.author.avatar} className={`max-w-[45px] max-h-[45px] rounded-full`} ></img> : <img src={guest_profile} className={`max-w-[45px] max-h-[45px] bg-slate-300 rounded-full`} ></img>}
                                                       </div>
                                                       <div >
                                                       <h5 className='font-bold text-[25px]'>{message.author.fullname}</h5>
                                                            <p className='text-[20px]'> {message.content}</p>
                                                       </div>
                                                  </div>
                                             )
                                        }
                                   })}
                              </div>
                              <div className='fixed bottom-0'>
                                   <form onSubmit={MessageFormHandler} className='flex justify-center'>
                                        <input value={content} placeholder={`Message to ${conversation.members[0]?.id == user?.id ? conversation.members[1]?.fullname : conversation.members[0]?.fullname}`} onChange={(e) => setContent(e.target.value)} id='input' className={`sticky w-[${isInboxList ? window.innerWidth - 300 : "100"}px] placeholder-slate-300 placeholder:text-lg  px-2 py-1.5 text-white text-[20px] border-t border-t-white/40 focus:outline-none focus:border-blue-900 bg-[#292929]`} autoFocus />
                                   </form>
                              </div>
                         </div>

                    </div>

               </main>
          </div>
     )
}

export default Auth("login", Conversation)