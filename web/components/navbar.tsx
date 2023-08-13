import { useEffect, useState } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./sidebar";
import { Client } from "../Client";
import { UserType, UserData, ErrorTypes, NotificationsInfo } from "../Client/datatypes";
import Expired from "./expired";
import { AccountSidebar } from './sidebar/AccountSidebar';
import ReactDOM from "react-dom/client";
import AuthNavItems from './authNavItems';
import guest_profile from "../public/guest.png"

const client = new Client({ type: UserType.Member, token: window.localStorage.getItem("token") as string })

interface NavbarComponentProps {
     Animated?: boolean
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
const initNotifications: NotificationsInfo[] = [{
     name: "",
     by: "" || undefined,
     description: ""
}]
/**
 * This is the mainly navbar in Nasta Web
 */

const Navbar: React.FC<NavbarComponentProps> = ({ Animated }) => {
     const [isDropNav, setIsDropNav] = useState<boolean>(false);
     const [isSidebarHidden, setIsSidebarHidden] = useState<boolean>(true)
     const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
     const [user, setUser] = useState<UserData>(initUser)
     const [expired, setExpired] = useState<boolean>(false)
     const [accountSidebar, setAccountSidebar] = useState<boolean>(false)
     const [notifications, setNotifications] = useState<NotificationsInfo[]>([])

     useEffect(() => {
          const root = document.getElementById("root") as HTMLElement
          root.style.display = "none"
          const loading = document.getElementById("loading")

          if (root && loading) {
               root.style.display = "none"
               loading.style.display = "flex"
               setTimeout(() => {
                    root.style.display = "block"
                    loading.style.display = "none"
               }, 500)
          }

     }, [])
     useEffect(() => {
          document.body.style.userSelect = expired ? "none" : "auto"
          document.body.style.overflowY = expired ? "hidden" : "scroll"
     }, [expired])
     // This is for traking the scrolling and switch the value of isDropNav to True 
     useEffect(() => {
          const handleScroll = () => {
               // Get the current scroll position
               const scrollPosition = window.scrollY;

               // Check if scroll position is greater than 80 pixels
               if (scrollPosition > 80) {
                    // Perform actions when scroll position is greater than 80 pixels
                    setIsDropNav(true)
               } else if (scrollPosition === 0) {
                    setIsDropNav(false)
               }
          };

          // Attach the scroll event listener
          window.addEventListener('scroll', handleScroll);

          // Clean up the event listener when the component is unmounted
          return () => {
               window.removeEventListener('scroll', handleScroll);
          };
     }, []);

     useEffect(() => {
          const root = document.getElementById("root") as HTMLElement;

          const handleClick = () => {
               setAccountSidebar(false);
          };

          if (accountSidebar) {
               root.style.webkitFilter = "blur(2px)";
               root.style.userSelect = "none";
               root.style.cursor = "default";
               document.body.style.overflowY = "hidden";
               root.addEventListener("click", handleClick);
          } else {
               root.style.webkitFilter = "";
               root.style.userSelect = "";
               root.style.cursor = "";
               document.body.style.overflowY = "scroll";

               root.removeEventListener("click", handleClick);
          }

          return () => {
               root.removeEventListener("click", handleClick);
          };
     }, [accountSidebar, setAccountSidebar]);

     const sidebaraccount = ReactDOM.createRoot(document.getElementById("account-sidebar") as HTMLElement)

     sidebaraccount.render(<AccountSidebar setIsPops={setAccountSidebar} isPops={accountSidebar} />)
     // Verify if user is logged in

     useEffect(() => {
          //Get token and set it
          const token = localStorage.getItem("token")
          if (!token) {
               return console.log("Invalid Token")
          } else {
               client.setToken(token)
          }
          // verify function from Client
          const verifyToken = async () => {
               const isToken = await client.verifyToken()
               if (!isToken) {
                    setIsLoggedIn(false)
               } else {
                    setIsLoggedIn(true)
               }
          }
          verifyToken()
          const fetchUser = async () => {
               const user_data = await client.user.fetchUser(token)
               setUser(user_data)
               setNotifications(user_data.profile.notifications)
               if (client.user.error == ErrorTypes.Expired_Token) {
                    setExpired(true)
               } else {
                    setExpired(false)
               }
          }
          fetchUser()
     }, [])

     useEffect(() => {
          client.event('NotificationCreate', (notification) => {
               setNotifications((prevNoti) => [...prevNoti, notification])
          })
          return () => {
               client.socket.close()
          }
     }, []);

     return (
          <>
               <div id="navbar" className={`bg-[#151822c7]  border-b-[1px] top-0 left-0 border-b-[#8d8d8d41] h-[80px] flex items-center z-[1000] backdrop-blur-[40px]  ${Animated ? isDropNav ? "fixed animate-[wiggle_.8s_ease-in-out]" : "absolute" : "fixed"} w-[100%]`}>
                    <header className="flex items-center justify-between m-2">
                         {
                              isLoggedIn && <FontAwesomeIcon onClick={() => {
                                   setAccountSidebar(true)
                              }} id="sidebar-btn" icon={faBars} className={`text-[30px] mobile:hidden p-2 pt-1.5 pb-1.5 relative top-[2px] border border-gray-700 rounded-md ml-3.5 cursor-pointer`} />
                         }
                         <h1 className="text-[40px] mobile-sm:text-[30px]  font-bold text-left ml-4 select-none cursor-pointer"><a onClick={() => {
                              window.location.replace("/")
                         }}>Nastachat</a></h1>
                         {
                              !isLoggedIn ? <ul className="flex ml-6 relative top-[2px] gap-4 nav1:hidden text-[17px] [&>*]:transition duration-[500ms] [&>*]:delay-[20ms] [&>*]:select-none [&>*]:cursor-pointer">
                                   <li className="hover:opacity-80">Home</li>
                                   <li className="hover:opacity-80">Our Company</li>
                                   <li className="hover:opacity-80">Features</li>
                              </ul> : <AuthNavItems notifications={notifications} setNotifications={setNotifications} user={user} />
                         }

                         {
                              !isLoggedIn && <div className="absolute right-0 mr-6 nav1:hidden flex gap-4 [&>*]:border-[#37334e69] [&>*]:border [&>*]:rounded-[8px] [&>*]:bg-gradient-to-tl from-[#1a1f308f] from-50% to-[#290a7436] from-70% to-[#1fd7f836] font-mono">
                                   <a href="/login">
                                        <button className="pl-6 pr-6 pt-2 pb-2 transition duration-200  hover:bg-[#100f2ece] rounded-lg" ><span className="relative">Log In</span></button>
                                   </a>
                                   <a href="/register">
                                        <button className="pl-6 pr-6 pt-2 pb-2 transition duration-200  hover:bg-[#100f2ece] rounded-lg"><span className="relative">Sign Up</span></button>
                                   </a>
                              </div>
                         }

                         <FontAwesomeIcon onClick={() => {
                              setIsSidebarHidden(!isSidebarHidden)
                         }} icon={faBars} className={`text-white hidden text-[40px] absolute mr-6 right-0 nav1:block `} />
                         {
                              isLoggedIn && <div className="flex flex-row-reverse items-center absolute right-0 nav1:hidden mr-6 select-none" onDragStart={(e) => { e.preventDefault() }}>
                                   {
                                        user.profile.avatar ? <img src={user.profile.avatar} className={`w-[47px] bg-slate-300 rounded-full ml-2  ${!accountSidebar && "cursor-pointer"}`}></img> : <img src={guest_profile} className={`w-[45px] bg-slate-300 rounded-full ml-2 ${!accountSidebar && "cursor-pointer"}`} ></img>
                                   }
                                   <div className="flex flex-col gap-0 text-right mr-2">
                                        <h3 className="font-bold text-[17px]">{user.fullname}</h3>
                                        <p>{user.email}</p>
                                   </div>

                              </div>
                         }
                    </header>
               </div>
               <Sidebar setIsSidebarHidden={setIsSidebarHidden} isSidebarHidden={isSidebarHidden}></Sidebar>
               {
                    expired && <Expired className="" setExpired={setExpired} />
               }

          </>

     )
}

export default Navbar