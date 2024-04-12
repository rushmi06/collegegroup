import React from 'react'
import { Link } from 'react-router-dom'
import nac from '../assets/nacc.png'
import nba from '../assets/nba.png'
import how from '../assets/how.png'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
function Home() {
  return (
    <div className='flex flex-col'>
      <div className='h-[92vh] banner w-full flex justify-center overflow-scroll'>
        <div className='w-1/2'></div>
        <div className='w-1/2 flex flex-col justify-center items-center gap-4'>
          <Link to='userlogin' className='w-3/4 border orange p-3 rounded-md items-center justify-center flex'>Login as a User</Link>
          <Link to='adminlogin' className='w-3/4 border blue p-3 rounded-md items-center justify-center flex'>Login as a Admin</Link>
        </div>
      </div>
      <div className='w-full flex flex-col items-center p-10 gap-10'>
        <div className='font-bold text-5xl text-center w-2/3'>Kallam Haranadhareddy Institute of Technology</div>
        <div className=' flex w-1/2 justify-between'>
          <img src={nac} width='200px' alt='img'/>
          <img src={nba} width='200px' alt='img'/>
        </div>
        <div className='font-bold text-5xl text-center w-2/3'>How it works?</div>
        <img src={how} width='' alt='imag'/>
      </div>
      <div className='bg-black text-white flex flex-col items-center gap-10 p-10'>
        <div className='text-2xl font-bold'>Contact us on</div>
        <div className='flex justify-around w-1/2 text-2xl'>
          <FaInstagram className='hover:text-blue-700 hover:cursor-pointer'/>
          <FaTwitter className='hover:text-blue-700 hover:cursor-pointer'/>
          <FaFacebook className='hover:text-blue-700 hover:cursor-pointer'/>
          <FaLinkedin className='hover:text-blue-700 hover:cursor-pointer'/>
        </div>
        <div className=''>All &copy;copy rights are reserved for 2024</div>
      </div>
    </div>
  )
}

export default Home