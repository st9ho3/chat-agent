"use client"
import React from 'react'
import { UtensilsCrossed, Carrot } from 'lucide-react';
import { useHomeContext } from '@/app/context/homeContext/homeContext';

const OptionsModal = () => {
    const {state, dispatch} = useHomeContext()

  return (
   // Main container with dashed border and padding, similar to the reference
    <div className="w-full max-w-xs rounded-lg ">
      <div className="flex flex-col gap-y-2">
        
        <h3 className="px-2 py-1 text-sm font-semibold text-gray-500">Create New</h3>

        {/* Option 1: Create Recipe 
          NOTE: Replace <a> with Next.js <Link> component for client-side navigation.
        */}
        <div
          className="flex items-center gap-x-3 rounded-lg p-2 border-1 border-dashed border-gray-300 transition-colors duration-200 hover:bg-gray-100 cursor-default "
          onClick={(e) => 
            {(dispatch({type: "OPEN_MODAL", payload: {type: "recipe"} }))
            e.stopPropagation()}}
        >
          <UtensilsCrossed className="h-5 w-5 text-gray-400" />
          <span className="text-md text-gray-700">Recipe</span>
        </div>

        
        <div
          className="flex items-center gap-x-3 rounded-lg p-2 border-1 border-dashed border-gray-300 transition-colors duration-200 hover:bg-gray-100 cursor-default"
          onClick={(e) => 
            {(dispatch({type: "OPEN_MODAL", payload: {type: "ingredient"} }))
            e.stopPropagation()}}
        >
          <Carrot className="h-5 w-5 text-gray-400" />
          <span className="text-md text-gray-700">Ingredient</span>
        </div>

      </div>
    </div>
  )
}

export default OptionsModal
