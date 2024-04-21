import React from 'react'
import logo from '../assets/logo.png'
import { IoMdLogOut } from "react-icons/io";
import {Link, useNavigate} from 'react-router-dom'
function Navbar() {
  const navigate = useNavigate();
  return (
    <div className='purple p-4 h-[8vh] flex items-center justify-between w-full'>
      <div className='flex gap-4 items-center w-2/3'>
        <img src={logo} alt='logo' width='40px'/>
        <div className='font-semibold'>Kallam Haranadha Reddy Institute of Technology</div>
      </div>
      <div className='w-3/12 flex justify-end'>
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
        {!localStorage.getItem('userEmail') && !localStorage.getItem('adminEmail') && <div className='flex gap-2 w-full '>
          <Link to='userLogin' className='p-2 orange rounded-md w-1/2 text-center'>Student</Link>
          <Link to='adminlogin' className='p-2 orange rounded-md w-1/2 text-center'>Staff</Link>
        </div>}
      </div>
    </div>
  )
}

export default Navbar