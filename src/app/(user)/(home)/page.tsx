
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async() => {
  
  const session = await auth()
  
  if (!session?.user) {
    redirect("/signin")
  }

  return (
    <div className='m-10 relative'>
      Hello, {session.user.email}
    </div>
  )
}

export default page
