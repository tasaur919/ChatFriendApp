import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { useSelector } from 'react-redux'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import useGetCurrentUser from './customHooks/getCurrentUser'
function App() {
      useGetCurrentUser();
      const {userData} =useSelector((state)=>state.user)
  return (
    <div>
      <Routes>
       <Route path='/login' element={!userData?<Login/>:<Navigate to='/'/>}/>
       <Route path='/signup' element={!userData?<SignUp/>:<Navigate to='/profile' />}/>
       <Route path='/' element={userData?<Home/>:<Navigate to='/login' />}/>
       <Route path='/profile' element={userData?<Profile/>:<Navigate to="/signup" />}/>
       
      </Routes>
    </div>
  )
}

export default App