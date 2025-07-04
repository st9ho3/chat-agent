import React from 'react'
import Incremental from '../shared/incremental'

const RecipeForm = () => {
  return (
    <div className='w-70 h-120 md:w-180 md:h-130 md:flex '>
      <form className='border-1 flex flex-col'>
        <input id='title' type="text" className='border-b-1 border-gray-300 p-2 placeholder:text-gray-500 text-2xl focus:outline-none ' placeholder="Please enter a name" required />
        <Incremental />
      </form>
      <div className='border-1 w-full ml-1'>

      </div>
    </div>
  )
}

export default RecipeForm

