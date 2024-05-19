"use client"
import React, { useEffect, useState } from 'react'
import Dropdown from './DropDown';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { useRouter } from 'next/navigation'

const Attendance = ({a}:any) => {
    const [status, setStatus] = useState(a.isPending ? 'pending' : 'resolved');
    const router = useRouter();

    const changeStatus =async () =>{
        try{ 
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/app/admin/change_status/${a.id}?status=${status}`,{
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        console.log(res.data);
    }
    catch(err:any){
        console.log(err);
    }
}
    useEffect(()=>{ 
        changeStatus();
    },[status])


    const deleteAttendance = async()=>{
        try{
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/app/admin/delete_attendance/${a.id}`,{
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }})
            alert('Attendance Record Deleted! Refrest the page to see changes');
        }
        catch(err){

        }
    }

    const date = a.createdAt.split('T')[0];
  return (
                                <div className='flex justify-between px-2 py-2 bg-slate-200 mt-2'>
                                    <div className='w-1/4 text-start pt-2'>{a.marked}</div>
                                    <div className='w-1/4 text-right pl-16'><Dropdown title={status} options={['pending','resolved']} setTime={setStatus} /></div>
                                    <div className='w-1/4 text-center'>{date}</div>
                                    <div  className='w-1/4 flex justify-end pt-2'><MdDelete className='cursor-pointer' onClick={deleteAttendance} size={25}/></div>
                                </div>
  )
}
// {a.isPending ? 'pending' : 'resolved'}
export default Attendance