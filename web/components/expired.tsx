import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

interface ComponentProps {
     className: string,
     setExpired: React.Dispatch<React.SetStateAction<boolean>>
}

const Expired: React.FC<ComponentProps> = ({ className, setExpired }) => {
     return (
          <div className='flex justify-center' id="expired-message" >
               <div className={`fixed w-[400px] top-[50%] border border-[#8080804d] bottom-[50%] translate-y-[-50%] h-96 shadow-2xl shadow-[black] bg-[#0c0d18] z-[10000] rounded-lg ${className}`}>
                    <div className='p-3'>
                         <div>
                              <FontAwesomeIcon icon={faClose} onClick={() => { setExpired(false); localStorage.removeItem("token") }} className='text-[24px] cursor-pointer' />
                         </div>
                         {/** This the Main div section of this Error form */}
                         <div className='flex flex-col items-center mt-6'>
                              <h1 className='font-bold text-[26px]'>Login Session Expired</h1>
                              <div className='select-none mt-2' >
                                   <img src="./warning.png" onDragStart={(e) => { e.preventDefault() }} className='max-w-[100px] mt-3' ></img>
                              </div>
                              <p className='text-red-600'>Try to login to your account!</p>
                              <div className='mt-7'><a href='/login' onClick={() => { localStorage.removeItem("token") }} className=' bg-blue-600 pl-5 pr-5 pt-2 pb-2 text-[20px] rounded-md' >Login</a></div>
                         </div>
                    </div>
               </div>
          </div>

     )
}

export default Expired