import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from '../assets/dp.png'
import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { dbUrl } from '../main';
import { setOtherUsers, setUserData } from '../redux/userSlice';

function Sidebar() {
    const navigate=useNavigate()
    const {userData,otherUsers}=useSelector(state=>state.user)
    const [search,setSearch]=useState(false)
const dispatch=useDispatch()

    const handleLogout=async()=>{
          try {
            const result=await axios.get(`${dbUrl}/api/logout`)
            dispatch(setUserData(null))
            dispatch(setOtherUsers(null)) 
            navigate("/login")
          } catch (error) {
            navigate("/")
          }  
    }

  return (
    <div className='md:w-[30%] w-full bg-slate-200 border-r min-h-screen'>

        <div className='rounded-full w-12 h-12 shadow-lg bg-sky-300 shadow-gray-400 fixed flex bottom-3 left-3 justify-center items-center cursor-pointer hover:scale-[1.1] transition-transform duration-300' onClick={handleLogout}>
                <LogoutIcon fontSize='medium' className=' rotate-180 text-white font-bold'/>
          
              </div>

        <div className='bg-sky-400 h-[300px] rounded-b-[30%] shawod-lg shadow-gray-400 flex flex-col gap-2 justify-center px-4'>
          <p className='font-bold text-3xl text-white '>ChatApp</p>

          <div className='flex justify-between gap-3'>

              <p className='text-gray-800 font-bold text-[25px]'>Hi, {userData.name}</p>
              {/* <p>{userData.username}</p> */}
              <div className='cursor-pointer' onClick={()=>navigate("/profile")}>
              <img src={userData.image || dp } alt=""  className='h-12 w-12 rounded-full border-3 border-white'/>
              
              </div>
          </div>
          <div className={`flex w-full  gap-2 ${search?"flex-col":"flex-row"}`}>
             {!search&&
             <div className='rounded-full w-12 h-12 shadow-lg bg-slate-200 shadow-gray-400 flex justify-center items-center' onClick={()=>setSearch(true)}>
                <SearchIcon fontSize='medium' className='cursor-pointer'/>
          
              </div>
             }

             {search&&
             <form className='rounded-full w-full mt-2 shadow-lg bg-slate-200 shadow-gray-400 flex justify-between items-center pr-6 pl-3 gap-2'>
                <SearchIcon fontSize='medium' className='cursor-pointer'/>
              <input type="text" placeholder='Search Friend...'  className='text-[17px]   px-2 py-2 md:py-2 h-full w-full outline-none'/>
               <span onClick={()=>setSearch(false)}><CloseIcon fontSize='medium' className='cursor-pointer' /></span>
              </form>
             }

               <div className='flex flex-row gap-4 justify-start items-start'>
             {otherUsers.map((user,index)=>(
                <div key={index} className={`${search?"py-2 px-2":''}`}>
              <img src={user.image || dp } alt="no users"  className='h-12 w-12 rounded-full border-3 border-white'/>
              
              </div>
             ))}
             </div>
           </div>
        </div>
    </div>
  )
}

export default Sidebar