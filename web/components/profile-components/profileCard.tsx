import React from 'react';
import { ProfileInfo } from '../../Client/datatypes';
import guest_profile from "../../public/guest.png";

interface ComponentProps {
     user: ProfileInfo
}

const ProfileCard: React.FC<ComponentProps> = ({ user }) => {
     return (
          <div className='w-[98.8%] m-2 relative rounded-md bg-[#1c1c20] min-h-[400px]'>
               <div className='bg-gray-500 flex flex-col justify-end w-[100%] rounded-t-md h-[120px]'>
                    <div className='ml-3 mr-3 flex items-end'>
                       <div className='bg-[#1c1c20] relative top-[50px] select-none max-w-[110px] flex justify-center p-2 rounded-full justify-center' onDragStart={(e) => e.preventDefault()}>
                         {
                              user.avatar ? <img src={user.avatar} className={`w-[100px] bg-slate-300 rounded-full `}></img> : <img src={guest_profile} className={`w-[100px] bg-slate-300 rounded-full`} ></img>
                         }
                    </div>
                    <div className='top-[80px] ml-1 relative'>
                         <h1 className="font-bold text-[42px]">{user.fullname}</h1>
                         <div className='flex items-start ml-1.5'>
                              <div className='w-[20px] h-[15px] rounded-bl-md border-b-[2px] border-l-[2px] border-t-[grey]'></div>
                              <h1 className="text-[18px] ml-1 hover:underline cursor-pointer select-none">{user.username}</h1>
                         </div>
                    </div>
                    
                    </div>
                    
               </div>
               <div>

               </div>
          </div>
     )
}

export default ProfileCard