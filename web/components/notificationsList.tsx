import React from 'react'
import { NotificationsInfo } from '../Client/datatypes'
import "../src/App.css"
import { Constants } from '../Client/contants'
const token: string = localStorage.getItem("token") as string
interface NotificationsProps {
     notifications: NotificationsInfo[]
}

const NotificationsCard: React.FC<NotificationsProps> = ({ notifications }) => {
     console.log(notifications)
     return (
          <div className='notification-list bg-[#191a20] border min-w-[310px]  max-h-[400px] overflow-y-scroll border-gray-700 rounded [&>*:first-child]:rounded-t [&>*:last-child]:rounded-b animate-[notifications_.2s_ease-in-out]'>
               {notifications.map((item, index) =>
                    <div key={index} className='hover:bg-[#111216] items-end justify-between flex pt-1.5 pb-1.5 pl-2 pr-2 cursor-pointer'>
                         <div>
                              {
                                   item.by && <div className='flex items-end gap-1'>
                                        <div className='h-[14px] w-[14px] border-l-[2px] border-t-[2px] border-gray-500 rounded-tl-[4px]'>
                                        </div>
                                        <h1 className='text-[13px] relative opacity-90 -top-[2px]'>{item.by}</h1>
                                   </div>
                              }
                              <h3 className='font-bold text-[19px]'>{item.name}</h3>
                              <p className='text-[16px]'>{item.description}</p>
                         </div>
                         {item.name == "Friend Request" && <div>
                              <button onClick={() => {
                                   fetch(`${Constants.API_BASE}/friends/${item.user_id}/accept`, {
                                        method: "PUT",
                                        "headers": {
                                             "Content-Type": "application/json",
                                             authorization: `Bearer ${token}`
                                        }
                                   })
                              }} className='bg-green-600 text-white p-1.5 transition duration-150 rounded-sm hover:bg-green-700'>Accept</button>
                         </div>}
                    </div>
               )}

          </div>
     )
}

export default NotificationsCard