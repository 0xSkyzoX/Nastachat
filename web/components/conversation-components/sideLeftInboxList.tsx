import React, { useState, useEffect } from 'react'
import { InboxList } from "../../Client/datatypes";
import { Constants } from "../../Client/contants";
import guest_profile from "../../public/guest.png"

const initInbox: InboxList = {
  username: "",
  fullname: "",
  avatar: "",
  id: "",
  bio: "",
  conversation_id: ""
}

interface InboxListComponentProps {
  currentConversationId: string
}

const SideInboxList: React.FC<InboxListComponentProps> = ({ currentConversationId }) => {
  const [inboxList, setInboxList] = useState<InboxList[]>([initInbox])
  useEffect(() => {
    const fetchInboxList = async () => {
      const response = await fetch(`${Constants.API_BASE}/conversations/inbox/list`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`
        },
        method: "GET"
      })
      const data = await response.json()
      if (response.ok) {
        setInboxList(data.inbox)
      }
    }
    fetchInboxList()
  }, [])
  return (
    <div className="w-[300px] h-[100vh] sticky top-[80px] bg-[#1b1b1f] border-r border-[#292929]">
      {
        inboxList.map((item, index) => {
          if (item.conversation_id == currentConversationId) {
            return (<a key={index} href={`/conversation/${item?.conversation_id ? item.conversation_id : ""}`}><div className='flex cursor-pointer hover:bg-[#111216] bg-gradient-to-tr from-[#2c4ba9] to-[#3e71a5]  border border-white/50  items-center gap-2.5 py-[3px] pl-[2px]'>
              <div onDragStart={(e) => { e.preventDefault() }}>
                {
                  item.avatar ? <img src={item.avatar} className={`w-[45px] border border-[#333333] rounded-full ml-2 `}></img> : <img src={guest_profile} className={`w-[45px] bg-slate-300 rounded-full ml-2 `} ></img>
                }
              </div>
              <div>
                <h1 className='font-bold text-[20px]'>{item.fullname}</h1>
                <h1 className='text-[15px] opacity-90'>Online</h1>
              </div>
            </div>
            </a>)
          }
          return (<a key={index} href={`/conversation/${item?.conversation_id ? item.conversation_id : ""}`}><div className='flex cursor-pointer hover:bg-[#111216] items-center gap-2.5 py-[3px] pl-[2px]'>
            <div onDragStart={(e) => { e.preventDefault() }}>
              {
                item.avatar ? <img src={item.avatar} className={`w-[45px] border border-[#333333] rounded-full ml-2 `}></img> : <img src={guest_profile} className={`w-[45px] bg-slate-300 rounded-full ml-2 `} ></img>
              }
            </div>
            <div>
              <h1 className='font-bold text-[20px]'>{item.fullname}</h1>
              <h1 className='text-[15px] opacity-90'>Online</h1>
            </div>
          </div>
          </a>)
        })
      }
    </div>
  )
}

export default SideInboxList