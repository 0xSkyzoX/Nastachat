import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt, faShare, faHeart } from "@fortawesome/free-solid-svg-icons";

export const PostLoading0 = () => {
    return (
        <div className="p-3 flex flex-col gap-1 mb-0 m-3 bg-[#202025] rounded-xl">
            <div >
                <div className="flex -z-[0] items-end gap-1 relative left-1">
                    <div className='h-[14px] w-[14px] border-l-[2px] border-t-[2px] border-gray-500 rounded-tl-[4px]'></div>
                    <div className={`flex relative top-[1px] `}> <h3 className="flex items-center gap-[5px]"><div className=' w-7  h-7 bg-[#535353] rounded-full'></div><span className="text-white cursor-pointer w-32 bg-[#535353] h-5 rounded-md"></span></h3>
                    </div>
                </div>
                <h1 className="font-bold text-[27px] h-7 mt-3 bg-[#535353] rounded-md"></h1>
                <p className="text-[19px] h-7 w-[50%] mt-3 bg-[#535353] rounded-md"></p>
                <p className="text-[19px] h-7 w-[40%] mt-3 bg-[#535353] rounded-md"></p>
                <p className="text-[19px] h-7 w-[20%] mt-3 bg-[#535353] rounded-md"></p>
            </div>
            <hr className="bg-[#555555] mt-2 h-[1px] border-0" />
            <div className="flex justify-between ml-1 mr-1 mt-2">
                <div className="flex flex-col items-center">
                    <FontAwesomeIcon className="text-[25px] " icon={faCommentAlt} />
                    <span>0</span>
                </div>
                <div className="flex flex-col select-none items-center">
                    <FontAwesomeIcon className={`text-[25px] cursor-pointer`} icon={faHeart} />
                    <span>0</span>
                </div>
                <div className="flex flex-col gap-1">
                    <FontAwesomeIcon className="text-[25px] select-none cursor-pointer" icon={faShare} />
                </div>

            </div>
        </div>
    )
}

export const PostLoading1 = () => {
    return (
        <div className="p-3 flex flex-col gap-1 mb-0 m-3 bg-[#202025] rounded-xl">
            <div >
                <div className="flex -z-[0] items-end gap-1 relative left-1">
                    <div className='h-[14px] w-[14px] border-l-[2px] border-t-[2px] border-gray-500 rounded-tl-[4px]'></div>
                    <div className={`flex relative top-[1px] `}> <h3 className="flex items-center gap-[5px]"><div className=' w-7  h-7 bg-[#535353] rounded-full'></div><span className="text-white cursor-pointer w-32 bg-[#535353] h-5 rounded-md"></span></h3>
                    </div>
                </div>
                <h1 className="font-bold text-[27px] h-7 mt-3 bg-[#535353] rounded-md"></h1>
                <div className="flex justify-center mt-2 mb-2">
                    <div className='bg-[#4d4d4d] w-[500px] h-[300px] rounded-md'>

                    </div>
                </div>
                <p className="text-[19px] h-7 w-[50%] mt-3 bg-[#535353] rounded-md"></p>
            </div>
            <hr className="bg-[#555555] mt-2 h-[1px] border-0" />
            <div className="flex justify-between ml-1 mr-1 mt-2">
                <div className="flex flex-col items-center">
                    <FontAwesomeIcon className="text-[25px] " icon={faCommentAlt} />
                    <span>0</span>
                </div>
                <div className="flex flex-col select-none items-center">
                    <FontAwesomeIcon className={`text-[25px] cursor-pointer`} icon={faHeart} />
                    <span>0</span>
                </div>
                <div className="flex flex-col gap-1">
                    <FontAwesomeIcon className="text-[25px] select-none cursor-pointer" icon={faShare} />
                </div>

            </div>
        </div>
    )
}

export const PostLoading2 = () => {
    return (
        <div className="p-3 flex flex-col gap-1 mb-0 m-3 bg-[#202025] rounded-xl">
            <div >
                <div className="flex -z-[0] items-end gap-1 relative left-1">
                    <div className='h-[14px] w-[14px] border-l-[2px] border-t-[2px] border-gray-500 rounded-tl-[4px]'></div>
                    <div className={`flex relative top-[1px] `}> <h3 className="flex items-center gap-[5px]"><div className=' w-7  h-7 bg-[#535353] rounded-full'></div><span className="text-white cursor-pointer w-32 bg-[#535353] h-5 rounded-md"></span></h3>
                    </div>
                </div>
                <h1 className="font-bold text-[27px] h-7 mt-3 bg-[#535353] rounded-md"></h1>
                <p className="text-[19px] h-7 w-[50%] mt-3 bg-[#535353] rounded-md"></p>
                <p className="text-[19px] h-7 w-[20%] mt-3 bg-[#535353] rounded-md"></p>
            </div>
            <hr className="bg-[#555555] mt-2 h-[1px] border-0" />
            <div className="flex justify-between ml-1 mr-1 mt-2">
                <div className="flex flex-col items-center">
                    <FontAwesomeIcon className="text-[25px] " icon={faCommentAlt} />
                    <span>0</span>
                </div>
                <div className="flex flex-col select-none items-center">
                    <FontAwesomeIcon className={`text-[25px] cursor-pointer`} icon={faHeart} />
                    <span>0</span>
                </div>
                <div className="flex flex-col gap-1">
                    <FontAwesomeIcon className="text-[25px] select-none cursor-pointer" icon={faShare} />
                </div>

            </div>
        </div>
    )
}