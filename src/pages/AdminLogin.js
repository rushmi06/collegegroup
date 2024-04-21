import React, { useState } from 'react'
import OTPInput from "otp-input-react";
import { ToastContainer, toast } from 'react-toastify';
import {Link, useNavigate} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
function AdminLogin() {
    const [otpSent,setOtpSent] = useState(false);
    const [userEnteredOTP,setUserEnteredOTP] = useState("");
    const [generatedOTP,setGeneraqtedOTP] = useState(null);
    const navigate = useNavigate();
    const [data,setData] = useState({
        email:"",
        password:""
    });
    const generateOtp = () => {
        let digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        setGeneraqtedOTP(OTP);
        return OTP;
    }
    const sendOtp = async ()=>{
        // if(!data.email.includes("@khitguntur.ac.in")){
        //     toast.error("Enter the college email id ");
        //     return;
        // }
        await axios.get(`http://localhost:3030/admins/${data.email}`).then((result) => {
            if(result.data.password === data.password){
                axios.post('http://localhost:3030/sendOTP', { to: data.email, subject: 'User login otp', otp: generateOtp() }); 
                setOtpSent(true);
                localStorage.setItem("adminName",result.data.name);
                toast.success("OTP sent successfully");
            }else{
                toast.error("Enter correct password")
            }
        }).catch((err) => {
            toast.error("User not found");
        });
    }
    const login = async ()=>{
        if(generatedOTP === userEnteredOTP){
            toast.error("Please enter correct otp");
            return;
        }else{
            toast.success("Logged in successfully")
            localStorage.clear();
            localStorage.setItem('adminEmail',data.email);
            navigate('/chat');
        }
    }
    const changeHadler = (e)=>{
        setData(previous=>({
            ...previous,
            [e.target.name] : e.target.value
        }))
    }
  return (
    <div className='w-full h-[100vh] justify-center items-center flex flex-col gap-4'>
        <ToastContainer/>
        {!otpSent && <div className='white p-6 w-1/3 flex rounded-md shadow flex-col gap-6'>
            <div className='font-bold text-2xl'>Staff Login</div>
            <div className='flex flex-col w-full gap-2'>
                <label className='font-semibold'>Enter email </label>
                <input autoFocus name='email' onChange={changeHadler} value={data.email} className='w-full bg-transparent border-blue-500 focus:outline border rounded-md p-2'/>
            </div>
            <div className='flex flex-col w-full gap-2'>
                <label className='font-semibold'>Enter Password </label>
                <input name='password' onChange={changeHadler} value={data.password} className='w-full bg-transparent border-blue-500 focus:outline border rounded-md p-2' type='password'/>
                <div className='flex gap-2 text-sm'>Are you new? <Link to='/adminsignup' className='text-blue-600'>Create account</Link></div>
            </div>
        </div>}
        {otpSent && <div className='white p-6 w-1/3 flex rounded-md shadow flex-col items-center gap-4'>
            <div className='text-center gap-4 flex flex-col '>
                <div className='font-bold'>
                    Enter OTP here
                </div>
                <div className=''>
                    sent to your email id {data.email}
                </div>
            </div>
            <OTPInput value={userEnteredOTP} onChange={setUserEnteredOTP} autoFocus OTPLength={4} otpType="number" disabled={false} secure />
            <div className=' flex gap-2 '>
                <div className=''>Didn't get the otp </div>
                <div onClick={sendOtp} className='text-blue-500 hover:cursor-pointer  underline'> Resend</div>
            </div>
        </div>}
        {!otpSent && <div onClick={sendOtp} className='blue py-2 px-4 hover:cursor-pointer rounded-md'>Get OTP</div>}
        {otpSent &&<div onClick={login} className='blue py-2 px-4 hover:cursor-pointer rounded-md'>Login</div>}
    </div>
  )
}

export default AdminLogin