"use client"
import React, { useEffect, useState } from 'react'
import NavbarAdmin from '../NavbarAdmin'
import axios from 'axios'

const Admin = () => {

    const [records, setRecords] = useState<any>([]);

    const fetchRecords =async () =>{
        try{
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/app/admin/get_records`,{
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        console.log(res.data);
        setRecords(res.data);
    }
    catch(err:any){
        console.log(err);
    }
}
    useEffect(()=>{ 
        fetchRecords();
    },[])
  return (
    <div>
        <NavbarAdmin/>
        <div className='flex justify-center w-full mt-[100px]'>
        <div className='border border-1 border-black p-6 w-[50vw]'>
            <div className='text-xl font-semibold flex justify-center'>Registered Students</div>
            <div className='text-lg font-medium flex justify-between'>
                <div>Student Name</div>
                <div>Email</div>
            </div>
            {records.map((a:any)=>{
                return (<a href={`/Record/${a.id}`} key={a.id} className='flex justify-between px-2 py-2 bg-slate-200 mt-2 hover:bg-slate-300 hover:cursor-pointer'>
                    <div>{a.name}</div>
                    <div>{a.email}</div>
                </a>)
            })}
        </div>
    </div>
    </div>
  )
}

export default Admin 