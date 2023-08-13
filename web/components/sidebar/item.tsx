import React from 'react'
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
interface ListItemsVisible {
     [key: string]: boolean;
}

interface SidebarItem {
     items: { name: string, href: string }[];
     ListItems: ListItemsVisible;
     title: string;
     id: string;
     HandleList: React.MouseEventHandler<HTMLDivElement>;
     name: string;
}

const SidebarItem: React.FC<SidebarItem> = ({ title, name, items, ListItems, id, HandleList }) => {
     return (
          <div className="pl-2 pr-2 ml-6 mr-6 pb-2 border-b border-[#8080803f]">
               <div className="flex justify-between items-center cursor-pointer select-none" id={id} onClick={HandleList}>
                    <h1 className="text-[28px] font-bold">{title}</h1>
                    <FontAwesomeIcon className="text-[20px]" icon={faChevronDown} />
               </div>

               <ul className={`${!ListItems[name] && "hidden"} flex flex-col gap-2 mb-2 mt-3 [&>*]:text-xl text-gray-500`}>
                    {
                         items.map((item, index) => {
                              return <li key={index}><a href={item.href} className="hover:text-gray-300 inline-block">{item.name}</a></li>
                         })
                    }

               </ul>
          </div>
     )
}

export default SidebarItem