import React,{useEffect} from 'react'
import UserSideFrame from '../components/UserSideFrame'
import {Outlet} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
function UserChatPage() {
  const navigate = useNavigate();
    useEffect(()=>{
        const storedUserEmail = localStorage.getItem('userEmail');
        if(!storedUserEmail){
            navigate('/')
        }
    },[]);
  return (
    <div className='h-[92vh] flex overflow-scroll'>
        <div className='w-1/3 h-full '>
            <UserSideFrame/>
        </div>
        <div className='w-2/3 h-full  '>
            <Outlet/>
        </div>
    </div>
  )
}

export default UserChatPage