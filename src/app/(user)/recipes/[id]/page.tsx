
import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const page = async({params}: {params: Promise<{id: string}>}) => {

  const session = await auth()
    
    if (!session?.user) {
      redirect("/signin")
    }

  const {id} = await params

  return (
    <div>
      {`Recipe: ${id}`}
    </div>
  )
}

export default page
