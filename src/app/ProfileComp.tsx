"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const ProfileComp = () => {

 const [name, setName] = React.useState<any>('');
    const [email, setEmail] = React.useState<any>('');
    const [image,setImage] = useState('');
    const [pfp, setPfp] = useState<any>(null);

  let isAdmin:string|null = '';

    useEffect(()=>{

        if(typeof window !== "undefined"){
            setName(localStorage.getItem('userName'));
            setEmail(localStorage.getItem('Email'));
            setPfp(localStorage.getItem('profile'));
            isAdmin = localStorage.getItem('Admin');
        }
    },[])
 const uploadImage = async (e:any) => {
  e.preventDefault();
  try {
    const selectedImage = e.target.files[0]; // Get the selected file
    setImage(selectedImage); // Update the state with the selected file
    console.log(selectedImage); // Log the selected file

    const formData = new FormData();
    formData.append('image', selectedImage); 
    let photo = '';
    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/upload-image`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      console.log(response.data);
      photo = response.data;
      setImage(response.data);
      setPfp(response.data);
      localStorage.setItem('Profile',response.data);
   await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/app/update_pfp`, {
    profileUrl: photo
   }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    alert('Profile photo updated successfully')
  } catch (error) {
    console.log(error);
  }
};


  return (
    <div>
        <div className='w-full flex justify-center'>
            <div className='border border-1 border-black mt-[30px] p-7 w-[50vw]'>
                <div className='text-xl font-bold flex justify-center w-full'>Profile Info</div>
                <div className='w-full flex justify-center mt-10'>
                    {pfp ? 
                    <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/profile/${pfp}`} className='w-[200px] h-[200px] rounded-full overflow-hidden object-cover' /> : 
                    <img src='https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg' className='w-[200px] h-[200px] rounded-full overflow-hidden object-cover'/>
                    }
                </div>
                <div className='flex w-full justify-between mt-7'>
                    <div className='font-bold'>User Name</div>
                    <div>{name}</div>
                </div>
                <div className='flex w-full justify-between mt-7'>
                    <div className='font-bold'>Email</div>
                    <div>{email}</div>
                </div>
                <div className='text-xl font-bold flex justify-center w-full mt-10'>Edit Profile Photo</div>

                 <div className='flex w-full justify-center mt-5'>
                    <input
                    type="file"
                    name='photo'
                    id='photo'
                    className="opacity-0 absolute w-0 h-0"
                    onChange={(e) => uploadImage(e)}
                    // accept="image/png, image/jpg, image/jpeg"
                    />
                    <label
                    htmlFor='photo'
                    className="text-white bg-blue-500 inline-block cursor-pointer font-bold text-lg px-4 py-2 hover:bg-blue-600 "
                    >
                    Choose Profile Picture
                    </label>
                    {/* <div className='mt-5'>{image}</div> */}
                 </div>
            </div>
            
        </div>
        
    </div>
  )
}

export default ProfileComp