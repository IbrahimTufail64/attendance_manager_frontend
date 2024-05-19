"use client"
import Dropdown from '@/app/DropDown';
import NavbarAdmin from '@/app/NavbarAdmin'
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import axios from 'axios';
import { useRouter } from 'next/navigation'

const Create = ({ params }: { params: { slug: string } }) => {
    const [attendance, setAttendance] = useState('present');
    const [status, setStatus] = useState('pending');
      const [selected, setSelected] = useState<Date>();
      const [date, setDate] = useState<any>(new Date().toISOString());

const router = useRouter()

    useEffect(()=>{
        if(selected){
            console.log(new Date(String(selected)).toISOString());
        setDate(new Date(String(selected)).toISOString())
        }
    },[selected]);

    const add_attendance = async() =>{
        try{ 
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/app/admin/create_attendance/${params.slug}`,{
                status,
                attendance,
                date
            },{
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            alert('Entry Created');
            router.push(`/Record/${params.slug}`, { scroll: false })
            console.log(res.data);
        }
        catch(err){
            console.log(err);
        }
    }
    
  return (
    <div>
        <NavbarAdmin/>
        <div className='flex w-full justify-center mt-[100px]'>
            <div className='border border-black p-5 w-[40vw] mb-5'>
                    <div className='font-semibold text-xl text-center w-full'>Add Attendance</div>
                    <div className='flex justify-between w-full font-bold mt-4'>
                        <div>Attendance</div>
                        <div>Status</div>
                    </div>
                    <div className='flex justify-between w-full pr-10'>
                        <Dropdown title={attendance} setTime={setAttendance} options={['present','leave','absent']} />
                        <Dropdown title={status} setTime={setStatus} options={['pending','resolved']} />
                    </div>
                    <div className='font-bold text-center w-full'>Pick a Date</div>
                    <div className='flex justify-center'>
                        
                        <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={setSelected}
                        />
                    </div>
                    <div className='flex justify-center pt-6'>
                    <button
                        onClick={add_attendance}
                        className="w-44 rounded-md bg-slate-800 py-2 text-center text-white font-medium hover:bg-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                        Create Attendance
                    </button>
                    
                    </div>
                    
            </div>
        </div>
    </div>
  )
}

export default Create