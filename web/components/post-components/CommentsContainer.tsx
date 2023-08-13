import React, { useState } from 'react';
import { CommentInfo, PostInfo, UserData } from '../../Client/datatypes';
import { Constants } from '../../Client/contants';
import CommentElement from "./Comment"
import {CommentLoading, CommentLoading1, CommentLoading2, CommentLoading3} from '../loading-components/comment';

interface CommentsComponentProps {
  comments: CommentInfo[],
  id: string,
  user: UserData,
  token: string,
  setPosts: React.Dispatch<React.SetStateAction<PostInfo[]>>
}
const generateId = (length: number) => {
  if (length <= 0) {
    throw new Error("Length should be greater than 0");
  }

  const currentTime = Date.now();
  const timestampStr = currentTime.toString();
  const randomIntegerLength = length - timestampStr.length;

  if (randomIntegerLength <= 0) {
    throw new Error("Length should be greater than the length of the timestamp");
  }

  let randomInteger = '';
  for (let i = 0; i < randomIntegerLength; i++) {
    randomInteger += Math.floor(Math.random() * 10);
  }

  const id = `${currentTime}${randomInteger}`;

  return id;
};


const Comment: React.FC<CommentsComponentProps> = ({ comments, id, user, token, setPosts }) => {
  const [content, setContent] = useState<string>("")
 
  const CommentFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setContent("")
    const payload: CommentInfo = {
      content: content,
      by: {
        username: user.username,
        id: user.id
      },
      id: generateId(24) 
    }
    try {
      setPosts((prevPost) => {
        const updatedPosts = prevPost.map((_post) => {
          if (_post.id === id) {
            return { ..._post, comments: [..._post.comments, payload] };
          }
          return _post;
        });
        return updatedPosts;
      });
      const response = await fetch(`${Constants.API_BASE}/posts/${id}/comments`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='mt-2 max-h-[500px] overflow-y-scroll '>
      <div className='sticky top-0 z-[30]'>
        <form onSubmit={CommentFormHandler}>
          <input type="text" placeholder='Create Comment' autoFocus value={content} className="bg-[#23232a]   w-full py-1 rounded-md px-2.5 focus:outline-none border border-white/20 focus:border-white/40" onChange={(e) => setContent(e.target.value)} />
        </form>
      </div>
      <div className='flex flex-col z-20 gap-1 mt-2 overflow-y-hidden'>
        {
          comments[0]?.content ?
        [...comments].reverse().map((comment) => {
            return (
              <CommentElement comment={comment} id={id} setPosts={setPosts} user={user}/>
            )
           })
          : <>
          <CommentLoading /><CommentLoading1 /><CommentLoading2 /><CommentLoading3 /></>
        }
        
     
      </div>
    </div>
  )
}

export default Comment