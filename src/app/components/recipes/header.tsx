import React from 'react'
import {Hamburger } from 'lucide-react'

const Header = () => {
  return (
     <div className='flex items-center text-xl p-2'>
      <h1>My Recipes </h1>
      <Hamburger className='ml-1' />
     </div>
     
    
  )
}

export default Header
