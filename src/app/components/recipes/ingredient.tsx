import React from 'react'
import Incremental from '../shared/incremental'
import Button from '../shared/sharedButton'
import { Plus } from 'lucide-react'

const Ingredient = () => {
  return (
     <div className="flex flex-col md:flex-row items-center space-x-3 p-2">
        <div className='flex items-center space-x-3 p-2' >

          <Incremental />

          <select
            name="unit"
            id="unit"
            className="block w-20 h-10 px-3 py-2 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none bg-white text-gray-800"
          >
            <option value="">Unit</option>
            <option value="kg">kg</option>
            <option value="L">L</option>
            <option value="g">g</option>
            <option value="ml">ml</option>
          </select>
 
          
        </div >
        <div className='flex items-center space-x-3 p-2' >
          {/* Ingredient Name Input */}
          <input
            id="ingredientName"
            type="text"
            className="w-30 p-2 text-lg placeholder:text-gray-500 border-b-1 border-gray-300 focus:outline-none"
            placeholder="Ingredient"
            required
          />
        <button className='border-gray-400 rounded-md w-fit p-1 hover:bg-green-50 transition-colors duration-200'><Plus /></button>
        </div>
        
    </div>
  )
}

export default Ingredient
