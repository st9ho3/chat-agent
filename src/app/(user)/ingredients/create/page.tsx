import IngredientsForm from '@/app/components/ingredients/ingredientsform'
import React from 'react'


const page = () => {
  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      
      <div className={`relative w-full max-w-fit p-9 mx-4 transform transition-all duration-300 bg-white rounded-2xl shadow-xl`}>
        <IngredientsForm/>
      </div>
    </div>
  )
}

export default page
