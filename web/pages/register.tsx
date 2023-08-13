import React, { useState } from "react";
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Auth from "../components/auth";
import { Constants } from "../Client/contants";

interface User {
     fullname: string;
     email: string;
     password: string;
     type?: number;
     username?: string;
}

interface DataUserError {
     fullname: boolean;
     email: boolean;
     password: boolean;
     strongUsername: boolean;
     strongPassword: boolean;
}

const initialUser: User = {
     fullname: '',
     email: '',
     password: '',
     username: ''
};

const initialUserError: DataUserError = {
     fullname: false,
     password: false,
     email: false,
     strongUsername: false,
     strongPassword: false
}

const Register: React.FC = () => {
     const [formData, setFormData] = useState<User>(initialUser);
     const [errorData, setErrorData] = useState<DataUserError>(initialUserError);
     const [success, setSuccess] = useState<boolean>(false);

     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          const { name, value } = e.target;
          setFormData(prevValues => ({ ...prevValues, [name]: value }));

          if (value.length > 2) {
               setErrorData(prevData => ({ ...prevData, [name]: false }))
          }

          if (name === "password" && value.length > 8) {
               setErrorData(prevData => ({ ...prevData, strongPassword: false }))
          }

          if (name === "fullname" && value.split(" ").length > 1) {
               setErrorData(prevData => ({ ...prevData, strongUsername: false }))
          }
     };

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();

          const { fullname, password, email } = formData;
          const username = fullname.split(" ").join("").toLowerCase();
          const { fullname: usernameError, strongUsername, strongPassword, email: emailError, password: passwordError } = errorData;

          if (fullname.split(" ").length < 2 || password.length < 8 || !email || !fullname || !password) {
               if (fullname.split(" ").length < 2) {
                    setErrorData(prevData => ({ ...prevData, strongUsername: true }));
               }

               if (!fullname) {
                    setErrorData(prevData => ({ ...prevData, fullname: true }));
               }

               if (password.length < 8) {
                    setErrorData(prevData => ({ ...prevData, strongPassword: true }));
               }

               if (!email) {
                    setErrorData(prevData => ({ ...prevData, email: true }));
               }

               if (!password) {
                    setErrorData(prevData => ({ ...prevData, password: true }));
               }

               if (!fullname && strongUsername) {
                    setErrorData(prevData => ({ ...prevData, fullname: true, strongUsername: false }));
               }

               if (fullname.split(" ").length < 2 && usernameError) {
                    setErrorData(prevData => ({ ...prevData, strongUsername: true, fullname: false }));
               }

               if (fullname.split(" ").length < 2 && !fullname) {
                    setErrorData(prevData => ({ ...prevData, strongUsername: false, fullname: true }));
               }

               if (!password && strongPassword) {
                    setErrorData(prevData => ({ ...prevData, password: true, strongPassword: false }));
               }

               if (password.length < 8 && passwordError) {
                    setErrorData(prevData => ({ ...prevData, strongPassword: true, password: false }));
               }

               if (password.length < 8 && !password) {
                    setErrorData(prevData => ({ ...prevData, strongPassword: false, password: true }));
               }

               return;
          }

          try {
               const response = await fetch(`${Constants.API_BASE}/register`, {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                         fullname: formData.fullname,
                         email: formData.email,
                         password: formData.password,
                         username: username,
                         type: 1
                    })
               });


               if (response.ok) {
                    console.log("Success Register");
                    setSuccess(true)
               } else {
                    console.log("Error while registering...");
               }
          } catch (err) {
               console.log(err as string);
          }
     }

     return (
          <div>
               <Navbar />

               <div className="flex justify-center mt-32" id="register">
                    <div>
                         <h1 className="text-[50px] mb-2 font-bold text-center">Nastachat</h1>
                         <form onSubmit={handleSubmit} className="bg-[#0e0e1341] shadow-[#0505059d] shadow-lg p-7 rounded-[8px] border border-[#80808069] flex flex-col">
                              <div className="text-center mb-4">
                                   <h1 className="text-3xl font-bold mb-1">Register your account</h1>
                                   <p>Already have an account? <a href="/login" className="text-blue-500 underline hover:text-blue-600">Sign in</a></p>
                              </div>
                              {success &&
                                   <div className="flex bg-green-600  -mb-[15px] p-[4px] outline outline-green-700 outline-1 pl-3 rounded-sm ml-2 mr-2">
                                        <p className="text-[15px] text-green-100">Registered Successfully, <a href="/login">login</a></p>
                                   </div>
                              }

                              <div className="flex pl-2 pr-2 mt-3 flex-col [&>*>label]:opacity-80 [&>*>input]:bg-[#222029] [&>*>input]:border [&>*>input]:border-[#80808080] [&>*>input]:rounded-[4px]  [&>*>input]:opacity:70 [&>*>input]:mt-[2px] [&>*>input:focus]:outline [&>*>input:focus]:outline-1 [&>*>input:focus]:outline-[#2626e473]  [&>*>input]:text-[#ffffff] [&>*]:flex gap-6 [&>*>input]:pl-3 [&>*>input]:pr-3 [&>*>input]:pt-1.5 [&>*>input]:pb-1.5 [&>*]:flex-col">
                                   <div>
                                        <label >Full Name</label>
                                        <input type="text" name="fullname" placeholder="What's your full name?" onChange={handleChange} value={formData.fullname}></input>
                                        {errorData.fullname && <p className="text-[14px] text-red-500 -mb-[1.3rem]">Enter a valid name</p>}
                                        {errorData.strongUsername && <p className="text-[14px] text-red-500 -mb-[1.3rem]">Enter your last name</p>}
                                   </div>
                                   <div>
                                        <label>Email Address</label>
                                        <input type="email" name="email" placeholder="you@example.com" onChange={handleChange} value={formData.email}></input>
                                        {errorData.email && <p className="text-[14px] text-red-500 -mb-[1.3rem]">Enter a valid email</p>}
                                   </div>
                                   <div>
                                        <label>Password</label>
                                        <input type="password" name="password" placeholder="What's your password?" value={formData.password} onChange={handleChange}></input>
                                        {errorData.password && <p className="text-[14px] text-red-500 -mb-[1.35rem]">Enter a valid password</p>}
                                        {errorData.strongPassword && <p className="text-[14px] text-red-500 -mb-[1.32rem]">Enter a password with more than 8 characters</p>}
                                   </div>
                                   <div className="flex justify-center">
                                        <button type="submit" className="bg-[#3e3ec7] pt-2 pb-2 mt-4 rounded-[5px] transition duration-200 hover:bg-[#383899] hover:text-[#dbdbdb]" placeholder="Register">Register</button>
                                   </div>
                              </div>
                         </form>
                    </div>
               </div>
               <div className="mt-32">
                    <Footer />
               </div>
          </div>
     );
};

export default Auth("dashboard", Register);