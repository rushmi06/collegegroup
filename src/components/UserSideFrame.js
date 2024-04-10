import React from 'react'
import {  NavLink } from 'react-router-dom'
import './style.css'
function UserSideFrame() {
  return (
    <div className='blue h-full flex flex-col items-center gap-4 '>
        <div id='userside' className='w-10/12 p-2 gap-2 flex flex-col'>
            <NavLink to='events' className='w-full p-4 trans font-bold rounded-md hover:cursor-pointer shadow-2xl'>Events</NavLink>
            <NavLink to='general' className='w-full p-4 trans font-bold rounded-md hover:cursor-pointer shadow-2xl'>College</NavLink>
        </div>
    </div>
  )
}

export default UserSideFrame