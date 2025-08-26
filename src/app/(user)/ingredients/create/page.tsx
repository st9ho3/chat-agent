import React from 'react'
import { IngredientModal } from '@/app/constants/components'


const page = () => {
  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      
      <div className={`relative w-full max-w-fit p-9 mx-4 transform transition-all duration-300 bg-white rounded-2xl shadow-xl`}>
        <IngredientModal mode='create'/>
      </div>
    </div>
  )
}

export default page
