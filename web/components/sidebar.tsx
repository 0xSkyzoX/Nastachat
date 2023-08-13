import React, { useState, useEffect } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Client } from "../Client";
import { UserType, UserData } from "../Client/datatypes";
import SidebarItem from './sidebar/item';

const client = new Client({ type: UserType.Member })
const token = localStorage.getItem("token")
client.setToken(token as string)
interface ChildComponentProps {
     isSidebarHidden: boolean;
     setIsSidebarHidden: React.Dispatch<React.SetStateAction<boolean>>;
}
interface ListItemsVisible {
     [key: string]: boolean;
}
const initList: ListItemsVisible = {
     home: false,
     features: false,
     ourcompany: false,
     resources: false,
     account: false
}
const initUser: UserData = {
     username: "",
     email: "",
     fullname: "",
     profile: { avatar: "", bio: "", friends: [{ username: "", fullname: "", avatar: "", requested: false, id: "" }], notifications: [{ name: "", by: "", description: "" }] },
     verified: false,
     type: 1,
     id: ""
}
const Sidebar: React.FC<ChildComponentProps> = ({ isSidebarHidden: isSidebar, setIsSidebarHidden: setSidebar }) => {
     const [ListItems, setListItems] = useState<ListItemsVisible>(initList)
     const [user, setUser] = useState<UserData>(initUser)
     const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

     useEffect(() => {
          const verifyTokenValid = async () => {
               const isTokenValid = await client.verifyToken()
               if (!isTokenValid || !token) {

                    return setIsLoggedIn(false)
               } else {
                    setIsLoggedIn(true)
                    const fetchUser = async () => {
                         const user_data = await client.user.fetchUser(token as string)
                         setUser(user_data)
                    }
                    fetchUser()
               }
          }
          verifyTokenValid()
     }, [token, client])
     useEffect(() => {
          document.body.style.overflowY = isSidebar ? "scroll" : "hidden";
     }, [isSidebar]);

     const HandleList: React.MouseEventHandler<HTMLDivElement> = (event) => {
          const { id } = event.currentTarget
          setListItems((prevItems) => ({ ...prevItems, [id]: !prevItems[id] }));
     }

     return (
          <div className={`w-[100%] transition duration-[.5s] overflow-y-scroll top-0 fixed min-nav1:hidden  z-[990000000000] ${isSidebar && "ml-[1000px]"} h-[100vh] bg-[#1b1b22]`}>
               <div className="p-5 flex flex-col">
                    <div className="flex items-center">
                         <FontAwesomeIcon onClick={() => { setSidebar(!isSidebar) }} className="text-white text-[30px] " icon={faClose}></FontAwesomeIcon>
                         <h1 className="mr-auto ml-auto text-3xl font-semibold">Nastachat</h1>
                    </div>
                    {
                         !isLoggedIn ? <div className="flex gap-4 [&>*]:border-[#37334e69] mt-9 justify-center [&>*]:border [&>*]:rounded-[8px] [&>*]:bg-gradient-to-tl from-[#1a1f308f] from-50% to-[#290a7436] from-70% to-[#1fd7f836] font-mono">
                              <a href="/login">
                                   <button className="pl-8 pr-8 pt-3 pb-3 transition duration-200 rounded-[8px] hover:bg-[#100f2ece]" ><span className="relative top-[2px]">Log In</span></button>
                              </a>
                              <a href="/register">
                                   <button className="pl-8 pr-8 pt-3 pb-3 transition duration-200 rounded-[8px] hover:bg-[#100f2ece]"><span className="relative top-[2px]">Sign Up</span></button>
                              </a>
                         </div> : <div>
                              <h1>{user.fullname}</h1>
                         </div>
                    }
                    <div className="flex flex-col mt-12 gap-12">

                         <SidebarItem ListItems={ListItems}
                              title="Overview"
                              name="home"
                              id="home"
                              items={[
                                   { name: "Blog", href: "/blog" },
                                   { name: "Help Center", href: "/help_center" },
                                   { name: "Partnerships", href: "" },
                                   { name: "Developers", href: "/developers" },
                                   { name: "Safely & Securely", href: "/safety" }

                              ]}
                              HandleList={HandleList}
                         />
                         <SidebarItem
                              ListItems={ListItems}
                              title="Our Company"
                              name="ourcompany"
                              id="ourcompany"
                              items={[
                                   { name: "Blog", href: "/blog" },
                                   { name: "Help Center", href: "/help_center" },
                                   { name: "Partnerships", href: "" },
                                   { name: "Developers", href: "/developers" },
                                   { name: "Safely & Securely", href: "/safety" }

                              ]}
                              HandleList={HandleList}
                         />
                         <SidebarItem
                              ListItems={ListItems}
                              title="Features"
                              name="features"
                              id="features"
                              items={[
                                   { name: "Ai chat", href: "/ai_chat" },
                                   { name: "Online Games", href: "/games" },
                                   { name: "Developers Place", href: "/code" },
                              ]}
                              HandleList={HandleList}
                         />
                         <SidebarItem
                              ListItems={ListItems}
                              title="Resources"
                              name="resources"
                              id="resources"
                              items={[
                                   { name: "Blog", href: "/blog" },
                                   { name: "Help Center", href: "/help_center" },
                                   { name: "Partnerships", href: "" },
                                   { name: "Developers", href: "/developers" },
                                   { name: "Safely & Securely", href: "/safety" }

                              ]}
                              HandleList={HandleList}
                         />
                         <SidebarItem
                              ListItems={ListItems}
                              title="Account"
                              name="account"
                              id="account"
                              items={[{ name: "Profile", href: "/profile" },
                              { name: "My account", href: "/account" },
                              { name: "Privacy", href: "/privacy" },
                              ]}
                              HandleList={HandleList}
                         ></SidebarItem>
                    </div>


               </div>
          </div>
     )
}

export default Sidebar