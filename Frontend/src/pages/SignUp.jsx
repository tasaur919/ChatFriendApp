import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { dbUrl } from '../main'
import {ToastContainer,toast} from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
function SignUp() {
    const navigate=useNavigate()
    const [show,setShow]=useState(false)
    const dispatch=useDispatch()
    // const {user}=useSelector((state)=>state.user)
    // console.log(user);
    
    
    const [storeUser,setStoreUser]=useState({
        name:'',
        username:'',
        email:'',
        password:'',
        image:null,
        mobile:''
    })

    const handleChangeInpute=(e)=>{
        const {name,value,files}=e.target
        setStoreUser({
            ...storeUser,
           [name]:value,
        //    image:files[0]                             //error generate when we signup
        })
    }

    const handleSubmitForm=async(e)=>{
        e.preventDefault()
        try {
            const result=await axios.post(`${dbUrl}/api/signup`,storeUser,{withCredentials:true})
            console.log(result);
            dispatch(setUserData(result.data))
            if(result.data.sts===0){
                toast.success(result.data.message)

            }else if(result.data.sts===1){
                toast.error(result.data.message)
            }
            else if(result.data.sts===2){
                toast.error(result.data.message)
            }
            else if(result.data.sts===3){
                toast.error(result.data.message)
            }
            else if(result.data.sts===5){
                toast.error(result.data.message)
            }

            
        } catch (error) {
         toast.error("Internal server error")
        }
    }

   

  return (
    <div className='min-h-screen w-full flex justify-center items-center'>
        <div className='md:w-6/12 w-full bg-gray-300 shadow-lg shadow-gray-400 rounded-lg'>
        <div className='w-full flex justify-center items-center h-[200px] bg-sky-400 rounded-b-[30%] shadow-lg shadow-gray-400'>
              <h1 className='text-gray-600 text-[30px] font-semibold'>Welcome to <span className='font-bold text-white'>indian ChatApp</span></h1>
        </div>
            <form  onSubmit={handleSubmitForm}>
                <div className='p-10 flex flex-col md:gap-4 gap-6'>
                    <input type="text" name='name' placeholder='fullName' className='border outline-none px-4 rounded-2xl py-3 shadow-lg shadow-gray-400 border-sky-400' onChange={handleChangeInpute} required/>
                    <input type="text" name='username' placeholder='UserName' className='border outline-none px-4 rounded-2xl py-3 shadow-lg shadow-gray-400 border-sky-400' onChange={handleChangeInpute} required/>
                    <input type="email" name='email' placeholder='email@gmail.com' className='border outline-none px-4 rounded-2xl py-3 shadow-lg shadow-gray-400 border-sky-400' onChange={handleChangeInpute} required/>
                    <div className='relative border border-sky-400 shadow-lg shadow-gray-400 rounded-2xl'>
                    <input type={`${show?"text":"password"}`} name='password' placeholder='******' className=' outline-none px-4  py-3  ' onChange={handleChangeInpute} required/>                     <span className='absolute right-4 top-[12px] font-semibold text-sky-400 cursor-pointer' onClick={()=>setShow(!show)}>{`${show?"hidden":"show"}`}</span>
                    </div>

<div className=' w-full grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-6'> 
                        <label className={`border outline-none px-[2px] ${storeUser.image?"text-gray-900":"text-gray-500"} rounded-2xl py-3 shadow-lg shadow-gray-400 border-sky-400`}>
                          <span className='bg-gray-400 px-2 text-gray-800 font-semibold rounded-md py-2.5'>Chose image :</span>  {storeUser.image?storeUser.image.name :" No. file"}
                           
                            
                        <input type="file" name='image'  placeholder='' className='hidden' onChange={handleChangeInpute} />
                        </label>
                        <input type="number" name='mobile' placeholder='mobile Number' className='border outline-none px-4 rounded-2xl py-3 shadow-lg shadow-gray-400 border-sky-400' onChange={handleChangeInpute}/>
                    </div>

                    <div className='flex flex-col gap-3 justify-center items-center'>
                    <button type='submit' className='border bg-sky-400 outline-none px-2 rounded-2xl py-3 shadow-lg shadow-gray-500 border-sky-400 w-full md:w-[250px] mt-3 font-bold cursor-pointer hover:scale-[1.05] transition-transform duration-200 hover:text-white '>Sign up</button>
                    <p>Allready have an Account? <span className='text-blue-500 font-bold underline cursor-pointer' ><Link to={'/login'}>Signup here</Link></span></p>
                    </div>
                </div>
            </form>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default SignUp