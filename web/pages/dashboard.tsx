import React, { useEffect, useState, Suspense } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Auth from '../components/auth';
import { Client } from "../Client";
import { UserType, UserData, PostInfo, CommentInfo } from "../Client/datatypes";
import { Constants } from "../Client/contants";
import FriendList from '../components/auth-components/friendList';
import DashboardNavbarPost from '../components/auth-components/DashboardNavbarPost';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt, faShare, faHeart } from "@fortawesome/free-solid-svg-icons";
import { PostLoading0, PostLoading1, PostLoading2 } from "../components/loading-components/post";
import Comment from "../components/post-components/CommentsContainer";
const token = localStorage.getItem("token");
const client = new Client({ type: UserType.Member, token: token as string  });


if (token) {
     client.setToken(token);
} else {
     console.log("Invalid Token");
}
function formatDate(date: string): string {
     const today = new Date();
     const yesterday = new Date(today);
     yesterday.setDate(yesterday.getDate() - 1);
     const parsedDate = new Date(date);
     if (!isValidDate(parsedDate)) {
          return 'Invalid Date';
     }
     if (isSameDay(parsedDate, today)) {
          const options: Intl.DateTimeFormatOptions = {
               hour: 'numeric',
               minute: 'numeric',
          };
          return `Today at ${parsedDate.toLocaleTimeString(undefined, options)}`;
     } else if (isSameDay(parsedDate, yesterday)) {
          const options: Intl.DateTimeFormatOptions = {
               hour: 'numeric',
               minute: 'numeric',
          };
          return `Yesterday at ${parsedDate.toLocaleTimeString(undefined, options)}`;
     } else {
          const options: Intl.DateTimeFormatOptions = {
               month: '2-digit',
               day: '2-digit',
               year: 'numeric',
               hour: 'numeric',
               minute: 'numeric',
          };
          return parsedDate.toLocaleDateString(undefined, options);
     }
}

function isSameDay(date1: Date, date2: Date): boolean {
     return date1.toDateString() === date2.toDateString();
}

function isValidDate(date: any): boolean {
     return date instanceof Date && !isNaN(date.getTime());
}

const initUser: UserData = {
     username: "",
     email: "",
     fullname: "",
     profile: { avatar: "", bio: "", friends: [{ username: "", fullname: "", avatar: "", accepted: false, id: "", requested: false }], notifications: [{ name: "", by: "", description: "" }] },
     verified: false,
     type: UserType.Member,
     id: ""
}

