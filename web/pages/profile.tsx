import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Constants } from '../Client/contants';
import { ProfileInfo } from '../Client/datatypes';
import ProfileCard from '../components/profile-components/profileCard';
import Auth from './dashboard';

const token = localStorage.getItem("token")
const initProfile: ProfileInfo = {
     username: "",
     fullname: "",
     avatar:"",
     bio: ""
}
const Profile: React.FC = () => {
     const [user, setUser] = useState<ProfileInfo>(initProfile)
     const params = useParams();
     const _userid = params.id;

     useEffect(() => {
          const fetchProfile = async () => {
               const response = await fetch(`${Constants.API_BASE}/profile/${_userid}`, {
                    method: "GET",
                    headers: {
                         "Content-Type": "application/json",
                         authorization: `Bearer ${token}`
                    }
               })
               const data = await response.json();
               if (response.ok) {
                    return setUser(data)
               }
          }
          fetchProfile()
     }, [])

     return (
          <div>
          <Navbar />
          <main className="mt-[80px] flex justify-center">
               <ProfileCard user={user}/>
          </main>
          <Footer />
        </div>
     )
}

export default Profile