import React, { useState } from 'react'
import OTPInput from "otp-input-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LuBadgeCheck } from "react-icons/lu";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase-config';
import axios from 'axios'
import profile from '../assets/profile.png'
import { Link } from 'react-router-dom';
function UserSignUp() {
    const [otpSent,setOtpSent] = useState(false);
    const [generatedOTP,setGeneraqtedOTP] = useState(null);
    const [userEnteredOTP,setUserEnteredOTP] = useState(null);
    const [verified,sertVerified] = useState(false);
    const [data,setData] = useState({
        name:"",
        password:"",
        id:"",
        email:"",
        number:"",
        graduation:"",
        branch:"",
        year:"",
        class:"",
        image:"",
        address:""
    })
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
        if (!data.name.trim()) {
            toast.error("Please enter a name.");
            return;
        } else if (!data.password.trim()) {
            toast.error("Please enter a password.");
            return;
        } else if (!data.id.trim()) {
            toast.error("Please enter an ID.");
            return;
        } else if (!data.email.trim()) {
            toast.error("Please enter an email.");
            return;
        } else if (!data.number.trim()) {
            toast.error("Please enter a number.");
            return;
        } else if (!data.graduation.trim()) {
            toast.error("Please enter graduation information.");
            return;
        } else if (!data.branch.trim()) {
            toast.error("Please enter a branch.");
            return;
        } else if (!data.year.trim()) {
            toast.error("Please enter a year.");
            return;
        } else if (!data.class.trim()) {
            toast.error("Please enter a class.");
        } else if (!data.image.trim()) {
            toast.error("Please enter an image.");
            return;
        } else if (!data.address.trim()) {
            toast.error("Please enter an address.");
            return;
        } 
        if(!data.email.includes("@khitguntur.ac.in")){
            toast.error("Enter the college email id ");
            return;
        }
        toast.success("OTP sent successfully");
        setOtpSent(true);
        await axios.post('http://localhost:3030/sendOTP', { to: data.email, subject: 'User signup otp', otp: generateOtp() });       
    }
    const submit = async ()=>{
        if(generatedOTP !== userEnteredOTP){
            toast.error("Please enter correct otp");
            return;
        }
        await axios.post('http://localhost:3030/users',data).then((result) => {
            sertVerified(true);
            toast.success("Successfully saved data");
            localStorage.clear();
        }).catch((err) => {
            sertVerified(false);
            toast.success("Error while saving data");
        });
    }
    const [uploading,setUploading] = useState(false);
    const upload = (e) => {
        setUploading(true);
        let selectedFile = e.target.files[0];
        if (selectedFile) {
          const imageRef = ref(storage, 'profile/' + selectedFile.name);
          const uploadTask = uploadBytesResumable(imageRef, selectedFile);
          uploadTask.on(
            'state_changed',
            (snapshot) => {},
            (error) => {
              console.error('Error uploading image:', error);
              setUploading(false);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((imageUrl) => {
                setUploading(false);
                setData(previous=>({
                    ...previous,
                    image:imageUrl
                }))
              });
            }
          );
        } else {
          alert('Please select a PDF to upload.');
          setUploading(false);
        }
      };
    const changeHadler = (e)=>{
        setData(previous=>({
            ...previous,
            [e.target.name] : e.target.value
        }))
    }
  return (
    <div className='w-full h-[92vh] justify-center items-center flex flex-col gap-4'>
        <ToastContainer />
        {uploading && <span class="loader"></span>}
        {!otpSent && !uploading && <div className='w-4/5 flex white flex-col p-2 gap-2  rounded-md shadow'>
            <div className='font-bold text-2xl text-center '>Student Resgitration</div>
            <div className='white p-4 w-full flex'>
                <div className='w-1/3 flex justify-center items-center flex-col gap-4'>
                    <img src={data.image||profile} className='w-1/2' alt={'alt'}/>
                    <label htmlFor='profileImage'>
                        <div className='blue hover:cursor-pointer w-fit  px-2 py-1 rounded-md'>Upload profile pic</div>
                        <input onChange={upload} id='profileImage' type='file' className='hidden' accept="image/*"/>
                    </label>
                </div>
                <div className='w-2/3 flex flex-col gap-4 '>
                    <div className='flex items-center w-full gap-2'>
                        <div className='w-1/3'>Name : </div>
                        <input onChange={changeHadler} name='name' value={data.name} type='text' className='w-1/2 px-2 py-1 rounded-md bg-transparent border border-black focus:outline outline-blue-600'/>
                    </div>
                    <div className='flex items-center w-full gap-2'>
                        <div className='w-1/3'>Password : </div>
                        <input onChange={changeHadler} name='password' value={data.password} type='password' className='w-1/2 px-2 py-1 rounded-md bg-transparent border border-black focus:outline outline-blue-600'/>
                    </div>
                    <div className='flex items-center w-full gap-2'>
                        <div className='w-1/3'>Roll Number : </div>
                        <input onChange={changeHadler} name='id' value={data.id} type='text' className='w-1/2 px-2 py-1 rounded-md bg-transparent border border-black focus:outline outline-blue-600'/>
                    </div>
                    <div className='flex items-center w-full gap-2'>
                        <div className='w-1/3'>Email : </div>
                        <input onChange={changeHadler} name='email' value={data.email} type='email' className='w-1/2 px-2 py-1 rounded-md bg-transparent border border-black focus:outline outline-blue-600'/>
                    </div>
                    <div className='flex items-center w-full gap-2'>
                        <div className='w-1/3'>Phone Number : </div>
                        <input onChange={changeHadler} name='number' value={data.number} type='number' className='w-1/2 px-2 py-1 rounded-md bg-transparent border border-black focus:outline outline-blue-600'/>
                    </div>
                    <div className='flex items-center w-full gap-2'>
                        <div className='w-1/3'>Graduation : </div>
                        <select onChange={changeHadler} name='graduation' value={data.graduation} className='w-1/2 px-2 py-1 rounded-md bg-transparent border border-black focus:outline outline-blue-600'>
                            <option value=''>--select--</option>
                            <option value='Under-graduation'>Under-graduation</option>
                        </select>
                    </div>
                    <div className='flex items-center w-full gap-2'>
                        <div className='w-1/3'>Branch : </div>
                        <select onChange={changeHadler} name='branch' value={data.branch} className='w-1/2 px-2 py-1 rounded-md bg-transparent border border-black focus:outline outline-blue-600'>
                            <option value=''>--select--</option>
                            <option className='Computer Science and Engineering'>Computer Science and Engineering</option>
                        </select>
                    </div>
                    <div className='flex items-center w-full gap-2'>
                        <div className='w-1/3'>Year : </div>
                        <select onChange={changeHadler} name='year' value={data.year} className='w-1/2 px-2 py-1 rounded-md bg-transparent border border-black focus:outline outline-blue-600'>
                            <option value=''>--select--</option>
                            <option value='1st'>1st year</option>
                            <option value='2nd'>2nd year</option>
                            <option value='3rd'>3rd year</option>
                            <option value='4th'>4th year</option>
                        </select>
                    </div>
                    <div className='flex items-center w-full gap-2'>
                        <div className='w-1/3'>Section: </div>
                        <select onChange={changeHadler} name='class' value={data.class} className='w-1/2 px-2 py-1 rounded-md bg-transparent border border-black focus:outline outline-blue-600'>
                            <option value=''>--select--</option>
                            <option value='A'>A section</option>
                            <option value='B'>B Section</option>
                            <option value='C'>C Section</option>
                        </select>
                    </div>
                    <div className='flex items-center w-full gap-2'>
                        <div className='w-1/3'>Address : </div>
                        <textarea onChange={changeHadler} name='address' value={data.address} type='text' className='w-1/2 px-2 py-1 rounded-md bg-transparent border border-black focus:outline outline-blue-600'></textarea>
                    </div>
                </div>
            </div>
        </div>}
        {otpSent && !verified && <div className='white p-4 w-1/2 flex rounded-md shadow flex-col items-center gap-4'>
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
        {verified &&<div className='flex flex-col items-center gap-4 '>
            <div className='text-4xl text-green-500 flex items-center gap-6'>
                <LuBadgeCheck />
                Successfully registered
            </div>
            <Link to='/userLogin' className='blue px-4 py-1 hover:cursor-pointer text-white rounded-md'>Login</Link>
        </div>}
        {!otpSent && !verified && !uploading &&  <div onClick={sendOtp} className='blue p-2 rounded-md w-1/12 text-center hover:cursor-pointer'>GET OTP</div>}
        {otpSent && !verified && <div onClick={submit} className='orange p-2 rounded-md w-1/12 text-center hover:cursor-pointer'>Verify</div>}
    </div>
  )
}

export default UserSignUp