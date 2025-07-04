import React from 'react'
import { Plus, Minus } from 'lucide-react'

const Incremental = () => {
  return (
    <div className='flex items-center border border-gray-300 rounded-lg p-2 shadow-sm'>

      <div
        className='w-6 h-6 flex justify-center items-center border border-gray-400 rounded-full cursor-pointer
                   hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200' // Added hover and active classes
        aria-label="Decrement count"
      >
        <Minus color='gray' size={16} />
      </div>

      
      <div className='font-semibold text-2xl mx-2 text-gray-800'>
        10
      </div>

      <div
        className='w-6 h-6 flex justify-center items-center border border-gray-400 rounded-full cursor-pointer
                   hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200' 
        aria-label="Increment count"
      >
        <Plus color='gray' size={16} />
      </div>
    </div>
  )
}

export default Incremental
