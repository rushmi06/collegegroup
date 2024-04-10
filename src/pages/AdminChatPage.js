import React,{useEffect} from 'react'
import AdminSideFrame from '../components/AdminSideFrame'
import AdminSendFrame from '../components/AdminSendFrame'
import {useNavigate} from 'react-router-dom'
function AdminChatPage() {
  const navigate = useNavigate();
    useEffect(()=>{
        const storedAdminEmail = localStorage.getItem('adminEmail');
        if(!storedAdminEmail){
            navigate('/')
        }
    },[]);
  return (
    <div className='h-[92vh] flex overflow-scroll'>
        <div className='w-1/3 h-full '>
            <AdminSideFrame/>
        </div>
        <div className='w-2/3 h-full  '>
            <AdminSendFrame/>
        </div>
    </div>
  )
}

export default AdminChatPage