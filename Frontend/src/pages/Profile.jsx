import React from 'react'
import dp from '../assets/dp.png'
function Profile() {
  return (
    <div className='w-full h-[100vh] flex flex-col justify-center items-center'>
       <div className='w-[200px] h-[200px] bg-slate-200 rounded-full border-sky-400 border overflow-hidden'>
          <img src={dp} alt="" className='h-[100%]'/>
       </div>
       <form ></form>
    </div>
  )
}

export default Profile