const Dashboard: React.FC = () => {
     const [user, setUser] = useState<UserData>(initUser)
     const [posts, setPosts] = useState<PostInfo[]>([])
     const [isSharePopup, setIsSharePopup] = useState<boolean>(false);
     const [currentWidth, setCurrentWidth] = useState<number>(window.innerWidth);
     const [isLoading, setIsLoading] = useState<boolean>(true)
     const [openCommentPostId, setOpenCommentPostId] = useState<string | null>(null);
    
     // const [isComments, setIsComments] = useState<boolean>(false)



     useEffect(() => {
          const fetchData = async () => {
               const user_client = await client.user.fetchUser(token as string)
               setUser(user_client)
          }
          fetchData()
          const fetchUser = async () => {
               const response = await fetch(`${Constants.API_BASE}/user/@me`, {
                    method: "GET",
                    headers: {
                         "Content-Type": "application/json",
                         authorization: "Bearer " + token
                    }
               })
               const data = await response.json()
               if (!response.ok) {
                    console.log(data)
               }
          }
          fetchUser()
          const fetchPosts = async () => {

               const response = await fetch(`${Constants.API_BASE}/posts`, {
                    method: "GET",
                    headers: {
                         "Content-Type": "application/json",
                         authorization: `Bearer ${token}`
                    }
               })
               const posts = await response.json()
               setIsLoading(false)
               setPosts([...posts.posts])
          }
          fetchPosts()
     }, [])

     const LikePost = async (post: PostInfo) => {
          const isLiked = post.likes.find((like) => like === user.id);

          if (!isLiked) {
               setPosts((prevPosts) => {
                    const updatedPosts = prevPosts.map((prevPost) => {
                         if (prevPost.id === post.id) {
                              return { ...prevPost, likes: [...post.likes, user.id] };
                         }
                         return prevPost;
                    });
                    return updatedPosts;
               });
               const response = await fetch(`${Constants.API_BASE}/posts/${post.id}/likes`, {
                    method: "PUT",
                    headers: {
                         "Content-Type": "application/json",
                         authorization: "Bearer " + token,
                    },
               });
          } else {
               setPosts((prevPosts) => {
                    const updatedPosts = prevPosts.map((prevPost) => {
                         if (prevPost.id === post.id) {
                              const updatedLikes = prevPost.likes.filter((like) => like !== user.id);
                              return { ...prevPost, likes: updatedLikes };
                         }
                         return prevPost;
                    });
                    return updatedPosts;
               });
               const response = await fetch(`${Constants.API_BASE}/posts/${post.id}/likes`, {
                    method: "DELETE",
                    headers: {
                         "Content-Type": "application/json",
                         authorization: "Bearer " + token,
                    },
               });
          }
     };
     if (token) {
          client.setToken(token)
     } else {
          console.log("Invalid Token")
     }

     const textFormat = (value: string) => {
          if (value.length > 11) {
               return value.split(" ")[0] + " " + value.split(" ")[1].slice(0, 3) + "..."
          } else return value
     }

     window.addEventListener<"resize">("resize", (e: UIEvent): void => {
          if (e.currentTarget) {
               setCurrentWidth(e.currentTarget.innerWidth)
          }
     })
     return (
          <div>
               <Navbar ></Navbar>
               <main className="mt-20 flex w-[100%]" id="dashboard">
                    <FriendList />
                    <div className="w-[100%] flex flex-col">
                         <DashboardNavbarPost client={client} user={user} posts={posts} setPosts={setPosts} />
                         <div className="pb-3">
                              {isLoading ? <><PostLoading2 /><PostLoading1 /><PostLoading0 /></> : !posts[0] ? <h1 className="font-bold text-4xl text-center mt-5">No Post...</h1> :
                                   <div className="flex flex-col">

                                        {[...posts].reverse().map((post, index) => {
                                             const iLiked = post.likes.find(like => like == user.id)
                                             var isCommentVisible: boolean = false;
                                             var comments: CommentInfo[] = []

                                             return (
                                                  <Suspense key={index} fallback={<PostLoading1 />}>
                                                       <div className="p-3 flex flex-col gap-1 mb-0 m-3 bg-[#202025] rounded-xl">
                                                            <div >
                                                                 <div className="flex -z-[0] items-end gap-1 relative left-1">
                                                                      <div className='h-[14px] w-[14px] border-l-[2px] border-t-[2px] border-gray-500 rounded-tl-[4px]'></div>
                                                                      <div className={`flex ${post.owner.avatar && "relative top-[2px]"}`}>{
                                                                           post.owner.avatar && <img src={post.owner.avatar} className={`w-[30px] h-[30px] rounded-full mr-1.5`}></img>
                                                                      } <h3 className="flex items-center flex-wrap gap-[5px]"><span className="text-white cursor-pointer">{currentWidth > 400 ? post.owner.fullname : textFormat(post.owner.fullname)}</span> • <span className="text-[15px]">{formatDate(post.createdAt)}</span></h3>
                                                                      </div>
                                                                 </div>
                                                                 <h1 className="font-bold text-[27px]">{post.title}</h1>
                                                                 {
                                                                      post.img && <div className="flex justify-center mt-2 mb-2">
                                                                           <img src={post.img} className="max-w-[80%] border border-[#80808031] rounded-lg" onDragStart={(e) => e.preventDefault()} />
                                                                      </div>
                                                                 }
                                                                 <p className="text-[19px] whitespace-pre-line">{post.description}</p>
                                                            </div>
                                                            <hr className="bg-[#555555] mt-2 h-[1px] border-0" />
                                                            <div className="flex justify-between ml-1 mr-1 mt-2">
                                                                 <div className="flex flex-col items-center">
                                                                      <FontAwesomeIcon className="text-[25px] cursor-pointer" onClick={async () => {
                                                                           isCommentVisible = !isCommentVisible
                                                                           const commentsElemet = document.getElementById('comments-' + post.id)
                                                                           if (commentsElemet) {
                                                                                commentsElemet.style.display = isCommentVisible ? 'block' : 'none'
                                                                           }
                                                                           if (openCommentPostId === post.id) {
                                                                                setOpenCommentPostId(null);
                                                                           } else {
                                                                                setOpenCommentPostId(post.id);
                                                                           }
                                                                           if (!post.comments[0]) {
                                                                                const response = await fetch(`${Constants.API_BASE}/posts/${post.id}/comments/all`, {
                                                                                     method: 'GET',
                                                                                     headers: {
                                                                                          authorization: "Bearer " + token,
                                                                                          "Content-Type": "application/json"
                                                                                     }
                                                                                })
                                                                                const data = await response.json()
                                                                                if (response.ok) {
                                                                                     comments = data.comments
                                                                                     setPosts((prevPost) => {
                                                                                          const updatedPosts = prevPost.map((_post) => {
                                                                                               if (_post.id === post.id) {
                                                                                                    return { ..._post, comments: data.comments };
                                                                                               }
                                                                                               return _post;
                                                                                          });
                                                                                          return updatedPosts;
                                                                                     });
                                                                                }
                                                                           }
                                                                           
                                                                         
                                                                      }} icon={faCommentAlt} />
                                                                      <span className="select-none">{post.comments?.length}</span>
                                                                 </div>
                                                                 <div className="flex flex-col select-none items-center">
                                                                      <FontAwesomeIcon className={`text-[25px] ${iLiked && "text-red-500"} cursor-pointer`} onClick={() => {
                                                                           return LikePost(post)

                                                                      }} icon={faHeart} />
                                                                      <span>{post.likes.length}</span>
                                                                 </div>
                                                                 <div className="flex flex-col gap-1">
                                                                      <FontAwesomeIcon onClick={() => { setIsSharePopup(!isSharePopup) }} className="text-[25px] select-none cursor-pointer" icon={faShare} />
                                                                      <div onClick={(e) => {
                                                                           window.navigator.clipboard.writeText(`${window.location.origin}/posts/${post.id}`)
                                                                           setIsSharePopup(false)
                                                                      }} className={`translate-y-[30px] hidden [&>h1:hover]:text-gray-100 rounded-md hover:bg-[#0e0e0e] cursor-pointer transition duration-150 bg-black p-2 -translate-x-16 w-[100px] select-none absolute ${!isSharePopup && "hidden"}`}>
                                                                           <h1 className="text-center text-white">Copy Link</h1>
                                                                      </div>
                                                                 </div>

                                                            </div>
                                                            <div className="hidden" id={`comments-${post.id}`}>
                                                                 {openCommentPostId === post.id && (
                                                                      <Comment comments={post.comments as any} setPosts={setPosts}  id={post.id} user={user} token={token as string}/>
                                                                 )}
                                                            </div>

                                                       </div>

                                                  </Suspense>

                                             )
                                        })}
                                   </div>
                              }
                         </div>
                         <p></p>
                    </div>
               </main>

               <Footer></Footer>
          </div>
     )
}

export default Auth("login", Dashboard)