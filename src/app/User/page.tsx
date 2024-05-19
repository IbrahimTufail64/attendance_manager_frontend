"use client"
import axios from 'axios';
import Link from 'next/link';
import React from 'react'
import Navbar from '../Navbar';

const UserPanel = () => {

const markAttendance = async(e:any)=>{
    e.preventDefault();
    try{ 
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/app/mark_attendance`,{
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
    console.log(res.data);
    alert('Attendance Marked')
    }
    catch(err:any){
        console.log(err);
    alert('Attendance already has been Marked for today!')
    }
}

const markLeave= async(e:any)=>{
    e.preventDefault();
    try{ 
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/app/mark_leave`,{
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
    console.log(res.data);
    alert('Leave Request Sent')
    }
    catch(err:any){
        console.log(err);
    alert('Attendance already has been Marked for today!')
    }
}

  return (
    <div>
      <Navbar/>
    <div className="w-full flex justify-center mt-[100px] ">
      <div className="flex flex-col space-y-5">
              <button
                  onClick={markAttendance}
                  className=" px-8 rounded-md bg-green-500 py-2 text-center text-white font-medium hover:bg-green-600  focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  Mark Attendance
          </button>
            <button
            onClick={markLeave}
                  className=" px-8 rounded-md bg-yellow-300 py-2 text-center text-white font-medium hover:bg-yellow-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  Mark Leave
          </button>
            <a
            href = '/View_Attendance'
                  className=" px-8 rounded-md bg-blue-500 py-2 text-center text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  View Attendance
          </a>
      </div>
    </div>
    </div>
  )
}

export default UserPanel