import React, { useEffect, useState } from 'react'
import { Client } from "../../Client"
import { FriendInfo, UserData, UserType } from '../../Client/datatypes'
import { Constants } from '../../Client/contants'

const _client = new Client({ type: UserType.Member })
const token = localStorage.getItem("token")
_client.setToken(token as string)

const initUser: UserData = {
  username: "",
  email: "",
  fullname: "",
  profile: { avatar: "", bio: "", friends: [{ username: "", fullname: "", avatar: "", accepted: false, id: "", requested: false }], notifications: [{ name: "", by: "", description: "" }] },
  verified: false,
  type: 1,
  id: ""
}

const initFriend: FriendInfo = {
  fullname: "",
  username: "",
  avatar: "",
  accepted: false,
  id: "",
  requested: false
}

const FriendList: React.FC = () => {
  const [user, setUser] = useState<UserData>(initUser)
  useEffect(() => {
    const fetchUser = async () => {
      const data = await _client.user.fetchUser(token as string)
      setUser(data)
    }
    fetchUser()
    const fetchFriends = async () => {
      const response = await fetch(`${Constants.API_BASE}/friends`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        setFriends(data.friends)
      }
    }
    fetchFriends()
  }, [])
  const [startX, setStartX] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const [isSwiped, setIsSwiped] = useState(false);
  const [friends, setFriends] = useState<FriendInfo[]>([initFriend])
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isSwiped) {
      const currentX = e.touches[0].clientX;
      const newDeltaX = currentX - startX;
      if (newDeltaX > 400) {
        setDeltaX(400); // Limit maximum swipe distance to 400
      } else if (newDeltaX < 100) {
        setDeltaX(100); // Set minimum swipe distance to 100
      } else {
        setDeltaX(newDeltaX);
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isSwiped) {
      if (deltaX > 100) {
        setIsSwiped(true);
        setDeltaX(400)
      } else {
        setDeltaX(0);
      }
    } else {
      setDeltaX(0);
      setIsSwiped(false);
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ transform: `translateX(${deltaX}px)` }}
      className='transition-transform duration-300 ease-in-out'
    >
      <div className='bg-black transform relative  sticky top-[80px]'>
        <div
          className={`z-[1000] mobile:-ml-[400px] min-w-[350px] transition-transform duration-300 ease-in-out  h-[100vh] bg-[#1d1c22] inline-block border-r border-[#383838]`}>
          <div className='flex flex-col gap-[1rem] pt-2 mr-3 mt-3'>
            {!friends[0]?.username ? <div><p className='text-center mt-8 text-xl'>No Friend</p></div> :
              friends.map((friend, index) => {
                const isRequested = user.profile.friends.find(fr => friend.id === fr.id)
                return (
                  <div key={index} className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                      {
                        friend.avatar ? <img src={friend.avatar} className={`w-[45px]  rounded-full ml-2 `}></img> : <img src="./guest.png" className={`w-[45px] bg-slate-300 rounded-full ml-2 `} ></img>
                      }
                      <div>
                        <h1 className='font-bold text-[19px]'>{friend.fullname}</h1>
                        <a href={`/profile/${friend.id}`}>
                          <h1 className='hover:underline cursor-pointer' >{friend.username}</h1>
                        </a>
                        
                      </div>
                    </div>
                    {
                      !isRequested ? <button className=' bg-blue-700 hover:bg-blue-800 hover:text-blue-100 pl-2 pt-1 pb-1 rounded pr-2' onClick={() => {

                        if (!isRequested) {
                          fetch(`${Constants.API_BASE}/friends`, {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                              authorization: `Bearer ${token}`
                            },
                            body: JSON.stringify({ friend: friend })
                          })
                          setUser((prevUser) => ({ ...prevUser, profile: { ...prevUser.profile, friends: [...prevUser.profile.friends, friend] } }))
                        }
                      }}>Add Friend</button> : <button className=' bg-[#8f8c8c44] hover:bg-[#6c6a6a44] hover:text-gray-300  border border-[#383838] pl-2 pt-1 pb-1 rounded pr-2' onClick={() => {

                        if (isRequested) {
                          fetch(`${Constants.API_BASE}/friends/${friend.id}`, {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                              authorization: `Bearer ${token}`
                            },

                          })
                          setUser((prevUser) => ({ ...prevUser, profile: { ...prevUser.profile, friends: prevUser.profile.friends.filter((fr) => fr.id !== friend.id) } }))
                        }
                      }}>Requested</button>
                    }

                  </div>
                )
              })
            }
          </div>

        </div>
      </div>

    </div>

  )
}

export default FriendList