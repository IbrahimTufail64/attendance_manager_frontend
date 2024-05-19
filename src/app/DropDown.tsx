"use client"
import React, { useState } from 'react'

const Dropdown = ({setTime,title,options,color,textColor}:any) => {
    const [toggle,setToggle] = useState(false); 
    if(!color){
      color = 'transparent'
    }
    if(!textColor){
      textColor = '#000000'
    }
    
  return (
    <div className='relative w-[50px]'>
        <button id="dropdownDefaultButton" onClick={()=>setToggle(!toggle)} data-dropdown-toggle="dropdown" 
        className={`  focus:outline-none  font-medium rounded-lg 
        text-sm px-5 py-2.5 text-center inline-flex items-center  `} style={{backgroundColor: color, color: textColor}}
        type="button">{title} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
</svg>
</button>

{/* <!-- Dropdown menu --> */}
<div id="dropdown" className={`z-10 ${!toggle && 'hidden'} bg-white divide-y divide-gray-100 rounded-lg hover:rounded-lg absolute shadow w-[100px] dark:bg-gray-700`}>
    <ul className=" text-sm text-gray-200 " aria-labelledby="dropdownDefaultButton">
      {options.map( (time:any) =>(
        <li>
        <div onClick={()=>{setTime(time);setToggle(!toggle)}} className="cursor-pointer block px-4 py-2 hover:rounded-lg hover:text-white hover:bg-gray-600 ">{time}</div>
      </li>
      ))}

    </ul>
</div>
    </div>
  )
}

export default Dropdown