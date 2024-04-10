import React from 'react'
import logo from '../assets/logo.png'
import { IoMdLogOut } from "react-icons/io";
import {useNavigate} from 'react-router-dom'
function Navbar() {
  const navigate = useNavigate();
  return (
    <div className='purple p-4 h-[8vh] flex items-center justify-between'>
      <div className='flex gap-4 items-center'>
        <img src={logo} alt='logo' width='40px'/>
        <div className='font-semibold'>Kallam Haranadha Reddy Institute of Technology</div>
      </div>
      <div className=''>
        {localStorage.getItem('adminEmail') && 
          <div className='text-md flex items-center gap-4'>
            {localStorage.getItem('adminEmail')}
            <IoMdLogOut className='text-red-500 font-bold text-2xl hover:cursor-pointer' onClick={()=>{localStorage.clear();navigate('/');}} />
          </div>
        }
        {localStorage.getItem('userEmail') && 
          <div className='text-md flex items-center gap-4'>
            {localStorage.getItem('userEmail')}
            <IoMdLogOut className='text-red-500 font-bold text-2xl hover:cursor-pointer' onClick={()=>{localStorage.clear();navigate('/');}} />
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar