import React from 'react'
import Sidebar from '../components/Sidebar'
import ChatAreas from '../components/ChatAreas'

function Home() {
  return (
    <div className='flex'>
      <Sidebar/>
      <ChatAreas/>
    </div>
  )
}

export default Home