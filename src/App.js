import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AdminChatPage from './pages/AdminChatPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserSignUp from './pages/UserSignUp';
import UserLogin from './pages/UserLogin';
import UserChatPage from './pages/UserChatPage';
import UserChatFrame from './components/UserCharFrame';
import StudentData from './pages/StudentData';
import StudentInfo from './components/StudentInfo';
import AdminLogin from './pages/AdminLogin';
import AdminSignUp from './pages/AdminSignUp';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/chat' element={<AdminChatPage/>}></Route>
        <Route path='/userchat' element={<UserChatPage/>}>
          <Route path=':type' element={<UserChatFrame/>}></Route>
        </Route>
        <Route path='/userLogin' element={<UserLogin/>}></Route>
        <Route path='/usersignup' element={<UserSignUp/>}></Route>
        <Route path='/adminlogin' element={<AdminLogin/>}></Route>
        <Route path='/adminsignup' element={<AdminSignUp/>}></Route>
        <Route path='/studentData' element={<StudentData/>}>
          <Route path=':studentEmailID' element={<StudentInfo/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App