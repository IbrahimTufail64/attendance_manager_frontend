"use client"

import NavbarAdmin from '@/app/NavbarAdmin';
import ReportSingle from '@/app/ReportSingle';
import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const GeneratePDF = ({ params }: { params: { slug: string } }) => {
    const toDate = new Date();
    const  FromDate = new Date(toDate.getTime() - (30 * 24 * 60 * 60 * 1000));
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setendDate] = useState<Date>();


  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Report",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });
  return (
    <div className='w-full '>
        <NavbarAdmin/>
            <div className='flex w-full justify-center font-semibold text-3xl mb-20 mt-5'>Generate Report for a Single User</div>
            <div className='font-semibold px-[100px] space-x-5 text-2xl flex justify-between'>
                <div className=' p-5 border border-black w-1/2'>
                <div>Start Date:</div>
                <div className='font-light text-md'>{startDate !== undefined ? String(startDate): 'no date selected'}</div>
                <div className='font-light'>
                    <DayPicker
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        />
                </div>
            </div>
                <div className=' p-5 border border-black w-1/2'>
                <div>End Date:</div>
                <div className='font-light'>{endDate !== undefined ? String(endDate) : 'no date selected'}</div>
                <div className='font-light'>
                    <DayPicker
                        mode="single"
                        selected={endDate}
                        onSelect={setendDate}
                        />
                </div>
            </div>
        </div>
        
        <div className='w-full justify-center flex py-10'>
            <button className="w-44 text-xl rounded-md bg-blue-500 py-2 text-center text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                onClick={() => {
                handlePrint(null, () => contentToPrint.current);
            }}>
                Print Preview
      </button>
        </div>
        <div ref={contentToPrint}>
            <ReportSingle page={params.slug} FromDate = {startDate} toDate={endDate}/>
        </div>
      
    </div>
  )
}

export default GeneratePDF


