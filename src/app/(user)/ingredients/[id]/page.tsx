import React from 'react'

const page = async ({params}: {params: Promise<{id: string}>}) => {
  const {id} = await params
  
  return (
    <div>
      Ingredient {id} 
    </div>
  )
}

export default page
