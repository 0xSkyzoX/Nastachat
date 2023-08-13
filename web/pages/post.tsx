import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PostInfo } from '../Client/datatypes';

const InitPost: PostInfo = {
  title: "",
  comments: [{ by: { username: "", id: "" }, content: "", id: "" }],
  description: "",
  id: "",
  owner: { username: "", id: "", avatar: "", fullname: "" },
  img: "",
  likes: [],
  createdAt: ""
}
const Post = () => {
  const [post, setPost] = useState<PostInfo>(InitPost)
  const params = useParams();
  const postid = params.id;

  useEffect(() => {
    const fetchPost = async () => {
      
    }
  }, [])
  return (
    <div>Post</div>
  )
}

export default Post