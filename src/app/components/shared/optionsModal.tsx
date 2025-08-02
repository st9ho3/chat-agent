"use client"
import React from 'react'
import { UtensilsCrossed, Carrot } from 'lucide-react';
import { useHomeContext } from '@/app/context/homeContext/homeContext';
import Link from 'next/link';

const OptionsModal = () => {
    const {state, dispatch} = useHomeContext()

    const closeAfterDelay = (dispatch: React.Dispatch<{type: string}>) => (e: React.MouseEvent ) => {
  e.stopPropagation();
  setTimeout(() => {
    dispatch({ type: "CLOSE_MODAL" });
  }, 1000);
};

// How you would use it:
// <button onClick={closeAfterDelay(dispatch)}>Close</button>

    

  return (
   // Main container with dashed border and padding, similar to the reference
    <div className=" w-full md:w-100 max-w-xs rounded-lg ">
      <div className="flex flex-col gap-y-2">
        
        <h3 className="px-2 py-1 text-sm font-semibold text-gray-500">Create New</h3>

        {/* Option 1: Create Recipe 
          NOTE: Replace <a> with Next.js <Link> component for client-side navigation.
        */}
        <Link href="/recipes/create">
        <div
          onClick={((e) => {
  setTimeout(() => {
    dispatch({ type: "CLOSE_MODAL" });
  }, 1000);
  e.stopPropagation();
})}
          className="flex items-center gap-x-3 rounded-lg p-2 border-1 border-dashed border-gray-300 transition-colors duration-200 hover:bg-gray-100 cursor-default ">
          <UtensilsCrossed className="h-5 w-5 text-gray-400" />
          <span className="text-md text-gray-700">Create a recipe</span>
        </div>
        </Link>

        <Link href="/ingredients/create">
        
        <div
          className="flex items-center gap-x-3 rounded-lg p-2 border-1 border-dashed border-gray-300 transition-colors duration-200 hover:bg-gray-100 cursor-default"
          onClick={((e) => {
  setTimeout(() => {
    dispatch({ type: "CLOSE_MODAL" });
  }, 1000); 
  e.stopPropagation();
})}
        >
          <Carrot className="h-5 w-5 text-gray-400" />
          <span className="text-md text-gray-700">Add an ingredient</span>
        </div>
        </Link>

      </div>
    </div>
  )
}

export default OptionsModal
