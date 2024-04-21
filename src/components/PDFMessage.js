import axios from 'axios';
import React, { useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegCopy } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import { FaDownload } from "react-icons/fa6";
function PDFMessage({mssg,messageDeleted}) {
  const deleteMessage = async()=>{
    await axios.delete(`http://localhost:3030/messages/${mssg._id}`).then((result) => {
      toast.success("Deleted successfully");
      messageDeleted();
    }).catch((err) => {
      console.log(err)
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
    <div className=' w-fit p-2'>
      <ToastContainer/>
        <div className='gray p-2 flex rounded-md items-center gap-4 relative'>
            <a href={mssg.body} target='_blank' rel='noopener noreferrer' className='font-bold'>{mssg.title}</a>
            <div className='hover:bg-gray-100 p-2 rounded-full hover:cursor-pointer'><FaDownload/></div>
            <div className='absolute right-1 top-1 text-sm hover:bg-gray-200 hover:cursor-pointer p-1 rounded-md' onClick={()=>setShowOptions(!showOptions)}><BsThreeDotsVertical /></div>
            {showOptions && <div className='absolute right-1 top-3 bg-white rounded-md text-sm'>
              <div className='hover:bg-gray-300 p-2 px-4 hover:cursor-pointer flex justify-center items-center gap-4' onClick={()=>copyMessage()}><FaRegCopy  className='text-xl'/>Copy</div>
              <div className='hover:bg-gray-300 p-2 px-4 hover:cursor-pointer flex justify-center items-center gap-4' onClick={()=>deleteMessage()}><MdDeleteOutline className='text-red-500 text-xl' />Delete</div>
            </div>}
        </div>
        <div className='text-xs'>Send by : Shaik Shoheb</div>
        <div className='text-xs'>Date  : 2023-01-02</div>
    </div>
  )
}

export default PDFMessage