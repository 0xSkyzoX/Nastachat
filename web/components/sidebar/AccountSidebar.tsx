import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faHome, faBuilding, faStar, faNewspaper, faGear, faUser, faTableColumns, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { AccountSidebarItem } from './AccountSidebarItem';

interface ComponentProps {
  isPops: boolean;
  setIsPops: React.Dispatch<React.SetStateAction<boolean>>
}

export const AccountSidebar: React.FC<ComponentProps> = ({ isPops, setIsPops }) => {
  const [isLogoutPops, setIsLogoutPops] = useState<boolean>(false)
  useEffect(() => {
    const logout = document.getElementById("logout")
    const close = document.getElementById("close-logout")
    if (close) {
      close.addEventListener("click", (e) => {
        setIsLogoutPops(false)
      })
    }
    if (logout) {
      logout.style.display = isLogoutPops ? "flex" : "none"
    }
  }, [isLogoutPops])
  return (
    <div className={isPops ? `fixed z-[2] ml-[0px] bg-[#090a11] w-[340px] h-[100%]  top-0 bottom-0 transition duration-500 animate-[sidebarPop_.2s_ease-in] border-r border-[#80808060] rounded-tr-2xl rounded-br-2xl` : ` fixed z-[9999999999] bg-[#0a0b16] -ml-[400px] w-[400px] h-[100%] transition duration-500`}>
      <div className='flex justify-between m-2 items-center'>
        <h1 className='font-black text-[30px] ml-2 select-none'>Nastachat</h1>
        <FontAwesomeIcon icon={faClose} onClick={() => { setIsPops(false) }} className='text-[15px] mr-1 cursor-pointer transition duration-300 delay-50 hover:bg-[#353535d2] p-3 pl-3 pr-3 rounded-lg' />
      </div>
      <hr className='border-0 h-[1px] bg-slate-500 opacity-50' />
      <div className='mt-5 flex flex-col gap-[8px]'>
        <AccountSidebarItem name='Home' icon={faHome} href='/' />
        <AccountSidebarItem name='Our Company' icon={faBuilding} href='/our-company' />
        <AccountSidebarItem name='Features' icon={faStar} href='features/' />
        <AccountSidebarItem name='Resources' icon={faNewspaper} href='/resources' />
      </div>
      <hr className='border-0 h-[1px] mt-5 ml-5 mr-5 bg-[#80808034]'></hr>
      <div className='mt-5 flex flex-col gap-[8px]'>
        <AccountSidebarItem name='Dashboard' icon={faTableColumns} href='/dashboard' />
        <AccountSidebarItem name='My Account' icon={faUser} href='/account' />
        <AccountSidebarItem name='Settings' icon={faGear} href='/settings' />
        <AccountSidebarItem name='Logout' icon={faSignOut} onClick={() => {
          setIsLogoutPops(!isLogoutPops)
        }} />
      </div>
    </div>
  )
}