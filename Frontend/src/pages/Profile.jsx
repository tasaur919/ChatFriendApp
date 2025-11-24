import React, { useRef, useState } from 'react'
import dp from '../assets/dp.png'
import LocalSeeOutlinedIcon from '@mui/icons-material/LocalSeeOutlined';
import WestIcon from '@mui/icons-material/West';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import {dbUrl} from '../main'
import { setUserData } from '../redux/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Profile() {
  const {userData}=useSelector(state=>state.user)
  const dispatch=useDispatch()
  const [name,setName]=useState(userData.name || "")
  const [frontendImage,setFrontendImage]=useState(userData.image || dp)
  const [backendImage,setBackendImage]=useState(null)

  let image=useRef()
  const [saving,setSaving]=useState(false)

  const handleImage=(e)=>{
      let file=e.target.files[0]
      setBackendImage(file)
      // console.log(file)
      setFrontendImage(URL.createObjectURL(file))
  }

  const handleProfile=async(e)=>{
     e.preventDefault()
     try {
      setSaving(true)
      let formData=new FormData()
      formData.append("name",name)
      
      formData.append("image",backendImage)
      console.log(formData)
      let result=await axios.put(`${dbUrl}/api/profile`,formData,{withCredentials:true,validateStatus:()=>true})
      setSaving(false)
      dispatch(setUserData(result.data))
      console.log(result)
      toast.success("Profile Saved")
      navigate("/")
     } catch (error) {
      console.log(error);
      toast.error("Profile not saved!")
      setSaving(false)
     }
  }
const navigate=useNavigate()
  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center '>
      <div className='fixed top-5 left-4 text-gray-500' onClick={()=>navigate("/")}><WestIcon fontSize='large' className='cursor-pointer hover:text-blue-400 hover:scale-[1.1] transition-transform duration-200'/></div>
       <div className=' bg-slate-200 rounded-full border-4 border-sky-400 relative ' onClick={()=>image.current.click()}>
        <div className='w-48 h-48 bg-slate-200 rounded-full overflow-hidden object-cover justify-center items-center flex'>
          <img src={frontendImage} alt="" className='h-full w-full'/>
          </div>
          <LocalSeeOutlinedIcon fontSize='large' className='absolute bottom-4 right-4 text-blue-700 cursor-pointer'/>
       </div>
       <form  className='flex  px-8 justify-center items-center flex-col gap-6 py-8 md:w-9/12 w-full ' onSubmit={handleProfile}>
       <input type="file"  hidden accept='image/*' ref={image} onChange={handleImage}/>
        <input type="text" onChange={(e)=>setName(e.target.value)} value={name} placeholder='Enter your Name' className='border outline-none px-4 w-full rounded-2xl py-3 shadow-lg shadow-gray-400 border-sky-400'/>
        <input type="text" value={userData.username} readOnly className='border outline-none px-4 w-full rounded-2xl py-3 shadow-lg shadow-gray-400 border-sky-400 text-gray-400'/>
        <input type="text" value={userData.email} readOnly className='border outline-none px-4 w-full rounded-2xl py-3 shadow-lg shadow-gray-400 border-sky-400 text-gray-400'/>
        <button className='border bg-sky-400 outline-none px-2 rounded-2xl py-3 shadow-lg shadow-gray-500 border-sky-400 w-6/12 md:w-[250px] mt-3 font-bold cursor-pointer hover:scale-[1.05] transition-transform duration-200 hover:text-white' disabled={saving}>{saving?"Saving...":"Save Profile"}</button>
       </form>
       <ToastContainer/>
    </div>
  )
}

export default Profile