import { NotificationsInfo, UserData } from '../Client/datatypes';
import React, { useEffect, useState } from 'react'
import NotificationsCard from './notificationsList';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox, faBell } from "@fortawesome/free-solid-svg-icons";
import InboxList from './inbox-components/InboxList';

interface ComponentsPops {
     user: UserData,
     setNotifications: React.Dispatch<React.SetStateAction<NotificationsInfo[]>>,
     notifications: NotificationsInfo[]
}


const AuthNavItems: React.FC<ComponentsPops> = ({ user, setNotifications, notifications }) => {
     const [isNotificationShown, setIsNotificationShown] = useState<boolean>(false)
     const [isInboxList, setIsInboxList] = useState<boolean>(false);

     useEffect(() => {
          const root = document.getElementById("root") as HTMLElement
          const clickHandler = (e: any) => {
               if (e.target.id == "popup-card" || e.target.id == "popup-card") {
                    return
               } else {
                    setIsNotificationShown(false)
               }
          }
          root.addEventListener("click", clickHandler)

          return () => {
               root.removeEventListener("click", clickHandler)
          }
     }, [isNotificationShown, isInboxList])
     return (
          <ul className="flex ml-6 relative top-[3px] items-center gap-5 nav1:hidden text-[17px] [&>*]:transition duration-[500ms] [&>*]:delay-[20ms] [&>*]:select-none">
               <div><div className='cursor-pointer' onClick={() => {
                    if (isNotificationShown) {
                         setIsNotificationShown(false)
                    }
                    setIsInboxList(!isInboxList)
               }}>
                    <FontAwesomeIcon className="text-[25px]" icon={faInbox} />
                    <div className='bg-red-500 relative -top-3 -left-2.5 h-[20px] w-[20px] inline-flex rounded-full items-center flex pl-[6px] pr-[6px]'>
                         <span className='text-[14px]'>0</span>
                    </div>
               </div>
                    <div id="popup-card" className='absolute w-[300px] mt-2' style={isInboxList ? { display: "block" } : { display: "none" }} >
                         <InboxList conversations={[]} />

                    </div>
               </div>


               <div>
                    <div className='cursor-pointer' onClick={() => {
                         if (isInboxList) {
                              setIsInboxList(false)
                         }
                         setIsNotificationShown(!isNotificationShown)
                    }}>
                         <FontAwesomeIcon className="text-[25px] " icon={faBell} />
                         <div className='bg-red-500 relative text-[12px] -top-3 -left-2.5 h-[20px] w-[20px] inline-flex rounded-full justify-center items-center flex pl-[6px] pr-[6px]'>
                              {notifications.length > 9 ? "+9" : notifications.length}
                         </div>
                    </div>
                    <div className='absolute w-[300px] mt-2' id="popup-card" style={isNotificationShown ? { display: "block" } : { display: "none" }} >
                         {
                              notifications[0] && <NotificationsCard notifications={notifications} />
                         }

                    </div>
               </div>

          </ul>
     )
}

export default AuthNavItems