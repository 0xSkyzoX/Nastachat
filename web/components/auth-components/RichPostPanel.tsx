import React, { useEffect, useState } from 'react'
import { PostInfo } from '../../Client/datatypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface RichPostPanelProps {
     formData: PostInfo,
     setFormData: React.Dispatch<React.SetStateAction<PostInfo>>,
     handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => Promise<void>,
     setisPopup: React.Dispatch<React.SetStateAction<boolean>>,
     isPopup: boolean,
     handleSubmit: (e: React.FormEvent) => Promise<void>
}

const RichPostPanel: React.FC<RichPostPanelProps> = ({ formData, setFormData, handleChange, handleSubmit, setisPopup, isPopup }) => {
     const [selectedImage, setSelectedImage] = useState(null)
     useEffect(() => {
          const rich_out = document.getElementById("rich-post-out") as HTMLElement;
          const rich_post = document.getElementById("rich-post") as HTMLElement;

          const handleClick = (e: MouseEvent) => {
               setisPopup(false)
               rich_post.style.display = "none"
               document.body.style.overflowY = "scroll"
          }
          rich_out.addEventListener("click", handleClick)

          return () => {
               rich_out.removeEventListener("click", handleClick)
          }

     }, [isPopup])

     const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
          const file = event.target.files?.[0];

          if (file) {
               const reader = new FileReader();

               reader.onload = (e: ProgressEvent<FileReader>) => {
                    const imageDataUrl = e.target?.result as string;
                    // Save the imageDataUrl as text or perform any desired operations
                    setFormData((prevData) => ({ ...prevData, img: imageDataUrl }))
                    // Example: Log the imageDataUrl
                    console.log(imageDataUrl);
               };

               reader.readAsDataURL(file);
          }
     };


     return (
          <div className='fixed flex flex-col overflow-y-scroll z-[100] w-[100%] h-[100vh] bg-black z-[100000000000000]'>
               <div className='p-2 mt-1'>
                    <div id='rich-post-out' onClick={() => { setisPopup(false) }} className='inline-flex gap-2 items-center ml-2 mr-2 cursor-pointer'>
                         <FontAwesomeIcon className='text-[27px]  text-[#f1f1f1]' icon={faArrowLeft} />
                         <h1 className='text-[25px] font-bold'>Back</h1>
                    </div>
               </div>
               <div className='w-[80%] flex flex-col justify-center mr-[auto] ml-[auto]'>
                    <h1 className='text-center font-bold text-[40px]'>Create a Post</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                         <div className='flex flex-col'>
                              <label className="text-[28px] relative left-3">Title</label>
                              <input placeholder="What's your post title?"
                                   value={formData.title}
                                   name="title"
                                   onChange={handleChange}
                                   className='p-2 pl-4 pr-4 text-[19px] placeholder-[#acacac] border border-[#383838] bg-[#0e0f11] rounded-lg focus:outline-none'
                              />
                         </div>
                         <div className='flex flex-col'>
                              <label className="text-[28px] relative left-3">Description</label>
                              <textarea placeholder="What's your post description?"
                                   value={formData.description}
                                   name="description"
                                   rows={4}
                                   cols={20}

                                   onChange={handleChange}
                                   className='p-2 pl-4 pr-4 text-[19px] placeholder-[#acacac] border border-[#383838] bg-[#0e0f11] rounded-lg focus:outline-none'
                              />
                         </div>
                         <input type="file" name='img' accept="image/*" onChange={handleFileInputChange} />

                         <button type='submit' className='bg-[#1616a0] transition duration-200 hover:bg-[blue] mt-[1rem] inline-block pt-2 pb-2 font-bold text-[20px] rounded-lg'>Submit</button>
                    </form>
               </div>
          </div>
     )
}

export default RichPostPanel