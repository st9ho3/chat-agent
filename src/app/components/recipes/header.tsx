import React from 'react'
import {Hamburger } from 'lucide-react'

const Header = () => {
  return (
    <div className=' bg-white flex-1 w-full p-4'>
     <div className='flex items-center text-2xl mb-2 border-b-1 border-gray-200 pb-2'>
      <h1>My Recipes </h1>
      <Hamburger className='ml-1' />
     </div>
     
    </div>
  )
}

export default Header
