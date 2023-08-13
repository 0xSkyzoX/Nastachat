import React, { FormEvent, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { PostInfo, UserData } from '../../Client/datatypes'
import { Client } from '../../Client'
import { Constants } from '../../Client/contants'
import classNames from 'classnames'
import ReactDOM from 'react-dom';
import RichPostPanel from './RichPostPanel';
const token = localStorage.getItem("token")

const generateId = (length: number) => {
     if (length <= 0) {
       throw new Error("Length should be greater than 0");
     }
   
     const currentTime = Date.now(); // Current timestamp in milliseconds
     const timestampStr = currentTime.toString();
     const randomIntegerLength = length - timestampStr.length;
   
     if (randomIntegerLength <= 0) {
       throw new Error("Length should be greater than the length of the timestamp");
     }
   
     let randomInteger = '';
     for (let i = 0; i < randomIntegerLength; i++) {
       randomInteger += Math.floor(Math.random() * 10); // Generate a random digit (0 to 9) for the required length
     }
   
     // Combine the current timestamp with the random integer to get the final ID
     const id = `${currentTime}${randomInteger}`;
   
     return id;
   };

interface DashboardNavbarPostsProps {
     posts: PostInfo[],
     setPosts: React.Dispatch<React.SetStateAction<PostInfo[]>>,
     user: UserData,
     client: Client
}

const FormInit: PostInfo = {
     title: "",
     comments: [{ by: { username: "", id: "" }, content: "", id: "" }],
     description: "",
     id: "",
     owner: { username: "", id: "", avatar: "", fullname: "" },
     img: "",
     likes: [],
     createdAt: ""
}

const DashboardNavbarPost: React.FC<DashboardNavbarPostsProps> = ({ posts, setPosts, user, client }) => {
     const [formData, setFormData] = useState<PostInfo>(FormInit)
     const [isPopupVisible, setPopupVisible] = useState<boolean>(false);
     const [isRichPostPopup, setIsRichPostPopup] = useState<boolean>(false)
     let timeout: ReturnType<typeof setTimeout>;
     const currentDate = new Date();

     const handleMouseEnter = () => {
          timeout = setTimeout(() => {
               setPopupVisible(true);
          }, 500);
          setTimeout(() => {
               setPopupVisible(false)
          }, 3000)
     };

     const handleMouseLeave = () => {
          clearTimeout(timeout);
          setPopupVisible(false);
     };

     const popupClasses = classNames(
          "bg-[black] select-none border- p-2 absolute top-full left-1.5 transform translate-y-1 opacity-0 transition-opacity duration-300",
          {
               "opacity-100": isPopupVisible,
          }
     );

     const handlePostSubmit = async (e: FormEvent) => {
          e.preventDefault()
          if (!formData.title || formData.title.length < 4) {
               if (!formData.title && formData.title.length < 4) {
                    alert("Enter a Title")
               }
               if (formData.title.length < 4 && formData.title) {
                    alert("Title must be more than 16 letters")
               }
               return
          }
          const payload: PostInfo = {
               ...formData, owner: { fullname: user.fullname, username: user.username, id: user.id, avatar: user.profile.avatar ? user.profile.avatar : "" },
               id: generateId(16),
               createdAt: currentDate.toISOString(),
               img: formData.img
          }
          setPosts((prevPost) => ([...prevPost, {...payload, comments: []}]))
          try {
              const response: Response = await client.user.createPost(payload) as Response
               if (!response.ok) {
                    console.log(await response.json())
               } else {
                    setFormData((prevData) => ({ ...prevData, title: "", description: "", img: "" }))
               }
          } catch (err) {
               console.log(err)
          }
     }
     const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          const { name, value } = e.target
          setFormData((prevData) => ({ ...prevData, [name]: value }))
     }
     useEffect(() => {
          const rich_post = document.getElementById("rich-post") as HTMLElement;
          const rich_button = document.getElementById("rich-post-button") as HTMLElement;

          const clickHandler = () => {

               setIsRichPostPopup(!isRichPostPopup)
               rich_post.style.display = isRichPostPopup ? "none" : "block"
               document.body.style.overflowY = "hidden"
          }
          rich_button.addEventListener("click", clickHandler)
          return () => {
               rich_button.removeEventListener("click", clickHandler)
          }
     }, [isRichPostPopup])
     ReactDOM.render(<RichPostPanel handleSubmit={handlePostSubmit} isPopup={isRichPostPopup} setisPopup={setIsRichPostPopup} handleChange={handleChange} formData={formData} setFormData={setFormData} />, document.getElementById("rich-post") as HTMLElement)
     return (
          <div className='sticky z-40 top-[80px] flex items-center pl-2 pr-2 h-[65px] w-[100%] border-b border-[#3a3a3a] bg-[#15151a]'>
               <div className='flex justify-around items-center w-[100%]'>
                    <div>
                         <div onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave} id="rich-post-button" className='ml-4 cursor-pointer hover:bg-[#2323b4] select-none min-w-[40px] items-center h-[40px] flex justify-center rounded-full bg-[#1d1d9c] transition duration-150'><span className='text-[30px] relative mobile:top-[0px] -top-[2px] font-semibold'>+</span></div>
                         <div className={popupClasses}>
                              Rich Post
                         </div>
                    </div>
                    <div className='w-[1px] ml-3 mr-3 border-l border-gray-600 h-[60%] bg-[#808080f3]'></div>
                    <form className='flex items-center gap-5 w-[100%]' onSubmit={handlePostSubmit}>
                         <input type='text' name="title"
                              placeholder='Write a post'
                              onChange={handleChange}
                              value={formData.title}
                              autoFocus
                              className='pt-1.5 text-[17px] focus:border-blue-600 w-[90%] border border-[#80808033] bg-[#0c0c11] text-gray focus:outline-none pb-1.5 pl-3 rounded-full' />
                         <div className='cursor-pointer' >
                              <button type='submit' className='mr-2'>
                                   <FontAwesomeIcon icon={faPaperPlane} />
                              </button>
                         </div>
                    </form>
               </div>
          </div>
     )
}

export default DashboardNavbarPost