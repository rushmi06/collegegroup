import React from 'react'
import { FaDownload } from "react-icons/fa6";
function PDFMessage({mssg}) {
  return (
    <div className=' w-fit p-2'>
        <div className='gray p-2 flex rounded-md items-center gap-4'>
            <a href={mssg.body} target='_blank' rel='noopener noreferrer' className='font-bold'>{mssg.title}</a>
            <div className='hover:bg-gray-100 p-2 rounded-full hover:cursor-pointer'><FaDownload/></div>
        </div>
        <div className='text-xs'>Send by : Shaik Shoheb</div>
        <div className='text-xs'>Date  : 2023-01-02</div>
    </div>
  )
}

export default PDFMessage