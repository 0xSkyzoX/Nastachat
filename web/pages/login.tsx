import React, { useCallback, useState } from "react";
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useNavigate } from "react-router-dom";
import { Client } from "../Client";
import { UserType } from "../Client/datatypes"
import Auth from "../components/auth";
import { Constants } from "../Client/contants";

const client = new Client({ type: UserType.Member });

interface User {
  email: string;
  password: string;
}

interface DataUserError {
  email: boolean;
  password: boolean;
  strongPassword: boolean;
}

const initialUser: User = {
  email: '',
  password: '',
};

const initialUserError: DataUserError = {
  email: false,
  password: false,
  strongPassword: false
};

const Login: React.FC = () => {
  const [formData, setFormData] = useState<User>(initialUser);
  const [errorData, setErrorData] = useState<DataUserError>(initialUserError);
  const [success, setSucess] = useState<boolean>(false);
  const [fail, setFail] = useState<boolean>(false);

  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevValues => ({ ...prevValues, [name]: value }));

    if (value.length > 2) {
      setErrorData(prevData => ({ ...prevData, [name]: false }));
    }

    if (name === "password" && value.length > 8) {
      setErrorData(prevData => ({ ...prevData, strongPassword: false }));
    }
  };


  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = formData;

    const { password: passwordError, strongPassword } = errorData;

    if (!email || !password || password.length < 8) {
      if (!email) {
        setErrorData(prevData => ({ ...prevData, email: true }));
      }

      if (!password) {
        setErrorData(prevData => ({ ...prevData, password: true }));
      }

      if (password.length < 8 && passwordError) {
        setErrorData(prevData => ({ ...prevData, strongPassword: true, password: false }));
      }

      return;
    }

    try {
      const response = await fetch(`${Constants.API_BASE}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      if (response.ok) {
        setSucess(true)
        setFail(false)
        const data = await response.json();
        const { token } = data;
        localStorage.setItem('token', token);
        client.setToken(token)
        const isTokenValid = await client.verifyToken()
        if (isTokenValid) {
          navigate("/dashboard")
          window.location.reload()
        } else {
          return console.log("Login Fail")
        }
        console.log("Login successful");
      } else {
        const errorData = await response.json();
        console.log("Error while logging in:", errorData.error);
      }
      if (response.status == 403) {
        setFail(true)
        setSucess(false)
      }
    } catch (err) {
      console.log("Error while logging in:", err);
    }
  }, [formData, errorData]);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center mt-32" id="login">
        <div>
          <h1 className="text-[50px] mb-2 font-bold text-center">Nastachat</h1>
          <form onSubmit={handleSubmit} className="bg-[#0e0e1341] gap-1 shadow-[#0505059d] shadow-lg p-7 rounded-[8px] border border-[#80808069] flex flex-col">
            <div className="text-center mb-2">
              <h1 className="text-3xl font-bold mb-0">Login to your account</h1>
              <p>Don't have an account? <a href="/register" className="text-blue-500 underline hover:text-blue-600">Sign up</a></p>
            </div>
            {success &&
              <div className="flex bg-green-600 -mb-[15px] p-[4px] outline outline-green-700 outline-1 pl-3 rounded-sm ml-2 mr-2">
                <p className="text-[15px] text-green-100">Login Successfully</p>
              </div>
            }
            {fail && <div className="flex bg-red-500 -mb-[15px] p-[4px] outline outline-red-700 outline-1 pl-3 rounded-sm ml-2 mr-2">
              <p className="text-[15px] text-green-100">The username or password is incorrect</p>
            </div>}
            <div className="flex pl-2 pr-2 mt-3 flex-col [&>*>label]:opacity-80 [&>*>input]:bg-[#222029] [&>*>input]:border [&>*>input]:border-[#80808080] [&>*>input]:rounded-[4px]  [&>*>input]:opacity:70 [&>*>input]:mt-[2px] [&>*>input:focus]:outline [&>*>input:focus]:outline-1 [&>*>input:focus]:outline-[#2626e473]  [&>*>input]:text-[#ffffff] [&>*]:flex gap-6 [&>*>input]:pl-3 [&>*>input]:pr-3 [&>*>input]:pt-1.5 [&>*>input]:pb-1.5 [&>*]:flex-col">
              <div>
                <label>Email Address</label>
                <input type="email" name="email" placeholder="you@example.com" onChange={handleChange} value={formData.email}></input>
                {errorData.email && <p className="text-[14px] text-red-500 -mb-[1.3rem]">Enter a valid email</p>}
              </div>
              <div>
                <label>Password</label>
                <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange}></input>
                {errorData.password && <p className="text-[14px] text-red-500 -mb-[1.35rem]">Enter a valid password</p>}
                {errorData.strongPassword && <p className="text-[14px] text-red-500 -mb-[1.32rem]">Enter a password with more than 8 characters</p>}
              </div>
              <div className="flex justify-center">
                <button type="submit" className="bg-[#3e3ec7] pt-2 pb-2 rounded-[5px] transition duration-200 hover:bg-[#383899] hover:text-[#dbdbdb]" placeholder="Login">Login</button>
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

export default Auth("dashboard", Login)