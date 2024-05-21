"use client"
import Attendance from '@/app/Attendance'
import NavbarAdmin from '@/app/NavbarAdmin'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Record = ({ params }: { params: { slug: string } }) => {

    const [Params, setParams] = useState(params.slug);
    const [user, setUser] = useState({
        name:'',
        email:'',
    }); 
    const [attendances, setAttendances] = useState<any>([]);

    const fetchRecord =async () =>{  
        try{
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/app/admin/get_record/${Params}`,{
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        console.log(res.data);
        setUser(res.data.user);
        setAttendances(res.data.attendances);
        // setRecords(res.data);
    }
    catch(err:any){
        console.log(err);
    }
}
    useEffect(()=>{ 
        fetchRecord();
    },[])

  return (
    <div>
        <NavbarAdmin/>
        <div>
            <div className='flex w-full justify-center pt-[100px]'>
             <div>
                   <div className='w-full flex justify-center my-5 space-x-4'>
                        <a href={`/PDFView/${Params}`}
                        className="px-4 rounded-md bg-blue-500 py-2 text-center text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                        >
                        Generate Report for this student
                    </a>
                    </div>
                <div className='border border-1 border-black w-[70vw] p-7'>
                    
                    <div className='flex justify-between  border-0 border-b-2 border-slate-200 pb-3'>
                        <div className='text-xl font-semibold'>{user.name}</div>
                        <div className='text-xl font-light'>{user.email}</div>
                    </div>
                    
                    <div className='w-full flex justify-center mt-5 space-x-4'>
                    <a href={`/CreateAttendance/${Params}`}
                        className="w-44 rounded-md bg-blue-500 py-2 text-center text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                        >
                        Add Attendance
                    </a>
                    
                    </div>
                    <div className='flex justify-between font-bold mt-5'>
                        <div className='w-1/4 text-start'>Attendance</div>
                        <div className='w-1/4 text-center'>Edit Status</div>
                        <div className='w-1/4 text-center'>Date</div>
                        <div className='w-1/4 text-end'>Delete</div>
                    </div>
                    {
                        attendances.map((a:any)=>{
                            
                                return (<Attendance a={a}/>)
                        })
                    }
                </div>
             </div>
            </div>
        </div>
    </div>
  )
}

export default Record