import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
const page = async ({params}: {params: Promise<{id: string}>}) => {
  const {id} = await params

  const session = await auth()
    
    if (!session?.user) {
      redirect("/signin")
    }
  
  return (
    <div>
      Ingredient {id} 
    </div>
  )
}

export default page
