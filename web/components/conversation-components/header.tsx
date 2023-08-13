import React from 'react'
import { ConversationsInfo, UserData } from "../../Client/datatypes"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import guest_profile from "../../public/guest.png"
import loading from "../../public/loading.gif"

interface HeaderComponentProps {
  conversation: ConversationsInfo,
  isLoading: boolean,
  user: UserData,
  setIsInbox: React.Dispatch<React.SetStateAction<boolean>>,
  isInbox: boolean
}
const ConversationHeader: React.FC<HeaderComponentProps> = ({ conversation, isLoading, user, setIsInbox, isInbox }) => {
  return (
    <div className='sticky top-[80px] px-4 w-full h-[60px] flex items-center bg-[#0c0c12] border-b border-white/10'>
      <div className='flex items-center'>
        <div className='flex gap-5 items-center'>
          <div>
            <FontAwesomeIcon icon={isInbox ? faChevronLeft:faChevronRight} onClick={() => (
              setIsInbox(!isInbox)
            )} className='text-xl cursor-pointer transition duration-150' />
          </div>
          <div className='w-px h-6 bg-gray-400'></div>
          <div className='flex items-center'>
           {conversation.members.map((member, index) => {
            if (index == 1) {
              return (
              <div className='relative -left-4 bg-[#0c0c12] p-1 rounded-full -mr-4'>
              {member.avatar ? <img src={member.avatar} className={`w-[40px] h-[40px] bg-slate-300 rounded-full`} ></img> : <img src={guest_profile} className={`w-[40px] h-[40px] bg-slate-300 rounded-full`} ></img>}
              </div>
              )
            }
            return (
              <div>
              {member.avatar ? <img src={member.avatar} className={`w-[40px] h-[40px] bg-slate-300 rounded-full`} ></img> : <img src={guest_profile} className={`w-[40px] h-[40px] bg-slate-300 rounded-full`} ></img>}
                
              </div>
            )
           })}
          </div>
          <div>
            <h2 className='text-[22px] font-bold'>{conversation.members[0].id == user.id ? conversation.members[1]?.fullname : conversation.members[0].fullname}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConversationHeader