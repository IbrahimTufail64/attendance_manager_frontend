"use client"
import Attendance from '@/app/Attendance'
import NavbarAdmin from '@/app/NavbarAdmin'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ReportSingle = ({ page,FromDate,toDate }: any) => {
    toDate = toDate ? toDate: new Date();
    FromDate = FromDate ? FromDate : new Date(toDate.getTime() - (30 * 24 * 60 * 60 * 1000));
    const [Params, setParams] = useState(page);
    const [present, setPresent] = useState(0);
    const [absent, setAbsent] = useState(0);
    const [leave, setLeave] = useState(0);
    const [grade, setGrade] = useState('');
    const [user, setUser] = useState({
        name:'',
        email:'',
    }); 
    const [attendances, setAttendances] = useState<any>([]);

    const fetchRecord =async () =>{  
        try{
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/app/admin/get_print_record/${Params}`,{
                startDate: FromDate,
                endDate: toDate,
            },{
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        console.log(res.data);
        setUser(res.data.user);
        setAttendances(res.data.attendances);
        const difference = res.data.differenceInDays;
        const present = res.data.attendances.filter((a:any)=>{
            return a.marked === 'present' ;
        }).length;
        const leave = res.data.attendances.filter((a:any)=>{
            return a.marked === 'leave' && !a.isPending;
        }).length;
        const absent = Math.abs((present + leave) -difference);
        const grading = ((present + leave)/difference)*100;
        let grade = '';
        if(grading >= 90) grade = 'A';
        else if(grading >= 80) grade = 'B';
        else if(grading >= 70) grade = 'C';
        else grade = 'D';
        setPresent(present);
        setAbsent(absent);
        setLeave(leave);
        setGrade(grade);
        // setAttendees({present,absent,leave,grade});
        // setRecords(res.data);
    }
    catch(err:any){
        console.log(err);
    }
}
    useEffect(()=>{ 
        fetchRecord();
    },[FromDate, toDate])

  return (
    <div>
        <div>
            <div className='flex w-full justify-center py-[20px]'>
                <div className='border border-1 border-black w-[95vw] p-7'>
                    <div className='flex justify-between  border-0 border-b-2 border-slate-200 pb-3'>
                        <div className='text-xl font-semibold'>{user.name}</div>
                        <div className='text-xl font-light'>{user.email}</div>
                    </div>
                    <div className='w-full flex justify-center mt-5'>

                    </div>
                    <div className='flex justify-between font-bold my-10 text-2xl w-[20vw]'>
                        <div >Grade:</div>
                        <div >{grade}</div>
                    </div>
                    <div className='flex justify-between font-bold mt-5 w-[20vw]'>
                        <div >present:</div>
                        <div >{present}</div>
                    </div>
                    <div className='flex justify-between font-bold  w-[20vw]'>
                        <div >absent:</div>
                        <div >{absent}</div>
                    </div>
                    <div className='flex justify-between font-bold  w-[20vw]'>
                        <div >leave:</div>
                        <div >{leave}</div>
                    </div>
                    <div className='flex justify-between font-bold mt-5'>
                        <div className='flex-1'>Attendance</div>
                        <div className='flex-1'>Status</div>
                        <div className='flex-1'>Date</div>
                    </div>
                    {
                        attendances.map((a:any)=>{
                            let pending = a.isPending? 'pending' : 'resolved';
                            let date = a.createdAt.split('T')[0];
                                return (
                                    <div className='flex justify-between'>
                                        <div className='flex-1'>{a.marked}</div>
                                        <div className='flex-1'>{pending}</div>
                                        <div className='flex-1'>{date}</div>
                                    </div>
                                )
                        })
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default ReportSingle