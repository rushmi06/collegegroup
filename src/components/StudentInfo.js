import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import profilepic from '../assets/profile.png'
function StudentInfo() {
    const [data,setData] = useState({});
    const {studentEmailID} = useParams();
    useEffect(()=>{
        let fetchData = async()=>{
            await axios.get(`http://localhost:3030/users/${studentEmailID}`).then((result) => {
                setData(result.data);
            })
        }
        fetchData();
    },[studentEmailID])
  return (
    <div className='flex justify-center items-center w-full py-8'>
        <div className='white w-10/12 p-6 flex flex-col items-center justify-center gap-4'>
            <div className='w-full flex justify-center items-center  '>
                <img src={data.image||profilepic} alt={profilepic} width='150px'/>
            </div>
            <div className='w-full flex items-center gap-4'>
                <div className='font-bold w-1/3'>Name : </div>
                <div className='w-1/2'>{data.name}</div>
            </div>
            <div className='w-full flex items-center gap-4'>
                <div className='font-bold w-1/3'>Roll Number : </div>
                <div className='w-1/2'>{data.id}</div>
            </div>
            <div className='w-full flex items-center gap-4'>
                <div className='font-bold w-1/3'>Email : </div>
                <div className='w-1/2'>{data.email}</div>
            </div>
            <div className='w-full flex items-center gap-4'>
                <div className='font-bold w-1/3'>Graduation : </div>
                <div className='w-1/2'>{data.graduation}</div>
            </div>
            <div className='w-full flex items-center gap-4'>
                <div className='font-bold w-1/3'>Branch : </div>
                <div className='w-1/2'>{data.branch}</div>
            </div>
            <div className='w-full flex items-center gap-4'>
                <div className='font-bold w-1/3'>Year : </div>
                <div className='w-1/2'>{data.year}</div>
            </div>
            <div className='w-full flex items-center gap-4'>
                <div className='font-bold w-1/3'>Section : </div>
                <div className='w-1/2'>{data.class}</div>
            </div>
            <div className='w-full flex items-center gap-4'>
                <div className='font-bold w-1/3'>Address : </div>
                <div className='w-1/2'>{data.address}</div>
            </div>
        </div>
    </div>
  )
}

export default StudentInfo