"use client"
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const page = () => {
  

  const session = useSession()


  return (
    <div className='m-10 relative'>
      Hello bro {session.data?.user?.email}
      <button className='border-1 h-10 w-30 rounded-2xl'
       onClick={() => signOut()}>Sign out </button>
    </div>
  )
}

export default page
