import React ,{useEffect, useState} from 'react'
import {Outlet,useNavigate} from 'react-router-dom'
import Table from '../components/Table'
import axios from 'axios'
function StudentData() {
    const navigate = useNavigate();
    const [data,setData] = useState([]);
    const [filteredData,setFilteredData] = useState([]);
    const [filters,setFilters] = useState({});
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
    let onChnageFilters = (e)=>{
        setFilters(previous =>({...previous,[e.target.name]:e.target.value}))
    }
    let search = async () => {
        try {
            console.log(filters); 
    
            const result = await axios.get('http://localhost:3030/users', {
                params: filters // Use 'params' option to send query parameters
            });
    
            console.log(result.data);
            setFilteredData(result.data);
        } catch (error) {
            console.error("Error:", error);
            // Handle error if necessary
        }
    };
    
  return (
    <div className='flex p-4'>
        <div className=' w-2/3  flex flex-col gap-4'>
            <div className=' flex flex-row items-center gap-4'>
                <input onChange={(e)=>handleFilter(e.target.value)} type='search' placeholder='Enter email or name' className='p-2 border w-1/2 rounded-md focus:outline bg-gray-200' />
                <div className='w-1/2 justify-around flex items-center'>
                    <select name='year' className='w-1/3 p-2 bg-gray-200 border border-black rounded-md ' onChange={onChnageFilters}>
                        <option>--select year--</option>
                        <option value='1st' className='p-2 white hover:cursor-pointer'>1st year</option>
                        <option value='2nd' className='p-2  hover:cursor-pointer'>2nd year</option>
                        <option value='3rd' className='p-2 white hover:cursor-pointer'>3rd year</option>
                        <option value='4th' className='p-2  hover:cursor-pointer'>4th year</option>
                    </select>
                    <select name='class' className='w-1/3 p-2 bg-gray-200 border border-black rounded-md ' onChange={onChnageFilters}>
                        <option>--select section--</option>
                        <option value='A'  className='p-2 white hover:cursor-pointer'>A section</option>
                        <option value='B'  className='p-2  hover:cursor-pointer'>B section</option>
                        <option value='C'  className='p-2 white hover:cursor-pointer'>C section</option>
                    </select>
                    <div onClick={search} className='blue p-2 rounded-md w-1/4 text-center hover:cursor-pointer'>Search</div>
                </div>
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