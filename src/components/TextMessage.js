import axios from 'axios';
import React, { useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegCopy } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';


function TextMessage({mssg,messageDeleted}) {
  const deleteMessage = async()=>{
    await axios.delete(`http://localhost:3030/messages/${mssg._id}`).then((result) => {
      toast.success("Deleted successfully");
      messageDeleted();
    }).catch((err) => {
      toast.error("Error while deleting the message");
    });
    setShowOptions(false);
  }
  const copyMessage = ()=>{
    toast.success("Copied to clipboard successfully");
    navigator.clipboard.writeText(mssg.body)
    setShowOptions(false);
  }
  const [showOptions,setShowOptions] = useState(false);
  return (
    <div className=' w-fit p-2 text-wrap max-w-full'>
        <ToastContainer/>
        <div className='gray p-4 break-all rounded-md text-wrap relative'>
          {mssg.body}
          <div className='absolute right-1 top-1 text-sm hover:bg-gray-200 hover:cursor-pointer p-1 rounded-md' onClick={()=>setShowOptions(!showOptions)}><BsThreeDotsVertical /></div>
          {showOptions && <div className='absolute right-1 top-3 bg-white rounded-md text-sm'>
            <div className='hover:bg-gray-300 p-2 px-4 hover:cursor-pointer flex justify-center items-center gap-4' onClick={()=>copyMessage()}><FaRegCopy  className='text-xl'/>Copy</div>
            {localStorage.getItem("adminEmail") && <div className='hover:bg-gray-300 p-2 px-4 hover:cursor-pointer flex justify-center items-center gap-4' onClick={()=>deleteMessage()}><MdDeleteOutline className='text-red-500 text-xl' />Delete</div>}
          </div>}
        </div>
        <div className='text-xs'>Send by : {mssg.sender}</div>
        <div className='text-xs'>Date  : {mssg.date.split('T')[0]}</div>
    </div>
  )
}

export default TextMessage