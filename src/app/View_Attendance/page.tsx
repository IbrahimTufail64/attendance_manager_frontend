"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar';

const View = () => {

    const [attendance, setAttendance] = useState([]);

 const fetchData = async()=>{
        try{
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/app/fetch_attendance`,{
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        setAttendance(res.data)
        console.log(res.data);
        }
        catch(err:any){
            throw new Error(err);
        }
        }

    useEffect(()=>{
        fetchData();
    },[]);
  return (
    <div>
        <Navbar/>

    <div className='flex justify-center w-full mt-[100px]'>
        <div className='border border-1 border-black p-6 w-[50vw]'>
            <div className='text-xl font-semibold flex justify-between'>
                <div>Attendance</div>
                <div>Processing Status</div>
                <div>Date</div>
            </div>
            {attendance.map((a:any)=>{
                const date = a.createdAt.split('T')[0];
                return (<div className='flex justify-between px-2 py-2 bg-slate-200 mt-2'>
                    <div>{a.marked}</div>
                    <div>{a.isPending ? 'pending' : 'resolved'}</div>
                    <div>{date}</div>
                </div>)
            })}
        </div>
    </div>
    </div>
  )
}

export default View