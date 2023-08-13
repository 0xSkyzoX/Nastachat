import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface SidebarItemProps {
  name: string;
  icon: IconDefinition;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export const AccountSidebarItem: React.FC<SidebarItemProps> = ({ name, icon, href, onClick }) => {
  return (
    <a href={href} className=''>
      <div onClick={onClick} className='flex cursor-pointer select-none items-center ml-4 mr-4 rounded-md p-2.5 pl-4 gap-3 transition delay-[10ms] hover:bg-[#3537416b]'>
        <FontAwesomeIcon className='relative w-[20px]' icon={icon} />
        <p className='text-[17px] relative text-[#ececece5]'>{name}</p>
      </div>
    </a>
  )
}
