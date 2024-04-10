import React from 'react'
import { FaPlay } from "react-icons/fa";

function AudioMessage() {
  return (
    <div className=' w-fit p-2'>
        <div className='gray p-2 flex rounded-md items-center gap-4'>
            <div className='font-bold'>PDF name here</div>
            <div className='hover:bg-gray-100 p-2 rounded-full hover:cursor-pointer'><FaPlay/></div>
        </div>
        <div className='text-xs'>Send by : Shaik Shoheb</div>
        <div className='text-xs'>Date  : 2023-01-02</div>
    </div>
  )
}

export default AudioMessage