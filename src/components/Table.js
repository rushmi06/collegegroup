import React from 'react'
import nodatafound from '../assets/nodatafound.gif'
import { NavLink } from 'react-router-dom'
import profilepic from '../assets/profile.png'
import './style.css'
function Table({data}) {
  return (
    <div id='table'>
        {data.length!==0  &&
            data.map((d,index)=>{
                return(
                    <NavLink to={`${d.email}`} key={index} className={`w-full flex items-center p-2 ${index%2===0?'white':''} rounded-md hover:bg-blue-300 hover:cursor-pointer`}>
                        <div className='w-1/12'><img src={d.image||profilepic} alt={profilepic} width='40px'/></div>
                        <div className='w-2/6 '>{d.email}</div>
                        <div className='w-3/6 '>{d.name}</div>
                        <div className='w-1/12 '>{d.year}</div>
                    </NavLink>
                )
            })
        }
        {data.length===0  && <div className='w-full items-center justify-center flex'>
            <img src={nodatafound} alt="no data found"/>
        </div>}
        
    </div>
  )
}

export default Table