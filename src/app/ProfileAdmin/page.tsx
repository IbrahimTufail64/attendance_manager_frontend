"use client"

import Navbar from "../Navbar"
import NavbarAdmin from "../NavbarAdmin"
import ProfileComp from "../ProfileComp"


const Profile = () => {

 

  return (
    <div>
      <NavbarAdmin/>
      <ProfileComp/>
      <div className=' w-full p-5 flex justify-center'>
          <a
            href = '/Login'
                  className=" px-8 rounded-md bg-blue-500 py-2 text-center text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  Login as a Student
          </a>
        </div>
    </div>
  )
}

export default Profile