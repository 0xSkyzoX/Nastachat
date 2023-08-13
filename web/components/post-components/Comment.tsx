import React, { useEffect, useState } from 'react'
import { CommentInfo, PostInfo, ProfileInfo } from '../../Client/datatypes';
import guest_profile from "../../public/guest.png";
import {Constants} from "../../Client/contants";
import { UserData } from '../../Client/datatypes'; 

interface ComponentProps {
  comment: CommentInfo,
  id: string,
  setPosts: React.Dispatch<React.SetStateAction<PostInfo[]>>,
  user: UserData
}

const CommentElement: React.FC<ComponentProps> = ({comment, id, setPosts, user}) => {
  const [profile, setProfile] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`${Constants.API_BASE}/avatar/${comment.by.id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      const data = await response.json();
      if (response.ok) {
        setProfile(data)
        setPosts((prevPost) => {
          const updatedPosts = prevPost.map((_post) => {
            if (_post.id === id) {
              const commentUpdated = _post.comments?.map((_comment) => {
                if (_comment.id === comment.id) {
                  return { ..._comment, by: { ..._comment.by, avatar: data.avatar } };
                }
                return _comment;
              });
        
              return { ..._post, comments: commentUpdated };
            }
            return _post;
          });
        
          return updatedPosts;
        });
        
        setIsLoading(false)
      }
    }
    fetchUser()
  }, [profile?.avatar])
  console.log(comment)
  return (
    <div className='flex gap-1.5 items-center z-10 hover:bg-[#19191d] cursor-pointer px-2 py-1 rounded-md transition duration-150 '>
      <div>
      {user?.id === comment.by?.id ? user.profile.avatar ? <img src={user.profile.avatar} className={`max-w-[35px] rounded-full`} ></img> : <img src={guest_profile} className={`max-w-[35px] bg-slate-300 rounded-full`} ></img> : comment.by.avatar ? <img src={comment.by.avatar} className={`max-w-[35px] rounded-full`} ></img>  : isLoading ? <div className='bg-black/40 rounded-full w-[35px] h-[35px] flex items-center justify-center'><img src='./loading.gif' className='w-[20px] select-none' onDragStart={(e) => e.preventDefault()}></img></div>  :  profile?.avatar ? <img src={profile.avatar} className={`max-w-[35px] rounded-full`} ></img> : <img src={guest_profile} className={`max-w-[35px] bg-slate-300 rounded-full`} ></img>}

      </div>
            <div>
              <h2 className='hover:underline font-bold'>{comment.by.username}</h2>
              <p className='text-[14px] opacity-90 z-10'>{comment.content}</p>
            </div>
    </div>
  )
}

export default CommentElement