import React, { useEffect, useState } from 'react'
import { ConversationsInfo, InboxList } from '../../Client/datatypes';
import { Constants } from '../../Client/contants';
import gest_profile from '../../public/guest.png'
interface InboxComponentProps {
  conversations: ConversationsInfo[]
}

const initInbox: InboxList = {
  username: "",
  fullname: "",
  avatar: "",
  id: "",
  bio: "",
  conversation_id: ""
}

const InboxList: React.FC<InboxComponentProps> = ({ conversations }) => {
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
    <div className={`notification-list bg-[#191a20] border min-w-[310px]  max-h-[400px] ${inboxList[1] && "overflow-y-scroll"} border-gray-700 rounded [&>*:first-child]:rounded-t [&>*:last-child]:rounded-b animate-[notifications_.2s_ease-in-out]`}>
      {
        inboxList.map((item, index) => {
          return ( <a key={index} href={`/conversation/${item?.conversation_id ? item.conversation_id : ""}`}><div className='flex cursor-pointer hover:bg-[#111216] items-center gap-2.5 p-1 pl-[2px]'>
          <div onDragStart={(e) => { e.preventDefault() }}>
            {
              item.avatar ? <img src={item.avatar} className={`w-[45px] border border-[#333333] rounded-full ml-2 `}></img> : <img src={gest_profile} className={`w-[45px] bg-slate-300 rounded-full ml-2 `} ></img>
            }
          </div>

          <div>
            <h1 className='font-bold text-[20px]'>{item.fullname}</h1>
            {
              item.bio ? <h1 className='text-[15px] opacity-90'>{item.bio}</h1> : <h1 className='text-[15px] opacity-90'>Nastachat user</h1>
            }

          </div>
        </div>
            </a>)
        })
      }

    </div>
  )
}

export default InboxList