import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { dbUrl } from '../main'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function Login() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [show,setShow]=useState()
   const [user,setUser]=useState({
    email:"",
    password:'',
   })

   const handleChangeInput=(e)=>{
     const {name,value}=e.target
     setUser({
        ...user,
        [name]:value
     })
   }

   const handleFormSubmit=async(e)=>{
    e.preventDefault()
    try {
        const res=await axios.post(`${dbUrl}/api/login`,user,{withCredentials:true,validateStatus:()=>true})
        dispatch(setUserData(res.data))
        console.log(res.data.message);
        if(res.data.sts===1){
            toast.error(res.data.message)
        }
        if(res.data.sts===2){
            toast.error(res.data.message)
        }
        if(res.data.sts===0){
            toast.success(res.data.message)
        }
        
    } catch (error) {
        toast.error("Something went wrong!",error)
        console.log(error);
        
    }
   }

  return (
    <div className='min-h-screen w-full flex justify-center items-center'>
        <div className='md:w-6/12 w-full bg-gray-300 shadow-lg shadow-gray-400 rounded-lg'>
        <div className='w-full flex justify-center items-center h-[200px] bg-sky-400 rounded-b-[30%] shadow-lg shadow-gray-400'>
              <h1 className='text-gray-600 text-[30px] font-semibold'>Welcome to <span className='font-bold text-white'>indian ChatApp</span></h1>
        </div>
            <form  onSubmit={handleFormSubmit}>
                <div className='p-10 flex flex-col md:gap-4 gap-6'>
                    <input type="email" name='email' placeholder='email@gmail.com' className='border outline-none px-4 rounded-2xl py-3 shadow-lg shadow-gray-400 border-sky-400' onChange={handleChangeInput} required/>
                    <div className='relative border border-sky-400 shadow-lg shadow-gray-400 rounded-2xl'>
                    <input type={`${show?"text":"password"}`} name='password' placeholder='******' className=' outline-none px-4  py-3  ' onChange={handleChangeInput} required/>                     <span className='absolute right-4 top-[12px] font-semibold text-sky-400 cursor-pointer' onClick={()=>setShow(!show)}>{`${show?"hidden":"show"}`}</span>
                    </div>
                    
                    <div className='flex flex-col gap-3 justify-center items-center'>
                    <button type='submit' className='border bg-sky-400 outline-none px-2 rounded-2xl py-3 shadow-lg shadow-gray-500 border-sky-400 w-full md:w-[250px] mt-3 font-bold cursor-pointer hover:scale-[1.05] transition-transform duration-200 hover:text-white '>Login</button>
                    <p>If you have not an Account? Create<span className='text-blue-500 font-bold underline cursor-pointer'><Link to={'/signup'}>Signup here</Link></span></p>
                    </div>
                </div>
            </form>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Login