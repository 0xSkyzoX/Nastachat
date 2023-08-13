import React from 'react'
const Logout: React.FC = () => {
  return (
    <div className='fixed flex flex-col justify-between top-[50%] rounded-lg border border-[#8080804d] bottom-[50%] translate-y-[-50%] z-[9999999999999999999999] text-center bg-[#07070a] w-[400px] h-[140px] p-2 items-center'>
      <h1 className='text-[28px] font-bold'>Are you sure wanna logout?</h1>
      <div className='flex gap-2'>
         <button className='mb-3 text-[18px] hover:bg-red-800 bg-[#fc3535c9] p-1.5 pl-3 pr-3 rounded-md' onClick={() => {
        localStorage.removeItem("token");
        window.location.reload()
      }}>Logout</button>
      <button className='mb-3 text-[18px] hover:bg-gray-800 bg-[#3b3b3bc9] p-1.5 pl-3 pr-3 rounded-md' id='close-logout'>Close</button>
      </div>
     
    </div>
  )
}
export default Logout