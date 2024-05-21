"use client"
import React, { useEffect, useState } from 'react'

const Navbar = () => {
    const [image, setImage] = useState<any>(null);
    useEffect(()=>{
        if(typeof window !== "undefined"){
            setImage(localStorage.getItem('profile'))
        }
        console.log('image',image)
    })
  return (
      <nav className="w-full h-20 bg-amber-100 flex justify-between px-10 items-center text-2xl font-bold">
      <a href='/User'>User Panel</a>
      <div className='font-light flex space-x-4'>
        <a href='/Profile' className='pt-1'>Profile</a>
        {image  ? 
        <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/profile/${image}`} className='w-10 h-10 rounded-full overflow-hidden object-cover' /> : 
        <img src='https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg' className='w-10 h-10 rounded-full overflow-hidden object-cover'/>
        }
      </div>
    </nav>
  )
}

export default Navbar