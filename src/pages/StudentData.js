import React ,{useEffect, useState} from 'react'
import {Outlet,useNavigate} from 'react-router-dom'
import Table from '../components/Table'
import axios from 'axios'
function StudentData() {
    const navigate = useNavigate();
    const [data,setData] = useState([]);
    const [filteredData,setFilteredData] = useState([]);
    useEffect(()=>{
        const storedAdminEmail = localStorage.getItem('adminEmail');
        if(!storedAdminEmail){
            navigate('/')
        }
        let fetchData = async ()=>{
            await axios.get('http://localhost:3030/users').then((result) => {
                setData(result.data);
                setFilteredData(result.data);
            })
        }
        fetchData();
    },[]);
    const handleFilter = (term) => {
        const lowercaseTerm = term.toLowerCase();
        const filteredData = data.filter((item) => {
            const lowercaseEmail = item.email.toLowerCase();
            const lowercaseName = item.name.toLowerCase();
            return lowercaseEmail.includes(lowercaseTerm) || lowercaseName.includes(lowercaseTerm);
        });
        setFilteredData(filteredData);
    };
    
  return (
    <div className='flex p-4'>
        <div className=' w-2/3  flex flex-col gap-4'>
            <div className=' '>
                <input onChange={(e)=>handleFilter(e.target.value)} type='search' placeholder='Enter email or name' className='p-2 border w-1/2 rounded-md focus:outline bg-gray-200' />
            </div>
            <Table data={filteredData}/>
        </div>
        <div className='w-1/3'>
            <Outlet/>
        </div>
    </div>
  )
}

export default StudentData