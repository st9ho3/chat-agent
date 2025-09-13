import { auth } from '@/auth'
import React from 'react'

const page = async() => {
  
  const session = await auth()



  return (
    <div className='m-10 relative'>
      
      Hello {session?.user?.email}
      
    </div>
  )
}

export default page
