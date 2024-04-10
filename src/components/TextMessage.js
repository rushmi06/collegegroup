import React from 'react'

function TextMessage({mssg}) {
  return (
    <div className=' w-fit p-2 text-wrap max-w-full'>
        <div className='gray p-2 break-all rounded-md text-wrap'>{mssg.body}</div>
        <div className='text-xs'>Send by : {mssg.sender}</div>
        <div className='text-xs'>Date  : {mssg.date.split('T')[0]}</div>
    </div>
  )
}

export default TextMessage